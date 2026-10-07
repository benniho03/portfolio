import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

/** Prüft den Parameter `secret`; ohne konfiguriertes Secret wird jede Anfrage abgewiesen. */
export function hasSecret(request: NextRequest, configured: string | undefined) {
	const expected = Buffer.from(configured ?? "");
	const actual = Buffer.from(request.nextUrl.searchParams.get("secret") ?? "");
	return (
		expected.length > 0 &&
		actual.length === expected.length &&
		timingSafeEqual(actual, expected)
	);
}
