# WG Nürnberg v015 - Changelog

## Hauptfokus: Echte WG-Fotos statt Stock Photos

Version 015 baut die gesamte Website von Grund auf neu mit dem klaren Fokus darauf, alle 32 verfügbaren echten WG-Fotos zu verwenden anstelle von Unsplash/Stock-Bildern.

---

## Dateien

| Datei | Beschreibung |
|-------|--------------|
| `index.html` | Hauptseite mit allen 15 Sektionen |
| `styles.css` | Komplettes Design System |
| `script.js` | Alle interaktiven Features |
| `studenten-wg.html` | Unterseite Studenten-WG |
| `mediziner-wg.html` | Unterseite Mediziner-WG |
| `inklusive-wg.html` | Unterseite Inklusive WG |
| `senioren-wg.html` | Unterseite Senioren-WG (mit Sie-Anrede) |

---

## Verwendete echte Fotos

### Hero-Bereich
- `assets/img/allgemeinflaechen/neu_01.jpg` - Moderne Gemeinschaftsküche als Hero-Hintergrund

### Über uns Sektion
- `assets/img/allgemeinflaechen/foto_01.jpg` - Gemeinschaftsbereich

### Freie Zimmer Karten (Hauptseite)
- `assets/img/zimmer-moebliert/zimmer_01.jpg` - Studenten-Zimmer
- `assets/img/zimmer-unmoebliert/raum_01.jpg` - Mediziner-Zimmer
- `assets/img/zimmer-moebliert/zimmer_03.jpg` - Inklusive-Zimmer
- `assets/img/zimmer-unmoebliert/raum_05.jpg` - Senioren-Zimmer

### 360° Touren Karten
- `assets/img/allgemeinflaechen/foto_02.jpg` - Studenten-WG Tour
- `assets/img/allgemeinflaechen/foto_03.jpg` - Mediziner-WG Tour
- `assets/img/allgemeinflaechen/foto_04.jpg` - Inklusive WG Tour
- `assets/img/allgemeinflaechen/foto_05.jpg` - Senioren-WG Tour

### Galerie (alle 32 Fotos)
#### Möblierte Zimmer (6)
- `zimmer_01.jpg` bis `zimmer_06.jpg`

#### Unmöblierte Zimmer (15)
- `raum_01.jpg`, `raum_02.jpg`, `raum_03.jpg`, `raum_05.jpg`, `raum_07.jpg`
- `raum_08.jpg`, `raum_10.jpg`, `raum_11.jpg`, `raum_12.jpg`, `raum_14.jpg`
- `raum_15.jpg`, `raum_16.jpg`
- `foto_08.jpg`, `foto_10.jpg`, `foto_13.jpg`

#### Allgemeinflächen (11)
- `foto_01.jpg` bis `foto_07.jpg`, `foto_09.jpg`
- `neu_01.jpg`, `neu_02.jpg`, `neu_04.jpg`

---

## Features

### Navigation
- Fixed Header mit Scroll-Effekt
- Desktop: Hover-Dropdown für "Unsere WGs" mit farbcodierten Badges
- Mobile: Hamburger-Menü mit aufklappbarer WG-Gruppe
- Keyboard-Navigation (Tab, Enter, Escape)
- Dark Mode Toggle mit SVG-Icons (Sonne/Mond)

### Hero
- Vollbild-Hero mit echtem Foto als Hintergrund
- Semi-transparenter Gradient-Overlay
- Badge "Seit 2002"
- Gradient-Text-Effekt für "WG Nürnberg"
- Zwei CTAs: Anfragen + WhatsApp
- Scroll-Down Animation

### Über uns
- 2-Spalten Layout (Text + Bild)
- Animierte Stat-Counter (20+ Jahre, 120+ Bewohner, 20+ Nationalitäten, 17 WGs)
- IntersectionObserver für Counter-Animation

### Lage
- SVG-Karte der Lorenzer Altstadt
- 3 Entfernungs-Karten (Zu Fuß, Fahrrad, Bahn)
- Emoji-Icons

### Freie Zimmer
- 4 Zimmer-Karten mit echten Fotos
- Kategorie-Badge, Größe, Preis, Verfügbarkeit
- Hover-Effekt mit Bild-Zoom
- "Aktualisiert täglich um 08:00"

### Vorteile
- 6 Feature-Karten
- Emoji-Icons in runden Containern

### So geht's
- 3 Schritte horizontal mit Verbindungspfeilen
- Schritt 2 hervorgehoben ("Keine Besichtigung nötig")

### Keine Besichtigung
- 3 Alternativ-Karten (360° Tour, Fotos, Video-Call)

### 360° Touren
- 4 Tour-Karten mit Hover-Overlay
- SVG Crosshair-Icon

### Bewertungen
- 3 Testimonial-Karten
- 5-Sterne-Bewertung
- Avatar-Initialen

### Galerie
- Filter-Buttons: Alle / Möbliert / Unmöbliert / Allgemeinflächen
- Alle 32 Fotos integriert
- Responsive Grid
- Hover-Caption
- Lightbox:
  - Prev/Next Navigation
  - Keyboard (Pfeiltasten, Escape)
  - Touch-Swipe auf Mobile
  - Bildunterschrift
  - Zähler "X / 32"

### WG-Typen
- 4 Karten mit Links zu Unterseiten
- Farbcodierte Badges

### Kontakt
- 2-Spalten: Info-Karten + Formular
- Formular-Validierung mit Fehlermeldungen
- Felder: Name, E-Mail, Telefon (optional), Einzugsdatum, Mietdauer, Nachricht
- Submit-Animation

### FAQ
- 18 Fragen im Accordion
- Erste Frage offen: "Muss ich besichtigen? → Nein!"
- Details/Summary mit Animation

### Footer
- 4-Spalten: Brand/Social, Navigation, WG-Typen, Kontakt
- Social Icons (Instagram, Facebook, WhatsApp)
- Copyright + Impressum/Datenschutz

### Cookie Consent
- DSGVO-konform
- "Nur notwendige" / "Alle akzeptieren"
- LocalStorage-Speicherung

### Scroll Progress Bar
- Gradient-Leiste oben (Primary → Accent)
- Passt sich zur gescrollten Position an

---

## Design System (CSS Custom Properties)

### Farben
```css
/* Primary */
--primary: #10B981;
--primary-light: #34D399;
--primary-dark: #059669;

/* Accent */
--accent: #0EA5E9;
--accent-light: #38BDF8;
--accent-dark: #0284C7;

/* Badges */
--badge-studenten: #10B981;
--badge-mediziner: #0EA5E9;
--badge-inklusive: #8B5CF6;
--badge-senioren: #F59E0B;

/* Light Mode */
--background: #FFFFFF;
--surface: #F8FAFC;
--text: #1E293B;
--text-secondary: #64748B;
--border: #E2E8F0;

/* Dark Mode */
--background: #0F172A;
--surface: #1E293B;
--text: #F1F5F9;
--text-secondary: #CBD5E1;
--border: #334155;
```

### Typografie
- Font: Inter (Google Fonts)
- H1: 3rem/2.25rem mobil, 800
- H2: 2.25rem/1.75rem mobil, 700
- H3: 1.5rem/1.25rem mobil, 600
- Body: 1rem, 400, 1.6 Zeilenhöhe

### Spacing (8px Grid)
```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
```

### Komponenten
- Karten: 12px Radius, 1px Border, Shadow auf Hover
- Buttons: 8px Radius, Primary/Secondary/WhatsApp
- Badges: Pills mit 999px Radius

---

## Unterseiten

Alle 4 Unterseiten folgen der gleichen Struktur:
1. Header (identisch zur Hauptseite)
2. Mini-Hero (Emoji + Badge + H1 + Beschreibung, Surface-Background)
3. Inhalt (Fließtext + 6 Feature-Karten)
4. Freie Zimmer (nur diese Kategorie, mit echten Fotos)
5. CTA-Sektion
6. Footer

### Besonderheiten pro Seite

**studenten-wg.html:**
- Uni-Entfernungen (TH Nürnberg, FAU Erlangen, Akademie, Musikhochschule)
- Du-Anrede

**mediziner-wg.html:**
- Klinik-Entfernungen (Klinikum Nord/Süd, Martha-Maria, Praxiszentrum)
- Fokus auf Schichtdienst-Kompatibilität
- Du-Anrede

**inklusive-wg.html:**
- Fokus auf Barrierefreiheit
- Betreuungsmöglichkeit erwähnt
- Du-Anrede

**senioren-wg.html:**
- **Sie-Anrede** (explizit gefordert)
- Fokus auf Gemeinschaft und kurze Wege
- Kulturelles Angebot erwähnt

---

## Barrierefreiheit

- Semantisches HTML (header, nav, main, section, footer, article)
- ARIA-Labels für Icons und Buttons
- aria-expanded für Dropdowns
- aria-hidden für dekorative Elemente
- role="menu" und role="menuitem" für Navigation
- Keyboard-Navigation (Tab, Enter, Escape, Pfeiltasten)
- Alt-Texte für alle Bilder
- Fokus-Visible-States
- Screen-Reader-Only Klasse verfügbar

---

## Performance

- Lazy Loading für alle Bilder außer Hero (`loading="lazy"`)
- `object-fit: cover` für konsistente Bilddarstellung
- Optimierte SVG-Icons inline
- CSS-Transitions statt JavaScript-Animationen
- IntersectionObserver für Counter-Animation
- Passive Event Listeners für Scroll-Events

---

## Mobile-First Responsive Design

- Container: max-width 1200px, responsive Padding
- Breakpoints:
  - 480px: Button-Layout Hero
  - 640px: Footer-Grid, Cookie-Consent
  - 768px: Hauptinhalte 2-Spalten
  - 1024px: Desktop-Navigation

---

## JavaScript Features

1. **Scroll Progress Bar** - Zeigt Scroll-Fortschritt
2. **Header Scroll Effect** - Schatten bei Scroll
3. **Mobile Navigation** - Toggle + Dropdown
4. **Dark Mode** - System-Präferenz + LocalStorage
5. **Desktop Dropdowns** - Hover + Keyboard
6. **Gallery Filter** - Filter nach Kategorie
7. **Lightbox** - Vollbild-Ansicht mit Navigation
8. **Contact Form Validation** - Echtzeit-Validierung
9. **Stat Counters** - Animation bei Sichtbarkeit
10. **Cookie Consent** - DSGVO-Popup
11. **Smooth Scroll** - Sanftes Scrollen zu Ankern
