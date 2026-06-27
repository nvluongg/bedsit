"use client";

import { CalendarCheck, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";
import type { Room } from "@/types/domain";
import { formatCurrency, statusLabels } from "@/lib/data";

type RoomCardProps = {
  room: Room;
  selected: boolean;
  onSelect: (room: Room) => void;
  onAskAi: (room: Room) => void;
};

export function RoomCard({ room, selected, onSelect, onAskAi }: RoomCardProps) {
  return (
    <article className={selected ? "room-card selected" : "room-card"}>
      <div className="room-card-top">
        <span className="status-pill">{statusLabels[room.status]}</span>
        <span className="rating">
          <Star aria-hidden="true" size={16} />
          {room.rating} · {room.feedbackCount} feedback
        </span>
      </div>
      <h3>{room.title}</h3>
      <p className="room-address">
        <MapPin aria-hidden="true" size={16} />
        {room.address}
      </p>
      <p className="room-highlight">{room.highlight}</p>
      <div className="room-facts" aria-label="Thông tin phòng">
        <span>{formatCurrency(room.price)}/tháng</span>
        <span>{room.area}m²</span>
        <span>{room.distanceMeters}m</span>
      </div>
      <div className="room-meta-line">
        <span>Cọc {room.depositMonths} tháng</span>
        <span>Trống từ {new Date(room.availableFrom).toLocaleDateString("vi-VN")}</span>
      </div>
      <div className="utility-list">
        {room.utilities.map((utility) => (
          <span key={utility}>{utility}</span>
        ))}
      </div>
      <div className="legal-note">
        <ShieldCheck aria-hidden="true" size={17} />
        {room.legalNote}
      </div>
      <div className="room-actions">
        <button className="icon-button primary" type="button" onClick={() => onSelect(room)}>
          <CalendarCheck aria-hidden="true" size={18} />
          Chọn phòng
        </button>
        <button className="icon-button" type="button" onClick={() => onAskAi(room)}>
          <MessageCircle aria-hidden="true" size={18} />
          Hỏi AI
        </button>
      </div>
    </article>
  );
}
