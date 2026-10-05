"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { CAPABILITIES, capabilityHref } from "../capabilities";
import { Arrow } from "../motion/Arrow";
import { ChatModal } from "../process/ChatModal";
import styles from "./Clay.module.css";

const NAV = [
  { href: "/", label: "Studio" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];

const TILES = ["/process/card-1.jpg", "/process/card-2.jpg", "/process/card-3.jpg"];

const TEXT_US = `sms:+13072185175?&body=${encodeURIComponent("Hi Botlane Studios, I'd like to talk about a project.")}`;

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** A design preview of a light, tactile ("clay") direction: the hero as a
 *  raised browser window that settles in on load and tilts with the
 *  pointer, a clay version of the Studios icon on its corner, then the
 *  capabilities as clay cards and a closing call to action. Built from CSS
 *  alone: layered highlights and shadows, no 3D engine. */
export function ClayPreview() {
  const [chatFrom, setChatFrom] = useState<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const openChat = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setChatFrom({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  // The window leans a few degrees toward the pointer; the icon a little more.
  const onMove = (e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tx", x.toFixed(3));
    el.style.setProperty("--ty", y.toFixed(3));
  };
  const onLeave = () => {
    stageRef.current?.style.setProperty("--tx", "0");
    stageRef.current?.style.setProperty("--ty", "0");
  };

  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <span>{"// 00.02° Preview · clay direction"}</span>
        <Link href="/" className={`${styles.back} arrowHost`}>
          Live site
          <Arrow className={styles.backArrow} />
        </Link>
      </div>

      {/* ---------- Hero: the window ---------- */}
      <section className={styles.hero} aria-label="Botlane Studios">
        <div ref={stageRef} className={styles.stage} onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className={styles.window}>
            <div className={styles.chrome} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.address}>botlane.studio</span>
            </div>

            <nav className={`${styles.nav} ${styles.slab}`} style={i(0)} aria-label="Preview">
              <Link href="/" className={styles.logo} aria-label="Botlane Studios home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-dark.svg" alt="Botlane Studios" width={897} height={100} />
              </Link>
              <span className={styles.navLinks}>
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href}>
                    {n.label}
                  </Link>
                ))}
              </span>
              <button type="button" className={styles.navPill} onClick={openChat}>
                Let&apos;s chat
              </button>
            </nav>

            <div className={styles.body}>
              <div className={styles.left}>
                <div className={`${styles.headline} ${styles.slab}`} style={i(1)}>
                  <h1>
                    Ultra-premium websites that perform<b>.</b>
                  </h1>
                  <p>Small studio, worldwide tech. We design and build sites people remember.</p>
                  <span className={styles.tick} aria-hidden="true" />
                </div>
                <div className={styles.buttons} style={i(2)}>
                  <button type="button" className={`${styles.pillBlue} arrowHost`} onClick={openChat}>
                    Let&apos;s chat
                    <Arrow className={styles.pillArrow} />
                  </button>
                  <Link href="/#process" className={styles.pillGhost}>
                    Our process
                  </Link>
                </div>
              </div>

              <div className={`${styles.photo} ${styles.tile}`} style={i(3)}>
                <div className={styles.img} style={{ backgroundImage: "url(/process/hero.jpg)" }} />
              </div>
            </div>

            <div className={styles.tiles}>
              {TILES.map((src, n) => (
                <div key={src} className={styles.tile} style={i(4 + n)}>
                  <div className={styles.img} style={{ backgroundImage: `url(${src})` }} />
                </div>
              ))}
            </div>
          </div>

          {/* The Studios icon in clay: plate, slot and lamp, blinking like the logo. */}
          <div className={styles.icon} aria-hidden="true">
            <div className={styles.plate}>
              <div className={styles.slot}>
                <span className={styles.lamp} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Capabilities as clay cards ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>{"// What we do"}</span>
          <h2>
            Six disciplines, one studio<b>.</b>
          </h2>
        </div>
        <div className={styles.cards}>
          {CAPABILITIES.map((c, n) => (
            <Link key={c.slug} href={capabilityHref(c.slug)} className={`${styles.card} arrowHost`} data-reveal="" style={{ ["--reveal-delay" as string]: `${n * 0.05}s` }}>
              <span className={styles.cardTop}>
                <span className={styles.num}>{String(n + 1).padStart(2, "0")}</span>
                <span className={styles.cardGo}>
                  <Arrow className={styles.cardArrow} />
                </span>
              </span>
              <span className={styles.cardTitle}>{c.title}</span>
              <span className={styles.cardLine}>{c.line}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className={styles.section}>
        <div className={styles.band} data-reveal="">
          <div>
            <span className={styles.kicker}>{"// Let's talk"}</span>
            <h2>
              Got something worth building<b>?</b>
            </h2>
          </div>
          <div className={styles.bandButtons}>
            <button type="button" className={`${styles.pillBlue} arrowHost`} onClick={openChat}>
              Let&apos;s chat
              <Arrow className={styles.pillArrow} />
            </button>
            <a className={styles.pillGhost} href={TEXT_US}>
              Text us
            </a>
          </div>
        </div>
        <p className={styles.foot}>© {new Date().getFullYear()} BotLane LLC · A preview of a light direction, not yet live.</p>
      </section>

      {chatFrom && <ChatModal origin={chatFrom} onClose={() => setChatFrom(null)} />}
    </main>
  );
}
