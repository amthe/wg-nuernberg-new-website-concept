# Website-Konzept: www.wg-nuernberg.de (Neu)

## Vision

Die neue Website richtet sich an **alle WG-Bewohner** – nicht nur Studenten, sondern auch Azubis, Pflegekräfte, medizinisches Personal (medizinische WGs), Berufseinsteiger, internationale Fachkräfte, Senioren, inklusive WGs und alle anderen, die in einer WG leben wollen.

### Technik

- **Framework:** Nuxt (Static Site Generation) mit Vue
- **Design:** Mobile First, Responsive Webdesign — absolut optimiert für Mobiltelefone
- **Tracking:** Google Analytics 4 mit Goal Tracking (Anfrage gesendet, WhatsApp-Click, Besichtigung gebucht) + dedizierte Landing Pages pro Kampagne/Zielgruppe
- **Barrierefreiheit:** WCAG 2.1 AA konform (Screenreader, Tastaturnavigation, Kontraste, Alt-Texte)
- **Performance:** Optimiert für Core Web Vitals (WebP/AVIF, Lazy Loading, CDN-Hosting)

### Qualitäts-Checks (muss bestehen / hohe Scores)

| Tool | Ziel | Was es prüft |
|------|------|-------------|
| [Google Lighthouse](https://pagespeed.web.dev/) | 90+ in allen Kategorien | Performance, Accessibility, Best Practices, SEO |
| [WAVE](https://wave.webaim.org/) | 0 Errors | Barrierefreiheit (WCAG) |
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Bestanden | Structured Data (Schema.org) |

### Design-Richtung

Modern, Gen-Z-tauglich. Kein Corporate-Look, kein 2015-Bootstrap-Gefühl. Orientierung an dem was junge Leute aktuell gewohnt sind:

- **Bold Typography** — große, selbstbewusste Schriften
- **Scroll-Storytelling** — die Seite erzählt eine Geschichte beim Scrollen
- **Echte Fotos/Videos** statt Stock — Authentizität schlägt Hochglanz
- **Micro-Interactions** — subtile Animationen, Hover-Effekte, Feedback
- **Viel Whitespace** — clean, nicht überladen
- **Dark Mode Option** — erwartet die Generation mittlerweile
- **TikTok/Reels-Ästhetik** — kurze Video-Clips, vertikales Format auf Mobile
- **Kein Cookie-Banner-Horror** — so minimal wie rechtlich möglich

Referenzen/Inspiration: Apps wie Airbnb, WG-Gesucht (aber besser), The Student Hotel

### Seitenstruktur (Konzept)

1. **Hero: Video** — Als allererstes sieht man ein Video (Platzhalter bis das echte Video fertig ist)
2. **Überblick: Kurz & knapp** — Die wichtigsten Infos kompakt, wie in Christinas Ideen
3. **Tiefe: Ausführlicher Content** — Die Seite kann in die Tiefe gehen über:
   - Unterseiten / Links zu Detail-Infos
   - Ggf. PDFs (z.B. WG-Übersichten, Preislisten, Infos für Arbeitgeber)
   - FAQ, Erfahrungsberichte, Bildergalerien etc.

## Dateien

| Datei | Beschreibung | Datum |
|-------|-------------|-------|
| `christinas-ideen.html` | Christinas Ideen für Struktur, Texte und Inhalte | 2026-03-06 |

### Assets

- **Bilder:** Aus der Legacy-Website übernehmen (`data/wg-nuernberg-legacy/`)
- **Video:** Platzhalter — echtes Video wird noch produziert

## Notizen

- Legacy-Website liegt in `data/wg-nuernberg-legacy/`
- Website-Crawl vom 06.03.2026: `data/wg-nuernberg-legacy/website-crawl-2026-03-06.toon`
