import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RechtlicheSeiteView } from "@/components/rechtliche-seite";
import { getRechtlicheSeite } from "@/content";
import { hasLocale } from "@/i18n";
import { alternates } from "@/site";

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/datenschutz">): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const { title } = await getRechtlicheSeite(lang, "datenschutz");
	return { title, alternates: alternates(lang, "/datenschutz") };
}

export default async function Datenschutz({ params }: PageProps<"/[lang]/datenschutz">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	return <RechtlicheSeiteView page={await getRechtlicheSeite(lang, "datenschutz")} />;
}
