import Link from "next/link";
import type { Labels } from "@/content/types";
import type { Locale } from "@/i18n";

export function SiteFooter({ lang, labels }: { lang: Locale; labels: Labels }) {
	return (
		<footer className="mx-auto flex max-w-6xl gap-4 px-4 pb-32 pt-16 text-sm text-stone-500">
			<Link href={`/${lang}/impressum`} className="hover:underline">
				{labels.imprint}
			</Link>
			<Link href={`/${lang}/datenschutz`} className="hover:underline">
				{labels.privacy}
			</Link>
		</footer>
	);
}
