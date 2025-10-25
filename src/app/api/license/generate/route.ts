import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { createLicense } from '@/lib/license';

// 管理者認証用のシークレットキー（環境変数で設定）
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your-admin-secret-key-change-this';

export async function POST(request: NextRequest) {
  try {
    const { adminSecret, plan = 'standard', owner, email } = await request.json();

    // 管理者認証
    if (adminSecret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: '認証エラー：管理者権限がありません' },
        { status: 401 }
      );
    }

    // 新しいライセンスを生成
    const license = createLicense(plan, owner, email);

    // KVに保存
    await kv.set(`license:${license.key}`, license);

    // ライセンス情報を返す
    return NextResponse.json({
      success: true,
      license: {
        key: license.key,
        maxUses: license.maxUses,
        plan: license.plan,
        owner: license.owner,
        email: license.email,
        createdAt: license.createdAt,
      },
    });
  } catch (error) {
    console.error('License generation error:', error);
    return NextResponse.json(
      { error: 'ライセンスの生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

