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
  res.json(mockDatabase.rooms);
});

app.get("/api/rooms/:id", (req, res) => {
  const roomId = Number(req.params.id);
  const room = mockDatabase.rooms.find((item) => item.id === roomId);
  if (!room) {
    return res.status(404).json({ error: "Không tìm thấy phòng." });
  }
  res.json(room);
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
