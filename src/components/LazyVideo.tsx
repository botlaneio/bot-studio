"use client";

import { useEffect, useRef } from "react";

/** A muted, looping background video that downloads nothing until it is near
 *  the screen (and the page has finished loading), plays only while visible,
 *  and pauses when scrolled away. The poster shows until then. Visitors who
 *  ask for reduced motion see the poster only. */
export function LazyVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let loaded = document.readyState === "complete";

    const sync = () => {
      if (visible && loaded) {
        if (!video.getAttribute("src")) {
          video.src = src;
          video.preload = "auto";
        }
        video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    const onLoad = () => {
      loaded = true;
      sync();
    };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, [src]);

  return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}
