import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/inquiry.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = {};
vm.runInNewContext(compiled, { exports: mod });
const { parseInquiry, inquiryEmail, MIN_FILL_MS, STUDIO_INBOX } = mod;

const now = 1_800_000_000_000;
const good = { name: '  Ada  Lovelace ', company: 'Analytical', email: 'Ada@Example.com', message: 'We need a new marketing site.', website: '', renderedAt: now - 10_000 };

test('accepts a complete inquiry and normalises it', () => {
  const r = parseInquiry(good, now);
  assert.equal(r.ok, true);
  assert.equal(r.inquiry.name, 'Ada Lovelace');
  assert.equal(r.inquiry.email, 'ada@example.com');
});

test('reports missing name, bad email and too-short message', () => {
  const r = parseInquiry({ ...good, name: '', email: 'nope', message: 'hi' }, now);
  assert.equal(r.ok, false);
  assert.equal(r.spam, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'message', 'name']);
});

test('treats a filled honeypot or an instant submit as spam', () => {
  assert.equal(JSON.stringify(parseInquiry({ ...good, website: 'http://spam' }, now)), JSON.stringify({ ok: false, spam: true }));
  assert.equal(JSON.stringify(parseInquiry({ ...good, renderedAt: now - (MIN_FILL_MS - 1) }, now)), JSON.stringify({ ok: false, spam: true }));
});

test('caps field lengths', () => {
  const r = parseInquiry({ ...good, message: 'x'.repeat(9000) }, now);
  assert.equal(r.inquiry.message.length, 5000);
});

test('builds an email to the studio that replies to the visitor and escapes HTML', () => {
  const r = parseInquiry({ ...good, message: '<script>alert(1)</script> hello there' }, now);
  const e = inquiryEmail(r.inquiry, 'Site <website@botlane.studio>');
  assert.equal(JSON.stringify(e.to), JSON.stringify([STUDIO_INBOX]));
  assert.equal(e.reply_to, 'ada@example.com');
  assert.match(e.subject, /Ada Lovelace \(Analytical\)/);
  assert.doesNotMatch(e.html, /<script>/);
  assert.match(e.html, /&lt;script&gt;/);
  assert.match(e.text, /<script>/);
});
