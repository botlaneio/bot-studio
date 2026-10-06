import type { CSSProperties } from "react";
import Link from "next/link";
import { PRICE } from "@/lib/pricing";
import { InspireClose } from "../InspireClose";
import { PageHero } from "../page/PageHero";
import { EditorialFilm, type FilmScene } from "../page/EditorialFilm";
import { OfferHead as Head } from "../page/OfferHead";
import { OfferScope, type ScopeItem } from "../page/OfferScope";
import page from "../page/Page.module.css";
import styles from "../page/OfferPage.module.css";

/* The SEO & Discoverability page: an optional add-on, laid out like the core
   offer pages. Honesty first: no ranking guarantees, no invented results, and
   a clear line between the technical basics every build already includes and
   the separately scoped programme. */

/* Studio photography made for this page (public/seo). */
const scenes: FilmScene[] = [
  {
    label: "The search",
    title: <>Someone is looking<br />right now.</>,
    copy: "For what you do, in their own words.",
    image: "/seo/search.webp",
  },
  {
    label: "The questions",
    title: <>First, learn<br />what they ask.</>,
    copy: "The words people use, and the intent behind them.",
    image: "/seo/questions.webp",
  },
  {
    label: "The page",
    title: <>Then, answer it<br />properly.</>,
    copy: "Pages that are useful, fast and clearly structured.",
    image: "/seo/page.webp",
  },
  {
    label: "The visit",
    title: <>Found by the<br />people you want.</>,
    copy: "Botlane Studios. Search, done honestly.",
    image: "/seo/found.webp",
  },
];

const moments = [
  { title: "A new site that needs finding", text: "You’ve launched or are about to, and want the right people to find it, not just the people who already know your name." },
  { title: "Found for the wrong things", text: "People arrive from searches that have little to do with what you sell, and leave just as quickly." },
  { title: "Competitors show up, you don’t", text: "Search for what you do, and other businesses appear first, even when your offer is the better fit." },
  { title: "Content without a plan", text: "You publish now and then, but nobody has mapped what your customers actually search for." },
];

/* Titles follow the SEO capability includes (capabilities.ts). */
const scope: ScopeItem[] = [
  { stage: "Review", title: "Search and visibility review", detail: "Where you appear today, what is holding pages back, and what the searches you care about return." },
  { stage: "Plan", title: "Content and keyword planning", detail: "The questions your customers ask, mapped to the pages worth improving or writing." },
  { stage: "Mark up", title: "Structured data where relevant", detail: "Helping search engines understand your business, services and pages, where it applies." },
  { stage: "Improve", title: "Ongoing optimisation as scoped", detail: "Regular improvements and reporting, at the cadence agreed in your scope." },
];

const included = [
  "Fast, lightweight pages",
  "Clean, logical page structure",
  "Titles, descriptions and link previews",
  "A sitemap and search-friendly URLs",
  "Accessible markup",
];

const programme = [
  "Research into what your customers search for",
  "A content and keyword plan",
  "Structured data for your business and services",
  "Page improvements over time",
  "Reporting on what changed",
];

const steps = [
  {
    title: "Review",
    happens: "We look at where you appear today, the searches that matter to your business and what competing pages do well.",
    receive: "Written findings and a short list of priorities.",
    need: "Access to Search Console or analytics, if you have them.",
  },
  {
    title: "Plan",
    happens: "We map customer questions to pages, deciding what to improve, what to write and what to leave alone.",
    receive: "A content and keyword plan, then a scope and quote.",
    need: "What you know about your customers, and approval of the plan.",
  },
  {
    title: "Improve",
    happens: "Page structure, content and structured data are improved on the agreed pages.",
    receive: "Changes to review before they go live.",
    need: "Feedback, and subject knowledge for content.",
  },
  {
    title: "Measure and refine",
    happens: "We watch what changes and adjust, at the cadence agreed in your scope.",
    receive: "Regular reporting in plain language.",
    need: "Time to review the reports together.",
  },
];

const promises = [
  { title: "No ranking guarantees", text: "Nobody controls where a search engine ranks a page. We commit to the work and to reporting honestly on it." },
  { title: "No shortcuts", text: "No link schemes or tricks that put your site at risk. Useful pages, built properly." },
  { title: "Plain-language reporting", text: "You see what we changed and what happened next, without jargon." },
];

const addOns = [
  { title: "Websites", price: `From ${PRICE.websitesFrom}`, text: "A new marketing website, with the technical search basics built in from day one.", href: "/capabilities/websites" },
  { title: "Web Apps", price: `From ${PRICE.webAppsFrom}`, text: "The public pages of a product or portal, found by the people it’s for.", href: "/capabilities/web-apps" },
  { title: "AI integrations", price: "Quoted to scope", text: "Smart search or an assistant that helps visitors once search has brought them in.", href: "/capabilities/ai-systems" },
  { title: "Ongoing care", price: "Quoted after launch", text: "Keeping the site fast, current and healthy once it is live.", href: "/contact#inquiry" },
];

const questions = [
  { q: "Can you guarantee first place on Google?", a: "No, and be wary of anyone who does. Search engines decide rankings. We commit to doing the work properly and reporting on it honestly." },
  { q: "Isn’t SEO included in my website?", a: "The technical basics are: fast pages, clean structure, metadata, a sitemap and accessible markup. Research, content planning and ongoing optimisation are this separately scoped add-on." },
  { q: "How long until we see results?", a: "Search takes time, and progress is usually measured in months rather than weeks. How quickly depends on your starting point and the searches you are competing for." },
  { q: "Do you write the content?", a: "Content planning is part of the programme. Who writes the final content is agreed in your proposal." },
  { q: "Can you do SEO on a site you didn’t build?", a: "Our published offer covers sites we design and build. If you have an existing site, tell us about it and we will say honestly what is possible." },
  { q: "What does SEO cost?", a: "It is quoted to scope, with no published fixed price. After a short conversation we send a written quote with what is included." },
  { q: "Do we need it from day one?", a: "Not always. Every build already includes the technical basics. Many businesses start there and add a programme once the site is live." },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

function Cards({ items, cols }: { items: { title: string; text: string }[]; cols?: number }) {
  return (
    <div className={page.cards} style={cols ? ({ "--cols": cols } as CSSProperties) : undefined}>
      {items.map((m, i) => (
        <article key={m.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
          <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={page.cardTitle}>{m.title}</h3>
          <p className={page.cardText}>{m.text}</p>
        </article>
      ))}
    </div>
  );
}

export function SEO() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// Optional add-on"
        title="SEO & Discoverability"
        mark="."
        lede="A programme that helps the right people find your website, beyond the technical basics every build already includes."
      />

      <section className={page.section} aria-label="An introduction to how Botlane Studios approaches search">
        <EditorialFilm
          scenes={scenes}
          name="Botlane Studios: our approach to SEO"
          signature="Botlane / SEO"
          summary="We learn what your customers search for, answer it with useful, well-built pages, and report honestly on what changes."
        />
      </section>

      <section className={page.section} aria-labelledby="moments-title">
        <Head id="moments-title" label="01 / When it’s the right call" title="When the right people can’t find you" body="Most SEO work starts with one of these. If yours is different, tell us about it." />
        <Cards items={moments} />
      </section>

      <OfferScope
        label="02 / From review to results"
        items={scope}
        cta="Discuss SEO for your site"
        intro="A separately scoped programme on top of the technical basics every Botlane build already includes."
      />

      <section className={page.section} aria-labelledby="compare-title">
        <Head id="compare-title" label="03 / What’s included where" title="The basics come with every build" body="So you only pay for the programme when you want to grow beyond them." />
        <div className={page.cards} style={{ "--cols": 2 } as CSSProperties}>
          <article className={page.card} data-reveal="">
            <span className={page.cardNum}>In every Websites and Web Apps build</span>
            <h3 className={page.cardTitle}>Technical basics</h3>
            <ul className={styles.ticks}>
              {included.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <article className={page.card} data-reveal="" style={delay(0.06)}>
            <span className={page.cardNum}>The SEO add-on</span>
            <h3 className={page.cardTitle}>A programme for growth</h3>
            <ul className={`${styles.ticks} ${styles.ticksMuted}`}>
              {programme.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={page.section} aria-labelledby="steps-title">
        <Head id="steps-title" label="04 / How a programme runs" title="Four stages, reported plainly" body="Each stage ends with something you can read, question and sign off before the next begins." />
        <div className={styles.stepsHead} aria-hidden="true">
          <span />
          <span>What happens</span>
          <span>You receive</span>
          <span>We need from you</span>
        </div>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step} data-reveal="" style={delay(i * 0.05)}>
              <div className={styles.stepName}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
              </div>
              <p>
                <em>What happens</em>
                {s.happens}
              </p>
              <p>
                <em>You receive</em>
                {s.receive}
              </p>
              <p>
                <em>We need from you</em>
                {s.need}
              </p>
            </li>
          ))}
        </ol>
        <p className={styles.note} data-reveal="">
          Scope, cadence and reporting are agreed in your proposal.
        </p>
      </section>

      <section className={page.section} aria-labelledby="promises-title">
        <Head id="promises-title" label="05 / How we work" title="Honest about what search can do" />
        <Cards items={promises} cols={3} />
        <Link className={styles.proof} href="/work#unpacked-title" data-reveal="">
          <span className={page.label}>Proof</span>
          <span>botlane.studio itself: per-page previews, structured data and a sitemap. See what went into it</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={page.section} aria-labelledby="addons-title">
        <Head id="addons-title" label="06 / Pair it with" title="Search works best on a site built for it" body="SEO is quoted to scope, alongside or after the core build." />
        <ul className={styles.addons}>
          {addOns.map((a) => (
            <li key={a.title} data-reveal="">
              <Link href={a.href} className={styles.addon}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className={styles.addonPrice}>{a.price}</span>
                <span className={styles.addonArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={page.section} aria-labelledby="faq-title">
        <Head id="faq-title" label="07 / Good to know" title="Questions we hear most" />
        <div className={styles.faq}>
          {questions.map((f) => (
            <details key={f.q} className={styles.qa} data-reveal="">
              <summary>
                {f.q}
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <InspireClose heading={["Let’s get", "you found", "by the right people"]} ctaLabel="Discuss SEO for your site" />
    </main>
  );
}
