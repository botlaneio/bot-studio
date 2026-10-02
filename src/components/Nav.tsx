"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./motion/Arrow";
import styles from "./Nav.module.css";

/** The six areas from the template's "What we do best" section. */
const CAPABILITIES = [
  { tag: "Foundation", title: "Brand Identity", line: "Names, marks and visual systems" },
  { tag: "Growth", title: "Strategy", line: "Positioning and the roadmap to launch" },
  { tag: "Creative", title: "Design & Innovation", line: "Interfaces, motion and 3D" },
  { tag: "Smart AI", title: "AI Systems", line: "Assistants and automations built in" },
  { tag: "Discoverable", title: "SEO", line: "Found by the people you want" },
  { tag: "Build", title: "Development", line: "Fast, accessible, production sites" },
];

const LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

/** Fixed over the page: transparent on the hero photo at load, then a
 *  semi-transparent blurred black as soon as the visitor scrolls. Drops in on
 *  page load, as on the template. "Capabilities" opens a menu on hover, on
 *  keyboard focus, or on tap. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // A short grace period lets the pointer cross the gap into the panel.
  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  return (
    <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* The logo SVG carries its own shutter-flash animation, so it stays an <img>. */}
        <a className={styles.logo} href="#top" aria-label="Botlane Studios home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Botlane Studios" width={897} height={100} />
        </a>

        <nav className={styles.links} aria-label="Main">
          <a href="#craft">Studio</a>

          <div
            ref={menuRef}
            className={styles.menu}
            data-open={open || undefined}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
            }}
          >
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={open}
              aria-controls="capabilities-menu"
              onClick={() => setOpen((o) => !o)}
            >
              Capabilities
              <svg className={styles.chevron} viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div id="capabilities-menu" className={styles.panel}>
              <ul className={styles.grid}>
                {CAPABILITIES.map((item, i) => (
                  <li key={item.title} style={{ ["--i" as string]: i }}>
                    <a href="#capabilities" className={`${styles.item} arrowHost`} onClick={() => setOpen(false)}>
                      <span className={styles.tag}>
                        {`// ${String(i + 1).padStart(2, "0")} ${item.tag}`}
                      </span>
                      <span className={styles.itemTitle}>
                        {item.title}
                        <Arrow className={styles.itemArrow} />
                      </span>
                      <span className={styles.itemLine}>{item.line}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className={`${styles.cta} arrowHost`} href="#contact">
          Book a call
          <Arrow className={styles.ctaArrow} />
        </a>
      </div>
    </header>
  );
}
