'use client';

import React from "react";
import type { BackgroundTemplate } from "@/lib/backgrounds";

export default function NeonPreviewGrid({
  templates,
  aiImageDataUrl,
}: {
  templates: BackgroundTemplate[];
  aiImageDataUrl?: string | null;
}) {
  if (!aiImageDataUrl) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">設置イメージ</h2>
          <p className="mt-1 text-sm text-zinc-300">
            AI生成のリアル設置イメージです。
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-1">
        {templates.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-black/30">
              {/* AI生成画像は「切れない」表示にする：固定高さをやめて、画像サイズに合わせて可変 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aiImageDataUrl}
                alt="AI生成の設置イメージ"
                className="block w-full h-auto"
                style={{ maxHeight: "75vh", objectFit: "contain" }}
              />
            </div>
            <div className="p-3" />
          </div>
        ))}
      </div>
    </div>
  );
}


