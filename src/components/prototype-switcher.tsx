"use client";

// PROTOTYPE: Umschalter zwischen Design-Varianten, nur außerhalb von Production sichtbar.
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Variant = { key: string; name: string };

export function PrototypeSwitcher({ variants, current }: { variants: Variant[]; current: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const index = Math.max(
    0,
    variants.findIndex((variant) => variant.key === current),
  );

  const go = (step: number) => {
    const next = variants[(index + step + variants.length) % variants.length];
    router.replace(`${pathname}?variant=${next.key}`, { scroll: false });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/90 p-1 font-sans text-sm text-white shadow-2xl ring-1 ring-black/50 backdrop-blur">
      <button
        onClick={() => go(-1)}
        className="rounded-full px-3 py-1.5 hover:bg-white/15"
        aria-label="Vorherige Variante"
      >
        ←
      </button>
      <span className="min-w-56 px-2 text-center tabular-nums">
        <span className="font-bold">{variants[index].key}</span>
        <span className="text-white/60"> ({variants[index].name})</span>
        <span className="ml-2 text-white/40">
          {index + 1}/{variants.length}
        </span>
      </span>
      <button
        onClick={() => go(1)}
        className="rounded-full px-3 py-1.5 hover:bg-white/15"
        aria-label="Nächste Variante"
      >
        →
      </button>
    </div>
  );
}
