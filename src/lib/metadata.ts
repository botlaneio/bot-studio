import type { Metadata } from "next";
import { STUDIO_INBOX } from "@/lib/inquiry";
import { SITE_URL } from "@/lib/site";

export const SITE_NAME = "Botlane Studios";
export const SHARE_IMAGE = { url: "/hero.jpg", alt: "Botlane Studios — cobalt floral portrait" };

/**
 * Per-page metadata: title, description, canonical, and the link preview
 * (Open Graph / X card) for that page. Next.js replaces nested metadata objects
 * rather than merging them, so each page sets its whole preview here instead of
 * inheriting the homepage's title and URL from the root layout.
 */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const shareTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, title: shareTitle, description, url: path, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [SHARE_IMAGE.url] },
  };
}

/**
 * Organization and WebSite structured data. Only facts the site states
 * publicly: name, URL, logo, studio email and phone, parent company.
 * No street address: Sheridan, WY is the registered address, not an office.
 */
export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      email: STUDIO_INBOX,
      telephone: "+1-307-218-5175",
      parentOrganization: { "@type": "Organization", name: "BotLane LLC" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
