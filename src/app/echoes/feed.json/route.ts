import { SITE_URL } from "@/lib/site";
import { POSTS, jsonFeed } from "../posts";

export function GET() {
  return new Response(jsonFeed(SITE_URL, POSTS), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
