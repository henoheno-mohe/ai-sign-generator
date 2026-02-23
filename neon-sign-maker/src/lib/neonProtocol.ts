import type { BackgroundTemplate } from "@/lib/backgrounds";
import { NEON_PALETTE_14, type NeonColor } from "@/lib/palette";

/**
 * Neon Sign Protocol (v1)
 * 目的: 「いわゆるネオンサイン」の実物仕上がりに寄せた生成指示を統一する
 */

export type TubeDiameter = 5 | 7 | 9;

export const NEON_PROTOCOL_V1 = {
  productName: "屋内ネオンサイン（アクリルパネル挟み込み）",
  tubeDiameters: [5, 7, 9] as const,
  defaultTubeDiameter: 7 as const,
  maxColors: 3,
  paletteSize: 14,
} as const;

export function buildNeonPrompt({
  userText,
  colors,
  background,
  widthMm,
  tubeDiameter,
  isAutoColor = false,
}: {
  userText: string;
  colors: NeonColor[]; // used if isAutoColor is false
  background: BackgroundTemplate;
  widthMm: number; // target overall width in mm
  tubeDiameter: TubeDiameter;
  isAutoColor?: boolean;
}) {
  const text = userText.trim();
  
  let colorInstruction = "";
  if (isAutoColor) {
    colorInstruction = `COLOR RULES:
- CHOOSE the most vibrant and matching colors from the provided palette.
- PALETTE: ${NEON_PALETTE_14.map(c => c.name).join(", ")}`;
  } else {
    colorInstruction = `COLORS TO USE: ${colors.slice(0, 5).map(c => c.name).join(", ")}`;
  }

  // AIが理解しやすいようにシンプルで強力なプロンプトに再構築
  return `High-quality product photograph of a custom LED neon sign installed on a ${background.name}.

DESIGN RULES:
- EVERY line and shape from the input must be rendered as a physical, 3D glowing LED neon tube (flex tube).
- NO part of the design should be printed or painted; everything must be a luminous tube.
- The sign is mounted on a single, flat, transparent rectangular acrylic panel.
- There are exactly 4 silver standoff bolts, one at each corner of the rectangular panel.

LIGHTING & REALISM:
- The neon tubes must have a brilliant, saturated glow with a bright emissive core.
- A soft, colorful light spill (halo) should radiate from the tubes onto the wall behind.
- Straight-on front view, professional product photography lighting, realistic textures.
- The overall look should be clean, modern, and high-end, matching the quality of a professional signage factory.

${colorInstruction}
${text ? `\nInclude this text in the design: "${text}"` : ""}
`.trim();
}
