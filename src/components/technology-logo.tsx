import type { Technology } from "@/content/types";

/** Logo einer Technologie; ohne Logo ein dunkles Kürzel aus den ersten beiden Buchstaben. */
export function TechnologyLogo({
  technology,
  className = "",
}: {
  technology: Technology;
  className?: string;
}) {
  return technology.logo ? (
    // eslint-disable-next-line @next/next/no-img-element -- SVG-Logos brauchen keine Bildoptimierung
    <img src={technology.logo} alt={technology.name} className={`object-contain ${className}`} />
  ) : (
    <span
      role="img"
      aria-label={technology.name}
      className={`grid place-items-center rounded-xl bg-stone-900 text-[0.6em] font-bold text-white ${className}`}
    >
      {technology.name.slice(0, 2)}
    </span>
  );
}
