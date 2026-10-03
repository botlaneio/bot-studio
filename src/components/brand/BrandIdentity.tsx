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
            <figure><Image src="/brand-identity/forme-collection.webp" width={1584} height={992} alt="FORME's bone, black and oxblood identity across a campaign poster, packaging, garment tag and mobile storefront." sizes="(max-width: 760px) 100vw, (max-width: 1440px) 75vw, 1080px" /></figure>
          </div>
          <div className={styles.collection}>
            <div className={styles.collectionLabel}><h3>02 / NORTHLINE</h3><p>Business consultancy identity</p></div>
            <figure><Image src="/brand-identity/northline-collection.webp" width={1584} height={992} alt="NORTHLINE's navy, silver and white identity across office signage, proposals, business cards and a service website." sizes="(max-width: 760px) 100vw, (max-width: 1440px) 75vw, 1080px" /></figure>
          </div>
        </section>
        <section className={styles.deliverables} aria-labelledby="deliverables-title">
          <div className={styles.threeColumnHead}><p className={styles.eyebrow}>02 / Deliverables</p><h2 id="deliverables-title">What we shape.</h2><p className={styles.body}>A complete identity system, built for clarity, consistency and character.</p></div>
          <ol className={styles.deliverableList}>{deliverables.map(([title, copy], index) => (
            <li key={title}><span className={styles.number} aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p className={styles.body}>{copy}</p></li>
          ))}</ol>
        </section>
        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.threeColumnHead}><p className={styles.eyebrow}>03 / Our process</p><h2 id="process-title">From discovery to distinction.</h2><p className={styles.body}>A focused, collaborative process to create an identity that lasts.</p></div>
          <ol className={styles.processList}>{process.map(([title, copy], index) => (
            <li key={title}><span className={styles.eyebrow} aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p className={styles.body}>{copy}</p></li>
          ))}</ol>
          <p className={styles.scope}>Scope, timeline and revision rounds are agreed before work begins.</p>
        </section>
        <section className={styles.close} aria-labelledby="brand-close-title">
          <div><p className={styles.eyebrow}>04 / Let’s create</p><h2 id="brand-close-title">Make your mark.</h2></div>
          <Link className={`${styles.cta} arrowHost`} href="/contact#inquiry">Discuss your brand <Arrow className={styles.arrow} /></Link>
        </section>
      </div>
    </main>
  );
}