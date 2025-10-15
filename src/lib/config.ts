// 環境変数の設定
export const config = {
  nanoBananaApiKey: process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || '',
  isDevelopment: process.env.NODE_ENV === 'development',
};

