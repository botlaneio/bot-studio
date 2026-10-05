import Link from "next/link";
import { NAV_CAPABILITIES, capabilityHref } from "@/components/capabilities";

export type Doc = {
  slug: string;
  title: string;
  description: string;
  summary: string;
};

/** Order is the order of the index. */
export const DOCS: Doc[] = [
  {
    slug: "company-overview",
    title: "Company overview",
    description: "Botlane Studios is the design studio of BotLane LLC, a US company registered in Wyoming.",
    summary: "The design studio of BotLane LLC. Websites and web apps for US businesses.",
  },
  {
    slug: "mission-and-vision",
    title: "Mission and vision",
    description: "Botlane Studios designs and builds websites and web apps, with craft, clarity, and performance.",
    summary: "Design and build websites and web apps, with craft, clarity, and performance.",
  },
  {
    slug: "services",
    title: "Services",
    description: "Our two core offers, included disciplines and optional add-ons.",
    summary: "Websites and Web Apps, with strategy, design and development included.",
  },
  {
    slug: "team",
    title: "Team",
    description: "Botlane Studios is a small studio of BotLane LLC.",
    summary: "A small studio of BotLane LLC.",
  },
  {
    slug: "how-we-work",
    title: "How we work",
    description: "Four steps, from first call to launch: Discovery, Strategy, Design and Build, Launch and Grow.",
    summary: "Four steps, from first call to launch.",
  },
  {
    slug: "policies",
    title: "Policies",
    description: "Where to read the Botlane Studios privacy policy and terms of use.",
    summary: "The privacy policy and the terms of use already published on this site.",
  },
];

export function docBySlug(slug: string) {
  return DOCS.find((doc) => doc.slug === slug);
}

/** The four steps on the About page and in the homepage "How we build" section. */
const STEPS = [
  { title: "Discovery", text: "We start by listening. Goals, challenges and vision, mapped out before anything is drawn." },
  { title: "Strategy", text: "Positioning, priorities and structure. Every piece gets a place before it gets a look." },
  { title: "Design & Build", text: "Visuals, motion and code come together, with sharp attention to detail." },
  { title: "Launch & Grow", text: "Delivery is the beginning. We measure, refine and keep it performing." },
];

export function DocBody({ slug }: { slug: string }) {
  switch (slug) {
    case "company-overview":
      return <CompanyOverview />;
    case "mission-and-vision":
      return <Mission />;
    case "services":
      return <Services />;
    case "team":
      return <Team />;
    case "how-we-work":
      return <HowWeWork />;
    case "policies":
      return <Policies />;
    default:
      return null;
  }
}

function CompanyOverview() {
  return (
    <>
      <p>Botlane Studios is the design studio of BotLane LLC. It designs and builds websites and web apps.</p>
      <p>
        Registered address:
        <br />
        BotLane LLC
        <br />
        30 N Gould St, Ste R
        <br />
        Sheridan, WY 82801
      </p>
      <p>
        <a href="mailto:project@botlane.studio">project@botlane.studio</a>
        <br />
        <a href="tel:+13072185175">+1 307 218 5175</a>
      </p>
      <p>
        Studio site: <a href="https://botlane.studio">botlane.studio</a>
        <br />
        Part of <a href="https://botlane.io">botlane.io</a>
      </p>
    </>
  );
}

function Mission() {
  return <p>Botlane Studios designs and builds websites and web apps, with craft, clarity, and performance.</p>;
}

function Services() {
  return (
    <>
      <p>
        Our core offers are <Link href="/capabilities">Websites and Web Apps</Link>. Strategy, design and development are included in the agreed project scope. Brand identity (naming, mark, and visual system), SEO/discoverability and AI integrations are optional add-ons, quoted separately.
      </p>
      <ul>
        {NAV_CAPABILITIES.map((c) => (
          <li key={c.slug}>
            <Link href={capabilityHref(c.slug)}>{c.title}</Link>. {c.line}.
          </li>
        ))}
      </ul>
    </>
  );
}

function Team() {
  return (
    <>
      <p>Botlane Studios is a small studio of BotLane LLC.</p>
      <p>
        <a href="mailto:project@botlane.studio">project@botlane.studio</a>
        <br />
        <a href="tel:+13072185175">+1 307 218 5175</a>
      </p>
      <p>
        Registered address:
        <br />
        BotLane LLC
        <br />
        30 N Gould St, Ste R
        <br />
        Sheridan, WY 82801
      </p>
    </>
  );
}

function HowWeWork() {
  return (
    <>
      <p>
        Four steps, from first call to launch, as written on the <Link href="/about">About</Link> page. The homepage section{" "}
        <Link href="/#process">How we build</Link> uses the same four names.
      </p>
      {STEPS.map((step) => (
        <section key={step.title}>
          <h2>{step.title}</h2>
          <p>{step.text}</p>
        </section>
      ))}
    </>
  );
}

function Policies() {
  return (
    <>
      <p>Two policy pages are already on this site. This note only points at them and summarises what they say.</p>

      <h2>Privacy policy</h2>
      <p>
        Full page: <Link href="/privacy">Privacy policy</Link>. Last updated 5 October 2026.
      </p>
      <p>
        It explains how BotLane LLC (&ldquo;Botlane Studios&rdquo;) handles personal information when you visit this website or get in
        touch. The company address is 30 N Gould St, Ste R, Sheridan, WY 82801. Contact is{" "}
        <a href="mailto:project@botlane.studio">project@botlane.studio</a> or +1 307 218 5175.
      </p>
      <ul>
        <li>
          When you contact the studio by email, phone or text message: your name, contact details and anything you choose to tell them about
          your project.
        </li>
        <li>
          When you visit: Cloudflare processes standard technical data such as your IP address, browser type and the pages requested, to
          deliver and protect the site.
        </li>
        <li>
          Contact form messages (name, company, email and message) are delivered to the studio inbox by Resend, an email delivery
          provider, and are not stored on the website.
        </li>
        <li>The site does not use advertising or tracking cookies, and does not currently run analytics.</li>
        <li>
          Information is used to reply to an enquiry and to discuss, quote for and deliver a project; to keep the website secure and
          working; and to meet legal, tax and accounting obligations. It is not sold, and it is not used for advertising.
        </li>
        <li>
          It is shared only with the service providers needed to run the studio, such as Cloudflare and email and messaging services
          (including Quo, the studio&apos;s phone and text message provider, when you call or text), or if the law requires it.
        </li>
        <li>
          Enquiry and project correspondence is kept for as long as needed to work with you and to meet legal obligations, and then
          deleted.
        </li>
        <li>
          You can ask to access, correct or delete the personal information held about you, or to stop being contacted, by emailing{" "}
          <a href="mailto:project@botlane.studio">project@botlane.studio</a>. Further rights under local law will be honoured.
        </li>
        <li>Links to other sites, such as botlane.io, follow those sites&apos; own privacy policies.</li>
      </ul>

      <h2>Terms of use</h2>
      <p>
        Full page: <Link href="/terms">Terms of use</Link>. Last updated 5 October 2026.
      </p>
      <p>
        These terms govern use of this website, operated by BotLane LLC at the same Sheridan address. By using the site you agree to them.
      </p>
      <ul>
        <li>
          You may browse the site for your own information. Don&apos;t misuse it: no attempts to disrupt it, to access it without
          authorisation, or to copy it in bulk.
        </li>
        <li>
          The site&apos;s design, text, graphics, code and the Botlane Studios name and marks belong to BotLane LLC or its licensors. Some
          imagery is used under licence and does not depict work for clients. You may not reproduce or reuse site content without written
          permission.
        </li>
        <li>
          Information on the site, including descriptions of services and plans, is general and is not an offer. Any project is governed by
          a separate written proposal or agreement, which takes precedence.
        </li>
        <li>The site links to websites the studio doesn&apos;t control, such as botlane.io, and is not responsible for them.</li>
        <li>The site is provided &ldquo;as is&rdquo;, without warranties, to the extent the law allows.</li>
        <li>
          To the extent the law allows, BotLane LLC is not liable for indirect or consequential loss arising from use of this website.
        </li>
        <li>The terms are governed by the laws of the State of Wyoming, United States.</li>
        <li>
          Questions: <a href="mailto:project@botlane.studio">project@botlane.studio</a>. If the terms change, the date at the top of that page is
          updated.
        </li>
      </ul>
    </>
  );
}
