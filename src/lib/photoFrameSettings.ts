// フォトフレーム設定の型定義とストレージ管理

export interface PhotoFrameSettings {
  // Google Drive設定
  photoFolderId: string | null;  // 「PhotoFrame」フォルダのID
  
  // スライドショー設定
  slideInterval: number;  // スライド間隔（ミリ秒）
  transition: 'fade' | 'slide' | 'none';  // トランジション効果
  randomOrder: boolean;  // ランダム再生
  
  // 表示設定
  showClock: boolean;  // 時計表示
  showDate: boolean;  // 日付表示
  showPhotoInfo: boolean;  // 写真情報表示
  
  // スリープ設定
  sleepEnabled: boolean;  // スリープ機能有効/無効
  sleepStartTime: string;  // スリープ開始時刻（HH:mm形式）
  sleepEndTime: string;  // スリープ終了時刻（HH:mm形式）
  
  // キャッシュ設定
  cachePhotos: boolean;  // 写真をキャッシュ
  refreshInterval: number;  // 写真リスト更新間隔（分）
  
  // 最終更新
  lastPhotoRefresh: string | null;  // 最終写真リスト更新日時
}

// デフォルト設定
export const defaultSettings: PhotoFrameSettings = {
  photoFolderId: null,
  slideInterval: 5000,  // 5秒
  transition: 'fade',
  randomOrder: true,
  showClock: true,
  showDate: true,
  showPhotoInfo: false,
  sleepEnabled: true,
  sleepStartTime: '23:00',
  sleepEndTime: '07:00',
  cachePhotos: true,
  refreshInterval: 60,  // 60分
  lastPhotoRefresh: null,
};

const SETTINGS_KEY = 'photoframe-settings';
const PHOTOS_CACHE_KEY = 'photoframe-photos-cache';

/**
 * 設定を保存
 */
export function saveSettings(settings: PhotoFrameSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/**
 * 設定を読み込み
 */
export function loadSettings(): PhotoFrameSettings {
  if (typeof window === 'undefined') return defaultSettings;
  
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return defaultSettings;
  
  try {
    return { ...defaultSettings, ...JSON.parse(stored) };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return defaultSettings;
  }
}

/**
 * 設定をリセット
 */
export function resetSettings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SETTINGS_KEY);
}

/**
 * 写真リストをキャッシュ
 */
export function cachePhotos(photos: any[]): void {
  if (typeof window === 'undefined') return;
  const cache = {
    photos,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(PHOTOS_CACHE_KEY, JSON.stringify(cache));
}

/**
 * キャッシュされた写真リストを取得
 */
export function getCachedPhotos(): { photos: any[]; timestamp: string } | null {
  if (typeof window === 'undefined') return null;
  
  const cached = localStorage.getItem(PHOTOS_CACHE_KEY);
  if (!cached) return null;
  
  try {
    return JSON.parse(cached);
  } catch (error) {
    console.error('Failed to load cached photos:', error);
    return null;
  }
}

/**
 * 写真キャッシュをクリア
 */
export function clearPhotoCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PHOTOS_CACHE_KEY);
}

/**
 * 現在時刻がスリープ時間内かチェック
 */
export function isInSleepTime(settings: PhotoFrameSettings): boolean {
  if (!settings.sleepEnabled) return false;
  
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const start = settings.sleepStartTime;
  const end = settings.sleepEndTime;
  
  // 日をまたぐ場合（例: 23:00 - 07:00）
  if (start > end) {
    return currentTime >= start || currentTime < end;
  }
  
  // 日をまたがない場合（例: 01:00 - 05:00）
  return currentTime >= start && currentTime < end;
}

/**
 * キャッシュが有効期限内かチェック
 */
export function isCacheValid(settings: PhotoFrameSettings): boolean {
  const cached = getCachedPhotos();
  if (!cached) return false;
  
  const cacheTime = new Date(cached.timestamp);
  const now = new Date();
  const diffMinutes = (now.getTime() - cacheTime.getTime()) / 1000 / 60;
  
  return diffMinutes < settings.refreshInterval;
}

