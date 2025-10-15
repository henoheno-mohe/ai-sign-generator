// API制限とレート制限の管理
import { callNanoBananaAPI, NanoBananaResponse } from './nanoBananaAPI';

export interface RateLimitInfo {
  remaining: number;
  resetTime: number;
  limit: number;
}

export class RateLimitManager {
  private static instance: RateLimitManager;
  private requestQueue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private readonly minInterval = 100; // 100ms間隔（1秒10リクエスト制限対応）

  static getInstance(): RateLimitManager {
    if (!RateLimitManager.instance) {
      RateLimitManager.instance = new RateLimitManager();
    }
    return RateLimitManager.instance;
  }

  async executeRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.requestQueue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.minInterval) {
        await new Promise(resolve => 
          setTimeout(resolve, this.minInterval - timeSinceLastRequest)
        );
      }

      const request = this.requestQueue.shift();
      if (request) {
        this.lastRequestTime = Date.now();
        await request();
      }
    }

    this.isProcessing = false;
  }
}

// エラーハンドリングの改善
export function handleApiError(error: any): string {
  if (error.status === 429) {
    return 'Request limit exceeded. Please try again later.';
  } else if (error.status === 401) {
    return 'Invalid API key. Please check your configuration.';
  } else if (error.status === 403) {
    return 'Insufficient API key permissions.';
  } else if (error.status >= 500) {
    return 'Server error occurred. Please try again later.';
  } else {
    return error.message || 'An unexpected error occurred.';
  }
}

// リトライ機能付きAPI呼び出し
export async function callNanoBananaAPIWithRetry(
  imageBase64: string,
  prompt: string,
  apiKey: string,
  maxRetries: number = 3
): Promise<NanoBananaResponse> {
  const rateLimitManager = RateLimitManager.getInstance();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await rateLimitManager.executeRequest(() =>
        callNanoBananaAPI(imageBase64, prompt, apiKey)
      );
      return result;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw new Error(handleApiError(error));
      }
      
      // 指数バックオフでリトライ間隔を調整
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('最大リトライ回数に達しました');
}
