"use client";

import { useEffect, useRef } from "react";
import type { Skill } from "@/content/types";
import type { Ring } from "./orbit-rings";

const startAngle = (ringIndex: number, itemIndex: number, count: number) =>
  ((2 * Math.PI) / count) * itemIndex + ringIndex * 0.9;

// Gerundet, weil Math.cos/sin je nach JS-Engine in den letzten Stellen abweichen und die Hydration sonst scheitert.
const position = (ring: Ring, angle: number) => ({
  left: `${(50 + ring.rx * Math.cos(angle)).toFixed(3)}%`,
  top: `${(50 + ring.ry * Math.sin(angle)).toFixed(3)}%`,
});

/** Skill-Logos kreisen auf ovalen Bahnen um `children`. Die Startpositionen kommen schon vom Server. */
export function SkillOrbit({
  rings,
  className = "",
  children,
}: {
  rings: Ring[];
  className?: string;
  children?: React.ReactNode;
}) {
  const nodes = useRef(new Map<string, HTMLElement>());
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
        ring.skills.forEach((skill, i) => {
          const node = nodes.current.get(skill.key);
          if (!node) return;
          const angle =
            startAngle(r, i, ring.skills.length) + (2 * Math.PI * elapsed) / ring.period;
          Object.assign(node.style, position(ring, angle));
        }),
      );
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rings]);

  const hold = {
    onMouseEnter: () => (paused.current = true),
    onMouseLeave: () => (paused.current = false),
    onFocus: () => (paused.current = true),
    onBlur: () => (paused.current = false),
  };

  return (
    <div className={`relative w-full ${className}`}>
      {rings.map((ring, r) => (
        <div
          key={r}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-stone-300"
          style={{ width: `${2 * ring.rx}%`, height: `${2 * ring.ry}%` }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
        {children}
      </div>

      {rings.map((ring, r) =>
        ring.skills.map((skill, i) => (
          <div
            key={skill.key}
            ref={(node) => {
              if (node) nodes.current.set(skill.key, node);
              else nodes.current.delete(skill.key);
            }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={position(ring, startAngle(r, i, ring.skills.length))}
          >
            <div
              tabIndex={0}
              role="img"
              aria-label={skill.name}
              className="group relative block rounded-2xl bg-white p-2 shadow-md ring-1 ring-black/5 outline-stone-900"
              {...hold}
            >
              <SkillLogo skill={skill} className={ring.logo} />
              <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {skill.name}
              </span>
            </div>
          </div>
        )),
      )}
    </div>
  );
}

/** Ohne Logo ein dunkles Kürzel. Dekorativ, den Namen trägt die umgebende Badge. */
function SkillLogo({ skill, className }: { skill: Skill; className: string }) {
  return skill.logo ? (
    // eslint-disable-next-line @next/next/no-img-element -- SVG-Logos brauchen keine Bildoptimierung
    <img src={skill.logo} alt="" className={`object-contain ${className}`} />
  ) : (
    <span
      aria-hidden
      className={`grid place-items-center rounded-xl bg-stone-900 text-[0.6em] font-bold text-white ${className}`}
    >
      {skill.name.slice(0, 2)}
    </span>
  );
}
