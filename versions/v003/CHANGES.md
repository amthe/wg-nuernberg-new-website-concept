# CHANGES — WG Nürnberg Website v003

**Version:** v003
**Date:** 2026-03-07
**Status:** Real Photo Gallery with Lightbox & WG Map

---

## Overview

v003 replaces all placeholder images with real photos from the WGs and adds a full-featured lightbox/modal viewer with filter functionality. The location section now displays the actual WG map SVG.

---

## v003 Enhancements

### Real Photo Gallery
- **12 real photos** from various WG locations:
  - Grasstraße 11 (WG 1 & WG 2)
  - Grasstraße 15 (WG 1)
  - Grasstraße 21 (WG 2)
  - Klarastraße 2 & 3
  - Sternstraße 1 & 3
  - Individual room photos
  - 3D floor plan (Grundriss)
- Featured large image layout for the first photo
- Responsive masonry-style grid
- Lazy loading on all images for performance
- Descriptive alt text on each image

### Gallery Filter System
- Filter buttons above the gallery: Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer
- Data attribute based filtering (`data-category`)
- Active filter state with gradient styling
- Instant show/hide filtering
- Accessible with `aria-pressed` states
- Floor plan visible in all filters

### Lightbox/Modal Viewer
- Pure CSS + JS implementation (no external libraries)
- Full-screen overlay with dark backdrop (95% opacity)
- **Navigation features:**
  - Previous/Next arrow buttons with SVG icons
  - Keyboard navigation (Left/Right arrows, Escape to close)
  - Touch swipe support for mobile (swipe left/right)
- **Close methods:**
  - X button in top-right corner
  - Click on backdrop
  - Escape key
- Caption bar showing the WG location name
- Image counter (e.g., "3 / 12")
- Smooth fade-in/out animations with scale transform
- Respects `prefers-reduced-motion` setting
- Focus trapped in lightbox for accessibility

### Location Map
- Replaced map placeholder emoji with actual `wg-map.svg`
- Responsive sizing with `object-fit: contain`
- Proper padding for visual breathing room
- Accessible alt text

### About Section Image
- Replaced placeholder emoji with real photo (`gras15-1-1024-o_13.jpg`)
- Maintains aspect ratio with `object-fit: cover`
- Shows a welcoming common area from Grasstraße 15

### Gallery Description Update
- Changed from "bald mit noch mehr Bildern" to "Echte Einblicke in unsere WGs in der Nürnberger Altstadt"

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Replaced gallery section with real photos, added filter buttons, added lightbox HTML, replaced map placeholder with SVG, replaced about section placeholder with photo, added gallery/lightbox JavaScript |
| `styles.css` | Added filter button styles, enhanced gallery grid styles, added lightbox modal styles, added map SVG styles, added about image styles |
| `CHANGES.md` | Updated with v003 info |

---

## Technical Notes

### CSS Additions (~200 lines)
- `.gallery__filters` - Filter button container (flexbox, centered)
- `.gallery__filter` - Individual filter buttons with active state
- `.gallery__item` - Enhanced with overlay, label, hover effects
- `.gallery__item--featured` - Large featured item spanning 2x2 grid
- `.gallery__item--floorplan` - Special styling for floor plan
- `.gallery__overlay` - Gradient overlay with location label
- `.gallery__label` - Location name styling
- `.gallery__image` - Full-cover image with zoom on hover
- `.lightbox` - Full lightbox modal container
- `.lightbox__backdrop` - Dark backdrop with click-to-close
- `.lightbox__content` - Centered content container
- `.lightbox__image` - Responsive image with animations
- `.lightbox__nav` - Navigation button styling (prev/next)
- `.lightbox__close` - Close button with hover effect
- `.lightbox__caption` - Caption bar styling
- `.lightbox__counter` - Image counter styling
- `.location__map-svg` - SVG map responsive styling
- `.about__image-photo` - About section photo styling
- Reduced motion support for lightbox animations

### JavaScript Additions (~120 lines)
- **Gallery Filter:**
  - Click handlers for filter buttons
  - `data-filter` attribute matching
  - Active state management with `aria-pressed`
  - Show/hide items with `.hidden` class
- **Lightbox:**
  - `openLightbox()` - Opens modal with image
  - `closeLightbox()` - Closes with animation
  - `prevImage()` / `nextImage()` - Navigation
  - `updateLightboxImage()` - Updates displayed image
  - `getVisibleItems()` - Gets filtered items
  - Keyboard event listener (Escape, Arrow keys)
  - Touch swipe detection (touchstart/touchend)
  - Focus management for accessibility
  - Respects `prefersReducedMotion` for animations

### Images Used
All images from `assets/img/` directory:
- `gras11-1-1024-o_8.jpg` - Featured large image
- `gras11-2-1024-o_8.jpg`
- `gras15-1-1024-o_8.jpg`
- `gras15-1-1024-o_13.jpg` - About section
- `gras21-2-1024-o_9.jpg`
- `klara2-1024-o_8.jpg`
- `klara3-1024-o_8.jpg`
- `stern1-1024-o_8.jpg`
- `stern1-1024-o_25.jpg`
- `stern3-1024-o_8.jpg`
- `zimmer-gras15-1024-o_3.jpg`
- `zimmer-stern1-1024-o_8.jpg`
- `grundriss-gras11.jpg` - Floor plan
- `wg-map.svg` - Location map

---

## Browser Compatibility
- All features work in modern browsers (Chrome, Firefox, Safari, Edge)
- Touch events supported on all mobile devices
- Works with file:// protocol (no server required)
- Graceful degradation (images visible without JS)
- Lazy loading supported in all modern browsers

---

## Accessibility
- All gallery items have `tabindex="0"` and `role="button"`
- Descriptive `aria-label` on each gallery item
- Filter buttons use `aria-pressed` for state
- Lightbox uses `role="dialog"` and `aria-modal="true"`
- Navigation buttons have `aria-label` descriptions
- Focus managed when lightbox opens/closes
- Keyboard navigation (Arrow keys, Escape)
- All animations respect `prefers-reduced-motion`
- Proper alt text on all images

---

## v002 Features (Preserved)
All v002 features remain intact:
- Scroll progress indicator
- Parallax hero effect
- Animated stat counters
- Staggered reveal animations
- Button micro-interactions
- Section dividers (wave/gradient)
- Focus state improvements
- Reduced motion support

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

## Next Steps (v004+)
1. Apply v003 photo gallery to all subpages
2. Add more photos for each WG type subpage
3. Set up form submission (backend/email)
4. Add loading skeleton states for images
5. Consider video tours integration
6. Add interactive elements to the map SVG
