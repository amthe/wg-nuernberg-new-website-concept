# WG Nürnberg v026 - Änderungen

## Übersicht

Kompletter Neuaufbau der WG Nürnberg Website nach dem verbindlichen Design System. Alle Dateien wurden von Grund auf erstellt, ohne Code aus vorherigen Versionen zu kopieren.

## Erstellte Dateien

### HTML-Seiten
- `index.html` - Hauptseite mit allen 15 Sektionen
- `studenten-wg.html` - Unterseite für Studenten-WG
- `mediziner-wg.html` - Unterseite für Mediziner-WG
- `inklusive-wg.html` - Unterseite für Inklusive-WG
- `young-professionals-wg.html` - Unterseite für Young Professionals-WG

### Styles & Scripts
- `styles.css` - Komplettes Design System mit allen Komponenten
- `main.js` - JavaScript für alle Interaktionen

### SEO & Meta
- `robots.txt` - Crawler-Anweisungen
- `sitemap.xml` - Sitemap für Suchmaschinen

## Design System Implementation

### Farben
- Primary: #10B981 (Emerald/Grün)
- Accent: #0EA5E9 (Sky/Blau)
- Gradient: nur für Hero-Text und Scroll-Progress
- Light Mode: Weiß (#FFFFFF) & Surface (#F8FAFC)
- Dark Mode: Slate-Töne (#0F172A, #1E293B)
- Badge-Farben pro WG-Typ implementiert

### Typografie
- Inter Font von Google Fonts
- Responsive Schriftgrößen (mobil/desktop)
- Section-Header mit Eyebrow → H2 → Description

### Abstände
- 8px Grid System konsequent angewendet
- Sektionen: 4rem mobil, 5rem desktop
- Konsistente Karten-Gaps: 1.5rem

### Komponenten
- **Cards**: Einheitlicher Stil für alle Karten
- **Buttons**: Primary, Secondary, WhatsApp
- **Badges**: Pills mit WG-Typ-Farben
- **Feature Cards**: Icon + Titel + Text
- **Step Cards**: Nummerierte Schritte
- **Testimonial Cards**: Sterne + Zitat + Autor

## Features

### Header
- Fixed Header mit Logo, Navigation, CTA
- Desktop-Dropdown für WG-Typen
- Dark Mode Toggle mit SVG-Icons (KEIN Emoji)
- Mobile: Hamburger-Menü mit Slide-in Drawer

### Hero
- Vollbild mit echtem Foto aus assets/img/Allgemeinflächen/
- Semi-transparenter Overlay
- Badge, Titel mit Gradient, Subtitle
- 2 CTAs: Primary + WhatsApp

### Über uns
- 2-Spalten Layout (Text + Bild)
- Animierte Stat-Counter (20+ Jahre, 120+ Bewohner, etc.)

### Lage
- Karten-Placeholder (kein broken Image)
- Entfernungen nach Kategorien (Zu Fuß, Fahrrad, Bahn)

### Freie Zimmer
- 4 Zimmer-Karten mit echten Fotos
- Kategorie-Badges, Preise, Verfügbarkeit
- Footer mit Update-Zeit

### Vorteile
- 6 Feature-Cards mit Icons
- 3-Spalten Grid

### So geht's
- 3 Step-Cards horizontal
- Schritt 2 hervorgehoben (Primary BG)

### Keine Besichtigung nötig
- 3 Alternativen-Cards
- CTA Button

### 360° Touren
- 4 Tour-Cards mit Play-Overlay

### Bewertungen
- 3 Testimonial-Cards
- 5-Sterne Bewertungen

### Galerie
- Filter-Buttons: Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer
- Alle 32 echten Fotos eingebunden
- Lightbox mit Keyboard + Touch-Swipe

### WG-Typen
- 4 Cards mit Links zu Unterseiten

### Kontakt
- 2-Spalten (Infos + Formular)
- Formular: Name, E-Mail, Telefon (opt.), Einzugsdatum, Mietdauer, Nachricht

### FAQ
- Accordion mit 19 Fragen
- Erste Frage standardmäßig offen

### Footer
- 4-Spalten Grid
- Brand + Social Links
- Navigation, WG-Typen, Kontakt
- Copyright, Impressum, Datenschutz

## Neue Features für v026

### WhatsApp Float Button
- Schwebendes Icon unten rechts
- Tooltip bei Hover
- Link zu WhatsApp Chat

### Cookie Banner
- 3 Kategorien: Notwendig (required), Analyse, Marketing
- "Alle akzeptieren" + "Auswahl akzeptieren"
- localStorage für Consent-Speicherung

### Verbesserte Performance
- Lazy Loading für alle Bilder
- defer für JavaScript
- Schlankes CSS ohne Redundanzen

### Animationen
- Scroll-Reveal für Elemente
- Stat-Counter Animation
- Card Entrance Animation
- prefers-reduced-motion Support

### Scroll-Progress Bar
- Gradient Bar am oberen Rand
- 3px Höhe

### Lightbox
- Keyboard-Navigation (Pfeiltasten, Escape)
- Touch-Swipe Support
- Counter-Anzeige

### Mobile Navigation
- Slide-in Drawer
- Verschachtelte Dropdowns
- Body-Scroll Lock

## SEO

### Schema.org JSON-LD
- LocalBusiness (Hauptseite)
- FAQPage (Hauptseite)
- BreadcrumbList (Unterseiten)

### Meta Tags
- Open Graph für Social Sharing
- Twitter Cards
- Canonical URLs
- Description, Keywords

### Accessibility
- Skip-Link
- ARIA-Labels
- Semantisches HTML
- Keyboard-Navigation
- Focus-Styles

## Browser-Support

- Moderne Browser (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties
- CSS Grid & Flexbox
- Intersection Observer API
- prefers-color-scheme
- prefers-reduced-motion

## Dark Mode

- Manueller Toggle im Header (SVG-Icons)
- localStorage Persistenz
- System-Präferenz Support
- Alle Komponenten Dark-Mode-ready

## Responsive Design

- Mobile-first Approach
- Breakpoints: 640px, 768px, 1024px
- Flexible Grids
- Responsive Typografie

## Fotos

Alle 32 Fotos aus den Assets eingebunden:
- 11 Allgemeinflächen-Fotos
- 6 möblierte Zimmer-Fotos
- 15 unmöblierte Zimmer-Fotos

Verwendet in:
- Hero
- Über uns
- Freie Zimmer (4 Karten)
- 360° Touren (4 Karten)
- Galerie (alle 32)
- WG-Typen (4 Karten)
- Unterseiten

## Bekannte Limitierungen

- Kontaktformular: Frontend-only (keine Backend-Integration)
- 360° Touren: Platzhalter (keine echten Matterport-Embeds)
- Karten: Platzhalter (keine Google Maps Integration)
- WhatsApp: Beispiel-Telefonnummer
