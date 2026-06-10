#!/usr/bin/env node
/**
 * P2-B gate check: two pillar articles live with FAQPage schema.
 *
 * Usage:
 *   node scripts/verify-pillar-articles.mjs [baseUrl] [blogHandle]
 *
 * Defaults: https://www.sarvital.com, wellness
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = (process.argv[2] || 'https://www.sarvital.com').replace(/\/$/, '');
const BLOG = process.argv[3] || 'wellness';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const manifest = JSON.parse(
  readFileSync(join(ROOT, 'content/pillar-articles/manifest.json'), 'utf8')
);

async function checkArticle(article) {
  const url = `${BASE}/blogs/${BLOG}/${article.handle}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Sarvital-verify-pillar/1.0' } });
  const html = await res.text();
  const failures = [];

  if (!res.ok) failures.push(`HTTP ${res.status}`);
  if (!html.includes('FAQPage')) failures.push('FAQPage schema missing');
  if (!html.includes('article-pillar__tldr') && !html.includes(article.tldr_probe)) {
    failures.push('TL;DR block not detected');
  }
  for (const kw of article.body_must_include || []) {
    if (!html.toLowerCase().includes(kw.toLowerCase())) failures.push(`body missing: ${kw}`);
  }
  for (const path of article.internal_links || []) {
    if (!html.includes(path)) failures.push(`internal link missing: ${path}`);
  }

  return { url, ok: failures.length === 0, failures };
}

async function main() {
  console.log(`P2-B pillar articles — blog: ${BLOG}\n`);
  let pass = 0;
  for (const article of manifest.articles) {
    const result = await checkArticle(article);
    console.log(result.ok ? 'PASS' : 'FAIL', result.url);
    if (!result.ok) {
      for (const f of result.failures) console.log(`  ! ${f}`);
    } else {
      pass += 1;
    }
  }
  console.log(`\n${pass}/${manifest.articles.length} articles ready`);
  process.exit(pass === manifest.articles.length ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
