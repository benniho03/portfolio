"use client";

// PROTOTYPE: Variante D – Editor/IDE-Optik, Abschnitte als Dateien in einem Datei-Explorer.
import Image from "next/image";
import { useState } from "react";
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

export const name = "Editor";

type File = "readme" | "projects" | "career" | "skills";

export function VariantD({ lang, variant }: VariantProps) {
  const [open, setOpen] = useState<File>("readme");
  const files: { id: File; name: string; icon: string; color: string }[] = [
    { id: "readme", name: "README.md", icon: "M↓", color: "text-sky-400" },
    {
      id: "projects",
      name: lang === "de" ? "projekte.tsx" : "projects.tsx",
      icon: "⚛",
      color: "text-cyan-300",
    },
    {
      id: "career",
      name: lang === "de" ? "werdegang.json" : "career.json",
      icon: "{}",
      color: "text-amber-300",
    },
    { id: "skills", name: "skills.ts", icon: "TS", color: "text-blue-400" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#1e1e1e] font-mono text-sm text-[#d4d4d4]">
      <div className="flex items-center gap-2 border-b border-black bg-[#2d2d2d] px-4 py-2">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto text-xs text-neutral-400">
          benni-holderle — {t(about.role, lang)}
        </span>
        <LanguageSwitch lang={lang} variant={variant} className="text-xs" />
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-black bg-[#252526] md:w-60 md:border-r">
          <p className="px-4 py-2 text-[11px] uppercase tracking-widest text-neutral-500">
            Explorer
          </p>
          <p className="px-4 py-1 text-xs font-bold uppercase">▾ portfolio</p>
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                <button
                  onClick={() => setOpen(file.id)}
                  className={`flex w-full items-center gap-2 py-1 pl-8 pr-4 text-left hover:bg-white/5 ${open === file.id ? "bg-[#37373d] text-white" : ""}`}
                >
                  <span className={`w-5 text-[10px] font-bold ${file.color}`}>{file.icon}</span>
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 px-4 py-1 text-xs font-bold uppercase">▾ links</p>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="flex items-center gap-2 py-1 pl-8 hover:bg-white/5">
                  <span className="w-5 text-[10px] text-pink-400">↗</span>
                  {link.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex overflow-x-auto border-b border-black bg-[#2d2d2d]">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => setOpen(file.id)}
                className={`flex shrink-0 items-center gap-2 border-r border-black px-4 py-2 ${open === file.id ? "border-t-2 border-t-pink-500 bg-[#1e1e1e] text-white" : "text-neutral-500"}`}
              >
                <span className={`text-[10px] font-bold ${file.color}`}>{file.icon}</span>
                {file.name}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-6 pb-28 md:p-10">
            {open === "readme" && (
              <article className="max-w-3xl font-sans text-base leading-relaxed">
                <p className="font-mono text-pink-400"># </p>
                <h1 className="-mt-7 ml-5 bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text font-mono text-5xl font-bold text-transparent">
                  {t(about.greeting, lang)}
                </h1>
                <p className="mt-6 text-lg text-white">{t(about.intro, lang)}</p>
                <p className="mt-4">{t(about.bio, lang)}</p>
                <button
                  onClick={() => setOpen("projects")}
                  className="mt-8 rounded bg-pink-600 px-4 py-2 font-mono text-sm text-white hover:bg-pink-500"
                >
                  $ open {files[1].name}
                </button>
              </article>
            )}

            {open === "projects" && (
              <div>
                <p className="mb-6">
                  <span className="text-[#c586c0]">export const</span>{" "}
                  <span className="text-[#4fc1ff]">{lang === "de" ? "projekte" : "projects"}</span>{" "}
                  = [
                </p>
                <div className="grid gap-6 pl-6 lg:grid-cols-2">
                  {projects.map((project) => (
                    <article
                      key={project.name}
                      className="overflow-hidden rounded-md border border-white/10 bg-[#252526]"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-base text-[#dcdcaa]">
                          {"<"}
                          {project.name.replace(/\s/g, "")} {"/>"}
                        </h3>
                        <p className="mt-2 font-sans text-neutral-300">
                          {t(project.description, lang)}
                        </p>
                        <p className="mt-3 text-xs">
                          <span className="text-[#9cdcfe]">stack</span>=
                          <span className="text-[#ce9178]">
                            {"{"}[
                            {project.technologies
                              .map((key) => `"${technologyByKey(key).name}"`)
                              .join(", ")}
                            ]{"}"}
                          </span>
                        </p>
                        <div className="mt-4 flex gap-3 text-xs">
                          {project.link && (
                            <a
                              href={project.link}
                              className="rounded bg-pink-600 px-3 py-1.5 text-white hover:bg-pink-500"
                            >
                              {t(labels.visit, lang)} ↗
                            </a>
                          )}
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              className="rounded border border-white/20 px-3 py-1.5 hover:bg-white/10"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="mt-6">];</p>
              </div>
            )}

            {open === "career" && (
              <pre className="whitespace-pre-wrap leading-7">
                {"[\n"}
                {stations.map((station, i) => (
                  <span key={station.organisation}>
                    {"  {\n"}
                    {"    "}
                    <span className="text-[#9cdcfe]">
                      &quot;{lang === "de" ? "zeitraum" : "period"}&quot;
                    </span>
                    :{" "}
                    <span className="text-[#ce9178]">
                      &quot;{station.from} – {station.to ?? t(labels.today, lang)}&quot;
                    </span>
                    ,{"\n"}
                    {"    "}
                    <span className="text-[#9cdcfe]">
                      &quot;{lang === "de" ? "rolle" : "role"}&quot;
                    </span>
                    : <span className="text-[#ce9178]">&quot;{t(station.role, lang)}&quot;</span>,
                    {"\n"}
                    {"    "}
                    <span className="text-[#9cdcfe]">
                      &quot;{lang === "de" ? "bei" : "at"}&quot;
                    </span>
                    : <span className="text-[#ce9178]">&quot;{station.organisation}&quot;</span>,
                    {"\n"}
                    {"    "}
                    <span className="text-[#9cdcfe]">&quot;info&quot;</span>:{" "}
                    <span className="text-[#ce9178]">
                      &quot;{t(station.description, lang)}&quot;
                    </span>
                    ,{"\n"}
                    {"    "}
                    <span className="text-[#9cdcfe]">&quot;stack&quot;</span>: [
                    {station.technologies.map((key) => (
                      <span key={key} className="text-[#ce9178]">
                        &quot;{technologyByKey(key).name}&quot;{" "}
                      </span>
                    ))}
                    ]{"\n"}
                    {i < stations.length - 1 ? "  },\n" : "  }\n"}
                  </span>
                ))}
                {"]"}
              </pre>
            )}

            {open === "skills" && (
              <div>
                <p className="mb-6">
                  <span className="text-[#c586c0]">export const</span>{" "}
                  <span className="text-[#4fc1ff]">skills</span> = [
                </p>
                <ul className="grid max-w-3xl grid-cols-2 gap-3 pl-6 sm:grid-cols-3">
                  {skills.map((skill) => (
                    <li
                      key={skill.key}
                      className="flex items-center gap-3 rounded border border-white/10 bg-[#252526] px-3 py-3"
                    >
                      {skill.logo ? (
                        <Image
                          src={skill.logo}
                          alt=""
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      ) : (
                        <span className="size-5 rounded-sm bg-gradient-to-br from-pink-500 to-amber-400" />
                      )}
                      <span className="text-[#ce9178]">&quot;{skill.name}&quot;</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6">] as const;</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="flex items-center gap-4 bg-pink-700 px-4 py-1 text-xs text-white">
        <span>⎇ main</span>
        <span className="ml-auto">{t(labels.imprint, lang)}</span>
        <span>{t(labels.privacy, lang)}</span>
      </footer>
    </div>
  );
}
