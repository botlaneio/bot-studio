/** Where an inquiry came from, attached to the email the studio receives.
 *
 *  On the first page a visitor opens in a tab, we note the page they landed
 *  on, the site that sent them (hostname only, e.g. "google.com") and any
 *  utm_* tags on the link. It lives in sessionStorage, so it belongs to that
 *  one tab and is gone when the tab closes: no cookie, no identifier, nothing
 *  sent anywhere unless the visitor sends an inquiry. */

const KEY = "bl:arrival";
const UTM = ["utm_source", "utm_medium", "utm_campaign"] as const;

type Arrival = { landing: string; referrer: string; utm: string };

function read(): Arrival | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Arrival) : null;
  } catch {
    return null;
  }
}

/** Call once on the first page of a tab. Later pages leave it unchanged. */
export function rememberArrival() {
  if (typeof window === "undefined" || read()) return;
  let referrer = "";
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host !== location.host) referrer = ref.hostname.replace(/^www\./, "");
  } catch {}
  const params = new URLSearchParams(location.search);
  const utm = UTM.map((k) => (params.get(k) ? `${k.slice(4)}=${params.get(k)}` : ""))
    .filter(Boolean)
    .join(" ");
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ landing: location.pathname, referrer, utm } satisfies Arrival));
  } catch {}
}

/** The source fields sent with an inquiry. `via` names the form used. */
export function inquirySource(via: "contact" | "lane") {
  const a = typeof window === "undefined" ? null : read();
  return {
    via,
    page: typeof window === "undefined" ? "" : location.pathname,
    landing: a?.landing ?? "",
    referrer: a?.referrer ?? "",
    utm: a?.utm ?? "",
  };
}
