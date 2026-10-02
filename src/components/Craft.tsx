import styles from "./Craft.module.css";

/** Full-height image tiles in the template's "featured" layout. These are the
 *  template's licensed images used as atmosphere: the copy describes what the
 *  studio makes, never a client, a project or a year. */
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

export function Craft() {
  return (
    <section id="craft" className={styles.section} aria-labelledby="craft-title">
      <h2 id="craft-title" className={styles.srOnly}>
        What we craft
      </h2>

      {TILES.map((tile, i) => {
        const index = String(i + 1).padStart(2, "0");
        return (
          <article key={tile.title} className={styles.tile} aria-labelledby={`craft-${index}`}>
            <div className={styles.image} style={{ backgroundImage: `url(${tile.image})` }} aria-hidden="true" />

            <div className={styles.top} aria-hidden="true">
              <span className={styles.index}>\\{index}</span>
              <span className={styles.ruler} />
            </div>

            <div className={styles.info}>
              <h3 id={`craft-${index}`} className={styles.title}>
                {tile.title}
              </h3>
              <p className={styles.line}>{tile.line}</p>
            </div>

            <div className={styles.bottom}>
              <ul className={styles.toolkit} aria-label="Toolkit">
                {tile.toolkit.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <span className={styles.count} aria-hidden="true">
                {index}/{String(TILES.length).padStart(2, "0")}
              </span>
            </div>
          </article>
        );
      })}

      <div className={styles.more}>
        <span>\\2026</span>
        <hr />
        <a href="#contact" className={styles.moreLink}>
          <span className={styles.arrow} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </span>
          Let&apos;s build yours
        </a>
      </div>
    </section>
  );
}
