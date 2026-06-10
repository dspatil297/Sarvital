# Sarvital SEO, GEO & AEO Playbook

**Status:** Data-validated execution guide (primary doc — start here)  
**Version:** 1.1  
**Date:** June 9, 2026 (analytics + evidence update)  
**Site:** sarvital.com  
**Based on:** GSC, GA4, Shopify Analytics (Jun 2026) + industry case studies  
**Related:** [COMPETITOR-SEO-GEO-AEO.md](./COMPETITOR-SEO-GEO-AEO.md) · [SEO-GEO-AEO-IMPLEMENTATION-GUIDE.md](./SEO-GEO-AEO-IMPLEMENTATION-GUIDE.md)

---

## 0. Read this first — guarantees, confidence, and expectations

No agency, tool, or playbook can **guarantee** Google rankings, AI citations, or a revenue number from organic search. Google and AI engines control those outcomes. **Maximum honest confidence for business outcomes is ~76–80%, not 100%.**

### What you control (deliverables)

| If you complete… | You get… |
|------------------|----------|
| P0-B PDP meta (all 7 products) | Keyword-rich titles/descriptions in Shopify + SERP |
| P0-A spam / 404 audit | Cleaner index; spam URLs removed or blocked |
| P0-C mobile CWV fixes | Poor URLs → good on key templates (if bottlenecks fixed) |
| P0-D theme title tag | No legal entity suffix in `<title>` |
| P1-A FAQPage JSON-LD | Valid structured data in HTML |
| P1-D llms.txt enrichment | Machine-readable FAQs + product highlights |

### Confidence levels (evidence-adjusted, Jun 2026)

| Outcome | Confidence | Evidence |
|---------|------------|----------|
| Diagnosis is correct (PDP CTR, index noise, brand-only organic) | **~92%** | Your GSC/GA4/Shopify data |
| **PDP CTR 1% → 3%+** within 8 weeks after meta fix | **~85%** | [THM case study](https://tomislavhorvat.com/boosting-ctr-with-post-title-optimization-case-study/) (1.5%→4.8%); [SearchPilot India +21% sessions](https://www.searchpilot.com/resources/case-studies/does-adding-save-30-messaging-to-meta-descriptions-improve-organic-traffic) |
| P0 improves measurable metrics (CTR, CWV, index) | **~85–88%** | Case studies + your impression volume |
| **2–3× Google sessions** in 90 days (from ~22/mo) | **~68–75%** | [India ecom 8–12 wk](https://beskymarketing.com/ecommerce-seo-case-study-india/); [60–90 day industry norm](https://socialsellinator.com/best-seo-agency-denver/) |
| First **non-brand** GSC clicks in 90 days | **~58–68%** | Impressions exist; position unknown |
| FAQ schema → **Google SERP rich snippets** | **~35–45%** | [Google deprecated FAQ rich results (May 2026)](https://honchosearch.com/blogs/news/google-is-removing-faq-rich-results-from-search) |
| FAQ schema → **GEO/AEO** (AI citations, 6–12 mo) | **~65–75%** | [Frase AEO analysis](https://www.frase.io/blog/faq-schema-ai-search-geo-aeo); vendor claims — treat as directional |
| Organic **meaningful revenue** in 12 months | **~50–60%** | [India case ₹0→27L](https://beskymarketing.com/ecommerce-seo-case-study-india/) with full program |
| **Heavy** organic (10K+/mo) in 12 months | **~20–30%** | Requires compounding; your baseline is very small |
| **Overall:** clear win vs doing nothing in 90 days | **~76–80%** | If full P0 + P1 executed |

**Honest expectation:** Baseline = ~**22 Google sessions/month** (Shopify), ~**180 GSC clicks/quarter** (India), **98% GA4 revenue from Paid Social**. Realistic **90-day** target: **2–3× Google sessions**, **first non-brand clicks**, **PDP CTR ~3%+** — not “heavy traffic.” Heavy qualified traffic is **12–18 months** with paid social continuing.

**If P0 is skipped** (spam 404s, mobile CWV, weak PDP meta), confidence on all outcomes drops by **~20 points**.

---

## 1. Your data baseline (source of truth)

### 1.1 Google Search Console (~3 months, India)

| Metric | Value |
|--------|-------|
| Clicks | ~180 |
| Impressions | ~501 |
| Avg CTR | 35.9% *(inflated by brand)* |
| Avg position | 5.3 *(inflated by brand)* |
| Indexed pages | **12** |
| Not indexed | **~10,900** |

**Top query**

| Query | Clicks | Impressions |
|-------|--------|-------------|
| sarvital | 62 | 151 |
| sattu powder protein | 0 | 13 |
| sattu protein powder | 0 | 1 |
| moringa sattu benefits | 0 | 3 |

**Top pages (all countries)**

| Page | Clicks | Impressions | CTR |
|------|--------|-------------|-----|
| Homepage | 172 | 457 | ~38% |
| Sattu PDP | 4 | 270 | **~1.5%** |
| Moringa PDP | 3 | 246 | **~1.2%** |
| Amla PDP | 0 | 136 | **0%** |

**Index problems**

| Reason | URLs |
|--------|------|
| 404 Not found | 5,193 |
| Crawled – currently not indexed | 4,249 |
| Alternate page with canonical | 1,317 |

**Spam in index (must fix)**

- `/very-well-casino-uk/` — 158 impressions  
- `/best-gambling-websites-united-kingdom/` — impressions detected  
- Query: `best gambling sites`

**Core Web Vitals (mobile):** 8 poor URLs, 0 good (as of Jun 2026)

**Sitemap:** Success, 18 URLs discovered

---

### 1.2 Google Analytics 4 (~30 days)

| Channel | Sessions | % | Revenue |
|---------|----------|---|---------|
| Cross-network | 4,259 | 63.4% | ₹0 |
| Paid Social | 1,964 | 29.2% | **₹27,617 (98%)** |
| Organic Search | 208 | 3.1% | ₹0 |
| Direct | 200 | 3.0% | ₹0 |
| **Total** | **6,719** | 100% | **₹28,162** |

**Organic search quality (first-user acquisition)**

| Metric | Organic | Paid Social |
|--------|---------|-------------|
| Users | 114 (1.9%) | 1,698 (28.5%) |
| Avg engagement time | **1m 01s** | 18s |
| Key event rate | **7.02%** | 17.72% |

Organic visitors **stay longer** but volume is tiny. Paid social **converts**.

**Top products (items viewed → purchased → revenue)**

| Product | Views | Purchases | Revenue |
|---------|-------|-----------|---------|
| Moringa Powder 150g | 2,363 | 30 | ₹11,484 |
| Sattu Powder 150g | 1,821 | 21 | ₹8,652 |
| Amla Powder 150g | 878 | 3 | ₹930 |

**Ecommerce tracking:** `add_to_cart` and `purchase` key events active ✓

---

### 1.3 Shopify Analytics

| Metric | Value |
|--------|-------|
| Sessions (30d referrers) | 1,832 |
| **Google sessions** | **22** (~1.2%) |
| Mobile share | **94%** |
| Top cities | Pune, Mumbai, Bengaluru, Hyderabad, Delhi |

**Sales by product (recent period)**

| Product | Units sold |
|---------|------------|
| Moringa Powder | 43 |
| Sattu Powder | 39 |
| Amla Powder | 7 |
| Combos | 6 total |

**Homepage SEO (admin):** Already strong — title 51 chars, description 174 chars ✓  

**PDP SEO (admin):** Weak — titles are only `Moringa Powder`, `Sattu Powder`, `Amla Powder`; SERP shows legal entity name ✓ *confirmed problem*

---

## 2. Root cause diagnosis (why organic underperforms)

| # | Root cause | Evidence | Fix phase |
|---|------------|----------|-----------|
| 1 | **Business is paid-social driven** | 98% GA4 revenue from Paid Social | Keep ads; build organic as layer 2 |
| 2 | **PDP meta titles too generic** | 200+ impressions, ~1% CTR | P0 Admin |
| 3 | **Brand-only query capture** | 62/62 query clicks = `sarvital` | P1 non-brand content (sattu protein) |
| 4 | **Index pollution / 404 flood** | 5,193 404s, casino URLs | P0 cleanup |
| 5 | **Mobile CWV failing** | 8 poor URLs, 94% mobile traffic | P0 performance |
| 6 | **No FAQPage schema** | Zero competitors + you lack it; value = GEO/AEO (not Google FAQ snippets, deprecated May 2026) | P1 theme |
| 7 | **Legal entity in SERP breadcrumb** | Shopify preview shows full company name | P0 theme + admin |

---

## 3. Strategic positioning (do not deviate)

**One line:** Lab-tested natural superfood powders — moringa, amla, sattu — vegan, gluten-free, India D2C.

**Dual hero products (data-backed)**

| Role | Product | Why |
|------|---------|-----|
| **Revenue hero** | Moringa | #1 views, purchases, revenue |
| **SEO wedge** | Sattu | Only non-brand GSC queries (`sattu powder protein`) |
| **Support** | Amla | Fix CTR; lower volume |

**Do not target (yet):** ayurvedic supplements, kapiva alternatives, dry fruits, generic herbal medicines.

**Audience (validated):** India, mobile-first, tier-1/2 cities; today acquired via **Meta ads + direct**; organic users are **higher engagement, tiny volume**.

---

## 4. The playbook — four phases with pass/fail gates

Each phase has **tasks**, **owner**, and a **gate**. Do not start the next phase until the gate passes.

---

### Phase P0 — Site health & CTR emergency (Week 1–2)

**Goal:** Stop index harm, fix the CTR leak on pages that already get impressions.

#### P0-A: Spam & 404 audit (Owner: Admin + Dev)

| Step | Action | Verification |
|------|--------|--------------|
| 1 | GSC → Indexing → **Why pages aren't indexed** → open **Not found (404)** → export first 100 URLs | File saved |
| 2 | Shopify Admin → **Online Store → Pages / Blog posts** → search `casino`, `gambling`, `very-well` | No spam pages exist |
| 3 | **Settings → Domains / Redirects** → audit redirect rules | No gambling redirects |
| 4 | If spam URLs were real pages: delete → 301 to homepage or 410 | URLs return 404 or 301 |
| 5 | GSC → **Removals** → temporarily remove spam URLs if still indexed | Request submitted |
| 6 | Review apps that inject URLs (SEO apps, affiliate, etc.) | App list documented |

**Gate P0-A:** Zero casino/gambling URLs return 200 on live site. Re-check in 2 weeks: GSC impressions on those URLs trend to 0.

#### P0-B: PDP meta titles & descriptions (Owner: Admin)

Paste exactly into **Products → [product] → Search engine listing → Edit**.

**Moringa Powder**

- **Title:** `Moringa Powder | Lab-Tested Superfood | Sarvital`
- **Description:** `Buy lab-tested moringa powder from Sarvital. Vitamins & antioxidants for smoothies & daily energy. Vegan, gluten-free. Ships across India.`

**Sattu Powder** *(include “protein” — matches GSC queries)*

- **Title:** `Sattu Protein Powder | Lab-Tested | Sarvital`
- **Description:** `Lab-tested sattu protein powder — plant protein, iron & fiber. Make sharbat, chilla & smoothies. Vegan superfood by Sarvital. Ships India.`

**Amla Powder**

- **Title:** `Amla Powder | Vitamin C Superfood | Sarvital`
- **Description:** `Premium lab-tested amla powder for immunity & vitamin C. Vegan superfood for drinks & recipes. Shop Sarvital online — ships across India.`

**Moringa + Amla Combo**

- **Title:** `Moringa & Amla Combo | Lab-Tested | Sarvital`
- **Description:** `Moringa & amla combo powder — energy plus immunity. Lab-tested vegan 150g packs from Sarvital. Daily wellness bundle.`

**Moringa + Sattu Combo**

- **Title:** `Moringa & Sattu Combo | Protein & Energy | Sarvital`
- **Description:** `Moringa & sattu combo — antioxidants plus plant protein. Lab-tested superfood powder from Sarvital. For smoothies & fitness.`

**Sattu + Amla Combo**

- **Title:** `Sattu & Amla Combo | Protein & Vitamin C | Sarvital`
- **Description:** `Sattu & amla combo powder — protein & vitamin C in one. Lab-tested vegan from Sarvital. Sharbat, breakfast & recovery.`

**Ultimate Wellness Combo**

- **Title:** `Moringa, Amla & Sattu Combo | Sarvital`
- **Description:** `Complete daily superfood trio — moringa, amla & sattu. Lab-tested vegan powders from Sarvital. Bundle savings. Ships India.`

**Gate P0-B:** Shopify preview shows keyword-rich titles without legal suffix. Wait 14 days → GSC PDP CTR ≥ **2.5%** (from ~1.2%).

#### P0-C: Mobile Core Web Vitals (Owner: Dev)

| Step | Action |
|------|--------|
| 1 | Run [PageSpeed Insights](https://pagespeed.web.dev/) on homepage, Moringa PDP, Sattu PDP (mobile) |
| 2 | Fix LCP: compress hero images (WebP), preload LCP image, reduce slider weight |
| 3 | Fix INP: defer non-critical JS (GoKwik, Judge.me, tracking) |
| 4 | Fix CLS: reserve image/video dimensions in product gallery |

**Gate P0-C:** GSC CWV report → **0 poor URLs** on homepage + top 3 PDP templates within 28 days.

#### P0-D: Theme title tag fix (Owner: Dev)

**File:** `snippets/meta-tags.liquid`

- Append `– {{ shop.name }}` only when `page_title` does not already contain `Sarvital`
- Use short brand `Sarvital`, never legal entity in `<title>`
- Ensure product `page_title` from admin overrides theme defaults

**Gate P0-D:** View-source on Moringa PDP → `<title>` matches admin SEO title + single brand mention.

---

### Phase P1 — Structured answers (Week 2–4)

**Goal:** Win rich results and AI-parseable FAQs; deepen sattu protein positioning.

#### P1-A: FAQPage JSON-LD (Owner: Dev)

| Step | Action |
|------|--------|
| 1 | Create `snippets/faq-schema.liquid` — accepts parsed Q/A pairs |
| 2 | Render from `sections/home-faq.liquid` (shop `site_faqs` metafield) |
| 3 | Render from `sections/product-faq.liquid` (product `product_faq` metafield) |
| 4 | Plain-text answers only in JSON-LD |
| 5 | Validate at [Rich Results Test](https://search.google.com/test/rich-results) |

**Gate P1-A:** Rich Results Test shows **FAQPage** valid on homepage + 1 PDP.  
**Note (2026):** Google has largely removed FAQ **rich result snippets** from traditional SERPs. Implement FAQPage for **GEO/AEO** (AI Overviews, ChatGPT, Perplexity) and on-page UX — not for expandable Google FAQ snippets.

#### P1-B: FAQ hub page (Owner: Admin)

| Step | Action |
|------|--------|
| 1 | Create **Pages → FAQ** (`/pages/faq`) |
| 2 | Copy same Q&A as `site_faqs` metafield |
| 3 | Link from footer + homepage |
| 4 | Include FAQPage schema on page (after P1-A snippet exists) |

**Must-include questions (AEO + conversion):**

- What is Sarvital?
- Are Sarvital products lab-tested?
- How do I use moringa / sattu / amla powder?
- Are products vegan and gluten-free?
- Do you ship across India?
- How is sattu powder a protein source?

**Gate P1-B:** `/pages/faq` indexed in GSC within 14 days.

#### P1-C: Sattu protein on-page block (Owner: Admin + Dev)

On **Sattu PDP**, add visible crawlable section (metafield or section):

- H2: `Why sattu is a natural protein powder`
- 80–120 words: protein per serving, traditional use, who it's for
- Bullet: smoothies, sharbat, chilla, post-workout

**Gate P1-C:** GSC query `sattu powder protein` gains ≥1 click within 60 days OR impressions +50%.

#### P1-D: Enrich `llms.txt` (Owner: Dev)

**File:** `templates/llms.txt.liquid`

Add:

- Top 10 FAQs (same text as metafield)
- Per-product one-liner with **benefit + price + URL**
- “Why Sarvital” bullets (lab-tested, moringa+amla+sattu, vegan, India)

**Gate P1-D:** Fetch `https://www.sarvital.com/llms.txt` → FAQs and sattu protein mention present.

---

### Phase P2 — Authority content (Month 2–3)

**Goal:** Capture non-brand searches; support paid social with organic reinforcement.

#### P2-A: Collection page copy (Owner: Admin)

**`/collections/all`**

- **Title:** `Shop All Superfood Powders | Moringa, Amla & Sattu | Sarvital`
- **Description:** `Browse lab-tested moringa, amla & sattu powders and combos. Vegan, gluten-free. Sarvital — ships India.`
- **Intro:** 150–250 words on superfood powders (crawlable in collection description)

#### P2-B: Two pillar articles only (Owner: Content)

Publish **two** posts first (not three — focus):

| Article | Target query | Links to |
|---------|--------------|----------|
| **Sattu protein powder: benefits & how to use** | sattu powder protein, sattu protein powder | Sattu PDP, FAQ |
| **Moringa powder guide for daily wellness** | moringa powder how to use, moringa powder india | Moringa PDP, FAQ |

Each article:

- TL;DR (3 bullets) at top
- 1,200–1,500 words
- 5-question FAQ at bottom + FAQPage schema
- 2+ internal links to PDPs

**Gate P2:** 2 URLs indexed; combined ≥20 organic clicks/month from non-brand queries within 90 days of publish.

#### P2-C: Judge.me review growth (Owner: Ops)

| Step | Action |
|------|--------|
| 1 | Post-purchase email → review request (7 days after delivery) |
| 2 | When product has ≥10 reviews, schema auto-emits via existing `meta-tags.liquid` |

**Gate P2-C:** Moringa + Sattu each ≥10 reviews before enabling aggregateRating in schema.

---

### Phase P3 — Measure & compound (Month 3–12)

**Goal:** Scale what worked; cut what didn't.

#### Monthly dashboard (15 min)

| Source | Metrics |
|--------|---------|
| GSC | Clicks, impressions, CTR, top queries, top pages, indexed count, CWV |
| GA4 | Organic sessions, organic revenue, landing pages, engagement time |
| Shopify | Google referrer sessions, sales by product |

#### Quarterly decisions

| If… | Then… |
|-----|-------|
| Sattu non-brand clicks growing | Add 2 more sattu recipes/articles |
| Moringa brand searches growing | Brand campaigns + homepage schema |
| PDP CTR still &lt;2% after meta fix | Rewrite descriptions again; check position (may need backlinks) |
| Organic revenue still ₹0 at 6 months | SEO assists direct — check GA4 path exploration; don't kill SEO |
| Paid social ROAS drops | Increase organic content budget, not decrease SEO |

---

## 5. SEO + GEO + AEO — one checklist per URL type

### Homepage `/`

| SEO | GEO | AEO |
|-----|-----|-----|
| Title ✓ (admin done) | llms.txt summary | WebPage schema ✓ |
| Meta description ✓ | agents.md positioning | FAQ section + FAQPage schema |
| 500–800 words educational HTML (P2) | Link to /pages/faq | Definition paragraph in first screen |
| H1 single, H2 for sections | | |

### Product PDP

| SEO | GEO | AEO |
|-----|-----|-----|
| Unique title + meta (P0-B) | Product in llms.txt with benefit line | Product schema ✓ |
| H1 = product name | agents.md product list | product_faq metafield + FAQPage |
| perfect_for + how_to_use sections | | How-to in first 200 words |
| Internal links to combos | | |

### FAQ `/pages/faq`

| SEO | GEO | AEO |
|-----|-----|-----|
| Indexable, linked from footer | Linked in llms.txt + agents.md | FAQPage schema (canonical) |
| Matches metafield copy | | Answers written for AI citation (plain, factual) |

### Blog article

| SEO | GEO | AEO |
|-----|-----|-----|
| Title + meta with target query | Mention in llms.txt when published | Article schema ✓ |
| Internal links to PDP | | TL;DR + FAQ block at end |

---

## 6. 90-day scorecard (pass = playbook working)

Record baseline **today**, re-score at **day 90**.

| # | Metric | Baseline (Jun 2026) | Day-90 target | Pass? |
|---|--------|---------------------|---------------|-------|
| 1 | Google sessions (Shopify 30d) | ~22 | ≥60 | |
| 2 | GSC clicks (India, 28d) | ~60 | ≥120 | |
| 3 | Non-brand GSC clicks (28d) | 0 | ≥5 | |
| 4 | Sattu PDP CTR (GSC) | ~1.5% | ≥3% | |
| 5 | Moringa PDP CTR (GSC) | ~1.2% | ≥3% | |
| 6 | Spam URL impressions | 158+ | 0 | |
| 7 | Mobile CWV poor URLs | 8 | 0 on key templates | |
| 8 | FAQPage valid (Rich Results Test) | No | Yes *(GEO/AEO; not SERP snippets)* | |
| 9 | Organic GA4 revenue (30d) | ₹0 | ≥₹2,000 | |
| 10 | Indexed pages (real) | 12 | 15–20 | |

**If fewer than 6/10 pass at day 90:** Re-audit GSC 404 export and PDP positions before adding more content.

**If 8+/10 pass:** Proceed to P2 blog expansion and combo landing pages.

---

## 7. What to keep running in parallel (non-negotiable)

| Channel | Why |
|---------|-----|
| **Paid Social** | 98% of revenue today — SEO does not replace this yet |
| **GA4 + GSC monitoring** | Proof the playbook works |
| **Mobile UX** | 94% of sessions |

SEO/GEO/AEO **reduces dependence** on paid over time; it does not replace it in quarter 1.

---

## 8. Implementation order (single list)

Do in this exact order:

1. ☐ P0-A Spam / 404 audit  
2. ☐ P0-B PDP meta (all 7 products)  
3. ☐ P0-D Theme title tag fix  
4. ☐ P0-C Mobile CWV fixes  
5. ☐ P1-A FAQPage JSON-LD  
6. ☐ P1-B `/pages/faq`  
7. ☐ P1-C Sattu protein on-page block  
8. ☐ P1-D llms.txt enrichment  
9. ☐ P2-A Collection copy  
10. ☐ P2-B Two pillar articles  
11. ☐ P2-C Review requests  
12. ☐ P3 Monthly scorecard  

**Dev tasks (theme):** 3, 4, 5, 7 — can batch in one PR.  
**Admin tasks:** 2, 6, 8, 9, 10, 11 — can start same day as 2.

---

## 9. Files to change (dev reference)

| Task | File |
|------|------|
| Title tag | `snippets/meta-tags.liquid` |
| FAQPage schema | `snippets/faq-schema.liquid` (new), `sections/home-faq.liquid`, `sections/product-faq.liquid` |
| llms.txt | `templates/llms.txt.liquid` |
| agents.md sync | `templates/agents.md.liquid` |
| Product schema | `snippets/meta-tags.liquid` (done) |
| robots / AI crawlers | `templates/robots.txt.liquid` (done) |

---

## 10. Final statement

This playbook is aligned with **your measured data** and **published industry evidence** as of June 2026. It does **not** promise rankings or revenue Google controls (~**76–80%** confidence on measurable improvement in 90 days if P0+P1 are fully executed).

1. Every identified leak (PDP CTR, index spam, CWV, missing schema) has a **specific fix**.  
2. Every fix has a **verification gate** (Section 6 scorecard).  
3. Success is measured against **your baseline**, not competitor fantasy numbers.  
4. **Paid social continues** (98% revenue today) while organic compounds.

**Next chat handoff message:**

> Implement P0/P1 from `docs/SEO-GEO-AEO-PLAYBOOK.md`: FAQPage JSON-LD, theme title tag fix, llms.txt enrichment. Admin handles PDP meta (P0-B) separately.

---

## 11. Evidence appendix (sources)

| Topic | Source | Key finding |
|-------|--------|-------------|
| Meta title CTR | [THM SEO case study](https://tomislavhorvat.com/boosting-ctr-with-post-title-optimization-case-study/) | CTR 1.5%→4.8% from title rewrites |
| Meta description (India) | [SearchPilot](https://www.searchpilot.com/resources/case-studies/does-adding-save-30-messaging-to-meta-descriptions-improve-organic-traffic) | +21.2% organic sessions in India market |
| Meta best practices | [SalesHive 2025](https://saleshive.com/blog/seo-meta-data-best-practices-rankings-2025/) | Measure CTR in GSC 4–8 weeks post-change |
| India ecom SEO timeline | [Beskymarketing](https://beskymarketing.com/ecommerce-seo-case-study-india/) | 8–12 weeks ranking movement; 4–6 mo revenue |
| Ecom traffic growth | [Brimcove](https://brimcove.com/ecommerce-seo-case-study/) | +12% in 4 wk (technical); +67% by week 12 (on-page) |
| SEO timeline consensus | [Industry summary](https://socialsellinator.com/best-seo-agency-denver/) | First movement 60–90 days |
| Core Web Vitals | [Perficient study](https://www.perficient.com/insights/research-hub/impact-of-core-web-vitals-on-ranking) | Minor ranking factor; UX/conversion matter more |
| CWV poor→good | [Dream Code Labs](https://www.dreamcodelabs.com/blog/core-web-vitals-2025-what-moves-the-needle) | 4–7 position lift mobile in ~60 days (dataset) |
| FAQ rich results removed | [Honchō May 2026](https://honchosearch.com/blogs/news/google-is-removing-faq-rich-results-from-search) | FAQ snippets largely gone from Google SERP |
| FAQ for GEO/AEO | [Frase](https://www.frase.io/blog/faq-schema-ai-search-geo-aeo) | Schema aids AI citation (vendor data — directional) |

---

## 12. Document map

| Doc | Use for |
|-----|---------|
| **SEO-GEO-AEO-PLAYBOOK.md** (this file) | Execution order, copy-paste meta, gates, scorecard |
| SEO-GEO-AEO-IMPLEMENTATION-GUIDE.md | Technical depth, flywheel, copy bank, backlog detail |
| COMPETITOR-SEO-GEO-AEO.md | Competitor intel, keyword battlegrounds, market context |

---

*Document version: 1.1 — Data + evidence update, Jun 9, 2026*
