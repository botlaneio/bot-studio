import type { CSSProperties } from "react";
import type { Metadata } from "next";
import page from "@/components/page/Page.module.css";
import { ECHOES_AUTHOR, ECHOES_POSTS } from "./echoes";
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

export default function EchoesPage() {
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

      {ECHOES_POSTS.map((post) => (
        <section key={post.title} className={page.section}>
          <div className={page.sectionHead}>
            <p className={styles.byline} data-reveal="">
              {ECHOES_AUTHOR}
            </p>
            <div>
              <h2 className={page.h2} data-reveal="">
                {post.title}
              </h2>
              <p className={`${page.body} ${styles.sectionBody}`} data-reveal="" style={delay(0.05)}>
                {post.body}
              </p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
