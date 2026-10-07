import { apiPlugin, storyblokInit, type ISbStoriesParams } from "@storyblok/react/rsc";
import type { Locale } from "@/i18n";
import {
	toProject,
	toRechtlicheSeite,
	toSettings,
	toStation,
	toTechnology,
	type ProjectContent,
	type RechtlicheSeiteContent,
	type SettingsContent,
	type StationContent,
	type Story,
	type TechnologyContent,
} from "./storyblok";
import type {
	About,
	Project,
	RechtlicheSeite,
	RechtlicheSeiteArt,
	Settings,
	Skill,
	Station,
} from "./types";

/** Cache-Tag aller Storyblok-Abfragen; der Webhook invalidiert ihn beim Veröffentlichen. */
export const STORYBLOK_TAG = "storyblok";

const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	apiOptions: { region: process.env.STORYBLOK_REGION ?? "eu", cache: { type: "none" } },
});

const fetchOptions: RequestInit = { cache: "force-cache", next: { tags: [STORYBLOK_TAG] } };

const resolveRelations = ["project.technologies", "station.technologies"];

async function getStory<Content>(slug: string, lang: Locale): Promise<Story<Content>> {
	const { data } = await getStoryblokApi().getStory(
		slug,
		{ version: "published", language: lang },
		fetchOptions,
	);
	return data.story as unknown as Story<Content>;
}

async function getStories<Content>(
	folder: string,
	lang: Locale,
	params: ISbStoriesParams = {},
): Promise<Story<Content>[]> {
	const stories = await getStoryblokApi().getAll(
		"cdn/stories",
		{
			version: "published",
			language: lang,
			starts_with: `${folder}/`,
			sort_by: "position:asc",
			...params,
		},
		"stories",
		fetchOptions,
	);
	return stories as Story<Content>[];
}

export async function getSettings(lang: Locale): Promise<Settings> {
	return toSettings(await getStory<SettingsContent>("einstellungen", lang));
}

export async function getStartseite(lang: Locale): Promise<{
	about: About;
	skills: Skill[];
	stations: Station[];
	projects: Project[];
}> {
	const [about, technologies, stations, projects] = await Promise.all([
		getStory<{ bio: string }>("ueber-mich", lang),
		getStories<TechnologyContent>("technologien", lang),
		getStories<StationContent>("stationen", lang, { resolve_relations: resolveRelations }),
		getStories<ProjectContent>("projekte", lang, { resolve_relations: resolveRelations }),
	]);
	return {
		about: { bio: about.content.bio },
		skills: technologies.map(toTechnology).filter((item): item is Skill => item.isSkill),
		stations: stations.map(toStation),
		projects: projects.map(toProject),
	};
}

export async function getRechtlicheSeite(
	lang: Locale,
	kind: RechtlicheSeiteArt,
): Promise<RechtlicheSeite> {
	return toRechtlicheSeite(await getStory<RechtlicheSeiteContent>(`rechtliches/${kind}`, lang));
}
