import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./motion/Arrow";
import styles from "./WorkTeaser.module.css";

/** Homepage pointer to /work. Says plainly that the studio is new. */
export function WorkTeaser() {
  return (
    <section className={styles.section} aria-labelledby="work-teaser-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.label} data-reveal="">
            Work
          </span>
          <h2 id="work-teaser-title" className={styles.title} data-reveal="">
            New studio. Nothing borrowed<b>.</b>
          </h2>
          <p className={styles.body} data-reveal="" style={{ ["--reveal-delay" as string]: "0.05s" }}>
            No invented case studies. See what we&apos;ve built in-house, the briefs we set ourselves, and exactly what you receive at each stage of a project.
          </p>
          <Link className={`${styles.link} arrowHost`} href="/work" data-reveal="" style={{ ["--reveal-delay" as string]: "0.1s" }}>
            See the work
            <Arrow className={styles.arrow} />
          </Link>
        </div>
        <Link className={styles.preview} href="/work" aria-label="See the work: botlane.io, built in-house" data-reveal="">
          <Image src="/work/botlane-io-product.webp" width={1920} height={1113} alt="" sizes="(max-width: 899px) 100vw, 600px" />
          <span className={styles.previewTag}>Built in-house · botlane.io</span>
        </Link>
      </div>
    </section>
  );
}
