import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "neon-sign-maker",
  description: "手書き/テキストからネオンサインの設置イメージをAI生成する",
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


