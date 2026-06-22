'use client';

import Link from "next/link";

const GREEN = "#2d7a71";
const INK = "#111111";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav />
      <HeroSection />
      <UseCasesSection />
      <HowItWorksSection />
      <PriceSection />
      <ExamplesSection />
      <RealProductSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </div>
  );
}

/* ── Nav ── */
function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-900/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="ChameNeon Logo" className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-900/10" />
          <span className="text-sm font-black tracking-tight text-gray-900">ChameNeon工房</span>
        </div>
        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-gray-500 sm:flex">
          <a href="#usecases" className="hover:text-gray-900 transition-colors">用途</a>
          <a href="#howitworks" className="hover:text-gray-900 transition-colors">使い方</a>
          <a href="#price" className="hover:text-gray-900 transition-colors">価格</a>
          <a href="#examples" className="hover:text-gray-900 transition-colors">制作事例</a>
          <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
        </nav>
        <Link
          href="/studio"
          className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lg hover:-translate-y-px"
          style={{ backgroundColor: INK }}
        >
          無料で試す
        </Link>
      </div>
    </header>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">

          {/* テキスト */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold tracking-wide text-white mb-6">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
              AI ネオンサイン制作
            </span>
            <h1 className="font-black leading-[1.22] tracking-[-0.02em] text-white text-[clamp(1.375rem,4.6vw,2.6rem)]">
              イラストや写真をアップするだけ。
              <br />
              デザイン・お見積もり・お届け日が、
              <br />
              <span style={{ color: GREEN }}>60秒</span>でわかります。
            </h1>
            <p className="mt-6 text-sm text-gray-500">¥28,000〜（送料別途¥3,000）</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/studio"
                className="rounded-full px-8 py-4 text-base font-bold transition-all hover:shadow-xl hover:-translate-y-0.5 shadow-lg"
                style={{ backgroundColor: "#fff", color: INK }}
              >
                無料でデザインを作る →
              </Link>
              <a
                href="#examples"
                className="rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white hover:bg-white hover:text-gray-950 transition-colors"
              >
                制作事例を見る
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-500">登録不要・無料体験・生成後に見積もり確認</p>
          </div>

          {/* Before / After ビジュアル */}
          <div className="flex flex-col gap-3">
            {/* メインビフォーアフター（ラーメン） */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
              {/* Before */}
              <div className="rounded-2xl border border-white/10 bg-gray-50 p-4 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Before</span>
                <div className="flex-1 flex items-center justify-center min-h-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/eximg/before-ramen.png" alt="ラーメン イラスト" className="w-full max-h-52 object-contain" />
                </div>
                <p className="text-[10px] text-gray-400 text-center">フリーイラスト</p>
              </div>

              {/* 矢印 */}
              <div className="flex flex-col items-center justify-center gap-2 px-1">
                <div className="rounded-full px-2 py-1 text-[10px] font-black text-white" style={{ backgroundColor: GREEN }}>AI</div>
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <p className="text-[9px] font-bold text-gray-400 text-center leading-tight" style={{ writingMode: "vertical-rl" }}>60秒</p>
              </div>

              {/* After */}
              <div className="rounded-2xl overflow-hidden border-2 shadow-md bg-gray-100 flex items-center justify-center" style={{ borderColor: GREEN, minHeight: "220px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/eximg/after-ramen.jpg" alt="ラーメン ネオン完成" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* サブサムネ（他の事例） */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { src: "/eximg/after-cake.jpg", label: "ショートケーキ" },
                { src: "/eximg/after-chameleon.jpg", label: "カメレオン" },
                { src: "/eximg/after-shavedice.png", label: "かき氷" },
              ].map(item => (
                <div key={item.label} className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.label} className="w-full aspect-square object-cover" />
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-gray-500">↑ どんなイラストもネオンサインに変換できます</p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Use Cases ── */
const USE_CASES = [
  { icon: "☕", title: "カフェ・飲食店", desc: "店名やロゴをネオンにして、SNS映えする空間に。開店前からインスタで話題に。", tag: "人気 No.1" },
  { icon: "💍", title: "結婚式・パーティー", desc: "ウェルカムボードの代わりにネオンサインを。フォトスポットとして会場が映えます。", tag: "贈り物にも◎" },
  { icon: "🎁", title: "誕生日・記念日", desc: "名前やメッセージをネオンに。世界に1つだけのプレゼントとして喜ばれています。", tag: "ギフト向け" },
  { icon: "✂️", title: "サロン・ショップ", desc: "ブランドロゴやキャッチコピーをネオン化。店内の雰囲気づくりと集客に貢献。", tag: "法人対応可" },
];

function UseCasesSection() {
  return (
    <section id="usecases" className="border-b border-gray-100 py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Use Cases" title="こんな用途に使われています" sub="飲食店から個人ギフトまで、幅広いシーンで活用されています。" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <p className="text-base font-bold text-gray-900">{c.title}</p>
                <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold text-gray-950" style={{ backgroundColor: GREEN }}>
                  {c.tag}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
const STEPS = [
  { num: "01", title: "スケッチ・ロゴをアップロード", desc: "手書きのラフ、既存のロゴ画像、文字デザインなど何でもOK。JPG・PNG対応（8MBまで）。" },
  { num: "02", title: "AIが即座にネオン化", desc: "色・サイズを選ぶだけ。30秒〜1分でリアルな設置イメージと概算見積もりが完成。" },
  { num: "03", title: "確認してそのまま注文", desc: "デザインが気に入ったらメールアドレスを入力して注文へ。決済は安心のBASEショップで。" },
];

function HowItWorksSection() {
  return (
    <section id="howitworks" className="border-b border-gray-100 py-20 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="How It Works" title="たった3ステップで注文完了" sub="スケッチのアップロードから注文まで、最短5分で完結します。" />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.num} className="rounded-2xl bg-white border border-gray-100 p-7 shadow-sm">
              <span className="text-4xl font-black tabular-nums" style={{ color: `${GREEN}` }}>{s.num}</span>
              <p className="mt-3 text-base font-bold text-gray-900">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/studio" className="inline-block rounded-full px-10 py-4 text-base font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ backgroundColor: INK }}>
            さっそく試してみる →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Price ── */
const PRICE_ITEMS = [
  { label: "アクリルパネル（背景板）", included: true },
  { label: "LEDネオンチューブ", included: true },
  { label: "電源アダプタ・配線一式", included: true },
  { label: "国内送料（¥3,000）", included: false, note: "別途ご請求します" },
  { label: "設置工事・施工", included: false, note: "壁への固定はお客様側にてお願いします" },
];

function PriceSection() {
  return (
    <section id="price" className="py-20 sm:py-24 bg-gray-950">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Price" title="シンプルな価格体系" sub="チューブの長さで価格が決まります。AIが自動で計算するので複雑な計算は不要です。" dark />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <PriceCard size="S" width="〜400mm" price="¥18,000〜" note="卓上・棚置き向け" highlight={false} />
          <PriceCard size="M" width="400〜700mm" price="¥30,000〜" note="壁掛け・店内装飾向け" highlight={true} />
          <PriceCard size="L" width="700〜1200mm" price="¥50,000〜" note="大型看板・結婚式ステージ向け" highlight={false} />
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-gray-900 p-6">
          <p className="text-sm font-bold text-gray-200 mb-4">価格に含まれるもの</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {PRICE_ITEMS.map((item) => (
              <li key={item.label} className="flex items-start gap-3 text-sm">
                <span className="font-bold mt-0.5" style={{ color: item.included ? GREEN : "#6b7280" }}>
                  {item.included ? "✓" : "✗"}
                </span>
                <span className={item.included ? "text-gray-300" : "text-gray-500"}>
                  {item.label}
                  {item.note && <span className="block text-xs text-gray-500">{item.note}</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500">※ 価格は概算です。確定金額はご注文前に表示されます。</p>
        </div>
      </div>
    </section>
  );
}

function PriceCard({ size, width, price, note, highlight }: { size: string; width: string; price: string; note: string; highlight: boolean }) {
  return (
    <div className={[
      "rounded-2xl border p-7 transition-all",
      highlight ? "shadow-xl" : "border-white/10 bg-gray-900 shadow-lg",
    ].join(" ")}
      style={highlight ? { borderColor: GREEN, backgroundColor: "rgba(45,122,113,0.12)" } : {}}
    >
      {highlight && (
        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold text-gray-950" style={{ backgroundColor: GREEN }}>
          人気
        </span>
      )}
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Size {size}</p>
      <p className="mt-1 text-sm text-gray-400">{width}</p>
      <p className="mt-3 text-3xl font-extrabold text-white">{price}</p>
      <p className="text-xs text-gray-500 mt-0.5">税込・送料別</p>
      <p className="mt-4 text-xs text-gray-400 leading-relaxed">{note}</p>
    </div>
  );
}

/* ── Examples ── */
const BEFORE_AFTER_EXAMPLES = [
  {
    beforeSrc: "/eximg/before-cake.png",
    afterSrc: "/eximg/after-cake.jpg",
    title: "ショートケーキをネオン化",
    desc: "フリーイラストをそのままネオンに。ウォームホワイト×レッドで甘いカフェ感。",
    width: "300mm",
    price: "¥35,000",
    tag: "カフェ・スイーツ",
  },
  {
    beforeSrc: "/eximg/before-shaved-ice.png",
    afterSrc: "/eximg/after-shavedice.png",
    title: "かき氷をネオン化",
    desc: "カラフルなかき氷イラストをマルチカラーネオンに。夏の店頭に最適。",
    width: "300mm",
    price: "¥38,000",
    tag: "フード・ドリンク",
  },
  {
    beforeSrc: "/eximg/before-ramen.png",
    afterSrc: "/eximg/after-ramen.jpg",
    title: "ラーメンをネオン化",
    desc: "ラーメンのイラストをレッド×ウォームホワイト×イエローの迫力あるネオンに。",
    width: "300mm",
    price: "¥45,000",
    tag: "飲食店",
  },
];

const GALLERY_EXAMPLES = [
  { src: "/eximg/after-chameleon.jpg", title: "カメレオン", desc: "グリーン×クールホワイト×オレンジ", tag: "ロゴ・キャラ" },
  { src: "/eximg/after-softcream.png", title: "ソフトクリーム", desc: "クールホワイト×イエロー（ランプオレンジ）", tag: "カフェ・スイーツ" },
  { src: "/eximg/after-deer.jpg", title: "鹿＋文字", desc: "イエロー×ウォームホワイト×レッド", tag: "ロゴ・キャラ" },
  { src: "/eximg/after-open.png", title: "OPENサイン", desc: "オレンジ×ブルー", tag: "店舗サイン" },
];

function ExamplesSection() {
  return (
    <section id="examples" className="border-b border-gray-100 py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Examples" title="制作事例" sub="イラストや手書きスケッチが、ここまでリアルなネオンになります。" />

        {/* Before / After */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {BEFORE_AFTER_EXAMPLES.map((ex) => (
            <div key={ex.title} className="flex flex-col gap-0 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
              {/* Before */}
              <div className="p-4 pb-2">
                <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Before</span>
                <div className="aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ex.beforeSrc} alt="元イラスト" className="h-full w-full object-contain" />
                </div>
              </div>
              {/* Arrow */}
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-px flex-1 bg-gray-100 ml-4" />
                <span className="text-xs font-black px-2 py-0.5 rounded-full text-gray-950" style={{ backgroundColor: GREEN }}>AIでネオン化</span>
                <div className="h-px flex-1 bg-gray-100 mr-4" />
              </div>
              {/* After */}
              <div className="p-4 pt-2">
                <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3 text-gray-950" style={{ backgroundColor: GREEN }}>After — 完成イメージ</span>
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ex.afterSrc} alt="ネオン完成イメージ" className="h-full w-full object-cover" />
                </div>
              </div>
              {/* Info */}
              <div className="border-t border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{ex.title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{ex.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-black" style={{ color: GREEN }}>{ex.price}</p>
                    <p className="text-[10px] text-gray-400">税込・送料別 / {ex.width}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ギャラリー（After only） */}
        <div className="mt-16">
          <p className="text-center text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Gallery — 他の制作事例</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {GALLERY_EXAMPLES.map((item) => (
              <div key={item.title} className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="aspect-square overflow-hidden bg-gray-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-800">{item.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/studio"
            className="inline-block rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg"
            style={{ backgroundColor: INK }}
          >
            あなたのデザインも試してみる →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQ_ITEMS = [
  { q: "納期はどのくらいかかりますか？", a: "ご注文確定後、約2週間で全国にお届けします。お急ぎの場合はご相談ください。" },
  { q: "どんな画像を使えますか？", a: "手書きのラフ、既存のロゴ画像（JPG・PNG）、文字のみのデザインなどに対応しています。" },
  { q: "実物はAI生成画像と同じになりますか？", a: "AI生成画像は設置イメージのシミュレーションです。実際の発色・光量は多少異なる場合がありますが、色・形はご要望に沿って制作します。" },
  { q: "サイズの変更はできますか？", a: "スタジオのスライダーで200mm〜1200mmの範囲で自由に調整できます。" },
  { q: "10万円を超える大型注文はできますか？", a: "可能です。その場合はAIスタジオで概算を確認後、お問い合わせフォームへ案内されます。" },
  { q: "法人・複数個の注文は対応していますか？", a: "法人注文・まとめ買いにも対応しています。お問い合わせフォームからご連絡ください。" },
];

/* ── Real Product ── */
function RealProductSection() {
  return (
    <section id="realproduct" className="border-b border-gray-100 py-20 sm:py-24 bg-gray-950">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Real Product"
          title="実物ってどんな感じ？"
          sub="写真で見るより、実物はもっと輝いています。"
          dark
        />

        <div className="mt-12 flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-full sm:w-1/2 overflow-hidden rounded-xl aspect-video bg-black">
            <img src="/cases/sample01/dark.jpg" alt="どのくらい明るいですか？" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2">
            <p className="text-sm font-extrabold text-white">どのくらい明るいですか？</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">暗い部屋では数メートル先まで照らせるほどの明るさです。ほどよく暗い空間に置くことで最も映えます。</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-full sm:w-1/2 overflow-hidden rounded-xl aspect-video bg-black">
            <img src="/cases/sample01/thickness.jpg" alt="厚みや重さはどのくらい？" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2">
            <p className="text-sm font-extrabold text-white">厚みや重さはどのくらい？</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">アクリルパネルの厚みは約8mm。軽量なので壁への負担も少なく、四隅のネジ4点で固定するシンプルな構造です。</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-full sm:w-1/2 overflow-hidden rounded-xl bg-white">
            <img src="/cases/sample01/delivery.jpg" alt="納品セット内容" className="w-full h-full object-contain" />
          </div>
          <div className="sm:w-1/2">
            <p className="text-sm font-extrabold text-white">届いたらすぐ飾れる、フルセット納品</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">アクリルパネル・LEDチューブ・電源アダプタ・取り付け用ネジがセットになって届きます。壁に穴を開けて付属のネジで固定するだけ。コンセントに差せばその日から点灯します。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="border-b border-gray-100 py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading label="FAQ" title="よくある質問" sub="ご不明な点はお問い合わせフォームからお気軽にどうぞ。" />
        <div className="mt-12 divide-y divide-gray-100">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-sm font-bold text-gray-900 sm:text-base">{item.q}</span>
                <span className="mt-0.5 shrink-0 font-bold text-lg leading-none transition-transform group-open:rotate-45" style={{ color: GREEN }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 pr-8">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>無料・登録不要</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          まずは無料で、<br />あなたのデザインを試してみてください。
        </h2>
        <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
          スケッチをアップロードして生成するだけ。<br />
          気に入ったらそのまま注文、気に入らなければ何度でも無料で試せます。
        </p>
        <Link
          href="/studio"
          className="mt-8 inline-block rounded-full px-12 py-5 text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ backgroundColor: "#fff", color: INK }}
        >
          無料でデザインを作る →
        </Link>
        <p className="mt-3 text-xs text-gray-500">登録不要 ・ AIデザイン生成 ・ 即時見積もり</p>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="ChameNeon" className="h-7 w-7 rounded-full object-cover" />
          <span className="text-sm font-bold text-gray-500">ChameNeon工房</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          <Link href="/studio" className="hover:text-gray-600 transition-colors">AIスタジオ</Link>
          <a href="https://chameneon.base.shop/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">BASEショップ</a>
          <a href="https://thebase.com/inquiry/chameneon-base-shop" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">お問い合わせ</a>
        </nav>
        <p className="text-xs text-gray-300">© 2025 ChameNeon工房</p>
      </div>
    </footer>
  );
}

/* ── Shared ── */
function SectionHeading({ label, title, sub, dark = false }: { label: string; title: string; sub: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>{label}</p>
      <h2 className={`mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl ${dark ? "text-white" : "text-gray-900"}`}>{title}</h2>
      <p className={`mt-3 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{sub}</p>
    </div>
  );
}
