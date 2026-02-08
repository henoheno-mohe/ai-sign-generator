import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";
import ImageTracer from "imagetracerjs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    
    const { imageDataUrl, userEmail, widthMm, tubeLengthCm, estimatedPrice, selectedColors } = await req.json();

    if (!imageDataUrl || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Vercel Blobに画像を保存
    const fileName = `neon-${Date.now()}.png`;
    // dataUrlをBufferに変換
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    
    const blob = await put(`orders/${fileName}`, buffer, {
      access: "public",
      contentType: "image/png",
    });

    // 2. ImageTracerでベクター化 (SVG)
    // Node.js環境でのImageTracerの簡易実行
    // ※ImageTracerは本来ブラウザ向けだが、Node.jsでも画像データを渡せば動く
    // ただし、本格的な画像解析にはJSのCanvas shimsが必要な場合があるため
    // ここでは簡易的なオプションで実行。失敗した場合はSVGなしで進む。
    let svgContent = "";
    try {
      // 実際にはNode.jsでImageTracerを動かすには
      // imageData {width, height, data} の形式が必要
      // ここではNext.jsのAPI制限やライブラリの性質を考慮し、
      // 成功時のみ添付するようにトライアル実装
      // (今回は簡易化のためSVG生成ロジックは最小限に留める)
      // svgContent = ImageTracer.imageToSVG(imageDataUrl, { ltres: 1, qtres: 1, scale: 1 });
    } catch (e) {
      console.error("Vectorization failed:", e);
    }

    const colorNames = selectedColors.map((c: any) => c.nameJp || c.name).join("、");

    // 3. お客様へ確認メール
    await resend.emails.send({
      from: "ChameNeon工房 <info@chameneon.jp>",
      to: userEmail,
      subject: "【ChameNeon工房】デザインの保存と概算見積もりのご確認",
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>デザインのご確認ありがとうございます！</h2>
          <p>ChameNeon工房のAIスタジオをご利用いただき、ありがとうございます。<br>作成いただいたデザインの保存が完了しました。</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>概算お見積もり内容</h3>
            <ul>
              <li><strong>横幅:</strong> ${widthMm}mm</li>
              <li><strong>選択カラー:</strong> ${colorNames}</li>
              <li><strong>概算金額:</strong> ¥${estimatedPrice.toLocaleString()} (税込)</li>
            </ul>
            <p>※この金額は概算です。注文確定後の詳細打ち合わせにより変動する場合があります。</p>
          </div>

          <p>作成したイメージ画像は以下のURLからご確認いただけます：</p>
          <p><a href="${blob.url}">${blob.url}</a></p>
          
          <hr>
          <p>引き続き、BASEショップにてご注文をお待ちしております。</p>
          <p><a href="https://chameneon.base.shop/">ChameNeon工房 BASEショップへ</a></p>
        </div>
      `,
    });

    // 4. カメネオン工房（管理者）へ通知メール
    await resend.emails.send({
      from: "ChameNeon工房システム <system@chameneon.jp>",
      to: "info@chameneon.jp", // 管理者の受信アドレス
      subject: `【新規デザイン保存】${userEmail} 様`,
      html: `
        <h3>新規のデザイン保存・見積もりがありました。</h3>
        <ul>
          <li><strong>ユーザー:</strong> ${userEmail}</li>
          <li><strong>横幅:</strong> ${widthMm}mm</li>
          <li><strong>推定チューブ長:</strong> ${tubeLengthCm}cm</li>
          <li><strong>選択カラー:</strong> ${colorNames}</li>
          <li><strong>概算金額:</strong> ¥${estimatedPrice.toLocaleString()} (税込)</li>
        </ul>
        <p><strong>生成画像URL:</strong> <a href="${blob.url}">${blob.url}</a></p>
      `,
    });

    return NextResponse.json({ success: true, blobUrl: blob.url });
  } catch (e) {
    console.error("Order complete API error:", e);
    return NextResponse.json({ error: "Failed to process order notification" }, { status: 500 });
  }
}

