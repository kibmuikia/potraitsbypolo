# Portraits by Polo

Portfolio website for [@portraitsbypolo](https://www.instagram.com/portraitsbypolo/) — Global Film Camera Operator. Built with [Astro](https://astro.build) v6, Tailwind CSS v4, and deployed to Cloudflare Workers. Built on Horizon theme by [Cosmic Themes](https://cosmicthemes.com/).

## Quickstart

```bash
pnpm install
pnpm dev
```

Requires **Node ≥ 22.12.0** and **pnpm 10.x** (`corepack enable` to activate).

## Commands

All commands run from the project root:

| Command               | Action                                                   |
| :-------------------- | :------------------------------------------------------- |
| `pnpm dev`            | Start local dev server at `localhost:4321`               |
| `pnpm dev:cloudflare` | Build + run via Wrangler at `localhost:8787` (Workers)   |
| `pnpm build`          | Build production site to `./dist/`                       |
| `pnpm preview`        | Build + preview via Cloudflare Workers locally           |
| `pnpm deploy`         | Build and deploy to Cloudflare                           |
| `pnpm check`          | Type-check with `astro check`                            |
| `pnpm format`         | Lint + format with ESLint and Prettier                   |
| `pnpm lint`           | Lint only (no write)                                     |

> **Prefer `pnpm dev:cloudflare`** for this project. `pnpm dev` (plain Vite) triggers a `module is not defined` error from the Cloudflare Workers runner at runtime — use it only for quick UI-only iteration where Workers features aren't exercised.

## Project Structure

```text
.
├── docs/                     # Design docs, migration SQL files, plans
├── public/                   # Static assets served as-is
├── src/
│   ├── actions/              # Astro server actions (contact form, admin ops)
│   ├── assets/               # Images processed by Astro's image optimizer
│   ├── components/           # Astro UI components, organized by feature
│   ├── config/               # Site metadata and nav configuration
│   ├── data/                 # Content: portfolios, testimonials, static pages
│   ├── icons/                # Local SVG icons
│   ├── js/                   # Utility modules (Supabase clients, text helpers)
│   ├── layouts/              # Page layout wrappers
│   ├── pages/                # File-based routes
│   │   ├── admin/            # Password-protected admin dashboard
│   │   └── portfolio/        # Portfolio collection routes
│   ├── styles/               # Global CSS, design tokens, Tailwind theme
│   ├── content.config.ts     # Astro content collection schemas
│   ├── database.types.ts     # Supabase-generated DB type definitions
│   ├── env.d.ts              # Environment variable type declarations
│   └── middleware.ts         # Admin route protection (session check)
├── astro.config.mjs
├── wrangler.jsonc            # Cloudflare Workers / KV bindings config
└── tsconfig.json
```

Content collections live under `src/data/` — add a new folder with an `index.md` to create a new portfolio or testimonial entry.

## Supabase Integration

The project uses [Supabase](https://supabase.com) for contact/lead management. Two clients are available:

| Module                    | Key used          | Use for                                      |
| :------------------------ | :---------------- | :------------------------------------------- |
| `src/js/supabase.ts`      | Anon (public)     | Client-side reads, public queries            |
| `src/js/supabase-admin.ts`| Service role      | Server-only writes, RLS-bypassing operations |

The admin client is server-only — never import it in client-side code or public components.

**Type regeneration** (after schema changes):

```bash
pnpm dlx supabase gen types typescript --project-id <project-id> > src/database.types.ts
```

Database migrations are tracked in `docs/migrations/` as plain SQL files. Run them manually in the Supabase SQL editor.

## Key Stack Versions

| Package                  | Version   |
| :----------------------- | :-------- |
| `astro`                  | 6.2.2     |
| `@astrojs/cloudflare`    | ^13.3.1   |
| `tailwindcss`            | 4.2.4     |
| `@supabase/supabase-js`  | ^2.105.4  |
| `zod`                    | ^4.4.3    |
| `wrangler`               | ^4.87.0   |

## Design System

Design tokens, typography, colors, and component patterns are documented in `docs/design-system.md`.

The theme implements a multi-font hierarchy — Playfair Display Variable for primary headings (h1/h2), Raleway Variable for subheadings (h3), Cinzel Decorative for decorative text, and Work Sans Variable for sans-serif body — anchored by an OKLCH color system with warm neutral primaries (`--color-primary-*`) and achromatic bases (`--color-base-*`). Dark mode is toggled via a .dark class on `<html>`, which inverts the base color scale through CSS custom property overrides and switches the color scheme to dark[`src/styles/global.css`].

## License

This is a private client project built for Paul ([@portraitsbypolo](https://www.instagram.com/portraitsbypolo/)) and is not open source. The underlying theme ([Horizon by Cosmic Themes](https://cosmicthemes.com/)) is GPL-3.0, but the customizations, content, and feature work in this repository are proprietary.
