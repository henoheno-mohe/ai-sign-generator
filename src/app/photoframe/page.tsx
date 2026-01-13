'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { googleDriveService, Photo } from '@/lib/googleDrive';
import {
  loadSettings,
  cachePhotos,
  getCachedPhotos,
  isCacheValid,
  isInSleepTime,
  PhotoFrameSettings,
} from '@/lib/photoFrameSettings';

export default function PhotoFramePage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<PhotoFrameSettings | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showControls, setShowControls] = useState(false);
  
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepCheckTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 初期化
  useEffect(() => {
    initializePhotoFrame();
    
    // Service Worker登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }
    
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      if (sleepCheckTimerRef.current) clearInterval(sleepCheckTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  // 時計更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // スリープチェック
  useEffect(() => {
    if (!settings) return;
    
    const checkSleep = () => {
      const shouldSleep = isInSleepTime(settings);
      setIsSleeping(shouldSleep);
    };
    
    checkSleep();
    sleepCheckTimerRef.current = setInterval(checkSleep, 60000); // 1分ごとにチェック
    
    return () => {
      if (sleepCheckTimerRef.current) clearInterval(sleepCheckTimerRef.current);
    };
  }, [settings]);

  // スライドショー
  useEffect(() => {
    if (!settings || isPaused || isSleeping || photos.length === 0) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }
    
    slideTimerRef.current = setInterval(() => {
      nextPhoto();
    }, settings.slideInterval);
    
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [settings, isPaused, isSleeping, photos.length, currentIndex]);

  // 初期化処理
  async function initializePhotoFrame() {
    try {
      setIsLoading(true);
      const loadedSettings = loadSettings();
      setSettings(loadedSettings);

      // Google Driveにサインインしているか確認
      await googleDriveService.loadGapi();
      
      if (!googleDriveService.isSignedIn()) {
        // サインインしていない場合は設定ページへ
        router.push('/photoframe/setup');
        return;
      }

      // PhotoFrameフォルダIDが設定されているか確認
      if (!loadedSettings.photoFolderId) {
        router.push('/photoframe/setup');
        return;
      }

      // 写真を読み込み
      await loadPhotos(loadedSettings);
      
    } catch (err) {
      console.error('Initialization error:', err);
      setError('初期化に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  // 写真を読み込み
  async function loadPhotos(loadedSettings: PhotoFrameSettings) {
    try {
      // キャッシュが有効ならキャッシュから読み込み
      if (loadedSettings.cachePhotos && isCacheValid(loadedSettings)) {
        const cached = getCachedPhotos();
        if (cached) {
          setPhotos(cached.photos);
          
          // ランダム再生なら順番をシャッフル
          if (loadedSettings.randomOrder) {
            setPhotos(shuffleArray(cached.photos));
          }
          return;
        }
      }

      // Google Driveから読み込み
      if (!loadedSettings.photoFolderId) {
        throw new Error('PhotoFrame folder not configured');
      }

      const allPhotos = await googleDriveService.getAllPhotos(loadedSettings.photoFolderId);
      
      if (allPhotos.length === 0) {
        setError('写真が見つかりませんでした。Google Driveの「PhotoFrame」フォルダに日付フォルダを作成し、写真を追加してください。');
        return;
      }

      // キャッシュに保存
      if (loadedSettings.cachePhotos) {
        cachePhotos(allPhotos);
      }

      // ランダム再生なら順番をシャッフル
      const orderedPhotos = loadedSettings.randomOrder ? shuffleArray(allPhotos) : allPhotos;
      setPhotos(orderedPhotos);
      
    } catch (err) {
      console.error('Failed to load photos:', err);
      setError('写真の読み込みに失敗しました');
    }
  }

  // 配列をシャッフル
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // 次の写真
  function nextPhoto() {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }

  // 前の写真
  function prevPhoto() {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }

  // タッチ操作
  function handleTouchStart(e: React.TouchEvent) {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    
    // 長押しで設定画面へ
    longPressTimerRef.current = setTimeout(() => {
      router.push('/photoframe/settings');
    }, 1500);
  }

  function handleTouchMove(e: React.TouchEvent) {
    // 長押しタイマーをキャンセル
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    // 長押しタイマーをキャンセル
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // スワイプ判定（横方向の移動が縦方向より大きい）
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // 右スワイプ：前の写真
        prevPhoto();
      } else {
        // 左スワイプ：次の写真
        nextPhoto();
      }
    } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      // タップ：一時停止/再開
      setIsPaused(!isPaused);
      setShowControls(true);
      setTimeout(() => setShowControls(false), 2000);
    }
  }

  // 写真更新
  async function refreshPhotos() {
    if (!settings) return;
    setIsLoading(true);
    try {
      await loadPhotos(settings);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8">
        <div className="text-white text-xl mb-4">⚠️ エラー</div>
        <div className="text-white text-center mb-8">{error}</div>
        <button
          onClick={() => router.push('/photoframe/setup')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          設定画面へ
        </button>
      </div>
    );
  }

  if (isSleeping) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-gray-600 text-xl">スリープ中</div>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 写真表示 */}
      {currentPhoto && (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={googleDriveService.getPhotoUrl(currentPhoto.id)}
            alt={currentPhoto.name}
            className="max-w-full max-h-full object-contain transition-opacity duration-1000"
            style={{
              opacity: settings?.transition === 'fade' ? 1 : 1,
            }}
          />
        </div>
      )}

      {/* 時計・日付表示 */}
      {settings?.showClock && (
        <div className="absolute top-8 left-8 text-white drop-shadow-lg">
          <div className="text-6xl font-light mb-2">
            {currentTime.toLocaleTimeString('ja-JP', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          {settings?.showDate && (
            <div className="text-2xl opacity-80">
              {currentTime.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short',
              })}
            </div>
          )}
        </div>
      )}

      {/* 写真情報 */}
      {settings?.showPhotoInfo && currentPhoto && (
        <div className="absolute bottom-8 left-8 text-white drop-shadow-lg opacity-60">
          <div className="text-sm">{currentPhoto.name}</div>
          <div className="text-xs">
            {new Date(currentPhoto.createdTime).toLocaleDateString('ja-JP')}
          </div>
        </div>
      )}

      {/* コントロール表示 */}
      {showControls && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 rounded-full p-8">
          <div className="text-white text-4xl">
            {isPaused ? '⏸️' : '▶️'}
          </div>
        </div>
      )}

      {/* プログレス表示 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div
          className="h-full bg-white opacity-30"
          style={{
            width: `${((currentIndex + 1) / photos.length) * 100}%`,
          }}
        />
      </div>

      {/* リフレッシュボタン（デバッグ用） */}
      {settings?.showPhotoInfo && (
        <button
          onClick={refreshPhotos}
          className="absolute top-8 right-8 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg text-sm hover:bg-opacity-30"
        >
          🔄 更新
        </button>
      )}
    </div>
  );
}

