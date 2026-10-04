"use client";

import { useId, useState, type KeyboardEvent } from "react";
import styles from "./work.module.css";

/** Four stages, each with a sample of the document a client signs off.
 *  Samples use the FORME study and are illustrative, not client material. */
const STAGES = [
  { key: "brief", label: "Brief", when: "One-page brief", summary: "One page that says who the site is for, what it must do and how we’ll know it worked." },
  { key: "structure", label: "Structure", when: "Site map", summary: "A site map and content plan, agreed before anything is designed." },
  { key: "design", label: "Design", when: "Wireframes, then design", summary: "Wireframes first, then the full design, reviewed at agreed milestones." },
  { key: "launch", label: "Launch", when: "Checklist and handover", summary: "A checklist we work through together, then a handover your team can run with." },
] as const;

type Key = (typeof STAGES)[number]["key"];

function Brief() {
  return (
    <div className={styles.doc}>
      <p className={styles.docHead}>FORME / Project brief · v1</p>
      <dl className={styles.docGrid}>
        <div>
          <dt>Audience</dt>
          <dd>Considered buyers, 28–45, who research before they spend</dd>
        </div>
        <div>
          <dt>The job</dt>
          <dd>Make the fabric felt on a phone, then make buying effortless</dd>
        </div>
        <div>
          <dt>Must have</dt>
          <dd>Collection pages, stockists, a journal the team can update</dd>
        </div>
        <div>
          <dt>We’ll measure</dt>
          <dd>Product page depth, stockist enquiries, newsletter sign-ups</dd>
        </div>
      </dl>
    </div>
  );
}

function Structure() {
  const tree = [
    { name: "Home", children: [] },
    { name: "Collection", children: ["Knitwear", "Outerwear", "Product page"] },
    { name: "Story", children: ["Materials", "The studio"] },
    { name: "Journal", children: ["Article"] },
    { name: "Stockists", children: [] },
  ];
  return (
    <div className={styles.doc}>
      <p className={styles.docHead}>FORME / Site map · 5 sections, 11 pages</p>
      <ul className={styles.tree}>
        {tree.map((node) => (
          <li key={node.name}>
            <span>{node.name}</span>
            {node.children.length > 0 && (
              <ul>
                {node.children.map((c) => (
                  <li key={c}>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Design() {
  return (
    <div className={styles.doc}>
      <p className={styles.docHead}>FORME / Product page wireframe · desktop</p>
      <div className={styles.wire} aria-hidden="true">
        <div className={styles.wireNav}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.wireBody}>
          <div className={styles.wireImage} />
          <div className={styles.wireCopy}>
            <i className={styles.wireTitle} />
            <i />
            <i />
            <i className={styles.wireShort} />
            <b className={styles.wireButton} />
          </div>
        </div>
      </div>
      <p className={styles.docNote}>Large photography left, details and purchase right. Reviewed in wireframe before any visual design.</p>
    </div>
  );
}

function Launch() {
  const items = [
    "Accessibility pass: keyboard, contrast, screen reader",
    "Redirects from old URLs, sitemap submitted",
    "Analytics events agreed and firing",
    "CMS walkthrough recorded for your team",
    "Handover document: hosting, accounts, how to edit",
  ];
  return (
    <div className={styles.doc}>
      <p className={styles.docHead}>FORME / Launch checklist</p>
      <ul className={styles.checklist}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const PANELS: Record<Key, () => React.JSX.Element> = { brief: Brief, structure: Structure, design: Design, launch: Launch };

export function ProcessSamples() {
  const [active, setActive] = useState<Key>("brief");
  const id = useId();
  const index = STAGES.findIndex((s) => s.key === active);
  const Panel = PANELS[active];

  // Arrow keys move between tabs, as screen-reader users expect.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = STAGES[(index + step + STAGES.length) % STAGES.length];
    setActive(next.key);
    document.getElementById(`${id}-tab-${next.key}`)?.focus();
  };

  return (
    <div className={styles.process} data-reveal="">
      <div className={styles.tabs} role="tablist" aria-label="Project stages" onKeyDown={onKeyDown}>
        {STAGES.map((stage, i) => (
          <button
            key={stage.key}
            id={`${id}-tab-${stage.key}`}
            type="button"
            role="tab"
            aria-selected={active === stage.key}
            aria-controls={`${id}-panel`}
            tabIndex={active === stage.key ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(stage.key)}
          >
            <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.tabLabel}>{stage.label}</span>
            <span className={styles.tabWhen}>{stage.when}</span>
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className={styles.panel}>
        <p className={styles.panelSummary}>{STAGES[index].summary}</p>
        <div key={active} className={styles.panelDoc}>
          <Panel />
        </div>
        <p className={styles.sampleNote}>Sample, shown with a self-initiated study. Your deliverables and timeline are set in your written proposal.</p>
      </div>
    </div>
  );
}
