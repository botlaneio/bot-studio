import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { InspireClose } from "@/components/InspireClose";
import page from "@/components/page/Page.module.css";
import { ECHOES, ECHOES_AUTHOR, ECHOES_AUTHOR_ROLE, readTimeLabel, type Echo } from "./echoes";
import { POSTS, postHref, type EvidenceTag, type Post } from "./posts";
import styles from "./echoes.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/echoes",
  title: "Echoes",
  description: "Short notes on creativity, strategy and making things work.",
});

// The hub lists every post, so don't let the CDN hold it for a year.
export const revalidate = 3600;

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

const cover = (echo: Echo): CSSProperties => ({
  backgroundImage: `url(${echo.image})`,
  backgroundPosition: echo.imagePosition ?? "center",
});

/** The three lines beside the subtitle on the Whispers hero. */
const LINES = [
  "Notes from building the studio",
  "Notes on design and process",
  "Ideas, insights, and inspiration",
];

/** What Echoes is, who it is for, and what a reader gets. */
const ABOUT = [
  {
    label: "What Echoes is",
    title: "A studio notebook, kept in public.",
    body: "Short notes from inside Botlane Studios: the decisions, the constraints, and why we made them.",
    icon: "note",
  },
  {
    label: "Who it's for",
    title: "People about to build something.",
    body: "Founders and small teams who want to see how a studio thinks before they hire one.",
    icon: "person",
  },
  {
    label: "What you get from it",
    title: "One idea, in about three minutes.",
    body: "One note, one point you can take back to your own project. No newsletter wall, no fluff.",
    icon: "plus",
  },
] as const;

function AboutIcon({ name }: { name: (typeof ABOUT)[number]["icon"] }) {
  const paths = {
    note: <path d="M5 19h4L19.5 8.5a2.1 2.1 0 0 0-3-3L6 16v3ZM14.5 7.5l3 3" />,
    person: (
      <>
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

export default function EchoesPage() {
  const featured = ECHOES.find((echo) => echo.featured) ?? ECHOES[0];

  return (
    <main className={page.page}>
      <header className={styles.hero}>
        <div className={styles.stage}>
          <div className={styles.rule} data-reveal="" aria-hidden="true">
            <span className={styles.tick} />
            <span className={styles.hairline} />
          </div>
          <h1 className={styles.word} data-reveal="" style={{ ["--reveal-y" as string]: "100px" }}>
            echoes
          </h1>
          <div className={styles.row}>
            <p className={styles.subtitle} data-reveal="" style={delay(0.12)}>
              Short notes on creativity, strategy and making things work.
            </p>
            <ul className={styles.lines}>
              {LINES.map((line, i) => (
                <li key={line} data-reveal="" style={delay(0.16 + i * 0.04)}>
                  <span className={styles.plus} aria-hidden="true">+</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.grid} aria-hidden="true" />
      </header>

      <section className={styles.section} aria-label="About Echoes">
        <div className={styles.about}>
          {ABOUT.map((item, i) => (
            <article key={item.label} className={styles.aboutCard} data-reveal="" style={delay(i * 0.06)}>
              <p className={`${styles.eyebrow} ${styles.aboutEyebrow}`}>
                <span>{item.label}</span>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              </p>
              <span className={styles.glyph} aria-hidden="true">
                <AboutIcon name={item.icon} />
              </span>
              <h2>{item.title}</h2>
              <p className={styles.aboutBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="echoes-featured">
        <div className={styles.secHead} data-reveal="">
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.tick} aria-hidden="true" />
              Featured
            </p>
            <h2 id="echoes-featured">What a note looks like.</h2>
          </div>
          <p>One note, shown large. The rest of the notebook follows below.</p>
        </div>

        <article className={styles.feature} data-reveal="">
          <div className={styles.featureImage} style={cover(featured)}>
            <p className={styles.featureMeta}>
              <span>{ECHOES_AUTHOR}</span>
              <span>{ECHOES_AUTHOR_ROLE}</span>
              <span>{featured.note}</span>
            </p>
          </div>
          <div className={styles.featureBody}>
            <p className={styles.eyebrow}>
              <span className={styles.num}>{featured.note}</span>
              <span aria-hidden="true">·</span>
              <span>{featured.topic}</span>
              <span aria-hidden="true">·</span>
              <span>{readTimeLabel(featured.readTime)}</span>
            </p>
            <h3>{featured.title}</h3>
            {featured.kicker ? <p className={styles.kicker}>{featured.kicker}</p> : null}
            <p className={styles.excerpt}>{featured.excerpt}</p>
            <p className={styles.featureFoot}>
              <span>
                <i className={styles.dot} aria-hidden="true" />
                {ECHOES_AUTHOR}
              </span>
              <span>{ECHOES_AUTHOR_ROLE}</span>
            </p>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.sectionEnd}`} aria-labelledby="echoes-more">
        <div className={styles.secHead} data-reveal="">
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.tick} aria-hidden="true" />
              The notebook
            </p>
            <h2 id="echoes-more">All notes.</h2>
          </div>
          <p>Every note tagged by its proof — measured, built, decided, briefed or plainly.</p>
        </div>

        <div className={styles.notes}>
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={postHref(post.slug)}
              className={`${styles.note} ${styles.noteLink}`}
              data-reveal=""
              style={delay((i % 3) * 0.05)}
            >
              <img className={styles.noteCover} src={`/echoes/covers/${post.slug}.svg`} alt="" loading="lazy" />
              <div className={styles.noteBody}>
                <p className={styles.noteMeta}>
                  <span className={styles.topic}>{post.tag}</span>
                  <span>{readTimeLabel(post.readTime)}</span>
                </p>
                <h3>{post.title}</h3>
                <p className={styles.noteExcerpt}>{post.excerpt}</p>
                <p className={styles.noteFoot}>
                  <span>{post.theme}</span>
                  <span>{post.date}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="Studies and feeds">
        <div style={{ marginTop: "calc(40 * var(--u))" }}>
          <p>
            <strong>Studies</strong> —{" "}
            <Link href="/echoes/shipping-the-evidence-tag">Every Echoes note now carries its proof</Link>
            {" "}(Built),{" "}
            <Link href="/echoes/anatomy-of-an-echoes-note">The anatomy of an Echoes note</Link> (Decided).
          </p>
          <p>
            <strong>Kit</strong> —{" "}
            <Link href="/echoes/kit">Ungated downloads</Link>
            : brief template, WCAG 2.2 AA checklist, quote comparison sheet.
          </p>
          <p>
            Feeds: <Link href="/echoes/rss.xml">RSS</Link> ·{" "}<Link href="/echoes/feed.json">JSON Feed</Link>
          </p>
        </div>
      </section>

      <InspireClose heading={["Let us write", "the next note", "about your project."]} ctaLabel="Request a call" />
    </main>
  );
}
