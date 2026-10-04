import {
  getRedirectUrl,
  unstable_doesMiddlewareMatch as doesProxyMatch,
} from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import { describe, expect, test } from "vitest";
import { config, proxy } from "./proxy";

const request = (path: string, acceptLanguage?: string) =>
  new NextRequest(`https://holderle.de${path}`, {
    headers: acceptLanguage ? { "accept-language": acceptLanguage } : {},
  });

const redirectTarget = (path: string, acceptLanguage?: string) => {
  const response = proxy(request(path, acceptLanguage));
  return response ? getRedirectUrl(response) : null;
};

describe("proxy", () => {
  test("leitet eine Adresse ohne Sprache auf die bevorzugte Sprache des Browsers um", () => {
    expect(redirectTarget("/", "de-DE,de;q=0.9")).toBe("https://holderle.de/de");
    expect(redirectTarget("/", "en-US,en;q=0.9")).toBe("https://holderle.de/en");
  });

  test("bevorzugt die Sprache mit der höchsten Priorität, unabhängig von der Reihenfolge", () => {
    expect(redirectTarget("/", "de;q=0.5,en;q=0.9")).toBe("https://holderle.de/en");
  });

  test("liest die Priorität auch mit Leerzeichen und weiteren Parametern", () => {
    expect(redirectTarget("/", "en; q=0.5, de ; q=0.9")).toBe("https://holderle.de/de");
    expect(redirectTarget("/", "en;level=1;q=0.5,de;q=0.9")).toBe("https://holderle.de/de");
  });

  test("überspringt nicht unterstützte Sprachen", () => {
    expect(redirectTarget("/", "fr-FR,fr;q=0.9,en;q=0.8")).toBe("https://holderle.de/en");
  });

  test("überspringt Sprachen, die der Browser ausdrücklich ablehnt", () => {
    expect(redirectTarget("/", "fr,en;q=0")).toBe("https://holderle.de/de");
  });

  test("fällt ohne passende Sprache auf Deutsch zurück", () => {
    expect(redirectTarget("/")).toBe("https://holderle.de/de");
    expect(redirectTarget("/", "fr-FR")).toBe("https://holderle.de/de");
  });

  test("behält Pfad und Query beim Umleiten", () => {
    expect(redirectTarget("/impressum?ref=footer", "en")).toBe(
      "https://holderle.de/en/impressum?ref=footer",
    );
  });

  test("lässt Adressen mit Sprache unverändert durch", () => {
    expect(redirectTarget("/de", "en")).toBeNull();
    expect(redirectTarget("/en/impressum", "de")).toBeNull();
  });

  test("erkennt ein Sprachpräfix nur als ganzes Pfadsegment", () => {
    expect(redirectTarget("/english", "en")).toBe("https://holderle.de/en/english");
  });

  test("läuft nicht für Next.js-Interna, Platzhalterbilder und das Favicon", () => {
    for (const url of ["/_next/static/chunk.js", "/placeholder/xoxo.png", "/favicon.ico"]) {
      expect(doesProxyMatch({ config, url })).toBe(false);
    }
    expect(doesProxyMatch({ config, url: "/" })).toBe(true);
  });
});
