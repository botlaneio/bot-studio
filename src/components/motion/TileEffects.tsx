"use client";

import { useEffect, useRef } from "react";
import styles from "./TileEffects.module.css";

/** Two effects for the image tiles, mounted inside their section:
 *
 *  - Parallax: every `[data-parallax]` image drifts against the scroll, moving
 *    up to `data-parallax` (a fraction of its tile's height) either way.
 *  - Cursor: over a `[data-cursor]` element on a mouse-driven device, a blue
 *    disc labelled with that attribute's text follows the pointer, easing
 *    behind it, in place of the arrow.
 *
 *  Both are off when the visitor prefers reduced motion. */
export function TileEffects({ scope }: { scope: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.getElementById(scope);
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!root || !cursor || !label) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ---- parallax ----
    const images = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const place = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const img of images) {
        const tile = img.parentElement!.getBoundingClientRect();
        if (tile.bottom < -200 || tile.top > vh + 200) continue;
        // 0 when the tile's top meets the screen's bottom, 1 when its bottom leaves the top.
        const p = (vh - tile.top) / (vh + tile.height);
        const range = Number(img.dataset.parallax) || 0.1;
        img.style.transform = `translate3d(0, ${((0.5 - p) * 2 * range * tile.height).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // ---- cursor ----
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let on = false;
    let follow = 0;
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      follow = on || Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const inside = !!target && root.contains(target);
      if (inside && !on) {
        cx = tx;
        cy = ty;
        label.textContent = target!.dataset.cursor ?? "";
      }
      if (inside !== on) {
        on = inside;
        cursor.toggleAttribute("data-on", on);
      }
      if (!follow) follow = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      on = false;
      cursor.removeAttribute("data-on");
    };
    if (fine) {
      root.setAttribute("data-custom-cursor", "");
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(follow);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.removeAttribute("data-custom-cursor");
      images.forEach((img) => (img.style.transform = ""));
    };
  }, [scope]);

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
