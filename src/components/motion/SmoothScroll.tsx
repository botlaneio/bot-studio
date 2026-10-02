"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Eased page scrolling, as on the template (Lenis). In-page links glide to
 *  their section and stop below the fixed nav. Off when the visitor prefers
 *  reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const navHeight = () => document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -navHeight() },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
