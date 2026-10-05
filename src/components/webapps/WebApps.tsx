import type { CSSProperties } from "react";
import Link from "next/link";
import { BANDS } from "@/lib/pricing";
import { PLANS } from "../plans";
import { PageHero } from "../page/PageHero";
import { EditorialFilm, type FilmScene } from "../page/EditorialFilm";
import page from "../page/Page.module.css";
import service from "../../app/capabilities/capabilities.module.css";
import styles from "./WebApps.module.css";

const plan = PLANS.find((p) => p.slug === "web-apps")!;
const phases = BANDS.find((b) => b.name === "Web apps")!.rows;

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

const kinds = [
  { title: "Client portals", text: "A private place for customers to see their projects, documents, bookings or orders." },
  { title: "Internal tools", text: "Replace the spreadsheet everyone is afraid to touch with a tool shaped around how your team works." },
  { title: "Booking and ordering", text: "Let people request, book or order online, with the rules and follow-ups your business runs on." },
  { title: "Product MVPs", text: "A focused first version of a new product, built to test with real users before you invest further." },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** The Web Apps offer: the same structure and visual language as Websites. */
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

      <section className={page.section}>
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            What we build
          </span>
          <h2 className={page.h2} data-reveal="">
            Built around what your users need to do<b>.</b>
          </h2>
        </div>
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

      <section className={page.section}>
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            How it&apos;s phased
          </span>
          <h2 className={page.h2} data-reveal="">
            Start focused. Grow with evidence<b>.</b>
          </h2>
        </div>
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
          Starting ranges, not a fixed total. Every project is quoted to its written scope. <Link href="/pricing">See all pricing</Link>
        </p>
      </section>

      <section className={page.section} aria-labelledby="webapp-deliverables">
        <div className={page.sectionHead}>
          <span className={page.label}>From discovery to launch</span>
          <div className={service.serviceCopy}>
            <h2 id="webapp-deliverables" className={page.h2}>
              What you get<b>.</b>
            </h2>
            <ul className={service.deliverables}>
              {plan.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={page.body}>We agree the deliverables, scope and timeline in your written proposal before work starts.</p>
            <Link className={service.serviceCta} href="/contact#inquiry">
              Discuss your web app →
            </Link>
            <Link className={service.serviceBack} href="/capabilities">
              Explore all offers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
