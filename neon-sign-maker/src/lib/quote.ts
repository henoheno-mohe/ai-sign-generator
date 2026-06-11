export const SAMPLE_WIDTH_MM = 1000; // 100cm
export const SAMPLE_PRICE_YEN_EX_TAX = 82400;

// 固定単価（円/cm）
// 推定チューブ長(cm) × 150円（税別）
export const FIXED_YEN_PER_CM_TUBE = 150;

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

export function estimateDeliveryWeeks(_tubeLengthCm: number): string {
  return "約2週間";
}

export function estimateDeliveryDate(_tubeLengthCm: number): string {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

