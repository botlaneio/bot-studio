import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CAPABILITIES } from "@/components/capabilities";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";
import styles from "../capabilities.module.css";
import { Strategy } from "@/components/strategy/Strategy";
import { Websites } from "@/components/websites/Websites";
import { WebApps } from "@/components/webapps/WebApps";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CAPABILITIES.map(({ slug }) => ({ slug }));
}

async function getCapability(params: Props["params"]) {
  const { slug } = await params;
  const capability = CAPABILITIES.find((item) => item.slug === slug);
  if (!capability) notFound();
  return capability;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const capability = await getCapability(params);
  return {
    title: capability.title,
    description: capability.detail,
    alternates: { canonical: `/capabilities/${capability.slug}` },
  };
}

export default async function CapabilityPage({ params }: Props) {
  const capability = await getCapability(params);
  if (capability.slug === "websites") return <Websites />;
  if (capability.slug === "web-apps") return <WebApps />;
  if (capability.slug === "strategy") return <Strategy />;
  return (
    <main className={page.page}>
      <PageHero kicker={`// ${capability.tag}`} title={capability.title} mark="." lede={capability.detail} />
      <section className={`${page.section} ${styles.service}`} aria-label={`${capability.title} deliverables`}>
        <Image className={styles.serviceImage} src={capability.image} alt="" width={643} height={900} sizes="(max-width: 899px) 100vw, 420px" />
        <div className={styles.serviceCopy}>
          <h2 className={page.h2}>What you get<b>.</b></h2>
          <ul className={styles.deliverables}>
            {capability.includes.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className={page.body}>We agree the deliverables, scope and timeline in your written proposal before work starts.</p>
          <Link className={styles.serviceCta} href="/contact#inquiry">Discuss your project →</Link>
          <Link className={styles.serviceBack} href="/capabilities">Explore all capabilities</Link>
        </div>
      </section>
    </main>
  );
}
