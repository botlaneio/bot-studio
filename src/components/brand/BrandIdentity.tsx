import Link from "next/link";
import styles from "./BrandIdentity.module.css";
import film from "./BrandFilm.module.css";
import { MotionStage, IdentityMark, BrandPalette } from "./IdentityMotion";

const systems = [
  ["01", "A clear point of view", "Positioning & voice", "Define what you stand for, who you speak to, and the language that makes your brand unmistakable.", "Positioning · Naming · Messaging · Tone of voice"],
  ["02", "A signature worth keeping", "Marks & identity", "A considered logo family, built to hold its character from the smallest screen to the largest sign.", "Primary mark · Secondary marks · Usage rules"],
  ["03", "Every detail, in dialogue", "Visual language", "Colour, typography and art direction that work together, giving every touchpoint a shared sensibility.", "Colour system · Type hierarchy · Image direction"],
  ["04", "Built to leave the studio", "Guidelines & rollout", "An identity your team can use with confidence, with practical guidance and agreed launch applications.", "Brand guidelines · Asset library · Launch applications"],
];

export function BrandIdentity() {
  return (
    <main className={styles.page}>
      <section className={film.hero} aria-labelledby="brand-title">
        <div className={film.heroTop}><Link className={styles.eyebrow} href="/capabilities">Capabilities / 01 — Brand Identity</Link><span className={styles.eyebrow}>A point of view, made visible</span></div>
        <h1 id="brand-title">Identity.<br /><span>With intent.</span></h1>
        <MotionStage className={film.heroStage} label="Animated identity study: two geometric halves form one signature">
          <div className={film.heroGrid} aria-hidden="true" />
          <div className={film.heroMark}><IdentityMark /></div>
          <div className={film.orbit} aria-hidden="true" />
          <span className={film.coordinate} aria-hidden="true">FORM / 001</span>
          <span className={film.heroSignature} aria-hidden="true">B / L</span>
        </MotionStage>
        <div className={film.heroBottom}><p className={styles.body}>A name. A mark. A world around them.<br />We create identities that feel like only you.</p><Link className={styles.cta} href="/contact#inquiry">Shape your brand <span aria-hidden="true">↗</span></Link></div>
        <a className={film.scrollLink} href="#identity-film">Explore the identity ↓</a>
      </section>

      <section className={`${styles.section} ${styles.statement}`} aria-labelledby="statement-title">
        <p className={styles.eyebrow}>01 / The point of view</p>
        <div data-reveal><h2 id="statement-title">Recognised in a second.<br />Remembered for longer.</h2><p className={styles.body}>The strongest brands have a thread running through everything. We find yours, then give it form: a distinctive identity that stays coherent across your website, your communications and the places your business shows up.</p></div>
      </section>

      <section id="identity-film" className={film.film} aria-labelledby="form-title">
        <MotionStage pin label="Scroll sequence revealing the construction of an identity mark">
          <div className={film.sticky}>
            <div className={film.filmCopy}><p className={styles.eyebrow}>02 / From idea to signature</p><h2 id="form-title">Nothing arbitrary.<br />Everything connected.</h2><p className={styles.body}>Proportion, rhythm and negative space. We shape the details until the identity holds together, at any scale.</p><a className={film.skip} href="#identity-language">Continue to the visual language ↓</a></div>
            <div className={film.blueprint} aria-hidden="true">
              <div className={film.constructionGrid} />
              <svg className={film.guides} viewBox="0 0 400 400" fill="none"><circle cx="200" cy="200" r="145" /><circle cx="200" cy="200" r="100" /><path d="M0 200h400M200 0v400M55 55l290 290M345 55 55 345" /><rect x="55" y="55" width="290" height="290" /></svg>
              <div className={film.builtMark}><IdentityMark /></div>
              <span className={film.measureTop}>Proportion / 1:1</span><span className={film.measureBottom}>One coherent signature</span>
            </div>
          </div>
        </MotionStage>
      </section>

      <section id="identity-language" className={`${styles.section} ${film.language}`} aria-labelledby="language-title">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>03 / A visual language</p><h2 id="language-title">More than a mark.<br />A way of showing up.</h2></div>
        <div className={film.languageGrid}><BrandPalette /><MotionStage className={film.typeStudy} label="Typographic study moving from expressive display type to structured information"><span className={styles.eyebrow}>Typography / Hierarchy in harmony</span><div className={film.typeLarge} aria-hidden="true">Aa</div><div className={film.typeLines}><span>Distinct by design.</span><p>A voice with character.<br />A system with clarity.</p><small>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz / 0123456789</small></div></MotionStage></div>
        <p className={styles.body}>We define how your colours, type, imagery and voice work together, so your team can create new work without starting from scratch.</p>
      </section>

      <section className={film.touchpoints} aria-labelledby="touchpoint-title"><div className={film.touchpointHead}><p className={styles.eyebrow}>04 / Identity in context</p><h2 id="touchpoint-title">One thread.<br />Across every surface.</h2><p className={styles.body}>Built to travel from a first impression to a lasting relationship.</p></div><MotionStage className={film.applicationStage} label="Animated examples of an identity applied to a website, a presentation and stationery"><div className={film.applications} aria-hidden="true"><div className={film.webApplication}><div className={film.browserBar}><i /><i /><i /><span>Digital / 01</span></div><div className={film.webContent}><IdentityMark /><span>Make your<br />presence felt.</span><small>Discover the difference ↗</small></div></div><div className={film.presentation}><span>Perspective / 02</span><IdentityMark /><strong>A clearer<br />point of view.</strong><small>Brand presentation</small></div><div className={film.stationery}><IdentityMark /><span>Considered.<br />Consistent.</span><small>Print / 03</small></div></div></MotionStage><p className={film.conceptNote}>Interactive studio studies — illustrative identity applications.</p></section>

      <section id="brand-system" className={styles.section} aria-labelledby="system-title">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>05 / Your identity system</p><h2 id="system-title">One brand.<br />Every touchpoint.</h2></div>
        <div className={styles.systems}>{systems.map(([number, title, label, copy, includes]) => <article className={styles.system} key={number} data-reveal><span className={styles.number}>{number}</span><div><p className={styles.eyebrow}>{label}</p><h3>{title}</h3></div><div><p className={styles.body}>{copy}</p><p className={styles.includes}>{includes}</p></div></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.process}`} aria-labelledby="process-title">
        <p className={styles.eyebrow}>06 / Working together</p><h2 id="process-title">From first conversation<br />to a complete identity.</h2>
        <ol>{[["Discover", "We listen, question and align on your audience, ambition and positioning."], ["Define", "We agree a creative direction, with a clear rationale behind the choices."], ["Refine", "We develop the identity, test it in context and work through agreed feedback."], ["Deliver", "You receive the agreed assets and guidelines, ready for your team to put to work."]].map(([title, copy], i) => <li key={title}><span className={styles.number}>0{i + 1}</span><h3>{title}</h3><p className={styles.body}>{copy}</p></li>)}</ol>
        <p className={styles.scope}>Deliverables, timeline and revision rounds are agreed in your written proposal before work begins.</p>
      </section>

      <section className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title"><p className={styles.eyebrow}>A few things to know</p><h2 id="faq-title">Before we begin.</h2>{[["Can you work with an existing identity?", "Yes. We can refine an existing identity or build a new one. We start by understanding what is working and what needs to change."], ["Do we need a new name or logo?", "Not necessarily. We recommend the scope after discovery; sometimes a clearer visual system is the right place to focus."], ["Can you carry the identity into our website?", "Yes. Brand identity can lead into website strategy, design and development. We agree that additional scope with you before starting."]].map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p className={styles.body}>{a}</p></details>)}</section>

      <section className={styles.close} aria-labelledby="close-title"><p className={styles.eyebrow}>Your next chapter</p><h2 id="close-title">Make it<br />unmistakable.</h2><Link className={styles.cta} href="/contact#inquiry">Discuss your identity <span aria-hidden="true">↗</span></Link><Link className={styles.next} href="/capabilities/strategy">Next capability / Strategy →</Link></section>
    </main>
  );
}
