import type { ReactNode } from "react";
import styles from "./Page.module.css";

/** The opening of every inner page: a mono kicker, a large title (its last
 *  character can be passed as `mark` to sit in the accent) and a lede. */
export function PageHero({ kicker, title, mark, lede }: { kicker: string; title: string; mark?: string; lede?: ReactNode }) {
  return (
    <header className={styles.hero}>
      <span className={styles.kicker} data-reveal="">
        {kicker}
      </span>
      <h1 className={styles.title} data-reveal="" style={{ ["--reveal-delay" as string]: "0.05s", ["--reveal-y" as string]: "60px" }}>
        {title}
        {mark && <b>{mark}</b>}
      </h1>
      {lede && (
        <p className={styles.lede} data-reveal="" style={{ ["--reveal-delay" as string]: "0.15s" }}>
          {lede}
        </p>
      )}
    </header>
  );
}
