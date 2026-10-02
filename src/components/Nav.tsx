"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./motion/Arrow";
import { lockScroll } from "./motion/SmoothScroll";
import styles from "./Nav.module.css";

/** The six areas from the template's "What we do best" section. */
const CAPABILITIES = [
  {
    tag: "Foundation",
    title: "Brand Identity",
    line: "Names, marks and visual systems",
    detail: "A name, a mark and the system around them, so every page, post and pitch looks like the same company.",
  },
  {
    tag: "Growth",
    title: "Strategy",
    line: "Positioning and the roadmap to launch",
    detail: "Who it's for, what makes it different and what ships first, agreed before a pixel is drawn.",
  },
  {
    tag: "Creative",
    title: "Design & Innovation",
    line: "Interfaces, motion and 3D",
    detail: "Interfaces with a point of view: considered type, motion that explains, and 3D where it earns its place.",
  },
  {
    tag: "Smart AI",
    title: "AI Systems",
    line: "Assistants and automations built in",
    detail: "Assistants, search and automations wired into the site, so it answers questions and does the busywork.",
  },
  {
    tag: "Discoverable",
    title: "SEO",
    line: "Found by the people you want",
    detail: "Clean structure, fast pages and content shaped for search, so the right people find you first.",
  },
  {
    tag: "Build",
    title: "Development",
    line: "Fast, accessible, production sites",
    detail: "Production code on a modern stack, fast on every device, accessible, and easy for your team to run.",
  },
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
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCaps, setMobileCaps] = useState(false);
  const closeTimer = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Light over sections marked data-nav-theme="light" (the white film
    // section), judged at the bar's vertical middle.
    const update = () => {
      setScrolled(window.scrollY > 4);
      const header = document.querySelector("header");
      const mid = header ? header.getBoundingClientRect().height / 2 : 32;
      setLight(
        Array.from(document.querySelectorAll("[data-nav-theme='light']")).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= mid && r.bottom > mid;
        }),
      );
    };
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

  // Phone menu: the page stays put while it is open; Escape, a link or
  // widening past the phone layout closes it.
  useEffect(() => {
    if (!mobileOpen) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    const wide = window.matchMedia("(min-width: 900px)");
    const onWide = () => wide.matches && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileCaps(false);
  };

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
    <header
      className={`${styles.nav} ${scrolled || open || mobileOpen ? styles.scrolled : ""} ${light && !mobileOpen ? styles.light : ""}`}
      data-mobile-open={mobileOpen || undefined}
    >
      <div className={styles.inner}>
        {/* The logo SVG carries its own shutter-flash animation, so it stays an
            <img>. A dark-lettered copy fades in over light sections. */}
        <a className={styles.logo} href="#top" aria-label="Botlane Studios home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Botlane Studios" width={897} height={100} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoDark} src="/logo-dark.svg" alt="" width={897} height={100} />
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
              <div className={styles.sheet}>
                <ul className={styles.list}>
                  {CAPABILITIES.map((item, i) => (
                    <li key={item.title} style={{ ["--i" as string]: i }}>
                      <a
                        href="#capabilities"
                        className={`${styles.item} arrowHost`}
                        data-active={active === i || undefined}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setOpen(false)}
                      >
                        <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.itemText}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={styles.itemLine}>{item.line}</span>
                        </span>
                        <Arrow className={styles.itemArrow} />
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Follows the hovered item. Decorative: the list carries the content. */}
                <div className={styles.preview} aria-hidden="true">
                  <div className={styles.previewGlow} />
                  {CAPABILITIES.map((item, i) => (
                    <div key={item.title} className={styles.slide} data-active={active === i || undefined}>
                      <span className={styles.previewTag}>{`// ${item.tag}`}</span>
                      <span className={styles.bigNum}>{String(i + 1).padStart(2, "0")}</span>
                      <p className={styles.previewTitle}>{item.title}</p>
                      <p className={styles.previewDetail}>{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.foot}>
                  <span>Not sure where to start?</span>
                  <a href="#contact" className={`${styles.footLink} arrowHost`} onClick={() => setOpen(false)}>
                    Book a call
                    <Arrow className={styles.footArrow} />
                  </a>
                </div>
              </div>
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

        {/* Phones: a hamburger in place of the links and the button. */}
        <button
          type="button"
          className={styles.burger}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* The uncovered third dims; a tap there closes the drawer. */}
      <div className={styles.mobileScrim} data-open={mobileOpen || undefined} onClick={closeMobile} aria-hidden="true" />
      <div id="mobile-menu" className={styles.mobile} data-open={mobileOpen || undefined}>
        <nav className={styles.mobileInner} aria-label="Main">
          <ul className={styles.mobileList}>
            <li style={{ ["--i" as string]: 0 }}>
              <a href="#craft" onClick={closeMobile}>
                Studio
              </a>
            </li>
            <li style={{ ["--i" as string]: 1 }}>
              <button
                type="button"
                className={styles.mobileCapsButton}
                aria-expanded={mobileCaps}
                aria-controls="mobile-capabilities"
                onClick={() => setMobileCaps((o) => !o)}
              >
                Capabilities
                <svg className={styles.mobileChevron} viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div id="mobile-capabilities" className={styles.mobileCaps} data-open={mobileCaps || undefined}>
                <ul>
                  {CAPABILITIES.map((item, i) => (
                    <li key={item.title}>
                      <a href="#capabilities" onClick={closeMobile} tabIndex={mobileCaps ? 0 : -1}>
                        <span className={styles.mobileCapNum}>{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className={styles.mobileCapTitle}>{item.title}</span>
                          <span className={styles.mobileCapLine}>{item.line}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {LINKS.map((link, i) => (
              <li key={link.href} style={{ ["--i" as string]: i + 2 }}>
                <a href={link.href} onClick={closeMobile}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileFoot} style={{ ["--i" as string]: 6 }}>
            <a className={`${styles.mobileCta} arrowHost`} href="#contact" onClick={closeMobile}>
              Book a call
              <Arrow className={styles.ctaArrow} />
            </a>
            <div className={styles.mobileContact}>
              <a href="mailto:admin@botlane.io">admin@botlane.io</a>
              <a href="https://wa.me/13072185715" target="_blank" rel="noopener">
                WhatsApp ↗
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
