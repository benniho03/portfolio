import type { Metadata } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryblokPreview } from "@/components/storyblok-preview";
import { getSettings } from "@/content";
import { hasLocale, locales, type Locale } from "@/i18n";
import { siteUrl } from "@/site";
import "../globals.css";

const spaceGrotesk = localFont({
	src: "../fonts/space-grotesk-latin.woff2",
	weight: "300 700",
	variable: "--font-space-grotesk",
});

const openGraphLocales: Record<Locale, string> = { de: "de_DE", en: "en_US" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const { meta } = await getSettings(lang);
	return {
		metadataBase: siteUrl,
		title: { default: meta.title, template: `%s · ${meta.title}` },
		description: meta.description,
		openGraph: {
			type: "website",
			siteName: meta.title,
			title: meta.title,
			description: meta.description,
			locale: openGraphLocales[lang],
		},
		twitter: { card: "summary_large_image" },
	};
}

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const [{ labels }, { isEnabled: isDraft }] = await Promise.all([
		getSettings(lang),
		draftMode(),
	]);

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
				{isDraft && <StoryblokPreview />}
			</body>
		</html>
	);
}
