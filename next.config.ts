import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const CANONICAL = "https://botlane.studio";
const OLD_HOSTS = ["botlane.tech", "www.botlane.tech"];

/** Retired paths and where they now live. */
const MOVED: Record<string, string> = {
  "/capabilities/brand-identity": "/capabilities/websites",
};

const nextConfig: NextConfig = {
  async redirects() {
    // Old botlane.tech URLs reach their botlane.studio page in one hop: retired
    // paths go straight to their replacement, everything else keeps its path.
    const oldHosts = OLD_HOSTS.map((value) => [{ type: "host" as const, value }]);
    return [
      ...oldHosts.flatMap((has) => [
        ...Object.entries(MOVED).map(([source, destination]) => ({
          source,
          has,
          destination: `${CANONICAL}${destination}`,
          permanent: true,
        })),
        { source: "/", has, destination: CANONICAL, permanent: true },
        { source: "/:path*", has, destination: `${CANONICAL}/:path*`, permanent: true },
      ]),
      ...Object.entries(MOVED).map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
