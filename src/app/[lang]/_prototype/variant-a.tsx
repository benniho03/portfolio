// PROTOTYPE: Variante A – breites, flaches Oval mit Foto in der Mitte, Text darunter zentriert.
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

export const name = "Flaches Oval";

const rings = ringsByWeight({ 3: [19, 27], 2: [32, 38], 1: [46, 47] });

export function VariantA(props: VariantProps) {
  const { lang } = props;

  return (
    <Page {...props}>
      <OvalOrbit rings={rings} className="aspect-[4/5] sm:aspect-[12/5]">
        <Portrait className="w-[32%] text-4xl sm:w-[15%] md:text-6xl" />
      </OvalOrbit>

      <div className="mt-6 flex flex-col items-center text-center">
        <Intro lang={lang} className="flex flex-col items-center" />
        <SocialLinks className="mt-8 justify-center" />
      </div>

      <AboutSection lang={lang} />
      <CareerSection lang={lang} />
      <ProjectsSection lang={lang} />
    </Page>
  );
}
