'use client';

interface ResultDisplayProps {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  apiResponseInfo?: {
    fallback_response?: boolean;
    mock_response?: boolean;
    text_response?: string;
    api_response?: unknown;
    processing_method?: string;
    signboard_type?: string;
  } | null;
  onChangeLighting?: (lightingType: 'side' | 'back') => void;
  currentSignboardType?: string;
  onExtractSignboard?: () => void;
  isExtracting?: boolean;
}

export default function ResultDisplay({ 
  originalImage, 
  processedImage, 
  isProcessing, 
  apiResponseInfo,
  onChangeLighting,
  currentSignboardType,
  onExtractSignboard,
  isExtracting
}: ResultDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        結果
      </h2>

      {!originalImage ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500">写真をアップロードして看板をリニューアルしてください</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 元画像 */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">元の画像</h3>
            <div className="relative bg-gray-50 rounded-lg border">
              <img
                src={originalImage}
                alt="元の画像"
                className="w-full max-h-96 object-contain rounded-lg"
              />
            </div>
          </div>

          {/* 処理中表示 */}
          {isProcessing && (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 text-blue-500 mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
              <p className="text-gray-600">AIが看板をリニューアル中...</p>
              <p className="text-sm text-gray-500 mt-2">しばらくお待ちください</p>
            </div>
          )}

          {/* 処理結果 */}
          {processedImage && !isProcessing && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">リニューアル後</h3>
              <div className="relative bg-gray-50 rounded-lg border">
                <img
                  src={processedImage}
                  alt="リニューアル後の画像"
                  className="w-full max-h-96 object-contain rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                  完了
                </div>
              </div>
              
              {/* LEDチャンネル文字の場合：発光タイプ変更ボタン */}
        {currentSignboardType === 'led-channel-face' && onChangeLighting && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">💡 発光タイプを変更</h4>
            <div className="flex gap-3">
              <button 
                onClick={() => onChangeLighting('side')}
                className="flex-1 bg-white border-2 border-blue-300 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                ✨ 側面発光に変更
              </button>
              <button 
                onClick={() => onChangeLighting('back')}
                className="flex-1 bg-white border-2 border-blue-300 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                🌟 背面発光に変更
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              ※ 現在の看板デザインを維持したまま、発光方法のみを変更します
            </p>
          </div>
        )}

        {/* Phase 2: 看板切り取りボタン */}
        {processedImage && onExtractSignboard && (
          <div className="mt-4">
            <button
              onClick={onExtractSignboard}
              disabled={isExtracting}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isExtracting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isExtracting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  看板を切り取り中...
                </span>
              ) : (
                '✂️ 看板を切り取る（詳細設定へ）'
              )}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              ※ 看板部分だけを切り取り、サイズ入力と見積もり作成に進みます
            </p>
          </div>
        )}
              
              {/* アクションボタン */}
              <div className="mt-4 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  ダウンロード
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  保存
                </button>
              </div>
              
              {/* APIレスポンス情報 */}
              {apiResponseInfo && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">処理情報</h4>
                  {apiResponseInfo.mock_response && (
                    <p className="text-sm text-blue-600">✓ モックAPIを使用（開発モード）</p>
                  )}
                  {apiResponseInfo.fallback_response && (
                    <p className="text-sm text-yellow-600">⚠ フォールバック: 元画像を表示</p>
                  )}
                  {apiResponseInfo.text_response && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">AIからのテキストレスポンス:</p>
                      <p className="text-xs text-gray-500 mt-1 p-2 bg-white rounded border">
                        {apiResponseInfo.text_response}
                      </p>
                    </div>
                  )}
                  {process.env.NODE_ENV === 'development' && apiResponseInfo.api_response ? (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer">デバッグ: APIレスポンス詳細</summary>
                      <pre className="text-xs text-gray-400 mt-1 p-2 bg-white rounded border overflow-auto max-h-32">
                        {typeof apiResponseInfo.api_response === 'object' 
                          ? JSON.stringify(apiResponseInfo.api_response, null, 2)
                          : String(apiResponseInfo.api_response)}
                      </pre>
                    </details>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {/* 処理待ち状態 */}
          {originalImage && !processedImage && !isProcessing && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">デザインを選択して「看板をリニューアル」ボタンを押してください</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
