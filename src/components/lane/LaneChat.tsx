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
        <section className={styles.panel} id={panelId} aria-label="Lane">
          <header className={styles.head}>
            <p className={styles.name}>Lane</p>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.logo} src="/logo.svg" alt="" width={897} height={100} />
        <span className={styles.visuallyHidden}>{open ? "Close Lane" : "Open Lane"}</span>
      </button>
    </div>
  );
}
