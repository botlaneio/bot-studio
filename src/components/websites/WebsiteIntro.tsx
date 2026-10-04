"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import page from "../page/Page.module.css";
import styles from "./WebsiteIntro.module.css";

const scenes = [
  { label: "The ambition", title: <>Your business.<br />In focus.</>, copy: "Every business has a story worth understanding.", image: "/strategy/strategy-desk.webp" },
  { label: "The story", title: <>First, we find<br />what matters.</>, copy: "Your audience. Your point of view. A clear direction.", image: "/strategy/story.webp" },
  { label: "The craft", title: <>Then, we give<br />it a place.</>, copy: "Strategy, design and development. Considered together.", image: "/brand-identity/northline-collection.webp" },
  { label: "The next chapter", title: <>A website.<br />With purpose.</>, copy: "Botlane Studios. From the first conversation to launch.", image: "/hero.jpg" },
];

/** A finite editorial sequence; visibility suspends its clock. */
export function WebsiteIntro() {
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
      else { setFinished(true); setPlaying(false); }
    }, 100);
    return () => window.clearInterval(timer);
  }, [running, scene]);

  const select = (index: number) => {
    elapsed.current = 0;
    setScene(index);
    setPlaying(false);
    setFinished(false);
  };
  const toggle = () => {
    if (finished) { elapsed.current = 0; setScene(0); setFinished(false); }
    setPlaying(!playing);
  };

  return (
    <div ref={root} className={styles.film} data-running={running} data-reduced={reduced} aria-label="Botlane Studios: our approach to websites">
      <div className={styles.stage}>
        {scenes.map((shot, i) => (
          <div className={styles.shot} key={shot.label} data-active={scene === i} aria-hidden={scene !== i}>
            <div className={styles.image}><Image src={shot.image} alt="" fill sizes="(max-width: 899px) 100vw, 1200px" loading={i === 0 ? "eager" : "lazy"} /></div>
            <div className={styles.scrim} />
            <div className={styles.copy}>
              <span className={page.label}>0{i + 1} / {shot.label}</span>
              <h2 className={page.title}>{shot.title}</h2>
              <p className={page.lede}>{shot.copy}</p>
            </div>
          </div>
        ))}
        <span className={`${page.label} ${styles.signature}`}>Botlane / Websites</span>
        <span className={`${page.label} ${styles.caption}`}>Studio imagery / Concept studies</span>
      </div>
      <div className={styles.controls}>
        <div className={styles.chapters} aria-label="Intro chapters">
          {scenes.map((shot, i) => <button key={shot.label} className={styles.chapter} onClick={() => select(i)} aria-current={scene === i ? "step" : undefined}><span>0{i + 1}</span><span>{shot.label}</span></button>)}
        </div>
        {!reduced && <button className={styles.play} onClick={toggle} aria-label={finished ? "Replay intro" : playing ? "Pause intro" : "Play intro"}>{finished ? "Replay ↻" : playing ? "Pause Ⅱ" : "Play ▷"}</button>}
      </div>
      <p className="sr-only">We understand your business, clarify its story, and bring strategy, design and development together to create a website with purpose.</p>
    </div>
  );
}
