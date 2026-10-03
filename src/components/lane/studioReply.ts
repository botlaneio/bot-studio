import { CAPABILITIES } from "../capabilities";
import { PLANS } from "../plans";

/** Local guidance from published content. Never invent prices or claim a handoff. */
export function studioReply(message: string): string {
  const text = message.toLowerCase();
  if (/existing|support|customer/.test(text)) {
    return "For an existing project, contact admin@botlane.io with your project name and what you need. You can also use ‘Talk to the team’ below. This guide cannot access project records or create support tickets.";
  }
  if (/price|pricing|cost|budget|plan|package|quote|compare/.test(text)) {
    return PLANS.map((plan) => `${plan.name}: ${plan.pitch}`).join("\n\n") + "\n\nEvery project is quoted to its scope; there is no published fixed price. View packages below, or contact the team for a written proposal.";
  }
  if (/service|capabilit|offer|explore/.test(text)) {
    return CAPABILITIES.map((item) => `${item.title}: ${item.line}.`).join("\n\n") + "\n\nTell the team what you want your website to achieve, and they can help define the scope.";
  }
  const capability = CAPABILITIES.find((item) => {
    const terms: Record<string, RegExp> = {
      "brand-identity": /brand|logo|naming|identity/,
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
    return "Use ‘Talk to the team’ below to prepare a project inquiry or request an intro call. Nothing has been booked or sent by this chat.";
  }
  return "I can explain our six services, compare Launch, Studio and Partner, or point you to existing client support. For advice specific to your project, use ‘Talk to the team’ below. This guide uses published studio information and cannot send an inquiry for you.";
}
