import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chameneon.jp"),
  title: "ChameNeon工房 | オーダーネオンサイン制作・無料AIプレビュー",
  description: "手書きスケッチやロゴをネオンサインに。AIが完成イメージと価格（¥28,000〜）を無料でその場生成。約2週間で全国にお届け。早い・安い・カッコいいオーダーネオン。店舗・カフェ・バー・ウェルカムボードに対応。",
  keywords: ["ネオンサイン", "オーダーメイド", "カスタムネオン", "店舗サイン", "AIデザイン", "ネオンサイン 制作", "ネオンサイン 価格", "ネオンサイン 安い", "ネオンサイン 早い"],
  openGraph: {
    title: "ChameNeon工房 | 早い・安い・カッコいいオーダーネオン",
    description: "AIがネオンサインの完成イメージと見積もりを無料でその場生成。¥28,000〜、約2週間でお届け。",
    url: "https://www.chameneon.jp",
    siteName: "ChameNeon工房",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/eximg/after-cake.jpg", width: 1200, height: 1200, alt: "ChameNeon工房のオーダーネオンサイン" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChameNeon工房 | 早い・安い・カッコいいオーダーネオン",
    description: "AIがネオンサインの完成イメージと見積もりを無料でその場生成。¥28,000〜、約2週間でお届け。",
    images: ["/eximg/after-cake.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.chameneon.jp",
      name: "ChameNeon工房",
      url: "https://www.chameneon.jp",
      description: "AIを使ったオーダーネオンサイン制作サービス。手書きスケッチやロゴから完成イメージと価格見積もりを無料でその場生成。早い・安い・カッコいいをコンセプトに、約2週間で全国にお届け。",
      slogan: "早い・安い・カッコいい オーダーネオン",
      priceRange: "¥28,000〜",
      areaServed: "JP",
      availableLanguage: "Japanese",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ネオンサイン制作プラン",
        itemListElement: [
          {
            "@type": "Offer",
            name: "オーダーネオンサイン制作",
            description: "手書きスケッチ・ロゴ・テキストからネオンサインを制作。アクリルパネル・LEDチューブ・電源・配送込み。",
            price: "28000",
            priceCurrency: "JPY",
            eligibleRegion: "JP",
          },
          {
            "@type": "Offer",
            name: "AIプレビュー・見積もり（無料）",
            description: "注文前にAIで完成イメージ画像と価格見積もりを無料で確認できるサービス。",
            price: "0",
            priceCurrency: "JPY",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ネオンサインの価格はいくらですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¥28,000（税込）〜です。デザインの複雑さや横幅によって変わります。AIスタジオでスケッチやロゴを入力すると、その場で概算見積もりが表示されます。",
          },
        },
        {
          "@type": "Question",
          name: "納期はどのくらいですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ご注文確定後、約2週間で全国にお届けします。お急ぎの場合はご相談ください。",
          },
        },
        {
          "@type": "Question",
          name: "手書きのスケッチからネオンサインを作れますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、手書きのスケッチ画像をアップロードするだけで、AIが自動的にネオンサインのデザインに変換し、完成イメージを生成します。",
          },
        },
        {
          "@type": "Question",
          name: "注文前に完成イメージを確認できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、AIスタジオ（chameneon.jp/studio）でスケッチやロゴをアップロードすると、リアルな完成イメージ画像と概算価格を無料でその場で確認できます。会員登録も不要です。",
          },
        },
        {
          "@type": "Question",
          name: "カフェや飲食店の店舗サインも作れますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、カフェ・ラーメン屋・バー・美容室など様々な店舗のネオンサインを制作しています。ロゴやメニューのイラストからネオンサインに変換できます。",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-0XME2WFFW1" />
    </html>
  );
}
