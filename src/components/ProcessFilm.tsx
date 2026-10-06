"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./motion/Arrow";
import { ChatModal } from "./process/ChatModal";
import styles from "./ProcessFilm.module.css";

const STEPS = ["Discovery", "Strategy", "Design & Build", "Launch & Grow"];
const IMAGES = ["/process/hero.jpg", "/process/card-1.jpg", "/process/card-2.jpg", "/process/card-3.jpg"];

/** The section under the hero: a website assembling itself, drawn live in 3D
 *  and driven by scroll (scrolling back plays it backwards). The canvas is
 *  transparent, so the pieces sit straight on the section's white with no
 *  frame around them, and it is drawn at the screen's own resolution.
 *
 *  Once the page has locked together, a real "Let's chat" button takes over
 *  from the 3D one, at its exact size and spot, with rings that close in on
 *  it like a pointer locator. It opens the chat modal, which pops out of it.
 *
 *  three.js (~500 KB) and the scene load only once the visitor shows intent:
 *  their first scroll, touch, click or key press, or the section actually
 *  entering the screen (for example a link straight to #process). A visitor
 *  who only reads the hero never pays for it, so it cannot compete with the
 *  hero on a phone. If a device cannot draw WebGL, a still of the finished
 *  page stands in. */
export function ProcessFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);
  const [chatFrom, setChatFrom] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mount = mountRef.current;
    const flash = flashRef.current;
    if (!section || !mount || !flash) return;

    let cancelled = false;
    let started = false;
    let cleanup: (() => void) | undefined;
    const INTENT = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;

    const stopListening = () => {
      seen.disconnect();
      for (const type of INTENT) window.removeEventListener(type, start);
    };

    const start = () => {
      if (started || cancelled) return;
      started = true;
      stopListening();
      import("./process/scene")
          .then(({ mountProcessScene }) => {
            if (cancelled) return;
            cleanup = mountProcessScene({
              track: section,
              mount,
              flash,
              images: IMAGES,
              // Follows the 3D button every frame it moves; styled directly so
              // React does not re-render while the scene runs.
              onCta: (rect) => {
                const el = ctaRef.current;
                if (!el) return;
                if (!rect) {
                  el.removeAttribute("data-show");
                  return;
                }
                el.style.left = `${rect.x}px`;
                el.style.top = `${rect.y}px`;
                el.style.width = `${rect.w}px`;
                el.style.height = `${rect.h}px`;
                el.setAttribute("data-show", "");
              },
            });
          })
          .catch(() => {
            if (!cancelled) setFailed(true);
          });
    };

    // First sign of intent: the visitor starts moving through the page.
    for (const type of INTENT) window.addEventListener(type, start, { passive: true, once: true });
    // Or the section is already on screen (a deep link, or a tall window).
    // A section that only touches the bottom edge counts as "intersecting" to
    // the browser, and on a phone the hero is exactly one screen tall, so it
    // must be at least a little visible.
    const seen = new IntersectionObserver(([entry]) => entry.intersectionRatio > 0 && start(), { threshold: 0.02 });
    seen.observe(section);

    return () => {
      cancelled = true;
      stopListening();
      cleanup?.();
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className={styles.section} data-nav-theme="light" aria-labelledby="process-title">
      <h2 id="process-title" className={styles.srOnly}>
        How we build: {STEPS.join(", ")}
      </h2>
      <div className={styles.pin}>
        <div className={styles.labelRow} aria-hidden="true">
          <span className={styles.label}>{"// 00.02° How we build"}</span>
        </div>
        <div ref={mountRef} className={styles.stage} aria-hidden="true" />
        <div ref={flashRef} className={styles.flash} aria-hidden="true" />
        <button
          ref={ctaRef}
          type="button"
          className={`${styles.cta} arrowHost`}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setChatFrom({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
          }}
        >
          <span className={styles.ctaFace}>
            Let&apos;s chat
            <Arrow className={styles.ctaArrow} />
          </span>
        </button>
        {failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.still} src="/process/still.webp" alt="" aria-hidden="true" />
        )}
      </div>
      {chatFrom && <ChatModal origin={chatFrom} onClose={() => setChatFrom(null)} />}
    </section>
  );
}
