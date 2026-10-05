"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Arrow } from "@/components/motion/Arrow";
import { STUDIO_INBOX } from "@/lib/inquiry";
import styles from "./contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

/** Sends the inquiry to the studio through /api/inquiry. If delivery fails,
 *  the visitor gets a ready-made email to send instead. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fallback, setFallback] = useState("");
  const [sentTo, setSentTo] = useState("");
  const renderedAt = useRef(0);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    setErrors({});

    // Prepared now, used only if delivery fails.
    const body = [`Name: ${data.name}`, data.company ? `Company: ${data.company}` : "", `Email: ${data.email}`, "", data.message]
      .filter((l) => l !== "")
      .join("\n");
    setFallback(`mailto:${STUDIO_INBOX}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(body)}`);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, renderedAt: renderedAt.current }),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; fields?: FieldErrors };
      if (res.ok && out.ok) {
        setSentTo(String(data.email ?? "").trim());
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 422 && out.fields) {
        setErrors(out.fields);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.sent}>
        <p ref={statusRef} tabIndex={-1} className={styles.sentTitle} role="status">
          Thanks, your message is with us<b>.</b>
        </p>
        <p className={styles.legal}>
          We&apos;ll reply to {sentTo || "your email"} from {STUDIO_INBOX}. If it doesn&apos;t arrive, check your spam folder or write to us
          directly.
        </p>
        <button type="button" className={styles.again} onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const fieldError = (name: keyof FieldErrors) =>
    errors[name] ? (
      <span id={`err-${name}`} className={styles.fieldError}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field} data-invalid={errors.name ? "" : undefined}>
        <span className="sr-only">Your name</span>
        <input name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
        {fieldError("name")}
      </label>
      <label className={styles.field}>
        <span className="sr-only">Company</span>
        <input name="company" type="text" autoComplete="organization" placeholder="Company" maxLength={160} />
      </label>
      <label className={styles.field} data-invalid={errors.email ? "" : undefined}>
        <span className="sr-only">Email</span>
        <input name="email" type="email" autoComplete="email" inputMode="email" placeholder="Email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
        {fieldError("email")}
      </label>
      <label className={styles.field} data-invalid={errors.message ? "" : undefined}>
        <span className="sr-only">Your message</span>
        <textarea name="message" placeholder="Your message" rows={4} required minLength={10} maxLength={5000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
        {fieldError("message")}
      </label>
      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className={`${styles.submit} arrowHost`} disabled={status === "sending"} aria-busy={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <Arrow className={styles.submitArrow} />
      </button>
      {status === "error" ? (
        <p ref={statusRef} tabIndex={-1} className={styles.formError} role="alert">
          Your message didn&apos;t send. Nothing was lost:{" "}
          <a href={fallback}>email it to {STUDIO_INBOX}</a> instead, or try again in a moment.
        </p>
      ) : null}
      <p className={styles.legal}>
        Your message goes straight to the studio inbox. See our <Link href="/privacy">Privacy policy</Link> and{" "}
        <Link href="/terms">Terms of use</Link>.
      </p>
    </form>
  );
}
