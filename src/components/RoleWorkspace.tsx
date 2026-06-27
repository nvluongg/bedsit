"use client";

import { ClipboardCheck, Home, ListChecks, MessageSquareText, ShieldAlert, TicketPercent, UserRoundCog, UsersRound } from "lucide-react";
import type { ListingDraft, Role } from "@/types/domain";
import { roleLabels } from "@/lib/data";
import { ListingForm } from "@/components/ListingForm";

type RoleWorkspaceProps = {
  role: Role;
  onRoleChange: (role: Role) => void;
  drafts: ListingDraft[];
  onSubmitDraft: (draft: ListingDraft) => void;
};

const roleOptions: { value: Role; icon: typeof UsersRound }[] = [
  { value: "tenant", icon: UsersRound },
  { value: "owner", icon: Home },
  { value: "manager", icon: UserRoundCog }
];

export function RoleWorkspace({ role, onRoleChange, drafts, onSubmitDraft }: RoleWorkspaceProps) {
  return (
    <section className="page-band" id="vai-tro">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">
            <UsersRound aria-hidden="true" size={16} />
            3 vai trò
          </span>
          <h2>Mỗi người chỉ thấy việc mình cần xử lý</h2>
          <p>
            MVP này gom các luồng chính trong file hướng dẫn: người thuê tìm phòng,
            chủ trọ đăng tin, quản trị kiểm soát rủi ro.
          </p>
        </div>

        <div className="role-tabs" role="tablist" aria-label="Chọn vai trò">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                className={role === option.value ? "active" : ""}
                onClick={() => onRoleChange(option.value)}
              >
                <Icon aria-hidden="true" size={18} />
                {roleLabels[option.value]}
              </button>
            );
          })}
        </div>

        {role === "tenant" && (
          <div className="workspace-grid">
            <article className="workflow-item">
              <TicketPercent aria-hidden="true" size={24} />
              <h3>Voucher & giới thiệu</h3>
              <p>Hiển thị quyền lợi hoàn tiền sau thuê và thưởng giới thiệu 200.000-300.000đ.</p>
            </article>
            <article className="workflow-item">
              <MessageSquareText aria-hidden="true" size={24} />
              <h3>Hỏi AI trước khi thuê</h3>
              <p>Chatbot nhắc phí, cọc, hợp đồng, feedback và các điểm cần hỏi chủ trọ.</p>
            </article>
            <article className="workflow-item">
              <ClipboardCheck aria-hidden="true" size={24} />
              <h3>Lịch sử minh bạch</h3>
              <p>Theo dõi hợp đồng, lịch xem phòng và trạng thái tiền đã nhận.</p>
            </article>
          </div>
        )}

        {role === "owner" && (
          <div className="owner-layout">
            <ListingForm onSubmitDraft={onSubmitDraft} />
            <div className="draft-list">
              <h3>Tin nháp trong phiên</h3>
              {drafts.length === 0 ? (
                <p>Chưa có tin nháp. Chủ trọ có thể nhập thông tin phòng ở form bên cạnh.</p>
              ) : (
                drafts.map((draft, index) => (
                  <article className="draft-item" key={`${draft.title}-${index}`}>
                    <strong>{draft.title}</strong>
                    <span>
                      {draft.district} · {draft.area}m² · {draft.price.toLocaleString("vi-VN")}đ
                    </span>
                  </article>
                ))
              )}
            </div>
          </div>
        )}

        {role === "manager" && (
          <div className="workspace-grid">
            <article className="workflow-item alert">
              <ShieldAlert aria-hidden="true" size={24} />
              <h3>Rủi ro tin đăng</h3>
              <p>Đánh dấu giá bất thường, ảnh thiếu minh chứng, phí dịch vụ không rõ.</p>
            </article>
            <article className="workflow-item">
              <ListChecks aria-hidden="true" size={24} />
              <h3>Checklist duyệt tin</h3>
              <p>Kiểm tra địa chỉ, chủ sở hữu, điều khoản cọc và dữ liệu liên hệ trước khi duyệt.</p>
            </article>
            <article className="workflow-item">
              <ClipboardCheck aria-hidden="true" size={24} />
              <h3>Kiểm soát feedback</h3>
              <p>Phản hồi có ràng buộc pháp lý, cần nguồn xác minh khi có tranh chấp.</p>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
