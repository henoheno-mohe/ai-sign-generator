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
- Aim for high-vibrancy "Neon Gas" colors.
- PALETTE: ${NEON_PALETTE_14.map(c => c.name).join(", ")}`;
  } else {
    colorInstruction = `STRICT COLORS TO USE: ${colors.slice(0, 5).map(c => c.name).join(", ")}. Maintain their individual hue and high saturation.`;
  }

  // V1の安定性をベースに、工場の実物写真のディテール（色の鮮やかさと質感）を注入
  return `CRITICAL TASK:
Generate a high-end product photograph of a custom indoor LED neon sign.
It must look identical in style and lighting to a real-world factory sample photo.

SCENE:
- Shot in a modern interior with a neutral-colored, slightly textured matte wall.
- The neon sign is the primary light source, creating a natural light spill and colorful glow on the wall.
- Straight-on front view, crisp focus, professional studio lighting.

PRODUCT DETAILS (FACTORY STANDARD):
- CONSTRUCTION: Made entirely of physical 3D LED neon flex tubes (circular cross-section, φ${tubeDiameter}mm).
- ACRYLIC: Mounted on a single, high-clarity transparent RECTANGULAR acrylic sheet.
- HARDWARE: Exactly 4 silver cylindrical standoff bolts, one at each corner, reflecting the neon light.
- FINISH: Include realistic details like small black end-caps at tube terminals and smooth, natural bends.
- MANDATORY: Every single line from the design must be a glowing tube. No printing or etching.

COLOR & LIGHTING (NEON GAS STYLE):
- TUBE LOOK: A brilliant, almost white luminous core with a hyper-vivid, saturated color halo.
- VIBRANCY: Colors must be punchy and "electric" (like Electric Blue, Hot Pink, Lemon Yellow).
- GLOW: The glow must feel like actual light radiating onto the wall texture, not a digital blur.

${colorInstruction}
${text ? `\nInclude this text in the design: "${text}"` : ""}

DO NOT:
- Do not redesign or add extra decorative elements.
- Keep the design faithful to the input sketch.`.trim();
}
