import type { CSSProperties } from "react";
import Link from "next/link";
import { BANDS, PRICE } from "@/lib/pricing";
import { InspireClose } from "../InspireClose";
import { PLANS } from "../plans";
import { PageHero } from "../page/PageHero";
import { EditorialFilm, type FilmScene } from "../page/EditorialFilm";
import { OfferHead as Head } from "../page/OfferHead";
import { OfferScope, type ScopeItem } from "../page/OfferScope";
import page from "../page/Page.module.css";
import styles from "../page/OfferPage.module.css";

const plan = PLANS.find((p) => p.slug === "web-apps")!;
const phases = BANDS.find((b) => b.name === "Web apps")!.rows;

/* Everything below restates what the studio already publishes (plans,
   pricing, terms, capability pages). Nothing here may promise a timeline,
   a result or a deliverable the written proposal doesn't. */

/* Stand-in studio photography: swap the `image` paths for new shots and
   nothing else needs to change. Portrait photos use `focus` to choose the
   band that shows in the 16:9 frame. */
const scenes: FilmScene[] = [
  {
    label: "The workflow",
    title: <>Your business.<br />As it runs today.</>,
    copy: "Every useful tool starts with work someone already does by hand.",
    image: "/strategy/launch.webp",
    focus: "50% 45%",
  },
  {
    label: "The people",
    title: <>Shaped around<br />who uses it.</>,
    copy: "Your customers. Your team. The person who signs off.",
    image: "/strategy/audience.webp",
    focus: "50% 55%",
  },
  {
    label: "The product",
    title: <>Then, we make<br />it work.</>,
    copy: "Interface, data and integrations. Considered together.",
    image: "/process/card-3.jpg",
  },
  {
    label: "The launch",
    title: <>Software.<br />Doing the work.</>,
    copy: "Botlane Studios. From discovery to launch.",
    image: "/capability-development.webp",
    focus: "50% 50%",
  },
];

const moments = [
  { title: "Run on spreadsheets and email", text: "The work gets done, but it lives in shared files, inboxes and people’s heads, and it gets harder as you grow." },
  { title: "Customers keep asking", text: "Where is my order? What’s the status? A portal answers the questions your team answers by hand every day." },
  { title: "A product idea to prove", text: "You want to put a focused first version in front of real users before investing in the full thing." },
  { title: "Tools that don’t fit", text: "Off-the-shelf software covers most of the job, and your team works around the rest." },
];

/* Titles match the Web Apps plan's includes (plans.ts). */
const scope: ScopeItem[] = [
  { stage: "Discover", title: "Strategy, discovery and prioritised scope", detail: "Your users, the workflow and what the first version must do, agreed before the build." },
  { stage: "Design", title: "User flows and interface design", detail: "Every path through the product, designed so people learn it quickly." },
  { stage: "Build", title: "Development and launch", detail: "Built in stages you can try along the way, then released." },
  { stage: "Connect", title: "Data, accounts and integrations as scoped", detail: "Sign-in, roles, your data and the tools you already use, as agreed." },
  { stage: "Hand over", title: "Testing and handover", detail: "Tested before release and handed over so your team can run it." },
];

const kinds = [
  { title: "Client portals", text: "A private place for customers to see their projects, documents, bookings or orders." },
  { title: "Internal tools", text: "Replace the spreadsheet everyone is afraid to touch with a tool shaped around how your team works." },
  { title: "Booking and ordering", text: "Let people request, book or order online, with the rules and follow-ups your business runs on." },
  { title: "Product MVPs", text: "A focused first version of a new product, built to test with real users before you invest further." },
];

const steps = [
  {
    title: "Paid discovery",
    happens: "We map the users, the workflow and the tools you already rely on, then agree what the first version must do.",
    receive: "A prioritised scope, then a written quote for the build.",
    need: "Time with the people who do the work today, and who signs off.",
  },
  {
    title: "Flows & design",
    happens: "Every path through the product is sketched, then designed, while decisions are still quick to change.",
    receive: "User flows, wireframes, then designed screens to review.",
    need: "Feedback from the people who will use it, consolidated at each review.",
  },
  {
    title: "Build in stages",
    happens: "We build in stages you can try along the way, connecting data, accounts and integrations as scoped.",
    receive: "Working versions to try before release.",
    need: "Access to the systems we connect to, and testing on your side.",
  },
  {
    title: "Launch & hand over",
    happens: "Testing, release, then handover. The next phase is scoped once real users have tried it.",
    receive: "The live app and a handover so your team can run it.",
    need: "Final sign-off, and the accounts the app will run under.",
  },
];

const standards = [
  { title: "Access by role", text: "Accounts and roles as scoped, so each person sees and does what their job needs." },
  { title: "Tested before release", text: "Each stage is tested before it reaches your users, and you try it before it goes live." },
  { title: "Accessible and responsive", text: "Built to WCAG 2.2 AA and usable on phones, tablets and desktops, in the browser." },
  { title: "Yours to own", text: "Documentation for your team, and once paid in full, the design and code are yours." },
];

const addOns = [
  { title: "AI integrations", price: "Quoted to scope", text: "Assistants, smart search or automations inside the app, where they serve a clear purpose.", href: "/capabilities/ai-systems" },
  { title: "Brand identity", price: PRICE.brandIdentity, text: "Naming, mark and visual system, for a new product that needs a brand to stand on.", href: "/pricing" },
  { title: "Marketing website", price: `From ${PRICE.websitesFrom}`, text: "A site that explains the product and brings people to it, scoped alongside the app.", href: "/capabilities/websites" },
  { title: "Ongoing care", price: "Quoted after launch", text: "Design, development and upkeep once the app is live, scoped to what you need.", href: "/contact#inquiry" },
];

const questions = [
  { q: "Do we need discovery first?", a: "For most web apps, yes. Paid discovery defines the users, workflow and first version before the build is quoted, so the quote is based on decisions rather than guesses." },
  { q: "What does a web app cost?", a: `Web apps start at ${PRICE.webAppsFrom}, plus discovery. The phases above are starting points; larger products are quoted in phases, not as one fixed total.` },
  { q: "Can it connect to the tools we already use?", a: "Integrations are agreed in the scope. We review the tools you rely on during discovery and confirm what the first version connects to." },
  { q: "Will it work on phones?", a: "Yes. We build web apps that run in the browser on phones, tablets and desktops. Native app-store apps aren’t part of our published offer." },
  { q: "How long does it take?", a: "It depends on the scope. Your written proposal includes the agreed timeline, and larger products are planned in phases." },
  { q: "Who owns the app?", a: "You do. Once the project is paid in full, the design and code are yours." },
  { q: "Can AI be part of it?", a: "Yes, as an optional add-on where it serves a clear purpose, such as search or an assistant. It is scoped and quoted separately from the core build." },
  { q: "What happens after launch?", a: "Ongoing design, development and care can be scoped and quoted separately once the app is live." },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** The Web Apps offer page: one of the studio's two core services. Same
 *  structure as Websites, so the two offers read as a pair. */
export function WebApps() {
  return (
    <main className={page.page}>
      <PageHero kicker="// Core offer" title={plan.name} mark="." lede={plan.pitch} />

      <section className={page.section} aria-label="An introduction to how Botlane Studios builds web apps">
        <EditorialFilm
          scenes={scenes}
          name="Botlane Studios: our approach to web apps"
          signature="Botlane / Web Apps"
          summary="We start from the work your business already does, shape it around the people who use it, and build software that does that work."
        />
      </section>

      <section className={page.section} aria-labelledby="moments-title">
        <Head id="moments-title" label="01 / When it’s the right call" title="When the work outgrows the tools" body="Most web app projects start with one of these. If yours is different, tell us about it." />
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

      <OfferScope label="02 / From discovery to launch" items={scope} cta="Discuss your web app" />

      <section className={page.section} aria-labelledby="kinds-title">
        <Head id="kinds-title" label="03 / What we build" title="Built around what your users need to do" body="Typical starting points. Your app is shaped around your own workflow, not a template." />
        <div className={page.cards}>
          {kinds.map((k, i) => (
            <article key={k.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={page.cardTitle}>{k.title}</h3>
              <p className={page.cardText}>{k.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={page.section} aria-labelledby="phases-title">
        <Head id="phases-title" label="04 / How it’s phased" title="Start focused. Grow with evidence" body="Discovery first, then a focused first version, then the next phase once real users have tried it. Each phase is quoted on its own." />
        <div className={page.cards} style={{ "--cols": 3 } as CSSProperties}>
          {phases.map((p, i) => (
            <article key={p.name} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>Phase {String(i + 1).padStart(2, "0")}</span>
              <h3 className={page.cardTitle}>{p.name}</h3>
              <p className={styles.price}>{p.price}</p>
              <p className={page.cardText}>{p.detail}</p>
            </article>
          ))}
        </div>
        <p className={styles.note} data-reveal="">
          Starting ranges, not a fixed total. <Link href="/pricing">See all pricing</Link>
        </p>
      </section>

      <section className={page.section} aria-labelledby="steps-title">
        <Head id="steps-title" label="05 / How a project runs" title="Four stages, nothing hidden" body="Each stage ends with something you can try, question and sign off before the next begins." />
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
        <Head id="standards-title" label="06 / Built into every app" title="Software your team can rely on" />
        <div className={page.cards}>
          {standards.map((s, i) => (
            <article key={s.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={page.cardTitle}>{s.title}</h3>
              <p className={page.cardText}>{s.text}</p>
            </article>
          ))}
        </div>
        <Link className={styles.proof} href="/work#inhouse-title" data-reveal="">
          <span className={page.label}>Proof</span>
          <span>See botlane.io: positioning, interface and build, done in-house</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={page.section} aria-labelledby="addons-title">
        <Head id="addons-title" label="07 / Add to it" title="Optional, when you need them" body="Scoped and quoted separately from the core build." />
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

      <InspireClose heading={["Let’s build", "the tool", "your team needs"]} ctaLabel="Discuss your web app" />
    </main>
  );
}
