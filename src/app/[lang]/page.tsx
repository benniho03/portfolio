import { notFound } from "next/navigation";
import { PrototypeSwitcher } from "@/components/prototype-switcher";
import { hasLocale } from "@/i18n";
import * as A from "./_prototype/variant-a";
import * as B from "./_prototype/variant-b";
import * as C from "./_prototype/variant-c";
import * as D from "./_prototype/variant-d";

// PROTOTYPE: Runde 3 – vier Varianten des ovalen Skill-Orbits mit Foto, umschaltbar über ?variant=A|B|C|D.
// Runde 1 und 2 liegen unter ./_prototype/runde-1 bzw. ./_prototype/runde-2 (nicht eingebunden).
const variants = {
  A: { name: A.name, Component: A.VariantA },
  B: { name: B.name, Component: B.VariantB },
  C: { name: C.name, Component: C.VariantC },
  D: { name: D.name, Component: D.VariantD },
};

export default async function Startseite({ params, searchParams }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const requested = (await searchParams).variant;
  const key =
    typeof requested === "string" && requested in variants
      ? (requested as keyof typeof variants)
      : "A";
  const { Component } = variants[key];

  return (
    <>
      <Component lang={lang} variant={key} />
      <PrototypeSwitcher
        variants={Object.entries(variants).map(([k, v]) => ({ key: k, name: v.name }))}
        current={key}
      />
    </>
  );
}
