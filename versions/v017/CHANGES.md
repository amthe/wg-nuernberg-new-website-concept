# WG Nürnberg Website v017 - CHANGES

## Übersicht

Version 017 ist ein kompletter Neubau mit Fokus auf **Accessibility-Perfektion**, **Performance-Optimierung** und **feinere Micro-Interactions**. Alle Dateien wurden von Grund auf neu erstellt.

---

## Accessibility (WCAG 2.1 AA Compliance)

### Skip-Link
- `<a href="#main-content" class="skip-link">` am Seitenanfang
- Sichtbar bei Fokus, versteckt sonst
- Ermöglicht Screenreader-Nutzern direkten Sprung zum Hauptinhalt

### Focus-Styles
- Konsistente `:focus-visible` Outlines (3px solid, Primary-Farbe)
- Alle interaktiven Elemente haben sichtbare Focus-Styles
- Keine Unterdrückung von Focus-Outlines

### ARIA-Rollen und -Labels
- `role="banner"` für Header
- `role="navigation"` mit `aria-label` für alle Navigationen
- `role="main"` für Hauptinhalt (implizit durch `<main>`)
- `role="contentinfo"` für Footer
- `role="menubar"`, `role="menu"`, `role="menuitem"` für Dropdown-Navigation
- `aria-haspopup="true"`, `aria-expanded` für Dropdown-Toggles
- `aria-current="page"` für aktive Seite in Navigation
- `aria-labelledby` für alle Sections mit H2
- `role="list"`, `role="listitem"` für semantische Listen
- `role="dialog"`, `aria-modal` für Lightbox und Cookie-Consent
- `aria-live="polite"` für dynamische Inhalte (Galerie, Lightbox-Counter)
- `role="tablist"`, `role="tab"`, `aria-selected` für Galerie-Filter
- `role="progressbar"`, `aria-valuenow/min/max` für Scroll-Progress
- `aria-describedby` für Formular-Fehler
- `aria-hidden="true"` für dekorative Icons und SVGs

### Heading-Hierarchie
- Logische Struktur: H1 → H2 → H3 → H4
- Keine übersprungenen Ebenen
- Jede Seite hat genau ein H1

### Formular-Accessibility
- `<label>` mit `for`-Attribut für alle Inputs
- Pflichtfelder: `required` + visueller Indikator (`*`)
- Fehlermeldungen: `role="alert"`, `aria-describedby`
- `autocomplete`-Attribute für Name, Email, Telefon

### Alt-Texte
- Beschreibende Alt-Texte für alle Bilder
- Nicht generisch ("Bild 1") sondern kontextbezogen
- Dekorative Bilder in CSS-Background oder `aria-hidden`

### Keyboard-Navigation
- Logische Tab-Reihenfolge
- Escape schließt Modals und Mobile-Nav
- Pfeiltasten für Lightbox
- Enter/Space aktiviert Buttons

### prefers-reduced-motion
- Alle Animationen respektieren `@media (prefers-reduced-motion: reduce)`
- `scroll-behavior: auto` bei reduzierter Bewegung
- Animationsdauer auf 0.01ms bei Präferenz

### prefers-color-scheme
- System-Präferenz als Fallback für Dark Mode
- Automatische Erkennung beim ersten Besuch
- localStorage speichert Benutzerauswahl

---

## Performance-Optimierungen

### Critical CSS
- Inline-Styles im `<head>` für Above-the-Fold-Content
- Header, Hero, Skip-Link kritisch inline
- Hauptstylesheet lazy geladen mit `media="print" onload`

### Font Loading
- `font-display: swap` (via Google Fonts URL)
- `preconnect` zu fonts.googleapis.com und fonts.gstatic.com
- `dns-prefetch` als zusätzliche Optimierung

### JavaScript
- `defer`-Attribut auf Script-Tag
- IIFE-Pattern verhindert globale Namespace-Verschmutzung
- Passive Event-Listener für Scroll-Events
- `requestAnimationFrame` für Scroll-Handler
- Debounce-Utility für Performance

### Lazy Loading
- Native `loading="lazy"` für alle Bilder unterhalb des Folds
- IntersectionObserver-Fallback für ältere Browser
- Bilder mit `width` und `height` für Layout-Stabilität

### Content Visibility
- `content-visibility: auto` auf Section-Elementen
- `contain-intrinsic-size` für Layout-Schätzung
- Reduziert initiale Render-Arbeit

### Effiziente Selektoren
- CSS Custom Properties für alle wiederkehrenden Werte
- Minimale Spezifität
- Keine teuren Selektoren (`:nth-child` sparsam)

---

## Micro-Interactions

### Hover-States
- Subtile `translateY(-2px)` für Karten
- Sanfte Shadow-Verstärkung (`box-shadow` Transition)
- Farbübergänge mit `0.15s ease`

### Buttons
- Hover: `translateY(-1px)` + dunklere Farbe
- Active: `scale(0.98)` für Click-Feedback
- WhatsApp-Button mit eigenem Grün

### Header
- `backdrop-filter: blur(10px)` für Glaseffekt
- Shadow erscheint beim Scrollen
- CTA-Button erscheint nach 500px Scroll

### Galerie
- Sanfte Einblendung beim Filtern
- Bild-Zoom bei Hover (`scale(1.1)`)
- CSS-basierte Transitions

### Lightbox
- Fade-In/Out Animation
- Touch-Swipe für mobile Geräte
- Keyboard-Navigation

### FAQ Accordion
- `<details>` + `<summary>` für native Accessibility
- Chevron-Rotation bei Öffnen
- Single-Open-Verhalten (nur ein Panel gleichzeitig)

### Stat Counter
- Animierte Zahlen beim Erscheinen (IntersectionObserver)
- Ease-Out-Easing für natürliche Bewegung
- Respektiert reduced-motion

### Scroll-Reveal
- Elemente erscheinen mit `translateY(20px)` + Opacity
- Staggered Animation durch DOM-Reihenfolge
- Nur bei erster Sichtbarkeit

### Cookie Consent
- Slide-Up Animation
- Detail-Accordion für Kategorien
- Sanfte Transitions

---

## Dark Mode

### Implementation
- `data-theme="dark"` auf `<html>`
- CSS Custom Properties für alle Farben
- localStorage speichert Präferenz
- System-Präferenz als Fallback

### SVG Toggle
- Sonne/Mond-Icons (kein Emoji)
- Sanfter Icon-Wechsel
- Korrekte ARIA-Labels

### Farbanpassungen
- Dunkler Hintergrund: #0F172A
- Surface: #1E293B
- Heller Text: #F1F5F9
- Angepasste Schatten (stärker)

### Bilder
- `filter: brightness(0.9)` für reduzierte Helligkeit
- Logo-Inversion via CSS Filter

---

## Schema.org SEO

### Hauptseite
- **LocalBusiness**: Name, Adresse, Geo, Kontakt, Rating, Social
- **FAQPage**: Alle 18 FAQ-Fragen
- **ItemList**: Freie Zimmer als Offers

### Unterseiten
- **BreadcrumbList**: Vollständige Breadcrumb-Navigation
- Korrekte Position und Item-URLs

### Social Meta
- Open Graph Tags (og:type, og:url, og:title, etc.)
- Twitter Cards (summary_large_image)
- Canonical URLs

---

## Struktur

### index.html (15 Sektionen)
1. Header (fixed, Dropdown, Mobile-Nav)
2. Hero (100vh, Hintergrundbild)
3. Über uns (2-Spalten, 4 animierte Stats)
4. Lage (SVG-Karte, Entfernungen)
5. Freie Zimmer (4 Karten)
6. Vorteile (6 Benefit-Cards)
7. So geht's (3 Schritte)
8. Keine Besichtigung (3 Alternativen)
9. 360° Touren (4 Tour-Cards)
10. Bewertungen (3 Testimonials)
11. Galerie (Filter, 29 Bilder, Lightbox)
12. WG-Typen (4 Typ-Cards)
13. Kontakt (Info + Formular)
14. FAQ (18 Fragen, Accordion)
15. Footer (4-Spalten)

### Unterseiten (gleiches Template)
- **studenten-wg.html**: Du-Anrede, Uni-Entfernungen
- **mediziner-wg.html**: Du-Anrede, Klinik-Entfernungen
- **inklusive-wg.html**: Du-Anrede, SVG-Grundriss
- **senioren-wg.html**: **Sie-Anrede**, Umgebungs-Infos

---

## CSS Design System

### Custom Properties
- 60+ CSS Variables definiert
- Farben, Typografie, Abstände, Schatten, Radien, Transitions
- Vollständige Dark Mode-Varianten

### BEM-ähnliche Konvention
- Block: `.header`, `.section`, `.card`
- Element: `.header__logo`, `.card__title`
- Modifier: `.btn--primary`, `.section--surface`

### Spacing (8px Grid)
- --space-1 bis --space-24
- Konsistent in allen Komponenten

### Typografie
- Inter Font Family
- 8 Größen definiert (xs bis 5xl)
- 5 Gewichte (normal bis extrabold)

---

## JavaScript-Features

### Module
- Theme Toggle (Dark Mode)
- Header Scroll Effects
- Scroll Progress Bar
- Mobile Navigation
- Smooth Scroll
- Stat Counter Animation
- Scroll Reveal
- Gallery Filter
- Lightbox
- FAQ Accordion (Single-Open)
- Contact Form Validation
- Cookie Consent
- Lazy Loading Fallback

### Best Practices
- IIFE für Scope-Isolation
- Passive Event Listeners
- requestAnimationFrame
- IntersectionObserver
- No jQuery Dependencies

---

## Dateien

```
v017/
├── index.html          # Hauptseite (15 Sektionen)
├── studenten-wg.html   # Unterseite Studenten
├── mediziner-wg.html   # Unterseite Mediziner
├── inklusive-wg.html   # Unterseite Inklusive
├── senioren-wg.html    # Unterseite Senioren (Sie-Anrede)
├── styles.css          # Vollständiges Stylesheet (~2000 Zeilen)
├── main.js             # JavaScript (~500 Zeilen)
├── CHANGES.md          # Diese Dokumentation
└── assets/
    ├── logos/          # SVG Logos
    └── img/            # 32 JPG Bilder
```

---

## Galerie-Bildverteilung

### Grasstraße (5 Bilder)
- allgemeinflaechen/foto_01.jpg
- allgemeinflaechen/foto_02.jpg
- allgemeinflaechen/foto_03.jpg
- allgemeinflaechen/neu_01.jpg
- allgemeinflaechen/neu_02.jpg

### Klarastraße (5 Bilder)
- allgemeinflaechen/foto_04.jpg
- allgemeinflaechen/foto_05.jpg
- allgemeinflaechen/foto_06.jpg
- allgemeinflaechen/foto_07.jpg
- allgemeinflaechen/neu_04.jpg

### Sternstraße (4 Bilder)
- allgemeinflaechen/foto_09.jpg
- zimmer-unmoebliert/raum_14.jpg
- zimmer-unmoebliert/raum_15.jpg
- zimmer-unmoebliert/raum_16.jpg

### Zimmer (15 Bilder)
- zimmer-moebliert/zimmer_01-06.jpg (6)
- zimmer-unmoebliert/raum_01-03, 05, 07-08, 10-12.jpg (9)

---

## Verbesserungen gegenüber v016

1. **Accessibility**: Vollständige WCAG 2.1 AA Compliance
2. **Performance**: Critical CSS inline, lazy loading, content-visibility
3. **Code-Qualität**: Saubere CSS Custom Properties, BEM-Konvention
4. **Micro-Interactions**: Feinere Hover-States, Click-Feedback
5. **Dark Mode**: Verbesserte Farbkontraste
6. **Mobile**: Bessere Touch-Unterstützung (Lightbox Swipe)
7. **Forms**: Vollständige Client-Side Validation mit ARIA
8. **Cookie Consent**: DSGVO-konform mit Kategorien
