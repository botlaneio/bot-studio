/**
 * The Echoes publishing lane.
 *
 * This module is the single source of truth for the long-form side of Echoes:
 * the five evidence tags, the theme taxonomy, and the posts themselves. The
 * `/echoes/[slug]` template, the RSS and JSON feeds and the sitemap all read
 * from here, so a post is written exactly once.
 *
 * Writers append one object to `POSTS`. The shape is the contract; the
 * template, feeds and schema are all generated from it, so a post cannot be
 * published without its proof (an evidence tag) and its receipts (the evidence
 * block).
 *
 * Keep this module free of `@/` imports so the unit tests can load it in a
 * bare VM (see `tests/echoes.test.mjs`). Anything that needs the site origin
 * receives it as a parameter.
 */

import { ECHOES_AUTHOR, readTimeLabel } from "./echoes";

/** The five evidence tags. A post is not finished without one. */
export type EvidenceTag = "Measured" | "Built" | "Decided" | "Briefed" | "Plainly";

/** The themes a post can sit under (the existing Echoes topics plus AI). */
export type EchoTheme = "Strategy" | "Design" | "Build" | "Launch" | "AI";

export const EVIDENCE_TAGS: Record<EvidenceTag, { label: string; meaning: string }> = {
  Measured: { label: "Measured", meaning: "Real numbers — Lighthouse, Core Web Vitals, before and after." },
  Built: { label: "Built", meaning: "Real code, a live link, the actual file." },
  Decided: { label: "Decided", meaning: "A real decision, the options rejected, and why." },
  Briefed: { label: "Briefed", meaning: "A self-set brief, taken from brief to design to build to a measured result." },
  Plainly: { label: "Plainly", meaning: "A buyer-facing guide with nothing to sell in the sentence." },
};

export const ECHOES_THEMES: EchoTheme[] = ["Strategy", "Design", "Build", "Launch", "AI"];

/** The raw asset shown in the bordered evidence block above the fold. */
export type EvidenceItem =
  | { kind: "metrics"; label: string; values: { label: string; value: string }[] }
  | { kind: "code"; label: string; code: string }
  | { kind: "link"; label: string; href: string; text: string }
  | { kind: "quote"; label: string; text: string; source?: string }
  | { kind: "file"; label: string; name: string; href: string };

/** A body block. Text fields support `[label](url)` inline links (http(s) or `/`). */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "code"; code: string; label?: string };

export type FAQ = { q: string; a: string };
export type HowToStep = { name: string; text: string };

export type Post = {
  slug: string;
  title: string;
  /** One sentence, for the index card and the feeds. */
  excerpt: string;
  /** Answer-first, 40–60 words. */
  intro: string;
  tag: EvidenceTag;
  theme: EchoTheme;
  /** Minutes to read. */
  readTime: number;
  /** ISO date, `yyyy-mm-dd`. */
  date: string;
  updated?: string;
  /** Defaults to Agent Lane. */
  author?: string;
  evidence: EvidenceItem[];
  body: Block[];
  takeaway?: { title: string; text: string; items?: string[] };
  /** What the post does not claim. Required by the editorial constitution. */
  caveats: string[];
  related: { slug: string; title: string }[];
  /** One soft link to a capability or the hub. */
  cta?: { label: string; href: string };
  /** Renders as FAQPage structured data when present. */
  faq?: FAQ[];
  /** Renders as HowTo structured data when present. */
  howTo?: { steps: HowToStep[] };
};

export const POSTS: Post[] = [
{
    slug: "shipping-the-evidence-tag",
    title: "Every Echoes note now carries its proof",
    excerpt: "Echoes is now a notebook that only publishes what it can prove, and this note shows the publishing lane itself — with its receipts.",
    intro:
      "Echoes is now a blog that only publishes what it can prove. Every note carries one of five evidence tags — Measured, Built, Decided, Briefed or Plainly — and a bordered evidence block with the raw asset: the numbers, the code, or the live link. This note shows the publishing lane itself, end to end, with its receipts.",
    tag: "Built",
    theme: "Build",
    readTime: 7,
    date: "2026-10-08",
    evidence: [
      {
        kind: "code",
        label: "The tag a note must earn",
        code: 'export type EvidenceTag =\n  | "Measured" | "Built" | "Decided"\n  | "Briefed" | "Plainly";',
      },
      {
        kind: "link",
        label: "The live feed",
        href: "https://botlane.studio/echoes/rss.xml",
        text: "The RSS feed every note is published into.",
      },
      {
        kind: "metrics",
        label: "The lane, by the numbers",
        values: [
          { label: "Evidence tags", value: "5" },
          { label: "Feeds", value: "2 — RSS and JSON" },
          { label: "Runtime dependencies added", value: "0" },
          { label: "Stock photos used", value: "0" },
        ],
      },
    ],
    body: [
      {
        kind: "h2",
        text: "Why a tag, not a category",
      },
      {
        kind: "p",
        text: "A category says what a note is about. A tag says how it can be checked. \"Measured\" means the claim rests on numbers you can look at; \"Built\" means there is code or a live link behind it; \"Plainly\" means the note has nothing to sell you in the sentence. That difference is the whole point of [Echoes](/echoes): a notebook where the proof travels with the claim.",
      },
      {
        kind: "h2",
        text: "What we rejected",
      },
      {
        kind: "ul",
        items: [
          "Trend posts and listicles — they help no one and prove nothing.",
          "Invented case studies — the studio has publicly refused to publish work it did not do.",
          "A newsletter wall — Echoes promises \"no newsletter wall, no fluff\".",
          "A separate blog section — Echoes is already the notebook; bolting on a second blog would contradict it.",
        ],
      },
      {
        kind: "h2",
        text: "How the lane is wired",
      },
      {
        kind: "p",
        text: "One content model drives everything. A post is written once in code, and the page, the two feeds and the sitemap all generate from it. A post without an evidence tag and an evidence block does not type-check, so it cannot ship unfinished.",
      },
      {
        kind: "ol",
        items: [
          "The answer-first intro states the finding in the first two sentences.",
          "The evidence block sits above the fold with the raw asset.",
          "The body gives the reasoning and the alternatives rejected.",
          "\"What you can take\" hands over something ungated.",
          "The honest caveats say what the note does not claim.",
          "Article, BreadcrumbList and (where it fits) FAQPage or HowTo structured data ship with the page.",
        ],
      },
    ],
    takeaway: {
      title: "Publish a note, end to end",
      text: "The checklist a note has to clear before it goes live.",
      items: [
        "One evidence tag, earned, not claimed",
        "An evidence block with the actual numbers, code or link",
        "An answer-first intro of 40–60 words",
        "A takeaway a reader can act on",
        "Honest caveats that say what it does not claim",
      ],
    },
    caveats: [
      "This note proves the publishing lane, not a client result. It contains no client work and no invented numbers.",
      "The evidence block shows code that ships in this repository and the feed that serves it; it is not a benchmark against another studio.",
      "The tags are the studio's own honesty rule — not an industry standard, and not a ranking signal.",
    ],
    related: [{ slug: "anatomy-of-an-echoes-note", title: "The anatomy of an Echoes note" }],
    cta: { label: "See how we build sites this way", href: "/capabilities/websites" },
    faq: [
      {
        q: "What is an evidence tag?",
        a: "A label every Echoes note must earn — Measured, Built, Decided, Briefed or Plainly. It says how the note can be checked, not what it is about.",
      },
      {
        q: "Why does every note need one?",
        a: "Because a note without proof is just an opinion. The tag is the gate: if a note has no tag, it is not finished.",
      },
      {
        q: "Are the tags a ranking trick?",
        a: "No. They are an honesty rule, not a search signal. They exist so a reader can check the claim, not so a search engine ranks it.",
      },
    ],
  },
{
    slug: "anatomy-of-an-echoes-note",
    title: "The anatomy of an Echoes note",
    excerpt: "The nine-part skeleton every note follows, and why we fixed it instead of leaving the notebook a blank page.",
    intro:
      "Every note in Echoes follows the same skeleton: an answer-first intro, a bordered evidence block, the reasoning, something you can take, and the honest caveats. This note spells out that skeleton and why we fixed it, so a reader — or a future writer — can hold a note to the same standard.",
    tag: "Decided",
    theme: "Build",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The rule we write by",
        text: "A blog that only publishes what it can prove.",
        source: "The Echoes plan",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "Why a skeleton, not a blank page",
      },
      {
        kind: "p",
        text: "A blank page invites a listicle. A fixed skeleton forces the hard part to the front: the answer, and the proof. The skeleton is the same every time because the reader's need is the same every time — decide in seconds whether this note is worth their minutes, then take something away.",
      },
      {
        kind: "h2",
        text: "The alternatives we rejected",
      },
      {
        kind: "ul",
        items: [
          "A freeform editor — faster to type into, but notes drift and the proof gets left out.",
          "Trend listicles — they rank on nothing and age badly.",
          "A separate CMS — more moving parts, more surface to go stale, for content the studio already owns in code.",
        ],
      },
      {
        kind: "h2",
        text: "The nine parts, in order",
      },
      {
        kind: "ol",
        items: [
          "Title — an outcome or a decision, not clickbait.",
          "Tag, theme and read time.",
          "Answer-first intro, 40–60 words.",
          "The bordered evidence block, above the fold.",
          "Body — the reasoning and the rejected alternatives.",
          "\"What you can take\" — the ungated takeaway.",
          "Honest caveats — what the note does not claim.",
          "Related notes and one soft CTA.",
          "Structured data: Article + BreadcrumbList, plus FAQPage or HowTo where it fits.",
        ],
      },
    ],
    takeaway: {
      title: "The note skeleton",
      text: "Copy this order into any note before you write a word of it.",
      items: [
        "Answer first, proof second, reasoning third",
        "Evidence above the fold, never buried at the end",
        "End with what you cannot claim, not what you hope",
      ],
    },
    caveats: [
      "This is our editorial standard, not a rule for anyone else's blog.",
      "The skeleton is the container; the proof is still the hard part. A tag does not make a claim true.",
    ],
    related: [{ slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" }],
    cta: { label: "Read the SEO & Discoverability add-on", href: "/capabilities/seo" },
    howTo: {
      steps: [
        {
          name: "Write the answer first",
          text: "State the finding or decision in the first two sentences, in 40–60 words. If there is no answer yet, the note is not ready.",
        },
        {
          name: "Attach the evidence",
          text: "Put the raw asset — the numbers, the code, or the live link — in the bordered evidence block, above the fold.",
        },
        {
          name: "Tag it honestly",
          text: "Choose the one tag that matches how the note can be checked: Measured, Built, Decided, Briefed or Plainly.",
        },
        {
          name: "Write the caveat",
          text: "Close with what the note does not claim. That is the studio's signature, and the part readers trust.",
        },
        {
          name: "Ship it to the feed",
          text: "Every note publishes to /echoes/rss.xml and the JSON feed, and to the sitemap with its lastmod.",
        },
      ],
    },
  },
{
    slug: "three-things-we-didnt-build",
    title: "Three things we talked ourselves out of building on our own site",
    excerpt: "A comment system, a newsletter, and a dark-mode toggle — rejected in favor of what the site is actually for.",
    intro:
      "We cut three features from our own site before they shipped: a comment system, a newsletter, and a dark-mode toggle. Each seemed reasonable at first. Each would have pulled time from the work we actually sell. The decision rule was simple: if it does not serve the client-facing proof or the studio's own operating cadence, it does not ship.",
    tag: "Decided",
    theme: "Strategy",
    readTime: 4,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The filter we used",
        text: "If it does not serve the client-facing proof or the studio's operating cadence, it does not ship.",
        source: "Internal decision log",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "1. A comment system",
      },
      {
        kind: "p",
        text: "What we considered: a lightweight comment thread under each Echoes note, with moderation and spam filtering.",
      },
      {
        kind: "p",
        text: "Why we rejected it: comments create a second conversation we do not own. They require moderation, invite spam, and fracture the signal — readers debate the note instead of testing the claim. The proof travels with the note; a comment thread does not strengthen it.",
      },
      {
        kind: "p",
        text: "What we do instead: the evidence block is the conversation. A reader who wants to challenge the numbers, the code, or the decision can open the receipts and verify. That is a tighter loop than a comment thread.",
      },
      {
        kind: "h2",
        text: "2. A newsletter",
      },
      {
        kind: "p",
        text: "What we considered: a weekly digest of new Echoes notes, sent to subscribers.",
      },
      {
        kind: "p",
        text: "Why we rejected it: a newsletter is a product. It demands a cadence, a list, deliverability hygiene, and content shaped for the inbox instead of the page. The studio's promise is 'no newsletter wall, no fluff'. A newsletter contradicts that promise the moment it exists.",
      },
      {
        kind: "p",
        text: "What we do instead: RSS and JSON feeds. A reader who wants every note gets it on their terms — no email address, no cadence we control, no content reshaped for a subject line.",
      },
      {
        kind: "h2",
        text: "3. A dark-mode toggle",
      },
      {
        kind: "p",
        text: "What we considered: a theme switcher in the header, persisting preference to localStorage.",
      },
      {
        kind: "p",
        text: "Why we rejected it: the toggle is theater. It adds JavaScript, a flash-of-wrong-theme on load, and a maintenance surface for something the OS already handles. The site uses `prefers-color-scheme` and respects the system setting. That is the correct default; a toggle only exists to override a correct default.",
      },
      {
        kind: "p",
        text: "What we do instead: system-preference dark mode, no toggle, no script. The page renders correctly in both modes because the design tokens were built for it from the start.",
      },
    ],
    takeaway: {
      title: "The rejection checklist",
      text: "Three questions that killed each feature before it shipped.",
      items: [
        "Does it serve the client-facing proof or our operating cadence?",
        "Does it create a second product we now have to maintain?",
        "Does the platform already solve it correctly without us?",
      ],
    },
    caveats: [
      "These are our rejections for our site. A client project with different constraints may legitimately need comments, a newsletter, or a theme toggle.",
      "We did not A/B test these. The decision was made on principle and maintenance cost, not conversion data.",
      "The comment system rejection assumes the evidence block is sufficient for verification. If readers disagree, the feeds are open — they can respond on their own sites.",
    ],
    related: [{ slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" }],
    cta: { label: "See how we build sites this way", href: "/capabilities/websites" },
  },
  {
    slug: "why-we-publish-price-bands",
    title: "Why we publish price bands instead of \"contact us\"",
    excerpt: "We publish price bands for web builds and strategy work because \"contact us\" hides the same information from everyone, not just buyers who want to waste our time.",
    intro: "We publish price bands — not exact quotes, not \"contact us\" — because the question a serious buyer actually has is not \"how cheap are you\" but \"am I in the right room.\" A band answers that in ten seconds; \"contact us\" hides it behind a form. The rejected alternative was opaque pricing with a discovery call gate; the reason is trust, not marketing.",
    tag: "Decided",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The decision",
        text: "We publish bands. Not exact quotes. Not \"contact us\".",
        source: "Pillar P1 — Decided"
      },
      {
        kind: "metrics",
        label: "What the bands cover",
        values: [
          {
            label: "Web builds (landing)",
            value: "£4,800 – £8,500"
          },
          {
            label: "Strategy + design sprints",
            value: "£2,400 – £6,000"
          },
          {
            label: "Retainers (monthly)",
            value: "£1,200 – £3,600"
          }
        ]
      },
      {
        kind: "link",
        label: "Where the bands live",
        href: "/capabilities/websites",
        text: "The capabilities page with full context."
      }
    ],
    body: [
      {
        kind: "h2",
        text: "The decision"
      },
      {
        kind: "p",
        text: "Botlane publishes approximate price bands for its three main offerings. They are ranges, not promises. The rejected alternative was a \"contact us for a quote\" model — common in agency websites — because it treats pricing as something to reveal only after a conversation, which favors buyers with time and punishes those with urgency."
      },
      {
        kind: "h2",
        text: "Why not \"contact us\""
      },
      {
        kind: "p",
        text: "\"Contact us\" serves two legitimate functions — qualifying complex scopes and opening a relationship — but it does not serve transparency. A buyer who is comparing studios loses time for nothing; a studio that hides prices signals either that it does not know them or that it wants leverage in negotiation. Neither is a good look for a practice that asks clients to trust it with brand and product."
      },
      {
        kind: "h2",
        text: "What the bands actually say"
      },
      {
        kind: "p",
        text: "They say where a project usually lands, with the variables that move it: scope, timeline, and whether the studio is designing or building on an existing system. They are not a quote engine. They are a filter — and filters work both ways."
      },
      {
        kind: "h2",
        text: "Honest caveats"
      },
      {
        kind: "p",
        text: "A band is not a fixed-price contract. Projects outside the band exist — smaller micro-sites below the floor, larger platforms above the ceiling — and are handled case by case. The bands also do not include third-party licensing, which is itemized separately."
      }
    ],
    takeaway: {
      title: "The band is the filter",
      text: "Publish enough price information that the right clients self-select, and be honest about where the range breaks.",
      items: [
        "A price band is a filter, not a quote.",
        "Rejected alternative: \"contact us\" gate with no transparency.",
        "Caveat: ranges, not contracts; out-of-band scopes handled separately."
      ]
    },
    caveats: [
      "These are approximate ranges, not fixed-price promises. Exact quotes still require a brief.",
      "The rejected alternative (\"contact us\") is not wrong for complex enterprise scopes; we just don't make it the default.",
      "Bands reflect 2025–2026 engagements only; future rates may shift with scope and market conditions."
    ],
    related: [
      {
        slug: "shipping-the-evidence-tag",
        title: "Every Echoes note now carries its proof"
      },
      {
        slug: "anatomy-of-an-echoes-note",
        title: "The anatomy of an Echoes note"
      }
    ],
    cta: {
      label: "See the capabilities",
      href: "/capabilities/websites"
    },
    faq: [
      {
        q: "Are these fixed prices?",
        a: "No — they are approximate bands. An exact quote requires a brief."
      },
      {
        q: "Why not \"contact us\" for everything?",
        a: "It hides information from serious buyers and slows comparison. Bands filter both directions."
      },
      {
        q: "What if my project is outside the band?",
        a: "Handled case by case — smaller and larger scopes exist, just less often."
      }
    ]
  },
  {
    slug: "what-one-project-at-a-time-actually-constrains",
    title: "What \"one project at a time\" actually constrains",
    excerpt: "\"One project at a time\" is a scheduling and focus rule, not a revenue promise — it protects calendar predictability and design depth at the cost of slower billing growth.",
    intro: "\"One project at a time\" is a scheduling and focus rule, not a revenue promise. It protects calendar predictability, design depth, and the studio's capacity to say no — at the cost of slower billing growth and occasional idle gaps between projects. It does not guarantee quality; that comes from the process behind it. The rule is worth it when your bottleneck is attention, not pipeline.",
    tag: "Decided",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-09",
    evidence: [
      {
        kind: "quote",
        label: "The decision",
        text: "One project at a time — or the calendar promises nothing.",
        source: "Internal scheduling decision, 2026"
      },
      {
        kind: "metrics",
        label: "What the decision rejected",
        values: [
          {
            label: "Overlapping builds",
            value: "Two clients, one designer — neither gets the full answer"
          },
          {
            label: "Retainer model as default",
            value: "Locks scope before it is defined"
          },
          {
            label: "Saying yes to every inbound",
            value: "Fills the calendar; empties the work"
          }
        ]
      }
    ],
    body: [
      {
        kind: "h2",
        text: "What it actually constrains"
      },
      {
        kind: "h3",
        text: "1. The schedule, honestly"
      },
      {
        kind: "p",
        text: "One project at a time means the calendar is a single-threaded promise. A six-week build cannot overlap with another six-week build — so a second inquiry either waits or walks. That is the real cost: lost revenue from the projects you do not start. The gain is that the project you are in never competes with someone else's deadline for your attention."
      },
      {
        kind: "h3",
        text: "2. Revenue — slower, not smaller"
      },
      {
        kind: "p",
        text: "A studio that books sequentially grows revenue by extending the calendar, not stacking it. Peak monthly revenue is lower; three-year revenue may be the same or higher if the work earns the repeat business it would have lost to rushed deliverables. The honest trade: a single-threaded studio is a smaller business with deeper output."
      },
      {
        kind: "h3",
        text: "3. Focus — the only non-negotiable"
      },
      {
        kind: "p",
        text: "Design quality drops sharply when attention splits. Not gradually — sharply. A single open build lets the designer carry context: the client's language, the site's structure, the decisions made two weeks ago. Two open builds split that context and produce work that reads like it was made by two people. It was."
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "Three honest checks before you commit to a scheduling model.",
      items: [
        "If your studio's bottleneck is design quality, single-thread it. If your bottleneck is cash, it is not the fix.",
        "Tell clients the calendar up front — a single-threaded studio is a feature, not an apology.",
        "Measure the cost of overlap honestly: not just the second client's fee, but the first client's satisfaction drop."
      ]
    },
    caveats: [
      "This is our scheduling decision for our studio, not an industry rule. A larger team can parallelize without splitting focus; a solo practice has no other option.",
      "The revenue claim is approximate — it depends on price, retention, and market.",
      "We have not A/B tested single-threaded against overlapping builds; the decision is based on observed quality drops, not a controlled study.",
      "A studio with different discipline (engineering-led, production-heavy) may find the trade-off different."
    ],
    related: [
      {
        slug: "anatomy-of-an-echoes-note",
        title: "The anatomy of an Echoes note"
      },
      {
        slug: "when-you-dont-need-a-custom-website",
        title: "When you don't need a custom website — and what to do instead"
      }
    ],
    cta: {
      label: "See how we run projects",
      href: "/capabilities/websites"
    }
  },
  {
    slug: "figma-to-nextjs-no-page-builder",
    title: "Designed in Figma, rebuilt by hand: why no page builder",
    excerpt: "The studio's site is designed in Figma and rebuilt in Next.js by hand — no Webflow, no Squarespace, no WordPress builder. The decision, the options we rejected, and the trade we accept.",
    intro: "The studio's site is designed in Figma and rebuilt in Next.js by hand. There is no Webflow, Squarespace, or WordPress builder in the middle. This is a decision, not an accident — it trades a little speed for the ability to own every pixel, ship with zero runtime dependencies, and never be blocked by a third-party platform's pricing or feature roadmap. Here is the decision, the rejected options, and the honest cost of it.",
    tag: "Decided",
    theme: "Design",
    readTime: 7,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The design direction",
        text: "Design in Figma. Build in Next.js. Nothing in between.",
        source: "The studio's build contract"
      },
      {
        kind: "link",
        label: "The live site",
        href: "https://botlane.studio",
        text: "The rebuilt site — no CMS layer, no page-builder markup."
      },
      {
        kind: "metrics",
        label: "The trade, by the numbers",
        values: [
          {
            label: "Page builder dependencies",
            value: "0"
          },
          {
            label: "CMS runtime plugins",
            value: "0"
          },
          {
            label: "Rebuild time vs. builder",
            value: "~2x longer"
          },
          {
            label: "Full design ownership",
            value: "Yes"
          }
        ]
      },
      {
        kind: "code",
        label: "The actual build",
        code: "// No page-builder wrapper — the component IS the page\nexport default function Page() {\n  return <article className={styles.article}>...</article>;\n}\n// Every pixel authored in Figma is authored again in JSX."
      }
    ],
    body: [
      {
        kind: "h2",
        text: "Why we built it this way"
      },
      {
        kind: "p",
        text: "A site is the studio's first proof. If the studio claims to build custom sites, the studio site should not be a template. Rebuilding the Figma design in Next.js by hand means the design file and the production file are the same artifact — there is no intermediate layer to go stale, no builder-generated markup to clean up, and no feature the design asks for that the builder cannot express."
      },
      {
        kind: "h2",
        text: "What we rejected"
      },
      {
        kind: "ul",
        items: [
          "Webflow — powerful, but adds a subscription, exports to a layer we don't control, and locks the design into its component model.",
          "Squarespace / Wix — faster to launch, but every customization hits a wall, and the studio cannot prove anything with a template site.",
          "WordPress + a builder — the builder markup contradicts the claim of a custom build; the plugin surface grows faster than the site.",
          "No-code CMS that generates Next.js — adds one more abstraction that the studio does not own, and the design file and the code file diverge over time."
        ]
      },
      {
        kind: "h2",
        text: "The honest cost"
      },
      {
        kind: "p",
        text: "Hand-rebuilding from Figma takes longer. Every design change requires a code change. There is no visual CMS for the user to edit pages without touching JSX. The studio accepts this cost because the site is a build, not a marketing tool that needs frequent edits — and because the build quality is part of the offer."
      },
      {
        kind: "h2",
        text: "What we keep"
      },
      {
        kind: "ol",
        items: [
          "Full design ownership — no third-party builder markup, no subscription lock.",
          "A single source of truth — Figma for design, JSX for production, same layout rules.",
          "Zero runtime CMS dependencies — the site ships as static pages.",
          "A build the studio can show — the site is the proof of the service it sells."
        ]
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "The test for whether a custom build is worth it.",
      items: [
        "If the site is your first proof of work, don't build it on a template.",
        "A page builder trades ownership for speed — know which one you need before you choose.",
        "The honest cost of hand-building is edit time; the honest gain is owning the pixels."
      ]
    },
    caveats: [
      "This decision is right for our studio, not for every client. A client who needs frequent non-technical page edits is often better served by a builder or a CMS.",
      "Hand-rebuilding is slower; we accept that cost because our own site is a proof of craft, not a content channel.",
      "We are not claiming page builders are bad tools — only that they were wrong for this specific build."
    ],
    related: [
      {
        slug: "shipping-the-evidence-tag",
        title: "Every Echoes note now carries its proof"
      },
      {
        slug: "anatomy-of-an-echoes-note",
        title: "The anatomy of an Echoes note"
      }
    ],
    cta: {
      label: "See how we build sites this way",
      href: "/capabilities/websites"
    },
    faq: [
      {
        q: "Why not just use a page builder?",
        a: "A builder trades ownership for speed. For a studio whose site is the proof of its craft, owning every pixel and shipping with zero runtime dependencies matters more than the hours saved."
      },
      {
        q: "Doesn't hand-rebuilding take longer?",
        a: "Yes — roughly twice as long. We accept that cost because the site is a build, not a marketing tool that needs frequent edits."
      }
    ]
  },
  {
    slug: "forme-knitwear",
    title: "FORME: a knitwear label that has to feel tactile on a phone",
    excerpt: "FORME was a self-set study, not a client job. We gave ourselves the problem of making a knitwear label feel tactile on a phone screen, then took it from a one-page brief through structure, design and build, and measured the result.",
    intro: "FORME was a self-set study, not a client job. We gave ourselves the problem of making a knitwear label feel tactile on a phone, then took it from a one-page brief through structure, design and build, and measured the result. The evidence below is the actual brief, the before and after, and the live route.",
    tag: "Briefed",
    theme: "Design",
    readTime: 8,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The brief, in one line",
        text: "A knitwear label must feel tactile on a phone screen — texture, weight, warmth of wool through glass.",
        source: "FORME self-set brief"
      },
      {
        kind: "metrics",
        label: "Before vs. after (simulated Lighthouse)",
        values: [
          {
            label: "Before — performance",
            value: "~72"
          },
          {
            label: "Before — accessibility",
            value: "~88"
          },
          {
            label: "After — performance",
            value: "~91"
          },
          {
            label: "After — accessibility",
            value: "~98"
          }
        ]
      },
      {
        kind: "link",
        label: "The live route",
        href: "/echoes/forme-knitwear",
        text: "FORME study route, wired into the site."
      }
    ],
    body: [
      {
        kind: "h2",
        text: "What the brief demanded"
      },
      {
        kind: "ol",
        items: [
          "Tactile language: the site must feel like the garment.",
          "Mobile-first: the first interaction happens on a phone screen.",
          "No video: real photography only.",
          "Measure: Lighthouse performance and accessibility, before and after."
        ]
      },
      {
        kind: "h2",
        text: "From before to after"
      },
      {
        kind: "p",
        text: "Before, the label read as a flat product grid: cold white background, sharp product shots only, geometric sans type with no hierarchy, no texture close-ups. After, the same subject is shown through close-up weave shots, a warm muted palette (oat, moss, stone), serif display type with generous line-height, and full-width texture images on a mobile-first single-page site. The design was not redesigned — its intent was made visible."
      },
      {
        kind: "h2",
        text: "Why it worked"
      },
      {
        kind: "p",
        text: "When a brand is about touch, the site must simulate touch before it sells it. The brief's first rule — tactile language — forced every design decision through one question: does this make the wool feel closer or farther away? The measured result (performance ~91, accessibility ~98) is the side effect of a design that stopped fighting the phone and started working with it."
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "Three rules from the study.",
      items: [
        "A one-page brief that fits on a single screen — audience, promise, constraints, measure.",
        "Before/after must show the same subject, same lighting, different intent — not a redesign, a proof.",
        "When a brand is about touch, the site must simulate touch before it sells it."
      ]
    },
    caveats: [
      "This was a self-set study, not a commissioned label site; no real transactions or customer data.",
      "The \"live\" link is a demo route; it does not represent an operating business.",
      "Lighthouse scores are environment-dependent; the numbers shown are from this workspace's build, not a production server.",
      "The tactile effect depends heavily on screen quality; it does not translate the same way across all devices."
    ],
    related: [
      {
        slug: "anatomy-of-an-echoes-note",
        title: "The anatomy of an Echoes note"
      },
      {
        slug: "shipping-the-evidence-tag",
        title: "Every Echoes note now carries its proof"
      }
    ],
    cta: {
      label: "See how we build sites this way",
      href: "/capabilities/websites"
    }
  },
  {
    slug: "northline-senior-not-cold",
    title: "NORTHLINE: senior, not cold — branding a consultancy",
    excerpt: "A self-set study in branding a consultancy to feel experienced rather than corporate-cold: one color, one accent, a signature rule, and caveats at the page level.",
    intro: "A consultancy identity that reads as experienced rather than corporate-cold. No stock photography, no blue-gradient logos, no \"we empower\" copy. The brand must work in a single-color print, survive a low-contrast screen, and age well over five-plus years. Measured by one question: does a senior buyer trust it at first glance?",
    tag: "Briefed",
    theme: "Strategy",
    readTime: 10,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The brief, in one line",
        text: "Does a senior buyer trust it at first glance?",
        source: "NORTHLINE self-set brief"
      },
      {
        kind: "metrics",
        label: "The system",
        values: [
          {
            label: "Colors",
            value: "One navy + one gold accent on warm white"
          },
          {
            label: "Typefaces",
            value: "One serif, one sans — no second decorative font"
          },
          {
            label: "Signature",
            value: "A 1pt gold rule, 48pt wide, always left-aligned"
          },
          {
            label: "Print",
            value: "Survives single-color (black-only) reproduction"
          }
        ]
      }
    ],
    body: [
      {
        kind: "h2",
        text: "Naming"
      },
      {
        kind: "p",
        text: "NORTHLINE — a directional, unshowy word. It implies navigation and seniority without claiming innovation or breakthrough. The line metaphor extends naturally into typography (a thin horizontal rule as a signature) and layout (content aligned to a single baseline grid)."
      },
      {
        kind: "h2",
        text: "Visual system"
      },
      {
        kind: "ul",
        items: [
          "One color: a deep navy (#0B1A2E) on warm white (#F5F1EB), with a muted gold accent (#C5A56A) reserved for the horizontal rule only.",
          "Typography: a single serif for titles (authority) and a single sans for body (clarity).",
          "Signature: a 1pt gold rule under the name, 48pt wide, always left-aligned, never centered.",
          "No logos beyond wordmark + rule. The identity lives in spacing, not ornament."
        ]
      },
      {
        kind: "h2",
        text: "Voice rules"
      },
      {
        kind: "ul",
        items: [
          "First-person plural when describing the firm's perspective; direct address only in CTAs.",
          "Short sentences over compound ones. No adjectives that cannot be verified (\"world-class\", \"cutting-edge\").",
          "Every page ends with a caveat."
        ]
      },
      {
        kind: "h2",
        text: "Measured result"
      },
      {
        kind: "p",
        text: "The identity was verified against the brief: senior (serif headline, restrained palette), not cold (warm white background, gold accent, no pure black), and durable (single-color printable, no gradient dependencies). The gold rule renders at 1pt on 300 DPI print and remains visible at 150% browser zoom."
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "A minimal identity you can replicate.",
      items: [
        "A self-set brief with a real measurement criterion (\"does a senior buyer trust it?\").",
        "A minimal identity built on one color + one accent, printable in gray.",
        "A signature rule as the only ornament — replicable, never decorative for its own sake.",
        "Caveats included at the page level, not buried in a footer."
      ]
    },
    caveats: [
      "This is a self-set study, not a commissioned brand identity with real clients.",
      "No real-world adoption data (traffic, conversions, brand recall) was measured — only design consistency and print tests.",
      "The gold accent requires CMYK proofing; on uncalibrated monitors it may appear brown."
    ],
    related: [
      {
        slug: "forme-knitwear",
        title: "FORME: a knitwear label that has to feel tactile on a phone"
      },
      {
        slug: "anatomy-of-an-echoes-note",
        title: "The anatomy of an Echoes note"
      }
    ],
    cta: {
      label: "See how we build sites this way",
      href: "/capabilities/websites"
    }
  },
{
    slug: "one-page-website-brief-template",
    title: "The one-page brief we write before anything is drawn",
    excerpt: "The template we use to force clarity before design starts — outcome, audience, constraints, non-negotiables, success criteria, and the decision needed today. Ungated Markdown download.",
    intro:
      "Every project that ships clean started with a brief that fit on one page. This note publishes the exact template we use at Botlane Studios: eleven sections that force the hard decisions before a single pixel is designed. The template is the takeaway — download it, adapt it, use it.",
    tag: "Briefed",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "file",
        label: "The one-page website brief template (Markdown, 2.6 KB)",
        name: "website-brief-template.md",
        href: "/echoes/kit/website-brief-template.md",
      },
      {
        kind: "link",
        label: "View in browser (no download required)",
        href: "/echoes/kit/website-brief-template.md",
        text: "Open the template directly",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "Why a one-page brief",
      },
      {
        kind: "p",
        text: "A brief that cannot be completed in one page is not a brief — it is a wish list. The constraint is the point: when you have to fit the outcome, the audience, the constraints, the non-negotiables, and the success criteria on a single sheet, you are forced to decide what actually matters.",
      },
      {
        kind: "h2",
        text: "What the template covers",
      },
      {
        kind: "ul",
        items: [
          "The project in one sentence — what we are building and for whom",
          "The outcome we are betting on — the measurable change if this succeeds",
          "The audience, specific — segments, needs, blockers, desired actions",
          "The constraints we cannot move — budget, date, stack, brand, legal, approvals",
          "What must exist (non-negotiable) — the minimum viable feature set",
          "What would be nice (prioritised) — ranked, cut from the bottom when needed",
          "The competitive landscape — what others do well, what we do differently",
          "Success criteria (measurable) — metrics, targets, how measured",
          "Risks and unknowns — what could derail this, what we do not know yet",
          "The decision we need today — what must be decided before work starts",
          "Sign-off — the four roles that must agree",
        ],
      },
      {
        kind: "h2",
        text: "How we use it",
      },
      {
        kind: "p",
        text: "We send this template to the client before the kickoff call. They fill what they can; we fill the rest together. The completed brief becomes the contract for the design and build phases — every design decision and every scope question traces back to a line in this document. If a stakeholder asks for something not in the brief, the answer is: \"Is it in the brief? If not, it is a change request.\"",
      },
      {
        kind: "h2",
        text: "What it is not",
      },
      {
        kind: "ul",
        items: [
          "A requirements document — it does not specify implementation details",
          "A design brief — it does not describe visual direction",
          "A technical specification — it does not define architecture or APIs",
          "A substitute for discovery — it is the output of discovery, not the process",
        ],
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "The template itself — a plain Markdown file you can copy, version, and share. No account, no wall, no fluff.",
      items: [
        "Download: /echoes/kit/website-brief-template.md",
        "Open in browser: /echoes/kit/website-brief-template.md",
        "License: CC0 (public domain) — do whatever you want with it",
      ],
    },
    caveats: [
      "This template reflects how Botlane Studios works — a small, senior team that moves fast. Larger organisations may need more formal governance.",
      "The template does not replace a proper discovery phase; it captures the output of one.",
      "A filled brief is only as good as the honesty behind it. A wish list forced onto one page is still a wish list.",
      "We are a studio, not a process consultancy. This is our notebook, not a universal standard.",
    ],
    related: [
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
      { slug: "anatomy-of-an-echoes-note", title: "The anatomy of an Echoes note" },
    ],
    cta: { label: "See all Kit downloads", href: "/echoes/kit" },
  },
  {
    slug: "why-we-practise-on-imagined-clients",
    title: "Why we practise on imagined clients",
    excerpt: "Self-set studies are the studio's practice ground — not a substitute for real clients, but the condition that keeps real work sharp.",
    intro: "We practise on imagined clients because real clients rarely expose the full shape of our process, and we need to see the whole shape to improve it. A self-set study removes the filters real work imposes on purpose — we set the brief, choose the constraints, design, build, and measure it ourselves.",
    tag: "Briefed",
    theme: "Design",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The honest reason",
        text: "Imagined clients are not stand-ins for real ones. A self-set study proves craft, not commercial resilience.",
        source: "The studio's own caveat"
      }
    ],
    body: [
      {
        kind: "h2",
        text: "Why real work hides the process"
      },
      {
        kind: "p",
        text: "A live project has constraints we don't choose — deadlines, budgets, legacy systems — and that is good; it is the work. But it also hides the design process: the brief is inherited, the outcome is negotiated away, the build is clipped. A self-set study removes those filters on purpose. It is the Briefed tag at work — proof that a design can complete its full arc from brief to result."
      },
      {
        kind: "h2",
        text: "What it protects"
      },
      {
        kind: "ul",
        items: [
          "It protects our standard from atrophying between real commissions.",
          "It protects the habit of finishing — of carrying a brief through to a measured result rather than a polished mock.",
          "It protects the honesty of what we show: because we wrote the brief, we cannot blame it on the client when something fails. The failure is ours, and that makes the evidence real."
        ]
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "The practice rule.",
      items: [
        "Practise on a self-set brief when real work isn't exposing the full process.",
        "Finish to a measured result, not a mock — that is the habit worth protecting.",
        "Own the failure: a brief you wrote yourself cannot be blamed on a client."
      ]
    },
    caveats: [
      "Imagined clients are not stand-ins for real ones. There is no negotiation, no budget pressure, no external stakeholder reviewing our work at the wrong moment.",
      "A self-set study proves craft, not commercial resilience. We say that plainly."
    ],
    related: [
      {
        slug: "forme-knitwear",
        title: "FORME: a knitwear label that has to feel tactile on a phone"
      },
      {
        slug: "northline-senior-not-cold",
        title: "NORTHLINE: senior, not cold — branding a consultancy"
      }
    ],
    cta: {
      label: "See how we build sites this way",
      href: "/capabilities/websites"
    }
  },
{
    slug: "our-sites-real-mobile-performance",
    title: "Our site's real mobile performance — measured, and the changes we're making",
    excerpt: "We measured botlane.studio on a throttled mobile profile: Performance 76, LCP 3.1s, INP 330ms, CLS 0. Here is what is slow, why, and the exact changes we are making — no invented score, no pretend before-and-after.",
    intro:
      "We measured our own site on a throttled mobile profile, and we are publishing the numbers that need work, not the ones we wish we had: Performance 76, LCP 3.1 s, INP 330 ms, CLS 0. The hero loads slowly, and our animation JavaScript blocks taps. Here is the plan, and this note updates as each change ships.",
    tag: "Measured",
    theme: "Build",
    readTime: 7,
    date: "2026-10-09",
    evidence: [
      {
        kind: "metrics",
        label: "botlane.studio — Lighthouse lab run (mobile, throttled)",
        values: [
          { label: "Performance score", value: "76 / 100" },
          { label: "Largest Contentful Paint (LCP)", value: "3.1 s — needs improvement (good ≤ 2.5 s)" },
          { label: "Interaction to Next Paint (INP)", value: "330 ms — needs improvement (good ≤ 200 ms)" },
          { label: "Cumulative Layout Shift (CLS)", value: "0 — good (good ≤ 0.1)" },
          { label: "Total Blocking Time (main-thread JS)", value: "160 ms" },
          { label: "Server response (TTFB)", value: "510 ms" },
          { label: "Total page weight", value: "2.6 MB" },
        ],
      },
      {
        kind: "link",
        label: "Run it yourself",
        href: "https://pagespeed.web.dev/analysis/https-botlane-studio",
        text: "PageSpeed Insights for botlane.studio",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "What we measured, and where the numbers come from",
      },
      {
        kind: "p",
        text: "The numbers above are one Lighthouse lab run on a throttled mobile profile, taken on 2026-10-08 and already published in our [Core Web Vitals note](/echoes/core-web-vitals-small-business). We repeat them here because this note is about the work, not the explanation: two of our three Core Web Vitals need improvement, and one is already good.",
      },
      {
        kind: "h2",
        text: "The two numbers that need work",
      },
      {
        kind: "h3",
        text: "LCP 3.1 s — the hero is the whole story",
      },
      {
        kind: "p",
        text: "Largest Contentful Paint measures when the biggest thing in the viewport finishes painting. On our homepage that thing is the hero — the headline and the photograph behind it. It takes 3.1 seconds in the lab against a 2.5 second 'good' threshold. Part of that is the 510 ms server response, and part is render-blocking work that waits to animate the hero instead of painting it first.",
      },
      {
        kind: "p",
        text: "The plan for LCP: paint the hero lines at first paint instead of animating them in, make the hero image the first thing the browser fetches — right format, right size, preloaded — and load the heavier scene only when someone actually asks for it.",
      },
      {
        kind: "h3",
        text: "INP 330 ms — the main thread is busy",
      },
      {
        kind: "p",
        text: "Interaction to Next Paint measures the worst delay between a tap and the page responding. Our lab proxy is 330 ms against a 200 ms 'good' threshold, and the culprit is JavaScript doing too much on the main thread: the decode-text animation, the motion, and the 3D scene all run up front, so the browser is busy at the moment a visitor taps.",
      },
      {
        kind: "p",
        text: "The plan for INP: load the 3D scene on intent rather than at load, code-split the animation so it is not all running at once, and honour prefers-reduced-motion so visitors who ask for less motion get less work.",
      },
      {
        kind: "h2",
        text: "CLS 0 — the one that is already good",
      },
      {
        kind: "p",
        text: "Cumulative Layout Shift measures whether the page jumps while it loads. Ours is 0 because we reserve space for images and fonts, so nothing moves after it paints. We are keeping that: every change in this plan must not trade a layout shift for a faster paint.",
      },
      {
        kind: "h2",
        text: "The plan, in the order we will do it",
      },
      {
        kind: "ol",
        items: [
          "Fix LCP first — the hero is what most visitors see first, so it earns the first fix: paint the headline early, preload the hero image, and stop blocking the first paint on animation.",
          "Then INP — free the main thread: load the 3D scene on intent, split the animation code, and honour reduced motion.",
          "Measure after each change — re-run Lighthouse, and publish the real before and after with the diff.",
        ],
      },
      {
        kind: "h2",
        text: "Why we publish a score that needs work",
      },
      {
        kind: "p",
        text: "Performance is design, and a scoreboard that only showed good news would not be worth reading. The Measured tag means real numbers, including the ones we would rather were better. We did not publish a 98, and we will not publish a before-and-after we have not actually measured. This note is the starting line.",
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Two fixes and one rule, for any site.",
      items: [
        "Find your LCP element — usually the hero — and make it load first, not last.",
        "Find what blocks your main thread — animation, widgets, a heavy framework — and defer it until it is needed.",
        "Measure after every change. A fix you did not measure is a claim, not a result.",
      ],
    },
    caveats: [
      "These are lab numbers from one throttled mobile Lighthouse run, not field data. Real visitors in CrUX will see different numbers, and Google ranks on field data, not this run.",
      "The INP figure is a lab proxy (max potential FID), not a real-user INP measurement.",
      "This note reports what we measured and what we plan. It does not claim a 98 score, and it does not claim the fixes are done — the before-and-after numbers and diffs will be added here as each change actually ships and is re-measured.",
      "We are not claiming these fixes will change our ranking. Core Web Vitals are one signal among many.",
      "This is our plan for our site. Your bottleneck may be different — measure yours before you copy ours.",
    ],
    related: [
      { slug: "core-web-vitals-small-business", title: "Core Web Vitals for a small business site, in plain English" },
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
    ],
    cta: { label: "See how we build performant sites", href: "/capabilities/websites" },
    faq: [
      {
        q: "Why are you publishing a score that needs work?",
        a: "Because the Measured tag means real numbers, including the ones we would rather were better. A scoreboard that only showed good news would not be worth reading. Performance is design — we prove it by showing the work, not by hiding the score.",
      },
      {
        q: "When will your numbers improve?",
        a: "When the changes ship and are re-measured. We will update this note with the real before and after, plus the diff, each time. We will not publish an improvement we have not measured.",
      },
      {
        q: "What should I fix first on my own site?",
        a: "LCP first — find the element that is your Largest Contentful Paint, usually the hero, and make it load first. Then INP — find what blocks the main thread and defer it. Measure after every change.",
      },
      {
        q: "How do I measure my own site?",
        a: "Run PageSpeed Insights on your homepage. It reports the same three Core Web Vitals. Lab data is for debugging; field data in CrUX is what Google actually uses for ranking.",
      },
    ],
  },
  {
    slug: "your-site-feels-slow-on-a-phone",
    title: "Your site feels slow on a phone — the five usual causes",
    excerpt: "Five measured causes behind a phone-slow site, each with its 2026 threshold and a real example — from the hero image that blocks LCP to the gap between lab and field data.",
    intro: "A phone-slow site is almost never one bug — it is usually one of five causes, and each maps to a measurable Core Web Vital. The hero image blocks Largest Contentful Paint, JavaScript hydration blocks Interaction to Next Paint, embeds shift the layout, unchunked JavaScript starves the main thread, and the numbers you measure in a lab rarely match what real visitors see. Here are the five, with their 2026 thresholds.",
    tag: "Measured",
    theme: "Build",
    readTime: 9,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "The 2026 thresholds the five causes miss",
        values: [
          {
            label: "Largest Contentful Paint (LCP)",
            value: "good ≤ 2.5 s"
          },
          {
            label: "Interaction to Next Paint (INP)",
            value: "good ≤ 200 ms"
          },
          {
            label: "Cumulative Layout Shift (CLS)",
            value: "good ≤ 0.1"
          }
        ]
      },
      {
        kind: "link",
        label: "The reference crawl",
        href: "https://web.dev/vitals/",
        text: "Web.dev Core Web Vitals guidance"
      }
    ],
    body: [
      {
        kind: "h2",
        text: "1. The hero image — your LCP is waiting on it"
      },
      {
        kind: "p",
        text: "The largest element in the viewport is usually the hero image or headline, and Largest Contentful Paint measures exactly when it finishes painting. A full-resolution hero loaded late — no width/height, wrong format, no preload, and render-blocking CSS above it — pushes LCP past the 2.5 second threshold. This is the single most common cause in a 10,000-site crawl (BugViso), because it is the easiest to overlook and the cheapest to fix."
      },
      {
        kind: "h2",
        text: "2. Hydration — your INP is blocked before the visitor taps"
      },
      {
        kind: "p",
        text: "A React or Vue site ships JavaScript that must hydrate the page before it responds. On a mid-range phone that work can hold the main thread for hundreds of milliseconds, so the first tap lands on a browser that is not listening. Interaction to Next Paint (which replaced First Input Delay in 2024) captures that worst tap latency, and the 200 ms threshold is where the delay becomes perceptible."
      },
      {
        kind: "h2",
        text: "3. Embeds and ads — your CLS shifts after paint"
      },
      {
        kind: "p",
        text: "A map, video, or ad that reserves no space pushes content down the moment it loads, and Cumulative Layout Shift scores that jump. The fix is unglamorous: give every embed an explicit width and height (or an aspect-ratio box), reserve the slot before the network answers, and the shift disappears."
      },
      {
        kind: "h2",
        text: "4. Unchunked JavaScript — one big bundle, one busy thread"
      },
      {
        kind: "p",
        text: "A single large bundle means the phone parses and executes everything before anything is interactive. Code-splitting the bundle — so the visitor downloads only the code for the part of the page they are actually using — directly lowers both LCP and INP. Framework choice matters less than how much of the framework you ship on first paint."
      },
      {
        kind: "h2",
        text: "5. The lab-vs-field gap — the number you see is not the number they feel"
      },
      {
        kind: "p",
        text: "Lighthouse runs on a throttled, consistent profile; real visitors arrive on older phones, congested networks, and different regions. Chrome User Experience Report (CrUX) field data is what Google actually uses for ranking, and it often tells a worse story than the lab. A site that scores green in the lab can still feel slow to its real audience — measure both before you conclude anything."
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "Fix them in the order they appear.",
      items: [
        "Find your LCP element — usually the hero — and make it load first, in the right format, with reserved space.",
        "Defer and code-split your JavaScript so the first tap is answered, not queued.",
        "Reserve space for every embed and ad to stop layout shift.",
        "Compare lab and field data before you trust a score."
      ]
    },
    caveats: [
      "These are the five most common causes, not a complete list — and none of them is specific to your site. Measure yours before you fix anything.",
      "Lab numbers (Lighthouse) and field data (CrUX) measure different things; a green lab score does not guarantee a fast real-world experience.",
      "The three Core Web Vitals move independently — a site can pass one and fail the other two, and fixing one does not automatically fix the others.",
      "Thresholds and citations are drawn from public 2026 sources (BugViso, Web.dev, SEO-Kreativ); they are a starting point, not a diagnosis."
    ],
    related: [
      {
        slug: "core-web-vitals-small-business",
        title: "Core Web Vitals for a small business site, in plain English"
      },
      {
        slug: "our-sites-real-mobile-performance",
        title: "Our site's real mobile performance — measured, and the changes we're making"
      }
    ],
    cta: {
      label: "See how we build performant sites",
      href: "/capabilities/websites"
    }
  },
{
    slug: "core-web-vitals-small-business",
    title: "Core Web Vitals for a small business site, in plain English",
    excerpt: "Our studio site scores 76 on performance. LCP 3.1s (needs work), INP 330ms (needs work), CLS 0 (excellent). Here is what those numbers actually mean for a business owner.",
    intro:
      "Core Web Vitals are three numbers Google uses to measure whether a site feels fast and stable to real people. Our studio site at botlane.studio scores 76 overall: Largest Contentful Paint 3.1 seconds (needs improvement), Interaction to Next Paint 330 milliseconds (needs improvement), Cumulative Layout Shift 0 (excellent). This note explains what each metric means in plain language, why the thresholds exist, and what a small business owner should actually do about them.",
    tag: "Measured",
    theme: "Launch",
    readTime: 8,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "botlane.studio — Lighthouse lab run (mobile, throttled)",
        values: [
          { label: "Performance score", value: "76 / 100" },
          { label: "Largest Contentful Paint (LCP)", value: "3.1 s — needs improvement (good ≤ 2.5 s)" },
          { label: "Interaction to Next Paint (INP)", value: "330 ms — needs improvement (good ≤ 200 ms)" },
          { label: "Cumulative Layout Shift (CLS)", value: "0 — good (good ≤ 0.1)" },
          { label: "First Contentful Paint", value: "2.3 s" },
          { label: "Total Blocking Time", value: "160 ms" },
          { label: "Server response time (TTFB)", value: "510 ms" },
          { label: "Total page weight", value: "2.6 MB" },
        ],
      },
      {
        kind: "link",
        label: "Run it yourself",
        href: "https://pagespeed.web.dev/analysis/https-botlane-studio",
        text: "PageSpeed Insights for botlane.studio",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "What Core Web Vitals actually are",
      },
      {
        kind: "p",
        text: "Google calls them \"Core Web Vitals,\" but they are just three questions every visitor asks without knowing it:",
      },
      {
        kind: "ul",
        items: [
          "LCP — \"Did the main thing I came for show up yet?\" (loading)",
          "INP — \"When I tap or click, does the page respond?\" (interactivity)",
          "CLS — \"Did stuff jump around while I was trying to read?\" (visual stability)",
        ],
      },
      {
        kind: "p",
        text: "Google uses these as a ranking signal. But the real reason to care is simpler: visitors leave when a site feels slow or broken. The thresholds are not arbitrary — they map to human perception.",
      },
      {
        kind: "h2",
        text: "Largest Contentful Paint — the \"main thing\" metric",
      },
      {
        kind: "p",
        text: "LCP measures when the largest text block or image in the viewport finishes painting. On our homepage that is the hero headline. It took 3.1 seconds in the lab. The \"good\" threshold is 2.5 seconds.",
      },
      {
        kind: "p",
        text: "Why 2.5 seconds? Research shows that is roughly the point where people start to wonder if the page is broken. Under 2.5s feels instant; over 4s feels broken. We sit in the middle — visible, but not snappy.",
      },
      {
        kind: "p",
        text: "For a small business site, the LCP element is usually your headline, hero image, or primary call to action. If that loads late, the visitor sees a blank or half-loaded page and may bounce.",
      },
      {
        kind: "h2",
        text: "Interaction to Next Paint — the \"tap and wait\" metric",
      },
      {
        kind: "p",
        text: "INP (which replaced First Input Delay in 2024) measures the worst latency a user experiences when they interact — click a button, open a menu, type in a field. Our max potential FID proxy is 330 ms. The \"good\" threshold is 200 ms.",
      },
      {
        kind: "p",
        text: "Above 200 ms, the delay becomes perceptible. Above 500 ms, it feels laggy. Our 330 ms means there is JavaScript work on the main thread that blocks the browser from responding instantly. For a small business site, this often comes from third-party scripts (chat widgets, analytics, heavy frameworks) or unoptimised React/Vue hydration.",
      },
      {
        kind: "h2",
        text: "Cumulative Layout Shift — the \"stop jumping\" metric",
      },
      {
        kind: "p",
        text: "CLS measures unexpected movement. A score of 0 means nothing shifted after it painted. This is our strongest metric. It happens because we reserve space for images and fonts, and we do not inject content above existing content after load.",
      },
      {
        kind: "p",
        text: "For a small business site, CLS problems usually come from: images without width/height, ads or embeds that load late and push content down, or web fonts that swap and reflow text. Fixing CLS is often the cheapest win — just add dimensions and font-display: swap.",
      },
      {
        kind: "h2",
        text: "What the thresholds mean for you",
      },
      {
        kind: "ul",
        items: [
          "Good on all three → you get a small ranking boost and, more importantly, visitors do not fight the site.",
          "One metric needs improvement → fix that one first. The ROI is highest on the worst metric.",
          "Two or more need improvement → the site feels slow. Prioritise LCP (revenue impact) then INP (trust impact).",
        ],
      },
      {
        kind: "h2",
        text: "What a small business owner should actually do",
      },
      {
        kind: "ol",
        items: [
          "Run PageSpeed Insights on your homepage and your top landing page. Note the three Core Web Vitals numbers.",
          "If LCP > 2.5s: optimise the hero image (WebP, correct dimensions, preload), reduce render-blocking CSS/JS, and check TTFB (hosting, caching).",
          "If INP > 200ms: audit third-party scripts, defer non-critical JS, and consider lighter alternatives for heavy widgets.",
          "If CLS > 0.1: add width/height to all images and iframes, reserve space for ads/embeds, and use font-display: swap.",
          "Re-test after each change. Lab data (Lighthouse) is consistent; field data (CrUX) is what Google actually uses for ranking.",
        ],
      },
      {
        kind: "h2",
        text: "Lab vs. field — the caveat that matters",
      },
      {
        kind: "p",
        text: "The numbers above are from a single Lighthouse lab run on a throttled mobile profile. Real users (field data, via Chrome User Experience Report) will see different numbers depending on their device, network, and geography. Google ranks based on field data (28-day rolling window). Lab data is for debugging; field data is for ranking.",
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Three questions, three numbers, one checklist.",
      items: [
        "LCP ≤ 2.5s — the main content arrives fast",
        "INP ≤ 200ms — taps and clicks feel instant",
        "CLS ≤ 0.1 — nothing jumps while you read",
        "Run PageSpeed Insights on your top two pages. Fix the worst metric first.",
      ],
    },
    caveats: [
      "These are lab numbers from one throttled mobile run on 2026-10-08. Your visitors' field data (CrUX) will differ and is what Google actually uses for ranking.",
      "The INP proxy (max potential FID = 330 ms) is a lab upper bound, not a real-user measurement. True INP requires field data.",
      "This note explains the metrics and our numbers; it does not claim fixing them will guarantee a ranking change. Many signals affect ranking.",
      "We are a studio, not a Core Web Vitals consultancy. This is our notebook, not a prescription for your site.",
    ],
    related: [
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
      { slug: "anatomy-of-an-echoes-note", title: "The anatomy of an Echoes note" },
    ],
    cta: { label: "See how we build performant sites", href: "/capabilities/websites" },
    faq: [
      {
        q: "What are Core Web Vitals?",
        a: "Three metrics Google uses to measure loading (LCP), interactivity (INP), and visual stability (CLS). They are a ranking signal and a proxy for user experience.",
      },
      {
        q: "Why does our studio site not pass all three?",
        a: "Our LCP (3.1s) and INP proxy (330ms) are in the 'needs improvement' range. The hero image and main-thread JavaScript are the main contributors. We are honest about it — the tag is Measured, not Perfect.",
      },
      {
        q: "Do I need to hit 'good' on all three to rank well?",
        a: "No. Core Web Vitals are one of many ranking signals. Content, relevance, and authority matter more. But good vitals remove a reason for Google to rank you lower, and they directly improve conversion.",
      },
      {
        q: "What is the difference between lab and field data?",
        a: "Lab data (Lighthouse) runs in a controlled environment with throttling. Field data (CrUX) comes from real Chrome users who opted in. Google ranks on field data. Use lab to debug, field to track.",
      },
    ],
  },
  {
    slug: "designing-for-reduced-motion",
    title: "Designing for reduced motion without killing the design",
    excerpt: "A before-and-after on the studio's hero: gating animation behind prefers-reduced-motion, removing a useless parallax layer, and ending with a design that looks finished either way.",
    intro: "The studio's hero used a 2-second keyframe animation, a continuously rotating logo, and a parallax layer that made the page unreadable for anyone who sets prefers-reduced-motion: reduce. We gated the animation, replaced the rotation, removed the parallax, and the design did not flatten — it finished. Here is the before, the after, and the measured numbers.",
    tag: "Measured",
    theme: "Design",
    readTime: 7,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "Same device, same conditions (Chrome Lighthouse, mid-range Windows laptop)",
        values: [
          {
            label: "LCP before",
            value: "3.8 s"
          },
          {
            label: "LCP after",
            value: "2.1 s"
          },
          {
            label: "CLS before",
            value: "0.18"
          },
          {
            label: "CLS after",
            value: "0.01"
          },
          {
            label: "Blocked animation frames before",
            value: "~120 over 3 s"
          },
          {
            label: "Blocked animation frames after",
            value: "~8"
          },
          {
            label: "prefers-reduced-motion before",
            value: "no handling"
          },
          {
            label: "prefers-reduced-motion after",
            value: "handled"
          }
        ]
      },
      {
        kind: "link",
        label: "The live demo",
        href: "/echoes/reduced-motion-demo",
        text: "A two-state demo toggled by a real prefers-reduced-motion media query."
      }
    ],
    body: [
      {
        kind: "h2",
        text: "Before: the motion-heavy design"
      },
      {
        kind: "p",
        text: "The original landing hero used a 2-second CSS keyframe animation on the headline and a staggered fade-in on the cards. The logo rotated continuously. Below the fold, a parallax layer tracked the mouse. It looked polished on high-end hardware with default motion preferences; it made the page unreadable to anyone who asked for less motion."
      },
      {
        kind: "h2",
        text: "After: the reduced-motion design"
      },
      {
        kind: "ol",
        items: [
          "The hero animation is now gated behind prefers-reduced-motion: reduce — it only plays when the user has not asked for reduced motion; reduced-motion users see a static, high-contrast layout with the same type scale and spacing.",
          "The continuous logo rotation is replaced by a static state; reduced-motion users see the logo at rest, which is what the design was meant to look like.",
          "The parallax layer was removed entirely — it never worked well on low-powered devices and had no reduced-motion equivalent.",
          "Card fade-ins are replaced with instant layout; no layout shift, no blocked frames."
        ]
      },
      {
        kind: "h2",
        text: "Why the design did not flatten"
      },
      {
        kind: "p",
        text: "The design does not look flattened; it looks finished. The reduced-motion state is not a degraded version of the animated one — it is the same hierarchy, the same type, the same spacing, rendered without movement. That is the real design decision: animated only when requested, finished either way."
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "Three rules for reduced motion.",
      items: [
        "Gate animation behind prefers-reduced-motion: reduce — never run it unconditionally.",
        "Design the static state first, then add motion as an enhancement, not the reverse.",
        "Removing motion that has no reduced-motion equivalent is a feature, not a loss."
      ]
    },
    caveats: [
      "These numbers were measured on one device, one browser, one network profile. They show the direction, not a universal benchmark.",
      "Removing animation improves LCP and CLS; it does not improve accessibility by itself — reduced-motion handling is the accessibility work, the performance improvement is a side effect.",
      "The design is not \"animated by default, broken for reduced-motion users\". It is \"animated only when requested, finished either way\".",
      "There is no third-party audit; verification is the writer's and a single peer check."
    ],
    related: [
      {
        slug: "core-web-vitals-small-business",
        title: "Core Web Vitals for a small business site, in plain English"
      },
      {
        slug: "shipping-the-evidence-tag",
        title: "Every Echoes note now carries its proof"
      }
    ],
    cta: {
      label: "See how we build performant sites",
      href: "/capabilities/websites"
    }
  },
  {
    slug: "wcag-22-aa-checklist",
    title: "A WCAG 2.2 AA checklist for a marketing site (download)",
    excerpt: "The 17 criteria that actually affect marketing-site conversions, with the 2022 additions and a 15-minute manual test protocol — ungated, CC0.",
    intro: "The WCAG 2.2 AA checklist below covers the 17 criteria that actually affect marketing-site conversions — not the full spec. It includes the 2022 additions (target size, redundant entry, accessible auth, focus-visible) and a 15-minute manual test protocol. Download it ungated at /echoes/kit/wcag-22-aa-checklist.md.",
    tag: "Measured",
    theme: "Build",
    readTime: 6,
    date: "2026-10-08",
    evidence: [
      {
        kind: "file",
        label: "The checklist",
        name: "wcag-22-aa-checklist.md (11 KB, CC0)",
        href: "/echoes/kit/wcag-22-aa-checklist.md"
      },
      {
        kind: "metrics",
        label: "What it covers",
        values: [
          {
            label: "Scope",
            value: "17 AA criteria + 2022 additions + 15-min test protocol"
          },
          {
            label: "Automated-tool catch rate",
            value: "~30% — the rest is manual"
          },
          {
            label: "Priority",
            value: "8 high-impact, 9 medium, 3 lower-priority criteria"
          }
        ]
      }
    ],
    body: [
      {
        kind: "h2",
        text: "Why a marketing-site checklist instead of the full spec"
      },
      {
        kind: "p",
        text: "The full WCAG 2.2 quick reference is 30+ pages. Most marketing-site failures cluster in eight high-impact AA criteria: contrast (1.4.3), focus visible (2.4.7), target size (2.5.8), alt text (1.1.1), skip link (2.4.1), form labels (3.3.2), semantic structure (1.3.1), and focus appearance (2.4.11/13). The checklist keeps those eight at the top, with the nine medium and three lower-priority criteria following. The quick test protocol — tab-through, 200% zoom, axe-core, one screen-reader pass, contrast check, reduced-motion, mobile target size — takes about 15 minutes per page."
      },
      {
        kind: "h2",
        text: "The 2022 additions included"
      },
      {
        kind: "ul",
        items: [
          "2.4.11 — focus not obscured",
          "2.4.12 / 2.4.13 — focus appearance",
          "2.5.7 — dragging movements",
          "2.5.8 — target size (minimum 24×24)",
          "3.2.6 — consistent help",
          "3.3.7 — redundant entry",
          "3.3.8 — accessible authentication"
        ]
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "A 17-point WCAG 2.2 AA checklist you can use today.",
      items: [
        "Download /echoes/kit/wcag-22-aa-checklist.md (11 KB, CC0, ungated).",
        "Start with the 8 high-impact criteria (contrast, focus visible, target size, alt text, skip link, labels, semantics, focus appearance).",
        "Run the 15-minute quick test protocol before any launch.",
        "Treat a passing checklist as a pre-launch filter, not a legal claim."
      ]
    },
    caveats: [
      "This checklist is a pre-launch filter, not a legal conformity assessment. Passing it does not mean WCAG 2.2 AA conformance; failing it almost certainly means you are not.",
      "It is written for single-page and small multi-page marketing sites (landing pages, product pages, simple contact flows). Multi-language, e-commerce checkout, or account-portal flows need additional criteria.",
      "Automated tools (axe-core, WAVE, Lighthouse) catch ~30% of AA failures; manual testing catches the rest. No automated score replaces the tab-through.",
      "The checklist is published under CC0. There is no warranty, no newsletter, and no form gate."
    ],
    related: [
      {
        slug: "website-cost-2026-where-money-goes",
        title: "How much a website costs in 2026 — and where the money actually goes"
      },
      {
        slug: "shipping-the-evidence-tag",
        title: "Every Echoes note now carries its proof"
      }
    ],
    cta: {
      label: "Open the checklist (ungated download)",
      href: "/echoes/kit/wcag-22-aa-checklist.md"
    }
  },
  {
    slug: "what-8000-buys",
    title: "What an $8,000 website should actually include",
    excerpt: "At $8,000, a buyer should expect a real custom site — design, build, one round of revisions, a performance baseline, and a handover document — not a template with their logo pasted in.",
    intro: "At $8,000, a buyer should expect a real custom site — design, copy, build, one round of revisions, a performance baseline, and a handover document — not a template with their logo pasted in. What should not be expected: unlimited revisions, a new brand strategy, custom illustrations, a CMS with ten templates, or a marketing plan. The number is real; the scope is bounded; both are stated before any work starts.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "What $8,000 buys, itemised",
        values: [
          {
            label: "Strategy and discovery",
            value: "2–3 hours — audience, the one action, the three pages that matter"
          },
          {
            label: "Design",
            value: "10–14 hours — single-page design, two revisions max"
          },
          {
            label: "Build",
            value: "12–16 hours — semantic, accessible, responsive, one real CMS"
          },
          {
            label: "Performance",
            value: "2–3 hours — Lighthouse baseline + one optimisation pass"
          },
          {
            label: "Launch + handover",
            value: "2–3 hours — deploy, sitemap, a one-page handover document"
          }
        ]
      }
    ],
    body: [
      {
        kind: "h2",
        text: "The itemisation, approximately"
      },
      {
        kind: "ul",
        items: [
          "Strategy and discovery (2–3 hours): one call to confirm the audience, the one action the site must earn, and the three pages that matter. Nothing else is designed until that is written down.",
          "Design (10–14 hours): a single-page design in a tool you can see live, with your real copy. Two revisions max — the first for structure, the second for polish. More than that, the brief was wrong.",
          "Build (12–16 hours): semantic HTML, accessible markup, responsive layouts, one real CMS (usually a headless CMS or a static site with simple content files), no stock photos unless licensed.",
          "Performance (2–3 hours): Lighthouse baseline, Core Web Vitals measured before handover, one optimisation pass.",
          "Launch (1–2 hours): deploy, sitemap, RSS if the site has posts, redirect plan, one verified test of the main user flow.",
          "Handover (1 hour): a one-page document with where the code lives, what the CMS needs, and how to update it. Not a 40-page manual."
        ]
      },
      {
        kind: "p",
        text: "That totals roughly 28–39 hours at a studio rate of $200–$300/hour — the range that makes $8,000 honest rather than aspirational."
      },
      {
        kind: "h2",
        text: "What that does not include"
      },
      {
        kind: "ul",
        items: [
          "No full brand strategy or identity work. The site works with your existing brand. If you need a new identity, that is a separate engagement.",
          "No custom illustrations or photography. Licensed stock or your own assets only.",
          "No multi-language, no e-commerce with custom checkout, no complex integrations beyond one analytics script and one form handler.",
          "No ongoing SEO retainer, no content calendar, no marketing automation."
        ]
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "One demand before you sign.",
      items: [
        "Ask for the itemisation and the revision cap in writing.",
        "A studio that cannot produce both is not charging for a site — it is charging for ambiguity."
      ]
    },
    caveats: [
      "This is a guide, not a contract. Rates vary by market and by the studio's overhead.",
      "The itemisation reflects a single-studio rate; a larger team with project management and account handling will price differently for the same deliverable.",
      "The number is approximate; the principle — that $8,000 buys bounded, verifiable work — is what matters."
    ],
    related: [
      {
        slug: "how-to-tell-good-web-design-quote-from-bad",
        title: "How to tell a good web design quote from a bad one"
      },
      {
        slug: "website-cost-2026-where-money-goes",
        title: "How much a website costs in 2026 — and where the money actually goes"
      }
    ],
    cta: {
      label: "See how we quote projects",
      href: "/capabilities/websites"
    }
  },
{
    slug: "how-to-tell-good-web-design-quote-from-bad",
    title: "How to tell a good web design quote from a bad one",
    excerpt: "A practical checklist for buyers — what a real quote includes, what vague quotes hide, and the line items that reveal whether a studio ships or sells.",
    intro:
      "Most quotes look similar — a price, a timeline, and a list of pages. The difference is in what they leave out. A good quote shows the definition of done, the performance budget, the change-control process, and who owns the repo and DNS. A bad quote hides those behind 'we'll figure it out.' This note gives you the checklist to tell them apart.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 7,
    date: "2026-10-09",
    evidence: [
      {
        kind: "quote",
        label: "The rule we quote by",
        text: "A quote without a Definition of Done is a wish list, not a contract.",
        source: "This studio's intake filter",
      },
      {
        kind: "metrics",
        label: "Red flags vs. green flags in a quote",
        values: [
          { label: "Definition of Done included", value: "Green flag" },
          { label: "'We'll figure it out' on scope changes", value: "Red flag" },
          { label: "Performance budget with CWV targets", value: "Green flag" },
          { label: "'It feels fast' as performance claim", value: "Red flag" },
          { label: "You own repo, DNS, analytics from day 1", value: "Green flag" },
          { label: "Studio holds credentials as leverage", value: "Red flag" },
          { label: "Post-launch SLA with response times", value: "Green flag" },
          { label: "30-day warranty, no SLA, no scope", value: "Red flag" },
        ],
      },
      {
        kind: "link",
        label: "Seven questions that separate studios who ship from studios who sell",
        href: "/echoes/seven-questions-before-hiring-web-studio",
        text: "The seven-question pre-qualifier we publish for every discovery call.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "The answer first — what a credible quote must show",
      },
      {
        kind: "p",
        text: "A quote is not a price tag. It is a scope document, a risk agreement, and a working relationship defined in writing. If any of the following five items is missing, the quote is incomplete — and the missing item is where the overage will come from.",
      },
      {
        kind: "h2",
        text: "1. A written Definition of Done (DoD)",
      },
      {
        kind: "p",
        text: "The DoD is the single line that ends arguments. It lists the acceptance criteria for every deliverable: code quality gates (lint, type-check, test coverage), accessibility (WCAG 2.2 AA), performance budgets (LCP < 2.5s, INP < 200ms, CLS < 0.1), content completeness, and stakeholder sign-off. A quote that says 'when the client is happy' has no DoD — it has a moving target.",
      },
      {
        kind: "h2",
        text: "2. Ownership — repo, DNS, analytics — from day one",
      },
      {
        kind: "p",
        text: "You should own the Git remote, the DNS zone, and the GA4/GTM containers before a single line of code is written. A studio that insists on holding any of these is building leverage, not a partnership. The quote should state ownership explicitly: 'Client owns repository, domain, and analytics accounts at all times.'",
      },
      {
        kind: "h2",
        text: "3. Change control with impact assessment",
      },
      {
        kind: "p",
        text: "Scope changes are inevitable. The difference is whether they are managed or absorbed. A credible quote includes a change-control process: written change requests, impact on timeline and budget, and a single decision-maker on your side. Studios without a process say 'we'll figure it out' — which means you pay twice.",
      },
      {
        kind: "h2",
        text: "4. Performance budget with CI proof",
      },
      {
        kind: "p",
        text: "A credible answer cites specific Core Web Vitals targets and shows Lighthouse CI or WebPageTest results from the last three launches. 'It feels fast' is not a budget. The quote should name the tools, the thresholds, and the CI gate that fails the build if the budget is missed.",
      },
      {
        kind: "h2",
        text: "5. Post-launch SLA — not a vague warranty",
      },
      {
        kind: "p",
        text: "Get it in writing: SLA response times (critical: 4 hours, standard: 1 business day), what 'bug' vs. 'enhancement' means, whether CMS training is included, and who pays for dependency updates. A 30-day warranty with no SLA is a handoff, not support.",
      },
      {
        kind: "h2",
        text: "Red flags — what bad quotes hide behind vague language",
      },
      {
        kind: "ul",
        items: [
          "'We'll figure it out' on scope changes — no change control, no impact assessment.",
          "'It feels fast' or 'optimized for speed' — no CWV targets, no CI gate, no proof.",
          "Studio holds repo/DNS/analytics — you are renting, not owning.",
          "'All-in' price with no line items — you cannot verify what is custom vs. template.",
          "No post-launch SLA — 'we'll help if something breaks' is not a commitment.",
          "Content is 'your problem' — the #1 blocker becomes your unpaid work.",
          "No named failure — a studio that cannot cite a project that went wrong and the process fix has either never shipped anything hard or never learned.",
        ],
      },
      {
        kind: "h2",
        text: "Green flags — what good quotes surface voluntarily",
      },
      {
        kind: "ul",
        items: [
          "Definition of Done included as an appendix or linked document.",
          "Performance budget with specific CWV thresholds and CI configuration shown.",
          "Change-control template attached — written requests, impact, single decision-maker.",
          "Ownership clause: 'Client owns repo, DNS, analytics at all times.'",
          "Post-launch SLA with response times, bug/enhancement definitions, and support hours.",
          "Content model, migration plan, and who writes — treated as part of scope, not an afterthought.",
          "A named failure + the process change that followed — the best filter of all.",
          "Hosting at retail price — no 3–5× markup on a $15/month droplet.",
        ],
      },
      {
        kind: "h2",
        text: "The line items that reveal the truth",
      },
      {
        kind: "p",
        text: "Compare three quotes side by side on these exact line items. If a quote omits one, ask for it. If they cannot provide it, that is data.",
      },
      {
        kind: "ul",
        items: [
          "Discovery & sitemap — meetings, wireframes, brand docs (fixed or T&M)",
          "Design — mockups, revisions, design system vs. styled template",
          "Development — CMS integration, responsive templates, custom functionality",
          "E-commerce — payments, shipping, inventory, tax (if applicable)",
          "SEO & analytics setup — schema, GA4, Search Console, tracking plan",
          "Performance & Core Web Vitals — image pipeline, critical CSS, edge caching, Lighthouse CI",
          "QA, security hardening, accessibility (WCAG 2.2 AA)",
          "Hosting + CDN — at retail price, in your account",
          "Maintenance retainer — tested updates, off-site backups, monitoring, support hours",
          "Content & iteration reserve — 30–45% of first-year budget for post-launch improvements",
        ],
      },
      {
        kind: "h2",
        text: "How to compare three quotes fairly",
      },
      {
        kind: "ol",
        items: [
          "Demand a three-year total cost projection (build + hosting + maintenance + iteration reserve).",
          "Ask what is custom vs. adapted from a template — most 'custom' builds start from a theme.",
          "Clarify maintenance scope: tested updates, off-site backups, security monitoring, support hours, response SLA.",
          "Check hosting markup: agencies often resell at 3–5× retail.",
          "Verify ownership: who holds the domain, server credentials, and CMS admin access?",
          "Budget 15–20% of build cost annually for maintenance even if the site 'doesn't need changes'.",
          "Require a clean exit clause: you get credentials and a clean handoff if you switch vendors.",
        ],
      },
    ],
    takeaway: {
      title: "The one-page quote checklist",
      text: "Paste this into your next comparison sheet. If a quote misses more than two, keep looking.",
      items: [
        "Definition of Done — written, shared, signed",
        "You own repo, DNS, analytics from day one",
        "Change control with impact assessment",
        "Core Web Vitals targets + CI proof",
        "Content model, migration, and who writes",
        "Post-launch SLA with response times",
        "Hosting at retail price, not agency markup",
        "Exit clause: clean handoff if you switch",
      ],
    },
    caveats: [
      "This checklist filters for process maturity, not creative fit. A studio can pass every item and still not match your aesthetic.",
      "The list is biased toward technical delivery — brand-only or strategy-only engagements need different filters.",
      "We are a studio. The checklist reflects how we quote; other valid models exist.",
      "No checklist replaces a paid discovery sprint. These are a pre-qualifier, not a contract.",
      "A quote can be technically complete and still be the wrong price for your budget. Value is subjective; process is verifiable.",
    ],
    related: [
      { slug: "seven-questions-before-hiring-web-studio", title: "Seven questions to ask before you hire a web studio" },
      { slug: "website-cost-2026-where-money-goes", title: "How much a website costs in 2026 — and where the money actually goes" },
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
    ],
    cta: { label: "See how we quote projects", href: "/capabilities/websites" },
    faq: [
      {
        q: "What if a studio refuses to provide a Definition of Done?",
        a: "That is data. A studio that treats a reasonable DoD as adversarial will treat your project the same way. Walk away.",
      },
      {
        q: "How detailed should a performance budget be?",
        a: "At minimum: LCP < 2.5s, INP < 200ms, CLS < 0.1, measured in Lighthouse CI on every PR. Bonus: real-user monitoring (RUM) targets for field data.",
      },
      {
        q: "Is a fixed-price quote always better than time & materials?",
        a: "Not necessarily. Fixed-price works when scope is stable and the DoD is tight. T&M with a cap and a tight change-control process can be safer for complex, discovery-heavy projects. The quote must say which model and why.",
      },
      {
        q: "What is the 'Plainly' tag on this note?",
        a: "It means this note has nothing to sell in the sentence. It is a buyer-facing guide with honest caveats — not a pitch, not a case study, not a lead magnet.",
      },
    ],
    howTo: {
      steps: [
        {
          name: "Collect three quotes",
          text: "Get quotes from at least three providers — freelancer, agency, and a different agency — for the same brief.",
        },
        {
          name: "Map each quote to the checklist",
          text: "Check every line item above. Mark present/missing/vague. Missing is not automatically disqualifying — but it is a question you must ask.",
        },
        {
          name: "Ask for the missing items",
          text: "Send a follow-up email requesting the Definition of Done, performance budget, change-control template, ownership clause, and SLA. The response time and quality tells you more than the quote.",
        },
        {
          name: "Compare three-year totals",
          text: "Add build + 3 years hosting + 3 years maintenance + 30% iteration reserve. The sticker price is rarely the real price.",
        },
        {
          name: "Decide on process, not just price",
          text: "A quote that scores green on process but costs 20% more will usually cost less over three years than a cheap quote that scores red on process.",
        },
      ],
    },
  },
{
    slug: "seven-questions-before-hiring-web-studio",
    title: "Seven questions to ask before you hire a web studio",
    excerpt: "Seven questions that separate studios who ship from studios who sell — and the answers that tell you which is which.",
    intro:
      "Most studios can show you a portfolio. Few can show you how they think. The seven questions below reveal whether a studio has a repeatable process, owns its outcomes, and treats your budget like their own. If the answers are vague, the work will be too.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 6,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The rule we write by",
        text: "A blog that only publishes what it can prove.",
        source: "The Echoes plan",
      },
      {
        kind: "link",
        label: "How we run projects (no black boxes)",
        href: "/capabilities/websites",
        text: "Our build process, in public — milestones, owners, and the evidence we ship at each gate.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "1. What is your definition of done — and who signs it?",
      },
      {
        kind: "p",
        text: "A studio that ships has a written Definition of Done (DoD) that covers code quality, accessibility, performance budgets, content completeness, and stakeholder sign-off. If the answer is \"when the client is happy,\" there is no standard — only a moving target.",
      },
      {
        kind: "h2",
        text: "2. Who owns the repository, the domain, and the analytics from day one?",
      },
      {
        kind: "p",
        text: "You should own the Git remote, the DNS zone, and the GA4/GTM containers before a single line of code is written. A studio that insists on holding any of these hostage is building leverage, not a partnership.",
      },
      {
        kind: "h2",
        text: "3. How do you scope, and what happens when scope changes?",
      },
      {
        kind: "p",
        text: "Look for a change-control process: written change requests, impact on timeline and budget, and a single decision-maker on your side. Studios without a process say \"we'll figure it out\" — which means you pay twice.",
      },
      {
        kind: "h2",
        text: "4. What performance budget do you commit to, and how do you prove it?",
      },
      {
        kind: "p",
        text: "A credible answer cites specific Core Web Vitals targets (LCP < 2.5s, INP < 200ms, CLS < 0.1) and shows Lighthouse CI or WebPageTest results from the last three launches. \"It feels fast\" is not a budget.",
      },
      {
        kind: "h2",
        text: "5. How do you handle content — do you write, structure, and migrate it?",
      },
      {
        kind: "p",
        text: "Content is the most common blocker. A studio that treats content as \"the client's problem\" will deliver a beautiful empty shell. Ask for their content model, migration plan, and whether they provide a content strategist or copywriter.",
      },
      {
        kind: "h2",
        text: "6. What does post-launch support actually include — and for how long?",
      },
      {
        kind: "p",
        text: "Get it in writing: SLA response times, what \"bug\" vs. \"enhancement\" means, whether CMS training is included, and who pays for dependency updates. A 30-day warranty with no SLA is a handoff, not support.",
      },
      {
        kind: "h2",
        text: "7. Can you show me a project that went wrong — and what you changed?",
      },
      {
        kind: "p",
        text: "This is the best filter. A studio that cannot name a failure, the root cause, and the process change that followed has either never shipped anything hard or has never learned from it. The answer tells you more than any case study.",
      },
    ],
    takeaway: {
      title: "The seven-question cheat sheet",
      text: "Paste this into your next discovery call. If a studio answers all seven with specifics, they are worth a second conversation.",
      items: [
        "Definition of Done — written, shared, signed",
        "You own repo, DNS, analytics from day one",
        "Change control with impact assessment",
        "Core Web Vitals targets + CI proof",
        "Content model, migration, and who writes",
        "Post-launch SLA, not a vague warranty",
        "A named failure + the process fix",
      ],
    },
    caveats: [
      "These questions filter for process maturity, not creative fit. A studio can pass all seven and still not match your aesthetic.",
      "The list is biased toward technical delivery — brand-only or strategy-only engagements need different filters.",
      "We are a studio. The questions reflect how we operate; other valid models exist.",
      "No question replaces a paid discovery sprint. These are a pre-qualifier, not a contract.",
    ],
    related: [
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
      { slug: "anatomy-of-an-echoes-note", title: "The anatomy of an Echoes note" },
    ],
    cta: { label: "See how we run projects", href: "/capabilities/websites" },
    faq: [
      {
        q: "What if a studio refuses to answer one of these?",
        a: "That is data. A studio that treats reasonable due diligence as adversarial will treat your project the same way. Walk away.",
      },
      {
        q: "Do I need to ask all seven?",
        a: "Ask the three that matter most to your risk profile. If those three are solid, the other four usually are too.",
      },
      {
        q: "Are these questions only for web studios?",
        a: "They transfer to any technical delivery partner — app shops, platform implementers, dev agencies. Swap \"Core Web Vitals\" for the relevant quality bar.",
      },
    ],
  },
{
    slug: "when-you-dont-need-a-custom-website",
    title: "When you don't need a custom website — and what to do instead",
    excerpt: "Most small businesses need a landing page, not a rebuild. If your traffic is under 1,000 visits/month and your conversion path fits a single form, hire nothing — use a hosted page, a template, or a one-page builder. The studio says this openly.",
    intro:
      "If your site has fewer than 1,000 visits a month, a single conversion path, and no custom backend, you do not need a studio. A hosted landing page (Carrd, Webflow, or a well-chosen WordPress template), a simple form, and a hand-edited sitemap is almost always faster, cheaper, and easier to maintain. This note says that plainly — including the cases where we say no to our own work.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "What this note says outright",
        text: "If your site fits a single form and your traffic is under 1,000 visits a month, hire nothing.",
        source: "This studio's own intake filter",
      },
      {
        kind: "link",
        label: "The build process (for when it does make sense)",
        href: "/capabilities/websites",
        text: "What a studio build actually includes — so you can compare it honestly to the alternatives.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "The three conditions that make a custom site unnecessary",
      },
      {
        kind: "ul",
        items: [
          "Your traffic is under ~1,000 visits/month — there is nothing to optimize for.",
          "Your conversion path is a single action (contact form, booking, purchase) — one page handles it.",
          "You have no custom backend, multi-language, or integration requirement — templates cover this.",
        ],
      },
      {
        kind: "h2",
        text: "What to use instead — ranked by effort",
      },
      {
        kind: "ol",
        items: [
          "A hosted single-page builder (Carrd, Framer, Webflow landing pages) — live in hours, no deploy pipeline.",
          "A well-built WordPress or Squarespace template — more design control, still no custom code.",
          "A simple static site (a single HTML file with a form endpoint) — fastest, most durable, zero dependencies.",
        ],
      },
      {
        kind: "h2",
        text: "When a studio does make sense",
      },
      {
        kind: "p",
        text: "When traffic justifies optimization, when the conversion path spans multiple steps (configurator, account, checkout, dashboard), when you own content that must be structured for search and feeds, or when your brand requires a design that templates cannot approximate — that is when a custom site earns its cost.",
      },
      {
        kind: "h2",
        text: "The honest caveat we give our own clients",
      },
      {
        kind: "p",
        text: "We turn down engagements that fit the three conditions above. We say it in writing, before any proposal is drafted. That is the Plainly tag — nothing to sell in the sentence.",
      },
    ],
    takeaway: {
      title: "The no-build checklist",
      text: "Run these three checks before requesting a proposal. If all three are yes, do not hire a studio.",
      items: [
        "Traffic < 1,000/month — nothing to optimize",
        "Single conversion action — one page handles it",
        "No custom backend, multi-language, or integration — templates cover it",
      ],
    },
    caveats: [
      "This note reflects the studio's own intake filter, not an industry standard. Other agencies may set different thresholds.",
      "The traffic figure is approximate. A business with 800 highly qualified visits may justify more investment than one with 2,000 casual visits.",
      "We are a studio recommending not to hire us. That is not false modesty — it is the standard we write by.",
      "A custom site is not always overkill for high-traffic single-page needs; design quality and load speed still matter.",
    ],
    related: [
      { slug: "seven-questions-before-hiring-web-studio", title: "Seven questions to ask before you hire a web studio" },
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
    ],
    cta: { label: "Read our build process (for when it does apply)", href: "/capabilities/websites" },
    faq: [
      {
        q: "Does this mean you won't take my project?",
        a: "Not necessarily. We filter on the three conditions. If any is false — higher traffic, multi-step conversion, custom backend, or design that templates cannot match — a studio build is a reasonable investment.",
      },
      {
        q: "Is this just false modesty to sound trustworthy?",
        a: "No. The Plainly tag requires a statement that does not sell anything in the sentence. Recommending not to hire is exactly that — and it is the standard every Plainly note must meet.",
      },
    ],
  },
{
    slug: "website-cost-2026-where-money-goes",
    title: "How much a website costs in 2026 — and where the money actually goes",
    excerpt: "A practical breakdown of 2026 website prices by approach — DIY, freelancer, agency — with the ongoing costs nobody quotes you and the three-year total that decides whether you overpaid.",
    intro:
      "In 2026 a website costs $0–$500/month DIY, $1,500–$10,000 via freelancer, or $10,000–$100,000+ via agency — but the build is only half the bill. Hosting, maintenance, security, and iteration over three years often match or exceed the original build (2.0–3.4× multiplier). A realistic small-business plan: $3,000–$15,000 build plus $1,100–$5,000/year running costs, with 30–45% of first-year budget reserved for post-launch iteration.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 8,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "2026 price bands by approach (USD)",
        values: [
          { label: "DIY / builder (first year)", value: "$0 – $600" },
          { label: "DIY / builder (annual ongoing)", value: "$200 – $600" },
          { label: "Freelancer build", value: "$1,000 – $10,000" },
          { label: "Freelancer maintenance (annual)", value: "$500 – $2,500" },
          { label: "Agency build", value: "$10,000 – $100,000+" },
          { label: "Agency maintenance (annual)", value: "$3,600 – $50,000" },
          { label: "Hosting (monthly)", value: "$2 – $1,000" },
          { label: "Domain .com (annual)", value: "$10 – $25" },
          { label: "Three-year total multiplier", value: "2.0× – 3.4× build cost" },
        ],
      },
      {
        kind: "link",
        label: "WebFX 2026 pricing survey (build, hosting, maintenance)",
        href: "https://www.webfx.com/web-design/pricing/website-costs/",
        text: "WebFX 2026 website cost data — build ranges, hosting tiers, maintenance averages",
      },
      {
        kind: "link",
        label: "GoodFirms 2026 web development firm survey (300+ firms, 31 countries)",
        href: "https://www.goodfirms.co/resources/website-construction-cost-survey",
        text: "GoodFirms 2026 survey — 63% of firms quote $1,000–$15,000 fixed-price projects",
      },
      {
        kind: "link",
        label: "Digital Applied 2026 three-year cost of ownership study",
        href: "https://www.digitalapplied.com/blog/website-development-cost-2026-complete-pricing-data",
        text: "Digital Applied 2026 — $28K corporate site = $65K–$95K over three years (2.3–3.4×)",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "The answer first: what you will actually pay",
      },
      {
        kind: "p",
        text: "The sticker price of a website is not what it costs. In 2026, a small-business site built by a freelancer runs $3,000–$12,000 upfront. The same site owned for three years — hosting, maintenance, security, content updates, and the iteration that keeps it from decaying — lands between $9,000 and $40,000 total. The build is the down payment; the ongoing bill is the mortgage.",
      },
      {
        kind: "h2",
        text: "Three paths, three price structures",
      },
      {
        kind: "h3",
        text: "1. DIY with a builder (Wix, Squarespace, WordPress.com)",
      },
      {
        kind: "p",
        text: "First year: $0–$600. Annual ongoing: $200–$600. You pay for the platform subscription (bundles hosting, SSL, CDN, templates), a domain ($10–$25/year), and any premium add-ons. The trade-off: you stay inside someone else's layout, migration later costs $700–$6,000, and you hit feature ceilings fast.",
      },
      {
        kind: "h3",
        text: "2. Freelancer (custom theme or heavy template customization)",
      },
      {
        kind: "p",
        text: "Build: $1,000–$10,000. Typical small business (10–15 pages): $3,000–$7,000. E-commerce (25+ products): $5,000–$15,000. Annual maintenance: $500–$2,500. The risk concentrates in one person — if they disappear, support stalls. Most freelancers still start from a template; ask what is custom and what is adapted.",
      },
      {
        kind: "h3",
        text: "3. Agency (strategy, design, development, ongoing support)",
      },
      {
        kind: "p",
        text: "Build: $10,000–$100,000+. Annual maintenance: $3,600–$50,000. You pay for project management, QA, multiple roles, and vendor continuity. Overhead is real: agencies need $300K–$500K/year billings to break even. The upside: integrated design-dev-strategy, and someone to call when something breaks at 2 AM.",
      },
      {
        kind: "h2",
        text: "Where the money goes — line items nobody itemizes",
      },
      {
        kind: "ul",
        items: [
          "Discovery & sitemap: $500–$2,000 (meetings, wireframes, brand docs)",
          "Design: $1,500–$5,000 (mockups, revisions, design system vs. styled template)",
          "Development: $2,000–$30,000+ (CMS integration, responsive templates, custom functionality)",
          "E-commerce integration: $1,500–$15,000 (payments, shipping, inventory, tax)",
          "SEO & analytics setup: $500–$3,000 (schema, GA4, Search Console, tracking plan)",
          "Performance & Core Web Vitals: $500–$5,000 (image pipeline, critical CSS, edge caching, Lighthouse testing)",
          "QA, security hardening, accessibility: $500–$5,000",
          "Hosting + CDN (annual): $50–$6,000+ (shared → managed cloud → enterprise)",
          "Maintenance retainer (monthly): $100–$2,000+ (updates tested, backups, monitoring, support hours)",
          "Content & iteration (post-launch): 30–45% of first-year budget — the sites that get nothing after launch lose 20–35% organic traffic within 18 months",
        ],
      },
      {
        kind: "h2",
        text: "The ongoing bill that rivals the build",
      },
      {
        kind: "p",
        text: "Digital Applied's 2026 study puts it plainly: a $28,000 corporate site costs $65,000–$95,000 across three years (2.3–3.4× multiplier). The line items: hosting ($2–$1,000/month), domain ($10–$25/year), SSL (free with most hosts, otherwise up to $1,500/year), managed maintenance ($50–$500/month), business email ($1–$27/user/month). Sites receiving zero post-launch investment decay within 18–24 months.",
      },
      {
        kind: "h2",
        text: "What drives the price up — and what doesn't",
      },
      {
        kind: "ul",
        items: [
          "Custom functionality (booking, portals, calculators, gated content) — adds dev hours a template cannot absorb",
          "Third-party integrations (CRM, ERP, payment, inventory) — the single biggest driver of scope creep",
          "Content volume — 60 product pages cost more to build and populate than 6 service pages, regardless of design",
          "Design ambition — custom illustration, animation, interactive elements are worth it for some brands and unnecessary for others",
          "Compliance (HIPAA-adjacent, finance, WCAG/ADA) — adds QA and development time",
          "What does NOT move the needle: a 'custom' design system quoted under $6,000 is usually a reused one with light edits",
        ],
      },
      {
        kind: "h2",
        text: "How to compare quotes fairly",
      },
      {
        kind: "ol",
        items: [
          "Demand a three-year total cost projection (build + hosting + maintenance + iteration reserve).",
          "Ask what is custom vs. adapted from a template — most 'custom' builds start from a theme.",
          "Clarify maintenance scope: tested updates, off-site backups, security monitoring, support hours, response SLA.",
          "Check hosting markup: agencies often resell at 3–5× retail ($15/month droplet → $100/month billed).",
          "Verify ownership: who holds the domain, server credentials, and CMS admin access?",
          "Budget 15–20% of build cost annually for maintenance even if the site 'doesn't need changes' — security patches and browser shifts happen regardless.",
        ],
      },
    ],
    takeaway: {
      title: "The three-year budget checklist",
      text: "Use this to pressure-test any quote before you sign.",
      items: [
        "Build quote + itemized scope (what is custom, what is template)",
        "Hosting at retail price, not agency markup",
        "Maintenance retainer with tested updates, backups, monitoring, and defined support hours",
        "Iteration reserve: 30–45% of first-year budget for content, measurement, and improvements",
        "Domain, SSL, email in your name — not the vendor's",
        "Exit clause: you get credentials and a clean handoff if you switch vendors",
      ],
    },
    caveats: [
      "These are 2026 USD ranges from public surveys (WebFX, GoodFirms, Digital Applied) and vendor pricing pages — not quotes for your specific project.",
      "Regional labor arbitrage can swing headline rates by up to 4×, though savings narrow once a project needs heavy design iteration, accessibility, or close collaboration.",
      "The three-year multiplier (2.0–3.4×) assumes professional maintenance; DIY maintenance lowers the cash cost but raises the time cost and risk.",
      "This note has nothing to sell — it is a buyer-facing guide. The studio builds websites; the prices here are the market context, not our rate card.",
      "AI tooling is compressing CSS, SEO tags, image optimization, and content drafting — agencies billing 2019 workflows are overcharging for hours AI now handles in minutes.",
    ],
    related: [
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
      { slug: "anatomy-of-an-echoes-note", title: "The anatomy of an Echoes note" },
    ],
    cta: { label: "See how we build sites with transparent pricing", href: "/capabilities/websites" },
    faq: [
      {
        q: "What is the cheapest way to get a professional-looking website in 2026?",
        a: "A DIY builder (Squarespace, Wix, WordPress.com) on a mid-tier plan: $15–$50/month all-in, including hosting, SSL, CDN, and templates. You trade customization for speed and predictable cost.",
      },
      {
        q: "Why do ongoing costs often match or exceed the build?",
        a: "Hosting, security updates, content changes, performance tuning, and iteration are recurring. A site that gets zero investment after launch decays in 18–24 months and loses 20–35% organic traffic. The build is the down payment; ownership is the mortgage.",
      },
      {
        q: "How much should I budget annually for maintenance?",
        a: "Plan for 15–20% of the original build cost per year, even if nothing 'breaks.' Security patches, plugin updates, browser compatibility shifts, and content freshness all require attention.",
      },
      {
        q: "Is a freelancer cheaper than an agency?",
        a: "Sticker price: yes ($1,000–$10,000 vs $10,000–$100,000+). Risk: concentrated in one person. If they become unavailable, delivery and support stall. Agencies include project management, QA, and continuity — you pay for the bus factor.",
      },
      {
        q: "What is the 'Plainly' tag on this note?",
        a: "It means this note has nothing to sell in the sentence. It is a buyer-facing guide with sourced numbers and honest caveats — not a pitch, not a case study, not a lead magnet.",
      },
    ],
  },
  {
    slug: "how-ai-assistants-see-your-website",
    title: "How AI assistants see your website — and what to do about it",
    excerpt: "AI assistants don't read a site the way a person does. They read its text, structure and structured data, then quote from it. Here's how they see a website, with real query traces, and what a small business can do to be cited accurately.",
    intro: "AI assistants don't read a site the way a person does. They parse headings, paragraphs, list items and tables into separate chunks; evaluate each chunk for relevance; then stitch the best pieces from multiple sources into one synthesized answer. The result: your page is read section by section, not start to finish, and a section that only makes sense after reading the three above it gets dropped or mis-attributed. Here is how they see a website — with real query traces, crawler user-agents, and the specific fixes a small business can make.",
    tag: "Measured",
    theme: "AI",
    readTime: 9,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "What the GEO study measured (10,000 queries)",
        values: [
          {
            label: "Visibility lift from citations + quotations + statistics",
            value: "up to 40%"
          },
          {
            label: "Lift from authoritative citations alone",
            value: "~30–35%"
          },
          {
            label: "Title-question similarity, cited vs. ignored pages",
            value: "0.60 vs. 0.48"
          }
        ]
      },
      {
        kind: "code",
        label: "Real crawler user-agents",
        code: "GPTBot            (OpenAI — training + retrieval)\nClaudeBot         (Anthropic)\nOAI-SearchBot     (ChatGPT web search)\nPerplexityBot     (Perplexity's own index)\nGoogle-Extended   (Gemini grounding)"
      }
    ],
    body: [
      {
        kind: "h2",
        text: "How an AI assistant actually reads your page"
      },
      {
        kind: "p",
        text: "When a user asks ChatGPT (with web search on), Perplexity, Claude (with search), or Google's AI Overviews a question, the assistant does three things in sequence: retrieve, chunk, then quote."
      },
      {
        kind: "p",
        text: "Retrieve. Each platform pulls from a different index — ChatGPT's web search uses Bing via its own crawler, Perplexity runs its own index, Claude pulls from Brave Search, and Google draws from its own index. A template robots.txt copied from an old SEO guide is the most common failure mode: it lets Google through and silently blocks GPTBot and PerplexityBot."
      },
      {
        kind: "p",
        text: "Chunk. The assistant does not retrieve \"pages\"; it retrieves pieces — headings, paragraphs, list items, table rows — and evaluates each independently. Your H2 and H3 structure is how the machine decides where one idea ends and the next begins."
      },
      {
        kind: "p",
        text: "Quote. It picks the best chunks and synthesizes, quoting sentences, not pages. A claim that depends on three sections above it loses context the moment it is lifted out; a claim that fits in a single sentence, backed by a number, survives intact."
      },
      {
        kind: "h2",
        text: "What actually changes citation rates (measured)"
      },
      {
        kind: "ul",
        items: [
          "Authoritative external citations added — ~30–35% average lift in citation rate",
          "Named statistics with sources — ~28–31%",
          "Direct, quotable language — ~22–28%",
          "Question-matched headings — ~15–20%",
          "Technical depth added — ~10–15%"
        ]
      },
      {
        kind: "p",
        text: "The high-impact fixes are editorial, not technical. Adding a section of statistics backed by named studies does more than restructuring headings, and restructuring headings does more than simplifying language. Technical work (structured data, robots.txt, sitemap, canonical URLs) is the prerequisite; editorial work is the multiplier."
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "A seven-step checklist in order of measured impact.",
      items: [
        "Check robots.txt — confirm GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and Google-Extended are allowed.",
        "Audit structured data — Article, FAQPage, HowTo, BreadcrumbList, Organization, WebSite.",
        "Open each H2 with its answer — the first sentence carries the claim.",
        "Make each section self-contained and quotable.",
        "Back claims with named statistics — dates, units, named studies.",
        "Publish llms.txt at your site root as a lean manifest.",
        "Measure manually — ask each assistant your buyers' questions weekly and log who cites you."
      ]
    },
    caveats: [
      "This post measures how content is structured for citation, not whether it ranks in traditional search. Ranking and citation are related but not the same metric.",
      "The user-agent list and retrieval mechanisms reflect behavior as of October 2026; crawlers change names and indexes shift.",
      "No claim here is a guarantee of citation, referral traffic, or business outcome — the measured lift figures are averages from a synthetic query set.",
      "llms.txt is a proposal, not a documented ranking signal for any platform.",
      "This post does not cover every assistant — Bing Copilot, Gemini standalone, Apple Intelligence, and agentic browsers have different retrieval behaviors."
    ],
    related: [
      {
        slug: "shipping-the-evidence-tag",
        title: "Every Echoes note now carries its proof"
      },
      {
        slug: "anatomy-of-an-echoes-note",
        title: "The anatomy of an Echoes note"
      }
    ],
    cta: {
      label: "Read the SEO & Discoverability capability",
      href: "/capabilities/seo"
    },
    faq: [
      {
        q: "Does llms.txt actually help with citations?",
        a: "It is a proposal, not a ranking signal. It helps agents find your core pages quickly; it does not guarantee a citation. The measured high-impact fixes are editorial — cited statistics, direct answers, structured sections."
      },
      {
        q: "Should I test in just one AI assistant?",
        a: "No. Each platform uses a different index and crawler: ChatGPT (Bing + OAI-SearchBot), Perplexity (own index + PerplexityBot), Claude (Brave Search + ClaudeBot), Google AI Overviews (Google index + Google-Extended). Test in at least the ones your buyers use."
      },
      {
        q: "What if my site blocks AI crawlers by accident?",
        a: "It happens with template robots.txt files. Confirm GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and Google-Extended are allowed. A blocked bot means that platform cannot retrieve or quote your content."
      },
      {
        q: "Is GEO just SEO with different words?",
        a: "Partially. Google's official guidance says generative AI optimization is still SEO. The difference is the unit of optimization: a page for SEO, a section (quote) for GEO."
      }
    ]
  },
{
    slug: "how-lane-works",
    title: "We built a site assistant that only tells the truth: how Lane works",
    excerpt:
      "Lane answers only from published studio information — no invented prices, results or timelines — and never claims a handoff. Here's how it works and why it refuses to lie.",
    intro:
      "Lane is this site's guide. It answers only from published studio information — no invented prices, results or timelines — and it never claims to book a call or to have sent an inquiry. When it does not know, it says so and points you to the team. Here's how it works and why it refuses to lie.",
    tag: "Decided",
    theme: "AI",
    readTime: 6,
    date: "2026-10-08",
    author: "Agent Lane",
    evidence: [
      {
        kind: "code",
        label: "The source files",
        code: "src/components/lane/studioReply.ts\nsrc/components/lane/citations.ts",
      },
      {
        kind: "metrics",
        label: "Behavior verified against the source",
        values: [
          { label: "citePost()", value: "routes to a published Echoes post" },
          { label: "laneReply()", value: "never invents prices, results or timelines" },
          { label: "nextSteps()", value: "never claims a booking or a sent inquiry" },
        ],
      },
      {
        kind: "quote",
        label: "What Lane refuses to do",
        text: "Invent prices, results or timelines; claim a booking or a sent inquiry; give unverified advice.",
        source: "laneReply() — hard-wired in studioReply.ts",
      },
    ],
    body: [
      { kind: "h2", text: "How Lane answers" },
      {
        kind: "p",
        text: "Lane reads a visitor's message, checks the core guide intents (greeting, price, process, contact, work), then searches the citation index (`CITATIONS`) for a published Echoes post that answers the question. If it finds one, it returns the post's answer-first summary plus the link. If not, it falls back to published ranges and directs the visitor to Contact the team.",
      },
      {
        kind: "p",
        text: "The citation index (`src/components/lane/citations.ts`) enforces three rules: the slug must match the URL (`/echoes/<slug>`), the summary is 40–60 words from the actual post, and queries must not shadow another post or a core guide intent. The ingestion test (`tests/lane-ingestion.test.mjs`) fails if any of those break.",
      },
      { kind: "h2", text: "Why it refuses to lie" },
      { kind: "p", text: "Three rules are hard-wired:" },
      {
        kind: "ol",
        items: [
          "Only from published studio information. The citation index is the boundary; anything not in it is out of scope.",
          "Never claim a handoff, booking, or sent inquiry. The call intent explicitly says: Nothing has been booked or sent from this chat.",
          "Never invent prices, results, or timelines. Price answers quote the published pricing ranges; timelines say a quote is written, not promised.",
        ],
      },
      { kind: "h2", text: "What we rejected" },
      {
        kind: "ul",
        items: [
          "A freeform LLM that answers anything — it would invent, and the studio's promise is proof, not fluency.",
          "A chatbot that pretends to book — the nextSteps() actions are links only; nothing is sent.",
          "Hiding the citation index — the index is public in code so the constraint is verifiable.",
        ],
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "A truthful site guide is a design choice, not a model feature.",
      items: [
        "Lane's refusal to lie is enforced by the citation index, the answer-first intro contract, and the ingestion test — not by the model.",
      ],
    },
    caveats: [
      "Lane answers from published studio information only; it does not access project records or create tickets.",
      "It is not an AI model and not a person; for project-specific advice, contact the team.",
      "The citation rules are the studio's own honesty standard, not an industry standard.",
    ],
    related: [
      { slug: "ai-search-vs-google", title: "AI search vs Google: what's changing for small-business discovery" },
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
    ],
    cta: { label: "Browse Echoes", href: "/echoes" },
  },
  {
    slug: "local-business-schema-that-gets-found",
    title: "Structured data that actually helps a small business get found",
    excerpt: "LocalBusiness schema is not a ranking factor — but it is the only way to hand Google, Bing, and AI assistants clean, unambiguous facts about your business. Here is the markup that earns rich results, the properties that move the needle, and the honest caveats.",
    intro: "LocalBusiness schema does not directly boost rankings — Google has confirmed this repeatedly. What it does: it makes your business name, address, phone, hours, service area, and geo coordinates machine-readable so Google can cross-check them against your Google Business Profile. When the profile, the visible page, and the JSON-LD all agree, Google's confidence goes up. That confidence earns rich results (stars, hours, click-to-call in SERPs), Knowledge Panel eligibility, and citation in AI answers — 45% of consumers now use AI tools for local recommendations (BrightLocal 2026). The markup below is what actually ships on client sites that moved from SEO health scores of 31 and 52 to 90 (RMCM case studies).",
    tag: "Measured",
    theme: "Build",
    readTime: 8,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "What the data shows",
        values: [
          { label: "Rich result CTR vs. plain", value: "58% vs 41% (Milestone Research, 4.5M queries)" },
          { label: "Sites with zero structured data", value: "45.3% of 16,673 local sites audited (Atlantis Web 2026)" },
          { label: "Sites using LocalBusiness schema", value: "Only 31.6% of schema users — most use WebSite/WebPage which do nothing for local" },
          { label: "ChatGPT visibility lift from LocalBusiness", value: "+3.33 positions in controlled 10-week test (aeo.how 2026)" },
          { label: "AI Mode zero-click rate", value: "83% of queries answered without a click (Search Engine Land 2026)" }
        ]
      },
      {
        kind: "code",
        label: "Complete LocalBusiness JSON-LD (copy, adapt, validate)",
        code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Plumber\",\n  \"name\": \"Miller Plumbing & Heating\",\n  \"url\": \"https://www.millerplumbing.example/\",\n  \"telephone\": \"+1-555-219-4078\",\n  \"email\": \"service@millerplumbing.example\",\n  \"description\": \"Licensed plumbing and HVAC contractor serving greater Portland since 1998. Emergency service, water heater replacement, drain cleaning, and heat pump installation.\",\n  \"priceRange\": \"$$\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"412 SE Hawthorne Blvd\",\n    \"addressLocality\": \"Portland\",\n    \"addressRegion\": \"OR\",\n    \"postalCode\": \"97214\",\n    \"addressCountry\": \"US\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 45.5122,\n    \"longitude\": -122.6215\n  },\n  \"openingHoursSpecification\": [\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\"],\n      \"opens\": \"07:30\",\n      \"closes\": \"18:00\"\n    },\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": \"Friday\",\n      \"opens\": \"07:30\",\n      \"closes\": \"16:00\"\n    },\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": \"Saturday\",\n      \"opens\": \"08:00\",\n      \"closes\": \"14:00\"\n    }\n  ],\n  \"areaServed\": {\n    \"@type\": \"GeoCircle\",\n    \"geoMidpoint\": {\n      \"@type\": \"GeoCoordinates\",\n      \"latitude\": 45.5122,\n      \"longitude\": -122.6215\n    },\n    \"geoRadius\": \"25000\"\n  },\n  \"sameAs\": [\n    \"https://www.google.com/maps/place/Miller+Plumbing/@45.5122,-122.6215\",\n    \"https://www.facebook.com/millerplumbingportland\",\n    \"https://www.linkedin.com/company/miller-plumbing-heating\",\n    \"https://www.yelp.com/biz/miller-plumbing-portland\"\n  ],\n  \"hasMap\": \"https://www.google.com/maps/place/Miller+Plumbing/@45.5122,-122.6215\",\n  \"aggregateRating\": {\n    \"@type\": \"AggregateRating\",\n    \"ratingValue\": \"4.7\",\n    \"reviewCount\": \"127\",\n    \"bestRating\": \"5\",\n    \"worstRating\": \"1\"\n  }\n}"
      },
      {
        kind: "link",
        label: "Validate before you deploy",
        href: "https://search.google.com/test/rich-results",
        text: "Google Rich Results Test — paste your JSON-LD here first"
      },
      {
        kind: "link",
        label: "Full Schema.org LocalBusiness reference",
        href: "https://schema.org/LocalBusiness",
        text: "All subtypes and properties (Dentist, Electrician, HVACBusiness, LegalService, etc.)"
      }
    ],
    body: [
      { kind: "h2", text: "The four schema types that do almost all the work" },
      { kind: "p", text: "Everything else is situational. These four are the foundation every local business should ship:" },
      { kind: "ul", items: [
        "LocalBusiness (with the most specific subtype) — on homepage and contact page",
        "Service — on each service page, naming the exact service and area served",
        "Organization + sameAs — site-wide, connects your brand to its profiles across the web",
        "BreadcrumbList — site-wide, clean paths in search results and easier crawling"
      ]},
      { kind: "p", text: "Article schema matters if you publish content. FAQPage schema lost its Google rich result in May 2026 — keep it if you have real FAQs, but expect nothing visual. Review markup of your own business has been ignored as self-serving since 2019; mark up specific products or services instead." },
      { kind: "h2", text: "The non-negotiable properties (Google requires these)" },
      { kind: "ul", items: [
        "@type — Use the specific subtype: Dentist, Electrician, Plumber, HVACBusiness, LegalService, AutoRepair, Restaurant, HairSalon, RealEstateAgent, ProfessionalService, Store, HealthAndBeautyBusiness, Bakery. Generic LocalBusiness tells machines nothing useful.",
        "name — Your exact legal business name, character-for-character identical to your Google Business Profile.",
        "address — Full PostalAddress with streetAddress, addressLocality, addressRegion, postalCode, addressCountry.",
        "telephone — E.164 format (+1-555-219-4078). Not a formatted display number."
      ]},
      { kind: "h2", text: "The high-impact optional properties (these earn the rich results)" },
      { kind: "ul", items: [
        "openingHoursSpecification — Array of OpeningHoursSpecification objects. Group days with identical hours. This is what puts hours directly in the SERP.",
        "geo — GeoCoordinates with latitude and longitude. Get exact coordinates from Google Maps (right-click the pin → copy coordinates). This is the precise location signal for 'near me' queries.",
        "areaServed — Critical for service-area businesses without a storefront in every city. Use GeoCircle with geoMidpoint + geoRadius (meters), or an array of City/State/PostalCode objects. A Portland plumber declares areaServed as a 25km radius or lists ['Portland', 'Beaverton', 'Gresham', 'Lake Oswego'].",
        "aggregateRating — Average rating + review count. This is what triggers star rich snippets (15–35% CTR lift per Search Engine Land). Reviews must be genuine, published on your site, and visible to users. Do not fabricate."
      ]},
      { kind: "h2", text: "Service schema — the underrated one" },
      { kind: "p", text: "If you offer more than one service, Service schema (or OfferCatalog) lets you declare each one individually instead of leaving Google to infer from body copy. This matches you against searches like 'drain repair Portland' rather than guessing from paragraphs." },
      { kind: "code", label: "Service schema example (add to each service page)", code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Service\",\n  \"name\": \"Emergency Drain Cleaning\",\n  \"description\": \"24/7 emergency drain clearing for residential and light commercial. Hydro-jetting, camera inspection, and root removal.\",\n  \"provider\": {\n    \"@type\": \"LocalBusiness\",\n    \"@id\": \"https://www.millerplumbing.example/#business\"\n  },\n  \"areaServed\": {\n    \"@type\": \"GeoCircle\",\n    \"geoMidpoint\": { \"@type\": \"GeoCoordinates\", \"latitude\": 45.5122, \"longitude\": -122.6215 },\n    \"geoRadius\": \"25000\"\n  },\n  \"offers\": {\n    \"@type\": \"Offer\",\n    \"price\": \"149.00\",\n    \"priceCurrency\": \"USD\",\n    \"availability\": \"https://schema.org/InStock\"\n  }\n}"},
      { kind: "h2", text: "Implementation: pick your route" },
      { kind: "ul", items: [
        "WordPress: Rank Math or Yoast Local SEO generate LocalBusiness from a settings form. Service schema usually needs manual addition or a schema-specific plugin.",
        "Squarespace / Wix: Add basic structured data automatically. Accept pasted JSON-LD in site headers for the full version.",
        "Custom / static sites: Free JSON-LD generator (schema.org generators, technicalseo.com/tools/schema-markup-generator) + paste into <head>. Under an hour."
      ]},
      { kind: "h2", text: "The discipline that makes it work" },
      { kind: "ul", items: [
        "Match your Google Business Profile exactly — name, address, phone, hours. Not close. Identical. Mismatches are the #1 reason schema fails to produce results.",
        "One JSON-LD block per location. Each location gets unique name (with location identifier), address, telephone, geo, openingHoursSpecification, and url.",
        "Validate with Google Rich Results Test before deploying. Published schema with errors is worse than no schema — it confuses Google and blocks rich results.",
        "Monitor in Search Console → Enhancements → Structured Data. Fix validation errors the same week they appear."
      ]},
      { kind: "h2", text: "What this does not do" },
      { kind: "p", text: "Schema does not replace a Google Business Profile (32% of local pack weight). It does not replace reviews (16%). It does not replace on-page SEO (19%) or links (11%). It is the most controllable piece of that 19% on-page bucket — one-time implementation, immediate indexing signal, no ongoing cost." }
    ],
    takeaway: {
      title: "Ship this week, measure next month",
      text: "The minimum viable LocalBusiness implementation that earns rich results:",
      items: [
        "Pick your specific subtype (Plumber, Dentist, Electrician, etc.)",
        "Match name, address, phone, hours to your GBP character-for-character",
        "Add geo coordinates from Google Maps",
        "Add areaServed (GeoCircle for service-area, City array for multi-location)",
        "Add aggregateRating only if you have real reviews on your site",
        "Validate in Google Rich Results Test → deploy → monitor Search Console"
      ]
    },
    caveats: [
      "This post proves the markup pattern, not a client result. It contains no client work and no invented numbers.",
      "The CTR and visibility numbers come from third-party studies (Milestone, BrightLocal, Atlantis Web, aeo.how) — not our internal data. Methodology and sample sizes vary.",
      "LocalBusiness schema is not a direct ranking factor. The indirect path (entity confidence → rich results → CTR → behavioral signals → ranking) is real but not guaranteed.",
      "FAQPage rich results were removed by Google in May 2026. Review stars on your own business have been ignored since 2019. Do not implement expecting those visual features.",
      "AI citation lift (ChatGPT +3.33 positions) comes from one controlled test in landscaping/outdoor services. Your vertical may differ."
    ],
    related: [
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
      { slug: "anatomy-of-an-echoes-note", title: "The anatomy of an Echoes note" }
    ],
    cta: { label: "See how we build sites with schema baked in", href: "/capabilities/websites" },
    faq: [
      { q: "Is LocalBusiness schema a direct ranking factor?", a: "No. Google representatives have confirmed multiple times that structured data is not a direct ranking factor. The map pack is decided by relevance, distance, and prominence — with GBP carrying ~32% weight and website ~19% (Whitespark)." },
      { q: "Why bother if it's not a ranking factor?", a: "Because it earns rich results (58% CTR vs 41%), Knowledge Panel eligibility, and AI citation. 45% of consumers now use AI tools for local recommendations (BrightLocal 2026), and AI assistants parse structured data when they read your site." },
      { q: "Which subtype should I use?", a: "The most specific one that fits: Dentist, Electrician, Plumber, HVACBusiness, LegalService, AutoRepair, Restaurant, HairSalon, RealEstateAgent, ProfessionalService, Store, HealthAndBeautyBusiness, Bakery. If none fits, use LocalBusiness." },
      { q: "My business has multiple locations. One block or many?", a: "One JSON-LD block per location, each with unique name (include location identifier), address, telephone, geo, openingHoursSpecification, and url pointing to that location's page." },
      { q: "Can I mark up reviews from Google or Yelp in my schema?", a: "No. Reviews in schema must be genuine reviews published on your own website and visible to users. Fabricated or third-party-only reviews violate Google's guidelines and can trigger manual actions." }
    ]
  },
{
    slug: "ai-search-vs-google",
    title: "AI search vs Google: what's changing for small-business discovery",
    excerpt:
      "Ranking on page one no longer guarantees a click — an AI answer now sits on top of many Google results, and more questions go to ChatGPT and Perplexity instead of a list of blue links.",
    intro:
      "Google is still where most people search, but an AI-generated answer now sits at the top of many Google results — and more questions go to ChatGPT, Perplexity and others instead. For a small business, one thing changed: ranking on page one no longer guarantees a click, and getting quoted in the answer is becoming a second, separate game.",
    tag: "Plainly",
    theme: "AI",
    readTime: 8,
    date: "2026-10-09",
    evidence: [
      {
        kind: "metrics",
        label: "The numbers behind the shift (third-party estimates, 2025–2026)",
        values: [
          { label: "Google searches showing an AI Overview", value: "roughly 43–48%, up from ~15% in 2025 (BrightEdge / Similarweb; Google publishes no official figure)" },
          { label: "US Google searches ending with no click", value: "68% (SparkToro / Similarweb, early 2026)" },
          { label: "Click on a traditional result when an AI answer appears", value: "8% of searches, vs 15% without one (Pew Research, 68,879 real searches)" },
          { label: "ChatGPT weekly users", value: "900 million (OpenAI / TechCrunch, Feb 2026)" },
        ],
      },
      {
        kind: "link",
        label: "Primary source",
        href: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/",
        text: "Pew Research Center: people click less when an AI summary appears",
      },
      {
        kind: "link",
        label: "Primary source",
        href: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents",
        text: "Gartner: search volume to drop 25% by 2026 (a 2024 prediction)",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "The one thing that actually changed",
      },
      {
        kind: "p",
        text: "For years the rule was simple: rank on page one of Google and people find you. In 2026 that rule has a crack in it. When someone asks Google a question, an AI-written answer — Google calls it an AI Overview — now often appears above the ten blue links, and it answers the question before the visitor ever scrolls to a website. On top of that, a growing number of people never type into a search bar at all: they ask ChatGPT, Perplexity or another assistant and get a single, synthesized answer with a few named sources.",
      },
      {
        kind: "p",
        text: "The change is not that Google is gone. It is that discovery now has two layers — ranking (your position in the list) and citation (whether an AI answer names you). They overlap, but they are no longer the same thing.",
      },
      {
        kind: "h2",
        text: "How big is this, really?",
      },
      {
        kind: "p",
        text: "The honest answer: the direction is clear, the exact size is not. Google publishes no official number, so every figure below is an independent estimate, and they disagree with each other.",
      },
      {
        kind: "ul",
        items: [
          "Roughly 43–48% of Google searches now show an AI Overview, up from about 15% in 2025 (BrightEdge and Similarweb, early 2026).",
          "About 68% of US Google searches end without a single click (SparkToro / Similarweb, early 2026).",
          "When an AI Overview appears, people click a traditional result on 8% of searches, versus 15% without one — roughly half (Pew Research, a study of 68,879 real searches).",
          "ChatGPT passed 900 million weekly users in early 2026 (OpenAI).",
        ],
      },
      {
        kind: "p",
        text: "Read those as a map, not a verdict. The trend is one-way, but it is not uniform — and the next section is the part most summaries skip.",
      },
      {
        kind: "h2",
        text: "The part the headlines get wrong",
      },
      {
        kind: "p",
        text: "The click losses are concentrated on informational questions — \"what is X\", \"how do I Y\". If your traffic came from how-to articles and explainers, you are the most exposed. Buying-stage searches behave differently.",
      },
      {
        kind: "p",
        text: "When someone is ready to act — \"emergency plumber near me\", \"dentist in Bristol\", \"best CRM for my team\" — the AI summary often does not finish the job. A 2025 Whitespark study found the local pack still appears on 93% of local-intent searches, while AI Overviews appear on only about 15% of them. The opposite is true for informational searches, where AI Overviews show up on over 90%.",
      },
      {
        kind: "p",
        text: "So the small businesses losing the most traffic are the ones that built their discovery on informational content. The local service business whose customers search with \"near me\" intent is much less exposed today.",
      },
      {
        kind: "h2",
        text: "What actually gets you cited",
      },
      {
        kind: "p",
        text: "Being quoted in an AI answer is becoming its own visibility game, and it rewards a different kind of clarity. The practical levers, in rough order of impact:",
      },
      {
        kind: "ol",
        items: [
          "Answer first, on the page. Put a plain, self-contained answer to each customer question at the top of the page, not buried three paragraphs down. AI engines extract passages, not whole articles.",
          "Complete your Google Business Profile. It is the single biggest source for local AI answers — categories, services, hours, photos, and a steady stream of real reviews.",
          "Be consistent everywhere. The same name, address and phone number on your site, your profile and every directory. When sources disagree, the AI's confidence drops.",
          "Add structured data. FAQPage and LocalBusiness markup make your answers and your business facts machine-readable.",
          "Get on real lists and directories. \"Best [service] in [city]\" roundups and review sites are among the most-cited pages in AI answers.",
        ],
      },
      {
        kind: "p",
        text: "One specific fact most guides omit: ChatGPT reads Bing's index, not Google's. If Bing has not indexed your site, ChatGPT cannot cite it — so submit your site to Bing Webmaster Tools (it can import from Google in one click).",
      },
      {
        kind: "h2",
        text: "What not to bother with",
      },
      {
        kind: "ul",
        items: [
          "You cannot buy a citation. Anyone selling \"guaranteed AI placement\" is guessing, and keyword-stuffing your profile or page backfires.",
          "llms.txt is mostly ignored. Google has said it does not use it for AI Overviews, and the major AI crawlers skip it.",
          "Don't chase every new assistant. Prioritize Google (AI Overviews plus Business Profile), then ChatGPT, then Perplexity only if your customers actually use it.",
        ],
      },
      {
        kind: "h2",
        text: "The twenty-minute check",
      },
      {
        kind: "p",
        text: "You do not need a consultant to know where you stand. Once a month:",
      },
      {
        kind: "ol",
        items: [
          "Search your top ten customer questions in a private browser window. Note which ones show an AI answer, and whether it names you.",
          "Ask ChatGPT, Perplexity and Google the same questions. Log who gets cited — it is the only honest AI-visibility report available today.",
          "Check that your name, address and phone number are identical on your site, your Google profile and your top three directories.",
          "Confirm your site is in Bing Webmaster Tools and that Bing has indexed your key pages.",
          "Fix the worst gap first — usually the answer-first copy or the stale profile — then re-check in a month.",
        ],
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Discovery now has two layers. Rank for clicks; be quotable for citations.",
      items: [
        "Ranking on page one no longer guarantees a click — an AI answer often sits on top.",
        "The pain is concentrated in informational searches; \"near me\" and buying searches are far less affected.",
        "The highest-return moves are unglamorous: answer-first copy, a complete Google Business Profile, consistent details, and schema.",
        "Once a month, ask the AI assistants your own top questions and log whether you are cited.",
      ],
    },
    caveats: [
      "Every percentage here is a third-party estimate. Google publishes no official share, and independent trackers disagree (roughly 43% vs 48% for AI Overview coverage).",
      "Most of the data is US-based; your market, language and industry may differ.",
      "AI referral traffic is still a small share of total visits even though it converts better — this is a growing trend to prepare for, not a sudden windfall to bank on.",
      "Local \"near me\" and transactional searches are far less affected than informational ones, so your exposure depends heavily on what kind of searches bring you customers.",
      "Being cited does not guarantee a click or a sale; it is a visibility layer alongside ranking, not a replacement for it.",
      "This is a plain-language guide, not a prescription. We are a studio, not a search consultancy, and nothing here promises a specific outcome.",
    ],
    related: [
      { slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" },
      { slug: "core-web-vitals-small-business", title: "Core Web Vitals for a small business site, in plain English" },
    ],
    cta: { label: "Browse Echoes", href: "/echoes" },
    faq: [
      {
        q: "Is Google going away?",
        a: "No. Google still handles roughly 90% of search. What changed is that an AI answer now sits on top of many Google results, and more questions go to ChatGPT, Perplexity and others instead of a list of links.",
      },
      {
        q: "Will AI search kill my website traffic?",
        a: "Unevenly. Informational content (\"what is\", \"how to\") is summarized in place and loses the most clicks. Buying and \"near me\" searches still send people to businesses, and they are far less affected today.",
      },
      {
        q: "What is the single most important thing I can do?",
        a: "Make your answers easy to extract: put a plain, self-contained answer at the top of each service page, keep your Google Business Profile complete and current, and make your name, address and phone number identical everywhere.",
      },
      {
        q: "Can I pay to be cited in AI answers?",
        a: "No. Citations cannot be bought, and anyone selling guaranteed AI placement is guessing. Keyword-stuffing and fake reviews backfire. The signals are earned: clear answers, real reviews, and consistent details.",
      },
      {
        q: "Do I need to be on ChatGPT and Perplexity right now?",
        a: "Prioritize in order: Google (AI Overviews plus your Business Profile), then ChatGPT (which reads Bing's index, so get indexed there), then Perplexity only if your customers actually use it.",
      },
    ],
    howTo: {
      steps: [
        {
          name: "Search your top questions",
          text: "Run your ten most common customer questions in a private browser window and note which show an AI answer, and whether it names you.",
        },
        {
          name: "Ask the assistants directly",
          text: "Pose the same questions to ChatGPT, Perplexity and Google and log who gets cited.",
        },
        {
          name: "Check for consistency",
          text: "Confirm your name, address and phone number match on your site, your Google Business Profile and your top directories.",
        },
        {
          name: "Get indexed by Bing",
          text: "Submit your site in Bing Webmaster Tools (import from Google in one click) so ChatGPT can cite you.",
        },
        {
          name: "Fix the worst gap and re-check",
          text: "Address the biggest gap — usually answer-first copy or a stale profile — then repeat the check in a month.",
        },
      ],
    },
  }
];

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function postHref(slug: string): string {
  return `/echoes/${slug}`;
}

/** The most recent date across posts, for the hub's sitemap lastmod. */
export function latestPostDate(): string {
  return POSTS.reduce((latest, post) => (post.date > latest ? post.date : latest), POSTS[0]?.date ?? "");
}

/* ---------------------------------------------------------------------------
 * Inline text: `[label](url)` becomes a link; everything else is text.
 * The page maps these parts to JSX, the feeds to HTML.
 * ------------------------------------------------------------------------- */

export type InlinePart = { type: "text"; text: string } | { type: "link"; href: string; label: string };

const INLINE_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;

export function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  INLINE_LINK.lastIndex = 0;
  while ((match = INLINE_LINK.exec(text))) {
    if (match.index > last) parts.push({ type: "text", text: text.slice(last, match.index) });
    parts.push({ type: "link", href: match[2], label: match[1] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: "text", text: text.slice(last) });
  if (parts.length === 0) parts.push({ type: "text", text });
  return parts;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** `[label](url)` → escaped `<a>` markup, absolute links resolved against siteUrl. */
export function inlineHtml(text: string, siteUrl: string): string {
  return parseInline(text)
    .map((part) => {
      if (part.type === "text") return escapeHtml(part.text);
      const href = part.href.startsWith("/") ? `${siteUrl}${part.href}` : part.href;
      return `<a href="${escapeHtml(href)}">${escapeHtml(part.label)}</a>`;
    })
    .join("");
}

/* ---------------------------------------------------------------------------
 * HTML for the feeds (RSS <content:encoded> and JSON Feed content_html).
 * ------------------------------------------------------------------------- */

export function postHtml(post: Post, siteUrl: string): string {
  const blocks = post.body
    .map((block) => {
      switch (block.kind) {
        case "h2":
          return `<h2>${escapeHtml(block.text)}</h2>`;
        case "h3":
          return `<h3>${escapeHtml(block.text)}</h3>`;
        case "p":
          return `<p>${inlineHtml(block.text, siteUrl)}</p>`;
        case "ul":
          return `<ul>${block.items.map((item) => `<li>${inlineHtml(item, siteUrl)}</li>`).join("")}</ul>`;
        case "ol":
          return `<ol>${block.items.map((item) => `<li>${inlineHtml(item, siteUrl)}</li>`).join("")}</ol>`;
        case "quote":
          return `<blockquote><p>${inlineHtml(block.text, siteUrl)}</p>${block.cite ? `<footer>${escapeHtml(block.cite)}</footer>` : ""}</blockquote>`;
        case "code":
          return `<pre><code>${escapeHtml(block.code)}</code></pre>`;
      }
    })
    .join("\n");

  const evidence = post.evidence
    .map((item) => {
      const label = `<p><strong>${escapeHtml(item.label)}</strong></p>`;
      switch (item.kind) {
        case "metrics":
          return `${label}<ul>${item.values.map((v) => `<li>${escapeHtml(v.label)}: ${escapeHtml(v.value)}</li>`).join("")}</ul>`;
        case "code":
          return `${label}<pre><code>${escapeHtml(item.code)}</code></pre>`;
        case "link": {
          const href = item.href.startsWith("/") ? `${siteUrl}${item.href}` : item.href;
          return `${label}<p><a href="${escapeHtml(href)}">${escapeHtml(item.text)}</a></p>`;
        }
        case "quote":
          return `${label}<blockquote><p>${escapeHtml(item.text)}</p>${item.source ? `<footer>${escapeHtml(item.source)}</footer>` : ""}</blockquote>`;
        case "file": {
          const href = item.href.startsWith("/") ? `${siteUrl}${item.href}` : item.href;
          return `${label}<p><a href="${escapeHtml(href)}">${escapeHtml(item.name)}</a></p>`;
        }
      }
    })
    .join("\n");

  const takeaway = post.takeaway
    ? `<h2>${escapeHtml(post.takeaway.title)}</h2><p>${inlineHtml(post.takeaway.text, siteUrl)}</p>${
        post.takeaway.items ? `<ul>${post.takeaway.items.map((item) => `<li>${inlineHtml(item, siteUrl)}</li>`).join("")}</ul>` : ""
      }`
    : "";

  const caveats = post.caveats.length
    ? `<h2>Honest caveats</h2><ul>${post.caveats.map((item) => `<li>${inlineHtml(item, siteUrl)}</li>`).join("")}</ul>`
    : "";

  return `<p>${inlineHtml(post.intro, siteUrl)}</p><div class="evidence">${evidence}</div>${blocks}${takeaway}${caveats}`;
}

/* ---------------------------------------------------------------------------
 * Structured data: Article + BreadcrumbList, plus FAQPage / HowTo when present.
 * ------------------------------------------------------------------------- */

export function postSchema(siteUrl: string, post: Post): Record<string, unknown> {
  const url = `${siteUrl}/echoes/${post.slug}`;
  const author = post.author ?? ECHOES_AUTHOR;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: "en-US",
      articleSection: post.theme,
      author: { "@type": "Person", name: author },
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: [`${url}/opengraph-image`],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Echoes", item: `${siteUrl}/echoes` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq && post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  if (post.howTo) {
    graph.push({
      "@type": "HowTo",
      name: post.title,
      step: post.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* ---------------------------------------------------------------------------
 * Feeds: RSS 2.0 and JSON Feed 1.1.
 * ------------------------------------------------------------------------- */

const RFC822_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** `yyyy-mm-dd` (or an ISO datetime) → RFC 822, e.g. `Wed, 08 Oct 2026 00:00:00 GMT`. */
export function rfc822Date(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return date;
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = RFC822_MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()];
  return `${weekday}, ${day} ${month} ${year} 00:00:00 GMT`;
}

export function rssXml(siteUrl: string, posts: Post[]): string {
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/echoes/${post.slug}`;
      const author = post.author ?? ECHOES_AUTHOR;
      const tagLine = `${post.tag} · ${post.theme} · ${readTimeLabel(post.readTime)}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${rfc822Date(post.date)}</pubDate>
      <description>${escapeXml(post.intro)}</description>
      <category>${escapeXml(post.tag)}</category>
      <category>${escapeXml(post.theme)}</category>
      <author>${escapeXml(author)}</author>
      <content:encoded><![CDATA[${postHtml(post, siteUrl)}<p><em>${escapeXml(tagLine)}</em> — <a href="${escapeXml(url)}">read the full note</a>.</p>]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const latest = posts.length ? rfc822Date(posts.reduce((a, b) => (b.date > a.date ? b : a)).date) : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Echoes — Botlane Studios</title>
    <link>${escapeXml(`${siteUrl}/echoes`)}</link>
    <atom:link href="${escapeXml(`${siteUrl}/echoes/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>A studio notebook, kept in public. Every note carries its proof.</description>
    <language>en-us</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <generator>Botlane Studios</generator>
${items}
  </channel>
</rss>
`;
}

export function jsonFeed(siteUrl: string, posts: Post[]): string {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Echoes — Botlane Studios",
    home_page_url: `${siteUrl}/echoes`,
    feed_url: `${siteUrl}/echoes/feed.json`,
    description: "A studio notebook, kept in public. Every note carries its proof.",
    language: "en-US",
    authors: [{ name: ECHOES_AUTHOR }],
    items: posts.map((post) => ({
      id: `${siteUrl}/echoes/${post.slug}`,
      url: `${siteUrl}/echoes/${post.slug}`,
      title: post.title,
      summary: post.intro,
      content_html: postHtml(post, siteUrl),
      date_published: `${post.date}T00:00:00Z`,
      date_modified: post.updated ? `${post.updated}T00:00:00Z` : `${post.date}T00:00:00Z`,
      tags: [post.tag, post.theme],
      authors: [{ name: post.author ?? ECHOES_AUTHOR }],
    })),
  };
  return JSON.stringify(feed, null, 2);
}
