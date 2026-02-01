'use client';

import React from "react";
import { NEON_PALETTE_14, type NeonColor } from "@/lib/palette";
import {
  FIXED_YEN_PER_CM_TUBE,
  estimatePriceYenExTaxFromTubeLength,
  formatYen,
} from "@/lib/quote";
import { NEON_PROTOCOL_V1 } from "@/lib/neonProtocol";
import { estimateTubeLengthCmFromNeonPhoto } from "@/lib/lineLength";

export default function StudioClientV2() {
  const [sketchDataUrl, setSketchDataUrl] = React.useState<string | null>(null);
  const [widthMm, setWidthMm] = React.useState<number>(600);

  const [selectedColors, setSelectedColors] = React.useState<NeonColor[]>([
    NEON_PALETTE_14[0],
    NEON_PALETTE_14[5],
    NEON_PALETTE_14[9],
  ]);

  const tubeDiameter = NEON_PROTOCOL_V1.defaultTubeDiameter;
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isEstimating, setIsEstimating] = React.useState(false);
  const [aiImageDataUrl, setAiImageDataUrl] = React.useState<string | null>(null);
  const [aiError, setAiError] = React.useState<string | null>(null);
  const [tubeLengthCm, setTubeLengthCm] = React.useState<number | null>(null);

  const handleOrder = () => {
    if (!aiImageDataUrl) return;

    const baseContactUrl = "https://chameneon.base.shop/contact";
    const colorNames = selectedColors.map(c => c.name).join("、");
    const estimatedPrice = priceYenExTax ? Math.round(priceYenExTax * 1.1) : 0;
    
    const message = `【AI見積もり依頼】
以下の内容で制作を検討しています。

■見積もり内容
・横幅: ${widthMm}mm
・選択色: ${colorNames}
・推定チューブ長: ${tubeLengthCm ? Math.round(tubeLengthCm) : "解析中"}cm
・概算お見積もり: ¥${estimatedPrice.toLocaleString()}(税込)

※AIスタジオで生成された画像を確認しました。詳細の打ち合わせをお願いします。
`;

    const url = `${baseContactUrl}?message=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const canGenerate = Boolean(sketchDataUrl);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const priceYenExTax = tubeLengthCm == null ? null : estimatePriceYenExTaxFromTubeLength(tubeLengthCm, FIXED_YEN_PER_CM_TUBE);

  const handleGenerate = async (isAutoColor: boolean = false) => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    setAiError(null);
    setAiImageDataUrl(null);
    setTubeLengthCm(null);
    setIsEstimating(false);

    try {
      // 1) AI生成（サーバー側API呼び出し）
      const resp = await fetch("/api/neon/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sketchDataUrl,
          text: "", // V2では画像メインのため空
          colors: isAutoColor ? [] : selectedColors,
          isAutoColor,
          widthMm,
          tubeDiameter,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "生成に失敗しました");
      
      setAiImageDataUrl(data.imageDataUrl);
      setIsEstimating(true);

      // 2) 生成された写真からチューブ長を推定
      const est = await estimateTubeLengthCmFromNeonPhoto({
        imageDataUrl: data.imageDataUrl,
        targetWidthMm: widthMm,
      });
      setTubeLengthCm(est.tubeLengthCm);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "生成に失敗しました");
    } finally {
      setIsGenerating(false);
      setIsEstimating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f12] text-white font-sans">
      {/* Top Nav */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f12]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="ChameNeon Logo" 
              className="h-9 w-9 rounded-full object-cover shadow-[0_0_15px_rgba(57,255,20,0.4)]" 
            />
            <div className="text-sm font-bold tracking-wide">ChameNeon工房</div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-200 sm:flex">
            <a className="text-white underline decoration-emerald-300 underline-offset-8" href="#studio">
              ホーム
            </a>
            <a className="hover:text-white" href="#examples">
              制作事例
            </a>
            <a className="hover:text-white" href="https://chameneon.base.shop/contact" target="_blank">
              お問い合わせ
            </a>
          </nav>
          <button
            onClick={handleOrder}
            className="rounded-full bg-emerald-200 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-100 transition-colors disabled:opacity-50"
            disabled={!aiImageDataUrl}
          >
            注文
          </button>
        </div>
      </div>

      {/* Hero */}
      <section
        className="border-b border-white/10"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(11,15,18,1)), url('/hero/after.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:text-left">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              あなたのデザインが、
              <br />
              ネオンサインに。
            </h1>
            <p className="mt-3 text-sm text-zinc-200 sm:text-base">
              手書きのイラストや文字をアップロードするだけで、リアルな設置イメージと概算見積を即時作成。
            </p>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-[#e9eef2] text-black shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="p-5 sm:p-7">
            {/* Image Upload Card (Full width) */}
            <div className="rounded-2xl bg-[#2b2f36] p-6 text-white shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-extrabold">手書き・イラストをアップロード</p>
                  <p className="mt-1 text-xs text-zinc-300">塗りつぶしのあるロゴやイラスト、手書きのラフでもOK！</p>
                </div>
                <span className="rounded-full bg-emerald-300/20 px-3 py-1 text-[11px] font-bold text-emerald-200">
                  AI画像生成
                </span>
              </div>

              <div className="mt-6">
                <div className="rounded-2xl bg-white/5 p-1 flex flex-col justify-center min-h-[200px]">
                  {!sketchDataUrl ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex-1 rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-4 py-12 text-sm font-bold text-white hover:border-emerald-300/50 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2"
                    >
                      <span className="text-2xl">＋</span>
                      画像を選択
                      <span className="block text-[10px] font-normal text-zinc-400">JPG / PNG (最大8MB)</span>
                    </button>
                  ) : (
                    <div className="rounded-xl border border-white/15 bg-black/40 p-4 relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sketchDataUrl}
                        alt="アップロード画像"
                        className="h-48 w-full rounded-lg object-contain"
                      />
                      <div className="mt-3 flex items-center justify-between px-2">
                        <p className="text-xs text-zinc-300 font-bold">アップロード済み</p>
                        <button
                          type="button"
                          disabled={isGenerating}
                          className="text-xs font-bold text-rose-300 hover:text-rose-200 underline underline-offset-2 disabled:opacity-50"
                          onClick={() => {
                            setSketchDataUrl(null);
                            setAiImageDataUrl(null);
                            setAiError(null);
                            setTubeLengthCm(null);
                          }}
                        >
                          別の画像に変える
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      if (!f.type.startsWith("image/")) {
                        alert("画像ファイルを選択してください。");
                        return;
                      }
                      if (f.size > 8 * 1024 * 1024) {
                        alert("ファイルサイズは8MB以下にしてください。");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const url = ev.target?.result as string;
                        setSketchDataUrl(url);
                        setAiImageDataUrl(null);
                        setAiError(null);
                        setTubeLengthCm(null);
                      };
                      reader.readAsDataURL(f);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Controls Card */}
            <div className="mt-5 rounded-2xl border border-black/10 bg-white px-5 py-8 shadow-sm">
              <div className="space-y-8">
                {/* Size slider */}
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-lg font-extrabold text-zinc-900 tracking-tight">希望サイズ選択（全体の横幅）</p>
                    <p className="text-base font-bold text-emerald-700">{Math.round(widthMm)}mm</p>
                  </div>
                  <input
                    className="mt-4 w-full accent-emerald-600 h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer"
                    type="range"
                    min={200}
                    max={1200}
                    step={10}
                    value={widthMm}
                    disabled={isGenerating}
                    onChange={(e) => {
                      setWidthMm(Number(e.target.value));
                    }}
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-zinc-400 font-bold">
                    <span>200mm</span>
                    <span>700mm</span>
                    <span>1200mm</span>
                  </div>
                </div>

                {/* Color multi-select */}
                <div>
                  <div className="flex items-end justify-between gap-4 border-b border-zinc-100 pb-3">
                    <p className="text-lg font-extrabold text-zinc-900 tracking-tight">色を選ぶ（最大5色まで）</p>
                    <p className="text-sm font-bold text-zinc-500">選択中：{selectedColors.length}色</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {NEON_PALETTE_14.map((c) => {
                      const isOn = selectedColors.some((x) => x.id === c.id);
                      const glowStyle = {
                        backgroundColor: c.hex,
                        boxShadow: isOn 
                          ? `0 0 15px ${c.hex}cc, inset 0 0 5px rgba(255,255,255,0.8)` 
                          : `0 2px 4px rgba(0,0,0,0.1)`,
                        borderColor: isOn ? 'white' : 'transparent',
                      };
                      
                      return (
                        <div key={c.id} className="flex flex-col items-center gap-2">
                          <button
                            type="button"
                            disabled={isGenerating}
                            onClick={() => {
                              setSelectedColors((prev) => {
                                const exists = prev.some((x) => x.id === c.id);
                                if (exists) return prev.filter((x) => x.id !== c.id);
                                if (prev.length >= 5) return prev;
                                return [...prev, c];
                              });
                            }}
                            className={[
                              "relative h-12 w-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center disabled:opacity-50",
                              isOn ? "scale-110" : "hover:scale-105 opacity-80 hover:opacity-100",
                            ].join(" ")}
                            style={glowStyle}
                            title={c.name}
                          >
                            {isOn && (
                              <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-black text-lg">
                                ✓
                              </span>
                            )}
                          </button>
                          <span className={[
                            "text-[10px] font-extrabold tracking-tighter transition-colors",
                            isOn ? "text-zinc-900" : "text-zinc-400"
                          ].join(" ")}>
                            {c.nameJp}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-3">
                  <button
                    type="button"
                    disabled={!canGenerate || selectedColors.length === 0 || isGenerating}
                    onClick={() => handleGenerate(false)}
                    className={[
                      "w-full rounded-full py-5 text-lg font-black transition-all shadow-xl relative overflow-hidden",
                      !canGenerate || selectedColors.length === 0 || isGenerating
                        ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                        : "bg-[#2d7a71] text-white hover:bg-[#24635b] hover:shadow-emerald-900/30 hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        AI生成中...
                      </span>
                    ) : (
                      "選んだ色でデザイン生成"
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={!canGenerate || isGenerating}
                    onClick={() => handleGenerate(true)}
                    className={[
                      "w-full rounded-full py-4 text-base font-bold transition-all border-2 relative overflow-hidden",
                      !canGenerate || isGenerating
                        ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                        : "border-emerald-600 text-emerald-700 hover:bg-emerald-50 shadow-sm",
                    ].join(" ")}
                  >
                    {isGenerating ? "AIが考え中..." : "✨ AIにおまかせで生成（色はAIが提案）"}
                  </button>

                  {aiError && (
                    <p className="mt-3 text-sm text-center text-rose-500 font-bold">{aiError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Result Area */}
            {(aiImageDataUrl || isGenerating) && (
              <div className="mt-10 border-t border-black/5 bg-white/60 p-6 sm:p-10 rounded-b-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-xl font-extrabold text-zinc-900 mb-8 border-l-4 border-[#2d7a71] pl-4">
                  {isGenerating ? "生成中..." : "作成結果"}
                </h3>
                
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Image Display */}
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#0b0f12] shadow-2xl min-h-[300px] flex items-center justify-center relative">
                    {isGenerating ? (
                      <div className="text-center space-y-4">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
                        <p className="text-zinc-400 text-sm font-bold animate-pulse">
                          AIがネオンサインを作成しています...<br />
                          (30秒〜1分ほどかかる場合があります)
                        </p>
                      </div>
                    ) : aiImageDataUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={aiImageDataUrl}
                        alt="作成結果"
                        className="block h-auto w-full"
                        style={{ maxHeight: "75vh", objectFit: "contain" }}
                      />
                    )}
                  </div>

                  {/* Price Card */}
                  <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-base font-extrabold text-zinc-900">概算お見積もり</p>
                      
                      {isGenerating || isEstimating ? (
                        <div className="mt-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 animate-pulse text-center">
                          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Calculating...</p>
                          <p className="mt-2 text-2xl font-black text-zinc-300">計算中</p>
                        </div>
                      ) : priceYenExTax != null ? (
                        <div className="mt-6 p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Estimated Price</p>
                          <p className="mt-2 text-4xl font-black text-[#2d7a71]">
                            ¥{formatYen(Math.round(priceYenExTax * 1.1))}
                            <span className="text-sm ml-1 font-bold text-zinc-400">（税込）</span>
                          </p>
                          <div className="mt-4 pt-4 border-t border-emerald-100/50 space-y-2 text-zinc-600 font-bold">
                            <p className="text-[11px] flex justify-between">
                              <span>横幅：{widthMm}mm</span>
                              <span className="text-zinc-400 font-normal">確定</span>
                            </p>
                            <p className="text-[11px] flex justify-between">
                              <span>推定チューブ長：{tubeLengthCm?.toFixed(0)}cm</span>
                              <span className="text-zinc-400 font-normal">AI解析値</span>
                            </p>
                            <div className="h-px bg-emerald-100/50 my-2" />
                            <p className="text-[11px] flex justify-between">
                              <span>アクリルパネル・LEDチューブ</span>
                              <span>込</span>
                            </p>
                            <p className="text-[11px] flex justify-between">
                              <span>電源アダプタ・配線一式</span>
                              <span>込</span>
                            </p>
                            <p className="text-[11px] flex justify-between">
                              <span>国内配送料</span>
                              <span>込</span>
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={isGenerating || isEstimating || !aiImageDataUrl}
                        className="w-full rounded-2xl bg-[#2d7a71] py-5 text-base font-black text-white hover:bg-[#24635b] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
                      >
                        この内容で注文する
                      </button>
                      <p className="mt-4 text-center text-[10px] text-zinc-400 font-bold">
                        （外部サイトへ移動します）
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Examples placeholder */}
        <div id="examples" className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">制作事例</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-white/10 font-bold">SAMPLE</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
