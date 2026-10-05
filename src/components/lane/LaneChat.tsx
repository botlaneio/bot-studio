"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent } from "react";
import { laneReply, nextSteps, type LaneAction, type LaneView } from "./studioReply";
import { LaneBrief, LaneContact, LanePrices, LaneWork, VIEW_META } from "./LaneViews";
import styles from "./LaneChat.module.css";

const GREETING =
  "Planning a website or a web app? I can walk you through Websites and Web Apps, or point you to the team.";

const CHIPS = ["Websites", "Web apps", "Pricing", "Timeline"] as const;

/** Conversation starters that float up from the launcher as thought bubbles.
 *  Each one is worded so studioReply gives its matching published answer. */
const STARTERS = [
  "What does a website cost?",
  "Thinking about a web app?",
  "How long does a project take?",
  "Why not just use AI?",
  "Can you design our logo?",
] as const;

/** Starters timing: first bubble after the page settles, then one at a time. */
const STARTER_DELAY = 3800;
const STARTER_SHOW = 5200;
const STARTER_LEAVE = 380;
/** Once a visitor has seen the starters, opened Lane or hidden them, they stay away for the session. */
const STARTER_KEY = "lane-starters-seen";

const markStartersSeen = () => {
  try {
    sessionStorage.setItem(STARTER_KEY, "1");
  } catch {
    /* Storage can be blocked; the bubbles then just show again next page. */
  }
};

/** How long the closing fold-away plays before the panel unmounts. Matches .panel[data-state="closing"]. */
const CLOSE_MS = 260;

type Line = { id: number; role: "assistant" | "user"; text: string; actions?: LaneAction[] };

const VIEWS: LaneView[] = ["ask", "brief", "prices", "work", "contact"];

/** The large two-pane window is for tablets and desktops with room for it. */
const WIDE_QUERY = "(min-width: 768px) and (min-height: 600px)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A short pause before Lane answers, a little longer for longer answers. None with reduced motion. */
const thinkingTime = (reply: string) => (prefersReducedMotion() ? 0 : Math.min(1150, 520 + reply.length * 1.6));

/**
 * Lane. Corner launcher on every page (mounted from the root layout).
 *
 * The launcher is a small extruded blue plate built in CSS 3D (no WebGL, so
 * no extra script on every page). It drifts gently, leans toward the pointer
 * while the pointer is over it, and flips over to its dark back (a close
 * mark) when the panel is open. The panel unfolds out of it in 3D, tilts a
 * little with the pointer and catches a highlight. Replies arrive after a
 * short typing beat and settle in word by word.
 *
 * Pointer work only runs while the pointer is over Lane; idle motion is CSS on
 * the compositor; reduced motion drops tilt, drift, typing delay and the
 * word reveal.
 *
 * Answers use published studio information locally (studioReply); no AI
 * provider is configured.
 */
export function LaneChat() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [typing, setTyping] = useState(false);
  const [note, setNote] = useState("");
  const [lines, setLines] = useState<Line[]>([{ id: 0, role: "assistant", text: GREETING, actions: nextSteps("greeting") }]);
  const [wide, setWide] = useState(false);
  const [view, setView] = useState<LaneView>("ask");
  const mainHeadRef = useRef<HTMLHeadingElement>(null);
  const [starter, setStarter] = useState<number | null>(null);
  const [starterLeaving, setStarterLeaving] = useState(false);
  const startersOff = useRef(false);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const panelId = useId();
  const fieldId = useId();
  const markId = useId().replace(/:/g, "");

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  const shown = open || closing;

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Switches the large window's view and moves focus to its heading. */
  const show = (next: LaneView) => {
    setView(next);
    window.requestAnimationFrame(() => mainHeadRef.current?.focus({ preventScroll: true }));
  };

  /** Hides the thought bubbles for the rest of the session. */
  const stopStarters = useCallback(() => {
    startersOff.current = true;
    setStarter(null);
    setStarterLeaving(false);
    markStartersSeen();
  }, []);

  // Thought bubbles: show each starter in turn, once per session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STARTER_KEY)) return;
    } catch {
      /* No storage: show them. */
    }
    const ids: number[] = [];
    const at = (fn: () => void, ms: number) => ids.push(window.setTimeout(() => !startersOff.current && fn(), ms));
    let t = STARTER_DELAY;
    STARTERS.forEach((_, index) => {
      at(() => {
        setStarterLeaving(false);
        setStarter(index);
      }, t);
      t += STARTER_SHOW;
      at(() => setStarterLeaving(true), t - STARTER_LEAVE);
    });
    at(() => {
      setStarter(null);
      markStartersSeen();
    }, t);
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    setClosing(true);
    window.setTimeout(() => setClosing(false), prefersReducedMotion() ? 0 : CLOSE_MS);
    if (returnFocus) launcherRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    // Bring the cursor to the field on desktop; on touch screens this would throw the keyboard up.
    if (window.matchMedia("(pointer: fine)").matches) window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Keep the newest exchange in view. A long answer is shown from the top of
  // the question that prompted it, so the reader starts at the beginning.
  useEffect(() => {
    const thread = threadRef.current;
    if (!shown || !thread) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    const asked = thread.querySelectorAll<HTMLElement>("[data-role='user']");
    const question = asked[asked.length - 1];
    const answered = !typing && lines[lines.length - 1]?.role === "assistant" && question;
    const top = answered ? Math.min(question.offsetTop - 14, thread.scrollHeight) : thread.scrollHeight;
    thread.scrollTo({ top, behavior });
  }, [lines, typing, shown]);

  const openLane = (startView?: LaneView) => {
    stopStarters();
    if (startView) setView(startView);
    setOpen(true);
  };

  const ask = (text: string) => {
    const question = text.trim();
    if (!question || typing) return;
    const reply = laneReply(question);
    setView("ask");
    setLines((prev) => [...prev, { id: nextId.current++, role: "user", text: question }]);
    setNote("");
    setTyping(true);
    later(() => {
      setTyping(false);
      setLines((prev) => [...prev, { id: nextId.current++, role: "assistant", text: reply.text, actions: nextSteps(reply.intent) }]);
    }, thinkingTime(reply.text));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ask(note);
  };

  /** Writes pointer position as CSS variables, at most once a frame. */
  const track = (el: HTMLElement | null, e: PointerEvent<HTMLElement>, names: [string, string]) => {
    if (!el || e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      const y = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
      el.style.setProperty(names[0], x.toFixed(3));
      el.style.setProperty(names[1], y.toFixed(3));
    });
  };
  const release = (el: HTMLElement | null, names: [string, string]) => {
    cancelAnimationFrame(frame.current);
    el?.style.setProperty(names[0], "0.5");
    el?.style.setProperty(names[1], "0.5");
  };

  const lastAssistantId = lines.reduce((last, l) => (l.role === "assistant" ? l.id : last), -1);

  /** An answer's follow-up: a view in the large window, otherwise a link. */
  const actionEl = (a: LaneAction) =>
    a.view && wide ? (
      <button key={a.label} type="button" className={styles.nextStep} onClick={() => show(a.view!)}>
        {a.label}
      </button>
    ) : (
      <a key={a.label} className={styles.nextStep} href={a.href}>
        {a.label}
      </a>
    );

  const closeButton = (
    <button type="button" className={styles.close} onClick={() => close()} aria-label="Close Lane">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M3 3l8 8M11 3 3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );

  const header = (withClose: boolean) => (
    <header className={styles.head}>
      <div className={styles.photo} aria-hidden="true">
        {/* The team at work; reused from the Strategy page, cropped small (16 KB). Loads only when Lane opens. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lane/header.webp" alt="" width={704} height={300} decoding="async" />
      </div>
      <div className={styles.headTop}>
        <p className={styles.kicker}>{"// Studio guide"}</p>
        {withClose ? closeButton : null}
      </div>
      <div className={styles.headBottom}>
        <span className={styles.markWell} aria-hidden="true">
          <LaneMark className={styles.mark} idPrefix={`${markId}-head`} size={26} />
        </span>
        <div className={styles.titles}>
          <p className={styles.title}>
            Lane<span className={styles.dot}>.</span>
          </p>
          <p className={styles.subtitle}>Websites and web apps, answered.</p>
        </div>
      </div>
    </header>
  );

  const chat = (
    <>
      <div ref={threadRef} className={styles.thread} role="log" aria-live="polite" aria-relevant="additions" data-lenis-prevent>
        {lines.map((line) =>
          line.role === "assistant" ? (
            <div key={line.id} className={styles.answer}>
              <p className={`${styles.bubble} ${styles.assistant}`}>
                <Reveal text={line.text} />
              </p>
              {line.id === lastAssistantId && !typing && line.actions?.length ? (
                <div className={styles.nextSteps} aria-label="Next steps" role="group">
                  {line.actions.map(actionEl)}
                </div>
              ) : null}
            </div>
          ) : (
            <p key={line.id} className={`${styles.bubble} ${styles.user}`} data-role="user">
              {line.text}
            </p>
          ),
        )}
        {typing ? (
          <p className={`${styles.bubble} ${styles.assistant} ${styles.typing}`} aria-label="Lane is typing">
            <span />
            <span />
            <span />
          </p>
        ) : null}
      </div>

      <div className={styles.pills} aria-label="Suggested questions" role="group">
        {CHIPS.map((label, index) => (
          <button key={label} type="button" className={styles.pill} style={{ "--i": index } as CSSProperties} onClick={() => ask(label)} disabled={typing}>
            {label}
          </button>
        ))}
      </div>

      <form className={styles.composer} onSubmit={onSubmit}>
        <label className={styles.visuallyHidden} htmlFor={fieldId}>
          Ask about your project
        </label>
        <input
          ref={inputRef}
          id={fieldId}
          className={styles.field}
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ask about your project…"
          autoComplete="off"
          enterKeyHint="send"
          maxLength={2000}
        />
        <button type="submit" className={styles.send} aria-label="Send" disabled={!note.trim() || typing}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </>
  );

  return (
    <div className={styles.dock} data-open={open || undefined}>
      {shown ? (
        <div className={styles.stage} data-size={wide ? "wide" : "compact"}>
          <section
            ref={panelRef}
            className={styles.panel}
            id={panelId}
            aria-label="Lane, studio guide"
            data-state={closing ? "closing" : "open"}
            data-size={wide ? "wide" : "compact"}
            data-typing={typing || undefined}
            onPointerMove={(e) => track(panelRef.current, e, ["--px", "--py"])}
            onPointerLeave={() => release(panelRef.current, ["--px", "--py"])}
          >
            <span className={styles.sheen} aria-hidden="true" />

            {wide ? (
              <>
                <aside className={styles.rail}>
                  {header(false)}
                  <nav className={styles.railNav} aria-label="Lane">
                    {VIEWS.map((v) => (
                      <button key={v} type="button" className={styles.railItem} aria-current={view === v ? "page" : undefined} onClick={() => show(v)}>
                        <span className={styles.railIcon} aria-hidden="true">
                          <ViewIcon view={v} />
                        </span>
                        <span className={styles.railText}>
                          <b>{VIEW_META[v].title}</b>
                          <span>{VIEW_META[v].line}</span>
                        </span>
                      </button>
                    ))}
                  </nav>
                  <p className={styles.railFine}>Answers use published studio information. ‘Start a project’ emails your brief to the studio.</p>
                </aside>
                <div className={styles.main}>
                  <div className={styles.mainHead}>
                    <div>
                      <h2 ref={mainHeadRef} tabIndex={-1} className={styles.mainTitle}>
                        {VIEW_META[view].title}
                        <span className={styles.dot}>.</span>
                      </h2>
                      <p className={styles.mainLine}>{VIEW_META[view].line}</p>
                    </div>
                    {closeButton}
                  </div>
                  {view === "ask" && chat}
                  {view === "brief" && <LaneBrief />}
                  {view === "prices" && <LanePrices onStart={() => show("brief")} />}
                  {view === "work" && <LaneWork />}
                  {view === "contact" && <LaneContact onStart={() => show("brief")} />}
                </div>
              </>
            ) : (
              <>
                {header(true)}
                {chat}
                <div className={styles.actions}>
                  <a className={styles.primary} href="/contact">
                    Talk to the team
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 6h8M6.5 2.5 10 6 6.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a className={styles.secondary} href="/pricing">
                    View pricing
                  </a>
                </div>
                <p className={styles.fine}>Answers use published studio information. Messages stay in this browser session.</p>
              </>
            )}
          </section>
        </div>
      ) : null}

      {!shown && starter !== null ? (
        <div className={styles.thought} data-leaving={starterLeaving || undefined}>
          <button
            key={starter}
            type="button"
            className={styles.thoughtBubble}
            onClick={() => {
              const question = STARTERS[starter];
              openLane("ask");
              ask(question);
            }}
          >
            <span className={styles.visuallyHidden}>Ask Lane: </span>
            {STARTERS[starter]}
          </button>
          <button type="button" className={styles.thoughtDismiss} onClick={stopStarters} aria-label="Hide suggestions">
            <svg width="8" height="8" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 3l8 8M11 3 3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className={`${styles.puff} ${styles.puffBig}`} aria-hidden="true" />
          <span className={`${styles.puff} ${styles.puffSmall}`} aria-hidden="true" />
        </div>
      ) : null}

      <button
        type="button"
        ref={launcherRef}
        className={styles.launcher}
        aria-expanded={open}
        aria-controls={shown ? panelId : undefined}
        onClick={() => (open ? close() : openLane())}
        onPointerMove={(e) => track(launcherRef.current, e, ["--lx", "--ly"])}
        onPointerLeave={() => release(launcherRef.current, ["--lx", "--ly"])}
      >
        <span className={styles.hint} aria-hidden="true">
          Ask Lane
        </span>
        <span className={styles.shadow} aria-hidden="true" />
        <span className={styles.float} aria-hidden="true">
          <span className={styles.object}>
            <span className={`${styles.face} ${styles.front}`}>
              <LaneMark className={styles.logo} idPrefix={`${markId}-btn`} size={48} />
            </span>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={styles.slice} style={{ "--z": i + 1 } as CSSProperties} />
            ))}
            <span className={`${styles.face} ${styles.back}`}>
              <svg width="18" height="18" viewBox="0 0 14 14">
                <path d="M3 3l8 8M11 3 3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </span>
        <span className={styles.visuallyHidden}>{open ? "Close Lane" : "Open Lane, studio guide"}</span>
      </button>
    </div>
  );
}

/** Splits a reply into words that settle in one after another. Line breaks are kept (white-space: pre-line). */
function Reveal({ text }: { text: string }) {
  let word = 0;
  return (
    <>
      {text.split(/(\s+)/).map((part, index) =>
        /^\s+$/.test(part) || part === "" ? (
          part
        ) : (
          <span key={index} className={styles.word} style={{ "--w": Math.min(word++, 90) } as CSSProperties}>
            {part}
          </span>
        ),
      )}
    </>
  );
}

/** Blue plate from the left of public/logo.svg (viewBox 0 0 64 64, before the wordmark).
 *  The lens group glances along the slot and blinks (see .lens in the CSS). */
function LaneMark({ className, idPrefix, size = 42 }: { className?: string; idPrefix: string; size?: number }) {
  const pid = (name: string) => `${idPrefix}-${name}`;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={pid("plate")} x1="32" y1="1" x2="32" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D9BFF" />
          <stop offset="0.55" stopColor="#0077E6" />
          <stop offset="1" stopColor="#0058B0" />
        </linearGradient>
        <linearGradient id={pid("slot")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08090A" />
          <stop offset="0.62" stopColor="#15181C" />
          <stop offset="1" stopColor="#2A2F36" />
        </linearGradient>
        <radialGradient id={pid("lens")} cx="0.34" cy="0.3" r="0.72">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F6F5F1" />
          <stop offset="1" stopColor="#D9D8D2" />
        </radialGradient>
        <filter id={pid("glow")} x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="3.1" />
        </filter>
        <filter id={pid("grain")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="n" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.22 0" />
        </filter>
        <linearGradient id={pid("depth")} x1="32" y1="1" x2="32" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="0.28" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#00356e" stopOpacity="0" />
          <stop offset="1" stopColor="#002850" stopOpacity="0.42" />
        </linearGradient>
        <clipPath id={pid("slotClip")}>
          <rect x="12" y="25" width="40" height="14" rx="7" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="17" fill={`url(#${pid("plate")})`} />
      <rect x="1" y="1" width="62" height="62" rx="17" fill={`url(#${pid("depth")})`} />
      <rect x="1" y="1" width="62" height="62" rx="17" filter={`url(#${pid("grain")})`} />
      <rect x="1.75" y="1.75" width="60.5" height="60.5" rx="16.3" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="1" y="1" width="62" height="62" rx="17" fill="none" stroke="#00468C" strokeOpacity="0.6" />
      <rect x="12" y="25" width="40" height="14" rx="7" fill={`url(#${pid("slot")})`} />
      <path d="M19 38.4h26" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.1" strokeLinecap="round" />
      <g clipPath={`url(#${pid("slotClip")})`}>
        <g className="lane-lens">
          <circle cx="21" cy="32" r="5.4" fill="#fff" opacity="0.55" filter={`url(#${pid("glow")})`} />
          <circle cx="21" cy="32" r="5" fill={`url(#${pid("lens")})`} />
        </g>
      </g>
    </svg>
  );
}

/** Small line icons for the large window's menu. */
function ViewIcon({ view }: { view: LaneView }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      {view === "ask" && <path {...p} d="M4 5h16v11H9l-5 4V5z" />}
      {view === "brief" && (
        <>
          <path {...p} d="M6 3h9l4 4v14H6z" />
          <path {...p} d="M9 12h7M9 16h5M14 3v5h5" />
        </>
      )}
      {view === "prices" && (
        <>
          <path {...p} d="M3 12l9-9h8v8l-9 9z" />
          <circle {...p} cx="16" cy="8" r="1.4" />
        </>
      )}
      {view === "work" && (
        <>
          <rect {...p} x="3" y="4" width="18" height="14" rx="2" />
          <path {...p} d="M3 14l5-4 4 3 3-2 6 4" />
        </>
      )}
      {view === "contact" && (
        <>
          <rect {...p} x="3" y="5" width="18" height="14" rx="2" />
          <path {...p} d="M3 7l9 6 9-6" />
        </>
      )}
    </svg>
  );
}
