'use client';

export default function FabricateModeSkeleton() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-extrabold text-gray-900">③ 製作モード（看板屋）</h1>
        <p className="text-sm text-gray-600 mt-1">
          入稿データ化と確度の高い見積を行うための画面構成プレビュー。
        </p>
      </header>

      {/* 4点補正+サイズ入力 */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">看板の4点指定 → 透視補正</h2>
          <div className="h-56 border-2 border-dashed rounded-lg grid place-items-center text-gray-500">
            キャンバス（ダミー）: 4点クリック → 正面化
          </div>
          <p className="text-xs text-gray-500 mt-2">
            実装時：クリックで4隅指定→正面化画像を生成（既存CropToolを流用）
          </p>
        </div>
        <div className="border rounded-xl bg-white p-6">
          <h2 className="font-bold text-gray-900 mb-2">サイズ入力</h2>
          <label className="text-sm text-gray-700">横幅（mm）</label>
          <div className="mt-2 h-10 bg-gray-100 rounded grid place-items-center text-gray-500">
            3000（ダミー）
          </div>
          <button className="mt-4 w-full py-2 rounded-lg bg-purple-600 text-white cursor-default opacity-60">
            入稿データレベルに作り直す（ダミー）
          </button>
          <p className="text-xs text-gray-500 mt-2">
            実装時：背景均一化/フラット化/不要要素削除→AI/EPS風の出力
          </p>
        </div>
      </section>

      {/* 見積りサマリ */}
      <section className="border rounded-xl bg-white p-6">
        <h2 className="font-bold text-gray-900 mb-4">見積り（文字単価 × 文字数）</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <table className="w-full text-sm border">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 text-gray-600">1文字サイズ</td>
                  <td className="p-2 text-right">600mm</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 text-gray-600">文字数</td>
                  <td className="p-2 text-right">5文字</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 text-gray-600">タイプ</td>
                  <td className="p-2 text-right">LEDチャンネル（正面）</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">小計（単価×文字数）</td>
                  <td className="p-2 text-right font-semibold">¥500,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-sm text-gray-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>係数（ネオン等）はオプションで加算</li>
              <li>施工/申請/運搬等は現地条件にて別見積もり</li>
              <li>PDF図面出力：寸法/断面/発光方式/色指示/注意書き</li>
            </ul>
            <button className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white cursor-default opacity-60">
              PDF図面を出力（ダミー）
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}




