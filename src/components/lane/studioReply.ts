import { PRICE } from "../../lib/pricing";
import { CAPABILITIES, NAV_CAPABILITIES } from "../capabilities";

/* Lane's answers. Local guidance from published content only: never invent
   prices, results or timelines, never claim a handoff, booking or sent
   inquiry, and never present the registered address as an office.

   laneReply returns the answer and an intent; nextSteps turns the intent
   into follow-up actions the panel can show (a view in the large window,
   or a link everywhere). studioReply keeps the original text-only API. */

export type LaneView = "ask" | "brief" | "prices" | "work" | "contact";
export type LaneAction = { label: string; href: string; view?: LaneView; ask?: string };

export type Intent =
  | "ai-objection"
  | "greeting"
  | "thanks"
  | "who"
  | "existing"
  | "redesign"
  | "contact"
  | "work"
  | "location"
  | "start"
  | "ecommerce"
  | "care"
  | "included"
  | "process"
  | "price"
  | "addons"
  | "services"
  | "brand"
  | "capability:websites"
  | "capability:web-apps"
  | "capability"
  | "time"
  | "call"
  | "fallback";

export const STUDIO_EMAIL = "project@botlane.studio";
export const STUDIO_PHONE = "+1 307 218 5175";
export const STUDIO_PHONE_HREF = "+13072185175";

export function laneReply(message: string): { text: string; intent: Intent } {
  const text = message.toLowerCase().trim();
  const short = text.length <= 40;

  // "Why pay this when AI can build it?" Checked first, so it isn't read as
  // a plain price question or a request for the AI add-on.
  if (/\bai\b|chatgpt|artificial intelligence/.test(text) && /why|instead|cheaper|expensive|worth|pay|just use|myself|build it|make it/.test(text)) {
    return {
      intent: "ai-objection",
      text: "Fair question. AI can now produce a page in minutes, and for some needs that's enough.\n\nWhat a Botlane project pays for is everything around the page: deciding who your site or app is for and what it must say, design that doesn't look like everyone else's, speed, accessibility and search done properly, and a team accountable for the result.\n\nOnce the project is paid in full, the design and code are yours. The ranges are on the pricing page, or use ‘Talk to the team’ below to compare options for your project.",
    };
  }
  if (short && /^(hi|hey|hello|hiya|howdy|good (morning|afternoon|evening))\b/.test(text)) {
    return {
      intent: "greeting",
      text: "Hi, I'm Lane, the studio guide. I can walk you through Websites and Web Apps, share the published price ranges, show you our work, or help you start a project.",
    };
  }
  if (short && /^(thanks|thank you|thx|cheers|great,? thanks|ok,? thanks)\b/.test(text)) {
    return { intent: "thanks", text: "You're welcome. When you're ready, ‘Start a project’ sends the team a short brief, and they'll reply by email." };
  }
  if (/who are you|what are you|are you (a |an )?(bot|robot|ai|human|real|person)|is this (a )?(bot|ai|human)/.test(text)) {
    return {
      intent: "who",
      text: "I'm Lane, Botlane Studios' site guide. I answer from the studio's published information. I'm not an AI model and not a person, so for anything specific to your project, use ‘Talk to the team’.",
    };
  }
  if (/existing (client|customer|project|account)|already (a |working with )?(client|customer|you)|i am (a |an )?(current |existing )?client|support (request|ticket)|\bbilling\b|\binvoice\b/.test(text)) {
    return {
      intent: "existing",
      text: `For an existing project, contact ${STUDIO_EMAIL} with your project name and what you need. You can also use ‘Talk to the team’ below. This guide cannot access project records or create support tickets.`,
    };
  }
  if (/redesign|rebuild|re-?do|refresh|revamp|existing (site|website)|current (site|website)|old (site|website)|my (site|website) (is|looks)/.test(text)) {
    return {
      intent: "redesign",
      text: `Yes. A redesign is scoped as a Websites project: we look at what you have, keep what works, and rebuild the rest around your audience and goals.\n\nWebsites start from ${PRICE.websitesFrom}, and every project is quoted to its agreed scope.`,
    };
  }
  if (/e-?mail|phone|number|text you|call you|reach (you|the team)|contact details/.test(text)) {
    return {
      intent: "contact",
      text: `Email ${STUDIO_EMAIL}, or call or text ${STUDIO_PHONE}. You can also send a project inquiry with ‘Talk to the team’ below.`,
    };
  }
  if (/portfolio|examples?|case stud|your (work|projects)|see (your |some )?work|previous (work|projects)|past (work|projects)|worked with|your clients|client list|references/.test(text)) {
    return {
      intent: "work",
      text: "We're a new studio, so there are no client case studies to show yet, and we won't dress anything up as one.\n\nThe Work page shows botlane.io, built in-house; two clearly labelled self-initiated studies; and how this site itself was made.",
    };
  }
  if (/where are you|based|located|location|your office|time ?zone|which country/.test(text)) {
    return {
      intent: "location",
      text: "Botlane Studios is the studio of BotLane LLC, a US company registered in Wyoming, and works with businesses across the US.",
    };
  }
  if (/start(ing)? (a |my |our )?(new )?project|get started|hire (you|the studio)|work with you|kick ?off|ready to (start|begin)|let'?s (start|begin|build)/.test(text)) {
    return {
      intent: "start",
      text: "Good to hear. ‘Start a project’ asks four quick questions and sends the team your brief by email, or use ‘Talk to the team’ for the full contact form. You'll get a written quote before anything starts.",
    };
  }
  if (/e-?commerce|shopify|woocommerce|online (store|shop)|sell online|selling online|\bstore\b/.test(text)) {
    return {
      intent: "ecommerce",
      text: "Online selling isn't a separate published offer. A store or ordering flow is scoped as a Websites or Web Apps project, depending on what it needs to do. Tell the team which platform you use or prefer, and they'll say honestly what fits.",
    };
  }
  if (/mainten|ongoing|after launch|post-?launch|retainer|keep (it|the site) updated|updates after|care plan/.test(text)) {
    return {
      intent: "care",
      text: "Ongoing care (design, development and upkeep after launch) is quoted separately once your site or app is live, scoped to what you need. Any third-party running costs are set out in your proposal.",
    };
  }
  if (/what('?s| is) included|what do (i|we) get|deliverables|what does it include/.test(text)) {
    return {
      intent: "included",
      text: "Strategy, design and development are included in every Websites and Web Apps project, carried by one team from the first conversation to launch.\n\nThe exact deliverables, review rounds and timeline are agreed in your written proposal before work starts.",
    };
  }
  if (/process|how (does it|do you|does this) work|what are the steps|how do (we|i) start/.test(text)) {
    return {
      intent: "process",
      text: "Every project runs in stages you can review: discovery and strategy, design, build, then launch and handover. Each stage ends with something you can try and question before the next begins.\n\nMilestones and review rounds are agreed in your written proposal.",
    };
  }
  if (/price|pricing|cost|budget|\bplans?\b|package|quote|compare|how much|rates?\b|fees?\b/.test(text)) {
    return {
      intent: "price",
      text: `Websites: from ${PRICE.websitesFrom}. Strategy, design, and development are included.\n\nWeb Apps: from ${PRICE.webAppsFrom}, plus discovery. Strategy, design, and development are included.\n\nSEO and AI are optional add-ons, quoted separately. Every project is still quoted to its agreed scope. The ranges are on the pricing page.`,
    };
  }
  if (/\bai\b|\bseo\b|discoverability/.test(text)) {
    return { intent: "addons", text: "AI Integrations and SEO are optional add-ons, quoted separately, not part of the core website or web app price." };
  }
  if (/service|capabilit|offer|explore|what do you do/.test(text)) {
    return {
      intent: "services",
      text:
        NAV_CAPABILITIES.map((item) => `${item.title}: ${item.line}.`).join("\n\n") +
        "\n\nStrategy, design and development are included in the core project. SEO/discoverability and AI integrations are optional add-ons, scoped separately.",
    };
  }
  if (/\blogo\b|naming|brand identity|\bidentity\b|visual system/.test(text)) {
    return {
      intent: "brand",
      text: `Brand identity (naming, mark, and visual system) is an optional add-on to a Websites or Web Apps project, priced at ${PRICE.brandIdentity} and quoted separately from the core build. It is not its own page; the range is on the pricing page. The final scope is agreed in your proposal.`,
    };
  }
  const capability = CAPABILITIES.find((item) => {
    const terms: Record<string, RegExp> = {
      websites: /website|marketing site|landing page/,
      "web-apps": /web app|portal|dashboard|business tool/,
      strategy: /strateg|position|audience|roadmap/,
      "design-innovation": /design|3d|motion|webgl|interface/,
      "ai-systems": /\bai\b|assistant|automat|search/,
      seo: /\bseo\b|google|ranking/,
      development: /develop|code|cms|hosting|react|next\.js/,
    };
    return terms[item.slug]?.test(text);
  });
  if (capability) {
    const intent: Intent = capability.slug === "websites" ? "capability:websites" : capability.slug === "web-apps" ? "capability:web-apps" : "capability";
    return { intent, text: `${capability.title}: ${capability.detail}\n\nDeliverables can include ${capability.includes.join(", ")}. The final scope is agreed in your proposal.` };
  }
  if (/time|long|deadline|launch|when/.test(text)) {
    return {
      intent: "time",
      text: "The timeline depends on the scope. A focused launch site is different from a brand and multi-page build. The team will agree a timeline in your written quote; I cannot promise a delivery date.",
    };
  }
  if (/call|book|contact|human|team|talk to/.test(text)) {
    return { intent: "call", text: "Use ‘Talk to the team’ below to send a project inquiry or request an intro call. Nothing has been booked or sent by this chat." };
  }
  return {
    intent: "fallback",
    text: "I can compare Websites and Web Apps, explain optional add-ons, share price ranges, or point you to existing client support. For advice specific to your project, use ‘Talk to the team’ below. This guide uses published studio information and cannot send an inquiry for you.",
  };
}

/** The original text-only API. */
export function studioReply(message: string): string {
  return laneReply(message).text;
}

const A = {
  start: { label: "Start a project", href: "/contact#inquiry", view: "brief" },
  prices: { label: "Price guide", href: "/pricing", view: "prices" },
  work: { label: "See our work", href: "/work", view: "work" },
  contact: { label: "Contact the team", href: "/contact", view: "contact" },
  websites: { label: "Websites page", href: "/capabilities/websites" },
  webApps: { label: "Web Apps page", href: "/capabilities/web-apps" },
  ai: { label: "AI Integrations", href: "/capabilities/ai-systems" },
  email: { label: "Email the studio", href: `mailto:${STUDIO_EMAIL}` },
} satisfies Record<string, LaneAction>;

/** Follow-up actions offered under an answer. */
export function nextSteps(intent: Intent): LaneAction[] {
  switch (intent) {
    case "greeting":
    case "fallback":
      return [A.start, A.prices, A.work];
    case "who":
    case "thanks":
    case "call":
    case "time":
    case "location":
      return [A.start, A.contact];
    case "existing":
    case "contact":
      return [A.email, A.contact];
    case "work":
      return [A.work, A.start];
    case "start":
    case "redesign":
    case "ecommerce":
    case "included":
    case "process":
      return [A.start, A.prices];
    case "price":
    case "brand":
      return [A.prices, A.start];
    case "capability:websites":
      return [A.websites, A.prices, A.start];
    case "capability:web-apps":
      return [A.webApps, A.prices, A.start];
    case "addons":
    case "ai-objection":
      return [A.ai, A.prices];
    case "care":
    case "services":
    case "capability":
      return [A.start, A.contact];
  }
}
