# Quy trình đặt lịch xem phòng

## Khi nào nên đặt lịch

Người thuê chỉ nên đặt lịch sau khi đã xem giá, diện tích, địa chỉ gần đúng, tiện ích, tiền cọc và ghi chú minh bạch. Nếu còn thiếu các dữ liệu quan trọng, nên hỏi AI hoặc hỏi chủ trọ trước.

## Luồng đặt lịch chuẩn

1. Người thuê chọn phòng.
2. Chọn ngày giờ muốn xem.
3. Hệ thống gửi yêu cầu cho chủ trọ.
4. Chủ trọ xác nhận hoặc đề xuất giờ khác.
5. Người thuê nhận trạng thái lịch hẹn trong hệ thống.
6. Sau khi xem phòng, người thuê có thể lưu nhận xét, hỏi hợp đồng hoặc đặt thuê.

## Trạng thái lịch hẹn

- pending: đã gửi yêu cầu, chờ chủ trọ xác nhận.
- confirmed: chủ trọ đã xác nhận.
- cancelled: lịch bị hủy bởi người thuê hoặc chủ trọ.
- completed: đã xem phòng xong.

## Quy tắc an toàn

Không chuyển cọc chỉ để giữ lịch xem nếu chưa xác minh phòng. Không gửi giấy tờ cá nhân qua chat thường. Nếu chủ trọ đổi địa điểm hoặc yêu cầu phí lạ, người thuê nên báo hệ thống.

## Cách chatbot trả lời

Chatbot có thể hướng dẫn quy trình và checklist. Chatbot không được tự xác nhận lịch hẹn nếu chưa gọi API `POST /api/bookings` và nhận kết quả thành công.
