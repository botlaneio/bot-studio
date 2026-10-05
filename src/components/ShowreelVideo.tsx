"use client";

import { useEffect, useRef, useState } from "react";

/** Plays the studio reel once on load, then covers it with the poster (the
 *  reel's end card). It does not loop or replay on hover. Visitors who ask
 *  for reduced motion get the poster only. `first` is the opening frame,
 *  shown while the video loads. */
export function ShowreelVideo({ src, first, poster }: { src: string; first: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Reduced motion: never start; CSS keeps the poster on top.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onEnded = () => setEnded(true);
    video.addEventListener("ended", onEnded);
    if (video.ended) setEnded(true);
    video.play().catch(() => {});

    return () => video.removeEventListener("ended", onEnded);
  }, []);

  return (
    <>
      <video ref={ref} src={src} poster={first} muted playsInline preload="auto" aria-hidden="true" />
      <img src={poster} alt="" data-show={ended || undefined} />
    </>
  );
}
