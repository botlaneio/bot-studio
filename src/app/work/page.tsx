import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/motion/Arrow";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import { ProcessSamples } from "./ProcessSamples";
import styles from "./work.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description:
    "What Botlane Studios has built, the studies we set ourselves, and how we work. A new studio, shown honestly: no borrowed logos or invented case studies.",
};

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** Self-initiated studies. Each one says so, in the label and the copy. */
const STUDIES = [
  {
    id: "forme",
    name: "FORME",
    field: "Fashion identity",
    image: "/brand-identity/forme-collection.webp",
    alt: "FORME concept: bone, black and oxblood identity across a poster, packaging, an embossed garment tag and a mobile storefront.",
    brief: "A quiet knitwear label that has to feel as tactile on a phone screen as it does in the hand.",
    choices: [
      "A high-contrast serif wordmark, with a single F monogram for tags and embossing",
      "Bone, black and one oxblood accent, so the clothes carry the colour",
      "A storefront where product photography leads and type steps back",
    ],
  },
  {
    id: "northline",
    name: "NORTHLINE",
    field: "Consultancy identity",
    image: "/brand-identity/northline-collection.webp",
    alt: "NORTHLINE concept: navy, silver and white identity across office signage, a hardback report, business cards and a tablet website.",
    brief: "A strategy consultancy that needs to look senior without looking cold.",
    choices: [
      "A single-stroke peak mark that still reads on a business card or a sign",
      "Navy, silver and white, with one short line of copy: people, ideas, progress",
      "Clear hierarchy across proposals, reports and the website, so the brand feels consistent wherever clients meet it",
    ],
  },
];

/** True of this codebase today. Keep it that way when the site changes. */
const UNPACKED = [
  {
    title: "Designed, then built in code",
    text: "Laid out in our own Figma design and rebuilt by hand in Next.js and React. No template, no page builder.",
  },
  {
    title: "Served from the edge",
    text: "Pages are prerendered and served from Cloudflare’s global network, so they load from somewhere near you.",
  },
  {
    title: "Motion with a reason",
    text: "The 3D process scene on the homepage only loads as you approach it. If your device asks for reduced motion, the site’s animations respect it.",
  },
  {
    title: "A guide that tells the truth",
    text: "Lane, bottom right, answers from published studio information only. It never claims to book a call or send a message for you.",
  },
];

const FOUNDING = [
  "The people who built this studio on every call, file and decision",
  "A written scope, timeline and quote before any work starts",
  "Your project shown here only with your approval, and only once it’s live",
];

export default function WorkPage() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// Work"
        title="Work, shown honestly"
        mark="."
        lede="We’re a new studio. You won’t find borrowed logos or invented case studies here. You’ll find what we’ve actually built, the studies we set ourselves, and exactly how we’d work with you."
      />

      {/* 01 — Real, shipped work. */}
      <section className={page.section} aria-labelledby="inhouse-title">
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            01 / Built in-house
          </span>
          <div>
            <h2 id="inhouse-title" className={page.h2} data-reveal="">
              botlane.io<b>.</b>
            </h2>
            <p className={`${page.body} ${styles.headBody}`} data-reveal="" style={delay(0.05)}>
              The product site for BotLane LLC’s managed AI service. We shaped the positioning, designed the interface and built it end to end. It’s live, so you can judge it for yourself.
            </p>
          </div>
        </div>

        <div className={styles.inhouse}>
          <figure className={`${styles.shot} ${styles.shotMain}`} data-reveal="">
            <Image
              src="/work/botlane-io-product.webp"
              width={1920}
              height={1113}
              alt="botlane.io homepage: the headline “The managed lane through operational complexity” above an interactive product preview of a weekly client report run."
              sizes="(max-width: 899px) 100vw, 760px"
            />
          </figure>
          <figure className={`${styles.shot} ${styles.shotSide}`} data-reveal="" style={delay(0.1)}>
            <Image
              src="/work/botlane-io-release.webp"
              width={1920}
              height={1113}
              alt="botlane.io release standard section: twelve release gates in four groups, each marked passed, with an audit drill button."
              sizes="(max-width: 899px) 100vw, 440px"
            />
          </figure>
          <dl className={styles.facts} data-reveal="" style={delay(0.15)}>
            <div>
              <dt>Role</dt>
              <dd>Positioning, interface design, development</dd>
            </div>
            <div>
              <dt>Highlights</dt>
              <dd>Interactive example runs, an expandable 12-gate release standard, an animated mark that honours reduced motion</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <a className={`${styles.visit} arrowHost`} href="https://botlane.io" target="_blank" rel="noopener">
                  Live at botlane.io
                  <Arrow className={styles.visitArrow} />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 02 — Self-initiated studies, labelled as such. */}
      <section className={page.section} aria-labelledby="studies-title">
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            02 / Studio studies
          </span>
          <div>
            <h2 id="studies-title" className={page.h2} data-reveal="">
              Briefs we set ourselves<b>.</b>
            </h2>
            <p className={`${page.body} ${styles.headBody}`} data-reveal="" style={delay(0.05)}>
              We practise on imagined clients. These are concepts, not client work. They show how we think about a brand, and what we’d bring to yours.
            </p>
          </div>
        </div>

        <div className={styles.studies}>
          {STUDIES.map((study, i) => (
            <article key={study.id} className={styles.study} aria-labelledby={`study-${study.id}`}>
              <figure className={styles.studyImage} data-reveal="">
                <Image src={study.image} width={1584} height={992} alt={study.alt} sizes="(max-width: 899px) 100vw, 700px" />
                <figcaption className={styles.studyTag}>Self-initiated study · Not a client project</figcaption>
              </figure>
              <div className={styles.studyCopy}>
                <span className={styles.studyNum} data-reveal="">
                  {String(i + 1).padStart(2, "0")} / {study.field}
                </span>
                <h3 id={`study-${study.id}`} className={styles.studyName} data-reveal="" style={delay(0.05)}>
                  {study.name}
                </h3>
                <p className={styles.studyLabel} data-reveal="" style={delay(0.08)}>
                  The brief
                </p>
                <p className={styles.studyBrief} data-reveal="" style={delay(0.1)}>
                  {study.brief}
                </p>
                <p className={styles.studyLabel} data-reveal="" style={delay(0.12)}>
                  What we chose
                </p>
                <ul className={styles.choices} data-reveal="" style={delay(0.14)}>
                  {study.choices.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 — The site itself, as checkable evidence. */}
      <section className={page.section} aria-labelledby="unpacked-title">
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            03 / This site, unpacked
          </span>
          <div>
            <h2 id="unpacked-title" className={page.h2} data-reveal="">
              You’re already looking at our work<b>.</b>
            </h2>
            <p className={`${page.body} ${styles.headBody}`} data-reveal="" style={delay(0.05)}>
              botlane.studio is the one project anyone can inspect right now. Here’s what went into it.
            </p>
          </div>
        </div>
        <ol className={styles.unpacked}>
          {UNPACKED.map((item, i) => (
            <li key={item.title} data-reveal="" style={delay(i * 0.06)}>
              <span className={styles.unpackedNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 — Sample deliverables, interactive. */}
      <section className={page.section} aria-labelledby="process-title">
        <div className={page.sectionHead}>
          <span className={page.label} data-reveal="">
            04 / How we work
          </span>
          <div>
            <h2 id="process-title" className={page.h2} data-reveal="">
              What you’ll actually receive<b>.</b>
            </h2>
            <p className={`${page.body} ${styles.headBody}`} data-reveal="" style={delay(0.05)}>
              Every project moves through four stages, each with something you can read, question and sign off. These samples use the FORME study, so the details are illustrative.
            </p>
          </div>
        </div>
        <ProcessSamples />
      </section>

      {/* 05 — Founding clients. */}
      <section className={page.section} aria-labelledby="founding-title">
        <div className={styles.founding} data-reveal="">
          <div className={styles.foundingHead}>
            <span className={page.label}>05 / Founding clients</span>
            <h2 id="founding-title" className={page.h2}>
              Be one of our first<b>.</b>
            </h2>
            <p className={page.body}>
              Being new is the honest truth, and it works in your favour. We take on a small number of projects at a time, and each one gets the attention a first project deserves.
            </p>
          </div>
          <div className={styles.foundingSide}>
            <ul className={styles.foundingList}>
              {FOUNDING.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className={styles.foundingCtas}>
              <Link className={`${styles.cta} arrowHost`} href="/contact#inquiry">
                Talk about a founding project
                <Arrow className={styles.ctaArrow} />
              </Link>
              <Link className={styles.ctaQuiet} href="/pricing">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
