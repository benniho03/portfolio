import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/legal-page-view";
import { getLegalPage } from "@/content";
import { hasLocale } from "@/i18n";

export default async function Datenschutz({ params }: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <LegalPageView page={await getLegalPage(lang, "datenschutz")} />;
}
