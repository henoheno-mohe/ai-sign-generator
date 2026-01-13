'use client';

import React from "react";
import HeroFixedBeforeAfter from "@/components/HeroFixedBeforeAfter";
import UploadAndText from "@/components/UploadAndText";
import type { NeonColor } from "@/lib/palette";
import ColorPicker14Dynamic from "@/components/ColorPicker14Dynamic";
import NeonPreviewGrid from "@/components/NeonPreviewGrid";
import { NEON_PALETTE_14 } from "@/lib/palette";
import { getDefaultBackground } from "@/lib/backgrounds";
import { NEON_PROTOCOL_V1 } from "@/lib/neonProtocol";
import {
  FIXED_YEN_PER_CM_TUBE,
  estimatePriceYenExTaxFromTubeLength,
  formatYen,
} from "@/lib/quote";
import { estimateTubeLengthCmFromNeonPhoto } from "@/lib/lineLength";

export default function StudioClient() {
  const [sketchDataUrl, setSketchDataUrl] = React.useState<string | null>(null);
  const [text, setText] = React.useState("");
  const [colorCount, setColorCount] = React.useState<number>(3);
  const [colors, setColors] = React.useState<NeonColor[]>(() => [
    NEON_PALETTE_14[0],
    NEON_PALETTE_14[5],
    NEON_PALETTE_14[9],
  ]);
  const [widthMm, setWidthMm] = React.useState<number>(600);
  const tubeDiameter = NEON_PROTOCOL_V1.defaultTubeDiameter;
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [aiImageDataUrl, setAiImageDataUrl] = React.useState<string | null>(null);
  const [aiError, setAiError] = React.useState<string | null>(null);
  const [isEstimating, setIsEstimating] = React.useState(false);
  const [tubeLengthCm, setTubeLengthCm] = React.useState<number | null>(null);
  const unitYenPerCm = FIXED_YEN_PER_CM_TUBE;

  const canGenerate = Boolean(sketchDataUrl || text.trim());
  const background = getDefaultBackground();

  const priceYenExTax =
    tubeLengthCm == null ? null : estimatePriceYenExTaxFromTubeLength(tubeLengthCm, unitYenPerCm);

  // 色数変更に追従して配列を増減
  React.useEffect(() => {
    const n = Math.max(1, Math.min(5, colorCount));
    setColors((prev) => {
      if (prev.length === n) return prev;
      if (prev.length > n) return prev.slice(0, n);
      // 足りない分はパレット先頭から埋める（重複OK、ユーザーが後で変える）
      const next = prev.slice();
      while (next.length < n) next.push(NEON_PALETTE_14[Math.min(next.length, NEON_PALETTE_14.length - 1)]);
      return next;
    });
  }, [colorCount]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-zinc-200">neon-sign-maker</div>
          <div className="text-xs text-zinc-400">
            MVP: 設置イメージ（B）をリアルに生成
          </div>
        </div>

        <header>
          <h1 className="text-3xl font-bold">作成イメージ</h1>
          <p className="mt-2 text-sm text-zinc-300">
            ネオンサインを簡単シミュレーション。作成イメージ＋見積まで一発。
          </p>
        </header>

        <HeroFixedBeforeAfter />

        <UploadAndText
          imageDataUrl={sketchDataUrl}
          onImageChange={(next) => {
            setSketchDataUrl(next);
            setAiImageDataUrl(null);
            setAiError(null);
          }}
          text={text}
          onTextChange={(next) => {
            setText(next);
            setAiImageDataUrl(null);
            setAiError(null);
          }}
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">サイズ（横幅）</h2>
              <p className="mt-1 text-sm text-zinc-300">
                透明アクリル板の外寸（全体幅）を指定します。縦幅は文字/ロゴの形に合わせて自動調整します。
              </p>
            </div>
            <div className="text-xs text-zinc-400">現在: {widthMm}mm</div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              min={200}
              max={2000}
              step={10}
              value={widthMm}
              onChange={(e) => {
                const n = Number(e.target.value);
                setWidthMm(Number.isFinite(n) ? n : 600);
                setAiImageDataUrl(null);
                setAiError(null);
              }}
              className="w-40 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
            />
            <span className="text-sm text-zinc-300">mm</span>
            <span className="text-xs text-zinc-500">（目安：400〜900mm）</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">色数</h2>
              <p className="mt-1 text-sm text-zinc-300">まず色数（上限5色）を選んでください。</p>
            </div>
            <div className="text-xs text-zinc-400">現在: {colorCount}色</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setColorCount(n);
                  setAiImageDataUrl(null);
                  setAiError(null);
                }}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  colorCount === n ? "bg-white text-black" : "bg-white/10 text-zinc-200 hover:bg-white/15",
                ].join(" ")}
              >
                {n}色
              </button>
            ))}
          </div>
        </div>

        <ColorPicker14Dynamic
          palette={NEON_PALETTE_14}
          colors={colors}
          maxColors={5}
          onChange={(next) => {
            setColors(next);
            setAiImageDataUrl(null);
            setAiError(null);
          }}
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">AIでリアルに生成</h2>
              <p className="mt-1 text-sm text-zinc-300">
                商品写真のような設置イメージを1枚生成します（ネオンチューブ＋透明アクリル＋四隅金具）。
              </p>
            </div>
            <button
              type="button"
              disabled={!canGenerate || isGenerating}
              onClick={async () => {
                if (!canGenerate) return;
                setIsGenerating(true);
                setAiError(null);
                setTubeLengthCm(null);
                setIsEstimating(true);
                try {
                  // 1) AI生成（サーバー側）
                  const resp = await fetch("/api/neon/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      sketchDataUrl,
                      text,
                      colors,
                      widthMm,
                      tubeDiameter,
                    }),
                  });
                  const data = await resp.json();
                  if (!resp.ok) throw new Error(data?.error || "生成に失敗しました");
                  setAiImageDataUrl(data.imageDataUrl);

                  // 2) 生成された“設置写真”からチューブ長推定（ユーザー要件に合わせる）
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
              }}
              className={[
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                !canGenerate || isGenerating
                  ? "bg-white/10 text-zinc-500 cursor-not-allowed"
                  : "bg-fuchsia-300 text-black hover:bg-fuchsia-200",
              ].join(" ")}
            >
              {isGenerating ? "作成中..." : "作成イメージ"}
            </button>
          </div>

          {!canGenerate && (
            <p className="mt-3 text-xs text-zinc-400">※ 手書きをアップロードするか、テキストを入力してください。</p>
          )}
          {aiError && <p className="mt-3 text-sm text-red-300">{aiError}</p>}
        </div>

        {aiImageDataUrl && (
          <>
            <NeonPreviewGrid
              templates={[background]}
              text={text}
              sketchDataUrl={sketchDataUrl}
              colors={colors}
              aiImageDataUrl={aiImageDataUrl}
            />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-lg font-semibold">見積（税別）</p>
                <p className="text-2xl font-bold text-fuchsia-200">
                  {priceYenExTax == null ? "—" : `¥${formatYen(priceYenExTax)}`}
                </p>
              </div>
              <div className="mt-3 grid gap-1 text-sm text-zinc-300">
                <p>・横幅: {Math.round(widthMm)}mm</p>
                <p>
                  ・推定チューブ長:{" "}
                  {isEstimating || tubeLengthCm == null ? "計算中..." : `${tubeLengthCm.toFixed(0)}cm`}
                </p>
                <p>・単価（固定）: ¥{formatYen(unitYenPerCm)} / cm</p>
              </div>
              <p className="mt-2 text-[11px] text-zinc-400">
                ※単価は固定（横幅100cmのサンプル：チューブ長11m、¥82,400税別 → 約75円/cm）です。
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}


