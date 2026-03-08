# WG Nürnberg Website v008 — Changelog

## Release: v008
**Datum:** 2026-03-08
**Fokus:** Cookie Consent Banner (GDPR-konform), Kontaktformular-Validierung, UI-Polish

---

## Neue Features

### 1. Cookie Consent Banner (GDPR/DSGVO-konform)
- Minimales, elegantes Design passend zum Design System
- Position: Fixed am unteren Bildschirmrand
- Drei Optionen: "Alle akzeptieren", "Nur notwendige", "Einstellungen"
- Cookie-Kategorien:
  - **Notwendig** (immer aktiv): Session, Theme-Preference
  - **Statistik** (optional): Google Analytics 4
  - **Marketing** (optional): Tracking-Pixel
- localStorage Persistenz (`wgn-cookie-consent`)
- Banner verschwindet nach Auswahl mit smooth Animation
- "Cookie-Einstellungen" Link im Footer zum Widerrufen/Ändern
- Slide-up Animation beim Erscheinen
- Volle Dark Mode Unterstützung
- Mobile-optimiert (stackende Buttons)

### 2. Kontaktformular-Validierung
- Client-side Validierung mit HTML5 + Custom JavaScript
- Echtzeit-Validierung beim Verlassen des Feldes (blur)
- Visuelles Feedback:
  - Grüner Haken (✓) bei gültiger Eingabe
  - Roter Rand + Fehlermeldung bei ungültiger Eingabe
- E-Mail Format-Prüfung mit Regex
- Pflichtfelder: Name, E-Mail, Einzugsdatum
- Telefon: Optionales Feld mit Format-Hinweis
- Submit-Button disabled bis alle Pflichtfelder gültig
- Erfolgs-Animation nach Submit (Checkmark mit Konfetti-Effekt)
- Accessible: `aria-invalid`, `aria-describedby` für Fehlermeldungen

### 3. UI-Polish
- **Smooth-Scroll** für alle Anchor-Links (CSS `scroll-behavior: smooth`)
- **Back-to-Top Button**: Erscheint nach 300px Scroll, smooth Animation
- **Loading-Skeleton** für Galerie-Bilder während Lazy-Load
- **Verbesserte Focus-Styles**: Sichtbar aber elegant (Primary-Farbe Outline)
- **Print-Stylesheet**: Optimiert für Druck (keine Hintergrundfarben, lesbare Schrift)

---

## Beibehaltene Features aus v007

### SEO & Meta
- Schema.org JSON-LD Structured Data:
  - LocalBusiness (WG Nürnberg)
  - FAQPage (18 Fragen)
  - Reviews (Testimonials)
  - Offers (Zimmerangebote)
  - BreadcrumbList (Unterseiten)
- Open Graph Tags (Facebook, LinkedIn)
- Twitter Card Tags
- Canonical URLs
- hreflang="de"
- Meta Descriptions für alle Seiten

### Technische Dateien
- `favicon.svg` (Primary-Farbe Haus-Icon)
- `robots.txt` (Crawling erlaubt, Sitemap verlinkt)
- `sitemap.xml` (Alle 5 Seiten)

### Accessibility
- Skip-to-Content Link
- ARIA Labels und Roles
- Focus-Management für Modals/Lightbox
- Keyboard-Navigation (Escape schließt, Tab-Falle in Modals)
- `prefers-reduced-motion` respektiert

### Performance
- Lazy Loading für Bilder (`loading="lazy"`)
- `preconnect` für Google Fonts und Unsplash
- `requestAnimationFrame` für Scroll-Events
- `IntersectionObserver` für Scroll-Reveal

### Dark Mode
- Toggle im Header (☀️/🌙)
- localStorage Persistenz (`wgn-theme`)
- System-Preference als Default (`prefers-color-scheme`)
- Alle Komponenten Dark Mode optimiert

### UI Features
- Scroll-Progress-Bar (Gradient, 3px, top)
- Scroll-Reveal Animationen
- Galerie mit Lightbox, Keyboard, Touch-Swipe
- FAQ Accordion

---

## Seiten

| Datei | Beschreibung |
|-------|--------------|
| `index.html` | Hauptseite mit allen 15 Sektionen |
| `studenten-wg.html` | Unterseite für Studenten |
| `mediziner-wg.html` | Unterseite für Mediziner |
| `inklusive-wg.html` | Unterseite für Inklusive WG |
| `senioren-wg.html` | Unterseite für Senioren (Sie-Anrede) |
| `styles.css` | Komplettes Stylesheet mit Design System |

---

## Design System Compliance

Diese Version hält sich strikt an das Design System:

### Farben
- Primary: `#10B981` (CTAs, Links, Highlights)
- Accent: `#0EA5E9` (Sekundäre Highlights, Badges)
- Gradient nur für Hero-Text und Scroll-Progress-Bar
- Backgrounds: Nur Weiß oder Surface

### Typografie
- Font: Inter (Google Fonts)
- Größen: Exakt nach Spezifikation (H1: 3rem, H2: 2.25rem, etc.)

### Abstände
- 8px-Grid strikt eingehalten
- Sektionen: `--space-20` (80px) Desktop, `--space-16` (64px) Mobil
- Karten-Grid: `--space-6` (24px) Gap

### Komponenten
- EIN Karten-Stil für alles (konsistent)
- Section Headers: Eyebrow → H2 → Description
- Buttons: Primary, Secondary, WhatsApp
- Badges: Kategorie-spezifische Farben

---

## Bekannte Verbesserungen gegenüber v001-v007

1. ✅ Korrekte Corporate-Farben (v001 hatte falsche)
2. ✅ Konsistente Karten-Stile (v002-v003 inkonsistent)
3. ✅ Strikte Spacing-Tokens überall
4. ✅ GDPR-konforme Cookie-Lösung
5. ✅ Professionelle Form-Validierung
6. ✅ Verbesserte UX (Back-to-Top, Smooth-Scroll)

---

## Browser-Unterstützung

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+

---

## Dateien erstellt

```
v008/
├── index.html
├── studenten-wg.html
├── mediziner-wg.html
├── inklusive-wg.html
├── senioren-wg.html
├── styles.css
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── CHANGES.md
└── assets/
    └── logos/
        ├── wg-nuernberg-grey-optimized.svg
        └── wg-nuernberg-vertical-grey-optimized.svg
```
