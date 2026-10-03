"use client";

import { useEffect, useRef, useState } from "react";

/** Plays the showreel once on load, then covers it with the poster.
 *  It does not loop and does not replay on hover. */
export function ShowreelVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onEnded = () => setEnded(true);
    video.addEventListener("ended", onEnded);
    if (video.ended) setEnded(true);
    video.play().catch(() => {});

    return () => video.removeEventListener("ended", onEnded);
  }, []);

  return (
    <>
      <video ref={ref} src={src} poster={poster} autoPlay muted playsInline preload="auto" />
      {ended ? <img src={poster} alt="" /> : null}
    </>
  );
}
