import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { STORYBLOK_TAG } from "@/content";
import { hasSecret } from "../secret";

/** Signierte Webhooks gibt es im Starter-Tarif nicht, deshalb steht das Secret in der URL. */
export async function POST(request: NextRequest) {
	if (!hasSecret(request, process.env.STORYBLOK_WEBHOOK_SECRET)) {
		return Response.json({ revalidated: false }, { status: 401 });
	}
	revalidateTag(STORYBLOK_TAG, { expire: 0 });
	return Response.json({ revalidated: true });
}
