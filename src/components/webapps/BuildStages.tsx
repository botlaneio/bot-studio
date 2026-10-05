"use client";

import { useEffect, useRef, useState } from "react";
import { AppMock } from "./AppMock";
import styles from "./WebApps.module.css";

const STAGES = [
  {
    label: "Discovery",
    title: "Map the workflow.",
    copy: "Who uses it, what they need to get done and what the first version must do. Paid discovery turns this into a scope we can quote.",
  },
  {
    label: "User flows",
    title: "Sketch every step.",
    copy: "Screens and paths in plain wireframes, while decisions are still quick to change.",
  },
  {
    label: "Interface",
    title: "Design the product.",
    copy: "A clear, consistent interface and design system, so your users learn it quickly.",
  },
  {
    label: "Build",
    title: "Make it work.",
    copy: "Data, accounts and integrations as scoped, built and tested in stages you can try along the way.",
  },
  {
    label: "Launch",
    title: "Launch and hand over.",
    copy: "Released, tested and handed over with what your team needs to run it.",
  },
];

/** One interface, five stages of fidelity. Advances on its own while on
 *  screen until the visitor picks a stage; never moves with reduced motion. */
export function BuildStages() {
  const root = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry.isIntersecting) timer = window.setInterval(() => setStage((s) => (s + 1) % STAGES.length), 4200);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setStage(i);
  };

  return (
    <div ref={root} className={styles.stages}>
      <ol className={styles.stageList}>
        {STAGES.map((s, i) => (
          <li key={s.label}>
            <button type="button" className={styles.stageBtn} aria-current={stage === i ? "step" : undefined} onClick={() => pick(i)}>
              <span className={styles.stageNum}>0{i + 1}</span>
              <span className={styles.stageLabel}>{s.label}</span>
            </button>
            <div className={styles.stageCopy} hidden={stage !== i}>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          </li>
        ))}
      </ol>
      <figure className={styles.stageArt}>
        <AppMock stage={stage} autoplay />
        <figcaption>
          <span>
            0{stage + 1} / {STAGES[stage].label}
          </span>
          <span>Illustrative interface · not a client project</span>
        </figcaption>
      </figure>
    </div>
  );
}
