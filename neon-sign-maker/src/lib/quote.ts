export const SAMPLE_WIDTH_MM = 1000; // 100cm
export const SAMPLE_PRICE_YEN_EX_TAX = 82400;

// 固定単価（円/cm）
// 既知データ: 横幅100cmのサンプルで、チューブ長=11m(=1100cm)、価格=82,400円（税別）
// => 82,400 / 1,100 = 74.9... ≒ 75円/cm
export const FIXED_YEN_PER_CM_TUBE = 75;

export function estimatePriceYenExTaxFromTubeLength(
  tubeLengthCm: number,
  unitYenPerCm: number
): number {
  const safeLen = Math.max(0, tubeLengthCm);
  const safeUnit = Math.max(0, unitYenPerCm);
  return Math.round(safeLen * safeUnit);
}

export function formatYen(n: number): string {
  return new Intl.NumberFormat("ja-JP").format(Math.round(n));
}


