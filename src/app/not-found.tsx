import Link from "next/link";
import { Arrow } from "@/components/motion/Arrow";
import page from "@/components/page/Page.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`${page.page} ${styles.wrap}`}>
      <span className={page.kicker}>{"// 404 · Page not found"}</span>
      <p className={styles.code} aria-hidden="true">
        4<span>0</span>4
      </p>
      <h1 className={styles.title}>This page wandered off<b>.</b></h1>
      <p className={styles.text}>The link may be old, or the page may have moved. Let&apos;s get you back on track.</p>
      <Link className={`${styles.home} arrowHost`} href="/">
        Back to the studio
        <Arrow className={styles.arrow} />
      </Link>
    </main>
  );
}
