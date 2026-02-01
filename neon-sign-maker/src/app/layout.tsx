import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChameNeon工房 | あなたのデザインをネオンサインに",
  description: "手書きスケッチやイラストから、リアルなネオンサインの設置イメージと見積もりをAIが生成します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}


