import Image from "next/image";
import Link from "next/link";
import { Arrow } from "../motion/Arrow";
import styles from "./IdentityAtelier.module.css";

const deliverables = [
  ["Naming & verbal identity", "Distinctive names and messaging that capture what you stand for and how you speak to the world."],
  ["Logo & mark system", "A considered family of marks that holds its character, from the smallest screen to the largest sign."],
  ["Colour, type & art direction", "A cohesive visual language, from colour and typography to imagery and composition."],
  ["Brand guidelines", "Clear, practical guidance and organised assets your team can use with confidence."],
];
const process = [
  ["Discover", "We learn about your business, audience and ambitions."],
  ["Define", "We agree the positioning, voice and creative direction."],
  ["Design", "We craft your identity and refine it across real applications."],
  ["Deliver", "We bring everything together in useful assets and practical guidelines."],
];
const useCases = [
  ["Launch with purpose.", "Starting something new? Give your business a clear voice and a distinctive identity from day one."],
  ["Grow into who you are.", "Outgrown your current look? Refresh your identity while keeping the recognition you have earned."],
  ["Bring it all together.", "Different teams, different touchpoints? Create one coherent system for everything your brand puts into the world."],
];
const questions = [
  ["Can you refresh our existing identity?", "Yes. We start by understanding what already works, what your audience recognises and what needs to change. That helps us decide together whether you need a focused refresh or a broader redesign."],
  ["What files and guidelines will we receive?", "Your proposal lists the exact handover. For an identity system, this can include final logo variants in vector and web formats, colour specifications, typography guidance and brand guidelines. Editable templates and application files are included where agreed in the scope."],
  ["How much does a branding project cost?", "Every project is priced to its scope. After an initial conversation, we provide a fixed quote with the deliverables, revision rounds and timeline in writing before work starts."],
  ["How long will the project take?", "A focused refresh and a complete identity need different timelines. We agree a schedule around the scope, your launch date and feedback milestones before starting. If you have a deadline, share it in your first enquiry."],
  ["How do feedback and revisions work?", "We review the direction together at agreed milestones. Your proposal sets out the revision rounds, and we ask for consolidated feedback from your team. If the brief changes or you need additional work, we agree the impact on cost and timing first."],
  ["Are packaging, presentations and a website included?", "These applications show how an identity can extend into the real world. We agree which ones your business needs and list them in your proposal. Packaging design, presentation templates and website design or development are separately scoped unless explicitly included."],
  ["What do you need from us to start?", "Tell us what your business does, who you want to reach and what you would like to change. Share any existing brand assets, useful references and a target launch date. We use the first conversation to clarify the brief and next steps."],
];

export function BrandIdentity() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="brand-title">
          <div className={styles.heroCopy}>
            <Link className={styles.eyebrow} href="/capabilities">{"// 01 — Branding & Identity"}</Link>
            <h1 id="brand-title">Be<br />unmistakably<br />you.</h1>
            <p className={styles.lead}>A name, a mark and a visual language that make every touchpoint feel like you.</p>
            <Link className={`${styles.cta} arrowHost`} href="/contact#inquiry">Discuss your brand <Arrow className={styles.arrow} /></Link>
          </div>
          <figure className={styles.heroArt}>
            <Image src="/brand-identity/forme-hero.webp" width={1536} height={1024} alt="FORME identity on a bone shopping bag, black knitwear and an oxblood embossed tag." sizes="(max-width: 760px) 100vw, 62vw" loading="eager" fetchPriority="high" />
            <figcaption>FORME / Fashion identity</figcaption>
          </figure>
        </section>
        <section className={styles.foundation} aria-labelledby="foundation-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>01 / The foundation</p>
            <div><h2 id="foundation-title">One identity. Every expression.</h2><p className={styles.body}>From the first impression to the everyday details, we build a system your team can use.</p></div>
          </div>
          <div className={styles.collection}>
            <div className={styles.collectionLabel}><h3>01 / FORME</h3><p>Fashion identity</p></div>
            <figure><Image src="/brand-identity/forme-collection.webp" width={1584} height={992} alt="FORME's bone, black and oxblood identity across a campaign poster, packaging, garment tag and mobile storefront." sizes="(max-width: 760px) 100vw, 60vw" /><figcaption className={styles.collectionNote}>Expressive typography, tactile materials and an oxblood accent give FORME a recognisable voice, from the garment tag to the storefront.</figcaption></figure>
          </div>
          <div className={styles.collection}>
            <div className={styles.collectionLabel}><h3>02 / NORTHLINE</h3><p>Business consultancy identity</p></div>
            <figure><Image src="/brand-identity/northline-collection.webp" width={1584} height={992} alt="NORTHLINE's navy, silver and white identity across office signage, proposals, business cards and a service website." sizes="(max-width: 760px) 100vw, 60vw" /><figcaption className={styles.collectionNote}>A precise mark, restrained palette and clear hierarchy give NORTHLINE a consistent presence across proposals, presentations and digital touchpoints.</figcaption></figure>
          </div>
        </section>
        <section className={styles.fit} aria-labelledby="fit-title">
          <div className={styles.sectionHead}><p className={styles.eyebrow}>02 / Your next chapter</p><div><h2 id="fit-title">Built for your next chapter.</h2><p className={styles.body}>A new beginning, a considered refresh or a more consistent way forward.</p></div></div>
          <ul className={styles.fitList}>{useCases.map(([title, copy]) => (
            <li key={title}><h3>{title}</h3><p className={styles.body}>{copy}</p></li>
          ))}</ul>
        </section>
        <section className={styles.deliverables} aria-labelledby="deliverables-title">
          <div className={styles.threeColumnHead}><p className={styles.eyebrow}>03 / Deliverables</p><h2 id="deliverables-title">What we shape.</h2><p className={styles.body}>A complete identity system, built for clarity, consistency and character.</p></div>
          <ol className={styles.deliverableList}>{deliverables.map(([title, copy], index) => (
            <li key={title}><span className={styles.number} aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p className={styles.body}>{copy}</p></li>
          ))}</ol>
        </section>
        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.threeColumnHead}><p className={styles.eyebrow}>04 / Our process</p><h2 id="process-title">From discovery to distinction.</h2><p className={styles.body}>A focused, collaborative process to create an identity that lasts.</p></div>
          <ol className={styles.processList}>{process.map(([title, copy], index) => (
            <li key={title}><span className={styles.eyebrow} aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p className={styles.body}>{copy}</p></li>
          ))}</ol>
          <p className={styles.scope}>Scope, timeline and revision rounds are agreed before work begins.</p>
        </section>
        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionHead}><p className={styles.eyebrow}>05 / Good to know</p><div><h2 id="faq-title">Before we begin.</h2><p className={styles.body}>The practical details, so you know what to expect.</p></div></div>
          <div className={styles.questions}>{questions.map(([question, answer]) => (
            <details key={question} className={styles.question}><summary>{question}<span className={styles.plus} aria-hidden="true" /></summary><p className={styles.body}>{answer}</p></details>
          ))}</div>
        </section>
        <section className={styles.close} aria-labelledby="brand-close-title">
          <div><p className={styles.eyebrow}>06 / Let’s create</p><h2 id="brand-close-title">Make your mark.</h2></div>
          <div className={styles.nextStep}><p className={styles.body}>Tell us where your brand is today and where you want to take it. We’ll discuss the brief, then outline the scope, cost and timeline.</p><Link className={`${styles.cta} arrowHost`} href="/contact#inquiry">Discuss your brand <Arrow className={styles.arrow} /></Link></div>
        </section>
      </div>
    </main>
  );
}
