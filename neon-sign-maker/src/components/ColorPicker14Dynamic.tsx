'use client';

import React from "react";
import type { NeonColor } from "@/lib/palette";

export default function ColorPicker14Dynamic({
  palette,
  colors,
  onChange,
  maxColors = 5,
}: {
  palette: NeonColor[];
  colors: NeonColor[]; // length = colorCount (1..maxColors)
  onChange: (next: NeonColor[]) => void;
  maxColors?: number;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (activeIndex > colors.length - 1) setActiveIndex(colors.length - 1);
  }, [activeIndex, colors.length]);

  function setSlotColor(idx: number, color: NeonColor) {
    const next = colors.slice();
    next[idx] = color;
    onChange(next);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">色（14色パレット）</h2>
          <p className="mt-1 text-sm text-zinc-300">
            まず色数を決めて、同じ数だけ色を選びます（上限{maxColors}色）。
          </p>
        </div>
        <div className="text-xs text-zinc-400">選択中: {slotLabel(activeIndex)}</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-5">
        {colors.map((c, idx) => (
          <SlotButton
            key={idx}
            label={slotLabel(idx)}
            color={c}
            active={idx === activeIndex}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2">
        {palette.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSlotColor(activeIndex, c)}
            className="group relative h-9 w-9 rounded-lg border border-white/10 hover:border-white/25 transition-colors"
            title={`${c.name} (${c.hex})`}
          >
            <span
              className="absolute inset-0 rounded-lg"
              style={{
                backgroundColor: c.hex,
                boxShadow: `0 0 0 1px rgba(0,0,0,0.25) inset, 0 0 18px ${c.hex}55`,
              }}
            />
            <span className="sr-only">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SlotButton({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: NeonColor;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-3 py-3 text-left transition-colors",
        active ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="mt-0.5 truncate text-sm font-semibold">{color.name}</p>
        </div>
        <span
          className="h-7 w-7 rounded-lg border border-white/10"
          style={{ backgroundColor: color.hex, boxShadow: `0 0 14px ${color.hex}66` }}
        />
      </div>
    </button>
  );
}

function slotLabel(idx: number) {
  if (idx === 0) return "主色";
  return `アクセント${idx}`;
}


