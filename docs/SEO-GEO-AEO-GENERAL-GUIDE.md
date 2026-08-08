# SEO, GEO & AEO — General Reference Guide

**Purpose:** Reusable principles for any e-commerce or content site. Not tied to a single brand.  
**Use with:** Project-specific playbooks, analytics baselines, and competitor research.

---

## 1. Definitions

### SEO (Search Engine Optimization)

Making pages **easy for Google and Bing to crawl, index, and rank**, and **compelling in search results** (title, description, CTR).

| Focus | Examples |
|-------|----------|
| Technical | Sitemap, canonicals, mobile speed, index hygiene, structured data |
| On-page | Unique titles, H1/H2 hierarchy, crawlable HTML text |
| Off-page | Backlinks, brand mentions (not covered in theme work) |

**Primary metrics:** GSC clicks, impressions, CTR, average position, indexed pages, Core Web Vitals.

---

### GEO (Generative Engine Optimization)

Making your site **easy for AI systems** (ChatGPT, Perplexity, Claude, Google AI Overviews, shopping agents) to **discover, understand, and cite** you.

| Focus | Examples |
|-------|----------|
| Discovery files | `llms.txt`, `agents.md`, `robots.txt` AI rules |
| Machine-readable catalog | Product JSON, OpenAPI, agent protocols (UCP, MCP) |
| Citable content | Plain-language definitions, FAQs, guides with facts |
| Crawler policy | Explicit allow/disallow for AI bots; `Content-Signal` where applicable |

**Primary metrics:** AI citation logs (manual monthly), non-brand queries where you appear, agent discovery scan scores.

**Important:** GEO infrastructure ≠ GEO outcomes. Custom `llms.txt` helps you *get cited*; citations still need depth, trust, and time.

---

### AEO (Answer Engine Optimization)

Structuring content so **answer engines** (Google featured snippets, AI Overviews, Perplexity answers) can **quote you with a link**.

| Focus | Examples |
|-------|----------|
| FAQPage JSON-LD | Question/Answer schema matching visible HTML |
| Answer patterns | Definition sentence, numbered how-to, objection FAQ |
| Canonical FAQ hub | One source of truth for Q&A across site + schema + llms.txt |

**Note (2026):** Google largely **removed FAQ rich results** from standard SERPs. FAQPage schema still matters for **GEO/AEO** (AI parsing and citations), not guaranteed Google FAQ boxes.

**Primary metrics:** Rich Results Test validity, FAQ hub indexed, answer-shaped content on PDPs and guides.

---

## 2. One system, three surfaces

SEO, GEO, and AEO are **not three separate projects**. They share one content layer:

```
Content (write once)
    ↓
HTML (human-readable) + JSON-LD (machines) + llms.txt/agents.md (agents)
    ↓
Google Search · AI chat · Shopping agents
    ↓
Product / conversion pages
```

### Golden rule

**Write each fact once** (metafield, CMS field, or section), then **reuse** for:

- Visible page copy  
- JSON-LD (`FAQPage`, `Product`, `Article`, etc.)  
- `llms.txt` / `agents.md` summaries  

Never maintain three different FAQ wordings.

---

## 3. What to optimize for (and what to avoid)

### Optimize for

- **Qualified traffic** — users with purchase or strong consideration intent  
- **PDP depth** — product pages earning clicks, not only homepage brand queries  
- **Index quality** — real URLs indexed; spam/404 noise removed  
- **Trust signals** — real reviews, lab certs, policies (E-E-A-T)  
- **Citation-ready answers** — plain, factual, linkable blocks  

### Avoid

- Vanity traffic from irrelevant head terms  
- Keyword-stuffed footers or hidden text  
- Fake `aggregateRating` or review schema  
- Duplicate FAQ copy in five places  
- Chasing “guaranteed rankings” or “100% AI citation” claims  

### Honest expectations

| Outcome | Typical confidence (if executed well) |
|---------|--------------------------------------|
| Better PDP CTR after meta fix | High (~80%+) |
| Cleaner index / fewer 404s in GSC | High |
| FAQPage valid in Rich Results Test | High |
| First non-brand organic clicks (90 days) | Medium (~60–70%) |
| Meaningful organic revenue (12 months) | Medium (~50–60%) |
| “Heavy” organic (10K+/mo) in 12 months | Low (~20–30%) for new/small sites |

No playbook guarantees revenue. You control **deliverables**; platforms control **rankings and citations**.

---

## 4. Implementation phases (template)

Use this order on any project:

### P0 — Foundation (weeks 1–4)

| Task | SEO | GEO | AEO |
|------|-----|-----|-----|
| Fix index noise (404s, spam URLs, `noindex` on 404) | ✓ | | |
| Unique title + meta per money page | ✓ | | |
| Mobile Core Web Vitals on key templates | ✓ | | |
| Clean `<title>` (brand name, not legal entity) | ✓ | | |
| Baseline GSC + analytics snapshot | ✓ | ✓ | ✓ |

### P1 — Machine-readable answers (weeks 3–8)

| Task | SEO | GEO | AEO |
|------|-----|-----|-----|
| FAQPage JSON-LD on FAQ surfaces | | ✓ | ✓ |
| Canonical `/faq` (or equivalent) | ✓ | ✓ | ✓ |
| Custom `llms.txt` + `agents.md` | | ✓ | |
| `robots.txt` with explicit AI crawler rules | | ✓ | |
| Answer blocks on priority PDPs (definitions, how-to) | ✓ | ✓ | ✓ |

### P2 — Authority content (months 2–4)

| Task | SEO | GEO | AEO |
|------|-----|-----|-----|
| Collection/category intro copy | ✓ | ✓ | |
| 2–4 pillar articles (one keyword per URL) | ✓ | ✓ | ✓ |
| Homepage educational block (500–800 words HTML) | ✓ | ✓ | ✓ |
| Review collection (real ratings in schema only when data exists) | ✓ | | ✓ |

### P3 — Measure & compound (ongoing)

| Task | SEO | GEO | AEO |
|------|-----|-----|-----|
| Monthly scorecard (GSC, GA4, key URLs) | ✓ | ✓ | ✓ |
| AI citation log (5–10 standard queries) | | ✓ | ✓ |
| Keep `llms.txt` in sync when catalog changes | | ✓ | |
| Expand content only after gates pass | ✓ | ✓ | ✓ |

---

## 5. Checklist by page type

### Homepage `/`

| SEO | GEO | AEO |
|-----|-----|-----|
| Unique title + meta description | Linked from `llms.txt` | WebPage schema |
| Single H1, logical H2s | Brand positioning in `agents.md` | FAQ section + FAQPage JSON-LD |
| 500–800 words crawlable educational HTML | Link to FAQ hub | Definition-style intro paragraph |

### Product page (PDP)

| SEO | GEO | AEO |
|-----|-----|-----|
| Unique title + meta (≤ ~60 chars, brand once) | Product line in `llms.txt` | Product JSON-LD |
| H1 = product name | Listed in `agents.md` | `product_faq` + FAQPage |
| Sections: benefits, ingredients, how to use | Benefit one-liner for agents | Definition in first ~200 words |

### FAQ hub `/pages/faq` (or `/faq`)

| SEO | GEO | AEO |
|-----|-----|-----|
| Indexable, footer + internal links | Linked in `llms.txt` | FAQPage schema (canonical) |
| Same copy as global FAQ metafield | Same Q&A as homepage excerpt | Plain, factual answers |

### Blog / guide article

| SEO | GEO | AEO |
|-----|-----|-----|
| Title + meta targeting one query | Listed in `llms.txt` when published | Article schema |
| Internal links to PDP + FAQ | | TL;DR / key takeaways + FAQ block |
| One primary keyword per URL (no cannibalization) | | |

### Collection / category

| SEO | GEO | AEO |
|-----|-----|-----|
| 150–300 word intro (HTML) | Category context in discovery files | |
| Unique title + meta | | |

---

## 6. Technical building blocks

### Structured data (JSON-LD)

| Schema | Typical use |
|--------|-------------|
| `Organization` | Site-wide trust |
| `WebPage` | Homepage |
| `Product` | PDPs (price, availability, optional `aggregateRating`) |
| `FAQPage` | Home FAQ, product FAQ, FAQ hub |
| `Article` / `BlogPosting` | Blog pillars |
| `CollectionPage` | Collection indexes |
| `BreadcrumbList` | Optional navigation context |

Validate with [Google Rich Results Test](https://search.google.com/test/rich-results).

### GEO discovery files

| File | Role |
|------|------|
| `/llms.txt` | Short, structured summary for LLMs (products, FAQs, links) |
| `/agents.md` | Longer agent/commerce guide |
| `/robots.txt` | Crawler rules + optional `Content-Signal` |
| `/.well-known/api-catalog` | RFC 9727 API discovery (often needs CDN/worker on some platforms) |
| `/openapi.json` | Machine-readable API surface |

### FAQ content format (parser-friendly)

Use a consistent `Q:` / `A:` block format in metafields or CMS:

```text
Q: What is [product]?
A: Plain answer in one or two sentences.

Q: How do I use it?
A: Step-style answer.
```

Parse once → render HTML accordion + emit FAQPage JSON-LD + excerpt in `llms.txt`.

---

## 7. Keyword strategy (intent-first)

| Cluster | Intent | Typical action |
|---------|--------|----------------|
| **A — Transactional** | Buy now | PDP meta + Product schema |
| **B — Informational** | Learn, compare | PDP sections + blog guides |
| **C — Brand** | Already know you | Homepage + Organization |
| **D — Differentiation** | Combos, niche positioning | Combo PDPs + llms.txt |
| **E — Avoid (early)** | Wrong fit or unwinnable head terms | Do not optimize yet |

**Rule:** One primary keyword per URL. PDP wins over homepage for product terms.

---

## 8. Measurement framework

### Baseline (day 0)

Record before major changes:

- GSC: clicks, impressions, CTR, top queries, top pages, indexed count, 404/crawl issues  
- Analytics: sessions by channel, revenue by channel, landing pages  
- CWV: mobile poor URLs on key templates  
- Rich Results: FAQPage / Product validity on sample URLs  

### 90-day scorecard (example metrics)

| # | Metric | Why |
|---|--------|-----|
| 1 | Organic sessions (30d) | Volume trend |
| 2 | GSC clicks (28d) | Search demand captured |
| 3 | Non-brand GSC clicks | Beyond brand awareness |
| 4 | PDP CTR (top products) | Meta + SERP fit |
| 5 | Spam/junk URL impressions | Index hygiene |
| 6 | Mobile CWV poor URLs | UX + ranking factor |
| 7 | FAQPage valid | AEO/GEO technical gate |
| 8 | Organic revenue | Business outcome |
| 9 | Indexed real pages | Crawl success |
| 10 | AI citation log (Y/N on 5 queries) | GEO outcome |

**Pass heuristic:** ≥6/10 at day 90 → continue; ≥8/10 → expand content; &lt;6/10 → fix index/meta/CWV before new content.

### Monthly GEO ritual (~15 min)

1. Open `llms.txt` — products, prices, FAQs, articles current?  
2. Query Perplexity + ChatGPT with 5 standard category queries — log Y/N for your brand + link  
3. Pull GSC non-brand clicks and new landing pages  

---

## 9. Platform notes

### Shopify themes

- `templates/llms.txt.liquid` and `templates/agents.md.liquid` override default agent files  
- `templates/robots.txt.liquid` customizes robots  
- `shop.metafields` ideal for `site_faqs`, `product_faq`, `perfect_for`, `how_to_use`  
- Sitemap is automatic; **FAQ schema is not in sitemap** — it lives in page HTML as JSON-LD  
- `/.well-known/*` often **cannot** be served by theme alone → use CDN/Worker (see Cloudflare doc)

### Any CMS / static site

- Same content/schema principles apply  
- Implement `llms.txt` and `robots.txt` at web root  
- Use CMS fields or MDX frontmatter for FAQ blocks  
- Host discovery endpoints on your edge/CDN if the app server cannot  

---

## 10. Common mistakes

| Mistake | Fix |
|---------|-----|
| Expecting FAQ schema in XML sitemap | Put FAQPage JSON-LD on the page |
| Three different FAQ wordings | Single metafield → HTML + schema + llms.txt |
| Fake review stars in schema | Only emit `aggregateRating` when reviews exist |
| Legal company name in every `<title>` | Short brand name in theme + admin meta |
| Proxying entire storefront through a Worker | Only proxy discovery paths; see Cloudflare doc |
| Optimizing for traffic, not intent | Track PDP CTR, non-brand clicks, revenue |
| Stopping paid acquisition for SEO | SEO compounds; paid often funds early revenue |

---

## 11. Document types for a new project

When starting a new site, create:

1. **Competitor intelligence** — who ranks, what they have for SEO/GEO/AEO  
2. **Implementation guide** — strategy, positioning, flywheel, keyword map  
3. **Playbook** — phased tasks, copy-paste meta, scorecard, file reference  
4. **This general guide** — reuse as-is; no project-specific numbers  

---

## 12. Quick reference card

```
SEO  = Google finds you, ranks you, people click
GEO  = AI/agents find you, understand you, cite you
AEO  = Answers are structured so engines quote you

Write once → HTML + JSON-LD + llms.txt
P0 fix index + meta + speed
P1 FAQ schema + discovery files
P2 content depth (FAQ hub, pillars, homepage education)
P3 measure monthly; expand when gates pass
```

---

*Last updated: June 2026. Principles distilled from Sarvital implementation and industry practice (GSC, GA4, RFC 9727, Google FAQ rich result changes May 2026).*
