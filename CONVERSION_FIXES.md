# Studio conversion fixes

Service menu routes now render the six capabilities using the same content and slugs as the menu and index. Unknown service slugs remain 404s.

Project, quote and call requests point to `/contact#inquiry`. No scheduler is configured, so buttons say **Request a call**, not Book a call. The contact form posts to `/api/inquiry`, which validates it and emails it to project@botlane.studio through Resend (Reply-To is the visitor). Visitors see "sent" only after Resend accepts the message; on failure they get a prefilled email link instead. Spam is filtered with a honeypot field and a minimum fill time.

Lane now gives local, deterministic answers based on published service and package information. It is labelled **Studio guide** rather than AI assistant. There is no model connection, ticket creation, booking, or message delivery. For bespoke advice, visitors can contact the studio. The guide does not promise prices, delivery dates, or access to client records.

The inactive newsletter form is replaced by a project inquiry CTA. Instagram and X icons are hidden unless official profile URLs are configured through the optional variables in `.env.example`. Existing WhatsApp and business contact details are unchanged.

Static pages and capability pages have canonical URLs; Open Graph and Twitter metadata use the existing hero artwork.

## Validation

- Production build and TypeScript check.
- ESLint: no errors; existing ShowreelVideo image warning remains.
- Guidance checks cover package comparison, unpublished pricing, support limitations, booking limitations, logo design, and unsupported advice.
- Production HTML checks cover all six service routes, inquiry targets, canonical URLs, unknown-service 404, and removal of placeholder links.
- Local visual/mobile browser verification is blocked by the preview browser's network policy; it must be completed on a reachable preview before production deployment.

## Still requires infrastructure

A real AI provider, scheduler, and newsletter service are separate integrations. No credentials or destinations have been invented for them.
