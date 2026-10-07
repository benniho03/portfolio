# Design der Startseite

Festgelegt nach drei Prototyp-Runden: **Variante C „Split“ aus Runde 3**. Diese Datei ist die Vorgabe für den Produktionscode. Begriffe wie Startseite, Projekt, Skill, Werdegang und Station stehen in [`GLOSSARY.md`](../GLOSSARY.md).

Umgesetzt ist das Design in `src/components/`. Der Prototyp aller drei Runden liegt nur noch in der Git-History (Commit „Prototyp der Startseite und Planungsdokumente“).

## Grundstil

- Hell, ruhig, viel Weißraum. Hintergrund `stone-100`, Text `stone-900`, Nebentext `stone-500`/`stone-600`, Linien `stone-300`.
- Akzent: Verlauf `pink-600 → amber-400` (Porträt-Platzhalter), `amber-300` als Hover-Farbe in den Projektkacheln.
- Schrift: Space Grotesk (`font-display`) für alles.
- Inhaltsbreite `max-w-6xl` mit `px-4`.
- Nur die Projekte sind Bento-Kacheln, alle anderen Abschnitte sind offen, ohne Kacheln.

## Aufbau von oben nach unten

1. **Header:** links das Wortzeichen `benni.` (fett, kleingeschrieben mit Punkt). Rechts die Ankerlinks „Über mich“ und „Projekte“ sowie der Sprachumschalter DE/EN.
2. **Hero (Split):** zweispaltig (`md:grid-cols-[1fr_1.15fr]`), vertikal zentriert, mindestens 75 % der Bildschirmhöhe. Auf Mobilgeräten untereinander, Text zuerst.
    - Links: Rolle (klein, Großbuchstaben, weit gesperrt), Begrüßung als `h1` („Hi! Ich bin Benni.“), Intro-Text. Darunter die Social Links (GitHub, LinkedIn, E-Mail als `mailto`) als dunkle Pillen mit `↗` und ein umrandeter Button „Projekte ↓“.
    - Rechts: der **Skill-Orbit** (siehe unten) mit Bennis Foto in der Mitte.
3. **Über mich:** oben eine Trennlinie. Zweispaltig: kleine Überschrift links (`1fr`), großer Fließtext rechts (`3fr`, `text-2xl`/`3xl`).
4. **Werdegang:** gleiches Raster. Vertikale Timeline mit Linie und Punkten. Jede Station zeigt Zeitraum, Rolle (fett), Organisation, Beschreibung und darunter ihre Technologien als Textzeile in Nebentextfarbe („TypeScript · React · Docker“). Ohne Enddatum steht „heute“.
5. **Projekte:** Überschrift „Projekte“ mit der Anzahl in Grau. Darunter das Bento-Raster (`md:grid-cols-4`, Zeilen mindestens `10rem`, Lücke `gap-4`). Das erste Projekt ist groß (2×2), danach wechseln breite und kleine Kacheln.
    - Kachel: Screenshot füllt die Fläche, darüber ein Verlauf von unten nach Schwarz. Unten stehen die Technologie-Chips, der Name, eine zweizeilige Beschreibung (beim Hover ganz) und die Buttons „Ansehen“ (weiß) und „GitHub“ (umrandet). Jeder Button erscheint nur, wenn der zugehörige Link existiert.
    - Hover: Das Bild zoomt leicht und wird dunkler.
6. **Footer:** Links zu den rechtlichen Seiten Impressum und Datenschutz. Sie haben eigene Routen (`/[lang]/impressum`, `/[lang]/datenschutz`) mit demselben Header und Footer und schlichtem Fließtext.

## Skill-Orbit

Das Kernelement des Designs. Die Logos der Skills kreisen auf **ovalen** Bahnen um das Foto. Das Oval wurde bewusst statt eines Kreises gewählt, damit der Hero nicht zu hoch wird.

- Container im Seitenverhältnis `6/5`. Gestrichelte Ellipsen (`stone-300`) zeigen die Bahnen.
- Drei Ringe, einer pro Gewichtung. Halbachsen in Prozent der Containerbreite bzw. -höhe:

    | Ring  | Gewichtung | rx / ry | Umlaufzeit        | Logogröße mobil / ab `md` |
    | ----- | ---------- | ------- | ----------------- | ------------------------- |
    | innen | 3          | 22 / 25 | 45 s              | `size-9` / `size-14`      |
    | mitte | 2          | 34 / 37 | 72 s, gegenläufig | `size-7` / `size-10`      |
    | außen | 1          | 46 / 47 | 99 s              | `size-5` / `size-8`       |

- Logos sitzen in weißen, abgerundeten Badges mit Schatten und bleiben beim Kreisen aufrecht.
- Hover oder Fokus auf ein Logo hält den Orbit an und zeigt den Namen als Tooltip.
- Bei `prefers-reduced-motion` steht der Orbit still.
- Technik: `requestAnimationFrame` setzt `left`/`top` direkt am DOM-Knoten. Die Startpositionen werden schon serverseitig gerendert, damit beim Laden nichts springt.
- Nur Technologien mit `isSkill` erscheinen im Orbit.
- Die **Gewichtung** eines Skills (1–3, siehe `GLOSSARY.md`) bestimmt seinen Ring und seine Logogröße.
- **Porträt:** Kreis mit 28 % der Containerbreite, weißer Rand (`ring-8`), Schatten. Das Foto kommt aus dem CMS. Bis es vorliegt, zeigt der Kreis einen Verlaufs-Platzhalter mit „b.“.

## Nächste Schritte

Siehe [`plan.md`](plan.md).
