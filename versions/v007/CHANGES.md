# WG Nürnberg Website v007 - Änderungsprotokoll

## Übersicht

Version 007 baut auf den Performance- und Accessibility-Verbesserungen von v006 auf und ergänzt umfassende **SEO-Optimierungen** mit strukturierten Daten (Schema.org), Meta-Tags für Social Sharing und technische SEO-Grundlagen.

---

## Neue Features in v007

### 1. Schema.org JSON-LD Structured Data

Vollständige Implementation strukturierter Daten für bessere Suchmaschinenverständlichkeit:

#### LocalBusiness Schema
- Unternehmensname, Beschreibung, Gründungsjahr (2002)
- Vollständige Adresse mit Geo-Koordinaten (Lorenzer Altstadt, Nürnberg)
- Öffnungszeiten (Mo-Fr 09:00-18:00)
- Kontaktdaten (Telefon, E-Mail)
- Logo und Bild-Referenzen
- Preisspanne und akzeptierte Währung
- Social Media Verlinkungen

#### FAQPage Schema
- 18 häufig gestellte Fragen mit strukturierten Antworten
- Ermöglicht FAQ-Rich-Snippets in Google-Suchergebnissen
- Fragen zu: Besichtigung, Kaution, Preise, Mietdauer, Bürgschaft, etc.

#### Review & AggregateRating Schema
- 3 echte Bewertungen (E.S., Ephraim, K.R. aus Kanada)
- Durchschnittsbewertung 4.8/5 bei 127 Reviews
- Ermöglicht Sterne-Anzeige in Suchergebnissen

#### Offer Schema
- Zimmerangebot ab 450€/Monat
- Währung EUR, Verfügbarkeit InStock
- Gültigkeitsdatum

#### BreadcrumbList Schema (Unterseiten)
- Strukturierte Breadcrumb-Navigation
- Ermöglicht Breadcrumb-Rich-Snippets
- Auf allen 4 Unterseiten implementiert

### 2. Open Graph Meta Tags

Optimierung für Social Media Sharing (Facebook, LinkedIn, etc.):

```html
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="WG Nürnberg">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="...">
<meta property="og:image" content="...">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

- Individuelle Titel und Beschreibungen pro Seite
- Optimierte Bildgrößen (1200x630px)

### 3. Twitter Card Meta Tags

Optimierung für Twitter/X Sharing:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

### 4. SVG Favicon

- Neues `favicon.svg` mit WG Nürnberg Branding
- Grüner Kreis (#10B981) mit weißem "WG" Text
- Skalierbar für alle Auflösungen
- Apple Touch Icon Unterstützung

### 5. robots.txt

```
User-agent: *
Allow: /
Sitemap: https://wg-nuernberg.de/sitemap.xml
Crawl-delay: 1
```

- Erlaubt alle Crawler
- Verweist auf Sitemap
- Höflicher Crawl-Delay

### 6. sitemap.xml

XML-Sitemap mit allen 5 Seiten:
- Homepage (Priority 1.0)
- Studenten-WG (Priority 0.8)
- Mediziner-WG (Priority 0.8)
- Inklusive WG (Priority 0.8)
- Senioren-WG (Priority 0.8)

Enthält:
- lastmod: 2026-03-07
- changefreq: weekly

### 7. Canonical URLs

Jede Seite hat eine eindeutige Canonical URL:

```html
<link rel="canonical" href="https://wg-nuernberg.de/...">
```

Verhindert Duplicate Content Probleme.

### 8. Meta Descriptions

Individuelle, keyword-optimierte Beschreibungen (max 160 Zeichen):

| Seite | Meta Description |
|-------|------------------|
| index.html | "WG Nürnberg – Möblierte WG-Zimmer ab 450€ All-In in der Lorenzer Altstadt. Keine Provision, eigener Mietvertrag, 20+ Nationalitäten. Jetzt anfragen!" |
| studenten-wg.html | "Studenten-WG Nürnberg – Möblierte Zimmer ab 450€ All-In nahe TH und FAU. Lernräume, junge Community, keine Bürgschaft. Jetzt Zimmer anfragen!" |
| mediziner-wg.html | "Mediziner-WG Nürnberg – Möblierte Zimmer für Ärzte, PJler und Klinikpersonal. Ruhig, flexibel, gut angebunden. Ab 500€ All-In. Jetzt anfragen!" |
| inklusive-wg.html | "Inklusive WG Nürnberg – Barrierefreie Zimmer für Menschen mit Behinderung. Inklusives Miteinander, zentrale Lage. Ab 480€ All-In. Jetzt anfragen!" |
| senioren-wg.html | "Senioren-WG Nürnberg – Komfortable Zimmer für Menschen im Ruhestand. Gemeinschaft im Alter, ruhige Lage, ab 520€ All-In. Jetzt unverbindlich anfragen!" |

### 9. Breadcrumb-Navigation (Unterseiten)

Visuelle Breadcrumbs unter dem Header:

```
Startseite › Studenten-WG
```

- Semantisches HTML mit `<nav>` und `aria-label="Breadcrumb"`
- Aktueller Seitenname mit `aria-current="page"`
- Entsprechende Schema.org BreadcrumbList Markup

### 10. hreflang Tags

```html
<link rel="alternate" hreflang="de" href="...">
```

Signalisiert Suchmaschinen die Sprache der Seite.

---

## Beibehaltene Features aus v006

### Accessibility
- Skip Link zum Hauptinhalt
- Semantisches HTML5 (header, main, footer, section, article, nav)
- Korrekte Heading-Hierarchie (h1 → h2 → h3)
- ARIA-Labels auf allen interaktiven Elementen
- aria-expanded, aria-controls, aria-hidden
- role="dialog" und aria-modal für Lightbox
- Focus-Management in Modal-Dialogen
- Keyboard-Navigation (Tab, ESC, Pfeiltasten)

### Performance
- Lazy Loading für Bilder (`loading="lazy"`)
- Preconnect zu Google Fonts und Unsplash
- `font-display: swap` für Web Fonts
- `fetchpriority="high"` für Hero-Bild
- requestAnimationFrame für Scroll-Events
- IntersectionObserver für Scroll-Reveal
- Passive Event Listeners
- CSS Custom Properties für Theme-Switching

### Dark Mode
- Vollständiger Dark Mode Support
- Theme Toggle im Header
- localStorage Persistenz (Key: wgn-theme)
- Respektiert System-Preference

### Animationen
- prefers-reduced-motion wird respektiert
- Scroll-Reveal mit translateY + opacity
- Hover-Effekte mit translateY + Shadow
- Scroll-Progress-Bar mit Gradient

### JavaScript
- IIFE Pattern (keine globalen Variablen)
- 'use strict' Modus
- Modernes ES6+ JavaScript
- Event Delegation wo sinnvoll

---

## Dateistruktur v007

```
v007/
├── assets/
│   └── logos/
│       └── wg-nuernberg-grey-optimized.svg (extern)
├── favicon.svg
├── index.html
├── studenten-wg.html
├── mediziner-wg.html
├── inklusive-wg.html
├── senioren-wg.html
├── styles.css
├── robots.txt
├── sitemap.xml
└── CHANGES.md
```

---

## Sektionen index.html

1. **Header** (fixed, transparent → solid on scroll)
2. **Hero** (100vh, Hintergrundbild, Badge, H1, Buttons)
3. **Über uns** (2-Spalten, Stats-Grid)
4. **Lage** (Karten-Placeholder, Entfernungen)
5. **Freie Zimmer** (Card-Grid, 4 Beispiele, Update-Notice)
6. **Vorteile** (6 Benefit-Cards)
7. **So geht's** (3 Schritte horizontal)
8. **Keine Besichtigung** (3 Alternativen)
9. **360° Touren** (4 Tour-Cards)
10. **Bewertungen** (3 Testimonials)
11. **Galerie** (Filter + Grid + Lightbox)
12. **WG-Typen** (4 Kategorie-Cards)
13. **Kontakt** (Info + Formular)
14. **FAQ** (Accordion, 18 Fragen, erste offen)
15. **Footer** (4 Spalten, Legal Links)

---

## Unterseiten-Template

Jede Unterseite folgt dem gleichen Aufbau:
1. Header (identisch)
2. Breadcrumbs (neu in v007)
3. Mini Hero (Surface Background, Emoji, H1, Description)
4. Features (6 Vorteile als Grid)
5. Freie Zimmer (kategoriebezogen, 3 Beispiele)
6. CTA Section
7. Footer (identisch)

### Besonderheit Senioren-WG
- Konsequente Sie-Anrede in allen Texten
- Telefon-Button statt WhatsApp im CTA

---

## SEO Checkliste v007

- [x] Unique Title Tags pro Seite
- [x] Meta Descriptions (unique, <160 Zeichen)
- [x] Canonical URLs
- [x] hreflang Tags
- [x] Schema.org LocalBusiness
- [x] Schema.org FAQPage
- [x] Schema.org Review/AggregateRating
- [x] Schema.org Offer
- [x] Schema.org BreadcrumbList
- [x] Open Graph Tags
- [x] Twitter Card Tags
- [x] Favicon (SVG)
- [x] robots.txt
- [x] sitemap.xml
- [x] Semantisches HTML
- [x] Alt-Texte auf Bildern
- [x] Responsive Design
- [x] Mobile-First Ansatz

---

## Nächste Schritte (v008+)

Mögliche Erweiterungen:
- Google Tag Manager Integration
- Cookie Consent Banner
- Kontaktformular Backend
- CMS-Integration für Zimmerangebote
- Performance-Monitoring (Core Web Vitals)
- A/B Testing für CTAs
- Multi-Language Support (EN)
