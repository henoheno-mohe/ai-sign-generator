# フォトフレーム セットアップスクリプト

echo "📸 フォトフレーム PWA - セットアップ"
echo ""

# .env.localファイルが存在するかチェック
if [ -f .env.local ]; then
  echo "✓ .env.local ファイルが見つかりました"
else
  echo "⚠️  .env.local ファイルが見つかりません"
  echo ""
  echo "以下の内容で .env.local ファイルを作成してください："
  echo ""
  echo "NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com"
  echo "NEXT_PUBLIC_GOOGLE_API_KEY=your-api-key"
  echo ""
  echo "詳細は docs/PHOTOFRAME_GUIDE.md を参照してください"
  exit 1
fi

# public/iconsディレクトリをチェック
if [ -d public/icons ]; then
  echo "✓ public/icons ディレクトリが見つかりました"
  
  if [ -f public/icons/icon-192.png ] && [ -f public/icons/icon-512.png ]; then
    echo "✓ PWAアイコンが設定されています"
  else
    echo "⚠️  PWAアイコンが見つかりません"
    echo ""
    echo "以下のファイルを public/icons/ に配置してください："
    echo "  - icon-192.png (192x192px)"
    echo "  - icon-512.png (512x512px)"
    echo ""
    echo "オンラインツール: https://realfavicongenerator.net/"
  fi
else
  echo "⚠️  public/icons ディレクトリが見つかりません"
  mkdir -p public/icons
  echo "✓ public/icons ディレクトリを作成しました"
fi

echo ""
echo "🚀 セットアップが完了しました！"
echo ""
echo "次のステップ："
echo "1. npm install"
echo "2. npm run dev"
echo "3. http://localhost:3000/photoframe にアクセス"
echo ""
echo "詳細なガイドは docs/PHOTOFRAME_GUIDE.md を参照してください"

