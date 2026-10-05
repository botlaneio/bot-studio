import { PLANS } from "../plans";
import { PageHero } from "../page/PageHero";
import { OfferScope, type ScopeItem } from "../page/OfferScope";
import page from "../page/Page.module.css";
import { WebsiteIntro } from "./WebsiteIntro";

const plan = PLANS.find((p) => p.slug === "websites")!;

/* Titles match the Websites plan's includes (plans.ts); each gets a line on
   what it means for the client. */
const scope: ScopeItem[] = [
  { stage: "Plan", title: "Strategy, audience and site structure", detail: "Who the site is for, what it needs to say and which pages do the work." },
  { stage: "Design", title: "Custom responsive design", detail: "Designed for your brand and your visitors, on every screen size." },
  { stage: "Build", title: "Development and launch", detail: "Built on a modern stack, tested, and taken live." },
  { stage: "Edit", title: "Content management where needed", detail: "Update the pages that change often without calling a developer." },
  { stage: "Perform", title: "Performance, accessibility and search basics", detail: "Fast pages, accessible markup and the technical search essentials." },
];

/** The Websites offer: the editorial intro, then what's included. */
export function Websites() {
  return (
    <main className={page.page}>
      <PageHero kicker="// Core offer" title={plan.name} mark="." lede={plan.pitch} />

      <section className={page.section} aria-label="An introduction to how Botlane Studios creates websites">
        <WebsiteIntro />
      </section>

      <OfferScope label="From brief to launch" items={scope} cta="Discuss your website" />
    </main>
  );
}
