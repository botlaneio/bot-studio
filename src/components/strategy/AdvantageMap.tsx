"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./AdvantageMap.module.css";

const stages = [
  { title: "Audience", question: "Who are we here for?", copy: "Find the people whose needs align with your offer. Understand their priorities, objections and the alternatives they already use.", focus: "Needs · Motivations · Alternatives", output: "Audience priorities & opportunity map", marks: ["People", "Needs", "Opportunity"] },
  { title: "Position", question: "Why should they choose you?", copy: "Connect what your audience values with what you do well. Define a difference you can explain clearly and support with evidence.", focus: "Offer · Difference · Evidence", output: "Positioning statement & core messages", marks: ["Audience", "Your offer", "Difference"] },
  { title: "Story", question: "What do they need to know?", copy: "Build a clear path from first impression to understanding. Give each page a purpose and put the right message at the right moment.", focus: "Message · Structure · Journey", output: "Site map & content priorities", marks: ["Understand", "Believe", "Act"] },
  { title: "Launch", question: "What matters first?", copy: "Turn the direction into a practical sequence. Agree the essentials, resolve dependencies and identify what can follow after launch.", focus: "Priorities · Dependencies · Sequence", output: "Prioritised scope & launch roadmap", marks: ["Now", "Next", "Later"] },
];

const photos = [
  { alt: "Customers and staff interacting across a light-filled café counter.", credit: "Seongjin Park", url: "https://unsplash.com/photos/IfIerGHbUhc" },
  { alt: "A hand holding a minimal glass beauty bottle against a soft sage backdrop.", credit: "Content Pixie", url: "https://unsplash.com/photos/KTWKXxfn1sQ" },
  { alt: "Black-and-white fashion photograph of a woman seated at a Paris café.", credit: "Ali Aziz", url: "https://unsplash.com/photos/7SaPZLh17G4" },
  { alt: "A bright boutique with clothing, sculptural lights and a textured lounge chair.", credit: "Caroline Badran", url: "https://unsplash.com/photos/wNudbCFp78k" },
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
        <div className={styles.gallery}>
          <div className={styles.photoStack}>
            {stages.map((item, i) => <figure key={item.title} className={`${styles.photo} ${active === i ? styles.current : ""}`} aria-hidden={active !== i}>
              <Image src={`/strategy/${item.title.toLowerCase()}.webp`} fill sizes="(max-width: 760px) 75vw, 32vw" alt={photos[i].alt} />
            </figure>)}
          </div>
          <button className={styles.preview} type="button" onClick={() => setActive((active + 1) % stages.length)} aria-label={`Explore ${stages[(active + 1) % stages.length].title.toLowerCase()}`}>
            <Image src={`/strategy/${stages[(active + 1) % stages.length].title.toLowerCase()}.webp`} fill sizes="140px" alt="" />
            <span>Up next / {stages[(active + 1) % stages.length].title} →</span>
          </button>
          <p className={styles.photoCredit}>Photography: <a href={photos[active].url} target="_blank" rel="noreferrer">{photos[active].credit} / Unsplash</a></p>
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
      <p className={styles.hint}>Four perspectives. Select one to explore.</p>
    </div>
  );
}
