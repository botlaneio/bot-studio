import styles from "./ProcessFilm.module.css";

const STEPS = ["Discovery", "Strategy", "Design & Build", "Launch & Grow"];

/** The section under the hero: the 16:9 process film, full-bleed, playing
 *  silently on a loop. The film carries its own chapter titles, so the steps
 *  are repeated here only for screen readers. */
export function ProcessFilm() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <h2 id="process-title" className={styles.srOnly}>
        How we build: {STEPS.join(", ")}
      </h2>
      <video
        className={styles.film}
        src="/process-film.mp4"
        poster="/process-film-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </section>
  );
}
