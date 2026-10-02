import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import page from "@/components/page/Page.module.css";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms for using the Botlane Studios website.",
};

export default function TermsPage() {
  return (
    <main className={page.page}>
      <PageHero kicker="// Legal" title="Terms of use" mark="." />
      <section className={page.section}>
        <div className={page.prose}>
          <p className={page.updated}>Last updated 2 October 2026</p>

          <p>
            These terms govern your use of this website, operated by BotLane LLC (&ldquo;Botlane Studios&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;), 30 N Gould St, Ste R, Sheridan, WY 82801, United States. By using the site you agree to them.
          </p>

          <h2>Using the site</h2>
          <p>
            You may browse the site for your own information. Please don&apos;t misuse it: no attempts to disrupt it, to access it without
            authorisation, or to copy it in bulk.
          </p>

          <h2>Content and intellectual property</h2>
          <p>
            The site&apos;s design, text, graphics, code and the Botlane Studios name and marks belong to BotLane LLC or its licensors. Some
            imagery is used under licence and does not depict work for our clients. You may not reproduce or reuse site content without our
            written permission.
          </p>

          <h2>Projects and quotes</h2>
          <p>
            Information on this site, including the descriptions of our services and plans, is general and is not an offer. Any project is
            governed by a separate written proposal or agreement, which takes precedence over anything on this site.
          </p>

          <h2>Links to other sites</h2>
          <p>We link to websites we don&apos;t control, such as WhatsApp. We are not responsible for their content or practices.</p>

          <h2>No warranty</h2>
          <p>
            We work to keep the site accurate and available, but it is provided &ldquo;as is&rdquo;, without warranties of any kind, to the
            extent the law allows.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent the law allows, BotLane LLC is not liable for any indirect or consequential loss arising from your use of this
            website.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Wyoming, United States.</p>

          <h2>Changes and contact</h2>
          <p>
            We may update these terms from time to time; the date at the top shows the latest version. Questions:{" "}
            <a href="mailto:admin@botlane.io">admin@botlane.io</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
