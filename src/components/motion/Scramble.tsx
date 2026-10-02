"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\-_#";

/** Mono text that decodes letter by letter from random glyphs, as the
 *  template's small uppercase lines do on load. Screen readers get the plain
 *  text; the animated copy is hidden from them. Until it starts, the text is
 *  hidden by CSS ([data-scramble]), with a failsafe that shows it after 3s. */
export function Scramble({
  text,
  delay = 0,
  duration = 900,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = text;
      el.style.visibility = "visible";
      return;
    }

    // Each letter gets its own moment to start, then flickers for a beat.
    const FLICKER = 260;
    const plan = Array.from(text, (char) => ({ char, at: Math.random() * duration }));
    let raf = 0;
    let start = 0;
    const frame = (now: number) => {
      if (!start) {
        start = now;
        el.style.visibility = "visible";
      }
      const t = now - start;
      let out = "";
      let done = true;
      for (const { char, at } of plan) {
        if (char === " ") out += " ";
        else if (t >= at + FLICKER) out += char;
        else {
          done = false;
          out += t >= at ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : " ";
        }
      }
      el.textContent = out;
      if (!done) raf = requestAnimationFrame(frame);
    };
    const timer = window.setTimeout(() => (raf = requestAnimationFrame(frame)), delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = text;
      el.style.visibility = "visible";
    };
  }, [text, delay, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" data-scramble="">
        {text}
      </span>
    </span>
  );
}
