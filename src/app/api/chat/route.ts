import { NextResponse } from "next/server";
import { askLocalCoach } from "@/lib/chatbot";
import { formatCurrency, statusLabels } from "@/lib/data";
import type { ChatContext } from "@/types/domain";

export const runtime = "nodejs";

type ChatRequest = {
  question?: string;
  context?: ChatContext;
};

type OpenAIContent = {
  type?: string;
  text?: string;
};

type OpenAIOutputItem = {
  type?: string;
  content?: OpenAIContent[];
};

type OpenAIResponseBody = {
  output_text?: string;
  output?: OpenAIOutputItem[];
  error?: {
    message?: string;
  };
};

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";

function isValidContext(context: unknown): context is ChatContext {
  if (!context || typeof context !== "object") return false;
  const role = (context as ChatContext).role;
  return role === "tenant" || role === "owner" || role === "manager";
}

function extractOutputText(data: OpenAIResponseBody) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const textBlocks = data.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter((text): text is string => Boolean(text?.trim()));

  return textBlocks?.join("\n").trim() ?? "";
}

function buildRoomContext(context: ChatContext) {
  const room = context.currentRoom;
  if (!room) return "Người dùng chưa chọn phòng cụ thể.";

  return [
    `Phòng đang chọn: ${room.title}`,
    `Khu vực: ${room.district}`,
    `Địa chỉ: ${room.address}`,
    `Giá: ${formatCurrency(room.price)}/tháng`,
    `Diện tích: ${room.area}m²`,
    `Cọc: ${room.depositMonths} tháng`,
    `Trạng thái: ${statusLabels[room.status]}`,
    `Voucher tham khảo: ${formatCurrency(room.voucher)}`,
    `Feedback: ${room.rating}/5 từ ${room.feedbackCount} lượt`,
    `Ghi chú minh bạch: ${room.legalNote}`
  ].join("\n");
}

function buildPrompt(question: string, context: ChatContext, fallbackAnswer: string) {
  return [
    "Bạn là trợ lý AI tiếng Việt cho MVP PhongTro AI, một nền tảng tìm phòng trọ minh bạch.",
    "Trả lời ngắn gọn, thực tế, thân thiện. Ưu tiên quyền lợi người thuê nhưng vẫn công bằng với chủ trọ.",
    "Luôn tuân thủ guardrail: không khẳng định phòng chắc chắn còn trống nếu chưa có API backend xác nhận; không tự xác nhận đặt lịch, thanh toán, hoàn tiền, duyệt tin; không đưa lời khuyên pháp lý như luật sư; không yêu cầu giấy tờ nhạy cảm qua chat thường.",
    "Nếu thiếu dữ liệu, nói rõ thiếu gì và đề xuất bước tiếp theo.",
    "Cấu trúc câu trả lời nên gồm: trả lời trực tiếp, dữ liệu liên quan, checklist 3-5 ý, lưu ý an toàn nếu cần.",
    "",
    `Vai trò hiện tại: ${context.role}`,
    `Khu vực đang lọc: ${context.district ?? "chưa chọn"}`,
    `Ngân sách đang lọc: ${context.budget ? formatCurrency(context.budget) : "chưa chọn"}`,
    buildRoomContext(context),
    "",
    "Câu trả lời fallback từ knowledge base local để tham khảo:",
    fallbackAnswer,
    "",
    `Câu hỏi của người dùng: ${question}`
  ].join("\n");
}

export async function POST(request: Request) {
  let payload: ChatRequest;

  try {
    payload = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ." }, { status: 400 });
  }

  const question = payload.question?.trim();
  const context = payload.context;

  if (!question || !isValidContext(context)) {
    return NextResponse.json({ error: "Thiếu câu hỏi hoặc context chat." }, { status: 400 });
  }

  const fallbackAnswer = askLocalCoach(question, context);
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json({
      answer: fallbackAnswer,
      mode: "local_fallback",
      model: null
    });
  }

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: buildPrompt(question, context, fallbackAnswer),
        max_output_tokens: 700
      })
    });

    const data = (await response.json()) as OpenAIResponseBody;

    if (!response.ok) {
      return NextResponse.json({
        answer: fallbackAnswer,
        mode: "gpt_error_fallback",
        model,
        error: data.error?.message ?? "OpenAI API trả về lỗi."
      });
    }

    const answer = extractOutputText(data);

    return NextResponse.json({
      answer: answer || fallbackAnswer,
      mode: answer ? "openai" : "gpt_empty_fallback",
      model
    });
  } catch {
    return NextResponse.json({
      answer: fallbackAnswer,
      mode: "gpt_error_fallback",
      model,
      error: "Không gọi được OpenAI API."
    });
  }
}
