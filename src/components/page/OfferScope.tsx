import Link from "next/link";
import { Arrow } from "../motion/Arrow";
import page from "./Page.module.css";
import styles from "./OfferScope.module.css";

export type ScopeItem = { stage: string; title: string; detail: string };

type Props = {
  /** Small label in the left column, e.g. "From brief to launch". */
  label: string;
  items: ScopeItem[];
  /** Primary button text, e.g. "Discuss your website". */
  cta: string;
  /** Line under the heading. Defaults to the core-offer line. */
  intro?: string;
};

/** "What you get" for an offer page: numbered deliverables with a line on
 *  what each means, then the proposal note beside the next step. */
export function OfferScope({ label, items, cta, intro = "Strategy, design and development, carried by one team from the first conversation to launch." }: Props) {
  return (
    <section className={page.section} aria-labelledby="offer-scope">
      <div className={page.sectionHead}>
        <span className={page.label} data-reveal="">
          {label}
        </span>
        <div>
          <h2 id="offer-scope" className={page.h2} data-reveal="">
            What you get<b>.</b>
          </h2>
          <p className={`${page.body} ${styles.intro}`} data-reveal="">
            {intro}
          </p>
        </div>
      </div>

      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item.title} className={styles.row} data-reveal="">
            <span className={styles.num}>
              {String(i + 1).padStart(2, "0")}
              <span className={styles.stage}> / {item.stage}</span>
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.detail}>{item.detail}</p>
          </li>
        ))}
      </ol>

      <div className={styles.close} data-reveal="">
        <p className={styles.note}>Deliverables, scope and timeline are agreed in your written proposal before work starts.</p>
        <div className={styles.actions}>
          <Link className={`${styles.cta} arrowHost`} href="/contact#inquiry">
            {cta}
            <Arrow className={styles.arrow} />
          </Link>
          <Link className={styles.back} href="/capabilities">
            Explore all offers
          </Link>
        </div>
      </div>
    </section>
  );
}
