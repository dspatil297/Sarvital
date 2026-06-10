# Sarvital SEO, GEO & AEO Implementation Guide

**Version:** 1.1 (Jun 9, 2026)  
**Primary execution doc:** [SEO-GEO-AEO-PLAYBOOK.md](./SEO-GEO-AEO-PLAYBOOK.md) — use for P0–P3 order, copy-paste meta, scorecard, confidence levels  
**Companion:** [COMPETITOR-SEO-GEO-AEO.md](./COMPETITOR-SEO-GEO-AEO.md)  
**Site:** sarvital.com  
**Audience:** Founders, content, and dev — technical depth and strategy context

---

## 0. Analytics baseline (Jun 2026 — validated)

Use these numbers as the **source of truth** for targets. Full tables in the Playbook §1.

| Source | Key finding |
|--------|-------------|
| **GSC (India, ~3 mo)** | ~180 clicks, ~501 impr; **brand query `sarvital` = 62 clicks**; non-brand ≈ 0 clicks |
| **GSC PDP CTR crisis** | Sattu 4/270 (~1.5%), Moringa 3/246 (~1.2%), Amla 0/136 |
| **GSC index** | 12 indexed; **5,193 404s**, **4,249 crawled-not-indexed**; spam URLs (`/very-well-casino-uk/`, gambling) |
| **GSC CWV (mobile)** | 8 poor URLs, 0 good |
| **GA4 (30d)** | 6,719 sessions; **Paid Social = 98% revenue** (~₹27.6K); Organic 208 sessions, **₹0 revenue** |
| **GA4 organic quality** | 114 users, 1m 01s engagement, 7% key-event rate — good intent, tiny volume |
| **Shopify** | ~22 Google sessions/30d; **94% mobile**; top cities Pune, Mumbai, Bengaluru |
| **Shopify sales** | Moringa 43 units, Sattu 39, Amla 7 |
| **Admin SEO** | Homepage title/description **already good**; **7 PDP titles weak** (e.g. “Moringa Powder” only) |

**Strategy override from data:** Dual hero — **Moringa** (revenue leader) + **Sattu** (only non-brand GSC wedge: `sattu powder protein`). SEO is **layer 2**; Paid Social remains primary revenue.

---

## 1. What we are optimizing for

### Not this

- Raw visit counts from low-intent keywords (“dry fruits near me”, generic “herbal medicines”)
- AI crawler traffic that never converts
- Keyword-stuffed footers (Saptamveda-style)
- Fake review schema or inflated ratings

### This

**Qualified traffic** = users who arrive with **purchase or strong consideration intent**, engage with product/education content, and can convert on Shopify.

| Signal | Why it matters |
|--------|----------------|
| Organic clicks on product/commercial queries | Buyer intent |
| PDP views from search (not just homepage) | Catalog depth |
| Add-to-cart / begin checkout from organic | Revenue path |
| Returning visitors from search | Trust + fit |
| AI citations that link to PDP or FAQ | GEO/AEO with intent |
| Review velocity (real Judge.me) | E-E-A-T + CTR |

### North-star metrics (data-calibrated — track monthly)

| Metric | Baseline (Jun 2026) | 90-day target | 12-month stretch |
|--------|---------------------|---------------|------------------|
| Google sessions (Shopify 30d) | ~22 | ≥60 (2–3×) | 200–500/mo |
| GSC clicks (India, 28d) | ~60 | ≥120 | 300+ |
| Non-brand GSC clicks | 0 | ≥5 | 30+ |
| Sattu / Moringa PDP CTR | ~1.5% / ~1.2% | ≥3% each | ≥4% |
| Organic GA4 revenue (30d) | ₹0 | ≥₹2,000 | Meaningful % of total |
| Indexed real pages | 12 | 15–20 | 25+ |
| Mobile CWV poor URLs | 8 | 0 on key templates | Sustained good |
| FAQPage valid (Rich Results Test) | No | Yes | Yes |

**Confidence on 90-day targets:** ~68–76% if P0+P1 fully executed (see Playbook §0).  
**Revenue proxy:** Beating **The Good Leaf** (~₹1.7 Cr) requires **conversion + repeat**, not vanity traffic.

---

## 2. Strategic positioning (one sentence for all channels)

> **Sarvital is India’s lab-tested natural superfood powder brand** — moringa, amla, and sattu for daily wellness, with vegan, gluten-free, additive-free formulations and combo value packs.

Every SEO title, GEO file, and AEO answer should reinforce:

1. **Lab-tested** (trust — Kapiva/Organic India don’t own this for powders)
2. **Powder format** (smoothies, drinks, cooking — not gummies/juices)
3. **Three-hero lineup** (moringa + amla + sattu — broader than moringa-only peers)
4. **India D2C** (shipping, ₹ pricing, farmer sourcing)

Do **not** chase “modern Ayurveda” head-on (Kapiva) or “tulsi tea” (Organic India). Own **lab-tested superfood powders**.

---

## 3. The unified flywheel

SEO, GEO, and AEO are **one system** with three surfaces:

```mermaid
flowchart LR
  subgraph content [Citation-ready content]
    PDP[Product pages]
    FAQ[FAQ hub + metafields]
    Guide[Pillar guides / blog]
  end

  subgraph technical [Machine-readable layer]
    Schema[JSON-LD Product FAQPage WebPage]
    LLMS[llms.txt + agents.md]
    Robots[robots.txt AI allow]
  end

  subgraph discovery [Discovery channels]
    Google[Google Search + AI Overviews]
    AI[ChatGPT Perplexity Claude]
    Agents[Shopping agents UCP]
  end

  content --> technical
  technical --> discovery
  discovery --> PDP
  PDP --> content
```

**Rule:** Write each piece of content **once** (metafield or section), then **reuse** for HTML, JSON-LD, and `llms.txt`. Never maintain three different FAQ wordings.

---

## 4. Traffic strategy by phase

### Where Sarvital is today

- **Tier:** T3 (early D2C; ~22 Google sessions/mo)
- **Revenue today:** 98% Paid Social (GA4) — SEO does not replace this in Q1
- **Assets ahead of peers:** Custom `agents.md`, `llms.txt`, `robots.txt`, OpenAPI, UCP
- **Gaps:** PDP meta CTR, index spam/404s, mobile CWV, FAQPage schema, educational depth, blog, review volume
- **Homepage admin SEO:** Done — focus on **7 PDP metas**

### Realistic growth curve (evidence-adjusted)

| Phase | Timeline | Primary lever | Expected scale |
|-------|----------|---------------|----------------|
| **Foundation (P0)** | Weeks 1–4 | Spam/404 audit, PDP meta, CWV, title tag | 2–3× Google sessions (~60/mo) |
| **Authority (P1)** | Weeks 3–8 | FAQ schema (GEO/AEO), `/pages/faq`, Sattu protein block | First non-brand clicks |
| **Compounding (P2+)** | Months 3–12 | Blog + reviews + internal links | 200–500 organic/mo realistic; 10K+/mo = stretch (~20–30% confidence) |

**Heavy legitimate traffic** (50K+ qualified organic/mo) is **12–24 months** with sustained execution — not a 90-day outcome.

---

## 5. Keyword strategy — intent-first clusters

### Priority matrix

| Cluster | Example queries | Intent | Competition | Sarvital action |
|---------|-----------------|--------|-------------|-----------------|
| **A — Product transactional** | buy moringa powder online india; **sattu protein powder** | High | Medium | PDP meta + Product schema; **Sattu = SEO wedge** |
| **B — Product informational** | how to use moringa powder; **sattu powder protein benefits**; amla powder benefits | Medium–high | Low–medium | PDP sections + blog (Sattu article first) |
| **C — Category brand** | sarvital, sarvital moringa | High | None (own brand) | Homepage + Organization schema |
| **D — Combo / differentiation** | moringa amla combo powder, superfood powder vegan india | Medium | Low | Combo PDPs + llms.txt |
| **E — Avoid (for now)** | ayurvedic supplements, best kapiva alternative, dry fruits online | Low or wrong fit | Very high | Do not optimize |

### URL ownership map

| URL | Owns cluster | Primary template |
|-----|--------------|------------------|
| `/` | Brand + category intro | Homepage + WebPage schema |
| `/collections/all` | Browse superfood powders | Collection intro copy |
| `/products/moringa-powder` (etc.) | A + B per SKU | PDP + Product + FAQPage |
| `/pages/faq` | B + trust objections | FAQPage (canonical) |
| `/pages/recipes` | B usage intent | Internal links to PDPs |
| `/blogs/wellness/*` (future) | B depth | Article schema |

**One primary keyword per URL.** No cannibalization (e.g. don’t target “moringa powder benefits” on homepage and PDP with equal weight — PDP wins).

---

## 6. SEO — optimal implementation

### 6.1 Technical (theme — already partial)

| Task | File / location | Status | Priority |
|------|-----------------|--------|----------|
| Product / Organization / WebPage JSON-LD | `snippets/meta-tags.liquid` | Done | — |
| Remove fake aggregateRating | `snippets/meta-tags.liquid` | Done | — |
| FAQPage JSON-LD | New `snippets/faq-schema.liquid` + home/product FAQ sections | **Todo** | P1 (GEO/AEO; Google FAQ rich snippets largely removed May 2026) |
| Title tag without legal entity suffix | `snippets/meta-tags.liquid` | **Todo** | P0 |
| Homepage admin meta | Shopify Admin | **Done** | — |
| PDP admin meta (7 products) | Shopify Admin | **Todo** | P0 |
| H1/H2 hierarchy on PDP sections | product-benefits-compact, ingredients, trust, FAQ | Done | — |
| Canonical, OG, Twitter | `snippets/meta-tags.liquid` | Done | — |
| Sitemap | Shopify native | Done | — |
| Core Web Vitals (mobile) | Theme performance | **8 poor URLs** | P0 |
| Spam / 404 cleanup | GSC export + Shopify Pages/Redirects | **5,193 404s in GSC** | P0 |

**Title tag rule (implement in theme + admin):**

```
Homepage:  Natural Superfood Powders | Lab-Tested & Vegan | Sarvital
Product:   Moringa Powder | Lab-Tested Superfood | Sarvital
           (≤ 60 chars; brand once; no "Sarvadnya Foodtech Private Limited")
```

Set **Search engine listing** in Shopify Admin for homepage and each product so `page_title` does not rely on auto-append logic alone.

### 6.2 On-page SEO (admin + content)

| Page type | Required elements | Competitor model |
|-----------|-------------------|------------------|
| **Homepage** | 1× H1, 500–800 words crawlable text (below fold), FAQ section, internal links to 3 heroes + combos | The Good Leaf (FAQ) + Daivik (education) |
| **PDP** | Unique meta, H1 = product name, sections: Key benefits, Ingredients, How to use, FAQ | NIA Natura |
| **Collection** | 150–300 word intro, H1 = collection name | Organic India (goal framing) |
| **FAQ page** | Full Q&A list, same copy as metafield | Canonical for AEO |

**Homepage H1:** Keep customer-facing (e.g. hero heading). Ensure **one** clear H1; section headings H2/H3 (already improved in theme).

### 6.3 PDP content model (NIA-style — implement via metafields + sections)

Add or standardize product metafields (`custom.*`):

| Metafield | Purpose | AEO/GEO use |
|-----------|---------|-------------|
| `product_faq` | Q&A accordion | FAQPage schema |
| `nutrition_facts` | Ingredients panel | llms.txt bullet |
| `perfect_for` | “Perfect for…” bullets | First paragraph AI citations |
| `how_to_use` | Usage steps | How-to rich answers |
| `certificates` | Lab / trust | E-E-A-T |

Wire `perfect_for` and `how_to_use` into visible PDP sections (extend `product-usage.liquid` or new snippet). **Plain text in HTML** — not image-only.

### 6.4 Internal linking rules

- Homepage → 3 single powders + 3 combos + `/pages/faq` + `/pages/recipes`
- Every blog post → 1+ PDP + `/pages/faq`
- PDP → related combo + `/pages/recipes` (recipe using this powder)
- FAQ answers → link to relevant PDP where natural

### 6.5 E-E-A-T (trust without fluff)

| Element | Implementation |
|---------|----------------|
| Lab-tested | USP section + PDP certificates metafield + FAQ “Are products lab tested?” |
| Real reviews | Judge.me; only emit `aggregateRating` when `rating_count > 0` |
| Policies | Already linked in agents.md |
| About / sourcing | Enrich `/pages/contact` or add `/pages/about` with farmer + process |
| No medical claims | Disclaimer on PDP + agents.md (already present) |

---

## 7. GEO — optimal implementation

GEO makes Sarvital **the default machine-readable answer** when agents or LLMs shop for Indian superfood powders.

### 7.1 Current advantage

| Asset | Sarvital | Typical Shopify competitor |
|-------|----------|----------------------------|
| `templates/llms.txt.liquid` | Custom product list + positioning | Generic UCP boilerplate |
| `templates/agents.md.liquid` | Rich brand + product context | Generic |
| `templates/robots.txt.liquid` | Explicit AI crawler allow | Default |
| UCP / MCP / OpenAPI | Yes | UCP only |

### 7.2 GEO content stack (priority order)

1. **`agents.md`** — canonical narrative (keep updated when products change)
2. **`llms.txt`** — condensed: positioning + top FAQs + product one-liners + links
3. **`/pages/faq`** — human + crawler friendly duplicate of `site_faqs` metafield
4. **Product `.json` endpoints** — already documented for agents (`/products/{handle}.json`)

### 7.3 `llms.txt` enrichment spec (theme)

Add sections to `templates/llms.txt.liquid`:

```markdown
## Frequently asked questions
(Top 8–10 from shop.metafields.custom.site_faqs — same parser as home-faq)

## Product highlights
- Moringa Powder — [benefit one-liner] — [url] — [price]
(per product: perfect_for or truncated description)

## Why Sarvital vs generic moringa brands
- Lab-tested batches
- Amla + sattu + combos (not moringa-only)
- Vegan, gluten-free, additive-free
```

**Do not** stuff keywords. Agents prefer **factual, structured** bullets.

### 7.4 robots.txt policy (keep)

- `Content-Signal: ai-train=no, search=yes, ai-input=yes` — allow citation and shopping, limit training where policy requires
- Allow: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.
- Disallow: checkout, cart, account

### 7.5 GEO success checks (manual, monthly)

Query in Perplexity / ChatGPT / Google AI Mode:

- “Best lab tested moringa powder India”
- “Sarvital moringa powder review”
- “Amla powder for immunity India buy”

Log whether Sarvital is cited, which URL is cited, and which competitor appears instead.

---

## 8. AEO — optimal implementation

AEO = **structured answers** that Google and AI can quote with a link back.

### 8.1 Highest ROI: FAQPage schema (no competitor has it)

**Data source (already in theme):**

- Home: `shop.metafields.custom.site_faqs` → parsed in `sections/home-faq.liquid`
- Product: `product.metafields.custom.product_faq` → parsed in `sections/product-faq.liquid`

**Implementation spec:**

1. Create `snippets/faq-schema.liquid` accepting `faq_items` (parsed Q/A array)
2. Output single `FAQPage` JSON-LD with `mainEntity` Question/Answer pairs
3. Render snippet at bottom of `home-faq.liquid` and `product-faq.liquid` (only when `faq_items.size > 0`)
4. Strip HTML from answers in schema (plain text only)
5. Validate: [Google Rich Results Test](https://search.google.com/test/rich-results)

**Also:** Add same schema on `/pages/faq` when that page exists.

### 8.2 AEO content patterns (per page)

| Pattern | Example | Where |
|---------|---------|-------|
| **Definition sentence** | “Moringa powder is dried, ground moringa leaf…” | First 2 sentences of PDP description |
| **Numbered how-to** | “How to use: 1) Add ½ tsp to smoothie…” | `how_to_use` metafield |
| **Comparison** | “Unlike single-ingredient brands, Sarvital offers…” | FAQ or llms.txt only (factual) |
| **Objection handling** | “Is it safe during pregnancy?” | FAQ |
| **Spec table** | Serving size, protein, vitamin C | nutrition_facts section |

### 8.3 Schema roadmap

| Schema | Page | Priority |
|--------|------|----------|
| FAQPage | Home FAQ, product FAQ, /pages/faq | P1 (primary value = GEO/AEO, not Google FAQ snippets) |
| Product | PDP | Done |
| Organization | All | Done |
| WebPage | Homepage | Done |
| CollectionPage | Collections | Done |
| Article | Blog (future) | P2 |
| BreadcrumbList | PDP, collections | P3 |
| aggregateRating | PDP | Only when Judge.me count > 0 |

### 8.4 Pages to create (admin)

| Page | Handle | Purpose |
|------|--------|---------|
| FAQ | `faq` | Canonical FAQ hub; link from footer + llms.txt |
| About (optional) | `about` | E-E-A-T: lab process, farmers, founders |
| Moringa guide (optional) | `moringa-guide` | Long-form SEO/AEO pillar |

---

## 9. Content calendar — minimum viable authority

### Month 1 (foundation — no blog required)

- [x] Admin: homepage meta title/description *(done Jun 2026)*
- [ ] **P0-A:** GSC 404 export + spam URL audit (casino/gambling pages)
- [ ] **P0-B:** 7 product meta titles/descriptions (copy in Playbook § P0-B)
- [ ] **P0-C:** Mobile CWV fixes on key templates
- [ ] **P0-D:** Theme title tag fix (`snippets/meta-tags.liquid`)
- [ ] **P1-A:** FAQPage JSON-LD
- [ ] Admin: `/pages/faq` mirroring `site_faqs`
- [ ] **P1-C:** Sattu protein on-page block (wedge keyword)
- [ ] Theme: llms.txt FAQ + product highlights
- [ ] Admin: populate `perfect_for` + `how_to_use` on 7 products
- [ ] Homepage: add 500-word educational block (P2)

### Month 2 (3 pillar articles — blog)

| Article | Target cluster | Links to |
|---------|----------------|----------|
| Sattu: plant protein powder guide (India) | B + wedge | Sattu PDP, FAQ — **publish first** |
| Complete guide to moringa powder (India) | B | Moringa PDP, FAQ |
| Amla powder: benefits and how to use | B | Amla PDP |

**Article template:**

- TL;DR (3 bullets) at top — **AEO gold**
- H2 per subtopic, definition in first paragraph
- 1 comparison table (optional)
- 5-question FAQ at bottom + FAQPage schema
- 1,200–1,800 words each

### Month 3+

- Combo guides (“moringa + amla morning routine”)
- Recipe posts linking to `/pages/recipes`
- Review request flow post-purchase (Judge.me)

---

## 10. Implementation backlog (ordered)

### P0 — Week 1–2 (max intent per hour)

| # | Task | Owner | Files / notes |
|---|------|-------|---------------|
| 1 | **Spam / 404 audit** — export GSC, remove casino/gambling pages, fix redirects | Admin | GSC → Pages; Shopify Pages/Redirects |
| 2 | **PDP meta** (7 products) — homepage already done | Admin | Playbook § P0-B |
| 3 | Title tag: no legal entity suffix; short `Sarvital` | Dev | `snippets/meta-tags.liquid` |
| 4 | Mobile CWV fixes (8 poor URLs) | Dev | Theme performance audit |
| 5 | GSC + GA4 baseline export | Admin | Done — see §0 |

### P1 — Week 2–4

| # | Task | Owner | Files |
|---|------|-------|-------|
| 6 | FAQPage JSON-LD | Dev | `snippets/faq-schema.liquid`, FAQ sections |
| 7 | Enrich `llms.txt` with FAQs + product highlights | Dev | `templates/llms.txt.liquid` |
| 8 | Create `/pages/faq` | Admin | Shopify Pages |
| 9 | Sattu protein on-page block | Admin + Dev | PDP section |

### P2 — Week 4–8

| # | Task | Owner |
|---|------|-------|
| 10 | PDP metafields: `perfect_for`, `how_to_use` on all SKUs | Admin |
| 11 | Visible PDP sections for perfect_for / how_to_use | Dev |
| 12 | Homepage educational section (500–800 words) | Admin + Dev |
| 13 | Collection intro copy for `/collections/all` | Admin |
| 14 | Sync top FAQs into `agents.md` | Dev |
| 15 | Post-purchase review request (Judge.me) | Admin |

### P3 — Month 2–3

| # | Task | Owner |
|---|------|-------|
| 16 | Launch blog + 3 pillar articles (Sattu first) | Content |
| 17 | Article JSON-LD (already in meta-tags) | Dev |
| 18 | `/pages/about` or expand contact with E-E-A-T | Admin |
| 19 | BreadcrumbList schema | Dev |
| 20 | Monthly GEO citation check spreadsheet | Marketing |

### P4 — Ongoing

| # | Task | Owner |
|---|------|-------|
| 21 | 90-day scorecard (Playbook §6) | Marketing |
| 22 | Competitor traffic + SERP monitoring | Marketing |
| 23 | Expand catalog only with matching SEO/AEO content per SKU | Product |

---

## 11. Copy bank — ready for Shopify Admin

### Homepage

- **Title:** `Natural Superfood Powders | Lab-Tested & Vegan | Sarvital`
- **Meta description:** `Shop premium natural fruit & vegetable powders from Sarvital. Lab-tested, vegan & gluten-free superfoods for smoothies, drinks & daily wellness. Sustainably sourced in India.`

### Products (title pattern: `{Product} | Lab-Tested Superfood | Sarvital`)

| Product | Meta description (≤ 160 chars) |
|---------|-------------------------------|
| Moringa Powder | `Buy lab-tested moringa powder from Sarvital. Rich in vitamins & antioxidants for smoothies & daily energy. Vegan, gluten-free. Ships across India.` |
| Amla Powder | `Premium amla powder for immunity & vitamin C. Lab-tested, vegan superfood from Sarvital. Add to drinks, smoothies & recipes. Shop online India.` |
| Sattu Protein Powder | `Traditional sattu protein powder — plant protein, iron & fiber. Lab-tested by Sarvital for sharbat, chilla & daily nutrition. Vegan. Buy online India.` |
| Moringa + Amla Combo | `Moringa & amla combo powder — energy plus immunity support. Lab-tested, vegan 150g packs from Sarvital. Ideal for daily wellness routines.` |
| Moringa + Sattu Combo | `Moringa & sattu combo — antioxidants plus plant protein. Lab-tested superfood powder from Sarvital. For smoothies, shakes & fitness.` |
| Sattu + Amla Combo | `Sattu & amla combo powder — protein & vitamin C in one. Lab-tested, vegan from Sarvital. Perfect for sharbat, breakfast & recovery.` |
| Ultimate Wellness Combo | `Moringa, amla & sattu trio combo — complete daily superfood stack. Lab-tested vegan powders from Sarvital. Save with bundle pricing.` |

### Collection: All products

- **Title:** `Shop All Superfood Powders | Moringa, Amla & Sattu | Sarvital`
- **Meta description:** `Browse all Sarvital lab-tested superfood powders — moringa, amla, sattu & value combos. Vegan, gluten-free. Sustainably sourced in India.`

---

## 12. Quality gates before shipping each change

### SEO

- [ ] Unique title + meta per URL
- [ ] One H1 per page
- [ ] No duplicate meta across PDPs
- [ ] Rich Results Test passes for Product (+ FAQ when added)
- [ ] Mobile-friendly + canonical present

### GEO

- [ ] `llms.txt` and `agents.md` return 200
- [ ] Product count and prices match live catalog
- [ ] FAQs in llms.txt match visible FAQ
- [ ] robots.txt allows AI crawlers on /products, /pages, /llms.txt

### AEO

- [ ] FAQ visible in HTML (not JS-only)
- [ ] FAQPage JSON-LD matches visible Q&A
- [ ] Definition sentence in first 160 words of PDP
- [ ] No unsubstantiated health cure claims

### Traffic quality

- [ ] Landing page matches query intent (product query → PDP)
- [ ] GA4 event: `view_item` from organic PDP landings trackable
- [ ] Bounce rate on organic PDP < site average (after 30 days)

---

## 13. What to skip (learned from competitors)

| Tactic | Why skip |
|--------|----------|
| Footer keyword paragraphs | Saptamveda pattern; risks spam signals |
| Chasing “ayurvedic supplements” head terms | Kapiva / Organic India dominate |
| Fake reviews / schema | Penalty risk; already removed |
| Generic “Store” homepage title | Daivik mistake |
| llms.txt with only UCP boilerplate | You already beat this — don’t regress |
| Broad catalog expansion without content | Dilutes topical authority |

---

## 14. Success scenario (evidence-calibrated)

| Outcome | 90-day (P0+P1) | 12-month (full program) | Confidence |
|---------|----------------|-------------------------|------------|
| PDP CTR improvement | 1% → 3%+ | Sustained 4%+ | ~85% / ~70% |
| Google sessions | 2–3× (~60/mo) | 200–500/mo realistic | ~70% / ~50% |
| Non-brand clicks | First 5+ | 30+ | ~60% / ~45% |
| Organic revenue | ≥₹2K/mo | Meaningful % of total | ~55% / ~50–60% |
| AI citations | Early signals | 2+ engines for lab-tested queries | ~50% / ~65% |
| Heavy traffic (10K+/mo) | Unlikely | Stretch goal | ~15% / ~25% |

**Path to scale:** Keep Paid Social running; organic compounds as layer 2. Do not pause ads for SEO.

---

## 15. Implementation handoff

**Use [SEO-GEO-AEO-PLAYBOOK.md](./SEO-GEO-AEO-PLAYBOOK.md) for execution order.** This guide provides technical depth.

When ready to build (next chat):

1. **P0-A** Spam / 404 audit (admin)  
2. **P0-B** PDP meta copy (admin — Playbook § P0-B)  
3. **P0-D** Theme title tag (`snippets/meta-tags.liquid`)  
4. **P0-C** Mobile CWV  
5. **P1-A** `snippets/faq-schema.liquid` + FAQ sections  
6. **P1-D** `llms.txt` enrichment  

Evidence sources: Playbook §11.

---

## Appendix — File reference

| Purpose | Path |
|---------|------|
| Meta + JSON-LD | `snippets/meta-tags.liquid` |
| Home FAQ + parser | `sections/home-faq.liquid` |
| Product FAQ + parser | `sections/product-faq.liquid` |
| LLM summary | `templates/llms.txt.liquid` |
| Agent guide | `templates/agents.md.liquid` |
| Crawler policy | `templates/robots.txt.liquid` |
| Product template | `templates/product.json` |
| Competitor research | `docs/COMPETITOR-SEO-GEO-AEO.md` |
| Execution playbook | `docs/SEO-GEO-AEO-PLAYBOOK.md` |

---

*Document version: 1.1 — Analytics + evidence sync, Jun 9, 2026*
