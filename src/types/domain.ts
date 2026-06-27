export type Role = "tenant" | "owner" | "manager";

export type RoomStatus = "available" | "pending" | "booked";

export type UserProfile = {
  id: number;
  role: Role;
  name: string;
  phoneMasked: string;
  email: string;
  verified: boolean;
  district: string;
};

export type Room = {
  id: number;
  ownerId: number;
  title: string;
  district: string;
  address: string;
  price: number;
  area: number;
  depositMonths: number;
  distanceMeters: number;
  utilities: string[];
  rating: number;
  feedbackCount: number;
  voucher: number;
  status: RoomStatus;
  legalNote: string;
  highlight: string;
  availableFrom: string;
  latitude: number;
  longitude: number;
};

export type RoomImage = {
  id: number;
  roomId: number;
  url: string;
  alt: string;
  isCover: boolean;
};

export type Booking = {
  id: number;
  roomId: number;
  tenantId: number;
  ownerId: number;
  scheduleAt: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  note: string;
};

export type Feedback = {
  id: number;
  roomId: number;
  tenantId: number;
  rating: number;
  comment: string;
  rewardAmount: number;
  legalCommitment: boolean;
  status: "published" | "reviewing" | "rejected";
  createdAt: string;
};

export type Contract = {
  id: number;
  roomId: number;
  tenantId: number;
  ownerId: number;
  signedAt: string;
  monthlyRent: number;
  deposit: number;
  status: "active" | "ended" | "draft";
  ledgerStatus: "synced" | "needs_review";
};

export type Voucher = {
  id: number;
  roomId: number;
  tenantId: number;
  amount: number;
  reason: "feedback" | "referral" | "after_rent";
  status: "pending" | "approved" | "paid";
  paidAt?: string;
};

export type Conversation = {
  id: number;
  roomId: number;
  tenantId: number;
  ownerId: number;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
};

export type KnowledgeDocument = {
  id: number;
  title: string;
  source: string;
  category: "renter" | "owner" | "booking" | "voucher" | "admin";
  chunkCount: number;
};

export type ListingDraft = {
  title: string;
  district: string;
  price: number;
  area: number;
  utilities: string;
  contact: string;
  commitment: boolean;
};

export type ChatContext = {
  role: Role;
  district?: string;
  budget?: number;
  currentRoom?: Room | null;
};
