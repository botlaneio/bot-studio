"use client";

import { useState } from "react";
import styles from "./AdvantageMap.module.css";

const stages = [
  { title: "Audience", question: "Who are we here for?", copy: "Find the people whose needs align with your offer. Understand their priorities, objections and the alternatives they already use.", focus: "Needs · Motivations · Alternatives", output: "Audience priorities & opportunity map", marks: ["People", "Needs", "Opportunity"] },
  { title: "Position", question: "Why should they choose you?", copy: "Connect what your audience values with what you do well. Define a difference you can explain clearly and support with evidence.", focus: "Offer · Difference · Evidence", output: "Positioning statement & core messages", marks: ["Audience", "Your offer", "Difference"] },
  { title: "Story", question: "What do they need to know?", copy: "Build a clear path from first impression to understanding. Give each page a purpose and put the right message at the right moment.", focus: "Message · Structure · Journey", output: "Site map & content priorities", marks: ["Understand", "Believe", "Act"] },
  { title: "Launch", question: "What matters first?", copy: "Turn the direction into a practical sequence. Agree the essentials, resolve dependencies and identify what can follow after launch.", focus: "Priorities · Dependencies · Sequence", output: "Prioritised scope & launch roadmap", marks: ["Now", "Next", "Later"] },
];

export function AdvantageMap() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return (
    <div className={styles.explorer}>
      <div className={styles.controls} aria-label="Explore the four strategy decisions">
        {stages.map((item, i) => <button key={item.title} type="button" aria-pressed={active === i} aria-controls="advantage-detail" onClick={() => setActive(i)}><span>0{i + 1}</span>{item.title}<span className={styles.indicator} aria-hidden="true" /></button>)}
      </div>
      <div className={styles.workspace}>
        <div className={styles.scene} aria-hidden="true" data-stage={active}>
          <div className={styles.grid} />
          <div className={styles.planes}>
            <div className={styles.backPlane} /><div className={styles.midPlane} />
            <div className={styles.frontPlane}>
              <span className={styles.diagramLabel}>0{active + 1} / {stage.title}</span>
              <svg key={active} viewBox="0 0 360 220" className={styles.diagram}>
                {active === 0 && <g><circle cx="142" cy="110" r="74" /><circle cx="218" cy="110" r="74" /><circle className={styles.solid} cx="180" cy="110" r="22" /><path d="M180 36V14 M180 184V206 M44 110H68 M292 110H316" /></g>}
                {active === 1 && <g><path d="M55 160L180 42L305 160Z" /><path d="M55 160H305 M180 42V160" /><circle className={styles.solid} cx="180" cy="120" r="22" /><circle cx="55" cy="160" r="8" /><circle cx="305" cy="160" r="8" /><circle cx="180" cy="42" r="8" /></g>}
                {active === 2 && <g><path d="M48 110H312" /><rect x="40" y="70" width="72" height="80" rx="3" /><rect x="144" y="48" width="72" height="124" rx="3" /><rect x="248" y="70" width="72" height="80" rx="3" /><path d="M58 90H94 M58 108H86 M162 70H198 M162 88H198 M162 106H190 M266 90H302" /><circle className={styles.solid} cx="284" cy="126" r="9" /></g>}
                {active === 3 && <g><path d="M45 170H120V120H210V65H315" /><circle cx="45" cy="170" r="8" /><circle cx="120" cy="120" r="8" /><circle cx="210" cy="65" r="8" /><circle className={styles.solid} cx="315" cy="65" r="15" /><path d="M45 195V187 M120 195V160 M210 195V110 M315 195V110" /></g>}
              </svg>
              <div className={styles.diagramLegend}>{stage.marks.map(mark => <span key={mark}>{mark}</span>)}</div>
            </div>
          </div>
          <span className={styles.sceneCaption}>From open questions to clear decisions</span>
        </div>
        <div id="advantage-detail" className={styles.detail} aria-live="polite" aria-atomic="true">
          <div key={active} className={styles.detailContent}>
            <p className={styles.kicker}>0{active + 1} / {stage.title}</p>
            <h3>{stage.question}</h3><p className={styles.copy}>{stage.copy}</p>
            <p className={styles.focus}>{stage.focus}</p>
            <div className={styles.output}><span>Possible output</span><p>{stage.output}</p></div>
          </div>
          <button type="button" className={styles.next} onClick={() => setActive((active + 1) % stages.length)}>Explore {stages[(active + 1) % stages.length].title.toLowerCase()} <span aria-hidden="true">→</span></button>
        </div>
      </div>
      <p className={styles.hint}>Select a decision to explore how we find your advantage.</p>
    </div>
  );
}
