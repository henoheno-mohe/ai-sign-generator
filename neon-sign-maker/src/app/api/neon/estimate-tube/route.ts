import { NextResponse } from "next/server";
import { askGeminiForTubeLengthCm } from "@/lib/geminiImage";

function getApiKey() {
  return process.env.NANO_BANANA_API_KEY || process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageDataUrl, widthMm } = body as { imageDataUrl: string; widthMm: number };

    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 400 });
    }

    const match = imageDataUrl?.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: "画像データが不正です" }, { status: 400 });
    }

    const tubeLengthCm = await askGeminiForTubeLengthCm({
      apiKey,
      imageBase64: match[2],
      mimeType: match[1],
      widthMm: Number(widthMm) || 600,
    });

    return NextResponse.json({ tubeLengthCm });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
