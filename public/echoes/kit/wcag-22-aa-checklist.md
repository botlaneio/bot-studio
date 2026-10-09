# WCAG 2.2 AA Checklist for Marketing Sites

**A practical, no-fluff checklist for marketing websites.**  
This covers the AA criteria that actually matter for marketing sites — the ones that affect real users, conversions, and legal exposure. Not every WCAG criterion; the ones that move the needle.

**How to use:**  
- ☐ = not checked  
- ✅ = passes  
- ❌ = fails (needs fix)  
- N/A = does not apply to this page/component

---

## 1. Perceivable

### 1.1 Non-text Content (1.1.1 — A)
- [ ] All images have meaningful `alt` text (or `alt=""` for decorative)
- [ ] Icon fonts / SVGs have accessible labels (`aria-label` or `<title>`)
- [ ] Complex charts / infographics have a text equivalent nearby or in `longdesc`
- [ ] CAPTCHAs have an audio alternative (or better: don't use CAPTCHAs)

### 1.2 Time-based Media (1.2.x — A/AA)
- [ ] Video has captions (1.2.2 — A)
- [ ] Video has audio description or transcript (1.2.3 — A)
- [ ] Live video has captions (1.2.4 — AA)
- [ ] Audio-only content has a transcript (1.2.1 — A)
- [ ] No auto-playing audio > 3 seconds without pause/stop/mute (1.4.2 — A)

### 1.3 Adaptable (1.3.x — A/AA)
- [ ] Page structure uses semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping)
- [ ] Form inputs have associated `<label>` elements (not just placeholder)
- [ ] `fieldset`/`legend` groups related radio/checkbox inputs
- [ ] Tables have `<caption>`, `<th scope="col|row">`, no layout tables
- [ ] Content order in DOM matches visual order (1.3.2 — A)
- [ ] Instructions don't rely solely on sensory characteristics (1.3.3 — A)

### 1.4 Distinguishable (1.4.x — A/AA)
- [ ] **Color is not the only means** of conveying information (1.4.1 — A)
- [ ] Text contrast ≥ **4.5:1** for normal text, **3:1** for large text (18pt+ / 14pt bold) (1.4.3 — AA)
- [ ] UI components (borders, icons, focus indicators) contrast ≥ **3:1** (1.4.11 — AA)
- [ ] Text can be resized to **200%** without loss of content/function (1.4.4 — AA)
- [ ] No images of text (except logos/essential) — use real text (1.4.5 — AA)
- [ ] **Text spacing** can be overridden: line-height ≥ 1.5, paragraph spacing ≥ 2× line-height, letter-spacing ≥ 0.12× font-size, word-spacing ≥ 0.16× font-size (1.4.12 — AA)
- [ ] Content on hover/focus is dismissible, hoverable, persistent (1.4.13 — AA)

---

## 2. Operable

### 2.1 Keyboard Accessible (2.1.x — A)
- [ ] All functionality operable via keyboard (2.1.1 — A)
- [ ] No keyboard traps (2.1.2 — A)
- [ ] **Focus visible** on all interactive elements (2.4.7 — AA) — *critical for marketing CTAs*
- [ ] Focus order matches visual order (2.4.3 — A)

### 2.2 Enough Time (2.2.x — A/AA)
- [ ] Auto-carousels/sliders: pause on hover/focus, or user can stop (2.2.2 — A)
- [ ] Session timeouts warn user and allow extension (2.2.1 — A)
- [ ] No content that times out without user control (2.2.3 — AAA — *aim for it*)

### 2.3 Seizures and Physical Reactions (2.3.x — A)
- [ ] No content flashes > 3 times/second (2.3.1 — A)
- [ ] Reduced motion respected: `prefers-reduced-motion` disables non-essential animation (2.3.3 — AAA — *standard practice*)

### 2.4 Navigable (2.4.x — A/AA)
- [ ] **Skip to main content** link as first focusable element (2.4.1 — A)
- [ ] Page has a descriptive `<title>` (2.4.2 — A)
- [ ] Multiple ways to find pages: nav, search, sitemap (2.4.5 — AA)
- [ ] Headings and labels are descriptive (2.4.6 — AA)
- [ ] **Focus indicator** is visible, ≥ 2px thick, 3:1 contrast against adjacent (2.4.11 — AA, 2.4.13 — AAA)
- [ ] Focus not obscured by sticky headers/footers (2.4.12 — AA)

### 2.5 Input Modalities (2.5.x — A/AA)
- [ ] Pointer gestures have single-pointer alternative (2.5.1 — A)
- [ ] **Pointer cancellation** — up-event triggers action, not down-event (2.5.2 — A)
- [ ] Label in name: accessible name contains visible label text (2.5.3 — A)
- [ ] Motion actuation has alternative (2.5.4 — A)
- [ ] **Target size** ≥ 24×24 CSS pixels (2.5.8 — AA) — *critical for mobile CTAs*
- [ ] Concurrent input mechanisms supported (2.5.6 — AAA)

---

## 3. Understandable

### 3.1 Readable (3.1.x — A/AA)
- [ ] Page language declared (`<html lang="en">`) (3.1.1 — A)
- [ ] Language of parts declared (`lang="es"` on Spanish section) (3.1.2 — AA)

### 3.2 Predictable (3.2.x — A/AA)
- [ ] No unexpected context change on focus (3.2.1 — A)
- [ ] No unexpected context change on input (3.2.2 — A)
- [ ] Consistent navigation across pages (3.2.3 — AA)
- [ ] Consistent identification of components with same function (3.2.4 — AA)

### 3.3 Input Assistance (3.3.x — A/AA)
- [ ] Errors identified in text (not just color) (3.3.1 — A)
- [ ] **Labels/instructions** provided for inputs (3.3.2 — A)
- [ ] Error suggestions provided when known (3.3.3 — AA)
- [ ] **Error prevention** for legal/financial/data: reversible, checked, confirmed (3.3.4 — AA)
- [ ] **Redundant entry** avoided — user doesn't re-enter same info (3.3.7 — AA) — *WCAG 2.2*
- [ ] **Accessible authentication** — no cognitive function test (CAPTCHA, memory) for login (3.3.8 — AA) — *WCAG 2.2*

---

## 4. Robust

### 4.1 Compatible (4.1.x — A/AA)
- [ ] Valid HTML (no duplicate IDs, proper nesting) (4.1.1 — A — *obsolete in 2.2 but still good practice*)
- [ ] **Name, role, value** for all UI components (4.1.2 — A)
- [ ] Status messages announced (aria-live / role=status) (4.1.3 — AA)
- [ ] **No parsing errors** that break assistive tech (4.1.1 — *parsing* removed in 2.2, but validity matters)

---

## Marketing-Site Specific Priorities

### High Impact (Do These First)
| # | Criterion | Why It Matters for Marketing |
|---|-----------|------------------------------|
| 1 | 1.4.3 Contrast (AA) | Hero text, CTA buttons, form labels — low contrast kills conversions |
| 2 | 2.4.7 Focus Visible (AA) | Keyboard users can't see where they are on your pricing/contact page |
| 3 | 2.5.8 Target Size (AA) | Mobile CTA buttons too small = lost leads |
| 4 | 1.1.1 Alt Text (A) | Hero images, product shots, trust badges — screen readers need context |
| 5 | 2.4.1 Skip Link (A) | Keyboard users bypass nav to reach your value prop |
| 6 | 3.3.2 Labels (A) | Unlabeled forms = abandoned inquiries |
| 7 | 1.3.1 Info & Relationships (A) | Semantic structure = SEO + accessibility win |
| 8 | 2.4.11/13 Focus Appearance (AA/AAA) | Visible focus = professional polish, legal safety |

### Medium Impact
| # | Criterion | Notes |
|---|-----------|-------|
| 9 | 1.4.11 Non-text Contrast (AA) | Icon buttons, input borders, card boundaries |
| 10 | 1.4.12 Text Spacing (AA) | User stylesheets override your design — don't break |
| 11 | 2.2.2 Pause/Stop (A) | Auto-playing hero video, testimonial carousel |
| 12 | 2.4.3 Focus Order (A) | Tab order matches visual flow |
| 13 | 3.3.7 Redundant Entry (AA) | Multi-step forms remember what user typed — *WCAG 2.2* |
| 14 | 3.3.8 Accessible Auth (AA) | If you have a client portal — *WCAG 2.2* |

### Lower Priority (Context-Dependent)
| # | Criterion | Notes |
|---|-----------|-------|
| 15 | 1.2.x Captions/Transcripts | If you have video testimonials, product demos |
| 16 | 1.4.13 Content on Hover/Focus (AA) | Tooltips, dropdown menus, mega-navs |
| 17 | 2.3.3 Reduced Motion (AAA) | Hero parallax, scroll animations, Lottie |
| 18 | 2.4.5 Multiple Ways (AA) | Search + sitemap for sites > 50 pages |

---

## Quick Test Protocol (15 Minutes)

1. **Turn off CSS** — does content order make sense? (1.3.2)
2. **Tab through the page** — can you see focus? reach everything? (2.4.7, 2.1.1)
3. **Zoom to 200%** — does anything break, overlap, disappear? (1.4.4)
4. **Run axe-core / WAVE** — fix the red errors first (automated catches ~30%)
5. **Test one form** with NVDA / VoiceOver — hear the labels? (3.3.2, 4.1.2)
6. **Check contrast** on hero, CTAs, form borders — use a tool (1.4.3, 1.4.11)
7. **Verify `prefers-reduced-motion`** — animations stop? (2.3.3)
8. **Check target sizes** on mobile — 24×24px minimum? (2.5.8)

---

## Evidence You Can Show a Client

| Artifact | Where It Lives |
|----------|----------------|
| axe-core JSON report | CI pipeline / `npm run test:a11y` |
| Lighthouse accessibility score | `lighthouse --only-categories=accessibility` |
| Manual test log (this checklist) | Project repo / Notion / Confluence |
| Screen reader video (30s) | Shared drive |
| `prefers-reduced-motion` demo | Local dev / staging |

---

## Common Marketing-Site Failures (and the fix)

| Failure | WCAG | Fix |
|---------|------|-----|
| Hero CTA: white text on light gradient | 1.4.3 | Darken overlay or move text to solid area |
| Hamburger menu: no focus state | 2.4.7 | Add `:focus-visible` ring |
| Form error: only red border | 1.4.1, 3.3.1 | Add error text + `aria-describedby` |
| Carousel auto-plays, no pause | 2.2.2 | Add pause button, pause on hover/focus |
| Mobile CTA: 36×36px but tap target 20×20px | 2.5.8 | Increase padding to 24×24px CSS |
| Sticky header obscures focused element | 2.4.12 | `scroll-padding-top: header-height` |
| "Read more" links with no context | 2.4.4 | `aria-label="Read more about [topic]"` |
| Icon-only button (no label) | 4.1.2 | `aria-label="Open menu"` |
| Color-only required field indicator | 1.4.1 | Add asterisk + "Required" text |

---

## WCAG 2.2 Additions (vs 2.1)

| Criterion | Level | What Changed |
|-----------|-------|--------------|
| 2.4.11 Focus Not Obscured (Minimum) | AA | Focused element not hidden by sticky content |
| 2.4.12 Focus Not Obscured (Enhanced) | AAA | Same, stricter |
| 2.4.13 Focus Appearance | AAA | Focus indicator ≥ 2px, 3:1 contrast, adjacent contrast |
| 2.5.7 Dragging Movements | AA | Drag operations have single-pointer alternative |
| 2.5.8 Target Size (Minimum) | AA | **24×24 CSS pixels** for pointer targets |
| 3.2.6 Consistent Help | A | Help mechanism consistent across pages |
| 3.3.7 Redundant Entry | A | Don't make users re-enter same info |
| 3.3.8 Accessible Authentication (Minimum) | AA | No cognitive test for login |
| 3.3.9 Accessible Authentication (Enhanced) | AAA | No cognitive test, no CAPTCHA |

---

## Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) — filter by level AA
- [axe-core](https://github.com/dequelabs/axe-core) — automated testing
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Focus Visible Bookmarklet](https://www.scottohara.me/blog/2020/03/19/focus-visible.html)
- [WCAG 2.2 Understanding Docs](https://www.w3.org/WAI/WCAG22/Understanding/)

---

*This checklist is published by Botlane Studios under the Echoes promise: no newsletter wall, no fluff.  
Use it, adapt it, share it. If it catches one accessibility bug before launch, it did its job.*

**Source:** `/echoes/kit` — Botlane Studios  
**License:** CC0 (public domain) — do whatever you want with it.