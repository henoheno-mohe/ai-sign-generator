// 看板見積もり計算ロジック

// 価格表データ（チャンネル文字の面積ベース）
export const SIGNBOARD_PRICING = {
  // LW 200の価格表（単位：円）
  bySize: {
    300: {
      type1: 30000,  // ① カップリング（フチあり）
      type2: 25000,  // ② ふちなし
      type3: 20000,  // ③ バックライト
      type4: 20000,  // ④ 正面発光
      type5: 25000,  // ⑤ 側面発光
      type6: 20000,  // ⑥ 背面発光 - ネオン風のベース
    },
    400: {
      type1: 35000,
      type2: 30000,
      type3: 33000,
      type4: 40000,
      type5: 45000,
      type6: 30000,
    },
    500: {
      type1: 45000,
      type2: 40000,
      type3: 40000,
      type4: 60000,
      type5: 70000,
      type6: 40000,
    },
    600: {
      type1: 70000,
      type2: 60000,
      type3: 60000,
      type4: 100000,
      type5: 120000,
      type6: 50000,
    },
    '600plus': { // 600mm以上
      type1: 100000,
      type2: 75000,
      type3: 75000,
      type4: 150000,
      type5: 180000,
      type6: 60000,
    }
  },
  
  // 特殊係数
  multipliers: {
    neon: 1.8,      // ⑦ ネオン風（⑥の金額×1.8）
    installation: 1.5  // 装牛せ望価（取付費用）×1.5
  }
};

// 看板タイプと価格表タイプのマッピング
export function getTypeKey(signboardType: string): string {
  const typeMap: { [key: string]: string } = {
    'led-channel-face': 'type4',  // ④ 正面発光
    'led-channel-side': 'type5',  // ⑤ 側面発光
    'led-channel-back': 'type3',  // ③ バックライト
    'flat': 'type2',              // ② ふちなし
    'neon': 'type6',              // ⑦ ネオンサイン（⑥のベース×1.8）
    'wooden': 'type2',            // ② ふちなし（木製は平面扱い）
    'acrylic': 'type1',           // ① カップリング（フチあり）
  };
  return typeMap[signboardType] || 'type4';
}

// 横幅と文字数から1文字あたりのサイズを計算してカテゴリを判定
export function getSizeCategory(widthMm: number, textLength: number): keyof typeof SIGNBOARD_PRICING.bySize {
  // 1文字あたりのサイズ = 横幅 ÷ 文字数
  const sizePerChar = widthMm / textLength;
  
  if (sizePerChar < 250) return 300;  // 200mmカテゴリ（300として扱う）
  if (sizePerChar < 350) return 300;
  if (sizePerChar < 450) return 400;
  if (sizePerChar < 550) return 500;
  if (sizePerChar < 650) return 600;
  return '600plus';
}

// 見積もり計算
export interface QuoteResult {
  pricePerChar: number;       // 1文字あたりの単価
  textLength: number;         // 文字数
  basePrice: number;          // 基本価格（単価×文字数）
  multiplier: number;         // 係数（ネオンの場合×1.8）
  finalPrice: number;         // 最終価格
  sizePerChar: number;        // 1文字あたりのサイズ（mm）
  sizeCategory: string;       // サイズカテゴリ
  signboardTypeName: string;  // 看板タイプ名
  priceBreakdown: {
    label: string;
    value: number;
  }[];
}

export function calculateQuote(
  signboardType: string,
  widthMm: number,
  textLength: number
): QuoteResult {
  const typeKey = getTypeKey(signboardType);
  const sizePerChar = widthMm / textLength;
  const sizeCategory = getSizeCategory(widthMm, textLength);
  
  // 1文字あたりの単価を取得
  let pricePerChar = SIGNBOARD_PRICING.bySize[sizeCategory][typeKey as keyof typeof SIGNBOARD_PRICING.bySize[typeof sizeCategory]];
  
  // ネオンの場合は⑥のベース価格×1.8
  let multiplier = 1.0;
  if (signboardType === 'neon') {
    pricePerChar = SIGNBOARD_PRICING.bySize[sizeCategory].type6;
    multiplier = SIGNBOARD_PRICING.multipliers.neon;
  }
  
  // 基本価格 = 単価 × 文字数
  const basePrice = pricePerChar * textLength;
  
  // 最終価格 = 基本価格 × 係数（ネオンの場合）
  const finalPrice = Math.round(basePrice * multiplier);
  
  // 看板タイプ名
  const typeNames: { [key: string]: string } = {
    'led-channel-face': '④ 正面発光',
    'led-channel-side': '⑤ 側面発光',
    'led-channel-back': '③ バックライト',
    'flat': '② ふちなし',
    'neon': '⑦ ネオン風',
    'wooden': '② ふちなし（木製）',
    'acrylic': '① カップリング（フチあり）',
  };
  
  // 価格内訳
  const priceBreakdown = [
    { label: `1文字あたりの単価（${Math.round(sizePerChar)}mm）`, value: pricePerChar },
    { label: `文字数`, value: textLength },
    { label: `基本価格（単価×文字数）`, value: basePrice },
  ];
  
  if (multiplier !== 1.0) {
    priceBreakdown.push({ label: `ネオン風係数 (×${multiplier})`, value: finalPrice });
  }
  
  return {
    pricePerChar,
    textLength,
    basePrice,
    multiplier,
    finalPrice,
    sizePerChar: Math.round(sizePerChar),
    sizeCategory: `${sizeCategory}mm`,
    signboardTypeName: typeNames[signboardType] || signboardType,
    priceBreakdown
  };
}

