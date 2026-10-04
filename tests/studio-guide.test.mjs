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

test('compares the published packages without repeating price figures', () => {
  assert.match(studioReply('Compare plans'), /Websites:[\s\S]*Web Apps:/);
  assert.match(studioReply('What will my website cost?'), /pricing page/);
  assert.match(studioReply('What will my website cost?'), /quoted to its agreed scope/);
  assert.doesNotMatch(studioReply('What will my website cost?'), /\$/);
  assert.doesNotMatch(studioReply('Compare plans'), /\$/);
});
test('hands existing customers to the team without claiming access to their records', () => {
  assert.match(studioReply('I am an existing client'), /cannot access project records/);
});
test('does not claim a booking or inquiry was sent', () => {
  assert.match(studioReply('Book a call'), /Nothing has been booked or sent/);
});
test('answers a logo question as part of the websites offer', () => {
  const reply = studioReply('Can you design a logo?');
  assert.match(reply, /Websites offer/);
  assert.match(reply, /Naming, mark, and visual system/);
  assert.match(reply, /not its own page/);
  assert.doesNotMatch(reply, /\/capabilities\/brand-identity/);
  assert.doesNotMatch(reply, /\$/);
});
test('does not invent an answer to unsupported commercial advice', () => {
  assert.match(studioReply('Can you guarantee my revenue?'), /published studio information/);
});
test('potential client questions still receive package information', () => {
  assert.match(studioReply('As a new client, which package should I choose?'), /Websites:/);
});
