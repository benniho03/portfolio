import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { STORYBLOK_TAG } from "@/content";
import { POST } from "./route";

vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));
vi.mock("@/content", () => ({ STORYBLOK_TAG: "storyblok" }));

const webhook = (secret?: string) =>
	POST(
		new NextRequest(
			`https://holderle.de/api/revalidate${secret === undefined ? "" : `?secret=${secret}`}`,
			{ method: "POST", body: JSON.stringify({ action: "published" }) },
		),
	);

describe("Revalidierungs-Webhook", () => {
	beforeEach(() => vi.stubEnv("STORYBLOK_WEBHOOK_SECRET", "geheim"));
	afterEach(() => {
		vi.unstubAllEnvs();
		vi.mocked(revalidateTag).mockClear();
	});

	test("invalidiert die Storyblok-Inhalte sofort bei passendem Secret", async () => {
		const response = await webhook("geheim");
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ revalidated: true });
		expect(revalidateTag).toHaveBeenCalledWith(STORYBLOK_TAG, { expire: 0 });
	});

	test("weist fehlende und falsche Secrets ab", async () => {
		for (const secret of [undefined, "", "falsch", "geheimer"]) {
			expect((await webhook(secret)).status).toBe(401);
		}
		expect(revalidateTag).not.toHaveBeenCalled();
	});

	test("weist alles ab, solange kein Secret konfiguriert ist", async () => {
		vi.stubEnv("STORYBLOK_WEBHOOK_SECRET", "");
		expect((await webhook("")).status).toBe(401);
		expect(revalidateTag).not.toHaveBeenCalled();
	});
});
