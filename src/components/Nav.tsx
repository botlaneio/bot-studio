"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./motion/Arrow";
import { lockScroll } from "./motion/SmoothScroll";
import { CAPABILITIES, capabilityHref } from "./capabilities";
import { CapabilityIcon } from "./CapabilityIcon";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/echoes", label: "Echoes" },
  { href: "/contact", label: "Contact" },
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
  const pathname = usePathname();
  const [shownPath, setShownPath] = useState(pathname);

  // A new page closes any open menu (adjusted during render, not in an effect).
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setOpen(false);
    setMobileOpen(false);
    setMobileCaps(false);
  }

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
  }, [pathname]);



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


  // The design preview (/preview) brings its own nav.
  if (pathname.startsWith("/preview")) return null;

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${scrolled && light && !mobileOpen ? styles.light : ""}`}
      data-mobile-open={mobileOpen || undefined}
    >
      <div className={styles.inner}>
        {/* The logo SVG carries its own shutter-flash animation, so it stays an
            <img>. A dark-lettered copy fades in over light sections. */}
        <Link className={styles.logo} href="/" aria-label="Botlane Studios home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Botlane Studios" width={897} height={100} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoDark} src="/logo-dark.svg" alt="" width={897} height={100} />
        </Link>

        <nav className={styles.links} aria-label="Main">
          <Link href="/">Studio</Link>

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
                      <Link
                        href={capabilityHref(item.slug)}
                        className={`${styles.item} arrowHost`}
                        data-active={active === i || undefined}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setOpen(false)}
                      >
                        <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.itemThumb}>
                          <CapabilityIcon slug={item.slug} />
                        </span>
                        <span className={styles.itemText}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={styles.itemLine}>{item.line}</span>
                        </span>
                        <Arrow className={styles.itemArrow} />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Follows the hovered item. Decorative: the list carries the content. */}
                <div className={styles.preview} aria-hidden="true">
                  <div className={styles.previewGlow} />
                  {CAPABILITIES.map((item, i) => (
                    <div key={item.title} className={styles.slide} data-active={active === i || undefined}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={styles.previewPhoto}
                        src={item.image}
                        alt=""
                        width={560}
                        height={784}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.previewTag}>{`// ${item.tag}`}</span>
                      <span className={styles.bigNum}>{String(i + 1).padStart(2, "0")}</span>
                      <p className={styles.previewTitle}>{item.title}</p>
                      <p className={styles.previewDetail}>{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.foot}>
                  <span>Not sure where to start?</span>
                  <a href="/contact#inquiry" className={`${styles.footLink} arrowHost`} onClick={() => setOpen(false)}>
                    Request a call
                    <Arrow className={styles.footArrow} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a className={`${styles.cta} arrowHost`} href="/contact#inquiry">
          Request a call
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
              <Link href="/" onClick={closeMobile}>
                Studio
              </Link>
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
                      <Link href={capabilityHref(item.slug)} onClick={closeMobile} tabIndex={mobileCaps ? 0 : -1}>
                        <span className={styles.mobileCapNum}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.mobileCapThumb}>
                          <CapabilityIcon slug={item.slug} />
                        </span>
                        <span>
                          <span className={styles.mobileCapTitle}>{item.title}</span>
                          <span className={styles.mobileCapLine}>{item.line}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {LINKS.map((link, i) => (
              <li key={link.href} style={{ ["--i" as string]: i + 2 }}>
                <Link href={link.href} onClick={closeMobile}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileFoot} style={{ ["--i" as string]: 6 }}>
            <a className={`${styles.mobileCta} arrowHost`} href="/contact#inquiry" onClick={closeMobile}>
              Request a call
              <Arrow className={styles.ctaArrow} />
            </a>
            <div className={styles.mobileContact}>
              <a href="mailto:admin@botlane.io">admin@botlane.io</a>
              <a href="https://wa.me/919979972714" target="_blank" rel="noopener">
                WhatsApp ↗
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
