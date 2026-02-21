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
- Real-world indoor installation shot on a slightly textured, neutral-colored wall.
- The neon sign is the primary light source, creating a soft, colored wash on the wall behind it.
- Natural ambient lighting that allows the textures of the wall and the acrylic to be visible.

PRODUCT MUST MATCH:
- VIEWPOINT: STRAIGHT-ON FRONT VIEW. No extreme angles.
- ACRYLIC PANEL: A single, high-clarity transparent rectangular acrylic sheet.
- EDGE GLOW: The straight-cut edges of the acrylic panel must catch the neon light and glow subtly in the same color as the tubes (edge-lighting effect).
- STANDOFFS: EXACTLY 4 cylindrical silver/chrome metal standoff bolts, one at each corner. They must look like real hardware holding the panel off the wall.
- TUBE STYLE: Realistic LED neon flex tubes with a circular cross-section (φ${tubeDiameter}mm).
- CONNECTORS: Include subtle black end-caps or tiny black wires at the start/end points of the tubes for a professional, factory-finished look.
- SIMPLIFICATION: Maintain the core design but ensure it looks like it's made from physical, bendable tubes (no impossibly sharp points).

LIGHTING:
- FACTORY-ACCURATE EMISSIVE LOOK: The tubes must have a BRILLIANT WHITE LUMINOUS CORE (pure intensity) with a VIBRANT, SATURATED COLOR HALO.
- The color should feel like it's radiating FROM the tube, not just painted ON it.
- VIVIDNESS: Colors should be bright and punchy (like the provided factory samples: bright cyan, hot pink, lemon yellow) but still feel like light.
- HALO: A soft, diffused glow that spills onto the wall and the acrylic surface.
- REALISM: Avoid "perfect" digital glows. It should look like a photograph taken with a high-quality camera, including natural light fall-off and subtle reflections on the acrylic.
- NO lens flare. Keep the focus on the physical object and its light.

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


