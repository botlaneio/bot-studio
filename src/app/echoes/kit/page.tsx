import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import page from "@/components/page/Page.module.css";
import styles from "./kit.module.css";

export const metadata: Metadata = {
  title: "Kit — Templates, checklists, and tools you can take",
  description:
    "Ungated downloads from Echoes: a one-page website brief template, a WCAG 2.2 AA checklist for marketing sites, and a quote comparison sheet. No newsletter wall, no fluff.",
  alternates: { canonical: "/echoes/kit" },
  openGraph: {
    type: "website",
    siteName: "Botlane Studios",
    title: "Kit — Templates, checklists, and tools you can take",
    description:
      "Ungated downloads from Echoes: a one-page website brief template, a WCAG 2.2 AA checklist for marketing sites, and a quote comparison sheet.",
    url: `${SITE_URL}/echoes/kit`,
    images: [
      {
        url: `${SITE_URL}/echoes/kit/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Kit — ungated downloads from Echoes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kit — Templates, checklists, and tools you can take",
    description:
      "Ungated downloads from Echoes: a one-page website brief template, a WCAG 2.2 AA checklist for marketing sites, and a quote comparison sheet.",
    images: [`${SITE_URL}/echoes/kit/opengraph-image`],
  },
};

const ASSETS = [
  {
    id: "brief-template",
    title: "One-Page Website Brief Template",
    description:
      "A single page that forces clarity before design starts. Covers outcome, audience, constraints, non-negotiables, nice-to-haves, success criteria, risks, and the decision needed today.",
    tags: ["Strategy", "Briefing", "Template"],
    file: "website-brief-template.md",
    size: "2.6 KB",
    format: "Markdown",
    cta: "Download brief template",
  },
  {
    id: "wcag-checklist",
    title: "WCAG 2.2 AA Checklist for Marketing Sites",
    description:
      "The AA criteria that actually matter for marketing websites — contrast, focus, target size, labels, reduced motion, plus the 2022 additions (2.5.8, 3.3.7, 3.3.8). Includes a 15-minute test protocol and common failure patterns.",
    tags: ["Accessibility", "Compliance", "Checklist"],
    file: "wcag-22-aa-checklist.md",
    size: "11 KB",
    format: "Markdown",
    cta: "Download WCAG checklist",
  },
  {
    id: "quote-sheet",
    title: "Quote Comparison Sheet",
    description:
      "25-row comparison table for web design / web app proposals. Forces apples-to-apples scoring with weights, red-flag deductions, and a worked example. Includes the 7 questions to ask before you sign.",
    tags: ["Buying", "Procurement", "Template"],
    file: "quote-comparison-sheet.md",
    size: "8.9 KB",
    format: "Markdown",
    cta: "Download quote sheet",
  },
] as const;

export default function KitPage() {
  return (
    <main className={page.page}>
      <header className={styles.hero}>
        <div className={styles.stage}>
          <div className={styles.rule} aria-hidden="true">
            <span className={styles.tick} />
            <span className={styles.hairline} />
          </div>
          <h1 className={styles.word}>kit</h1>
          <div className={styles.row}>
            <p className={styles.subtitle}>
              Ungated downloads from Echoes. Templates, checklists, and tools
              you can take, adapt, and use — no newsletter wall, no fluff.
            </p>
            <ul className={styles.lines} aria-hidden="true">
              <li>
                <span className={styles.plus}>+</span>
                One-page website brief template
              </li>
              <li>
                <span className={styles.plus}>+</span>
                WCAG 2.2 AA checklist for marketing sites
              </li>
              <li>
                <span className={styles.plus}>+</span>
                Quote comparison sheet for buyers
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.grid} aria-hidden="true" />
      </header>

      <section className={`${styles.section} ${styles.sectionEnd}`} aria-labelledby="kit-assets">
        <div className={styles.secHead}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.tick} aria-hidden="true" />
              The downloads
            </p>
            <h2 id="kit-assets">Three assets. Each solves a specific problem.</h2>
          </div>
          <p>
            Every asset is a plain Markdown file — open it, copy it, version it,
            share it. No PDF lock-in, no account required.
          </p>
        </div>

        <div className={styles.assets}>
          {ASSETS.map((asset) => (
            <article key={asset.id} className={styles.asset}>
              <div className={styles.assetHead}>
                <h3>{asset.title}</h3>
                <div className={styles.assetTags}>
                  {asset.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className={styles.assetDesc}>{asset.description}</p>
              <dl className={styles.assetMeta}>
                <div>
                  <dt>Format</dt>
                  <dd>{asset.format}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{asset.size}</dd>
                </div>
              </dl>
              <div className={styles.assetActions}>
                <Link
                  href={`/echoes/kit/${asset.file}`}
                  className={`${styles.downloadLink} arrowHost`}
                  download
                >
                  {asset.cta}
                  <svg
                    className={styles.downloadArrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </Link>
                <Link
                  href={`/echoes/kit/${asset.file}`}
                  className={styles.viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View in browser
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.promise}>
          <p className={styles.promiseText}>
            <strong>No newsletter wall. No fluff.</strong> These are the same
            tools we use internally. If they save you a bad brief, a failed
            audit, or a bad hire — they did their job.
          </p>
          <p className={styles.promiseSource}>
            Published under the Echoes promise. License: <strong>CC0</strong>
            (public domain) — do whatever you want with them.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="kit-more">
        <div className={styles.secHead}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.tick} aria-hidden="true" />
              More from Echoes
            </p>
            <h2 id="kit-more">The notebook these came from.</h2>
          </div>
          <p>
            Kit is the takeaway layer of Echoes — a studio notebook, kept in
            public. Every note carries its proof.
          </p>
        </div>

        <div className={styles.ctaRow}>
          <Link href="/echoes" className={`${styles.cta} arrowHost`}>
            Browse Echoes
            <svg
              className={styles.ctaArrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/capabilities/seo" className={`${styles.cta} ${styles.ctaSecondary} arrowHost`}>
            See the SEO & Discoverability add-on
            <svg
              className={styles.ctaArrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}