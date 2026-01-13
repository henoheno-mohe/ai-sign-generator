'use client';

import React from "react";

export default function UploadAndText({
  imageDataUrl,
  onImageChange,
  text,
  onTextChange,
}: {
  imageDataUrl: string | null;
  onImageChange: (next: string | null) => void;
  text: string;
  onTextChange: (next: string) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  function handleFiles(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください。");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("ファイルサイズは8MB以下にしてください。");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      onImageChange(url);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFiles(f);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">入力</h2>
      <p className="mt-1 text-sm text-zinc-300">手書き（単線）でも、テキストでもOK。</p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {/* Upload */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">手書きアップロード</p>
            {imageDataUrl && (
              <button
                type="button"
                onClick={() => onImageChange(null)}
                className="text-xs text-zinc-300 hover:text-white"
              >
                削除
              </button>
            )}
          </div>

          {!imageDataUrl ? (
            <div
              className={[
                "mt-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
                dragActive ? "border-fuchsia-300 bg-fuchsia-300/5" : "border-white/15 hover:border-white/25",
              ].join(" ")}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
              }}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <p className="text-sm text-zinc-200">ドラッグ&ドロップ</p>
              <p className="mt-1 text-xs text-zinc-400">またはクリックして画像を選択（JPG/PNG, 8MB以下）</p>
              <p className="mt-3 text-xs text-zinc-400">
                コツ：白紙に黒ペンで描くとプレビューが見やすいです
              </p>
            </div>
          ) : (
            <div className="mt-2 rounded-xl border border-white/10 bg-black/30 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageDataUrl}
                alt="アップロード画像"
                className="h-56 w-full rounded-lg object-contain bg-black/20"
              />
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFiles(f);
            }}
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-semibold">テキスト（任意）</p>
          <p className="mt-1 text-xs text-zinc-400">誤字防止のため、文字ネオンの場合は入力推奨。</p>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={6}
            placeholder="例：NIGHT OWL / 推しの名前 / 好きな言葉 など"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
          />
        </div>
      </div>
    </div>
  );
}


