/** Prices are quoted per project; set `price` on a plan to show a figure. */
export const PLANS: { name: string; pitch: string; price?: string; recommended?: boolean; includes: string[] }[] = [
  {
    name: "Launch",
    pitch: "A focused site to get a new brand or product live.",
    includes: ["Up to five pages", "Custom, responsive design", "Motion and interaction", "SEO and performance basics", "A CMS for quick updates"],
  },
  {
    name: "Studio",
    pitch: "Brand and website, designed and built together.",
    recommended: true,
    includes: [
      "Brand identity or refresh",
      "Strategy, site map and content plan",
      "Custom design system",
      "Multi-page site with motion and 3D",
      "SEO, analytics and a CMS",
    ],
  },
  {
    name: "Partner",
    pitch: "An ongoing studio team for a brand that keeps moving.",
    includes: [
      "Monthly design and development time",
      "New pages, features and campaigns",
      "AI assistants and automations",
      "Performance and SEO reviews",
      "Priority support",
    ],
  },
];

