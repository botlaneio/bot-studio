"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import styles from "./LaneChat.module.css";

/**
 * Lane. A corner widget for Botlane Studios. Not mounted from layout, pages,
 * or any existing component, so it does not render on the site.
 * Nothing here is sent anywhere.
 */
export function LaneChat() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const panelId = useId();
  const fieldId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.dock}>
      {open ? (
        <section className={styles.panel} id={panelId} aria-label="Agent Lane">
          <header className={styles.head}>
            <p className={styles.name}>Agent Lane</p>
            <button type="button" className={styles.close} onClick={() => setOpen(false)}>
              Close
            </button>
          </header>

          <p className={styles.label}>Studio</p>
          <address className={styles.address}>
            Botlane Studios
            <br />
            30 N Gould St, Ste R
            <br />
            Sheridan, WY 82801
          </address>

          <p className={styles.label}>Online</p>
          <a className={styles.mail} href="mailto:admin@botlane.io">
            admin@botlane.io
          </a>

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.label} htmlFor={fieldId}>
              Note
            </label>
            <input
              id={fieldId}
              className={styles.field}
              type="text"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a note"
              autoComplete="off"
            />
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <LaneMark className={styles.logo} />
        <span className={styles.visuallyHidden}>{open ? "Close Agent Lane" : "Open Agent Lane"}</span>
      </button>
    </div>
  );
}

/** Blue plate from the left of public/logo.svg (viewBox 0 0 64 64, before the wordmark). Static: no shutter loop. */
function LaneMark({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="42" height="42" aria-hidden="true">
      <defs>
        <linearGradient id="lane-mark-plate" x1="32" y1="1" x2="32" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D9BFF" />
          <stop offset="0.55" stopColor="#0077E6" />
          <stop offset="1" stopColor="#0058B0" />
        </linearGradient>
        <linearGradient id="lane-mark-slot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08090A" />
          <stop offset="0.62" stopColor="#15181C" />
          <stop offset="1" stopColor="#2A2F36" />
        </linearGradient>
        <radialGradient id="lane-mark-lens" cx="0.34" cy="0.3" r="0.72">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F6F5F1" />
          <stop offset="1" stopColor="#D9D8D2" />
        </radialGradient>
        <filter id="lane-mark-glow" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="3.1" />
        </filter>
        <linearGradient id="lane-mark-depth" x1="32" y1="1" x2="32" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="0.28" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#00356e" stopOpacity="0" />
          <stop offset="1" stopColor="#002850" stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="17" fill="url(#lane-mark-plate)" />
      <rect x="1" y="1" width="62" height="62" rx="17" fill="url(#lane-mark-depth)" />
      <rect x="1.75" y="1.75" width="60.5" height="60.5" rx="16.3" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="1" y="1" width="62" height="62" rx="17" fill="none" stroke="#00468C" strokeOpacity="0.6" />
      <rect x="12" y="25" width="40" height="14" rx="7" fill="url(#lane-mark-slot)" />
      <path d="M19 38.4h26" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="21" cy="32" r="5.4" fill="#fff" opacity="0.55" filter="url(#lane-mark-glow)" />
      <circle cx="21" cy="32" r="5" fill="url(#lane-mark-lens)" />
    </svg>
  );
}
