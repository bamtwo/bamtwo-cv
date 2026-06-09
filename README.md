# Bam Two — Personal CV/Portfolio

**Interdisciplinary Creative Technologist & Systems Architect**

A maximalist, dual-theme JAMstack CV/Portfolio built with Astro 4.x, GSAP, D3.js, and Lenis. Deployed on Vercel with a GitHub Pages fallback.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 4.x](https://astro.build) (SSG, zero JS by default) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + custom CSS |
| Animations | [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger, Timeline) + [Lenis](https://lenis.studio) smooth scroll |
| Visualization | [D3.js](https://d3js.org) (force-directed skills graph) |
| Icons | [Lucide](https://lucide.dev) (tree-shakeable SVG) |
| Fonts | [Fontsource](https://fontsource.org) (self-hosted, no CDN) |
| Linting | [Biome](https://biomejs.dev) |
| Testing | [Playwright](https://playwright.dev) |
| Package Manager | [pnpm](https://pnpm.io) |

---

## Local Development

```bash
# Clone
git clone https://github.com/YOU/bamtwo-cv.git
cd bamtwo-cv

# Install
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Preview
pnpm preview

# Lint
pnpm lint

# Type check
pnpm check

# Tests
pnpm test:e2e
```

---

## Deployment

### Vercel (primary)

1. Install Vercel CLI: `pnpm add -g vercel`
2. Link project: `vercel link`
3. Add these GitHub secrets:
   - `VERCEL_TOKEN` — from [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — from `vercel link` output
   - `VERCEL_PROJECT_ID` — from `vercel link` output
4. Push to `main` — automatic deploy via GitHub Actions

### GitHub Pages (fallback)

The `deploy-pages.yml` workflow builds with the correct base path and pushes to the `gh-pages` branch. Enable GitHub Pages in repository Settings → Pages, pointing to the `gh-pages` branch.

---

## Theme System

The site uses a dual-theme system driven entirely by CSS custom properties. A single `data-theme` attribute on `<html>` controls whether dark or light mode is active.

### How it works

1. An **inline `<script>` in `<head>`** reads `localStorage` → `prefers-color-scheme` → sets `data-theme` *before* the first paint (no flash)
2. All colours in components reference `var(--token-name)` — zero hardcoded hex values
3. Theme toggle button switches `data-theme` and persists to `localStorage`
4. Canvas and D3 elements re-read `getComputedStyle()` on theme change

### Customizing themes

Edit the token sets in `src/styles/tokens.css`:

```css
:root[data-theme="dark"] {
  --base: #050A14;          /* Background */
  --surface: #0D1627;       /* Cards/panels */
  --accent-primary: #00E5FF; /* Primary accent */
  --accent-secondary: #00FF94;
  --text-primary: #F0F4FF;
  /* ... see full file for all tokens */
}

:root[data-theme="light"] {
  --base: #F5F0E8;
  --surface: #FFFFFF;
  --accent-primary: #0077B6;
  /* ... */
}
```

Both themes were designed intentionally — dark is "deep oceanic void" with bioluminescent accents, light is "bleached coral and sea-glass" with warm, coastal tones.

---

## CI/CD

| Workflow | Trigger | What it does |
|----------|---------|-------------|
| `ci.yml` | Push (any branch), PR to main/develop | Lint → Type check → Build → E2E tests → Upload artifact |
| `deploy-vercel.yml` | Push to main | Build and deploy to Vercel production |
| `deploy-pages.yml` | Push to main | Build and deploy to `gh-pages` branch |
| `dependency-review.yml` | PR to main | Review dependency changes for known vulnerabilities |
| `lighthouse-ci.yml` | Push to main | Lighthouse audit with ≥ 90 score gate |

---

## License

MIT — see [LICENSE](./LICENSE)

---

Built from scratch. No templates, no component libraries. Just signal.
