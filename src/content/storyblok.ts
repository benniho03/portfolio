// Bildet die Antworten der Storyblok Content Delivery API auf die Domänentypen ab.
// Jede Story liegt bereits in der angefragten Sprache vor.
import { storyblokEditable } from "@storyblok/react/rsc";
import type {
	About,
	EditorAttributes,
	Labels,
	Project,
	RechtlicheSeite,
	Settings,
	Station,
	Technology,
	Weight,
} from "./types";

export type Story<Content> = { uuid: string; slug: string; content: Content };

type Asset = { filename?: string | null } | null | undefined;

/** Markierung für den Visual Editor; Storyblok liefert sie nur bei Entwürfen. */
type Blok = { _editable?: string };

function editable(content: Blok): { editable?: EditorAttributes } {
	const attributes = storyblokEditable(content);
	const marker = attributes["data-blok-c"];
	const uid = attributes["data-blok-uid"];
	return marker && uid ? { editable: { "data-blok-c": marker, "data-blok-uid": uid } } : {};
}

export type TechnologyContent = Blok & {
	component: "technology";
	name: string;
	logo?: Asset;
	is_skill?: boolean;
	weight?: string;
};

/** Storyblok liefert leere Felder als leeren String; die Domänentypen lassen sie weg. */
function optional(value: string | null | undefined): string | undefined {
	return value || undefined;
}

export function toTechnology({ slug, content }: Story<TechnologyContent>): Technology {
	const logo = optional(content.logo?.filename);
	const base = { key: slug, name: content.name, ...(logo && { logo }) };
	if (!content.is_skill) return { ...base, isSkill: false };
	const weight = Number(content.weight);
	if (!isWeight(weight)) {
		throw new Error(`Skill „${content.name}“ (${slug}) hat keine Gewichtung 1–3.`);
	}
	return { ...base, isSkill: true, weight };
}

function isWeight(value: number): value is Weight {
	return value === 1 || value === 2 || value === 3;
}

/** Nicht veröffentlichte Technologien löst Storyblok nicht auf; sie bleiben als UUID stehen. */
type TechnologyRefs = (Story<TechnologyContent> | string)[] | undefined;

function toTechnologies(refs: TechnologyRefs): Technology[] {
	return (refs ?? [])
		.filter((ref): ref is Story<TechnologyContent> => typeof ref !== "string")
		.map(toTechnology);
}

export type ProjectContent = Blok & {
	component: "project";
	name: string;
	description: string;
	image: Asset;
	technologies?: TechnologyRefs;
	link?: string;
	github_link?: string;
};

export function toProject({ content }: Story<ProjectContent>): Project {
	const link = optional(content.link);
	const githubLink = optional(content.github_link);
	return {
		name: content.name,
		description: content.description,
		image: content.image?.filename ?? "",
		technologies: toTechnologies(content.technologies),
		...(link && { link }),
		...(githubLink && { githubLink }),
		...editable(content),
	};
}

export type AboutContent = Blok & { component: "about"; bio: string };

export function toAbout({ content }: Story<AboutContent>): About {
	return { bio: content.bio, ...editable(content) };
}

export type SettingsContent = Blok & {
	component: "settings";
	role: string;
	greeting: string;
	intro: string;
	photo?: Asset;
	social_links?: { _uid: string; component: "social_link"; label: string; href: string }[];
} & Record<`label_${keyof Labels}`, string>;

export function toSettings({ content }: Story<SettingsContent>): Settings {
	const photo = optional(content.photo?.filename);
	return {
		role: content.role,
		greeting: content.greeting,
		intro: content.intro,
		...(photo && { photo }),
		socialLinks: (content.social_links ?? []).map(({ label, href }) => ({ label, href })),
		labels: {
			about: content.label_about,
			career: content.label_career,
			projects: content.label_projects,
			visit: content.label_visit,
			today: content.label_today,
			imprint: content.label_imprint,
			privacy: content.label_privacy,
		},
		...editable(content),
	};
}

export type RechtlicheSeiteContent = Blok & {
	component: "rechtliche_seite";
	title: string;
	body: string;
};

export function toRechtlicheSeite({ content }: Story<RechtlicheSeiteContent>): RechtlicheSeite {
	return {
		title: content.title,
		paragraphs: content.body
			.replace(/\r\n/g, "\n")
			.split(/\n\s*\n/)
			.map((paragraph) => paragraph.trim())
			.filter(Boolean),
		...editable(content),
	};
}

export type StationContent = Blok & {
	component: "station";
	kind: Station["kind"];
	role: string;
	organisation: string;
	from: string;
	to?: string;
	description: string;
	technologies?: TechnologyRefs;
};

export function toStation({ content }: Story<StationContent>): Station {
	const to = optional(content.to);
	return {
		kind: content.kind,
		role: content.role,
		organisation: content.organisation,
		from: content.from,
		...(to && { to }),
		description: content.description,
		technologies: toTechnologies(content.technologies),
		...editable(content),
	};
}
