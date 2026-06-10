'use client';

import React from "react";

const EXAMPLES = [
  {
    id: "cafe",
    label: "カフェロゴ",
    before: "/examples/sketch-cafe.svg",
    after: "/examples/ex-cafe-after.png",
    price: "¥35,000",
    size: "500mm",
    colors: "イエロー × ウォームホワイト",
  },
  {
    id: "welcome",
    label: "ウェルカムサイン",
    before: "/examples/sketch-welcome.svg",
    after: "/examples/ex-welcome-after.png",
    price: "¥48,000",
    size: "700mm",
    colors: "ピンク × ウォームホワイト",
  },
  {
    id: "bar",
    label: "BARサイン",
    before: "/examples/sketch-bar.svg",
    after: "/examples/ex-bar-after.png",
    price: "¥30,000",
    size: "450mm",
    colors: "スカイブルー × パープル",
  },
];

export default function InstaGenPage() {
  const [selected, setSelected] = React.useState(EXAMPLES[0]);
  const [customPrice, setCustomPrice] = React.useState("");
  const [customSize, setCustomSize] = React.useState("");

  const price = customPrice || selected.price;
  const size = customSize || selected.size;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-black mb-2">Instagram 投稿画像ジェネレーター</h1>
        <p className="text-zinc-400 text-sm mb-8">プレビューを右クリック→「名前をつけて保存」またはスクリーンショットで保存できます。</p>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Example selector */}
          <div className="flex gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => { setSelected(ex); setCustomPrice(""); setCustomSize(""); }}
                className={["rounded-xl px-4 py-2 text-sm font-bold transition-all", selected.id === ex.id ? "bg-emerald-500 text-black" : "bg-white/10 hover:bg-white/20"].join(" ")}
              >
                {ex.label}
              </button>
            ))}
          </div>
          {/* Custom price/size */}
          <input
            type="text"
            placeholder="金額（例：¥42,000）"
            value={customPrice}
            onChange={e => setCustomPrice(e.target.value)}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm w-40 outline-none focus:ring-1 focus:ring-emerald-400"
          />
          <input
            type="text"
            placeholder="サイズ（例：600mm）"
            value={customSize}
            onChange={e => setCustomSize(e.target.value)}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm w-40 outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>

        {/* Instagram Post Preview — 1080x1080 相当 */}
        <div
          id="insta-post"
          style={{
            width: 540,
            height: 540,
            background: "linear-gradient(135deg, #0b0f12 0%, #111820 100%)",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 70% 40%, rgba(52,211,153,0.07) 0%, transparent 60%)",
          }} />

          {/* Main content */}
          <div style={{ padding: "28px 28px 0", height: "100%", display: "flex", flexDirection: "column" }}>

            {/* Top: Brand */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="logo" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", letterSpacing: "0.05em" }}>ChameNeon工房</span>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 800, color: "#34d399",
                border: "1px solid rgba(52,211,153,0.4)", borderRadius: 100,
                padding: "2px 10px", letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                AI Neon Studio
              </span>
            </div>

            {/* Before → After */}
            <div style={{ display: "flex", gap: 10, flex: 1, minHeight: 0 }}>
              {/* Before */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{
                  fontSize: 9, fontWeight: 900, color: "#71717a",
                  textTransform: "uppercase", letterSpacing: "0.15em",
                }}>Before</span>
                <div style={{
                  flex: 1, background: "#fff", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", padding: 12,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.before}
                    alt="before"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 2px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* After */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{
                  fontSize: 9, fontWeight: 900, color: "#34d399",
                  textTransform: "uppercase", letterSpacing: "0.15em",
                }}>After</span>
                <div style={{
                  flex: 1, background: "#0b0f12", borderRadius: 10,
                  border: "1px solid rgba(52,211,153,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 0 20px rgba(52,211,153,0.1)",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.after}
                    alt="after"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom info bar */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0 20px",
            }}>
              {/* Price */}
              <div>
                <div style={{ fontSize: 9, color: "#71717a", fontWeight: 700, marginBottom: 2 }}>概算お見積もり</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#34d399", lineHeight: 1 }}>
                  {price}
                  <span style={{ fontSize: 10, color: "#a1a1aa", fontWeight: 700, marginLeft: 4 }}>税込・送料別</span>
                </div>
              </div>

              {/* Size + Colors */}
              <div style={{ textAlign: "right" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 100, padding: "4px 12px", marginBottom: 4,
                }}>
                  <span style={{ fontSize: 10, color: "#e4e4e7", fontWeight: 800 }}>横幅 {size}</span>
                </div>
                <div style={{ fontSize: 9, color: "#71717a", fontWeight: 600 }}>{selected.colors}</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: 10, paddingBottom: 16,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 9, color: "#52525b", fontWeight: 700 }}>
                手書きスケッチ → AIが60秒でネオン化
              </span>
              <span style={{ fontSize: 9, color: "#52525b", fontWeight: 700 }}>
                chameneon.base.shop
              </span>
            </div>
          </div>
        </div>

        {/* Size note */}
        <p className="mt-4 text-xs text-zinc-500">
          ※ 表示サイズ540px = 実際のInstagram投稿1080px相当。スクリーンショット後に2倍に拡大してご利用ください。
        </p>
      </div>
    </div>
  );
}
