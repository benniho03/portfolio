import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales } from "./i18n";

function preferredLocale(request: NextRequest) {
	const header = request.headers.get("accept-language") ?? "";
	const languages = header
		.split(",")
		.map((part) => {
			const [tag, ...params] = part.split(";").map((segment) => segment.trim());
			const q = params.find((param) => param.startsWith("q="))?.slice(2);
			return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
		})
		.filter(({ q }) => q > 0)
		.sort((a, b) => b.q - a.q);
	return languages.find(({ lang }) => hasLocale(lang))?.lang ?? defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasLocalePrefix = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);
	if (hasLocalePrefix) return;

	request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ["/((?!(?:_next|api|favicon\\.ico)(?:/|$)).*)"],
};
