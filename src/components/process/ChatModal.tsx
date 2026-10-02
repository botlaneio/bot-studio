"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow } from "../motion/Arrow";
import { lockScroll } from "../motion/SmoothScroll";
import { SheridanClock } from "../SheridanClock";
import styles from "./ChatModal.module.css";

const CLOSE_MS = 320;

/** The "Let's chat" modal. It pops out of the button that opened it: it
 *  starts at that spot, tipped back and tiny, and swings up to face the
 *  visitor; closing plays it back into the button. The card leans a little
 *  toward the pointer. Escape, the close button or a click outside close it;
 *  focus stays inside while it is open and returns to the button after. */
export function ChatModal({
  origin,
  onClose,
}: {
  /** Centre of the button that opened it, in viewport pixels. */
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const close = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, CLOSE_MS);
  };

  useEffect(() => {
    lockScroll(true);
    const opener = document.activeElement as HTMLElement | null;
    cardRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
    return () => {
      lockScroll(false);
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !cardRef.current) return;
      // Keep Tab inside the card.
      const items = Array.from(cardRef.current.querySelectorAll<HTMLElement>("a, button"));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Lean toward the pointer, a few degrees at most.
  const onMove = (e: React.PointerEvent) => {
    const el = tiltRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${dx * 8}deg`);
    el.style.setProperty("--rx", `${-dy * 6}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty("--ry", "0deg");
    tiltRef.current?.style.setProperty("--rx", "0deg");
  };

  const from = {
    "--ox": `${origin.x - window.innerWidth / 2}px`,
    "--oy": `${origin.y - window.innerHeight / 2}px`,
  } as CSSProperties;

  return (
    <div className={styles.root} data-closing={closing || undefined} onPointerDown={(e) => e.target === e.currentTarget && close()}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.pop} style={from}>
        <div ref={tiltRef} className={styles.tilt} onPointerMove={onMove} onPointerLeave={onLeave}>
          <div ref={cardRef} className={styles.card} role="dialog" aria-modal="true" aria-labelledby="chat-title">
            <div className={styles.head}>
              <div className={styles.headGlow} aria-hidden="true" />
              <span className={styles.tag}>{"// Let's chat"}</span>
              <h2 id="chat-title" className={styles.title}>
                Tell us what you&apos;re building<b>.</b>
              </h2>
              <p className={styles.lede}>Small studio, worldwide tech. Write or call, whichever suits you.</p>
            </div>

            <ul className={styles.rows}>
              <li>
                <a className={`${styles.row} arrowHost`} href="mailto:admin@botlane.io?subject=Project%20enquiry">
                  <span className={styles.rowTag}>Email</span>
                  <span className={styles.rowValue}>admin@botlane.io</span>
                  <Arrow className={styles.rowArrow} />
                </a>
              </li>
              <li>
                <a className={`${styles.row} arrowHost`} href="tel:+13072185715">
                  <span className={styles.rowTag}>Call</span>
                  <span className={styles.rowValue}>+1 307 218 5715</span>
                  <Arrow className={styles.rowArrow} />
                </a>
              </li>
              <li className={styles.row} data-static="">
                <span className={styles.rowTag}>Studio</span>
                <span className={styles.rowValue}>
                  Sheridan, WY · <SheridanClock className={styles.clock} />
                </span>
              </li>
            </ul>

            <button type="button" className={styles.close} onClick={close} aria-label="Close">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
