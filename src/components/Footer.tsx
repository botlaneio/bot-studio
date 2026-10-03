"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type CSSProperties } from "react";
import { CAPABILITIES, capabilityHref } from "./capabilities";
import { Arrow } from "./motion/Arrow";
import { ChatModal } from "./process/ChatModal";
import { SheridanClock } from "./SheridanClock";
import styles from "./Footer.module.css";

const SITE = [
  { href: "/", label: "Studio" },
  { href: "/#process", label: "How we build" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/echoes", label: "Echoes" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const WHATSAPP = `https://wa.me/919979972714?text=${encodeURIComponent("Hi Botlane Studios, I'd like to talk about a project.")}`;
const WEBSITE = "https://botlane.io";

/** WhatsApp glyph (Simple Icons). */
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={WHATSAPP_PATH} fill="currentColor" />
    </svg>
  );
}

function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.6 2.7 3.9 5.8 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.8-3.9-9S9.4 5.7 12 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** The closing block, and the page's contact point (#contact): a call to
 *  action that opens the chat modal, a ticker of the six capabilities, the
 *  link columns, and the Botlane\Studios wordmark across the full width,
 *  lit by a blue light that follows the pointer (drifting by itself on
 *  touch screens). */
export function Footer() {
  const [chatFrom, setChatFrom] = useState<{ x: number; y: number } | null>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // The light follows the pointer across the wordmark.
  const onMove = (e: React.PointerEvent) => {
    const el = markRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    el.setAttribute("data-pointer", "");
  };
  const onLeave = () => markRef.current?.removeAttribute("data-pointer");


  // The design preview (/preview) brings its own closing.
  if (pathname.startsWith("/preview")) return null;

  return (
    <footer id="contact" className={styles.footer}>
      {/* ---------- Call to action ---------- */}
      <div className={styles.cta}>
        <span className={styles.kicker} data-reveal="">
          {"// 00.05° Let's talk"}
        </span>
        <h2 className={styles.headline} data-reveal="" style={{ ...delay(0.05), ["--reveal-y" as string]: "60px" }}>
          Got something worth building<b>?</b>
        </h2>
        <div className={styles.ctaRow} data-reveal="" style={delay(0.15)}>
          <p className={styles.ctaText}>Tell us where you&apos;re headed. We&apos;ll shape the site that gets you there.</p>
          <div className={styles.ctaButtons}>
            <button
              type="button"
              className={`${styles.btnPrimary} arrowHost`}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setChatFrom({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
            >
              Let&apos;s chat
              <Arrow className={styles.btnArrow} />
            </button>
            <a className={`${styles.btnGhost} ${styles.btnIcon}`} href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
              <WhatsAppIcon className={styles.btnIconSvg} />
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Ticker ---------- */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.tickerSet}>
              {CAPABILITIES.map((c) => (
                <span key={c.title} className={styles.tickerItem}>
                  {c.title}
                  <span className={styles.tickerDot} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Columns ---------- */}
      <div className={styles.columns}>
        <div className={styles.col} data-reveal="">
          <h3 className={styles.colTitle}>Site</h3>
          <ul>
            {SITE.map((l) => (
              <li key={l.href}>
                <Link className={styles.link} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col} data-reveal="" style={delay(0.05)}>
          <h3 className={styles.colTitle}>Capabilities</h3>
          <ul>
            {CAPABILITIES.map((c) => (
              <li key={c.title}>
                <Link className={styles.link} href={capabilityHref(c.slug)}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col} data-reveal="" style={delay(0.1)}>
          <h3 className={styles.colTitle}>Contact</h3>
          <ul>
            <li>
              <a className={styles.link} href="mailto:admin@botlane.io">
                admin@botlane.io
              </a>
            </li>
            <li>
              <a className={styles.link} href="tel:+13072185715">
                +1 307 218 5715
              </a>
            </li>
            <li>
              <a className={`${styles.link} ${styles.iconLink}`} href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
                <WhatsAppIcon className={styles.entryIcon} />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col} data-reveal="" style={delay(0.15)}>
          <h3 className={styles.colTitle}>Studio</h3>
          <address className={styles.address}>
            BotLane LLC
            <br />
            30 N Gould St, Ste R
            <br />
            Sheridan, WY 82801
          </address>
          <p className={styles.time}>
            Local time <SheridanClock className={styles.clock} />
          </p>
        </div>
      </div>

      {/* ---------- Wordmark ---------- */}
      <div ref={markRef} className={styles.mark} onPointerMove={onMove} onPointerLeave={onLeave} aria-hidden="true">
        <span className={styles.markText}>
          Botlane<span className={styles.markSlash}>\</span>Studios
        </span>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className={styles.bar}>
        <span>© {new Date().getFullYear()} BotLane LLC. All rights reserved.</span>
        <span className={styles.barLinks}>
          {LEGAL.map((l) => (
            <Link key={l.href} className={styles.link} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a className={`${styles.link} ${styles.iconLink}`} href={WEBSITE} target="_blank" rel="noopener">
            <WebsiteIcon className={styles.entryIcon} />
            Part of botLane
          </a>
        </span>
        <a className={`${styles.top} arrowHost`} href="#top">
          Back to top
          <Arrow className={styles.topArrow} />
        </a>
      </div>

      {chatFrom && <ChatModal origin={chatFrom} onClose={() => setChatFrom(null)} />}
    </footer>
  );
}
