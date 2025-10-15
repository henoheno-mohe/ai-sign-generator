'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import DesignSelector from '@/components/DesignSelector';
import ResultDisplay from '@/components/ResultDisplay';
import { callNanoBananaAPIWithRetry, generateSignboardPrompt, convertImageToBase64 } from '@/lib/nanoBananaAPI';
import { config } from '@/lib/config';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedSignboardType, setSelectedSignboardType] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponseInfo, setApiResponseInfo] = useState<any>(null);

  const handleImageUpload = (imageUrl: string, file?: File) => {
    setUploadedImage(imageUrl);
    if (file) setUploadedFile(file);
    setProcessedImage(null); // 新しい画像がアップロードされたら結果をリセット
    setError(null); // エラーもリセット
    setApiResponseInfo(null); // APIレスポンス情報もリセット
  };

  const handleDesignChange = (theme: string, signboardType: string) => {
    setSelectedTheme(theme);
    setSelectedSignboardType(signboardType);
  };

  const handleProcess = async () => {
    if (!uploadedImage || !uploadedFile || !selectedTheme || !selectedSignboardType) return;
    
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
      
      // プロンプトを生成（看板タイプを含む）
      const prompt = generateSignboardPrompt(selectedTheme, 'modern', selectedSignboardType);
      console.log('プロンプト:', prompt);
      
      // Gemini APIで直接画像を編集
      console.log('Geminiで看板をリニューアル中...');
      const result = await callNanoBananaAPIWithRetry(imageBase64, prompt, config.nanoBananaApiKey);
      console.log('看板リニューアル完了');
      
      if (result.success && result.edited_image_url) {
        setProcessedImage(result.edited_image_url);
        setApiResponseInfo({
          text_response: result.text_response,
          processing_method: 'Gemini Native Image Editing',
          signboard_type: selectedSignboardType
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
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">使い方</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">お問い合わせ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側: アップロード・選択 */}
          <div className="space-y-6">
            <ImageUpload onImageUpload={handleImageUpload} />
            
            {uploadedImage && (
              <DesignSelector
                onDesignChange={handleDesignChange}
                onProcess={handleProcess}
                isProcessing={isProcessing}
                canProcess={!!(selectedTheme && selectedSignboardType)}
                error={error}
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