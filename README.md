# Botlane Studios

The website for Botlane Studios, a BotLane LLC studio. Rebuilt in code from the
studio's Figma design (1280px artboard), accent `#0077E6`.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4, the same stack as
botlane.io. Fonts are Figtree and Fragment Mono, loaded through `next/font`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things are

- `src/app/layout.tsx` — fonts, site title, description and icons
- `src/app/globals.css` — brand tokens (`--accent`, `--mono`, `--display`, `--u`)
- `src/components/Nav.tsx` — top navigation with the animated logo
- `src/components/Hero.tsx` — the hero section
- `public/` — hero photo, botLane intro video and poster, logo, favicons

### The `--u` unit

Desktop layouts are placed with the Figma artboard's own numbers:
`left: calc(229 * var(--u))` puts an element where it sits on the 1280px artboard,
and the whole layout scales with the window up to 1600px. Under 900px `--u` is 1px
and each section switches to a single-column layout.

## Deploy

Any Next.js host works. Cloudflare Pages and Netlify both have free tiers that
allow commercial sites; point `botlane.studios` at the deployment and set
`NEXT_PUBLIC_SITE_URL=https://botlane.studios`.
