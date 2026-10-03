"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import styles from "./LaneChat.module.css";

const GREETING =
  "Tell me about one workflow your team repeats. I'll help map it to the closest botLane system and starting plan.";

const CHIPS = ["Find the right system", "Compare plans", "I'm an existing customer"] as const;

type Line = { role: "assistant" | "user"; text: string };

/**
 * Lane. Corner launcher on every page (mounted from the root layout).
 * The open window is local only: chips and send never call an API or send mail.
 */
export function LaneChat() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [lines, setLines] = useState<Line[]>([{ role: "assistant", text: GREETING }]);
  const panelId = useId();
  const fieldId = useId();
  const markId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const appendUser = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setLines((prev) => [...prev, { role: "user", text: trimmed }]);
    setNote("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    appendUser(note);
  };

  return (
    <div className={styles.dock}>
      {open ? (
        <section className={styles.panel} id={panelId} aria-label="Lane">
          <header className={styles.head}>
            <span className={styles.markWell}>
              <LaneMark className={styles.mark} idPrefix={`${markId}-head`} size={24} />
            </span>
            <div className={styles.titles}>
              <p className={styles.title}>Lane</p>
              <p className={styles.subtitle}>Map a workflow to the right starting point.</p>
            </div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 3l8 8M11 3 3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className={styles.thread} role="log" aria-live="polite" aria-relevant="additions">
            {lines.map((line, index) => (
              <p
                key={`${line.role}-${index}`}
                className={`${styles.bubble} ${line.role === "user" ? styles.user : styles.assistant}`}
              >
                {line.text}
              </p>
            ))}
          </div>

          <div className={styles.pills}>
            {CHIPS.map((label) => (
              <button
                key={label}
                type="button"
                className={`${styles.pill} ${label === "I'm an existing customer" ? styles.pillWide : ""}`}
                onClick={() => appendUser(label)}
              >
                {label}
              </button>
            ))}
          </div>

          <form className={styles.composer} onSubmit={onSubmit}>
            <label className={styles.visuallyHidden} htmlFor={fieldId}>
              Describe a recurring workflow
            </label>
            <input
              id={fieldId}
              className={styles.field}
              type="text"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe a recurring workflow..."
              autoComplete="off"
            />
            <button type="submit" className={styles.send} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4.2 11.7 19.6 4.2c.6-.3 1.2.4.9 1L13.2 20c-.3.7-1.3.6-1.5-.1l-1.6-5.6-5.6-1.6c-.7-.2-.8-1.2-.3-1.5Z"
                  fill="currentColor"
                />
                <path d="M10.2 14.2 19.6 4.2" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" />
              </svg>
            </button>
          </form>

          <div className={styles.actions}>
            <a className={styles.action} href="/contact">
              Talk to the team →
            </a>
            <a className={styles.action} href="#contact">
              Book a call
            </a>
          </div>

          <p className={styles.fine}>AI assistant · Don&apos;t share passwords, payment details, or confidential records.</p>
        </section>
      ) : null}

      <button
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <LaneMark className={styles.logo} idPrefix={`${markId}-btn`} />
        <span className={styles.visuallyHidden}>{open ? "Close Lane" : "Open Lane"}</span>
      </button>
    </div>
  );
}

/** Blue plate from the left of public/logo.svg (viewBox 0 0 64 64, before the wordmark). The SVG does not loop; the one-shot spin and flash are CSS on the launcher only. */
function LaneMark({ className, idPrefix, size = 42 }: { className?: string; idPrefix: string; size?: number }) {
  const pid = (name: string) => `${idPrefix}-${name}`;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={pid("plate")} x1="32" y1="1" x2="32" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D9BFF" />
          <stop offset="0.55" stopColor="#0077E6" />
          <stop offset="1" stopColor="#0058B0" />
        </linearGradient>
        <linearGradient id={pid("slot")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08090A" />
          <stop offset="0.62" stopColor="#15181C" />
          <stop offset="1" stopColor="#2A2F36" />
        </linearGradient>
        <radialGradient id={pid("lens")} cx="0.34" cy="0.3" r="0.72">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F6F5F1" />
          <stop offset="1" stopColor="#D9D8D2" />
        </radialGradient>
        <filter id={pid("glow")} x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="3.1" />
        </filter>
        <linearGradient id={pid("depth")} x1="32" y1="1" x2="32" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="0.28" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#00356e" stopOpacity="0" />
          <stop offset="1" stopColor="#002850" stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="17" fill={`url(#${pid("plate")})`} />
      <rect x="1" y="1" width="62" height="62" rx="17" fill={`url(#${pid("depth")})`} />
      <rect x="1.75" y="1.75" width="60.5" height="60.5" rx="16.3" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="1" y="1" width="62" height="62" rx="17" fill="none" stroke="#00468C" strokeOpacity="0.6" />
      <rect x="12" y="25" width="40" height="14" rx="7" fill={`url(#${pid("slot")})`} />
      <path d="M19 38.4h26" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="21" cy="32" r="5.4" fill="#fff" opacity="0.55" filter={`url(#${pid("glow")})`} />
      <circle cx="21" cy="32" r="5" fill={`url(#${pid("lens")})`} />
    </svg>
  );
}
