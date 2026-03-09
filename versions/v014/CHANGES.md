# WG Nürnberg v014 - Changes

## Overview
Version 014 was built completely from scratch, following the strict design system guidelines. This version addresses the key issue from v013: the missing "Unsere WGs" dropdown navigation in the header.

## Key Features

### 1. Navigation with "Unsere WGs" Dropdown
- **Desktop**: Hover-activated dropdown with animated appearance
- **Mobile**: Expandable/collapsible group within hamburger menu
- Color-coded badges for each WG type (Studenten, Mediziner, Inklusive, Senioren)
- Full keyboard accessibility with aria-expanded states

### 2. Design System Implementation
All elements strictly follow the design tokens:

#### Colors
- Primary: #10B981 (CTAs, links)
- Accent: #0EA5E9 (secondary highlights)
- Gradient: linear-gradient(135deg, #10B981, #0EA5E9) for hero text and scroll progress
- Badge colors: Studenten=#10B981, Mediziner=#0EA5E9, Inklusive=#8B5CF6, Senioren=#F59E0B

#### Typography
- Font: Inter (Google Fonts)
- Strict type scale: H1 (3rem/2.25rem mobile), H2 (2.25rem/1.75rem mobile), etc.
- Section headers always follow: Eyebrow → H2 → Description pattern

#### Spacing
- 8px grid system with defined tokens (space-1 through space-20)
- Section padding: space-20 desktop, space-16 mobile
- Card grid gap: space-6

### 3. Main Page (index.html) - 15 Sections
1. **Header** (fixed) - Logo, Nav with WG dropdown, CTA, Dark Mode Toggle, Mobile menu
2. **Hero** - 100vh, Unsplash photo, gradient overlay, badge, H1, 2 CTAs
3. **Über uns** - 2-column layout, 4 stats
4. **Lage** - SVG map + distance categories
5. **Freie Zimmer** - Card grid with 4 example rooms
6. **Vorteile** - 6 benefit cards
7. **So geht's** - 3 steps with connecting gradient lines
8. **Keine Besichtigung nötig** - Main message + 3 alternative cards
9. **360° Touren** - 4 tour preview cards
10. **Bewertungen** - 3 testimonials
11. **Galerie** - Filter buttons + responsive grid + lightbox
12. **WG-Typen** - 4 cards linking to subpages
13. **Kontakt** - 2-column: info + form
14. **FAQ** - Accordion with 18 questions
15. **Footer** - 4 columns, social links, legal links

### 4. Subpages (Uniform Template)
- studenten-wg.html
- mediziner-wg.html
- inklusive-wg.html
- senioren-wg.html (uses formal "Sie" address)

Each subpage includes:
- Same header with WG dropdown navigation
- Mini hero with emoji, badge, H1, description
- Features section (6 cards)
- Filtered rooms section (only relevant category)
- CTA section
- Footer

### 5. Dark Mode
- Toggle via SVG icon button (sun/moon icons)
- localStorage persistence with 'wgn-theme' key
- Respects system preference (prefers-color-scheme)
- Clean dark palette: BG #0F172A, Surface #1E293B, Text #F1F5F9

### 6. Interactions (main.js)
- Theme toggle with localStorage persistence
- Mobile navigation with dropdown support
- Header scroll effect (shadow on scroll)
- Scroll progress bar (gradient, 3px)
- Scroll reveal animations (translateY + opacity)
- FAQ accordion (single item open at a time)
- Gallery filter + lightbox (keyboard, touch swipe)
- Cookie consent banner (DSGVO minimal)
- Contact form validation
- Smooth scroll for anchor links
- Desktop dropdown keyboard accessibility

### 7. Accessibility (WCAG AA)
- Skip link
- ARIA labels and roles
- Focus-visible styles
- Keyboard navigation
- prefers-reduced-motion respected
- Semantic HTML5

### 8. SEO & Technical
- Schema.org: LocalBusiness, FAQPage, BreadcrumbList, Offer, AggregateRating
- Open Graph & Twitter Cards
- robots.txt
- sitemap.xml
- favicon.svg

### 9. Performance
- Lazy loading for images
- IntersectionObserver for scroll reveal
- Minimal JavaScript (vanilla, no dependencies)
- CSS custom properties for theming

## Files Created
- index.html (main page with 15 sections)
- studenten-wg.html
- mediziner-wg.html
- inklusive-wg.html
- senioren-wg.html
- styles.css (complete design system)
- main.js (all interactions)
- robots.txt
- sitemap.xml
- favicon.svg
- CHANGES.md

## Fixed from v013
- **"Unsere WGs" dropdown navigation** is now properly implemented in the header
  - Desktop: Hover dropdown with smooth animation
  - Mobile: Collapsible group in hamburger menu
  - Both include color-coded badges for each WG type

## Design Inspiration
- Airbnb (modern, clean, trustworthy)
- WG-Gesucht (but better)
- The Student Hotel (young, fresh, inviting)
