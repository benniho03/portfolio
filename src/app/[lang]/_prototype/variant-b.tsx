// PROTOTYPE: Variante B – gekippte Umlaufbahnen mit Tiefe; Logos ziehen hinter dem Foto vorbei.
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
import type { VariantProps } from "./shared";

export const name = "3D-Ring";

const rings = ringsByWeight({ 3: [24, 13], 2: [36, 19], 1: [47, 25] }, 40);

export function VariantB(props: VariantProps) {
  const { lang } = props;

  return (
    <Page {...props}>
      <OvalOrbit rings={rings} depth className="aspect-square sm:aspect-[11/5]">
        <Portrait className="w-[40%] text-5xl sm:w-[21%] md:text-7xl" />
      </OvalOrbit>

      <div className="mt-4 grid items-end gap-8 md:grid-cols-[2fr_1fr]">
        <Intro lang={lang} />
        <SocialLinks className="md:justify-end" />
      </div>

      <AboutSection lang={lang} />
      <CareerSection lang={lang} />
      <ProjectsSection lang={lang} />
    </Page>
  );
}
