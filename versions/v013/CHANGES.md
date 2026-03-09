# WG Nürnberg Website v013 — Changelog

## Fokus: Enhanced Photo Gallery + Freie Zimmer Showcase + Visual Cohesion Polish

### Neue Features & Verbesserungen

#### 1. Enhanced Photo Gallery
- Vollständig neue Lightbox mit smoothen CSS-Transitions
- Touch-Swipe-Unterstützung für mobile Geräte
- Keyboard-Navigation (Pfeiltasten, Escape)
- Filter-Buttons für Standorte (Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer)
- Lazy Loading für optimale Performance
- Preload für benachbarte Bilder in Lightbox

#### 2. Freie Zimmer Showcase
- Prominentere Darstellung mit größeren, ansprechenderen Karten
- Kategorie-Badge mit Farbcodierung (Studenten, Mediziner, Inklusive, Senioren)
- Übersichtliche Infos: Größe, Preis, Verfügbarkeit
- Direkter Anfragen-Button pro Karte
- Live-Update-Hinweis "Aktualisiert täglich um 08:00 Uhr"

#### 3. Visual Cohesion Polish
- Komplett neuer Code von Grund auf — kein Copy-Paste
- Strikte Einhaltung des Design Systems
- Konsistente Typografie-Skala ohne Abweichungen
- Einheitlicher Karten-Stil für alle Komponenten
- Harmonische Farbbalance (max 2 Farben pro Sektion)

#### 4. Subtilere Animationen
- Reduzierte Scroll-Reveal: nur translateY(20px) + opacity
- Elegante Hover-Effekte: translateY(-2px) + Shadow
- 0.2s ease Transitions durchgehend
- Scroll-Progress-Bar mit Gradient (3px)
- prefers-reduced-motion wird respektiert

#### 5. Typography Refinement
- Exakte Einhaltung der 8er-Typografie-Skala
- Konsistente Section-Header: Eyebrow → H2 → Description
- Inter als primäre Schrift mit System-Fallbacks
- Keine willkürlichen Größen

### Technische Details

#### Design System Tokens
- Farben: Primary #10B981, Accent #0EA5E9
- 8px-Grid für alle Abstände
- CSS Custom Properties für Theming
- Dark Mode mit data-theme Attribut

#### Performance
- IntersectionObserver für Lazy Loading & Scroll-Reveal
- requestAnimationFrame für Scroll-Progress
- Optimierte Unsplash-URLs mit Größenangaben
- Minimaler JavaScript-Footprint

#### Accessibility
- Skip-Link zum Hauptinhalt
- ARIA-Labels für alle interaktiven Elemente
- Keyboard-Navigation durchgehend
- Focus-Styles für Tastaturbedienung
- WCAG AA Kontraste

#### SEO
- Schema.org: LocalBusiness, FAQPage, BreadcrumbList, Offer, AggregateRating
- Open Graph & Twitter Cards
- Semantisches HTML5
- robots.txt & sitemap.xml
- favicon.svg

### Dateien

```
v013/
├── index.html              # Hauptseite mit 15 Sektionen
├── studenten-wg.html       # Unterseite Studenten-WG
├── mediziner-wg.html       # Unterseite Mediziner-WG
├── inklusive-wg.html       # Unterseite Inklusive WG
├── senioren-wg.html        # Unterseite Senioren-WG (Sie-Anrede)
├── styles.css              # Komplettes Stylesheet
├── main.js                 # JavaScript für Interaktivität
├── robots.txt              # Crawler-Anweisungen
├── sitemap.xml             # Sitemap für SEO
├── favicon.svg             # Favicon
├── CHANGES.md              # Diese Datei
└── assets/
    └── logos/
        ├── wg-nuernberg-grey-optimized.svg
        └── wg-nuernberg-vertical-grey-optimized.svg
```

### Design-Entscheidungen

1. **Kein Parallax im Hero**: Bessere Performance, weniger Ablenkung
2. **SVG Dark Mode Toggle**: Eleganter als Emoji, skaliert perfekt
3. **Emoji-basierte Icons**: Konsistent, schnell ladend, universell
4. **Cookie Consent**: Minimaler Banner + optionaler Details-Dialog
5. **Mobile-First**: Alle Breakpoints von klein nach groß

### Browser-Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
