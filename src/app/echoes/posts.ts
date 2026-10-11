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

import { BANDS, PRICE } from "../../lib/pricing";
import { ECHOES_AUTHOR, readTimeLabel } from "./echoes";

/** The five evidence tags. A post is not finished without one. */
export type EvidenceTag = "Measured" | "Built" | "Decided" | "Briefed" | "Plainly";

/** The themes a post can sit under (the existing Echoes topics plus AI). */
export type EchoTheme = "Strategy" | "Design" | "Build" | "Launch" | "AI";

export const EVIDENCE_TAGS: Record<EvidenceTag, { label: string; meaning: string }> = {
  Measured: { label: "Measured", meaning: "Real numbers — Lighthouse, Core Web Vitals, before and after." },
  Built: { label: "Built", meaning: "Real code, a live link, the actual file." },
  Decided: { label: "Decided", meaning: "A real decision, the options rejected, and why." },
  Briefed: { label: "Briefed", meaning: "A self-set brief, taken from brief to finished design, and labelled as a study." },
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
  /** Defaults to the studio byline (ECHOES_AUTHOR). */
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
    excerpt: "A comment system, a newsletter, and a light/dark theme toggle — rejected in favor of what the site is actually for.",
    intro:
      "We cut three features from our own site before they shipped: a comment system, a newsletter, and a light/dark theme toggle. Each seemed reasonable at first. Each would have pulled time from the work we actually sell. The decision rule was simple: if it does not serve the client-facing proof or the studio's own operating cadence, it does not ship.",
    tag: "Decided",
    theme: "Strategy",
    readTime: 4,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The filter we used",
        text: "If it does not serve the client-facing proof or the studio's operating cadence, it does not ship.",
        source: "Botlane Studios",
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
        text: "3. A theme toggle",
      },
      {
        kind: "p",
        text: "What we considered: a switch in the header between the dark design and a light version, remembered between visits.",
      },
      {
        kind: "p",
        text: "Why we rejected it: the site has one deliberate design — black, white and cobalt — and a toggle means designing, testing and maintaining a second one. It also adds JavaScript and a flash of the wrong theme on load.",
      },
      {
        kind: "p",
        text: "What we do instead: one theme, designed properly. The dark design is the brand, not a mode.",
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
      "These are our rejections for our site. A client project with different constraints may legitimately need comments, a newsletter, or a light and dark theme.",
      "We did not A/B test these. The decision was made on principle and maintenance cost, not conversion data.",
      "The comment system rejection assumes the evidence block is sufficient for verification. If readers disagree, the feeds are open — they can respond on their own sites.",
    ],
    related: [{ slug: "shipping-the-evidence-tag", title: "Every Echoes note now carries its proof" }],
    cta: { label: "See how we build sites this way", href: "/capabilities/websites" },
  },
  {
    slug: "why-we-publish-price-bands",
    title: "Why we publish price bands instead of \"contact us\"",
    excerpt: "We publish price ranges for websites and web apps because the first question a serious buyer has is whether they are in the right room, and a range answers it before anyone books a call.",
    intro: "We publish price bands, not exact quotes and not \"contact us\". The first question a serious buyer has is not \"how cheap are you\" but \"am I in the right room\", and a range answers it before anyone books a call. Every project is still a tailored written quote; the bands show where that quote is likely to land.",
    tag: "Decided",
    theme: "Strategy",
    readTime: 4,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "metrics",
        label: "The bands, as published on the pricing page",
        values: [
          ...BANDS.flatMap((group) => group.rows.map((row) => ({ label: `${group.name} · ${row.name}`, value: row.price }))),
          { label: "Brand identity · optional add-on", value: PRICE.brandIdentity },
        ],
      },
      {
        kind: "link",
        label: "Where the bands live",
        href: "/pricing",
        text: "The pricing page, with what each band covers.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "The decision",
      },
      {
        kind: "p",
        text: `Botlane Studios publishes price ranges for its two core offers and its one priced add-on. Websites start at ${PRICE.websitesFrom}. Web Apps start at ${PRICE.webAppsFrom}, after a paid discovery phase. Brand identity is an optional add-on at ${PRICE.brandIdentity}. They are ranges, not promises: the written proposal sets the actual price and scope.`,
      },
      {
        kind: "h2",
        text: "Why not \"contact us\"",
      },
      {
        kind: "p",
        text: "\"Contact us\" serves two legitimate functions — qualifying complex scopes and opening a relationship — but it does not serve transparency. A buyer comparing studios loses time for nothing, and a studio that hides its prices signals either that it does not know them or that it wants leverage in the negotiation. Neither is a good look for a practice that asks clients to trust it with their brand and product.",
      },
      {
        kind: "h2",
        text: "What the bands actually say",
      },
      {
        kind: "p",
        text: "Each band is tied to scope, not to the size of a client's budget. A Focused website is a small number of layouts built on an existing brand with copy the client supplies; a Signature site adds more layouts, a CMS and scoped custom motion. Web apps begin with paid discovery, because a build cannot be priced honestly before the workflow is understood. The bands are a filter, and filters work both ways.",
      },
    ],
    takeaway: {
      title: "The band is the filter",
      text: "Publish enough price information that the right clients can self-select, and be clear about where a range stops applying.",
      items: [
        "A price band is a filter, not a quote.",
        "Tie each band to scope, so a buyer can see what moves the price.",
        "Say plainly that the written proposal decides.",
      ],
    },
    caveats: [
      "These are ranges, not fixed prices. The written proposal sets the price and the scope, and it takes precedence over anything on this site.",
      "Third-party costs, such as hosting, domains or licences, are set out in the proposal, not in the bands.",
      "SEO programmes and AI integrations are quoted to scope; they have no published figure.",
      "\"Contact us\" is not wrong for every business. We just chose not to make it ours.",
    ],
    related: [
      { slug: "what-8000-buys", title: "What an $8,000 website quote should spell out" },
      { slug: "how-to-tell-good-web-design-quote-from-bad", title: "How to tell a good web design quote from a bad one" },
    ],
    cta: { label: "See the price guide", href: "/pricing" },
    faq: [
      {
        q: "Are these fixed prices?",
        a: "No. They are ranges. Every project is a tailored written quote, and the proposal decides.",
      },
      {
        q: "Why not \"contact us\" for everything?",
        a: "It hides information from serious buyers and slows down comparison. A published range lets both sides see quickly whether a conversation is worth having.",
      },
      {
        q: "What if my project is bigger than the bands?",
        a: "Complex websites are priced after discovery, and larger web apps are quoted in phases rather than as one fixed total.",
      },
    ],
  },
  {
    slug: "figma-to-nextjs-no-page-builder",
    title: "Designed in Figma, rebuilt by hand: why no page builder",
    excerpt: "The studio's site is designed in Figma and rebuilt in Next.js by hand — no Webflow, no Squarespace, no WordPress builder. The decision, the options we rejected, and the trade we accept.",
    intro: "The studio's site is designed in Figma and rebuilt in Next.js by hand. There is no Webflow, Squarespace, or WordPress builder in the middle. This is a decision, not an accident — it trades build speed for owning every pixel and never being blocked by a page builder's pricing or feature roadmap. Here is the decision, the rejected options, and the honest cost of it.",
    tag: "Decided",
    theme: "Design",
    readTime: 7,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "The design direction",
        text: "Design in Figma. Build in Next.js. Nothing in between.",
        source: "Botlane Studios"
      },
      {
        kind: "link",
        label: "The live site",
        href: "https://botlane.studio",
        text: "The rebuilt site — no page-builder markup."
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
            label: "Full design ownership",
            value: "Yes"
          }
        ]
      },
      {
        kind: "code",
        label: "The pattern",
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
          "No page-builder or CMS platform at runtime — almost every page is prerendered.",
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
        a: "A builder trades ownership for speed. For a studio whose site is the proof of its craft, owning every pixel matters more than the hours saved."
      },
      {
        q: "Doesn't hand-rebuilding take longer?",
        a: "Yes. We accept that cost because the site is a build, not a marketing tool that needs frequent edits."
      }
    ]
  },
  {
    slug: "forme-knitwear",
    title: "FORME: a knitwear label that has to feel tactile on a phone",
    excerpt: "FORME is a self-initiated study, not a client project: an identity for a quiet knitwear label that has to feel as tactile on a phone screen as it does in the hand.",
    intro: "FORME is a self-initiated study, not a client project. We set ourselves one problem: a quiet knitwear label that has to feel as tactile on a phone screen as it does in the hand. Here is the brief, the three choices the identity rests on, and what the study does not prove.",
    tag: "Briefed",
    theme: "Design",
    readTime: 4,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "quote",
        label: "The brief, in one line",
        text: "A quiet knitwear label that has to feel as tactile on a phone screen as it does in the hand.",
        source: "FORME, self-initiated study",
      },
      {
        kind: "link",
        label: "See the study",
        href: "/work#studies-title",
        text: "FORME on the Work page: poster, packaging, an embossed garment tag and a mobile storefront.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "What the brief asked for",
      },
      {
        kind: "p",
        text: "Knitwear is bought by touch. On a phone there is no touch, so the identity has to do that work: let texture and the garment lead, and keep everything else quiet enough not to compete with it.",
      },
      {
        kind: "h2",
        text: "The three choices",
      },
      {
        kind: "ol",
        items: [
          "A high-contrast serif wordmark, with a single F monogram for tags and embossing.",
          "Bone, black and one oxblood accent, so the clothes carry the colour.",
          "A storefront where product photography leads and type steps back.",
        ],
      },
      {
        kind: "h2",
        text: "Why those choices",
      },
      {
        kind: "p",
        text: "The monogram exists because a label lives on small things — a garment tag, an embossed card — where a full wordmark does not fit. The palette is restrained so it never fights the product. And the storefront gives the photography the space, because on a phone the photograph is the closest a visitor gets to the fabric.",
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Three questions from the study that apply to any product brand.",
      items: [
        "Write the brief as one sentence about how the product should feel, not what the site should contain.",
        "Check the identity at its smallest use — a tag, an icon, a favicon — before its largest.",
        "If the product has colour, let the brand step back from it.",
      ],
    },
    caveats: [
      "FORME is a self-initiated study, not a client project. There is no real label, no customers and no sales behind it.",
      "The images show the identity applied as a concept; they are not a working shop.",
      "No performance, accessibility or user measurements were taken. The study shows design thinking, not results.",
    ],
    related: [
      { slug: "northline-senior-not-cold", title: "NORTHLINE: senior, not cold — branding a consultancy" },
      { slug: "why-we-practise-on-imagined-clients", title: "Why we practise on imagined clients" },
    ],
    cta: { label: "See the Work page", href: "/work" },
  },
  {
    slug: "northline-senior-not-cold",
    title: "NORTHLINE: senior, not cold — branding a consultancy",
    excerpt: "NORTHLINE is a self-initiated study, not a client project: an identity for a strategy consultancy that needs to look senior without looking cold.",
    intro: "NORTHLINE is a self-initiated study, not a client project. The brief: a strategy consultancy that needs to look senior without looking cold. Here are the three choices the identity rests on, why we made them, and what the study does not prove.",
    tag: "Briefed",
    theme: "Strategy",
    readTime: 4,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "quote",
        label: "The brief, in one line",
        text: "A strategy consultancy that needs to look senior without looking cold.",
        source: "NORTHLINE, self-initiated study",
      },
      {
        kind: "link",
        label: "See the study",
        href: "/work#studies-title",
        text: "NORTHLINE on the Work page: office signage, a hardback report, business cards and a tablet website.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "What the brief asked for",
      },
      {
        kind: "p",
        text: "Consultancies tend to fail in one of two directions: corporate and forgettable, or trying so hard to look modern that they stop looking trustworthy. NORTHLINE had to read as experienced to a senior buyer while still feeling like people you would want in the room.",
      },
      {
        kind: "h2",
        text: "The three choices",
      },
      {
        kind: "ol",
        items: [
          "A single-stroke peak mark that still reads on a business card or a sign.",
          "Navy, silver and white, with one short line of copy: people, ideas, progress.",
          "Clear hierarchy across proposals, reports and the website, so the brand feels consistent wherever clients meet it.",
        ],
      },
      {
        kind: "h2",
        text: "Why those choices",
      },
      {
        kind: "p",
        text: "A consultancy is met mostly on paper and on screens it does not control — a proposal on a client's desk, a report in a board pack. So the mark is simple enough to survive a business card, the palette is restrained, and the real work of the identity is in the hierarchy of its documents, because that is where a buyer forms a view of the firm.",
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Three checks for any professional-services brand.",
      items: [
        "Design for where clients actually meet you — often a document, not the website.",
        "Test the mark at its smallest size first.",
        "Let consistency across touchpoints carry the seniority, rather than ornament.",
      ],
    },
    caveats: [
      "NORTHLINE is a self-initiated study, not a client project. There is no real firm and no clients behind it.",
      "The images show the identity applied as a concept, not production signage or printed material.",
      "Nothing was measured with real buyers. The study shows design thinking, not results.",
    ],
    related: [
      { slug: "forme-knitwear", title: "FORME: a knitwear label that has to feel tactile on a phone" },
      { slug: "why-we-practise-on-imagined-clients", title: "Why we practise on imagined clients" },
    ],
    cta: { label: "See the Work page", href: "/work" },
  },
{
    slug: "one-page-website-brief-template",
    title: "The one-page brief we write before anything is drawn",
    excerpt: "The template we use to force clarity before design starts — outcome, audience, constraints, non-negotiables, success criteria, and the decision needed today. Ungated Markdown download.",
    intro:
      "A brief that fits on one page forces the hard decisions before a single pixel is designed. This note publishes the template we use at Botlane Studios: eleven sections, from the outcome you are betting on to the decision needed today. The template is the takeaway — download it, adapt it, use it.",
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
        text: "We share this template before the first working session. The client fills in what they can; we fill in the rest together. The completed brief then feeds the written proposal, which is what sets the scope — so every design decision and scope question can be traced back to a line in it.",
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
      "This template reflects how Botlane Studios works. Larger organisations may need more formal governance.",
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
    excerpt: "Self-set studies are the studio's practice ground — not a substitute for client work, but an honest way to show how the studio thinks while it is new.",
    intro: "We practise on imagined clients because a studio needs a way to show its thinking before it has client work to show, and because a self-set brief exposes the whole process. We set the brief, choose the constraints and carry the design through ourselves — and we label every study as exactly that.",
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
        text: "Why a self-set brief shows the whole process"
      },
      {
        kind: "p",
        text: "A live project has constraints nobody chooses — deadlines, budgets, legacy systems — and that is good; it is the work. But client work often hides the design process: the brief is inherited and the outcome is negotiated. A self-set study shows the whole arc from brief to design, which is what the Briefed tag means."
      },
      {
        kind: "h2",
        text: "What it protects"
      },
      {
        kind: "ul",
        items: [
          "It keeps the standard visible while the studio is new and has no client work to show.",
          "It protects the habit of finishing — carrying a brief through to a considered design rather than a single polished image.",
          "It protects the honesty of what we show: because we wrote the brief, we cannot blame it on the client when something fails. The failure is ours, and that makes the evidence real."
        ]
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "The practice rule.",
      items: [
        "Practise on a self-set brief when real work isn't exposing the full process.",
        "Finish the arc from brief to design — that is the habit worth protecting.",
        "Own the failure: a brief you wrote yourself cannot be blamed on a client."
      ]
    },
    caveats: [
      "Imagined clients are not stand-ins for real ones. There is no negotiation, no budget pressure, no external stakeholder reviewing our work at the wrong moment.",
      "A self-set study shows craft, not commercial results. Every study on this site is labelled \"Self-initiated study · Not a client project\"."
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
    slug: "your-site-feels-slow-on-a-phone",
    title: "Your site feels slow on a phone — the five usual causes",
    excerpt: "Five common causes behind a site that feels slow on a phone, each tied to a Core Web Vital — from the hero image that delays LCP to the gap between lab and field data.",
    intro: "A phone-slow site is almost never one bug — it is usually one of five causes, and each maps to a measurable Core Web Vital. The hero image blocks Largest Contentful Paint, JavaScript hydration blocks Interaction to Next Paint, embeds shift the layout, unchunked JavaScript starves the main thread, and the numbers you measure in a lab rarely match what real visitors see. Here are the five, with Google's thresholds.",
    tag: "Plainly",
    theme: "Build",
    readTime: 9,
    date: "2026-10-08",
    evidence: [
      {
        kind: "metrics",
        label: "Google's thresholds the five causes miss",
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
        label: "The source",
        href: "https://web.dev/articles/vitals",
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
        text: "The largest element in the viewport is usually the hero image or headline, and Largest Contentful Paint measures exactly when it finishes painting. A full-resolution hero loaded late — no width/height, wrong format, no preload, and render-blocking CSS above it — pushes LCP past the 2.5 second threshold. It is one of the easiest causes to overlook and one of the cheapest to fix."
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
      "Thresholds are Google's published values (web.dev); they are a starting point, not a diagnosis."
    ],
    related: [
      {
        slug: "core-web-vitals-small-business",
        title: "Core Web Vitals for a small business site, in plain English"
      },
      {
        slug: "designing-for-reduced-motion",
        title: "Designing for reduced motion without killing the design"
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
    excerpt: "Core Web Vitals are three numbers Google uses to judge whether a site feels fast and stable: loading, response to a tap, and whether the page jumps. Here is what each means and what to do about it.",
    intro: "Core Web Vitals are three numbers Google uses to judge whether a site feels fast and stable to real people: how quickly the main content appears (LCP), how quickly the page responds to a tap (INP), and whether things jump around while it loads (CLS). This note explains each in plain language and what a small business owner should actually do about them.",
    tag: "Plainly",
    theme: "Launch",
    readTime: 6,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "metrics",
        label: "Google's thresholds (measured at the 75th percentile of real visits)",
        values: [
          { label: "Largest Contentful Paint (LCP)", value: "good ≤ 2.5 s · poor > 4 s" },
          { label: "Interaction to Next Paint (INP)", value: "good ≤ 200 ms · poor > 500 ms" },
          { label: "Cumulative Layout Shift (CLS)", value: "good ≤ 0.1 · poor > 0.25" },
        ],
      },
      {
        kind: "link",
        label: "The source",
        href: "https://web.dev/articles/vitals",
        text: "web.dev: Web Vitals",
      },
      {
        kind: "link",
        label: "Measure your own site",
        href: "https://pagespeed.web.dev/",
        text: "PageSpeed Insights",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "What Core Web Vitals actually are",
      },
      {
        kind: "p",
        text: "Google calls them \"Core Web Vitals\", but they are three questions every visitor asks without knowing it:",
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
        text: "Google uses them as one of many ranking signals. The better reason to care is simpler: visitors leave when a site feels slow or broken.",
      },
      {
        kind: "h2",
        text: "Largest Contentful Paint — the \"main thing\" metric",
      },
      {
        kind: "p",
        text: "LCP measures when the largest image or block of text in the first screen finishes painting. On most small business sites that is the hero image or the headline. Good is 2.5 seconds or less; over 4 seconds is rated poor. If it loads late, the visitor sees a blank or half-built page and may leave.",
      },
      {
        kind: "h2",
        text: "Interaction to Next Paint — the \"tap and wait\" metric",
      },
      {
        kind: "p",
        text: "INP replaced First Input Delay in March 2024. It measures how long the page takes to respond visibly when someone clicks a button, opens a menu or types in a field. Good is 200 milliseconds or less; over 500 is rated poor. Slow INP usually means JavaScript is keeping the browser busy — often third-party scripts such as chat widgets, or a heavy framework doing too much work up front.",
      },
      {
        kind: "h2",
        text: "Cumulative Layout Shift — the \"stop jumping\" metric",
      },
      {
        kind: "p",
        text: "CLS measures unexpected movement while the page loads. Good is 0.1 or less. The usual causes are images without set dimensions, ads or embeds that push content down when they arrive, and web fonts that reflow text when they swap in. Fixing CLS is often the cheapest win: give every image and embed its space before it loads.",
      },
      {
        kind: "h2",
        text: "What a small business owner should actually do",
      },
      {
        kind: "ol",
        items: [
          "Run PageSpeed Insights on your homepage and your most visited landing page. Note the three numbers.",
          "If LCP is over 2.5 s: serve the hero image in a modern format at the right size, load it first, and check how quickly your hosting responds.",
          "If INP is over 200 ms: list your third-party scripts, remove what you do not use, and load the rest after the page is interactive.",
          "If CLS is over 0.1: set width and height on images and iframes, and reserve space for anything that loads late.",
          "Re-test after each change, and judge progress on field data, not one lab run.",
        ],
      },
      {
        kind: "h2",
        text: "Lab vs. field — the caveat that matters",
      },
      {
        kind: "p",
        text: "PageSpeed Insights shows two kinds of numbers. Lab data comes from a single simulated visit and is useful for debugging. Field data comes from real Chrome users over the previous 28 days (the Chrome User Experience Report), and it is what Google's assessment uses. A small site may not have enough traffic to show field data at all; in that case, use the lab numbers as a guide, not a verdict.",
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Three questions, three numbers, one checklist.",
      items: [
        "LCP ≤ 2.5 s — the main content arrives fast",
        "INP ≤ 200 ms — taps and clicks feel instant",
        "CLS ≤ 0.1 — nothing jumps while you read",
        "Run PageSpeed Insights on your top two pages and fix the worst number first.",
      ],
    },
    caveats: [
      "Thresholds are Google's published values at the time of writing; check web.dev if you are reading this much later.",
      "Core Web Vitals are one ranking signal among many. Improving them does not guarantee a ranking change.",
      "This is a plain-language guide, not a diagnosis of your site. Measure yours before you fix anything.",
    ],
    related: [
      { slug: "your-site-feels-slow-on-a-phone", title: "Your site feels slow on a phone — the five usual causes" },
      { slug: "designing-for-reduced-motion", title: "Designing for reduced motion without killing the design" },
    ],
    cta: { label: "See how we build performant sites", href: "/capabilities/websites" },
    faq: [
      {
        q: "What are Core Web Vitals?",
        a: "Three measurements Google uses for loading (LCP), responsiveness (INP) and visual stability (CLS). They are a ranking signal and a reasonable proxy for how a site feels.",
      },
      {
        q: "Do I need to hit 'good' on all three to rank well?",
        a: "No. They are one of many signals, and relevance and content matter more. But a site that feels slow loses visitors whatever its ranking.",
      },
      {
        q: "What is the difference between lab and field data?",
        a: "Lab data is one simulated visit, useful for debugging. Field data comes from real Chrome users over 28 days and is what Google's assessment uses.",
      },
    ],
  },
  {
    slug: "designing-for-reduced-motion",
    title: "Designing for reduced motion without killing the design",
    excerpt: "What this site does when a visitor asks their device for less motion: every moving part either stops or never starts, and the page still looks finished.",
    intro: "When a visitor turns on \"reduce motion\" in their device settings, this site honours it. Smooth scrolling, the hero reel, background videos, the decoding text, the 3D scene's drift and the photo films all either stop or never start — and the page still looks finished, because the still state was designed first. Here is exactly what changes, with the code.",
    tag: "Built",
    theme: "Design",
    readTime: 5,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "code",
        label: "The pattern, from src/components/ShowreelVideo.tsx",
        code: "// Reduced motion: never start; CSS keeps the poster on top.\nif (window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches) return;",
      },
      {
        kind: "metrics",
        label: "What changes when a visitor asks for less motion",
        values: [
          { label: "Scrolling", value: "Native browser scrolling; the smooth-scroll library never starts" },
          { label: "Hero reel", value: "Poster image only; the video never plays" },
          { label: "Background videos", value: "Poster only; the video file is never downloaded" },
          { label: "Decoding text", value: "The final text appears at once" },
          { label: "Photo films", value: "Never autoplay" },
          { label: "3D process scene", value: "No idle drift and no pointer tilt" },
          { label: "Image tiles", value: "No parallax and no custom cursor" },
          { label: "Lane, the site guide", value: "Answers appear without the typing pause" },
        ],
      },
    ],
    body: [
      {
        kind: "h2",
        text: "One rule, applied everywhere",
      },
      {
        kind: "p",
        text: "Every moving part on the site checks the same thing before it starts: the visitor's prefers-reduced-motion setting. If it is set to reduce, the component does nothing and the still version stays on screen. In CSS, entrance animations such as the hero photograph's settle are written inside a no-preference media query, so they only exist for visitors who have not asked for less motion.",
      },
      {
        kind: "h2",
        text: "Why the design does not flatten",
      },
      {
        kind: "p",
        text: "The still state is not a fallback; it is the design. The reel's poster is a composed frame, the decoding text resolves to the same words, and the layout, type and spacing do not change. Motion is added on top of a finished page, so taking it away leaves a finished page.",
      },
      {
        kind: "h2",
        text: "What we chose not to do",
      },
      {
        kind: "ul",
        items: [
          "A site-wide \"pause animations\" toggle. The operating-system setting already exists, and honouring it means visitors do not have to find a second switch on every site.",
          "Slowing motion down instead of stopping it. Slower motion is still motion, and for some people it is the movement itself that causes the problem.",
        ],
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Three rules for reduced motion on any site.",
      items: [
        "Check prefers-reduced-motion before every animation, video and scroll effect starts — not just in CSS.",
        "Design the still state first, then add motion on top.",
        "For videos, show the poster and skip the download; it saves data as well as motion.",
      ],
    },
    caveats: [
      "This describes the site's code as of the date above. It is a description, not a third-party accessibility audit.",
      "Reduced motion is one part of accessibility, not the whole of it.",
      "Browsers expose the setting differently, and some visitors who would benefit from it have never turned it on.",
    ],
    related: [
      { slug: "wcag-22-aa-checklist", title: "A WCAG 2.2 AA checklist for a marketing site (download)" },
      { slug: "core-web-vitals-small-business", title: "Core Web Vitals for a small business site, in plain English" },
    ],
    cta: { label: "See how we build sites this way", href: "/capabilities/websites" },
  },
  {
    slug: "wcag-22-aa-checklist",
    title: "A WCAG 2.2 AA checklist for a marketing site (download)",
    excerpt: "The 18 success criteria that matter most on a marketing site, with what is new in WCAG 2.2 and a 15-minute manual test protocol — ungated, CC0.",
    intro: "This WCAG 2.2 AA checklist ranks the 18 success criteria that matter most on a marketing site — not the full specification. It covers what WCAG 2.2 added in 2023 (target size, focus not obscured, redundant entry, accessible authentication) and a 15-minute manual test protocol. Download it ungated at /echoes/kit/wcag-22-aa-checklist.md.",
    tag: "Plainly",
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
            value: "18 prioritised criteria + the WCAG 2.2 additions + a 15-minute test protocol"
          },
          {
            label: "Priority",
            value: "8 high-impact, 6 medium, 4 context-dependent"
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
        text: "WCAG 2.2 has dozens of success criteria, and a marketing site does not meet all of them equally often. The checklist puts eight high-impact criteria first: contrast (1.4.3), focus visible (2.4.7), target size (2.5.8), alt text (1.1.1), bypass blocks such as a skip link (2.4.1), form labels (3.3.2), semantic structure (1.3.1) and focus not obscured (2.4.11). Six medium and four context-dependent criteria follow. The quick test protocol — tab-through, 200% zoom, an automated scan, one screen-reader pass, a contrast check, reduced motion and mobile target sizes — takes about 15 minutes per page."
      },
      {
        kind: "h2",
        text: "What WCAG 2.2 added (published October 2023)"
      },
      {
        kind: "ul",
        items: [
          "2.4.11 Focus Not Obscured (Minimum) — AA",
          "2.5.7 Dragging Movements — AA",
          "2.5.8 Target Size (Minimum), 24×24 CSS pixels — AA",
          "3.2.6 Consistent Help — A",
          "3.3.7 Redundant Entry — A",
          "3.3.8 Accessible Authentication (Minimum) — AA",
          "Also added at AAA, so not required for AA: 2.4.12, 2.4.13 and 3.3.9"
        ]
      }
    ],
    takeaway: {
      title: "What you can take",
      text: "An 18-point WCAG 2.2 AA checklist you can use today.",
      items: [
        "Download /echoes/kit/wcag-22-aa-checklist.md (11 KB, CC0, ungated).",
        "Start with the 8 high-impact criteria (contrast, focus visible, target size, alt text, skip link, labels, semantics, focus not obscured).",
        "Run the 15-minute quick test protocol before any launch.",
        "Treat a passing checklist as a pre-launch filter, not a legal claim."
      ]
    },
    caveats: [
      "This checklist is a pre-launch filter, not a legal conformity assessment. Passing it does not mean WCAG 2.2 AA conformance; failing it almost certainly means you are not.",
      "It is written for single-page and small multi-page marketing sites (landing pages, product pages, simple contact flows). Multi-language, e-commerce checkout, or account-portal flows need additional criteria.",
      "Automated tools (axe-core, WAVE, Lighthouse) catch only some failures; many need a person to check. No automated score replaces the tab-through.",
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
    title: "What an $8,000 website quote should spell out",
    excerpt: "At $8,000 you should get a written scope you can check — what is designed and built, what you supply, what is left out, and who owns the result — not a template with your logo pasted in.",
    intro: "At $8,000 a buyer should expect a written scope they can check, not a template with their logo pasted in. A good quote at that level says what is being designed and built, what you are expected to supply, what is deliberately left out, and who owns the site once it is paid for. If any of those is missing, ask before you sign.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "metrics",
        label: "Where $8,000 sits in our published bands",
        values: BANDS[0].rows.map((row) => ({ label: `${row.name} — ${row.detail}`, value: row.price })),
      },
      {
        kind: "link",
        label: "The full price guide",
        href: "/pricing",
        text: "Every published range, and what each one covers.",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "Why we wrote this",
      },
      {
        kind: "p",
        text: `Our websites start at ${PRICE.websitesFrom}, so it is a fair question what a quote at that level should show you. This is not our contract — the written proposal is — and other studios structure their work differently. It is the set of things any quote around ${PRICE.websitesFrom} should make clear in writing.`,
      },
      {
        kind: "h2",
        text: "What a quote at this level should spell out",
      },
      {
        kind: "ol",
        items: [
          "The scope, in units you can count: how many unique page layouts are designed and built, not just \"a website\".",
          "What the work covers: who the site is for and how it is structured, custom responsive design, development and launch, content management where it is needed, and the performance, accessibility and search basics.",
          "What you supply: whether the studio works with your existing brand and copy, or is writing and designing those too.",
          "What is left out: brand identity, ongoing SEO, integrations and post-launch care are often priced separately. A good quote names them so they do not surprise you later.",
          "Third-party costs: hosting, domains and any licences, listed so you know what you will pay outside the studio's fee.",
          "Ownership: when the design and code become yours. Ours say it plainly — once the project is paid in full, the design and code are yours.",
        ],
      },
      {
        kind: "h2",
        text: "What it should not leave vague",
      },
      {
        kind: "ul",
        items: [
          "\"Website design\" as a single line item, with no count of layouts or pages.",
          "Revisions with no stated process. Unlimited sounds generous until someone has to pay for it.",
          "Who writes the content. If it is you, the quote should say so; if it is the studio, it should say how much.",
        ],
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Before you sign any quote around $8,000, check that it answers these in writing.",
      items: [
        "How many layouts or pages are designed and built?",
        "What do I need to supply, and by when?",
        "What is deliberately left out, and what would it cost to add?",
        "Which third-party costs will I pay directly?",
        "When do the design and code become mine?",
      ],
    },
    caveats: [
      "This is a buyer's guide, not a contract or a quote. Every Botlane project is a tailored written proposal, and the proposal takes precedence.",
      "Other studios scope and price differently; a quote that is structured differently is not wrong just because it does not match this list.",
      "It covers marketing websites, not web apps, which we price after paid discovery.",
    ],
    related: [
      { slug: "how-to-tell-good-web-design-quote-from-bad", title: "How to tell a good web design quote from a bad one" },
      { slug: "website-cost-2026-where-money-goes", title: "How much a website costs in 2026 — and where the money actually goes" },
    ],
    cta: { label: "See the price guide", href: "/pricing" },
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
        source: "Botlane Studios",
      },
      {
        kind: "metrics",
        label: "Red flags vs. green flags in a quote",
        values: [
          { label: "Definition of Done included", value: "Green flag" },
          { label: "'We'll figure it out' on scope changes", value: "Red flag" },
          { label: "Performance targets in writing", value: "Green flag" },
          { label: "'It feels fast' as performance claim", value: "Red flag" },
          { label: "You own repo, DNS, analytics from day 1", value: "Green flag" },
          { label: "Studio holds credentials as leverage", value: "Red flag" },
          { label: "Post-launch support defined in writing", value: "Green flag" },
          { label: "'We'll help if something breaks'", value: "Red flag" },
        ],
      },
      {
        kind: "link",
        label: "Seven questions that separate studios who ship from studios who sell",
        href: "/echoes/seven-questions-before-hiring-web-studio",
        text: "Seven questions to ask any studio before you hire it.",
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
        text: "4. A performance budget you can check",
      },
      {
        kind: "p",
        text: "A credible quote names specific Core Web Vitals targets and how they will be checked before launch. 'It feels fast' is not a budget. If the studio has launched comparable sites, ask how those perform today.",
      },
      {
        kind: "h2",
        text: "5. What happens after launch",
      },
      {
        kind: "p",
        text: "Get it in writing: how quickly problems are handled, what counts as a bug versus a new request, whether training is included, and who pays for software updates. If support after launch is a separate agreement, the quote should say so and say what it would cost.",
      },
      {
        kind: "h2",
        text: "Red flags — what bad quotes hide behind vague language",
      },
      {
        kind: "ul",
        items: [
          "'We'll figure it out' on scope changes — no change control, no impact assessment.",
          "'It feels fast' or 'optimized for speed' — no targets and no way to check them.",
          "Studio holds repo/DNS/analytics — you are renting, not owning.",
          "'All-in' price with no line items — you cannot verify what is custom vs. template.",
          "No post-launch SLA — 'we'll help if something breaks' is not a commitment.",
          "Content is 'your problem' — the #1 blocker becomes your unpaid work.",
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
          "Performance targets with specific Core Web Vitals thresholds and how they will be checked.",
          "Change-control template attached — written requests, impact, single decision-maker.",
          "Ownership clause: 'Client owns repo, DNS, analytics at all times.'",
          "Post-launch support with response times and a clear line between bugs and new work.",
          "Content model, migration plan, and who writes — treated as part of scope, not an afterthought.",
          "Hosting in your account, at what it actually costs.",
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
          "Performance & Core Web Vitals — images, code, caching and how targets are checked",
          "QA, security hardening, accessibility (WCAG 2.2 AA)",
          "Hosting + CDN — at retail price, in your account",
          "Maintenance retainer — tested updates, off-site backups, monitoring, support hours",
          "Budget for improvements after launch — what is included and what is extra",
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
          "Ask whether hosting is billed at cost or with a markup, and in whose account it sits.",
          "Verify ownership: who holds the domain, server credentials, and CMS admin access?",
          "Budget for maintenance every year, even if the site 'doesn't need changes'.",
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
        "Performance targets, and how they are checked",
        "Content model, migration, and who writes",
        "Post-launch support defined in writing",
        "Hosting in your account, at cost",
        "Exit clause: clean handoff if you switch",
      ],
    },
    caveats: [
      "This checklist filters for process maturity, not creative fit. A studio can pass every item and still not match your aesthetic.",
      "The list is biased toward technical delivery — brand-only or strategy-only engagements need different filters.",
      "We are a studio, so we are not neutral. Other valid ways of quoting exist.",
      "No checklist replaces a proper conversation about scope. These are a pre-qualifier, not a contract.",
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
        a: "At minimum, Google's 'good' thresholds — LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less — and a stated way of checking them before launch.",
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
          text: "Send a follow-up email asking for the definition of done, performance targets, change-control process, ownership clause and post-launch support terms. The response tells you more than the quote.",
        },
        {
          name: "Compare three-year totals",
          text: "Add the build, three years of hosting and maintenance, and a budget for improvements. The sticker price is rarely the real price.",
        },
        {
          name: "Decide on process, not just price",
          text: "A quote that is clear about process but costs more can still cost less over three years than a cheap one that leaves everything vague.",
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
        text: "How a Botlane website project runs, stage by stage.",
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
        text: "A credible answer names specific Core Web Vitals targets (LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less) and how they will be checked before launch. \"It feels fast\" is not a budget.",
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
        text: "Get it in writing: how quickly problems are handled, what counts as a bug versus a new request, whether training is included, and who pays for software updates.",
      },
      {
        kind: "h2",
        text: "7. What will you need from me, and when?",
      },
      {
        kind: "p",
        text: "Most delays come from the client side: content, feedback and approvals. A studio that has thought about its process can tell you exactly what it needs from you at each stage, and what happens to the timeline if it arrives late.",
      },
    ],
    takeaway: {
      title: "The seven-question cheat sheet",
      text: "Paste this into your next discovery call. If a studio answers all seven with specifics, they are worth a second conversation.",
      items: [
        "Definition of Done — written, shared, signed",
        "You own repo, DNS, analytics from day one",
        "Change control with impact assessment",
        "Performance targets, and how they are checked",
        "Content model, migration, and who writes",
        "Post-launch support in writing",
        "What they need from you, and when",
      ],
    },
    caveats: [
      "These questions filter for process maturity, not creative fit. A studio can pass all seven and still not match your aesthetic.",
      "The list is biased toward technical delivery — brand-only or strategy-only engagements need different filters.",
      "We are a studio, so we are not neutral. Other valid ways of working exist.",
      "No question replaces a proper conversation about scope. These are a pre-qualifier, not a contract.",
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
    excerpt: "Many small businesses need a landing page, not a rebuild. If your traffic is modest and your conversion path fits a single form, a hosted page, a template or a one-page builder may be all you need. We say this openly, even though we build custom sites.",
    intro:
      "If your site has fewer than 1,000 visits a month, a single conversion path, and no custom backend, you do not need a studio. A hosted landing page (Carrd, Webflow, or a well-chosen WordPress template), a simple form, and a hand-edited sitemap is almost always faster, cheaper, and easier to maintain. This note says that plainly, even though we build custom websites.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 5,
    date: "2026-10-08",
    evidence: [
      {
        kind: "quote",
        label: "What this note says outright",
        text: "If your site fits a single form and your traffic is under 1,000 visits a month, hire nothing.",
        source: "Botlane Studios",
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
        text: "Why a studio would say this",
      },
      {
        kind: "p",
        text: "A custom site that a business does not need is a bad project for both sides. If your project fits the three conditions above, you will probably be happier with a template — and that is the Plainly tag: nothing to sell in the sentence.",
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
      "The thresholds are a rule of thumb, not an industry standard. Other studios may draw the line differently.",
      "The traffic figure is approximate. A business with 800 highly qualified visits may justify more investment than one with 2,000 casual visits.",
      "We are a studio that builds custom websites, so we are not neutral — which is why the advice not to hire one is worth saying.",
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
        a: "Not at all. If any of the three conditions is false — higher traffic, a multi-step conversion path, a custom backend, or a design a template cannot match — a studio build can be a reasonable investment. If you are unsure, tell us about it and we can talk it through.",
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
    excerpt: "A plain breakdown of 2026 website prices by approach — DIY builder, freelancer, agency — with the ongoing costs that rarely appear in a quote and why the three-year total matters more than the build price.",
    intro: "In 2026, published surveys put a DIY builder at roughly $17–$500 a month, a freelancer build at $500–$10,000 or more, and an agency build from about $3,000 upwards. But the build is only part of the bill. One 2026 cost study puts the three-year cost of owning a site at 2.0–3.4 times the original build, once hosting, maintenance and improvements are counted.",
    tag: "Plainly",
    theme: "Strategy",
    readTime: 6,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "metrics",
        label: "2026 price ranges from public sources (USD)",
        values: [
          { label: "DIY website builder, per month (WebFX)", value: "$17 – $500+" },
          { label: "Freelancer build (WebFX)", value: "$500 – $10,000+" },
          { label: "Agency build (WebFX)", value: "$3,000 – $30,000+" },
          { label: "Small-business site with a boutique agency (Digital Applied)", value: "$8,000 – $15,000" },
          { label: "Hosting, per month (WebFX)", value: "$2 – $1,000" },
          { label: "Firms quoting fixed-price projects at $1,000–$15,000 (GoodFirms, 300+ firms)", value: "63%" },
          { label: "Three-year cost of ownership vs. the build (Digital Applied)", value: "2.0× – 3.4×" },
        ],
      },
      {
        kind: "link",
        label: "Source",
        href: "https://www.webfx.com/web-design/pricing/website-costs/",
        text: "WebFX: how much does a website cost in 2026",
      },
      {
        kind: "link",
        label: "Source",
        href: "https://www.goodfirms.co/resources/website-construction-cost-survey",
        text: "GoodFirms 2026 website cost survey",
      },
      {
        kind: "link",
        label: "Source",
        href: "https://www.digitalapplied.com/blog/website-development-cost-2026-complete-pricing-data",
        text: "Digital Applied: website development cost 2026",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "The answer first: the build is not the whole bill",
      },
      {
        kind: "p",
        text: "The sticker price of a website is what it costs to launch, not what it costs to own. Digital Applied's 2026 study gives a worked example: a $28,000 corporate marketing site with a mid-tier maintenance programme costs roughly $65,000–$95,000 over three years. The multiplier across its examples runs from 2.0 to 3.4 times the build, depending on how much is invested after launch.",
      },
      {
        kind: "h2",
        text: "Three paths, three price structures",
      },
      {
        kind: "h3",
        text: "1. DIY with a builder",
      },
      {
        kind: "p",
        text: "WebFX puts website builders at roughly $17–$500+ a month. The subscription usually bundles hosting, security certificates and templates. The trade-off is that you work inside someone else's layouts and features, and moving off the platform later is its own project.",
      },
      {
        kind: "h3",
        text: "2. Freelancer",
      },
      {
        kind: "p",
        text: "WebFX's range for freelance design is $500–$10,000 or more; Digital Applied puts a template-based small-business site at $3,000–$8,000 with a freelancer. The risk concentrates in one person: if they become unavailable, so does your support. Ask what is custom and what is adapted from a template.",
      },
      {
        kind: "h3",
        text: "3. Agency or studio",
      },
      {
        kind: "p",
        text: "WebFX's agency range starts around $3,000 and runs past $30,000; Digital Applied puts a small-business site with a boutique agency at $8,000–$15,000 and says agencies are best suited to budgets from $15,000 to $200,000. You pay for more roles — strategy, design, development, project management — and for continuity if one person leaves.",
      },
      {
        kind: "h2",
        text: "The costs that rarely appear in the quote",
      },
      {
        kind: "ul",
        items: [
          "Hosting — anywhere from a few dollars to $1,000 a month, depending on traffic and what the site does.",
          "Domain and business email — small, but recurring, and they should be in your name.",
          "Maintenance — software updates, backups, security monitoring and fixes after browser changes.",
          "Content and improvements — new pages, updated copy, fixes based on what visitors actually do.",
          "Third-party services — forms, booking, analytics, maps or payments that charge their own fees.",
        ],
      },
      {
        kind: "h2",
        text: "What drives the price up",
      },
      {
        kind: "ul",
        items: [
          "Custom functionality — booking, portals, calculators or gated content add work a template cannot absorb.",
          "Integrations — connecting a CRM, payments or inventory is often the biggest source of scope growth.",
          "Content volume — sixty product pages cost more to build and populate than six service pages.",
          "Design ambition — custom illustration, motion and interaction are worth it for some brands and unnecessary for others.",
          "Compliance — accessibility, privacy or industry rules add design, build and testing time.",
        ],
      },
      {
        kind: "h2",
        text: "How to compare quotes fairly",
      },
      {
        kind: "ol",
        items: [
          "Ask for a three-year estimate: build, hosting, maintenance and a budget for improvements.",
          "Ask what is custom and what is adapted from a template or theme.",
          "Clarify what maintenance includes: updates, backups, monitoring, support hours and response times.",
          "Ask whether hosting is billed at cost or with a markup, and in whose account it sits.",
          "Confirm who holds the domain, hosting, code and admin access — it should be you.",
        ],
      },
    ],
    takeaway: {
      title: "The three-year budget checklist",
      text: "Use this to pressure-test any quote before you sign.",
      items: [
        "Build quote with an itemised scope — what is custom, what is template",
        "Hosting cost, and whose account it is in",
        "Maintenance: what is included and how fast problems are handled",
        "A budget for content and improvements after launch",
        "Domain, hosting, code and email in your name",
        "A clean handover if you ever switch providers",
      ],
    },
    caveats: [
      "The ranges are from public sources (WebFX, GoodFirms, Digital Applied) and vary widely between them. They are market context, not a quote for your project.",
      "The three-year multiplier comes from one study's examples and depends heavily on how much is spent after launch.",
      "Botlane Studios builds websites, so we are not neutral. Our own published ranges are on the pricing page; this note is about the market, not our rate card.",
    ],
    related: [
      { slug: "what-8000-buys", title: "What an $8,000 website quote should spell out" },
      { slug: "how-to-tell-good-web-design-quote-from-bad", title: "How to tell a good web design quote from a bad one" },
    ],
    cta: { label: "See our published price ranges", href: "/pricing" },
    faq: [
      {
        q: "What is the cheapest way to get a professional-looking website in 2026?",
        a: "A website builder on a mid-tier plan. You trade customisation and ownership for speed and a predictable monthly cost.",
      },
      {
        q: "Why can ongoing costs rival the build?",
        a: "Hosting, updates, security, content changes and improvements recur every year. One 2026 study puts the three-year cost of ownership at 2.0–3.4 times the original build.",
      },
      {
        q: "Is a freelancer cheaper than an agency?",
        a: "Usually, on the sticker price. The trade-off is that delivery and support depend on one person, where an agency or studio spreads the work across a team.",
      },
    ],
  },
  {
    slug: "how-ai-assistants-see-your-website",
    title: "How AI assistants see your website — and what to do about it",
    excerpt: "AI assistants don't read a site the way a person does. They fetch it, split it into sections, and quote the sections that answer the question. Here's what that means for a small business that wants to be cited accurately.",
    intro: "AI assistants don't read a site the way a person does. When they search the web, they fetch pages, split them into sections — headings, paragraphs, list items — and quote the ones that best answer the question, often alongside other sources. A section that only makes sense after the three above it gets dropped or misquoted. Here is how that works and what a small business can do to be cited accurately.",
    tag: "Plainly",
    theme: "AI",
    readTime: 7,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "link",
        label: "The research most GEO advice traces back to",
        href: "https://arxiv.org/abs/2311.09735",
        text: "Aggarwal et al., \"GEO: Generative Engine Optimization\" — reports visibility gains of up to 40% in generative engine answers from content changes",
      },
      {
        kind: "code",
        label: "AI crawler names to check in your robots.txt",
        code: "GPTBot            OpenAI\nOAI-SearchBot     ChatGPT search\nClaudeBot         Anthropic\nPerplexityBot     Perplexity\nGoogle-Extended   A Google control token, not a separate crawler:\n                  it decides whether Gemini may use your content",
      },
    ],
    body: [
      {
        kind: "h2",
        text: "How an AI assistant reads your page",
      },
      {
        kind: "p",
        text: "When someone asks ChatGPT, Perplexity, Claude or Google's AI features a question that needs the web, the assistant does three things: retrieve, split, then quote.",
      },
      {
        kind: "p",
        text: "Retrieve. Each assistant draws on a search index — its own, or a partner's — and the companies do not fully document which. What you can control is whether their crawlers are allowed in. A robots.txt copied from an old template can let Google through and quietly block the others.",
      },
      {
        kind: "p",
        text: "Split. The assistant works with sections, not whole pages. Your headings are how it tells where one idea ends and the next begins.",
      },
      {
        kind: "p",
        text: "Quote. It lifts the sentences that answer the question. A claim that depends on context three sections up loses its meaning when it is lifted out; a claim that stands on its own sentence survives.",
      },
      {
        kind: "h2",
        text: "What the research found",
      },
      {
        kind: "p",
        text: "The GEO paper from researchers at Princeton and elsewhere tested content changes against generative search answers and reported visibility gains of up to 40%. The changes that helped most were editorial: citing sources, adding quotations from credible people and adding specific statistics. Stuffing pages with keywords did not help. The results vary by subject, and they come from a research benchmark rather than any one assistant in production.",
      },
      {
        kind: "p",
        text: "The practical reading: the technical work — crawler access, clear headings, structured data, a sitemap — is what lets an assistant read you at all. The editorial work is what makes it want to quote you.",
      },
    ],
    takeaway: {
      title: "What you can take",
      text: "Six checks, technical first, then editorial.",
      items: [
        "Check robots.txt — make sure the AI crawlers you want to be cited by are not blocked.",
        "Add structured data for your organisation, your pages and, if you are local, your business details.",
        "Open each section with its answer; the first sentence should carry the claim.",
        "Make each section make sense on its own.",
        "Back claims with named sources and specific numbers.",
        "Once a month, ask the assistants your buyers' questions and note who they cite.",
      ],
    },
    caveats: [
      "Being cited and ranking in search are related but not the same, and nothing here guarantees either.",
      "Crawler names and how each assistant retrieves pages change over time; check each company's current documentation.",
      "The GEO figures come from a research benchmark, not from measurements of any particular site.",
    ],
    related: [
      { slug: "ai-search-vs-google", title: "AI search vs Google: what's changing for small-business discovery" },
      { slug: "local-business-schema-that-gets-found", title: "Structured data that actually helps a small business get found" },
    ],
    cta: { label: "Read the SEO & discoverability add-on", href: "/capabilities/seo" },
    faq: [
      {
        q: "Does llms.txt help with citations?",
        a: "It is a proposal, not a standard, and Google has said it does not use it. The changes with evidence behind them are editorial: clear answers, cited sources and specific numbers.",
      },
      {
        q: "Should I test in just one AI assistant?",
        a: "No. They draw on different indexes and behave differently. Test in the ones your buyers actually use.",
      },
      {
        q: "What if my site blocks AI crawlers by accident?",
        a: "It happens with template robots.txt files. Check the file for the crawler names above. A blocked crawler means that assistant cannot fetch your pages when it searches.",
      },
      {
        q: "Is GEO just SEO with different words?",
        a: "Largely. Google says its usual SEO guidance applies to its AI features. The difference is the unit you optimise: a page for ranking, a self-contained section for quoting.",
      },
    ],
  },
{
    slug: "how-lane-works",
    title: "We built a site assistant that only tells the truth: how Lane works",
    excerpt:
      "Lane answers only from published studio information — no invented prices, results or timelines — and its answers never claim a booking. Here's how it works and why it refuses to make things up.",
    intro:
      "Lane is this site's guide. It answers only from published studio information — no invented prices, results or timelines — and its answers never claim to have booked a call or sent anything. The only thing Lane sends is a project brief you fill in and submit yourself. Here's how it works and why it refuses to make things up.",
    tag: "Decided",
    theme: "AI",
    readTime: 6,
    date: "2026-10-08",
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
          { label: "nextSteps()", value: "turns an answer into buttons; it books nothing" },
        ],
      },
      {
        kind: "quote",
        label: "What Lane refuses to do",
        text: "Invent prices, results or timelines; claim a booking; give unverified advice.",
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
          "Never claim a booking. When a visitor asks for a call, Lane offers 'Start a project' to send a short brief, or 'Contact the team', and says plainly that nothing has been booked or sent from the chat itself.",
          "Never invent prices, results, or timelines. Price answers quote the published pricing ranges; timelines say a quote is written, not promised.",
        ],
      },
      { kind: "h2", text: "What we rejected" },
      {
        kind: "ul",
        items: [
          "A freeform LLM that answers anything — it would invent, and the studio's promise is proof, not fluency.",
          "A chatbot that pretends to book — Lane's buttons open a view or a link; the only thing sent is a brief the visitor submits.",
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
      "Lane answers from published studio information only; it does not access project records. A brief sent from 'Start a project' arrives by email, like the contact form.",
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
    excerpt: "LocalBusiness structured data is not a ranking factor, but it hands search engines and AI assistants your business facts in a form they do not have to guess at. Here is the markup, the properties that matter, and what it will not do.",
    intro: "LocalBusiness structured data does not directly boost rankings. What it does is state your business name, address, phone, hours and service area in a machine-readable form, so search engines and AI assistants do not have to guess them from your page copy. When that markup, your visible page and your Google Business Profile all agree, the facts are easy to trust. Here is the markup and what it will not do.",
    tag: "Plainly",
    theme: "Build",
    readTime: 7,
    date: "2026-10-08",
    updated: "2026-10-12",
    evidence: [
      {
        kind: "metrics",
        label: "Why it is worth an hour",
        values: [
          { label: "US consumers using AI tools for local recommendations (BrightLocal, 2026 survey of 1,002 adults)", value: "45%" },
          { label: "Local-intent searches showing a local pack (Whitespark, 2025)", value: "93%" },
          { label: "Google removed FAQ rich results for almost all sites", value: "May 7, 2026" },
        ],
      },
      {
        kind: "code",
        label: "A LocalBusiness example for a fictional business (copy, adapt, validate)",
        code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Plumber\",\n  \"@id\": \"https://www.example-plumbing.example/#business\",\n  \"name\": \"Example Plumbing & Heating\",\n  \"url\": \"https://www.example-plumbing.example/\",\n  \"telephone\": \"+1-555-010-0199\",\n  \"email\": \"service@example-plumbing.example\",\n  \"description\": \"Licensed plumbing and heating contractor. Emergency repairs, water heaters, drain cleaning and heat pumps.\",\n  \"priceRange\": \"$$\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"100 Main Street\",\n    \"addressLocality\": \"Springfield\",\n    \"addressRegion\": \"OR\",\n    \"postalCode\": \"97477\",\n    \"addressCountry\": \"US\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 44.0462,\n    \"longitude\": -123.022\n  },\n  \"openingHoursSpecification\": [\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": [\n        \"Monday\",\n        \"Tuesday\",\n        \"Wednesday\",\n        \"Thursday\"\n      ],\n      \"opens\": \"07:30\",\n      \"closes\": \"18:00\"\n    },\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": \"Friday\",\n      \"opens\": \"07:30\",\n      \"closes\": \"16:00\"\n    },\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": \"Saturday\",\n      \"opens\": \"08:00\",\n      \"closes\": \"14:00\"\n    }\n  ],\n  \"areaServed\": {\n    \"@type\": \"GeoCircle\",\n    \"geoMidpoint\": {\n      \"@type\": \"GeoCoordinates\",\n      \"latitude\": 44.0462,\n      \"longitude\": -123.022\n    },\n    \"geoRadius\": \"25000\"\n  },\n  \"sameAs\": [\n    \"https://www.facebook.com/your-page\",\n    \"https://www.linkedin.com/company/your-company\",\n    \"https://www.yelp.com/biz/your-listing\"\n  ]\n}",
      },
      {
        kind: "link",
        label: "Validate before you deploy",
        href: "https://search.google.com/test/rich-results",
        text: "Google Rich Results Test — paste your JSON-LD here first",
      },
      {
        kind: "link",
        label: "Google's guidance",
        href: "https://developers.google.com/search/docs/appearance/structured-data/local-business",
        text: "Google Search Central: local business structured data",
      },
    ],
    body: [
      { kind: "h2", text: "The four types that do most of the work" },
      { kind: "p", text: "Everything else is situational. These four are a sensible foundation for a local business:" },
      {
        kind: "ul",
        items: [
          "LocalBusiness, using the most specific subtype that fits — on the homepage and contact page.",
          "Service — on each service page, naming the service and the area served.",
          "Organization with sameAs — site-wide, linking your business to its official profiles elsewhere.",
          "BreadcrumbList — site-wide, so search results show a clean path to the page.",
        ],
      },
      { kind: "p", text: "Article markup matters if you publish articles. FAQPage markup no longer produces a rich result for almost any site since Google removed FAQ rich results on May 7, 2026; keep it only if the questions are genuinely useful on the page. Review markup about your own business has been treated as self-serving and ignored for star snippets since 2019, so leave it out." },
      { kind: "h2", text: "The properties to get right" },
      {
        kind: "ul",
        items: [
          "@type — the most specific subtype: Dentist, Electrician, Plumber, HVACBusiness, LegalService, AutoRepair, Restaurant and so on. Generic LocalBusiness is the fallback, not the goal.",
          "name — exactly as it appears on your Google Business Profile.",
          "address — a full PostalAddress: street, city, state, postal code and country.",
          "telephone — your main number, including the country and area code.",
          "url — the page the markup describes.",
        ],
      },
      { kind: "h2", text: "The useful optional properties" },
      {
        kind: "ul",
        items: [
          "openingHoursSpecification — your hours, grouping days that share the same times.",
          "geo — latitude and longitude, copied from your pin in Google Maps.",
          "areaServed — essential for service-area businesses: a radius around a point, or a list of the towns you cover.",
          "sameAs — links to your official profiles, so the facts can be connected across the web.",
        ],
      },
      { kind: "h2", text: "Service markup — the underrated one" },
      { kind: "p", text: "If you offer more than one service, Service markup declares each one, rather than leaving search engines to infer them from paragraphs. A drain-cleaning page that says so in its markup is easier to match to a search for drain cleaning in your area." },
      { kind: "code", label: "Service example (one per service page)", code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Service\",\n  \"name\": \"Emergency Drain Cleaning\",\n  \"description\": \"Drain clearing for homes and small businesses, including camera inspection.\",\n  \"provider\": { \"@id\": \"https://www.example-plumbing.example/#business\" },\n  \"areaServed\": [\"Springfield\", \"Shelbyville\"]\n}" },
      { kind: "h2", text: "Pick your route" },
      {
        kind: "ul",
        items: [
          "WordPress: SEO plugins can generate LocalBusiness markup from a settings form. Service markup usually needs adding by hand.",
          "Squarespace and Wix: some markup is added automatically, and both let you paste your own JSON-LD into the page head.",
          "Custom or static sites: write the JSON-LD by hand or with a generator, add it to the page head, and validate it.",
        ],
      },
      { kind: "h2", text: "The discipline that makes it work" },
      {
        kind: "ul",
        items: [
          "Match your Google Business Profile exactly — name, address, phone and hours. Mismatches undermine the point of the markup.",
          "One block per location, each with its own name, address, phone, hours and page.",
          "Validate with the Rich Results Test before you deploy, and fix errors rather than shipping them.",
          "Watch Search Console for structured-data errors after launch.",
        ],
      },
      { kind: "h2", text: "What this does not do" },
      { kind: "p", text: "Markup does not replace a complete Google Business Profile, genuine reviews or a useful website. Whitespark's surveys of local search experts consistently rank the Business Profile, reviews and on-page signals as the biggest influences on the local pack. Structured data is the most controllable piece of the on-page part: an hour's work, no running cost." },
    ],
    takeaway: {
      title: "Ship this week",
      text: "The minimum useful LocalBusiness setup:",
      items: [
        "Pick the most specific subtype that fits your business",
        "Match name, address, phone and hours to your Google Business Profile exactly",
        "Add geo coordinates and the area you serve",
        "Add Service markup to each service page",
        "Validate in the Rich Results Test, deploy, then watch Search Console",
      ],
    },
    caveats: [
      "Structured data is not a direct ranking factor, and nothing here guarantees a rich result, a ranking or an AI citation.",
      "The statistics are third-party figures (BrightLocal, Whitespark) and Google's own announcement; methods and samples vary.",
      "The example business is fictional. Replace every value with your own, and remove any property you cannot fill truthfully.",
    ],
    related: [
      { slug: "ai-search-vs-google", title: "AI search vs Google: what's changing for small-business discovery" },
      { slug: "how-ai-assistants-see-your-website", title: "How AI assistants see your website — and what to do about it" },
    ],
    cta: { label: "See the SEO & discoverability add-on", href: "/capabilities/seo" },
    faq: [
      { q: "Is LocalBusiness markup a direct ranking factor?", a: "No. Google has said structured data is not a direct ranking factor. It helps search engines understand your business facts; it does not move you up the results by itself." },
      { q: "Why bother, then?", a: "Because it makes your name, address, phone, hours and service area unambiguous to search engines and AI assistants, and it costs an hour to set up. BrightLocal's 2026 survey found 45% of US consumers use AI tools for local recommendations." },
      { q: "Which subtype should I use?", a: "The most specific one that fits — Dentist, Electrician, Plumber, LegalService and so on. If none fits, use LocalBusiness." },
      { q: "My business has several locations. One block or many?", a: "One block per location, each with its own name, address, phone, hours and the URL of that location's page." },
      { q: "Can I mark up my Google or Yelp reviews?", a: "No. Review markup about your own business is not used for star snippets, and marking up reviews that are not genuinely published on your page breaks Google's guidelines." },
    ],
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
          { label: "US Google searches ending with no click (SparkToro, Jan–Apr 2026)", value: "68%" },
          { label: "Google searches showing an AI Overview (same study; no official figure)", value: "20%+" },
          { label: "Searches with a click on a result when an AI summary appears, vs 15% without (Pew Research)", value: "8%" },
          { label: "ChatGPT weekly users (OpenAI, early 2026)", value: "900M" },
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
          "About 68% of US Google searches ended without a single click in the first four months of 2026 (SparkToro, using Similarweb data).",
          "The same study found AI Overviews on more than 20% of Google searches; other trackers report higher figures, and Google publishes none.",
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
        text: "When someone is ready to act — \"emergency plumber near me\", \"dentist in Denver\", \"best CRM for my team\" — the AI summary often does not finish the job. A 2025 Whitespark study found the local pack appeared on 93% of local-intent searches on average, while AI Overviews appeared on about 15% of them. For informational searches it was the reverse: AI Overviews appeared on 92%.",
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
          "Add structured data. LocalBusiness markup makes your business facts machine-readable.",
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
          "llms.txt is a proposal, not a standard, and Google has said it does not use it.",
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
      "Every percentage here is a third-party estimate. Google publishes no official share, and independent trackers disagree, especially on how often AI Overviews appear.",
      "Most of the data is US-based; your market, language and industry may differ.",
      "AI referral traffic is still a small share of total visits for most sites — a trend to prepare for, not a windfall to bank on.",
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
        a: "No. Google still handles the large majority of searches. What changed is that an AI answer now sits on top of many Google results, and more questions go to ChatGPT, Perplexity and others instead of a list of links.",
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
  },
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
      author: author === ECHOES_AUTHOR ? { "@id": `${siteUrl}/#organization` } : { "@type": "Person", name: author },
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
