export type NeonColor = {
  id: string;
  name: string;
  hex: `#${string}`;
};

// Neon palette (14 colors) based on provided "カラーバリエーション" chart
// - whites (4): cool/off/warm/lamp-orange
// - colors (10): red, pink, rose, purple, blue, sky blue, green, lemon yellow, yellow, orange
export const NEON_PALETTE_14: NeonColor[] = [
  // whites
  { id: "cool-white-8000k", name: "クールホワイト（8000K相当）", hex: "#EAF3FF" },
  { id: "off-white-6000k", name: "オフホワイト（6000K相当）", hex: "#F6F7F4" },
  { id: "warm-white-4000k", name: "ウォームホワイト（4000K相当）", hex: "#FFF1D6" },
  { id: "lamp-orange-3000k", name: "ランプオレンジ（3000K相当）", hex: "#FFD1A3" },

  // colors
  { id: "red", name: "red", hex: "#FF1744" },
  { id: "pink", name: "pink", hex: "#FF2DAA" },
  { id: "rose", name: "rose", hex: "#FF4DFF" },
  { id: "purple", name: "purple", hex: "#8A2BFF" },
  { id: "blue", name: "blue", hex: "#2D5BFF" },
  { id: "sky-blue", name: "sky blue", hex: "#00E5FF" },
  { id: "green", name: "green", hex: "#39FF14" },
  { id: "lemon-yellow", name: "lemon yellow", hex: "#FFF200" },
  { id: "yellow", name: "yellow", hex: "#FFB000" },
  { id: "orange", name: "orange", hex: "#FF6A00" }
];


