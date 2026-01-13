'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { googleDriveService } from '@/lib/googleDrive';
import { loadSettings, saveSettings } from '@/lib/photoFrameSettings';

export default function SetupPage() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [folderName, setFolderName] = useState('PhotoFrame');
  const [folderId, setFolderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'signin' | 'folder' | 'complete'>('signin');

  useEffect(() => {
    checkSignInStatus();
  }, []);

  async function checkSignInStatus() {
    try {
      await googleDriveService.loadGapi();
      const signedIn = googleDriveService.isSignedIn();
      setIsSignedIn(signedIn);
      
      if (signedIn) {
        setStep('folder');
        // 既存の設定を確認
        const settings = loadSettings();
        if (settings.photoFolderId) {
          setFolderId(settings.photoFolderId);
        }
      }
    } catch (err) {
      console.error('Failed to check sign in status:', err);
      setError('Google APIの初期化に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignIn() {
    try {
      setIsLoading(true);
      setError(null);
      await googleDriveService.signIn();
      setIsSignedIn(true);
      setStep('folder');
    } catch (err) {
      console.error('Sign in failed:', err);
      setError('サインインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFindFolder() {
    try {
      setIsLoading(true);
      setError(null);
      
      const foundId = await googleDriveService.findFolderByName(folderName);
      
      if (!foundId) {
        setError(`「${folderName}」フォルダが見つかりませんでした。Google Driveにフォルダを作成してください。`);
        return;
      }
      
      setFolderId(foundId);
      
      // 設定を保存
      const settings = loadSettings();
      settings.photoFolderId = foundId;
      saveSettings(settings);
      
      setStep('complete');
      
    } catch (err) {
      console.error('Failed to find folder:', err);
      setError('フォルダの検索に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await googleDriveService.signOut();
      setIsSignedIn(false);
      setStep('signin');
      setFolderId(null);
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  }

  function handleComplete() {
    router.push('/photoframe');
  }

  if (isLoading && step === 'signin') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">📸 フォトフレーム セットアップ</h1>

        {/* ステップ1: サインイン */}
        {step === 'signin' && (
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">☁️</div>
              <h2 className="text-2xl font-semibold mb-4">Google Driveと連携</h2>
              <p className="text-gray-400 mb-8">
                写真を表示するには、Google Driveアカウントでサインインしてください。
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900 bg-opacity-50 rounded-lg text-red-200">
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold"
            >
              {isLoading ? 'サインイン中...' : 'Google アカウントでサインイン'}
            </button>

            <div className="mt-8 p-4 bg-gray-700 bg-opacity-50 rounded-lg text-sm text-gray-300">
              <p className="mb-2">📝 必要な権限:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Google Driveファイルの読み取り（写真を表示するため）</li>
              </ul>
            </div>
          </div>
        )}

        {/* ステップ2: フォルダ設定 */}
        {step === 'folder' && (
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📁</div>
              <h2 className="text-2xl font-semibold mb-4">フォルダを設定</h2>
              <p className="text-gray-400 mb-8">
                Google Drive内の写真フォルダ名を入力してください。
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900 bg-opacity-50 rounded-lg text-red-200">
                ⚠️ {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">フォルダ名</label>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="PhotoFrame"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
              />
            </div>

            {folderId && (
              <div className="mb-6 p-4 bg-green-900 bg-opacity-30 rounded-lg text-green-200 text-sm">
                ✓ フォルダが見つかりました<br />
                ID: {folderId}
              </div>
            )}

            <div className="mb-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg text-sm text-blue-200">
              <p className="mb-2">📌 フォルダ構成の例:</p>
              <pre className="text-xs">
{`📁 PhotoFrame/
  📁 2024-12-01/
    📷 IMG_001.jpg
    📷 IMG_002.jpg
  📁 2024-12-25/
    📷 IMG_010.jpg
  📁 2025-01-01/
    📷 IMG_020.jpg`}
              </pre>
              <p className="mt-2 text-xs">
                ※ 日付フォルダは「YYYY-MM-DD」形式で作成してください
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleFindFolder}
                disabled={isLoading || !folderName}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
              >
                {isLoading ? '検索中...' : folderId ? '✓ フォルダ設定済み' : '🔍 フォルダを検索'}
              </button>
              {folderId && (
                <button
                  onClick={() => setStep('complete')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  次へ →
                </button>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="w-full mt-4 px-4 py-2 text-gray-400 hover:text-white text-sm"
            >
              別のアカウントでサインイン
            </button>
          </div>
        )}

        {/* ステップ3: 完了 */}
        {step === 'complete' && (
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-semibold mb-4">セットアップ完了！</h2>
              <p className="text-gray-400 mb-8">
                フォトフレームの準備ができました。<br />
                スライドショーを開始できます。
              </p>
            </div>

            <div className="mb-8 p-6 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="font-semibold mb-4">📱 使い方</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>👆 <strong>タップ</strong>: 一時停止/再開</li>
                <li>👈 <strong>左スワイプ</strong>: 次の写真</li>
                <li>👉 <strong>右スワイプ</strong>: 前の写真</li>
                <li>👇 <strong>長押し（1.5秒）</strong>: 設定画面を開く</li>
              </ul>
            </div>

            <div className="mb-8 p-6 bg-blue-900 bg-opacity-30 rounded-lg">
              <h3 className="font-semibold mb-4">📲 PWAとしてインストール</h3>
              <p className="text-sm text-gray-300 mb-4">
                ホーム画面に追加すると、アプリのように使えます：
              </p>
              <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                <li>Safariの共有ボタンをタップ</li>
                <li>「ホーム画面に追加」を選択</li>
                <li>「追加」をタップ</li>
              </ol>
            </div>

            <button
              onClick={handleComplete}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-semibold"
            >
              🎬 スライドショーを開始
            </button>

            <button
              onClick={() => router.push('/photoframe/settings')}
              className="w-full mt-4 px-4 py-2 text-gray-400 hover:text-white text-sm"
            >
              ⚙️ 詳細設定を変更
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

