import Link from "next/link";
import { PLANS } from "../plans";
import { PageHero } from "../page/PageHero";
import page from "../page/Page.module.css";
import service from "../../app/capabilities/capabilities.module.css";
import { WebsiteIntro } from "./WebsiteIntro";

const plan = PLANS.find((p) => p.slug === "websites")!;

/** The Websites offer: the editorial intro, then what's included. */
export function Websites() {
  return (
    <main className={page.page}>
      <PageHero kicker="// Core offer" title={plan.name} mark="." lede={plan.pitch} />

      <section className={page.section} aria-label="An introduction to how Botlane Studios creates websites">
        <WebsiteIntro />
      </section>

      <section className={page.section} aria-labelledby="website-deliverables">
        <div className={page.sectionHead}>
          <span className={page.label}>From brief to launch</span>
          <div className={service.serviceCopy}>
            <h2 id="website-deliverables" className={page.h2}>
              What you get<b>.</b>
            </h2>
            <ul className={service.deliverables}>
              {plan.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={page.body}>We agree the deliverables, scope and timeline in your written proposal before work starts.</p>
            <Link className={service.serviceCta} href="/contact#inquiry">
              Discuss your website →
            </Link>
            <Link className={service.serviceBack} href="/capabilities">
              Explore all offers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
