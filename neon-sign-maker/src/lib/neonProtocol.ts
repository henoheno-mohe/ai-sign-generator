import type { BackgroundTemplate } from "@/lib/backgrounds";
import { NEON_PALETTE_14, type NeonColor } from "@/lib/palette";

/**
 * Neon Sign Protocol (v1 & v2)
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

/**
 * 現行のプロンプト (V1)
 * 安定しているが、やや事務的なサンプルのような生成。
 */
export function buildNeonPromptV1({
  userText,
  colors,
  background,
  widthMm,
  tubeDiameter,
  isAutoColor = false,
}: {
  userText: string;
  colors: NeonColor[];
  background: BackgroundTemplate;
  widthMm: number;
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

  return `CRITICAL TASK:
Generate a high-end product photograph of a custom indoor LED neon sign.
It must look identical in style and lighting to a real-world factory sample photo.

SCENE:
- Shot in a modern interior with a neutral-colored, slightly textured matte wall.
- The neon sign is the primary light source, creating a natural light spill and colorful glow on the wall.
- Straight-on front view, crisp focus, professional studio lighting.

PRODUCT DETAILS (FACTORY STANDARD):
- CONSTRUCTION: Made entirely of physical 3D LED neon flex tubes (circular cross-section, φ${tubeDiameter}mm).
- MOUNTING: The neon tubes appear to be FLOATING on the wall, held by a completely transparent, invisible backing.
- HARDWARE: Exactly 4 silver cylindrical standoff bolts, located at the four corners of the invisible rectangular area.
- MANDATORY: Every single element of the design must be rendered as a glowing LED tube LINE/OUTLINE only. No exceptions.
- TUBES: Clean, continuous tubes with smooth, natural bends. No visible connectors or end-caps.
- NO FRAMES: Do NOT draw any outline, border, or frame around the neon tubes. The background is just the wall.

CRITICAL - NO FILLED AREAS (MOST IMPORTANT RULE):
- ABSOLUTELY NO "filled" or "solid" glowing regions. This is the #1 mistake to avoid.
- Large shapes like hair, faces, or bodies must be drawn as OUTLINE TUBES ONLY, NOT as filled glowing silhouettes.
- Think of every element as if it were drawn with a single glowing rope/tube. Only the tube line itself glows.
- The interior of any shape (e.g., inside the hair outline, inside the face outline) must be COMPLETELY DARK and transparent, showing the wall behind.
- NO backlit acrylic, NO area lighting, NO surface illumination. ONLY the tube lines themselves emit light.

COLOR & LIGHTING (NEON GAS STYLE):
- TUBE LOOK: A brilliant, almost white luminous core with a hyper-vivid, saturated color halo.
- VIBRANCY: Colors must be EXTREMELY punchy and "electric" (like Electric Blue, Hot Pink, Lemon Yellow, Vivid Green).
- SATURATION: Use maximum color saturation. The colors should be so vibrant they feel like they're glowing from within.
- GLOW: The glow must feel like actual light radiating onto the wall texture, not a digital blur.
- INTENSITY: The neon sign should be the DOMINANT light source, casting strong colored shadows and reflections.

${colorInstruction}
${text ? `\nInclude this text in the design: "${text}"` : ""}

DO NOT:
- Do not redesign or add extra decorative elements.
- Keep the design faithful to the input sketch.`.trim();
}

/**
 * 改善案のプロンプト (V2 - ABテスト用)
 * よりエモーショナル、シネマティック、SNS映え（Wow感）を重視。
 */
export function buildNeonPromptV2({
  userText,
  colors,
  background,
  widthMm,
  tubeDiameter,
  isAutoColor = false,
}: {
  userText: string;
  colors: NeonColor[];
  background: BackgroundTemplate;
  widthMm: number;
  tubeDiameter: TubeDiameter;
  isAutoColor?: boolean;
}) {
  const text = userText.trim();
  
  let colorInstruction = "";
  if (isAutoColor) {
    colorInstruction = `COLOR PALETTE (CHOOSE FROM): ${NEON_PALETTE_14.map(c => c.name).join(", ")}. Select vibrant colors.`;
  } else {
    colorInstruction = `STRICT COLORS TO USE: ${colors.slice(0, 5).map(c => c.name).join(", ")}.`;
  }

  return `CRITICAL TASK:
Generate a breathtaking, ultra-realistic photograph of a custom LED neon sign.
The image must strictly follow the physical construction details of a premium "Sandwich-style" neon sign.

PHYSICAL CONSTRUCTION (MANDATORY):
- STRUCTURE: The neon tubes are sandwiched between exactly TWO layers of high-quality, perfectly transparent rectangular clear acrylic panels.
- MOUNTING: Exactly FOUR (4) silver cylindrical stainless steel standoff bolts. Place exactly ONE bolt in each of the four corners of the outer rectangular acrylic panel. DO NOT ADD ANY EXTRA BOLTS in the middle.
- ACRYLIC EDGES: The edges of the two rectangular acrylic sheets are straight and polished.
- STRICTLY NO INNER OUTLINES: This is the most important rule. DO NOT draw any cut-to-shape acrylic backing or outlines closely following the neon tubes. DO NOT draw a secondary panel inside the main one. The ONLY acrylic present is the large, flat, rectangular outer sandwich panel. The space between the neon tubes must be completely empty and transparent, showing the wall behind.
- TUBE DETAIL: Precise 7mm thick LED neon flex tubes are embedded inside, creating a soft but intense internal glow that diffuses through the acrylic layers.
- WIRING: A single, thin, discreet transparent or silver wire exiting from the bottom edge of the rectangular panel.

SCENE:
- SETTING: A clean, inorganic, minimalist matte wall (e.g., smooth flat white, light grey plaster, or clean concrete). Do not use busy or distracting backgrounds. The background should feel like a modern, sterile gallery or high-end studio wall.
- LIGHTING: The neon sign is the hero, casting a beautiful, realistic colored light spill onto the smooth wall surface.
- PHOTOGRAPHY: Shot with a high-end DSLR (f/2.8), straight-on frontal view, sharp focus on the neon tubes, with clean professional lighting.

${colorInstruction}
${text ? `\nText to include: "${text}"` : ""}

STYLE RULES:
- Faithful to the input sketch's shape and lines.
- NO extra decorative frames other than the rectangular acrylic sheets.
- MAXIMUM vibrancy and realistic light physics.`.trim();
}

// 互換性のために現行の関数名も残す（内部でV2を呼ぶように変更も可能）
export const buildNeonPrompt = buildNeonPromptV1;
