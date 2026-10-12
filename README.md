# Botlane Studio

The website for Botlane Studio, a BotLane LLC studio, live at
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
npm test         # unit tests (contact form, Lane chat guide, prices, Echoes content)
```

## Where things are

- `src/app/layout.tsx` — fonts, site title, description and icons
- `src/app/globals.css` — brand tokens (`--accent`, `--mono`, `--display`, `--u`)
- `src/components/Nav.tsx` — top navigation with the animated logo
- `src/components/Hero.tsx` — the hero section and studio reel
- `src/lib/site.ts` — the site origin used for canonical URLs, sitemap and social cards
- `src/lib/pricing.ts` — **every published price**; the pricing page and the Lane chat guide read from here
- `src/lib/inquiry.ts`, `src/app/api/inquiry/route.ts` — contact-form validation and delivery
- `src/components/lane/` — the Lane chat guide. It answers locally from published content only: no AI provider, booking or message delivery is connected
- `src/app/echoes/posts.ts` — every Echoes post (the hub, post pages, RSS/JSON feeds and sitemap read from it); each post needs a matching entry in `src/components/lane/citations.ts`
- `scripts/generate-echoes-covers.mjs` — writes the post covers to `public/echoes/covers/`; re-run after adding or retitling a post
- `public/echoes/kit/` — the free downloads listed on `/echoes/kit`
- `src/app/work/` — the Work page (honest proof: in-house work, labelled studies, samples)
- `src/components/LazyVideo.tsx` — background videos that load only near the screen
- `public/` — photography, videos and posters, logo, favicons
- `brand-film/` — source for studio-made motion pieces (not deployed)

### Not connected

There is no scheduler (buttons say **Request a call**), no newsletter and no AI
provider. Instagram and X icons in the footer stay hidden until
`NEXT_PUBLIC_INSTAGRAM_URL` / `NEXT_PUBLIC_X_URL` are set as Cloudflare build
variables (see `.env.example`).

### The `--u` unit

Desktop layouts are placed with the Figma artboard's own numbers:
`left: calc(229 * var(--u))` puts an element where it sits on the 1280px artboard,
and the whole layout scales with the window up to 1600px. Under 900px `--u` is 1px
and each section switches to a single-column layout.

## Deploy

The site runs as the `bot-studio` Cloudflare Worker, built with
[OpenNext for Cloudflare](https://opennext.js.org/cloudflare) (`wrangler.jsonc`,
`open-next.config.ts`). Cloudflare builds it from this repo on every push.

Worker settings in the Cloudflare dashboard (Settings → Builds). Production and
Previews Base are configured separately; both need the OpenNext build command.

Production:

- Production branch: `main`
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`

Previews Base (every other branch, so each PR gets a preview link):

- Builds for Preview branches: on
- Build command: `npx opennextjs-cloudflare build`
- Preview command: `npx wrangler preview`

Never use `npm run build` as either build command. Plain `npm run build` skips OpenNext, so `.open-next/worker.js` is never created and the deploy or preview fails.

Previews don't inherit production secrets, so the contact form on a preview shows its email fallback instead of sending. Add `RESEND_API_KEY` as a preview secret (`npx wrangler preview secret`) only if a preview needs to send real email.

Secrets (Worker → Settings → Variables and Secrets, type **Secret**):

- `RESEND_API_KEY`: sends contact-form inquiries (`/api/inquiry`). Without it, the form shows its email fallback.
- `INQUIRY_FROM` (optional plain variable): sender address, on a domain verified in Resend. Default `Botlane Studio website <website@botlane.studio>`.

For local `npm run preview`, put them in `.dev.vars` (git-ignored).

Locally:

```bash
npm run preview  # build and serve the Worker locally
npm run deploy   # build and deploy from your machine (needs `wrangler login`)
```
