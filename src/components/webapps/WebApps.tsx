import Link from "next/link";
import { BANDS } from "@/lib/pricing";
import { PLANS } from "../plans";
import { Arrow } from "../motion/Arrow";
import common from "../brand/IdentityAtelier.module.css";
import { AppMock } from "./AppMock";
import { BuildStages } from "./BuildStages";
import styles from "./WebApps.module.css";

const plan = PLANS.find((p) => p.slug === "web-apps")!;
const phases = BANDS.find((b) => b.name === "Web apps")!.rows;

const kinds = [
  ["Client portals", "A private place for your customers to see their projects, documents, bookings or orders, without the email back-and-forth.", "Accounts · Roles · Documents · Notifications"],
  ["Internal tools", "Replace the spreadsheet everyone is afraid to touch with a tool shaped around how your team actually works.", "Dashboards · Approvals · Search · Exports"],
  ["Booking and ordering", "Let people request, book or order online, with the rules and follow-ups your business runs on.", "Availability · Payments as scoped · Confirmations"],
  ["Product MVPs", "A focused first version of a new product, built to test with real users before you invest further.", "One core workflow · Analytics · Room to grow"],
];

const questions = [
  ["Do we need discovery first?", "For most web apps, yes. Paid discovery defines the users, workflow and first version before the build is quoted, so the quote is based on decisions rather than guesses."],
  ["Who owns the app?", "You do. Once the project is paid in full, the design and code are yours."],
  ["Can it connect to the tools we already use?", "Integrations are agreed in the scope. We review the tools you rely on during discovery and confirm what the first version connects to."],
  ["How long does it take?", "It depends on the scope. Larger products are quoted in phases, and your written proposal includes the agreed timeline."],
  ["Can AI be part of it?", "Yes, as an optional add-on where it serves a clear purpose, such as search or an assistant. It is scoped and quoted separately from the core build."],
  ["What happens after launch?", "Ongoing design, development and care can be scoped and quoted separately once the app is live."],
];

/** The Web Apps offer page. Built on the same editorial system as Strategy. */
export function WebApps() {
  return (
    <main className={common.page}>
      <div className={common.container}>
        <section className={common.hero} aria-labelledby="webapps-title">
          <div className={common.heroCopy}>
            <Link className={common.eyebrow} href="/capabilities">
              {"// Core offer — Web Apps"}
            </Link>
            <h1 id="webapps-title">
              Software that
              <br />
              does the work.
            </h1>
            <p className={common.lead}>{plan.pitch}</p>
            <Link className={`${common.cta} arrowHost`} href="/contact#inquiry">
              Discuss your web app <Arrow className={common.arrow} />
            </Link>
          </div>
          <figure className={styles.heroArt}>
            <AppMock stage={3} autoplay />
            <figcaption>Illustrative interface · click a status</figcaption>
          </figure>
        </section>

        <section className={styles.section} aria-labelledby="stages-title">
          <div className={common.sectionHead}>
            <p className={common.eyebrow}>01 / How it comes together</p>
            <div>
              <h2 id="stages-title">
                From workflow
                <br />
                to working product.
              </h2>
              <p className={common.body}>
                Every web app starts as a process someone already runs by hand. We shape it, step by step, into software your users rely
                on.
              </p>
            </div>
          </div>
          <BuildStages />
        </section>

        <section className={styles.section} aria-labelledby="kinds-title">
          <div className={common.sectionHead}>
            <p className={common.eyebrow}>02 / What we build</p>
            <div>
              <h2 id="kinds-title">Built around what your users need to do.</h2>
              <p className={common.body}>Typical starting points. Your app is shaped around your own workflow, not a template.</p>
            </div>
          </div>
          <ol className={common.deliverableList}>
            {kinds.map(([title, copy, often], i) => (
              <li key={title}>
                <span className={common.number}>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p className={styles.often}>{often}</p>
                </div>
                <p className={common.body}>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="phases-title">
          <div className={common.sectionHead}>
            <p className={common.eyebrow}>03 / How it&apos;s phased</p>
            <div>
              <h2 id="phases-title">Start focused. Grow with evidence.</h2>
              <p className={common.body}>
                Discovery first, then a focused first version, then the next phase once real users have tried it. Each phase is quoted on
                its own.
              </p>
            </div>
          </div>
          <ol className={styles.phases}>
            {phases.map((p, i) => (
              <li key={p.name}>
                <span className={common.eyebrow}>Phase 0{i + 1}</span>
                <h3>{p.name}</h3>
                <p className={styles.phasePrice}>{p.price}</p>
                <p className={common.body}>{p.detail}</p>
              </li>
            ))}
          </ol>
          <p className={common.scope}>
            Starting ranges, not a fixed total. Every project is quoted to its written scope. <Link href="/pricing">See all pricing</Link>
          </p>
        </section>

        <section className={styles.section} aria-labelledby="included-title">
          <div className={common.sectionHead}>
            <p className={common.eyebrow}>04 / What you get</p>
            <div>
              <h2 id="included-title">Strategy, design and development, together.</h2>
              <ul className={styles.included}>
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={common.body}>We agree the deliverables, scope and timeline in your written proposal before work starts.</p>
            </div>
          </div>
        </section>

        <section className={common.faq} aria-labelledby="webapps-faq">
          <div className={common.sectionHead}>
            <p className={common.eyebrow}>05 / Good to know</p>
            <div>
              <h2 id="webapps-faq">Before we begin.</h2>
              <p className={common.body}>The practical details, from the first conversation to launch.</p>
            </div>
          </div>
          <div className={common.questions}>
            {questions.map(([q, a]) => (
              <details key={q} className={common.question}>
                <summary>
                  {q}
                  <span className={common.plus} aria-hidden="true" />
                </summary>
                <p className={common.body}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={common.close} aria-labelledby="webapps-close">
          <div>
            <p className={common.eyebrow}>06 / Let&apos;s build</p>
            <h2 id="webapps-close">
              Start with
              <br />
              the workflow.
            </h2>
          </div>
          <div className={common.nextStep}>
            <p className={common.body}>
              Tell us who will use it and what they need to get done. We&apos;ll discuss the brief, then outline discovery, cost and timeline.
            </p>
            <Link className={`${common.cta} arrowHost`} href="/contact#inquiry">
              Discuss your web app <Arrow className={common.arrow} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
