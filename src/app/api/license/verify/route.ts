import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { validateLicenseKeyFormat, isLicenseValid, getRemainingUses, type License } from '@/lib/license';

export async function POST(request: NextRequest) {
  try {
    const { licenseKey } = await request.json();

    // フォーマット検証
    if (!validateLicenseKeyFormat(licenseKey)) {
      return NextResponse.json(
        { error: '無効なライセンスキー形式です' },
        { status: 400 }
      );
    }

    // ライセンス情報を取得
    const license = await kv.get<License>(`license:${licenseKey}`);

    if (!license) {
      return NextResponse.json(
        { error: 'ライセンスキーが見つかりません' },
        { status: 404 }
      );
    }

    // ライセンスの有効性チェック
    if (!isLicenseValid(license)) {
      if (license.status === 'disabled') {
        return NextResponse.json(
          { error: 'このライセンスは無効化されています' },
          { status: 403 }
        );
      }
      if (license.usedCount >= license.maxUses) {
        return NextResponse.json(
          { error: '使用回数の上限に達しました' },
          { status: 403 }
        );
      }
    }

    // ライセンス情報を返す
    return NextResponse.json({
      valid: true,
      license: {
        key: license.key,
        remaining: getRemainingUses(license),
        maxUses: license.maxUses,
        usedCount: license.usedCount,
        plan: license.plan,
      },
    });
  } catch (error) {
    console.error('License verification error:', error);
    return NextResponse.json(
      { error: 'ライセンスの検証中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

