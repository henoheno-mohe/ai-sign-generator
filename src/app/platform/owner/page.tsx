'use client';

export default function OwnerModeSkeleton() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-extrabold text-gray-900">② 体験モード（店舗オーナー）</h1>
        <p className="text-sm text-gray-600 mt-1">
          できるだけ簡単に「体験」→「問い合わせ」までを導くための導線プレビュー。
        </p>
      </header>

      {/* ウィザード */}
      <section className="border rounded-xl bg-white p-6">
        <h2 className="font-bold text-gray-900 mb-4">かんたんウィザード</h2>
        <ol className="grid md:grid-cols-4 gap-4 text-sm">
          <li className="border rounded-lg p-4">
            <div className="font-semibold">Step 1: 写真</div>
            <div className="h-24 border-2 border-dashed rounded grid place-items-center text-gray-400 mt-2">
              アップロード（ダミー）
            </div>
          </li>
          <li className="border rounded-lg p-4">
            <div className="font-semibold">Step 2: 看板タイプ</div>
            <ul className="text-gray-700 mt-2 list-disc pl-4">
              <li>LEDチャンネル（正面/側面/背面）</li>
              <li>ネオン風/平面 など</li>
            </ul>
          </li>
          <li className="border rounded-lg p-4">
            <div className="font-semibold">Step 3: 色合い</div>
            <ul className="text-gray-700 mt-2 list-disc pl-4">
              <li>温かみ/清潔感/高級感…</li>
            </ul>
          </li>
          <li className="border rounded-lg p-4">
            <div className="font-semibold">Step 4: 結果</div>
            <div className="h-24 bg-gray-100 rounded grid place-items-center text-gray-400 mt-2">
              Before/After（ダミー）
            </div>
          </li>
        </ol>
      </section>

      {/* ランダム3/予算/CTA */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">発想補助</h2>
          <button className="w-full py-2 rounded-lg bg-blue-600 text-white cursor-default opacity-60">
            ランダムに3種類生成（ダミー）
          </button>
          <p className="text-xs text-gray-500 mt-2">※ 実装時は即時サンプル表示</p>
        </div>
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">予算目安</h2>
          <div className="h-10 bg-gray-100 rounded grid place-items-center text-gray-500">
            50万 ← スライダー → 150万（ダミー）
          </div>
          <ul className="text-xs text-gray-600 mt-2 list-disc pl-4">
            <li>この予算だと：LED正面発光 / 3D厚み中 / 取付別途 など</li>
          </ul>
        </div>
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">次のアクション</h2>
          <div className="space-y-2">
            <button className="w-full py-2 rounded-lg bg-green-600 text-white cursor-default opacity-60">
              この案で見積り依頼（ダミー）
            </button>
            <button className="w-full py-2 rounded-lg bg-emerald-600 text-white cursor-default opacity-60">
              現地調査を予約（ダミー）
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}




