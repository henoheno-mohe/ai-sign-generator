/**
 * Nano Banana APIを使って看板タイプの参考画像を生成するスクリプト
 */

// .env.localを読み込む
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    }
  }
}

loadEnv();

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || '';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

interface SignboardSample {
  id: string;
  name: string;
  prompt: string;
  filename: string;
}

const signboardSamples: SignboardSample[] = [
  {
    id: 'led-channel-face',
    name: 'LEDチャンネル文字（正面発光）',
    prompt: `Generate a professional photo of a modern LED channel letter signboard on a commercial building at night. 
The letters should be 3D with the entire front surface brightly illuminated (face-lit). 
The signboard should say "OPEN" or "CAFE" in English.
High quality, professional commercial photography, realistic lighting, urban setting, modern design.`,
    filename: 'led-channel-face.jpg'
  },
  {
    id: 'flat',
    name: '平面看板',
    prompt: `Generate a professional photo of a traditional flat signboard on a commercial building. 
The signboard should be a simple flat panel with text and graphics painted or printed on it.
The signboard should say "SHOP" or "STORE" in English.
High quality, professional commercial photography, daytime, clean design.`,
    filename: 'flat.jpg'
  },
  {
    id: 'neon',
    name: 'ネオンサイン',
    prompt: `Generate a professional photo of a vibrant neon sign on a commercial building at night.
The sign should have glowing neon tubes forming letters that emit bright colorful light.
The signboard should say "BAR" or "PIZZA" in English.
Retro style, glowing effect, professional commercial photography, nighttime, colorful glow.`,
    filename: 'neon.jpg'
  },
  {
    id: 'wooden',
    name: '木製看板',
    prompt: `Generate a professional photo of a natural wooden signboard on a commercial building.
The sign should have carved or engraved letters with natural wood texture visible.
The signboard should say "CAFE" or "BAKERY" in English.
Natural wood grain, warm atmosphere, professional commercial photography, daytime, rustic charm.`,
    filename: 'wooden.jpg'
  },
  {
    id: 'acrylic',
    name: 'モダンアクリル',
    prompt: `Generate a professional photo of a modern acrylic signboard on a commercial building.
The sign should have transparent or translucent acrylic panels with internal LED lighting.
The signboard should say "SALON" or "CLINIC" in English.
Modern, sleek design, professional commercial photography, clean and refined look.`,
    filename: 'acrylic.jpg'
  }
];

async function generateImage(sample: SignboardSample): Promise<string | null> {
  try {
    console.log(`\n🎨 生成中: ${sample.name}`);
    console.log(`プロンプト: ${sample.prompt.substring(0, 100)}...`);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: sample.prompt
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // 画像データを抽出
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const parts = data.candidates[0].content.parts;
      
      for (const part of parts) {
        if (part.inlineData || part.inline_data) {
          const imageData = part.inlineData || part.inline_data;
          const base64Image = imageData.data;
          console.log(`✅ 生成成功: ${sample.name}`);
          return base64Image;
        }
      }
    }
    
    console.log(`⚠️  画像が生成されませんでした: ${sample.name}`);
    return null;
  } catch (error) {
    console.error(`❌ エラー: ${sample.name}`, error);
    return null;
  }
}

async function saveImage(base64Data: string, filename: string): Promise<void> {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'signboard-types');
  
  // ディレクトリがなければ作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const buffer = Buffer.from(base64Data, 'base64');
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, buffer);
  console.log(`💾 保存完了: ${filepath}`);
}

async function main() {
  console.log('🚀 Nano Bananaで看板タイプの参考画像を生成します...\n');
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
    console.error('❌ エラー: NEXT_PUBLIC_NANO_BANANA_API_KEYが設定されていません');
    process.exit(1);
  }
  
  for (const sample of signboardSamples) {
    const base64Image = await generateImage(sample);
    
    if (base64Image) {
      await saveImage(base64Image, sample.filename);
    }
    
    // API制限を避けるため1秒待機
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✨ すべての画像生成が完了しました！');
  console.log('📁 保存先: public/images/signboard-types/');
}

main();

