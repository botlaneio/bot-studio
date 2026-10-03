import type { CSSProperties } from "react";
import { Arrow } from "./motion/Arrow";
import { Scramble } from "./motion/Scramble";
import { TileEffects } from "./motion/TileEffects";
import styles from "./Craft.module.css";

/** Full-height image tiles in the template's "featured" layout. These are the
 *  template's licensed images used as atmosphere: the copy describes what the
 *  studio makes, never a client, a project or a year.
 *
 *  Motion, as on the template: the photos drift against the scroll, the
 *  titles rise in as each tile arrives, and over a tile the pointer becomes a
 *  "Let's talk" disc; a tile clicks through to the contact section.
 *  Each toolkit decodes with the hero's mono scramble the first time that
 *  stack scrolls into view. */
const TILES = [
  {
    image: "/craft/tile-1.jpg",
    title: "Sense of place",
    line: "Brand, website and motion",
    toolkit: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Cloudflare CDN"],
  },
  {
    image: "/craft/tile-2.jpg",
    title: "Built to perform",
    line: "3D, WebGL and interactive product",
    toolkit: ["React", "WebGL", "Node.js", "AWS Lambda", "AI search"],
  },
  {
    image: "/craft/tile-3.jpg",
    title: "Made to move",
    line: "Launch sites and campaigns",
    toolkit: ["Framer", "Next.js", "GSAP", "WebGL", "Ads integration"],
  },
];

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

export function Craft() {
  return (
    <section id="craft" className={styles.section} aria-labelledby="craft-title">
      <h2 id="craft-title" className="sr-only">
        What we craft
      </h2>
      <TileEffects scope="craft" />

      {TILES.map((tile, i) => {
        const index = String(i + 1).padStart(2, "0");
        return (
          <article key={tile.title} className={styles.tile} aria-labelledby={`craft-${index}`}>
            <div className={styles.media} aria-hidden="true">
              <div className={styles.image} style={{ backgroundImage: `url(${tile.image})` }} data-parallax="0.1" />
            </div>

            <a className={styles.tileLink} href="#contact" data-cursor="Let's talk" aria-label={`${tile.title}: talk to us about it`} />

            <div className={styles.top} aria-hidden="true">
              <span className={styles.index} data-reveal="" style={delay(0.1)}>
                \\{index}
              </span>
              <span className={styles.ruler} />
            </div>

            <div className={styles.info}>
              <h3 id={`craft-${index}`} className={styles.title} data-reveal="" style={{ ...delay(0), ["--reveal-y" as string]: "70px" }}>
                {tile.title}
              </h3>
              <p className={styles.line} data-reveal="" style={delay(0.15)}>
                {tile.line}
              </p>
            </div>

            <div className={styles.bottom}>
              <ul className={styles.toolkit} aria-label="Toolkit" data-scramble-scope="">
                {tile.toolkit.map((tool) => (
                  <li key={tool}>
                    <Scramble text={tool} inView />
                  </li>
                ))}
              </ul>
              <span className={styles.count} aria-hidden="true" data-reveal="" style={delay(0.3)}>
                {index}/{String(TILES.length).padStart(2, "0")}
              </span>
            </div>
          </article>
        );
      })}

      <div className={styles.more} data-reveal="">
        <span>\\2026</span>
        <hr />
        <a href="#contact" className={`${styles.moreLink} arrowHost`}>
          <span className={styles.arrowBox}>
            <Arrow className={styles.arrowIcon} />
          </span>
          Let&apos;s build yours
        </a>
      </div>
    </section>
  );
}
