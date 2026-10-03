import Image from "next/image";
import Link from "next/link";
import common from "../brand/BrandIdentity.module.css";
import styles from "./Strategy.module.css";

const decisions = [
  { n: "01", title: "Know the landscape.", label: "Audience & competition", text: "Understand who you need to reach, what they care about and the alternatives they already have.", output: "Audience priorities · Competitor review · Opportunity map" },
  { n: "02", title: "Choose your position.", label: "Positioning & messaging", text: "Make your offer clear, your difference credible and your message consistent across the site.", output: "Positioning statement · Core messages · Content priorities" },
  { n: "03", title: "Give the story structure.", label: "Site map & content", text: "Plan the pages, the order of information and the paths that help visitors take the next step.", output: "Site map · Page purpose · Content plan · Inquiry journey" },
  { n: "04", title: "Make the next move.", label: "Launch roadmap", text: "Agree what matters first, what can wait and what your team needs to move from a plan to a launch.", output: "Prioritised scope · Dependencies · Launch roadmap" },
];

export function Strategy() {
  return (
    <main className={`${common.page} ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="strategy-title">
        <div className={styles.art}><Image src="/capability-strategy.webp" alt="A cobalt knight stands among black chess pieces on a dark stone board" fill sizes="100vw" preload /></div>
        <div className={styles.heroCopy}>
          <Link className={common.eyebrow} href="/capabilities">Capabilities / 02 — Strategy</Link>
          <h1 id="strategy-title">A clear<br />next move<span>.</span></h1>
          <p className={styles.service}>Strategy</p>
          <p className={common.body}>Before we draw a pixel, we decide what it needs to do. Positioning, audience insight and a practical roadmap for a website with purpose.</p>
          <Link className={common.cta} href="/contact#inquiry">Plan your next move <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.heroFoot}><span>Clarity before creation.</span><a href="#strategy-decisions">Explore the approach ↓</a></div>
      </section>

      <section className={`${common.section} ${common.statement}`} aria-labelledby="clarity-title"><p className={common.eyebrow}>01 / First, direction</p><div data-reveal><h2 id="clarity-title">Good design starts<br />with better decisions.</h2><p className={common.body}>A beautiful website still needs a clear job. We align your business goals, audience needs and offer before design begins, so the work has a direction everyone can understand.</p></div></section>

      <section className={styles.questions} aria-labelledby="questions-title"><div className={styles.questionHead}><p className={common.eyebrow}>02 / The questions that matter</p><h2 id="questions-title">Find the advantage.</h2></div><div className={styles.questionGrid}>{[["Who is this for?", "An audience we can describe, with needs we can design around."], ["Why choose you?", "A clear difference supported by what your business actually does."], ["What happens next?", "A useful path from first impression to the right conversation."]].map(([title, text], i) => <article key={title}><span className={common.number}>0{i + 1}</span><h3>{title}</h3><p className={common.body}>{text}</p></article>)}</div></section>

      <section id="strategy-decisions" className={common.section} aria-labelledby="decisions-title"><div className={common.sectionHead}><p className={common.eyebrow}>03 / What we work through</p><h2 id="decisions-title">From open questions<br />to agreed direction.</h2></div>{decisions.map(({ n, title, label, text, output }) => <article key={n} className={common.system} data-reveal><span className={common.number}>{n}</span><div><p className={common.eyebrow}>{label}</p><h3>{title}</h3></div><div><p className={common.body}>{text}</p><p className={common.includes}>{output}</p></div></article>)}</section>

      <section className={styles.interlude} aria-labelledby="roadmap-title"><figure><Image src="/capability-strategy.webp" alt="Close view of the cobalt knight on the chessboard" fill sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>Studio concept / A considered move</figcaption></figure><div><p className={common.eyebrow}>04 / Your roadmap</p><h2 id="roadmap-title">A plan your team<br />can act on.</h2><p className={common.body}>The output is a shared reference for the project: who the website serves, what it should communicate, which pages it needs and what ships first.</p><ul><li>Clear priorities for design and content</li><li>Scope that reflects the launch goals</li><li>Dependencies surfaced before the build</li><li>Success measures agreed with your team</li></ul><p className={styles.note}>The deliverables and level of research depend on your agreed project scope.</p></div></section>

      <section className={`${common.section} ${common.process}`} aria-labelledby="working-title"><p className={common.eyebrow}>05 / Working together</p><h2 id="working-title">Listen. Examine.<br />Decide. Align.</h2><ol>{[["Listen", "We discuss the business, your current website and the decisions you need to make."], ["Examine", "We review the agreed audience, competitors and existing material."], ["Decide", "We shape the positioning, site structure and launch priorities."], ["Align", "We walk through the direction together and agree the next stage."]].map(([title, text], i) => <li key={title}><span className={common.number}>0{i + 1}</span><h3>{title}</h3><p className={common.body}>{text}</p></li>)}</ol><p className={common.scope}>Scope, research methods, timeline and review rounds are agreed in your written proposal before we begin.</p></section>

      <section className={`${common.section} ${common.faq}`} aria-labelledby="strategy-faq"><p className={common.eyebrow}>Before we begin</p><h2 id="strategy-faq">A clearer starting point.</h2>{[["Can we start with strategy alone?", "Yes. We can scope strategy as a standalone engagement or as the first stage of a website project."], ["What if we already have a strategy?", "We review what you have, identify the decisions still needed for the website and agree a focused scope."], ["Does this include customer interviews?", "Interviews and other primary research are included only when agreed in the proposal. We make the research methods and responsibilities clear before work starts."], ["What comes after the roadmap?", "The next stage may be brand identity, website design or development, depending on what the strategy establishes. Each stage has its own agreed scope."]].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p className={common.body}>{answer}</p></details>)}</section>

      <section className={common.close} aria-labelledby="strategy-close"><p className={common.eyebrow}>Direction makes the difference</p><h2 id="strategy-close">Choose your<br />next move.</h2><Link className={common.cta} href="/contact#inquiry">Discuss your strategy <span aria-hidden="true">↗</span></Link><Link className={common.next} href="/capabilities/design-innovation">Next capability / Design & Innovation →</Link></section>
    </main>
  );
}
