# Design System — portraitsbypolo

**Version:** 2026-05-05T19:43:37+03:00 (EAT)
**Stack:** Astro 6.2.2 · Tailwind CSS 4.2.4 · OKLCH color space

---

## TL;DR for Designers

- **Single mode: light only.** The root `<html>` is locked to `scheme-light`. Dark mode utilities (`dark:`) appear in exactly 2 places — isolated remnants, not a system. Do not design for dark mode.
- **Token authority: `@theme` block in `tailwind-theme.css`.** This is the single source of truth. All tokens compile to native CSS custom properties (`var(--color-primary-500)` etc.) and are available as Tailwind classes (`text-primary-500`, `bg-base-900`, etc.) simultaneously.
- **Naming convention:** Tailwind utility classes are preferred. Raw `var()` usage is reserved for edge cases not expressible as utilities.

---

## Package Versions

| Package | Version |
|---|---|
| `tailwindcss` | `4.2.4` |
| `@tailwindcss/vite` | `4.2.4` |
| `@tailwindcss/forms` | `0.5.11` |
| `astro` | `6.2.2` |
| `@astrojs/cloudflare` | `^13.3.1` |
| `prettier-plugin-tailwindcss` | `0.8.0` |

---

## Color System

All colors are defined in **OKLCH** (perceptually uniform). This means each step in the scale is visually equidistant — a gradient from `primary-100` to `primary-900` will look smooth without muddy mid-tones.

### Primary Palette — Warm Taupe / Muted Bronze

A desaturated warm tone. Low chroma (0.005–0.063). Think parchment, aged linen, antique gold. This is the **accent and interactive** color.

| Token | Tailwind class | OKLCH | Visual |
|---|---|---|---|
| `primary-50` | `bg-primary-50` | `97.46% C0.005 H67°` | Near-white warm tint |
| `primary-100` | `bg-primary-100` | `94.4% C0.012 H84°` | Soft cream |
| `primary-200` | `bg-primary-200` | `88.03% C0.022 H76°` | **Button fill** (primary CTA bg) |
| `primary-300` | `bg-primary-300` | `80.1% C0.038 H73°` | Hover states, borders, focus rings |
| `primary-400` | `bg-primary-400` | `72.27% C0.049 H66°` | Secondary interactive |
| `primary-500` | `bg-primary-500` | `64.12% C0.062 H60°` | Mid-range accent |
| `primary-600` | `bg-primary-600` | `59.23% C0.063 H54°` | — |
| `primary-700` | `bg-primary-700` | `51.67% C0.054 H49°` | — |
| `primary-800` | `bg-primary-800` | `45.03% C0.043 H44°` | — |
| `primary-900` | `bg-primary-900` | `39.63% C0.035 H45°` | — |
| `primary-950` | `bg-primary-950` | `26.18% C0.022 H42°` | Near-black warm |

> **Design note:** `primary-200` is used as the primary button background against dark (`base-900`) text. The palette leans warm/neutral — it pairs well with serif typography for a photography/editorial feel.

---

### Base Palette — Pure Neutral Gray

Zero chroma (C=0). True achromatic grays. Used for **all text, backgrounds, borders, and surfaces**.

| Token | Tailwind class | Lightness | Role |
|---|---|---|---|
| `base-50` | `bg-base-50` | `97.31%` | — |
| `base-100` | `bg-base-100` | `92.8%` | **Page background** (`html` default) |
| `base-200` | `bg-base-200` | `86.07%` | Default border color (all `*` elements) |
| `base-300` | `bg-base-300` | `75.72%` | Dividers, subtle borders |
| `base-400` | `bg-base-400` | `62.68%` | Placeholder text |
| `base-500` | `bg-base-500` | `53.48%` | Form placeholders |
| `base-600` | `bg-base-600` | `47.84%` | — |
| `base-700` | `bg-base-700` | `42.76%` | Body text secondary (`.description` class) |
| `base-800` | `bg-base-800` | `39.04%` | Form labels, ghost button text |
| `base-900` | `bg-base-900` | `33.29%` | **Default body text**, button text on primary |
| `base-950` | `bg-base-950` | `26.86%` | — |

> **Design note:** The page renders as off-white (`base-100`) background with near-black (`base-900`) text. This is a deliberate warm-light editorial palette — not pure white/black.

---

### Semantic / Status Colors

These reference Tailwind's built-in palette via `var()`.

| Role | Token | Foreground Token | Based on |
|---|---|---|---|
| Info | `bg-info` | `text-info-foreground` | `sky-300` / `sky-950` |
| Success | `bg-success` | `text-success-foreground` | `green-300` / `green-950` |
| Warning | `bg-warning` | `text-warning-foreground` | `amber-300` / `amber-950` |
| Error | `bg-error` | `text-error-foreground` | `red-700` / `base-50` |

> All status colors use light pastel backgrounds with dark foregrounds, except Error which uses a dark red bg with light text.

---

### Accent Gradient

Used for category labels and some hero headings.

```css
.main-text-gradient {
  background: linear-gradient(to right, indigo-600, sky-600);
  background-clip: text;
  color: transparent;
}
```

Tailwind class: `.main-text-gradient` — apply directly. Do not use for body text; reserved for short display strings only.

---

## Dark Mode Status

**Light mode only.** `html` has `scheme-light` declared globally.

Two isolated `dark:` usages exist — they are not a designed system:
1. `.form__label` → `dark:text-base-200` (CSS)
2. `Admonition.astro` → `dark:text-base-900` (component)

**Implication for designers:** Do not design dark mode variants. If dark mode is added in the future, a full audit of both these orphan classes and all new components will be required.

---

## Typography

### Font Families

| Role | Token | Family | Variable font | Weights |
|---|---|---|---|---|
| Body / UI | `font-sans` | Work Sans Variable | Yes | 100–900 |
| Display H1/H2 | `font-heading-1` | Playfair Display Variable | Yes | 400–900 |
| Sub-heading H3 | `font-heading-2` | Raleway Variable | Yes | 100–900 |
| Decorative accent | `font-decorative` | Cinzel Decorative | No | 400 only |
| Code / mono | `font-mono` | System stack | N/A | — |

All fonts are self-hosted via `@fontsource-variable` / `@fontsource` packages with `font-display: swap` and Latin unicode subset.

### Type Scale (Semantic Components)

These are component-layer classes — use them on headings, not Tailwind's raw `text-4xl` etc.

| Class | Font | Size (mobile → desktop) | Weight | Other |
|---|---|---|---|---|
| `.h1` | Playfair Display | `text-4xl` → `lg:text-5xl` | `semibold` | — |
| `.h2` | Playfair Display | `text-2xl` → `md:text-[2.5rem]` | default | `uppercase`, `tracking-wide`, `leading-tight` |
| `.h3` | Raleway | `text-lg` → `md:text-2xl` | `medium` | `uppercase`, `tracking-widest`, `leading-tight` |
| `.description` | Work Sans (inherited) | inherited | inherited | `text-base-700` |
| `.nav__link--base` | Playfair Display | inherited | inherited | `uppercase`, `tracking-wide`, `px-4 py-2` |

> **Design pattern:** H1/H2 = serif (Playfair) → editorial/emotional weight. H3 = geometric sans (Raleway) → structural/informational. Body = Work Sans → neutral, readable. Decorative = Cinzel → logo/title moments only.

---

## Layout

### Container

```css
.site-container {
  max-width: 74rem; /* 1184px */
  padding-inline: 1rem; /* px-4 */
  margin-inline: auto;
}
```

Always wrap page sections in `.site-container`. Do not set custom max-widths on interior elements.

### Breakpoints

| Name | Token | Value |
|---|---|---|
| `xs` | `--breakpoint-xs` | `400px` |
| `sm` | `--breakpoint-sm` | `640px` |
| `md` | `--breakpoint-md` | `768px` |
| `lg` | `--breakpoint-lg` | `1024px` |
| `xl` | `--breakpoint-xl` | `1280px` |
| `2xl` | `--breakpoint-2xl` | `1536px` |

Tailwind usage: `xs:`, `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes. The `xs` breakpoint (`400px`) is custom — targets small phones.

---

## Component Tokens

### Buttons

Four variants, all using `.button` as base. Border radius is `rounded-none` (sharp corners — intentional editorial aesthetic).

```
.button               — base: font-heading-1, px-4 py-2, uppercase, tracking-wide, text-lg
  ├─ .button--primary    — bg-primary-200, text-base-900 | hover: bg-primary-200/80
  ├─ .button--secondary  — border-2 (no fill) | focus-visible: ring-primary-200
  ├─ .button--outline    — border-2 border-primary-200, text-base-900 | hover: border-primary-200/80
  └─ .button--ghost      — text-base-800, no border | hover: opacity-80
```

> **Design note:** No `rounded` on buttons — sharp corners are a deliberate style choice. All buttons use `font-heading-1` (Playfair Display) + uppercase. This gives CTAs a refined, editorial presence rather than a SaaS/tech feel.

### Focus State (Global)

All focusable elements use:
- `ring-2 ring-primary-300`
- `rounded-none`
- `transition-none` (no animated ring)

### Form Elements

| Element | Class | Key styles |
|---|---|---|
| Label | `.form__label` | `text-base-800` |
| Input | `.form__input` | `border-primary-300`, `bg-transparent`, `rounded-none`, `px-4 py-2` |

Inputs are **transparent** with a primary-colored bottom/full border. Focus shifts border to `primary-400`. No background change on focus.

---

## Style File Architecture

```
src/styles/
  global.css            — entry point; @import chain + @layer base/components/utilities
  tailwind-theme.css    — @theme block: ALL design tokens (colors, fonts, breakpoints)
  fonts.css             — @font-face declarations for all 4 typefaces
  buttons.css           — button component classes (injected into @layer components)
  markdown-content.css  — rich text / blog content styles (injected into @layer components)
```

**To add a new token:** edit `tailwind-theme.css` inside the `@theme {}` block. It immediately becomes available as both a Tailwind utility and a CSS custom property.

**To add a component class:** add to `buttons.css` (for interactive elements) or create a new `.css` file and import it in `global.css` with `layer(components)`.

---

## Key Design Decisions

| Decision | Implementation | Why |
|---|---|---|
| No border radius on interactive elements | `rounded-none` on buttons, inputs, focus rings | Editorial/photography aesthetic — sharp, deliberate |
| All buttons uppercase + serif | `font-heading-1` + `tracking-wide uppercase` | Creates a distinctive branded CTA style |
| OKLCH color space | All `--color-*` in `oklch()` | Perceptual uniformity; smooth gradients; vivid interpolation |
| Transparent form inputs | `bg-transparent` | Works over any background (dark photo, light section) |
| `scheme-light` locked | `html { scheme-light }` | No dark mode; prevents browser from auto-theming scrollbars/inputs |
| Variable fonts only (except Cinzel) | `font-weight: 100 900` ranges | Single file, full weight range; no FOUT from multiple files |
