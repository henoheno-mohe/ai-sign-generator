'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [adminSecret, setAdminSecret] = useState('');
  const [plan, setPlan] = useState<'free' | 'standard'>('standard');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGeneratedLicense(null);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/license/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminSecret,
          plan,
          owner: owner || undefined,
          email: email || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'ライセンスの生成に失敗しました');
        return;
      }

      setGeneratedLicense(data.license.key);
      // フォームをリセット（adminSecretは保持）
      setOwner('');
      setEmail('');
    } catch (error) {
      console.error('License generation error:', error);
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLicense) {
      navigator.clipboard.writeText(generatedLicense);
      alert('ライセンスキーをコピーしました！');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ライセンス管理画面
          </h1>
          <p className="text-gray-600">
            新しいライセンスキーを生成します
          </p>
        </div>

        {/* ライセンス生成フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* 管理者シークレット */}
            <div>
              <label htmlFor="adminSecret" className="block text-sm font-medium text-gray-700 mb-2">
                管理者シークレットキー <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="adminSecret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="環境変数に設定したシークレットキー"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                .env.local の ADMIN_SECRET の値を入力してください
              </p>
            </div>

            {/* プラン選択 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                プラン <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlan('free')}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    plan === 'free'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">無料トライアル</div>
                  <div className="text-sm">10回</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPlan('standard')}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    plan === 'standard'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">スタンダード</div>
                  <div className="text-sm">50回</div>
                </button>
              </div>
            </div>

            {/* オーナー名 */}
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-2">
                オーナー名（任意）
              </label>
              <input
                type="text"
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="例: 山田太郎"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス（任意）
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* エラー表示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* 生成ボタン */}
            <button
              type="submit"
              disabled={isGenerating || !adminSecret}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isGenerating || !adminSecret
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>生成中...</span>
                </div>
              ) : (
                'ライセンスキーを生成'
              )}
            </button>
          </form>
        </div>

        {/* 生成されたライセンス表示 */}
        {generatedLicense && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-green-800">ライセンスキーが生成されました！</h3>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-600 mb-2">ライセンスキー:</p>
              <p className="text-2xl font-mono font-bold text-gray-900 text-center tracking-wider">
                {generatedLicense}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              クリップボードにコピー
            </button>
            <p className="text-sm text-gray-600 mt-4 text-center">
              このキーを顧客に送信してください
            </p>
          </div>
        )}

        {/* 戻るリンク */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← トップページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}

