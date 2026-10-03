import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { PLANS } from "@/components/plans";
import { Arrow } from "@/components/motion/Arrow";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing",
  description: "Three ways to work with Botlane Studios, each quoted to its scope before any work starts.",
};

const FAQ = [
  {
    q: "How do you price a project?",
    a: "Every project is quoted to its scope. After a short call we send a fixed quote, with what's included and a timeline, before any work starts.",
  },
  {
    q: "How long does a website take?",
    a: "It depends on the scope: a focused launch site moves faster than a brand and multi-page build. Your quote includes a timeline we commit to.",
  },
  {
    q: "Do you work with clients outside the US?",
    a: "Yes. We're based in Sheridan, Wyoming and work with brands worldwide, remotely and across time zones.",
  },
  {
    q: "Who owns the website when it's done?",
    a: "You do. Once the project is paid in full, the design and code are yours.",
  },
  {
    q: "Can you look after the site after launch?",
    a: "Yes. The Partner plan covers ongoing design, development and care, or we can agree support as and when you need it.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short brief: what you do, who it's for and what you'd like the site to achieve. We'll shape the rest together on the first call.",
  },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

export default function PricingPage() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// 00.05° Pricing"
        title="Clear scope, honest pricing"
        mark="."
        lede="Three ways to work with us. Every project is quoted to its scope, in writing, before any work starts."
      />

      <section className={page.section} aria-label="Plans">
        <div className={styles.plans}>
          {PLANS.map((p, i) => (
            <article key={p.name} className={styles.plan} data-recommended={p.recommended || undefined} data-reveal="" style={delay(i * 0.08)}>
              <div className={styles.planHead}>
                <h2 className={styles.planName}>{p.name}</h2>
                {p.recommended && <span className={styles.badge}>Recommended</span>}
              </div>
              <p className={styles.pitch}>{p.pitch}</p>
              <p className={styles.price}>
                {p.price ?? "Tailored quote"}
                <span>{p.price ? "starting price" : "priced to your scope"}</span>
              </p>
              <ul className={styles.includes}>
                {p.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <a className={`${styles.planCta} arrowHost`} href="/contact#inquiry">
                Get a quote
                <Arrow className={styles.planArrow} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            Questions
          </span>
          <h2 className={page.h2} data-reveal="">
            Good to know<b>.</b>
          </h2>
        </div>
        <div className={styles.faq}>
          {FAQ.map((f, i) => (
            <details key={f.q} className={styles.qa} data-reveal="" style={delay(i * 0.04)}>
              <summary>
                {f.q}
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
