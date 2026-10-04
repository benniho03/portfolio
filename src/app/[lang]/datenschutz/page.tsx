import { notFound } from "next/navigation";
import { RechtlicheSeiteView } from "@/components/rechtliche-seite";
import { getRechtlicheSeite } from "@/content";
import { hasLocale } from "@/i18n";

export default async function Datenschutz({ params }: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <RechtlicheSeiteView page={await getRechtlicheSeite(lang, "datenschutz")} />;
}
