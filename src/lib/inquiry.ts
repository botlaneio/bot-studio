/** Contact-form inquiries: validation and the email the studio receives.
 *  Pure functions, no I/O, so they run in the Worker and in tests. */

export const STUDIO_INBOX = "project@botlane.studio";

export const LIMITS = { name: 120, company: 160, email: 254, message: 5000, minMessage: 10 } as const;

/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 2500;

/** How the visitor reached the form (see src/lib/visitSource.ts). All optional. */
export type InquirySource = { via: "contact" | "lane" | ""; page: string; landing: string; referrer: string; utm: string };

export type Inquiry = { name: string; company: string; email: string; message: string; source?: InquirySource };

export type ParseResult =
  | { ok: true; inquiry: Inquiry }
  | { ok: false; spam: true }
  | { ok: false; spam: false; errors: Partial<Record<keyof Inquiry, string>> };

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

/** Validates a submission. `website` is a hidden honeypot field and
 *  `renderedAt` is when the form was shown (ms since epoch). */
export function parseInquiry(body: Record<string, unknown>, now = Date.now()): ParseResult {
  if (clean(body.website, 200) !== "") return { ok: false, spam: true };
  const renderedAt = Number(body.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0 && now - renderedAt < MIN_FILL_MS) return { ok: false, spam: true };

  const inquiry: Inquiry = {
    name: clean(body.name, LIMITS.name).replace(/\s+/g, " "),
    company: clean(body.company, LIMITS.company).replace(/\s+/g, " "),
    email: clean(body.email, LIMITS.email).toLowerCase(),
    message: clean(body.message, LIMITS.message),
  };

  const source = parseSource(body.source);
  if (source) inquiry.source = source;

  const errors: Partial<Record<keyof Inquiry, string>> = {};
  if (!inquiry.name) errors.name = "Please add your name.";
  if (!EMAIL.test(inquiry.email)) errors.email = "Please add a valid email address.";
  if (inquiry.message.length < LIMITS.minMessage) errors.message = "Please tell us a little about your project.";

  return Object.keys(errors).length ? { ok: false, spam: false, errors } : { ok: true, inquiry };
}

const PATH = /^\/[A-Za-z0-9\-._~/%]*$/;
const HOST = /^[a-z0-9.-]+\.[a-z]{2,}$/i;

/** Accepts only well-formed source fields; anything else is dropped, never echoed. */
function parseSource(v: unknown): InquirySource | undefined {
  if (!v || typeof v !== "object") return undefined;
  const s = v as Record<string, unknown>;
  const path = (x: unknown) => {
    const p = clean(x, 200);
    return PATH.test(p) ? p : "";
  };
  const via = s.via === "contact" || s.via === "lane" ? s.via : "";
  const referrer = clean(s.referrer, 120).toLowerCase();
  const out: InquirySource = {
    via,
    page: path(s.page),
    landing: path(s.landing),
    referrer: HOST.test(referrer) ? referrer : "",
    utm: clean(s.utm, 200).replace(/[^\w\-.=: ]/g, ""),
  };
  return out.via || out.page || out.landing || out.referrer || out.utm ? out : undefined;
}

/** One line for the email, e.g. "Contact form on /contact · arrived from google.com on /pricing". */
export function sourceLine(src?: InquirySource): string {
  if (!src) return "";
  const form = src.via === "lane" ? "Lane brief" : src.via === "contact" ? "Contact form" : "Form";
  const parts = [src.page ? `${form} on ${src.page}` : form];
  const from = src.referrer ? `from ${src.referrer}` : "direct or unknown";
  parts.push(src.landing ? `arrived ${from}, first page ${src.landing}` : `arrived ${from}`);
  if (src.utm) parts.push(`tags: ${src.utm}`);
  return parts.join(" · ");
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** The email sent to the studio inbox. Reply-To is the visitor, so
 *  pressing Reply answers them directly. */
export function inquiryEmail(i: Inquiry, from: string) {
  const who = i.company ? `${i.name} (${i.company})` : i.name;
  const subject = `New project inquiry: ${who}`.slice(0, 200);
  const text = [
    "New inquiry from botlane.studio",
    "",
    `Name: ${i.name}`,
    i.company ? `Company: ${i.company}` : null,
    `Email: ${i.email}`,
    i.source ? `Source: ${sourceLine(i.source)}` : null,
    "",
    i.message,
    "",
    "Reply to this email to answer them directly.",
  ]
    .filter((l) => l !== null)
    .join("\n");
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;font:13px/1.4 monospace;text-transform:uppercase;letter-spacing:.06em">${k}</td><td style="padding:4px 0;font:15px/1.4 system-ui,sans-serif">${escapeHtml(v)}</td></tr>`;
  const html = `<div style="max-width:560px;font:15px/1.6 system-ui,sans-serif;color:#111">
<p style="margin:0 0 16px;font:13px/1 monospace;text-transform:uppercase;letter-spacing:.08em;color:#0077e6">New inquiry · botlane.studio</p>
<table style="border-collapse:collapse;margin:0 0 20px">${row("Name", i.name)}${i.company ? row("Company", i.company) : ""}${row("Email", i.email)}${i.source ? row("Source", sourceLine(i.source)) : ""}</table>
<div style="white-space:pre-wrap;padding:16px 18px;border-radius:10px;background:#f4f4f5">${escapeHtml(i.message)}</div>
<p style="margin:20px 0 0;color:#6b7280;font-size:13px">Reply to this email to answer them directly.</p>
</div>`;
  return { from, to: [STUDIO_INBOX], reply_to: i.email, subject, text, html };
}
