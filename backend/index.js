import express from "express";
import cors from "cors";
import mockDatabase from "./mockDatabase.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", service: "bedsit-backend", version: "0.1.0" });
});

app.get("/api/rooms", (req, res) => {
  const includeReserved = req.query.includeReserved === "true";
  if (includeReserved) return res.json(mockDatabase.rooms);
  // filter out deposited/reserved rooms for public listing
  const visible = mockDatabase.rooms.filter((r) => !r.isDeposited);
  res.json(visible);
});

app.get("/api/rooms/:id", (req, res) => {
  const roomId = Number(req.params.id);
  const room = mockDatabase.rooms.find((item) => item.id === roomId);
  if (!room) {
    return res.status(404).json({ error: "Không tìm thấy phòng." });
  }
  const includeReserved = req.query.includeReserved === "true";
  if (room.isDeposited && !includeReserved) {
    return res.status(404).json({ error: "Không tìm thấy phòng." });
  }
  // attach images from roomImages if present
  const images = (mockDatabase.roomImages || []).filter((img) => img.roomId === roomId);
  res.json({ ...room, images });
});

app.post("/api/rooms/:id/schedule", (req, res) => {
  const roomId = Number(req.params.id);
  const { tenantId, scheduleAt, note } = req.body;
  const room = mockDatabase.rooms.find((r) => r.id === roomId);
  if (!room || room.isDeposited) return res.status(404).json({ error: "Phòng không khả dụng." });
  const nextId = (mockDatabase.bookings[mockDatabase.bookings.length - 1]?.id || 500) + 1;
  const booking = {
    id: nextId,
    roomId,
    tenantId: tenantId || null,
    ownerId: room.ownerId,
    scheduleAt,
    status: "pending",
    note: note || ""
  };
  mockDatabase.bookings.push(booking);
  // set room status to scheduled
  room.status = "scheduled";
  res.json({ booking, room });
});

app.post("/api/rooms/:id/deposit", (req, res) => {
  const roomId = Number(req.params.id);
  const { tenantId, amount } = req.body;
  const room = mockDatabase.rooms.find((r) => r.id === roomId);
  if (!room) return res.status(404).json({ error: "Không tìm thấy phòng." });
  if (room.isDeposited) return res.status(409).json({ error: "Phòng đã bị đặt cọc." });
  // simple deposit logic
  room.isDeposited = true;
  room.status = "reserved";
  const contractId = (mockDatabase.contracts[mockDatabase.contracts.length - 1]?.id || 800) + 1;
  const contract = {
    id: contractId,
    roomId: room.id,
    tenantId: tenantId || null,
    ownerId: room.ownerId,
    signedAt: new Date().toISOString().slice(0, 10),
    monthlyRent: room.price,
    deposit: amount || room.depositPrice || room.price * (room.depositMonths || 1),
    status: "draft",
    ledgerStatus: "pending"
  };
  mockDatabase.contracts.push(contract);
  res.json({ room, contract });
});

app.get("/api/bookings", (req, res) => {
  res.json(mockDatabase.bookings);
});

app.get("/api/feedbacks", (req, res) => {
  res.json(mockDatabase.feedbacks);
});

app.get("/api/contracts", (req, res) => {
  res.json(mockDatabase.contracts);
});

app.get("/api/vouchers", (req, res) => {
  res.json(mockDatabase.vouchers);
});

app.get("/api/users", (req, res) => {
  res.json(mockDatabase.users);
});

app.get("/api/database-summary", (req, res) => {
  res.json(mockDatabase.databaseSummary);
});

app.post("/api/chat", (req, res) => {
  const { question, context } = req.body;

  if (!question || !context) {
    return res.status(400).json({ error: "Thiếu câu hỏi hoặc context." });
  }

  const answer = `Backend chat giả lập nhận được câu hỏi: ${question}. Đang trả lời bằng dữ liệu mẫu.`;
  res.json({ answer, mode: "backend_mock", model: null });
});

app.listen(port, () => {
  console.log(`Bedsit backend listening on http://localhost:${port}`);
});
