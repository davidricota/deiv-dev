# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

No lint or test commands are configured.

## Architecture

This is a personal portfolio/business site built with **Astro v5** and **Tailwind CSS v4**.

### Data-driven content

All site content lives in `src/data/site.json` (exported as `src/data/site.js`). Sections like the hero, about, resume, services, and portfolio projects are all driven from this single data file. When updating content, edit `site.json`.

### Routing

- `src/pages/index.astro` — Single-page layout that composes all section components
- `src/pages/portfolio/[slug].astro` — Dynamic route for individual portfolio project pages; slugs come from `site.json`

### Components

All section components live in `src/components/` and are imported into `index.astro`. Each component typically receives props from `site.json` data.

### Styling

- Global styles and CSS custom properties (light/dark theme variables) are in `src/styles/global.css`
- Tailwind v4 is integrated via Vite plugin (`@tailwindcss/vite` in `astro.config.mjs`)
- Path alias `@/*` resolves to `src/*`

### Deployment

GitHub Actions (`.github/workflows/astro.yml`) builds on push to `main` and publishes the `dist/` output to a separate `build` branch for static hosting.
