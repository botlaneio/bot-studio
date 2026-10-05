import { LazyVideo } from "@/components/LazyVideo";
import { Arrow } from "@/components/motion/Arrow";
import styles from "@/app/echoes/echoes.module.css";

/** Plus-lines in the inspire close. No template stats or years. */
const INSPIRE_LINES = [
  "Websites with the care of a product",
  "One project at a time",
  "Craft, clarity, and performance",
];

type InspireCloseProps = {
  /** The three heading lines; the middle one takes the accent word style. */
  heading?: readonly [string, string, string];
  /** Label on the single call button. */
  ctaLabel?: string;
};

const DEFAULT_HEADING = ["Let us", "inspire", "your next project"] as const;

/** Full-bleed gradient video behind the Whispers / Echoes close.
 *  Shared so other pages reuse this section instead of copying the markup.
 *  Props are optional; without them the close renders exactly as before. */
export function InspireClose({ heading = DEFAULT_HEADING, ctaLabel = "Request an intro call" }: InspireCloseProps = {}) {
  const [first, word, last] = heading;
  return (
    <section className={styles.inspire} aria-label="Start a conversation">
      <LazyVideo className={styles.inspireVideo} src="/inspire-wave.mp4" poster="/inspire-wave-poster.jpg" />
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
            Remote studio · US-focused
          </p>
        </div>
        <div className={styles.inspireRight}>
          <h2 className={styles.inspireHeading}>
            <span className={styles.inspireLine}>{first}</span>
            <span className={styles.inspireLine}>
              <span className={styles.inspireWord}>{word}</span>
            </span>
            <span className={styles.inspireLine}>{last}</span>
          </h2>
          <blockquote className={styles.inspireQuote}>
            <p>We listen first, stay transparent, and deliver what we promise. Every project matters to us.</p>
            <footer>BotLane LLC</footer>
          </blockquote>
          <a className={`${styles.chat} arrowHost`} href="/contact#inquiry">
            {ctaLabel}
            <Arrow className={styles.chatArrow} />
          </a>
        </div>
      </div>
    </section>
  );
}
