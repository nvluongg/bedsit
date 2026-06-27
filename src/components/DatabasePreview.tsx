"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Database, Home, MessageSquareQuote, TicketPercent, UsersRound } from "lucide-react";
import { formatCurrency, roleLabels, statusLabels } from "@/lib/data";
import {
  bookings,
  contracts,
  databaseSummary,
  feedbacks,
  knowledgeDocuments,
  rooms,
  users,
  vouchers
} from "@/lib/mockDatabase";

type TableName = "rooms" | "users" | "bookings" | "feedbacks" | "vouchers";

const tableOptions: { id: TableName; label: string; icon: typeof Home }[] = [
  { id: "rooms", label: "rooms", icon: Home },
  { id: "users", label: "users", icon: UsersRound },
  { id: "bookings", label: "bookings", icon: CalendarClock },
  { id: "feedbacks", label: "feedbacks", icon: MessageSquareQuote },
  { id: "vouchers", label: "vouchers", icon: TicketPercent }
];

export function DatabasePreview() {
  const [activeTable, setActiveTable] = useState<TableName>("rooms");

  const roomById = useMemo(() => new Map(rooms.map((room) => [room.id, room])), []);
  const userById = useMemo(() => new Map(users.map((user) => [user.id, user])), []);
  const approvedVoucherTotal = vouchers
    .filter((voucher) => voucher.status === "approved" || voucher.status === "paid")
    .reduce((sum, voucher) => sum + voucher.amount, 0);

  return (
    <section className="page-band database-band" id="csdl">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">
            <Database aria-hidden="true" size={16} />
            CSDL giả lập
          </span>
          <h2>Một ít dữ liệu mẫu để mô phỏng database phòng trọ</h2>
          <p>
            Đây chưa phải database thật. Mỗi bảng đang là dữ liệu TypeScript trong
            frontend, có khóa id để sau này chuyển sang PostgreSQL dễ hơn.
          </p>
        </div>

        <div className="database-metrics" aria-label="Tổng quan dữ liệu mẫu">
          <div>
            <strong>{databaseSummary.rooms}</strong>
            <span>phòng trọ</span>
          </div>
          <div>
            <strong>{databaseSummary.users}</strong>
            <span>người dùng</span>
          </div>
          <div>
            <strong>{databaseSummary.bookings}</strong>
            <span>lịch xem</span>
          </div>
          <div>
            <strong>{databaseSummary.feedbacks}</strong>
            <span>feedback</span>
          </div>
          <div>
            <strong>{formatCurrency(approvedVoucherTotal)}</strong>
            <span>voucher đã duyệt/trả</span>
          </div>
        </div>

        <div className="database-layout">
          <aside className="schema-panel" aria-label="Schema mẫu">
            <h3>Schema mô phỏng</h3>
            <ul>
              <li>
                <code>rooms.ownerId</code>
                <span>liên kết tới users chủ trọ</span>
              </li>
              <li>
                <code>bookings.roomId</code>
                <span>lịch xem phòng theo từng tin</span>
              </li>
              <li>
                <code>feedbacks.tenantId</code>
                <span>người từng thuê để lại đánh giá</span>
              </li>
              <li>
                <code>contracts.roomId</code>
                <span>hợp đồng và lịch sử giao dịch</span>
              </li>
              <li>
                <code>knowledgeDocuments</code>
                <span>nguồn tri thức cho RAG</span>
              </li>
            </ul>
            <p>
              Hiện có {contracts.length} hợp đồng mẫu và {knowledgeDocuments.length} tài liệu tri thức.
            </p>
          </aside>

          <div className="table-panel">
            <div className="table-tabs" role="tablist" aria-label="Bảng dữ liệu mẫu">
              {tableOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={activeTable === option.id ? "active" : ""}
                    onClick={() => setActiveTable(option.id)}
                  >
                    <Icon aria-hidden="true" size={16} />
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="data-table-wrap">
              {activeTable === "rooms" && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Phòng</th>
                      <th>Chủ trọ</th>
                      <th>Khu vực</th>
                      <th>Giá</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td>#{room.id}</td>
                        <td>{room.title}</td>
                        <td>{userById.get(room.ownerId)?.name}</td>
                        <td>{room.district}</td>
                        <td>{formatCurrency(room.price)}</td>
                        <td>{statusLabels[room.status]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTable === "users" && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Vai trò</th>
                      <th>Khu vực</th>
                      <th>Liên hệ</th>
                      <th>Xác minh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>#{user.id}</td>
                        <td>{user.name}</td>
                        <td>{roleLabels[user.role]}</td>
                        <td>{user.district}</td>
                        <td>{user.phoneMasked}</td>
                        <td>{user.verified ? "Đã xác minh" : "Cần kiểm tra"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTable === "bookings" && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Phòng</th>
                      <th>Người thuê</th>
                      <th>Thời gian</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>#{booking.id}</td>
                        <td>{roomById.get(booking.roomId)?.title}</td>
                        <td>{userById.get(booking.tenantId)?.name}</td>
                        <td>{new Date(booking.scheduleAt).toLocaleString("vi-VN")}</td>
                        <td>{booking.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTable === "feedbacks" && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Phòng</th>
                      <th>Điểm</th>
                      <th>Feedback</th>
                      <th>Thưởng</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((feedback) => (
                      <tr key={feedback.id}>
                        <td>#{feedback.id}</td>
                        <td>{roomById.get(feedback.roomId)?.title}</td>
                        <td>{feedback.rating}/5</td>
                        <td>{feedback.comment}</td>
                        <td>{formatCurrency(feedback.rewardAmount)}</td>
                        <td>{feedback.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTable === "vouchers" && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Người nhận</th>
                      <th>Phòng</th>
                      <th>Số tiền</th>
                      <th>Lý do</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vouchers.map((voucher) => (
                      <tr key={voucher.id}>
                        <td>#{voucher.id}</td>
                        <td>{userById.get(voucher.tenantId)?.name}</td>
                        <td>{roomById.get(voucher.roomId)?.title}</td>
                        <td>{formatCurrency(voucher.amount)}</td>
                        <td>{voucher.reason}</td>
                        <td>{voucher.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
