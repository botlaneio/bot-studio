import type { Metadata } from "next";
import { Figtree, Fragment_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { LaneChat } from "@/components/lane/LaneChat";
import { SITE_URL } from "@/lib/site";
import { STRUCTURED_DATA } from "@/lib/metadata";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});


const TITLE = "Botlane Studios — Websites and web apps";
const DESCRIPTION =
  "Botlane Studios designs and builds websites and web apps for brands that care about craft, clarity and performance. A BotLane LLC studio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Botlane Studios" },
  description: DESCRIPTION,
  applicationName: "Botlane Studios",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/hero.jpg"] },
  openGraph: {
    type: "website",
    siteName: "Botlane Studios",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/hero.jpg", alt: "Botlane Studios — cobalt floral portrait" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${fragmentMono.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that scripts run, before first paint, so entrance animations
            can start hidden without hiding anything when they do not. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <SmoothScroll />
        <RevealObserver />
        {/* "Back to top" lands here on every page. */}
        <div id="top" />
        <Nav />
        {children}
        <Footer />
        <LaneChat />
      </body>
    </html>
  );
}
