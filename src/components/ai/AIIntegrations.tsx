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

/* The AI Integrations page: an optional add-on, laid out exactly like the two
   core offer pages so the offers read as one family. Everything below restates
   what the studio publishes; nothing promises a result, a model or a timeline
   the written proposal doesn't. */

/* Studio photography made for this page (public/ai). */
const scenes: FilmScene[] = [
  {
    label: "The question",
    title: <>Questions arrive<br />at all hours.</>,
    copy: "Customers ask the same things again and again, often after you’ve gone home.",
    image: "/ai/question.webp",
  },
  {
    label: "Your content",
    title: <>Answers you’ve<br />already written.</>,
    copy: "Grounded in your pages, documents and data. Nothing else.",
    image: "/ai/content.webp",
  },
  {
    label: "The hand-off",
    title: <>A person,<br />when it matters.</>,
    copy: "You decide where AI stops and your team takes over.",
    image: "/ai/person.webp",
  },
  {
    label: "The point",
    title: <>Less repetition.<br />More attention.</>,
    copy: "Botlane Studios. AI where it earns its place.",
    image: "/ai/time.webp",
  },
];

const moments = [
  { title: "The same questions, every day", text: "Opening hours, prices, delivery, how to book. Your team answers them by hand, over and over." },
  { title: "Visitors can’t find what’s there", text: "The answer is on your site somewhere, but people search in their own words and give up." },
  { title: "Work passed by hand", text: "Copying details from one tool to the next, summarising, sorting. Steps that slow your team down." },
  { title: "Enquiries that need sorting", text: "Every message lands in one inbox, and someone has to read each one to decide who should reply." },
];

/* Titles follow the AI Integrations capability includes (capabilities.ts). */
const scope: ScopeItem[] = [
  { stage: "Define", title: "Use case and success measure", detail: "One job the feature must do well, who it serves and how we will judge it, agreed first." },
  { stage: "Ground", title: "Data access, agreed in writing", detail: "Which content and systems it may use, and which it may not." },
  { stage: "Design", title: "Interface and hand-off design", detail: "How people meet it, how it shows its sources, and how it passes to your team." },
  { stage: "Build", title: "Integration into your site or app", detail: "Built into the product we design and develop, connected to your tools as scoped." },
  { stage: "Hand over", title: "Testing, guardrails and handover", detail: "Tested against real questions before release, then handed over with notes for your team." },
];

const kinds = [
  { title: "Assistants", text: "Answer from your own pages and documents, show where an answer came from, and hand over to a person when they should." },
  { title: "Smart search", text: "Visitors describe what they need in their own words and find the right product, page or article." },
  { title: "Automations", text: "Sorting, summarising and passing work between the tools you already use, with people deciding what matters." },
  { title: "Enquiry routing", text: "Every form and conversation becomes a clear enquiry, labelled and sent to whoever handles it." },
];

const principles = [
  { title: "Grounded in your content", text: "Connected to the pages, documents and data you approve, and nothing else." },
  { title: "The right model for the job", text: "Chosen per feature, weighing quality, speed, running cost and where your data may go. We tell you why." },
  { title: "Connected to your tools", text: "Integrations with the systems you rely on are reviewed in discovery and agreed in the scope." },
  { title: "A person when it matters", text: "You decide what it may answer, what it passes to your team, and what it never does." },
];

const steps = [
  {
    title: "Agree the job",
    happens: "We pick one task where AI clearly helps, and say plainly when a simpler feature would do better.",
    receive: "A written use case, data access and scope, then a quote.",
    need: "Examples of the questions or work it should handle.",
  },
  {
    title: "Prototype on your content",
    happens: "A working prototype on a sample of your real content, so you judge it on your own material.",
    receive: "A prototype to try, with its answers and gaps visible.",
    need: "The content it should draw on, and someone to test it.",
  },
  {
    title: "Build it in",
    happens: "We build the feature into your website or web app, with its interface, guardrails and hand-offs.",
    receive: "A working version inside the product to review.",
    need: "Access to the tools it connects to, and feedback.",
  },
  {
    title: "Launch and review",
    happens: "Tested against real questions, released, then reviewed once people have used it.",
    receive: "The live feature and notes on how to manage it.",
    need: "Final sign-off, and the accounts it will run under.",
  },
];

const guardrails = [
  { title: "Clear it’s AI", text: "People can always tell when they’re talking to an assistant, and how to reach a person." },
  { title: "Access you agree", text: "It uses only the content and systems agreed in your scope, nothing more." },
  { title: "Tested before release", text: "Checked against real questions and edge cases before your customers see it." },
];

const addOns = [
  { title: "Websites", price: `From ${PRICE.websitesFrom}`, text: "An assistant or smart search inside a new marketing website.", href: "/capabilities/websites" },
  { title: "Web Apps", price: `From ${PRICE.webAppsFrom}`, text: "Automations and assistants built into a portal, tool or product.", href: "/capabilities/web-apps" },
  { title: "SEO & discoverability", price: "Quoted to scope", text: "Help the right people find the site your AI features live in.", href: "/capabilities/seo" },
  { title: "Ongoing care", price: "Quoted after launch", text: "Reviewing answers, updating content and tuning the feature once it is live.", href: "/contact#inquiry" },
];

const questions = [
  { q: "Is AI included in the website or web app price?", a: "No. AI integrations are an optional add-on, scoped and quoted separately from the core Websites or Web Apps build." },
  { q: "Can you add AI to a site you didn’t build?", a: "Our published offer adds AI to websites and web apps we design and build. If you have an existing product, tell us about it and we will say honestly what is possible." },
  { q: "Will it make things up?", a: "Any AI model can be wrong. We reduce that by grounding it in your approved content, showing sources, testing it against real questions and designing a clear hand-off to a person." },
  { q: "Which AI model do you use?", a: "It depends on the feature. We choose per project, weighing quality, speed, running cost and data requirements, and explain the choice in the proposal." },
  { q: "What about running costs?", a: "AI features usually carry usage costs from the model provider. Third-party costs are set out in your proposal so there are no surprises." },
  { q: "What happens to our data?", a: "The feature uses only the content and systems agreed in the scope. Data handling and the providers involved are agreed in writing before the build." },
  { q: "Do we actually need AI?", a: "Not always. Sometimes good navigation, search or a clear form does the job better, and we will tell you when that is the case." },
  { q: "Is the guide on this site AI?", a: "No. Lane answers from our published information without an AI model. For a short list of common questions, that was the right call." },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

function Cards({ items, numbered = true, cols }: { items: { title: string; text: string }[]; numbered?: boolean; cols?: number }) {
  return (
    <div className={page.cards} style={cols ? ({ "--cols": cols } as CSSProperties) : undefined}>
      {items.map((m, i) => (
        <article key={m.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
          {numbered && <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>}
          <h3 className={page.cardTitle}>{m.title}</h3>
          <p className={page.cardText}>{m.text}</p>
        </article>
      ))}
    </div>
  );
}

export function AIIntegrations() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// Optional add-on"
        title="AI Integrations"
        mark="."
        lede="Assistants, search and automations, designed and built into your website or app where they serve a clear purpose."
      />

      <section className={page.section} aria-label="An introduction to how Botlane Studios builds AI features">
        <EditorialFilm
          scenes={scenes}
          name="Botlane Studios: our approach to AI integrations"
          signature="Botlane / AI Integrations"
          summary="AI that answers from your own content, hands over to a person when it matters, and takes repetitive work off your team."
        />
      </section>

      <section className={page.section} aria-labelledby="moments-title">
        <Head id="moments-title" label="01 / When it’s the right call" title="When repetition is getting in the way" body="Most AI work starts with one of these. If none fits, we’ll say so: sometimes a clearer page or form does the job better." />
        <Cards items={moments} />
      </section>

      <OfferScope
        label="02 / From idea to launch"
        items={scope}
        cta="Discuss AI for your project"
        intro="Designed and built by the same team as your website or app, and quoted separately from the core build."
      />

      <section className={page.section} aria-labelledby="kinds-title">
        <Head id="kinds-title" label="03 / What we build" title="Four ways AI helps a website or app" body="Each one is built into the product we design, not bolted on afterwards." />
        <Cards items={kinds} />
      </section>

      <section className={page.section} aria-labelledby="principles-title">
        <Head id="principles-title" label="04 / How we build it" title="Grounded in your business, within limits you set" />
        <Cards items={principles} />
      </section>

      <section className={page.section} aria-labelledby="steps-title">
        <Head id="steps-title" label="05 / How a project runs" title="Four stages, judged on your own content" body="Each stage ends with something you can try and question before the next begins." />
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

      <section className={page.section} aria-labelledby="guardrails-title">
        <Head id="guardrails-title" label="06 / Responsible by design" title="Clear, contained and tested" />
        <Cards items={guardrails} cols={3} />
        <Link className={styles.proof} href="/work#unpacked-title" data-reveal="">
          <span className={page.label}>On this site</span>
          <span>Lane, our guide, answers from published information only, without an AI model. See how it was built</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={page.section} aria-labelledby="addons-title">
        <Head id="addons-title" label="07 / Add it to" title="Part of a Websites or Web Apps project" body="AI integrations are quoted to scope, alongside the core build." />
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
        <Head id="faq-title" label="08 / Good to know" title="Questions we hear most" />
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

      <InspireClose heading={["Let’s find", "where AI", "earns its place"]} ctaLabel="Discuss AI for your project" />
    </main>
  );
}
