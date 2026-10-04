import type { Locale } from "@/i18n";
import * as placeholder from "./placeholder";
import type {
  About,
  LegalPage,
  LegalPageKind,
  Project,
  Settings,
  Skill,
  Station,
  Technology,
} from "./types";

function technology(key: string): Technology {
  const { name, logo, isSkill, weight } = placeholder.technologyByKey(key);
  return isSkill ? { key, name, logo, isSkill, weight } : { key, name, logo, isSkill };
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

export async function getHomepage(lang: Locale): Promise<{
  about: About;
  skills: Skill[];
  stations: Station[];
  projects: Project[];
}> {
  return {
    about: { bio: placeholder.about.bio[lang] },
    skills: placeholder.technologies
      .map(({ key }) => technology(key))
      .filter((item): item is Skill => item.isSkill),
    stations: placeholder.stations.map((station) => ({
      ...station,
      role: station.role[lang],
      description: station.description[lang],
      technologies: station.technologies.map(technology),
    })),
    projects: placeholder.projects.map((project) => ({
      ...project,
      description: project.description[lang],
      technologies: project.technologies.map(technology),
    })),
  };
}

export async function getLegalPage(lang: Locale, kind: LegalPageKind): Promise<LegalPage> {
  const { title, paragraphs } = placeholder.legalPages[kind];
  return { title: title[lang], paragraphs: paragraphs.map((paragraph) => paragraph[lang]) };
}
