import Link from "next/link";
import type { Labels } from "@/content/types";
import type { Locale } from "@/i18n";
import { LanguageSwitch } from "./language-switch";

export function SiteHeader({ lang, labels }: { lang: Locale; labels: Labels }) {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
      <Link href={`/${lang}`} className="text-lg font-bold">
        benni.
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href={`/${lang}#about`} className="hover:underline">
          {labels.about}
        </Link>
        <Link href={`/${lang}#projects`} className="hover:underline">
          {labels.projects}
        </Link>
        <LanguageSwitch lang={lang} />
      </nav>
    </header>
  );
}
