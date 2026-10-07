import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { hasSecret } from "../secret";
import { previewPath } from "./preview-path";

/** Einstieg des Visual Editors; die Vorschau-URL in Storyblok endet auf `&slug=`. */
export async function GET(request: NextRequest) {
	if (!hasSecret(request, process.env.STORYBLOK_PREVIEW_SECRET)) {
		return new Response("Unauthorized", { status: 401 });
	}
	(await draftMode()).enable();
	return NextResponse.redirect(new URL(previewPath(request.nextUrl.searchParams), request.url));
}
