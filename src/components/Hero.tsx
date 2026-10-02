import type { CSSProperties } from "react";
import { SheridanClock } from "./SheridanClock";
import styles from "./Hero.module.css";

/** Side ticks, at their artboard y positions. */
const TICKS = [
  { label: "// 00.01°", y: 102 },
  { label: "// 00.02°", y: 248 },
  { label: "// 00.03°", y: 383 },
  { label: "// 00.04°", y: 597 },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Botlane Studios">
      <div className={styles.bg} aria-hidden="true" />

      {TICKS.map((tick) => (
        <div key={tick.label} className={styles.tick} style={{ "--y": tick.y } as CSSProperties} aria-hidden="true">
          <i />
          {tick.label}
        </div>
      ))}

      <h2 className={`${styles.headline} ${styles.scrim}`}>
        Digital experiences that connect, scale and perform<b>.</b>
      </h2>

      <p className={styles.tagline}>Quietly crafting for brands worldwide</p>

      <h1 className={`${styles.lockup} ${styles.scrim}`}>
        <span className={styles.accent}>Botlane</span>
        <span>\Studios</span>
      </h1>

      <div className={styles.message}>
        <p>Small studio, worldwide tech.</p>
        <p>We create stories people remember.</p>
      </div>

      <div className={styles.time}>
        Our time <SheridanClock className={styles.clock} />
        <br />
        Sheridan, WY
      </div>

      <div className={styles.ctas}>
        <a className={`${styles.btn} ${styles.btnPrimary}`} href="#work">
          See work <Arrow />
        </a>
        <a className={`${styles.btn} ${styles.btnLight}`} href="#contact">
          Let&apos;s chat <Arrow />
        </a>
      </div>

      <a className={styles.reel} href="https://botlane.io" target="_blank" rel="noopener" aria-label="Meet botlane.io (opens in a new tab)">
        <div className={styles.reelHead}>
          <span>Showreel</span>
          <hr />
          <span>\\2026</span>
        </div>
        <div className={styles.reelVideo}>
          <video src="/botlane-intro.mp4" poster="/botlane-intro-poster.jpg" autoPlay muted loop playsInline preload="auto" />
        </div>
        <div className={styles.reelCap}>Meet botlane.io ↗</div>
      </a>
    </section>
  );
}
