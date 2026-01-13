# 📸 フォトフレーム PWA - 使い方ガイド

iPad mini 3をフォトフレーム専用デバイスに変身させるWebアプリです。

## 🎯 特徴

- ✅ 容量8GBでもOK（写真はGoogle Driveから読み込み）
- ✅ PWA対応でアプリのように使える
- ✅ 日付フォルダで自動管理
- ✅ タッチ操作対応
- ✅ 時間帯スリープ機能
- ✅ ランダム再生
- ✅ カスタマイズ可能

## 🚀 初期セットアップ

### 1. Google Drive APIの設定

フォトフレームアプリがGoogle Driveにアクセスするため、APIキーとクライアントIDが必要です。

#### 手順

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/ にアクセス
   - 新しいプロジェクトを作成（例: "PhotoFrame App"）

2. **Google Drive APIを有効化**
   - 左メニュー > 「APIとサービス」 > 「ライブラリ」
   - "Google Drive API" を検索
   - 「有効にする」をクリック

3. **OAuth 2.0クライアントIDを作成**
   - 左メニュー > 「APIとサービス」 > 「認証情報」
   - 「認証情報を作成」 > 「OAuth クライアント ID」
   - 同意画面の設定（初回のみ）:
     - ユーザータイプ: 外部
     - アプリ名: PhotoFrame
     - スコープ: `https://www.googleapis.com/auth/drive.readonly`
   - アプリケーションの種類: Webアプリケーション
   - 承認済みのJavaScript生成元: `http://localhost:3000`, `https://your-domain.vercel.app`
   - 承認済みのリダイレクトURI: `http://localhost:3000/photoframe`, `https://your-domain.vercel.app/photoframe`
   - 「作成」をクリック
   - **クライアントID**をコピー

4. **APIキーを作成**
   - 「認証情報を作成」 > 「APIキー」
   - **APIキー**をコピー

5. **環境変数を設定**

プロジェクトルートに `.env.local` ファイルを作成:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=あなたのクライアントID.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_API_KEY=あなたのAPIキー
```

### 2. Google Driveのフォルダ構成

Google Driveに以下の構成でフォルダと写真を配置してください：

```
📁 PhotoFrame/
  📁 2024-12-01/
    📷 IMG_001.jpg
    📷 IMG_002.jpg
  📁 2024-12-11/
    📷 IMG_010.jpg
  📁 2025-01-01/
    📷 IMG_020.jpg
    📷 IMG_021.jpg
```

**重要な点：**
- メインフォルダ名は任意（デフォルト: `PhotoFrame`）
- 日付フォルダは `YYYY-MM-DD` 形式で作成
- サポートされる画像形式: JPG, PNG, GIF, WEBP

### 3. PWAアイコンを準備

`public/icons/` フォルダに以下のアイコンを配置してください：

- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

オンラインツールで簡単に作成できます：
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

### 4. アプリを起動

```bash
# 開発モード
npm run dev

# 本番ビルド
npm run build
npm start
```

ブラウザで `http://localhost:3000/photoframe` を開く

### 5. 初回セットアップウィザード

1. **Google アカウントでサインイン**
   - 「Google アカウントでサインイン」ボタンをクリック
   - Google Driveの読み取り権限を許可

2. **フォルダを設定**
   - フォルダ名（例: `PhotoFrame`）を入力
   - 「フォルダを検索」ボタンをクリック
   - フォルダが見つかったら「次へ」

3. **完了**
   - 「スライドショーを開始」でフォトフレームが起動

## 📱 iPadにインストール

### Safariでホーム画面に追加

1. Safariで `https://your-domain.vercel.app/photoframe` を開く
2. 共有ボタン（□に↑）をタップ
3. 「ホーム画面に追加」を選択
4. 「追加」をタップ

これでアプリアイコンがホーム画面に追加され、フルスクリーンで起動できます！

## 🎮 操作方法

### タッチ操作

- **タップ**: 一時停止/再開
- **左スワイプ**: 次の写真
- **右スワイプ**: 前の写真
- **長押し（1.5秒）**: 設定画面を開く

### 画面表示

- 左上: 時計・日付（設定で表示/非表示）
- 左下: 写真情報（設定で表示/非表示）
- 下部: プログレスバー

## ⚙️ 設定

設定画面では以下をカスタマイズできます：

### スライドショー設定
- **スライド間隔**: 3秒〜1分
- **トランジション効果**: フェード/スライド/なし
- **ランダム再生**: ON/OFF

### 表示設定
- **時計表示**: ON/OFF
- **日付表示**: ON/OFF
- **写真情報表示**: ON/OFF

### スリープ設定
- **時間帯スリープ**: ON/OFF
- **スリープ開始時刻**: 例) 23:00
- **スリープ終了時刻**: 例) 07:00

スリープ時は画面が真っ暗になり、設定した時刻に自動で再開します。

### キャッシュ設定
- **写真リストをキャッシュ**: ON/OFF
- **更新間隔**: 30分〜24時間

キャッシュを有効にすると、毎回Google Driveにアクセスせずに高速表示できます。

## 🔄 写真の追加・更新

1. Google Driveで `PhotoFrame` フォルダを開く
2. 新しい日付フォルダを作成（例: `2025-01-15/`）
3. フォルダに写真をアップロード
4. フォトフレームアプリで「🔄 更新」ボタンをタップ
   - または、キャッシュ更新間隔が経過すると自動更新

## 🌐 Vercelにデプロイ

### 1. Vercelアカウントを作成

https://vercel.com/ でアカウント作成（GitHubアカウント連携推奨）

### 2. プロジェクトをデプロイ

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

または、Vercel Webサイトから：
1. 「New Project」をクリック
2. GitHubリポジトリを選択
3. 環境変数を設定:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_GOOGLE_API_KEY`
4. 「Deploy」をクリック

### 3. OAuth設定を更新

Google Cloud Consoleで、デプロイしたURLを承認済みURLに追加:
- JavaScript生成元: `https://your-app.vercel.app`
- リダイレクトURI: `https://your-app.vercel.app/photoframe`

## 🛠️ トラブルシューティング

### 写真が表示されない

1. Google Driveのフォルダ構成を確認
   - `PhotoFrame` フォルダが存在するか
   - 日付フォルダが `YYYY-MM-DD` 形式か
   - 写真が入っているか

2. キャッシュをクリア
   - 設定 > キャッシュ > 「キャッシュをクリア」

3. フォルダを再設定
   - 設定 > Google Drive > 「フォルダを再設定」

### サインインできない

1. 環境変数が正しく設定されているか確認
2. Google Cloud ConsoleでOAuth設定を確認
3. ブラウザのキャッシュをクリア

### スリープから復帰しない

1. iPad設定で「自動ロック」を「なし」に設定
2. フォトフレーム設定でスリープ時刻を確認

### キャッシュが更新されない

1. 設定 > キャッシュ > 「キャッシュをクリア」
2. 更新間隔を短く設定（例: 30分）

## 💡 おすすめの使い方

### 充電を保つ
- iPadを充電器に常時接続
- iPad設定で「自動ロック」を「なし」に
- 低電力モードはOFF

### 固定スタンドを使う
- iPadスタンドや壁掛けホルダーを使用
- 横向き（ランドスケープ）での使用を推奨

### 定期的に写真を追加
- 1週間に1回、新しい写真を追加
- 古い写真は別フォルダに移動してもOK

### 時間帯スリープを活用
- 夜間（例: 23:00〜07:00）はスリープ
- 電力節約と画面の焼き付き防止

## 📊 技術スタック

- **Next.js 16** - Reactフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - スタイリング
- **Google Drive API** - 写真管理
- **PWA** - アプリライク体験
- **LocalStorage** - 設定とキャッシュ

## 📄 ライセンス

MIT License

---

**楽しいフォトフレームライフを！** 📸✨

