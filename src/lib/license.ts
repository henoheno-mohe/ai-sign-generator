import { v4 as uuidv4 } from 'uuid';

// ライセンス情報の型定義
export interface License {
  key: string;
  maxUses: number;
  usedCount: number;
  createdAt: number;
  status: 'active' | 'expired' | 'disabled';
  owner?: string;
  email?: string;
  plan: 'free' | 'standard';
}

// 無料トライアルの設定
export const FREE_TRIAL_USES = 10;
export const STANDARD_LICENSE_USES = 50;

// ライセンスキーを生成
export function generateLicenseKey(): string {
  const uuid = uuidv4();
  // UUID を見やすい形式に変換 (例: ABCD-1234-EFGH-5678)
  const parts = uuid.split('-');
  return `${parts[0].substring(0, 4).toUpperCase()}-${parts[1].toUpperCase()}-${parts[2].substring(0, 4).toUpperCase()}-${parts[3].substring(0, 4).toUpperCase()}`;
}

// 新しいライセンスを作成
export function createLicense(
  plan: 'free' | 'standard' = 'standard',
  owner?: string,
  email?: string
): License {
  return {
    key: generateLicenseKey(),
    maxUses: plan === 'free' ? FREE_TRIAL_USES : STANDARD_LICENSE_USES,
    usedCount: 0,
    createdAt: Date.now(),
    status: 'active',
    owner,
    email,
    plan,
  };
}

// ライセンスキーを検証（フォーマットチェック）
export function validateLicenseKeyFormat(key: string): boolean {
  // フォーマット: XXXX-XXXX-XXXX-XXXX
  const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return regex.test(key);
}

// ライセンスの残り使用回数を取得
export function getRemainingUses(license: License): number {
  return Math.max(0, license.maxUses - license.usedCount);
}

// ライセンスが有効かチェック
export function isLicenseValid(license: License): boolean {
  return (
    license.status === 'active' &&
    license.usedCount < license.maxUses
  );
}

