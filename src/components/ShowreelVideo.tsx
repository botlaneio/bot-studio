"use client";

import { useEffect, useRef } from "react";

/** The showreel: plays once on load and rests on its last frame (the
 *  botLane end card). Hovering replays it on a computer; on touch screens,
 *  where a tap opens the link it sits in, it replays when scrolled back into
 *  view. */
export function ShowreelVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const replay = () => {
      if (!video.ended && !video.paused) return;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const link = video.closest("a") ?? video;
    const hover = window.matchMedia("(hover: hover)").matches;
    if (hover) link.addEventListener("mouseenter", replay);

    // Touch: replay each time it comes back on screen after it has finished.
    let wasOut = false;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) wasOut = true;
      else if (wasOut && !hover) {
        wasOut = false;
        replay();
      }
    });
    io.observe(video);

    return () => {
      link.removeEventListener("mouseenter", replay);
      io.disconnect();
    };
  }, []);

  return <video ref={ref} src={src} poster={poster} autoPlay muted playsInline preload="auto" />;
}
