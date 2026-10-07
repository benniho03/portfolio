import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSettings } from "@/content";
import { hasLocale, locales } from "@/i18n";
import "../globals.css";

const spaceGrotesk = localFont({
	src: "../fonts/space-grotesk-latin.woff2",
	weight: "300 700",
	variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
	title: "Benni Holderle",
	description: "Software-Entwickler – Projekte von Benni Holderle",
};

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const { labels } = await getSettings(lang);

	return (
		<html
			lang={lang}
			data-scroll-behavior="smooth"
			className={`${spaceGrotesk.variable} antialiased`}
		>
			<body className="min-h-screen overflow-x-hidden bg-stone-100 font-display text-stone-900">
				<SiteHeader lang={lang} labels={labels} />
				<main className="mx-auto max-w-6xl px-4">{children}</main>
				<SiteFooter lang={lang} labels={labels} />
			</body>
		</html>
	);
}
