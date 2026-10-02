/** The studio's six areas, shared by the nav menu, the footer and the
 *  capabilities page. `slug` is each one's anchor on /capabilities. */
export const CAPABILITIES = [
  {
    slug: "brand-identity",
    tag: "Foundation",
    title: "Brand Identity",
    line: "Names, marks and visual systems",
    detail: "A name, a mark and the system around them, so every page, post and pitch looks like the same company.",
    includes: ["Naming and verbal identity", "Logo and mark system", "Colour, type and art direction", "Brand guidelines your team can use"],
  },
  {
    slug: "strategy",
    tag: "Growth",
    title: "Strategy",
    line: "Positioning and the roadmap to launch",
    detail: "Who it's for, what makes it different and what ships first, agreed before a pixel is drawn.",
    includes: ["Positioning and messaging", "Audience and competitor review", "Site map and content plan", "Launch roadmap"],
  },
  {
    slug: "design",
    tag: "Creative",
    title: "Design & Innovation",
    line: "Interfaces, motion and 3D",
    detail: "Interfaces with a point of view: considered type, motion that explains, and 3D where it earns its place.",
    includes: ["User flows and wireframes", "Interface and design system", "Motion and interaction", "3D and WebGL scenes"],
  },
  {
    slug: "ai-systems",
    tag: "Smart AI",
    title: "AI Systems",
    line: "Assistants and automations built in",
    detail: "Assistants, search and automations wired into the site, so it answers questions and does the busywork.",
    includes: ["Assistants that know your content", "Smart site search", "Workflow automations", "Lead capture and routing"],
  },
  {
    slug: "seo",
    tag: "Discoverable",
    title: "SEO",
    line: "Found by the people you want",
    detail: "Clean structure, fast pages and content shaped for search, so the right people find you first.",
    includes: ["Technical SEO foundations", "Page speed and Core Web Vitals", "Structured data", "Content guidance"],
  },
  {
    slug: "development",
    tag: "Build",
    title: "Development",
    line: "Fast, accessible, production sites",
    detail: "Production code on a modern stack, fast on every device, accessible, and easy for your team to run.",
    includes: ["Modern frameworks (Next.js, React)", "A CMS your team can run", "Accessibility to WCAG 2.2 AA", "Hosting, analytics and care"],
  },
];

export const capabilityHref = (slug: string) => `/capabilities#${slug}`;
