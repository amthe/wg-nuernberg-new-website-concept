# WG Nürnberg Website v005 - CHANGES

## Überblick

Version 005 ist ein vollständiger Neubau der Website mit Fokus auf **Design-Perfektion und polishing**. Alle Features aus v004 wurden übernommen, aber komplett neu implementiert mit strikter Einhaltung des Design Systems.

---

## Erstellte Dateien

1. **styles.css** - Design System CSS mit allen Tokens, Variablen und Komponenten
2. **index.html** - Hauptseite mit allen 15 Sektionen laut Blueprint
3. **studenten-wg.html** - Unterseite für Studenten-WG
4. **mediziner-wg.html** - Unterseite für Mediziner-WG
5. **inklusive-wg.html** - Unterseite für Inklusive WG
6. **senioren-wg.html** - Unterseite für Senioren-WG mit formeller 'Sie'-Anrede
7. **CHANGES.md** - Diese Dokumentation

---

## Design System Implementierung

### CSS Custom Properties (Tokens)

Alle Design-Tokens sind als CSS-Variablen in `:root` definiert:

- **Farben**: Primary (#10B981), Accent (#0EA5E9), Light/Dark Mode Paletten
- **Spacing**: 8px-Grid (--space-1 bis --space-20)
- **Typografie**: Inter Font, 9-stufige Font-Size-Skala, Gewichte 400-800
- **Border Radius**: 4-stufig (sm, md, lg, xl, full)
- **Shadows**: 4-stufig (sm, card, card-hover, lg)
- **Transitions**: 3-stufig (fast, base, slow)

### Dark Mode

- Manueller Toggle im Header (☀️/🌙)
- localStorage Persistenz (`wgn-theme`)
- `data-theme="dark"` auf `<html>`
- Alle Komponenten haben Dark Mode Styles
- Bilder: leicht reduzierte Brightness im Dark Mode

### Komponenten

Einheitlicher Stil für alle Komponenten:

- **Cards**: Weißer/Surface Background, 1px Border, 12px Radius, Shadow, Hover-Animation
- **Buttons**: Primary (grün), Secondary (transparent mit Border), WhatsApp (#25D366)
- **Badges**: Pill-Form (999px Radius), Farbe nach Kategorie
- **Section Headers**: Eyebrow → H2 → Description Pattern
- **Form Elements**: Konsistente Inputs mit Focus-States

---

## Hauptseite (index.html)

### 15 Sektionen in Reihenfolge

1. **Header** (fixed) - Logo, Navigation, Dark Mode Toggle, CTA, Mobile Hamburger
2. **Hero** (100vh) - Unsplash Stock Photo, Badge, H1 mit Gradient-Text, 2 CTAs
3. **Über uns** - 2-Spalten Layout, Stat-Counter (4 Zahlen)
4. **Lage** - Karte (SVG) + Entfernungen nach Kategorien
5. **Freie Zimmer** - 4 Zimmerkarten mit Badges
6. **Vorteile** - 6 Feature-Cards im 3er Grid
7. **So geht's** - 3 Schritte mit 'Keine Besichtigung nötig' Highlight
8. **Keine Besichtigung** - Hauptaussage + 3 Alternativen
9. **360° Touren** - 4 Tour-Karten mit Platzhalter-Links
10. **Bewertungen** - 3 Testimonials
11. **Galerie** - Filter-Buttons + Bild-Grid + Lightbox
12. **WG-Typen** - 4 Karten mit Links zu Unterseiten
13. **Kontakt** - 2-Spalten (Info + Formular)
14. **FAQ** - 19 Fragen als Accordion (erste: 'Muss ich besichtigen? → Nein!')
15. **Footer** - 4-Spalten, Social Links, Copyright, Legal

### Technische Features

- **Scroll-Progress-Bar**: Gradient, 3px, fixed top
- **Scroll Reveal Animation**: translateY(20px) + opacity
- **prefers-reduced-motion**: Animationen werden deaktiviert
- **Galerie Lightbox**: Keyboard Navigation (Escape, Arrow Keys), Touch Swipe
- **Mobile Menu**: Slide-in, Body Lock bei geöffnetem Menü
- **Smooth Scroll**: Für alle Anchor-Links

---

## Unterseiten

### Gemeinsame Struktur

Alle Unterseiten folgen demselben Template:
- Header (identisch zur Hauptseite)
- Mini Hero (Surface Background, Emoji Icon, H1)
- Features/Vorteile Sektion (2-Spalten Feature-Liste)
- Spezifische Inhalte (Uni-Entfernungen, Kliniken, Ausstattung)
- Freie Zimmer (nur relevante Kategorie)
- CTA Sektion ('Keine Besichtigung nötig')
- Footer (identisch zur Hauptseite)

### Senioren-WG Besonderheiten

- **Formelle 'Sie'-Anrede** durchgehend verwendet
- Wärmer und vertrauensvoller Ton
- Beispiele:
  - "Sie behalten Ihre Unabhängigkeit"
  - "Ihr Zimmer ist Ihr privater Rückzugsort"
  - "Wir nehmen uns Zeit für Sie"
  - "Ihr Zuhause wartet auf Sie"

---

## SEO & Accessibility

### Schema.org JSON-LD

- **LocalBusiness** Schema auf Hauptseite
- **FAQPage** Schema für FAQ-Bereich
- **AggregateRating** Schema für Bewertungen

### Open Graph & Twitter Cards

Alle Seiten haben vollständige Meta-Tags für Social Sharing.

### Accessibility (A11y)

- **Skip Link** zum Hauptinhalt
- **ARIA Labels** für alle interaktiven Elemente
- **Semantic HTML** (header, main, nav, section, article, footer)
- **Role Attributes** wo nötig
- **Focus Styles** für Keyboard-Navigation
- **aria-expanded** für Mobile Menu und FAQ
- **aria-hidden** für dekorative Elemente
- **Alt-Texte** für alle Bilder

---

## Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Ansatz

- Base Styles für Mobile
- Media Queries für größere Screens
- Touch-optimierte Interaktionen (Swipe für Lightbox)
- Angepasste Typografie (kleinere Headings mobil)
- Stack-Layout für Grids auf Mobile

---

## Performance Optimierungen

- **Lazy Loading**: Alle Bilder außer Hero
- **fetchpriority="high"**: Für Hero-Bild
- **Preconnect**: Google Fonts
- **Passive Event Listeners**: Für Scroll-Events
- **CSS-Only Animations**: Wo möglich
- **Minimale JavaScript**: Nur für Interaktivität

---

## Assets Verwendung

### Logos
- `assets/logos/wg-nuernberg-grey-optimized.svg` (Header, Footer)

### Bilder
- Hero: Unsplash URL (https://images.unsplash.com/photo-1529156069898-49953e39b3ac)
- Galerie: Alle Bilder aus `assets/img/` verwendet:
  - Grasstraße: gras11-*, gras15-*, gras21-*
  - Klarastraße: klara2-*, klara3-*
  - Sternstraße: stern1-*, stern3-*
  - Zimmer: zimmer-stern1-*, zimmer-gras15-*
  - Grundriss: grundriss-gras11.jpg
- Karte: assets/img/wg-map.svg

---

## Verbesserungen gegenüber v004

| Problem in v004 | Lösung in v005 |
|----------------|----------------|
| Inkonsistente Karten-Stile | Ein einheitlicher Card-Stil für alle |
| Verschiedene Abstände | Strikte Spacing-Tokens (8px Grid) |
| Senioren-Seite mit 'Du' | Konsequente 'Sie'-Anrede |
| Fehlende Scroll-Progress-Bar | Implementiert (Gradient, 3px, fixed) |
| Kein visueller Rhythmus | Alternierende Section-Backgrounds |
| Nie Lighthouse getestet | Design für gute Scores optimiert |

---

## Validierung

Vor Deployment empfohlen:

1. **HTML Validation**: W3C Validator
2. **CSS Validation**: W3C CSS Validator
3. **Lighthouse Audit**: Performance, Accessibility, SEO, Best Practices
4. **WAVE Tool**: Accessibility-Check
5. **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
6. **Mobile Testing**: iOS Safari, Android Chrome
