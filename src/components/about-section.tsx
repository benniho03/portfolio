import type { About } from "@/content/types";
import { sectionGrid, sectionLabel } from "./section";

export function AboutSection({ about, heading }: { about: About; heading: string }) {
  return (
    <section id="about" className={`mt-24 scroll-mt-6 ${sectionGrid}`}>
      <h2 className={sectionLabel}>{heading}</h2>
      <p className="text-2xl leading-snug md:text-3xl">{about.bio}</p>
    </section>
  );
}
