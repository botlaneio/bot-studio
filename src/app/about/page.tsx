import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Arrow } from "@/components/motion/Arrow";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import { SheridanClock } from "@/components/SheridanClock";
import styles from "./about.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About us",
  description: "Botlane Studios is the design studio of BotLane LLC: a small team in Sheridan, Wyoming, building websites for brands worldwide.",
});

const PRINCIPLES = [
  { title: "Craft over volume", text: "We take on fewer projects so each one gets our full attention, down to the last pixel and the last millisecond." },
  { title: "A direct line", text: "You talk to the people designing and building your site. No account layers, no game of telephone." },
  { title: "Performance is design", text: "Speed, accessibility and search are part of the design from day one, not a checklist at the end." },
  { title: "Built to hand over", text: "Clean code, a CMS your team can run and real documentation, so the site keeps working long after launch." },
];

const STEPS = [
  { title: "Discovery", text: "We start by listening. Goals, challenges and vision, mapped out before anything is drawn." },
  { title: "Strategy", text: "Positioning, priorities and structure. Every piece gets a place before it gets a look." },
  { title: "Design & Build", text: "Visuals, motion and code come together, with sharp attention to detail." },
  { title: "Launch & Grow", text: "Delivery is the beginning. We measure, refine and keep it performing." },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

export default function AboutPage() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// 00.04° About us"
        title="A small studio with a worldwide reach"
        mark="."
        lede="Botlane Studios is the design studio of BotLane LLC. We make websites for brands that care how they look, how they read and how fast they load."
      />

      {/* Atmosphere: one of the studio's images, full width. */}
      <div className={styles.band} data-reveal="" aria-hidden="true">
        <div className={styles.bandImage} />
      </div>

      <section className={page.section}>
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            The studio
          </span>
          <div>
            <h2 className={page.h2} data-reveal="">
              Websites with the care of a product<b>.</b>
            </h2>
            <p className={`${page.body} ${styles.spaced}`} data-reveal="" style={delay(0.05)}>
              BotLane builds private, managed AI systems at{" "}
              <a className={styles.inline} href="https://botlane.io" target="_blank" rel="noopener">
                botlane.io
              </a>
              . Botlane Studios brings the same standards to the web: considered design, motion with a purpose and engineering that holds
              up, for brands that want a site to be proud of.
            </p>
            <p className={page.body} data-reveal="" style={delay(0.1)}>
              We are small on purpose. It keeps us close to every project, quick to decide and honest about what will move the needle.
            </p>
          </div>
        </div>
      </section>

      <section className={page.section}>
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            What we believe
          </span>
          <h2 className={page.h2} data-reveal="">
            Four principles behind every site<b>.</b>
          </h2>
        </div>
        <div className={page.cards}>
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className={page.card} data-reveal="" style={delay(i * 0.06)}>
              <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={page.cardTitle}>{p.title}</h3>
              <p className={page.cardText}>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            How we work
          </span>
          <div className={styles.headRow}>
            <h2 className={page.h2} data-reveal="">
              Four steps, from first call to launch<b>.</b>
            </h2>
            <Link className={`${styles.more} arrowHost`} href="/#process" data-reveal="">
              Watch it assemble
              <Arrow className={styles.moreArrow} />
            </Link>
          </div>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={styles.step} data-reveal="" style={delay(i * 0.06)}>
              <span className={styles.stepNum}>{`//0${i + 1}`}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={page.section}>
        <div className={styles.where} data-reveal="">
          <div>
            <span className={page.label}>Where we are</span>
            <p className={styles.whereTitle}>Sheridan, Wyoming</p>
            <p className={styles.whereText}>Working with brands worldwide, across time zones.</p>
          </div>
          <div className={styles.clockBox}>
            <span className={page.label}>Our time</span>
            <SheridanClock className={styles.clock} />
          </div>
        </div>
      </section>
    </main>
  );
}
