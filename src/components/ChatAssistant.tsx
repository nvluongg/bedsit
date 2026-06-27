"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import type { ChatContext } from "@/types/domain";

type ChatMessage = {
  id: number;
  author: "user" | "assistant";
  text: string;
  meta?: string;
};

type ChatApiResponse = {
  answer?: string;
  mode?: "openai" | "local_fallback" | "gpt_error_fallback" | "gpt_empty_fallback";
  model?: string | null;
  error?: string;
};

type ChatAssistantProps = {
  context: ChatContext;
  injectedQuestion?: string;
  onQuestionConsumed?: () => void;
};

export function ChatAssistant({ context, injectedQuestion, onQuestionConsumed }: ChatAssistantProps) {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      author: "assistant",
      text: "Chào bạn, tôi có thể giúp lọc phòng, so sánh voucher, nhắc checklist hợp đồng và hướng dẫn đặt lịch xem phòng."
    }
  ]);

  const quickPrompts = useMemo(
    () => [
      "Tôi muốn tìm phòng dưới 4 triệu ở Cầu Giấy",
      "Phòng này còn trống và cần hỏi gì trước khi thuê?",
      "Tiền cọc và hợp đồng cần kiểm tra gì?",
      "Chủ trọ đăng tin thế nào để dễ được duyệt?",
      "Làm sao để nhận voucher sau khi thuê?"
    ],
    []
  );

  const submitQuestion = useCallback(async (value: string) => {
    const cleanQuestion = value.trim();
    if (!cleanQuestion || isLoading) return;

    const userMessageId = Date.now();
    const assistantMessageId = userMessageId + 1;
    setMessages((current) => [
      ...current,
      { id: userMessageId, author: "user", text: cleanQuestion },
      { id: assistantMessageId, author: "assistant", text: "Đang hỏi AI..." }
    ]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: cleanQuestion,
          context
        })
      });

      const data = (await response.json()) as ChatApiResponse;
      const sourceLabel =
        data.mode === "openai"
          ? `GPT API · ${data.model}`
          : data.mode === "local_fallback"
            ? "Fallback local · chưa có OPENAI_API_KEY"
            : "Fallback local · GPT API lỗi";

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: data.answer || data.error || "Chưa có câu trả lời.",
                meta: sourceLabel
              }
            : message
        )
      );
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: "Không gọi được API chat. Vui lòng thử lại sau.",
                meta: "Lỗi kết nối"
              }
            : message
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [context, isLoading]);

  useEffect(() => {
    if (!injectedQuestion) return;
    submitQuestion(injectedQuestion);
    onQuestionConsumed?.();
  }, [injectedQuestion, onQuestionConsumed, submitQuestion]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(question);
  }

  return (
    <section className="assistant-panel" id="ai">
      <div className="section-heading compact">
        <span className="eyebrow">
          <Bot aria-hidden="true" size={16} />
          AI fallback
        </span>
        <h2>Hỏi nhanh trước khi đi xem phòng</h2>
      </div>

      <div className="chat-window" aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.author}`}>
            <span>{message.text}</span>
            {message.meta && <small>{message.meta}</small>}
          </div>
        ))}
      </div>

      <div className="prompt-row">
        {quickPrompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => submitQuestion(prompt)} disabled={isLoading}>
            <Sparkles aria-hidden="true" size={15} />
            {prompt}
          </button>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Nhập câu hỏi về phòng, voucher, hợp đồng..."
          aria-label="Câu hỏi cho AI"
          disabled={isLoading}
        />
        <button className="icon-button primary" type="submit" disabled={isLoading}>
          <Send aria-hidden="true" size={18} />
          {isLoading ? "Đang gửi" : "Gửi"}
        </button>
      </form>
    </section>
  );
}
