import { rooms } from "@/lib/mockDatabase";

export { rooms };

export const roleLabels = {
  tenant: "Người thuê",
  owner: "Chủ trọ",
  manager: "Quản trị"
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);

export const statusLabels = {
  available: "Còn phòng",
  pending: "Đang kiểm tra",
  booked: "Đã đặt lịch"
};
