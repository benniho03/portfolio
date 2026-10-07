import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { absoluteUrl, languageAlternates, pagePaths } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
	return pagePaths.flatMap((path) => {
		const languages = Object.fromEntries(
			Object.entries(languageAlternates(path)).map(([lang, href]) => [
				lang,
				absoluteUrl(href),
			]),
		);
		return locales.map((lang) => ({
			url: absoluteUrl(`/${lang}${path}`),
			alternates: { languages },
		}));
	});
}
