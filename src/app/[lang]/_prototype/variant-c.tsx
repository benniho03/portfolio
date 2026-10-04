// PROTOTYPE: Variante C – Text links, Oval mit Foto rechts; der Hero bleibt so niedrig wie ein Bildschirm.
import { labels } from "@/content/placeholder";
import { OvalOrbit } from "./orbit";
import {
  AboutSection,
  CareerSection,
  Intro,
  Page,
  Portrait,
  ProjectsSection,
  SocialLinks,
  ringsByWeight,
} from "./oval";
import { t, type VariantProps } from "./shared";

export const name = "Split";

const rings = ringsByWeight({ 3: [22, 25], 2: [34, 37], 1: [46, 47] });

export function VariantC(props: VariantProps) {
  const { lang } = props;

  return (
    <Page {...props}>
      <section className="grid items-center gap-8 md:min-h-[75vh] md:grid-cols-[1fr_1.15fr]">
        <div>
          <Intro lang={lang} />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SocialLinks />
            <a
              href="#projects"
              className="rounded-full px-5 py-2.5 font-medium ring-1 ring-stone-900 hover:bg-white"
            >
              {t(labels.projects, lang)} ↓
            </a>
          </div>
        </div>
        <OvalOrbit rings={rings} className="aspect-[6/5]">
          <Portrait className="w-[28%] text-4xl md:text-6xl" />
        </OvalOrbit>
      </section>

      <AboutSection lang={lang} />
      <CareerSection lang={lang} />
      <ProjectsSection lang={lang} />
    </Page>
  );
}
