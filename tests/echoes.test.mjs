/* Echoes content integrity.

   posts.ts is the single source of truth for Echoes; Lane's citation index,
   the feeds and the covers all derive from it. These checks catch the drift
   that the October 2026 content review found by hand: citations quoting
   numbers a post no longer contains, related links to posts that do not
   exist, prices in the wrong currency, and a byline nobody chose. */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function load(filePath) {
  const full = path.resolve(ROOT, filePath);
  const compiled = ts.transpileModule(fs.readFileSync(full, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  const context = { exports, require: (n) => load(path.relative(ROOT, path.resolve(path.dirname(full), n + ".ts"))) };
  vm.runInNewContext(compiled, context, { filename: full });
  return exports;
}

const { POSTS, postSchema, rssXml } = load("src/app/echoes/posts.ts");
const { CITATIONS } = load("src/components/lane/citations.ts");
const { ECHOES_AUTHOR } = load("src/app/echoes/echoes.ts");

const slugs = new Set(POSTS.map((p) => p.slug));
const text = (post) => JSON.stringify(post);
// Objects built inside the VM have their own prototypes; compare plain copies.
const plain = (value) => JSON.parse(JSON.stringify(value));

test("every post has exactly one Lane citation, and every citation has a post", () => {
  const cited = CITATIONS.map((c) => c.slug);
  assert.deepStrictEqual(plain([...cited].sort()), [...slugs].sort());
});

test("each citation quotes its post's current title and intro", () => {
  for (const c of CITATIONS) {
    const post = POSTS.find((p) => p.slug === c.slug);
    assert.strictEqual(c.title, post.title, `${c.slug}: citation title is stale`);
    assert.strictEqual(c.summary, post.intro, `${c.slug}: citation summary should be the post's intro`);
  }
});

test("related links and inline /echoes links point at published posts", () => {
  for (const post of POSTS) {
    for (const r of post.related) assert.ok(slugs.has(r.slug), `${post.slug}: related slug ${r.slug} does not exist`);
    for (const [, slug] of text(post).matchAll(/\/echoes\/([a-z0-9-]+)(?=[)"#\s])/g)) {
      if (slug === "kit" || slug === "rss" || slug === "covers") continue;
      assert.ok(slugs.has(slug), `${post.slug}: links to /echoes/${slug}, which does not exist`);
    }
  }
});

test("posts and Kit downloads quote prices in US dollars only", () => {
  for (const post of POSTS) assert.doesNotMatch(text(post), /£|€/, `${post.slug} contains a non-USD price`);
  const kit = path.join(ROOT, "public/echoes/kit");
  for (const file of fs.readdirSync(kit)) {
    assert.doesNotMatch(fs.readFileSync(path.join(kit, file), "utf8"), /£|€/, `${file} contains a non-USD price`);
  }
});

test("the price-bands note shows exactly the published bands", () => {
  const { BANDS, PRICE } = load("src/lib/pricing.ts");
  const post = POSTS.find((p) => p.slug === "why-we-publish-price-bands");
  const shown = post.evidence.find((e) => e.kind === "metrics").values.map((v) => v.value);
  const published = [...BANDS.flatMap((g) => g.rows.map((r) => r.price)), PRICE.brandIdentity];
  assert.deepStrictEqual(plain(shown), plain(published));
});

test("posts are bylined to the studio, in the page, the schema and the feed", () => {
  assert.strictEqual(ECHOES_AUTHOR, "Botlane Studio");
  for (const post of POSTS) assert.strictEqual(post.author, undefined, `${post.slug} overrides the studio byline`);
  const schema = postSchema("https://botlane.studio", POSTS[0]);
  assert.deepStrictEqual(plain(schema["@graph"][0].author), { "@id": "https://botlane.studio/#organization" });
  assert.doesNotMatch(rssXml("https://botlane.studio", POSTS), /Agent Lane/);
});

test("self-initiated studies say so in their caveats", () => {
  for (const slug of ["forme-knitwear", "northline-senior-not-cold"]) {
    const post = POSTS.find((p) => p.slug === slug);
    assert.match(post.caveats.join(" "), /not a client project/i, `${slug} must be labelled as a study`);
  }
});
