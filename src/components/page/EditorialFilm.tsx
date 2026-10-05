"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import page from "./Page.module.css";
import styles from "./EditorialFilm.module.css";

export type FilmScene = {
  label: string;
  title: ReactNode;
  copy: string;
  image: string;
  /** CSS object-position, for portrait photos cropped into the 16:9 frame. */
  focus?: string;
};

type Props = {
  scenes: FilmScene[];
  /** Accessible name of the film. */
  name: string;
  /** Bottom-left signature, e.g. "Botlane / Websites". */
  signature: string;
  /** One-sentence summary read by screen readers in place of the visuals. */
  summary: string;
};

/** A finite editorial sequence of monochrome photo chapters, shared by the
 *  offer pages. Plays once, then offers Replay; chapters can be picked;
 *  visibility suspends its clock; reduced motion never autoplays. */
export function EditorialFilm({ scenes, name, signature, summary }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [finished, setFinished] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReduced(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    const syncVisibility = () => setForeground(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  const running = playing && visible && foreground && !reduced && !finished;
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsed.current += now - last;
      last = now;
      if (elapsed.current < 4000) return;
      elapsed.current = 0;
      if (scene < scenes.length - 1) setScene(scene + 1);
      else {
        setFinished(true);
        setPlaying(false);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [running, scene, scenes.length]);

  const select = (index: number) => {
    elapsed.current = 0;
    setScene(index);
    setPlaying(false);
    setFinished(false);
  };
  const toggle = () => {
    if (finished) {
      elapsed.current = 0;
      setScene(0);
      setFinished(false);
    }
    setPlaying(!playing);
  };

  return (
    <div ref={root} className={styles.film} data-running={running} data-reduced={reduced} aria-label={name}>
      <div className={styles.stage}>
        {scenes.map((shot, i) => (
          <div className={styles.shot} key={shot.label} data-active={scene === i} aria-hidden={scene !== i}>
            <div className={styles.image}>
              <Image
                src={shot.image}
                alt=""
                fill
                sizes="(max-width: 899px) 100vw, 1200px"
                loading={i === 0 ? "eager" : "lazy"}
                style={shot.focus ? { objectPosition: shot.focus } : undefined}
              />
            </div>
            <div className={styles.scrim} />
            <div className={styles.copy}>
              <span className={page.label}>
                0{i + 1} / {shot.label}
              </span>
              <h2 className={page.title}>{shot.title}</h2>
              <p className={page.lede}>{shot.copy}</p>
            </div>
          </div>
        ))}
        <span className={`${page.label} ${styles.signature}`}>{signature}</span>
        <span className={`${page.label} ${styles.caption}`}>Studio imagery / Concept studies</span>
      </div>
      <div className={styles.controls}>
        <div className={styles.chapters} aria-label="Chapters">
          {scenes.map((shot, i) => (
            <button key={shot.label} className={styles.chapter} onClick={() => select(i)} aria-current={scene === i ? "step" : undefined}>
              <span>0{i + 1}</span>
              <span>{shot.label}</span>
            </button>
          ))}
        </div>
        {!reduced && (
          <button className={styles.play} onClick={toggle} aria-label={finished ? "Replay intro" : playing ? "Pause intro" : "Play intro"}>
            {finished ? "Replay ↻" : playing ? "Pause Ⅱ" : "Play ▷"}
          </button>
        )}
      </div>
      <p className="sr-only">{summary}</p>
    </div>
  );
}
