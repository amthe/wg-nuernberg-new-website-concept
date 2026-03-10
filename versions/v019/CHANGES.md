# WG Nürnberg Website v019 - Changes

## Kompletter Neuaufbau

Diese Version wurde **komplett von Grund auf neu entwickelt** ohne Code aus vorherigen Versionen zu kopieren. Das Ziel war eine Website, die aus einem Guss wirkt.

---

## Neue Features in v019

### 1. View Transitions API
- Progressive Enhancement für sanfte Page-Navigation
- CSS `@view-transition` für moderne Browser
- Fallback für ältere Browser gewährleistet

### 2. Progressive Image Loading
- Blur-up Placeholder-Technik implementiert
- `loading` und `loaded` CSS-Klassen für sanfte Übergänge
- IntersectionObserver für effizientes Lazy Loading

### 3. Verbesserte Micro-Interactions
- Ripple Effect für alle Buttons (CSS-basiert)
- Sanfte translateY + Box-Shadow Hover-Effekte
- Cubic-bezier Transitions für natürliche Bewegungen

### 4. Performance-Optimierungen
- IntersectionObserver für Scroll-Reveal Animationen
- Lazy Loading für alle Bilder unterhalb des Folds
- `defer` Attribut für JavaScript
- Optimierte CSS Custom Properties

### 5. Accessibility (WCAG 2.1)
- Skip-Link für Keyboard-Navigation
- ARIA Labels für alle interaktiven Elemente
- `:focus-visible` Outlines
- Vollständige Keyboard-Navigation für Galerie + Lightbox
- `prefers-reduced-motion` Respektierung
- Semantisches HTML5

---

## Design System

### Farben
| Token | Wert | Verwendung |
|-------|------|------------|
| Primary | #10B981 | Buttons, Links, Akzente |
| Primary Light | #34D399 | Hover-States |
| Primary Dark | #059669 | Active-States |
| Accent | #0EA5E9 | Sekundäre Akzente |
| Gradient | 135deg, #10B981 → #0EA5E9 | Hero-Text, Progress Bar |

### Badge-Farben
| Kategorie | Farbe |
|-----------|-------|
| Studenten | #10B981 (Grün) |
| Mediziner | #0EA5E9 (Blau) |
| Inklusive | #8B5CF6 (Violett) |
| Young Professionals | #F59E0B (Amber) |

### Typografie
- **Font:** Inter (Google Fonts) - einziger Font
- **H1:** 3rem/2.25rem mobil, weight 800
- **H2:** 2.25rem/1.75rem mobil, weight 700
- **H3:** 1.5rem/1.25rem mobil, weight 600
- **Body:** 1rem, weight 400, line-height 1.6

### Spacing (8px Grid)
- space-1 bis space-20 als CSS Custom Properties
- Konsistente Abstände in allen Komponenten
- Sektionen: space-20 desktop, space-16 mobil

### Komponenten
- **Cards:** Einheitlicher Stil mit 12px Radius, 1px Border, hover translateY(-2px)
- **Buttons:** Primary, Secondary, WhatsApp mit Ripple-Effect
- **Badges:** Pill-Shape mit kategorie-spezifischen Farben

---

## Struktur

### Dateien
```
v019/
├── index.html              # Hauptseite mit allen Sektionen
├── studenten-wg.html       # Unterseite Studenten-WG
├── mediziner-wg.html       # Unterseite Mediziner-WG
├── inklusive-wg.html       # Unterseite Inklusive-WG
├── young-professionals-wg.html  # Unterseite Young Professionals-WG
├── styles.css              # Komplettes Design System
├── main.js                 # JavaScript Funktionalität
├── favicon.svg             # SVG Favicon mit Gradient
├── robots.txt              # SEO
├── sitemap.xml             # SEO Sitemap
├── CHANGES.md              # Diese Dokumentation
└── assets/
    ├── logos/              # Logo-Dateien
    └── img/                # Foto-Assets
        ├── allgemeinflaechen/
        ├── zimmer-moebliert/
        └── zimmer-unmoebliert/
```

### Hauptseite Sektionen (in Reihenfolge)
1. Header (fixed) mit Dropdown-Navigation
2. Hero (100vh) mit Unsplash-Bild
3. Über uns mit Statistiken
4. Lage mit Karten-Placeholder und Entfernungen
5. Freie Zimmer (4 Beispiel-Karten)
6. Vorteile (6 Karten)
7. So gehts (3 Schritte)
8. Keine Besichtigung nötig (3 Alternativen)
9. 360° Touren (4 Tour-Karten)
10. Bewertungen (3 Testimonials)
11. Galerie mit Filter + Lightbox
12. WG-Typen (4 Karten)
13. Kontakt (Info + Formular)
14. FAQ (18 Fragen, Accordion)
15. Footer (4 Spalten)

---

## SEO & Schema.org

### Implementiert
- **LocalBusiness** Schema für Unternehmensdaten
- **FAQPage** Schema für FAQ-Sektion
- **BreadcrumbList** Schema auf allen Seiten
- **Review** Schema mit AggregateRating
- Open Graph Meta-Tags
- Twitter Card Meta-Tags
- robots.txt und sitemap.xml

---

## Dark Mode

### Implementierung
- Toggle im Header mit SVG-Icons (Sonne/Mond)
- `data-theme="dark"` auf `<html>` Element
- localStorage Key: `wgn-theme`
- System-Präferenz wird respektiert
- Alle Komponenten haben Dark Mode Styles
- Bilder: reduzierte Brightness
- Cards: Border-Glow Effekt

---

## JavaScript Features

### Funktionen
1. **Theme Toggle** - Dark/Light Mode mit localStorage
2. **Scroll Progress Bar** - Gradient Progress am oberen Rand
3. **Header Scroll Effect** - Shadow bei Scroll
4. **Mobile Navigation** - Hamburger-Menü mit Animation
5. **Desktop Dropdowns** - Keyboard-accessible Dropdowns
6. **FAQ Accordion** - Smooth Animation
7. **Gallery Filter** - Kategorie-basierte Filterung
8. **Lightbox** - Keyboard + Touch-Swipe Support
9. **Scroll Reveal** - IntersectionObserver Animationen
10. **Progressive Images** - Blur-up Loading
11. **Contact Form** - Client-side Validation
12. **Smooth Scroll** - Anchor Links

---

## Responsive Breakpoints

| Breakpoint | Wert |
|------------|------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## Assets verwendet

### Fotos aus assets/img/
- allgemeinflaechen: foto_01-09, neu_01, neu_02, neu_04
- zimmer-moebliert: zimmer_01-06
- zimmer-unmoebliert: raum_01-03, raum_05, raum_07-08, raum_10-12, raum_14-16, foto_08, foto_10, foto_13

### Logos
- wg-nuernberg-grey-optimized.svg (Header + Footer)

### Externe Ressourcen
- Google Fonts: Inter
- Unsplash Hero Image

---

## Verbesserungen gegenüber v018

1. **Konsistenteres Design System** - Alle Tokens zentralisiert
2. **Bessere Typografie-Hierarchie** - Klares Letter-Spacing und Line-Height
3. **Modernere Animationen** - View Transitions API
4. **Verbesserte Performance** - IntersectionObserver statt Scroll Events
5. **Sauberer Dark Mode** - Einheitliche Border-Glow Effekte
6. **Masonry Galerie** - CSS Columns für natürliches Layout
7. **Touch-Swipe Lightbox** - Mobile-freundlich
8. **Progressive Image Loading** - Blur-up Technik

---

## Bekannte Einschränkungen

- 360° Tour-Links sind Platzhalter
- Kontaktformular sendet nicht wirklich (Frontend-only)
- Kartenansicht ist ein Platzhalter-Bild
- WhatsApp/Telefon-Nummern sind Beispieldaten

---

## Browser-Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+
- Mobile: iOS Safari 15+, Chrome Android 90+

---

*Erstellt: März 2026*
*Version: 019*
