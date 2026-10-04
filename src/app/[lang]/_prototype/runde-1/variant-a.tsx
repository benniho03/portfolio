// PROTOTYPE: Variante A – geteiltes Layout, links feste Vorstellung, rechts scrollender Inhalt.
import Image from "next/image";
import { about, labels, projects, skills, socialLinks, stations, technologyByKey } from "@/content/placeholder";
import { LanguageSwitch, t, type VariantProps } from "../shared";

export const name = "Split";

const gradientText = "bg-gradient-to-r from-pink-600 to-amber-400 bg-clip-text text-transparent";

export function VariantA({ lang, variant }: VariantProps) {
  const nav = [
    ["about", labels.about],
    ["projects", labels.projects],
    ["career", labels.career],
    ["skills", labels.skills],
  ] as const;

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-300 selection:bg-pink-600/40">
      <div className="mx-auto max-w-6xl px-6 lg:flex lg:gap-16 lg:px-12">
        <header className="pt-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">
              {about.name.split(" ")[0]} <span className={gradientText}>{about.name.split(" ")[1]}</span>
            </h1>
            <p className="mt-3 text-xl text-white">{t(about.role, lang)}</p>
            <p className="mt-5 max-w-sm leading-relaxed">{t(about.intro, lang)}</p>
            <nav className="mt-14 hidden lg:block">
              <ul className="space-y-4">
                {nav.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white">
                      <span className="h-px w-8 bg-neutral-600 transition-all group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-amber-400" />
                      {t(label, lang)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <LanguageSwitch lang={lang} variant={variant} className="ml-auto text-neutral-400" />
          </div>
        </header>

        <main className="pb-32 pt-16 lg:w-7/12 lg:py-24">
          <section id="about" className="mb-24 scroll-mt-24">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-white lg:sr-only">{t(labels.about, lang)}</h2>
            <p className="leading-relaxed">{t(about.bio, lang)}</p>
          </section>

          <section id="projects" className="mb-24 scroll-mt-24">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-white lg:sr-only">{t(labels.projects, lang)}</h2>
            <ul className="group/list space-y-4">
              {projects.map((project) => (
                <li key={project.name} className="group relative grid gap-4 rounded-xl p-4 transition hover:!opacity-100 group-hover/list:opacity-50 sm:grid-cols-8 sm:gap-6 hover:bg-white/5">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 sm:col-span-3">
                    <Image src={project.image} alt="" fill sizes="240px" className="object-cover" />
                  </div>
                  <div className="sm:col-span-5">
                    <h3 className="font-semibold text-white">
                      <a href={project.link ?? project.githubLink} className="group-hover:text-amber-300">
                        <span className="absolute inset-0" />
                        {project.name} <span className="inline-block transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                      </a>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">{t(project.description, lang)}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((key) => (
                        <li key={key} className="rounded-full bg-pink-600/10 px-3 py-1 text-xs font-medium text-pink-300">
                          {technologyByKey(key).name}
                        </li>
                      ))}
                    </ul>
                    {project.githubLink && project.link && (
                      <a href={project.githubLink} className="relative z-10 mt-3 inline-block text-xs text-neutral-400 hover:text-white">
                        GitHub →
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="career" className="mb-24 scroll-mt-24">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-white">{t(labels.career, lang)}</h2>
            <ol className="relative space-y-10 border-l border-white/10 pl-8">
              {stations.map((station) => (
                <li key={station.organisation} className="relative">
                  <span className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-gradient-to-r from-pink-600 to-amber-400" />
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    {station.from} – {station.to ?? t(labels.today, lang)}
                  </p>
                  <h3 className="mt-1 font-semibold text-white">
                    {t(station.role, lang)} · {station.organisation}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{t(station.description, lang)}</p>
                  <p className="mt-2 text-xs text-amber-300/80">{station.technologies.map((key) => technologyByKey(key).name).join(" · ")}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="skills" className="scroll-mt-24">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-white">{t(labels.skills, lang)}</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skills.map((skill) => (
                <li key={skill.key} className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm text-white">
                  {skill.logo ? (
                    <Image src={skill.logo} alt="" width={20} height={20} className="object-contain" />
                  ) : (
                    <span className="size-5 rounded bg-gradient-to-br from-pink-600 to-amber-400" />
                  )}
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-24 flex gap-4 text-xs text-neutral-500">
            <a href="#">{t(labels.imprint, lang)}</a>
            <a href="#">{t(labels.privacy, lang)}</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
