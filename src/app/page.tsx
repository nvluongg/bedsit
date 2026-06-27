"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, Bot, CalendarCheck, CheckCircle2, Home, MapPinned, Search, ShieldCheck, TicketPercent } from "lucide-react";
import { ChatAssistant } from "@/components/ChatAssistant";
import { DatabasePreview } from "@/components/DatabasePreview";
import { RoleWorkspace } from "@/components/RoleWorkspace";
import { RoomCard } from "@/components/RoomCard";
import { formatCurrency, rooms } from "@/lib/data";
import type { ListingDraft, Role, Room } from "@/types/domain";

export default function HomePage() {
  const [role, setRole] = useState<Role>("tenant");
  const [district, setDistrict] = useState("Tất cả");
  const [budget, setBudget] = useState(4500000);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(rooms[0]);
  const [drafts, setDrafts] = useState<ListingDraft[]>([]);
  const [aiQuestion, setAiQuestion] = useState("");

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) => {
        const matchDistrict = district === "Tất cả" || room.district === district;
        const matchBudget = room.price <= budget;
        return matchDistrict && matchBudget;
      }),
    [district, budget]
  );

  const districts = useMemo(() => ["Tất cả", ...Array.from(new Set(rooms.map((room) => room.district)))], []);

  function handleAskAi(room: Room) {
    setSelectedRoom(room);
    setAiQuestion(`Phòng ${room.title} có điểm gì cần hỏi trước khi thuê?`);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PhongTro AI">
          <Home aria-hidden="true" size={22} />
          PhongTro AI
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#tim-phong">Tìm phòng</a>
          <a href="#csdl">CSDL mẫu</a>
          <a href="#ai">AI</a>
          <a href="#vai-tro">Vai trò</a>
          <a href="#rag">RAG</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow">
            <ShieldCheck aria-hidden="true" size={16} />
            Tìm trọ minh bạch
          </span>
          <h1>Hỏi AI, xem feedback thật, nhận voucher sau khi thuê.</h1>
          <p>
            Một MVP cho nền tảng phòng trọ đặt quyền lợi người thuê lên trước:
            tìm phòng theo khu vực, so sánh minh bạch, lưu vết hợp đồng và giảm
            phụ thuộc vào môi giới.
          </p>
          <div className="hero-actions">
            <a className="icon-button primary" href="#tim-phong">
              <Search aria-hidden="true" size={18} />
              Tìm phòng ngay
            </a>
            <a className="icon-button" href="#ai">
              <Bot aria-hidden="true" size={18} />
              Hỏi AI
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Bản xem nhanh sản phẩm">
          <Image
            src="/phong-tro-hero.png"
            alt="Giao diện bản đồ và phòng trọ minh bạch"
            width={1200}
            height={900}
            priority
          />
          <div className="hero-ticket">
            <TicketPercent aria-hidden="true" size={20} />
            Voucher mẫu: 200.000-300.000đ
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Điểm khác biệt">
        <div>
          <strong>Feedback có trách nhiệm</strong>
          <span>Đánh giá gắn cam kết đúng sự thật.</span>
        </div>
        <div>
          <strong>Hợp đồng lưu vết</strong>
          <span>Giảm tranh chấp và hủy sai thỏa thuận.</span>
        </div>
        <div>
          <strong>AI có guardrail</strong>
          <span>Không bịa phòng, lịch hẹn hay hoàn tiền.</span>
        </div>
      </section>

      <section className="page-band" id="tim-phong">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              <MapPinned aria-hidden="true" size={16} />
              Tìm kiếm phòng
            </span>
            <h2>Lọc phòng theo ngân sách và khu vực</h2>
            <p>
              Dữ liệu mẫu giúp kiểm thử giao diện trước khi nối Spring Boot,
              PostgreSQL và API RAG trong giai đoạn tiếp theo.
            </p>
          </div>

          <div className="search-panel">
            <label>
              Khu vực
              <select value={district} onChange={(event) => setDistrict(event.target.value)}>
                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Ngân sách tối đa
              <input
                type="range"
                min="2500000"
                max="6500000"
                step="100000"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
              />
              <span className="budget-value">{formatCurrency(budget)}</span>
            </label>
            <a className="icon-button primary" href="#ket-qua">
              <ArrowDown aria-hidden="true" size={18} />
              Xem kết quả
            </a>
          </div>

          <div className="results-layout" id="ket-qua">
            <div className="room-list">
              {filteredRooms.length === 0 ? (
                <p className="empty-state">Chưa có phòng mẫu phù hợp với bộ lọc hiện tại.</p>
              ) : (
                filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    selected={selectedRoom?.id === room.id}
                    onSelect={setSelectedRoom}
                    onAskAi={handleAskAi}
                  />
                ))
              )}
            </div>

            <ChatAssistant
              context={{ role, district, budget, currentRoom: selectedRoom }}
              injectedQuestion={aiQuestion}
              onQuestionConsumed={() => setAiQuestion("")}
            />
          </div>
        </div>
      </section>

      <DatabasePreview />

      <RoleWorkspace
        role={role}
        onRoleChange={setRole}
        drafts={drafts}
        onSubmitDraft={(draft) => setDrafts((current) => [draft, ...current])}
      />

      <section className="page-band rag-band" id="rag">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              <Bot aria-hidden="true" size={16} />
              RAG roadmap
            </span>
            <h2>Luồng AI được chuẩn bị để nối backend thật</h2>
            <p>
              Bản hiện tại dùng rule-based fallback trên frontend. Khi có backend,
              luồng sẽ đi qua Spring Boot, FastAPI RAG service, pgvector và LLM.
            </p>
          </div>
          <div className="rag-flow">
            {["Frontend", "Spring Boot API", "FastAPI RAG", "pgvector + LLM"].map((step) => (
              <div key={step}>
                <CheckCircle2 aria-hidden="true" size={22} />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
