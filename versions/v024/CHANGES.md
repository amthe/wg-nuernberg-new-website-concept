# WG Nürnberg Website v024 - CHANGES

## Übersicht

Version 024 ist ein kompletter Neubau der WG Nürnberg Website mit einem einheitlichen, modernen Design-System.

## Erstellte Dateien

### Hauptseiten
- `index.html` - Startseite mit allen 15 Sektionen
- `studenten-wg.html` - Unterseite für Studenten-WG
- `mediziner-wg.html` - Unterseite für Mediziner-WG
- `inklusive-wg.html` - Unterseite für Inklusive-WG
- `young-professionals-wg.html` - Unterseite für Young Professionals-WG

### Styles & Scripts
- `styles.css` - Komplettes Design-System mit CSS Custom Properties
- `main.js` - Alle interaktiven Funktionen

### SEO & Technisch
- `robots.txt` - Suchmaschinen-Anweisungen
- `sitemap.xml` - XML-Sitemap für SEO

## Design System

### Farben
- **Primary**: #10B981 (Grün) mit Light (#34D399) und Dark (#059669) Varianten
- **Accent**: #0EA5E9 (Blau) mit Light (#38BDF8) und Dark (#0284C7) Varianten
- **Gradient**: linear-gradient(135deg, #10B981, #0EA5E9) - NUR für Hero-Text und Scroll-Progress
- **Badge-Farben**:
  - Studenten: #10B981 (Grün)
  - Mediziner: #0EA5E9 (Blau)
  - Inklusive: #8B5CF6 (Lila)
  - Young Professionals: #F59E0B (Orange)

### Light Mode
- Background: #FFFFFF
- Surface: #F8FAFC
- Text: #1E293B
- Secondary: #64748B
- Muted: #94A3B8
- Border: #E2E8F0

### Dark Mode
- Background: #0F172A
- Surface: #1E293B
- Text: #F1F5F9
- Secondary: #CBD5E1
- Border: #334155

### Typografie
- **Font**: Inter (Google Fonts) mit system-ui Fallback
- **H1**: 3rem/2.25rem mobil, 800 weight
- **H2**: 2.25rem/1.75rem mobil, 700 weight
- **H3**: 1.5rem/1.25rem, 600 weight
- **Body**: 1rem, 400 weight, 1.6 line-height

### Abstände (8px Grid)
- space-1 bis space-20
- Section Padding: space-16 (mobil) / space-20 (desktop)
- Card Gap: space-6

### Komponenten
- **Cards**: Surface BG, 1px border, 12px radius, hover translateY(-2px)
- **Buttons**: Primary (grün), Secondary (transparent), WhatsApp (#25D366)
- **Badges**: Pills mit 999px radius
- **Section Headers**: Eyebrow → H2 → Description

## Sektionen (index.html)

1. **Header** (fixed)
   - Logo links
   - Desktop-Navigation mit Dropdown für WG-Typen
   - Dark Mode Toggle (SVG-Icons, KEIN Emoji)
   - Mobile Hamburger-Menü

2. **Hero** (100vh)
   - Unsplash Stock-Photo (fröhliche junge Leute)
   - Semi-transparentes Overlay
   - Badge "Seit 2002 in der Lorenzer Altstadt"
   - H1 Titel
   - CTA-Buttons: "Jetzt anfragen" + "WhatsApp"

3. **Über uns**
   - Zwei-Spalten-Layout
   - Echtes Foto aus assets/img/Allgemeinflächen/
   - 4 animierte Stat-Counter (20+ Jahre, 120+ Bewohner, 20+ Nationalitäten, 17 WGs)

4. **Lage**
   - Karten-Placeholder (kein broken Image)
   - Entfernungen nach Kategorien: Zu Fuß, Fahrrad, Bahn

5. **Freie Zimmer**
   - 4 Karten mit echten Fotos
   - Kategorie-Badges
   - Größe, Preis, Verfügbarkeit
   - Footer: "Aktualisiert täglich um 08:00 Uhr"

6. **Vorteile**
   - 6 Feature-Cards
   - Keine Provision, Eigener Mietvertrag, Echte Flatrate, etc.

7. **So geht's**
   - 3 Step-Cards horizontal
   - Schritt 2 (Vertrag) hervorgehoben

8. **Keine Besichtigung nötig**
   - 3 Alternativen-Cards (360° Tour, Fotos & Grundrisse, Video-Call)
   - CTA-Button

9. **360° Touren**
   - 4 Tour-Cards mit Play-Overlay
   - Echte Fotos aus assets/

10. **Bewertungen**
    - 3 Testimonial-Cards mit 5-Sterne-Bewertungen
    - Autor-Avatar und Info

11. **Galerie**
    - Filter-Buttons: Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer
    - Alle 32 echten Fotos eingebunden
    - Lightbox mit Keyboard- und Touch-Swipe-Support

12. **WG-Typen**
    - 4 Cards mit Links zu Unterseiten
    - Farbcodierte Icons

13. **Kontakt**
    - Zwei-Spalten: Info + Formular
    - Formular: Name, E-Mail, Telefon (opt.), Einzugsdatum, Mietdauer, Nachricht

14. **FAQ**
    - Accordion mit 19 Fragen
    - Erste Frage (Besichtigung) standardmäßig geöffnet

15. **Footer**
    - 4-Spalten: Brand/Social, Navigation, WG-Typen, Kontakt
    - Copyright, Impressum, Datenschutz

## JavaScript-Funktionen

- **ThemeManager**: Dark/Light Mode mit localStorage-Persistenz und System-Preference-Support
- **MobileNav**: Hamburger-Menü mit Touch-Support
- **HeaderScroll**: Shadow-Effekt beim Scrollen
- **ScrollProgress**: Gradient-Fortschrittsbalken (3px)
- **ScrollReveal**: Animierte Einblendung beim Scrollen (respektiert prefers-reduced-motion)
- **StatCounters**: Animierte Zähler mit Easing
- **FAQAccordion**: Ein-Element-zu-einer-Zeit-Logik
- **GalleryFilter**: Kategorie-basierte Filterung
- **Lightbox**: Vollbild-Bildansicht mit Keyboard (Escape, Pfeile) und Touch-Swipe
- **CookieBanner**: 3 Kategorien (Notwendig required, Analyse, Marketing)
- **ContactForm**: Basis-Validierung und Submission-Handling
- **SmoothScroll**: Native smooth scroll für Anchor-Links
- **DropdownNav**: Accessible Dropdown-Menü

## Unterseiten-Struktur

Jede Unterseite enthält:
- Gleicher Header + Footer wie Startseite
- Breadcrumb-Navigation
- Subpage Hero mit Icon, Badge, H1
- Content-Sektion mit Fließtext
- 6 Feature-Cards
- 3 gefilterte Zimmer-Karten
- CTA-Sektion "Keine Besichtigung nötig"

## Accessibility

- Skip-Link zum Hauptinhalt
- ARIA-Labels für alle interaktiven Elemente
- Fokus-Styles für Keyboard-Navigation
- prefers-reduced-motion Support
- Semantisches HTML (header, main, nav, section, article, footer)
- Role-Attribute für Dialoge und Menüs

## SEO

- Schema.org JSON-LD: LocalBusiness, FAQPage, BreadcrumbList
- Open Graph Meta-Tags
- Twitter Card Meta-Tags
- Semantische HTML-Struktur
- robots.txt mit Sitemap-Verweis
- sitemap.xml mit allen Seiten

## Responsive Design

- Mobile-first Approach
- Breakpoints: <640px (mobile), 640-1024px (tablet), >1024px (desktop)
- Mobile: Hamburger-Menü, 1-Spalten-Karten, reduziertes Padding
- Flexible Grid-Layouts mit auto-fill

## Performance

- Lazy Loading für alle Bilder
- Google Fonts mit preconnect
- Minimale JavaScript-Abhängigkeiten (kein Framework)
- CSS Custom Properties für konsistentes Theming
- Effiziente Event-Handler mit passive und requestAnimationFrame

## Bekannte Platzhalter

- Hero-Bild: Unsplash Stock-Photo (kann durch echtes Foto ersetzt werden)
- Karten-Standort: Platzhalter (Google Maps Integration möglich)
- Kontaktformular: Frontend-only (Backend-Integration erforderlich)
- 360° Touren: Klick öffnet keine Tour (Integration erforderlich)

## Verbesserungen gegenüber v023

- Dark Mode Toggle verwendet SVG-Icons (KEIN Emoji)
- Karten-Standort als gestylter Platzhalter (kein broken Image)
- Galerie-Filter korrekt implementiert
- Konsistentes Design-System durchgehend angewendet
- Alle 32 echten Fotos aus assets/img/ eingebunden
