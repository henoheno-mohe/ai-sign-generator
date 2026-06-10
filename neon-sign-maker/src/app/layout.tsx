import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChameNeon工房 | オーダーネオンサイン制作・AIプレビュー見積もり",
  description: "手書きスケッチやロゴをネオンサインに変換。AIが完成イメージと価格（¥28,000〜）をその場で生成。納期2〜4週間。店舗・カフェ・バー・ウェルカムボードに対応。",
  keywords: ["ネオンサイン", "オーダーメイド", "カスタムネオン", "店舗サイン", "AIデザイン", "ネオンサイン 制作", "ネオンサイン 価格"],
  openGraph: {
    title: "ChameNeon工房 | オーダーネオンサイン制作",
    description: "AIがネオンサインの完成イメージと見積もりをその場で生成。¥28,000〜、納期2〜4週間。",
    url: "https://www.chameneon.jp",
    siteName: "ChameNeon工房",
    locale: "ja_JP",
    type: "website",
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
      description: "AIを使ったオーダーネオンサイン制作サービス。手書きスケッチやロゴから完成イメージと価格見積もりをその場で生成。",
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
            name: "AIプレビュー・見積もり",
            description: "注文前にAIで完成イメージ画像と価格見積もりを確認できるサービス。",
            price: "500",
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
            text: "デザインの複雑さによって異なりますが、シンプルなデザインで約2〜3週間、中程度で約3〜4週間、複雑なデザインで約4〜6週間が目安です。",
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
            text: "はい、AIスタジオ（chameneon.jp/studio）でスケッチやロゴをアップロードすると、リアルな完成イメージ画像と概算価格をその場で確認できます。",
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
