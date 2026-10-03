import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import { DOCS, DocBody, docBySlug } from "../docs";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) return { title: "Knowledge" };
  return { title: doc.title, description: doc.description };
}

export default async function KnowledgeDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = docBySlug(slug);
  if (!doc) notFound();

  return (
    <main className={page.page}>
      <PageHero kicker="// Knowledge" title={doc.title} mark="." lede={doc.summary} />
      <section className={page.section}>
        <div className={page.prose}>
          <DocBody slug={doc.slug} />
          <p>
            <Link href="/knowledge">All documents</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
