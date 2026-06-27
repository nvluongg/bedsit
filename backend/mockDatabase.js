export const users = [
  {
    id: 1,
    role: "tenant",
    name: "Minh Anh",
    phoneMasked: "090****128",
    email: "minhanh@example.com",
    verified: true,
    district: "Cầu Giấy"
  },
  {
    id: 2,
    role: "tenant",
    name: "Quang Huy",
    phoneMasked: "091****778",
    email: "quanghuy@example.com",
    verified: true,
    district: "Bình Thạnh"
  },
  {
    id: 3,
    role: "owner",
    name: "Cô Lan",
    phoneMasked: "098****456",
    email: "colan@example.com",
    verified: true,
    district: "Cầu Giấy"
  },
  {
    id: 4,
    role: "owner",
    name: "Anh Khoa",
    phoneMasked: "093****904",
    email: "anhkhoa@example.com",
    verified: true,
    district: "Bình Thạnh"
  },
  {
    id: 5,
    role: "owner",
    name: "Chị Hạnh",
    phoneMasked: "097****223",
    email: "chihanh@example.com",
    verified: false,
    district: "Tân Bình"
  },
  {
    id: 6,
    role: "manager",
    name: "Admin Phúc",
    phoneMasked: "028****001",
    email: "admin@example.com",
    verified: true,
    district: "Hệ thống"
  }
];

export const rooms = [
  {
    id: 101,
    ownerId: 3,
    title: "Studio sáng gần Đại học Quốc gia",
    district: "Cầu Giấy",
    address: "Ngõ 165 Xuân Thủy, Cầu Giấy, Hà Nội",
    price: 3800000,
    area: 22,
    depositMonths: 1,
    distanceMeters: 420,
    utilities: ["wifi", "nhà vệ sinh riêng", "gửi xe", "máy giặt"],
    rating: 4.8,
    feedbackCount: 38,
    voucher: 250000,
    status: "available",
    legalNote: "Có hợp đồng mẫu và lịch sử phí dịch vụ",
    highlight: "Phù hợp sinh viên hoặc người mới đi làm cần khu an toàn.",
    availableFrom: "2026-07-01",
    latitude: 21.0364,
    longitude: 105.7827,
    features: ["giường", "tủ đồ", "bếp nhỏ", "máy lạnh"],
    depositPrice: 3800000,
    isDeposited: false
  },
  {
    id: 102,
    ownerId: 4,
    title: "Phòng ban công cạnh tuyến metro",
    district: "Bình Thạnh",
    address: "Đường D5, phường 25, Bình Thạnh, TP.HCM",
    price: 5200000,
    area: 28,
    depositMonths: 1,
    distanceMeters: 680,
    utilities: ["ban công", "thang máy", "bảo vệ", "bếp riêng"],
    rating: 4.7,
    feedbackCount: 24,
    voucher: 300000,
    status: "available",
    legalNote: "Chủ trọ đã xác minh giấy tờ căn hộ",
    highlight: "Gần trung tâm, hợp người đi làm cần không gian riêng.",
    availableFrom: "2026-07-05",
    latitude: 10.8037,
    longitude: 106.7149,
    features: ["ban công", "thang máy", "tủ lạnh"],
    depositPrice: 5200000,
    isDeposited: false
  },
  {
    id: 103,
    ownerId: 3,
    title: "Phòng tiết kiệm gần chợ Nghĩa Tân",
    district: "Cầu Giấy",
    address: "Nghĩa Tân, Cầu Giấy, Hà Nội",
    price: 2900000,
    area: 18,
    depositMonths: 1,
    distanceMeters: 900,
    utilities: ["wifi", "gửi xe", "giờ giấc tự do"],
    rating: 4.5,
    feedbackCount: 19,
    voucher: 200000,
    status: "pending",
    legalNote: "Đang chờ cập nhật ảnh hợp đồng",
    highlight: "Giá mềm, dễ đi học và đi làm quanh khu Cầu Giấy.",
    availableFrom: "2026-07-12",
    latitude: 21.0478,
    longitude: 105.7925,
    features: ["wifi", "gửi xe"],
    depositPrice: 2900000,
    isDeposited: false
  },
  {
    id: 104,
    ownerId: 5,
    title: "Căn hộ mini yên tĩnh gần công viên",
    district: "Tân Bình",
    address: "Bạch Đằng, Tân Bình, TP.HCM",
    price: 4600000,
    area: 25,
    depositMonths: 1,
    distanceMeters: 760,
    utilities: ["cửa sổ lớn", "máy lạnh", "bếp riêng", "camera"],
    rating: 4.6,
    feedbackCount: 31,
    voucher: 220000,
    status: "available",
    legalNote: "Có biên bản bàn giao phòng",
    highlight: "Dễ ra sân bay, khu dân cư yên tĩnh, chi phí rõ ràng.",
    availableFrom: "2026-07-03",
    latitude: 10.8128,
    longitude: 106.6641,
    features: ["cửa sổ lớn", "máy lạnh", "camera"],
    depositPrice: 4600000,
    isDeposited: false
  },
  {
    id: 105,
    ownerId: 4,
    title: "Duplex nhỏ gần Pearl Plaza",
    district: "Bình Thạnh",
    address: "Điện Biên Phủ, Bình Thạnh, TP.HCM",
    price: 6400000,
    area: 34,
    depositMonths: 2,
    distanceMeters: 520,
    utilities: ["gác lửng", "máy lạnh", "tủ lạnh", "thang máy"],
    rating: 4.9,
    feedbackCount: 17,
    voucher: 300000,
    status: "booked",
    legalNote: "Lịch đặt xem đã được xác nhận",
    highlight: "Không gian rộng hơn, phù hợp cặp đôi hoặc người làm hybrid.",
    availableFrom: "2026-08-01",
    latitude: 10.8012,
    longitude: 106.7204,
    features: ["gác lửng", "máy lạnh", "tủ lạnh"],
    depositPrice: 12800000,
    isDeposited: true
  },
  {
    id: 106,
    ownerId: 3,
    title: "Phòng mới gần công viên Cầu Giấy",
    district: "Cầu Giấy",
    address: "Duy Tân, Cầu Giấy, Hà Nội",
    price: 4300000,
    area: 24,
    depositMonths: 1,
    distanceMeters: 350,
    utilities: ["cửa sổ lớn", "máy giặt", "bếp chung", "khóa vân tay"],
    rating: 4.6,
    feedbackCount: 12,
    voucher: 230000,
    status: "available",
    legalNote: "Đã công khai bảng phí dịch vụ",
    highlight: "Gần văn phòng, phù hợp người đi làm cần di chuyển nhanh.",
    availableFrom: "2026-07-09",
    latitude: 21.0297,
    longitude: 105.7831,
    features: ["cửa sổ lớn", "máy giặt", "khóa vân tay"],
    depositPrice: 4300000,
    isDeposited: false
  },
  {
    id: 107,
    ownerId: 5,
    title: "Phòng gác lửng gần Etown",
    district: "Tân Bình",
    address: "Cộng Hòa, Tân Bình, TP.HCM",
    price: 3900000,
    area: 23,
    depositMonths: 1,
    distanceMeters: 810,
    utilities: ["gác lửng", "wifi", "giữ xe", "camera"],
    rating: 4.4,
    feedbackCount: 9,
    voucher: 200000,
    status: "pending",
    legalNote: "Cần bổ sung ảnh khu gửi xe",
    highlight: "Chi phí vừa phải, tiện đi làm khu sân bay và Etown.",
    availableFrom: "2026-07-15",
    latitude: 10.8019,
    longitude: 106.6461,
    features: ["gác lửng", "wifi", "camera"],
    depositPrice: 3900000,
    isDeposited: false
  }
];

export const roomImages = [
  { id: 1, roomId: 101, url: "/phong-tro-hero.png", alt: "Studio sáng", isCover: true },
  { id: 2, roomId: 102, url: "/phong-tro-hero.png", alt: "Phòng ban công", isCover: true },
  { id: 3, roomId: 103, url: "/phong-tro-hero.png", alt: "Phòng tiết kiệm", isCover: true },
  { id: 4, roomId: 104, url: "/phong-tro-hero.png", alt: "Căn hộ mini", isCover: true },
  { id: 5, roomId: 105, url: "/phong-tro-hero.png", alt: "Duplex nhỏ", isCover: true }
];

export const bookings = [
  {
    id: 501,
    roomId: 101,
    tenantId: 1,
    ownerId: 3,
    scheduleAt: "2026-07-02T09:30:00+07:00",
    status: "confirmed",
    note: "Người thuê muốn hỏi kỹ phí điện nước."
  },
  {
    id: 502,
    roomId: 102,
    tenantId: 2,
    ownerId: 4,
    scheduleAt: "2026-07-03T18:00:00+07:00",
    status: "pending",
    note: "Chờ chủ trọ xác nhận giờ xem sau 18h."
  },
  {
    id: 503,
    roomId: 105,
    tenantId: 1,
    ownerId: 4,
    scheduleAt: "2026-07-05T10:00:00+07:00",
    status: "completed",
    note: "Đã xem phòng, đang chờ hợp đồng nháp."
  }
];

export const feedbacks = [
  {
    id: 701,
    roomId: 101,
    tenantId: 1,
    rating: 5,
    comment: "Phòng sáng, chủ phản hồi nhanh, phí dịch vụ khớp hợp đồng.",
    rewardAmount: 250000,
    legalCommitment: true,
    status: "published",
    createdAt: "2026-06-18"
  },
  {
    id: 702,
    roomId: 102,
    tenantId: 2,
    rating: 4,
    comment: "Vị trí tiện, cần hỏi thêm về tiếng ồn buổi tối.",
    rewardAmount: 200000,
    legalCommitment: true,
    status: "reviewing",
    createdAt: "2026-06-21"
  },
  {
    id: 703,
    roomId: 104,
    tenantId: 1,
    rating: 5,
    comment: "Khu yên tĩnh, hợp đồng có biên bản bàn giao rõ.",
    rewardAmount: 220000,
    legalCommitment: true,
    status: "published",
    createdAt: "2026-06-24"
  }
];

export const contracts = [
  {
    id: 801,
    roomId: 101,
    tenantId: 1,
    ownerId: 3,
    signedAt: "2026-06-20",
    monthlyRent: 3800000,
    deposit: 3800000,
    status: "active",
    ledgerStatus: "synced"
  },
  {
    id: 802,
    roomId: 105,
    tenantId: 1,
    ownerId: 4,
    signedAt: "2026-06-25",
    monthlyRent: 6400000,
    deposit: 12800000,
    status: "draft",
    ledgerStatus: "needs_review"
  }
];

export const vouchers = [
  {
    id: 901,
    roomId: 101,
    tenantId: 1,
    amount: 250000,
    reason: "after_rent",
    status: "paid",
    paidAt: "2026-06-22"
  },
  {
    id: 902,
    roomId: 104,
    tenantId: 1,
    amount: 220000,
    reason: "feedback",
    status: "approved"
  },
  {
    id: 903,
    roomId: 102,
    tenantId: 2,
    amount: 300000,
    reason: "referral",
    status: "pending"
  }
];

export const conversations = [
  {
    id: 1001,
    roomId: 101,
    tenantId: 1,
    ownerId: 3,
    lastMessage: "Em muốn xem phòng sáng mai được không ạ?",
    unreadCount: 1,
    updatedAt: "2026-06-26T20:10:00+07:00"
  },
  {
    id: 1002,
    roomId: 102,
    tenantId: 2,
    ownerId: 4,
    lastMessage: "Anh gửi giúp em bảng phí dịch vụ nhé.",
    unreadCount: 0,
    updatedAt: "2026-06-26T18:42:00+07:00"
  }
];

export const knowledgeDocuments = [
  {
    id: 1101,
    title: "Hướng dẫn người thuê",
    source: "knowledge_base/renter_guide.md",
    category: "renter",
    chunkCount: 14
  },
  {
    id: 1102,
    title: "Chính sách voucher",
    source: "knowledge_base/voucher_policy.md",
    category: "voucher",
    chunkCount: 10
  },
  {
    id: 1103,
    title: "Checklist quản trị",
    source: "knowledge_base/admin_review_checklist.md",
    category: "admin",
    chunkCount: 12
  },
  {
    id: 1104,
    title: "Quy trình đặt lịch xem phòng",
    source: "knowledge_base/booking_policy.md",
    category: "booking",
    chunkCount: 8
  },
  {
    id: 1105,
    title: "FAQ tiền cọc và hợp đồng",
    source: "knowledge_base/payment_and_deposit_faq.md",
    category: "renter",
    chunkCount: 11
  },
  {
    id: 1106,
    title: "Checklist đi xem phòng an toàn",
    source: "knowledge_base/safety_checklist.md",
    category: "renter",
    chunkCount: 9
  },
  {
    id: 1107,
    title: "Chính sách tin đăng phòng",
    source: "knowledge_base/room_listing_policy.md",
    category: "owner",
    chunkCount: 9
  },
  {
    id: 1108,
    title: "Hướng dẫn chủ trọ",
    source: "knowledge_base/landlord_guide.md",
    category: "owner",
    chunkCount: 13
  }
];

export const databaseSummary = {
  users: users.length,
  rooms: rooms.length,
  bookings: bookings.length,
  feedbacks: feedbacks.length,
  contracts: contracts.length,
  vouchers: vouchers.length,
  knowledgeDocuments: knowledgeDocuments.length
};

export default {
  users,
  rooms,
  roomImages,
  bookings,
  feedbacks,
  contracts,
  vouchers,
  conversations,
  knowledgeDocuments,
  databaseSummary
};
