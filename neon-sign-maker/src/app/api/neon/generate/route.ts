import { NextResponse } from "next/server";
import { NEON_PROTOCOL_V1 } from "@/lib/neonProtocol";
import { getDefaultBackground } from "@/lib/backgrounds";
import { generateImageWithGemini } from "@/lib/geminiImage";
import { buildNeonPromptV1, buildNeonPromptV2 } from "@/lib/neonProtocol";
import type { NeonColor } from "@/lib/palette";

function getApiKey() {
  const key = process.env.NANO_BANANA_API_KEY || process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || "";
  return key;
}

function dataUrlToBase64(dataUrl: string) {
  const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!match) return null;
  return { mimeType: match[1], base64: match[2] };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "APIキーが設定されていません" },
        { status: 400 }
      );
    }

    const sketchDataUrl: string | null | undefined = body?.sketchDataUrl ?? null;
    const text: string = body?.text ?? "";
    const colors: NeonColor[] = body?.colors;
    const isAutoColor: boolean = body?.isAutoColor ?? false;
    const widthMm: number = body?.widthMm ?? 600;
    const tubeDiameter: 5 | 7 | 9 = body?.tubeDiameter ?? NEON_PROTOCOL_V1.defaultTubeDiameter;
    const version: string = body?.version ?? "v1"; // デフォルトはv1

    if (!isAutoColor) {
      if (!Array.isArray(colors) || colors.length < 1 || colors.length > 5) {
        return NextResponse.json({ error: "色数の指定が不正です" }, { status: 400 });
      }
    }

    const background = getDefaultBackground();
    
    // バージョンに応じてプロンプトを切り替え
    const promptBuilder = version === "v2" ? buildNeonPromptV2 : buildNeonPromptV1;
    const prompt = promptBuilder({
      userText: text,
      colors: isAutoColor ? [] : colors,
      background,
      widthMm,
      tubeDiameter,
      isAutoColor,
    });

    const parsed = sketchDataUrl ? dataUrlToBase64(sketchDataUrl) : null;

    const result = await generateImageWithGemini({
      apiKey,
      prompt,
      inputImageBase64: parsed?.base64 ?? null,
      inputMimeType: parsed?.mimeType ?? "image/png",
    });

    return NextResponse.json({ imageDataUrl: result.imageDataUrl, text: result.text });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
