# WG Nürnberg v018 - Changelog

## Version 018: Premium Visual Polish + Elevated Interactions + Typographic Refinement

Veröffentlicht: 2026-03-10

---

## Übersicht der Verbesserungen

Diese Version konzentriert sich auf visuelle Verfeinerungen und erhöhte Interaktionsqualität, um ein Premium-Gefühl zu erzeugen.

---

## 1. Premium Visual Feel

### Layered Box-Shadows (Depth-Hierarchie)
- **6 Shadow-Stufen** implementiert: xs, sm, md, lg, xl, card
- Jede Stufe besteht aus **mehreren Ebenen** für realistische Tiefe
- Beispiel `--shadow-lg`:
  ```css
  0 10px 25px rgba(0,0,0,0.06),
  0 4px 10px rgba(0,0,0,0.04),
  0 2px 4px rgba(0,0,0,0.02)
  ```
- Spezielle **Card-Hover-Shadows** mit dreischichtiger Elevation

### Verbesserte Dark Mode Shadows
- Subtile **Border-Glow-Effekte** im Dark Mode
- `box-shadow` mit `rgba(255,255,255,0.03)` Border-Simulation
- Hover-State mit **Primary-Color-Glow**: `0 0 20px rgba(16,185,129,0.08)`

---

## 2. Elevated Card Design

### Konsistente Karten-Komponente
- **Einheitlicher Stil** für alle Karten (`.card`)
- Standard-Padding: `var(--space-8)` (32px)
- Border-Radius: `var(--radius-lg)` (12px)
- 1px Border mit `var(--color-border)`

### Mehrstufige Hover-Transitions
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}
```
- **Smooth Transition** mit `0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- Transform und Shadow-Transition getrennt für bessere Performance

### Spezielle Karten-Varianten
- `room-card` für Zimmer-Anzeigen
- `tour-card` für 360°-Touren
- `testimonial-card` für Bewertungen
- `wg-type-card` für WG-Kategorien
- `process-card` mit Highlight-Variante

---

## 3. Typography Refinement

### Optimierte Line-Heights
| Element | Line-Height | Verwendung |
|---------|-------------|------------|
| H1 | 1.1 (tight) | Hero-Überschriften |
| H2 | 1.2 (snug) | Sektions-Titel |
| H3 | 1.3 (normal) | Untertitel |
| H4 | 1.4 (relaxed) | Karten-Titel |
| Body | 1.6 (body) | Fließtext |

### Vertikaler Rhythmus
- Konsistente **Abstände zwischen Heading und Body**
- Section-Header: `margin-bottom: var(--space-12)` (48px)
- Eyebrow → H2: `margin-bottom: var(--space-3)` (12px)
- H2 → Description: `margin-bottom: var(--space-4)` (16px)

### Letter-Spacing
- H1: `-0.02em` für bessere Lesbarkeit
- H2: `-0.01em`
- Eyebrow/Labels: `0.05em` für Uppercase-Text

---

## 4. Polished Dark Mode

### Sanfte Farbübergänge
- Theme-Toggle mit `0.3s ease` Transition auf `html`
- Temporäre Transition beim Theme-Wechsel
- Automatische Entfernung nach Animation

### Surface-Elevation
- `--color-surface-elevated` für erhöhte Elemente
- Unterschiedliche Shadow-Definitionen für Dark Mode
- Border-Glow statt harte Schatten

### System-Präferenz-Support
- `prefers-color-scheme` als Fallback
- Live-Update bei System-Änderung
- localStorage für Benutzer-Präferenz

---

## 5. Masonry-ähnliches Galerie-Layout

### CSS Columns Implementation
```css
.gallery-grid {
  column-count: 2; /* 3 auf Tablet, 4 auf Desktop */
  column-gap: var(--space-4);
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: var(--space-4);
}
```

### Smooth Filter-Animationen
- `opacity` und `transform: scale()` für Filter-Übergänge
- `0.4s cubic-bezier` Timing-Function
- Absolutes Positioning für gefilterte Items (Layout-Stabilität)

### Lightbox-Features
- Keyboard-Navigation (Arrow-Keys, Escape)
- Touch-Swipe-Support
- Focus-Management für Accessibility
- Backdrop-Blur-Effekt

---

## 6. Form UX - Floating Labels

### Implementation
```css
.form-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
}

.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: var(--color-primary);
}
```

### Validation States
- Sanfte Animations für Error/Success
- Real-time Validation auf `blur` und `input`
- Visuelle Feedback mit Border-Farben
- Error-Messages mit `display: none/block` Animation

### Focus-States
- 3px Glow mit `rgba(16,185,129,0.1)`
- Border-Color Transition
- Outline-Ersatz für bessere Optik

---

## 7. Hero Refinement

### Text-Kontrast
- Gradient-Overlay mit drei Stufen:
  ```css
  linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.6) 0%,
    rgba(15, 23, 42, 0.75) 50%,
    rgba(15, 23, 42, 0.85) 100%
  )
  ```
- Text-Shadow für zusätzliche Lesbarkeit

### Eleganter Badge-Stil
- Glassmorphism-Effekt: `backdrop-filter: blur(10px)`
- Semi-transparenter Background
- Subtile Border mit `rgba(255,255,255,0.2)`

### Gradient-Text
```css
.hero__title-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 8. Performance-Optimierungen

### CSS
- Critical CSS inline im `<head>`
- `font-display: swap` für Google Fonts
- `preconnect` für externe Ressourcen
- CSS Custom Properties für Theme-Switching

### JavaScript
- Event-Delegation wo möglich
- `requestAnimationFrame` für Scroll-Handler
- `passive: true` für Scroll/Touch-Events
- Intersection Observer für Scroll-Reveal
- Lazy Loading für Galerie-Bilder

### Accessibility
- Skip-Link
- `:focus-visible` statt `:focus`
- ARIA-Labels und Roles
- Keyboard-Navigation
- `prefers-reduced-motion` Support

---

## 9. Strukturelle Änderungen

### Dateien
- `index.html` - Hauptseite mit 15 Sektionen
- `studenten-wg.html` - Studenten-WG Unterseite
- `mediziner-wg.html` - Mediziner-WG Unterseite
- `inklusive-wg.html` - Inklusive-WG Unterseite
- `senioren-wg.html` - Senioren-WG Unterseite (SIE-Anrede)
- `styles.css` - Komplettes Design System
- `main.js` - Alle Interaktionen
- `favicon.svg` - Vektor-Favicon mit Gradient
- `robots.txt` - SEO
- `sitemap.xml` - SEO
- `CHANGES.md` - Diese Dokumentation

### Assets-Struktur
```
assets/
├── logos/
│   ├── wg-nuernberg-grey-optimized.svg
│   └── wg-nuernberg-vertical-grey-optimized.svg
└── img/
    ├── allgemeinflaechen/
    ├── zimmer-moebliert/
    └── zimmer-unmoebliert/
```

---

## 10. Schema.org SEO

### Implementierte Schemas
- **LocalBusiness** - Unternehmensdaten
- **FAQPage** - FAQ-Sektion
- **BreadcrumbList** - Navigation auf Unterseiten

### Open Graph & Twitter Cards
- Vollständige Meta-Tags
- Canonical URLs
- Lokalisierung (de_DE)

---

## Bekannte Verbesserungsmöglichkeiten für v019

1. View Transitions API für Page-Navigation
2. Parallax-Effekte (dezent, motion-safe)
3. Micro-Interactions für Buttons
4. Progressive Image Loading
5. Service Worker für Offline-Support
6. Form-Submission mit Backend-Integration

---

## Technische Details

### Browser-Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### CSS Features
- CSS Custom Properties
- CSS Grid & Flexbox
- CSS Columns (Masonry)
- CSS Transitions & Transforms
- `@view-transition` (Progressive Enhancement)

### JavaScript
- Vanilla JS (kein Framework)
- ES6+ Syntax
- Intersection Observer API
- LocalStorage API
- Touch Events API

---

*Erstellt von Claude Code - v018*
