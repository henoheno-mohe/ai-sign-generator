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
- CHOOSE the best matching colors (1 to 5 colors) for this design from the provided palette below.
- Do NOT use colors outside of this palette.
- Aim for a visually appealing and balanced color scheme that fits the sketch's intent.
- PALETTE OPTIONS:
${NEON_PALETTE_14.map(c => `- ${c.name} (${c.hex})`).join("\n")}`;
  } else {
    const colorList = colors
      .slice(0, 5)
      .map((c, i) => `- Color ${i + 1}: ${c.name} (${c.hex})`)
      .join("\n");
    colorInstruction = `COLOR RULES (use ONLY these colors; do not introduce any additional colors):
${colorList}`;
  }

  const targetWidth = Math.max(200, Math.min(2000, Math.round(widthMm)));

  // 初期のシンプルで強力なプロトコルを復旧
  return `CRITICAL TASK:
Generate a photorealistic product photo of an indoor neon sign installation (NOT a mockup illustration).

SCENE (DEFAULT):
- Night-time indoor scene.
- Warm ambient lighting (approx 2700K–3000K). Cozy warm tone.
- The neon sign should be the main highlight light source, with soft warm room fill.

PRODUCT MUST MATCH:
- VIEWPOINT: STRICTLY FRONT VIEW (straight-on shot). ABSOLUTELY NO angled shots, NO perspective distortion.
- ACRYLIC PANEL: MUST BE A SINGLE, FLAT, SIMPLE RECTANGULAR SHEET WITH STRAIGHT EDGES.
- IMPORTANT: ABSOLUTELY NO CONTOUR CUTTING. The acrylic must NOT follow the shape of the neon tubes. It must be a simple non-cut rectangle with sharp 90-degree corners.
- STANDOFF HARDWARE: STRICTLY AND ONLY 4 TOTAL. Place them EXACTLY at the four corners of the rectangular plate.
- ABSOLUTELY FORBIDDEN: Do NOT add any standoffs in the middle, top-center, bottom-center, or anywhere else. Only 4 pieces at the corners.
- TUBE STYLE: LED neon flex, uniform φ${tubeDiameter}mm thickness.
- PHYSICAL BENDING LIMITS: ABSOLUTELY NO sharp angles or tiny intricate details. Minimum bend radius is approx 15mm.
- SIMPLIFICATION RULE: If the input design has very small or complex parts, SIMPLIFY them into single, smooth, continuous curves that can be physically formed with a thick LED tube.
- TUBE RENDERING: Choose the most appropriate mapping style:
  1. SINGLE-LINE STYLE: For thin lines, the neon tube should follow the center of each stroke.
  2. OUTLINE STYLE: For bold text/shapes, the neon tube should trace the OUTLINE (contour) of the shape.
- TUBE DETAILS: Tubes must look like physical objects with volume (3D rounded cylinders).
- MOUNTING: Front + back acrylic sandwich. The acrylic is offset from the wall by the 4 standoffs.
- Real-world scale: overall sign width approx ${targetWidth}mm.

LIGHTING:
- Realistic neon glow + soft halo on the wall.
- The neon tube MUST look emissive: bright luminous core + diffused outer glow.
- Keep the wall and room lighting warm (night warm ambience).

${colorInstruction}

BACKGROUND:
- Use this wall style: ${background.name} (${background.description})

DO NOT:
- Do not change the content/shape provided by the input.
- Do not add extra objects (bulbs, random decorations, unrelated logos).

OUTPUT:
- One realistic installed neon sign photo on the wall.
${text ? `\nTEXT (optional input, keep exact):\n${text}\n` : ""}`.trim();
}
