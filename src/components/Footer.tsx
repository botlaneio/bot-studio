"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Arrow } from "./motion/Arrow";
import styles from "./Footer.module.css";

/** No /work route exists. Capabilities is the index the nav and the previous footer shared. */
const NAVIGATE = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/echoes", label: "Echoes" },
  { href: "/contact#inquiry", label: "Contact" },
];

const LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/knowledge", label: "Knowledge" },
];

const WHATSAPP = "https://wa.me/919979972714";
/** Show brand icons; enable links when official profile URLs are configured. */
const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const X = process.env.NEXT_PUBLIC_X_URL;
const WEBSITE = "https://botlane.io";

/** Social glyphs (Simple Icons). Fills are brand colors, not the accent. */
const INSTAGRAM_PATH =
  "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";
const X_PATH =
  "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z";
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function SocialIcon({ className, d, fill }: { className?: string; d: string; fill: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill={fill} />
    </svg>
  );
}

/** Classic Instagram glyph gradient: orange, pink, purple. Not accent blue. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="footer-instagram" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path d={INSTAGRAM_PATH} fill="url(#footer-instagram)" />
    </svg>
  );
}

/**
 * Blue rosette from the Whispers "Spiral" component (node r7pFEcGWY).
 * Phyllotaxis of 200 dots. Each dot pulses radius and opacity over 3s,
 * staggered by its index, via the same SMIL splines. Not a rotation.
 * On the published page the box is 70px; color token is #0077E6.
 */
function Rosette({ className }: { className?: string }) {
  const count = 200;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const dotRadius = 5;
  const duration = 3;
  const minOpacity = 0.4;
  const maxOpacity = 1;
  const minScale = 0.3;
  const maxScale = 1.4;
  const reach = 200 - dotRadius;
  const dots = [];
  for (let i = 0; i < count; i++) {
    const c = i + 0.5;
    const l = c / count;
    const radius = Math.sqrt(l) * reach;
    const angle = c * golden;
    const x = 200 + Math.cos(angle) * radius;
    const y = 200 + Math.sin(angle) * radius;
    const begin = `${(l * duration).toFixed(4)}s`;
    const rValues = `${dotRadius * minScale};${dotRadius * maxScale};${dotRadius * minScale}`;
    const oValues = `${minOpacity};${maxOpacity};${minOpacity}`;
    dots.push(
      <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r={dotRadius} fill="#0077E6" opacity="0">
        <animate
          attributeName="r"
          values={rValues}
          dur={`${duration}s`}
          begin={begin}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values={oValues}
          dur={`${duration}s`}
          begin={begin}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
      </circle>,
    );
  }
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true">
      {dots}
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

/** Global project inquiry and studio contact details. */
export function Footer() {
  const pathname = usePathname();

  // The design preview (/preview) brings its own closing.
  if (pathname.startsWith("/preview")) return null;

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.topGrid}>
          <div className={styles.news}>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>
                Have a project
                <br />
                in mind.
              </h2>
              <Rosette className={styles.rosette} />
            </div>
            <p className={styles.subline}>Tell us what you want to build. We’ll discuss the scope and the next step.</p>
            <Link className={`${styles.join} arrowHost`} href="/contact#inquiry">
              Discuss your project
              <Arrow className={styles.joinArrow} />
            </Link>
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
            <p className={styles.note}>Scope and timeline agreed before work starts.</p>
          </div>
          <div className={styles.social}>
            <p className={styles.socialLabel}>Connect with us</p>
            <div className={styles.socialIcons}>
              {INSTAGRAM ? <a className={styles.socialLink} href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">
                <InstagramIcon className={styles.socialIcon} />
              </a> : <span className={styles.socialLink} role="img" aria-label="Instagram"><InstagramIcon className={styles.socialIcon} /></span>}
              {X ? <a className={styles.socialLink} href={X} target="_blank" rel="noopener" aria-label="X">
                <SocialIcon className={styles.socialIcon} d={X_PATH} fill="#ffffff" />
              </a> : <span className={styles.socialLink} role="img" aria-label="X"><SocialIcon className={styles.socialIcon} d={X_PATH} fill="#ffffff" /></span>}
              <a className={styles.socialLink} href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
                <SocialIcon className={styles.socialIcon} d={WHATSAPP_PATH} fill="#25D366" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.lower}>
        <div className={styles.lowerGrid}>
          <div className={styles.pitch}>
            <p className={styles.tagline}>Websites and web apps that connect, scale, and perform.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.wordmark} src="/logo.svg" alt="Botlane" width={897} height={100} />
            <p className={styles.blurb}>
              Websites and web apps designed and built for brands that demand craft, clarity, and performance.
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
