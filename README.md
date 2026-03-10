# Website Concept: www.wg-nuernberg.de (New)

## 🔗 Live-Vorschau

| Version | Link |
|---------|------|
| **Übersicht** | [amthe.github.io/wg-nuernberg-new-website-concept](https://amthe.github.io/wg-nuernberg-new-website-concept/) |
| **V18 (aktuell)** | [Version 18 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v018/) |
| V17 | [Version 17 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v017/) |
| V16 | [Version 16 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v016/) |
| V15 | [Version 15 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v015/) |
| V14 | [Version 14 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v014/) |
| V13 | [Version 13 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v013/) |
| V12 | [Version 12 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v012/) |
| V11 | [Version 11 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v011/) |
| V10 | [Version 10 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v010/) |
| V9 | [Version 9 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v009/) |
| V8 | [Version 8 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v008/) |
| V7 | [Version 7 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v007/) |
| V6 | [Version 6 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v006/) |
| V5 | [Version 5 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v005/) |
| V4 | [Version 4 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v004/) |
| V3 | [Version 3 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v003/) |
| V2 | [Version 2 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v002/) |
| V1 | [Version 1 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v001/) |

---

## Vision

The new website targets **all shared living residents** — not just students, but also nurses, medical staff (medical shared flats), trainees, international professionals, seniors, inclusive shared living, and everyone who wants to live in a shared flat.

### Tech

- **Framework:** Nuxt (Static Site Generation) with Vue
- **Design:** Mobile First, Responsive — absolutely optimized for phones
- **Tracking:** Google Analytics 4 with Goal Tracking (inquiry sent, WhatsApp click, viewing booked) + dedicated landing pages per campaign/target group
- **Accessibility:** WCAG 2.1 AA compliant (screen readers, keyboard nav, contrast, alt texts)
- **Performance:** Optimized for Core Web Vitals (WebP/AVIF, lazy loading, CDN hosting)

### Quality Checks (must pass / high scores)

| Tool | Target | What it checks |
|------|--------|----------------|
| [Google Lighthouse](https://pagespeed.web.dev/) | 90+ all categories | Performance, Accessibility, Best Practices, SEO |
| [WAVE](https://wave.webaim.org/) | 0 Errors | Accessibility (WCAG) |
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Pass | Structured Data (Schema.org) |

**Prozess:** Diese Tools werden nach **jeder neuen Version** ausgeführt. Ergebnisse werden in der jeweiligen `CHANGES.md` dokumentiert. Gefundene Probleme werden unten im Abschnitt "Known Issues / Next Fixes" eingetragen und in der nächsten Version behoben.

**Konzept-Archivierung:** Zu jeder Version werden die zugehörigen Konzept-Dateien (README.md, design-system.md, page-blueprint.md etc.) als Snapshot im Versionsordner abgespeichert (`versions/vXXX/concept/`). So ist immer nachvollziehbar, welches Konzept zu welcher Version gehört.

### Design Direction

Modern, Gen-Z friendly. No 2015-Bootstrap feel. Aligned with what young people expect today.

**Logo:** Use the grey logo variants from `data/wg-nuernberg-legacy/__dev/logos/` (wg-nuernberg-grey-optimized.svg, wg-nuernberg-vertical-grey-optimized.svg). No color logo — grey is more neutral and gives room to the new color scheme.

**Colors — NEW concept (replaces the old magenta/blue from the logo):**
- The color palette should feel **fresh, hopeful, and modern**
- Primary: A modern **green tone** (fresh, new beginnings, nature) + a modern **blue tone** (trust, clarity)
- Background: **White** — bright, open, inviting
- Text: Dark grey / near-black for readability
- No magenta, no pink — that was the old palette
- Specific hex values to be defined in prototype, direction: something between mint/teal + sky/ocean
- Inspiration: Spring, new beginnings, "this is where your new life starts"

- **Bold Typography** — large, confident fonts
- **Aus einem Guss** — EIN Design-System, EIN Karten-Stil, konsistente Abstände. Siehe `design-system.md` und `page-blueprint.md`
- **Dark Mode Toggle** — im Header, manuell umschaltbar. **Minimal und elegant** — ein kleiner, schöner Toggle-Switch oder Icon-Button. Keine Emojis (kein ☀️/🌙), sondern ein sauberes SVG-Icon (z.B. dünne Sonne/Mond-Linie oder ein einfacher Kreis-Switch). Smooth CSS-Transition beim Umschalten. Weniger ist mehr.
- **Scroll Storytelling** — the page tells a story as you scroll
- **Hero = Video (erstes was man sieht!)** — Das allererste Element auf der Seite ist ein **Video**. Fullwidth, prominent, sofort sichtbar. Das Video wird später produziert und hinzugefügt — bis dahin ein ansprechender Video-Placeholder (z.B. helles Standbild mit Play-Button-Overlay oder eine dezente Animation). **KEIN dunkles Hero** — hell, einladend, freundlich. Helle Farben, viel Licht, positive Stimmung.
- **Stock Photo als Fallback:** Bis das Video fertig ist, ein hochwertiges Stock Photo mit fröhlichen Studenten — zeigt WG-Lebensgefühl, Gemeinschaft, gute Laune. **Kein dunkler Hintergrund, kein moody Filter.**
- **Real photos/videos** where available — authenticity beats glossy. Stock photos as bridge until own content is produced.
- **Micro-Interactions** — subtle animations, hover effects, feedback
- **Lots of whitespace** — clean, not cluttered
- **Dark Mode Option** — expected by this generation
- **TikTok/Reels aesthetic** — short video clips, vertical format on mobile
- **Minimal cookie banner** — as lean as legally possible

References/Inspiration: Apps like Airbnb, WG-Gesucht (but better), The Student Hotel

### Page Structure (Concept)

1. **Hero: Video** — First thing you see is a video (placeholder until real video is produced)
2. **Overview: Short & sweet** — Key info at a glance, based on Christina's ideas
3. **Shared Flat Sections** — The website has a general shared living section plus target-group-specific subpages/sections:

#### General (WG Nürnberg)
- What WG Nürnberg is, how it works, benefits, prices, FAQ, contact
- Relevant for all target groups

#### Student Shared Flat
- Travel times to all universities (TH, FAU WiSo, EVHN, Music Academy, Design OHM, FAU Erlangen)
- Semester start info, move-in dates
- Student life in Nuremberg

#### Medical Shared Flat
- Proximity to clinics/hospitals (Klinikum Nürnberg, etc.)
- Relevant for nurses, trainee doctors, medical staff
- Shift work compatibility (quiet flats, flexible move-in dates)
- What medical staff cares about most: short commutes, quiet living, uncomplicated contracts

#### Inclusive Shared Flat
- Accessible rooms / flats (where available)
- Concept: diverse people living together
- What makes this offering special

#### Senior Shared Flat
- Community instead of loneliness
- Quieter flats, central location (short walks, everything on foot)
- Accessible options (where available)
- **Different tone of voice:** Seniors need to be addressed differently than students — more formal (Sie instead of Du), reassuring, emphasizing safety, reliability, and personal contact. Less hip, more warm and trustworthy.

Each section has its own tailored content — but all share the same foundation (prices, contact, FAQ).

4. **Besichtigung — optional, nicht Pflicht**
   - Klar kommunizieren: **Eine Besichtigung ist NICHT nötig.** Man kann sich direkt anmelden und einziehen — ganz ohne Besichtigung.
   - Das ist kein Sonderfall für Internationale, sondern **der Normalfall für alle**.
   - Operativer Hintergrund: Bei 112 Zimmern wäre es nicht machbar, jedem eine Besichtigung anzubieten. Der Prozess ist: Anmelden → Einziehen.
   - Wer sich trotzdem einen Eindruck verschaffen will:
     - **360° Virtuelle Tour** — bequem von zuhause, jederzeit
     - **Fotos & Grundrisse** auf der Website
   - Die Legacy-Website hat bereits 360°-Touren:
     - `wg-gras-11-1`, `wg-gras-11-2` (Grasstraße 11)
     - `wg-gras-15-1` (Grasstraße 15)
     - `wg-gras-21-2` (Grasstraße 21)

5. **Freie Zimmer**
   - Eigener, prominenter Bereich auf der Website für **aktuell verfügbare Zimmer**
   - Inspiration: Legacy-Website zeigt freie Zimmer mit Belegungsstatus (siehe `data/wg-nuernberg-legacy/`, `_data/freie-zimmer.yml`, `zimmer.json`)
   - **Aktualisierung:** Einmal täglich um 08:00 Uhr
   - **Anzeige pro Kategorie:** Freie Zimmer werden in jeder Zielgruppen-Sektion angezeigt (Studenten, Mediziner, Senioren, Inklusive WG)
   - **Flexible Zuordnung:** Jedes Zimmer kann jeder Kategorie zugeordnet werden. Ein Mitarbeiter entscheidet, in welchem Bereich ein Zimmer erscheint. Ein Senioren-WG-Zimmer kann zum Studenten-WG-Zimmer werden und umgekehrt — alle Zimmer sind flexibel umwidmbar.
   - Technisch: CMS/Backend muss es einem Mitarbeiter ermöglichen, Zimmer einfach zwischen Kategorien zu verschieben

5. **Depth: Detailed content** — The site can go deeper via:
   - Subpages / links to detailed info
   - PDFs where useful (e.g. flat overviews, price lists, info for employers)
   - FAQ, testimonials, photo galleries, etc.

## Files

| File | Description | Date |
|------|-------------|------|
| `christinas-ideen.html` | Christina's ideas for structure, copy and content | 2026-03-06 |
| `christinas-ideen-stichpunkte.md` | Key ideas extracted as bullet points (no code) | 2026-03-06 |

### Assets

#### 🆕 Eigene Fotos (Dev-Originale)

Quellmaterial in `data/wg-nuernberg/dev/Bilder-2/` — 32 JPGs in Originalauflösung.

| Kategorie | Anzahl | Pfad |
|-----------|--------|------|
| Zimmer unmöbliert | 15 | `Bilder-2/Zimmer unmöbliert/` (raum_01–16, foto_08/10/13) |
| Zimmer möbliert | 6 | `Bilder-2/Zimmer möbliert/` (zimmer_01–06) |
| Allgemeinflächen | 11 | `Bilder-2/Allgemeinflächen/` (foto_01–09, neu_01/02/04) |

**Status:** Dev-Originale (unkomprimiert). Website-Versionen verwenden vorerst die Dev-Bilder direkt. Web-optimierte Versionen (Resize, WebP/AVIF, Thumbnails) stehen noch aus — siehe Open TODOs.

- **Hero Stock Photo:** Ein hochwertiges Stock Photo mit fröhlichen Studenten in WG-Atmosphäre (Unsplash, Pexels o.ä.)
- **WG-Bilder aus Legacy-Website** (`data/wg-nuernberg-legacy/assets/img/`):
  - `wg-gras-11-1/` bis `wg-gras-11-3/` — Grasstraße 11 (3 WGs)
  - `wg-gras-15-1/` bis `wg-gras-15-3/` — Grasstraße 15 (3 WGs)
  - `wg-gras-21-0/` bis `wg-gras-21-3/` — Grasstraße 21 (4 WGs)
  - `wg-klara-2/` bis `wg-klara-4/` — Klarastraße (3 WGs)
  - `wg-stern-1/` bis `wg-stern-4/` — Sternstraße (4 WGs)
  - Jeder Ordner enthält: `allgemein/` (Fotos) + `grundrisse/` (Grundrisse 2D/3D)
  - `wg-map.svg` — Karte der WG-Standorte
- **360° Touren** (`data/wg-nuernberg-legacy/assets/tour/`):
  - `wg-gras-11-1/`, `wg-gras-11-2/`, `wg-gras-15-1/`, `wg-gras-21-2/`
- **Video:** Placeholder — real video still to be produced

## Open TODOs

- [ ] **Komprimierte Bilder:** Ben liefert die web-optimierten Versionen der 32 Fotos separat. Bis dahin: Dev-Originale aus `data/wg-nuernberg/dev/Bilder-2/` verwenden.
- [ ] **Web-Bilder in Website einbauen:** Sobald die komprimierten Versionen geliefert sind, in die nächste Website-Version einbauen (Galerie, Zimmer-Karten, Allgemeinflächen).

## Known Issues / Next Fixes

*Hier werden Probleme aus den Quality Checks eingetragen, die in der nächsten Version behoben werden sollen.*

- ~~**Navigation: "Unsere WGs"-Dropdown im Header** — behoben in v014~~

## Versionshistorie

Siehe auch [CHANGELOG.md](CHANGELOG.md) für Details.

| Version | Datum | Fokus | Änderungen |
|---------|-------|-------|------------|
| **v016** | 2026-03-09 | **Blueprint-treue Galerie-Filter + Schema.org SEO** | Galerie-Filter korrigiert (Alle/Grasstraße/Klarastraße/Sternstraße/Zimmer), vollständiges Schema.org Structured Data, SVG Dark Mode Toggle, alle 32 echten Fotos |
| v015 | 2026-03-09 | Echte WG-Fotos | 32 echte Fotos aus Bilder-2 in Hero, Galerie, Zimmer-Karten, Tour-Karten |
| v014 | 2026-03-09 | "Unsere WGs" Dropdown-Nav im Header | Desktop Hover-Dropdown + Mobile aufklappbar im Hamburger, farbcodierte Badges, von Grund auf neu gebaut |
| v013 | 2026-03-09 | Full Rebuild + Dark Mode Polish | Komplett neu gebaut, aber WG-Dropdown fehlte noch |
| **v012** | 2026-03-08 | **Cookie Consent Details + Performance + Responsive Polish** | DSGVO-konformer Cookie Consent mit Details-Dialog (3 Kategorien), Performance-Optimierungen (IntersectionObserver, rAF, lazy loading), Tablet-Responsive-Polish |
| v011 | 2026-03-08 | Video Hero Placeholder & Mobile-First Polish | Video-Play-Button im Hero, Parallax entfernt (Blueprint-konform), SVG Dark Mode Toggle, helles einladendes Hero-Design |
| v010 | 2026-03-08 | Scroll Storytelling | IntersectionObserver Animations, Animated Stat Counters, Parallax Hero, Scroll Progress |
| **v009** | 2026-03-08 | **SVG Dark Mode Toggle + Micro-Interactions** | SVG Icons statt Emoji (☀️/🌙), Smooth Theme Transitions, Button Click-Feedback, Card Glow-Effekt, helles Hero-Bild |
| v008 | 2026-03-08 | Cookie Consent & Form Validation | DSGVO-konformer Cookie Banner, Client-Validierung, Back-to-Top, Print-Stylesheet |
| v007 | 2026-03-07 | Schema.org & SEO | Structured Data (LocalBusiness, FAQPage, Reviews, Offers, Breadcrumbs), Open Graph, Twitter Cards, Favicon, robots.txt, sitemap.xml, Canonical URLs, Meta Descriptions |
| v006 | 2026-03-07 | Performance & Accessibility | Lighthouse-optimiert, WAVE-konform, Skip Link, ARIA, Lazy Loading, preconnect, rAF |
| v005 | 2026-03-07 | Design-Perfektion | Design System strikt umgesetzt, Scroll-Progress-Bar, Senioren mit Sie-Anrede, einheitliche Karten |
| | | **⬆️ Ab hier: From-Scratch-Ansatz** | **Jede Version wird komplett neu aus dem Konzept (README + Design System + Blueprint) gebaut. Zwischen v004→v005 ging dabei Inhalt verloren, der in v001–v004 inkrementell aufgebaut wurde.** |
| | | **⬇️ Bis hier: Inkrementell** | **v001–v004 wurden aufeinander aufgebaut — Features wurden Schritt für Schritt ergänzt.** |
| v004 | 2026-03-07 | Konzept-Features | Stock Photo Hero, Freie Zimmer, 360° Touren, Besichtigung optional, Header=Footer |
| v003 | 2026-03-06 | Foto-Galerie | Echte WG-Fotos, Lightbox, Standort-Karte (SVG) |
| v002 | 2026-03-06 | Redesign | Neues Farbkonzept (Mint-Grün + Sky-Blue), Dark Mode, alle Unterseiten, Schema.org |
| v001 | 2026-03-06 | Erster Prototyp | Grundstruktur — Farben waren falsch (schwarz/orange → v002) |

## Notes

- Legacy website lives in `data/wg-nuernberg-legacy/`
- Website crawl from 2026-03-06: `data/wg-nuernberg-legacy/website-crawl-2026-03-06.toon`
