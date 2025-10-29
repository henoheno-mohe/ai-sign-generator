'use client';

import { useState } from 'react';

interface DesignSelectorProps {
  onDesignChange: (theme: string, signboardType: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
  canProcess: boolean;
  error?: string | null;
  hasReferenceImage?: boolean;
}

const colorThemes = [
  {
    id: 'warm',
    name: '温かみのある',
    description: 'オレンジ、赤、黄色系で親しみやすい印象',
    colors: ['#FF6B35', '#F7931E', '#FFD23F']
  },
  {
    id: 'clean',
    name: '清潔感のある',
    description: '白、青、水色系で清潔で信頼できる印象',
    colors: ['#FFFFFF', '#4A90E2', '#87CEEB']
  },
  {
    id: 'luxury',
    name: '高級感のある',
    description: '黒、金、深い色系で上品で高級な印象',
    colors: ['#000000', '#D4AF37', '#2C3E50']
  },
  {
    id: 'friendly',
    name: '親しみやすい',
    description: '明るい色、パステル系で親しみやすく温かい印象',
    colors: ['#FFB6C1', '#98FB98', '#F0E68C']
  },
  {
    id: 'trust',
    name: '信頼感のある',
    description: '青、緑、落ち着いた色系で信頼できる印象',
    colors: ['#2E8B57', '#4682B4', '#708090']
  }
];

const signboardTypes = [
  {
    id: 'led-channel-face',
    name: 'LEDチャンネル文字（正面発光）',
    description: '文字全体が明るく光る、視認性の高いスタンダードタイプ',
    icon: '💡'
  },
  {
    id: 'led-channel-side',
    name: 'LEDチャンネル文字（側面発光）',
    description: '文字の側面が光る、モダンでスタイリッシュなタイプ',
    icon: '✨'
  },
  {
    id: 'led-channel-back',
    name: 'LEDチャンネル文字（背面発光）',
    description: '文字の周りにハロー効果、高級感のある間接照明タイプ',
    icon: '🌟'
  },
  {
    id: 'flat',
    name: '平面看板',
    description: '従来の平らな看板デザイン',
    icon: '📋'
  },
  {
    id: 'neon',
    name: 'ネオンサイン',
    description: 'ガラス管が鮮やかに光る、レトロでスタイリッシュな看板',
    icon: '🔥'
  },
  {
    id: 'wooden',
    name: '木製看板',
    description: 'ナチュラルで温かみのある木製デザイン',
    icon: '🌳'
  },
  {
    id: 'acrylic',
    name: 'モダンアクリル',
    description: '透明・半透明のアクリル板を使用した現代的な看板',
    icon: '🔷'
  }
];

export default function DesignSelector({ onDesignChange, onProcess, isProcessing, canProcess, error, hasReferenceImage = false }: DesignSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedSignboardType, setSelectedSignboardType] = useState<string>('');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    onDesignChange(themeId, selectedSignboardType);
  };

  const handleSignboardTypeSelect = (typeId: string) => {
    setSelectedSignboardType(typeId);
    onDesignChange(selectedTheme, typeId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        デザインを選択
      </h2>

      {/* 色テーマ選択 */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">色合い</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colorThemes.map((theme) => (
            <div
              key={theme.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleThemeSelect(theme.id)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex space-x-1">
                  {theme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <h4 className="font-medium text-gray-900">{theme.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{theme.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 参考画像がある場合のメッセージ */}
      {hasReferenceImage && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">参考画像モード</h3>
              <p className="text-sm text-blue-700 mt-1">
                参考画像が設定されているため、そのスタイルを優先的に再現します。色合いの選択は引き続き有効です。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 看板タイプ選択（参考画像がない場合のみ表示） */}
      {!hasReferenceImage && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">看板タイプ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {signboardTypes.map((type) => (
              <div
                key={type.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSignboardType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSignboardTypeSelect(type.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">{type.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{type.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">エラーが発生しました</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 処理ボタン */}
      <div className="text-center">
        <button
          onClick={onProcess}
          disabled={!canProcess || isProcessing}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            canProcess && !isProcessing
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>AI処理中...</span>
            </div>
          ) : (
            '看板をリニューアル'
          )}
        </button>
        
        {!canProcess && (
          <p className="text-sm text-gray-500 mt-2">
            色合いと看板タイプを選択してください
          </p>
        )}
      </div>
    </div>
  );
}
