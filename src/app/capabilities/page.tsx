import Link from "next/link";
import type { Metadata } from "next";
import { OFFER_DETAILS, capabilityHref } from "@/components/capabilities";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import styles from "./capabilities.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/capabilities" },
  title: "Websites & Web Apps",
  description:
    "Websites and web apps with strategy, design and development included. SEO and AI integrations are optional add-ons.",
};

export default function CapabilitiesPage() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// 00.03° Capabilities"
        title="Websites & Web Apps"
        mark="."
        lede="Two core offers, with strategy, design and development included in your agreed project scope. Add SEO or AI integrations where they serve your project."
      />

      <section className={page.section} aria-label="Capabilities">
        <ol className={styles.list}>
          {OFFER_DETAILS.map((c, i) => (
            <li key={c.slug} id={c.slug} className={styles.row} data-reveal="">
              <div className={styles.meta}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.tag}>{c.tag}</span>
              </div>
              <div className={styles.main}>
                <h2 className={styles.title}><Link href={capabilityHref(c.slug)}>{c.title}</Link></h2>
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
