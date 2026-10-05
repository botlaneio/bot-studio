import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { PRICE } from "@/lib/pricing";
import { InspireClose } from "../InspireClose";
import { LazyVideo } from "../LazyVideo";
import { Arrow } from "../motion/Arrow";
import { OfferHead as Head } from "../page/OfferHead";
import { OfferScope, type ScopeItem } from "../page/OfferScope";
import page from "../page/Page.module.css";
import offer from "../page/OfferPage.module.css";
import styles from "./AIIntegrations.module.css";

/* AI Integrations is an optional add-on to a Websites or Web Apps project,
   quoted to scope with no published price. Everything on this page restates
   the studio's published position (capabilities.ts, pricing, terms). It
   must not name clients, claim results, promise a model or provider, or
   imply that Lane (the site guide) uses AI: it doesn't.

   The interface panels are illustrations of the kinds of feature we build,
   labelled as such. Tools and models are named by category, never brand. */

const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

const CHIPS = ["Assistants", "Smart search", "Automations", "Lead routing", "Your content", "Your tools"];

/* ───────── Illustrations ───────── */

/** A labelled glass panel used for every interface illustration on the page. */
function Panel({ title, children, className = "", tag = "Illustration" }: { title: string; children: ReactNode; className?: string; tag?: string }) {
  return (
    <div className={`${styles.panel} ${className}`} aria-hidden="true">
      <div className={styles.panelBar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.panelTitle}>{title}</span>
        <span className={styles.panelTag}>{tag}</span>
      </div>
      <div className={styles.panelBody}>{children}</div>
    </div>
  );
}

function ChatMock() {
  return (
    <Panel title="Site assistant">
      <p className={`${styles.msg} ${styles.msgUser}`}>Do you deliver on weekends?</p>
      <p className={`${styles.msg} ${styles.msgBot}`}>
        Yes, Saturday mornings in the city. Sunday deliveries aren’t offered yet.
        <span className={styles.source}>Source · Delivery page</span>
      </p>
      <p className={`${styles.msg} ${styles.msgUser}`}>Can someone call me about a large order?</p>
      <p className={`${styles.msg} ${styles.msgBot}`}>
        Of course. I’ll pass this to the team with your details.
        <span className={styles.handoff}>→ Handed to a person</span>
      </p>
    </Panel>
  );
}

function SearchMock() {
  return (
    <Panel title="Site search">
      <div className={styles.searchBox}>
        <span className={styles.searchIcon} />
        <span>
          gift for a runner under $100<span className={styles.caret} />
        </span>
      </div>
      <p className={styles.searchLabel}>Understood as · running · gift · under $100</p>
      <ul className={styles.results}>
        <li>
          <b>Trail socks, 3-pack</b>
          <span>Products · $38</span>
        </li>
        <li>
          <b>Hydration vest</b>
          <span>Products · $92</span>
        </li>
        <li>
          <b>Choosing your first trail shoe</b>
          <span>Journal · 6 min read</span>
        </li>
      </ul>
    </Panel>
  );
}

const FLOW = [
  { k: "Trigger", t: "Quote request submitted" },
  { k: "Step", t: "Summarise the request" },
  { k: "Step", t: "Add to your CRM" },
  { k: "Step", t: "Notify the right person" },
];

function FlowMock() {
  return (
    <div className={styles.flow} aria-hidden="true">
      {FLOW.map((f, i) => (
        <div key={f.t} className={styles.flowCard} style={{ "--i": i } as CSSProperties}>
          <span className={styles.flowKey}>{f.k}</span>
          <span>{f.t}</span>
          <span className={styles.flowCheck} />
        </div>
      ))}
      <span className={styles.flowTag}>Illustration</span>
    </div>
  );
}

function LeadMock() {
  return (
    <Panel title="New enquiries">
      <ul className={styles.leads}>
        <li>
          <span className={styles.avatar}>JD</span>
          <span>
            <b>Jordan D.</b>
            <em>Web app · Budget shared · Wants a call</em>
          </span>
          <span className={styles.route}>Sales</span>
        </li>
        <li>
          <span className={styles.avatar}>MK</span>
          <span>
            <b>Maya K.</b>
            <em>Existing client · Billing question</em>
          </span>
          <span className={`${styles.route} ${styles.routeAlt}`}>Support</span>
        </li>
        <li>
          <span className={styles.avatar}>RL</span>
          <span>
            <b>Ravi L.</b>
            <em>Website · Exploring options</em>
          </span>
          <span className={`${styles.route} ${styles.routeDim}`}>Nurture</span>
        </li>
      </ul>
    </Panel>
  );
}

/* ───────── Content ───────── */

const rows = [
  {
    id: "assistants",
    lead: "Assistants that know",
    rest: "your content, and say when they don’t",
    text: "An assistant on your site or in your app that answers from your own pages and documents, shows where an answer came from, and hands over to a person when it should.",
    points: ["Answers from the sources you approve", "Clear hand-off to your team"],
    mock: <ChatMock />,
  },
  {
    id: "search",
    lead: "Search that understands",
    rest: "what people mean, not just what they type",
    text: "Visitors describe what they need in their own words and find the right product, page or article, across everything you publish.",
    points: ["Works across products, pages and articles", "Built on your existing content"],
    mock: <SearchMock />,
  },
  {
    id: "automations",
    lead: "Automations that take",
    rest: "the repetitive steps off your team",
    text: "Sorting, summarising and passing work between the tools you already use, inside the site or app we build, with people deciding what matters.",
    points: ["Connected to your tools, as scoped", "Each step visible and checkable"],
    mock: <FlowMock />,
  },
  {
    id: "leads",
    lead: "Enquiries captured,",
    rest: "sorted and sent to the right person",
    text: "Every form and conversation becomes a clear enquiry, labelled by what the person needs and routed to whoever handles it.",
    points: ["Labels you define", "Routing rules agreed in the scope"],
    mock: <LeadMock />,
  },
];

const features = [
  {
    title: "Grounded in your content",
    text: "We connect the assistant or search to the pages, documents and data you approve, and nothing else.",
    visual: (
      <ul className={styles.sources}>
        <li><i className={styles.ok} />Website pages<span>Approved</span></li>
        <li><i className={styles.ok} />Product catalogue<span>Approved</span></li>
        <li><i className={styles.ok} />Help articles<span>Approved</span></li>
        <li><i />Internal notes<span>Not connected</span></li>
      </ul>
    ),
  },
  {
    title: "The right model for the job",
    text: "We choose the model per feature, weighing quality, speed, running cost and where your data may go, and tell you why.",
    visual: (
      <div className={styles.picker}>
        <span className={styles.pickerHead}>Model for site assistant</span>
        <span className={styles.pickerRow}><i />Fast and low cost<em>Short answers</em></span>
        <span className={`${styles.pickerRow} ${styles.pickerOn}`}><i />Most capable<em>Selected</em></span>
        <span className={styles.pickerRow}><i />Private or self-hosted<em>Sensitive data</em></span>
      </div>
    ),
  },
  {
    title: "Connected to your tools",
    text: "Integrations with the systems you already rely on are reviewed in discovery and agreed in the scope.",
    visual: (
      <div className={styles.orbit}>
        <span className={styles.orbitCore}>Your site<br />or app</span>
        {["CRM", "Email", "Calendar", "Helpdesk", "Sheets", "Payments"].map((t, i) => (
          <span key={t} className={styles.orbitChip} style={{ "--a": `${i * 60}deg` } as CSSProperties}>
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "A person when it matters",
    text: "You decide where AI stops: what it may answer, what it passes to your team, and what it never does.",
    visual: (
      <div className={styles.rules}>
        <span><b>Answers</b>Opening hours, pricing ranges, services</span>
        <span><b>Hands over</b>Complaints, refunds, custom quotes</span>
        <span><b>Never</b>Legal or medical advice, payments</span>
      </div>
    ),
  },
];

/* Titles follow the AI Integrations capability includes (capabilities.ts). */
const scope: ScopeItem[] = [
  { stage: "Define", title: "Use case and success measure", detail: "One job the feature must do well, who it serves and how we will judge it, agreed first." },
  { stage: "Ground", title: "Data access, agreed in writing", detail: "Which content and systems it may use, and which it may not." },
  { stage: "Design", title: "Interface and hand-off design", detail: "How people meet it, how it shows its sources, and how it passes to your team." },
  { stage: "Build", title: "Integration into your site or app", detail: "Built into the product we design and develop, connected to your tools as scoped." },
  { stage: "Hand over", title: "Testing, guardrails and handover", detail: "Tested against real questions before release, then handed over with notes for your team." },
];

const steps = [
  {
    title: "Agree the job",
    happens: "We pick one task where AI clearly helps, and say plainly when a simpler feature would do better.",
    receive: "A written use case, data access and scope, then a quote.",
    need: "Examples of the questions or work it should handle.",
  },
  {
    title: "Prototype on your content",
    happens: "A working prototype on a sample of your real content, so you judge it on your own material.",
    receive: "A prototype to try, with its answers and gaps visible.",
    need: "The content it should draw on, and someone to test it.",
  },
  {
    title: "Build it in",
    happens: "We build the feature into your website or web app, with its interface, guardrails and hand-offs.",
    receive: "A working version inside the product to review.",
    need: "Access to the tools it connects to, and feedback.",
  },
  {
    title: "Launch and review",
    happens: "Tested against real questions, released, then reviewed once people have used it.",
    receive: "The live feature and notes on how to manage it.",
    need: "Final sign-off, and the accounts it will run under.",
  },
];

const guardrails = [
  { title: "Clear it’s AI", text: "People can always tell when they’re talking to an assistant, and how to reach a person." },
  { title: "Access you agree", text: "It uses only the content and systems agreed in your scope, nothing more." },
  { title: "Tested before release", text: "Checked against real questions and edge cases before your customers see it." },
];

const pairs = [
  { title: "Websites", price: `From ${PRICE.websitesFrom}`, text: "An assistant or smart search inside a new marketing website.", href: "/capabilities/websites" },
  { title: "Web Apps", price: `From ${PRICE.webAppsFrom}`, text: "Automations and assistants built into a portal, tool or product.", href: "/capabilities/web-apps" },
  { title: "Ongoing care", price: "Quoted after launch", text: "Reviewing answers, updating content and tuning the feature once it is live.", href: "/contact#inquiry" },
];

const questions = [
  { q: "Is AI included in the website or web app price?", a: "No. AI integrations are an optional add-on, scoped and quoted separately from the core Websites or Web Apps build." },
  { q: "Can you add AI to a site you didn’t build?", a: "Our published offer adds AI to websites and web apps we design and build. If you have an existing product, tell us about it and we will say honestly what is possible." },
  { q: "Will it make things up?", a: "Any AI model can be wrong. We reduce that by grounding it in your approved content, showing sources, testing it against real questions and designing a clear hand-off to a person." },
  { q: "Which AI model do you use?", a: "It depends on the feature. We choose per project, weighing quality, speed, running cost and data requirements, and explain the choice in the proposal." },
  { q: "What about running costs?", a: "AI features usually carry usage costs from the model provider. Third-party costs are set out in your proposal so there are no surprises." },
  { q: "What happens to our data?", a: "The feature uses only the content and systems agreed in the scope. Data handling and the providers involved are agreed in writing before the build." },
  { q: "Do we actually need AI?", a: "Not always. Sometimes good navigation, search or a clear form does the job better, and we will tell you when that is the case." },
  { q: "Is the guide on this site AI?", a: "No. Lane answers from our published information without an AI model. For a short list of common questions, that was the right call." },
];

/** The AI Integrations page: an optional add-on, laid out as a product page
 *  (centred hero over the reel, alternating feature rows, a tilted overview,
 *  a feature grid), then the studio's usual scope, process and FAQ. */
export function AIIntegrations() {
  return (
    <main className={page.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="ai-title">
        <p className={`${page.kicker} ${styles.kicker}`} data-reveal="">
          {"// Optional add-on"}
        </p>
        <h1 id="ai-title" className={styles.title} data-reveal="" style={delay(0.05)}>
          AI, built into your website or app<b>.</b>
        </h1>
        <p className={styles.lede} data-reveal="" style={delay(0.1)}>
          Assistants, search and automations, designed and built by the team making your site or app, where they serve a clear purpose.
        </p>
        <div className={styles.heroActions} data-reveal="" style={delay(0.15)}>
          <Link className={`${styles.cta} arrowHost`} href="/contact#inquiry">
            Discuss AI for your project
            <Arrow className={styles.arrow} />
          </Link>
          <Link className={styles.ghost} href="/pricing">
            See pricing
          </Link>
        </div>

        <div className={styles.stage} data-reveal="" style={delay(0.2)}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.reel}>
            {/* 10 s studio-made loop: Lane's lens takes a visitor's question, finds the
                source in the business's content and draws the answer, then folds back.
                Source: brand-film/ai-hero (render with render.py). */}
            <LazyVideo className={styles.reelVideo} src="/ai/ai-hero-loop.mp4" poster="/ai/ai-hero-loop-poster.jpg" />
          </div>
          <div className={`${styles.float} ${styles.floatA}`} aria-hidden="true">
            <span className={styles.floatKey}>Assistant</span>
            <p>Yes, Saturday mornings in the city.</p>
            <span className={styles.source}>Source · Delivery page</span>
          </div>
          <div className={`${styles.float} ${styles.floatB}`} aria-hidden="true">
            <span className={styles.floatKey}>Search</span>
            <p>“gift for a runner under $100”</p>
            <span className={styles.floatMeta}>3 results · products and articles</span>
          </div>
          <div className={`${styles.float} ${styles.floatC}`} aria-hidden="true">
            <span className={styles.floatKey}>Routing</span>
            <p>New enquiry → Sales</p>
            <span className={styles.floatMeta}>Web app · Budget shared</span>
          </div>
        </div>

        <ul className={styles.chips} aria-label="What we integrate">
          {CHIPS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {/* Alternating feature rows */}
      <section className={`${page.section} ${styles.rows}`} aria-label="What AI can do inside your website or app">
        {rows.map((r, i) => (
          <article key={r.id} className={styles.row} data-flip={i % 2 === 1 || undefined}>
            <div className={styles.rowCopy} data-reveal="">
              <span className={page.cardNum}>{String(i + 1).padStart(2, "0")}</span>
              <h2 className={styles.rowTitle}>
                {r.lead} <span>{r.rest}</span>
              </h2>
              <p className={styles.rowText}>{r.text}</p>
              <ul className={styles.points}>
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.rowVisual} data-reveal="" style={delay(0.08)}>
              {r.mock}
            </div>
          </article>
        ))}
      </section>

      {/* Statement */}
      <section className={`${page.section} ${styles.statement}`} aria-labelledby="stance-title">
        <h2 id="stance-title" className={styles.statementTitle} data-reveal="">
          AI where it earns its place<b>.</b> <span>Not everywhere.</span>
        </h2>
        <div className={styles.statementCopy} data-reveal="" style={delay(0.08)}>
          <p>
            A clear page, a good form or a well-organised menu often does more than a chatbot. We start from the job your visitors and team need done,
            and add AI only where it does that job better.
          </p>
          <p>
            <strong>Even the guide on this site, Lane, answers without an AI model,</strong> because a short list of published answers serves our visitors
            best today.
          </p>
        </div>
      </section>

      {/* Tilted overview */}
      <section className={`${page.section} ${styles.overview}`} aria-labelledby="overview-title">
        <div className={styles.overviewHead}>
          <h2 id="overview-title" className={styles.overviewTitle} data-reveal="">
            Built into the product<b>.</b> Not bolted on.
          </h2>
          <p className={styles.overviewText} data-reveal="" style={delay(0.06)}>
            The same team designs the interface, writes the content rules and builds the integration, so the AI feels like part of your site, and your
            team can see and manage what it does.
          </p>
        </div>
        <div className={styles.tiltWrap} data-reveal="" style={delay(0.1)}>
          <div className={styles.tilt} aria-hidden="true">
            <aside className={styles.dashNav}>
              <span className={styles.dashBrand}>Your business</span>
              {["Overview", "Conversations", "Sources", "Hand-offs", "Settings"].map((n, i) => (
                <span key={n} className={i === 1 ? styles.dashOn : undefined}>
                  {n}
                </span>
              ))}
            </aside>
            <div className={styles.dashList}>
              <span className={styles.dashHead}>Conversations</span>
              {[
                ["Weekend delivery", "Answered · Delivery page"],
                ["Large order call", "Handed to Sales"],
                ["Return window", "Answered · Returns policy"],
                ["Custom quote", "Handed to Sales"],
                ["Gift wrapping", "Answered · FAQ"],
              ].map(([a, b], i) => (
                <span key={a} className={`${styles.dashItem} ${i === 1 ? styles.dashItemOn : ""}`}>
                  <b>{a}</b>
                  <em>{b}</em>
                </span>
              ))}
            </div>
            <div className={styles.dashDetail}>
              <span className={styles.dashHead}>Large order call</span>
              <p className={`${styles.msg} ${styles.msgUser}`}>Can someone call me about a large order?</p>
              <p className={`${styles.msg} ${styles.msgBot}`}>Of course. I’ll pass this to the team with your details.</p>
              <div className={styles.dashCard}>
                <span>Hand-off</span>
                <b>Sales · Call requested</b>
                <em>Summary sent to your inbox</em>
              </div>
            </div>
            <span className={styles.tiltTag}>Illustration</span>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className={page.section} aria-labelledby="grid-title">
        <Head id="grid-title" label="How we build it" title="Grounded in your business, within limits you set" />
        <div className={styles.grid}>
          {features.map((f, i) => (
            <article key={f.title} className={styles.feature} data-reveal="" style={delay(i * 0.06)}>
              <div className={styles.featureVisual} aria-hidden="true">
                {f.visual}
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureText}>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <OfferScope
        label="From idea to launch"
        items={scope}
        cta="Discuss AI for your project"
        intro="Designed and built by the same team as your website or app, and quoted separately from the core build."
      />

      {/* Process */}
      <section className={page.section} aria-labelledby="steps-title">
        <Head id="steps-title" label="How a project runs" title="Four stages, judged on your own content" body="Each stage ends with something you can try and question before the next begins." />
        <div className={offer.stepsHead} aria-hidden="true">
          <span />
          <span>What happens</span>
          <span>You receive</span>
          <span>We need from you</span>
        </div>
        <ol className={offer.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={offer.step} data-reveal="" style={delay(i * 0.05)}>
              <div className={offer.stepName}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
              </div>
              <p>
                <em>What happens</em>
                {s.happens}
              </p>
              <p>
                <em>You receive</em>
                {s.receive}
              </p>
              <p>
                <em>We need from you</em>
                {s.need}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Guardrails trio */}
      <section className={`${page.section} ${styles.trio}`} aria-labelledby="trust-title">
        <h2 id="trust-title" className={styles.trioTitle} data-reveal="">
          Responsible by design<b>.</b>
        </h2>
        <div className={styles.trioGrid}>
          {guardrails.map((g, i) => (
            <article key={g.title} className={styles.trioItem} data-reveal="" style={delay(i * 0.06)}>
              <span className={styles.trioIcon} aria-hidden="true">
                <TrioIcon index={i} />
              </span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pairs */}
      <section className={page.section} aria-labelledby="pairs-title">
        <Head id="pairs-title" label="Add it to" title="Part of a Websites or Web Apps project" body="AI integrations are quoted to scope, alongside the core build." />
        <ul className={offer.addons}>
          {pairs.map((a) => (
            <li key={a.title} data-reveal="">
              <Link href={a.href} className={offer.addon}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className={offer.addonPrice}>{a.price}</span>
                <span className={offer.addonArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className={page.section} aria-labelledby="faq-title">
        <Head id="faq-title" label="Good to know" title="Questions we hear most" />
        <div className={offer.faq}>
          {questions.map((f) => (
            <details key={f.q} className={offer.qa} data-reveal="">
              <summary>
                {f.q}
                <span className={offer.plus} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <InspireClose heading={["Let’s find", "where AI", "earns its place"]} ctaLabel="Discuss AI for your project" />
    </main>
  );
}

function TrioIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === 0)
    return (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path {...common} d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3z" />
        <path {...common} d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15z" />
      </svg>
    );
  if (index === 1)
    return (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <rect {...common} x="5" y="10.5" width="14" height="10" rx="2.5" />
        <path {...common} d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      </svg>
    );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path {...common} d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6l7-3z" />
      <path {...common} d="M8.8 12.2l2.3 2.3 4.3-4.6" />
    </svg>
  );
}
