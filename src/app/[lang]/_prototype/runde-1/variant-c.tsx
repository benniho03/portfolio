// PROTOTYPE: Variante C – redaktionell, große Serifenschrift, nummerierter Projektindex.
import Image from "next/image";
import {
  about,
  labels,
  projects,
  skills,
  socialLinks,
  stations,
  technologyByKey,
} from "@/content/placeholder";
import { LanguageSwitch, t, type VariantProps } from "../shared";

export const name = "Editorial";

export function VariantC({ lang, variant }: VariantProps) {
  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans text-[#1c1a17]">
      <header className="flex items-center justify-between border-b border-current px-6 py-4 text-sm uppercase tracking-widest md:px-12">
        <span>{about.name}</span>
        <span className="hidden md:inline">{t(about.role, lang)}</span>
        <LanguageSwitch lang={lang} variant={variant} />
      </header>

      <section className="px-6 pb-20 pt-16 md:px-12 md:pt-28">
        <h1 className="font-serif text-[18vw] leading-[0.85] tracking-tight md:text-[11vw]">
          {t(about.greeting, lang).split(" ").slice(0, 1)}
          <br />
          <em className="text-pink-700">{t(about.greeting, lang).split(" ").slice(1).join(" ")}</em>
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <p className="font-serif text-2xl leading-snug md:col-span-6 md:col-start-7 md:text-3xl">
            {t(about.intro, lang)}
          </p>
        </div>
      </section>

      <section id="projects" className="border-t border-current">
        <h2 className="px-6 py-4 text-sm uppercase tracking-widest md:px-12">
          {t(labels.projects, lang)} ({projects.length})
        </h2>
        <ol>
          {projects.map((project, i) => (
            <li
              key={project.name}
              className="group border-t border-current/20 px-6 transition-colors hover:bg-[#1c1a17] hover:text-[#f4efe6] md:px-12"
            >
              <div className="grid grid-cols-12 items-baseline gap-4 py-6">
                <span className="col-span-2 font-mono text-sm md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 font-serif text-4xl md:col-span-5 md:text-6xl">
                  {project.name}
                </h3>
                <p className="col-span-12 text-sm uppercase tracking-wider opacity-60 md:col-span-4">
                  {project.technologies.map((key) => technologyByKey(key).name).join(", ")}
                </p>
                <div className="col-span-12 flex gap-4 text-sm underline-offset-4 md:col-span-2 md:justify-end">
                  {project.link && (
                    <a href={project.link} className="underline hover:text-amber-400">
                      {t(labels.visit, lang)} ↗
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} className="underline hover:text-amber-400">
                      {t(labels.code, lang)}
                    </a>
                  )}
                </div>
              </div>
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-10 md:grid-cols-12">
                    <div className="relative aspect-video md:col-span-6 md:col-start-2">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="font-serif text-2xl leading-snug md:col-span-4">
                      {t(project.description, lang)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-12 border-t border-current px-6 py-20 md:grid-cols-12 md:px-12">
        <h2 className="text-sm uppercase tracking-widest md:col-span-3">{t(labels.about, lang)}</h2>
        <p className="font-serif text-3xl leading-snug md:col-span-8">{t(about.bio, lang)}</p>
      </section>

      <section className="grid gap-12 border-t border-current px-6 py-20 md:grid-cols-12 md:px-12">
        <h2 className="text-sm uppercase tracking-widest md:col-span-3">
          {t(labels.career, lang)}
        </h2>
        <table className="w-full md:col-span-9">
          <tbody>
            {stations.map((station) => (
              <tr key={station.organisation} className="border-b border-current/20 align-baseline">
                <td className="py-5 pr-6 font-mono text-sm whitespace-nowrap">
                  {station.from}–{station.to ?? t(labels.today, lang)}
                </td>
                <td className="py-5 pr-6">
                  <span className="font-serif text-3xl">{t(station.role, lang)}</span>
                  <p className="mt-1 max-w-xl text-sm opacity-70">{t(station.description, lang)}</p>
                </td>
                <td className="py-5 text-right text-sm uppercase tracking-wider">
                  {station.organisation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-12 border-t border-current px-6 py-20 md:grid-cols-12 md:px-12">
        <h2 className="text-sm uppercase tracking-widest md:col-span-3">
          {t(labels.skills, lang)}
        </h2>
        <p className="font-serif text-4xl leading-tight md:col-span-9 md:text-5xl">
          {skills.map((skill, i) => (
            <span key={skill.key}>
              <em className={i % 2 ? "text-pink-700" : ""}>{skill.name}</em>
              {i < skills.length - 1 && <span className="opacity-30"> / </span>}
            </span>
          ))}
        </p>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-current px-6 py-6 pb-24 text-sm uppercase tracking-widest md:px-12">
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-pink-700">
              {link.label} ↗
            </a>
          ))}
        </div>
        <div className="flex gap-6 opacity-60">
          <a href="#">{t(labels.imprint, lang)}</a>
          <a href="#">{t(labels.privacy, lang)}</a>
        </div>
      </footer>
    </div>
  );
}
