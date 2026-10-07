// Legt die Blocks im Storyblok-Space an oder aktualisiert sie.
// Aufruf: STORYBLOK_SPACE_ID=… STORYBLOK_PERSONAL_ACCESS_TOKEN=… node scripts/storyblok-schema.mjs
// Optional STORYBLOK_REGION (eu, us, ca, ap), Standard ist eu.

const hosts = {
	eu: "mapi.storyblok.com",
	us: "api-us.storyblok.com",
	ca: "api-ca.storyblok.com",
	ap: "api-ap.storyblok.com",
};

const region = process.env.STORYBLOK_REGION ?? "eu";
const spaceId = process.env.STORYBLOK_SPACE_ID?.trim();
const token = process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN?.trim();
if (!spaceId || !token) {
	console.error("STORYBLOK_SPACE_ID und STORYBLOK_PERSONAL_ACCESS_TOKEN müssen gesetzt sein.");
	process.exit(1);
}
if (!/^\d+$/.test(spaceId)) {
	console.error(`STORYBLOK_SPACE_ID muss eine Zahl sein, ist aber „${spaceId}“.`);
	process.exit(1);
}
if (!hosts[region]) {
	console.error(
		`Unbekannte STORYBLOK_REGION „${region}“. Erlaubt: ${Object.keys(hosts).join(", ")}.`,
	);
	process.exit(1);
}

const API = `https://${hosts[region]}/v1`;

const text = (display_name, extra = {}) => ({ type: "text", display_name, ...extra });
const textarea = (display_name, extra = {}) => ({ type: "textarea", display_name, ...extra });
const image = (display_name, extra = {}) => ({
	type: "asset",
	display_name,
	filetypes: ["images"],
	...extra,
});
const technologies = {
	type: "options",
	display_name: "Technologien",
	source: "internal_stories",
	filter_content_type: ["technology"],
	is_reference_type: true,
};
const translatable = { translatable: true };
const required = { required: true };

/** Felder in Anzeigereihenfolge; `pos` wird daraus abgeleitet. */
const components = [
	{
		name: "social_link",
		display_name: "Social Link",
		is_nestable: true,
		is_root: false,
		schema: {
			label: text("Beschriftung", required),
			href: text("Adresse", {
				...required,
				description: "Vollständige URL oder mailto:adresse",
			}),
		},
	},
	{
		name: "settings",
		display_name: "Einstellungen",
		is_root: true,
		is_nestable: false,
		schema: {
			role: text("Rolle", { ...translatable, ...required }),
			greeting: text("Begrüßung", { ...translatable, ...required }),
			intro: textarea("Intro", { ...translatable, ...required }),
			photo: image("Foto"),
			social_links: {
				type: "bloks",
				display_name: "Social Links",
				restrict_components: true,
				component_whitelist: ["social_link"],
			},
			label_about: text("Label „Über mich“", { ...translatable, ...required }),
			label_career: text("Label „Werdegang“", { ...translatable, ...required }),
			label_projects: text("Label „Projekte“", { ...translatable, ...required }),
			label_visit: text("Label „Ansehen“", { ...translatable, ...required }),
			label_today: text("Label „heute“", { ...translatable, ...required }),
			label_imprint: text("Label „Impressum“", { ...translatable, ...required }),
			label_privacy: text("Label „Datenschutz“", { ...translatable, ...required }),
		},
	},
	{
		name: "about",
		display_name: "Über mich",
		is_root: true,
		is_nestable: false,
		schema: {
			bio: textarea("Text", { ...translatable, ...required }),
		},
	},
	{
		name: "technology",
		display_name: "Technologie",
		is_root: true,
		is_nestable: false,
		schema: {
			name: text("Name", required),
			logo: image("Logo"),
			is_skill: { type: "boolean", display_name: "Ist Skill" },
			weight: {
				type: "option",
				display_name: "Gewichtung",
				description: "Nur für Skills. 1 = wenig, 3 = stark hervorgehoben.",
				options: [
					{ name: "1", value: "1" },
					{ name: "2", value: "2" },
					{ name: "3", value: "3" },
				],
			},
		},
	},
	{
		name: "project",
		display_name: "Projekt",
		is_root: true,
		is_nestable: false,
		schema: {
			name: text("Name", required),
			description: textarea("Beschreibung", { ...translatable, ...required }),
			image: image("Screenshot", required),
			technologies,
			link: text("Link „Ansehen“"),
			github_link: text("GitHub-Link"),
		},
	},
	{
		name: "station",
		display_name: "Station",
		is_root: true,
		is_nestable: false,
		schema: {
			kind: {
				type: "option",
				display_name: "Art",
				...required,
				options: [
					{ name: "Anstellung", value: "employment" },
					{ name: "Ausbildung", value: "education" },
				],
			},
			role: text("Rolle", { ...translatable, ...required }),
			organisation: text("Organisation", required),
			from: text("Von", required),
			to: text("Bis", { description: "Leer lassen, wenn die Station bis heute andauert." }),
			description: textarea("Beschreibung", { ...translatable, ...required }),
			technologies,
		},
	},
	{
		name: "rechtliche_seite",
		display_name: "Rechtliche Seite",
		is_root: true,
		is_nestable: false,
		schema: {
			title: text("Titel", { ...translatable, ...required }),
			body: textarea("Text", {
				...translatable,
				...required,
				description: "Absätze durch eine Leerzeile trennen.",
			}),
		},
	},
];

async function request(method, path, body) {
	const response = await fetch(`${API}/spaces/${spaceId}${path}`, {
		method,
		headers: { Authorization: token, "Content-Type": "application/json" },
		body: body && JSON.stringify(body),
	});
	if (!response.ok) {
		throw new Error(`${method} ${path}: ${response.status} ${await response.text()}`);
	}
	return response.status === 204 ? null : response.json();
}

const list = await request("GET", "/components/");
if (!Array.isArray(list?.components)) {
	throw new Error(
		`Unerwartete Antwort von ${API}/spaces/${spaceId}/components/: ${JSON.stringify(list)}`,
	);
}
const existing = list.components;

for (const component of components) {
	const schema = Object.fromEntries(
		Object.entries(component.schema).map(([key, field], pos) => [key, { ...field, pos }]),
	);
	const payload = { component: { ...component, schema } };
	const match = existing.find((item) => item.name === component.name);
	if (match) {
		await request("PUT", `/components/${match.id}`, payload);
		console.log(`aktualisiert: ${component.name}`);
	} else {
		await request("POST", "/components/", payload);
		console.log(`angelegt:     ${component.name}`);
	}
}
