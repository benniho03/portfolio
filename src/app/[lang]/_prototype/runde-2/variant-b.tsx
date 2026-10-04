// PROTOTYPE: Variante B – Skills als endlos laufendes Logo-Band über die volle Breite.
import { labels, skills, type Technology } from "@/content/placeholder";
import { AboutTile, BentoPage, CareerTile, IntroTile, ProjectTiles, ProjectsHeading, SkillLogo, SocialTiles, tile } from "../bento";
import { t, type VariantProps } from "../shared";

export const name = "Logo-Band";

function MarqueeRow({ items, reverse }: { items: Technology[]; reverse?: boolean }) {
  return (
    <div className="flex w-max gap-4 hover:[animation-play-state:paused] data-[reverse=true]:animate-marquee-reverse data-[reverse=false]:animate-marquee" data-reverse={!!reverse}>
      {[...items, ...items].map((skill, i) => (
        <div key={`${skill.key}-${i}`} className="flex shrink-0 items-center gap-3 rounded-2xl bg-stone-100 px-5 py-4" aria-hidden={i >= items.length}>
          <SkillLogo skill={skill} className={skill.weight === 3 ? "size-10" : skill.weight === 2 ? "size-8" : "size-6"} />
          <span className={`font-bold ${skill.weight === 3 ? "text-2xl" : skill.weight === 2 ? "text-xl" : "text-base text-stone-600"}`}>{skill.name}</span>
        </div>
      ))}
    </div>
  );
}

export function VariantB(props: VariantProps) {
  const { lang } = props;
  const half = Math.ceil(skills.length / 2);

  return (
    <BentoPage {...props}>
      <IntroTile lang={lang} className="md:col-span-3 md:row-span-2" />
      <SocialTiles />

      <section className={`${tile} overflow-hidden px-0 md:col-span-4`}>
        <h2 className="px-6 text-sm font-medium uppercase tracking-widest text-stone-500">{t(labels.skills, lang)}</h2>
        <div className="mt-5 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <MarqueeRow items={skills.slice(0, half)} />
          <MarqueeRow items={skills.slice(half)} reverse />
        </div>
      </section>

      <AboutTile lang={lang} />
      <CareerTile lang={lang} />

      <ProjectsHeading lang={lang} />
      <ProjectTiles lang={lang} />
    </BentoPage>
  );
}
