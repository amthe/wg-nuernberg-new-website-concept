# WG Nürnberg Website v022 — CHANGES

**Version:** v022
**Datum:** 29. März 2026
**Autor:** Claude AI (via OpenClaw)

---

## Übersicht

Kompletter Neuaufbau der WG Nürnberg Website. Kein Code aus vorherigen Versionen übernommen.

---

## Neue Features in v022

### Verbessertes Galerie-Layout
- CSS-Columns-basiertes Masonry-Layout für dynamischere, Pinterest-artige Darstellung
- Responsive Spaltenanzahl (1 → 2 → 3 Spalten)

### Micro-Interactions
- Button Ripple-Effekt bei Klick
- Dezenter Card-Tilt bei Hover (1-2°)
- Smooth Counter-Animationen mit easeOutExpo

### Verbessertes Mobile-Erlebnis
- Bottom-Sheet-Style Mobile-Menü (gleitet von unten hoch)
- Touch-optimierte Kartenabstände
- Overlay mit Backdrop-Filter

### Verbesserte Typografie
- Letter-Spacing für Eyebrow-Texte
- Line-Clamping auf Card-Beschreibungen

### Animiertes FAQ
- Smooth Height-Transitions für Accordion (nicht nur display toggle)
- CSS max-height Animation mit overflow-hidden

### Verbesserter Dark Mode
- Sanftere Theme-Transitions (0.3s)
- Subtile Glow-Effekte auf Primary-Elementen im Dark Mode
- Bessere Bildanpassung (brightness + contrast)

### Performance
- loading="lazy" auf allen Below-Fold Bildern
- fetchpriority="high" auf Hero-Bild
- will-change sparsam eingesetzt
- Passive Event Listeners
- IntersectionObserver für Scroll-Reveal und Counter

---

## Erstellte Dateien

- `index.html` — Hauptseite mit allen 15 Sektionen
- `studenten-wg.html` — Studenten-WG Unterseite
- `mediziner-wg.html` — Mediziner-WG Unterseite
- `inklusive-wg.html` — Inklusive WG Unterseite
- `young-professionals-wg.html` — Young Professionals Unterseite
- `styles.css` — Komplettes Stylesheet mit Design System
- `main.js` — JavaScript für alle Interaktionen
- `favicon.svg` — SVG Favicon mit Gradient
- `robots.txt` — Crawler-Anweisungen
- `sitemap.xml` — XML Sitemap
- `CHANGES.md` — Dieses Changelog

---

## Design System Compliance

Alle Farben, Typografie, Spacing, Komponenten und Layout-Regeln aus dem verbindlichen Design System wurden eingehalten.

---

## Bekannte Limitierungen

- Kontaktformular ohne Backend (Frontend-only Prototyp)
- Karte als Placeholder-Bild
- 360° Touren Links als Placeholder
- Impressum/Datenschutz Seiten nicht erstellt
