# Guidelines

- logs/documentations/plans etc are kept in folder `./docs/`.
- Design system reference (tokens, typography, colors, components, modes): `./docs/design-system.md` — versioned 2026-05-05T19:43:37+03:00 - compact version in `docs/portraitsbypolo_design_system.md`.
- Leverage **context7** for version-accurate library/framework docs; **sequentialthinking** for structured reasoning, task decomposition, and multi-step planning; **playwright** for real browser-based testing, interaction, and visual validation; and **web search** for current, validated external data beyond training knowledge; **github** for repo management, PR review, and issue tracking.
- After tasks: Provide sample commit message for user to use manually. Commit format: `<type>(<scope>): <subject>`. Examples: `feat(hero): add animated background`, `fix(toast): correct coming-soon interception`, `docs(changelog): add initial docs`, `refactor(footer): improve spacing`.
- Local Cloudflare Workers dev: `pnpm dev:cloudflare` (builds then runs wrangler dev). Use instead of `pnpm dev` when testing Workers-specific behavior.
- ensure proper use of debug logs especially in scripts.
