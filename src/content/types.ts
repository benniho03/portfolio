// Alle Texte liegen bereits in der angefragten Sprache vor.

/** HTML-Attribute, über die der Visual Editor einen Abschnitt beim Anklicken öffnet. */
export type EditorAttributes = { "data-blok-c": string; "data-blok-uid": string };

/** Nur im Draft Mode gesetzt; die Komponente legt die Attribute auf ihr äußerstes Element. */
type Editable = { editable?: EditorAttributes };

/** 1 (wenig) bis 3 (stark) hervorgehoben. Sagt nichts darüber aus, wie gut Benni den Skill beherrscht. */
export type Weight = 1 | 2 | 3;

export type Technology = {
	key: string;
	name: string;
	logo?: string;
} & ({ isSkill: false } | { isSkill: true; weight: Weight });

export type Skill = Extract<Technology, { isSkill: true }>;

export type Project = Editable & {
	name: string;
	description: string;
	image: string;
	technologies: Technology[];
	link?: string;
	githubLink?: string;
};

/** Ein Abschnitt im Werdegang. Ohne `to` dauert die Station bis heute an. */
export type Station = Editable & {
	kind: "employment" | "education";
	role: string;
	organisation: string;
	from: string;
	to?: string;
	description: string;
	technologies: Technology[];
};

export type SocialLink = { label: string; href: string };

export type Labels = Record<
	"about" | "career" | "projects" | "visit" | "today" | "imprint" | "privacy",
	string
>;

/** Globale Einstellungen: UI-Texte, Social Links und die Vorstellung im Hero. */
export type Settings = Editable & {
	role: string;
	greeting: string;
	intro: string;
	/** Ohne Foto zeigt der Hero einen Platzhalter. */
	photo?: string;
	socialLinks: SocialLink[];
	labels: Labels;
};

export type About = Editable & { bio: string };

export type RechtlicheSeiteArt = "impressum" | "datenschutz";

/** Impressum oder Datenschutzerklärung, als schlichter Fließtext in Absätzen. */
export type RechtlicheSeite = Editable & { title: string; paragraphs: string[] };
