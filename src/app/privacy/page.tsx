import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Botlane Studios (BotLane LLC) handles personal information.",
};

export default function PrivacyPage() {
  return (
    <main className={page.page}>
      <PageHero kicker="// Legal" title="Privacy policy" mark="." />
      <section className={page.section}>
        <div className={page.prose}>
          <p className={page.updated}>Last updated 2 October 2026</p>

          <p>
            This policy explains how BotLane LLC (&ldquo;Botlane Studios&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal
            information when you visit this website or get in touch with us.
          </p>

          <h2>Who we are</h2>
          <p>
            BotLane LLC, 30 N Gould St, Ste R, Sheridan, WY 82801, United States. You can reach us at{" "}
            <a href="mailto:admin@botlane.io">admin@botlane.io</a> or +1 307 218 5715.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>When you contact us</strong> by email, phone or WhatsApp: your name, contact details and anything you choose to tell
              us about your project.
            </li>
            <li>
              <strong>When you visit the site:</strong> our hosting provider, Cloudflare, processes standard technical data such as your IP
              address, browser type and the pages requested, to deliver and protect the site.
            </li>
          </ul>
          <p>This website does not use advertising or tracking cookies, and we do not currently run analytics on it.</p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and to discuss, quote for and deliver a project.</li>
            <li>To keep the website secure and working.</li>
            <li>To meet our legal, tax and accounting obligations.</li>
          </ul>
          <p>We do not sell your personal information, and we do not use it for advertising.</p>

          <h2>Who we share it with</h2>
          <p>
            Only the service providers we need to run the studio, such as our hosting provider (Cloudflare) and our email and messaging
            services (including WhatsApp, when you contact us there). They process data on our behalf or under their own privacy terms.
            We may also disclose information if the law requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry and project correspondence for as long as we need it to work with you and to meet our legal obligations, and
            then delete it.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you, by emailing{" "}
            <a href="mailto:admin@botlane.io">admin@botlane.io</a>. Depending on where you live, you may have further rights under local
            law; we will honour them.
          </p>

          <h2>Links to other sites</h2>
          <p>
            This site links to other websites, such as botlane.io and WhatsApp. Their own privacy policies apply when you visit them.
          </p>

          <h2>Changes</h2>
          <p>If we change this policy we will update it here, with a new date at the top.</p>
        </div>
      </section>
    </main>
  );
}
