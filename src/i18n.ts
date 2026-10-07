export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const hasLocale = (value: string): value is Locale =>
	(locales as readonly string[]).includes(value);

export type Localized = Record<Locale, string>;
