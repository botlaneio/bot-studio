import { PRICE } from "../../lib/pricing";
import { CAPABILITIES, NAV_CAPABILITIES } from "../capabilities";

/** Local guidance from published content. Never invent prices or claim a handoff. */
export function studioReply(message: string): string {
  const text = message.toLowerCase();
  if (/existing|support|customer/.test(text)) {
    return "For an existing project, contact project@botlane.studio with your project name and what you need. You can also use ‘Talk to the team’ below. This guide cannot access project records or create support tickets.";
  }
  if (/price|pricing|cost|budget|plan|package|quote|compare/.test(text)) {
    return `Websites: from ${PRICE.websitesFrom}. Strategy, design, and development are included.\n\nWeb Apps: from ${PRICE.webAppsFrom}, plus discovery. Strategy, design, and development are included.\n\nSEO and AI are optional add-ons, quoted separately. Every project is still quoted to its agreed scope. The ranges are on the pricing page.`;
  }
  if (/\bai\b|\bseo\b|discoverability/.test(text)) {
    return "AI Integrations and SEO are optional add-ons, quoted separately, not part of the core website or web app price.";
  }
  if (/service|capabilit|offer|explore/.test(text)) {
    return NAV_CAPABILITIES.map((item) => `${item.title}: ${item.line}.`).join("\n\n") + "\n\nStrategy, design and development are included in the core project. SEO/discoverability and AI integrations are optional add-ons, scoped separately.";
  }
  if (/\blogo\b|naming|brand identity|\bidentity\b|visual system/.test(text)) {
    return `Brand identity (naming, mark, and visual system) is an optional add-on to a Websites or Web Apps project, priced at ${PRICE.brandIdentity} and quoted separately from the core build. It is not its own page; the range is on the pricing page. The final scope is agreed in your proposal.`;
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
  if (capability) return `${capability.title}: ${capability.detail}\n\nDeliverables can include ${capability.includes.join(", ")}. The final scope is agreed in your proposal.`;
  if (/time|long|deadline|launch|when/.test(text)) {
    return "The timeline depends on the scope. A focused launch site is different from a brand and multi-page build. The team will agree a timeline in your written quote; I cannot promise a delivery date.";
  }
  if (/call|book|contact|human|team/.test(text)) {
    return "Use ‘Talk to the team’ below to send a project inquiry or request an intro call. Nothing has been booked or sent by this chat.";
  }
  return "I can compare Websites and Web Apps, explain optional add-ons, or point you to existing client support. For advice specific to your project, use ‘Talk to the team’ below. This guide uses published studio information and cannot send an inquiry for you.";
}
