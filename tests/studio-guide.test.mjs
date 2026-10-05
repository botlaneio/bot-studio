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

test('routes common visitor questions to a real answer, not the fallback', () => {
  const { laneReply } = load('src/components/lane/studioReply.ts');
  const cases = {
    'hi': 'greeting',
    'Can I see your work?': 'work',
    "What's your email?": 'contact',
    'I want to start a project': 'start',
    'Do you do Shopify?': 'ecommerce',
    'Do you offer maintenance?': 'care',
    'Can you redesign my existing website?': 'redesign',
    "What's included?": 'included',
    'How does the process work?': 'process',
    'Who are you?': 'who',
  };
  for (const [q, intent] of Object.entries(cases)) assert.equal(laneReply(q).intent, intent, q);
});

test('a redesign is not mistaken for existing-client support', () => {
  const reply = studioReply('Can you redesign my existing website?');
  assert.doesNotMatch(reply, /cannot access project records/);
  assert.match(reply, /\$8,000/);
});

test('Lane never says it is AI, and the work answer claims no client work', () => {
  assert.match(studioReply('Are you an AI?'), /not an AI model/);
  assert.match(studioReply('Can I see your portfolio?'), /no client case studies/);
});

test('every intent offers next steps with a working link', () => {
  const { laneReply, nextSteps } = load('src/components/lane/studioReply.ts');
  for (const q of ['hi', 'pricing', 'Websites', 'Web apps', 'email', 'portfolio', 'thanks', 'blah blah']) {
    const steps = nextSteps(laneReply(q).intent);
    assert.ok(steps.length > 0, q);
    for (const s of steps) assert.match(s.href, /^(\/|mailto:)/, q);
  }
});

test('every button an answer names is one of the buttons shown under it', () => {
  const { laneReply, nextSteps } = load('src/components/lane/studioReply.ts');
  const questions = [
    'hi', 'thanks', 'who are you', 'I am an existing client', 'redesign our site', 'what is your email',
    'show me your portfolio', 'where are you based', 'I want to start a project', 'do you build shopify stores',
    'maintenance after launch', "what's included", 'how does it work', 'how much does it cost', 'do you do seo',
    'what services do you offer', 'can you design a logo', 'websites', 'web app', 'how long does it take',
    'can I talk to a human', 'Why not just use AI?', 'asdfghjkl',
  ];
  for (const q of questions) {
    const { text, intent } = laneReply(q);
    // The panel shows the first two follow-ups under an answer.
    const shown = nextSteps(intent).slice(0, 2).map((a) => a.label);
    for (const [, name] of text.matchAll(/‘([^’]+)’/g)) {
      assert.ok(shown.includes(name), `"${q}" names ‘${name}’, but shows only: ${shown.join(', ')}`);
    }
  }
});
