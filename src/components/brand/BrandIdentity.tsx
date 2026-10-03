import Image from "next/image";
import Link from "next/link";
import styles from "./BrandIdentity.module.css";

const systems = [
  ["01", "A clear point of view", "Positioning & voice", "Define what you stand for, who you speak to, and the language that makes your brand unmistakable.", "Positioning · Naming · Messaging · Tone of voice"],
  ["02", "A signature worth keeping", "Marks & identity", "A considered logo family, built to hold its character from the smallest screen to the largest sign.", "Primary mark · Secondary marks · Usage rules"],
  ["03", "Every detail, in dialogue", "Visual language", "Colour, typography and art direction that work together, giving every touchpoint a shared sensibility.", "Colour system · Type hierarchy · Image direction"],
  ["04", "Built to leave the studio", "Guidelines & rollout", "An identity your team can use with confidence, with practical guidance and agreed launch applications.", "Brand guidelines · Asset library · Launch applications"],
];

export function BrandIdentity() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="brand-title">
        <div className={styles.heroCopy}>
          <Link className={styles.eyebrow} href="/capabilities">Capabilities / 01 — Foundation</Link>
          <h1 id="brand-title">Brand<br />Identity<span>.</span></h1>
          <p className={styles.lead}>An identity that feels<br />like only you.</p>
          <p className={styles.body}>We turn your point of view into a name, a mark and a visual world. Considered from the first impression to the finest detail.</p>
          <Link className={styles.cta} href="/contact#inquiry">Shape your brand <span aria-hidden="true">↗</span></Link>
        </div>
        <figure className={styles.heroArt}>
          <Image src="/capability-brand-identity.webp" alt="Cobalt stationery with embossed geometric marks, black cards and a brushed metal seal" fill sizes="(max-width: 760px) 100vw, 55vw" preload />
          <figcaption>Identity study / Cobalt, paper & metal</figcaption>
        </figure>
        <div className={styles.heroFoot}><span>Strategy. Expression. Consistency.</span><a href="#brand-system">Explore the identity system ↓</a></div>
      </section>

      <section className={`${styles.section} ${styles.statement}`} aria-labelledby="statement-title">
        <p className={styles.eyebrow}>01 / The point of view</p>
        <div data-reveal><h2 id="statement-title">Recognised in a second.<br />Remembered for longer.</h2><p className={styles.body}>The strongest brands have a thread running through everything. We find yours, then give it form: a distinctive identity that stays coherent across your website, your communications and the places your business shows up.</p></div>
      </section>

      <section className={styles.materials} aria-labelledby="materials-title">
        <div className={styles.materialHead}><p className={styles.eyebrow}>02 / The expression</p><h2 id="materials-title">Character, in the details.</h2><p className={styles.body}>A mark. A texture. A precise shade of blue.<br />Every choice belongs to the same story.</p></div>
        <div className={styles.materialGrid}>
          <figure className={styles.paper}><Image src="/capability-brand-identity.webp" alt="Detail of the embossed mark on textured cobalt paper" fill sizes="(max-width: 760px) 100vw, 60vw" /><figcaption><span>01 — Tactile</span><span>Paper & impression</span></figcaption></figure>
          <figure className={styles.metal}><Image src="/capability-brand-identity.webp" alt="Detail of the geometric mark engraved in a brushed metal seal" fill sizes="(max-width: 760px) 100vw, 40vw" /><figcaption><span>02 — Precise</span><span>Form & finish</span></figcaption></figure>
        </div>
        <p className={styles.artNote}>Studio concept artwork — a material study, not a client case study.</p>
      </section>

      <section id="brand-system" className={styles.section} aria-labelledby="system-title">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>03 / The identity system</p><h2 id="system-title">One brand.<br />Every touchpoint.</h2></div>
        <div className={styles.systems}>{systems.map(([number, title, label, copy, includes]) => <article className={styles.system} key={number} data-reveal><span className={styles.number}>{number}</span><div><p className={styles.eyebrow}>{label}</p><h3>{title}</h3></div><div><p className={styles.body}>{copy}</p><p className={styles.includes}>{includes}</p></div></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.process}`} aria-labelledby="process-title">
        <p className={styles.eyebrow}>04 / Working together</p><h2 id="process-title">From first conversation<br />to a complete identity.</h2>
        <ol>{[["Discover", "We listen, question and align on your audience, ambition and positioning."], ["Define", "We agree a creative direction, with a clear rationale behind the choices."], ["Refine", "We develop the identity, test it in context and work through agreed feedback."], ["Deliver", "You receive the agreed assets and guidelines, ready for your team to put to work."]].map(([title, copy], i) => <li key={title}><span className={styles.number}>0{i + 1}</span><h3>{title}</h3><p className={styles.body}>{copy}</p></li>)}</ol>
        <p className={styles.scope}>Deliverables, timeline and revision rounds are agreed in your written proposal before work begins.</p>
      </section>

      <section className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title"><p className={styles.eyebrow}>A few things to know</p><h2 id="faq-title">Before we begin.</h2>{[["Can you work with an existing identity?", "Yes. We can refine an existing identity or build a new one. We start by understanding what is working and what needs to change."], ["Do we need a new name or logo?", "Not necessarily. We recommend the scope after discovery; sometimes a clearer visual system is the right place to focus."], ["Can you carry the identity into our website?", "Yes. Brand identity can lead into website strategy, design and development. We agree that additional scope with you before starting."]].map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p className={styles.body}>{a}</p></details>)}</section>

      <section className={styles.close} aria-labelledby="close-title"><p className={styles.eyebrow}>Your next chapter</p><h2 id="close-title">Make it<br />unmistakable.</h2><Link className={styles.cta} href="/contact#inquiry">Discuss your identity <span aria-hidden="true">↗</span></Link><Link className={styles.next} href="/capabilities/strategy">Next capability / Strategy →</Link></section>
    </main>
  );
}
