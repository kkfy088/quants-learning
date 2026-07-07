import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "量化分析师成长之路 — 供应链预测实战",
  description: "从零到量化分析师的完整学习路径，面向供应链预测方向。5天速成 + 100天系统修炼。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
