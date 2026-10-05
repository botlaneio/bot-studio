import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { InspireClose } from "@/components/InspireClose";
import page from "@/components/page/Page.module.css";
import { ECHOES, ECHOES_AUTHOR, ECHOES_AUTHOR_ROLE } from "./echoes";
import styles from "./echoes.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/echoes",
  title: "Echoes",
  description: "Short notes on creativity, strategy and making things work.",
});

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** The three lines beside the subtitle on the Whispers hero. */
const LINES = [
  "Notes from building the studio",
  "Notes on design and process",
  "Ideas, insights, and inspiration",
];

export default function EchoesPage() {
  const featured = ECHOES.find((echo) => echo.featured) ?? ECHOES[0];
  const rest = ECHOES.filter((echo) => echo !== featured);

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

      <section className={styles.featured} aria-label="Featured note">
        <article className={styles.featureCard} data-reveal="">
          <div className={styles.featureImage} style={{ backgroundImage: `url(${featured.image})` }} />
          <div className={styles.featureTop}>
            <p>{ECHOES_AUTHOR}</p>
            <p>{ECHOES_AUTHOR_ROLE}</p>
            <p>{featured.note}</p>
          </div>
          <div className={styles.featureBottom}>
            <h2>{featured.title}</h2>
            <p>{featured.kicker}</p>
            <p className={styles.excerpt}>{featured.excerpt}</p>
          </div>
        </article>
      </section>

      <section className={styles.more} aria-label="More notes">
        <div className={styles.moreGrid}>
          {rest.map((echo, i) => (
            <article key={echo.id} className={styles.card} data-reveal="" style={delay(i * 0.04)}>
              <div className={styles.cardImage} style={{ backgroundImage: `url(${echo.image})` }} />
              <div className={styles.cardBody}>
                <p className={styles.meta}>
                  <span>{ECHOES_AUTHOR}</span>
                  <span>{echo.note}</span>
                </p>
                <h2>{echo.title}</h2>
                <p>{echo.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InspireClose />
    </main>
  );
}
