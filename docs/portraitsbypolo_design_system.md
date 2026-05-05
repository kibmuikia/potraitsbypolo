# Design System — portraitsbypolo

Version: 2026-05-05T19:43:37+03:00 (EAT)
Stack: Astro 6.2.2 · Tailwind CSS 4.2.4 · OKLCH

## Overview

Mode: Light-only (html { scheme-light }). Dark mode not supported. Two isolated dark: remnants exist (form label, Admonition) — not a system.
Token source: @theme in tailwind-theme.css → outputs CSS variables + Tailwind utilities simultaneously.
Usage: Tailwind classes preferred; var() only when necessary.

## Packages

tailwindcss 4.2.4
@tailwindcss/vite 4.2.4
@tailwindcss/forms 0.5.11
astro 6.2.2
@astrojs/cloudflare ^13.3.1
prettier-plugin-tailwindcss 0.8.0

## Color System (OKLCH — perceptually uniform)

### Primary — Warm Taupe, accent/interactive, low chroma (0.005–0.063)

50:  97.46% C0.005 H67°  near-white warm tint
100: 94.4%  C0.012 H84°  soft cream
200: 88.03% C0.022 H76°  PRIMARY CTA background
300: 80.1%  C0.038 H73°  hover states, borders, focus rings
400: 72.27% C0.049 H66°  secondary interactive
500–950: progressive darkening to near-black (26.18%)

Primary CTA pattern: bg-primary-200 + text-base-900.

### Base — Neutral Gray, all surfaces, C=0

100: page background (default html bg)
200: default border (applied globally to all *)
300: dividers
400–500: placeholder text
700: secondary/description text
800: labels, ghost button text
900: primary body text (default html color)
950: darkest

### Semantic

info:    bg sky-300    / text sky-950
success: bg green-300  / text green-950
warning: bg amber-300  / text amber-950
error:   bg red-700    / text base-50  ← only dark-bg status color

### Gradient

.main-text-gradient: indigo-600 → sky-600, text-only, short display strings only.

## Typography

### Fonts (self-hosted via @fontsource, font-display: swap, Latin subset)

Work Sans Variable   — body/UI, 100–900
Playfair Display Var — H1, H2, buttons/CTAs, 400–900
Raleway Variable     — H3, 100–900
Cinzel Decorative    — logo/decorative only, 400 fixed
System mono stack    — code

### Semantic Scale (use these classes, not raw Tailwind size utilities)

.h1              Playfair, 4xl → lg:5xl, semibold
.h2              Playfair, 2xl → md:2.5rem, uppercase, tracking-wide, leading-tight
.h3              Raleway,  lg  → md:2xl,   uppercase, tracking-widest, leading-tight
.description     Work Sans (inherited), color base-700
.nav__link--base Playfair, uppercase, tracking-wide, px-4 py-2

Pattern: Serif (H1/H2) for editorial weight → Geometric sans (H3) for structure → Neutral (body).

## Layout

Container: .site-container — max-w-[74rem] (1184px), px-4, mx-auto

Breakpoints:
xs  400px  custom (small phones)
sm  640px
md  768px
lg  1024px
xl  1280px
2xl 1536px

## Components

### Buttons — base: .button

All buttons: Playfair Display, uppercase, tracking-wide, text-lg, px-4 py-2, rounded-none (sharp), active:opacity-80

.button--primary   bg-primary-200 text-base-900 / hover:bg-primary-200/80
.button--secondary border-2, no fill            / focus-visible:ring-primary-200
.button--outline   border-2 border-primary-200  / hover:border-primary-200/80
.button--ghost     text-base-800, no border     / hover:opacity-80

### Focus (global)

ring-2 ring-primary-300, rounded-none, transition-none.

### Forms

Label:  .form__label — text-base-800
Input:  .form__input — transparent bg, border-primary-300, rounded-none, px-4 py-2
        focus: border shifts to primary-400, no bg change, no ring.

## File Architecture

src/styles/
  global.css           entry point; @import chain + @layer base/components/utilities
  tailwind-theme.css   @theme block — all tokens (colors, fonts, breakpoints)
  fonts.css            @font-face declarations
  buttons.css          button variants → @layer components
  markdown-content.css rich text styles → @layer components

Add token: edit @theme {} in tailwind-theme.css.
Add component class: add to buttons.css or new file imported in global.css as layer(components).

## Key Design Decisions

rounded-none everywhere   → sharp corners, editorial/photography aesthetic
Serif uppercase CTAs      → distinctive branded feel, not SaaS
OKLCH color space         → perceptually smooth gradients, no muddy mid-tones
Transparent form inputs   → works over any background color or image
Light-only rendering      → predictable, no dark-mode divergence
Variable fonts            → single file per family, full weight range, no FOUT
