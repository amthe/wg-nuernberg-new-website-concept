# WG Nürnberg v009 — CHANGES

## Fokus dieser Version
**SVG Dark Mode Toggle + Micro-Interactions + Feinschliff**

Diese Version löst das seit v001 bestehende Problem der Emoji-basierten Dark/Light Mode Icons (☀️/🌙) und ersetzt sie durch einen professionellen SVG-basierten Toggle mit smooth Animations.

---

## Was ist neu in v009

### 1. SVG Dark Mode Toggle (Hauptfeature)
**Vorher (v001-v008):** Emoji-Icons ☀️/🌙
**Jetzt (v009):** Saubere SVG-Icons mit Animations

- **Sun Icon:** Dünner Kreis mit Strahlen (SVG, stroke-based)
- **Moon Icon:** Elegante Mondsichel (SVG, stroke-based)
- **Animation:** Smooth 0.3s Rotation + Scale beim Wechsel
- **Transition:** Icons rotieren ein/aus mit opacity und transform
- CSS-Variablen für `stroke` = passt sich automatisch an Textfarbe an

```css
/* Sun rotiert raus → Moon rotiert rein */
:root[data-theme="dark"] .theme-toggle-sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
:root[data-theme="dark"] .theme-toggle-moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
```

### 2. Smooth Theme Transition
- **Body-Klasse:** `theme-transitioning` wird beim Wechsel hinzugefügt
- **Transition für alle Elemente:** Background, Color, Border, Shadow
- **Dauer:** 0.4s ease für einen sanften Übergang
- Keine abrupten Farbwechsel mehr

### 3. Verbesserte Micro-Interactions

#### Buttons
- **Click-Feedback:** `transform: scale(0.98)` bei `:active`
- **Pseudo-Element Overlay:** Weißer Overlay-Effekt beim Klicken
- **Hover:** `translateY(-1px)` + verstärkter Shadow

#### Cards
- **Glow-Effekt:** `.card-glow::before` mit Gradient-Border bei Hover
- **Hover-Transform:** `translateY(-2px)` + stärkerer Shadow
- **Smooth Transition:** 0.2s ease für alle Eigenschaften

#### Theme Toggle Button
- **Hover:** Background-Highlight
- **Active:** `transform: scale(0.95)` für taktiles Feedback

### 4. Helles Hero-Bild
- Unsplash-Bild von fröhlichen jungen Menschen
- Hell und einladend (nicht dunkel wie in früheren Versionen)
- Semi-transparenter Gradient-Overlay für Textlesbarkeit
- Reduzierte Brightness im Dark Mode

---

## Beibehaltene Features aus v008

### SEO & Meta
- Schema.org JSON-LD (LocalBusiness, FAQPage, Reviews, BreadcrumbList)
- Open Graph Meta Tags
- Twitter Card Meta Tags
- Meta Description & Keywords
- robots.txt mit Sitemap-Verweis
- sitemap.xml mit allen Seiten
- Breadcrumb-Navigation auf Unterseiten

### Accessibility
- Skip-to-Content Link
- ARIA Labels und Roles
- Focus-visible Styles
- Keyboard-Navigation für alle interaktiven Elemente
- prefers-reduced-motion wird respektiert
- Semantische HTML5-Struktur

### Performance
- Lazy Loading für Bilder
- Preconnect zu Google Fonts und Unsplash
- fetchpriority="high" für Hero-Bild
- Minimale JavaScript-Größe
- CSS Custom Properties für effizientes Theming

### Interaktivität
- Cookie Consent Banner (GDPR-konform, 3 Optionen)
- Kontaktformular mit Client-seitiger Validierung
- FAQ Accordion mit Keyboard-Support
- Galerie mit Filter und Lightbox
- Back-to-Top Button
- Scroll Progress Bar (Gradient, 3px)
- Smooth Scroll für Anchor-Links

### Dark Mode
- System-Preference-Detection
- localStorage Persistenz (`wgn-theme`)
- Alle Komponenten für Dark Mode optimiert
- Reduzierte Image-Brightness im Dark Mode

### Print Stylesheet
- Versteckte UI-Elemente (Header, Footer, Buttons)
- Optimierte Typografie für Druck
- Page-Break-Kontrolle

---

## Dateistruktur

```
v009/
├── index.html              # Hauptseite (15 Sektionen)
├── studenten-wg.html       # Unterseite Studenten
├── mediziner-wg.html       # Unterseite Mediziner
├── inklusive-wg.html       # Unterseite Inklusive
├── senioren-wg.html        # Unterseite Senioren (Sie-Anrede)
├── styles.css              # Komplettes Design System
├── favicon.svg             # SVG Favicon (Gradient-Haus)
├── robots.txt              # Crawler-Regeln
├── sitemap.xml             # Sitemap für SEO
├── CHANGES.md              # Diese Dokumentation
└── assets/
    └── logos/
        ├── wg-nuernberg-grey-optimized.svg
        └── wg-nuernberg-vertical-grey-optimized.svg
```

---

## Browser-Support

### Vollständig unterstützt
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

### Funktioniert mit Einschränkungen
- Chrome 70-89 (CSS Custom Properties funktionieren)
- Safari 12-13 (gap in Flexbox evtl. nicht unterstützt)

### Nicht unterstützt
- Internet Explorer (alle Versionen)

---

## Design System Highlights

### Farben
- **Primary:** #10B981 (Emerald Green)
- **Accent:** #0EA5E9 (Sky Blue)
- **Gradient:** 135deg von Primary zu Accent

### Typografie
- **Font:** Inter (Google Fonts)
- **H1:** 3rem / 2.25rem mobil, 800
- **Body:** 1rem, 400, 1.6 line-height

### Abstände (8px Grid)
- Section-Padding: 80px (Desktop) / 64px (Mobil)
- Card-Grid Gap: 24px
- Card-Padding: 32px

### Komponenten
- Einheitlicher Card-Stil für alle Bereiche
- Badge-System mit Kategorie-Farben
- Button-Varianten: Primary, Secondary, WhatsApp, Ghost

---

## Bekannte Unterschiede zu vorherigen Versionen

| Feature | v008 | v009 |
|---------|------|------|
| Dark Mode Toggle | ☀️/🌙 Emoji | SVG Icons mit Animation |
| Theme Wechsel | Abrupt | Smooth 0.4s Transition |
| Button Feedback | Nur Hover | Hover + Active Scale |
| Card Hover | translateY only | translateY + Glow Effect |
| Hero Bild | Variabel | Explizit hell und einladend |

---

## Validierung

- [x] HTML: Valide nach W3C-Standard
- [x] CSS: Valide, keine Warnings
- [x] Accessibility: WCAG 2.1 AA konform
- [x] Performance: Lighthouse 90+ erwartet
- [x] Mobile: Responsive auf allen Breakpoints getestet

---

## Nächste Schritte (v010 Ideen)

- [ ] Echte 360°-Tour Integration (z.B. Matterport)
- [ ] Zimmer-Verfügbarkeits-API
- [ ] Newsletter-Anmeldung
- [ ] Live-Chat Integration
- [ ] Mehrsprachigkeit (EN)
