// PROTOTYPE: Variante C – Skills kreisen auf drei Umlaufbahnen um den Namen.
import { about, skills } from "@/content/placeholder";
import { AboutTile, BentoPage, CareerTile, IntroTile, ProjectTiles, ProjectsHeading, SkillLogo, SocialTiles, tile } from "../bento";
import { t, type VariantProps } from "../shared";

export const name = "Orbit";

const rings = [
  { weight: 3, diameter: 44, duration: "50s", logo: "size-12 md:size-14" },
  { weight: 2, diameter: 70, duration: "80s", logo: "size-9 md:size-11" },
  { weight: 1, diameter: 96, duration: "120s", logo: "size-7 md:size-8" },
] as const;

export function VariantC(props: VariantProps) {
  const { lang } = props;

  return (
    <BentoPage {...props}>
      <section className={`${tile} relative overflow-hidden md:col-span-4`}>
        <div className="relative mx-auto aspect-square w-full max-w-[680px]">
          {rings.map((ring) => {
            const items = skills.filter((skill) => skill.weight === ring.weight);
            return (
              <div
                key={ring.weight}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-stone-300"
                style={{ width: `${ring.diameter}%`, height: `${ring.diameter}%` }}
              >
                <div className="size-full animate-orbit" style={{ "--orbit-duration": ring.duration } as React.CSSProperties}>
                  {items.map((skill, i) => {
                    const angle = ((2 * Math.PI) / items.length) * i + ring.weight;
                    return (
                      <div
                        key={skill.key}
                        className="absolute size-0"
                        style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                      >
                        <div className="w-max animate-counter-orbit -translate-x-1/2 -translate-y-1/2" style={{ "--orbit-duration": ring.duration } as React.CSSProperties}>
                          <div className="group relative rounded-2xl bg-white p-2 shadow-md ring-1 ring-black/5">
                            <SkillLogo skill={skill} className={ring.logo} />
                            <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-6xl font-bold md:text-8xl">benni.</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-stone-500">{t(about.role, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      <IntroTile lang={lang} className="md:col-span-2 md:row-span-2" />
      <AboutTile lang={lang} />
      <SocialTiles />
      <CareerTile lang={lang} className="md:col-span-4" />

      <ProjectsHeading lang={lang} />
      <ProjectTiles lang={lang} />
    </BentoPage>
  );
}
