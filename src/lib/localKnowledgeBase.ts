import type { Role } from "@/types/domain";

export type KnowledgeCategory =
  | "search"
  | "comparison"
  | "booking"
  | "deposit"
  | "contract"
  | "voucher"
  | "feedback"
  | "owner"
  | "admin"
  | "safety"
  | "policy";

export type KnowledgeEntry = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  source: string;
  audience: Role[];
  keywords: string[];
  summary: string;
  checklist: string[];
  guardrail?: string;
};

export const localKnowledgeBase: KnowledgeEntry[] = [
  {
    id: "renter-search-basics",
    title: "Tìm phòng theo ngân sách và khu vực",
    category: "search",
    source: "knowledge_base/renter_guide.md",
    audience: ["tenant"],
    keywords: ["tim phong", "loc phong", "ngan sach", "duoi", "gia", "khu vuc", "cau giay", "binh thanh", "tan binh"],
    summary:
      "Khi tìm phòng, người thuê nên tính tổng chi phí thực tế gồm tiền thuê, điện, nước, internet, gửi xe, phí dịch vụ và tiền cọc, không chỉ nhìn giá thuê.",
    checklist: [
      "chọn khu vực đi học hoặc đi làm chính",
      "đặt ngân sách tối đa đã gồm phí phát sinh",
      "lọc phòng có giá, diện tích, tiện ích và trạng thái rõ",
      "ưu tiên phòng có feedback và ghi chú hợp đồng"
    ],
    guardrail: "Nếu chưa có API backend xác nhận, chatbot chỉ được nói theo dữ liệu mẫu hiện có."
  },
  {
    id: "compare-rooms",
    title: "So sánh nhiều phòng",
    category: "comparison",
    source: "knowledge_base/renter_guide.md",
    audience: ["tenant"],
    keywords: ["so sanh", "chon phong", "phong nao", "tot hon", "gan hon", "re hon", "voucher", "feedback"],
    summary:
      "Không nên chọn phòng chỉ vì rẻ nhất; nên so tổng chi phí, quãng đường, độ minh bạch hợp đồng, feedback, tiện ích và voucher.",
    checklist: [
      "so tổng chi phí mỗi tháng",
      "so khoảng cách đi học hoặc đi làm",
      "xem số lượng và chất lượng feedback",
      "kiểm tra tiền cọc và điều kiện hoàn cọc"
    ]
  },
  {
    id: "viewing-safety",
    title: "Checklist đi xem phòng an toàn",
    category: "safety",
    source: "knowledge_base/safety_checklist.md",
    audience: ["tenant"],
    keywords: ["xem phong", "di xem", "an toan", "kiem tra phong", "noi that", "tieng on", "an ninh"],
    summary:
      "Trước khi đi xem, người thuê nên lưu lịch trong hệ thống, không chuyển cọc sớm, kiểm tra hiện trạng phòng và hỏi rõ các chi phí tại chỗ.",
    checklist: [
      "kiểm tra khóa cửa, cửa sổ, nhà vệ sinh, điện nước và wifi",
      "xem chỗ gửi xe, lối thoát hiểm, camera và tiếng ồn",
      "chụp lại hiện trạng tường, sàn, thiết bị và nội thất",
      "hỏi ai chịu phí sửa chữa khi thiết bị hỏng"
    ],
    guardrail: "Nếu chủ trọ thúc chuyển cọc ngay hoặc né hợp đồng, nên dừng và báo hệ thống."
  },
  {
    id: "booking-flow",
    title: "Quy trình đặt lịch xem phòng",
    category: "booking",
    source: "knowledge_base/booking_policy.md",
    audience: ["tenant", "owner"],
    keywords: ["dat lich", "lich hen", "hen xem", "confirmed", "pending", "huy lich", "xem phong"],
    summary:
      "Luồng chuẩn là người thuê chọn phòng, chọn giờ xem, hệ thống gửi yêu cầu, chủ trọ xác nhận hoặc đề xuất giờ khác, rồi lịch chuyển trạng thái.",
    checklist: [
      "chọn phòng cụ thể trước khi đặt lịch",
      "kiểm tra giá, cọc, phí và tiện ích trước khi đi",
      "chờ trạng thái confirmed trước khi coi là lịch đã chốt",
      "không chuyển cọc chỉ để giữ lịch xem"
    ],
    guardrail: "Chatbot không được tự xác nhận lịch hẹn nếu chưa gọi API đặt lịch thật."
  },
  {
    id: "deposit-faq",
    title: "Tiền cọc và điều kiện hoàn cọc",
    category: "deposit",
    source: "knowledge_base/payment_and_deposit_faq.md",
    audience: ["tenant", "owner"],
    keywords: ["coc", "tien coc", "hoan coc", "mat coc", "dat coc", "phi", "dien", "nuoc", "internet", "gui xe"],
    summary:
      "Tiền cọc là khoản đảm bảo cho hợp đồng thuê; cần biết số tiền, điều kiện hoàn, điều kiện bị trừ, thời điểm hoàn và trách nhiệm khi hư hỏng.",
    checklist: [
      "hỏi cọc bao nhiêu tháng",
      "hỏi thời điểm hoàn cọc sau khi trả phòng",
      "hỏi trường hợp nào bị trừ cọc",
      "ghi rõ điện, nước, internet, gửi xe và phí dịch vụ"
    ],
    guardrail: "Chatbot chỉ cung cấp thông tin tham khảo, không thay thế tư vấn pháp lý."
  },
  {
    id: "contract-essentials",
    title: "Hợp đồng thuê phòng cần có gì",
    category: "contract",
    source: "knowledge_base/payment_and_deposit_faq.md",
    audience: ["tenant", "owner", "manager"],
    keywords: ["hop dong", "bien ban", "ban giao", "thoa thuan", "tranh chap", "phap ly", "ky ten"],
    summary:
      "Hợp đồng nên có thông tin các bên, địa chỉ phòng, giá thuê, tiền cọc, phí dịch vụ, thời hạn thuê, điều kiện hoàn cọc và trách nhiệm sửa chữa.",
    checklist: [
      "đối chiếu giá thuê và tiền cọc với tin đăng",
      "ghi điều kiện báo trước khi chuyển đi",
      "lập biên bản bàn giao nội thất",
      "lưu lịch sử thanh toán trong hệ thống"
    ],
    guardrail: "Với tranh chấp thật, người dùng cần kiểm tra hợp đồng và kênh hỗ trợ chính thức."
  },
  {
    id: "voucher-policy",
    title: "Voucher và hoàn tiền sau thuê",
    category: "voucher",
    source: "knowledge_base/voucher_policy.md",
    audience: ["tenant", "manager"],
    keywords: ["voucher", "hoan tien", "nhan tien", "thuong", "gioi thieu", "feedback", "chuyen khoan", "paid", "approved"],
    summary:
      "Voucher chỉ được xác nhận khi hợp đồng và giao dịch thuê hợp lệ, phòng thuộc chiến dịch áp dụng và không có dấu hiệu gian lận.",
    checklist: [
      "hoàn tất thuê phòng qua hệ thống",
      "đảm bảo hợp đồng và giao dịch đã được ghi nhận",
      "gửi feedback đúng sự thật nếu chiến dịch yêu cầu",
      "chờ admin duyệt trước khi trạng thái thành approved hoặc paid"
    ],
    guardrail: "Chatbot không được tự cam kết chuyển khoản, hoàn tiền hoặc duyệt voucher."
  },
  {
    id: "feedback-rules",
    title: "Feedback đúng quy định",
    category: "feedback",
    source: "knowledge_base/renter_guide.md",
    audience: ["tenant", "manager"],
    keywords: ["feedback", "danh gia", "binh luan", "review", "sai su that", "phap luat", "uy tin"],
    summary:
      "Feedback nên đúng sự thật, có căn cứ, tập trung vào trải nghiệm thuê phòng và không tiết lộ thông tin cá nhân của người khác.",
    checklist: [
      "nêu rõ điều đã trải nghiệm trực tiếp",
      "đính kèm bằng chứng nếu có tranh chấp",
      "không công kích cá nhân hoặc bịa thông tin",
      "không đăng số điện thoại/email riêng tư của người khác"
    ],
    guardrail: "Thông tin sai sự thật có thể làm feedback bị từ chối và gây rủi ro trách nhiệm."
  },
  {
    id: "owner-listing-quality",
    title: "Chủ trọ đăng tin chất lượng",
    category: "owner",
    source: "knowledge_base/landlord_guide.md",
    audience: ["owner", "manager"],
    keywords: ["dang tin", "chu tro", "anh phong", "mo ta", "tien ich", "sua tin", "dang phong"],
    summary:
      "Tin đăng tốt cần có giá, cọc, diện tích, địa chỉ gần đúng, tiện ích, ảnh thật, trạng thái phòng, ngày có thể dọn vào và quy định ở.",
    checklist: [
      "đăng ảnh thật của toàn phòng, nhà vệ sinh, khu bếp và nơi gửi xe",
      "công khai phí điện, nước, internet, gửi xe và dịch vụ",
      "nêu cả ưu điểm và giới hạn của phòng",
      "xác nhận lịch xem trong hệ thống để có lưu vết"
    ],
    guardrail: "Không nên yêu cầu người thuê gửi giấy tờ nhạy cảm qua chat thường."
  },
  {
    id: "admin-review",
    title: "Admin duyệt tin và kiểm soát rủi ro",
    category: "admin",
    source: "knowledge_base/admin_review_checklist.md",
    audience: ["manager"],
    keywords: ["admin", "duyet", "kiem duyet", "rui ro", "tu choi", "kiem tra", "gia bat thuong"],
    summary:
      "Admin cần kiểm tra giá, cọc, phí, ảnh, địa chỉ, chủ trọ đã xác minh, điều khoản hợp đồng và dấu hiệu yêu cầu chuyển cọc ngoài hệ thống.",
    checklist: [
      "đánh dấu giá thấp bất thường",
      "yêu cầu bổ sung nếu ảnh hoặc phí thiếu rõ ràng",
      "chuyển sang kiểm tra nếu có dấu hiệu gian lận",
      "ghi lý do khi từ chối tin"
    ],
    guardrail: "Admin không nên tự sửa nội dung cam kết thay chủ trọ."
  },
  {
    id: "listing-policy",
    title: "Chính sách trạng thái tin phòng",
    category: "policy",
    source: "knowledge_base/room_listing_policy.md",
    audience: ["tenant", "owner", "manager"],
    keywords: ["con phong", "trang thai", "available", "pending", "booked", "du lieu thieu", "tin dang"],
    summary:
      "Tin phòng có thể ở trạng thái available, pending hoặc booked; nếu pending/booked, chatbot không được nói chắc chắn phòng còn trống.",
    checklist: [
      "available nghĩa là có thể xem hoặc thuê theo dữ liệu hiện tại",
      "pending nghĩa là cần bổ sung hoặc kiểm tra dữ liệu",
      "booked nghĩa là đã có lịch hoặc hợp đồng đang xử lý",
      "thiếu dữ liệu thì phải nói rõ phần thiếu"
    ],
    guardrail: "Trạng thái thật cần được backend xác nhận trước khi chốt với người dùng."
  }
];
