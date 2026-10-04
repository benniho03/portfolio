import { notFound } from "next/navigation";
import { AboutSection } from "@/components/about-section";
import { CareerSection } from "@/components/career-section";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { getHomepage, getSettings } from "@/content";
import { hasLocale } from "@/i18n";

export default async function Startseite({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [settings, { about, skills, stations, projects }] = await Promise.all([
    getSettings(lang),
    getHomepage(lang),
  ]);
  const { labels } = settings;

  return (
    <>
      <Hero settings={settings} skills={skills} />
      <AboutSection about={about} heading={labels.about} />
      <CareerSection stations={stations} heading={labels.career} today={labels.today} />
      <ProjectsSection projects={projects} labels={labels} />
    </>
  );
}
