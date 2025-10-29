'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/ImageUpload';
import DesignSelector from '@/components/DesignSelector';
import ResultDisplay from '@/components/ResultDisplay';
import LicenseInput from '@/components/LicenseInput';
import { callNanoBananaAPIWithRetry, generateSignboardPrompt, generateReferenceImagePrompt, convertImageToBase64 } from '@/lib/nanoBananaAPI';
import { config } from '@/lib/config';
import { FREE_TRIAL_USES } from '@/lib/license';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedSignboardType, setSelectedSignboardType] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponseInfo, setApiResponseInfo] = useState<{
    text_response?: string;
    processing_method?: string;
    signboard_type?: string;
  } | null>(null);

  // ライセンス管理
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [remainingUses, setRemainingUses] = useState<number>(0);
  const [useFreeTrialCount, setUseFreeTrialCount] = useState<number>(0);
  const [showLicenseInput, setShowLicenseInput] = useState(false);

  // 初回ロード時にlocalStorageからライセンス情報を取得
  useEffect(() => {
    const storedLicense = localStorage.getItem('ai-sign-license');
    const storedFreeTrialCount = localStorage.getItem('ai-sign-free-trial-count');
    
    if (storedLicense) {
      // ライセンスキーがある場合、検証
      verifyStoredLicense(storedLicense);
    } else if (storedFreeTrialCount) {
      // 無料トライアルカウントを復元
      setUseFreeTrialCount(parseInt(storedFreeTrialCount, 10));
    }
  }, []);

  const verifyStoredLicense = async (key: string) => {
    try {
      const response = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: key }),
      });

      if (response.ok) {
        const data = await response.json();
        setLicenseKey(key);
        setRemainingUses(data.license.remaining);
      } else {
        // ライセンスが無効な場合はクリア
        localStorage.removeItem('ai-sign-license');
      }
    } catch (error) {
      console.error('License verification failed:', error);
    }
  };

  const handleLicenseVerified = (key: string, remaining: number) => {
    setLicenseKey(key);
    setRemainingUses(remaining);
    setShowLicenseInput(false);
  };

  const canUseService = (): boolean => {
    if (licenseKey && remainingUses > 0) {
      return true;
    }
    if (!licenseKey && useFreeTrialCount < FREE_TRIAL_USES) {
      return true;
    }
    return false;
  };

  const recordUsage = async () => {
    if (licenseKey) {
      // ライセンスキーがある場合、サーバーで使用回数を記録
      try {
        const response = await fetch('/api/license/use', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ licenseKey }),
        });

        if (response.ok) {
          const data = await response.json();
          setRemainingUses(data.remaining);
        }
      } catch (error) {
        console.error('Usage record failed:', error);
      }
    } else {
      // 無料トライアルの場合、localStorageでカウント
      const newCount = useFreeTrialCount + 1;
      setUseFreeTrialCount(newCount);
      localStorage.setItem('ai-sign-free-trial-count', newCount.toString());
    }
  };

  const handleImageUpload = (imageUrl: string, file?: File) => {
    setUploadedImage(imageUrl);
    if (file) setUploadedFile(file);
    setProcessedImage(null); // 新しい画像がアップロードされたら結果をリセット
    setError(null); // エラーもリセット
    setApiResponseInfo(null); // APIレスポンス情報もリセット
  };

  const handleReferenceImageUpload = (imageUrl: string, file?: File) => {
    setReferenceImage(imageUrl);
    if (file) setReferenceFile(file);
    setProcessedImage(null);
    setError(null);
    setApiResponseInfo(null);
  };

  const handleDesignChange = (theme: string, signboardType: string) => {
    setSelectedTheme(theme);
    setSelectedSignboardType(signboardType);
  };

  const handleProcess = async () => {
    // 参考画像がある場合は看板タイプ不要、ない場合は必須
    const requiresSignboardType = !referenceImage;
    if (!uploadedImage || !uploadedFile || !selectedTheme || (requiresSignboardType && !selectedSignboardType)) return;
    
    // ライセンスチェック
    if (!canUseService()) {
      setError('使用回数の上限に達しました。ライセンスキーを入力してください。');
      setShowLicenseInput(true);
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // APIキーのチェック
      if (!config.nanoBananaApiKey || config.nanoBananaApiKey === 'your_api_key_here' || config.nanoBananaApiKey === 'your_actual_api_key_here') {
        throw new Error('APIキーが設定されていません。.env.localファイルにNEXT_PUBLIC_NANO_BANANA_API_KEYを設定してください。詳細はREADME.mdをご確認ください。');
      }

      console.log('看板リニューアル処理を開始...');

      // 画像をBase64に変換
      const imageBase64 = await convertImageToBase64(uploadedFile);
      
      let prompt: string;
      let imagesToSend: string | string[];
      
      // 参考画像がある場合
      if (referenceImage && referenceFile) {
        console.log('参考画像モード：参考画像のスタイルを再現');
        const referenceBase64 = await convertImageToBase64(referenceFile);
        imagesToSend = [imageBase64, referenceBase64]; // 建物画像、参考画像の順
        prompt = generateReferenceImagePrompt(selectedTheme);
      } else {
        // 通常モード（看板タイプ選択）
        console.log('通常モード：看板タイプ', selectedSignboardType);
        imagesToSend = imageBase64;
        prompt = generateSignboardPrompt(selectedTheme, 'modern', selectedSignboardType);
      }
      
      console.log('プロンプト:', prompt);
      
      // Gemini APIで直接画像を編集
      console.log('Geminiで看板をリニューアル中...');
      const result = await callNanoBananaAPIWithRetry(imagesToSend, prompt, config.nanoBananaApiKey);
      console.log('看板リニューアル完了');
      
      if (result.success && result.edited_image_url) {
        // 成功したら使用回数をカウント
        await recordUsage();
        
        setProcessedImage(result.edited_image_url);
        setApiResponseInfo({
          text_response: result.text_response,
          processing_method: referenceImage ? 'Reference Image Mode' : 'Gemini Native Image Editing',
          signboard_type: referenceImage ? 'Reference Image' : selectedSignboardType
        });
      } else {
        throw new Error(result.error || 'Image processing failed');
      }
      
    } catch (error) {
      console.error('Processing failed:', error);
      
      // エラーメッセージを日本語で表示
      let errorMessage = '画像処理中にエラーが発生しました';
      
      if (error instanceof Error) {
        const message = error.message;
        
        if (message.includes('API key')) {
          errorMessage = 'APIキーが正しく設定されていません。.env.localファイルを確認してください。';
        } else if (message.includes('403') || message.includes('permission')) {
          errorMessage = 'APIキーの権限が不足しています。Google Cloud ConsoleでAPIが有効化されているか確認してください。';
        } else if (message.includes('429') || message.includes('limit')) {
          errorMessage = 'APIの利用制限に達しました。しばらく待ってから再度お試しください。';
        } else if (message.includes('safety')) {
          errorMessage = '画像が安全フィルターに引っかかりました。別の画像をお試しください。';
        } else if (message.includes('network') || message.includes('fetch')) {
          errorMessage = 'ネットワークエラーが発生しました。インターネット接続を確認してください。';
        } else if (message.includes('Imagen')) {
          errorMessage = '画像生成でエラーが発生しました。別の画像または設定をお試しください。';
        } else {
          errorMessage = `エラー: ${message}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              AI看板デザインジェネレーター
            </h1>
            <div className="flex items-center space-x-6">
              {/* 使用回数表示 */}
              <div className="text-sm">
                {licenseKey ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">残り使用回数:</span>
                    <span className="font-bold text-blue-600">{remainingUses}回</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">無料トライアル:</span>
                    <span className="font-bold text-green-600">{FREE_TRIAL_USES - useFreeTrialCount}回</span>
                  </div>
                )}
              </div>
              {/* ライセンス入力ボタン */}
              {!licenseKey && (
                <button
                  onClick={() => setShowLicenseInput(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  ライセンス入力
                </button>
              )}
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-900">使い方</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">お問い合わせ</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ライセンス入力モーダル */}
      {showLicenseInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setShowLicenseInput(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <LicenseInput onLicenseVerified={handleLicenseVerified} />
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側: アップロード・選択 */}
          <div className="space-y-6">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              onReferenceImageUpload={handleReferenceImageUpload}
            />
            
            {uploadedImage && (
              <DesignSelector
                onDesignChange={handleDesignChange}
                onProcess={handleProcess}
                isProcessing={isProcessing}
                canProcess={!!(selectedTheme && (referenceImage || selectedSignboardType))}
                error={error}
                hasReferenceImage={!!referenceImage}
              />
            )}
          </div>

          {/* 右側: 結果表示 */}
          <div>
            <ResultDisplay
              originalImage={uploadedImage}
              processedImage={processedImage}
              isProcessing={isProcessing}
              apiResponseInfo={apiResponseInfo}
            />
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 AI看板デザインジェネレーター. All rights reserved.</p>
            <p className="mt-2">看板制作のご相談はお気軽にお問い合わせください。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}