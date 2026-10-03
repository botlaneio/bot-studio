import type { Metadata } from "next";
import { Figtree, Fragment_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

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
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://botlane.tech";

const TITLE = "Botlane Studios — Ultra-premium websites";
const DESCRIPTION =
  "Botlane Studios designs and builds ultra-premium websites for brands that care about craft, clarity and performance. A BotLane LLC studio.";

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
  openGraph: {
    type: "website",
    siteName: "Botlane Studios",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${fragmentMono.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that scripts run, before first paint, so entrance animations
            can start hidden without hiding anything when they do not. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <RevealObserver />
        {/* "Back to top" lands here on every page. */}
        <div id="top" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
