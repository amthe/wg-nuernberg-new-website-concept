# WG Nürnberg v010 - Scroll Storytelling Edition

## Überblick

Diese Version bringt das "Scroll Storytelling" zum Leben. Die Website erzählt eine Geschichte beim Scrollen — von der emotionalen Begrüßung im Hero bis zur Conversion im Kontaktbereich. Ein vollständiges Animation System mit IntersectionObserver, Parallax-Effekten und animierten Stat-Countern macht das Scroll-Erlebnis modern und ansprechend.

---

## Neue Features

### 1. IntersectionObserver Animation System
- **Scroll-triggered Animationen** für jede Sektion
- Verschiedene Animation-Typen:
  - `fade-up`: translateY(30px) + opacity für Section Headers
  - `fade-left` / `fade-right`: Slide-in für 2-Spalten-Layouts
  - `scale-in`: Subtile Skalierung
- **Staggered Animations** für Karten-Grids (100ms Verzögerung pro Element)
- Threshold: 0.15 (Animation startet bei 15% Sichtbarkeit)
- **Einmalige Animation** — keine Wiederholung beim Zurückscrollen
- Vollständige `prefers-reduced-motion` Unterstützung

### 2. Animated Stat Counters
- Die 4 Stats in "Über uns" zählen von 0 hoch:
  - 20+ Jahre Erfahrung
  - 120+ Bewohner
  - 20+ Nationalitäten
  - 17 WGs
- **easeOutExpo** Kurve für natürliche Beschleunigung
- Dauer: 2 Sekunden
- Start bei 50% Sichtbarkeit
- `data-count` und `data-suffix` Attribute für Konfiguration

### 3. Parallax Hero
- Subtiler Parallax-Effekt auf dem Hero-Bild
- 30% Scroll-Geschwindigkeit (nicht übertrieben)
- **Deaktiviert auf Mobile** (Performance)
- **Deaktiviert bei prefers-reduced-motion**
- Verwendet `requestAnimationFrame` für smooth Animation

### 4. Scroll Progress Indicator
- Gradient-Linie oben (Primary → Accent)
- 3px Höhe
- Zeigt Scroll-Fortschritt in Prozent
- Throttled auf 10ms für Performance

### 5. Storytelling Flow
Die Sektionen erzählen eine zusammenhängende Geschichte:
1. **Hero** — "Willkommen" (emotionaler Einstieg)
2. **Über uns** — "Wer wir sind" (Vertrauen aufbauen)
3. **Lage** — "Wo wir sind" (Kontext geben)
4. **Freie Zimmer** — "Was verfügbar ist" (konkretes Angebot)
5. **Vorteile** — "Warum wir" (überzeugen)
6. **So geht's** — "Wie einfach es ist" (Hürden abbauen)
7. **Keine Besichtigung** — "Noch einfacher" (Überraschung)
8. **360° Touren** — "Schau selbst" (Transparenz)
9. **Bewertungen** — "Was andere sagen" (Social Proof)
10. **Galerie** — "So sieht's aus" (visuell beeindrucken)
11. **WG-Typen** — "Für dich" (Personalisierung)
12. **Kontakt** — "Los geht's" (Conversion)
13. **FAQ** — "Falls du Fragen hast" (letzte Zweifel beseitigen)

### 6. Konsistente Section Dividers
- Dezente Wellen-SVG-Divider zwischen ALLEN Sektionen
- Farbanpassung: weiß → surface, surface → weiß
- Dark Mode kompatibel
- Einheitliches Erscheinungsbild

---

## Beibehaltene Features (aus v009)

### Dark Mode
- SVG Toggle mit Animation (Sonne/Mond)
- Smooth Theme Transition (0.4s)
- localStorage: `wgn-theme`
- System-Preference-Detection
- Alle Komponenten Dark Mode optimiert

### Cookie Consent
- DSGVO-konform
- 3 Optionen: Alle akzeptieren, Nur notwendige, Einstellungen
- Smooth Einblend-Animation

### Interaktive Komponenten
- Kontaktformular mit Client-Validierung (Echtzeit)
- FAQ Accordion mit Keyboard-Support
- Galerie mit Filter und Lightbox
- Back-to-Top Button (erscheint nach 500px)
- Mobile Menu mit Hamburger

### Micro-Interactions
- Button Click-Feedback (scale 0.98)
- Card Hover (translateY -2px + stärkerer Shadow)
- Link Hover-States

### SEO & Accessibility
- Schema.org JSON-LD (LocalBusiness, FAQPage, AggregateRating, BreadcrumbList)
- Open Graph + Twitter Card Meta Tags
- Skip-to-Content Link
- ARIA Labels überall
- Focus-visible Styles
- Print Stylesheet

### Performance
- Lazy Loading für Bilder
- Preconnect zu Google Fonts
- Throttled/Debounced Event Handlers
- requestAnimationFrame für Animationen

---

## Verbesserungen gegenüber v009

| Aspekt | v009 | v010 |
|--------|------|------|
| Scroll-Animationen | Basic (nur translateY + opacity) | Vollständiges System mit verschiedenen Typen |
| Hero | Statisch | Parallax-Effekt |
| Stat Counter | Statische Zahlen | Animierte Count-Up |
| Storytelling | Keine Progression | Bewusster Flow |
| Section Dividers | Inkonsistent | Einheitliche Wellen-SVGs |
| Animation Control | Einfach | IntersectionObserver mit Staggering |

---

## Technische Details

### CSS
- Design System mit CSS Custom Properties
- 8px Grid System
- Mobile-first Responsive Design
- Smooth Transitions (0.2s-0.4s)
- Print Stylesheet

### JavaScript
- Vanilla JS (kein Framework)
- IIFE Pattern für Scope-Isolation
- Utility Functions: debounce, throttle
- Event Delegation wo sinnvoll
- prefers-reduced-motion Check überall

### Dateien
```
v010/
├── index.html              # Hauptseite mit 15 Sektionen
├── studenten-wg.html       # Unterseite Studenten
├── mediziner-wg.html       # Unterseite Mediziner
├── inklusive-wg.html       # Unterseite Inklusive
├── senioren-wg.html        # Unterseite Senioren (Sie-Anrede!)
├── styles.css              # Komplettes CSS mit Design System
├── scripts.js              # Alle JS-Funktionalitäten
├── favicon.svg             # Gradient-Haus Icon
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── CHANGES.md              # Diese Datei
└── assets/
    └── logos/
        ├── wg-nuernberg-grey-optimized.svg
        └── wg-nuernberg-vertical-grey-optimized.svg
```

---

## Browser-Unterstützung

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS Safari 14+, Chrome for Android

---

## Bekannte Einschränkungen

1. **Unsplash-Bilder**: Werden von externem CDN geladen (für Produktion ersetzen)
2. **WhatsApp-Nummer**: Platzhalter (+49 911 12345678)
3. **Formular**: Keine Backend-Anbindung (nur Frontend-Validierung)
4. **360° Touren**: Nur Platzhalter (keine echten Tour-Links)

---

## Nächste Schritte (v011+)

- [ ] Echte 360°-Tour Integration (Matterport/similar)
- [ ] Backend-Anbindung für Kontaktformular
- [ ] Zimmer-Datenbank mit CMS
- [ ] Newsletter-Integration
- [ ] Analytics (DSGVO-konform)
- [ ] A/B Testing für CTAs
