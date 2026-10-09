import { SITE_URL } from "@/lib/site";
import { POSTS, rssXml } from "../posts";

export function GET() {
  return new Response(rssXml(SITE_URL, POSTS), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
