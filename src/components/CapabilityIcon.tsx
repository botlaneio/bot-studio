/** Studio navigation glyphs: one 24px grid and a consistent outline weight. */
export function CapabilityIcon({ slug, className }: { slug: string; className?: string }) {
  const glyphs: Record<string, React.ReactNode> = {
    "brand-identity": <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m8 15 4-7 4 7M9.5 12.5h5" /></>,
    strategy: <><circle cx="5" cy="18" r="2" /><circle cx="19" cy="6" r="2" /><path d="M7 18h7a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h4M15 3l2 3-2 3" /></>,
    "design-innovation": <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="m9 15 6-6M13 9h2v2" /><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" /></>,
    "ai-systems": <><rect x="8" y="8" width="8" height="8" rx="2" /><path d="M10 11h4M10 13h2M12 3v5M12 16v5M3 12h5M16 12h5" /><circle cx="12" cy="3" r="1" /><circle cx="12" cy="21" r="1" /><circle cx="3" cy="12" r="1" /><circle cx="21" cy="12" r="1" /></>,
    seo: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5M7 12l3-3 2 2 2-3" /></>,
    development: <><path d="m8 6-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" /></>,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {glyphs[slug]}
    </svg>
  );
}
