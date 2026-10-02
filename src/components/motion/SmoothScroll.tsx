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
 *  reduced motion. Paused while a modal is open (lockScroll). */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const navHeight = () => document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -navHeight() },
    });
    const onLock = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener("botlane:scroll-lock", onLock);
    return () => {
      window.removeEventListener("botlane:scroll-lock", onLock);
      lenis.destroy();
    };
  }, []);
  return null;
}
