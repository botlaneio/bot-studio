import type { CSSProperties } from "react";
import Link from "next/link";
import { BANDS, PRICE } from "@/lib/pricing";
import { InspireClose } from "../InspireClose";
import { PLANS } from "../plans";
import { PageHero } from "../page/PageHero";
import { OfferScope, type ScopeItem } from "../page/OfferScope";
import page from "../page/Page.module.css";
import { WebsiteIntro } from "./WebsiteIntro";
import styles from "./Websites.module.css";

const plan = PLANS.find((p) => p.slug === "websites")!;
const bands = BANDS.find((b) => b.name === "Websites")!.rows;

/* Everything below restates what the studio already publishes (plans,
   pricing, terms, capability pages). Nothing here may promise a timeline,
   a result or a deliverable the written proposal doesn't. */

const moments = [
  { title: "Launching something new", text: "A new business, offer or product that needs to be understood quickly and look credible from the first visit." },
  { title: "Outgrown your current site", text: "The business has moved on, but the site still describes who you were. Hard to update, slow, or off-brand." },
  { title: "Repositioning", text: "A new audience, a sharper offer or a higher price point that your current site can’t carry." },
  { title: "Visitors, but few enquiries", text: "People arrive, but the path from first impression to a conversation isn’t clear." },
];

/* Titles match the Websites plan's includes (plans.ts). */
const scope: ScopeItem[] = [
  { stage: "Plan", title: "Strategy, audience and site structure", detail: "Who the site is for, what it needs to say and which pages do the work." },
  { stage: "Design", title: "Custom responsive design", detail: "Designed for your brand and your visitors, on every screen size." },
  { stage: "Build", title: "Development and launch", detail: "Built on a modern stack, tested, and taken live." },
  { stage: "Edit", title: "Content management where needed", detail: "Update the pages that change often without calling a developer." },
  { stage: "Perform", title: "Performance, accessibility and search basics", detail: "Fast pages, accessible markup and the technical search essentials." },
];

const steps = [
  {
    title: "Discovery",
    happens: "A conversation about your goals, audience, current site and constraints. We agree what the website needs to achieve.",
    receive: "A written brief, then a proposal with scope, timeline and quote.",
    need: "Your goals, any existing material, and who signs off.",
  },
  {
    title: "Strategy",
    happens: "Positioning, the purpose of each page and the visitor’s path to an enquiry, decided before anything is designed.",
    receive: "A site map and content plan.",
    need: "Feedback on the direction, and the content you already have.",
  },
  {
    title: "Design & Build",
    happens: "Design and development move together, through reviews you can see and click through.",
    receive: "Wireframes, then designed pages, then a working build to review.",
    need: "Consolidated feedback at each agreed review, plus final copy and images.",
  },
  {
    title: "Launch & Grow",
    happens: "Testing across devices, then launch. Ongoing care and improvements can be scoped afterwards.",
    receive: "A launch checklist, the live site and a handover so your team can run it.",
    need: "Domain and account access, and your final sign-off.",
  },
];

const standards = [
  { title: "Fast by design", text: "Performance is part of the design from day one: optimised images, lean code and hosting chosen for speed." },
  { title: "Accessible", text: "Built to WCAG 2.2 AA, so more of your visitors can use it, on any device." },
  { title: "Ready for search", text: "Clean structure, metadata, a sitemap and fast pages. Ongoing SEO is an optional add-on." },
  { title: "Yours to run", text: "A CMS where you need one and documentation for your team. Once paid in full, the design and code are yours." },
];

const addOns = [
  { title: "Brand identity", price: PRICE.brandIdentity, text: "Naming, mark and visual system, added when your website needs a brand to stand on.", href: "/pricing" },
  { title: "SEO & discoverability", price: "Quoted to scope", text: "A programme for search visibility and content, beyond the technical basics in every build.", href: "/capabilities/seo" },
  { title: "AI integrations", price: "Quoted to scope", text: "Assistants, smart search or automations, where they serve a clear purpose.", href: "/capabilities/ai-systems" },
  { title: "Ongoing care", price: "Quoted after launch", text: "Design, development and upkeep once your site is live, scoped to what you need.", href: "/contact#inquiry" },
];

const questions = [
  { q: "Can you redesign our existing website?", a: "Yes. We review what you have, keep what works and plan the new site around what your business needs now. How existing pages and links carry over is planned as part of the scope." },
  { q: "Who writes the copy?", a: "We plan the content together during strategy. Focused projects assume you supply the final copy; who writes it for larger projects is agreed in your proposal." },
  { q: "Can we update the site ourselves?", a: "Yes, where you need to. We set up content management for the pages that change often and document how to use it." },
  { q: "How long does a website take?", a: "It depends on the scope and on how quickly decisions and content come together. Your written proposal includes the agreed timeline." },
  { q: "What does a website cost?", a: `Websites start at ${PRICE.websitesFrom}. The bands above are starting points; every project is quoted to its written scope after a first conversation.` },
  { q: "Who owns the website?", a: "You do. Once the project is paid in full, the design and code are yours." },
  { q: "Do you host and maintain it?", a: "Hosting and analytics can be set up as part of the scope. Ongoing care is quoted separately after launch." },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

function Head({ label, title, body, id }: { label: string; title: string; body?: string; id: string }) {
  return (
    <div className={page.sectionHead}>
      <span className={page.label} data-reveal="">
        {label}
      </span>
      <div>
        <h2 id={id} className={page.h2} data-reveal="">
          {title}
          <b>.</b>
        </h2>
        {body && (
          <p className={`${page.body} ${styles.headBody}`} data-reveal="" style={delay(0.05)}>
            {body}
          </p>
        )}
      </div>
    </div>
  );
}

/** The Websites offer page: one of the studio's two core services. */
export function Websites() {
  return (
    <main className={page.page}>
      <PageHero kicker="// Core offer" title={plan.name} mark="." lede={plan.pitch} />

      <section className={page.section} aria-label="An introduction to how Botlane Studios creates websites">
        <WebsiteIntro />
      </section>

      <section className={page.section} aria-labelledby="moments-title">
        <Head id="moments-title" label="01 / When it’s the right call" title="Your website is often the first meeting" body="Most projects start with one of these moments. If yours is different, tell us about it." />
        <div className={page.cards}>
          {moments.map((m, i) => (
            <article key={m.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={page.cardTitle}>{m.title}</h3>
              <p className={page.cardText}>{m.text}</p>
            </article>
          ))}
        </div>
      </section>

      <OfferScope label="02 / From brief to launch" items={scope} cta="Discuss your website" />

      <section className={page.section} aria-labelledby="bands-title">
        <Head id="bands-title" label="03 / How it’s scoped" title="Three starting points" body="Pick the band that sounds closest. Every band includes the strategy, design and development above; your written quote follows the agreed scope." />
        <div className={page.cards} style={{ "--cols": 3 } as CSSProperties}>
          {bands.map((b, i) => (
            <article key={b.name} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>{b.name}</span>
              <p className={styles.price}>{b.price}</p>
              <p className={page.cardText}>{b.detail}</p>
            </article>
          ))}
        </div>
        <p className={styles.note} data-reveal="">
          Starting ranges, not a fixed total. <Link href="/pricing">See all pricing</Link>
        </p>
      </section>

      <section className={page.section} aria-labelledby="steps-title">
        <Head id="steps-title" label="04 / How a project runs" title="Four stages, nothing hidden" body="Each stage ends with something you can read, question and sign off before the next begins." />
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
          Review rounds and milestones are agreed in your proposal. <Link href="/work#process-title">See sample deliverables</Link>
        </p>
      </section>

      <section className={page.section} aria-labelledby="standards-title">
        <Head id="standards-title" label="05 / Built into every site" title="The parts you don’t see, done properly" />
        <div className={page.cards}>
          {standards.map((s, i) => (
            <article key={s.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={page.cardTitle}>{s.title}</h3>
              <p className={page.cardText}>{s.text}</p>
            </article>
          ))}
        </div>
        <Link className={styles.proof} href="/work#unpacked-title" data-reveal="">
          <span className={page.label}>Proof</span>
          <span>You’re looking at one. See what went into building botlane.studio</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={page.section} aria-labelledby="addons-title">
        <Head id="addons-title" label="06 / Add to it" title="Optional, when you need them" body="Scoped and quoted separately from the core build." />
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

      <InspireClose heading={["Let’s give", "your story", "a place"]} ctaLabel="Discuss your website" />
    </main>
  );
}
