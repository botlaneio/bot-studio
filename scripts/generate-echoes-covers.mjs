#!/usr/bin/env node
/**
 * Generate typographic SVG covers for every Echoes post.
 *
 * Reads src/app/echoes/posts.ts (the single source of truth) and writes one
 * 800x500 SVG per post to public/echoes/covers/<slug>.svg. The design matches
 * the per-post OG image (src/app/echoes/[slug]/opengraph-image.tsx): dark
 * studio background, a per-evidence-tag accent, the title large, and the tag
 * pill + theme + date along the bottom. No stock art — a typographic card.
 *
 * Run:  node scripts/generate-echoes-covers.mjs
 * Then: git add public/echoes/covers && git commit
 *
 * Re-run after adding or editing any post; the hub renders these at
 * /echoes/covers/<slug>.svg.
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Same loader as tests/lane-ingestion.test.mjs: transpile TS to CommonJS, run
// in a bare VM, and resolve relative imports (posts.ts imports ./echoes only).
function load(filePath) {
  const full = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", filePath);
  const compiled = ts.transpileModule(fs.readFileSync(full, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  const context = {
    exports,
    require: (n) => load(path.resolve(path.dirname(full), n + ".ts")),
  };
  vm.runInNewContext(compiled, context, { filename: full });
  return exports;
}

const { POSTS } = load("src/app/echoes/posts.ts");

const WIDTH = 800;
const HEIGHT = 500;
const PAD = 48;
const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

// One accent per evidence tag, so the grid is scannable but stays consistent.
const ACCENT = {
  Measured: "#0a84ff",
  Built: "#2dd4a7",
  Decided: "#f5a623",
  Briefed: "#b48cff",
  Plainly: "#9aa3ad",
};

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Shrink the title as it grows so long headlines still fit on three lines.
function titleSize(title) {
  if (title.length <= 30) return { size: 48, maxChars: 28, lineHeight: 56 };
  if (title.length <= 52) return { size: 40, maxChars: 33, lineHeight: 48 };
  return { size: 33, maxChars: 40, lineHeight: 40 };
}

function wrap(title, maxChars) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  if (lines.length > 3) {
    lines.length = 3;
    lines[2] = lines[2].replace(/[.,;:—–-]+$/, "") + "…";
  }
  return lines;
}

function coverSvg(post) {
  const accent = ACCENT[post.tag] ?? ACCENT.Plainly;
  const { size, maxChars, lineHeight } = titleSize(post.title);
  const lines = wrap(post.title, maxChars);

  const titleBase = 235 - ((lines.length - 1) * lineHeight) / 2;
  const titleSpans = lines
    .map((ln, i) => `<tspan x="${PAD}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(ln)}</tspan>`)
    .join("");

  const label = (post.tag ?? "Plainly").toUpperCase();
  const pillY = 415;
  const pillH = 38;
  const dotCx = PAD + 24;
  const textX = PAD + 42;
  const pillWidth = 42 + label.length * 11 + 22;
  const meta = [post.theme, post.date].filter(Boolean).join("  ·  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="${escapeXml(post.title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0d12"/>
      <stop offset="1" stop-color="#12151d"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="690" cy="70" r="210" fill="${accent}" opacity="0.08"/>
  <rect x="${PAD}" y="44" width="20" height="4" fill="${accent}"/>
  <text x="${PAD + 32}" y="50" font-family="${FONT}" font-size="21" letter-spacing="3" fill="rgba(255,255,255,0.5)">ECHOES</text>
  <text x="${PAD}" y="${titleBase}" font-family="${FONT}" font-size="${size}" font-weight="600" letter-spacing="-0.03em" fill="#ffffff">${titleSpans}</text>
  <rect x="${PAD}" y="${pillY}" rx="999" width="${pillWidth}" height="${pillH}" fill="none" stroke="${accent}" stroke-opacity="0.6" stroke-width="2"/>
  <circle cx="${dotCx}" cy="${pillY + pillH / 2}" r="6" fill="${accent}"/>
  <text x="${textX}" y="${pillY + pillH / 2 + 5}" font-family="${FONT}" font-size="16" letter-spacing="0.06em" fill="${accent}">${escapeXml(label)}</text>
  <text x="${PAD}" y="${pillY + pillH + 26}" font-family="${FONT}" font-size="15" letter-spacing="0.04em" fill="rgba(255,255,255,0.45)">${escapeXml(meta)}</text>
</svg>
`;
}

const outDir = path.join(ROOT, "public", "echoes", "covers");
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
for (const post of POSTS) {
  fs.writeFileSync(path.join(outDir, `${post.slug}.svg`), coverSvg(post));
  written += 1;
}
console.log(`Wrote ${written} covers to public/echoes/covers/`);
