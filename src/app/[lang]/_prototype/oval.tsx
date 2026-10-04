// PROTOTYPE: Gemeinsame Bausteine der dritten Runde – offener Seitenaufbau, Projekte weiterhin als Bento.
import { about, labels, projects, skills, socialLinks, stations } from "@/content/placeholder";
import { ProjectTiles } from "./bento";
import type { Ring } from "./orbit";
import { LanguageSwitch, t, type VariantProps } from "./shared";

const logoSizes = { 3: "size-9 md:size-14", 2: "size-7 md:size-10", 1: "size-5 md:size-8" } as const;

/** Ein Ring pro Gewichtung, innen die wichtigsten Skills; Ringe laufen abwechselnd in Gegenrichtung. */
export function ringsByWeight(axes: Record<1 | 2 | 3, [rx: number, ry: number]>, period = 45): Ring[] {
  return ([3, 2, 1] as const).map((weight, i) => ({
    items: skills.filter((skill) => skill.weight === weight),
    rx: axes[weight][0],
    ry: axes[weight][1],
    period: period * (1 + i * 0.6) * (i % 2 ? -1 : 1),
    logo: logoSizes[weight],
  }));
}

export function Page({ lang, variant, children }: VariantProps & { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-100 font-display text-stone-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <span className="text-lg font-bold">benni.</span>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#about" className="hover:underline">{t(labels.about, lang)}</a>
          <a href="#projects" className="hover:underline">{t(labels.projects, lang)}</a>
          <LanguageSwitch lang={lang} variant={variant} />
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-32">
        {children}
        <footer className="flex gap-4 pt-16 text-sm text-stone-500">
          <a href="#">{t(labels.imprint, lang)}</a>
          <a href="#">{t(labels.privacy, lang)}</a>
        </footer>
      </main>
    </div>
  );
}

/** Platzhalter, bis ein echtes Foto aus dem CMS kommt. */
export function Portrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative grid aspect-square place-items-center rounded-full bg-gradient-to-br from-pink-600 to-amber-400 font-bold text-white shadow-xl ring-8 ring-white ${className}`}>
      b.
      <span className="absolute bottom-[16%] text-[10px] font-medium uppercase tracking-widest opacity-80">[Foto]</span>
    </div>
  );
}

export function Intro({ lang, className = "" }: { lang: VariantProps["lang"]; className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm font-medium uppercase tracking-widest text-stone-500">{t(about.role, lang)}</p>
      <h1 className="mt-3 text-5xl font-bold leading-none md:text-7xl">{t(about.greeting, lang)}</h1>
      <p className="mt-6 max-w-xl text-lg text-stone-600">{t(about.intro, lang)}</p>
    </div>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a key={link.label} href={link.href} className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 font-medium text-white hover:bg-stone-700">
          {link.label}
          <span className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      ))}
    </div>
  );
}

const sectionLabel = "text-sm font-medium uppercase tracking-widest text-stone-500";

export function AboutSection({ lang }: { lang: VariantProps["lang"] }) {
  return (
    <section id="about" className="grid scroll-mt-6 gap-4 border-t border-stone-300 pt-10 mt-24 md:grid-cols-[1fr_3fr]">
      <h2 className={sectionLabel}>{t(labels.about, lang)}</h2>
      <p className="text-2xl leading-snug md:text-3xl">{t(about.bio, lang)}</p>
    </section>
  );
}

export function CareerSection({ lang, highlight }: { lang: VariantProps["lang"]; highlight?: string }) {
  return (
    <section className="mt-16 grid gap-4 border-t border-stone-300 pt-10 md:grid-cols-[1fr_3fr]">
      <h2 className={sectionLabel}>{t(labels.career, lang)}</h2>
      <ol className="relative space-y-8 border-l-2 border-stone-300 pl-6">
        {stations.map((station) => (
          <li
            key={station.organisation}
            className={`relative transition-opacity ${highlight && !station.technologies.includes(highlight) ? "opacity-30" : ""}`}
          >
            <span className="absolute -left-[33px] top-1.5 size-4 rounded-full border-4 border-stone-100 bg-stone-900" />
            <p className="text-sm tabular-nums text-stone-500">
              {station.from} – {station.to ?? t(labels.today, lang)}
            </p>
            <p className="mt-1 text-xl font-bold">{t(station.role, lang)}</p>
            <p className="text-stone-500">{station.organisation}</p>
            <p className="mt-2 max-w-2xl text-stone-600">{t(station.description, lang)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProjectsSection({ lang, highlight, children }: { lang: VariantProps["lang"]; highlight?: string; children?: React.ReactNode }) {
  return (
    <section id="projects" className="mt-24 scroll-mt-6">
      <h2 className="text-4xl font-bold">
        {t(labels.projects, lang)} <span className="text-stone-400">{projects.length}</span>
      </h2>
      {children}
      <div className="mt-8 grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 md:grid-cols-4">
        <ProjectTiles lang={lang} highlight={highlight} />
      </div>
    </section>
  );
}
