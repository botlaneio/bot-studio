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
    summary: "Echoes only publishes what it can prove. Every note carries one of five evidence tags — Measured, Built, Decided, Briefed or Plainly — and a bordered evidence block with the raw asset: the numbers, the code, or the live link. A note without a tag and an evidence block cannot ship.",
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
    summary: "Every Echoes note follows the same skeleton: an answer-first intro, a bordered evidence block, the reasoning, something you can take, and the honest caveats. This note spells out that skeleton so a reader or a future writer can hold any note to the same standard.",
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
    summary: "We cut three features from our own site before they shipped: a comment system, a newsletter, and a dark-mode toggle. Each seemed reasonable at first, and each would have pulled time from the work we actually sell. Here is the rule we used to reject them.",
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
    summary: "We publish price bands — not exact quotes, not \"contact us\" — because the question a serious buyer actually has is \"am I in the right room.\" A band answers that in ten seconds. The rejected alternative was opaque pricing with a discovery-call gate; the reason is trust.",
    queries: [
      "why do you publish bands instead of contact us",
      "why show bands not a contact form"
    ]
  },
  {
    slug: "what-one-project-at-a-time-actually-constrains",
    title: "What \"one project at a time\" actually constrains",
    url: "/echoes/what-one-project-at-a-time-actually-constrains",
    summary: "\"One project at a time\" is a scheduling and focus rule, not a revenue promise. It protects calendar predictability, design depth, and the capacity to say no — at the cost of slower billing growth. It does not guarantee quality; that comes from the process behind it.",
    queries: [
      "what does one project at a time mean",
      "why does the studio take one project at a time"
    ]
  },
  {
    slug: "figma-to-nextjs-no-page-builder",
    title: "Designed in Figma, rebuilt by hand: why no page builder",
    url: "/echoes/figma-to-nextjs-no-page-builder",
    summary: "The studio's site is designed in Figma and rebuilt in Next.js by hand, with no page builder in the middle. It is a decision, not an accident — trading a little speed for ownership of every pixel, zero runtime dependencies, and no third-party platform lock-in.",
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
    summary:
      "FORME was a self-set study, not a client job. We gave ourselves the problem of making a knitwear label feel tactile on a phone screen, then took it from a one-page brief through structure, design and build, and measured the result.",
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
    summary: "NORTHLINE was a self-set study in branding a consultancy to feel experienced rather than corporate-cold: one navy color, one gold accent, a signature rule, and caveats at the page level, measured by whether a senior buyer trusts it at first glance.",
    queries: [
      "what was the northline study",
      "what was the northline consultancy study"
    ]
  },
{
    slug: "one-page-website-brief-template",
    title: "The one-page brief we write before anything is drawn",
    url: "/echoes/one-page-website-brief-template",
    summary:
      "Every project that ships clean started with a brief that fit on one page. This note publishes the exact template we use at Botlane Studios: eleven sections that force the hard decisions before a single pixel is designed. The template is the takeaway — download it, adapt it, use it.",
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
    summary: "We practise on imagined clients because real clients rarely expose the full shape of our process. A self-set study removes the filters real work imposes — we set the brief, choose the constraints, design, build, and measure it ourselves. It protects the habit of finishing.",
    queries: [
      "why do you practice on imagined clients",
      "what is a self set study",
      "why do self set design studies"
    ]
  },
{
    slug: "our-sites-real-mobile-performance",
    title: "Our site's real mobile performance — measured, and the changes we're making",
    url: "/echoes/our-sites-real-mobile-performance",
    summary:
      "We measured our own site on a throttled mobile profile, and we are publishing the numbers that need work, not the ones we wish we had: Performance 76, LCP 3.1 s, INP 330 ms, CLS 0. The hero loads slowly, and our animation JavaScript blocks taps. Here is the plan, and this note updates as each change ships.",
    queries: [
      "how fast is your website",
      "what is your lighthouse score",
      "why is your site slow",
      "how do you improve mobile performance",
    ],
  },
  {
    slug: "your-site-feels-slow-on-a-phone",
    title: "Your site feels slow on a phone — the five usual causes",
    url: "/echoes/your-site-feels-slow-on-a-phone",
    summary: "A phone-slow site is almost never one bug — it is usually one of five causes, each mapping to a Core Web Vital: the hero image blocking LCP, JavaScript hydration blocking INP, embeds shifting layout, unchunked JavaScript, and the gap between lab and field data.",
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
    summary: "Core Web Vitals are three numbers Google uses to measure whether a site feels fast: Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift. Our studio site scores 76 overall. Here is what each metric means for a business owner.",
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
    summary: "The studio's hero used a continuous animation and a parallax layer that made the page unreadable to anyone who sets prefers-reduced-motion: reduce. We gated the animation, removed the parallax, and the design did not flatten — it finished, with the numbers to show it.",
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
    summary: "The WCAG 2.2 AA checklist covers the 17 criteria that actually affect marketing-site conversions — not the full spec — including the 2022 additions and a 15-minute manual test protocol. It is ungated, CC0, and the checklist is the takeaway.",
    queries: [
      "wcag 2.2 aa checklist",
      "web accessibility checklist",
      "wcag checklist for a marketing site"
    ]
  },
{
    slug: "what-8000-buys",
    title: "What an $8,000 website should actually include",
    url: "/echoes/what-8000-buys",
    summary:
      "An $8,000 website buys strategy, design and development carried by one team from first call to launch. It does not buy a logo, copywriting, hosting or ongoing care — those are quoted separately. Here's what is actually in scope at our starting range, and what is not.",
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
    summary: "Most quotes look similar — a price, a timeline, a list of pages. The difference is what they leave out: the definition of done, the performance budget, the change-control process, and who owns the repo and DNS. Here is the checklist to tell them apart.",
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
    summary: "Seven questions separate studios who ship from studios who sell: their definition of done, who owns the repo and analytics, change control, performance budgets, content handling, post-launch support, and whether they can name a failure and the fix.",
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
    summary: "If your site has fewer than 1,000 visits a month, a single conversion path, and no custom backend, you do not need a studio. A hosted landing page, a template, or a single-page builder is almost always faster, cheaper, and easier to maintain. Here is when to hire nothing.",
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
    summary: "In 2026 a website costs $0–$500/month DIY, $1,500–$10,000 via freelancer, or $10,000–$100,000+ via agency — but the build is only half the bill. Hosting, maintenance, and iteration over three years often match or exceed the original build. Here is where the money actually goes.",
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
    summary:
      "AI assistants don't read a site the way a person does. They read its text, structure and structured data, then quote from it. Here's how they see a website, with real query traces, and what a small business can do to be cited accurately.",
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
    summary:
      "Lane is this site's guide. It answers only from published studio information — no invented prices, results or timelines — and it never claims to book a call or to have sent an inquiry. Here's how it works and why it refuses to lie.",
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
    summary: "LocalBusiness schema is not a ranking factor, but it is the only way to hand Google, Bing, and AI assistants clean, unambiguous facts about your business. Here is the markup that earns rich results, the properties that move the needle, and the honest caveats.",
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
    summary:
      "Google is still where most people search, but an AI-generated answer now sits at the top of many Google results — and more questions go to ChatGPT, Perplexity and others instead. For a small business, one thing changed: ranking on page one no longer guarantees a click, and getting quoted in the answer is becoming a second, separate game.",
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
