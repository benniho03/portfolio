# Plan bis zum Go-live

Ziel: Die Website läuft auf holderle.de mit echten Inhalten aus Storyblok, die Altprojekte sind umgezogen und die Redirects sind aktiv. Freelance-Akquise (Kontakt, Leistungen) ist nicht Teil dieses Plans.

Begriffe stehen in [`GLOSSARY.md`](../GLOSSARY.md), das Design in [`design.md`](design.md), die Hosting-Entscheidung in [`adr/0001-vercel-hosting-dns-bei-strato.md`](adr/0001-vercel-hosting-dns-bei-strato.md).

## Festgelegte Entscheidungen

- **Reihenfolge:** Erst die Komponenten mit Platzhalterdaten bauen und früh auf eine Vercel-Preview deployen, danach Storyblok anbinden.
- **Repo:** GitHub `benniho03/portfolio`. Der Prototyp kommt in den ersten Commit und wird in einem eigenen Commit entfernt, damit er in der History nachvollziehbar bleibt.
- **CMS:** Storyblok im kostenlosen Starter-Tarif (2 Sprachen, 100.000 API-Anfragen im Monat). Deutsch und Englisch werden auf Feldebene übersetzt.
- **Was ins CMS kommt:** alle Inhalte, auch die UI-Texte („Ansehen“, „heute“, Navigationslabels).
    - Ein globaler Eintrag **Einstellungen** enthält UI-Texte, Social Links, Foto, Rolle und Intro.
    - **Technologie** ist ein eigener Eintragstyp (Name, Logo, ist Skill, Gewichtung). Projekte und Stationen verweisen darauf.
    - Die Reihenfolge der Projekte wird im CMS manuell festgelegt. Das erste Projekt erscheint als große Kachel.
    - Impressum und Datenschutz sind **Rechtliche Seiten** mit eigenen Routen (`/de/impressum`, `/de/datenschutz` und die englischen Gegenstücke).
- **Aktualisierung:** Die Seite wird statisch ausgeliefert. Beim Veröffentlichen löst ein Storyblok-Webhook die Revalidierung aus.
- **Live-Vorschau:** Draft Mode von Next.js auf der Produktiv-Website, abgesichert über ein geheimes Token.
- **Statistik:** keine.
- **Qualität:** Pre-commit-Hook mit Lint, Prettier, Typecheck und Unit-Tests (Vitest). Getestet wird die Logik mit echtem Risiko: Sprachwahl im Proxy und die Abbildung der Storyblok-Daten auf die Domänentypen. Das Layout wird visuell in der Preview geprüft, E2E-Tests gibt es nicht.

## Phase 0: Repo

- [x] Git-Identität setzen.
- [x] Ersten Commit erstellen, inklusive Prototyp.
- [x] Repo `benniho03/portfolio` auf GitHub anlegen und pushen.

Fertig, wenn der Code auf GitHub liegt.

## Phase 1: Qualitäts-Grundlage

- [x] Vitest einrichten.
- [x] Unit-Tests für die Sprachwahl in `src/proxy.ts`.
- [x] Prettier einführen und den Code einmal formatieren.
- [x] Husky und lint-staged: Lint (ohne Warnungen), Formatierung, Typecheck und Tests vor jedem Commit.

Fertig, wenn ein Commit mit Lint-, Typ- oder Testfehlern blockiert wird.

## Phase 2: Produktionskomponenten

- [x] Variante C nach `src/components/` überführen, wie in `design.md` beschrieben.
- [x] Werdegang: Technologien jeder Station als Textzeile („TypeScript · React · Docker“).
- [x] E-Mail-Pille (mailto) neben GitHub und LinkedIn.
- [x] Routen für Impressum und Datenschutz mit Platzhaltertext, im Footer verlinkt.
- [x] Domänentypen an das Glossar angleichen (z. B. `weight` als Gewichtung).
- [x] In einem eigenen Commit entfernen: `_prototype/`, `PrototypeSwitcher`, die Fonts Geist, Geist Mono und Instrument Serif.
- [x] Fonts lokal einbinden für DSGVO

Fertig, wenn `/de` und `/en` Variante C ohne Prototyp-Code zeigen.

## Phase 3: Vercel-Preview

- [x] Vercel-Projekt anlegen und mit dem GitHub-Repo verbinden.

Fertig, wenn jeder Push eine Preview-URL erzeugt.

## Phase 4: Storyblok

- [x] Konto und Space anlegen, Sprachen DE (Standard) und EN.
- [x] Schema anlegen: Einstellungen, Über mich, Technologie, Projekt, Station, Rechtliche Seite (`npm run storyblok:schema`).
- [ ] Datenschicht: Storyblok-Daten auf die Domänentypen abbilden, mit Unit-Tests.
- [ ] Bilder (Foto, Screenshots, Logos) aus dem Storyblok-Asset-Manager über `next/image` ausliefern.
- [ ] Webhook beim Veröffentlichen löst die Revalidierung aus.
- [ ] Draft Mode und Visual Editor mit Live-Preview.
- [ ] `src/content/placeholder.ts` und `public/placeholder/` entfernen.
- [ ] Matcher in `src/proxy.ts` anpassen: `placeholder` streichen, Ausnahmen nur als ganze Pfadsegmente.

Fertig, wenn eine Änderung in Storyblok nach dem Veröffentlichen auf der Preview erscheint und der Visual Editor Entwürfe live zeigt.

## Phase 5: SEO

- [ ] Titel und Beschreibung pro Sprache.
- [ ] hreflang-Verweise zwischen `/de` und `/en`.
- [ ] `sitemap.xml` und `robots.txt`.
- [ ] Generiertes Vorschaubild für Social Media.

Fertig, wenn Sitemap und Vorschaubild auf der Preview erreichbar sind.

## Phase 6: Go-live

- [ ] Altprojekte auf Strato-Subdomains umziehen: `wetter-getter.holderle.de` und `pop-up.holderle.de` (beide Pop-Up-Projekte verlinken dorthin).
- [ ] Redirects in Vercel: `/wetter-getter/` und `/pop-up/` auf die neuen Subdomains, `/study-card/` auf die Startseite.
- [ ] Projektlinks in Storyblok auf die neuen Subdomains umstellen.
- [ ] Domain holderle.de und www in Vercel eintragen.
- [ ] Bei Strato den A-Record von holderle.de und einen CNAME für www auf Vercel setzen. Nameserver und MX-Records bleiben unverändert.
- [ ] Prüfen, ob E-Mails an holderle.de weiterhin ankommen.

Fertig, wenn holderle.de die neue Seite zeigt, die alten Pfade weiterleiten und E-Mails ankommen.

## Paralleler Strang: Inhalte

Muss vor Phase 6 fertig sein. Eingepflegt wird alles nach Phase 4 in Storyblok.

- [ ] Texte auf Deutsch und Englisch: Rolle, Intro, Über mich, Stationen, Projektbeschreibungen.
- [ ] Porträtfoto.
- [ ] Aktuelle Screenshots der Projekte.
- [ ] Impressum und Datenschutz aus einem Generator (z. B. eRecht24), ohne Abschnitt zu Statistik-Tools.
- [ ] E-Mail-Adresse für die Kontakt-Pille festlegen.
