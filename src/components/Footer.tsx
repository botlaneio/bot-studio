"use client";

import { useRef, useState, type CSSProperties } from "react";
import { CAPABILITIES } from "./capabilities";
import { Arrow } from "./motion/Arrow";
import { ChatModal } from "./process/ChatModal";
import { SheridanClock } from "./SheridanClock";
import styles from "./Footer.module.css";

const SITE = [
  { href: "#craft", label: "Studio" },
  { href: "#process", label: "How we build" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#about", label: "About us" },
  { href: "#pricing", label: "Pricing" },
];

const WHATSAPP = `https://wa.me/13072185715?text=${encodeURIComponent("Hi Botlane Studios, I'd like to talk about a project.")}`;

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** The closing block, and the page's contact point (#contact): a call to
 *  action that opens the chat modal, a ticker of the six capabilities, the
 *  link columns, and the Botlane\Studios wordmark across the full width,
 *  lit by a blue light that follows the pointer (drifting by itself on
 *  touch screens). */
export function Footer() {
  const [chatFrom, setChatFrom] = useState<{ x: number; y: number } | null>(null);
  const markRef = useRef<HTMLDivElement>(null);

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
            <a className={`${styles.btnGhost} arrowHost`} href={WHATSAPP} target="_blank" rel="noopener">
              WhatsApp
              <Arrow className={styles.btnArrow} />
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
                <a className={styles.link} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col} data-reveal="" style={delay(0.05)}>
          <h3 className={styles.colTitle}>Capabilities</h3>
          <ul>
            {CAPABILITIES.map((c) => (
              <li key={c.title}>
                <a className={styles.link} href="#capabilities">
                  {c.title}
                </a>
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
              <a className={styles.link} href={WHATSAPP} target="_blank" rel="noopener">
                WhatsApp ↗
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
        <span>© {new Date().getFullYear()} BotLane LLC</span>
        <a className={styles.link} href="https://botlane.io" target="_blank" rel="noopener">
          Part of botLane ↗
        </a>
        <a className={`${styles.top} arrowHost`} href="#top">
          Back to top
          <Arrow className={styles.topArrow} />
        </a>
      </div>

      {chatFrom && <ChatModal origin={chatFrom} onClose={() => setChatFrom(null)} />}
    </footer>
  );
}
