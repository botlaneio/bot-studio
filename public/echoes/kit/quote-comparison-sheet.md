# Quote Comparison Sheet

**For buyers comparing web design / web app proposals.**  
Most quotes hide the real differences in vague line items. This sheet forces apples-to-apples comparison.

**How to use:**  
- Paste each proposal's details into a column  
- Score each row 1–5 (1 = vague / missing, 5 = clear, complete, favourable)  
- Weight rows by what matters to you (multiply score × weight)  
- Total the weighted scores — but read the caveats below

---

## The Comparison Table

| # | Category | What to Look For | Weight (1–5) | Proposal A | Proposal B | Proposal C |
|---|----------|------------------|--------------|------------|------------|------------|
| **1** | **Scope Clarity** | Deliverables listed by page/component, not "website design" | | | | |
| **2** | **Pages / Screens Included** | Exact count + names (Home, About, Contact, Dashboard, Settings...) | | | | |
| **3** | **CMS / Content Editing** | Which CMS? Who sets it up? Training included? | | | | |
| **4** | **Design System / Components** | Reusable component library? Figma handoff? Design tokens? | | | | |
| **5** | **Responsive Breakpoints** | Mobile / tablet / desktop / wide — tested on real devices? | | | | |
| **6** | **Performance Budget** | Lighthouse targets? Bundle size limits? Image optimization? | | | | |
| **7** | **Accessibility Target** | WCAG 2.1 AA? 2.2 AA? Audit included? Remediation budget? | | | | |
| **8** | **SEO Technical Setup** | Meta tags, sitemap, schema, robots.txt, Core Web Vitals monitoring? | | | | |
| **9** | **Analytics / Measurement** | GA4, Search Console, event tracking — who configures? | | | | |
| **10** | **Hosting / Infrastructure** | Where? CDN? SSL? Staging env? Backups? SLA? | | | | |
| **11** | **Deployment Process** | CI/CD? Preview deployments? Rollback plan? | | | | |
| **12** | **Security** | CSP, HSTS, dependency scanning, penetration test? | | | | |
| **13** | **Third-Party Integrations** | Forms, CRM, search, payments, auth — each scoped? | | | | |
| **14** | **Content Migration** | Who moves content? How many pages? URL redirects mapped? | | | | |
| **15** | **Training / Handoff** | Recorded walkthrough? Docs? Admin training hours? | | | | |
| **16** | **Post-Launch Support** | Warranty period? Bug fix SLA? Retainer options? | | | | |
| **17** | **Code Ownership / License** | You own the code? MIT? Proprietary? Can you take it elsewhere? | | | | |
| **18** | **Design Files** | Figma / source files included? Organised? Named layers? | | | | |
| **19** | **Timeline & Milestones** | Discovery → Design → Build → QA → Launch — dates or weeks? | | | | |
| **20** | **Payment Schedule** | Deposit / milestones / final — tied to deliverables? | | | | |
| **21** | **Change Request Process** | How are changes scoped, priced, approved? | | | | |
| **22** | **Team Composition** | Who does the work? Senior / junior ratio? Dedicated PM? | | | | |
| **23** | **Communication Cadence** | Weekly sync? Slack? Async updates? Escalation path? | | | | |
| **24** | **References / Case Studies** | Similar scope? Live URLs? Contactable clients? | | | | |
| **25** | **Total Cost (All-In)** | **No hidden fees.** Includes: design, dev, CMS, hosting setup, launch, 30-day warranty | | | | |

---

## Weighting Guide (Adjust to Your Priorities)

| Priority Profile | High Weight (5) | Medium Weight (3) | Low Weight (1) |
|------------------|-----------------|-------------------|----------------|
| **Marketing Site (Lead Gen)** | 1, 2, 6, 7, 8, 9, 15, 20, 25 | 3, 4, 5, 10, 14, 16, 19 | 11, 12, 13, 17, 18, 21, 22, 23, 24 |
| **Web App / SaaS** | 1, 2, 4, 6, 7, 10, 11, 12, 13, 17, 22, 25 | 3, 5, 8, 9, 14, 15, 16, 19, 21, 23, 24 | 18, 20 |
| **E-commerce** | 1, 2, 6, 7, 10, 11, 12, 13, 16, 25 | 3, 4, 5, 8, 9, 14, 15, 19, 21, 22, 23 | 17, 18, 20, 24 |
| **Brand / Portfolio** | 1, 2, 4, 5, 6, 15, 18, 25 | 3, 7, 8, 9, 10, 16, 19, 20, 22, 24 | 11, 12, 13, 14, 17, 21, 23 |

---

## Red Flags (Deduct Points Immediately)

| Red Flag | Why It Matters | Deduction |
|----------|----------------|-----------|
| "Website design" as a single line item | No scope control, scope creep guaranteed | –10 |
| No CMS mentioned (or "we'll decide later") | You can't edit content without them | –10 |
| No performance or accessibility targets | They don't measure what they build | –8 |
| No staging / preview environment | You see it first at launch | –8 |
| Hosting locked to their server / proprietary platform | Vendor lock-in, can't move | –10 |
| Code ownership unclear or "we retain IP" | You pay, they own | –15 |
| No post-launch support defined | Bugs become your problem day 1 | –8 |
| Timeline in "weeks" with no milestones | No accountability checkpoints | –5 |
| Payment: 50% upfront, 50% on launch | No milestone protection | –5 |
| No references or live URLs for similar work | Unproven at this scope | –8 |
| "Unlimited revisions" | Either they'll cut corners or bill later | –5 |
| No change request process | Scope creep = budget creep | –8 |

---

## Scoring Formula

```
Weighted Score = Σ (Score 1–5 × Weight 1–5) − Red Flag Deductions
Max possible per row = 25
Max total (25 rows) = 625
```

**Interpretation:**
- **500+** — Exceptionally clear, complete, favourable proposal
- **400–499** — Solid, few gaps, negotiate the gaps
- **300–399** — Significant gaps, get clarification before deciding
- **< 300** — Incomplete or unfavourable, walk away or demand rewrite

---

## The Questions to Ask Before You Sign

**Ask each proposer:**

1. *"Show me the exact component list for the design system — buttons, forms, cards, layouts — and confirm I get the Figma file."*
2. *"What Lighthouse score do you commit to on mobile, and what happens if you miss it?"*
3. *"Walk me through the CMS setup: who creates the content models, who trains my team, what's the editorial workflow?"*
4. *"If I want to move hosting in 12 months, what do I get? Database dump? Docker image? Static export?"*
5. *"What's the process when I need a new page/component in 6 months — and what does it cost?"*
6. *"Who on your team writes the production code? Can I see their GitHub?"*
7. *"Show me the redirect map for content migration — or confirm you'll build it."*
8. *"What's excluded from the 30-day warranty? Security patches? Browser updates? CMS updates?"*

---

## Caveats (Read Before Deciding)

1. **A high score ≠ the right partner.** Culture, communication, and trust don't show in a spreadsheet.
2. **The cheapest adequate proposal often costs more.** Fixing bad code, re-platforming, or re-designing later costs 3–5×.
3. **References matter more than scores.** Talk to two recent clients. Ask: "What went wrong? How did they handle it?"
4. **This sheet compares proposals, not people.** A great proposal from a team that ghosts you is worthless.
5. **Your requirements change.** The best partner helps you navigate change — the process (row 21) matters more than the initial scope.

---

## Worked Example (Fictional)

| # | Category | Weight | Studio X (Agency) | Studio Y (Boutique) | Freelancer Z |
|---|----------|--------|-------------------|---------------------|--------------|
| 1 | Scope Clarity | 5 | 4 × 5 = 20 | 5 × 5 = 25 | 3 × 5 = 15 |
| 2 | Pages Included | 5 | 5 × 5 = 25 | 4 × 5 = 20 | 3 × 5 = 15 |
| 6 | Performance Budget | 5 | 3 × 5 = 15 | 5 × 5 = 25 | 2 × 5 = 10 |
| 7 | Accessibility | 5 | 2 × 5 = 10 | 5 × 5 = 25 | 1 × 5 = 5 |
| 17 | Code Ownership | 5 | 2 × 5 = 10 | 5 × 5 = 25 | 4 × 5 = 20 |
| 25 | Total Cost | 5 | $42,000 | $38,000 | $18,000 |
| | **Red Flags** | | –8 (no perf target) | 0 | –10 (no CMS, no support) |
| | **Weighted Total** | | **~380** | **~490** | **~260** |

**Interpretation:** Studio Y scores highest — clear scope, strong performance/accessibility, you own the code. Studio X has gaps. Freelancer Z is cheap but risky.

---

## One-Page Cheat Sheet (Print This)

```
☐ Scope: exact pages/components listed
☐ CMS: named, configured, training included
☐ Performance: Lighthouse target in writing
☐ Accessibility: WCAG 2.2 AA target + audit
☐ SEO: technical setup included
☐ Hosting: you own it, portable, CDN, SSL
☐ Code: you own it, MIT or similar
☐ Design files: Figma source, organised
☐ Timeline: milestones with dates
☐ Payment: tied to milestones, not calendar
☐ Changes: defined process, priced
☐ Team: named seniors, not "our team"
☐ Support: 30-day warranty + retainer option
☐ References: 2+ similar projects, live URLs
☐ Total: all-in, no hidden fees
```

**If any box is unchecked → ask before you sign.**

---

*This sheet is published by Botlane Studios under the Echoes promise: no newsletter wall, no fluff.  
Use it, adapt it, share it. If it saves you one bad hire, it did its job.*

**Source:** `/echoes/kit` — Botlane Studios  
**License:** CC0 (public domain) — do whatever you want with it.