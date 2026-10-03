import type { Metadata } from "next";
import { InspireClose } from "@/components/InspireClose";
import { ContactForm } from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Botlane Studios in Sheridan, Wyoming. Email admin@botlane.io or call +1 307 218 5715.",
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.split} aria-label="Contact">
        <div className={styles.visual}>
          <video
            className={styles.photo}
            src="/contact-side.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
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
                <a className={styles.detailLink} href="mailto:admin@botlane.io">
                  admin@botlane.io
                </a>
              </div>
              <div>
                <p className={styles.detailLabel}>Phone</p>
                <a className={styles.detailLink} href="tel:+13072185715">
                  +1 307 218 5715
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <h2 className={styles.talk}>Let&apos;s talk!</h2>
          <p className={styles.hear}>We&apos;d love to hear from you and your team.</p>
          <ContactForm />
        </div>
      </section>

      <InspireClose />
    </main>
  );
}
