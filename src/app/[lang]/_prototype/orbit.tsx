"use client";

// PROTOTYPE: Logos kreisen auf ovalen Bahnen um einen Mittelpunkt, optional mit Tiefe (hinten kleiner und hinter dem Bild).
import { useEffect, useRef } from "react";
import type { Technology } from "@/content/placeholder";
import { SkillLogo } from "./bento";

export type Ring = {
  items: Technology[];
  /** Halbachsen in Prozent der Containerbreite bzw. -höhe. */
  rx: number;
  ry: number;
  /** Sekunden pro Umlauf; negativ läuft gegen den Uhrzeigersinn. */
  period: number;
  logo: string;
};

type Props = {
  rings: Ring[];
  depth?: boolean;
  selected?: string;
  onSelect?: (key: string) => void;
  className?: string;
  children?: React.ReactNode;
};

const startAngle = (ringIndex: number, itemIndex: number, count: number) => ((2 * Math.PI) / count) * itemIndex + ringIndex * 0.9;

function placement(ring: Ring, angle: number, depth: boolean) {
  const sin = Math.sin(angle);
  const front = (sin + 1) / 2;
  return {
    left: `${50 + ring.rx * Math.cos(angle)}%`,
    top: `${50 + ring.ry * sin}%`,
    zIndex: depth && sin < 0 ? 0 : 20,
    opacity: depth ? 0.4 + 0.6 * front : 1,
    transform: `translate(-50%, -50%) scale(${depth ? 0.6 + 0.4 * front : 1})`,
  };
}

export function OvalOrbit({ rings, depth = false, selected, onSelect, className = "", children }: Props) {
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      if (!paused.current) elapsed += (now - last) / 1000;
      last = now;
      rings.forEach((ring, r) =>
        ring.items.forEach((skill, i) => {
          const node = nodes.current.get(skill.key);
          if (!node) return;
          const angle = startAngle(r, i, ring.items.length) + (2 * Math.PI * elapsed) / ring.period;
          Object.assign(node.style, placement(ring, angle, depth));
        }),
      );
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rings, depth]);

  const hold = { onMouseEnter: () => (paused.current = true), onMouseLeave: () => (paused.current = false), onFocus: () => (paused.current = true), onBlur: () => (paused.current = false) };

  return (
    <div className={`relative w-full ${className}`}>
      {rings.map((ring, r) => (
        <div
          key={`track-${r}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-stone-300"
          style={{ width: `${2 * ring.rx}%`, height: `${2 * ring.ry}%` }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">{children}</div>

      {rings.map((ring, r) =>
        ring.items.map((skill, i) => {
          const isSelected = selected === skill.key;
          const badge = `group relative block rounded-2xl bg-white p-2 shadow-md ring-1 transition ${
            isSelected ? "scale-125 ring-2 ring-stone-900" : selected ? "opacity-40 ring-black/5" : "ring-black/5"
          }`;
          const content = (
            <>
              <SkillLogo skill={skill} className={ring.logo} />
              <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {skill.name}
              </span>
            </>
          );
          return (
            <div
              key={skill.key}
              ref={(node) => {
                if (node) nodes.current.set(skill.key, node);
                else nodes.current.delete(skill.key);
              }}
              className="absolute"
              style={placement(ring, startAngle(r, i, ring.items.length), depth)}
            >
              {onSelect ? (
                <button type="button" aria-pressed={isSelected} onClick={() => onSelect(skill.key)} className={`${badge} cursor-pointer hover:scale-110`} {...hold}>
                  {content}
                </button>
              ) : (
                <div className={badge} {...hold}>
                  {content}
                </div>
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
