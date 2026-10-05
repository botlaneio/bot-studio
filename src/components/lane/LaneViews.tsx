"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { BANDS } from "@/lib/pricing";
import { STUDIO_EMAIL, STUDIO_PHONE, STUDIO_PHONE_HREF, type LaneView } from "./studioReply";
import styles from "./LaneChat.module.css";

/* The large window's views. Everything here restates published facts
   (pricing.ts, the Work page, contact details). "Start a project" is a real
   workflow: it sends the brief through /api/inquiry, the same endpoint as
   the contact form, and only says "sent" when the server confirms it. */

/* ───────── Start a project ───────── */

const KINDS = ["Website", "Web app", "Not sure yet"] as const;
const TIMINGS = ["As soon as possible", "In 1–3 months", "Later this year", "Just exploring"] as const;
type Kind = (typeof KINDS)[number];

function budgetsFor(kind: Kind | null) {
  const band = BANDS.find((b) => (kind === "Web app" ? b.name === "Web apps" : b.name === "Websites"));
  const rows = kind === "Not sure yet" || !band ? [] : band.rows.map((r) => `${r.name} · ${r.price}`);
  return [...rows, "Not sure yet"];
}

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "invalid"; fields: Record<string, string> } | { state: "failed" };

export function LaneBrief({ initialKind }: { initialKind?: Kind }) {
  const [step, setStep] = useState(initialKind ? 1 : 0);
  const [kind, setKind] = useState<Kind | null>(initialKind ?? null);
  const [budget, setBudget] = useState<string | null>(null);
  const [timing, setTiming] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const renderedAt = useRef(0);
  const stepRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  useEffect(() => {
    stepRef.current?.focus({ preventScroll: true });
  }, [step]);

  const message = [
    `Planning: ${kind ?? "Not sure yet"}`,
    `Budget: ${budget ?? "Not sure yet"}`,
    `Timing: ${timing ?? "Not sure yet"}`,
    "",
    notes.trim() || "(No extra notes.)",
    "",
    "Sent from Lane, the site guide.",
  ].join("\n");

  const mailto = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(`Project brief${company ? `: ${company}` : ""}`)}&body=${encodeURIComponent(message)}`;

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, website: (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value ?? "", renderedAt: renderedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; fields?: Record<string, string> };
      if (res.ok && data.ok) setStatus({ state: "sent" });
      else if (res.status === 422 && data.fields) setStatus({ state: "invalid", fields: data.fields });
      else setStatus({ state: "failed" });
    } catch {
      setStatus({ state: "failed" });
    }
  };

  if (status.state === "sent") {
    return (
      <div className={styles.viewBody} data-lenis-prevent>
        <div className={styles.done}>
          <span className={styles.doneMark} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M6 12.5l4 4L18 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 ref={stepRef} tabIndex={-1} className={styles.viewTitle}>
            Brief sent<b>.</b>
          </h3>
          <p className={styles.viewText}>
            Your brief is in the studio inbox. The team will reply to <strong>{email}</strong>. Nothing is booked yet; any next step is agreed with you
            by email.
          </p>
        </div>
      </div>
    );
  }

  const steps = ["What", "Budget", "Timing", "You"];
  const fieldError = (k: string) => (status.state === "invalid" ? status.fields[k] : undefined);

  return (
    <div className={styles.viewBody} data-lenis-prevent>
      <ol className={styles.progress} aria-label="Brief steps">
        {steps.map((s, i) => (
          <li key={s} data-on={i <= step || undefined} aria-current={i === step ? "step" : undefined}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className={styles.step}>
          <h3 ref={stepRef} tabIndex={-1} className={styles.viewTitle}>
            What are you planning<b>?</b>
          </h3>
          <div className={styles.choices}>
            {KINDS.map((k) => (
              <button key={k} type="button" className={styles.choice} aria-pressed={kind === k} onClick={() => { setKind(k); setBudget(null); setStep(1); }}>
                <b>{k}</b>
                <span>{k === "Website" ? "A site that explains your business" : k === "Web app" ? "A portal, tool or product" : "We'll help you decide"}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className={styles.step}>
          <h3 ref={stepRef} tabIndex={-1} className={styles.viewTitle}>
            Roughly what budget<b>?</b>
          </h3>
          <p className={styles.viewText}>Our published starting ranges. Every project is still quoted to its agreed scope.</p>
          <div className={styles.choices}>
            {budgetsFor(kind).map((b) => (
              <button key={b} type="button" className={styles.choice} aria-pressed={budget === b} onClick={() => { setBudget(b); setStep(2); }}>
                <b>{b}</b>
              </button>
            ))}
          </div>
          <button type="button" className={styles.prev} onClick={() => setStep(0)}>
            ← Back
          </button>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className={styles.step}>
          <h3 ref={stepRef} tabIndex={-1} className={styles.viewTitle}>
            When would you like to start<b>?</b>
          </h3>
          <div className={styles.choices}>
            {TIMINGS.map((t) => (
              <button key={t} type="button" className={styles.choice} aria-pressed={timing === t} onClick={() => { setTiming(t); setStep(3); }}>
                <b>{t}</b>
              </button>
            ))}
          </div>
          <button type="button" className={styles.prev} onClick={() => setStep(1)}>
            ← Back
          </button>
        </fieldset>
      )}

      {step === 3 && (
        <form className={styles.step} onSubmit={send} noValidate>
          <h3 ref={stepRef} tabIndex={-1} className={styles.viewTitle}>
            Where should we reply<b>?</b>
          </h3>
          <p className={styles.summary}>
            {kind} · {budget} · {timing}
          </p>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span>Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required maxLength={120} aria-invalid={!!fieldError("name") || undefined} />
              {fieldError("name") && <em>{fieldError("name")}</em>}
            </label>
            <label className={styles.formField}>
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required maxLength={254} aria-invalid={!!fieldError("email") || undefined} />
              {fieldError("email") && <em>{fieldError("email")}</em>}
            </label>
            <label className={`${styles.formField} ${styles.formWide}`}>
              <span>Company (optional)</span>
              <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" maxLength={160} />
            </label>
            <label className={`${styles.formField} ${styles.formWide}`}>
              <span>Anything else we should know? (optional)</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={4500} />
            </label>
            {/* Honeypot: people never see or fill this. */}
            <input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          </div>
          {status.state === "failed" && (
            <p className={styles.error} role="alert">
              It didn&rsquo;t send. Your brief is still here; you can try again or <a href={mailto}>email it instead</a>.
            </p>
          )}
          <div className={styles.formActions}>
            <button type="button" className={styles.prev} onClick={() => setStep(2)}>
              ← Back
            </button>
            <button type="submit" className={styles.submit} disabled={status.state === "sending" || !name.trim() || !email.trim()}>
              {status.state === "sending" ? "Sending…" : "Send brief"}
            </button>
          </div>
          <p className={styles.consent}>
            Sends your brief to {STUDIO_EMAIL}. See our <a href="/privacy">Privacy policy</a>.
          </p>
        </form>
      )}
    </div>
  );
}

/* ───────── Price guide ───────── */

export function LanePrices({ onStart }: { onStart: () => void }) {
  const [tab, setTab] = useState(0);
  const band = BANDS[tab];
  return (
    <div className={styles.viewBody} data-lenis-prevent>
      <div className={styles.tabs} role="tablist" aria-label="Offer">
        {BANDS.map((b, i) => (
          <button key={b.name} type="button" role="tab" aria-selected={tab === i} className={styles.tab} onClick={() => setTab(i)}>
            {b.name}
          </button>
        ))}
      </div>
      <ul className={styles.bands} role="tabpanel">
        {band.rows.map((r) => (
          <li key={r.name}>
            <span className={styles.bandName}>{r.name}</span>
            <b className={styles.bandPrice}>{r.price}</b>
            <span className={styles.bandDetail}>{r.detail}</span>
          </li>
        ))}
      </ul>
      <p className={styles.viewText}>
        Starting ranges, not a fixed total. SEO and AI integrations are optional add-ons, quoted separately. Every project gets a written quote.
      </p>
      <div className={styles.formActions}>
        <a className={styles.prev} href="/pricing">
          Full pricing →
        </a>
        <button type="button" className={styles.submit} onClick={onStart}>
          Start a project
        </button>
      </div>
    </div>
  );
}

/* ───────── Work ───────── */

const WORK = [
  { title: "botlane.io", tag: "Built in-house", text: "Positioning, interface design and development by the team.", image: "/work/botlane-io-product.webp", href: "/work#inhouse-title" },
  { title: "FORME and NORTHLINE", tag: "Self-initiated study · Not a client project", text: "Two studio studies in identity and art direction.", image: "/brand-identity/forme-hero.webp", href: "/work#studies-title" },
  { title: "This site, unpacked", tag: "Checkable evidence", text: "How botlane.studio was made, verified against its own code.", image: "/studio-reel-poster.jpg", href: "/work#unpacked-title" },
];

export function LaneWork() {
  return (
    <div className={styles.viewBody} data-lenis-prevent>
      <p className={styles.viewText}>
        We&rsquo;re a new studio: no client case studies yet, and nothing here is dressed up as one.
      </p>
      <ul className={styles.workList}>
        {WORK.map((w) => (
          <li key={w.title}>
            <a className={styles.workCard} href={w.href}>
              <Image src={w.image} alt="" width={160} height={110} sizes="120px" />
              <span>
                <em>{w.tag}</em>
                <b>{w.title}</b>
                <span>{w.text}</span>
              </span>
              <span className={styles.workArrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── Contact ───────── */

export function LaneContact({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.viewBody} data-lenis-prevent>
      <ul className={styles.contactList}>
        <li>
          <span>Email</span>
          <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
        </li>
        <li>
          <span>Call or text</span>
          <a href={`tel:${STUDIO_PHONE_HREF}`}>{STUDIO_PHONE}</a>
          <a className={styles.contactAlt} href={`sms:${STUDIO_PHONE_HREF}`}>
            Text us
          </a>
        </li>
        <li>
          <span>Contact form</span>
          <a href="/contact#inquiry">Send a full inquiry →</a>
        </li>
      </ul>
      <div className={styles.formActions}>
        <span />
        <button type="button" className={styles.submit} onClick={onStart}>
          Start a project
        </button>
      </div>
    </div>
  );
}

export const VIEW_META: Record<LaneView, { title: string; line: string }> = {
  ask: { title: "Ask Lane", line: "Questions about offers, prices and process" },
  brief: { title: "Start a project", line: "Four quick questions, sent to the team" },
  prices: { title: "Price guide", line: "Published starting ranges" },
  work: { title: "Our work", line: "In-house work and labelled studies" },
  contact: { title: "Contact", line: "Email, call or text the studio" },
};
