"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./IdentityMotion.module.css";

/** One event-driven frame per scroll; no React updates in the animation loop. */
export function MotionStage({ children, className = "", pin = false, label }: { children: ReactNode; className?: string; pin?: boolean; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const p = preference.matches ? 1 : Math.min(1, Math.max(0, pin ? -rect.top / Math.max(1, rect.height - window.innerHeight) : (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      element.style.setProperty("--progress", p.toFixed(4));
    };
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); }, { rootMargin: "150px" });
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); cancelAnimationFrame(frame); };
  }, [pin]);
  return <div ref={ref} className={`${styles.stage} ${pin ? styles.pinned : ""} ${className}`} aria-label={label}>{children}</div>;
}

export function IdentityMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden="true"><path className={styles.markLeft} d="M110 32C62 32 24 70 24 118s38 86 86 86V32Z" fill="currentColor" /><path className={styles.markRight} d="M130 36v172c48 0 86-38 86-86s-38-86-86-86Z" fill="currentColor" /></svg>;
}

export function BrandPalette() {
  const [selected, setSelected] = useState(0);
  const colours = [{ name: "Cobalt", hex: "#0077E6", ink: "#fff" }, { name: "Chalk", hex: "#F5F5F5", ink: "#050608" }, { name: "Graphite", hex: "#171B22", ink: "#fff" }];
  const colour = colours[selected];
  return <div className={styles.palette}><div className={styles.palettePreview} style={{ backgroundColor: colour.hex, color: colour.ink }}><IdentityMark /><span>Same signature.<br />A different expression.</span><small>{colour.name} / {colour.hex}</small></div><div className={styles.swatches} role="group" aria-label="Identity colour studies">{colours.map((item, i) => <button key={item.name} type="button" aria-pressed={i === selected} onClick={() => setSelected(i)}><span style={{ backgroundColor: item.hex }} />{item.name}</button>)}</div></div>;
}
