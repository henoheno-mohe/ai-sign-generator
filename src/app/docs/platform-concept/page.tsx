'use client';

import React from 'react';

export default function PlatformConceptDoc() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 print:px-0">
      {/* ヘッダー */}
      <header className="mb-8 print:mb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          看板制作プラットフォーム コンセプト（MVPポンチ絵）
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          目的: ①提案者（内装/設計） ②店舗オーナー ③看板屋（製作）の3ロールに最適化した体験を1つのプラットフォームで提供
        </p>
        <div className="mt-4 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
          >
            PDFとして保存（印刷）
          </button>
          <a
            href="/"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            トップへ戻る
          </a>
        </div>
      </header>

      {/* 全体アーキテクチャ */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold text-gray-900 mb-3">全体アーキテクチャ（概念図）</h2>
        <pre className="whitespace-pre-wrap text-xs md:text-sm leading-5 border rounded-lg p-4 bg-gray-50 text-gray-800">
{`[利用者]
  ├─ ① 提案者（内装/設計）
  ├─ ② 店舗オーナー
  └─ ③ 看板屋（製作）

                         ┌──────────────────────────┐
[Web(Next.js)]           │    アプリケーション層（UI/機能） │
  ├─ ランディング/モード選択 ─────▶│  共通: プロジェクト/履歴/共有/認可  │
  ├─ ① 提案モード UI           │  ① 提案: 3案生成/比較/PDF出力       │
  ├─ ② 体験モード UI           │  ② 体験: ウィザード/予算レンジ/問合せ │
  └─ ③ 製作モード UI           │  ③ 製作: 4点補正/入稿化/詳細見積      │
                         └─────────────┬────────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │     ドメインサービス層      │
                         │  - AI編集/生成 (Gemini)     │
                         │  - 画像処理(Crop/透視変換)  │
                         │  - 見積エンジン(文字単価)   │
                         │  - PDF/図面/共有リンク       │
                         └─────────────┬────────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │       データ/外部基盤       │
                         │  - 画像ストレージ(Blob/S3)  │
                         │  - DB(案件/履歴/見積)       │
                         │  - KV(ライセンス/制限)      │
                         │  - 認証(Auth)               │
                         │  - 決済(将来: Stripe等)     │
                         └──────────────────────────┘`}
        </pre>
      </section>

      {/* 主要フロー */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold text-gray-900 mb-3">主要フロー（ロール別）</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">① 提案モード（内装/設計）</h3>
            <p className="text-sm text-gray-700 mb-2">施主合意を加速するための3案比較とPDF出力。</p>
            <pre className="whitespace-pre-wrap text-xs leading-5 bg-gray-50 p-3 rounded border">
{`写真アップ
→ 看板タイプ/色合い
→ 3案同時生成
→ 並列比較/昼夜モック
→ 概算見積レンジ
→ PDF企画書/共有リンク`}
            </pre>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">② 体験モード（店舗オーナー）</h3>
            <p className="text-sm text-gray-700 mb-2">シンプルな体験導線と問い合わせ誘導。</p>
            <pre className="whitespace-pre-wrap text-xs leading-5 bg-gray-50 p-3 rounded border">
{`写真アップ
→ ウィザード(タイプ/色合い/ランダム3)
→ Before/After
→ 予算スライダー目安
→ 問い合わせCTA`}
            </pre>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">③ 製作モード（看板屋）</h3>
            <p className="text-sm text-gray-700 mb-2">入稿データ化と確度の高い見積/BOM。</p>
            <pre className="whitespace-pre-wrap text-xs leading-5 bg-gray-50 p-3 rounded border">
{`写真アップ
→ 4点指定→透視補正
→ 横幅入力
→ 入稿データ化(背景均一/フラット)
→ 文字単価×文字数見積
→ PDF図面/書き出し`}
            </pre>
          </div>
        </div>
      </section>

      {/* 画面マップ */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold text-gray-900 mb-3">画面マップ（MVP想定）</h2>
        <pre className="whitespace-pre-wrap text-xs md:text-sm leading-5 border rounded-lg p-4 bg-gray-50 text-gray-800">
{`/                 … ランディング（用途から始める ①/②/③）
/propose          … 提案モード（比較ボード+PDF）
/owner            … 体験モード（ウィザード+問い合わせ）
/fabricate        … 製作モード（4点補正+入稿化+見積）
/project/:id      … 共通プロジェクト（履歴/共有/書き出し）
/admin            … ライセンス/使用回数/テンプレ管理`}
        </pre>
      </section>

      {/* データモデル */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold text-gray-900 mb-3">データモデル（ざっくり）</h2>
        <pre className="whitespace-pre-wrap text-xs md:text-sm leading-5 border rounded-lg p-4 bg-gray-50 text-gray-800">
{`Project { id, role(①/②/③), title, client, createdAt }
Asset   { id, projectId, type(original/cropped/ai), url, meta }
Quote   { id, projectId, chars, sizePerChar, type, unitPrice, total }
Share   { id, projectId, token, expiresAt, watermark }
License { key, owner, remaining, plan }`}
        </pre>
      </section>

      {/* 段階リリース */}
      <section className="mb-12 break-inside-avoid">
        <h2 className="text-xl font-bold text-gray-900 mb-3">段階リリース案</h2>
        <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
          <li>Phase A: ③製作モードを中核に磨き込み（4点補正→入稿化→単価見積）</li>
          <li>Phase B: ①提案モードの3案生成+PDF書き出し</li>
          <li>Phase C: ②体験モードのウィザード+問い合わせ</li>
        </ul>
      </section>

      {/* フッター（印刷用情報） */}
      <footer className="text-xs text-gray-500 print:text-gray-400">
        <p>Generated for internal discussion. このページはブラウザの印刷機能でPDF保存できます。</p>
        <style jsx global>{`
          @media print {
            @page {
              margin: 14mm;
            }
            a, button, .print\\:hidden { display: none !important; }
            .print\\:mb-4 { margin-bottom: 1rem !important; }
            .break-inside-avoid { break-inside: avoid; }
          }
        `}</style>
      </footer>
    </main>
  );
}




