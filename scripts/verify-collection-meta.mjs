#!/usr/bin/env node
/**
 * P2-A gate check: /collections/all SEO title & meta description on live storefront.
 *
 * Usage: node scripts/verify-collection-meta.mjs [baseUrl]
 */

const BASE = (process.argv[2] || 'https://www.sarvital.com').replace(/\/$/, '');
const PATH = '/collections/all';

const EXPECT = {
  titleMustInclude: ['superfood', 'sarvital'],
  titleMustNotInclude: ['private limited', 'foodtech'],
  descMustInclude: ['moringa', 'sattu'],
};

function extract(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1].trim() : '';
}

async function main() {
  const url = `${BASE}${PATH}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Sarvital-verify-collection-meta/1.0' } });
  const html = await res.text();
  const title = extract(html, /<title[^>]*>([^<]+)<\/title>/i);
  const desc = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    || extract(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const intro = html.includes('collection-intro') || html.includes('Shop Sarvital');

  const failures = [];
  const titleLower = title.toLowerCase();
  const descLower = desc.toLowerCase();

  for (const s of EXPECT.titleMustInclude) {
    if (!titleLower.includes(s)) failures.push(`titleMustInclude: ${s}`);
  }
  for (const s of EXPECT.titleMustNotInclude) {
    if (titleLower.includes(s)) failures.push(`titleMustNotInclude: ${s}`);
  }
  for (const s of EXPECT.descMustInclude) {
    if (!descLower.includes(s)) failures.push(`descMustInclude: ${s}`);
  }
  if (!intro) failures.push('crawlable intro block not found in HTML');

  console.log(`P2-A collection verification — ${url}\n`);
  console.log(`Title: ${title}`);
  console.log(`Desc:  ${desc.slice(0, 100)}${desc.length > 100 ? '…' : ''}`);
  console.log(`Intro section in HTML: ${intro ? 'yes' : 'no'}\n`);

  if (failures.length === 0) {
    console.log('PASS');
    process.exit(0);
  }

  console.log('FAIL');
  for (const f of failures) console.log(`  ! ${f}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
