// PROTOTYPE: Gemeinsame Helfer der Design-Varianten.
import Link from "next/link";
import { locales, type Locale, type Localized } from "@/i18n";

export type VariantProps = { lang: Locale; variant: string };

export const t = (text: Localized, lang: Locale) => text[lang];

export function LanguageSwitch({
  lang,
  variant,
  className = "",
}: VariantProps & { className?: string }) {
  return (
    <span className={`inline-flex gap-2 ${className}`}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}?variant=${variant}`}
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
