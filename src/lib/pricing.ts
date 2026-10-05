/** Published prices: the only place dollar amounts are written. The pricing
 *  page, its metadata and the Lane chat guide all read from here, so a change
 *  here updates every place a visitor can see a price. */

export const PRICE = {
  websitesFrom: "$8,000",
  webAppsFrom: "$20,000",
  brandIdentity: "$5,000–$10,000",
} as const;

export const BANDS = [
  {
    name: "Websites",
    rows: [
      { name: "Focused", price: "$8,000–$12,000", detail: "Up to 5 unique layouts, existing brand, client-supplied copy." },
      { name: "Signature", price: "$12,000–$25,000", detail: "Up to 10 layouts, CMS, scoped custom motion." },
      { name: "Complex", price: "$25,000+", detail: "After discovery." },
    ],
  },
  {
    name: "Web apps",
    rows: [
      { name: "Paid discovery", price: "$2,000–$4,000", detail: "Paid discovery before the build is quoted." },
      { name: "Focused MVP", price: "$20,000–$40,000", detail: "One workflow, up to 2 roles, 1 integration." },
      { name: "Larger product", price: "$40,000+", detail: "Quoted in phases, not a fixed total." },
    ],
  },
] as const;

/** One-line summary used in the pricing hero, metadata and chat guide. */
export const PRICE_SUMMARY = `Websites from ${PRICE.websitesFrom}. Web Apps from ${PRICE.webAppsFrom}, plus discovery.`;
