import { describe, expect, test } from "vitest";
import { previewPath } from "./preview-path";

const path = (slug: string, query = "") =>
	previewPath(new URLSearchParams(`slug=${slug}&secret=geheim${query}`));

describe("previewPath", () => {
	test("zeigt Rechtliche Seiten auf ihrer eigenen Route", () => {
		expect(path("rechtliches/impressum")).toBe("/de/impressum");
		expect(path("rechtliches/datenschutz")).toBe("/de/datenschutz");
	});

	test("zeigt alle übrigen Stories auf der Startseite", () => {
		for (const slug of [
			"einstellungen",
			"ueber-mich",
			"projekte/studycard",
			"",
			"rechtliches/agb",
		]) {
			expect(path(slug)).toBe("/de");
		}
	});

	test("wählt die Sprache aus dem Visual Editor und behält dessen Parameter", () => {
		expect(
			path(
				"rechtliches/impressum",
				"&_storyblok=42&_storyblok_lang=en&_storyblok_tk[token]=t",
			),
		).toBe("/en/impressum?_storyblok=42&_storyblok_lang=en&_storyblok_tk%5Btoken%5D=t");
		expect(path("einstellungen", "&_storyblok_lang=default")).toBe(
			"/de?_storyblok_lang=default",
		);
	});

	test("fällt bei unbekannter Sprache auf Deutsch zurück", () => {
		expect(path("einstellungen", "&_storyblok_lang=fr")).toBe("/de?_storyblok_lang=fr");
	});
});
