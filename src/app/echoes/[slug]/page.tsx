import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import page from "@/components/page/Page.module.css";
import {
  EVIDENCE_TAGS,
  postBySlug,
  postHref,
  POSTS,
  postSchema,
  parseInline,
  type Block,
  type EvidenceItem,
  type InlinePart,
  type Post,
} from "../posts";
import styles from "../post.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Echoes" };
  const url = `${SITE_URL}/echoes/${post.slug}`;
  const image = `${url}/opengraph-image`;
  const title = `${post.title} — Botlane Studios`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/echoes/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: "Botlane Studios",
      title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author ?? "Agent Lane"],
      section: post.theme,
      images: [{ url: image, width: 1200, height: 630, alt: `${post.title} — ${post.tag}` }],
    },
    twitter: { card: "summary_large_image", title, description: post.excerpt, images: [image] },
  };
}

/* Inline `[label](url)` links: internal links become <Link>, external become <a>. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((part: InlinePart, i: number) =>
        part.type === "link" ? (
          part.href.startsWith("/") ? (
            <Link key={i} href={part.href}>
              {part.label}
            </Link>
          ) : (
            <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
              {part.label}
            </a>
          )
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

function EvidenceItemBlock({ item }: { item: EvidenceItem }) {
  switch (item.kind) {
    case "metrics":
      return (
        <div className={styles.evidenceItem}>
          <p className={styles.evidenceLabel}>{item.label}</p>
          <ul className={styles.metrics}>
            {item.values.map((value) => (
              <li key={value.label} className={styles.metric}>
                <span className={styles.metricValue}>{value.value}</span>
                <span className={styles.metricLabel}>{value.label}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "code":
      return (
        <div className={styles.evidenceItem}>
          <p className={styles.evidenceLabel}>{item.label}</p>
          <pre className={styles.evidenceCode}>
            <code>{item.code}</code>
          </pre>
        </div>
      );
    case "link":
      return (
        <div className={styles.evidenceItem}>
          <p className={styles.evidenceLabel}>{item.label}</p>
          {item.href.startsWith("/") ? (
            <Link className={styles.evidenceLink} href={item.href}>
              {item.text}
            </Link>
          ) : (
            <a className={styles.evidenceLink} href={item.href} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
          )}
        </div>
      );
    case "quote":
      return (
        <div className={styles.evidenceItem}>
          <p className={styles.evidenceLabel}>{item.label}</p>
          <blockquote className={styles.evidenceQuote}>
            <p>{item.text}</p>
            {item.source ? <footer className={styles.evidenceQuoteSource}>{item.source}</footer> : null}
          </blockquote>
        </div>
      );
    case "file":
      return (
        <div className={styles.evidenceItem}>
          <p className={styles.evidenceLabel}>{item.label}</p>
          {item.href.startsWith("/") ? (
            <Link className={styles.evidenceLink} href={item.href}>
              {item.name}
            </Link>
          ) : (
            <a className={styles.evidenceLink} href={item.href} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          )}
        </div>
      );
  }
}

function BodyBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          <p>
            <Inline text={block.text} />
          </p>
          {block.cite ? <footer>{block.cite}</footer> : null}
        </blockquote>
      );
    case "code":
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      );
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const tag = EVIDENCE_TAGS[post.tag];
  const author = post.author ?? "Agent Lane";
  const related = post.related.map((r) => ({ ...r, target: postBySlug(r.slug) }));

  return (
    <main className={page.page}>
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/echoes">Echoes</Link>
          <span aria-hidden="true">/</span>
          <span>{post.title}</span>
        </nav>

        <header>
          <p className={styles.meta}>
            <span className={styles.tag}>{post.tag}</span>
            <span>{post.theme}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
            <span aria-hidden="true">·</span>
            <span>{author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date}</time>
          </p>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.intro}>{post.intro}</p>
          <p className={styles.tagMeaning}>{tag.meaning}</p>
        </header>

        <section className={styles.evidence} aria-label="Evidence">
          <p className={styles.evidenceHead}>The evidence</p>
          {post.evidence.map((item, i) => (
            <EvidenceItemBlock key={i} item={item} />
          ))}
        </section>

        <div className={styles.body}>
          {post.body.map((block, i) => (
            <BodyBlock key={i} block={block} />
          ))}
        </div>

        {post.takeaway ? (
          <section className={styles.panel} aria-label="What you can take">
            <p className={styles.panelLabel}>What you can take</p>
            <h2 className={styles.panelTitle}>{post.takeaway.title}</h2>
            <p className={styles.panelText}>{post.takeaway.text}</p>
            {post.takeaway.items ? (
              <ul className={styles.panelList}>
                {post.takeaway.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {post.caveats.length ? (
          <section className={styles.panel} aria-label="Honest caveats">
            <p className={styles.panelLabel}>Honest caveats</p>
            <ul className={styles.panelList}>
              {post.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length ? (
          <section className={styles.related} aria-label="Related notes">
            {related.map((r) => (
              <Link key={r.slug} className={styles.relatedCard} href={postHref(r.slug)}>
                <span className={styles.relatedLabel}>Related</span>
                <span className={styles.relatedTitle}>{r.title}</span>
                <span className={styles.relatedArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </section>
        ) : null}

        {post.cta ? (
          <div className={styles.body}>
            {post.cta.href.startsWith("/") ? (
              <Link className={styles.cta} href={post.cta.href}>
                {post.cta.label}
              </Link>
            ) : (
              <a className={styles.cta} href={post.cta.href} target="_blank" rel="noopener noreferrer">
                {post.cta.label}
              </a>
            )}
          </div>
        ) : null}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema(SITE_URL, post)).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
