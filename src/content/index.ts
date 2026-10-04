import type { Locale } from "@/i18n";
import * as placeholder from "./placeholder";
import type {
  About,
  RechtlicheSeite,
  RechtlicheSeiteArt,
  Project,
  Settings,
  Skill,
  Station,
  Technology,
} from "./types";

function technologyByKey(key: string): Technology {
  const match = placeholder.technologies.find((technology) => technology.key === key);
  if (!match) throw new Error(`Unbekannte Technologie: ${key}`);
  return match;
}

export async function getSettings(lang: Locale): Promise<Settings> {
  const { about, labels, socialLinks } = placeholder;
  return {
    role: about.role[lang],
    greeting: about.greeting[lang],
    intro: about.intro[lang],
    socialLinks,
    labels: {
      about: labels.about[lang],
      career: labels.career[lang],
      projects: labels.projects[lang],
      visit: labels.visit[lang],
      today: labels.today[lang],
      imprint: labels.imprint[lang],
      privacy: labels.privacy[lang],
    },
  };
}

export async function getStartseite(lang: Locale): Promise<{
  about: About;
  skills: Skill[];
  stations: Station[];
  projects: Project[];
}> {
  return {
    about: { bio: placeholder.about.bio[lang] },
    skills: placeholder.technologies.filter((item): item is Skill => item.isSkill),
    stations: placeholder.stations.map((station) => ({
      ...station,
      role: station.role[lang],
      description: station.description[lang],
      technologies: station.technologies.map(technologyByKey),
    })),
    projects: placeholder.projects.map((project) => ({
      ...project,
      description: project.description[lang],
      technologies: project.technologies.map(technologyByKey),
    })),
  };
}

export async function getRechtlicheSeite(
  lang: Locale,
  kind: RechtlicheSeiteArt,
): Promise<RechtlicheSeite> {
  const { title, paragraphs } = placeholder.rechtlicheSeiten[kind];
  return { title: title[lang], paragraphs: paragraphs.map((paragraph) => paragraph[lang]) };
}
