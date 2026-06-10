#!/usr/bin/env node
/**
 * P0-B gate check: PDP SEO titles & meta descriptions on live storefront.
 * Run after pasting playbook copy in Shopify Admin → Products → Search engine listing.
 *
 * Usage: node scripts/verify-pdp-meta.mjs [baseUrl]
 * Default baseUrl: https://www.sarvital.com
 */

const BASE = (process.argv[2] || 'https://www.sarvital.com').replace(/\/$/, '');

const PDP_EXPECTATIONS = [
  {
    handle: 'moringa-powder',
    titleMustInclude: ['moringa', 'sarvital'],
    titleMustNotInclude: ['private limited', 'foodtech'],
    descMustInclude: ['moringa', 'lab'],
  },
  {
    handle: 'sattu-powder',
    titleMustInclude: ['sattu', 'protein', 'sarvital'],
    titleMustNotInclude: ['private limited'],
    descMustInclude: ['protein', 'sattu'],
  },
  {
    handle: 'amla-powder',
    titleMustInclude: ['amla', 'sarvital'],
    titleMustNotInclude: ['private limited'],
    descMustInclude: ['amla', 'vitamin'],
  },
  {
    handle: 'moringa-amla-combo-150-g-each-1',
    titleMustInclude: ['moringa', 'amla', 'sarvital'],
    titleMustNotInclude: ['private limited'],
    descMustInclude: ['moringa', 'amla'],
  },
  {
    handle: 'moringa-sattu-combo-150-g-each-1',
    titleMustInclude: ['moringa', 'sattu', 'sarvital'],
    titleMustNotInclude: ['private limited'],
    descMustInclude: ['moringa', 'sattu'],
  },
  {
    handle: 'sattu-amla-combo-150-g-each-1',
    titleMustInclude: ['sattu', 'amla', 'sarvital'],
    titleMustNotInclude: ['private limited'],
    descMustInclude: ['sattu', 'amla'],
  },
  {
    handle: 'ultimate-wellness-combo-moringa-sattu-amla-150-g-each-1',
    titleMustInclude: ['moringa', 'sattu', 'amla', 'sarvital'],
    titleMustNotInclude: ['private limited'],
    descMustInclude: ['moringa', 'sattu', 'amla'],
  },
];

function decodeHtml(s) {
  return s
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function extractTag(html, pattern) {
  const m = html.match(pattern);
  return m ? decodeHtml(m[1].trim()) : null;
}

async function fetchPdp(handle) {
  const url = `${BASE}/products/${handle}`;
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  return {
    url,
    status: res.status,
    title: extractTag(html, /<title>([\s\S]*?)<\/title>/i),
    description: extractTag(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
  };
}

function checkList(label, haystack, needles, mustMatch = true) {
  const lower = (haystack || '').toLowerCase();
  const failures = needles.filter((n) => lower.includes(n.toLowerCase()) !== mustMatch);
  return failures.length
    ? [{ rule: label, missing: mustMatch ? failures : [], forbidden: mustMatch ? [] : failures }]
    : [];
}

async function main() {
  console.log(`P0-B PDP meta verification — ${BASE}\n`);
  let pass = 0;
  let fail = 0;

  for (const exp of PDP_EXPECTATIONS) {
    const row = await fetchPdp(exp.handle);
    const issues = [];

    if (row.status !== 200) {
      issues.push({ rule: 'HTTP', detail: `status ${row.status}` });
    }
    if (!row.title) {
      issues.push({ rule: 'title', detail: 'missing <title>' });
    }
    if (!row.description) {
      issues.push({ rule: 'description', detail: 'missing meta description' });
    }

    for (const i of checkList('titleMustInclude', row.title, exp.titleMustInclude, true)) {
      issues.push({ rule: 'titleMustInclude', detail: i.missing.join(', ') });
    }
    for (const i of checkList('titleMustNotInclude', row.title, exp.titleMustNotInclude, false)) {
      issues.push({ rule: 'titleMustNotInclude', detail: i.forbidden.join(', ') });
    }
    for (const i of checkList('descMustInclude', row.description, exp.descMustInclude, true)) {
      issues.push({ rule: 'descMustInclude', detail: i.missing.join(', ') });
    }

    const ok = issues.length === 0;
    if (ok) pass++;
    else fail++;

    console.log(`${ok ? 'PASS' : 'FAIL'}  /products/${exp.handle}`);
    console.log(`  Title: ${row.title?.replace(/\s+/g, ' ') ?? '(none)'}`);
    console.log(`  Desc:  ${row.description?.slice(0, 100) ?? '(none)'}${(row.description?.length ?? 0) > 100 ? '…' : ''}`);
    if (issues.length) {
      for (const issue of issues) {
        console.log(`  ! ${issue.rule}: ${issue.detail}`);
      }
    }
    console.log('');
  }

  console.log(`Summary: ${pass} passed, ${fail} failed (of ${PDP_EXPECTATIONS.length})`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
