import type { ChatContext } from "@/types/domain";
import { formatCurrency, rooms, statusLabels } from "@/lib/data";
import { localKnowledgeBase, type KnowledgeEntry } from "@/lib/localKnowledgeBase";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const uniqueDistricts = Array.from(new Set(rooms.map((room) => room.district)));

function parseBudget(text: string, fallback?: number) {
  const millionMatch = text.match(/(?:duoi|toi da|tam|khoang)?\s*(\d+(?:[.,]\d+)?)\s*(?:trieu|tr)\b/);
  if (millionMatch) {
    return Math.round(Number(millionMatch[1].replace(",", ".")) * 1000000);
  }

  const rawNumber = text.match(/(?:duoi|toi da|tam|khoang)?\s*(\d{7,8})\b/);
  if (rawNumber) {
    return Number(rawNumber[1]);
  }

  return fallback;
}

function parseDistrict(text: string, fallback?: string) {
  const found = uniqueDistricts.find((district) => text.includes(normalize(district)));
  if (found) return found;
  return fallback === "Tất cả" ? undefined : fallback;
}

function scoreEntry(entry: KnowledgeEntry, text: string, context: ChatContext) {
  let score = 0;
  const normalizedTitle = normalize(entry.title);
  const normalizedSummary = normalize(entry.summary);

  if (entry.audience.includes(context.role)) score += 1.2;
  if (text.includes(entry.category)) score += 1;
  if (normalizedTitle.split(" ").some((word) => word.length > 3 && text.includes(word))) score += 1;

  for (const keyword of entry.keywords) {
    if (text.includes(normalize(keyword))) score += 3;
  }

  for (const checklistItem of entry.checklist) {
    const normalizedItem = normalize(checklistItem);
    if (normalizedItem.split(" ").some((word) => word.length > 4 && text.includes(word))) {
      score += 0.7;
    }
  }

  if (normalizedSummary.split(" ").some((word) => word.length > 5 && text.includes(word))) {
    score += 0.8;
  }

  return score;
}

function retrieveKnowledge(text: string, context: ChatContext) {
  const matches = localKnowledgeBase
    .map((entry) => ({ entry, score: scoreEntry(entry, text, context) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((match) => match.entry);

  if (matches.length > 0) return matches.slice(0, 3);

  if (context.role === "owner") {
    return localKnowledgeBase.filter((entry) => entry.category === "owner" || entry.category === "booking").slice(0, 2);
  }

  if (context.role === "manager") {
    return localKnowledgeBase.filter((entry) => entry.category === "admin" || entry.category === "policy").slice(0, 2);
  }

  return localKnowledgeBase.filter((entry) => entry.category === "search" || entry.category === "safety").slice(0, 2);
}

function findMatchingRooms(text: string, context: ChatContext) {
  const budget = parseBudget(text, context.budget);
  const district = parseDistrict(text, context.district);
  const utilityHints = ["wifi", "ban cong", "may lanh", "gui xe", "may giat", "bep", "thang may", "camera"];

  return rooms
    .filter((room) => {
      const matchBudget = budget ? room.price <= budget : true;
      const matchDistrict = district ? room.district === district : true;
      const normalizedUtilities = normalize(room.utilities.join(" "));
      const matchUtility = utilityHints.some((hint) => text.includes(hint))
        ? utilityHints.some((hint) => text.includes(hint) && normalizedUtilities.includes(hint))
        : true;
      return matchBudget && matchDistrict && matchUtility;
    })
    .sort((a, b) => {
      const statusWeight = { available: 0, pending: 1, booked: 2 };
      return statusWeight[a.status] - statusWeight[b.status] || b.rating - a.rating || a.price - b.price;
    })
    .slice(0, 3);
}

function shouldShowRoomSearch(text: string) {
  return ["tim", "loc", "phong nao", "duoi", "gia", "gan", "ngan sach", "wifi", "ban cong"].some((keyword) =>
    text.includes(keyword)
  );
}

function roomContextSentence(context: ChatContext) {
  const room = context.currentRoom;
  if (!room) return "";

  const availability =
    room.status === "available"
      ? "đang ở trạng thái còn phòng trong dữ liệu mẫu"
      : room.status === "pending"
        ? "đang cần kiểm tra thêm, chưa nên coi là chắc chắn còn phòng"
        : "đã có lịch hoặc hợp đồng đang xử lý";

  return `Với phòng đang chọn: ${room.title}, giá ${formatCurrency(room.price)}, diện tích ${room.area}m², cọc ${room.depositMonths} tháng, trạng thái ${statusLabels[room.status]} nên ${availability}. Ghi chú minh bạch: ${room.legalNote}.`;
}

function buildKnowledgeAnswer(entries: KnowledgeEntry[]) {
  return entries
    .map((entry) => {
      const checklist = entry.checklist.slice(0, 4).join("; ");
      const guardrail = entry.guardrail ? ` Lưu ý: ${entry.guardrail}` : "";
      return `${entry.title}: ${entry.summary} Nên làm: ${checklist}.${guardrail}`;
    })
    .join(" ");
}

export function askLocalCoach(question: string, context: ChatContext) {
  const text = normalize(question);
  const knowledge = retrieveKnowledge(text, context);
  const answerParts: string[] = [];
  const roomContext = roomContextSentence(context);

  if (roomContext) {
    answerParts.push(roomContext);
  }

  if (shouldShowRoomSearch(text)) {
    const matches = findMatchingRooms(text, context);
    if (matches.length > 0) {
      answerParts.push(
        `Phòng phù hợp nhất trong dữ liệu mẫu: ${matches
          .map((room) => `${room.title} (${room.district}, ${formatCurrency(room.price)}, ${statusLabels[room.status]}, voucher ${formatCurrency(room.voucher)})`)
          .join("; ")}.`
      );
    } else {
      answerParts.push("Chưa thấy phòng mẫu khớp hoàn toàn với khu vực/ngân sách/tiện ích bạn hỏi.");
    }
  }

  answerParts.push(buildKnowledgeAnswer(knowledge));

  if (text.includes("con phong") || text.includes("con trong") || text.includes("trong khong")) {
    answerParts.push("MVP chỉ đọc trạng thái dữ liệu mẫu; khi có backend thật vẫn cần API xác nhận trước khi chốt còn phòng.");
  }

  return answerParts.join(" ");
}
