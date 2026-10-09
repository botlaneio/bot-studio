# Echoes content reconcile — merge notes

This commit reconciles the Echoes publishing lane into a single git-tracked
artifact. It was produced by the reconcile task (t_74a422e6).

## What changed

- `src/app/echoes/posts.ts` — now holds all **24** posts (2 built-in + 22 writer
  posts). Previously it held 7; the other 15 lived in a divergent attachment
  copy (`attachments/t_6dc94ca6/posts.ts`) or in per-writer scratch workspaces
  that were never merged (and had already been cleaned up).
- `src/components/lane/citations.ts` — now holds **24** citations, one per post.
  The 3 orphan citations (`what-8000-buys`, `forme-knitwear`,
  `how-ai-assistants-see-your-website`) that previously pointed at posts missing
  from posts.ts (they would have 404'd) now resolve.

Verification: `node --test tests/*.test.mjs` → 29/29 pass. A cross-check of
`POSTS` ↔ `CITATIONS` reports 24 posts, 24 citations, 0 inconsistencies.

## The rule for future writers (read before you write)

posts.ts is the single source of truth. Writers must **serialize or merge**,
never clobber:

1. Do **not** write your post to your own scratch workspace and call it done.
2. Do **not** edit a divergent copy of posts.ts (e.g. an old attachment).
3. Append your post object to the canonical
   `src/app/echoes/posts.ts`, and add a matching entry to
   `src/components/lane/citations.ts`, in the **same** change.
4. Commit after each post so concurrent writers cannot overwrite each other.
   If you cannot serialize, merge — read the current file before you edit it.

The incident that triggered this reconcile: ~15 concurrent writer tasks each
wrote to their own scratch workspace with no merge step, and posts.ts was never
committed, so each writer started from a stale copy.

## Flags for human review (not blocking)

1. **Currency discrepancy** — `why-we-publish-price-bands` uses £ (GBP) figures
   (`£4,800 – £8,500` for web builds), while the rest of the site and every other
   post uses $ (USD; websites start at $8,000). The £ values were preserved
   verbatim from the delivered artifact rather than silently converted, because
   converting would fabricate numbers. A human should decide the correct USD
   bands and fix this post.
2. **Four posts were recovered from worker logs**, not pristine files (their
   scratch workspaces had been cleaned and no attachment was made):
   - `figma-to-nextjs-no-page-builder` — recovered ~70% verbatim from a write
     diff in the worker log; the takeaway/caveats/FAQ tail was reconstructed
     from the worker's own summary.
   - `your-site-feels-slow-on-a-phone` — the worker's write failed and no
     content was captured; this post was reconstructed from the worker's
     delivery summary (5 causes, 2026 thresholds, BugViso/Web.dev/SEO-Kreativ
     citations).
   - `wcag-22-aa-checklist` and `what-8000-buys` — recovered in full from write
     diffs in the worker logs.
   A human should spot-check these four before they ship.
3. **Pre-existing build error (out of scope)** — `src/app/echoes/page.tsx` uses
   `Link` without importing it (`next/link`), which breaks `next build` for the
   /echoes hub. This predates this reconcile (page.tsx is an uncommitted change
   from an earlier task). It is not touched here; it needs a separate fix.
4. The "98 Lighthouse" post (t_fba0b286) was honestly gapped and re-scoped — no
   post exists for it. Its replacement is `our-sites-real-mobile-performance`,
   which uses the real measured score (Performance 76, LCP 3.1s, INP 330ms,
   CLS 0).
