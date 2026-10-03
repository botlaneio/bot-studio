import { Arrow } from "@/components/motion/Arrow";
import styles from "@/app/echoes/echoes.module.css";

/** Plus-lines in the inspire close. No template stats or years. */
const INSPIRE_LINES = [
  "Websites with the care of a product",
  "One project at a time",
  "Craft, clarity, and performance",
];

/** Full-bleed gradient video behind the Whispers / Echoes close.
 *  Shared so other pages reuse this section instead of copying the markup. */
export function InspireClose() {
  return (
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
  );
}
