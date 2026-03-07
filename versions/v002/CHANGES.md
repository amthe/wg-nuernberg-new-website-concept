# CHANGES — WG Nürnberg Website v002

**Version:** v002
**Date:** 2026-03-07
**Status:** Enhanced with scroll storytelling & micro-interactions

---

## Overview

v002 builds on v001 by adding scroll-driven storytelling and micro-interactions to make the website feel alive and modern. All enhancements respect `prefers-reduced-motion` for accessibility.

---

## v002 Enhancements

### Scroll Progress Indicator
- Thin gradient bar at the very top of viewport
- Uses primary gradient (green to blue)
- Grows from 0% to 100% width as user scrolls
- Fixed position, always visible

### Animated Stat Counters
- Stats in About section (20+ years, 120+ residents, 20+ nations, 17 WGs)
- Count up from 0 when scrolling into view
- Uses IntersectionObserver (triggers once)
- Smooth ease-out-cubic animation over 2 seconds
- Falls back to static numbers with reduced motion

### Staggered Reveal Animations
- Benefit cards, process steps, and testimonials
- Fade in with 100ms stagger delay between each item
- Uses IntersectionObserver (not scroll events)
- Smooth fadeInUp keyframe animation
- Disabled with reduced motion preference

### Button Micro-interactions
- CTA buttons scale up on hover (`transform: scale(1.03)`)
- Press-down effect on `:active` (`scale(0.97)`)
- Enhanced box-shadow lift on hover
- Smooth 150ms transitions
- Applied to all button variants (primary, secondary, outline, WhatsApp)

### Section Transition Effects
- Wave SVG dividers between major sections
- Creates visual flow instead of hard boundaries
- Gradient dividers for some section transitions
- Subtle, non-intrusive design

### Gallery Hover Zoom
- Gallery placeholders zoom on hover (`scale(1.08)` inner, `scale(1.02)` outer)
- `overflow: hidden` on container for clean effect
- Smooth 400ms transition
- Added shadow lift on hover

### Parallax Hero Effect
- Hero background scrolls at different speed (0.3x multiplier)
- Uses `transform: translateY()` (NOT `background-attachment: fixed`)
- Decorative elements have staggered parallax speeds
- Mobile-friendly (works on all devices)
- Disabled for users preferring reduced motion

### Focus State Improvements
- All interactive elements have visible `:focus-visible` states
- Primary color (green) outline with 2px offset
- Applied to buttons, links, nav items, form fields, FAQ buttons, gallery items
- Default focus ring hidden when not using keyboard navigation

### Reduced Motion Support
- All animations respect `prefers-reduced-motion: reduce`
- CSS: Disables all animations/transitions
- JS: Checks media query and skips animations
- Elements shown immediately without motion
- Parallax disabled
- Smooth scroll falls back to instant scroll

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Added scroll progress div, parallax bg wrapper, data attributes for counters, stagger-reveal classes, section dividers, enhanced JavaScript |
| `styles.css` | Version bump, scroll progress styles, button micro-interactions, focus-visible states, stagger animations, section dividers, gallery zoom, parallax styles, reduced-motion media queries |
| `CHANGES.md` | Updated with v002 info |

---

## Technical Notes

### CSS Additions (~150 lines)
- `.scroll-progress` - Fixed progress bar
- Button hover/active enhancements
- `:focus-visible` states for accessibility
- `.stagger-reveal` animation classes
- `.section-divider` wave/gradient styles
- Gallery zoom effects
- Parallax positioning
- `@media (prefers-reduced-motion: reduce)` overrides

### JavaScript Additions (~100 lines)
- `prefersReducedMotion` check
- `updateScrollProgress()` function
- `updateParallax()` function with requestAnimationFrame
- `animateCounter()` with easing
- IntersectionObserver for stats
- IntersectionObserver for staggered reveals

### Performance Considerations
- Uses `will-change: transform` for parallax elements
- IntersectionObserver instead of scroll event listeners where possible
- Throttled scroll updates via browser's native handling
- CSS transitions instead of JS animations where feasible
- Elements unobserved after animation completes

---

## Browser Compatibility
- All features work in modern browsers (Chrome, Firefox, Safari, Edge)
- IntersectionObserver supported in all modern browsers
- `:focus-visible` supported in all modern browsers
- Graceful fallback for older browsers (elements visible, no animations)
- Works with file:// protocol (no server required)

---

## Accessibility
- All animations respect `prefers-reduced-motion`
- Focus states visible for keyboard navigation
- Section dividers use `aria-hidden="true"`
- Scroll progress indicator uses `aria-hidden="true"`
- All existing accessibility features from v001 preserved

---

## v001 Features (Preserved)
All v001 features remain intact:
- Design system with CSS custom properties
- Dark mode support
- Mobile-first responsive design
- Semantic HTML5 structure
- Mobile navigation toggle
- FAQ accordion
- Form structure
- Schema.org structured data
- Skip link for accessibility
- All subpages (studenten-wg, mediziner-wg, inklusive-wg, senioren-wg)

---

## Next Steps (v003+)
1. Apply v002 enhancements to all subpages
2. Add real photos and video content
3. Implement Google Maps embed
4. Set up form submission (backend/email)
5. Add loading skeleton states
6. Consider adding scroll-triggered video backgrounds
7. Add page transition animations
