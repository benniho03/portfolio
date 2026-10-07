"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

/** Wechselt die Sprache und bleibt dabei auf derselben Seite. */
export function LanguageSwitch({ lang }: { lang: Locale }) {
	const subpath = usePathname().slice(`/${lang}`.length);

	return (
		<span className="inline-flex gap-2">
			{locales.map((locale) => (
				<Link
					key={locale}
					href={`/${locale}${subpath}`}
					hrefLang={locale}
					lang={locale}
					aria-current={locale === lang ? "page" : undefined}
					className={
						locale === lang
							? "font-bold underline underline-offset-4"
							: "opacity-60 hover:opacity-100"
					}
				>
					{locale.toUpperCase()}
				</Link>
			))}
		</span>
	);
}
