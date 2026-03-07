# Design System — WG Nürnberg

Dieses Dokument ist **verbindlich**. Jede Version der Website MUSS sich daran halten.

---

## Farben

### Primär
| Name | Hex | Verwendung |
|------|-----|------------|
| Primary | `#10B981` | CTAs, Highlights, Links |
| Primary Light | `#34D399` | Hover-States |
| Primary Dark | `#059669` | Active-States |

### Akzent
| Name | Hex | Verwendung |
|------|-----|------------|
| Accent | `#0EA5E9` | Sekundäre Highlights, Badges |
| Accent Light | `#38BDF8` | Hover |
| Accent Dark | `#0284C7` | Active |

### Gradient
- `linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)` — nur für Hero-Texteffekte und Scroll-Progress-Bar
- **NICHT** für Backgrounds oder Buttons

### Neutral (Light Mode)
| Rolle | Hex |
|-------|-----|
| Background | `#FFFFFF` |
| Surface | `#F8FAFC` (abwechselnde Sektionen) |
| Text | `#1E293B` |
| Text Secondary | `#64748B` |
| Text Muted | `#94A3B8` |
| Border | `#E2E8F0` |

### Neutral (Dark Mode)
| Rolle | Hex |
|-------|-----|
| Background | `#0F172A` |
| Surface | `#1E293B` |
| Text | `#F1F5F9` |
| Text Secondary | `#CBD5E1` |
| Border | `#334155` |

### Regel
- Maximal **2 Farben pro Abschnitt** (Primary ODER Accent, nie beide gleichzeitig)
- Backgrounds sind IMMER weiß oder Surface — nie bunt
- Farbige Elemente: nur CTAs, Icons, Badges, Links

---

## Typografie

### Font
- **Inter** (Google Fonts) — einziger Font
- Fallback: `system-ui, -apple-system, sans-serif`

### Skala (rem-basiert, konsistent auf ALLEN Seiten)
| Element | Größe | Gewicht | Zeile |
|---------|-------|---------|-------|
| H1 (Hero) | `3rem` / `2.25rem` mobil | 800 | 1.1 |
| H2 (Sektion) | `2.25rem` / `1.75rem` mobil | 700 | 1.2 |
| H3 (Untertitel) | `1.5rem` / `1.25rem` mobil | 600 | 1.3 |
| H4 (Karten-Titel) | `1.125rem` | 600 | 1.4 |
| Body | `1rem` (16px) | 400 | 1.6 |
| Small / Labels | `0.875rem` | 500 | 1.5 |
| Badge | `0.75rem` | 600 | 1 |

### Regel
- **KEINE** anderen Größen verwenden — nur diese Skala
- Section-Header: IMMER Eyebrow (Small, uppercase, Primary-Farbe) → H2 → Description (Body, Text Secondary)

---

## Abstände (Spacing)

### Basis: 8px-Grid
| Token | Wert | Verwendung |
|-------|------|------------|
| `--space-1` | `0.25rem` (4px) | Minimal |
| `--space-2` | `0.5rem` (8px) | Inline-Abstände |
| `--space-3` | `0.75rem` (12px) | Karten-Padding innen |
| `--space-4` | `1rem` (16px) | Standard-Gap |
| `--space-6` | `1.5rem` (24px) | Zwischen Elementen |
| `--space-8` | `2rem` (32px) | Karten-Padding |
| `--space-12` | `3rem` (48px) | Zwischen Blöcken |
| `--space-16` | `4rem` (64px) | Zwischen Sektionen (mobil) |
| `--space-20` | `5rem` (80px) | Zwischen Sektionen (desktop) |

### Regeln
- Sektionen: **IMMER** `--space-20` Abstand (desktop), `--space-16` (mobil)
- Karten-Grid: **IMMER** `--space-6` Gap
- Kein willkürliches Padding — nur Tokens verwenden

---

## Komponenten

### Section Header
Jeder Abschnitt beginnt mit:
```
Eyebrow (klein, uppercase, Primary-Farbe)
H2 Titel
Description (optional, max 2 Zeilen, Text Secondary)
```
- Immer zentriert
- Abstand nach unten: `--space-12`

### Karten (Cards)
EIN Karten-Stil für ALLES (Vorteile, Zimmer, Touren, Testimonials):
- Background: `var(--color-surface-elevated)` oder `white`
- Border: `1px solid var(--color-border)`
- Border-Radius: `12px`
- Padding: `--space-8`
- Shadow: `0 2px 8px rgba(0,0,0,0.06)`
- Hover: `translateY(-2px)` + stärkerer Shadow
- **KEINE** verschiedenen Karten-Stile pro Abschnitt

### Buttons
| Typ | Style |
|-----|-------|
| Primary | Background: Primary, Text: Weiß, Border-Radius: 8px |
| Secondary | Background: transparent, Border: Primary, Text: Primary |
| WhatsApp | Background: `#25D366`, Text: Weiß |

- Größen: `sm` (padding 8px 16px), `md` (12px 24px), `lg` (16px 32px)
- Hover: leicht dunkler + `translateY(-1px)`

### Badges
- Kleine Pills mit Farb-Hintergrund (leicht transparent)
- Border-Radius: `999px`
- Padding: `4px 12px`
- Font: Badge-Größe (0.75rem)
| Kategorie | Farbe |
|-----------|-------|
| Studenten | `#10B981` (Primary) |
| Mediziner | `#0EA5E9` (Accent) |
| Inklusive | `#8B5CF6` (Violet) |
| Senioren | `#F59E0B` (Amber) |

### Icons
- Emoji-basiert (keine Icon-Library)
- Größe: `1.5rem` in Karten, `2.5rem` in Feature-Listen
- Immer in einem runden Container mit leichtem Background

---

## Layout

### Container
- Max-Width: `1200px`
- Padding: `0 1.5rem` (mobil), `0 2rem` (desktop)
- Zentriert

### Grid
- Karten-Grids: `auto-fill, minmax(300px, 1fr)` (responsive ohne Breakpoints)
- Zwei-Spalten-Layouts: `1fr 1fr` ab `768px`, Stack darunter
- Max 3-4 Karten pro Reihe

### Sektions-Rhythmus
- Abwechselnde Backgrounds: Weiß → Surface → Weiß → Surface
- Section-Divider: Subtile Wellenform (SVG) ODER einfacher Border — **konsistent**, nicht mal so mal so
- Jede Sektion: gleiche Padding-Werte (keine Ausnahmen)

---

## Dark Mode

- Toggle: ☀️/🌙 Button im Header
- `data-theme="light|dark"` auf `<html>`
- CSS: `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`
- localStorage: `wgn-theme`
- **Alle Komponenten MÜSSEN im Dark Mode getestet aussehen**
- Bilder: leichter Overlay oder reduzierte Brightness im Dark Mode
- Karten-Borders und Shadows anpassen

---

## Animationen

- `prefers-reduced-motion` respektieren
- Scroll-Reveal: subtiles `translateY(20px)` + `opacity: 0` → `0` + `1`
- Hover: nur `translateY` und Shadow — keine Farbwechsel
- Transition: `0.2s ease` für alles
- Scroll-Progress-Bar: top, gradient, 3px

---

## Responsiveness

### Breakpoints
| Name | Wert |
|------|------|
| Mobile | `< 640px` |
| Tablet | `640px – 1024px` |
| Desktop | `> 1024px` |

### Mobile-Regeln
- Navigation: Hamburger-Menü
- Hero: Titel kleiner, kein Parallax
- Karten: 1 Spalte
- Sektions-Padding: reduziert (`--space-16` statt `--space-20`)
