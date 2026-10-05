# Botlane Studios

The website for Botlane Studios, a BotLane LLC studio, live at
[botlane.studio](https://botlane.studio). Rebuilt in code from the studio's Figma
design (1280px artboard), accent `#0077E6`.

Built with Next.js 16 (App Router), React 19 and TypeScript. Styling is CSS Modules
with shared tokens in `globals.css`; Tailwind CSS 4 is also installed. Fonts are
Figtree (headings and body), Fragment Mono (labels) and Poppins (buttons), loaded
through `next/font`. The homepage 3D scene uses three.js; smooth scrolling uses Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npm test         # unit tests (contact form, Lane chat guide, prices)
```

## Where things are

- `src/app/layout.tsx` — fonts, site title, description and icons
- `src/app/globals.css` — brand tokens (`--accent`, `--mono`, `--display`, `--u`)
- `src/components/Nav.tsx` — top navigation with the animated logo
- `src/components/Hero.tsx` — the hero section and studio reel
- `src/lib/site.ts` — the site origin used for canonical URLs, sitemap and social cards
- `src/lib/pricing.ts` — **every published price**; the pricing page and the Lane chat guide read from here
- `src/lib/inquiry.ts`, `src/app/api/inquiry/route.ts` — contact-form validation and delivery
- `src/components/lane/` — the Lane chat guide (answers from published content only)
- `src/app/work/` — the Work page (honest proof: in-house work, labelled studies, samples)
- `src/components/LazyVideo.tsx` — background videos that load only near the screen
- `public/` — photography, videos and posters, logo, favicons

### The `--u` unit

Desktop layouts are placed with the Figma artboard's own numbers:
`left: calc(229 * var(--u))` puts an element where it sits on the 1280px artboard,
and the whole layout scales with the window up to 1600px. Under 900px `--u` is 1px
and each section switches to a single-column layout.

## Deploy

The site runs as the `bot-studio` Cloudflare Worker, built with
[OpenNext for Cloudflare](https://opennext.js.org/cloudflare) (`wrangler.jsonc`,
`open-next.config.ts`). Cloudflare builds it from this repo on every push.

Worker settings in the Cloudflare dashboard (Settings → Builds):

- Branch control: `main`
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`

Use `npx opennextjs-cloudflare build` as the build command going forward, not `npm run build`. Plain `npm run build` skips OpenNext, so `.open-next/worker.js` is never created and the deploy fails.

Secrets (Worker → Settings → Variables and Secrets, type **Secret**):

- `RESEND_API_KEY`: sends contact-form inquiries (`/api/inquiry`). Without it, the form shows its email fallback.
- `INQUIRY_FROM` (optional plain variable): sender address, on a domain verified in Resend. Default `Botlane Studios website <website@botlane.studio>`.

For local `npm run preview`, put them in `.dev.vars` (git-ignored).

Locally:

```bash
npm run preview  # build and serve the Worker locally
npm run deploy   # build and deploy from your machine (needs `wrangler login`)
```
