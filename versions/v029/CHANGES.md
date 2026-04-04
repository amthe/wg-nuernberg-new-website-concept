# v029 Änderungen

## Version v029 — 05.04.2026

### Fokus
Komplett neue Version mit allen 15 Sektionen, neue Unterseiten, Dark Mode Toggle

### Änderungen
- **Neue index.html** mit allen 15 Sektionen:
  1. Header (fixed, Nav, Dark Mode Toggle, Hamburger)
  2. Hero (100vh, Bild, Badge, H1, 2 Buttons)
  3. Über uns (2-Spalten, Stats)
  4. Lage (Karte + Entfernungen)
  5. Freie Zimmer (4 Zimmer-Karten)
  6. Vorteile (6 Karten)
  7. So geht's (3 Schritte)
  8. Keine Besichtigung (3 Optionen)
  9. 360° Touren (4 Karten)
  10. Bewertungen (3 Testimonials)
  11. Galerie (Filter + Grid + Lightbox)
  12. WG-Typen (4 Karten)
  13. Kontakt (Formular + Infos)
  14. FAQ (Accordion)
  15. Footer (4 Spalten)

- **4 neue Unterseiten:**
  - studenten-wg.html
  - mediziner-wg.html
  - inklusive-wg.html
  - young-professionals-wg.html

- **Styles:** styles.css (35KB)
- **JavaScript:** main.js (13KB) mit Lightbox, FAQ-Accordion, Dark Mode
- **Technisches:**
  - robots.txt
  - sitemap.xml
  - Schema.org JSON-LD
  - Skip-Link, ARIA-Labels
  - Dark Mode mit SVG Toggle

### Warum
Regelmäßiger Build-Zyklus gemäß Cron-Job

### Design Review
- Dark Mode Toggle (SVG Icons statt Emoji)
- Light Mode + Dark Mode
- Responsive (Mobile-first)
- Echte Fotos aus assets/img/

### Qualitäts-Checks
- Lightbox: ✓ (Keyboard + Touch)
- Dark Mode: ✓
- Responsive: ✓
- Accessibility: ✓ (Skip-Link, ARIA)

---

## Qualitäts-Check-Ergebnisse
| Check | Status |
|-------|--------|
| HTML valides Markup | ✓ |
| Dark Mode funktioniert | ✓ |
| Lightbox Keyboard-Nav | ✓ |
| Mobile responsive | ✓ |