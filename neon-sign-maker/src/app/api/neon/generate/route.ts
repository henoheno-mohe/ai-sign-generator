import { NextResponse } from "next/server";
import { NEON_PROTOCOL_V1 } from "@/lib/neonProtocol";
import { getDefaultBackground } from "@/lib/backgrounds";
import { generateImageWithGemini } from "@/lib/geminiImage";
import { buildNeonPrompt } from "@/lib/neonProtocol";
import type { NeonColor } from "@/lib/palette";

function getApiKey() {
  // 既存のキー名を流用（将来はサーバー用キーに分離推奨）
  return process.env.NANO_BANANA_API_KEY || process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || "";
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
        { error: "APIキーが設定されていません（環境変数 NANO_BANANA_API_KEY を設定してください）" },
        { status: 400 }
      );
    }

    const sketchDataUrl: string | null | undefined = body?.sketchDataUrl ?? null;
    const text: string = body?.text ?? "";
    const colors: NeonColor[] = body?.colors;
    const widthMm: number = body?.widthMm ?? 600;
    const tubeDiameter: 5 | 7 | 9 = body?.tubeDiameter ?? NEON_PROTOCOL_V1.defaultTubeDiameter;

    if (!Array.isArray(colors) || colors.length < 1 || colors.length > 5) {
      return NextResponse.json({ error: "色数の指定が不正です（1〜5色）" }, { status: 400 });
    }
    if (colors.some((c) => !c?.hex || !c?.name)) {
      return NextResponse.json({ error: "色の指定が不正です" }, { status: 400 });
    }

    const background = getDefaultBackground(); // MVP: 背景は1つ
    const prompt = buildNeonPrompt({
      userText: text,
      colors,
      background,
      widthMm,
      tubeDiameter,
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


