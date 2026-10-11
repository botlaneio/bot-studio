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
const { parseInquiry, inquiryEmail, sourceLine, MIN_FILL_MS, STUDIO_INBOX } = mod;

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

test('carries where the inquiry came from into the email', () => {
  const source = { via: 'lane', page: '/pricing', landing: '/echoes/what-8000-buys', referrer: 'Google.com', utm: 'source=linkedin campaign=launch' };
  const r = parseInquiry({ ...good, source }, now);
  assert.equal(r.ok, true);
  assert.equal(r.inquiry.source.referrer, 'google.com');
  const line = sourceLine(r.inquiry.source);
  assert.equal(line, 'Lane brief on /pricing · arrived from google.com, first page /echoes/what-8000-buys · tags: source=linkedin campaign=launch');
  const e = inquiryEmail(r.inquiry, 'Site <website@botlane.studio>');
  assert.match(e.text, /Source: Lane brief on \/pricing/);
  assert.match(e.html, /Source/);
});

test('drops malformed source fields instead of echoing them', () => {
  const source = { via: 'evil', page: 'https://evil.example/x', landing: '/ok"><script>', referrer: 'javascript:alert(1)', utm: '<b>x</b>' };
  const r = parseInquiry({ ...good, source }, now);
  assert.equal(r.ok, true);
  const s = r.inquiry.source;
  assert.equal(s.via, '');
  assert.equal(s.page, '');
  assert.equal(s.landing, '');
  assert.equal(s.referrer, '');
  assert.doesNotMatch(s.utm, /[<>]/);
  const e = inquiryEmail(r.inquiry, 'Site <website@botlane.studio>');
  assert.doesNotMatch(e.html, /<script>|<b>/);
});

test('an inquiry without source data has no Source line', () => {
  const r = parseInquiry(good, now);
  assert.equal(r.inquiry.source, undefined);
  assert.doesNotMatch(inquiryEmail(r.inquiry, 'x').text, /Source:/);
});
