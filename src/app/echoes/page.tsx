import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Arrow } from "@/components/motion/Arrow";
import page from "@/components/page/Page.module.css";
import { ECHOES, ECHOES_AUTHOR, ECHOES_AUTHOR_ROLE } from "./echoes";
import styles from "./echoes.module.css";

export const metadata: Metadata = {
  title: "Echoes",
  description: "Articles, notes on creativity, strategy and making things work.",
};

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** The three lines beside the subtitle on the Whispers hero. */
const LINES = [
  "Studio projects and case studies",
  "Notes on design and process",
  "Ideas, insights, and inspiration",
];

/** Plus-lines in the inspire close. No template stats or years. */
const INSPIRE_LINES = [
  "Websites with the care of a product",
  "One project at a time",
  "Craft, clarity, and performance",
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
              Articles, notes on creativity, strategy and making things work.
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

      <section className={styles.inspire} aria-label="Start a conversation">
        <video
          className={styles.inspireVideo}
          src="/inspire-wave.mp4"
          poster="/inspire-wave-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className={styles.inspireScrim} aria-hidden="true" />
        <div className={styles.inspireInner}>
          <div className={styles.inspireLeft}>
            <p className={styles.inspireLabel}>
              <span className={styles.tick} aria-hidden="true" />
              Studio
            </p>
            <p className={styles.inspireTagline}>A small studio, making stories and tech.</p>
            <ul className={styles.inspireLines}>
              {INSPIRE_LINES.map((line) => (
                <li key={line}>
                  <span className={styles.plus} aria-hidden="true">+</span>
                  {line}
                </li>
              ))}
            </ul>
            <p className={styles.inspirePlace}>
              <span className={styles.tick} aria-hidden="true" />
              Sheridan, Wyoming
            </p>
          </div>
          <div className={styles.inspireRight}>
            <h2 className={styles.inspireHeading}>
              <span className={styles.inspireLine}>Let us</span>
              <span className={styles.inspireLine}>
                <span className={styles.inspireWord}>inspire</span>
              </span>
              <span className={styles.inspireLine}>your next project</span>
            </h2>
            <blockquote className={styles.inspireQuote}>
              <p>We listen first, stay transparent, and deliver what we promise. Every project matters to us.</p>
              <footer>BotLane LLC</footer>
            </blockquote>
            <a className={`${styles.chat} arrowHost`} href="#contact">
              Book an intro call
              <Arrow className={styles.chatArrow} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
