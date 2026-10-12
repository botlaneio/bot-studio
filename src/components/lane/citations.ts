/* Lane's citation index — the "feed the machine" layer.

   Lane answers only from published studio information. The Echoes posts are
   published information, so Lane must be able to cite them, not just the
   handful of hard-coded answers in studioReply.ts.

   Publishing a post and feeding it to Lane is the same step here: add one
   entry to CITATIONS with the post's slug, title, answer-first summary and the
   queries a visitor would ask that the post answers. Lane then cites the post
   when a visitor asks one of those queries, and tests/lane-ingestion.test.mjs
   fails if a citation is missing, malformed, or points at the wrong post.

   Rules (enforced by validateCitations and the test):
   - slug and url must agree: url is always /echoes/<slug>.
   - summary is the post's answer-first intro (the line an AI engine quotes),
     roughly 40-60 words, and it must be a true statement from the post.
   - queries are the visitor phrasings that should route to THIS post. They
     must be specific enough not to shadow another post's query or one of the
     core guide intents in studioReply.ts. */

export type LaneCitation = {
  /** Route slug. Must match the post's published path segment. */
  slug: string;
  /** Exact post title, as published. */
  title: string;
  /** Where the post lives on the site. */
  url: string;
  /** The answer-first intro Lane quotes when it cites this post. */
  summary: string;
  /** Visitor phrasings this post answers. Lane cites the post when one matches. */
  queries: string[];
};

export const CITATIONS: LaneCitation[] = [
  {
    slug: "shipping-the-evidence-tag",
    title: "Every Echoes note now carries its proof",
    url: "/echoes/shipping-the-evidence-tag",
    summary: "Echoes is now a blog that only publishes what it can prove. Every note carries one of five evidence tags — Measured, Built, Decided, Briefed or Plainly — and a bordered evidence block with the raw asset: the numbers, the code, or the live link. This note shows the publishing lane itself, end to end, with its receipts.",
    queries: [
      "what is an evidence tag",
      "why does every echoes note carry proof",
      "how can i check an echoes claim"
    ]
  },
  {
    slug: "anatomy-of-an-echoes-note",
    title: "The anatomy of an Echoes note",
    url: "/echoes/anatomy-of-an-echoes-note",
    summary: "Every note in Echoes follows the same skeleton: an answer-first intro, a bordered evidence block, the reasoning, something you can take, and the honest caveats. This note spells out that skeleton and why we fixed it, so a reader — or a future writer — can hold a note to the same standard.",
    queries: [
      "what is the anatomy of an echoes note",
      "how is an echoes note structured",
      "what are the parts of an echoes note"
    ]
  },
  {
    slug: "three-things-we-didnt-build",
    title: "Three things we talked ourselves out of building on our own site",
    url: "/echoes/three-things-we-didnt-build",
    summary: "We cut three features from our own site before they shipped: a comment system, a newsletter, and a light/dark theme toggle. Each seemed reasonable at first. Each would have pulled time from the work we actually sell. The decision rule was simple: if it does not serve the client-facing proof or the studio's own operating cadence, it does not ship.",
    queries: [
      "what features did you decide not to build",
      "what did you leave out of your own site",
      "why did you cut the comment system"
    ]
  },
  {
    slug: "why-we-publish-price-bands",
    title: "Why we publish price bands instead of \"contact us\"",
    url: "/echoes/why-we-publish-price-bands",
    summary: "We publish price bands, not exact quotes and not \"contact us\". The first question a serious buyer has is not \"how cheap are you\" but \"am I in the right room\", and a range answers it before anyone books a call. Every project is still a tailored written quote; the bands show where that quote is likely to land.",
    queries: [
      "why do you publish bands instead of contact us",
      "why show bands not a contact form"
    ]
  },
  {
    slug: "figma-to-nextjs-no-page-builder",
    title: "Designed in Figma, rebuilt by hand: why no page builder",
    url: "/echoes/figma-to-nextjs-no-page-builder",
    summary: "The studio's site is designed in Figma and rebuilt in Next.js by hand. There is no Webflow, Squarespace, or WordPress builder in the middle. This is a decision, not an accident — it trades build speed for owning every pixel and never being blocked by a page builder's pricing or feature roadmap. Here is the decision, the rejected options, and the honest cost of it.",
    queries: [
      "why no page builder",
      "why hand build the site instead of using a builder",
      "why build from figma by hand"
    ]
  },
{
    slug: "forme-knitwear",
    title: "FORME: a knitwear label that has to feel tactile on a phone",
    url: "/echoes/forme-knitwear",
    summary: "FORME is a self-initiated study, not a client project. We set ourselves one problem: a quiet knitwear label that has to feel as tactile on a phone screen as it does in the hand. Here is the brief, the three choices the identity rests on, and what the study does not prove.",
    queries: [
      "how do you make knitwear feel tactile on a screen",
      "what was the forme study",
      "how did you design the forme knitwear site",
    ],
  },
  {
    slug: "northline-senior-not-cold",
    title: "NORTHLINE: senior, not cold — branding a consultancy",
    url: "/echoes/northline-senior-not-cold",
    summary: "NORTHLINE is a self-initiated study, not a client project. The brief: a strategy consultancy that needs to look senior without looking cold. Here are the three choices the identity rests on, why we made them, and what the study does not prove.",
    queries: [
      "what was the northline study",
      "what was the northline consultancy study"
    ]
  },
{
    slug: "one-page-website-brief-template",
    title: "The one-page brief we write before anything is drawn",
    url: "/echoes/one-page-website-brief-template",
    summary: "A brief that fits on one page forces the hard decisions before a single pixel is designed. This note publishes the template we use at Botlane Studio: eleven sections, from the outcome you are betting on to the decision needed today. The template is the takeaway — download it, adapt it, use it.",
    queries: [
      "what is a one page website brief",
      "how do you write a website brief",
      "website brief template",
      "one page brief template for website",
    ],
  },
  {
    slug: "why-we-practise-on-imagined-clients",
    title: "Why we practise on imagined clients",
    url: "/echoes/why-we-practise-on-imagined-clients",
    summary: "We practise on imagined clients because a studio needs a way to show its thinking before it has client work to show, and because a self-set brief exposes the whole process. We set the brief, choose the constraints and carry the design through ourselves — and we label every study as exactly that.",
    queries: [
      "why do you practice on imagined clients",
      "what is a self set study",
      "why do self set design studies"
    ]
  },
  {
    slug: "your-site-feels-slow-on-a-phone",
    title: "Your site feels slow on a phone — the five usual causes",
    url: "/echoes/your-site-feels-slow-on-a-phone",
    summary: "A phone-slow site is almost never one bug — it is usually one of five causes, and each maps to a measurable Core Web Vital. The hero image blocks Largest Contentful Paint, JavaScript hydration blocks Interaction to Next Paint, embeds shift the layout, unchunked JavaScript starves the main thread, and the numbers you measure in a lab rarely match what real visitors see. Here are the five, with Google's thresholds.",
    queries: [
      "why does my site feel slow on mobile",
      "why is my website slow on mobile",
      "what makes a mobile site slow"
    ]
  },
  {
    slug: "core-web-vitals-small-business",
    title: "Core Web Vitals for a small business site, in plain English",
    url: "/echoes/core-web-vitals-small-business",
    summary: "Core Web Vitals are three numbers Google uses to judge whether a site feels fast and stable to real people: how quickly the main content appears (LCP), how quickly the page responds to a tap (INP), and whether things jump around while it loads (CLS). This note explains each in plain language and what a small business owner should actually do about them.",
    queries: [
      "what are core web vitals",
      "explain core web vitals for a small business",
      "what do lcp inp and cls mean"
    ]
  },
  {
    slug: "designing-for-reduced-motion",
    title: "Designing for reduced motion without killing the design",
    url: "/echoes/designing-for-reduced-motion",
    summary: "When a visitor turns on \"reduce motion\" in their device settings, this site honours it. Smooth scrolling, the hero reel, background videos, the decoding text, the 3D scene's drift and the photo films all either stop or never start — and the page still looks finished, because the still state was designed first. Here is exactly what changes, with the code.",
    queries: [
      "how do you design for reduced motion",
      "what is prefers reduced motion",
      "how to design with less motion"
    ]
  },
  {
    slug: "wcag-22-aa-checklist",
    title: "A WCAG 2.2 AA checklist for a marketing site (download)",
    url: "/echoes/wcag-22-aa-checklist",
    summary: "This WCAG 2.2 AA checklist ranks the 18 success criteria that matter most on a marketing site — not the full specification. It covers what WCAG 2.2 added in 2023 (target size, focus not obscured, redundant entry, accessible authentication) and a 15-minute manual test protocol. Download it ungated at /echoes/kit/wcag-22-aa-checklist.md.",
    queries: [
      "wcag 2.2 aa checklist",
      "web accessibility checklist",
      "wcag checklist for a marketing site"
    ]
  },
{
    slug: "what-8000-buys",
    title: "What an $8,000 website quote should spell out",
    url: "/echoes/what-8000-buys",
    summary: "At $8,000 a buyer should expect a written scope they can check, not a template with their logo pasted in. A good quote at that level says what is being designed and built, what you are expected to supply, what is deliberately left out, and who owns the site once it is paid for. If any of those is missing, ask before you sign.",
    queries: [
      "what does an $8000 website include",
      "what should an $8000 website include",
      "what do you get for $8000",
      "what does $8000 buy",
    ],
  },
  {
    slug: "how-to-tell-good-web-design-quote-from-bad",
    title: "How to tell a good web design quote from a bad one",
    url: "/echoes/how-to-tell-good-web-design-quote-from-bad",
    summary: "Most quotes look similar — a price, a timeline, and a list of pages. The difference is in what they leave out. A good quote shows the definition of done, the performance budget, the change-control process, and who owns the repo and DNS. A bad quote hides those behind 'we'll figure it out.' This note gives you the checklist to tell them apart.",
    queries: [
      "how to tell a good web design proposal from a bad one",
      "how to evaluate a web design proposal",
      "what should a web design proposal include"
    ]
  },
  {
    slug: "seven-questions-before-hiring-web-studio",
    title: "Seven questions to ask before you hire a web studio",
    url: "/echoes/seven-questions-before-hiring-web-studio",
    summary: "Most studios can show you a portfolio. Few can show you how they think. The seven questions below reveal whether a studio has a repeatable process, owns its outcomes, and treats your budget like their own. If the answers are vague, the work will be too.",
    queries: [
      "questions to ask before hiring a web studio",
      "what to ask a web design agency",
      "questions to ask a web studio"
    ]
  },
  {
    slug: "when-you-dont-need-a-custom-website",
    title: "When you don't need a custom website — and what to do instead",
    url: "/echoes/when-you-dont-need-a-custom-website",
    summary: "If your site has fewer than 1,000 visits a month, a single conversion path, and no custom backend, you do not need a studio. A hosted landing page (Carrd, Webflow, or a well-chosen WordPress template), a simple form, and a hand-edited sitemap is almost always faster, cheaper, and easier to maintain. This note says that plainly, even though we build custom websites.",
    queries: [
      "when do i not need a custom website",
      "do i need a custom website",
      "when is a template website enough"
    ]
  },
  {
    slug: "website-cost-2026-where-money-goes",
    title: "How much a website costs in 2026 — and where the money actually goes",
    url: "/echoes/website-cost-2026-where-money-goes",
    summary: "In 2026, published surveys put a DIY builder at roughly $17–$500 a month, a freelancer build at $500–$10,000 or more, and an agency build from about $3,000 upwards. But the build is only part of the bill. One 2026 cost study puts the three-year cost of owning a site at 2.0–3.4 times the original build, once hosting, maintenance and improvements are counted.",
    queries: [
      "where does the money go on a website project",
      "what goes into building a website",
      "website expenses breakdown"
    ]
  },
{
    slug: "how-ai-assistants-see-your-website",
    title: "How AI assistants see your website — and what to do about it",
    url: "/echoes/how-ai-assistants-see-your-website",
    summary: "AI assistants don't read a site the way a person does. When they search the web, they fetch pages, split them into sections — headings, paragraphs, list items — and quote the ones that best answer the question, often alongside other sources. A section that only makes sense after the three above it gets dropped or misquoted. Here is how that works and what a small business can do to be cited accurately.",
    queries: [
      "how do ai assistants see my website",
      "how do ai assistants see a website",
      "how can my website be cited by ai",
      "what should a small business do about ai search",
    ],
  },
{
    slug: "how-lane-works",
    title: "We built a site assistant that only tells the truth: how Lane works",
    url: "/echoes/how-lane-works",
    summary: "Lane is this site's guide. It answers only from published studio information — no invented prices, results or timelines — and its answers never claim to have booked a call or sent anything. The only thing Lane sends is a project brief you fill in and submit yourself. Here's how it works and why it refuses to make things up.",
    queries: [
      "how does lane work",
      "how does the site assistant work",
      "what is lane",
      "why does lane refuse to lie",
    ],
  },
  {
    slug: "local-business-schema-that-gets-found",
    title: "Structured data that actually helps a small business get found",
    url: "/echoes/local-business-schema-that-gets-found",
    summary: "LocalBusiness structured data does not directly boost rankings. What it does is state your business name, address, phone, hours and service area in a machine-readable form, so search engines and AI assistants do not have to guess them from your page copy. When that markup, your visible page and your Google Business Profile all agree, the facts are easy to trust. Here is the markup and what it will not do.",
    queries: [
      "local business schema markup",
      "how to add schema to a local business site",
      "localbusiness structured data for small business"
    ]
  },
{
    slug: "ai-search-vs-google",
    title: "AI search vs Google: what's changing for small-business discovery",
    url: "/echoes/ai-search-vs-google",
    summary: "Google is still where most people search, but an AI-generated answer now sits at the top of many Google results — and more questions go to ChatGPT, Perplexity and others instead. For a small business, one thing changed: ranking on page one no longer guarantees a click, and getting quoted in the answer is becoming a second, separate game.",
    queries: [
      "how is ai search different from google",
      "will ai search hurt my website traffic",
      "how will customers find my business with ai search",
      "is google search changing for small business",
      "what is changing with ai search and google",
    ],
  }
];

/** Lowercases, strips dollar/grouping signs and collapses whitespace, so a
 *  visitor's "$8,000" matches a query's "$8000". */
export function normalizeForMatch(value: string): string {
  return value.toLowerCase().replace(/[$,]/g, "").replace(/\s+/g, " ").trim();
}

/** Returns the first post whose queries match the message, or null. */
export function citePost(message: string): LaneCitation | null {
  const m = normalizeForMatch(message);
  for (const citation of CITATIONS) {
    for (const query of citation.queries) {
      if (m.includes(normalizeForMatch(query))) return citation;
    }
  }
  return null;
}

/** Data-integrity checks. Returns a list of problems; empty means clean. */
export function validateCitations(): string[] {
  const problems: string[] = [];
  const seenUrls = new Set<string>();
  const seenQueries = new Set<string>();
  for (const c of CITATIONS) {
    if (!c.slug) problems.push("citation with no slug");
    if (!c.title) problems.push(`${c.slug}: missing title`);
    if (!c.url) problems.push(`${c.slug}: missing url`);
    else if (c.url !== `/echoes/${c.slug}`) problems.push(`${c.slug}: url must be /echoes/<slug>`);
    if (seenUrls.has(c.url)) problems.push(`${c.slug}: duplicate url ${c.url}`);
    if (c.url) seenUrls.add(c.url);
    const words = (c.summary ?? "").trim().split(/\s+/).length;
    if (words < 20) problems.push(`${c.slug}: summary too short (${words} words, want ~40-60)`);
    if (!c.queries || c.queries.length === 0) problems.push(`${c.slug}: no queries`);
    else {
      for (const q of c.queries) {
        const norm = normalizeForMatch(q);
        if (seenQueries.has(norm)) problems.push(`${c.slug}: query "${q}" duplicates another post's query`);
        seenQueries.add(norm);
      }
    }
  }
  return problems;
}
