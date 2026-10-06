"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\-_#";

/** Mono text that decodes letter by letter from random glyphs, as the
 *  template's small uppercase lines do on load. Screen readers get the plain
 *  text; the animated copy is hidden from them. Until it starts, the text is
 *  hidden by CSS ([data-scramble]), with a failsafe that shows it after 3s.
 *
 *  `inView` runs that same decode the first time the line's
 *  [data-scramble-scope] (or the line itself) scrolls into view, instead of
 *  on load. The hero does not pass it.
 *
 *  `staticWhen` is a media query under which the line skips the decode and
 *  shows its text from the first paint. The hero uses it on phones, where
 *  these lines are the largest text on screen: hiding them until JavaScript
 *  runs made them the slowest paint on the page. Pair it with CSS that keeps
 *  [data-scramble] visible under the same query. */
export function Scramble({
  text,
  delay = 0,
  duration = 900,
  className,
  inView = false,
  staticWhen,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  inView?: boolean;
  staticWhen?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || (staticWhen && window.matchMedia(staticWhen).matches)) {
      el.textContent = text;
      el.style.visibility = "visible";
      return;
    }

    // Each letter gets its own moment to start, then flickers for a beat.
    const FLICKER = 260;
    const plan = Array.from(text, (char) => ({ char, at: Math.random() * duration }));
    let raf = 0;
    let start = 0;
    let io: IntersectionObserver | undefined;
    const frame = (now: number) => {
      if (!start) {
        start = now;
        el.style.visibility = "visible";
        if (el.getAttribute("data-scramble") === "hold") el.setAttribute("data-scramble", "");
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
    const play = () => {
      const timer = window.setTimeout(() => (raf = requestAnimationFrame(frame)), delay);
      return timer;
    };

    let timer = 0;
    if (inView) {
      const target = el.closest("[data-scramble-scope]") ?? el;
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          io?.disconnect();
          io = undefined;
          timer = play();
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(target);
    } else {
      timer = play();
    }

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      io?.disconnect();
      el.textContent = text;
      el.style.visibility = "visible";
    };
  }, [text, delay, duration, inView, staticWhen]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" data-scramble={inView ? "hold" : ""}>
        {text}
      </span>
    </span>
  );
}
