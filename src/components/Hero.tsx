import type { CSSProperties } from "react";
import { Arrow } from "./motion/Arrow";
import { Scramble } from "./motion/Scramble";
import { SheridanClock } from "./SheridanClock";
import styles from "./Hero.module.css";

/** Side ticks, at their artboard y positions. */
const TICKS = [
  { label: "// 00.01°", y: 102 },
  { label: "// 00.02°", y: 248 },
  { label: "// 00.03°", y: 383 },
  { label: "// 00.04°", y: 597 },
];

const WORDS = "Digital experiences that connect, scale and perform".split(" ");

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** The hero, with the template's load sequence: the photo zooms down into
 *  place, the side ticks slide in, the lockup rises from behind a mask, the
 *  headline sharpens in word by word, the mono lines decode, and the buttons
 *  follow. All of it is CSS keyed to load, except the decoding
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

        <h2 className={`${styles.headline} ${styles.scrim}`}>
          {WORDS.map((word, i) => (
            <span key={i} className={styles.word} style={vars({ "--i": i })}>
              {word}
              {i < WORDS.length - 1 ? " " : <b>.</b>}
            </span>
          ))}
        </h2>

        <p className={styles.tagline}>
          <Scramble text="Quietly crafting for brands worldwide" delay={1000} duration={1000} />
        </p>

        <h1 className={`${styles.lockup} ${styles.scrim}`}>
          <span className={styles.rise}>
            <span className={styles.accent}>Botlane</span>
            <span>\Studios</span>
          </span>
        </h1>

        <div className={styles.message}>
          <p>
            <Scramble text="Small studio, worldwide tech." delay={700} />
          </p>
          <p>
            <Scramble text="We create stories people remember." delay={850} />
          </p>
        </div>

        <div className={styles.time}>
          Our time <SheridanClock className={styles.clock} />
          <br />
          Sheridan, WY
        </div>

        <div className={styles.ctas}>
          <a className={`${styles.btn} ${styles.btnPrimary} arrowHost`} href="#craft">
            <Scramble text="See our craft" delay={1150} duration={600} />
            <Arrow className={styles.btnArrow} />
          </a>
          <a className={`${styles.btn} ${styles.btnLight} arrowHost`} href="#contact">
            <Scramble text="Let's chat" delay={1350} duration={600} />
            <Arrow className={styles.btnArrow} />
          </a>
        </div>
      </div>
    </section>
  );
}
