import { PLANS } from "./plans";

/** Retain existing discipline URLs while leading with two core project offers. */
const DISCIPLINES = [
  {
    slug: "brand-identity",
    image: "/capability-brand-identity.webp",
    tag: "Foundation",
    title: "Brand Identity",
    line: "Names, marks and visual systems",
    detail: "A name, a mark and the system around them, so every page, post and pitch looks like the same company.",
    includes: ["Naming and verbal identity", "Logo and mark system", "Colour, type and art direction", "Brand guidelines your team can use"],
  },
  {
    slug: "strategy",
    image: "/capability-strategy.webp",
    tag: "Included discipline",
    title: "Strategy",
    line: "Positioning and the roadmap to launch",
    detail: "Who it's for, what makes it different and what ships first, agreed before a pixel is drawn.",
    includes: ["Positioning and messaging", "Audience and competitor review", "Site map and content plan", "Launch roadmap"],
  },
  {
    slug: "design-innovation",
    image: "/capability-design.webp",
    tag: "Included discipline",
    title: "Design & Innovation",
    line: "Interfaces, motion and 3D",
    detail: "Interfaces with a point of view: considered type, motion that explains, and 3D where it earns its place.",
    includes: ["User flows and wireframes", "Interface and design system", "Motion and interaction", "3D and WebGL scenes"],
  },
  {
    slug: "ai-systems",
    image: "/capability-ai-systems.webp",
    tag: "Optional add-on",
    title: "AI Integrations",
    line: "Optional assistants and automations",
    detail: "Optional assistants, search and automations integrated into your website or app. We agree the use case, data access and scope separately from the core build.",
    includes: ["Assistants that know your content", "Smart site search", "Workflow automations", "Lead capture and routing"],
  },
  {
    slug: "seo",
    image: "/capability-seo.webp",
    tag: "Optional add-on",
    title: "SEO & Discoverability",
    line: "Found by the people you want",
    detail: "An optional programme for search visibility and content, beyond the performance and technical search basics included in the core build. Scope and pricing are agreed separately.",
    includes: ["Search and visibility review", "Content and keyword planning", "Structured data where relevant", "Ongoing optimisation as scoped"],
  },
  {
    slug: "development",
    image: "/capability-development.webp",
    tag: "Included discipline",
    title: "Development",
    line: "Fast, accessible, production sites",
    detail: "Production code on a modern stack, fast on every device, accessible, and easy for your team to run.",
    includes: ["Modern frameworks (Next.js, React)", "A CMS your team can run", "Accessibility to WCAG 2.2 AA", "Hosting, analytics and care"],
  },
];

export const capabilityHref = (slug: string) => `/capabilities/${slug}`;

export const OFFERS = PLANS.slice(0, 2).map((plan, i) => ({
  slug: plan.slug,
  image: i === 0 ? "/capability-design.webp" : "/capability-development.webp",
  tag: "Core offer",
  title: plan.name,
  line: i === 0 ? "Marketing sites for brands and businesses" : "Interactive products and business tools",
  detail: plan.pitch,
  includes: plan.includes,
}));
export const OPTIONAL_CAPABILITIES = DISCIPLINES.filter((item) => item.slug === "seo" || item.slug === "ai-systems");
export const NAV_CAPABILITIES = [...OFFERS, ...OPTIONAL_CAPABILITIES];
export const CAPABILITIES = [...OFFERS, ...DISCIPLINES];

export const OFFER_DETAILS = [...OFFERS, ...DISCIPLINES.filter((item) => ["strategy", "design-innovation", "development"].includes(item.slug)), ...OPTIONAL_CAPABILITIES];
