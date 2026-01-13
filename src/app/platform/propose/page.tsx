'use client';

export default function ProposeModeSkeleton() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-extrabold text-gray-900">① 提案モード（内装/設計）</h1>
        <p className="text-sm text-gray-600 mt-1">
          施主に短時間で複数案を提示し、合意形成を加速するための画面構成プレビュー。
        </p>
      </header>

      {/* 1. アップロード＆条件選択 */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">建屋写真</h2>
          <div className="h-48 border-2 border-dashed rounded-lg grid place-items-center text-gray-500">
            画像アップロード（ダミー）
          </div>
        </div>
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">条件（タイプ/色合い）</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>看板タイプ：LEDチャンネル文字（正面）など</li>
            <li>色合い：温かみ / 清潔感 / 高級感 …</li>
            <li>参考画像：任意</li>
          </ul>
          <button className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white cursor-default opacity-60">
            3案を生成（ダミー）
          </button>
        </div>
      </section>

      {/* 2. 3案のプレビュー */}
      <section className="border rounded-xl bg-white p-6">
        <h2 className="font-bold text-gray-900 mb-4">候補案（3案比較）</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-3">
              <div className="h-40 bg-gray-100 rounded grid place-items-center text-gray-400">
                仕上がり案 {i + 1}
              </div>
              <div className="text-xs text-gray-600 mt-2">説明/ポイント/雰囲気</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 昼夜モック & 概算 */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-3">昼夜モック（スライダー想定）</h2>
          <div className="h-44 bg-gray-100 rounded grid place-items-center text-gray-400">
            Before/Afterスライダー（ダミー）
          </div>
        </div>
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-3">概算見積レンジ</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>案A: 80〜120万円</li>
            <li>案B: 100〜150万円</li>
            <li>案C: 120〜170万円</li>
          </ul>
          <button className="mt-4 w-full py-2 rounded-lg bg-purple-600 text-white cursor-default opacity-60">
            企画書PDFを出力（ダミー）
          </button>
        </div>
      </section>
    </div>
  );
}




