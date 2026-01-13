'use client';

import Link from 'next/link';

export default function PlatformLanding() {
  const cards = [
    {
      id: 'propose',
      title: '① 提案モード（内装/設計）',
      desc: '施主合意を加速するための3案比較とPDF出力。',
      href: '/platform/propose',
    },
    {
      id: 'owner',
      title: '② 体験モード（店舗オーナー）',
      desc: 'シンプルな体験導線と問い合わせ誘導。',
      href: '/platform/owner',
    },
    {
      id: 'fabricate',
      title: '③ 製作モード（看板屋）',
      desc: '入稿データ化と確度の高い見積/BOM。',
      href: '/platform/fabricate',
    },
  ];

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          看板制作プラットフォーム（構成プレビュー）
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          モードごとにUI/導線/出力を最適化した、将来のページ構成を検証するためのダミー画面です。
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.id} href={c.href} className="group border rounded-xl bg-white p-6 hover:shadow-md transition">
            <h2 className="font-bold text-gray-900 group-hover:text-blue-700">{c.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{c.desc}</p>
            <div className="mt-6 text-blue-600 text-sm">構成を見る →</div>
          </Link>
        ))}
      </section>

      <section className="mt-12 border rounded-xl bg-white p-6">
        <h3 className="font-bold text-gray-900 mb-2">このプレビューに含まれるもの</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>各モードの主要セクション（プレースホルダ）</li>
          <li>PDFコンセプトページ（/docs/platform-concept）へのリンク</li>
          <li>AI処理は一切行わず、導線/情報設計の確認のみ</li>
        </ul>
      </section>
    </div>
  );
}




