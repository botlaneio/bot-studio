import { ImageResponse } from "next/og";
import { EVIDENCE_TAGS, POSTS, postBySlug } from "../posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Echoes note";

/**
 * Auto-generated per-post OG image: the title and its evidence tag on the
 * studio's dark background. No stock art, no animation — a typographic card,
 * which is also what "respecting reduced motion" means for a link preview.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  const tag = post ? EVIDENCE_TAGS[post.tag].label : "Echoes";
  const title = post ? post.title : "A studio notebook, kept in public";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "20px", height: "4px", background: "#0077e6", flexShrink: 0 }} />
          <div style={{ fontSize: "26px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
            Echoes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "60px",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: "980px",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              border: "2px solid rgba(0,119,230,0.6)",
              borderRadius: "999px",
              fontSize: "24px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#7cc0ff",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0077e6" }} />
            {tag}
          </div>
          <div style={{ fontSize: "24px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.45)" }}>botlane.studio</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
