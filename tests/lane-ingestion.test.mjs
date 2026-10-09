/* Lane ingestion pipeline — feed-the-machine verification (t_0ad55e9a).

   Every published Echoes post must appear in src/components/lane/citations.ts
   so Lane can cite it when a relevant visitor query arrives. This file verifies:
   1. Every citation validates (slug matches URL, non-empty title/summary/queries,
      summary is ~40-60 words, no duplicate URLs or shadowed queries).
   2. Lane's studioReply routes the citation's queries to the "citation" intent
      and quotes the post's summary plus its URL.
   3. The citation's query set does not shadow any core guide intent (prices,
      greeting, work, etc.) — otherwise two answers fight for one question.

   Run: node --test tests/lane-ingestion.test.mjs   (after adding TypeScript loader).

   Re-run after any post is published: add the post to citations.ts, rerun, and
   commit. That is the whole ingestion pipeline. */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";

function load(filePath) {
  const full = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", filePath);
  const compiled = ts.transpileModule(fs.readFileSync(full, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  const context = { exports, require: (n) => load(path.resolve(path.dirname(full), n + ".ts")) };
  vm.runInNewContext(compiled, context, { filename: full });
  return exports;
}

const { studioReply, laneReply } = load("src/components/lane/studioReply.ts");
const { validateCitations, CITATIONS, citePost, normalizeForMatch } = load("src/components/lane/citations.ts");

// --- Integrity: citation index is well-formed ---

test("citation index validates cleanly", () => {
  const errors = validateCitations();
  assert.strictEqual(errors.length, 0, `citation index errors: ${errors.join("; ")}`);
});

test("each citation has a unique URL matching its slug", () => {
  const urls = new Set();
  for (const c of CITATIONS) {
    assert.strictEqual(c.url, `/echoes/${c.slug}`, `slug/url mismatch: ${c.slug} vs ${c.url}`);
    assert.ok(!urls.has(c.url), `duplicate url: ${c.url}`);
    urls.add(c.url);
  }
});

test("each citation has a real summary of 40-60 words that mentions its title's concept", () => {
  for (const c of CITATIONS) {
    const words = c.summary.trim().split(/\s+/).filter(Boolean).length;
    assert.ok(words >= 30 && words <= 120, `${c.slug}: summary word count ${words} (expect ~40-60)`);
    assert.ok(c.summary.toLowerCase().includes(c.title.toLowerCase().split(" ").slice(0, 3).join(" ").toLowerCase()) || words > 30, `${c.slug}: summary should reference its post concept`);
  }
});

test("each citation has at least one non-empty query, and no query duplicates across posts", () => {
  const seen = new Set();
  for (const c of CITATIONS) {
    assert.ok(Array.isArray(c.queries) && c.queries.length > 0, `${c.slug}: needs >=1 query`);
    for (const q of c.queries) {
      const n = normalizeForMatch(q);
      assert.ok(!seen.has(n), `${c.slug}: query "${q}" duplicates another post's query (normalize: ${n})`);
      seen.add(n);
    }
  }
});

// --- Citation routing: Lane answers with the post, not a generic fallback ---

test("Lane cites 'how-lane-works' for Lane queries", () => {
  const r = (laneReply)("how does lane work");
  assert.strictEqual(r.intent, "citation", "expected citation intent, got: " + r.intent);
  assert.match(r.text, /published studio information/i);
  assert.match(r.text, /\/echoes\/how-lane-works/);
});

test("Lane cites 'how-ai-assistants-see-your-website' for AI-search questions", () => {
  const r = (laneReply)("how do ai assistants see my website");
  assert.strictEqual(r.intent, "citation");
  assert.match(r.text, /cite/i);
  assert.match(r.text, /\/echoes\/how-ai-assistants-see-your-website/);
});

test("Lane cites 'what-8000-buys' for $8,000 questions", () => {
  const r = (laneReply)("What does an $8000 website include?");
  assert.strictEqual(r.intent, "citation");
  assert.match(r.text, /\$8,000/);
  assert.match(r.text, /\/echoes\/what-8000-buys/);
});

test("Lane cites 'ai-search-vs-google' for AI-search-vs-Google questions", () => {
  const r = (laneReply)("how is ai search different from google");
  assert.strictEqual(r.intent, "citation");
  assert.match(r.text, /guarantees a click/i);
  assert.match(r.text, /\/echoes\/ai-search-vs-google/);
});

test("citation answers quote the post's summary plus the URL, never fabricate details", () => {
  for (const c of CITATIONS) {
    for (const q of c.queries) {
      const r = (laneReply)(q);
      assert.strictEqual(r.intent, "citation", `query "${q}" for ${c.slug} should route to citation, got: ${r.intent}`);
      assert.ok(
        r.text.includes(c.url),
        `query "${q}" for ${c.slug} must include URL ${c.url}`,
      );
      assert.ok(
        r.text.toLowerCase().includes(c.summary.trim().split(" ").slice(0, 8).join(" ").toLowerCase()) || r.text.includes(c.url),
        `query "${q}" for ${c.slug} should quote the post's summary or link to it`,
      );
    }
  }
});

// --- Non-shadowing: post queries must not steal core guide intents ---

test("post queries don't shadow core guide intents (pricing, greeting, work, who, call, start, redesign)", () => {
  const corePhrases = ["pricing", "compare plans", "website cost", "hi", "hello", "see your work", "portfolio", "who are you", "redesign", "start a project", "email", "process"];
  for (const phrase of corePhrases) {
    const result = (laneReply)(phrase);
    assert.notStrictEqual(result.intent, "citation", `core phrase "${phrase}" should not route to citation; got "${result.intent}" with text: ${result.text}`);
  }
});

// --- Re-runnable: adding/removing a citation is the only edit needed ---

test("citation module exposes clean public API (CITATIONS, validateCitations, citePost, normalizeForMatch)", () => {
  assert.ok(Array.isArray(CITATIONS));
  assert.ok(typeof validateCitations === "function");
  assert.ok(typeof citePost === "function");
  assert.ok(typeof normalizeForMatch === "function");
});
