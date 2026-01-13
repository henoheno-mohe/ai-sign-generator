'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  loadSettings,
  saveSettings,
  clearPhotoCache,
  PhotoFrameSettings,
  defaultSettings,
} from '@/lib/photoFrameSettings';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<PhotoFrameSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
  }, []);

  function handleSave() {
    setIsSaving(true);
    saveSettings(settings);
    
    // キャッシュをクリア（設定変更時は再読み込みが必要）
    clearPhotoCache();
    
    setTimeout(() => {
      setIsSaving(false);
      router.push('/photoframe');
    }, 500);
  }

  function handleCancel() {
    router.push('/photoframe');
  }

  function handleClearCache() {
    if (confirm('写真キャッシュをクリアしますか？次回読み込み時にGoogle Driveから再取得します。')) {
      clearPhotoCache();
      alert('キャッシュをクリアしました');
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">⚙️ フォトフレーム設定</h1>

        {/* スライドショー設定 */}
        <section className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📽️ スライドショー</h2>
          
          <div className="mb-4">
            <label className="block mb-2">スライド間隔</label>
            <select
              value={settings.slideInterval}
              onChange={(e) => setSettings({ ...settings, slideInterval: Number(e.target.value) })}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg"
            >
              <option value={3000}>3秒</option>
              <option value={5000}>5秒</option>
              <option value={10000}>10秒</option>
              <option value={15000}>15秒</option>
              <option value={30000}>30秒</option>
              <option value={60000}>1分</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">トランジション効果</label>
            <select
              value={settings.transition}
              onChange={(e) => setSettings({ ...settings, transition: e.target.value as any })}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg"
            >
              <option value="fade">フェード</option>
              <option value="slide">スライド</option>
              <option value="none">なし</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.randomOrder}
                onChange={(e) => setSettings({ ...settings, randomOrder: e.target.checked })}
                className="w-5 h-5 mr-3"
              />
              <span>ランダム再生</span>
            </label>
          </div>
        </section>

        {/* 表示設定 */}
        <section className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎨 表示</h2>
          
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showClock}
                onChange={(e) => setSettings({ ...settings, showClock: e.target.checked })}
                className="w-5 h-5 mr-3"
              />
              <span>時計を表示</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showDate}
                onChange={(e) => setSettings({ ...settings, showDate: e.target.checked })}
                className="w-5 h-5 mr-3"
              />
              <span>日付を表示</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showPhotoInfo}
                onChange={(e) => setSettings({ ...settings, showPhotoInfo: e.target.checked })}
                className="w-5 h-5 mr-3"
              />
              <span>写真情報を表示</span>
            </label>
          </div>
        </section>

        {/* スリープ設定 */}
        <section className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🌙 スリープ</h2>
          
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sleepEnabled}
                onChange={(e) => setSettings({ ...settings, sleepEnabled: e.target.checked })}
                className="w-5 h-5 mr-3"
              />
              <span>時間帯スリープを有効化</span>
            </label>
          </div>

          {settings.sleepEnabled && (
            <>
              <div className="mb-4">
                <label className="block mb-2">スリープ開始時刻</label>
                <input
                  type="time"
                  value={settings.sleepStartTime}
                  onChange={(e) => setSettings({ ...settings, sleepStartTime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">スリープ終了時刻</label>
                <input
                  type="time"
                  value={settings.sleepEndTime}
                  onChange={(e) => setSettings({ ...settings, sleepEndTime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                />
              </div>
            </>
          )}
        </section>

        {/* キャッシュ設定 */}
        <section className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">💾 キャッシュ</h2>
          
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.cachePhotos}
                onChange={(e) => setSettings({ ...settings, cachePhotos: e.target.checked })}
                className="w-5 h-5 mr-3"
              />
              <span>写真リストをキャッシュ（読み込み高速化）</span>
            </label>
          </div>

          {settings.cachePhotos && (
            <div className="mb-4">
              <label className="block mb-2">更新間隔</label>
              <select
                value={settings.refreshInterval}
                onChange={(e) => setSettings({ ...settings, refreshInterval: Number(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
              >
                <option value={30}>30分</option>
                <option value={60}>1時間</option>
                <option value={180}>3時間</option>
                <option value={360}>6時間</option>
                <option value={720}>12時間</option>
                <option value={1440}>24時間</option>
              </select>
            </div>
          )}

          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            🗑️ キャッシュをクリア
          </button>
        </section>

        {/* Google Drive設定 */}
        <section className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">☁️ Google Drive</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">
              フォルダID: {settings.photoFolderId || '未設定'}
            </p>
          </div>

          <button
            onClick={() => router.push('/photoframe/setup')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            📁 フォルダを再設定
          </button>
        </section>

        {/* 保存・キャンセルボタン */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSaving ? '保存中...' : '✓ 保存してスライドショーへ'}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}

