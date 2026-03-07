# CHANGES — WG Nürnberg Website v001

**Version:** v001
**Date:** 2026-03-06
**Status:** Initial prototype (static HTML)

---

## Overview

This is the initial version of the new WG Nürnberg website — a complete redesign targeting all shared living residents, not just students. The site is built as a static HTML prototype that can be opened directly in a browser.

## Files Created

### Main Files
| File | Description |
|------|-------------|
| `index.html` | Main landing page with all sections |
| `styles.css` | Shared CSS with design system |
| `studenten-wg.html` | Student shared flat subpage |
| `mediziner-wg.html` | Medical staff shared flat subpage |
| `inklusive-wg.html` | Inclusive shared flat subpage |
| `senioren-wg.html` | Senior shared flat subpage |
| `CHANGES.md` | This file |

### Assets Used
- `assets/logos/wg-nuernberg-grey-optimized.svg` (horizontal logo)
- `assets/logos/wg-nuernberg-vertical-grey-optimized.svg` (vertical logo)

---

## Features Implemented

### Design System (styles.css)
- **Color Palette:** Modern green (mint/emerald #10B981) + blue (sky #0EA5E9) on white
- **Typography:** Inter font family via Google Fonts
- **Dark Mode:** Automatic via `prefers-color-scheme: dark`
- **Responsive:** Mobile-first design with breakpoints at 640px, 768px, 1024px
- **CSS Custom Properties:** Full design token system for colors, spacing, typography
- **Animations:** Fade-in-up on scroll, pulse for price badge
- **Accessibility:** Skip link, focus states, proper contrast

### Main Page (index.html)
- **Hero Section:** Bold headline, price badge (ab 450€), CTA buttons
- **About Section:** Company intro, stats (20+ years, 120+ residents, 20+ nationalities)
- **Location Section:** Address, map placeholder, distance tags to universities/transit
- **Benefits Section:** 6 benefit cards with icons
- **Process Section:** 3-step process (Anfragen → Besichtigen → Einziehen)
- **Testimonials Section:** 3 reviews with star ratings
- **Gallery Section:** Photo grid with placeholders
- **Contact Section:** Contact info + form (name, email, phone, move-in date, duration, message)
- **FAQ Section:** Expandable accordion with all 18 questions from Christina's list
- **Footer:** Navigation, WG types, contact info, legal links

### Schema.org Structured Data
- LocalBusiness (address, geo, contact, hours)
- FAQPage (6 featured questions)
- Product with Reviews and AggregateRating

### Target Group Subpages
Each subpage includes:
- Hero with icon and description
- Feature list specific to the target group
- CTA section with contact buttons
- Consistent header/footer/navigation

**Studenten-WG:**
- University distances (TH, FAU WiSo, EVHN, etc.)
- Student-specific benefits (budget-friendly, WiFi, nightlife)

**Mediziner-WG:**
- Benefits for shift workers
- Emphasis on short commutes, quiet living
- International healthcare workers welcome

**Inklusive WG:**
- Accessibility options mentioned
- Diversity and inclusion messaging
- Open to all backgrounds

**Senioren-WG:**
- Community vs. loneliness messaging
- Walkable neighborhood benefits
- Clarification: not a care facility

---

## JavaScript Features
- Mobile navigation toggle with hamburger menu
- Header scroll effect (shadow on scroll)
- FAQ accordion (one open at a time)
- Scroll-triggered animations
- Smooth scroll for anchor links

---

## Accessibility Features
- Skip to content link
- ARIA labels and roles
- Focus management for mobile nav
- Semantic HTML5 structure
- Color contrast meeting WCAG AA
- Keyboard-navigable FAQ accordion

---

## What's NOT Included (for future versions)
- Real images/photos (using placeholders)
- Video hero (requires production)
- Google Maps embed (placeholder only)
- Working form submission (form exists but doesn't submit)
- Google Analytics integration
- Actual phone number/email (using placeholders)
- Impressum and Datenschutz content
- Cookie consent banner

---

## Tech Stack
- **HTML5:** Semantic markup
- **CSS3:** Custom properties, flexbox, grid, animations
- **JavaScript:** Vanilla JS, no dependencies
- **Fonts:** Google Fonts (Inter)
- **No build tools:** Works directly in browser via file:// protocol

---

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- Dark mode support where available

---

## Next Steps (v002+)
1. Add real photos and video content
2. Implement Google Maps embed
3. Set up form submission (backend/email)
4. Add Google Analytics 4
5. Create Impressum and Datenschutz pages
6. Add cookie consent (minimal)
7. Performance optimization (image formats, lazy loading)
8. Set up Nuxt/Vue for production build
