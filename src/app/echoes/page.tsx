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

export default function EchoesPage() {
  return (
    <main className={page.page}>
      <header className={page.hero}>
        <span className={page.kicker} data-reveal="">
          // Echoes
        </span>
        <h1
          className={page.title}
          data-reveal=""
          style={{ ["--reveal-delay" as string]: "0.05s", ["--reveal-y" as string]: "60px" }}
        >
          Echoes
        </h1>
        <p className={page.lede} data-reveal="" style={delay(0.15)}>
          Articles, notes on creativity, strategy and making things work.
        </p>
        <p className={styles.byline} data-reveal="" style={delay(0.2)}>
          {ECHOES_AUTHOR}
        </p>
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
