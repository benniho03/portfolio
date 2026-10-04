"use client";

// PROTOTYPE: Variante D – klickbare Wortwolke; ein Skill hebt die Projekte und Stationen hervor, die ihn nutzen.
import { useState } from "react";
import { labels, projects, skills } from "@/content/placeholder";
import {
  AboutTile,
  BentoPage,
  CareerTile,
  IntroTile,
  ProjectTiles,
  ProjectsHeading,
  SkillLogo,
  SocialTiles,
  tile,
} from "../bento";
import { t, type VariantProps } from "../shared";

export const name = "Filter-Wolke";

const chipSize = {
  3: "text-3xl md:text-4xl gap-3 px-5 py-3 [&_img]:size-9 md:[&_img]:size-10",
  2: "text-xl md:text-2xl gap-2.5 px-4 py-2.5 [&_img]:size-7",
  1: "text-base gap-2 px-3 py-2 text-stone-600 [&_img]:size-5",
} as const;
const offsets = [
  "translate-y-1",
  "-translate-y-2",
  "translate-y-3",
  "-translate-y-1",
  "translate-y-0",
  "-translate-y-3",
];

export function VariantD(props: VariantProps) {
  const { lang } = props;
  const [selected, setSelected] = useState<string>();
  const ordered = [...skills].sort(
    (a, b) => (a.key.length % 3) - (b.key.length % 3) || a.name.localeCompare(b.name),
  );
  const matches = selected
    ? projects.filter((project) => project.technologies.includes(selected)).length
    : 0;
  const selectedName = skills.find((skill) => skill.key === selected)?.name;

  return (
    <BentoPage {...props}>
      <IntroTile lang={lang} className="md:col-span-2 md:row-span-2" />
      <AboutTile lang={lang} />
      <SocialTiles />

      <section className={`${tile} md:col-span-4`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500">
            {t(labels.skills, lang)}
          </h2>
          <p className="text-sm text-stone-500">
            {selected
              ? lang === "de"
                ? `${matches} ${matches === 1 ? "Projekt" : "Projekte"} mit ${selectedName}`
                : `${matches} ${matches === 1 ? "project" : "projects"} using ${selectedName}`
              : lang === "de"
                ? "Klick auf einen Skill"
                : "Click a skill"}
          </p>
        </div>
        <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-3 py-4">
          {ordered.map((skill, i) => (
            <li key={skill.key} className={offsets[i % offsets.length]}>
              <button
                onClick={() => setSelected(selected === skill.key ? undefined : skill.key)}
                className={`flex items-center rounded-full font-bold transition hover:-rotate-2 hover:scale-105 ${chipSize[skill.weight]} ${
                  selected === skill.key
                    ? "bg-stone-900 text-white"
                    : selected
                      ? "opacity-40"
                      : "hover:bg-stone-100"
                }`}
              >
                <SkillLogo skill={skill} />
                {skill.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <CareerTile lang={lang} className="md:col-span-4" highlight={selected} />

      <ProjectsHeading lang={lang} />
      <ProjectTiles lang={lang} highlight={selected} />
    </BentoPage>
  );
}
