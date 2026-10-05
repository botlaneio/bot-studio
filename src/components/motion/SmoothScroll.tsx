"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
const block = (e: Event) => e.preventDefault();
const blockKeys = (e: KeyboardEvent) => {
  const t = e.target as HTMLElement | null;
  if (SCROLL_KEYS.has(e.key) && !t?.closest("input, textarea, select, button, a")) e.preventDefault();
};

/** Pauses page scrolling (for a modal), and resumes it. It blocks the scroll
 *  inputs rather than setting overflow on the page: overflow on the root
 *  breaks the sticky pin behind the modal and can jump the page. */
export const lockScroll = (locked: boolean) => {
  const method = locked ? "addEventListener" : "removeEventListener";
  window[method]("wheel", block, { passive: false } as AddEventListenerOptions);
  window[method]("touchmove", block, { passive: false } as AddEventListenerOptions);
  window[method]("keydown", blockKeys as EventListener);
  window.dispatchEvent(new CustomEvent("botlane:scroll-lock", { detail: locked }));
};

/** Eased page scrolling, as on the template (Lenis). In-page links glide to
 *  their section and stop below the fixed nav. Off when the visitor prefers
 *  reduced motion. Paused while a modal is open (lockScroll). Its frame loop
 *  runs only while the page is scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const navHeight = () => document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const lenis = new Lenis({
      // Driven below instead of autoRaf: autoRaf asks for a frame on every
      // screen refresh forever, which keeps the browser rendering even when
      // nobody is scrolling.
      autoRaf: false,
      lerp: 0.1,
      anchors: { offset: -navHeight() },
    });

    // Run only while scrolling: start on any scroll input, stop a few frames
    // after Lenis comes to rest.
    let id = 0;
    let rest = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rest = lenis.isScrolling ? 0 : rest + 1;
      id = rest < 3 ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      rest = 0;
      if (!id) id = requestAnimationFrame(loop);
    };
    const WAKE_EVENTS = ["wheel", "touchstart", "touchmove", "keydown", "scroll", "click"] as const;
    for (const type of WAKE_EVENTS) window.addEventListener(type, wake, { passive: true, capture: true });

    const onLock = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) lenis.stop();
      else lenis.start();
      wake();
    };
    window.addEventListener("botlane:scroll-lock", onLock);
    return () => {
      for (const type of WAKE_EVENTS) window.removeEventListener(type, wake, { capture: true });
      window.removeEventListener("botlane:scroll-lock", onLock);
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}
