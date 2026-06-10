'use client';

import React from "react";
import { NEON_PALETTE_14, type NeonColor } from "@/lib/palette";
import {
  FIXED_YEN_PER_CM_TUBE,
  estimatePriceYenExTaxFromTubeLength,
  formatYen,
} from "@/lib/quote";
import { NEON_PROTOCOL_V1, FONT_STYLES } from "@/lib/neonProtocol";
import type { FontStyle, DesignMode } from "@/lib/neonProtocol";
import { estimateTubeLengthCmFromSketch } from "@/lib/lineLength";
import { getBaseItemUrl } from "@/lib/baseItems";

export default function StudioClientV3() {
  const [sketchDataUrl, setSketchDataUrl] = React.useState<string | null>(null);
  const [widthMm, setWidthMm] = React.useState<number>(300);

  const [selectedColors, setSelectedColors] = React.useState<NeonColor[]>([
    NEON_PALETTE_14[0],
    NEON_PALETTE_14[5],
    NEON_PALETTE_14[9],
  ]);

  const tubeDiameter = NEON_PROTOCOL_V1.defaultTubeDiameter;
  const [inputMode, setInputMode] = React.useState<"sketch" | "text">("sketch");
  const [userText, setUserText] = React.useState<string>("");
  const [fontStyle, setFontStyle] = React.useState<FontStyle>("pacifico");
  const [designMode, setDesignMode] = React.useState<DesignMode>("faithful");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isEstimating, setIsEstimating] = React.useState(false);
  const [aiImageDataUrl, setAiImageDataUrl] = React.useState<string | null>(null);
  const [aiError, setAiError] = React.useState<string | null>(null);
  const [tubeLengthCm, setTubeLengthCm] = React.useState<number | null>(null);
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [isOrdering, setIsOrdering] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState<number>(0);

  // Google Fonts を一括で動的ロード
  React.useEffect(() => {
    const families = FONT_STYLES.map(f => f.googleFamily.replace(/ /g, "+")).join("&family=");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const loadingMessages = [
    "AIがデザインを解析しています...",
    "アクリル板のカットラインを計算中...",
    "7mm LEDチューブの配置をシミュレーション中...",
    "光の反射と影をレンダリングしています...",
    "最終調整を行っています...もう少しです！"
  ];

  // タイマーの参照を保持
  const loadingTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startLoadingAnimation = () => {
    setLoadingStep(0);
    let step = 0;
    loadingTimerRef.current = setInterval(() => {
      step++;
      if (step < loadingMessages.length) {
        setLoadingStep(step);
      } else {
        // 最後のメッセージで止める
        if (loadingTimerRef.current) clearInterval(loadingTimerRef.current);
      }
    }, 4500); // 4.5秒ごとに切り替え（約20-30秒の待機を想定）
  };

  const stopLoadingAnimation = () => {
    if (loadingTimerRef.current) {
      clearInterval(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  };

  const handleDownload = () => {
    if (!aiImageDataUrl) return;
    const link = document.createElement("a");
    link.href = aiImageDataUrl;
    link.download = `ChameNeon-Design-${widthMm}mm.png`;
    link.click();
  };

  const isEmailValid = userEmail.length > 0 && userEmail.includes("@") && userEmail.includes(".");

  const handleOrder = async () => {
    if (!aiImageDataUrl || isOrdering) return;

    if (!isEmailValid) {
      alert("有効なメールアドレスを入力してください。\n（デザインの保存と、完成イメージの送信に必要です）");
      return;
    }

    const rawPrice = priceYenExTax ? Math.round(priceYenExTax * 1.1) : 0;
    const finalPrice = Math.max(rawPrice, 28000);
    const roundedPrice = Math.round(finalPrice / 1000) * 1000;

    const confirmMessage = `この内容で注文・相談ページ（BASE）へ移動します。\n\n概算金額: ¥${roundedPrice.toLocaleString()} (税込)\n\n※この時点では決済は確定しません。ショップにて詳細を確認後、購入いただけます。`;
    const ok = window.confirm(confirmMessage);
    if (!ok) return;

    setIsOrdering(true);

    // BASEの遷移先を決定
    let targetUrl = "";
    const colorNames = selectedColors.map(c => c.name).join("、");
    const baseContactUrl = "https://thebase.com/inquiry/chameneon-base-shop";

    if (roundedPrice > 100000) {
      const message = `【AI見積もり依頼】
・横幅: ${widthMm}mm
・選択色: ${colorNames}
・概算お見積もり: ¥${roundedPrice.toLocaleString()}(税込)
・連絡先メール: ${userEmail}
※このデザインで制作可能か相談したいです。`;
      targetUrl = `${baseContactUrl}?message=${encodeURIComponent(message)}`;
    } else {
      const baseItemUrl = getBaseItemUrl(roundedPrice);
      if (baseItemUrl) {
        targetUrl = baseItemUrl;
      } else {
        const message = `【購入・相談】見積もり金額 ¥${roundedPrice.toLocaleString()} の決済ページを希望します。\n(横幅: ${widthMm}mm)\n連絡先: ${userEmail}`;
        targetUrl = `${baseContactUrl}?message=${encodeURIComponent(message)}`;
      }
    }

    fetch("/api/order/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageDataUrl: aiImageDataUrl,
        userEmail,
        widthMm,
        tubeLengthCm: tubeLengthCm ? Math.round(tubeLengthCm) : 0,
        estimatedPrice: roundedPrice,
        selectedColors,
        version: "v2-ab-test"
      }),
    }).catch(e => console.error("Failed to notify order:", e));

    window.open(targetUrl, "_blank");
    setTimeout(() => setIsOrdering(false), 2000);
  };

  const canGenerate = inputMode === "sketch" ? Boolean(sketchDataUrl) : userText.trim().length > 0;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const priceYenExTax = tubeLengthCm == null ? null : estimatePriceYenExTaxFromTubeLength(tubeLengthCm, FIXED_YEN_PER_CM_TUBE);

  const handleGenerate = async (isAutoColor: boolean = false) => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    setAiError(null);
    setAiImageDataUrl(null);
    setTubeLengthCm(null);
    setIsEstimating(true);
    startLoadingAnimation();

    try {
      const currentSketch = sketchDataUrl;
      if (currentSketch) {
        const est = await estimateTubeLengthCmFromSketch({
          sketchDataUrl: currentSketch,
          targetWidthMm: widthMm,
        });
        setTubeLengthCm(est.tubeLengthCm);
      }
    } catch (e) {
      console.error("Length estimation failed:", e);
    } finally {
      setIsEstimating(false);
    }

    try {
      const resp = await fetch("/api/neon/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sketchDataUrl: inputMode === "sketch" ? sketchDataUrl : null,
          text: inputMode === "text" ? userText.trim() : "",
          colors: isAutoColor ? [] : selectedColors,
          isAutoColor,
          widthMm,
          tubeDiameter,
          fontStyle,
          designMode,
          version: "v2",
        }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "生成に失敗しました");
      
      setAiImageDataUrl(data.imageDataUrl);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "生成に失敗しました");
    } finally {
      setIsGenerating(false);
      stopLoadingAnimation();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-emerald-200">
      {/* Top Nav */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 sm:gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ChameNeon Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
            />
            <div className="text-xs sm:text-sm font-black tracking-tighter uppercase text-gray-900 group-hover:text-[#2d7a71] transition-colors">
              ChameNeon工房
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#studio"
              className="hidden sm:block text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              AIスタジオ
            </a>
            <a
              href="#gallery"
              className="hidden sm:block text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              制作事例
            </a>
            <button
              onClick={handleOrder}
              className="rounded-full bg-[#2d7a71] px-5 py-2 text-xs sm:text-sm font-black text-white hover:bg-[#24635b] transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={!aiImageDataUrl || !isEmailValid || isOrdering}
            >
              {isOrdering ? "移動中..." : "注文・相談する"}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f5f3] px-3 py-1 text-[10px] font-bold tracking-widest text-[#2d7a71] border border-[#2d7a71]/20 mb-5 uppercase">
                AI-Powered Custom Neon
              </div>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl tracking-tight text-gray-900">
                かんたん60秒で、<br />
                <span className="text-[#2d7a71]">ネオンサインの<br className="sm:hidden" />イメージを作成。</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
                スケッチや文字をアップするだけ。AIがリアルな完成イメージと概算見積もりを自動生成します。
              </p>
              {/* Trust bar */}
              <div className="mt-6 flex flex-wrap gap-4">
                {[
                  { icon: "🚚", text: "¥28,000〜（送料別¥3,000）" },
                  { icon: "📅", text: "最短2週間でお届け" },
                  { icon: "🇯🇵", text: "国内製造・サポート" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero Before/After */}
            <div className="shrink-0 sm:w-96 flex flex-col gap-3">
              {/* メインペア（ケーキ） */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Before</span>
                  <div className="flex-1 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/eximg/before-cake.png" alt="before" className="w-full max-h-40 object-contain" />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">イラスト</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="rounded-full px-2 py-0.5 text-[10px] font-black text-white" style={{ backgroundColor: "#2d7a71" }}>AI</div>
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 shadow-md bg-gray-100 flex items-center justify-center" style={{ borderColor: "#2d7a71", minHeight: "168px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/eximg/after-cake.jpg" alt="after" className="w-full h-full object-contain" />
                </div>
              </div>
              {/* サブサムネ */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { src: "/eximg/after-ramen.jpg", label: "ラーメン" },
                  { src: "/eximg/after-chameleon.jpg", label: "カメレオン" },
                  { src: "/eximg/after-shavedice.png", label: "かき氷" },
                ].map(item => (
                  <div key={item.label} className="rounded-xl overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.label} className="w-full aspect-square object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-gray-400">どんなイラストもネオンサインに変換できます</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-gray-900">AIネオンスタジオ</h2>
          <p className="mt-1 text-sm text-gray-500">下記の手順に沿って入力するだけで、完成イメージと見積もりが届きます。</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white text-gray-900 shadow-lg">
          <div className="p-5 sm:p-7">
            {/* Step 1: Input Mode */}
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-7 w-7 rounded-full bg-[#2d7a71] text-white text-xs font-black flex items-center justify-center shrink-0">1</div>
                <p className="text-sm font-black text-gray-800">何をネオンにしますか？</p>
              </div>
              <div className="grid grid-cols-2 gap-3 ml-10">
                <button
                  type="button"
                  onClick={() => setInputMode("sketch")}
                  className={[
                    "rounded-2xl border-2 p-5 text-left transition-all",
                    inputMode === "sketch"
                      ? "border-[#2d7a71] bg-[#e8f5f3]"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300",
                  ].join(" ")}
                >
                  <div className="text-2xl mb-2">✏️</div>
                  <p className={["text-sm font-extrabold", inputMode === "sketch" ? "text-[#2d7a71]" : "text-gray-800"].join(" ")}>
                    手書き・イラスト
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                    スケッチや画像をアップロード。ロゴ・イラスト・写真もOK。
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className={[
                    "rounded-2xl border-2 p-5 text-left transition-all",
                    inputMode === "text"
                      ? "border-sky-500 bg-sky-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300",
                  ].join(" ")}
                >
                  <div className="text-2xl mb-2">Aa</div>
                  <p className={["text-sm font-extrabold", inputMode === "text" ? "text-sky-700" : "text-gray-800"].join(" ")}>
                    テキスト
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
                    文字・フレーズを入力。店名・メッセージ・英語フレーズなど。
                  </p>
                </button>
              </div>
            </div>

            {/* Input Card */}
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 shadow-inner mt-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-7 w-7 rounded-full bg-[#2d7a71] text-white text-xs font-black flex items-center justify-center shrink-0">2</div>
                <p className="text-sm font-black text-gray-800">{inputMode === "sketch" ? "画像をアップロード" : "ネオンにするテキストを入力"}</p>
              </div>

              <div className="mt-5">
                {inputMode === "sketch" ? (
                  <div className="rounded-2xl bg-white border border-gray-200 p-1 flex flex-col justify-center min-h-[200px]">
                    {!sketchDataUrl ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex-1 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-12 text-sm font-bold text-gray-600 hover:border-[#2d7a71]/50 hover:bg-[#e8f5f3] transition-all flex flex-col items-center justify-center gap-2"
                      >
                        <span className="text-2xl">＋</span>
                        画像を選択
                        <span className="block text-[10px] font-normal text-gray-400">JPG / PNG (最大8MB) ・ 手書きラフでもOK</span>
                      </button>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sketchDataUrl} alt="アップロード画像" className="h-48 w-full rounded-lg object-contain" />
                        <div className="mt-3 flex items-center justify-between px-2">
                          <p className="text-xs text-gray-600 font-bold">アップロード済み</p>
                          <button
                            type="button"
                            disabled={isGenerating}
                            className="text-xs font-bold text-rose-500 hover:text-rose-600 underline underline-offset-2 disabled:opacity-50"
                            onClick={() => { setSketchDataUrl(null); setAiImageDataUrl(null); setAiError(null); setTubeLengthCm(null); }}
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
                        if (!f.type.startsWith("image/")) { alert("画像ファイルを選択してください。"); return; }
                        if (f.size > 8 * 1024 * 1024) { alert("ファイルサイズは8MB以下にしてください。"); return; }
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const url = ev.target?.result as string;
                          setSketchDataUrl(url); setAiImageDataUrl(null); setAiError(null); setTubeLengthCm(null);
                        };
                        reader.readAsDataURL(f);
                      }}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={userText}
                      onChange={(e) => setUserText(e.target.value)}
                      disabled={isGenerating}
                      placeholder={"例：OPEN\n例：Café au Lait\n例：ありがとう"}
                      rows={4}
                      className="w-full rounded-2xl bg-white border border-gray-300 px-5 py-4 text-base font-bold text-gray-900 placeholder:text-gray-400 focus:border-[#2d7a71] focus:outline-none focus:ring-1 focus:ring-[#2d7a71]/30 resize-none transition-all disabled:opacity-50"
                    />
                    <p className="text-[11px] text-gray-400 px-1">日本語・英語どちらもOK。改行すると複数行のデザインになります。</p>
                  </div>
                )}
              </div>
            </div>

            {/* Controls Card */}
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-7 w-7 rounded-full bg-[#2d7a71] text-white text-xs font-black flex items-center justify-center shrink-0">3</div>
                <p className="text-sm font-black text-gray-800">サイズと色を選ぶ</p>
              </div>
              <div className="space-y-8">
                {/* Size slider */}
                <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-6 transition-all hover:border-emerald-200">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-lg font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
                        希望サイズ選択（全体の横幅）
                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-[10px] font-black text-emerald-700 animate-pulse">
                          ここで調整
                        </span>
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-500 font-bold">設置場所に合わせてサイズを選んでください。金額が自動更新されます。</p>
                    </div>
                    <p className="text-2xl font-black text-emerald-700 tabular-nums">{Math.round(widthMm)}<span className="text-sm ml-0.5">mm</span></p>
                  </div>
                  <div className="relative mt-6 px-2">
                    <input
                      className="w-full accent-emerald-600 h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
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
                    <div className="mt-3 flex justify-between text-[11px] text-zinc-400 font-bold">
                      <span className="flex flex-col items-center gap-1">
                        <span className="h-1.5 w-0.5 bg-zinc-300 rounded-full" />
                        200mm
                      </span>
                      <span className="flex flex-col items-center gap-1">
                        <span className="h-1.5 w-0.5 bg-zinc-300 rounded-full" />
                        700mm
                      </span>
                      <span className="flex flex-col items-center gap-1">
                        <span className="h-1.5 w-0.5 bg-zinc-300 rounded-full" />
                        1200mm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Color multi-select */}
                <div>
                  <div className="flex items-end justify-between gap-4 border-b border-zinc-100 pb-3">
                    <p className="text-lg font-extrabold text-zinc-900 tracking-tight">色を選ぶ（最大5色まで）</p>
                    <p className="text-sm font-bold text-zinc-500">選択中：{selectedColors.length}色</p>
                  </div>
                  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
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
                              <span className={[
                                "font-black text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
                                ["cool-white-8000k", "off-white-6000k", "warm-white-4000k", "lamp-orange-3000k", "lemon-yellow"].includes(c.id)
                                  ? "text-black/80"
                                  : "text-white"
                              ].join(" ")}>
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

                {/* Design Mode — 手書きのみ表示 */}
                {inputMode === "sketch" && <div>
                  <div className="flex items-end justify-between gap-4 border-b border-zinc-100 pb-3">
                    <p className="text-lg font-extrabold text-zinc-900 tracking-tight">仕上げモードを選ぶ</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={() => setDesignMode("faithful")}
                      className={[
                        "rounded-2xl border-2 p-4 text-left transition-all disabled:opacity-50",
                        designMode === "faithful"
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-300",
                      ].join(" ")}
                    >
                      <p className={["text-sm font-extrabold", designMode === "faithful" ? "text-emerald-700" : "text-zinc-800"].join(" ")}>
                        忠実モード
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-zinc-400">スケッチをそのままネオン化。手書きの雰囲気を残したい場合に。</p>
                    </button>
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={() => setDesignMode("designer")}
                      className={[
                        "rounded-2xl border-2 p-4 text-left transition-all disabled:opacity-50",
                        designMode === "designer"
                          ? "border-violet-500 bg-violet-50 shadow-sm"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-300",
                      ].join(" ")}
                    >
                      <p className={["text-sm font-extrabold", designMode === "designer" ? "text-violet-700" : "text-zinc-800"].join(" ")}>
                        ✨ AIデザイナー
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-zinc-400">AIが線を整えプロ風に補正。ラフなスケッチでもきれいに仕上がります。</p>
                    </button>
                  </div>
                </div>}

                {/* Font Style — テキストのみ表示 */}
                {inputMode === "text" && <div>
                  <div className="flex items-end justify-between gap-4 border-b border-zinc-100 pb-3">
                    <p className="text-lg font-extrabold text-zinc-900 tracking-tight">フォントを選ぶ</p>
                    <span className="text-xs font-bold text-zinc-400">
                      {FONT_STYLES.find(f => f.id === fontStyle)?.category}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {FONT_STYLES.map((f) => {
                      const isSelected = fontStyle === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          disabled={isGenerating}
                          onClick={() => setFontStyle(f.id)}
                          className={[
                            "rounded-2xl border-2 px-4 py-3 text-left transition-all disabled:opacity-50",
                            isSelected
                              ? "border-sky-400 bg-sky-50 shadow-sm"
                              : "border-zinc-100 bg-zinc-50 hover:border-zinc-300",
                          ].join(" ")}
                        >
                          {/* フォントプレビュー */}
                          <p
                            className="text-2xl leading-tight truncate"
                            style={{ fontFamily: `'${f.googleFamily}', sans-serif`, color: isSelected ? "#0369a1" : "#18181b" }}
                          >
                            {userText.trim() || f.name}
                          </p>
                          <div className="mt-1 flex items-center justify-between gap-1">
                            <p className="text-[10px] font-bold text-zinc-400">{f.name}</p>
                            <span className={[
                              "text-[9px] font-black px-1.5 py-0.5 rounded-full",
                              isSelected ? "bg-sky-100 text-sky-600" : "bg-zinc-100 text-zinc-400",
                            ].join(" ")}>
                              {f.category}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>}

                {/* CTA */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="h-7 w-7 rounded-full bg-[#2d7a71] text-white text-xs font-black flex items-center justify-center shrink-0">4</div>
                    <p className="text-sm font-black text-gray-800">AIでイメージを生成する</p>
                  </div>
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
              <div className="mt-10 border-t border-gray-100 bg-gray-50 p-6 sm:p-10 rounded-b-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-xl font-extrabold text-gray-900 mb-8 border-l-4 border-[#2d7a71] pl-4">
                  {isGenerating ? "生成中..." : "作成結果"}
                </h3>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Image Display */}
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#0f1117] shadow-xl min-h-[300px] flex items-center justify-center relative">
                    {isGenerating ? (
                      <div className="w-full max-w-sm px-8 py-12 flex flex-col items-center justify-center space-y-6">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 bg-[#2d7a71]/20 blur-xl rounded-full animate-pulse" />
                          <div className="h-16 w-16 relative">
                            <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                            <div className="absolute inset-0 border-4 border-[#2d7a71] rounded-full border-t-transparent animate-spin" />
                          </div>
                        </div>

                        <div className="w-full space-y-3">
                          <p className="text-[#2d7a71] text-sm font-bold text-center h-5 transition-all duration-300 ease-in-out">
                            {loadingMessages[loadingStep]}
                          </p>

                          {/* Progress Bar */}
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2d7a71] rounded-full transition-all duration-[4500ms] ease-linear"
                              style={{ width: `${Math.min(((loadingStep + 1) / loadingMessages.length) * 100, 95)}%` }}
                            />
                          </div>
                        </div>

                        <p className="text-white/40 text-xs text-center mt-4">
                          高画質でレンダリングしているため、<br/>通常20〜40秒ほどかかります。
                        </p>
                      </div>
                    ) : aiImageDataUrl && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={aiImageDataUrl}
                          alt="作成結果"
                          className="block h-auto w-full"
                          style={{ maxHeight: "75vh", objectFit: "contain" }}
                        />
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="absolute bottom-4 right-4 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold text-white hover:bg-white/30 transition-colors"
                        >
                          画像を保存する
                        </button>
                      </>
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
                            ¥{formatYen(Math.max(Math.round((priceYenExTax * 1.1) / 1000) * 1000, 28000))}
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
                              <span>¥3,000（別途）</span>
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-zinc-500 ml-1">メールアドレス（デザイン保存用）</label>
                        <input
                          type="email"
                          placeholder="example@mail.com"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={isGenerating || isEstimating || !aiImageDataUrl || !isEmailValid || isOrdering}
                        className="w-full rounded-2xl bg-[#2d7a71] py-5 text-base font-black text-white hover:bg-[#24635b] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none disabled:cursor-not-allowed"
                      >
                        {isOrdering ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            決済へ移動中...
                          </span>
                        ) : !isEmailValid && aiImageDataUrl ? (
                          "メールを入力して注文へ"
                        ) : (
                          "この内容で注文する"
                        )}
                      </button>
                      <p className="text-center text-[10px] text-zinc-400 font-bold leading-relaxed">
                        ここから先は決済のため、<br className="sm:hidden" />提携ショップ（BASE）へ移動します
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 制作事例ギャラリー */}
        <div id="gallery" className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">制作事例</h2>
            <p className="mt-2 text-sm text-gray-500">イラストや手書きスケッチから、ここまでリアルなネオンサインに仕上がります。</p>
          </div>

          {/* Before/After 3点 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { before: "/eximg/before-cake.png", after: "/eximg/after-cake.jpg", label: "ショートケーキ", desc: "ウォームホワイト×レッド", price: "¥35,000〜", size: "300mm" },
              { before: "/eximg/before-shaved-ice.png", after: "/eximg/after-shavedice.png", label: "かき氷", desc: "ピンク×ブルー×グリーン", price: "¥38,000〜", size: "300mm" },
              { before: "/eximg/before-ramen.png", after: "/eximg/after-ramen.jpg", label: "ラーメン", desc: "レッド×ウォームホワイト×イエロー", price: "¥45,000〜", size: "300mm" },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-2">
                  <div className="bg-gray-50 p-3 flex items-center justify-center border-r border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.before} alt="before" className="w-full h-24 object-contain" />
                  </div>
                  <div className="bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.after} alt="after" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-gray-800">{item.label}</p>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#2d7a71]">{item.price}</p>
                    <p className="text-[10px] text-gray-400">{item.size} / 税込送料込</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* After-only ギャラリー */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { src: "/eximg/after-chameleon.jpg", label: "カメレオン", desc: "グリーン×ホワイト×オレンジ" },
              { src: "/eximg/after-softcream.png", label: "ソフトクリーム", desc: "クールホワイト×イエロー" },
              { src: "/eximg/after-deer.jpg", label: "鹿＋文字", desc: "イエロー×ウォームホワイト" },
              { src: "/eximg/after-open.png", label: "OPENサイン", desc: "オレンジ×ブルー" },
            ].map(item => (
              <div key={item.label} className="group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2">
                  <p className="text-[11px] font-bold text-gray-800">{item.label}</p>
                  <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 制作・お届けについて */}
      <section className="bg-white border-t border-gray-200 mt-10">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900">制作・お届けについて</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "📦",
                title: "梱包・配送",
                items: [
                  "ヤマト運輸・佐川急便にて発送",
                  "厳重な梱包で安全にお届け",
                  "お届け時に外観チェックをお願いします",
                ],
              },
              {
                icon: "📅",
                title: "お届けまでの目安",
                items: [
                  "ご注文確定後 最短2週間〜4週間",
                  "デザイン確認・修正に1〜3営業日",
                  "製作期間：約1〜2週間",
                  "繁忙期は期間が延びる場合があります",
                ],
              },
              {
                icon: "🛠️",
                title: "製品仕様",
                items: [
                  "チューブ径：7mm LEDチューブ（標準）",
                  "アクリルパネル付き（壁掛け対応）",
                  "電源アダプター・取付金具一式付属",
                  "消費電力：約5〜20W（サイズによる）",
                ],
              },
            ].map(section => (
              <div key={section.title} className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">{section.icon}</div>
                <h3 className="font-black text-gray-900 mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#2d7a71] font-black mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ご注意事項 */}
      <section className="bg-amber-50 border-t border-amber-100">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-2xl font-black text-gray-900">ご注意事項</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "AIイメージはあくまで参考です",
                body: "生成された画像は完成イメージのシミュレーションです。実際の製品と色・光の強さ・細部のデザインが異なる場合があります。",
              },
              {
                title: "モニターと実物の色の違い",
                body: "お使いのモニターの設定により、表示色と実物のネオン管の発色が異なって見える場合があります。ご了承ください。",
              },
              {
                title: "ハンドメイドによる個体差",
                body: "LEDチューブは1本1本手作業で曲げて製作しています。わずかな形状の差異が生じる場合があります。",
              },
              {
                title: "非常に細かいデザインについて",
                body: "1mm以下の細部や、極めて小さい文字は再現が難しい場合があります。事前にご相談いただけると確実です。",
              },
              {
                title: "著作権・商標について",
                body: "他社ブランドロゴ・キャラクターなど著作権・商標権のあるデザインは承りかねます。オリジナルデザインのご依頼をお願いします。",
              },
              {
                title: "キャンセル・返品について",
                body: "完全オーダーメイド製品のため、製作開始後のキャンセル・変更はお受けできません。デザイン確認後の製作開始となります。",
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-amber-200 p-5">
                <p className="font-extrabold text-gray-900 text-sm mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ビフォーアフター制作事例 */}
      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900">手書きスケッチ → ネオンサイン</h2>
            <p className="mt-2 text-sm text-gray-500">ラフなスケッチでも、ここまでリアルに変換されます。</p>
          </div>
          <div className="grid gap-8">
            {[
              {
                before: "/eximg/before-ramen.png",
                after: "/eximg/after-ramen.jpg",
                beforeLabel: "ラーメンのフリーイラスト",
                afterLabel: "レッド×ウォームホワイト×イエロー",
              },
              {
                before: "/eximg/before-cake.png",
                after: "/eximg/after-cake.jpg",
                beforeLabel: "ショートケーキのイラスト",
                afterLabel: "ウォームホワイト×レッド",
              },
            ].map((ex, i) => (
              <div key={i} className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Before — スケッチ</span>
                  <p className="text-sm font-bold text-gray-700 mt-1 mb-3">{ex.beforeLabel}</p>
                  <div className="aspect-[4/3] rounded-xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ex.before} alt="Before" className="w-full h-full object-contain opacity-80 mix-blend-multiply" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#2d7a71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2d7a71]">After — AI Neon</span>
                  <p className="text-sm font-bold text-gray-700 mt-1 mb-3">{ex.afterLabel}</p>
                  <div className="aspect-[4/3] rounded-xl bg-[#0b0f12] border border-gray-300 overflow-hidden flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ex.after} alt="After" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-sm font-black">ChameNeon工房</span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-gray-400 font-bold">
            <a href="https://chameneon.base.shop/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">BASE ショップ</a>
            <a href="mailto:admin@chameneon.jp" className="hover:text-white transition-colors">お問い合わせ</a>
          </div>
          <p className="text-xs text-gray-600">&copy; 2025 ChameNeon工房</p>
        </div>
      </footer>
    </main>
  );
}
