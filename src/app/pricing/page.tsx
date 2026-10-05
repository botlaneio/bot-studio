import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PLANS } from "@/components/plans";
import { Arrow } from "@/components/motion/Arrow";
import { PageHero } from "@/components/page/PageHero";
import { BANDS, PRICE, PRICE_SUMMARY } from "@/lib/pricing";
import page from "@/components/page/Page.module.css";
import styles from "./pricing.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "Pricing",
  description: `${PRICE_SUMMARY} Every project is still a tailored quote.`,
});

const PUBLIC_PRICE: Record<string, { amount: string; note: string }> = {
  websites: { amount: `from ${PRICE.websitesFrom}`, note: "starting price" },
  "web-apps": { amount: `from ${PRICE.webAppsFrom}`, note: "plus discovery" },
};

const INCLUDED = [
  "Strategy",
  "UX/UI",
  "Development",
  "Responsive layouts",
  "QA",
  "SEO foundations",
  "Handover",
];

const FAQ = [
  {
    q: "How do you price a project?",
    a: "The ranges on this page are starting points. Every project is still quoted to its agreed scope. After a short call we send a written quote, with what's included and a timeline, before any work starts.",
  },
  {
    q: "Why these prices, when AI can build a website?",
    a: "AI can now produce a page in minutes, and for some needs that's enough. What you're paying for is everything around the page: deciding who your site or app is for and what it must say, design that doesn't look like everyone else's, speed, accessibility and search done properly, and a team accountable for the result. Once the project is paid in full, the design and code are yours.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. For web apps, paid discovery can define the build before we quote it. Your written proposal includes the agreed timeline.",
  },
  {
    q: "Do you work with clients outside the US?",
    a: "Yes. We're a remote studio focused on US businesses, and we can work with clients elsewhere when the project fits.",
  },
  {
    q: "Who owns the website when it's done?",
    a: "You do. Once the project is paid in full, the design and code are yours.",
  },
  {
    q: "Can you look after the site after launch?",
    a: "Yes. Ongoing design, development and care can be scoped and quoted separately after launch.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short brief: what you do, who it's for and what you'd like the website or app to achieve. We'll shape the rest together on the first call.",
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
        lede={`${PRICE_SUMMARY} These are starting ranges. Every project is still a tailored quote.`}
      />

      <section className={page.section} aria-label="Plans">
        <div className={styles.plans}>
          {PLANS.map((p, i) => {
            const shown = PUBLIC_PRICE[p.slug];
            return (
              <article key={p.name} className={styles.plan} data-recommended={p.recommended || undefined} data-reveal="" style={delay(i * 0.08)}>
                <div className={styles.planHead}>
                  <h2 className={styles.planName}>{p.name}</h2>
                  <span className={styles.badge}>{p.slug === "add-ons" ? "Optional" : "Core project"}</span>
                </div>
                <p className={styles.pitch}>{p.pitch}</p>
                <p className={styles.price}>
                  {shown?.amount ?? "Tailored quote"}
                  <span>{shown?.note ?? "extra, scoped to your project"}</span>
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
            );
          })}
        </div>
      </section>

      <section className={page.section} aria-label="Scope bands">
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            Scope
          </span>
          <h2 className={page.h2} data-reveal="">
            Bands, not a fixed total<b>.</b>
          </h2>
        </div>
        <p className={styles.scopeNote} data-reveal="">
          Choose a band as a starting point. The written quote follows the agreed scope.
        </p>
        <div className={styles.bands}>
          {BANDS.map((group) => (
            <div key={group.name} className={styles.band} data-reveal="">
              <h3 className={styles.bandName}>{group.name}</h3>
              <ul>
                {group.rows.map((row) => (
                  <li key={row.name}>
                    <span className={styles.bandRow}>
                      <span>{row.name}</span>
                      <span className={styles.bandPrice}>{row.price}</span>
                    </span>
                    <span className={styles.bandDetail}>{row.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.includedBlock} data-reveal="">
          <h3 className={styles.bandName}>Included in websites and web apps</h3>
          <ul className={styles.included}>
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.optional} data-reveal="">
          <h3 className={styles.bandName}>Optional, extra</h3>
          <p>
            <strong>Brand identity, {PRICE.brandIdentity}.</strong> Naming, mark, and visual system, added to a Websites or Web Apps project when you need one. Quoted separately from the core build.
          </p>
          <p>
            SEO and AI stay optional add-ons, extra to the core build. AI is priced by the workflow, not a surcharge. Neither has a published fixed amount.
          </p>
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
