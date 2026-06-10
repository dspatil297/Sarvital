#!/usr/bin/env node
/**
 * P2-C gate check: Moringa + Sattu PDP review schema from Judge.me sync.
 *
 * Usage: node scripts/verify-judgeme-reviews.mjs [baseUrl] [minReviews]
 *
 * Defaults: https://www.sarvital.com, minReviews=10 (playbook gate)
 */

const BASE = (process.argv[2] || 'https://www.sarvital.com').replace(/\/$/, '');
const MIN_REVIEWS = Number(process.argv[3] || 10);

const PRODUCTS = [
  { name: 'Moringa', handle: 'moringa-powder' },
  { name: 'Sattu', handle: 'sattu-powder' },
];

function extractProductJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of blocks) {
    try {
      const data = JSON.parse(m[1].trim());
      if (data['@type'] === 'Product') return data;
    } catch {
      /* continue */
    }
  }
  return null;
}

async function checkProduct({ name, handle }) {
  const url = `${BASE}/products/${handle}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Sarvital-verify-judgeme/1.0' } });
  const html = await res.text();
  const failures = [];

  if (!res.ok) failures.push(`HTTP ${res.status}`);

  const product = extractProductJsonLd(html);
  if (!product) {
    failures.push('Product JSON-LD not found');
    return { name, url, failures, reviewCount: 0 };
  }

  const rating = product.aggregateRating;
  if (!rating) {
    failures.push(`no aggregateRating in schema (need ≥${MIN_REVIEWS} Judge.me reviews synced)`);
    return { name, url, failures, reviewCount: 0 };
  }

  const reviewCount = Number(rating.reviewCount || 0);
  if (reviewCount < MIN_REVIEWS) {
    failures.push(`reviewCount ${reviewCount} < ${MIN_REVIEWS}`);
  }

  return { name, url, failures, reviewCount, ratingValue: rating.ratingValue };
}

async function main() {
  console.log(`P2-C Judge.me verification — min reviews: ${MIN_REVIEWS}\n`);
  let pass = 0;

  for (const product of PRODUCTS) {
    const result = await checkProduct(product);
    if (result.failures.length === 0) {
      pass += 1;
      console.log(`PASS ${result.name} — ${result.reviewCount} reviews (${result.ratingValue}★)`);
      console.log(`     ${result.url}\n`);
    } else {
      console.log(`FAIL ${result.name} — ${result.url}`);
      for (const f of result.failures) console.log(`  ! ${f}`);
      console.log('');
    }
  }

  console.log(`${pass}/${PRODUCTS.length} hero PDPs meet P2-C gate`);
  process.exit(pass === PRODUCTS.length ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
