"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import type { Room } from "@/types/domain";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Props = {
  roomId: number;
  onClose: () => void;
  onUpdated?: (room: Room) => void;
};

export function RoomDetail({ roomId, onClose, onUpdated }: Props) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scheduling, setScheduling] = useState(false);
  const [scheduleAt, setScheduleAt] = useState("");
  const [depositing, setDepositing] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/rooms/${roomId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Không tải được chi tiết phòng.");
        return r.json();
      })
      .then((data) => setRoom(data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [roomId]);

  if (loading) return <div className="room-detail">Đang tải...</div>;
  if (error) return <div className="room-detail error">{error}</div>;
  if (!room) return <div className="room-detail">Không có dữ liệu.</div>;

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    setScheduling(true);
    fetch(`${API_BASE_URL}/api/rooms/${room.id}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantId: 1, scheduleAt, note: "Đặt lịch xem từ giao diện demo" })
    })
      .then((r) => r.json())
      .then((resp) => {
        setRoom((cur) => (cur ? { ...cur, status: resp.room?.status ?? cur.status } : cur));
        if (onUpdated && resp.room) onUpdated(resp.room);
        setScheduling(false);
        alert("Đã gửi yêu cầu đặt lịch. Chủ trọ sẽ xác nhận.");
      })
      .catch((err) => {
        console.error(err);
        setScheduling(false);
        alert("Lỗi khi đặt lịch.");
      });
  }

  function handleDeposit() {
    if (!confirm(`Xác nhận đặt cọc ${room.depositPrice?.toLocaleString("vi-VN")}đ cho phòng này?`)) return;
    setDepositing(true);
    fetch(`${API_BASE_URL}/api/rooms/${room.id}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantId: 1, amount: room.depositPrice })
    })
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).error || "Lỗi đặt cọc");
        return r.json();
      })
      .then((resp) => {
        setRoom(resp.room);
        if (onUpdated && resp.room) onUpdated(resp.room);
        setDepositing(false);
        alert("Đặt cọc thành công. Phòng đã được tạm giữ.");
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setDepositing(false);
        alert("Không thể đặt cọc: " + err.message);
      });
  }

  return (
    <div className="room-detail panel">
      <button className="close" onClick={onClose} aria-label="Đóng">✕</button>
      <h3>{room.title}</h3>
      <div className="room-images">
        {(room.images || []).length > 0 ? (
          (room.images || []).map((img: any) => (
            <div key={img.url} className="img-wrap">
              <img src={img.url} alt={img.alt || room.title} />
            </div>
          ))
        ) : (
          <div className="img-wrap">
            <img src="/phong-tro-hero.png" alt={room.title} />
          </div>
        )}
      </div>

      <div className="room-info">
        <p className="address">{room.address}</p>
        <div className="facts">
          <div>Giá: {room.price?.toLocaleString("vi-VN")} đ / tháng</div>
          <div>Diện tích: {room.area} m²</div>
          <div>Cọc: {room.depositMonths} tháng · Giá cọc: {room.depositPrice?.toLocaleString("vi-VN")} đ</div>
          <div>Trạng thái: {room.status}</div>
        </div>

        <div className="features">
          <strong>Tiện nghi & Thông tin</strong>
          <ul>
            {(room.features || []).map((f: string) => (
              <li key={f}>{f}</li>
            ))}
            {(room.utilities || []).map((u: string) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>

        <div className="actions">
          <form onSubmit={handleSchedule} className="schedule-form">
            <label>
              Chọn ngày giờ xem
              <input
                required
                type="datetime-local"
                value={scheduleAt}
                onChange={(e) => setScheduleAt(e.target.value)}
              />
            </label>
            <button className="icon-button primary" type="submit" disabled={scheduling}>
              <CalendarCheck aria-hidden="true" /> Đặt lịch xem
            </button>
          </form>

          <div className="deposit">
            <button className="icon-button" type="button" onClick={handleDeposit} disabled={room.isDeposited || depositing}>
              Đặt cọc {room.depositPrice?.toLocaleString("vi-VN")} đ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
