"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { Arrow } from "./motion/Arrow";
import styles from "./Footer.module.css";

/** No /work route exists. Capabilities is the index the nav and the previous footer shared. */
const NAVIGATE = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Work" },
  { href: "/", label: "Studio" },
  { href: "/echoes", label: "Echoes" },
  { href: "#contact", label: "Contact" },
];

const LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/knowledge", label: "Knowledge" },
];

const WHATSAPP = "https://wa.me/919979972714";
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

/** Static blue rosette: filled circles on a phyllotaxis spiral. */
function Rosette({ className }: { className?: string }) {
  const count = 128;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const dots = [];
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const radius = Math.sqrt(t) * 29.5;
    const angle = i * golden;
    const x = 35 + Math.cos(angle) * radius;
    const y = 35 + Math.sin(angle) * radius;
    const r = 1.62 - t * 0.62;
    dots.push(<circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r={r.toFixed(2)} />);
  }
  return (
    <svg className={className} viewBox="0 0 70 70" aria-hidden="true">
      <g fill="#0077E6">{dots}</g>
    </svg>
  );
}

function FooterAnchor({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a className={className} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
    </a>
  );
}

/** Global close, adapted from the Whispers footer onto the dark site.
 *  The newsletter form does not submit anywhere. #contact stays on this
 *  landmark so the nav's contact links still land here. */
export function Footer() {
  const pathname = usePathname();

  // The design preview (/preview) brings its own closing.
  if (pathname.startsWith("/preview")) return null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.topGrid}>
          <div className={styles.news}>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>
                Keep you in
                <br />
                the loop.
              </h2>
              <Rosette className={styles.rosette} />
            </div>
            <p className={styles.subline}>Get the latest news, insights directly to your inbox.</p>
            <form className={styles.form} onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="footer-email">
                Email
              </label>
              <input
                id="footer-email"
                className={styles.email}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                autoComplete="email"
                inputMode="email"
              />
              <button type="submit" className={`${styles.join} arrowHost`}>
                Join our newsletter
                <Arrow className={styles.joinArrow} />
              </button>
            </form>
          </div>

          <div className={styles.cols}>
            <div>
              <p className={styles.colLabel}>Navigate</p>
              <ul>
                {NAVIGATE.map((item) => (
                  <li key={item.label}>
                    <FooterAnchor className={styles.link} href={item.href}>
                      {item.label}
                    </FooterAnchor>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.colLabel}>Links</p>
              <ul>
                {LINKS.map((item) => (
                  <li key={item.href}>
                    <Link className={styles.link} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.legalBlock}>
            <p className={styles.legal}>
              By submitting, you agree to our <Link href="/terms">Terms of Service</Link>.
            </p>
            <p className={styles.note}>
              <span aria-hidden="true">*</span> No spam, just awesome updates.
            </p>
          </div>
          <div className={styles.social}>
            <p className={styles.socialLabel}>Follow us on socials</p>
            <a className={styles.socialLink} href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
              <WhatsAppIcon className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.lower}>
        <div className={styles.lowerGrid}>
          <div className={styles.pitch}>
            <p className={styles.tagline}>Ultra-premium websites that connect, scale, and perform.</p>
            <p className={styles.wordmark}>Botlane Studios</p>
            <p className={styles.blurb}>
              Ultra-premium websites designed and built for brands that demand craft, clarity, and performance.
            </p>
            <p className={styles.copy}>©2026 BotLane LLC. All rights reserved.</p>
            <p className={styles.siteLine}>
              <a href={WEBSITE} target="_blank" rel="noopener">
                botlane.io
              </a>
            </p>
          </div>

          <div className={styles.contacts}>
            <div className={styles.contactTop}>
              <div>
                <p className={styles.colLabel}>Offline</p>
                <address className={styles.address}>
                  Botlane Studios
                  <br />
                  30 N Gould St, Ste R
                  <br />
                  Sheridan, WY 82801
                </address>
              </div>
              <div>
                <p className={styles.colLabel}>Online</p>
                <a className={styles.mail} href="mailto:admin@botlane.io">
                  admin@botlane.io
                </a>
              </div>
            </div>
            <div className={styles.contactBottom}>
              <div>
                <p className={styles.colLabel}>Phone</p>
                <a className={styles.phone} href="tel:+13072185715">
                  +1 307 218 5715
                </a>
              </div>
              <a className={`${styles.topLink} arrowHost`} href="#top" aria-label="Back to top">
                <Arrow className={styles.topArrow} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
