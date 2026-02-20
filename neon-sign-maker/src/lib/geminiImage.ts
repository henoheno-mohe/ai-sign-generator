import { NANO_BANANA_IMAGE_API_URL } from "./nanoBananaCompat";

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
  };

  let retryCount = 0;
  const maxRetries = 2;
  const retryDelayMs = 2000;

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
      
      throw new Error("Gemini API did not return image data.");
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


