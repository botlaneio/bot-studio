"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#craft", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#whispers", label: "Whispers" },
];

/** Fixed over the page: transparent on the hero photo at load, then a
 *  semi-transparent blurred black as soon as the visitor scrolls. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* The logo SVG carries its own shutter-flash animation, so it stays an <img>. */}
        <a className={styles.logo} href="#top" aria-label="Botlane Studios home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Botlane Studios" width={897} height={100} />
        </a>
        <nav className={styles.links} aria-label="Main">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className={styles.contact} href="#contact">
          Contact
        </a>
      </div>
    </header>
  );
}
