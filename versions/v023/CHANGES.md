# WG Nürnberg Website v023 — CHANGES

**Version:** v023
**Datum:** 31. März 2026
**Autor:** Claude AI (via OpenClaw)

---

## Übersicht

Kompletter Neuaufbau der WG Nürnberg Website. Kein Code aus vorherigen Versionen übernommen.

---

## Neue Features in v023

### Animated Gradient Hero Text
- Subtiler animierter Gradient auf dem Hero-H1 (CSS `background-clip: text` mit `@keyframes`)
- Nicht ablenkend, lebendig wirkend

### Stagger Animations
- Karten und Elemente erscheinen mit gestaffelten Delays via CSS Custom Property `--reveal-delay`
- Natürlicherer Aufbau statt gleichzeitigem Einblenden aller Elemente

### Verbesserter Lightbox
- Swipe-Gesten (Touch) für Prev/Next
- Keyboard-Navigation (Pfeiltasten, Escape)
- Zoom-Fähigkeit per Klick/Pinch

### Skeleton Loading States
- CSS-Skeleton-Placeholder für Bilder während des Ladens
- Blur-Up-Effekt: Skeleton → Bild fade-in

### Scroll-Linked Header
- Header wird kompakter und erhält stärkeren Backdrop-Filter beim Scrollen
- Sanfter Shrink-Effekt mit CSS-Transition

### Verbesserte Mobile Navigation
- Slide-In von rechts (statt Bottom-Sheet)
- Backdrop-Blur Overlay
- Aufklappbare WG-Gruppen im Mobile-Menü

### Counter Animation
- Smooth Counting-Animation bei Scroll in den Sichtbereich
- IntersectionObserver-basiert, easeOutExpo Kurve

### Image Hover Effects
- Dezenter Scale + Overlay auf Galerie-Bildern
- Smooth Transition bei Hover

### CSS View Transitions API
- `<meta name="view-transition" content="same-origin">` für sanfte Seitenübergänge
- Progressive Enhancement (nur in unterstützten Browsern aktiv)

### Performance
- `loading="lazy"` auf allen Below-Fold-Bildern
- `fetchpriority="high"` auf Hero-Bild
- Passive Event Listeners
- `will-change` sparsam eingesetzt
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
