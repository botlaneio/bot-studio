import Link from "next/link";
import type { CSSProperties } from "react";
import { Arrow } from "./motion/Arrow";
import { Scramble } from "./motion/Scramble";
import { ShowreelVideo } from "./ShowreelVideo";
import styles from "./Hero.module.css";

/** Side ticks, at their artboard y positions. */
const TICKS = [
  { label: "// 00.01°", y: 102 },
  { label: "// 00.02°", y: 248 },
  { label: "// 00.03°", y: 383 },
  { label: "// 00.04°", y: 597 },
];

const WORDS = "Websites and web apps that connect, scale and perform".split(" ");

/** Matches the one-column hero in Hero.module.css. */
const ONE_COLUMN = "(max-width: 899px)";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** The hero, with the template's load sequence: the photo zooms down into
 *  place, the side ticks slide in, the lockup rises from behind a mask, the
 *  headline sharpens in word by word, the mono lines decode, and the buttons
 *  and showreel follow. All of it is CSS keyed to load, except the decoding
 *  text (Scramble). */
export function Hero() {
  return (
    <section className={styles.hero} aria-label="Botlane Studios">
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.photo} />
      </div>

      <div className={styles.stage}>
        {TICKS.map((tick, i) => (
          <div key={tick.label} className={styles.tick} style={vars({ "--y": tick.y, "--i": i })} aria-hidden="true">
            <span className={styles.tickMark} />
            <span className={styles.tickLine} />
            <Scramble text={tick.label} delay={300 + i * 120} duration={500} />
          </div>
        ))}

        <h1 className={`${styles.headline} ${styles.scrim}`}>
          {WORDS.map((word, i) => (
            <span key={i} className={styles.word} style={vars({ "--i": i })}>
              {word}
              {i < WORDS.length - 1 ? " " : <b>.</b>}
            </span>
          ))}
        </h1>

        <p className={styles.tagline}>
          <Scramble text="Quietly crafting for American businesses" delay={1000} duration={1000} staticWhen={ONE_COLUMN} />
        </p>

        {/* The brand lockup is display type, not a heading: the headline above is
            the page's one h1, so headings run in order for search and screen readers. */}
        <p className={`${styles.lockup} ${styles.scrim}`}>
          <span className={styles.rise}>
            <span className={styles.accent}>Botlane</span>
            <span>\Studios</span>
          </span>
        </p>

        <div className={styles.message}>
          <p>
            <Scramble text="Small studio, modern tech." delay={700} staticWhen={ONE_COLUMN} />
          </p>
          <p>
            <Scramble text="Strategy, design and development, together." delay={850} staticWhen={ONE_COLUMN} />
          </p>
        </div>

        <div className={styles.time}>
          Remote studio
          <br />
          US-focused
        </div>

        <div className={styles.ctas}>
          <Link className={`${styles.btn} ${styles.btnPrimary} arrowHost`} href="/capabilities">
            Explore
            <Arrow className={styles.btnArrow} />
          </Link>
          <Link className={`${styles.btn} ${styles.btnLight} arrowHost`} href="/contact#inquiry">
            Let&apos;s chat
            <Arrow className={styles.btnArrow} />
          </Link>
        </div>

        <Link className={styles.reel} href="/work" aria-label="Studio reel: see the work">
          <div className={styles.reelHead}>
            <span>Showreel</span>
            <hr />
            <span>\\2026</span>
          </div>
          <div className={styles.reelVideo}>
            <ShowreelVideo src="/studio-reel.mp4" first="/studio-reel-first.jpg" poster="/studio-reel-poster.jpg" />
          </div>
          <div className={styles.reelCap}>Studio reel · See the work →</div>
        </Link>
      </div>
    </section>
  );
}
