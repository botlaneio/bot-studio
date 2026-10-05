import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import { DOCS } from "./docs";
import styles from "./knowledge.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/knowledge",
  title: "Knowledge",
  description: "Documents about Botlane Studios, the design studio of BotLane LLC, drawn from what this site already says.",
});

export default function KnowledgePage() {
  return (
    <main className={page.page}>
      <PageHero
        kicker="// Knowledge"
        title="Knowledge"
        mark="."
        lede="Documents about the studio, written from the pages already on this site."
      />
      <section className={page.section} aria-label="Documents">
        <ol className={styles.list}>
          {DOCS.map((doc, i) => (
            <li key={doc.slug}>
              <Link className={styles.item} href={`/knowledge/${doc.slug}`}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={styles.itemTitle}>{doc.title}</span>
                  <span className={styles.summary}>{doc.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
