import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { InspireClose } from "@/components/InspireClose";
import { LazyVideo } from "@/components/LazyVideo";
import { ContactForm } from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description: "Talk to Botlane Studios in Sheridan, Wyoming. Email project@botlane.studio or call +1 307 218 5175.",
});

export default function ContactPage() {
  return (
    <main>
      <section className={styles.split} aria-label="Contact">
        <div className={styles.visual}>
          <LazyVideo className={styles.photo} src="/contact-side.mp4" poster="/contact-side-poster.jpg" />
          <div className={styles.scrim} aria-hidden="true" />
          <div className={styles.visualCopy}>
            <h1 className={styles.move}>
              Thinking about
              <br />
              your next move?
            </h1>
            <p className={styles.discuss}>Let’s discuss how Botlane Studios can help make it real.</p>
            <div className={styles.details}>
              <div>
                <p className={styles.detailLabel}>Sheridan, Wyoming</p>
                <address className={styles.address}>
                  Botlane Studios
                  <br />
                  30 N Gould St, Ste R
                  <br />
                  Sheridan, WY 82801
                </address>
              </div>
              <div>
                <p className={styles.detailLabel}>Email</p>
                <a className={styles.detailLink} href="mailto:project@botlane.studio">
                  project@botlane.studio
                </a>
              </div>
              <div>
                <p className={styles.detailLabel}>Phone</p>
                <a className={styles.detailLink} href="tel:+13072185175">
                  +1 307 218 5175
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="inquiry" className={styles.panel}>
          <h2 className={styles.talk}>Let&apos;s talk!</h2>
          <p className={styles.hear}>We&apos;d love to hear from you and your team.</p>
          <ContactForm />
        </div>
      </section>

      <InspireClose />
    </main>
  );
}
