export type BackgroundTemplate = {
  id: "brick" | "whitewall" | "concrete";
  name: string;
  description: string;
  className: string; // Tailwind-compatible utility string
};

export const BACKGROUND_TEMPLATES: BackgroundTemplate[] = [
  {
    id: "brick",
    name: "レンガ",
    description: "バー/ゲーム部屋っぽい",
    className:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_2px,transparent_2px,transparent_24px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_2px,transparent_2px,transparent_48px)] bg-[#2a1b13]"
  },
  {
    id: "whitewall",
    name: "白壁",
    description: "部屋/ギフトに合わせやすい",
    className:
      "bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.04),transparent_45%),linear-gradient(180deg,#f7f7f7,#eaeaea)]"
  },
  {
    id: "concrete",
    name: "コンクリ",
    description: "クール/都会っぽい",
    className:
      "bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.10),transparent_55%),repeating-linear-gradient(45deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_2px,transparent_2px,transparent_18px)] bg-[#35393f]"
  }
];

// MVP: 設置イメージは1枚でOK（白壁をデフォルトにする）
export const DEFAULT_BACKGROUND_ID: BackgroundTemplate["id"] = "whitewall";

export function getDefaultBackground(): BackgroundTemplate {
  return BACKGROUND_TEMPLATES.find((t) => t.id === DEFAULT_BACKGROUND_ID) ?? BACKGROUND_TEMPLATES[0];
}


