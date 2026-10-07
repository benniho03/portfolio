import { defaultLocale, hasLocale } from "@/i18n";

const legalPages: Record<string, string> = {
	"rechtliches/impressum": "impressum",
	"rechtliches/datenschutz": "datenschutz",
};

/**
 * Seite, auf der der Visual Editor eine Story zeigt. Storyblok hängt den `full_slug` an `slug=`
 * an; seine eigenen `_storyblok`-Parameter braucht die Bridge auf der Zielseite.
 */
export function previewPath(params: URLSearchParams): string {
	const editorLang = params.get("_storyblok_lang") ?? "";
	const lang = hasLocale(editorLang) ? editorLang : defaultLocale;
	const page = legalPages[params.get("slug") ?? ""];
	const editorParams = new URLSearchParams(
		[...params].filter(([key]) => key.startsWith("_storyblok")),
	).toString();
	return `/${lang}${page ? `/${page}` : ""}${editorParams && `?${editorParams}`}`;
}
