/** Blank capability pages. Nav and Footer are rendered by the root layout. */

const SLUGS = [
  "brand-identity",
  "strategy",
  "design-innovation",
  "ai-systems",
  "seo",
  "development",
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default function CapabilityPage() {
  return <></>;
}
