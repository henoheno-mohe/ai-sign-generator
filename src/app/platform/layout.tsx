'use client';

import Link from 'next/link';
import React from 'react';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/platform" className="text-lg font-extrabold tracking-tight text-gray-900">
            看板制作プラットフォーム（構成プレビュー）
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="hover:text-blue-600" href="/platform/propose">① 提案</Link>
            <Link className="hover:text-blue-600" href="/platform/owner">② 体験</Link>
            <Link className="hover:text-blue-600" href="/platform/fabricate">③ 製作</Link>
            <Link className="text-gray-500 hover:text-gray-700" href="/docs/platform-concept">PDFコンセプト</Link>
            <Link className="text-gray-500 hover:text-gray-700" href="/">AIジェネレーターへ</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
      <footer className="px-6 py-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto">
          ※ このセクション群は構成確認のためのプレースホルダUIです。AI処理やサーバー呼び出しは行いません。
        </div>
      </footer>
    </div>
  );
}




