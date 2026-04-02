# v028 Build Instructions

Build a complete, production-quality single-page website for WG Nürnberg from scratch. DO NOT copy code from previous versions. Build everything fresh.

## Directory Structure
```
v028/
├── index.html          # Main page (ALL 15 sections)
├── studenten-wg.html   # Subpage
├── mediziner-wg.html   # Subpage  
├── inklusive-wg.html   # Subpage
├── young-professionals-wg.html  # Subpage
├── styles.css          # All styles
├── main.js             # All JavaScript
├── robots.txt
├── sitemap.xml
└── assets/img/         # Already populated with real photos
    ├── Allgemeinflächen/  (foto_01..09, neu_01, neu_02, neu_04)
    ├── Zimmer möbliert/   (zimmer_01..06)
    ├── Zimmer unmöbliert/ (foto_08, foto_10, foto_13, raum_01..03, raum_05, raum_07..08, raum_10..12, raum_14..16)
    └── logos/wg-nuernberg-grey-optimized.svg
```

## Design System (MANDATORY)

### Colors
- Primary: #10B981 (CTAs, highlights, links), Light: #34D399, Dark: #059669
- Accent: #0EA5E9 (secondary highlights, badges), Light: #38BDF8, Dark: #0284C7
- Gradient: linear-gradient(135deg, #10B981, #0EA5E9) — ONLY for hero text effects and scroll progress bar
- Light BG: #FFFFFF, Surface: #F8FAFC, Text: #1E293B, Text Secondary: #64748B, Border: #E2E8F0
- Dark BG: #0F172A, Surface: #1E293B, Text: #F1F5F9, Text Secondary: #CBD5E1, Border: #334155
- Max 2 colors per section. Backgrounds always white or surface, never colorful.

### Typography
- Font: Inter (Google Fonts), fallback: system-ui, -apple-system, sans-serif
- H1: 3rem/2.25rem mobile, 800 weight
- H2: 2.25rem/1.75rem mobile, 700 weight
- H3: 1.5rem/1.25rem mobile, 600 weight
- H4: 1.125rem, 600 weight
- Body: 1rem (16px), 400 weight
- Small/Labels: 0.875rem, 500 weight
- Badge: 0.75rem, 600 weight

### Spacing (8px grid)
- Section padding: 5rem (desktop), 4rem (mobile)
- Between blocks: 3rem
- Card gap: 1.5rem
- Card padding: 2rem

### Components
Every section header: Eyebrow (small, uppercase, primary color) → H2 → Description (optional)
ONE card style everywhere: white bg, 1px border, 12px radius, 2rem padding, subtle shadow, hover translateY(-2px)
Buttons: Primary (green bg), Secondary (outlined), WhatsApp (#25D366)
Badges: 999px radius pills — Studenten: #10B981, Mediziner: #0EA5E9, Inklusive: #8B5CF6, YP: #F59E0B

### Layout
- Container: max-width 1200px, centered
- Card grids: auto-fill, minmax(300px, 1fr)
- Alternating section backgrounds: white → surface → white → surface

### Dark Mode
- Toggle in header (sun/moon SVG icons)
- data-theme="light|dark" on html
- localStorage: wgn-theme
- prefers-color-scheme support

### Animations
- prefers-reduced-motion respect
- Scroll reveal: translateY(20px) + opacity
- Scroll progress bar: top, gradient, 3px
- Hover: translateY + shadow only
- Transitions: 0.2s ease

### Responsive: Mobile < 640px, Tablet 640-1024px, Desktop > 1024px

## Page Structure (index.html) — ALL 15 SECTIONS

### 1. Header (fixed)
- Logo left (SVG from assets/img/logos/wg-nuernberg-grey-optimized.svg)
- Nav: Über uns, Unsere WGs (dropdown with 4 subpages), Freie Zimmer, Lage, FAQ
- Desktop dropdown on hover (fade+slide), Mobile: hamburger with expandable group
- CTA button "Anfragen", Dark mode toggle
- Scroll-linked: add shadow/bg on scroll

### 2. Hero (100vh)
- Background: assets/img/Allgemeinflächen/foto_01.jpg with overlay gradient
- Badge: "✦ Seit 2002 in der Lorenzer Altstadt"
- H1: "Miete dein WG-Zimmer bei WG Nürnberg" (with gradient text on "WG-Zimmer")
- Subtitle: "All-in Miete, keine Provision, keine Besichtigung nötig. 17 WGs mitten in der Nürnberger Altstadt."
- 2 Buttons: "Jetzt anfragen" (primary) + "WhatsApp" (green with icon)

### 3. Über uns
- 2-column: text left, image right (foto_02.jpg)
- Stats: 20+ Jahre, 120+ Bewohner, 20+ Nationalitäten, 17 WGs (animated counter on scroll)
- Text about WG Nürnberg, community, all-in rent

### 4. Lage (surface bg)
- 2-column: map placeholder left, distances right
- Distance groups: Zu Fuß (Hauptbahnhof 6min, U-Bahn 3min, Lorenzkirche 6min, Supermärkte 10min), Fahrrad (TH 6min, FAU WiSo 7min, EVHN 6min), Bahn (AdBK 30min, FAU Erlangen 28min)

### 5. Freie Zimmer ⭐
- 4 room cards with real photos:
  - 10.4.31 (31m², Galerie, Dachterrasse, badge:Studenten) — 322.99€/599€, ab 1. April, zimmer_01.jpg
  - 11.2.11 (13m², teilmöbliert, Dachterrasse, badge:Mediziner) — 200.99€/452€, ab 15. April, raum_01.jpg
  - 15.1.22 (12m², teilmöbliert, 2 Fenster, badge:Inklusive) — 202.99€/429€, ab 15. April, zimmer_03.jpg
  - 21.3.50 (14m², 2 Fenster, badge:YP) — 221.99€/448€, ab 15. April, raum_03.jpg
- Footer: "🔄 Aktualisiert täglich um 08:00 Uhr · Zuordnung ist flexibel"

### 6. Vorteile (surface bg)
- 6 benefit cards: 💰 Keine Provision, 📝 Eigener Mietvertrag, ⚡ Echte Flatrate, 🌍 Internationale Community, 🛠️ Team vor Ort, 📍 Beste Lage

### 7. So geht's — 3 steps
- Anfragen → Vertrag unterschreiben (highlighted, "Keine Besichtigung nötig!") → Einziehen

### 8. Keine Besichtigung nötig (surface bg)
- 3 cards: 🎥 360° Tour, 📸 Fotos & Grundrisse, 📱 Video-Call
- CTA: "Jetzt anfragen — keine Besichtigung nötig"

### 9. 360° Touren
- 4 tour cards with play overlay: Grasstraße 11 Altbau (neu_01.jpg), 11 Modern (neu_02.jpg), 15 (foto_03.jpg), 21 (foto_04.jpg)

### 10. Bewertungen (surface bg)
- 3 testimonial cards with stars, quotes, author initials
- Google: 5.0 Sterne

### 11. Galerie
- Filter buttons: Alle, Allgemeinflächen, Möbliert, Unmöbliert
- All photos from assets/img in responsive grid
- Lightbox with keyboard nav, touch swipe, prev/next, close, counter

### 12. WG-Typen (surface bg)
- 4 cards linking to subpages: 🎓 Studenten, 🩺 Mediziner, 🤝 Inklusive, 💼 Young Professionals
- Each with image, badge, and description

### 13. Kontakt
- 2-column: contact info left (WhatsApp, Telefon, Email, Adresse, Öffnungszeiten), form right
- Form: Name*, Email*, Telefon, Einzugsdatum*, Mietdauer (select), Nachricht, Submit

### 14. FAQ (surface bg)
- 19 accordion items, first one open by default
- Questions: Muss ich besichtigen? (Nein!), Was ist in der Miete enthalten?, Kaution (800€), Zimmerpreise (370-650€), Bürgen (Nein), Mindestmietdauer (6 Monate), Kündigungsfrist (3 Monate), Wohnungsgeberbestätigung (Ja), Haustiere (Nein), Student sein? (Nein, seit 2026 offen), Waschmaschinen (Ja), Möbliert (Ja, teilweise), WiFi (Glasfaser), Umziehen (Ja), Schäden (Wir kümmern uns), Dachterrasse (Ja), Sicherheit (3 Türen, Video), Early-Bird, Ausland (Ja)

### 15. Footer
- 4 columns: Brand+Social, Navigation, WG-Typen, Kontakt
- Copyright 2026, Impressum, Datenschutz

### Additional
- WhatsApp floating button (bottom right)
- Cookie banner with accept all / essential only
- Skip link for accessibility
- Schema.org JSON-LD (LocalBusiness, FAQPage)
- Open Graph + Twitter Cards meta

## Subpages (studenten-wg.html etc.)
Each subpage:
- Same header/footer as main
- Smaller hero (surface bg, emoji + H1 + description, no image)
- Content section with features (6 points with emoji)
- Studenten-WG: distances to universities
- Freie Zimmer for that category (2-3 rooms)
- CTA: "Keine Besichtigung nötig"
- MUST be fully functional, not stubs!

## Accessibility
- Skip link
- ARIA labels on all interactive elements
- aria-expanded on FAQ, dropdowns, mobile menu
- Focus-visible outlines
- Semantic HTML (landmarks, heading hierarchy)
- Alt texts on all images (German)
- role="dialog" + aria-modal on lightbox

## Performance
- Lazy loading on all images except hero
- fetchpriority="high" on hero image
- preconnect for Google Fonts
- font-display: swap

## CRITICAL
- Build EVERYTHING from scratch — no copy-paste from v027
- ALL 15 sections must be in index.html
- ALL 4 subpages must be fully functional
- Use ONLY the real photos from assets/img/ (no Unsplash, no placeholders except map)
- Test dark mode for ALL sections
- Consistent card style EVERYWHERE
- Mobile-first responsive design
