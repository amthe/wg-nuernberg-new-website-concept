# WG Nürnberg Website v020 - Änderungsprotokoll

## Übersicht

Version 020 ist ein kompletter Neubau der WG Nürnberg Website nach einem strikten Design System. Die Website wurde von Grund auf neu entwickelt, ohne Code aus vorherigen Versionen zu übernehmen.

## Erstellte Dateien

### Hauptdateien
- `index.html` - Hauptseite mit 15 Sektionen
- `styles.css` - Komplettes Design System (1600+ Zeilen)
- `main.js` - JavaScript für alle Interaktionen
- `favicon.svg` - SVG Favicon mit Gradient

### Unterseiten
- `studenten-wg.html` - Studenten-WG Seite mit Hochschul-Entfernungen
- `mediziner-wg.html` - Mediziner-WG Seite
- `inklusive-wg.html` - Inklusive-WG Seite (barrierefrei)
- `young-professionals-wg.html` - Young Professionals-WG Seite

### SEO & Meta
- `robots.txt` - Crawler-Anweisungen
- `sitemap.xml` - XML Sitemap für Suchmaschinen
- `CHANGES.md` - Diese Datei

## Design System

### Farben
- **Primary**: #10B981 (Emerald) mit Light #34D399 und Dark #059669
- **Accent**: #0EA5E9 (Sky Blue) mit Light #38BDF8 und Dark #0284C7
- **Gradient**: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)
- **Badge-Farben**:
  - Studenten: #10B981
  - Mediziner: #0EA5E9
  - Inklusive: #8B5CF6
  - Young Professionals: #F59E0B

### Light Mode
- Background: #FFFFFF
- Surface: #F8FAFC
- Text: #1E293B
- Text Secondary: #64748B
- Border: #E2E8F0

### Dark Mode
- Background: #0F172A
- Surface: #1E293B
- Text: #F1F5F9
- Text Secondary: #CBD5E1
- Border: #334155

### Typografie
- Font: Inter (Google Fonts)
- H1: 3rem/2.25rem mobil, weight 800
- H2: 2.25rem/1.75rem mobil, weight 700
- H3: 1.5rem/1.25rem mobil, weight 600
- H4: 1.125rem, weight 600
- Body: 1rem, weight 400

### Abstände (8px Grid)
- Sektionen: 4rem mobil, 5rem desktop
- Karten-Gap: 1.5rem
- Container max-width: 1200px

## Features

### Accessibility
- Skip-Link für Keyboard-Navigation
- Vollständige ARIA-Labels und Rollen
- focus-visible Outlines
- prefers-reduced-motion Support
- Keyboard-Navigation für Galerie und Lightbox

### Dark Mode
- SVG Toggle-Icon (kein Emoji)
- localStorage Persistenz (wgn-theme)
- System-Präferenz-Erkennung
- Smooth Transitions

### Progressive Enhancement
- View Transitions API Support
- Progressive Image Loading (blur-up)
- IntersectionObserver für Lazy Loading
- Scroll Reveal Animationen

### Galerie
- 32 echte Fotos integriert
- Filter: Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer
- Lightbox mit Keyboard/Touch-Navigation
- Swipe-Gesten auf Mobile

### Cookie Consent
- DSGVO-konformer Banner
- 3 Kategorien: Notwendig, Analyse, Marketing
- Details-Dialog
- localStorage Persistenz

### SEO
- Schema.org: LocalBusiness, FAQPage, BreadcrumbList
- Open Graph Meta Tags
- Twitter Cards
- Semantisches HTML

## Sektionen (index.html)

1. **Header** - Fixed, Logo, Nav mit Dropdown, Dark Mode Toggle
2. **Hero** - 100vh, Unsplash Stock Photo, Gradient Overlay
3. **Über uns** - 2-Spalten, 4 Stat-Counter
4. **Lage** - Karten-Placeholder, Entfernungen nach Kategorien
5. **Freie Zimmer** - 4 Karten mit Badges
6. **Vorteile** - 6 Benefit-Cards
7. **So geht's** - 3 Schritte horizontal
8. **Keine Besichtigung** - 3 Alternativen-Karten
9. **360° Touren** - 4 Tour-Karten
10. **Bewertungen** - 3 Testimonials
11. **Galerie** - Filter + Grid mit allen 32 Fotos
12. **WG-Typen** - 4 Karten mit Links zu Unterseiten
13. **Kontakt** - 2-Spalten, Info + Formular
14. **FAQ** - 18 Fragen als Accordion
15. **Footer** - 4-Spalten, Social Links

## Bilder-Zuordnung

### allgemeinflaechen/ (11 Bilder)
- foto_01.jpg bis foto_09.jpg (ohne foto_08)
- neu_01.jpg, neu_02.jpg, neu_04.jpg
- Galerie-Filter: "Grasstraße" und "Alle"

### zimmer-moebliert/ (6 Bilder)
- zimmer_01.jpg bis zimmer_06.jpg
- Galerie-Filter: "Klarastraße", "Zimmer" und "Alle"

### zimmer-unmoebliert/ (15 Bilder)
- raum_01.jpg bis raum_16.jpg (mit Lücken)
- foto_08.jpg, foto_10.jpg, foto_13.jpg
- Galerie-Filter: "Sternstraße", "Zimmer" und "Alle"

## JavaScript Features

- Dark Mode mit localStorage
- Scroll Progress Bar
- Mobile Navigation mit Accordion-Dropdown
- Desktop Dropdown mit Keyboard-Support
- Galerie Filter und Lightbox
- Progressive Image Loading
- FAQ Accordion
- Scroll Reveal Animation
- Button Ripple Effects
- Cookie Consent mit Modal
- Smooth Scroll für Anchor Links
- Formular-Handling
- Stat Counter Animation
- Header Shadow on Scroll
- View Transitions API

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Browser-Support

- Moderne Browser (Chrome, Firefox, Safari, Edge)
- Progressive Enhancement für ältere Browser
- Graceful Degradation für nicht unterstützte Features

## Performanz

- Kritisches CSS inline-fähig
- Lazy Loading für Bilder
- Minimale JavaScript-Abhängigkeiten (Vanilla JS)
- Optimierte SVG Icons
- Font-Display: swap

## Bekannte Einschränkungen

- Karten-Placeholder statt echte Google Maps
- Formular ohne Backend-Anbindung
- 360° Touren nur als Karten (keine echten Touren)
- Impressum und Datenschutz-Seiten nicht erstellt

## Empfehlungen für v021

1. Echte Google Maps Integration
2. Backend für Kontaktformular
3. 360° Tour Embeds (z.B. Matterport)
4. CMS-Integration für dynamische Inhalte
5. Performance-Optimierung (Critical CSS, Bildkompression)
6. A/B Testing für CTAs
7. Analytics Integration
