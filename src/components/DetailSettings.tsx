'use client';

import { useState } from 'react';

interface DetailSettingsProps {
  extractedSignboard: string;
  signboardWidth: number;
  onWidthChange: (width: number) => void;
  onGenerateQuote: () => void;
}

export default function DetailSettings({
  extractedSignboard,
  signboardWidth,
  onWidthChange,
  onGenerateQuote
}: DetailSettingsProps) {
  const [inputWidth, setInputWidth] = useState<string>(signboardWidth.toString());

  const handleWidthInput = (value: string) => {
    setInputWidth(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      onWidthChange(numValue);
    }
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
      </div>

      {/* サイズ入力 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">看板の横幅サイズ</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
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
          </div>
          <div className="text-gray-600">
            <p className="text-sm">= {(signboardWidth / 1000).toFixed(2)} m</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ 実際に設置する看板の横幅を入力してください（100mm〜10000mm）
        </p>
      </div>

      {/* スケールプレビュー */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">📏 サイズ感</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• 横幅: <span className="font-semibold">{signboardWidth}mm</span></p>
          <p>• 参考: 一般的な店舗看板は 2000mm〜4000mm です</p>
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
          onClick={onGenerateQuote}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
        >
          💰 見積もりを作成する
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          ※ サイズと看板タイプから自動的に見積もりを算出します
        </p>
      </div>
    </div>
  );
}

