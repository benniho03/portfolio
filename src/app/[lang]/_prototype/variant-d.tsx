"use client";

// PROTOTYPE: Variante D – flaches Oval, Klick auf ein Logo filtert Projekte und Werdegang.
import { useState } from "react";
import { projects, skills } from "@/content/placeholder";
import { OvalOrbit } from "./orbit";
import { AboutSection, CareerSection, Intro, Page, Portrait, ProjectsSection, SocialLinks, ringsByWeight } from "./oval";
import type { VariantProps } from "./shared";

export const name = "Oval + Filter";

const rings = ringsByWeight({ 3: [19, 27], 2: [32, 38], 1: [46, 47] });

export function VariantD(props: VariantProps) {
  const { lang } = props;
  const [selected, setSelected] = useState<string>();
  const selectedName = skills.find((skill) => skill.key === selected)?.name;
  const matches = selected ? projects.filter((project) => project.technologies.includes(selected)).length : 0;

  return (
    <Page {...props}>
      <OvalOrbit rings={rings} selected={selected} onSelect={(key) => setSelected(selected === key ? undefined : key)} className="aspect-[4/5] sm:aspect-[12/5]">
        <div className="flex w-[32%] flex-col items-center gap-3 sm:w-[15%]">
          <Portrait className="w-full text-4xl md:text-6xl" />
          <p className="pointer-events-auto rounded-full bg-white px-3 py-1 text-center text-xs text-stone-500 shadow-sm">
            {selectedName ?? (lang === "de" ? "Klick ein Logo" : "Click a logo")}
          </p>
        </div>
      </OvalOrbit>

      <div className="mt-6 flex flex-col items-center text-center">
        <Intro lang={lang} className="flex flex-col items-center" />
        <SocialLinks className="mt-8 justify-center" />
      </div>

      <AboutSection lang={lang} />
      <CareerSection lang={lang} highlight={selected} />
      <ProjectsSection lang={lang} highlight={selected}>
        {selected && (
          <button onClick={() => setSelected(undefined)} className="mt-3 rounded-full bg-stone-900 px-4 py-1.5 text-sm text-white hover:bg-stone-700">
            {lang === "de"
              ? `${matches} ${matches === 1 ? "Projekt" : "Projekte"} mit ${selectedName}`
              : `${matches} ${matches === 1 ? "project" : "projects"} using ${selectedName}`}{" "}
            ×
          </button>
        )}
      </ProjectsSection>
    </Page>
  );
}
