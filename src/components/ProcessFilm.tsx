"use client";

import { useEffect, useRef } from "react";
import styles from "./ProcessFilm.module.css";

const STEPS = ["Discovery", "Strategy", "Design & Build", "Launch & Grow"];
const FILM = "/process-film.mp4";

/** The section under the hero: the 16:9 process film, scrubbed by scroll.
 *  The section is taller than the screen; its inner frame stays pinned while
 *  the visitor scrolls through it, and the film's position follows the scroll
 *  (scrolling back plays it backwards). The film carries its own chapter
 *  titles, so the steps are repeated here only for screen readers.
 *
 *  The MP4 is encoded with a keyframe every second frame so seeking is close
 *  to instant; a normally compressed file would stutter here. */
export function ProcessFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let target = 0;
    let shown = -1;
    let raf = 0;
    let visible = false;

    const readScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      if (video.duration) target = progress * video.duration;
    };

    // Ease toward the scroll position so fast flicks still read as motion,
    // and only seek when the frame would actually change.
    const frame = () => {
      raf = 0;
      if (!video.duration) return;
      const next = shown < 0 ? target : shown + (target - shown) * 0.25;
      if (Math.abs(next - shown) > 1 / 60) {
        shown = Math.abs(target - next) < 1 / 60 ? target : next;
        video.currentTime = shown;
      }
      if (visible && Math.abs(target - shown) > 1 / 60) raf = requestAnimationFrame(frame);
    };

    const update = () => {
      readScroll();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    io.observe(section);

    // Some mobile browsers only decode a video after it has been played once.
    const prime = () => {
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
      update();
    };
    video.addEventListener("loadedmetadata", prime, { once: true });

    // Scrubbing needs a seekable source. Rather than rely on the host answering
    // range requests (Safari will not even play without them), download the
    // film once into memory when the section comes near; a blob URL always
    // seeks. Falls back to streaming the file if the download fails.
    let objectUrl = "";
    let cancelled = false;
    const load = () => {
      fetch(FILM)
        .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
        .then((blob) => {
          if (cancelled) return;
          objectUrl = URL.createObjectURL(blob);
          video.src = objectUrl;
        })
        .catch(() => {
          if (!cancelled) video.src = FILM;
        });
    };
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        load();
      },
      { rootMargin: "150% 0px" },
    );
    near.observe(section);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      near.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      video.removeEventListener("loadedmetadata", prime);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className={styles.section} data-nav-theme="light" aria-labelledby="process-title">
      <h2 id="process-title" className={styles.srOnly}>
        How we build: {STEPS.join(", ")}
      </h2>
      <div className={styles.pin}>
        <div className={styles.frame}>
          <video
            ref={videoRef}
            className={styles.film}
            poster="/process-film-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
