import Image from "next/image";
import { AdvantageMap } from "./AdvantageMap";
import Link from "next/link";
import { Arrow } from "../motion/Arrow";
import common from "../brand/IdentityAtelier.module.css";
import styles from "./Strategy.module.css";

const workstreams = [
  ["Audience & competition", "Understand who you need to reach, what they care about and the alternatives they already have.", "Audience priorities · Competitor review · Opportunity map"],
  ["Positioning & messaging", "Clarify your offer, support your difference and give your story a consistent voice.", "Positioning statement · Core messages · Content priorities"],
  ["Site map & content", "Agree which pages you need, the purpose of each and the path to the right enquiry.", "Site map · Page purpose · Content plan · Enquiry journey"],
  ["Launch roadmap", "Define what matters first, what can wait and the dependencies to resolve before the build.", "Prioritised scope · Dependencies · Launch roadmap"],
];
const useCases = [
  ["Launching", "Give a new business, product or offer a clear audience, message and direction from the start."],
  ["Repositioning", "Revisit your offer and story when your business has changed or your current message feels unclear."],
  ["Planning a website", "Agree the content, structure and launch priorities before committing to design and development."],
];
const process = [
  ["Listen", "We discuss your goals, existing material and the decisions you need help making."],
  ["Examine", "We review your audience, competitors and current experience using the agreed research methods."],
  ["Decide", "We shape the positioning, content structure and priorities into a practical direction."],
  ["Align", "We walk through the recommendations together and agree the next stage."],
];
const questions = [
  ["Can we start with strategy alone?", "Yes. Strategy can be a standalone engagement or the first stage of a brand and website project. We agree the handover and next steps in your proposal."],
  ["What if we already have a strategy?", "We review the material you have and focus on the decisions still needed for your website. The scope can be a focused review rather than a complete restart."],
  ["Does this include customer interviews?", "Interviews, surveys and other primary research are included only when agreed in the proposal. We define the methods, access and responsibilities before work begins."],
  ["How much does it cost?", "Every engagement is priced to its scope. After the initial conversation, we provide a fixed quote with the deliverables, review rounds and timeline in writing before starting."],
  ["How long will the work take?", "The timeline depends on the research depth, stakeholder availability and decisions involved. We agree the schedule and feedback milestones before starting; share any launch deadline in your enquiry."],
  ["What will we receive?", "Your written proposal lists the exact handover, which may include audience findings, a positioning and messaging framework, a site map, content priorities and a launch roadmap. We walk through the direction together so your team can use it."],
  ["How do reviews and revisions work?", "We agree review milestones and revision rounds in your proposal. Your team provides consolidated feedback so we can resolve decisions together. If the brief changes, we agree any effect on cost and timing before continuing."],
  ["What do you need from us?", "Your business goals, existing website and brand material, what you know about your customers and competitors, and the decisions you need help making. We clarify the brief together at the start."],
  ["What happens after strategy?", "The next stage may be brand identity, website design or development. Strategy establishes the priorities, and each subsequent stage has its own agreed scope."],
];

export function Strategy() {
  return (
    <main className={common.page}>
      <div className={common.container}>
        <section className={styles.hero} aria-labelledby="strategy-title">
          <div className={styles.heroCopy}>
            <Link className={common.eyebrow} href="/capabilities">{"// 02 — Strategy"}</Link>
            <h1 id="strategy-title">Clarity before<br />creation.</h1>
            <p className={common.lead}>Know your audience. Define your difference. Plan a website with purpose.</p>
            <Link className={`${common.cta} arrowHost`} href="/contact#inquiry">Discuss your strategy <Arrow className={common.arrow} /></Link>
          </div>
          <figure className={styles.heroArt}>
            <Image src="/strategy/strategy-desk.webp" width={1536} height={1024} alt="Research summary, positioning deck and cobalt launch roadmap arranged on a charcoal studio desk." sizes="(max-width: 760px) 100vw, 42vw" loading="eager" fetchPriority="high" />
            <figcaption>Clarity before creation.</figcaption>
          </figure>
        </section>
        <section className={styles.direction} aria-labelledby="direction-title">
          <div className={common.sectionHead}><p className={common.eyebrow}>01 / Find the advantage</p><div><h2 id="direction-title">Four decisions.<br />One direction.</h2><p className={common.body}>We connect your business goals, audience needs and offer before design begins, so every page has a clear job.</p></div></div>
          <AdvantageMap />
        </section>
        <section className={styles.outcomes} aria-labelledby="outcomes-title">
          <div className={common.sectionHead}><p className={common.eyebrow}>02 / A working plan</p><div><h2 id="outcomes-title">Turn questions into<br />a working plan.</h2><p className={common.body}>A shared reference for your team: who the website serves, what it should say and what should ship first.</p></div></div>
          <figure className={styles.outputArt}><Image src="/strategy/strategy-outputs.webp" width={1536} height={1024} alt="Three illustrative strategy documents titled Audience, Position and Roadmap, with cobalt and grey graphic motifs." sizes="(max-width: 899px) 100vw, 70vw" /></figure>
          <div className={styles.outputCaptions}>{[["Audience", "Understand who you’re for and what matters to them."], ["Position", "Give your offer a clear point of view and a consistent message."], ["Roadmap", "Turn the direction into priorities your team can act on."]].map(([title, copy]) => <div key={title}><h3>{title}</h3><p className={common.body}>{copy}</p></div>)}</div>
          <p className={common.scope}>Illustrative document formats. Your deliverables and research depth are defined in the agreed scope.</p>
        </section>
        <section className={styles.work} aria-labelledby="work-title">
          <div className={common.sectionHead}><p className={common.eyebrow}>03 / What we work through</p><div><h2 id="work-title">Direction, made practical.</h2><p className={common.body}>Four connected areas of work, scoped around the decisions your business needs to make.</p></div></div>
          <ol className={styles.workList}>{workstreams.map(([title, copy, output], i) => <li key={title}><span className={common.number} aria-hidden="true">0{i + 1}</span><h3>{title}</h3><div><p className={common.body}>{copy}</p><p className={styles.outputLabel}>Possible outputs</p><p className={styles.output}>{output}</p></div></li>)}</ol>
        </section>
        <section className={common.fit} aria-labelledby="fit-title">
          <div className={common.sectionHead}><p className={common.eyebrow}>04 / When it helps</p><div><h2 id="fit-title">A foundation for what’s next.</h2><p className={common.body}>Start with strategy when the next step needs a clearer direction.</p></div></div>
          <ul className={common.fitList}>{useCases.map(([title, copy]) => <li key={title}><h3>{title}</h3><p className={common.body}>{copy}</p></li>)}</ul>
        </section>
        <section className={common.process} aria-labelledby="working-title">
          <div className={common.sectionHead}><p className={common.eyebrow}>05 / Working together</p><div><h2 id="working-title">Listen. Examine.<br />Decide. Align.</h2><p className={common.body}>A focused, collaborative process to turn open questions into agreed decisions.</p></div></div>
          <ol className={common.processList}>{process.map(([title, copy], i) => <li key={title}><span className={common.eyebrow}>0{i + 1}</span><h3>{title}</h3><p className={common.body}>{copy}</p></li>)}</ol>
          <p className={common.scope}>Scope, research methods, timeline and review rounds are agreed in your written proposal before we begin.</p>
        </section>
        <section className={common.faq} aria-labelledby="strategy-faq">
          <div className={common.sectionHead}><p className={common.eyebrow}>06 / Good to know</p><div><h2 id="strategy-faq">Before we begin.</h2><p className={common.body}>The practical details, from the first conversation to the final handover.</p></div></div>
          <div className={common.questions}>{questions.map(([question, answer]) => <details key={question} className={common.question}><summary>{question}<span className={common.plus} aria-hidden="true" /></summary><p className={common.body}>{answer}</p></details>)}</div>
        </section>
        <section className={common.close} aria-labelledby="strategy-close">
          <div><p className={common.eyebrow}>07 / Let’s plan</p><h2 id="strategy-close">Start with<br />direction.</h2></div>
          <div className={common.nextStep}><p className={common.body}>Tell us what you’re building and the decisions ahead. We’ll discuss the brief, then outline the scope, cost and timeline.</p><Link className={`${common.cta} arrowHost`} href="/contact#inquiry">Discuss your strategy <Arrow className={common.arrow} /></Link></div>
        </section>
      </div>
    </main>
  );
}
