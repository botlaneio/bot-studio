"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProcessFilm.module.css";

const STEPS = ["Discovery", "Strategy", "Design & Build", "Launch & Grow"];
const IMAGES = ["/process/hero.jpg", "/process/card-1.jpg", "/process/card-2.jpg", "/process/card-3.jpg"];

/** The section under the hero: a website assembling itself, drawn live in 3D
 *  and driven by scroll (scrolling back plays it backwards). The canvas is
 *  transparent, so the pieces sit straight on the section's white with no
 *  frame around them, and it is drawn at the screen's own resolution.
 *
 *  three.js and the scene load only when the visitor nears the section. If a
 *  device cannot draw WebGL, a still of the finished page stands in. */
export function ProcessFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const mount = mountRef.current;
    const flash = flashRef.current;
    if (!section || !mount || !flash) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        import("./process/scene")
          .then(({ mountProcessScene }) => {
            if (cancelled) return;
            cleanup = mountProcessScene({ track: section, mount, flash, images: IMAGES });
          })
          .catch(() => {
            if (!cancelled) setFailed(true);
          });
      },
      { rootMargin: "150% 0px" },
    );
    near.observe(section);

    return () => {
      cancelled = true;
      near.disconnect();
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
        {failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.still} src="/process/still.webp" alt="" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
