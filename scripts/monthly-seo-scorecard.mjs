#!/usr/bin/env node
/**
 * P3 monthly SEO/GEO/AEO scorecard — runs live verifications + prints manual GSC/GA4 checklist.
 *
 * Usage: node scripts/monthly-seo-scorecard.mjs [baseUrl]
 */

import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = (process.argv[2] || 'https://www.sarvital.com').replace(/\/$/, '');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TODAY = new Date().toISOString().slice(0, 10);

function runNode(script, args = []) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [join(ROOT, 'scripts', script), ...args], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    child.on('close', (code) => resolve({ code, out }));
  });
}

async function hasFaqPageSchema(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Sarvital-scorecard/1.0' } });
  const html = await res.text();
  return res.ok && html.includes('FAQPage');
}

async function main() {
  console.log(`\nSarvital SEO scorecard — ${TODAY}`);
  console.log(`Store: ${BASE}\n`);
  console.log('═'.repeat(60));
  console.log('AUTOMATED CHECKS (run now)\n');

  const checks = [
    { label: 'PDP meta (7 products)', script: 'verify-pdp-meta.mjs', args: [BASE] },
    { label: 'Collection /collections/all', script: 'verify-collection-meta.mjs', args: [BASE] },
    { label: 'Pillar articles (2)', script: 'verify-pillar-articles.mjs', args: [BASE] },
    { label: 'Judge.me schema (≥10 reviews)', script: 'verify-judgeme-reviews.mjs', args: [BASE, '10'] },
  ];

  for (const c of checks) {
    const { code, out } = await runNode(c.script, c.args);
    const status = code === 0 ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${c.label}`);
    const lines = out.trim().split('\n').filter(Boolean);
    const summary = lines.find((l) => /PASS|FAIL|\/\d+/.test(l)) || lines[lines.length - 1];
    if (summary) console.log(`       ${summary.trim()}`);
    console.log('');
  }

  const faqUrls = [`${BASE}/`, `${BASE}/pages/faq`];
  for (const url of faqUrls) {
    const ok = await hasFaqPageSchema(url);
    console.log(`[${ok ? 'PASS' : 'FAIL'}] FAQPage JSON-LD on ${url.replace(BASE, '') || '/'}`);
  }

  const llms = await fetch(`${BASE}/llms.txt`, { headers: { 'User-Agent': 'Sarvital-scorecard/1.0' } });
  console.log(`\n[${llms.ok ? 'PASS' : 'FAIL'}] llms.txt reachable (${llms.status})`);

  console.log('\n' + '═'.repeat(60));
  console.log('MANUAL METRICS (15 min — copy into your tracker)\n');
  console.log('Google Search Console (India, last 28 days):');
  console.log('  [ ] Total clicks          baseline ~60   → target ≥120 @ day 90');
  console.log('  [ ] Non-brand clicks      baseline 0     → target ≥5 @ day 90');
  console.log('  [ ] Sattu PDP CTR         baseline ~1.5% → target ≥3%');
  console.log('  [ ] Moringa PDP CTR       baseline ~1.2% → target ≥3%');
  console.log('  [ ] Spam URL impressions  baseline 158+  → target 0');
  console.log('  [ ] Indexed pages (real)  baseline 12   → target 15–20');
  console.log('  [ ] Mobile CWV poor URLs  baseline 8     → target 0 (home + top PDPs)');
  console.log('');
  console.log('Shopify Analytics (30 days, referrer Google):');
  console.log('  [ ] Google sessions       baseline ~22   → target ≥60 @ day 90');
  console.log('');
  console.log('GA4 (30 days, Organic Search):');
  console.log('  [ ] Organic revenue       baseline ₹0    → target ≥₹2,000 @ day 90');
  console.log('  [ ] Top organic landing pages (note shifts)');
  console.log('');
  console.log('═'.repeat(60));
  console.log('DECISION RULES (quarterly)\n');
  console.log('  • Sattu non-brand clicks up     → add 2 more sattu articles');
  console.log('  • Moringa brand searches up     → brand campaigns + homepage schema');
  console.log('  • PDP CTR still <2% after meta  → rewrite meta; check rankings');
  console.log('  • <6/10 scorecard at day 90     → re-audit GSC 404s before new content');
  console.log('  • ≥8/10 at day 90               → expand blog + combo landing pages');
  console.log('');
  console.log('Keep paid social running — SEO compounds; it does not replace ads in Q1.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
