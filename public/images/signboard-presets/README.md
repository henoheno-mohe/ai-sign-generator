# 📸 看板タイプ プリセット参考画像

このディレクトリには、AIがより正確にリアルな看板を生成するための参考画像を配置します。

## 📋 必要な画像一覧

### LEDチャンネル文字（3枚推奨）
- `led-channel-face-1.png` - スターバックスやユニクロ風の正面発光
- `led-channel-face-2.png` - 別の企業の正面発光例
- `led-channel-face-3.png` - さらに別の正面発光例

### 平面看板（2枚推奨）
- `flat-1.png` - 商店街風の平面看板
- `flat-2.png` - 別の平面看板例

### ネオンサイン（3枚推奨）
- `neon-1.png` - バー風のネオンサイン
- `neon-2.png` - 居酒屋風のネオンサイン
- `neon-3.png` - カフェ風のネオンサイン

### 木製看板（2枚推奨）
- `wooden-1.png` - カフェ風の木製看板
- `wooden-2.png` - パン屋風の木製看板

### モダンアクリル（2枚推奨）
- `acrylic-1.png` - 美容院風のアクリル看板
- `acrylic-2.png` - クリニック風のアクリル看板

## 🎨 画像の取得方法

### 方法1: Gemini（推奨）
以下のプロンプトでGeminiに画像生成を依頼：

```
Generate a professional photo of a modern LED channel letter signboard on a commercial building exterior at night.
The signboard should say "SHOP" or "STORE" in English.
Face-lit illumination with the entire front surface glowing uniformly.
High quality, realistic, professional commercial photography.
```

### 方法2: フリー素材サイト
- Unsplash (unsplash.com)
- Pexels (pexels.com)
- Pixabay (pixabay.com)

検索キーワード例:
- `LED channel letter signboard`
- `neon sign shop`
- `wooden sign cafe`

### 方法3: 実際の店舗を撮影
- 著作権に注意し、ブランド名が見えないようにトリミング

## 📐 画像の推奨仕様

- **フォーマット**: PNG
- **サイズ**: 800x600px以上（アスペクト比4:3推奨）
- **内容**: 看板全体が明確に見える、リアルな商業用看板
- **避けるべき**: 漫画風、低解像度、テキストが読めないもの

## 🚀 画像設置後の動作

ユーザーが看板タイプを選択すると、自動的にこれらの参考画像がGemini APIに送信され、より精度の高いリニューアル結果が生成されます。

画像がない場合でも動作しますが、精度は低下します。

