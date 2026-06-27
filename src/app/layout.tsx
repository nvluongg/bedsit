import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhongTro AI Startup",
  description: "MVP web phòng trọ có chatbot AI fallback, voucher và quản lý vai trò."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
