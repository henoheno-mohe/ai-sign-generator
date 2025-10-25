'use client';

import { useState } from 'react';

interface LicenseInputProps {
  onLicenseVerified: (licenseKey: string, remaining: number) => void;
}

export default function LicenseInput({ onLicenseVerified }: LicenseInputProps) {
  const [licenseKey, setLicenseKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    try {
      const response = await fetch('/api/license/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licenseKey: licenseKey.toUpperCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'ライセンスの認証に失敗しました');
        return;
      }

      if (data.valid) {
        // ライセンスをlocalStorageに保存
        localStorage.setItem('ai-sign-license', licenseKey.toUpperCase());
        onLicenseVerified(licenseKey.toUpperCase(), data.license.remaining);
      }
    } catch (error) {
      console.error('License verification error:', error);
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 大文字に変換し、フォーマットを整える
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    setLicenseKey(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ライセンスキーを入力
        </h2>
        <p className="text-gray-600">
          ライセンスキーを入力してAI看板デザインジェネレーターを使用してください
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
            ライセンスキー
          </label>
          <input
            type="text"
            id="license"
            value={licenseKey}
            onChange={handleInputChange}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            maxLength={19}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-mono tracking-wider"
            disabled={isVerifying}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isVerifying || licenseKey.length < 15}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isVerifying || licenseKey.length < 15
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>認証中...</span>
            </div>
          ) : (
            'ライセンスを認証'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          ライセンスキーをお持ちでない方は、管理者にお問い合わせください
        </p>
      </div>
    </div>
  );
}

