import { describe, expect, it } from "vitest";
import {
	toProject,
	toRechtlicheSeite,
	toSettings,
	toStation,
	toTechnology,
	type Story,
	type TechnologyContent,
} from "./storyblok";

const nextjs: Story<TechnologyContent> = {
	uuid: "u-next",
	slug: "nextjs",
	content: {
		component: "technology",
		name: "Next.js",
		logo: { filename: "https://a.storyblok.com/f/1/next.svg" },
		is_skill: true,
		weight: "3",
	},
};

describe("toTechnology", () => {
	it("bildet einen Skill mit Gewichtung und Logo ab", () => {
		expect(
			toTechnology({
				uuid: "u-ts",
				slug: "typescript",
				content: {
					component: "technology",
					name: "TypeScript",
					logo: { filename: "https://a.storyblok.com/f/1/ts.svg" },
					is_skill: true,
					weight: "3",
				},
			}),
		).toEqual({
			key: "typescript",
			name: "TypeScript",
			logo: "https://a.storyblok.com/f/1/ts.svg",
			isSkill: true,
			weight: 3,
		});
	});

	it("bildet eine Technologie ohne Skill und ohne Logo ab", () => {
		expect(
			toTechnology({
				uuid: "u-ws",
				slug: "websocket",
				content: {
					component: "technology",
					name: "WebSocket",
					logo: { filename: "" },
					is_skill: false,
					weight: "",
				},
			}),
		).toStrictEqual({ key: "websocket", name: "WebSocket", isSkill: false });
	});

	it("lehnt einen Skill ohne Gewichtung ab", () => {
		expect(() =>
			toTechnology({
				uuid: "u-go",
				slug: "go",
				content: { component: "technology", name: "Go", is_skill: true, weight: "" },
			}),
		).toThrow("Skill „Go“ (go) hat keine Gewichtung 1–3.");
	});
});

describe("toProject", () => {
	it("übernimmt aufgelöste Technologien, überspringt unaufgelöste und lässt leere Links weg", () => {
		expect(
			toProject({
				uuid: "u-studycard",
				slug: "studycard",
				content: {
					component: "project",
					name: "Studycard",
					description: "Eine Karteikarten-App.",
					image: { filename: "https://a.storyblok.com/f/1/studycard.png" },
					technologies: [nextjs, "u-unveroeffentlicht"],
					link: "",
					github_link: "https://github.com/benniho03/studycard",
				},
			}),
		).toStrictEqual({
			name: "Studycard",
			description: "Eine Karteikarten-App.",
			image: "https://a.storyblok.com/f/1/studycard.png",
			technologies: [
				{
					key: "nextjs",
					name: "Next.js",
					logo: "https://a.storyblok.com/f/1/next.svg",
					isSkill: true,
					weight: 3,
				},
			],
			githubLink: "https://github.com/benniho03/studycard",
		});
	});
});

describe("toSettings", () => {
	it("bildet Vorstellung, Foto, Social Links und Labels ab", () => {
		expect(
			toSettings({
				uuid: "u-settings",
				slug: "einstellungen",
				content: {
					component: "settings",
					role: "Software-Entwickler",
					greeting: "Hi! Ich bin Benni.",
					intro: "Ich baue gerne Dinge fürs Web.",
					photo: { filename: "https://a.storyblok.com/f/1/benni.jpg" },
					social_links: [
						{
							_uid: "1",
							component: "social_link",
							label: "GitHub",
							href: "https://github.com/benniho03",
						},
						{
							_uid: "2",
							component: "social_link",
							label: "E-Mail",
							href: "mailto:benni@example.com",
						},
					],
					label_about: "Über mich",
					label_career: "Werdegang",
					label_projects: "Projekte",
					label_visit: "Ansehen",
					label_today: "heute",
					label_imprint: "Impressum",
					label_privacy: "Datenschutz",
				},
			}),
		).toStrictEqual({
			role: "Software-Entwickler",
			greeting: "Hi! Ich bin Benni.",
			intro: "Ich baue gerne Dinge fürs Web.",
			photo: "https://a.storyblok.com/f/1/benni.jpg",
			socialLinks: [
				{ label: "GitHub", href: "https://github.com/benniho03" },
				{ label: "E-Mail", href: "mailto:benni@example.com" },
			],
			labels: {
				about: "Über mich",
				career: "Werdegang",
				projects: "Projekte",
				visit: "Ansehen",
				today: "heute",
				imprint: "Impressum",
				privacy: "Datenschutz",
			},
		});
	});
});

describe("toRechtlicheSeite", () => {
	it("teilt den Text an Leerzeilen in Absätze", () => {
		expect(
			toRechtlicheSeite({
				uuid: "u-impressum",
				slug: "impressum",
				content: {
					component: "rechtliche_seite",
					title: "Impressum",
					body: "\nAngaben gemäß § 5 DDG:\nBenni Holderle\r\n\r\n\n\nE-Mail: benni@example.com  \n",
				},
			}),
		).toStrictEqual({
			title: "Impressum",
			paragraphs: ["Angaben gemäß § 5 DDG:\nBenni Holderle", "E-Mail: benni@example.com"],
		});
	});
});

describe("toStation", () => {
	it("lässt `to` weg, wenn die Station bis heute andauert", () => {
		expect(
			toStation({
				uuid: "u-job",
				slug: "software-entwickler",
				content: {
					component: "station",
					kind: "employment",
					role: "Software-Entwickler",
					organisation: "Firma",
					from: "2024",
					to: "",
					description: "Webanwendungen im Team.",
					technologies: [nextjs],
				},
			}),
		).toStrictEqual({
			kind: "employment",
			role: "Software-Entwickler",
			organisation: "Firma",
			from: "2024",
			description: "Webanwendungen im Team.",
			technologies: [
				{
					key: "nextjs",
					name: "Next.js",
					logo: "https://a.storyblok.com/f/1/next.svg",
					isSkill: true,
					weight: 3,
				},
			],
		});
	});
});
