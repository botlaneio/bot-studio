import type { Metadata } from "next";
import { CAPABILITIES } from "@/components/capabilities";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import styles from "./capabilities.module.css";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Brand identity, strategy, design, AI systems, SEO and development: the six things Botlane Studios does, under one roof.",
};

export default function CapabilitiesPage() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// 00.03° Capabilities"
        title="Six disciplines, one studio"
        mark="."
        lede="From the first sketch of a name to the last line of production code, it all happens under one roof, so nothing gets lost between hand-offs."
      />

      <section className={page.section} aria-label="Capabilities">
        <ol className={styles.list}>
          {CAPABILITIES.map((c, i) => (
            <li key={c.slug} id={c.slug} className={styles.row} data-reveal="">
              <div className={styles.meta}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.tag}>{c.tag}</span>
              </div>
              <div className={styles.main}>
                <h2 className={styles.title}>{c.title}</h2>
                <p className={styles.detail}>{c.detail}</p>
              </div>
              <div className={styles.includes}>
                <span className={page.label}>What you get</span>
                <ul>
                  {c.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
