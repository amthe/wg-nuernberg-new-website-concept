# WG Nürnberg Website v006 - CHANGES

## Übersicht

Version 006 wurde von Grund auf neu entwickelt mit Fokus auf **Performance** und **Accessibility**. Ziel: Lighthouse 90+ in allen Kategorien, WAVE 0 Errors.

---

## Erstellte Dateien

| Datei | Beschreibung |
|-------|--------------|
| `styles.css` | Optimiertes Design System mit CSS Custom Properties |
| `index.html` | Hauptseite mit 15 Sektionen |
| `studenten-wg.html` | Unterseite für Studenten |
| `mediziner-wg.html` | Unterseite für Mediziner/Klinikpersonal |
| `inklusive-wg.html` | Unterseite für barrierefreies Wohnen |
| `senioren-wg.html` | Unterseite für Senioren (Sie-Anrede) |
| `CHANGES.md` | Diese Dokumentation |

---

## Performance-Optimierungen

### Ladezeit & Ressourcen

1. **Font Loading**
   - `preconnect` für Google Fonts und gstatic.com
   - `font-display: swap` in Google Fonts URL
   - Fallback-Fonts: `system-ui, -apple-system, sans-serif`

2. **Bilder**
   - `loading="lazy"` für alle Bilder außer Hero
   - `fetchpriority="high"` für Hero-Bild
   - Explizite `width` und `height` Attribute (verhindert Layout Shifts)
   - `preconnect` für images.unsplash.com

3. **CSS**
   - Keine Duplikate - jede Regel nur einmal definiert
   - Logische Struktur: Tokens → Reset → Layout → Components → Sections → Utilities → Dark Mode → Responsive
   - Minimale Spezifität wo möglich
   - Effiziente Selektoren (keine tief verschachtelten)

4. **JavaScript**
   - Am Ende des Body (nicht render-blocking)
   - Event-Delegation wo sinnvoll
   - `requestAnimationFrame` für Scroll-Events (Throttling)
   - IntersectionObserver für Scroll-Reveal (performanter als scroll-Events)
   - IIFEs für Scope-Isolation (keine globalen Variablen)

5. **Animationen**
   - `will-change` nicht verwendet (Browser-Optimierung)
   - Nur `transform` und `opacity` animiert (GPU-beschleunigt)
   - `prefers-reduced-motion` respektiert

---

## Accessibility-Maßnahmen

### WCAG 2.1 AA Konformität

1. **Skip Link**
   - Unsichtbar bis fokussiert
   - "Zum Hauptinhalt springen"
   - Springt zu `#main`

2. **Semantisches HTML**
   - Korrekte Heading-Hierarchie (h1 → h2 → h3)
   - Landmark-Regionen: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
   - `role="banner"`, `role="contentinfo"`, `role="navigation"`
   - `aria-labelledby` für alle Sektionen

3. **Bilder**
   - Alle Bilder haben sinnvolle deutsche `alt`-Texte
   - Dekorative Elemente: `aria-hidden="true"`
   - Emojis in `aria-hidden="true"` Containern

4. **Formulare**
   - Alle Inputs haben zugehörige `<label>`
   - `required` Attribute wo nötig
   - Visuelle Kennzeichnung mit `*` für Pflichtfelder
   - `autocomplete` Attribute für bessere UX

5. **Navigation**
   - Mobile Nav mit `aria-hidden` und `aria-expanded`
   - Alle Links haben erkennbaren Text
   - Focus-States für alle interaktiven Elemente
   - `aria-label` für Icon-Links (Social Media)

6. **Kontrast**
   - Alle Text-Farben WCAG AA konform
   - Badges mit ausreichendem Kontrast in Light/Dark Mode
   - Dark Mode: Angepasste Farben für bessere Lesbarkeit

7. **Tastaturnavigation**
   - Alle interaktiven Elemente fokussierbar
   - Sichtbare Focus-States (`outline: 3px solid var(--accent)`)
   - Logische Tab-Reihenfolge
   - ESC schließt Lightbox

8. **FAQ Accordion**
   - `aria-expanded` für Buttons
   - `aria-controls` verknüpft Button mit Antwort
   - Erste FAQ standardmäßig geöffnet

9. **Lightbox**
   - `role="dialog"` und `aria-modal="true"`
   - Focus wird auf Close-Button gesetzt
   - ESC zum Schließen
   - Click außerhalb schließt

---

## Design System Umsetzung

### Farben (CSS Custom Properties)

```css
--primary: #10B981;
--primary-light: #34D399;
--primary-dark: #059669;
--accent: #0EA5E9;
--accent-light: #38BDF8;
--accent-dark: #0284C7;
```

### Dark Mode

- Toggle im Header (☀️/🌙)
- `data-theme` auf `<html>`
- Persistent via `localStorage` (Key: `wgn-theme`)
- Alle Komponenten unterstützen Dark Mode

### Spacing (8px Grid)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Komponenten

- **Cards**: Einheitlicher Stil, hover mit `translateY(-2px)`
- **Buttons**: Primary, Secondary, WhatsApp
- **Badges**: 4 Typen (Studenten, Mediziner, Inklusive, Senioren)
- **Section Header**: Eyebrow → H2 → Description

---

## Sektionen auf index.html

1. **Header** (fixed) - Logo, Nav, CTA, Dark Mode Toggle
2. **Hero** (100vh) - Unsplash BG, Badge, H1, 2 Buttons
3. **Über uns** - 2-Spalten, 4 Stats
4. **Lage** - Karte + Entfernungen
5. **Freie Zimmer** - 4 Zimmer-Karten
6. **Vorteile** - 6 Feature-Karten
7. **So geht's** - 3 Schritte
8. **Keine Besichtigung** - 3 Alternativen
9. **360° Touren** - 4 Tour-Karten
10. **Bewertungen** - 3 Testimonials
11. **Galerie** - Filter + Grid + Lightbox
12. **WG-Typen** - 4 Karten mit Links
13. **Kontakt** - Info + Formular
14. **FAQ** - 19 Fragen Accordion
15. **Footer** - 4 Spalten, Legal Links

---

## Unterseiten-Struktur

Alle Unterseiten folgen dem gleichen Schema:

1. Header (identisch)
2. Mini Hero (Surface BG, Emoji, H1)
3. Features (6 Punkte, 2-Spalten)
4. Spezifische Inhalte
5. Freie Zimmer (kategorisiert)
6. CTA Section (Gradient BG)
7. Footer (identisch)

### Senioren-WG Besonderheit

- **Konsequente "Sie"-Anrede** in allen Texten
- Footer: "Ihr Zuhause" statt "Dein Zuhause"
- Respektvolle, formelle Ansprache

---

## JavaScript-Funktionen

| Funktion | Beschreibung |
|----------|--------------|
| Theme Toggle | Light/Dark Mode Wechsel |
| Mobile Nav | Hamburger Menu |
| Header Scroll | Shadow bei Scroll |
| Scroll Progress | Gradient-Fortschrittsbalken |
| Scroll Reveal | Fade-In Animation |
| FAQ Accordion | Öffnen/Schließen |
| Gallery Filter | Kategorie-Filter |
| Lightbox | Bildvergrößerung |

Alle Funktionen:
- In IIFEs gekapselt
- `requestAnimationFrame` für Scroll-Performance
- `prefers-reduced-motion` respektiert
- Keine externen Dependencies

---

## Verbesserungen gegenüber v005

| Bereich | v005 | v006 |
|---------|------|------|
| Skip Link | Fehlt | ✅ Vorhanden |
| Alt-Texte | Teilweise | ✅ Alle deutsch, beschreibend |
| Heading Hierarchy | Nicht geprüft | ✅ Korrekt h1→h2→h3 |
| Form Labels | Teilweise | ✅ Alle vorhanden |
| ARIA | Minimal | ✅ Umfassend |
| Lazy Loading | Nicht genutzt | ✅ Alle Bilder außer Hero |
| Preconnect | Fehlt | ✅ Fonts & Images |
| Focus States | Standard | ✅ Custom, sichtbar |
| Dark Mode Kontrast | Nicht geprüft | ✅ WCAG AA |
| JS Performance | Nicht optimiert | ✅ rAF, IntersectionObserver |

---

## Empfohlene Tests

### Lighthouse
```bash
npx lighthouse index.html --view
```

### WAVE
- WAVE Browser Extension installieren
- Alle 6 Seiten prüfen

### Keyboard Navigation
- Tab durch alle Elemente
- Enter/Space für Interaktion
- ESC für Lightbox

### Screen Reader
- VoiceOver (Mac): CMD+F5
- NVDA (Windows)
- Alle Sektionen durchgehen

---

## Offene Punkte für Produktion

- [ ] Echte WhatsApp-Nummer eintragen
- [ ] Echte Social Media Links
- [ ] Impressum/Datenschutz Seiten
- [ ] 360° Tour iframes einbinden
- [ ] Kontaktformular Backend
- [ ] Meta Tags für Social Sharing
- [ ] Favicon/App Icons
- [ ] robots.txt / sitemap.xml
