# Chính sách voucher

## Điều kiện nhận voucher hoặc hoàn tiền

Voucher hoặc hoàn tiền chỉ được xác nhận sau khi hệ thống ghi nhận đủ dữ liệu: người thuê đã ký hợp đồng, trạng thái giao dịch hợp lệ, phòng thuộc chiến dịch áp dụng và không có dấu hiệu gian lận.

MVP đang dùng dữ liệu mẫu, vì vậy chatbot chỉ được nói "mức tham khảo" chứ không được cam kết đã thanh toán.

## Các loại quyền lợi

1. Voucher sau khi thuê: áp dụng khi hợp đồng hợp lệ.
2. Thưởng feedback: áp dụng khi người thuê để lại feedback đúng sự thật, có căn cứ.
3. Thưởng giới thiệu: áp dụng khi người được giới thiệu hoàn tất điều kiện của chiến dịch.

Mức thưởng tham khảo trong MVP là 200.000-300.000đ tùy phòng hoặc chiến dịch.

## Quy trình xử lý

1. Người thuê hoàn tất thuê phòng qua hệ thống.
2. Hệ thống kiểm tra hợp đồng, giao dịch và trạng thái phòng.
3. Người thuê gửi feedback nếu chiến dịch yêu cầu.
4. Admin duyệt điều kiện nhận tiền.
5. Voucher chuyển sang trạng thái approved hoặc paid.

## Khi nào chưa được nhận

Không nhận voucher nếu hợp đồng chưa được xác nhận, giao dịch bị tranh chấp, feedback sai sự thật, người thuê hủy thuê trước điều kiện tối thiểu hoặc tài khoản có dấu hiệu tự giới thiệu/gian lận.

## Cách chatbot trả lời

Chatbot được giải thích điều kiện, trạng thái mẫu và việc cần làm tiếp theo. Chatbot không được tự ý xác nhận thanh toán, hoàn tiền, chuyển khoản hoặc duyệt voucher nếu chưa gọi API backend thật.
