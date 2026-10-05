import { getCloudflareContext } from "@opennextjs/cloudflare";
import { inquiryEmail, parseInquiry } from "@/lib/inquiry";

/** Receives the contact form and emails it to the studio through Resend.
 *  Needs the Worker secret RESEND_API_KEY. INQUIRY_FROM (optional) sets the
 *  sender, which must be on a domain verified in Resend. */

const DEFAULT_FROM = "Botlane Studios website <website@botlane.studio>";

function readEnv(name: string): string | undefined {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const v = env[name];
    if (typeof v === "string" && v) return v;
  } catch {
    // Not running on Cloudflare (local `next dev`): fall back to process.env.
  }
  return process.env[name] || undefined;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  // Same-origin only: browsers send Origin on POST; reject other sites.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {}
    if (originHost !== host) return json({ ok: false, error: "forbidden" }, 403);
  }

  let body: Record<string, unknown>;
  try {
    const type = request.headers.get("content-type") ?? "";
    body = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const parsed = parseInquiry(body);
  // Bots get a quiet success so they don't retry; nothing is sent.
  if (!parsed.ok && parsed.spam) return json({ ok: true });
  if (!parsed.ok) return json({ ok: false, error: "invalid", fields: parsed.errors }, 422);

  const key = readEnv("RESEND_API_KEY");
  if (!key) {
    console.error("inquiry: RESEND_API_KEY is not set");
    return json({ ok: false, error: "unavailable" }, 503);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(inquiryEmail(parsed.inquiry, readEnv("INQUIRY_FROM") ?? DEFAULT_FROM)),
  });

  if (!res.ok) {
    console.error("inquiry: Resend responded", res.status, (await res.text()).slice(0, 300));
    return json({ ok: false, error: "unavailable" }, 502);
  }
  return json({ ok: true });
}
