import type { CSSProperties } from "react";
import page from "./Page.module.css";
import styles from "./OfferPage.module.css";

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** Section head used down the core offer pages: label left, title and an
 *  optional line of body copy right. */
export function OfferHead({ id, label, title, body }: { id: string; label: string; title: string; body?: string }) {
  return (
    <div className={page.sectionHead}>
      <span className={page.label} data-reveal="">
        {label}
      </span>
      <div>
        <h2 id={id} className={page.h2} data-reveal="">
          {title}
          <b>.</b>
        </h2>
        {body && (
          <p className={`${page.body} ${styles.headBody}`} data-reveal="" style={delay(0.05)}>
            {body}
          </p>
        )}
      </div>
    </div>
  );
}
