import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RechtlicheSeiteView } from "@/components/rechtliche-seite";
import { getRechtlicheSeite } from "@/content";
import { hasLocale } from "@/i18n";
import { alternates } from "@/site";

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/impressum">): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const { title } = await getRechtlicheSeite(lang, "impressum");
	return { title, alternates: alternates(lang, "/impressum") };
}

export default async function Impressum({ params }: PageProps<"/[lang]/impressum">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	return <RechtlicheSeiteView page={await getRechtlicheSeite(lang, "impressum")} />;
}
