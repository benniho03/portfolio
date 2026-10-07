// Platzhalterinhalte bis zur Storyblok-Anbindung, in beiden Sprachen. Werte in [eckigen Klammern] sind unbekannt.
import type { Localized } from "@/i18n";
import type { SocialLink, Technology } from "./types";

type Project = {
	name: string;
	description: Localized;
	image: string;
	/** Schlüssel aus `technologies`. */
	technologies: string[];
	link?: string;
	githubLink?: string;
};

type Station = {
	kind: "employment" | "education";
	role: Localized;
	organisation: string;
	from: string;
	to?: string;
	description: Localized;
	/** Schlüssel aus `technologies`. */
	technologies: string[];
};

const icon = (slug: string) => `/placeholder/icons/${slug}.svg`;

export const technologies: Technology[] = [
	{ key: "typescript", name: "TypeScript", logo: icon("typescript"), isSkill: true, weight: 3 },
	{ key: "nextjs", name: "Next.js", logo: icon("nextdotjs"), isSkill: true, weight: 3 },
	{ key: "react", name: "React", logo: icon("react"), isSkill: true, weight: 3 },
	{ key: "tailwind", name: "Tailwind CSS", logo: icon("tailwindcss"), isSkill: true, weight: 3 },
	{ key: "docker", name: "Docker", logo: icon("docker"), isSkill: true, weight: 2 },
	{ key: "bun", name: "Bun", logo: icon("bun"), isSkill: true, weight: 2 },
	{ key: "npm", name: "npm", logo: icon("npm"), isSkill: true, weight: 2 },
	{ key: "node", name: "Node.js", logo: icon("nodedotjs"), isSkill: true, weight: 2 },
	{ key: "git", name: "Git", logo: icon("git"), isSkill: true, weight: 2 },
	{ key: "figma", name: "Figma", logo: icon("figma"), isSkill: true, weight: 2 },
	{ key: "javascript", name: "JavaScript", logo: icon("javascript"), isSkill: true, weight: 2 },
	{ key: "github", name: "GitHub", logo: icon("github"), isSkill: true, weight: 1 },
	{ key: "vercel", name: "Vercel", logo: icon("vercel"), isSkill: true, weight: 1 },
	{ key: "vite", name: "Vite", logo: icon("vite"), isSkill: true, weight: 1 },
	{ key: "postgresql", name: "PostgreSQL", logo: icon("postgresql"), isSkill: true, weight: 1 },
	{ key: "html", name: "HTML", logo: icon("html5"), isSkill: true, weight: 1 },
	{ key: "css", name: "CSS", logo: icon("css"), isSkill: true, weight: 1 },
	{ key: "laravel", name: "Laravel", logo: icon("laravel"), isSkill: true, weight: 1 },
	{ key: "mysql", name: "MySQL", logo: icon("mysql"), isSkill: true, weight: 1 },
	{ key: "unity", name: "Unity", logo: icon("unity"), isSkill: false },
	{ key: "stenciljs", name: "Stencil.js", logo: icon("stencil"), isSkill: false },
	{ key: "bootstrap", name: "Bootstrap", logo: icon("bootstrap"), isSkill: false },
	{ key: "websocket", name: "WebSocket", isSkill: false },
];

export const about = {
	role: { de: "Software-Entwickler", en: "Software Developer" },
	greeting: { de: "Hi! Ich bin Benni.", en: "Hi! I'm Benni." },
	intro: {
		de: "Ich bin Software-Entwickler und baue gerne Dinge fürs Web – beruflich und in meiner Freizeit. Hier stelle ich meine Projekte aus.",
		en: "I'm a software developer who loves building things for the web – at work and in my spare time. This is where I show my projects.",
	},
	bio: {
		de: "[Über-mich-Text] Angefangen hat alles im Studium Onlinemedien. Heute arbeite ich fest angestellt als Software-Entwickler und experimentiere nebenbei mit neuen Technologien wie Bun und WebSockets.",
		en: "[About text] It all started while studying Online Media. Today I work full-time as a software developer and experiment with new technologies like Bun and WebSockets on the side.",
	},
} satisfies Record<string, Localized>;

export const socialLinks: SocialLink[] = [
	{ label: "GitHub", href: "https://github.com/benniho03" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/" },
	{ label: "E-Mail", href: "mailto:benniho03@gmail.com" },
];

export const stations: Station[] = [
	{
		kind: "employment",
		role: { de: "Software-Entwickler", en: "Software Developer" },
		organisation: "[Arbeitgeber]",
		from: "[2024]",
		description: {
			de: "[Beschreibung] Entwicklung von Webanwendungen im Team.",
			en: "[Description] Building web applications as part of a team.",
		},
		technologies: ["typescript", "react", "docker"],
	},
	{
		kind: "education",
		role: { de: "Studium Onlinemedien (B.Sc.)", en: "Online Media (B.Sc.)" },
		organisation: "[Hochschule]",
		from: "[2021]",
		to: "[2024]",
		description: {
			de: "[Beschreibung] Duales Studium mit Schwerpunkt Webentwicklung.",
			en: "[Description] Dual study programme focused on web development.",
		},
		technologies: ["laravel", "unity", "figma"],
	},
];

export const projects: Project[] = [
	{
		name: "Beatbuster",
		description: {
			de: "Guess-the-Song mit der Spotify-API. Ein Projekt, das ich mit Freunden entwickelt habe. Leider lässt die Spotify-API nur vorher registrierte Nutzer zu. Sag mir Bescheid, wenn du es ausprobieren willst :)",
			en: "Guess-the-song using the Spotify API, built together with friends. Unfortunately the Spotify API only admits pre-registered users – let me know if you want to try it :)",
		},
		image: "/placeholder/beatbuster.png",
		technologies: ["nextjs", "bun", "websocket"],
		link: "https://beatbuster.holderle.de/",
		githubLink: "https://github.com/on21FU/beatbuster",
	},
	{
		name: "XOXO",
		description: {
			de: "Online Tic-Tac-Toe, das einfach mit Freunden gespielt werden kann. Habe dabei bisschen mit Bun und Websockets experimentiert.",
			en: "Online tic-tac-toe you can easily play with friends. A playground for experimenting with Bun and WebSockets.",
		},
		image: "/placeholder/xoxo.png",
		technologies: ["nextjs", "bun", "websocket"],
		link: "https://xoxo-rouge.vercel.app/",
		githubLink: "https://github.com/benniho03/XOXO",
	},
	{
		name: "Studycard",
		description: {
			de: "Eine Karteikarten-App, die ich mit Laravel und Docker umgesetzt habe.",
			en: "A flashcard app built with Laravel and Docker.",
		},
		image: "/placeholder/studycard.png",
		technologies: ["laravel", "bootstrap", "mysql"],
		githubLink: "https://github.com/benniho03/studycard",
	},
	{
		name: "Wetter-Getter",
		description: {
			de: "Hol dir dein Wetter, wo immer, wann immer! In diesem Projekt verwende ich die OpenWeatherAPI.",
			en: "Get your weather, wherever, whenever! This project uses the OpenWeather API.",
		},
		image: "/placeholder/wetter-getter.png",
		technologies: ["html", "css", "typescript"],
		link: "https://www.holderle.de/wetter-getter/",
		githubLink: "https://github.com/benniho03/Wetter-Getter",
	},
	{
		name: "Pop Up Website",
		description: {
			de: "Wir haben mit Stencil.js und TypeScript eine Website für unser Spiel Pop Up erstellt.",
			en: "We built a website for our game Pop Up using Stencil.js and TypeScript.",
		},
		image: "/placeholder/pop-up-website.png",
		technologies: ["stenciljs"],
		link: "https://www.holderle.de/pop-up/",
		githubLink: "https://github.com/benniho03/PopUpWebsite",
	},
	{
		name: "Pop Up",
		description: {
			de: "Während eines Moduls in der Theoriephase haben wir ein 2D-Spiel in Unity entwickelt.",
			en: "A 2D game we developed in Unity during a university module.",
		},
		image: "/placeholder/pop-up.png",
		technologies: ["unity"],
		link: "https://www.holderle.de/pop-up/",
		githubLink: "https://github.com/benniho03/PopUp",
	},
	{
		name: "BWC Webdesign",
		description: {
			de: "Hier habe ich ein Webdesign für ein imaginäres Uhrenunternehmen gestaltet.",
			en: "A web design for an imaginary watch company.",
		},
		image: "/placeholder/bwc.png",
		technologies: ["figma"],
		link: "https://www.figma.com/proto/aKccKJlAxvEDCXunSzuc7D/Pr%C3%A4sentation?node-id=1%3A353&starting-point-node-id=1%3A2",
	},
];

export const labels = {
	projects: { de: "Projekte", en: "Projects" },
	about: { de: "Über mich", en: "About" },
	career: { de: "Werdegang", en: "Career" },
	visit: { de: "Ansehen", en: "View" },
	today: { de: "heute", en: "present" },
	imprint: { de: "Impressum", en: "Legal notice" },
	privacy: { de: "Datenschutz", en: "Privacy" },
} satisfies Record<string, Localized>;

export const rechtlicheSeiten = {
	impressum: {
		title: { de: "Impressum", en: "Legal notice" },
		paragraphs: [
			{
				de: "[Impressum] Angaben gemäß § 5 DDG: Benni Holderle, [Straße und Hausnummer], [PLZ und Ort].",
				en: "[Legal notice] Information pursuant to § 5 DDG: Benni Holderle, [street and number], [postcode and city].",
			},
			{
				de: "[Kontakt] E-Mail: [E-Mail-Adresse]",
				en: "[Contact] Email: [email address]",
			},
		],
	},
	datenschutz: {
		title: { de: "Datenschutz", en: "Privacy" },
		paragraphs: [
			{
				de: "[Datenschutzerklärung] Der endgültige Text kommt aus einem Generator und wird über das CMS gepflegt.",
				en: "[Privacy policy] The final text will come from a generator and be maintained in the CMS.",
			},
			{
				de: "[Hosting] Diese Website wird bei Vercel gehostet. Es werden keine Statistik-Tools eingesetzt.",
				en: "[Hosting] This website is hosted by Vercel. No analytics tools are used.",
			},
		],
	},
} satisfies Record<string, { title: Localized; paragraphs: Localized[] }>;
