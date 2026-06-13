import type { BackgroundTemplate } from "@/lib/backgrounds";
import { NEON_PALETTE_14, type NeonColor } from "@/lib/palette";

/**
 * Neon Sign Protocol (v1 & v2)
 * 目的: 「いわゆるネオンサイン」の実物仕上がりに寄せた生成指示を統一する
 */

export type TubeDiameter = 5 | 7 | 9;

export type DesignMode = "faithful" | "designer";

export type FontStyle =
  | "pacifico"
  | "dancing-script"
  | "sacramento"
  | "lobster"
  | "bebas-neue"
  | "oswald"
  | "righteous"
  | "boogaloo"
  | "fredoka-one"
  | "bungee";

export const FONT_STYLES: {
  id: FontStyle;
  name: string;
  googleFamily: string;
  category: "スクリプト" | "ボールド" | "レトロ";
  desc: string;
  prompt: string;
}[] = [
  {
    id: "pacifico",
    name: "Pacifico",
    googleFamily: "Pacifico",
    category: "スクリプト",
    desc: "カフェ・雑貨店向け",
    prompt: "Use Pacifico-style lettering: rounded, bold script with a retro-surf feel and friendly personality.",
  },
  {
    id: "dancing-script",
    name: "Dancing Script",
    googleFamily: "Dancing Script",
    category: "スクリプト",
    desc: "結婚式・サロン向け",
    prompt: "Use Dancing Script-style lettering: elegant flowing cursive with natural letter connections and graceful curves.",
  },
  {
    id: "sacramento",
    name: "Sacramento",
    googleFamily: "Sacramento",
    category: "スクリプト",
    desc: "高級店・ブライダル向け",
    prompt: "Use Sacramento-style lettering: thin, delicate calligraphy with elongated strokes and upscale elegance.",
  },
  {
    id: "lobster",
    name: "Lobster",
    googleFamily: "Lobster",
    category: "スクリプト",
    desc: "バー・ダイナー向け",
    prompt: "Use Lobster-style lettering: bold script with strong personality, thick connected strokes and prominent serifs.",
  },
  {
    id: "bebas-neue",
    name: "Bebas Neue",
    googleFamily: "Bebas Neue",
    category: "ボールド",
    desc: "スポーツ・モダン店舗向け",
    prompt: "Use Bebas Neue-style lettering: all-caps, bold condensed sans-serif with uniform stroke width and strong geometric structure.",
  },
  {
    id: "oswald",
    name: "Oswald",
    googleFamily: "Oswald",
    category: "ボールド",
    desc: "ショップ・看板向け",
    prompt: "Use Oswald-style lettering: slim bold condensed sans-serif, highly readable, clean and modern like professional signage.",
  },
  {
    id: "righteous",
    name: "Righteous",
    googleFamily: "Righteous",
    category: "ボールド",
    desc: "ゲーム・音楽系向け",
    prompt: "Use Righteous-style lettering: bold rounded display font with a near-future vibe, smooth curves and strong presence.",
  },
  {
    id: "boogaloo",
    name: "Boogaloo",
    googleFamily: "Boogaloo",
    category: "レトロ",
    desc: "居酒屋・レトロカフェ向け",
    prompt: "Use Boogaloo-style lettering: playful retro display font inspired by 1960s-70s pop culture, casual and fun.",
  },
  {
    id: "fredoka-one",
    name: "Fredoka One",
    googleFamily: "Fredoka One",
    category: "レトロ",
    desc: "ポップ・キッズ系向け",
    prompt: "Use Fredoka One-style lettering: thick, rounded, cheerful display font with a friendly pop personality.",
  },
  {
    id: "bungee",
    name: "Bungee",
    googleFamily: "Bungee",
    category: "レトロ",
    desc: "クラブ・ストリート系向け",
    prompt: "Use Bungee-style lettering: urban sign-painting style, bold block letters with strong vertical rhythm and street-art energy.",
  },
];

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
  fontStyle,
  designMode = "faithful",
}: {
  userText: string;
  colors: NeonColor[];
  background: BackgroundTemplate;
  widthMm: number;
  tubeDiameter: TubeDiameter;
  isAutoColor?: boolean;
  fontStyle?: FontStyle;
  designMode?: DesignMode;
}) {
  const text = userText.trim();
  const fontDef = fontStyle ? FONT_STYLES.find(f => f.id === fontStyle) : null;

  const paletteColorList = NEON_PALETTE_14.map(c => `${c.name} (${c.hex})`).join(", ");

  let colorInstruction = "";
  if (isAutoColor) {
    colorInstruction = `TUBE COLORS — CHOOSE FROM THIS PALETTE ONLY:
Allowed colors: ${paletteColorList}
- Select 2–3 colors that best fit the design.
- Every tube MUST use one of these exact colors. No other colors allowed.`;
  } else {
    const colorList = colors.slice(0, 5).map(c => `${c.name} (${c.hex})`).join(", ");
    colorInstruction = `TUBE COLORS — USE EXACTLY THESE, NOTHING ELSE:
${colorList}
- Assign these colors to the tubes. Every single tube MUST glow in one of these colors.
- BLACK, DARK GREY, and UNLIT tubes are STRICTLY FORBIDDEN. They do not exist in neon signs.
- If a design element has no assigned color, use the FIRST color in the list above.`;
  }

  return `TASK: Generate a realistic product photo of a custom indoor LED neon sign mounted on a wall.

SCENE & LIGHTING:
- The room is a modern interior with soft, slightly dimmed ambient lighting — like a boutique, nail salon, or café in the late afternoon.
- The wall behind the sign is a light-colored matte surface: warm white, cream, or light beige. The wall is clearly visible and NOT dark.
- The ambient room light is low enough that the neon glow is the most eye-catching element, but NOT so dark that the wall disappears.
- The neon tubes cast vivid colored light pools onto the wall and acrylic, making the glow dramatic against the pale wall.
- Camera: straight-on frontal view, sharp focus. The wall, acrylic panel, and glowing tubes are all clearly visible.

PHYSICAL CONSTRUCTION:
- Transparent rectangular clear acrylic panel (flat, large, covers the entire sign area).
- The acrylic panel is clearly visible and transparent — you can see the light-colored wall through it.
- Exactly 4 silver cylindrical standoff bolts, one at each corner of the acrylic panel.
- LED neon flex tubes (φ${tubeDiameter}mm) are mounted on the acrylic panel surface.
- A single thin wire exits from the bottom edge.

ZERO FILLS — TUBES AND OUTLINES ONLY (ABSOLUTE RULE):
- Every design element MUST be rendered as a glowing LED tube line/outline only.
- FORBIDDEN: filled areas, dark silhouettes, solid color blocks, black or grey regions.
- If a shape has interior area (face, hair, body, food, etc.) — draw ONLY its outline as a glowing tube. Interior shows the wall/acrylic, NEVER a dark fill.
- Think of every element as being drawn with a single glowing rope on the acrylic panel.

${colorInstruction}

NEON TUBE GLOW — THIS IS THE MOST IMPORTANT VISUAL ELEMENT:
- Each tube has THREE distinct layers: (1) a blazing white-hot center core, (2) a vivid fully-saturated color mid-layer, (3) a soft wide outer bloom that diffuses into the surrounding area.
- The tubes must look like they are physically emitting intense light — not painted lines, not flat colored shapes. They must GLOW.
- The colored light from the tubes illuminates the acrylic panel surface, creating a soft backlit halo visible through the clear acrylic.
- The glow also spills onto the wall immediately around the sign, creating soft colored light pools.
- Think: real LED neon flex tube at full brightness in a real shop — the tube itself is almost too bright to look at directly.

${text ? `TEXT TO RENDER: "${text}"
${fontDef ? `LETTERING STYLE: ${fontDef.prompt}` : ""}` : `NO TEXT — DO NOT ADD ANY WORDS OR LETTERS:
- The user provided NO text. Do NOT add any words, letters, labels, captions, or decorative text to the design.
- If the sketch contains text, reproduce it faithfully. Do NOT invent new words.`}

${designMode === "designer" ? `DESIGNER MODE:
- Act as a professional neon sign designer. Use the sketch as a rough brief.
- Clean lines, improve proportions, simplify complex areas for neon production.
- Result should look polished and professional, as if refined by a skilled designer.` : `FAITHFUL MODE:
- Keep the design strictly faithful to the input sketch.
- Do not add or remove design elements.`}`.trim();
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
  fontStyle,
  designMode = "faithful",
}: {
  userText: string;
  colors: NeonColor[];
  background: BackgroundTemplate;
  widthMm: number;
  tubeDiameter: TubeDiameter;
  isAutoColor?: boolean;
  fontStyle?: FontStyle;
  designMode?: DesignMode;
}) {
  const text = userText.trim();
  const fontDef = fontStyle ? FONT_STYLES.find(f => f.id === fontStyle) : null;

  const paletteColorList = NEON_PALETTE_14.map(c => `${c.name} (${c.hex})`).join(", ");

  let colorInstruction = "";
  if (isAutoColor) {
    colorInstruction = `TUBE COLORS — CHOOSE FROM THIS PALETTE ONLY:
Allowed: ${paletteColorList}
Pick 2–3 colors that best suit the design. All tubes MUST use colors from this list.`;
  } else {
    const colorList = colors.slice(0, 5).map(c => `${c.name} (${c.hex})`).join(", ");
    colorInstruction = `TUBE COLORS — EXACTLY THESE, NO OTHERS:
${colorList}
Every tube MUST glow in one of these colors. BLACK or DARK tubes are FORBIDDEN — they do not exist in real neon signs. Unassigned elements use the first color.`;
  }

  return `TASK: Render a premium product photo of a custom "sandwich-style" LED neon sign.

PHYSICAL CONSTRUCTION:
- ONE large flat transparent rectangular acrylic panel (no shape-cut inner panel).
- Exactly 4 silver standoff bolts — one at each corner of the rectangle only.
- LED neon flex tubes (φ${tubeDiameter}mm) mounted on the acrylic surface.
- Single thin wire exits from the bottom edge.
- The acrylic is transparent — the wall is visible through it.

SCENE & LIGHTING:
- Background: modern interior with slightly dimmed ambient lighting — a boutique, nail salon, or café atmosphere.
- The wall is a light-colored matte surface (warm white, cream, or light beige) — clearly visible, NOT dark.
- Ambient light is low enough that the neon glow stands out dramatically, but the wall is always visible and pale.
- The neon casts vivid colored light pools on the wall and acrylic, creating beautiful glow contrast against the pale surface.
- Camera: straight-on frontal view, sharp focus. Wall, acrylic panel, and glowing tubes all clearly visible.

ABSOLUTE RULES — NO FILLS, ONLY GLOWING TUBE LINES:
- Every element of the design = a single glowing tube outline only.
- FORBIDDEN: filled shapes, dark areas, black regions, unlit tubes, dark silhouettes.
- Interior areas of shapes (face, body, food, objects) must be empty, showing the wall/acrylic through them.

${colorInstruction}

NEON TUBE GLOW — THE MOST IMPORTANT VISUAL ELEMENT:
- Each tube MUST have three visible layers: (1) blazing white-hot center core, (2) vivid fully-saturated color mid-layer, (3) wide soft outer bloom diffusing into the surroundings.
- The tubes must look like they are PHYSICALLY EMITTING INTENSE LIGHT — not painted lines, not flat shapes. They must radiate and bloom.
- The colored glow illuminates the acrylic surface (visible as a soft backlit halo) and spills onto the wall around the sign as colored light pools.
- Imagine real LED neon flex at full power in a real boutique — the tube core is near-white and almost too bright to look at directly, surrounded by a wide saturated color bloom.

${text ? `TEXT: "${text}"
${fontDef ? `LETTERING: ${fontDef.prompt}` : ""}` : `NO TEXT — DO NOT ADD ANY WORDS OR LETTERS:
- The user provided NO text. Do NOT invent or add any words, letters, labels, or captions.
- If the sketch contains text, reproduce it faithfully. Do NOT add anything extra.`}

${designMode === "designer" ? `DESIGNER MODE: Polish the sketch into a professional neon sign design. Clean lines, balanced proportions, simplified for tube production. Maintain the original concept.` : `FAITHFUL MODE: Reproduce the sketch accurately as neon tubes. Do not change the design.`}`.trim();
}

// 互換性のために現行の関数名も残す（内部でV2を呼ぶように変更も可能）
export const buildNeonPrompt = buildNeonPromptV1;
