# WG Nürnberg Website v011 - Changes

## Versionsfokus

**Video Hero Placeholder & Mobile-First Polish**

v011 bringt den Video-Hero-Placeholder, wie im Konzept vorgesehen. Außerdem: Kein Parallax (war in v010, ist laut Blueprint zu fehleranfällig), stattdessen ein sauberes, poliertes Mobile-First-Erlebnis.

---

## Hauptänderungen gegenüber v010

### 1. Kein Parallax

- Parallax-Effekt im Hero wurde **komplett entfernt**
- Entspricht dem Blueprint: "Kein Parallax, zu fehleranfällig"
- Hero ist jetzt statisch mit hellem, einladendem Hintergrundbild

### 2. Video Hero Placeholder

- **Neuer Video-Play-Button** im Hero-Bereich
- Elegantes weißes Kreisdesign mit grünem Play-Icon
- Hover-Animation mit Scale-Effekt und Shadow
- Mobile-responsive (80px auf mobil, 100px auf Desktop)
- Placeholder-Funktionalität für spätere Video-Integration

### 3. Dark Mode Toggle

- **Sauberes SVG-Icon** statt Emoji (kein ☀️/🌙)
- Dünne Linien-Icons (Sonne/Mond) im Header
- Smooth Transitions zwischen Light/Dark Mode
- localStorage-Persistenz (`wgn-theme`)
- System-Preference-Detection unterstützt

### 4. Helles, einladendes Hero-Design

- Hell, freundlich und einladend
- Unsplash-Bild mit fröhlichen jungen Menschen
- Sanftes Overlay (nicht zu dunkel)
- Gradient-Text für "WG-Zimmer" Highlight

---

## Erstellte Dateien

### HTML-Seiten

| Datei | Beschreibung |
|-------|--------------|
| `index.html` | Hauptseite mit allen 15 Sektionen |
| `studenten-wg.html` | Unterseite für Studenten-WG |
| `mediziner-wg.html` | Unterseite für Mediziner-WG |
| `inklusive-wg.html` | Unterseite für Inklusive WG |
| `senioren-wg.html` | Unterseite für Senioren-WG (Sie-Anrede) |

### Stylesheets & Scripts

| Datei | Beschreibung |
|-------|--------------|
| `styles.css` | Vollständiges Design System CSS |
| `scripts.js` | Vanilla JS für alle Interaktionen |

### SEO & Assets

| Datei | Beschreibung |
|-------|--------------|
| `favicon.svg` | Gradient-Haus-Icon |
| `robots.txt` | Suchmaschinen-Anweisungen |
| `sitemap.xml` | XML-Sitemap für alle Seiten |

---

## Design System Implementation

### Farben

- **Primary**: #10B981 (Grün)
- **Accent**: #0EA5E9 (Blau)
- **Gradient**: 135deg von Primary zu Accent (nur für Text-Highlights und Scroll-Progress-Bar)
- **Backgrounds**: Weiß und #F8FAFC (Surface)

### Typografie

- **Font**: Inter (Google Fonts)
- **H1**: 3rem / 2.25rem mobil, Weight 800
- **H2**: 2.25rem / 1.75rem mobil, Weight 700
- **Body**: 1rem (16px), Line-Height 1.6

### Spacing (8px Grid)

- Alle Abstände basieren auf 8px-Multiplikatoren
- Sektionen: 80px Desktop, 64px mobil
- Karten-Grid: 24px Gap

### Komponenten

- **Einheitlicher Karten-Stil** für alle Bereiche
- **Section Headers**: Eyebrow + H2 + Description
- **Buttons**: Primary, Secondary, WhatsApp
- **Badges**: Studenten, Mediziner, Inklusive, Senioren

---

## Features im Detail

### Header

- Fixed Header mit 72px Höhe
- Logo links (grau, invertiert im Dark Mode)
- Desktop-Navigation ab 1024px
- Mobile: Hamburger-Menü mit Slide-Animation
- Dark Mode Toggle mit SVG-Icons
- Scroll-Shadow bei scroll > 50px

### Hero Section

- 100vh Fullscreen
- Helles Unsplash-Bild mit Overlay
- Video-Play-Button (zentriert)
- Badge "Seit 2002 in der Lorenzer Altstadt"
- H1 mit Gradient-Highlight
- 2 CTAs: Primary + WhatsApp

### Über uns

- 2-Spalten-Layout
- 4 animierte Stat-Counter (easeOutExpo, 2s)
- IntersectionObserver für Animation-Trigger

### Lage

- OpenStreetMap Embed
- Entfernungen gruppiert (Fuß, Rad, Bahn)
- Responsive Grid

### Freie Zimmer

- 4 Beispiel-Zimmer mit Badges
- Preis, Größe, Verfügbarkeit
- "Aktualisiert täglich um 08:00 Uhr"

### Vorteile

- 6 Feature-Karten
- Emoji-Icons in rundem Container
- Hover: translateY + Shadow

### So geht's (3 Schritte)

- Nummerierte Steps mit Gradient-Hintergrund
- Schritt 2 mit Highlight "Keine Besichtigung nötig!"

### Keine Besichtigung nötig

- 3 Alternativen (360° Tour, Fotos, Video-Call)
- CTA am Ende

### 360° Touren

- 4 Tour-Karten mit Overlay
- Hover: Image Scale

### Bewertungen

- 3 Testimonials
- 5-Sterne-Rating
- Autor + Dauer

### Galerie

- Filter-Buttons (Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer)
- Responsive Grid (2-4 Spalten)
- Lightbox mit:
  - Prev/Next Navigation
  - Keyboard-Support (Escape, Pfeiltasten)
  - Touch-Swipe für Mobile

### WG-Typen

- 4 Typ-Karten mit Links
- Hover: Border-Color Primary

### Kontakt

- 2-Spalten: Info + Formular
- Client-Validierung (Echtzeit)
- Pflichtfelder: Name, E-Mail, Einzug, Mietdauer, Nachricht
- Optional: Telefon

### FAQ Accordion

- 18 Fragen (alle laut Blueprint)
- Erste Frage: "Muss ich besichtigen?" → "Nein!"
- Keyboard-Support
- Smooth Max-Height Animation

### Footer

- 4-Spalten Layout
- Brand + Social Links
- Navigation, WG-Typen, Kontakt
- Copyright + Impressum/Datenschutz

---

## Zusätzliche Features

### Scroll Progress Bar

- Fixed am oberen Rand
- 3px Höhe
- Gradient-Farbe
- Smooth Update

### Back-to-Top Button

- Erscheint nach 500px Scroll
- Fixed unten rechts
- Smooth Scroll nach oben
- Respektiert prefers-reduced-motion

### Cookie Consent

- DSGVO-konform
- 3 Optionen: Alle, Notwendige, Einstellungen
- Smooth Einblend-Animation
- localStorage-Persistenz

### Scroll Reveal

- IntersectionObserver
- translateY(20px) + opacity Animation
- Staggering für Listen (100ms delay)
- Respektiert prefers-reduced-motion

### Lazy Loading

- Native `loading="lazy"` für alle Bilder
- Außer Hero-Bild (`loading="eager"`)

---

## Accessibility (a11y)

- Skip-to-Content Link
- Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- ARIA Labels für alle interaktiven Elemente
- `aria-expanded` für Accordion und Mobile Menu
- `role="dialog"` für Lightbox und Mobile Menu
- Focus-visible Styles
- Keyboard-Navigation für alle Interaktionen
- prefers-reduced-motion respektiert

---

## SEO

### Schema.org Structured Data

- LocalBusiness
- FAQPage
- AggregateRating
- BreadcrumbList
- Offer

### Meta Tags

- Description, Keywords
- Open Graph (og:title, og:description, og:image)
- Twitter Card
- Canonical URLs

### Technisch

- robots.txt
- sitemap.xml
- Favicon (SVG mit Gradient)

---

## Browser-Kompatibilität

- Moderne Browser (Chrome, Firefox, Safari, Edge)
- Mobile-First Responsive Design
- CSS Custom Properties mit Fallbacks
- Vanilla JavaScript (keine Abhängigkeiten)

---

## Unterseiten (Sie-Anrede)

Die Senioren-WG-Seite verwendet konsequent die Sie-Anrede:
- "Sie möchten nicht alleine wohnen..."
- "Schauen Sie sich unsere 360°-Touren an..."
- "Wir zeigen Ihnen gerne das Zimmer..."

---

## Bekannte Einschränkungen

1. **Video-Player**: Play-Button zeigt nur Alert, Video-Integration folgt
2. **Formular**: Sendet nicht wirklich, zeigt Bestätigung
3. **360° Touren**: Links führen zu # (Platzhalter)
4. **Karten**: OpenStreetMap Embed (kann durch Google Maps ersetzt werden)
5. **Bilder**: Alle von Unsplash CDN (für Produktion lokale Kopien empfohlen)

---

## Dateistruktur

```
v011/
├── assets/
│   └── logos/
│       ├── wg-nuernberg-grey-optimized.svg
│       └── wg-nuernberg-vertical-grey-optimized.svg
├── index.html
├── studenten-wg.html
├── mediziner-wg.html
├── inklusive-wg.html
├── senioren-wg.html
├── styles.css
├── scripts.js
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── CHANGES.md
```

---

## Nächste Schritte (v012+)

1. Video-Player Integration (YouTube/Vimeo oder self-hosted)
2. Backend-Anbindung für Kontaktformular
3. CMS für Zimmer-Verwaltung
4. Cookie-Consent-Details-Dialog
5. Performance-Optimierung (Image Optimization, Code Splitting)
6. E2E Tests
