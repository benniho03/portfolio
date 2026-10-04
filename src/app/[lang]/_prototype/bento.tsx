// PROTOTYPE: Gemeinsame Bento-Bausteine der zweiten Runde (Header, Kacheln, Projekte).
import Image from "next/image";
import {
  about,
  labels,
  projects,
  socialLinks,
  stations,
  technologyByKey,
  type Technology,
} from "@/content/placeholder";
import { LanguageSwitch, t, type VariantProps } from "./shared";

export const tile = "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5";
const projectSpans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
];

export function BentoPage({
  lang,
  variant,
  children,
}: VariantProps & { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-100 font-display text-stone-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <span className="text-lg font-bold">benni.</span>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#projects" className="hover:underline">
            {t(labels.projects, lang)}
          </a>
          <LanguageSwitch lang={lang} variant={variant} />
        </nav>
      </header>
      <main className="mx-auto grid max-w-6xl auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 px-4 pb-32 md:grid-cols-4">
        {children}
        <footer className="flex gap-4 pt-8 text-sm text-stone-500 md:col-span-4">
          <a href="#">{t(labels.imprint, lang)}</a>
          <a href="#">{t(labels.privacy, lang)}</a>
        </footer>
      </main>
    </div>
  );
}

export function IntroTile({
  lang,
  className = "",
}: {
  lang: VariantProps["lang"];
  className?: string;
}) {
  return (
    <section
      className={`${tile} flex flex-col justify-end bg-gradient-to-br from-pink-600 to-amber-400 text-white ring-0 ${className}`}
    >
      <p className="text-sm font-medium uppercase tracking-widest opacity-80">
        {t(about.role, lang)}
      </p>
      <h1 className="mt-2 text-5xl font-bold leading-none md:text-7xl">
        {t(about.greeting, lang)}
      </h1>
      <p className="mt-6 max-w-md text-lg opacity-90">{t(about.intro, lang)}</p>
    </section>
  );
}

export function AboutTile({
  lang,
  className = "md:col-span-2",
}: {
  lang: VariantProps["lang"];
  className?: string;
}) {
  return (
    <section className={`${tile} ${className}`}>
      <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500">
        {t(labels.about, lang)}
      </h2>
      <p className="mt-3 leading-relaxed">{t(about.bio, lang)}</p>
    </section>
  );
}

export function SocialTiles() {
  return socialLinks.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className={`${tile} group flex flex-col justify-between bg-stone-900 text-white ring-0 hover:bg-stone-800`}
    >
      <span className="self-end text-2xl transition group-hover:-translate-y-1 group-hover:translate-x-1">
        ↗
      </span>
      <span className="text-2xl font-bold">{link.label}</span>
    </a>
  ));
}

export function CareerTile({
  lang,
  className = "md:col-span-2",
  highlight,
}: {
  lang: VariantProps["lang"];
  className?: string;
  highlight?: string;
}) {
  return (
    <section className={`${tile} ${className}`}>
      <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500">
        {t(labels.career, lang)}
      </h2>
      <ul className="mt-4 divide-y divide-stone-100">
        {stations.map((station) => (
          <li
            key={station.organisation}
            className={`flex items-baseline justify-between gap-4 py-3 transition-opacity ${highlight && !station.technologies.includes(highlight) ? "opacity-30" : ""}`}
          >
            <div>
              <p className="font-bold">{t(station.role, lang)}</p>
              <p className="text-sm text-stone-500">{station.organisation}</p>
            </div>
            <p className="shrink-0 text-sm tabular-nums text-stone-500">
              {station.from} – {station.to ?? t(labels.today, lang)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectsHeading({
  lang,
  children,
}: {
  lang: VariantProps["lang"];
  children?: React.ReactNode;
}) {
  return (
    <div id="projects" className="scroll-mt-6 pt-12 md:col-span-4">
      <h2 className="text-4xl font-bold">
        {t(labels.projects, lang)} <span className="text-stone-400">{projects.length}</span>
      </h2>
      {children}
    </div>
  );
}

export function ProjectTiles({
  lang,
  highlight,
}: {
  lang: VariantProps["lang"];
  highlight?: string;
}) {
  return projects.map((project, i) => {
    const dimmed = highlight && !project.technologies.includes(highlight);
    return (
      <article
        key={project.name}
        className={`group relative min-h-64 overflow-hidden rounded-3xl bg-stone-900 transition duration-300 ${projectSpans[i] ?? ""} ${dimmed ? "scale-[0.97] opacity-25 grayscale" : ""}`}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 text-white">
          <ul className="mb-3 flex gap-1.5">
            {project.technologies.map((key) => (
              <li
                key={key}
                className={`rounded-full px-2.5 py-0.5 text-xs backdrop-blur ${key === highlight ? "bg-amber-300 text-stone-900" : "bg-white/15"}`}
              >
                {technologyByKey(key).name}
              </li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/80 transition-all group-hover:line-clamp-none">
            {t(project.description, lang)}
          </p>
          <div className="mt-4 flex gap-2 text-sm font-medium">
            {project.link && (
              <a
                href={project.link}
                className="rounded-full bg-white px-4 py-1.5 text-stone-900 hover:bg-amber-300"
              >
                {t(labels.visit, lang)}
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                className="rounded-full border border-white/50 px-4 py-1.5 hover:bg-white/10"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </article>
    );
  });
}

export function SkillLogo({ skill, className = "" }: { skill: Technology; className?: string }) {
  return skill.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={skill.logo} alt={skill.name} className={`object-contain ${className}`} />
  ) : (
    <span
      className={`grid place-items-center rounded-xl bg-stone-900 text-[0.6em] font-bold text-white ${className}`}
    >
      {skill.name.slice(0, 2)}
    </span>
  );
}

type Placed = { skill: Technology; x: number; y: number; size: number };

/** Ordnet Logos spiralförmig um die Mitte an, größte zuerst, ohne Überlappung. Koordinaten in Prozent. */
export function layoutCloud(items: Technology[], width = 100, height = 60): Placed[] {
  const sizeOf = { 3: 15, 2: 10.5, 1: 7.5 } as const;
  const gap = 2.2;
  const placed: Placed[] = [];
  const sorted = [...items].sort((a, b) => b.weight - a.weight);

  for (const skill of sorted) {
    const size = sizeOf[skill.weight];
    for (let step = 0; step < 4000; step++) {
      const angle = step * 0.21 + placed.length;
      const radius = step * 0.045;
      const x = width / 2 + radius * Math.cos(angle) * 1.6;
      const y = height / 2 + radius * Math.sin(angle);
      const inBounds =
        x - size / 2 >= 0 && x + size / 2 <= width && y - size / 2 >= 0 && y + size / 2 <= height;
      const free = placed.every(
        (other) =>
          Math.abs(other.x - x) * 2 >= other.size + size + gap ||
          Math.abs(other.y - y) * 2 >= other.size + size + gap,
      );
      if (inBounds && free) {
        placed.push({ skill, x, y, size });
        break;
      }
    }
  }

  return placed.map((p) => ({
    ...p,
    x: ((p.x - p.size / 2) / width) * 100,
    y: ((p.y - p.size / 2) / height) * 100,
    size: (p.size / width) * 100,
  }));
}
