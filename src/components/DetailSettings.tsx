'use client';

import { useState } from 'react';
import { calculateQuote, QuoteResult } from '@/lib/pricing';

interface DetailSettingsProps {
  extractedSignboard: string;
  signboardWidth: number;
  signboardType: string;
  onWidthChange: (width: number) => void;
  onGenerateQuote: () => void;
  onCleanRecreate?: () => void;
  isRecreating?: boolean;
}

export default function DetailSettings({
  extractedSignboard,
  signboardWidth,
  signboardType,
  onWidthChange,
  onGenerateQuote,
  onCleanRecreate,
  isRecreating
}: DetailSettingsProps) {
  const [inputWidth, setInputWidth] = useState<string>(signboardWidth.toString());
  const [textLength, setTextLength] = useState<number>(4); // デフォルト4文字
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  const handleWidthInput = (value: string) => {
    setInputWidth(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      onWidthChange(numValue);
      // サイズ変更時は見積もりをクリア
      setQuoteResult(null);
    }
  };

  const handleTextLengthChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setTextLength(numValue);
      // 文字数変更時は見積もりをクリア
      setQuoteResult(null);
    }
  };

  const handleGenerateQuoteClick = () => {
    // 見積もりを計算（文字数を含む）
    const result = calculateQuote(signboardType, signboardWidth, textLength);
    setQuoteResult(result);
    onGenerateQuote();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        📐 詳細設定・見積もり作成
      </h2>

      {/* 看板プレビュー */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">切り取った看板</h3>
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
          <img 
            src={extractedSignboard} 
            alt="切り取った看板" 
            className="w-full h-auto max-h-64 object-contain mx-auto"
          />
        </div>
        
        {/* AIで綺麗に作り直すボタン */}
        {onCleanRecreate && (
          <div className="mt-4">
            <button
              onClick={onCleanRecreate}
              disabled={isRecreating}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isRecreating
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isRecreating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  入稿データを作成中...
                </span>
              ) : (
                '🎨 入稿データレベルに作り直す'
              )}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              ※ 看板製作会社に提出できるクリーンな入稿データに変換します
            </p>
          </div>
        )}
      </div>

      {/* サイズ入力 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">看板のサイズと文字数</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              横幅（mm）
            </label>
            <input
              type="number"
              value={inputWidth}
              onChange={(e) => handleWidthInput(e.target.value)}
              min="100"
              max="10000"
              step="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="例: 3000"
            />
            <p className="text-xs text-gray-500 mt-1">
              = {(signboardWidth / 1000).toFixed(2)} m
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文字数
            </label>
            <input
              type="number"
              value={textLength}
              onChange={(e) => handleTextLengthChange(e.target.value)}
              min="1"
              max="20"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              placeholder="例: 5"
            />
            <p className="text-xs text-gray-500 mt-1">
              看板の文字数を入力
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ 横幅と文字数から1文字あたりのサイズを自動計算します
        </p>
      </div>

      {/* スケールプレビュー */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">📏 計算結果</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• 看板横幅: <span className="font-semibold">{signboardWidth}mm</span></p>
          <p>• 文字数: <span className="font-semibold">{textLength}文字</span></p>
          <p>• 1文字あたりのサイズ: <span className="font-semibold text-blue-600">{Math.round(signboardWidth / textLength)}mm</span></p>
          <p className="text-xs text-gray-500 mt-2">参考: 一般的な店舗看板は 2000mm〜4000mm、3〜6文字程度です</p>
        </div>
      </div>

      {/* 今後の詳細設定（プレースホルダー） */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">詳細デザイン（準備中）</h3>
        <div className="grid grid-cols-2 gap-4 opacity-50">
          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">フォント詳細</label>
            <select disabled className="w-full p-2 border border-gray-300 rounded bg-gray-100">
              <option>近日実装予定</option>
            </select>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">色合い調整</label>
            <input type="color" disabled className="w-full h-10 border border-gray-300 rounded bg-gray-100" />
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">発光強度</label>
            <input type="range" disabled className="w-full" />
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">文字厚み</label>
            <input type="number" disabled className="w-full p-2 border border-gray-300 rounded bg-gray-100" placeholder="mm" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ これらの詳細設定は今後のアップデートで実装予定です
        </p>
      </div>

      {/* 見積もり作成ボタン */}
      <div className="mt-6">
        <button
          onClick={handleGenerateQuoteClick}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
        >
          💰 見積もりを作成する
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          ※ サイズと看板タイプから自動的に見積もりを算出します
        </p>
      </div>

      {/* 見積もり結果表示 */}
      {quoteResult && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">💰</span>
            見積もり結果
          </h3>
          
          {/* 基本情報 */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">看板タイプ</p>
                <p className="font-semibold text-gray-900">{quoteResult.signboardTypeName}</p>
              </div>
              <div>
                <p className="text-gray-600">1文字サイズ</p>
                <p className="font-semibold text-gray-900">{quoteResult.sizePerChar}mm</p>
              </div>
              <div>
                <p className="text-gray-600">文字数</p>
                <p className="font-semibold text-gray-900">{quoteResult.textLength}文字</p>
              </div>
              <div>
                <p className="text-gray-600">単価カテゴリ</p>
                <p className="font-semibold text-gray-900">{quoteResult.sizeCategory}</p>
              </div>
            </div>
          </div>

          {/* 価格内訳 */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">価格計算内訳</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
                <span className="text-gray-600">1文字あたりの単価</span>
                <span className="font-medium text-gray-900">
                  ¥{quoteResult.pricePerChar.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm pb-2 border-b border-gray-200">
                <span className="text-gray-600">文字数</span>
                <span className="font-medium text-gray-900">
                  × {quoteResult.textLength}文字
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-800">基本価格</span>
                <span className="text-gray-900">
                  ¥{quoteResult.basePrice.toLocaleString()}
                </span>
              </div>
              {quoteResult.multiplier !== 1.0 && (
                <div className="flex justify-between text-sm text-purple-700 pt-2 border-t border-purple-200">
                  <span>ネオン風係数 (×{quoteResult.multiplier})</span>
                  <span className="font-medium">
                    適用済み
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 最終価格 */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6 text-center">
            <p className="text-sm font-medium mb-2">お見積もり金額（税込）</p>
            <p className="text-4xl font-bold">
              ¥{quoteResult.finalPrice.toLocaleString()}
            </p>
            <p className="text-xs mt-2 opacity-90">
              ※ 設置費用・取付費用は別途お見積もりとなります
            </p>
          </div>

          {/* 注意事項 */}
          <div className="mt-4 text-xs text-gray-600 space-y-1">
            <p>• この見積もりは目安です。最終的な金額は別途お問い合わせください。</p>
            <p>• 設置場所の状況により、別途工事費用が発生する場合があります。</p>
            <p>• デザイン変更や特殊加工により金額が変動することがあります。</p>
          </div>
        </div>
      )}
    </div>
  );
}

