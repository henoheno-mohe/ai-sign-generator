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

export function estimateDeliveryWeeks(tubeLengthCm: number): string {
  if (tubeLengthCm < 150) return "約2〜3週間";
  if (tubeLengthCm < 300) return "約3〜4週間";
  return "約4〜6週間";
}

// チューブ長から納品予定日を計算（日数は各レンジの最大値で保守的に見積もる）
export function estimateDeliveryDate(tubeLengthCm: number): string {
  const days = tubeLengthCm < 150 ? 21 : tubeLengthCm < 300 ? 28 : 42;
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

