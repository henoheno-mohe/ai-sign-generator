import type { BackgroundTemplate } from "@/lib/backgrounds";
import { NEON_PALETTE_14, type NeonColor } from "@/lib/palette";

/**
 * Neon Sign Protocol (v1)
 * 目的: 「いわゆるネオンサイン」の実物仕上がりに寄せた生成指示を統一する
 *
 * 前提（ユーザー要件）
 * - 屋内限定
 * - 単線（1本チューブ表現）
 * - 発光幅: φ5 / φ7 / φ9 mm のネオンチューブで構成
 * - 透明アクリルパネルで挟み込み（表裏） + 四隅スタンドオフ金具
 * - 14色パレットから最大3色（主色1＋アクセント2）
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

  // 画像生成モデル向けに、英語で「商品写真っぽさ」を強く指示（日本語だけより安定しやすい）
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
- TUBE STYLE: Choose the most appropriate mapping style based on the stroke thickness of the input sketch:
  1. SINGLE-LINE STYLE: For thin lines or script fonts, the neon tube should follow the center of each stroke.
  2. OUTLINE STYLE: For bold or thick text/shapes, the neon tube should trace the OUTLINE (contour) of the shape rather than fill it.
  - The tube itself must always maintain a uniform φ${tubeDiameter}mm thickness regardless of the style.
- TUBE DETAILS: Clear 2mm gap between adjacent tubes. Rounded end-caps at tips.
- MOUNTING: Front + back acrylic sandwich. The acrylic is offset from the wall by the 4 standoffs.
- Real-world scale: overall sign width approx ${targetWidth}mm.
- Height: Auto-determined by design while keeping natural proportions.
- Margin: The rectangular acrylic must be large enough to contain the design with a consistent border.

LIGHTING:
- Realistic neon glow + soft halo on the wall.
- NO excessive lens flare, NO fake bokeh, keep it like a clean product photo.
- Keep colors accurate and vivid, but not oversaturated.
- Keep the wall and room lighting warm (night warm ambience), matching the scene requirements.
- The neon tube MUST look emissive: bright luminous core + diffused outer glow.
- IMPORTANT: Do NOT look like printed/painted lines on acrylic. It must be a real glowing tube.

${colorInstruction}

BACKGROUND:
- Use this wall style: ${background.name} (${background.description})
- Warm indoor wall lighting, realistic texture, subtle noise/grain like a real camera photo.

DO NOT:
- Do not change the content/shape provided by the input (no redesign).
- Do not turn it into channel letters or box letters.
- Do not add extra objects (bulbs, random decorations, unrelated logos).

OUTPUT:
- One realistic installed neon sign photo on the wall.
${text ? `\nTEXT (optional input, keep exact):\n${text}\n` : ""}`.trim();
}


