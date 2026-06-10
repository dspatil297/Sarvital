#!/usr/bin/env node
/**
 * P0-A helper: probe URLs (from GSC 404 export) for spam or wrong status codes.
 *
 * Usage:
 *   node scripts/audit-spam-urls.mjs url1 url2 ...
 *   node scripts/audit-spam-urls.mjs --file gsc-404-export.txt
 *
 * Flags spam patterns from SEO-GEO-AEO-PLAYBOOK.md and reports non-404 responses.
 */

const SPAM_PATTERNS = [
  /casino/i,
  /gambling/i,
  /very-well/i,
  /poker/i,
  /betting/i,
  /slots/i,
];

async function probe(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return { url, status: response.status, location: response.headers.get('location') };
  } catch (error) {
    clearTimeout(timeout);
    return { url, status: null, error: error.message };
  }
}

function isSpam(url) {
  return SPAM_PATTERNS.some((pattern) => pattern.test(url));
}

async function main() {
  const args = process.argv.slice(2);
  let urls = args.filter((arg) => !arg.startsWith('--'));

  if (args.includes('--file')) {
    const fileIndex = args.indexOf('--file');
    const filePath = args[fileIndex + 1];
    if (!filePath) {
      console.error('Missing path after --file');
      process.exit(1);
    }
    const { readFile } = await import('node:fs/promises');
    const text = await readFile(filePath, 'utf8');
    urls = urls.concat(
      text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith('http'))
    );
  }

  if (urls.length === 0) {
    console.log('No URLs provided. Example:');
    console.log('  node scripts/audit-spam-urls.mjs https://www.sarvital.com/very-well-casino-uk/');
    console.log('  node scripts/audit-spam-urls.mjs --file gsc-404-urls.txt');
    process.exit(0);
  }

  const results = await Promise.all(urls.map(probe));
  const problems = [];

  for (const result of results) {
    const spam = isSpam(result.url);
    const badStatus = result.status !== null && result.status !== 404 && result.status !== 410;
    const line = `${result.url} → ${result.status ?? 'error'}${result.location ? ` → ${result.location}` : ''}${spam ? ' [spam pattern]' : ''}`;
    console.log(line);
    if (spam && result.status === 200) problems.push(`${result.url} returns 200 (spam live)`);
    if (badStatus) problems.push(`${result.url} returns ${result.status} (expected 404/410)`);
  }

  console.log('');
  if (problems.length === 0) {
    console.log('Gate check: no spam URLs returning 200; no unexpected status codes in this batch.');
  } else {
    console.log('Issues found:');
    for (const issue of problems) console.log(`  - ${issue}`);
    process.exit(1);
  }
}

main();
