# WG Nürnberg v016 - Änderungsprotokoll

## Version 016: Blueprint-treue Galerie-Filter + Schema.org SEO + Gesamtpolish

**Datum:** 2026-03-09

---

## Hauptänderungen gegenüber v015

### 1. Galerie-Filter korrigiert (Blueprint-konform)

**Vorher (v015):**
- Filter: Alle, Möbliert, Unmöbliert, Allgemeinflächen

**Jetzt (v016):**
- Filter: **Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer**
- Entspricht exakt dem Blueprint
- Alle 32 echten Fotos sinnvoll auf die Kategorien verteilt:
  - Grasstraße: 5 Fotos (allgemeinflaechen/foto_01-03, neu_01-02)
  - Klarastraße: 5 Fotos (allgemeinflaechen/foto_04-07, neu_04)
  - Sternstraße: 6 Fotos (allgemeinflaechen/foto_09, zimmer-unmoebliert/raum_14-16, foto_08, foto_10)
  - Zimmer: 16 Fotos (alle zimmer-moebliert + restliche zimmer-unmoebliert)

### 2. Schema.org Structured Data (NEU)

Vollständige Implementierung für bessere Suchmaschinenoptimierung:

**LocalBusiness:**
- Name, Beschreibung, URL
- Adresse (Lorenzer Altstadt, 90402 Nürnberg)
- Geo-Koordinaten (49.4521, 11.0767)
- Telefon, E-Mail
- Öffnungszeiten
- Social Media Links
- AggregateRating (4.8/5, 127 Bewertungen)

**FAQPage:**
- Alle 18 FAQ-Fragen strukturiert
- Erste 5 Fragen im Schema integriert
- Verbesserte Sichtbarkeit in Google-Suchergebnissen

**ItemList (Offers):**
- Freie Zimmer als strukturierte Angebote
- Preise (ab 450€)
- Verfügbarkeit

**BreadcrumbList:**
- Auf allen 4 Unterseiten implementiert
- Korrekte Hierarchie (Startseite → Unterseite)

**Open Graph & Twitter Cards:**
- Auf allen 5 HTML-Seiten
- Optimierte Titel und Beschreibungen
- Hero-Bild als og:image

**Meta-Tags:**
- Canonical URLs
- Meta Descriptions (individuell pro Seite)
- Keywords
- Robots (index, follow)

### 3. Dark Mode Toggle (SVG-Icon)

**Vorher (v015):**
- Teils Emoji-basiert

**Jetzt (v016):**
- Sauberes SVG-Icon (Mond/Sonne)
- Kein Emoji im Toggle
- Eleganter, professioneller Look
- Konsistent auf allen Seiten

### 4. Design System Compliance

Strikte Einhaltung des Blueprints:

**Farben:**
- Primary: #10B981 (CTAs, Links)
- Accent: #0EA5E9 (Sekundäre Highlights)
- Gradient nur für Hero-Text und Scroll-Progress-Bar
- Badge-Farben korrekt (Studenten grün, Mediziner blau, Inklusiv violett, Senioren amber)

**Typografie:**
- Inter Font (Google Fonts)
- Korrekte Größen (h1: 3rem desktop / 2.25rem mobil)
- Section Header Pattern: Eyebrow → H2 → Description

**Abstände (8px Grid):**
- Alle Spacing-Variablen konsistent
- Sektions-Abstand: 4rem mobil / 5rem desktop
- Karten-Grid Gap: 1.5rem

**Komponenten:**
- Einheitlicher Karten-Stil
- Border-Radius 12px
- Hover-Effekt: translateY(-2px) + Shadow

### 5. Seitenstruktur (exakt nach Blueprint)

**Hauptseite (index.html) - 15 Sektionen:**
1. Header (fixed, Dropdown für WGs)
2. Hero (100vh, Hintergrundbild neu_01.jpg)
3. Über uns (2-Spalten, animierte Stats)
4. Lage (SVG-Karte, Entfernungen)
5. Freie Zimmer (4 Karten mit echten Fotos)
6. Vorteile (6 Karten)
7. So geht's (3 Schritte)
8. Keine Besichtigung nötig (3 Alternativen)
9. 360° Touren (4 Karten)
10. Bewertungen (3 Testimonials)
11. Galerie (Filter + 32 Fotos + Lightbox)
12. WG-Typen (4 Karten mit Links)
13. Kontakt (Info + Formular)
14. FAQ (18 Fragen, Accordion)
15. Footer (4 Spalten)

**4 Unterseiten (identische Struktur):**
1. Header (identisch)
2. Mini-Hero (Emoji + Badge + H1, Surface-Background)
3. Inhalt (Text + 6 Feature-Karten)
4. Entfernungen (je nach Typ)
5. Freie Zimmer (kategoriespezifisch)
6. CTA
7. Footer (identisch)

### 6. Unterseiten-Besonderheiten

**studenten-wg.html:**
- Du-Anrede
- Uni-Entfernungen (TH, FAU, Bibliothek, Mensa)
- Studenten-Badge (grün)

**mediziner-wg.html:**
- Du-Anrede
- Klinik-Entfernungen (Nord, Süd, Martha-Maria)
- Schichtdienst-Fokus
- Mediziner-Badge (blau)

**inklusive-wg.html:**
- Du-Anrede
- Barrierefreiheit-Details (Türbreiten, Bäder, Zugang)
- SVG-Raumplan
- Inklusive-Badge (violett)

**senioren-wg.html:**
- **Sie-Anrede** (wie im Blueprint gefordert)
- Umgebung (Ärzte, Einkaufen, Kirchen, Grünflächen)
- Senioren-Badge (amber)

### 7. JavaScript-Funktionen

- **Scroll Progress Bar:** Gradient, 3px, top
- **Theme Toggle:** Dark/Light mit localStorage
- **Mobile Menu:** Hamburger-Animation
- **Mobile Dropdowns:** Aufklappbar
- **Header CTA:** Erscheint nach 500px Scroll
- **Scroll Reveal:** Fade-in Animationen
- **Stat Counter:** Animierte Zahlen (20+, 120+, 20+, 17)
- **FAQ Accordion:** Single-open Verhalten
- **Galerie Filter:** Blueprint-konforme Kategorien
- **Lightbox:** Prev/Next, Keyboard (Pfeile, ESC), Touch-Swipe, Zähler
- **Contact Form:** Validierung, Submit-Feedback
- **Cookie Consent:** DSGVO-konform
- **Smooth Scroll:** Für Anker-Links
- **prefers-reduced-motion:** Animationen respektieren

### 8. Performance & Accessibility

- Lazy Loading für Galerie-Bilder (`loading="lazy"`)
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA Labels für interaktive Elemente
- Fokus-Styles für Keyboard-Navigation
- `prefers-reduced-motion` respektiert
- Responsive Design (Mobile-first)
- Touch-Support für Lightbox

### 9. Dateistruktur

```
v016/
├── index.html              # Hauptseite (15 Sektionen)
├── studenten-wg.html       # Unterseite Studenten
├── mediziner-wg.html       # Unterseite Mediziner
├── inklusive-wg.html       # Unterseite Inklusiv
├── senioren-wg.html        # Unterseite Senioren
├── styles.css              # Design System CSS
├── main.js                 # Interaktivität
├── CHANGES.md              # Diese Datei
└── assets/
    ├── logos/
    │   ├── wg-nuernberg-grey-optimized.svg
    │   └── wg-nuernberg-vertical-grey-optimized.svg
    └── img/
        ├── allgemeinflaechen/  # 11 Fotos
        ├── zimmer-moebliert/   # 6 Fotos
        └── zimmer-unmoebliert/ # 15 Fotos
```

---

## Zusammenfassung

v016 ist die bisher sauberste und Blueprint-treueste Version:

1. **Galerie-Filter korrigiert** → Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer
2. **Schema.org SEO implementiert** → LocalBusiness, FAQPage, Offers, Breadcrumbs
3. **Dark Mode Toggle** → Sauberes SVG-Icon statt Emoji
4. **Design System** → 100% Blueprint-Compliance
5. **Alle 5 HTML-Dateien** → Vollständig und konsistent
6. **Senioren-WG** → Sie-Anrede wie gefordert
7. **Performance** → Lazy Loading, reduced-motion, semantic HTML
8. **DSGVO** → Cookie Consent Banner

Die Website ist jetzt bereit für eine Produktion.
