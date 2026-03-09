# WG Nürnberg Website v012

**Version:** 012
**Datum:** 2025-03-08
**Fokus:** Cookie Consent Details + Performance + Responsive Polish

---

## Was ist neu in v012

### 1. Cookie Consent mit Details-Dialog (DSGVO-konform)

- **Minimaler Banner** am unteren Bildschirmrand
  - "Wir verwenden Cookies" Text mit Link zu mehr Infos
  - "Alle akzeptieren" Button (Primary)
  - "Einstellungen" Button (Ghost)

- **Details-Dialog** (Modal) mit:
  - Drei Kategorien: Notwendig (immer an), Analyse (opt-in), Marketing (opt-in)
  - Jede Kategorie zeigt: Beschreibung, welche Cookies, Toggle
  - "Auswahl speichern" + "Alle akzeptieren" Buttons
  - Smooth Animation beim Öffnen/Schließen
  - Schließen per X-Button, Escape-Taste oder Backdrop-Klick

- **localStorage:** `wgn-cookies` speichert die Einwilligung als JSON

### 2. Performance-Optimierungen

- **CSS:**
  - Alle Custom Properties (Design Tokens) am Anfang der Datei
  - Minimale Spezifität durch flache Selektoren
  - Keine !important außer für Print-Styles

- **Fonts:**
  - `font-display: swap` für Inter (Google Fonts)
  - Preconnect zu fonts.googleapis.com und fonts.gstatic.com

- **Bilder:**
  - `loading="lazy"` für alle Bilder außer Hero
  - `width` und `height` Attribute für CLS-Vermeidung
  - Unsplash CDN mit optimierten Bildgrößen (?w=400, ?w=800, ?w=1920)

- **JavaScript:**
  - Throttling für Scroll-Handler
  - `requestAnimationFrame` für Scroll-Progress-Bar
  - `IntersectionObserver` für Scroll-Reveal-Animationen
  - `IntersectionObserver` für Counter-Animationen
  - Passive Event Listeners für Touch-Events
  - IIFE-Pattern für sauberen Namespace

### 3. Responsive Polish

- **Tablet-Layouts (640-1024px):**
  - Gallery-Grid: 3 Spalten auf Tablet
  - FAQ: volle Breite auf allen Geräten
  - Kontakt-Grid: sauberes 2-Spalten-Layout
  - Tour-Cards: 2 Spalten auf Tablet, 4 auf Desktop

- **Mobile Navigation:**
  - Slide-in von rechts
  - Alle Links sichtbar und klickbar
  - CTA am Ende der Liste
  - Scroll-Lock wenn geöffnet

### 4. Design System (strikt eingehalten)

- **Farben:** Primary #10B981, Accent #0EA5E9, Gradient nur für Hero-Text und Scroll-Progress
- **Typografie:** Inter, exakte Größen laut Vorgabe
- **Abstände:** 8px-Grid durchgehend
- **Komponenten:** Einheitliche Karten, Buttons, Badges
- **Dark Mode:** Vollständig implementiert mit SVG-Toggle

---

## Dateistruktur

```
v012/
├── index.html              # Hauptseite mit 15 Sektionen
├── studenten-wg.html       # Unterseite Studenten-WG
├── mediziner-wg.html       # Unterseite Mediziner-WG
├── inklusive-wg.html       # Unterseite Inklusive WG
├── senioren-wg.html        # Unterseite Senioren-WG (Sie-Anrede)
├── styles.css              # Hauptstylesheet mit Design System
├── scripts.js              # JavaScript (Cookie Consent, Animationen, etc.)
├── favicon.svg             # SVG Favicon (Primary Color)
├── robots.txt              # Suchmaschinen-Anweisungen
├── sitemap.xml             # XML Sitemap für SEO
├── CHANGES.md              # Diese Datei
└── assets/
    └── logos/
        ├── wg-nuernberg-grey-optimized.svg
        └── wg-nuernberg-vertical-grey-optimized.svg
```

---

## Sektionen auf index.html

1. **Header** (fixed) — Logo, Nav, CTA, Dark Mode Toggle (SVG), Hamburger
2. **Hero** (100vh) — Stock Photo, Badge, H1 mit Gradient, 2 CTAs, Video-Placeholder
3. **Über uns** — 2-Spalten, 4 Stat-Counter mit Animation
4. **Lage** — OpenStreetMap, Entfernungen in 3 Kategorien
5. **Freie Zimmer** — 4 Beispiel-Karten, Tägliche Aktualisierung
6. **Vorteile** — 6 Feature-Karten
7. **So geht's** — 3 Schritte, Schritt 2 betont "Keine Besichtigung"
8. **Keine Besichtigung** — 3 Alternativen (360° Tour, Fotos, Video-Call)
9. **360° Touren** — 4 Tour-Karten mit Hover-Effekt
10. **Bewertungen** — 3 Testimonials mit Sternen
11. **Galerie** — Filter-Buttons, Grid, Lightbox mit Keyboard/Touch
12. **WG-Typen** — 4 Karten mit Links zu Unterseiten
13. **Kontakt** — Info-Spalte + Formular
14. **FAQ** — 19 Fragen, Accordion, erste Frage offen
15. **Footer** — 4-Spalten, Social, Legal

---

## Schema.org Structured Data

- **LocalBusiness** — Name, Adresse, Kontakt, Rating
- **FAQPage** — Erste 3 Fragen für Rich Snippets
- **BreadcrumbList** — Navigation für Suchmaschinen
- **Offer** — WG-Zimmer Angebot
- **AggregateRating** — 4.8 Sterne, 127 Bewertungen

---

## Accessibility (A11y)

- Skip-Link zum Hauptinhalt
- ARIA-Labels für alle interaktiven Elemente
- Keyboard-Navigation für Lightbox (Escape, Arrow Keys)
- `prefers-reduced-motion` respektiert
- Kontrastreiche Farben (WCAG AA)
- Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<article>`, etc.)
- Fokus-Styles für alle interaktiven Elemente

---

## Bekannte Einschränkungen (Prototyp)

1. **Video-Player:** Play-Button zeigt nur Alert (Video kommt später)
2. **Kontaktformular:** Sendet nicht wirklich, zeigt nur Bestätigung
3. **360° Touren:** Links führen zu # (Platzhalter)
4. **Bilder:** Unsplash CDN (für Produktiv ersetzen)
5. **Karte:** OpenStreetMap Embed (für Produktiv: eigene Lösung)

---

## Browser-Unterstützung

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- iOS Safari 14+
- Samsung Internet 15+

---

## Migration von v011

Diese Version wurde **komplett neu aufgebaut**, nicht kopiert. Alle Komponenten folgen dem Design System und wurden von Grund auf erstellt.

**Wichtige Änderungen:**
- Cookie Consent mit Details-Dialog (neu)
- Verbesserte Performance durch IntersectionObserver
- Sauberere CSS-Struktur mit Design Tokens
- Responsive Polish besonders für Tablet-Größen
