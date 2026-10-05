"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WebApps.module.css";

/** An illustrative product interface, built in code (no screenshots).
 *  `stage` sets its fidelity, matching the build stages on the page:
 *  0 workflow map · 1 wireframe · 2 designed · 3 working · 4 handed over.
 *  In the working stages the statuses move on their own while the mock is
 *  on screen, and visitors can click a status to move it themselves. */

const STATUSES = ["New", "In review", "Approved"] as const;
const ROWS = [
  { name: "Site survey, Unit 4", who: "AR", start: 0 },
  { name: "Quote request, Harbor St", who: "JL", start: 1 },
  { name: "Renewal, North office", who: "MK", start: 2 },
  { name: "Access change, Lab 2", who: "SD", start: 0 },
];
const FLOW = [
  ["Request", "Customer"],
  ["Review", "Your team"],
  ["Approve", "Manager"],
  ["Notify", "Automatic"],
];
const HANDOVER = ["Tested", "Launched", "Handed over"];

export function AppMock({ stage, autoplay = false }: { stage: number; autoplay?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(() => ROWS.map((r) => r.start));
  const live = stage >= 3;

  useEffect(() => {
    if (!live || !autoplay) return;
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let row = 0;
    const tick = () => {
      setStatus((s) => s.map((v, i) => (i === row ? (v + 1) % STATUSES.length : v)));
      row = (row + 1) % ROWS.length;
    };
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(tick, 2200);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [live, autoplay]);

  const advance = (i: number) => setStatus((s) => s.map((v, j) => (j === i ? (v + 1) % STATUSES.length : v)));
  const count = (k: number) => status.filter((v) => v === k).length;

  return (
    <div ref={root} className={styles.mock} data-stage={stage} aria-hidden="true">
      <div className={styles.chrome}>
        <span />
        <span />
        <span />
        <em className={styles.t}>app.yourcompany.com</em>
      </div>

      <div className={styles.app}>
        <nav className={styles.side}>
          <b className={styles.t}>Operations</b>
          {["Overview", "Requests", "Customers", "Reports"].map((item) => (
            <span key={item} className={styles.t} data-active={item === "Requests" || undefined}>
              {item}
            </span>
          ))}
        </nav>

        <div className={styles.main}>
          <div className={styles.head}>
            <strong className={styles.t}>
              Requests<span className={styles.live}>Live</span>
            </strong>
            <span className={`${styles.t} ${styles.newBtn}`}>+ New request</span>
          </div>
          <div className={styles.kpis}>
            {STATUSES.map((label, k) => (
              <div key={label}>
                <span className={styles.t}>{label}</span>
                <b className={styles.t}>{count(k)}</b>
              </div>
            ))}
          </div>
          <ul className={styles.rows}>
            {ROWS.map((row, i) => (
              <li key={row.name}>
                <span className={styles.avatar}>{row.who}</span>
                <span className={styles.t}>{row.name}</span>
                <button
                  type="button"
                  tabIndex={-1}
                  className={`${styles.t} ${styles.pill}`}
                  data-status={status[i]}
                  onClick={live ? () => advance(i) : undefined}
                >
                  {STATUSES[status[i]]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stage 0: the workflow before any screen exists. */}
      <div className={styles.map}>
        {FLOW.map(([step, who], i) => (
          <div key={step} className={styles.node} style={{ ["--i" as string]: i }}>
            <b>{step}</b>
            <span>{who}</span>
          </div>
        ))}
      </div>

      {/* Stage 4: the handover. */}
      <div className={styles.handover}>
        {HANDOVER.map((item) => (
          <span key={item}>
            <i />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
