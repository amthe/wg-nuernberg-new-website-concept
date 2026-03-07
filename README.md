# Website Concept: www.wg-nuernberg.de (New)

## 🔗 Live-Vorschau

| Version | Link |
|---------|------|
| **Übersicht** | [amthe.github.io/wg-nuernberg-new-website-concept](https://amthe.github.io/wg-nuernberg-new-website-concept/) |
| **V2 (aktuell)** | [Version 2 ansehen](https://amthe.github.io/wg-nuernberg-new-website-concept/versions/v002/) |
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
- **Scroll Storytelling** — the page tells a story as you scroll
- **Hero-Bild:** Ein passendes **Stock Photo mit fröhlichen Studenten** — zeigt das WG-Lebensgefühl, Gemeinschaft, gute Laune. Bis eigene Fotos/Videos produziert werden, ist ein hochwertiges Stock Photo die beste Option.
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

## Notes

- Legacy website lives in `data/wg-nuernberg-legacy/`
- Website crawl from 2026-03-06: `data/wg-nuernberg-legacy/website-crawl-2026-03-06.toon`
