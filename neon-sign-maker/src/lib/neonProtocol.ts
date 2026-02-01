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
- VIEWPOINT: STRICTLY FRONT VIEW (straight-on shot). ABSOLUTELY NO angled shots, NO perspective distortion, NO side views. The camera must be perfectly parallel to the sign.
- LED neon flex / neon tube sign, single-stroke look, uniform tube thickness.
- Tube diameter / glow width: approximately φ${tubeDiameter}mm.
- Tube placement detail: MUST keep a clear 2mm gap between adjacent tubes. Tubes should not touch each other.
- Tube ends: MUST have slightly rounded end-caps (round tips). ABSOLUTELY NO sharp or flat cut ends.
- Mounted using clear acrylic panels (front + back acrylic sandwich).
- Acrylic shape: MUST be a SINGLE, PERFECTLY FLAT RECTANGULAR PLATE. ABSOLUTELY NO contour cutting. DO NOT follow the neon tube's outline. The acrylic must be a simple, clean, non-cut rectangle with straight 90-degree corners.
- Visible standoff hardware: STRICTLY ONLY 4 round standoff caps at the four corners of the rectangular plate. Do NOT add any extra standoffs or mounting points in the middle or other areas.
- The acrylic panel is slightly offset from the wall with clear standoff spacers, casting subtle realistic shadows.
- Real-world scale: the overall sign width should be approximately ${targetWidth}mm.
- Height should be auto-determined by the design (logo/text) while keeping natural proportions.
- Acrylic panel size should fit the design with reasonable margins (do not crop the design).

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


