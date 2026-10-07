import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { STORYBLOK_TAG } from "@/content";

/** Gleicht das Secret aus der Webhook-URL ab; signierte Webhooks gibt es im Starter-Tarif nicht. */
function isAuthorized(request: NextRequest) {
	const expected = Buffer.from(process.env.STORYBLOK_WEBHOOK_SECRET ?? "");
	const actual = Buffer.from(request.nextUrl.searchParams.get("secret") ?? "");
	return (
		expected.length > 0 &&
		actual.length === expected.length &&
		timingSafeEqual(actual, expected)
	);
}

export async function POST(request: NextRequest) {
	if (!isAuthorized(request)) {
		return Response.json({ revalidated: false }, { status: 401 });
	}
	revalidateTag(STORYBLOK_TAG, { expire: 0 });
	return Response.json({ revalidated: true });
}
