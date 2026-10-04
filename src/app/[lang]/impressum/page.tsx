import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/legal-page-view";
import { getLegalPage } from "@/content";
import { hasLocale } from "@/i18n";

export default async function Impressum({ params }: PageProps<"/[lang]/impressum">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <LegalPageView page={await getLegalPage(lang, "impressum")} />;
}
