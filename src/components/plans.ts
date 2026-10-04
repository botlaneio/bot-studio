/** Core projects are quoted to an agreed scope; optional work is priced separately. */
export const PLANS: { name: string; slug: string; pitch: string; price?: string; recommended?: boolean; includes: string[] }[] = [
  {
    name: "Websites",
    slug: "websites",
    pitch: "A marketing website that explains your business and helps the right people take the next step.",
    includes: ["Strategy, audience and site structure", "Custom responsive design", "Development and launch", "Content management where needed", "Performance, accessibility and search basics"],
  },
  {
    name: "Web Apps",
    recommended: true,
    slug: "web-apps",
    pitch: "An interactive product or business tool built around what your users need to do.",
    includes: ["Strategy, discovery and prioritised scope", "User flows and interface design", "Development and launch", "Data, accounts and integrations as scoped", "Testing and handover"],
  },
  {
    name: "Optional Add-ons",
    slug: "add-ons",
    pitch: "Extend your website or app with the support it needs, scoped separately from your core project.",
    includes: ["SEO & discoverability beyond build basics", "AI assistants, search and automations", "Use cases and deliverables agreed first", "Ongoing care quoted separately", "Third-party costs identified in your proposal"],
  },
];

export const ADD_ONS = [
  { name: "SEO & Discoverability", slug: "seo", pitch: "A scoped programme to help the right people find your website, beyond the technical basics included in the build." },
  { name: "AI Integrations", slug: "ai-systems", pitch: "Assistants, search or automations integrated into your website or app where they serve a clear purpose." },
];
