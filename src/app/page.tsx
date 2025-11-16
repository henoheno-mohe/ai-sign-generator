'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/ImageUpload';
import DesignSelector from '@/components/DesignSelector';
import ResultDisplay from '@/components/ResultDisplay';
import LicenseInput from '@/components/LicenseInput';
import DetailSettings from '@/components/DetailSettings';
import CropTool from '@/components/CropTool';
import { callNanoBananaAPIWithRetry, generateSignboardPrompt, generateReferenceImagePrompt, generateStraightenPrompt, convertImageToBase64 } from '@/lib/nanoBananaAPI';
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

  // Phase 2: 看板切り取り用の状態
  const [extractedSignboard, setExtractedSignboard] = useState<string | null>(null);
  const [showCropTool, setShowCropTool] = useState(false);
  const [isStraightening, setIsStraightening] = useState(false);

  // Phase 3: サイズ入力用の状態
  const [signboardWidth, setSignboardWidth] = useState<number>(3000);
  const [showDetailSettings, setShowDetailSettings] = useState(false);

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

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setReferenceImage(null);
    setReferenceFile(null);
    setSelectedTheme('');
    setSelectedSignboardType('');
    setProcessedImage(null);
    setError(null);
    setApiResponseInfo(null);
    setExtractedSignboard(null);
    setShowDetailSettings(false);
    setShowCropTool(false);
  };

  // Phase 3: サイズ変更ハンドラー
  const handleWidthChange = (width: number) => {
    setSignboardWidth(width);
  };

  // Phase 4: 見積もり生成ハンドラー（準備）
  const handleGenerateQuote = () => {
    alert('見積もり機能は次のフェーズで実装します！');
    console.log('見積もり生成:', {
      signboardType: selectedSignboardType,
      width: signboardWidth,
    });
  };

  const handleDesignChange = (theme: string, signboardType: string) => {
    setSelectedTheme(theme);
    setSelectedSignboardType(signboardType);
  };

  // Phase 2: 看板切り取りハンドラー（手動選択モードに変更）
  const handleExtractSignboard = () => {
    if (!processedImage) return;

    // ライセンスチェック
    if (!canUseService()) {
      setError('使用回数の上限に達しました。ライセンスキーを入力してください。');
      setShowLicenseInput(true);
      return;
    }

    // 手動選択UIを表示
    setShowCropTool(true);
  };

  // 切り取り完了ハンドラー（AI補正を追加）
  const handleCropComplete = async (croppedImageUrl: string) => {
    setShowCropTool(false);
    setIsStraightening(true);
    setError(null);

    try {
      console.log('看板を正面図に補正中...');

      // Base64文字列から直接使用（data:image/png;base64, を除去）
      const base64Data = croppedImageUrl.split(',')[1];

      // 正面図補正プロンプト
      const prompt = generateStraightenPrompt();

      // Gemini APIで補正
      const result = await callNanoBananaAPIWithRetry(base64Data, prompt, config.nanoBananaApiKey);

      if (result.success && result.edited_image_url) {
        setExtractedSignboard(result.edited_image_url);
        setShowDetailSettings(true);
        
        // 使用回数をカウント
        await recordUsage();
        
        console.log('正面図補正完了');
      } else {
        // 補正に失敗した場合は元の画像を使用
        console.warn('AI補正失敗、元の画像を使用します');
        setExtractedSignboard(croppedImageUrl);
        setShowDetailSettings(true);
        await recordUsage();
      }
    } catch (error) {
      console.error('Straightening failed:', error);
      // エラーでも元の画像を使用
      setExtractedSignboard(croppedImageUrl);
      setShowDetailSettings(true);
      await recordUsage();
    } finally {
      setIsStraightening(false);
    }
  };

  // 切り取りキャンセルハンドラー
  const handleCropCancel = () => {
    setShowCropTool(false);
  };

  // 発光タイプ変更ハンドラー
  const handleChangeLighting = async (lightingType: 'side' | 'back') => {
    if (!processedImage || !uploadedFile || !selectedTheme) return;
    
    // ライセンスチェック
    if (!canUseService()) {
      setError('使用回数の上限に達しました。ライセンスキーを入力してください。');
      setShowLicenseInput(true);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 現在の処理済み画像をベースにして発光タイプのみを変更
      // 処理済み画像をFileオブジェクトに変換
      const response = await fetch(processedImage);
      const blob = await response.blob();
      const processedFile = new File([blob], 'processed.jpg', { type: 'image/jpeg' });
      
      const imageBase64 = await convertImageToBase64(processedFile);
      
      // 発光タイプに応じたプロンプトを生成
      const lightingTypeMap = {
        'side': 'led-channel-side',
        'back': 'led-channel-back'
      };
      
      const newSignboardType = lightingTypeMap[lightingType];
      const prompt = generateSignboardPrompt(selectedTheme, 'modern', newSignboardType);
      
      console.log(`発光タイプを${lightingType}に変更中...`);
      
      const result = await callNanoBananaAPIWithRetry(imageBase64, prompt, config.nanoBananaApiKey);
      
      if (result.success && result.edited_image_url) {
        // 成功したら使用回数をカウント
        await recordUsage();
        
        setProcessedImage(result.edited_image_url);
        setSelectedSignboardType(newSignboardType);
        setApiResponseInfo({
          text_response: result.text_response,
          processing_method: 'Lighting Type Change',
          signboard_type: newSignboardType
        });
      } else {
        throw new Error(result.error || '発光タイプの変更に失敗しました');
      }
    } catch (error) {
      console.error('Lighting change failed:', error);
      setError('発光タイプの変更中にエラーが発生しました');
    } finally {
      setIsProcessing(false);
    }
  };

  // プリセット参考画像を読み込む関数
  const loadPresetImages = async (signboardType: string): Promise<string[]> => {
    const signboardTypesConfig = [
      {
        id: 'led-channel-face',
        presetImages: [
          '/images/signboard-presets/led-channel-face-1.jpg',
          '/images/signboard-presets/led-channel-face-2.jpg',
          '/images/signboard-presets/led-channel-face-3.jpg',
          '/images/signboard-presets/led-channel-face-4.jpg',
          '/images/signboard-presets/led-channel-face-5.jpg',
        ]
      },
      {
        id: 'flat',
        presetImages: [
          '/images/signboard-presets/flat-1.png',
          '/images/signboard-presets/flat-2.png',
        ]
      },
      {
        id: 'neon',
        presetImages: [
          '/images/signboard-presets/neon-1.png',
          '/images/signboard-presets/neon-2.png',
          '/images/signboard-presets/neon-3.png',
        ]
      },
      {
        id: 'wooden',
        presetImages: [
          '/images/signboard-presets/wooden-1.png',
          '/images/signboard-presets/wooden-2.png',
        ]
      },
      {
        id: 'acrylic',
        presetImages: [
          '/images/signboard-presets/acrylic-1.png',
          '/images/signboard-presets/acrylic-2.png',
        ]
      },
    ];

    const config = signboardTypesConfig.find(t => t.id === signboardType);
    if (!config || !config.presetImages) return [];

    const presetBase64Array: string[] = [];
    
    for (const imagePath of config.presetImages) {
      try {
        const response = await fetch(imagePath);
        if (response.ok) {
          const blob = await response.blob();
          // 拡張子からMIMEタイプを判定
          const ext = imagePath.split('.').pop()?.toLowerCase();
          const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
          const fileName = `preset.${ext}`;
          const file = new File([blob], fileName, { type: mimeType });
          const base64 = await convertImageToBase64(file);
          presetBase64Array.push(base64);
          console.log(`✓ プリセット画像読み込み成功: ${imagePath}`);
        }
      } catch (error) {
        console.warn(`プリセット画像読み込み失敗: ${imagePath}`, error);
      }
    }
    
    return presetBase64Array;
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
      let imagesToSend: string[];
      
      // 参考画像がある場合
      if (referenceImage && referenceFile) {
        console.log('参考画像モード：参考画像のスタイルを再現');
        const referenceBase64 = await convertImageToBase64(referenceFile);
        imagesToSend = [imageBase64, referenceBase64]; // 建物画像、参考画像の順
        prompt = generateReferenceImagePrompt(selectedTheme);
      } else {
        // 通常モード（看板タイプ選択のみ、参考画像なし）
        console.log('通常モード：看板タイプ', selectedSignboardType);
        
        // 参考画像は使用せず、建物画像のみ送信
        imagesToSend = [imageBase64];
        prompt = generateSignboardPrompt(selectedTheme, 'modern', selectedSignboardType);
        console.log('参考画像なしモード：詳細説明のみで指示');
      }
      
      console.log('プロンプト:', prompt);
      console.log('送信画像数:', imagesToSend.length);
      
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
              onChangeLighting={handleChangeLighting}
              currentSignboardType={selectedSignboardType}
              onExtractSignboard={handleExtractSignboard}
              isExtracting={false}
            />
          </div>
        </div>

        {/* Phase 2 & 3: 詳細設定画面 */}
        {showDetailSettings && extractedSignboard && (
          <div className="mt-8">
            <DetailSettings
              extractedSignboard={extractedSignboard}
              signboardWidth={signboardWidth}
              onWidthChange={handleWidthChange}
              onGenerateQuote={handleGenerateQuote}
            />
          </div>
        )}
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

      {/* 切り取りツール */}
      {showCropTool && processedImage && (
        <CropTool
          image={processedImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      {/* AI補正中ローディング */}
      {isStraightening && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-16 w-16 text-blue-600 mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🤖 AIが正面図に補正中...</h3>
              <p className="text-gray-600 text-center">看板を真正面から見たように変換しています</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}