import { draftMode } from "next/headers";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { GET } from "./route";

const enable = vi.fn();
vi.mock("next/headers", () => ({ draftMode: vi.fn(async () => ({ enable })) }));

const preview = (query: string) => GET(new NextRequest(`https://holderle.de/api/draft?${query}`));

describe("Draft-Mode-Einstieg", () => {
	beforeEach(() => vi.stubEnv("STORYBLOK_PREVIEW_SECRET", "geheim"));
	afterEach(() => {
		vi.unstubAllEnvs();
		vi.clearAllMocks();
	});

	test("schaltet den Draft Mode ein und leitet auf die Seite der Story um", async () => {
		const response = await preview("secret=geheim&slug=rechtliches/impressum&_storyblok=42");
		expect(enable).toHaveBeenCalled();
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe(
			"https://holderle.de/de/impressum?_storyblok=42",
		);
	});

	test("weist fehlende und falsche Secrets ab", async () => {
		for (const query of ["slug=einstellungen", "secret=falsch&slug=einstellungen"]) {
			expect((await preview(query)).status).toBe(401);
		}
		expect(draftMode).not.toHaveBeenCalled();
	});
});
