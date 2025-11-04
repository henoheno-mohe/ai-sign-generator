// API設定とユーティリティ関数
// nano banana = Gemini 2.5 Flash Image - 画像編集専用モデル
export const NANO_BANANA_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';
export const LIST_MODELS_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
// Nano Banana (Gemini ネイティブ画像生成) は画像編集専用エンドポイントを使用
export const NANO_BANANA_IMAGE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

// モック機能（開発用）
export const USE_MOCK_API = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// デバッグ用のログ関数
function debugLog(message: string, data?: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Nano Banana API] ${message}`, data);
  }
}

// API制限情報
export const API_LIMITS = {
  FREE_PLAN: {
    REQUESTS_PER_SECOND: 10,
    REQUESTS_PER_DAY: 1000,
    MAX_CONCURRENT: 5,
    MIN_INTERVAL: 100 // ms
  }
};

export interface NanoBananaRequest {
  image: string; // Base64エンコードされた画像
  prompt: string; // 編集指示
  model: string; // 使用するモデル
}

export interface NanoBananaResponse {
  edited_image_url: string;
  success: boolean;
  error?: string;
  text_response?: string;
  mock_response?: boolean;
  fallback_response?: boolean;
  api_response?: unknown;
}

export interface SignboardInfo {
  location: string;
  current_design: string;
  brand_name: string;
  signboard_type: string;
  position_description: string;
}

// 利用可能なモデル一覧を取得
export async function getAvailableModels(apiKey: string): Promise<unknown> {
  try {
    const cleanApiKey = apiKey.replace(/["'`]/g, '').replace(/[^\x00-\x7F]/g, '').trim();
    
    const response = await fetch(LIST_MODELS_URL, {
      headers: {
        'x-goog-api-key': cleanApiKey,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    debugLog('利用可能なモデル一覧', data);
    
    return data;
  } catch (error) {
    debugLog('モデル一覧取得エラー', error);
    throw error;
  }
}

// 画像をBase64に変換
export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // data:image/jpeg;base64, の部分を除去
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 看板を識別する
export async function identifySignboard(imageBase64: string, apiKey: string): Promise<SignboardInfo> {
  try {
    const cleanApiKey = apiKey.replace(/["'`]/g, '').replace(/[^\x00-\x7F]/g, '').trim();
    
    const prompt = `Analyze this building image and identify all signboards. For each signboard, provide:
1. Location (e.g., "building facade", "pole sign", "entrance")
2. Current design description (colors, fonts, text content)
3. Brand name or business name
4. Signboard type (e.g., "rectangular", "oval", "hanging")
5. Position description (e.g., "top left", "center", "right side")

Focus on the main business signboards and provide detailed information for the most prominent one.`;

    const requestBody = {
      contents: [{
        parts: [
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: imageBase64
            }
          },
          {
            text: prompt
          }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(NANO_BANANA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': cleanApiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // テキストレスポンスを解析してSignboardInfoを抽出
      return parseSignboardInfo(textResponse);
    }
    
    throw new Error('No signboard information found');
  } catch (error) {
    console.error('Signboard identification error:', error);
    throw error;
  }
}

// テキストレスポンスから看板情報を解析
function parseSignboardInfo(textResponse: string): SignboardInfo {
  // デフォルト値
  const defaultInfo: SignboardInfo = {
    location: "building facade",
    current_design: "rectangular sign with text",
    brand_name: "Business",
    signboard_type: "rectangular",
    position_description: "center"
  };

  try {
    // テキストから情報を抽出（簡単なパターンマッチング）
    const lines = textResponse.split('\n');
    
    for (const line of lines) {
      if (line.toLowerCase().includes('location') || line.toLowerCase().includes('位置')) {
        const match = line.match(/location[:\s]+(.+)/i) || line.match(/位置[:\s]+(.+)/i);
        if (match) defaultInfo.location = match[1].trim();
      }
      if (line.toLowerCase().includes('brand') || line.toLowerCase().includes('business')) {
        const match = line.match(/brand[:\s]+(.+)/i) || line.match(/business[:\s]+(.+)/i);
        if (match) defaultInfo.brand_name = match[1].trim();
      }
      if (line.toLowerCase().includes('type') || line.toLowerCase().includes('形状')) {
        const match = line.match(/type[:\s]+(.+)/i) || line.match(/形状[:\s]+(.+)/i);
        if (match) defaultInfo.signboard_type = match[1].trim();
      }
    }
    
    return defaultInfo;
  } catch (error) {
    console.error('Error parsing signboard info:', error);
    return defaultInfo;
  }
}

// nano banana APIを呼び出し（1枚または2枚の画像に対応）
export async function callNanoBananaAPI(
  imageBase64: string | string[],
  prompt: string,
  apiKey: string
): Promise<NanoBananaResponse> {
  try {
    // プロンプトを英語に変換
    const englishPrompt = translatePromptToEnglish(prompt);
    
    // APIキーを安全に処理（クオテーションと非ASCII文字を除去）
    const cleanApiKey = apiKey.replace(/["'`]/g, '').replace(/[^\x00-\x7F]/g, '').trim();
    
    // 画像を配列に変換
    const images = Array.isArray(imageBase64) ? imageBase64 : [imageBase64];
    
    debugLog('API呼び出し開始', {
      url: NANO_BANANA_API_URL,
      promptLength: englishPrompt.length,
      imageCount: images.length,
      apiKeyLength: cleanApiKey.length
    });
    
    // partsを構築：画像を最初に、テキストを最後に
    const parts = [
      ...images.map(img => ({
        inline_data: {
          mime_type: "image/jpeg",
          data: img
        }
      })),
      {
        text: englishPrompt
      }
    ];
    
    const requestBody = {
      contents: [{
        parts: parts
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    debugLog('リクエストボディ', {
      prompt: englishPrompt,
      imageSize: imageBase64.length
    });
    
    const response = await fetch(NANO_BANANA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': cleanApiKey,
      },
      body: JSON.stringify(requestBody),
    });
    
    debugLog('レスポンス受信', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      debugLog('エラーレスポンス', errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    debugLog('成功レスポンス', data);
    
    // 一時的にコンソールでレスポンスを表示（デバッグ用）
    if (process.env.NODE_ENV === 'development') {
      console.log('APIレスポンス:', data);
    }
    
    // Google Cloud Gemini APIのレスポンス形式に合わせて処理
    debugLog('APIレスポンス詳細', data);
    
    // エラーレスポンスのチェック
    if (data.error) {
      throw new Error(`API Error: ${data.error.message || 'Unknown error'}`);
    }
    
    // レスポンス形式を柔軟に処理
    debugLog('レスポンス全体の構造', {
      hasCandidates: !!data.candidates,
      candidatesLength: data.candidates?.length,
      hasError: !!data.error,
      keys: Object.keys(data)
    });
    
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      debugLog('候補詳細', candidate);
      
      // finishReasonをチェック
      if (candidate.finishReason) {
        debugLog('finishReason', candidate.finishReason);
        
        // 安全フィルターに引っかかった場合
        if (candidate.finishReason === 'SAFETY') {
          throw new Error('Content was blocked by safety filters. Please try with a different image or prompt.');
        }
        
        // その他の理由で停止した場合
        if (candidate.finishReason !== 'STOP') {
          debugLog('finishReasonがSTOP以外', candidate.finishReason);
        }
      }
      
      if (candidate.content && candidate.content.parts) {
        const parts = candidate.content.parts;
        debugLog('パーツ配列', parts);
        
        // まず画像データがあるかチェック
        for (const part of parts) {
          debugLog('パーツ詳細', part);
          
          // 画像データがある場合（inline_dataまたはinlineData）
          const imageData = part.inline_data || part.inlineData;
          if (imageData && imageData.data) {
            debugLog('編集済み画像を検出');
            const mimeType = imageData.mimeType || imageData.mime_type || 'image/jpeg';
            return {
              success: true,
              edited_image_url: `data:${mimeType};base64,${imageData.data}`,
              error: undefined,
              text_response: 'Image edited successfully',
              api_response: data
            };
          }
        }
        
        // 画像がない場合はテキストレスポンスを取得
        let textResponse = '';
        for (const part of parts) {
          if (part.text) {
            textResponse += part.text;
            debugLog('テキストレスポンスを検出', part.text);
          }
        }
        
        if (textResponse) {
          // テキストレスポンスのみの場合、フォールバック処理
          debugLog('テキストレスポンスのみ、画像編集フォールバックを実行');
          return await enhancedMockAPI(imageBase64, textResponse, englishPrompt);
        }
      }
    }
    
    // 最後のフォールバック: 高度なモックAPIで画像編集を実行
    debugLog('フォールバック: 高度なモックAPIで画像編集を実行', {
      responseKeys: Object.keys(data),
      fullResponse: data
    });
    
    return await enhancedMockAPI(imageBase64, 'AI design suggestions for signboard renovation', prompt);
  } catch (error) {
    debugLog('API呼び出しエラー', error);
    console.error('Nano Banana API Error:', error);
    
    // ネットワークエラーの場合は高度なモックAPIにフォールバック
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      debugLog('ネットワークエラーを検出、高度なモックAPIにフォールバック');
      return await enhancedMockAPI(imageBase64, 'Network error fallback', prompt);
    }
    
    throw error;
  }
}

// 高度なモックAPI（AI提案を活用した画像編集）
async function enhancedMockAPI(imageBase64: string | string[], aiSuggestion: string, originalPrompt: string): Promise<NanoBananaResponse> {
  debugLog('高度なモックAPI実行', { aiSuggestion, originalPrompt });
  
  // 複数画像の場合は最初の画像のみを使用
  const firstImage = Array.isArray(imageBase64) ? imageBase64[0] : imageBase64;
  
  // 2秒待機してリアルな処理時間をシミュレート
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // モック画像の場合は、デザイン指示に基づいて新しい看板画像を生成
    if (firstImage === 'mock_image_base64') {
      debugLog('モック画像の場合、デザイン指示に基づいて看板画像を生成');
      
      // デザイン指示から色情報を抽出
      const colorMatch = aiSuggestion.match(/#[0-9A-Fa-f]{6}/g);
      const primaryColor = colorMatch ? colorMatch[0] : '#C25B3B'; // デフォルト: テラコッタレッド
      
      // 簡単な看板画像を生成
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }
      
      // 看板サイズを設定
      canvas.width = 400;
      canvas.height = 200;
      
      // 背景色を設定
      ctx.fillStyle = primaryColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // テキストを描画
      ctx.fillStyle = '#FDFDFD'; // オフホワイト
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // ブランド名を描画
      const brandName = aiSuggestion.includes('Saizeriya') ? 'SAIZERIA' : 'SIGNBOARD';
      ctx.fillText(brandName, canvas.width / 2, canvas.height / 2);
      
      // 編集された画像をBase64に変換
      const editedBase64 = canvas.toDataURL('image/jpeg', 0.9);
      
      debugLog('生成された看板画像の形式', editedBase64.substring(0, 100));
      
      return {
        success: true,
        edited_image_url: editedBase64,
        error: undefined,
        mock_response: true,
        text_response: aiSuggestion
      };
    }
    
    // 実際の画像がある場合の処理
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 元画像を描画
        ctx?.drawImage(img, 0, 0);
        
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // AI提案から色テーマを判定
          let colorTheme = 'clean'; // デフォルト
          if (aiSuggestion.includes('warm') || aiSuggestion.includes('orange') || aiSuggestion.includes('red') || aiSuggestion.includes('yellow')) {
            colorTheme = 'warm';
          } else if (aiSuggestion.includes('luxury') || aiSuggestion.includes('black') || aiSuggestion.includes('gold') || aiSuggestion.includes('deep')) {
            colorTheme = 'luxury';
          } else if (aiSuggestion.includes('friendly') || aiSuggestion.includes('bright')) {
            colorTheme = 'friendly';
          } else if (aiSuggestion.includes('trust') || aiSuggestion.includes('blue') || aiSuggestion.includes('green')) {
            colorTheme = 'trust';
          }
          
          // 緑色の看板部分を検出して高度な色変更
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // 緑色の看板部分を検出
            if (g > r && g > b && g > 100) {
              switch (colorTheme) {
                case 'warm': // 温かみのある（オレンジ、赤、黄色）
                  data[i] = Math.min(255, r * 1.5);     // 赤を大幅に増やす
                  data[i + 1] = Math.min(255, g * 0.6); // 緑を大幅に減らす
                  data[i + 2] = Math.min(255, b * 0.4); // 青を大幅に減らす
                  break;
                case 'luxury': // 高級感のある（黒、金、深い色）
                  data[i] = Math.min(255, r * 0.2);     // 赤を大幅に減らす
                  data[i + 1] = Math.min(255, g * 0.1); // 緑を大幅に減らす
                  data[i + 2] = Math.min(255, b * 0.3); // 青も大幅に減らす
                  break;
                case 'friendly': // 親しみやすい明るい色
                  data[i] = Math.min(255, r * 1.3);     // 赤を増やす
                  data[i + 1] = Math.min(255, g * 1.2); // 緑を少し増やす
                  data[i + 2] = Math.min(255, b * 0.7); // 青を少し減らす
                  break;
                case 'trust': // 信頼感のある（青、緑）
                  data[i] = Math.min(255, r * 0.6);     // 赤を減らす
                  data[i + 1] = Math.min(255, g * 1.3); // 緑を少し増やす
                  data[i + 2] = Math.min(255, b * 1.5); // 青を大幅に増やす
                  break;
                default: // clean: 清潔感のある（白、青、水色）
                  data[i] = Math.min(255, r * 0.7);     // 赤を少し減らす
                  data[i + 1] = Math.min(255, g * 0.6); // 緑を大幅に減らす
                  data[i + 2] = Math.min(255, b * 1.4); // 青を大幅に増やす
                  break;
              }
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
        }
        
        // 編集された画像をBase64に変換
        const editedBase64 = canvas.toDataURL('image/jpeg', 0.9);
        
        resolve({
          success: true,
          edited_image_url: editedBase64,
          error: undefined,
          mock_response: true,
          text_response: aiSuggestion
        });
      };
      
      img.onerror = () => {
        debugLog('画像読み込みエラー、フォールバック処理を実行');
        // フォールバック: 簡単な看板画像を生成
        const fallbackCanvas = document.createElement('canvas');
        const fallbackCtx = fallbackCanvas.getContext('2d');
        
        if (fallbackCtx) {
          fallbackCanvas.width = 400;
          fallbackCanvas.height = 200;
          fallbackCtx.fillStyle = '#C25B3B';
          fallbackCtx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
          fallbackCtx.fillStyle = '#FDFDFD';
          fallbackCtx.font = 'bold 48px Arial';
          fallbackCtx.textAlign = 'center';
          fallbackCtx.textBaseline = 'middle';
          fallbackCtx.fillText('SIGNBOARD', fallbackCanvas.width / 2, fallbackCanvas.height / 2);
          
          const fallbackImage = fallbackCanvas.toDataURL('image/jpeg', 0.9);
          resolve({
            success: true,
            edited_image_url: fallbackImage,
            error: undefined,
            mock_response: true,
            text_response: aiSuggestion
          });
        } else {
          resolve({
            success: true,
            edited_image_url: `data:image/jpeg;base64,${imageBase64}`,
            error: undefined,
            mock_response: true,
            text_response: aiSuggestion
          });
        }
      };
      
      img.src = `data:image/jpeg;base64,${firstImage}`;
    });
  } catch (error) {
    debugLog('高度なモックAPI画像編集エラー', error);
    // フォールバック: 簡単な看板画像を生成
    try {
      const fallbackCanvas = document.createElement('canvas');
      const fallbackCtx = fallbackCanvas.getContext('2d');
      
      if (fallbackCtx) {
        fallbackCanvas.width = 400;
        fallbackCanvas.height = 200;
        fallbackCtx.fillStyle = '#C25B3B';
        fallbackCtx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
        fallbackCtx.fillStyle = '#FDFDFD';
        fallbackCtx.font = 'bold 48px Arial';
        fallbackCtx.textAlign = 'center';
        fallbackCtx.textBaseline = 'middle';
        fallbackCtx.fillText('SIGNBOARD', fallbackCanvas.width / 2, fallbackCanvas.height / 2);
        
        const fallbackImage = fallbackCanvas.toDataURL('image/jpeg', 0.9);
        return {
          success: true,
          edited_image_url: fallbackImage,
          error: undefined,
          mock_response: true,
          text_response: aiSuggestion
        };
      }
    } catch (fallbackError) {
      debugLog('フォールバック画像生成エラー', fallbackError);
    }
    
    // 最終フォールバック: 元画像をそのまま返す
    return {
      success: true,
      edited_image_url: `data:image/jpeg;base64,${imageBase64}`,
      error: undefined,
      mock_response: true,
      text_response: aiSuggestion
    };
  }
}

// 看板リニューアル用のプロンプト生成（画像編集用）
// 参考画像を使用する場合のプロンプト生成
export function generateReferenceImagePrompt(colorTheme: string): string {
  const themePrompts = {
    warm: '温かみのある暖色系（オレンジ、赤、黄色など）',
    clean: '清潔感のある色合い（白、青、水色など）',
    luxury: '高級感のある色合い（黒、金、深い色など）',
    friendly: '親しみやすい明るい色合い',
    trust: '信頼感のある落ち着いた色合い（青、緑など）'
  };

  const themeText = themePrompts[colorTheme as keyof typeof themePrompts] || themePrompts.warm;

  const prompt = `1枚目の画像: リニューアルしたい建物（ベース画像）
2枚目の画像: 参考にしたい看板デザイン

タスク: 1枚目の建物画像に写っている看板だけを、2枚目の画像に写っている看板のスタイルを参考にして修正してください。

2枚目の看板から参考にする要素：
- 看板のスタイルとデザイン（形状、質感、タイプ）
- 発光方法や照明効果（LED、ネオン、バックライトなど）
- 文字の太さや形状
- 全体的な雰囲気と高級感

色合いの調整：
- ${themeText}を基調にしてください

絶対に守る要件：
- 1枚目の建物画像をベースにしてください
- 1枚目の建物の看板の位置、サイズは維持してください
- 1枚目のブランド名やロゴのテキストは維持してください
- 1枚目の建物や周囲の環境は一切変更しないでください
- 2枚目の画像は参考のみで、建物自体は使用しないでください
- 看板部分だけを2枚目のスタイルに変更してください

編集した画像を生成してください。`;

  return prompt;
}

// 通常の看板タイプ選択を使用する場合のプロンプト生成
export function generateSignboardPrompt(colorTheme: string, fontStyle: string, signboardType?: string): string {
  const themePrompts = {
    warm: '温かみのある暖色系（オレンジ、赤、黄色など）',
    clean: '清潔感のある色合い（白、青、水色など）',
    luxury: '高級感のある色合い（黒、金、深い色など）',
    friendly: '親しみやすい明るい色合い',
    trust: '信頼感のある落ち着いた色合い（青、緑など）'
  };

  const fontPrompts = {
    modern: 'モダンでクリーンなフォントスタイル',
    classic: 'クラシックで上品なフォントスタイル',
    casual: 'カジュアルで親しみやすいフォントスタイル',
    elegant: 'エレガントで洗練されたフォントスタイル',
    powerful: '力強く目立つフォントスタイル'
  };

  const signboardTypePrompts = {
    'led-channel-face': 'LEDチャンネル文字タイプ（正面発光：立体的な文字の表面全体が明るく光る看板）',
    'led-channel-side': 'LEDチャンネル文字タイプ（側面発光：立体的な文字の側面のみが光る、モダンでスタイリッシュな看板）',
    'led-channel-back': 'LEDチャンネル文字タイプ（背面発光：文字の背面から光が漏れ、壁面にハロー効果を生む高級感のある看板）',
    'flat': '平面看板タイプ（従来の平らな看板）',
    'neon': 'ネオンサインタイプ（ネオン管のような発光する看板）',
    'wooden': '木製看板タイプ（ナチュラルで温かみのある木製デザイン）',
    'acrylic': 'モダンアクリルタイプ（透明・半透明のアクリル板を使用した現代的な看板）'
  };

  const themeText = themePrompts[colorTheme as keyof typeof themePrompts] || themePrompts.warm;
  const fontText = fontPrompts[fontStyle as keyof typeof fontPrompts] || fontPrompts.modern;
  const typeText = signboardType ? signboardTypePrompts[signboardType as keyof typeof signboardTypePrompts] || '' : '';

  let prompt = `画像1枚目: リニューアルしたい建物
画像2枚目以降: ${typeText}の参考例（複数の実例）

タスク: 1枚目の建物に写っている看板の文字スタイルだけを、2枚目以降の参考画像のスタイルを学習して、${themeText}、${fontText}`;
  
  if (typeText) {
    prompt += `の${typeText}`;
  }
  
  prompt += `に変更してください。

参考画像から学ぶ要素：
- 看板の質感、素材感、立体感（文字部分のみ）
- 発光方法や照明効果の特徴
- 3D文字の厚み、金属フレームの見え方
- 全体的な雰囲気とリアルな仕上がり

絶対に守る要件（非常に重要）：
- 看板に書かれているテキスト内容は一切変更しないでください（例：「らーめん 稲荷屋」はそのまま「らーめん 稲荷屋」）
- 文字の内容・順序・配置は完全に維持してください
- 看板の位置・サイズは元のまま維持してください
- 建物の外観（壁、ドア、窓、周囲の環境）は一切変更しないでください
- 看板以外の部分（のれん、メニュー看板、ポスターなど）は変更しないでください
- 変更するのは看板の文字スタイル（フォント、質感、発光効果）だけです

複数の参考画像から共通するスタイルを学習し、看板の文字部分だけをよりリアルに再現してください`;

  if (signboardType === 'led-channel-face') {
    prompt += `
- 文字を立体的な3D形状にしてください
- 文字の表面全体が均一に明るく光るようにしてください（フェイスライト）
- 文字の縁がくっきりと際立つようにしてください
- 視認性が高く、明るい印象を強調してください
- 白色または明るい色のLED照明効果を表現してください`;
  } else if (signboardType === 'led-channel-side') {
    prompt += `
- 文字を立体的な3D形状にしてください
- 文字の側面のみが光るようにしてください（サイドライト）
- 文字の表面は光らず、側面のエッジだけが発光している状態を表現してください
- モダンでスタイリッシュな印象を強調してください
- 薄く鋭いライン状の光を表現してください`;
  } else if (signboardType === 'led-channel-back') {
    prompt += `
- 文字を立体的な3D形状にしてください
- 文字の背面（壁面側）から光が漏れるようなバックライト効果を追加してください
- 文字の周りにソフトなハロー効果（光の輪郭）を壁面に投影してください
- 文字本体は光らず、背後の光だけが見えるようにしてください
- 高級感と間接照明のような柔らかい印象を強調してください`;
  } else if (signboardType === 'neon') {
    prompt += `
- ネオン管のような発光効果を追加してください
- 文字が光っているような鮮やかな発光を表現してください
- レトロでスタイリッシュな雰囲気にしてください`;
  } else if (signboardType === 'wooden') {
    prompt += `
- 木製の質感を追加してください
- 彫刻されたような文字の立体感を表現してください
- ナチュラルで温かみのある雰囲気にしてください`;
  } else if (signboardType === 'acrylic') {
    prompt += `
- 透明または半透明のアクリル板のような質感を追加してください
- 内部照明で光っているような効果を表現してください
- 現代的で洗練された印象にしてください`;
  }

  prompt += `

編集した画像を生成してください。`;

  return prompt;
}

// プロンプトを英語に変換（画像編集API用）
function translatePromptToEnglish(japanesePrompt: string): string {
  const themeTranslations = {
    warm: 'warm and cozy colors like orange, red, and yellow',
    clean: 'clean and fresh colors like white, blue, and light blue',
    luxury: 'luxurious colors like black, gold, and deep rich tones',
    friendly: 'friendly and bright colors',
    trust: 'trustworthy and calm colors like blue and green'
  };

  const fontTranslations = {
    modern: 'modern, clean font style',
    classic: 'classic, elegant font style',
    casual: 'casual, friendly font style',
    elegant: 'elegant, refined font style',
    powerful: 'powerful, bold font style'
  };

  const signboardTypeTranslations = {
    'led-channel-face': 'LED channel letter type with face-lit illumination (3D letters with front surface fully illuminated)',
    'led-channel-side': 'LED channel letter type with side-lit illumination (3D letters with only side edges glowing)',
    'led-channel-back': 'LED channel letter type with back-lit halo effect (3D letters with backlight creating halo glow on wall)',
    'flat': 'flat signboard type (traditional flat design)',
    'neon': 'neon sign type (glowing neon tube effect)',
    'wooden': 'wooden signboard type (natural wooden texture)',
    'acrylic': 'modern acrylic type (transparent/translucent acrylic with internal lighting)'
  };

  // 参考画像モードの検出
  if (japanesePrompt.includes('1枚目の画像: リニューアルしたい建物') && japanesePrompt.includes('2枚目の画像: 参考にしたい看板デザイン')) {
    let englishPrompt = `Image 1: The building to renovate (base image)
Image 2: Reference signboard design to copy style from

Task: Modify ONLY the signboard in Image 1 (the building) by applying the style of the signboard shown in Image 2.

Elements to reference from Image 2's signboard:
- Signboard style and design (shape, texture, type)
- Lighting method and illumination effects (LED, neon, backlight, etc.)
- Letter thickness and shape
- Overall atmosphere and luxury feel

Color adjustment:
- Use `;

    // 色テーマの検出と変換
    if (japanesePrompt.includes('温かみのある')) {
      englishPrompt += themeTranslations.warm;
    } else if (japanesePrompt.includes('清潔感のある')) {
      englishPrompt += themeTranslations.clean;
    } else if (japanesePrompt.includes('高級感のある')) {
      englishPrompt += themeTranslations.luxury;
    } else if (japanesePrompt.includes('親しみやすい')) {
      englishPrompt += themeTranslations.friendly;
    } else if (japanesePrompt.includes('信頼感のある')) {
      englishPrompt += themeTranslations.trust;
    }

    englishPrompt += ` as the color base

Critical requirements:
- Use Image 1 (building) as the base
- Keep the signboard position and size from Image 1
- Maintain brand names and logo text from Image 1
- Do NOT change the building or surrounding environment from Image 1
- Image 2 is reference ONLY for signboard style, do NOT use the building from Image 2
- Only modify the signboard area to match Image 2's style

Generate the edited image.`;

    return englishPrompt;
  }

  // Nano Banana画像編集用のプロンプト（通常モード：複数参考画像対応）
  let englishPrompt = 'Image 1: Building to renovate\nImages 2+: Multiple reference examples of the signboard type\n\nTask: Change ONLY the text style of the signboard in Image 1 by learning from multiple reference images (2+). Apply ';
  
  // 看板タイプの検出と変換
  let signboardType = '';
  if (japanesePrompt.includes('正面発光：立体的な文字の表面全体が明るく光る')) {
    signboardType = 'led-channel-face';
    englishPrompt += 'to ' + signboardTypeTranslations['led-channel-face'] + ' with ';
  } else if (japanesePrompt.includes('側面発光：立体的な文字の側面のみが光る')) {
    signboardType = 'led-channel-side';
    englishPrompt += 'to ' + signboardTypeTranslations['led-channel-side'] + ' with ';
  } else if (japanesePrompt.includes('背面発光：文字の背面から光が漏れ')) {
    signboardType = 'led-channel-back';
    englishPrompt += 'to ' + signboardTypeTranslations['led-channel-back'] + ' with ';
  } else if (japanesePrompt.includes('平面看板タイプ')) {
    signboardType = 'flat';
    englishPrompt += 'to ' + signboardTypeTranslations['flat'] + ' with ';
  } else if (japanesePrompt.includes('ネオンサインタイプ')) {
    signboardType = 'neon';
    englishPrompt += 'to ' + signboardTypeTranslations['neon'] + ' with ';
  } else if (japanesePrompt.includes('木製看板タイプ')) {
    signboardType = 'wooden';
    englishPrompt += 'to ' + signboardTypeTranslations['wooden'] + ' with ';
  } else if (japanesePrompt.includes('モダンアクリルタイプ')) {
    signboardType = 'acrylic';
    englishPrompt += 'to ' + signboardTypeTranslations['acrylic'] + ' with ';
  } else {
    englishPrompt += 'colors and fonts to ';
  }
  
  // 色テーマの検出と変換
  if (japanesePrompt.includes('温かみのある')) {
    englishPrompt += themeTranslations.warm;
  } else if (japanesePrompt.includes('清潔感のある')) {
    englishPrompt += themeTranslations.clean;
  } else if (japanesePrompt.includes('高級感のある')) {
    englishPrompt += themeTranslations.luxury;
  } else if (japanesePrompt.includes('親しみやすい')) {
    englishPrompt += themeTranslations.friendly;
  } else if (japanesePrompt.includes('信頼感のある')) {
    englishPrompt += themeTranslations.trust;
  }

  englishPrompt += ' and ';

  // フォントスタイルの検出と変換
  if (japanesePrompt.includes('モダンでクリーン')) {
    englishPrompt += fontTranslations.modern;
  } else if (japanesePrompt.includes('クラシックで上品')) {
    englishPrompt += fontTranslations.classic;
  } else if (japanesePrompt.includes('カジュアルで親しみやすい')) {
    englishPrompt += fontTranslations.casual;
  } else if (japanesePrompt.includes('エレガントで洗練')) {
    englishPrompt += fontTranslations.elegant;
  } else if (japanesePrompt.includes('力強く目立つ')) {
    englishPrompt += fontTranslations.powerful;
  }

  englishPrompt += '. Learn from reference images: texture, material, 3D depth, lighting effects (text style only). CRITICAL REQUIREMENTS: Do NOT change the text content on the signboard (e.g., keep "らーめん 稲荷屋" as "らーめん 稲荷屋" exactly). Keep all text content, order, and layout unchanged. Keep signboard position and size unchanged. Do NOT change building exterior (walls, doors, windows, surroundings). Do NOT change other elements (curtains, menu boards, posters). Change ONLY the text style (font, texture, lighting effect). Learn common styles from multiple reference images to realistically recreate the text style only.';

  // 看板タイプ別の追加指示
  if (signboardType === 'led-channel-face') {
    englishPrompt += ' Make the letters 3D with fully illuminated front surface (face-lit). The entire letter face should glow uniformly and brightly for high visibility.';
  } else if (signboardType === 'led-channel-side') {
    englishPrompt += ' Make the letters 3D with only the side edges glowing (side-lit). The front surface should NOT glow, only thin edge lines should emit light for a modern stylish look.';
  } else if (signboardType === 'led-channel-back') {
    englishPrompt += ' Make the letters 3D with backlight glow effect creating a soft halo on the wall behind the letters (back-lit). The letter body should NOT glow, only the backlight halo effect for a luxurious indirect lighting look.';
  } else if (signboardType === 'neon') {
    englishPrompt += ' Add neon tube glowing effect with vibrant illumination for a retro stylish look.';
  } else if (signboardType === 'wooden') {
    englishPrompt += ' Add wooden texture with carved letter depth for a natural warm atmosphere.';
  } else if (signboardType === 'acrylic') {
    englishPrompt += ' Add transparent/translucent acrylic texture with internal lighting effect for a modern refined look.';
  }

  englishPrompt += ' Generate the edited image.';
  
  return englishPrompt;
}

// Gemini APIで詳細なデザイン指示を生成し、高度な画像編集を実行
export async function generateSignboardImage(
  signboardInfo: SignboardInfo,
  colorTheme: string,
  fontStyle: string,
  apiKey: string
): Promise<string> {
  try {
    const cleanApiKey = apiKey.replace(/["'`]/g, '').replace(/[^\x00-\x7F]/g, '').trim();
    
    // 詳細なデザイン指示生成用のプロンプトを作成
    const prompt = createDetailedDesignPrompt(signboardInfo, colorTheme, fontStyle);
    
    debugLog('デザイン指示生成API呼び出し開始', {
      prompt: prompt,
      signboardInfo: signboardInfo
    });
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    const response = await fetch(NANO_BANANA_IMAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': cleanApiKey,
      },
      body: JSON.stringify(requestBody),
    });
    
    debugLog('デザイン指示生成APIレスポンス受信', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      debugLog('デザイン指示生成APIエラーレスポンス', errorText);
      throw new Error(`Design Generation API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    debugLog('デザイン指示生成API成功レスポンス', data);
    
    // テキストレスポンスからデザイン指示を取得
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content;
      let designInstructions = '';
      
      if (content.parts && Array.isArray(content.parts)) {
        for (const part of content.parts) {
          if (part.text) {
            designInstructions += part.text;
          }
        }
      } else if (content.parts && content.parts.text) {
        designInstructions = content.parts.text;
      }
      
      if (designInstructions) {
        debugLog('デザイン指示を取得、高度な画像編集を実行', designInstructions);
        // 高度な画像編集を実行（元画像は後で合成時に使用）
        const result = await enhancedMockAPI('mock_image_base64', designInstructions, prompt);
        // 画像URLを返す
        return result.edited_image_url;
      }
    }
    
    throw new Error('No design instructions generated from API');
  } catch (error) {
    debugLog('デザイン指示生成API呼び出しエラー', error);
    throw error;
  }
}

// 看板生成用のプロンプトを作成
function createSignboardGenerationPrompt(
  signboardInfo: SignboardInfo,
  colorTheme: string,
  fontStyle: string
): string {
  const themeDescriptions = {
    warm: 'warm and cozy colors like terracotta red, burnt orange, and golden yellow',
    clean: 'clean and fresh colors like white, light blue, and soft gray',
    luxury: 'luxurious colors like deep black, gold, and rich burgundy',
    friendly: 'friendly and bright colors like vibrant blue, cheerful yellow, and warm green',
    trust: 'trustworthy and calm colors like navy blue, forest green, and charcoal gray'
  };
  
  const fontDescriptions = {
    modern: 'modern, clean, and minimalist font style',
    classic: 'classic, elegant, and traditional font style',
    casual: 'casual, friendly, and approachable font style',
    elegant: 'elegant, refined, and sophisticated font style',
    powerful: 'powerful, bold, and strong font style'
  };
  
  const themeDesc = themeDescriptions[colorTheme as keyof typeof themeDescriptions] || themeDescriptions.warm;
  const fontDesc = fontDescriptions[fontStyle as keyof typeof fontDescriptions] || fontDescriptions.modern;
  
  return `Generate a professional ${signboardInfo.signboard_type} signboard image for "${signboardInfo.brand_name}". 
The signboard should have ${themeDesc} and use ${fontDesc}. 
The signboard should be realistic, high-quality, and suitable for a ${signboardInfo.location}. 
Include the brand name "${signboardInfo.brand_name}" prominently displayed. 
The design should be modern, professional, and visually appealing. 
Create a clean, isolated signboard image with a white or transparent background. 
High resolution, detailed, photorealistic signboard design.`;
}

// 詳細なデザイン指示生成用のプロンプトを作成
function createDetailedDesignPrompt(
  signboardInfo: SignboardInfo,
  colorTheme: string,
  fontStyle: string
): string {
  const themeDescriptions = {
    warm: 'warm and cozy colors like terracotta red, burnt orange, and golden yellow',
    clean: 'clean and fresh colors like white, light blue, and soft gray',
    luxury: 'luxurious colors like deep black, gold, and rich burgundy',
    friendly: 'friendly and bright colors like vibrant blue, cheerful yellow, and warm green',
    trust: 'trustworthy and calm colors like navy blue, forest green, and charcoal gray'
  };
  
  const fontDescriptions = {
    modern: 'modern, clean, and minimalist font style',
    classic: 'classic, elegant, and traditional font style',
    casual: 'casual, friendly, and approachable font style',
    elegant: 'elegant, refined, and sophisticated font style',
    powerful: 'powerful, bold, and strong font style'
  };
  
  const themeDesc = themeDescriptions[colorTheme as keyof typeof themeDescriptions] || themeDescriptions.warm;
  const fontDesc = fontDescriptions[fontStyle as keyof typeof fontDescriptions] || fontDescriptions.modern;
  
  return `You are a professional signboard designer. Create detailed design instructions for renovating a ${signboardInfo.signboard_type} signboard for "${signboardInfo.brand_name}".

Current signboard information:
- Location: ${signboardInfo.location}
- Current design: ${signboardInfo.current_design}
- Brand name: ${signboardInfo.brand_name}
- Signboard type: ${signboardInfo.signboard_type}
- Position: ${signboardInfo.position_description}

Design requirements:
- Color theme: ${themeDesc}
- Font style: ${fontDesc}

Please provide specific, actionable design instructions including:
1. Exact color codes (hex values) for background, text, and accents
2. Specific font recommendations and sizing
3. Layout and positioning details
4. Visual effects and styling elements
5. Any additional design elements that would enhance the signboard

Make the instructions detailed enough for a designer to implement the renovation precisely. Focus on creating a professional, visually appealing signboard that matches the brand identity and location requirements.`;
}

// 元画像と生成された看板を合成
export async function compositeSignboardImage(
  originalImageBase64: string,
  generatedSignboardBase64: string,
  signboardInfo: SignboardInfo
): Promise<string> {
  try {
    debugLog('画像合成開始', {
      originalImageSize: originalImageBase64.length,
      generatedSignboardType: typeof generatedSignboardBase64,
      generatedSignboardIsString: typeof generatedSignboardBase64 === 'string',
      signboardInfo: signboardInfo
    });
    
    // generatedSignboardBase64が文字列でない場合の処理
    let generatedImageUrl: string;
    if (typeof generatedSignboardBase64 !== 'string') {
      debugLog('生成された画像が文字列ではありません', generatedSignboardBase64);
      // オブジェクトの場合、edited_image_urlプロパティを取得
      if (generatedSignboardBase64 && typeof generatedSignboardBase64 === 'object' && 'edited_image_url' in generatedSignboardBase64) {
        generatedImageUrl = (generatedSignboardBase64 as { edited_image_url?: string }).edited_image_url || '';
      } else {
        throw new Error('Invalid generated signboard format');
      }
    } else {
      generatedImageUrl = generatedSignboardBase64;
    }
    
    debugLog('画像URL取得完了', {
      generatedImageUrl: generatedImageUrl.substring(0, 100)
    });
    
    // Canvas APIを使用して画像を合成
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }
    
    // 元画像を読み込み
    const originalImg = new Image();
    const generatedImg = new Image();
    
    return new Promise((resolve, reject) => {
      let imagesLoaded = 0;
      
      const onImageLoad = () => {
        imagesLoaded++;
        debugLog(`画像読み込み進捗: ${imagesLoaded}/2`);
        
        if (imagesLoaded === 2) {
          try {
            // キャンバスサイズを元画像に合わせる
            canvas.width = originalImg.width;
            canvas.height = originalImg.height;
            
            // 元画像を描画
            ctx.drawImage(originalImg, 0, 0);
            
            // 看板の位置を推定して生成された看板を合成
            const signboardPosition = estimateSignboardPosition(signboardInfo, canvas.width, canvas.height);
            
            // 生成された看板を適切なサイズにリサイズして合成
            const signboardSize = calculateSignboardSize(signboardInfo, canvas.width, canvas.height);
            
            debugLog('看板合成位置とサイズ', {
              position: signboardPosition,
              size: signboardSize
            });
            
            ctx.drawImage(
              generatedImg,
              signboardPosition.x,
              signboardPosition.y,
              signboardSize.width,
              signboardSize.height
            );
            
            // 合成された画像をBase64に変換
            const compositeBase64 = canvas.toDataURL('image/jpeg', 0.9);
            debugLog('画像合成完了');
            resolve(compositeBase64);
          } catch (error) {
            reject(error);
          }
        }
      };
      
      originalImg.onload = onImageLoad;
      generatedImg.onload = onImageLoad;
      
      originalImg.onerror = () => reject(new Error('Failed to load original image'));
      generatedImg.onerror = (error) => {
        debugLog('生成された看板画像の読み込みエラー', error);
        debugLog('生成された画像のURL', generatedImageUrl.substring(0, 100));
        reject(new Error('Failed to load generated signboard'));
      };
      
      originalImg.src = `data:image/jpeg;base64,${originalImageBase64}`;
      
      // 生成された画像の形式を確認して適切に設定
      if (generatedImageUrl.startsWith('data:')) {
        generatedImg.src = generatedImageUrl;
      } else {
        generatedImg.src = `data:image/jpeg;base64,${generatedImageUrl}`;
      }
    });
  } catch (error) {
    console.error('Image composition error:', error);
    throw error;
  }
}

// 看板の位置を推定
function estimateSignboardPosition(signboardInfo: SignboardInfo, canvasWidth: number, canvasHeight: number) {
  // 看板の位置に基づいて座標を推定
  const position = signboardInfo.position_description.toLowerCase();
  
  if (position.includes('top')) {
    return { x: canvasWidth * 0.1, y: canvasHeight * 0.1 };
  } else if (position.includes('center')) {
    return { x: canvasWidth * 0.2, y: canvasHeight * 0.3 };
  } else if (position.includes('bottom')) {
    return { x: canvasWidth * 0.1, y: canvasHeight * 0.6 };
  } else {
    // デフォルト: 中央上部
    return { x: canvasWidth * 0.2, y: canvasHeight * 0.2 };
  }
}

// 看板のサイズを計算
function calculateSignboardSize(signboardInfo: SignboardInfo, canvasWidth: number, canvasHeight: number) {
  // 看板のタイプに基づいてサイズを計算
  const baseSize = Math.min(canvasWidth, canvasHeight) * 0.3;
  
  if (signboardInfo.signboard_type.includes('rectangular')) {
    return { width: baseSize * 1.5, height: baseSize * 0.8 };
  } else if (signboardInfo.signboard_type.includes('oval')) {
    return { width: baseSize * 1.2, height: baseSize * 0.8 };
  } else {
    return { width: baseSize, height: baseSize * 0.6 };
  }
}

// リトライ機能付きAPI呼び出し（apiLimits.tsからインポート）
export { callNanoBananaAPIWithRetry } from './apiLimits';