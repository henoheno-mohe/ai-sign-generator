export type NeonColor = {
  id: string;
  name: string;
  nameJp: string;
  hex: `#${string}`;
};

// Neon palette (14 colors) based on provided "カラーバリエーション" chart
// - whites (4): cool/off/warm/lamp-orange
// - colors (10): red, pink, rose, purple, blue, sky blue, green, lemon yellow, yellow, orange
export const NEON_PALETTE_14: NeonColor[] = [
  // whites
  { id: "cool-white-8000k", name: "cool white", nameJp: "クールホワイト", hex: "#EAF3FF" },
  { id: "off-white-6000k", name: "off white", nameJp: "オフホワイト", hex: "#F6F7F4" },
  { id: "warm-white-4000k", name: "warm white", nameJp: "ウォームホワイト", hex: "#FFF1D6" },
  { id: "lamp-orange-3000k", name: "lamp orange", nameJp: "ランプオレンジ", hex: "#FFD1A3" },

  // colors
  { id: "red", name: "red", nameJp: "レッド", hex: "#FF1744" },
  { id: "pink", name: "pink", nameJp: "ピンク", hex: "#FF2DAA" },
  { id: "rose", name: "rose", nameJp: "ローズ", hex: "#FF4DFF" },
  { id: "purple", name: "purple", nameJp: "パープル", hex: "#8A2BFF" },
  { id: "blue", name: "blue", nameJp: "ブルー", hex: "#2D5BFF" },
  { id: "sky-blue", name: "sky blue", nameJp: "スカイブルー", hex: "#00E5FF" },
  { id: "green", name: "green", nameJp: "グリーン", hex: "#39FF14" },
  { id: "lemon-yellow", name: "lemon yellow", nameJp: "レモンイエロー", hex: "#FFF200" },
  { id: "yellow", name: "yellow", nameJp: "イエロー", hex: "#FFB000" },
  { id: "orange", name: "orange", nameJp: "オレンジ", hex: "#FF6A00" }
];
