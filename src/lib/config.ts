// 環境変数の設定
export const config = {
  nanoBananaApiKey: process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || '',
  isDevelopment: process.env.NODE_ENV === 'development',
  googleDrive: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scopes: 'https://www.googleapis.com/auth/drive.readonly',
  },
};

