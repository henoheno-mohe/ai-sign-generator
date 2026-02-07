/**
 * BASEの商品ID対応表
 * 金額(1000円単位) -> BASEの商品ID
 */
export const BASE_ITEM_ID_MAP: Record<number, string> = {
  // ここにリストを流し込みます
  // 例: 26000: "134775121",
};

/**
 * 価格に応じたBASEのURLを取得する
 */
export function getBaseItemUrl(price: number): string | null {
  const itemId = BASE_ITEM_ID_MAP[price];
  if (!itemId) return null;
  return `https://chameneon.base.shop/items/${itemId}`;
}

