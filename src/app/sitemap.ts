import type { MetadataRoute } from "next";
import { CAPABILITIES } from "@/components/capabilities";
import { SITE_URL } from "@/lib/site";
import { DOCS } from "./knowledge/docs";
import { POSTS, latestPostDate } from "./echoes/posts";

/** Public, indexable routes. /preview is a private noindex page and stays out. */
const STATIC_ROUTES: { path: string; priority: number; lastModified?: string }[] = [
  { path: "", priority: 1 },
  { path: "/capabilities", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/work", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/echoes", priority: 0.5, lastModified: latestPostDate() },
  { path: "/echoes/kit", priority: 0.5 },
  { path: "/knowledge", priority: 0.4 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

const CORE_OFFERS = new Set(["websites", "web-apps"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(({ path, priority, lastModified }) => ({
      url: `${SITE_URL}${path}`,
      priority,
      ...(lastModified ? { lastModified } : {}),
    })),
    ...CAPABILITIES.map(({ slug }) => ({
      url: `${SITE_URL}/capabilities/${slug}`,
      priority: CORE_OFFERS.has(slug) ? 0.9 : 0.6,
    })),
    ...DOCS.map(({ slug }) => ({ url: `${SITE_URL}/knowledge/${slug}`, priority: 0.3 })),
    ...POSTS.map((post) => ({
      url: `${SITE_URL}/echoes/${post.slug}`,
      lastModified: post.updated ?? post.date,
      priority: 0.6,
    })),
  ];
}
