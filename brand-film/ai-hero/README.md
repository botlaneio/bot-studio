# AI hero loop

A 10-second, silent, seamless 9:16 loop for the hero frame on
`/capabilities/ai-systems`. Studio-made, in the site's own system.

## Concept

One idea, followed the whole way: **Lane's lens**. The white lens from the
Botlane mark glances along its slot, leaves it to become the cursor of a
visitor's question, scans the business's own content, lights the one source
that answers, draws the answer out of it, then everything folds back into the
lens and the slot reforms exactly as on frame one.

| Time | Beat |
| --- | --- |
| 0.0–1.0 s | Slot and lens; the lens glances left to right |
| 1.0–1.9 s | Slot collapses; the lens rises to become a cursor |
| 1.6–2.9 s | "Do you deliver on weekends?" types in |
| 2.9–3.9 s | Four content cards arrive from depth |
| 3.6–4.9 s | A scan line sweeps them; the lens blinks; "Delivery page" lights |
| 5.2–6.5 s | A line draws from the source to the answer card |
| 6.5–7.6 s | Hold to read |
| 7.6–8.6 s | Everything folds into the lens; ripple |
| 8.75–10 s | Slot reforms; lens returns to the left end (matches frame 0) |

## Brand rules followed

- Palette: black, white, cobalt `#0077e6` and Lane's highlight `#3d9bff`
  (`src/app/globals.css`, `src/components/lane/LaneChat.module.css`).
- The answer card uses Lane's off-white paper `#f5f3ee`.
- Type: Figtree for copy, Fragment Mono for `//` labels (`src/app/layout.tsx`).
- Easing: `--ease-out` and `--ease-rise` from `globals.css`.
- Slot, lens gradient and plate gradient from `LaneMark` in `LaneChat.tsx`.
- The site's dot grid, drifting exactly one cell per loop; vignette and fine grain.
- Copy matches the page's own illustration (`AIIntegrations.tsx`). It is an
  illustration, not a client example.

## Re-render

Needs Python Playwright (Chromium) and ffmpeg.

```sh
cd brand-film/ai-hero
python3 render.py          # master.mp4, CRF 14, 720×1280, 30 fps, motion blur
ffmpeg -y -i master.mp4 -c:v libx264 -preset veryslow -crf 26 -tune animation \
  -pix_fmt yuv420p -movflags +faststart -an ../../public/ai/ai-hero-loop.mp4
ffmpeg -y -ss 6.8 -i master.mp4 -frames:v 1 -q:v 4 ../../public/ai/ai-hero-loop-poster.jpg
```

`render(ctx, t)` in `film.html` is pure (no clocks), so any frame re-renders
alone. Beats are named constants in `B`. Renders are not committed here; only
the web encode and poster in `public/ai/` are.
