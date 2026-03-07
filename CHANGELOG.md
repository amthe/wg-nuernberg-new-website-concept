# Changelog — WG Nürnberg Website

Komplette Historie aller Versionen. Neueste zuerst.

---

## v006 — 2026-03-07

### Fokus
Performance & Accessibility — Lighthouse-optimiert, WAVE-konform, sauberstes semantisches HTML

### Änderungen
- **Komplett von Grund auf neu gebaut** — kein Code aus v005 übernommen
- **Skip Link:** "Zum Hauptinhalt springen" für Screenreader und Keyboard-Nutzer
- **Semantisches HTML:** Korrekte Heading-Hierarchie (h1→h2→h3), Landmark-Regionen, aria-labelledby für alle Sektionen
- **Alt-Texte:** Alle Bilder mit beschreibenden deutschen Alt-Texten, Emojis in aria-hidden Containern
- **Formulare:** Alle Inputs mit Labels, autocomplete-Attribute, required-Kennzeichnung
- **Navigation:** aria-expanded, aria-hidden, aria-controls für Mobile Menu
- **FAQ:** aria-expanded + aria-controls für Accordion
- **Lightbox:** role="dialog", aria-modal, ESC-Support, Focus-Trapping
- **Performance:** preconnect für Fonts & Unsplash, font-display: swap, lazy loading, fetchpriority="high" für Hero
- **JavaScript:** requestAnimationFrame für Scroll-Events, IntersectionObserver für Reveal, IIFEs für Scope-Isolation
- **Focus States:** Sichtbare 3px Outline auf allen interaktiven Elementen
- **Dark Mode:** WCAG AA-konformer Kontrast
- **prefers-reduced-motion:** Alle Animationen deaktivierbar

### Warum
v005 hatte alle Features und ein striktes Design System, aber wurde nie auf tatsächliche Lighthouse/WAVE-Scores getestet. v006 baut alles von Grund auf mit Accessibility und Performance als Kernfokus.

---

## v005 — 2026-03-07

### Fokus
Design-Perfektion & Polishing — kompletter Neubau mit strikter Design-System-Konformität

### Änderungen
- **Komplett von Grund auf neu gebaut** — kein Code aus v004 übernommen
- **Design System strikt umgesetzt:** Alle CSS-Tokens als Custom Properties (Spacing 8px-Grid, Typografie-Skala, Farben)
- **Einheitlicher Karten-Stil** überall (Vorteile, Zimmer, Touren, Testimonials, WG-Typen)
- **Scroll-Progress-Bar:** Gradient (Primary → Accent), 3px, fixed top
- **Scroll-Reveal Animationen:** translateY(20px) + opacity, respektiert prefers-reduced-motion
- **Senioren-Seite mit 'Sie'-Anrede:** Formeller, wärmerer Ton ("Sie behalten Ihre Unabhängigkeit", "Wir nehmen uns Zeit für Sie")
- **Galerie Lightbox:** Keyboard Navigation (Escape, Arrow), Touch Swipe, Filter-Buttons
- **19 FAQ-Fragen** als Accordion (erste: "Muss ich besichtigen? → Nein!")
- **Schema.org JSON-LD:** LocalBusiness, FAQPage, AggregateRating
- **Open Graph + Twitter Cards** auf allen Seiten
- **Accessibility:** Skip Link, ARIA Labels, Semantic HTML, Focus Styles, aria-expanded
- **Performance:** Lazy Loading, fetchpriority="high" für Hero, Passive Event Listeners, Preconnect

### Warum
Alle Konzept-Features waren seit v004 drin. v005 fokussiert auf die perfekte Umsetzung des Design Systems — konsistente Abstände, einheitliche Komponenten, sauberer visueller Rhythmus.

---

## v004 — 2026-03-07

### Fokus
Konzept-Features einbauen: Besichtigung optional, Freie Zimmer, 360° Touren, Stock Photo Hero

### Änderungen
- **Hero-Bild:** Stock Photo mit fröhlichen Studenten (Unsplash)
- **Header & Footer:** Gleiche Hintergrundfarbe (unified frame)
- **Neuer Abschnitt "Keine Besichtigung nötig":** Klar kommuniziert dass Besichtigung NICHT nötig ist, Normalfall für alle
- **Freie Zimmer Bereich:** Zimmer-Karten mit Größe, Preis, Verfügbar-ab, Kategorie-Badge; auf Hauptseite + allen Unterseiten
- **360° Virtuelle Touren:** 4 Tour-Karten (Grasstraße 11 Altbau/Modern, 15, 21)
- **3-Schritte-Prozess:** "Besichtigen" → "Vertrag unterschreiben"
- **FAQ:** Neuer Eintrag "Muss ich besichtigen? → Nein!"
- **Alle Unterseiten:** Freie Zimmer + "Keine Besichtigung" CTAs

### Warum
Alle Konzept-Änderungen vom 07.03.2026 umsetzen: Operativer Fokus (112 Zimmer, keine Besichtigung machbar), Freie Zimmer prominent, Touren bewerben.

---

## v003 — 2026-03-06

### Fokus
Echte WG-Fotos + Galerie

### Änderungen
- Echte Fotos aus der Legacy-Website eingebunden (Grasstraße, Klarastraße, Sternstraße)
- Galerie mit Filter (nach Straße) und Lightbox
- WG-Standortkarte (SVG)
- 3D-Grundrisse eingebunden
- Screenshots im Ordner

### Warum
Website brauchte echte Bilder statt Platzhalter.

---

## v002 — 2026-03-06

### Fokus
Redesign mit neuem Farbkonzept + alle Unterseiten

### Änderungen
- Neues Farbkonzept: Mint-Grün (#10B981) + Sky-Blue (#0EA5E9) auf Weiß
- Inter Font, Dark Mode Support
- Alle Sektionen aus Christinas Liste: Hero, Über uns, Lage, Vorteile, 3-Schritte-Prozess, Testimonials, Galerie-Placeholder, Kontaktformular, 18-Fragen-FAQ, Footer
- Schema.org JSON-LD (LocalBusiness, FAQPage, Reviews)
- Unterseiten: Studenten-WG, Mediziner-WG, Inklusive WG, Senioren-WG

### Warum
v001 hatte falsche Farben (schwarz/orange statt Corporate-Farben). Kompletter Neuaufbau mit definiertem Farbkonzept aus dem Konzept-Dokument.

---

## v001 — 2026-03-06

### Fokus
Erster Prototyp

### Änderungen
- Initiale Website mit allen Grundseiten
- Hero, Navigation, Footer
- Unterseiten für alle WG-Typen

### Warum
Erster Wurf um die Struktur zu testen.

### Probleme
- Farben waren falsch (schwarz/orange statt der definierten Palette) → in v002 behoben
