'use client';

import Image from "next/image";

export default function HeroFixedBeforeAfter() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Before" src="/hero/before.jpg" />
        <Card title="After" src="/hero/after.jpeg" />
      </div>
    </div>
  );
}

function Card({ title, src }: { title: string; src: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <p className="text-xs font-semibold text-zinc-300">{title}</p>
      <div className="mt-2 aspect-square w-full overflow-hidden rounded-lg bg-white/5">
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
            onError={() => {
              // next/image の onError は型的に許されるが、ここでは副作用不要
            }}
          />
        </div>
      </div>
    </div>
  );
}


