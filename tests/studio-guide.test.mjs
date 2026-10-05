import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const testRoot = path.dirname(fileURLToPath(import.meta.url));

// Load the small TypeScript knowledge module without introducing a test runner dependency.
const modules = new Map();
function load(file) {
  file = path.resolve(testRoot, '..', file);
  if (modules.has(file)) return modules.get(file);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => load(path.resolve(path.dirname(file), name + '.ts')),
  }, { filename: file });
  modules.set(file, exports);
  return exports;
}
const { studioReply } = load('src/components/lane/studioReply.ts');

test('compares the published offers with current price ranges', () => {
  const compareReply = studioReply('Compare plans');
  const costReply = studioReply('What will my website cost?');
  assert.match(compareReply, /Websites:[\s\S]*Web Apps:/);
  assert.doesNotMatch(compareReply, /workflow/i);
  assert.doesNotMatch(compareReply, /packages/i);
  assert.match(costReply, /\$8,000/);
  assert.match(costReply, /\$20,000/);
  assert.match(costReply, /pricing page/);
  assert.match(costReply, /quoted to its agreed scope/);
  assert.doesNotMatch(costReply, /workflow/i);
  assert.doesNotMatch(costReply, /packages/i);
});
test('hands existing customers to the team without claiming access to their records', () => {
  assert.match(studioReply('I am an existing client'), /cannot access project records/);
});
test('does not claim a booking or inquiry was sent', () => {
  assert.match(studioReply('Book a call'), /Nothing has been booked or sent/);
});
test('answers a logo question as an optional brand identity add-on', () => {
  const reply = studioReply('Can you design a logo?');
  assert.match(reply, /optional add-on/);
  assert.match(reply, /naming, mark, and visual system/);
  assert.match(reply, /\$5,000–\$10,000/);
  assert.match(reply, /quoted separately/);
  assert.match(reply, /not its own page/);
  assert.doesNotMatch(reply, /\/capabilities\/brand-identity/);
});
test('does not invent an answer to unsupported commercial advice', () => {
  assert.match(studioReply('Can you guarantee my revenue?'), /published studio information/);
});
test('potential client questions still receive package information', () => {
  const reply = studioReply('As a new client, which package should I choose?');
  assert.match(reply, /Websites:/);
  assert.doesNotMatch(reply, /packages/i);
});

test('Lane quotes the same prices as the pricing page', () => {
  const { PRICE } = load('src/lib/pricing.ts');
  const page = fs.readFileSync(path.resolve(testRoot, '..', 'src/app/pricing/page.tsx'), 'utf8');
  // The pricing page writes no dollar amounts of its own; both read src/lib/pricing.ts.
  assert.doesNotMatch(page, /\$\d/);
  const cost = studioReply('What will it cost?');
  assert.ok(cost.includes(PRICE.websitesFrom) && cost.includes(PRICE.webAppsFrom));
  assert.ok(studioReply('Can you design a logo?').includes(PRICE.brandIdentity));
});

test('answers the "why pay when AI exists" objection honestly', () => {
  for (const q of ['Why these prices when AI can build a website?', 'Why not just use ChatGPT to make it?', 'Is it worth it, AI is cheaper']) {
    const reply = studioReply(q);
    assert.match(reply, /AI can now produce a page in minutes/);
    assert.match(reply, /accountable/);
    assert.match(reply, /design and code are yours/);
  }
  // Asking for AI as a feature still gets the add-on answer.
  assert.match(studioReply('Can AI be part of our app?'), /optional add-ons/);
});
