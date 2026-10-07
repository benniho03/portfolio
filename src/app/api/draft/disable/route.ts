import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/** Beendet den Draft Mode, etwa wenn die Website nach dem Bearbeiten direkt besucht wird. */
export async function GET(request: NextRequest) {
	(await draftMode()).disable();
	return NextResponse.redirect(new URL("/", request.url));
}
