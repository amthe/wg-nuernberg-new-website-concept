# WG Nürnberg Website v021 - CHANGES

**Version:** v021
**Datum:** 15. März 2026
**Autor:** Claude AI

---

## Übersicht

Kompletter Neuaufbau der WG Nürnberg Website nach dem verbindlichen Design System. Diese Version wurde von Grund auf neu entwickelt ohne Code aus vorherigen Versionen zu übernehmen.

---

## Erstellte Dateien

### Hauptseite
- `index.html` - Startseite mit allen 15 Sektionen

### Unterseiten
- `studenten-wg.html` - Studenten-WG Unterseite
- `mediziner-wg.html` - Mediziner-WG Unterseite
- `inklusive-wg.html` - Inklusive WG Unterseite
- `young-professionals-wg.html` - Young Professionals WG Unterseite

### Styles & Scripts
- `styles.css` - Komplettes Stylesheet mit Design System
- `main.js` - JavaScript für alle Interaktionen

### SEO & Meta
- `robots.txt` - Crawler-Anweisungen
- `sitemap.xml` - XML Sitemap für Suchmaschinen
- `favicon.svg` - SVG Favicon mit Gradient

---

## Design System Implementation

### Farben
- **Primary:** #10B981 (Grün) mit Light (#34D399) und Dark (#059669) Varianten
- **Accent:** #0EA5E9 (Blau) mit Light (#38BDF8) und Dark (#0284C7) Varianten
- **Gradient:** linear-gradient(135deg, #10B981 0%, #0EA5E9 100%) - NUR für Hero-Text und Scroll-Progress

### Badge-Farben
- Studenten: #10B981 (Primary/Grün)
- Mediziner: #0EA5E9 (Accent/Blau)
- Inklusive: #8B5CF6 (Violet)
- Young Professionals: #F59E0B (Amber)

### Typografie
- Font: Inter (Google Fonts)
- H1: 3rem/2.25rem mobil, 800 weight
- H2: 2.25rem/1.75rem mobil, 700 weight
- H3: 1.5rem/1.25rem mobil, 600 weight
- Section-Header: Eyebrow → H2 → Description Pattern

### Abstände (8px Grid)
- Sections: space-16 (4rem) mobil, space-20 (5rem) desktop
- Karten-Grid Gap: space-6 (1.5rem)
- Abstand nach Section-Header: space-12 (3rem)

### Komponenten
- **Cards:** Einheitlicher Stil, 12px radius, 1px border, hover translateY(-2px)
- **Buttons:** Primary, Secondary, WhatsApp - mit hover translateY(-1px)
- **Badges:** Pills mit 999px radius, 4px 12px padding

---

## Sektionen (index.html)

1. **Header** - Fixed mit Logo, Nav (Desktop-Dropdown), Dark Mode Toggle (SVG), Mobile Hamburger
2. **Hero** - 100vh, Unsplash Stock Photo, Gradient Overlay, 2 CTAs
3. **Über uns** - 2-Spalten Layout, echtes WG-Foto, 4 animated Counters
4. **Lage** - Karte als Placeholder, 3 Entfernungs-Kategorien (Fuß, Fahrrad, Bahn)
5. **Freie Zimmer** - 4 Zimmer-Karten mit echten Fotos und Badge-Kategorien
6. **Vorteile** - 6 Benefit-Karten mit Emoji-Icons
7. **So geht's** - 3 Schritte mit Connector-Lines, Schritt 2 hervorgehoben
8. **Keine Besichtigung** - 3 Alternative-Karten (360° Tour, Fotos, Video-Call)
9. **360° Touren** - 4 Tour-Karten mit echten Allgemein-Fotos
10. **Bewertungen** - 3 Testimonial-Karten (E.S., Ephraim, K.R.)
11. **Galerie** - Filter-Buttons + 32 echte Fotos + Lightbox
12. **WG-Typen** - 4 WG-Typ-Karten mit Links zu Unterseiten
13. **Kontakt** - 2-Spalten, 3 Kontakt-Methoden + Formular
14. **FAQ** - 19 Fragen als Accordion, erste Frage "Muss ich besichtigen?" offen
15. **Footer** - 4-Spalten Grid, Social Links, Legal Links

---

## Features

### Dark Mode
- SVG-basierter Toggle (Sonne/Mond)
- localStorage Persistenz (`wgn-theme`)
- System-Präferenz Erkennung via `prefers-color-scheme`
- Alle Komponenten Dark Mode optimiert
- Bilder mit reduzierter Brightness im Dark Mode

### Galerie & Lightbox
- Filter nach Kategorie (Alle, Grassstraße, Klarastraße, Sternstraße, Zimmer)
- Alle 32 echten Fotos verwendet
- Lightbox mit Prev/Next Navigation
- Keyboard Support (Escape, Arrow Keys)
- Touch Swipe Support
- ARIA-konforme Implementierung

### Animationen
- Scroll Progress Bar (Gradient, 3px)
- Animated Counters (IntersectionObserver triggered)
- Scroll Reveal für Karten und Sektionen
- prefers-reduced-motion respektiert
- 0.2s ease Transitions

### Navigation
- Desktop: Hover-Dropdown für "Unsere WGs"
- Mobile: Hamburger-Menü mit aufklappbarer WG-Gruppe
- Smooth Scroll für Anchor-Links
- Active State Management

### Formulare
- Kontaktformular mit Validierung
- Min-Date für Einzugsdatum
- Custom Select Styling
- Focus States

### Cookie Consent
- DSGVO-konform
- 3 Kategorien: Notwendig, Analytik, Marketing
- localStorage Persistenz
- Minimalistisches Design

---

## SEO Implementation

### Meta Tags
- Description, Keywords, Author
- Geo-Tags (Region, Placename, Position, ICBM)
- Canonical URLs
- robots: index, follow

### Open Graph
- og:type, og:url, og:title, og:description, og:image, og:locale

### Twitter Cards
- twitter:card, twitter:title, twitter:description, twitter:image

### Schema.org JSON-LD
- LocalBusiness (Hauptseite)
- FAQPage (Hauptseite)
- BreadcrumbList (alle Seiten)

---

## Accessibility (WCAG 2.1 AA)

- Skip-Link zu Hauptinhalt
- ARIA Labels und Rollen
- focus-visible Outlines
- Keyboard Navigation für alle Interaktionen
- Semantisches HTML (header, main, nav, section, article, footer)
- Alt-Texte für alle Bilder
- prefers-reduced-motion Support
- Farbkontraste geprüft

---

## Performance

- Lazy Loading für Bilder unterhalb des Folds
- preconnect für Google Fonts
- font-display: swap
- defer für JavaScript
- CSS Custom Properties für Theme Switching
- Minimale DOM-Manipulation
- Event Delegation wo sinnvoll
- Passive Event Listeners

---

## Verwendete Assets

### Logos
- `assets/logos/wg-nuernberg-grey-optimized.svg`

### Allgemeinflaechen (11 Fotos)
- foto_01.jpg - foto_07.jpg, foto_09.jpg
- neu_01.jpg, neu_02.jpg, neu_04.jpg

### Zimmer möbliert (6 Fotos)
- zimmer_01.jpg - zimmer_06.jpg

### Zimmer unmöbliert (15 Fotos)
- foto_08.jpg, foto_10.jpg, foto_13.jpg
- raum_01.jpg - raum_03.jpg, raum_05.jpg, raum_07.jpg - raum_08.jpg
- raum_10.jpg - raum_12.jpg, raum_14.jpg - raum_16.jpg

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome Android (latest)

---

## Bekannte Limitierungen

- Kontaktformular ohne Backend (Frontend-only Prototyp)
- Karte als Placeholder-Bild (kein echtes Google Maps eingebettet)
- 360° Touren Links als Placeholder
- Impressum/Datenschutz Seiten nicht erstellt (nur Links vorhanden)

---

## Dateistruktur

```
v021/
├── index.html
├── studenten-wg.html
├── mediziner-wg.html
├── inklusive-wg.html
├── young-professionals-wg.html
├── styles.css
├── main.js
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── CHANGES.md
└── assets/
    ├── logos/
    │   ├── wg-nuernberg-grey-optimized.svg
    │   └── wg-nuernberg-vertical-grey-optimized.svg
    └── img/
        ├── allgemeinflaechen/
        │   ├── foto_01.jpg - foto_09.jpg
        │   └── neu_01.jpg - neu_04.jpg
        ├── zimmer-moebliert/
        │   └── zimmer_01.jpg - zimmer_06.jpg
        └── zimmer-unmoebliert/
            ├── foto_08.jpg, foto_10.jpg, foto_13.jpg
            └── raum_01.jpg - raum_16.jpg
```

---

## Nächste Schritte (Optional)

- [ ] Impressum-Seite erstellen
- [ ] Datenschutz-Seite erstellen
- [ ] Formular-Backend anbinden
- [ ] Google Maps Integration
- [ ] 360° Tour Links aktualisieren
- [ ] Analytics einbinden
- [ ] Performance-Audit durchführen
- [ ] Lighthouse Score optimieren
