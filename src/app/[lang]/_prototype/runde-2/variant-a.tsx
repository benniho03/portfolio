// PROTOTYPE: Variante A – Skill-Wolke als große Kachel neben der Vorstellung.
import { labels, skills } from "@/content/placeholder";
import { AboutTile, BentoPage, CareerTile, IntroTile, ProjectTiles, ProjectsHeading, SkillLogo, SocialTiles, layoutCloud, tile } from "../bento";
import { t, type VariantProps } from "../shared";

export const name = "Wolken-Kachel";

export function VariantA(props: VariantProps) {
  const { lang } = props;
  const cloud = layoutCloud(skills);

  return (
    <BentoPage {...props}>
      <IntroTile lang={lang} className="md:col-span-2 md:row-span-2" />

      <section className={`${tile} flex flex-col md:col-span-2 md:row-span-2`}>
        <h2 className="text-sm font-medium uppercase tracking-widest text-stone-500">{t(labels.skills, lang)}</h2>
        <div className="relative my-auto aspect-[5/3] w-full">
          {cloud.map(({ skill, x, y, size }, i) => (
            <div
              key={skill.key}
              className="group absolute aspect-square animate-float"
              style={{ left: `${x}%`, top: `${y}%`, width: `${size}%`, animationDelay: `${-i * 0.7}s` }}
            >
              <SkillLogo skill={skill} className="size-full transition duration-300 group-hover:scale-125" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <AboutTile lang={lang} />
      <SocialTiles />
      <CareerTile lang={lang} className="md:col-span-4" />

      <ProjectsHeading lang={lang} />
      <ProjectTiles lang={lang} />
    </BentoPage>
  );
}
