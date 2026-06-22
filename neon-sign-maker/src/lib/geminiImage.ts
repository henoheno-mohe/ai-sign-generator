import { NANO_BANANA_IMAGE_API_URL } from "./nanoBananaCompat";

const GEMINI_VISION_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

type GeminiImageResult = {
  imageDataUrl: string;
  text?: string;
};

function cleanApiKey(apiKey: string) {
  return apiKey.replace(/["'`]/g, "").replace(/[^\x00-\x7F]/g, "").trim();
}

export async function generateImageWithGemini({
  apiKey,
  prompt,
  inputImageBase64,
  inputMimeType = "image/png",
}: {
  apiKey: string;
  prompt: string;
  inputImageBase64?: string | null;
  inputMimeType?: string;
}): Promise<GeminiImageResult> {
  const cleanKey = cleanApiKey(apiKey);

  const parts: Array<Record<string, unknown>> = [];
  if (inputImageBase64) {
    parts.push({
      inline_data: {
        mime_type: inputMimeType,
        data: inputImageBase64,
      },
    });
  }
  parts.push({ text: prompt });

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.2,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  };

  let retryCount = 0;
  const maxRetries = 3; // 2 -> 3 に増加
  const retryDelayMs = 3000; // 2000 -> 3000 に増加

  while (retryCount <= maxRetries) {
    try {
      const resp = await fetch(NANO_BANANA_IMAGE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": cleanKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!resp.ok) {
        const errorText = await resp.text().catch(() => "");
        // 503 (Service Unavailable) または 429 (Too Many Requests) の場合はリトライを検討
        if ((resp.status === 503 || resp.status === 429) && retryCount < maxRetries) {
          retryCount++;
          console.warn(`Gemini API error ${resp.status}. Retrying (${retryCount}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, retryDelayMs * retryCount));
          continue;
        }
        throw new Error(`Gemini API Error: ${resp.status} ${resp.statusText} ${errorText}`);
      }

      const data = await resp.json();
      const candidate = data?.candidates?.[0];
      const partsOut = candidate?.content?.parts;
      const finishReason = candidate?.finishReason || "UNKNOWN";

      // トークン使用量をログ出力
      const usage = data?.usageMetadata;
      if (usage) {
        console.log(`[Gemini usage] input=${usage.promptTokenCount} output=${usage.candidatesTokenCount} total=${usage.totalTokenCount}`);
      }

      let textOut = "";
      if (Array.isArray(partsOut)) {
        for (const p of partsOut) {
          if (p?.text) textOut += String(p.text);
        }
      }

      if (Array.isArray(partsOut)) {
        for (const p of partsOut) {
          const inline = p?.inline_data || p?.inlineData;
          if (inline?.data) {
            const mime = inline?.mime_type || inline?.mimeType || "image/png";
            return { imageDataUrl: `data:${mime};base64,${inline.data}`, text: textOut || undefined };
          }
        }
      }
      
      // 画像がなかった理由を具体的に表示
      const safetyInfo = data?.promptFeedback?.blockReason ? `Blocked by: ${data.promptFeedback.blockReason}` : `Reason: ${finishReason}`;
      const debugInfo = textOut ? ` AI Response: "${textOut.substring(0, 100)}..."` : ` [${safetyInfo}]`;
      throw new Error(`Gemini API did not return image data.${debugInfo}`);
    } catch (e) {
      if (retryCount >= maxRetries) {
        throw e;
      }
      retryCount++;
      await new Promise(resolve => setTimeout(resolve, retryDelayMs * retryCount));
    }
  }

  throw new Error("Maximum retries reached for Gemini API.");
}

/**
 * AI生成されたネオンサイン画像からGeminiにチューブ総延長(cm)を推定させる。
 * グロー/ハロー効果を除いたチューブ中心線の長さを返す。
 */
export async function askGeminiForTubeLengthCm({
  apiKey,
  imageBase64,
  mimeType,
  widthMm,
}: {
  apiKey: string;
  imageBase64: string;
  mimeType: string;
  widthMm: number;
}): Promise<number | null> {
  const cleanKey = cleanApiKey(apiKey);

  // 絶対cmを直接当てさせると過大になりがちなので、
  // スケール不変な「パネル横幅に対する倍率」で推定させてからcmに換算する。
  const prompt =
    `次の画像はLEDネオンサインのデザインです。発光しているネオンチューブだけに注目してください。\n` +
    `チューブの中心線（芯）の総延長が、ネオンデザイン本体の横幅の何倍にあたるかを推定します。\n` +
    `グロー（光のにじみ）は含めず、芯の長さだけを合計します。\n` +
    `目安: シンプルな文字のみ=1〜3倍、絵柄＋短い文字=3〜5倍、複雑で線が多い=5〜7倍。\n` +
    `説明や文章は一切書かず、倍率の数値のみを小数で出力してください（例: 4.2）`;

  const requestBody = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeType, data: imageBase64 } },
        { text: prompt },
      ],
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 64,
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  const resp = await fetch(`${GEMINI_VISION_API_URL}?key=${cleanKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!resp.ok) return null;

  const data = await resp.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const match = text.match(/\d+(\.\d+)?/);
  if (!match) return null;

  // 物理的にありえない倍率はクランプ（幅の1〜7倍に制限）
  const ratio = Math.min(Math.max(parseFloat(match[0]), 1), 7);
  const widthCm = widthMm / 10;
  const cm = Math.round(ratio * widthCm);
  return cm;
}

