"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { Arrow } from "@/components/motion/Arrow";
import styles from "./contact.module.css";

/** Opens the visitor's mail client. There is no form backend on the site. */
export function ContactForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = [`Name: ${name}`, company ? `Company: ${company}` : "", `Email: ${email}`, "", message]
      .filter((line) => line !== "")
      .join("\n");
    const href = `mailto:admin@botlane.io?subject=${encodeURIComponent("Botlane Studios")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span className="sr-only">Your name</span>
        <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
      </label>
      <label className={styles.field}>
        <span className="sr-only">Company</span>
        <input name="company" type="text" autoComplete="organization" placeholder="Company" />
      </label>
      <label className={styles.field}>
        <span className="sr-only">Email</span>
        <input name="email" type="email" autoComplete="email" inputMode="email" placeholder="Email" required />
      </label>
      <label className={styles.field}>
        <span className="sr-only">Your message</span>
        <textarea name="message" placeholder="Your message" rows={4} required />
      </label>
      <button type="submit" className={`${styles.submit} arrowHost`}>
        Prepare email
        <Arrow className={styles.submitArrow} />
      </button>
      <p className={styles.legal}>This opens a draft in your email app. Review it and send it there. If your email app does not open, write to <a href="mailto:admin@botlane.io">admin@botlane.io</a>.</p>
      <p className={styles.legal}>
        See our <Link href="/terms">Terms of Service</Link>.
      </p>
    </form>
  );
}
