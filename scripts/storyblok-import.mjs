// Überträgt die Platzhalterinhalte aus src/content/placeholder.ts als veröffentlichte Stories nach Storyblok.
// Vorhandene Stories mit gleichem Slug werden überschrieben, hochgeladene Bilder wiederverwendet.
// Aufruf: npm run storyblok:import (Zugangsdaten siehe storyblok-mapi.mjs)
import { readFile } from "node:fs/promises";
import path from "node:path";
import * as placeholder from "../src/content/placeholder.ts";
import { request } from "./storyblok-mapi.mjs";

/** Übersetzbares Feld: Deutsch ist die Standardsprache, Englisch kommt als `__i18n__en` dazu. */
const translated = (key, value) => ({ [key]: value.de, [`${key}__i18n__en`]: value.en });

const assets = new Map();

/** Lädt ein Bild aus `public/` hoch, sofern es nicht schon im Space liegt. */
async function asset(publicPath) {
	if (!publicPath) return { fieldtype: "asset", filename: "" };
	if (!assets.has(publicPath)) assets.set(publicPath, upload(publicPath));
	return assets.get(publicPath);
}

async function upload(publicPath) {
	const filename = path.basename(publicPath);
	const { assets: found } = await request(
		"GET",
		`/assets/?search=${encodeURIComponent(filename)}`,
	);
	let match = found.find((item) => path.basename(item.filename) === filename);
	if (!match) {
		const signed = await request("POST", "/assets/", { filename, validate_upload: 1 });
		const form = new FormData();
		for (const [key, value] of Object.entries(signed.fields)) form.append(key, value);
		form.append("file", new Blob([await readFile(path.join("public", publicPath))]), filename);
		const response = await fetch(signed.post_url, { method: "POST", body: form });
		if (!response.ok) {
			throw new Error(`Upload von ${filename}: ${response.status} ${await response.text()}`);
		}
		const finished = await request("GET", `/assets/${signed.id}/finish_upload`);
		match = finished.asset ?? finished;
		if (typeof match.filename !== "string") {
			throw new Error(`Unerwartete Antwort von finish_upload: ${JSON.stringify(finished)}`);
		}
		console.log(`hochgeladen:  ${filename}`);
	}
	// Die Management API liefert teils die S3-Adresse statt der CDN-Adresse.
	const url = match.filename.replace(/^https:\/\/s3\.amazonaws\.com\//, "https://");
	return { fieldtype: "asset", id: match.id, filename: url, alt: "", name: "" };
}

/** Legt eine Story an oder überschreibt die vorhandene mit gleichem Pfad, und veröffentlicht sie. */
async function upsert({ slug, name, parent, content, isFolder = false }) {
	const fullSlug = parent ? `${parent.full_slug}/${slug}` : slug;
	const { stories } = await request("GET", `/stories/?with_slug=${encodeURIComponent(fullSlug)}`);
	const story = {
		name,
		slug,
		parent_id: parent?.id ?? 0,
		...(isFolder ? { is_folder: true } : { content }),
	};
	const publish = isFolder ? undefined : true;
	const result = stories[0]
		? await request("PUT", `/stories/${stories[0].id}`, { story, publish, force_update: "1" })
		: await request("POST", "/stories/", { story, publish });
	console.log(`${stories[0] ? "aktualisiert" : "angelegt    "}: ${fullSlug}`);
	return result.story;
}

const folder = (slug, name) => upsert({ slug, name, isFolder: true });

const technologyUuids = new Map();
const technologyFolder = await folder("technologien", "Technologien");
for (const technology of placeholder.technologies) {
	const story = await upsert({
		slug: technology.key,
		name: technology.name,
		parent: technologyFolder,
		content: {
			component: "technology",
			name: technology.name,
			logo: await asset(technology.logo),
			is_skill: technology.isSkill,
			weight: technology.isSkill ? String(technology.weight) : "",
		},
	});
	technologyUuids.set(technology.key, story.uuid);
}

const uuids = (keys) =>
	keys.map((key) => {
		const uuid = technologyUuids.get(key);
		if (!uuid) throw new Error(`Unbekannte Technologie: ${key}`);
		return uuid;
	});

const slugify = (value) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const projectFolder = await folder("projekte", "Projekte");
for (const project of placeholder.projects) {
	await upsert({
		slug: slugify(project.name),
		name: project.name,
		parent: projectFolder,
		content: {
			component: "project",
			name: project.name,
			...translated("description", project.description),
			image: await asset(project.image),
			technologies: uuids(project.technologies),
			link: project.link ?? "",
			github_link: project.githubLink ?? "",
		},
	});
}

const stationFolder = await folder("stationen", "Stationen");
for (const station of placeholder.stations) {
	await upsert({
		slug: slugify(`${station.role.de} ${station.from}`),
		name: station.role.de,
		parent: stationFolder,
		content: {
			component: "station",
			kind: station.kind,
			...translated("role", station.role),
			organisation: station.organisation,
			from: station.from,
			to: station.to ?? "",
			...translated("description", station.description),
			technologies: uuids(station.technologies),
		},
	});
}

const { about, labels, socialLinks } = placeholder;

await upsert({
	slug: "einstellungen",
	name: "Einstellungen",
	content: {
		component: "settings",
		...translated("role", about.role),
		...translated("greeting", about.greeting),
		...translated("intro", about.intro),
		photo: await asset(undefined),
		social_links: socialLinks.map((link, index) => ({
			_uid: `social-link-${index}`,
			component: "social_link",
			label: link.label,
			href: link.href,
		})),
		...Object.assign(
			{},
			...Object.entries(labels).map(([key, value]) => translated(`label_${key}`, value)),
		),
	},
});

await upsert({
	slug: "ueber-mich",
	name: "Über mich",
	content: { component: "about", ...translated("bio", about.bio) },
});

const legalFolder = await folder("rechtliches", "Rechtliches");
for (const [kind, page] of Object.entries(placeholder.rechtlicheSeiten)) {
	await upsert({
		slug: kind,
		name: page.title.de,
		parent: legalFolder,
		content: {
			component: "rechtliche_seite",
			...translated("title", page.title),
			...translated("body", {
				de: page.paragraphs.map((paragraph) => paragraph.de).join("\n\n"),
				en: page.paragraphs.map((paragraph) => paragraph.en).join("\n\n"),
			}),
		},
	});
}
