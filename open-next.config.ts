import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page is prerendered, so the default (no incremental cache store) is enough.
export default defineCloudflareConfig();
