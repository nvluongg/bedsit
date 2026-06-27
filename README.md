# PhongTro AI Startup

MVP web phòng trọ dựa trên file hướng dẫn `hướng dẫn code tạo website startup2026.md`.

Ứng dụng hiện có:

- Trang tìm phòng theo khu vực và ngân sách.
- Danh sách phòng mẫu có feedback, voucher, trạng thái và ghi chú minh bạch.
- Chatbot AI fallback chạy local bằng rule/keyword, chưa cần API key.
- API route `/api/chat` có thể gọi GPT API server-side nếu có `OPENAI_API_KEY`.
- Khu làm việc cho 3 vai trò: người thuê, chủ trọ, quản trị.
- Form đăng tin của chủ trọ dùng React Hook Form + Zod để kiểm tra dữ liệu.
- Cơ sở dữ liệu giả lập cho phòng trọ, người dùng, booking, feedback, hợp đồng và voucher.
- Cấu trúc sẵn để nối Spring Boot, FastAPI RAG, PostgreSQL/pgvector ở giai đoạn sau.

## Công nghệ đã dùng

- Next.js + React + TypeScript
- Tailwind CSS
- Lucide React Icons
- React Hook Form
- Zod

## Cách chạy local

Máy cần có Node.js 18+ và pnpm.

```bash
pnpm install
pnpm dev
```

Mở trình duyệt tại:

```txt
http://localhost:3000
```

Nếu terminal chưa nhận `node` hoặc `pnpm`, hãy cài Node.js LTS trước. Trong phiên Codex hiện tại, dự án đã được cài bằng runtime đi kèm và có thể chạy bằng cách thêm runtime đó vào PATH:

```bash
export PATH="/Users/letrang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/letrang/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin:$PATH"
WATCHPACK_POLLING=true pnpm dev
```

Nếu gặp lỗi `EMFILE: too many open files, watch`, hãy chạy dev server với `WATCHPACK_POLLING=true` như lệnh trên.

Nếu muốn build kiểm tra bản production:

```bash
pnpm build
pnpm start
```

## File quan trọng

```txt
src/app/page.tsx              # Trang MVP chính
src/app/globals.css           # Giao diện responsive
src/components/ChatAssistant.tsx
src/components/RoleWorkspace.tsx
src/components/ListingForm.tsx
src/components/RoomCard.tsx
src/components/DatabasePreview.tsx
src/lib/mockDatabase.ts       # Cơ sở dữ liệu giả lập
src/lib/data.ts               # Helper format và re-export dữ liệu phòng
src/lib/chatbot.ts            # Chatbot fallback local
src/lib/localKnowledgeBase.ts # Tri thức đã cấu trúc cho chatbot MVP
src/app/api/chat/route.ts     # API chat gọi GPT hoặc fallback local
knowledge_base/               # Tài liệu mẫu cho RAG
```

## Cơ sở dữ liệu giả lập

Dữ liệu mẫu hiện nằm trong `src/lib/mockDatabase.ts`. File này mô phỏng các bảng:

```txt
users                 # Người thuê, chủ trọ, quản trị
rooms                 # Tin phòng trọ
roomImages            # Ảnh phòng
bookings              # Lịch hẹn xem phòng
feedbacks             # Đánh giá phòng
contracts             # Hợp đồng và trạng thái giao dịch
vouchers              # Hoàn tiền / voucher
conversations         # Tin nhắn người thuê - chủ trọ
knowledgeDocuments    # Tài liệu tri thức cho RAG
```

Một số quan hệ mẫu:

```txt
rooms.ownerId -> users.id
bookings.roomId -> rooms.id
feedbacks.tenantId -> users.id
contracts.roomId -> rooms.id
vouchers.tenantId -> users.id
```

Khi nối backend thật, có thể chuyển các mảng này thành bảng PostgreSQL tương ứng.

## Knowledge base và chatbot

Knowledge base markdown đã được tách theo từng chủ đề để sau này ingest vào RAG:

```txt
knowledge_base/renter_guide.md
knowledge_base/landlord_guide.md
knowledge_base/room_listing_policy.md
knowledge_base/booking_policy.md
knowledge_base/payment_and_deposit_faq.md
knowledge_base/safety_checklist.md
knowledge_base/admin_review_checklist.md
knowledge_base/voucher_policy.md
```

Trong MVP frontend, chatbot chưa đọc file markdown trực tiếp. Thay vào đó, `src/lib/localKnowledgeBase.ts` là bản tri thức đã cấu trúc từ các file trên để chatbot fallback có thể tra cứu theo keyword, vai trò và phòng đang chọn.

Chatbot trên giao diện gọi route nội bộ `/api/chat`. Route này chạy ở server:

- Nếu có `OPENAI_API_KEY`, route gọi GPT API qua OpenAI Responses API.
- Nếu chưa có key hoặc GPT API lỗi, route tự fallback sang `src/lib/chatbot.ts`.
- API key không được gửi xuống frontend.

Chatbot hiện có thể trả lời tốt hơn cho các nhóm câu hỏi:

- Tìm phòng theo khu vực, ngân sách và tiện ích.
- So sánh phòng theo giá, feedback, voucher và trạng thái.
- Checklist đi xem phòng an toàn.
- Tiền cọc, hợp đồng, phí điện nước, internet, gửi xe.
- Quy trình đặt lịch xem phòng.
- Voucher, hoàn tiền, feedback đúng quy định.
- Chủ trọ đăng tin và admin duyệt tin.

## Roadmap hackathon

Mục tiêu hackathon: demo được một luồng tìm phòng minh bạch có AI hỗ trợ, cho thấy khác biệt rõ về chất lượng phòng, quyền lợi người thuê và khả năng mở rộng thành hệ thống thật.

### Ưu tiên P0 - phải có để demo

- Hoàn thiện luồng người thuê: lọc phòng, chọn phòng, hỏi AI, xem voucher, xem feedback và checklist hợp đồng.
- Thêm trạng thái đặt lịch mẫu: `pending`, `confirmed`, `completed`, kèm timeline rõ trong UI.
- Cho chatbot trả lời có cấu trúc hơn: trả lời trực tiếp, dữ liệu phòng liên quan, checklist hành động, lưu ý guardrail.
- Tạo màn hình chi tiết phòng: ảnh, giá, cọc, phí dịch vụ, tiện ích, feedback, voucher và câu hỏi gợi ý.
- Thêm mock API layer trong frontend để tách UI khỏi dữ liệu tĩnh, chuẩn bị nối backend thật.
- Làm demo script 3 phút: nỗi đau thị trường, cách tìm phòng, hỏi AI, nhận voucher, quyền lợi minh bạch.
- Kiểm tra responsive mobile vì hackathon thường demo nhanh trên nhiều màn hình.

### Ưu tiên P1 - tăng điểm sản phẩm

- Thêm luồng chủ trọ đăng tin đầy đủ hơn: upload ảnh giả lập, phí điện nước, quy định ở, ngày trống phòng.
- Thêm dashboard quản trị: tin cần duyệt, feedback cần kiểm tra, voucher chờ duyệt, cảnh báo rủi ro.
- Hiển thị nguồn tri thức chatbot đã dùng, ví dụ `renter_guide.md` hoặc `voucher_policy.md`.
- Thêm bộ câu hỏi test chatbot: tìm phòng, cọc, hợp đồng, đặt lịch, voucher, feedback, chủ trọ, admin.
- Thêm local persistence bằng `localStorage` cho tin nháp, lịch hẹn và lịch sử chat trong phiên demo.
- Cải thiện dữ liệu mẫu để giống thị trường thật hơn: nhiều quận, nhiều mức giá, phòng tốt/xấu rõ ràng.
- Thêm trạng thái loading/error cho các hành động như đặt lịch, lưu tin, hỏi AI.

### Ưu tiên P2 - nếu còn thời gian

- Tạo FastAPI RAG service tối giản đọc `knowledge_base/` và trả lời qua endpoint `/rag/answer`.
- Tạo Spring Boot API skeleton cho `rooms`, `bookings`, `vouchers`, `feedbacks`.
- Thêm Docker Compose cho frontend, backend, rag-service và PostgreSQL.
- Thêm migration SQL mẫu cho PostgreSQL: users, rooms, bookings, feedbacks, contracts, vouchers.
- Thêm OpenAPI/Swagger mock để trình bày kiến trúc backend.
- Thêm Playwright test cho luồng demo chính.
- Chuẩn bị deploy demo public bằng Vercel hoặc nền tảng tương đương.

### Kịch bản demo đề xuất

1. Mở trang chủ và nói vấn đề: người thuê khó biết phòng nào thật sự ổn, chi phí thiếu minh bạch, quyền lợi sau thuê mờ.
2. Lọc phòng dưới 4 triệu ở Cầu Giấy.
3. Chọn một phòng và hỏi AI: "Phòng này còn trống và cần hỏi gì trước khi thuê?"
4. Cho thấy AI dùng dữ liệu phòng, trạng thái, cọc, feedback và guardrail thay vì cam kết bừa.
5. Chuyển sang CSDL mẫu để chứng minh có model dữ liệu cho phòng, lịch hẹn, feedback, hợp đồng, voucher.
6. Chuyển sang vai trò chủ trọ để tạo tin nháp.
7. Chuyển sang vai trò quản trị để nói cách duyệt tin, kiểm soát feedback và voucher.
8. Kết luận: MVP chứng minh hướng sản phẩm; bước tiếp theo là nối backend/RAG thật.

### Tiêu chí nên nhấn mạnh với ban giám khảo

- Tác động thực tế: giảm rủi ro mất cọc, giảm thông tin sai, tăng minh bạch cho người thuê.
- Khác biệt: không chỉ tìm phòng, mà còn feedback có trách nhiệm, hợp đồng lưu vết và voucher sau thuê.
- AI có kiểm soát: chatbot không tự xác nhận còn phòng, đặt lịch, hoàn tiền nếu chưa có API thật.
- Khả năng mở rộng: dữ liệu đã tách theo bảng, knowledge base đã tách file, có hướng nối RAG/backend.
- Demo rõ: người xem hiểu được sản phẩm trong vài phút mà không cần giải thích kỹ thuật quá sâu.

### Rủi ro cần xử lý trước khi nộp

- Chatbot trả lời quá dài: cần giới hạn câu trả lời thành 3-5 ý chính.
- Dữ liệu mẫu quá ít: cần đủ phòng để demo lọc và so sánh.
- UI quá nhiều chữ: phần demo nên ưu tiên luồng thao tác, không biến trang thành tài liệu.
- Chưa có backend thật: cần nói rõ đây là MVP, các hành động nhạy cảm đang là mock/local state.
- Voucher dễ bị hiểu nhầm là cam kết tiền thật: luôn ghi là mức tham khảo trong demo.

## Biến môi trường

Sao chép `.env.example` thành `.env.local` khi bắt đầu nối backend thật.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_RAG_API_URL=http://localhost:8000
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` chỉ dùng ở phía server trong `/api/chat`, không được đặt prefix `NEXT_PUBLIC_`.

## Ghi chú triển khai tiếp

Bản này là frontend MVP chạy độc lập. Các hành động như xác nhận còn phòng, đặt lịch, thanh toán, duyệt tin và hoàn tiền đang được trình bày như mock/local state. Khi triển khai thật, cần nối:

- Spring Boot REST API cho phòng, booking, user, hợp đồng, voucher.
- FastAPI RAG service cho chatbot.
- PostgreSQL + pgvector cho dữ liệu và embedding.
- Cloudinary/S3 cho ảnh phòng.
