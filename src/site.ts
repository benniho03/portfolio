import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";

/** Vercel setzt die Produktiv-Domain in jeder Umgebung, auch in Previews. */
export const siteUrl = new URL(
	process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: "http://localhost:3000",
);

/** Alle Seiten, relativ zum Sprachpräfix. */
export const pagePaths = ["", "/impressum", "/datenschutz"] as const;
export type PagePath = (typeof pagePaths)[number];

/** `x-default` zeigt auf die Adresse ohne Sprache, die per Proxy nach Browsersprache umleitet. */
export function languageAlternates(path: PagePath): Record<Locale | "x-default", string> {
	return {
		...(Object.fromEntries(locales.map((lang) => [lang, `/${lang}${path}`])) as Record<
			Locale,
			string
		>),
		"x-default": path || "/",
	};
}

export function alternates(lang: Locale, path: PagePath): Metadata["alternates"] {
	return { canonical: `/${lang}${path}`, languages: languageAlternates(path) };
}

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
