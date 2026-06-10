# Sarvital Competitor Intelligence: SEO, GEO & AEO

**Version:** 1.1 (Jun 9, 2026)  
**Prepared for:** Sarvital (sarvital.com)  
**Scope:** 13 competitor domains — traffic estimates, on-page SEO, AI discovery (GEO), and answer-engine optimization (AEO)  
**Purpose:** Market context and competitive positioning. **Do not use for execution order.**

### Document map

| Doc | Role |
|-----|------|
| **[SEO-GEO-AEO-PLAYBOOK.md](./SEO-GEO-AEO-PLAYBOOK.md)** | **Start here** — P0–P3 tasks, copy-paste meta, 90-day scorecard, confidence levels |
| [SEO-GEO-AEO-IMPLEMENTATION-GUIDE.md](./SEO-GEO-AEO-IMPLEMENTATION-GUIDE.md) | Technical depth, flywheel, copy bank |
| **This file** | Competitor intel, keyword battlegrounds, gap vs market |

### Sarvital baseline (validated Jun 2026)

| Metric | Value |
|--------|-------|
| Google sessions (Shopify 30d) | ~22 |
| GSC clicks (India, ~3 mo) | ~180 (mostly brand) |
| Organic revenue (GA4 30d) | ₹0 |
| Paid Social revenue share | ~98% |
| PDP CTR (Sattu / Moringa) | ~1.5% / ~1.2% |
| Indexed pages | 12 (+ index noise: 5K+ 404s) |

**Implication:** Sarvital’s **GEO/AEO infrastructure leads the competitive set**, but **organic discovery lags** every measurable peer. Close the gap with PDP meta + index cleanup before chasing Kapiva-scale keywords.

---

## 1. Executive summary

Sarvital competes in **Indian natural wellness / superfood powders**, overlapping most directly with **moringa-first D2C brands** (The Good Leaf, Daivik Moringa, Saptamveda, NIA Natura, Earmark Organic, AsmitA) and indirectly with **Ayurveda giants** (Kapiva, Organic India, Maharishi Ayurveda).

### Traffic reality

| Tier | Scale | Who |
|------|-------|-----|
| **T1 — Category leaders** | ~500K–3M visits/mo | Kapiva (~2.8M), Organic India (~50K–700K depending on source) |
| **T2 — Measurable mid-tier** | ~10K–50K visits/mo | Saptamveda (~49K cited in third-party tools) |
| **T3 — Small D2C / niche** | &lt;10K (often unmeasurable) | The Good Leaf, Daivik, NIA Natura, Earmark, AsmitA, Naturesum, Shuddh Chandan |
| **T4 — Adjacent category** | Varies | Manna Foods (millets), Saanvi Dry Fruits (dry fruits) |

**Important:** Public traffic tools (SEMrush, Similarweb, Hupso, etc.) are **modeled estimates**, not analytics. Accuracy drops sharply below ~50K monthly visits. Revenue data (Tracxn, Inc42) is often more reliable for **business scale** than visit counts for small sites.

### Biggest strategic findings

1. **Nobody in this set ships `FAQPage` JSON-LD** — including Sarvital. First mover on structured FAQs wins AEO (Google rich results, AI citations).
2. **Most Shopify competitors only have default Shopify `llms.txt` / `agents.md`** — generic UCP boilerplate. Sarvital already has **custom, product-aware** `llms.txt` and agent discovery — a real GEO advantage if enriched further.
3. **Kapiva and Saanvi have no `llms.txt`** — enterprise/custom stacks ignore agent discovery; not a model for Sarvital.
4. **SEO winners use long-form education + trust** — Daivik (moringa tree encyclopedia), Organic India (goal-based navigation + blog), Kapiva (modern Ayurveda positioning), not keyword-stuffed footers alone.
5. **Sarvital title tag still appends full legal entity** (`Sarvital Sarvadnya Foodtech Private Limited`) — hurts SERP CTR vs cleaner competitor titles.

---

## 2. Competitor universe

### Direct competitors (moringa / superfood powders)

| Domain | Positioning | Platform | Est. monthly visits | Est. revenue / scale |
|--------|-------------|----------|---------------------|----------------------|
| [thegoodleaf.in](https://thegoodleaf.in/) | Moringa beauty + edibles, Tamil Nadu farm story | Shopify | Unreported (likely T3) | ₹1.71 Cr FY25 (Tracxn) |
| [daivikmoringa.com](https://www.daivikmoringa.com/) | Premium moringa health + personal care | Shopify | Unreported (global rank ~7.8M) | Small team (2–10) |
| [saptamveda.com](https://saptamveda.com/) | Herbal medicines + moringa SKUs | Shopify | ~48.8K (third-party, directional) | Mid D2C herbal |
| [nianatura.in](https://nianatura.in/) | Clean PDP: Perfect For / How to Use / Benefits | Shopify | Unreported (T3) | Moringa ₹275 price anchor |
| [earmarkorganic.com](https://earmarkorganic.com/) | Pure organic wellness + blog | Shopify | Unreported (T3) | Amazon + D2C |
| [asmitaorganicfarm.com](https://asmitaorganicfarm.com/) | Trusted organic food store + blogs | Shopify | Unreported (T3) | Moringa ~₹498 |

### Adjacent / category leaders

| Domain | Positioning | Platform | Est. monthly visits | Est. revenue / scale |
|--------|-------------|----------|---------------------|----------------------|
| [kapiva.in](https://kapiva.in/) | Modern Ayurveda, juices, gummies, wide catalog | Custom / headless | **~2.81M** (SEMrush Apr 2026) | ₹233.9 Cr FY24 (Inc42) |
| [organicindia.com](https://organicindia.com/) | Tulsi, teas, supplements, enterprise brand | Shopify Plus | **~50K–700K** (sources conflict) | $30.5M revenue (RocketReach) |
| [maharishiayurvedaindia.com](https://maharishiayurvedaindia.com/) | Authentic Maharishi Ayurveda supplements | Shopify | Unreported | Established Ayurveda brand |
| [naturesum.com](https://naturesum.com/) | Sea buckthorn hair/skin/wellness | Shopify | Unreported (T3) | Testimonial-heavy PDPs |
| [mannafoods.in](https://mannafoods.in/) | Millet health foods (adjacent) | Shopify | Unreported | Category adjacency |
| [saanvidryfruits.com](https://saanvidryfruits.com/) | Dry fruits (adjacent, local SEO title) | Unknown | Unreported | No AI discovery files |
| [shuddhchandan.com](https://shuddhchandan.com/) | Sandalwood / niche organic | Shopify | Unreported | Niche, not powder competitor |

### Sarvital (baseline)

| Domain | Positioning | Platform | Notes |
|--------|-------------|----------|-------|
| [sarvital.com](https://www.sarvital.com/) | Lab-tested fruit & vegetable powders (moringa, amla, sattu) | Shopify | Custom `llms.txt`, `agents.md`, `robots.txt`, OpenAPI; **no FAQPage schema** |

---

## 3. Traffic collection methodology

### Sources used

- **SEMrush** — Kapiva Apr 2026: 2.81M visits (−13.4% vs Mar)
- **Inc42** — Kapiva FY24 revenue ₹233.9 Cr; web traffic ~3.75M (30d, Mar 2026)
- **Tracxn** — The Good Leaf revenue ₹1.71 Cr (Mar 31, 2025)
- **RocketReach / Hupso / Website Informer** — Organic India: 1.6K–23K daily visitors (wide variance)
- **Third-party SEO blogs** — Saptamveda ~48.83K monthly visits (single source; treat as directional)
- **Live fetches** — Title tags, meta descriptions, `FAQPage` presence, `llms.txt` / `agents.md` HTTP status (Jun 9, 2026)

### Traffic tier definitions (for planning)

| Tier | Monthly visits (estimate) | Planning implication |
|------|---------------------------|----------------------|
| T1 | 500K+ | Brand + performance marketing + content moat; hard to outrank on head terms short-term |
| T2 | 10K–500K | SEO + PDP quality + reviews can close gap in 6–18 months |
| T3 | &lt;10K | Win on **long-tail**, **AEO**, **GEO**, and **conversion**; traffic tools unreliable |
| T4 | Adjacent | Steal keyword ideas (millet, dry fruits) but don’t chase their core category |

### Recommended ongoing traffic tracking

When budget allows, subscribe to **one** of SEMrush / Similarweb / Ahrefs and track monthly:

- sarvital.com
- thegoodleaf.in, daivikmoringa.com, saptamveda.com, nianatura.in, earmarkorganic.com, asmitaorganicfarm.com
- kapiva.in, organicindia.com (benchmark only)

Until then, use **Google Search Console** (actual data) + **GA4** as source of truth for Sarvital.

---

## 4. SEO reverse-engineering

### 4.1 Title & meta patterns (live capture, Jun 2026)

| Site | Homepage title pattern | Meta description quality |
|------|------------------------|--------------------------|
| The Good Leaf | `Brand \| Buy Moringa Based Products Online in India` | Benefit-led, price/value, handmade |
| Daivik Moringa | `Brand Store` (weak) | Missing on homepage fetch |
| Saptamveda | `Brand \| Buy Herbal Medicines & Products Online` | Broad herbal, lifestyle |
| NIA Natura (PDP) | `Product – BRAND` | Nutrients, antioxidants, use cases |
| Naturesum | `Brand - Clean & Organic Hair, Skin & Health` | Natural, cruelty-free, sustainable |
| Organic India | `Category keywords – Brand` (long) | Teas, supplements, personal care |
| Earmark Organic | `Brand \| Pure Organic Products for Health & Wellness` | Chemical-free, supplements |
| Maharishi Ayurveda | `Buy Brand - Authentic Ayurvedic Supplements Online` | Transactional + authenticity |
| Manna Foods | `Brand - Natural Millet Based Health Foods \| Buy Online` | Category-specific |
| AsmitA | `India's Trusted Organic Food Store Online - Brand` | Trust + organic |
| Shuddh Chandan | `Buy Brand products online at best prices on domain` | Template-heavy, weak |
| Kapiva | `Brand - Buy Modern Ayurvedic Products Online...` | Modern Ayurveda framing |
| **Sarvital** | `Brand \| Premium Natural Superfood Powders Online – Legal entity name` | Good copy; **legal suffix bloat** |

**Patterns that work**

- **Primary keyword + geography**: “Buy … Online in India”
- **Category in title**: moringa, herbal, millet, Ayurveda
- **Trust modifiers**: organic, lab-tested, authentic, pure
- **PDP titles**: `Product Name – Brand` (NIA Natura model)

**Anti-patterns observed**

- Generic “Store” titles (Daivik homepage)
- Keyword-stuffed local SEO titles (Saanvi: “Dry fruits near me, kaju, badam…”)
- Duplicate / template meta (Shuddh Chandan)

### 4.2 On-page content architecture

| Competitor | Homepage content strategy | PDP content strategy |
|------------|---------------------------|----------------------|
| **Daivik Moringa** | Long educational sections (leaves, flowers, seeds, pods) | Celebrity testimonials, benefit blocks |
| **The Good Leaf** | FAQ section on homepage, farm/founder story | Moringa SKUs ₹249–₹490 |
| **Saptamveda** | Category breadth (herbal medicines) | Footer SEO paragraphs (keyword dense) |
| **NIA Natura** | Minimal homepage | Structured: Perfect For, How to Use, Benefits |
| **Organic India** | Goal-based shop (immunity, detox, etc.) | Large catalog, blog hub |
| **Kapiva** | Lifestyle + product bundles | Rich media, reviews, cross-sell |
| **Earmark / AsmitA** | Blog + organic trust | Standard Shopify PDP + articles |

**Sarvital gap:** Strong product metafields and trust sections exist in theme; needs **more crawlable educational copy** on homepage and collection pages (GEO + SEO), similar to Daivik/NIA structure.

### 4.3 Technical SEO (observed)

| Signal | Shopify competitors | Sarvital |
|--------|---------------------|----------|
| JSON-LD (Organization / Product) | Common (2–4 blocks) | Yes (meta-tags.liquid) |
| FAQPage schema | **None detected** | **None** |
| Blog / articles | Organic India, AsmitA, Earmark | Verify content strategy |
| Sitemap | `/sitemap.xml` | Standard Shopify |
| Canonical / OG | Standard Shopify | Enhanced in theme |
| Fake aggregateRating | Unknown | **Removed** (fixed) |

### 4.4 Keyword battlegrounds (inferred)

**High competition (T1–T2)**  
- moringa powder, moringa benefits, ayurvedic supplements, organic india [product], kapiva [product]

**Winnable for Sarvital (T3 long-tail)**  
- moringa powder for smoothies, lab tested moringa powder india  
- amla powder benefits, sattu drink recipe, sattu protein  
- moringa amla combo, natural vegetable powder india  
- vegan gluten free superfood powder

**Adjacent traffic (optional content)**  
- millet health foods (Manna), dry fruits online (Saanvi) — only if expanding catalog

---

## 5. GEO reverse-engineering (Generative Engine Optimization)

GEO = making the site **machine-readable and citable** for ChatGPT, Perplexity, Claude, Google AI Overviews, and shopping agents.

### 5.1 AI discovery file audit

| Domain | `/llms.txt` | `/agents.md` | UCP `/.well-known/ucp` | Custom vs default |
|--------|-------------|--------------|------------------------|-------------------|
| thegoodleaf.in | 200 | 200 | Yes (Shopify) | Default Shopify template |
| daivikmoringa.com | 200 | 200 | Yes | Default |
| saptamveda.com | 200 | 200 | Yes | Default |
| nianatura.in | 200 | 200 | Yes | Default |
| naturesum.com | 200 | 200 | Yes | Default |
| organicindia.com | 200 | 200 | Yes | Default |
| maharishiayurvedaindia.com | 200 | 200 | Yes | Default |
| mannafoods.in | 200 | 200 | Yes | Default |
| asmitaorganicfarm.com | 200 | 200 | Yes | Default |
| shuddhchandan.com | 200 | 200 | Yes | Default |
| earmarkorganic.com | 200 | 200 | Yes | Default |
| **kapiva.in** | **No** | **No** | N/A | Custom stack |
| **saanvidryfruits.com** | **No** | **No** | Unknown | Legacy / custom |
| **sarvital.com** | **Custom** | **Custom** | Yes + worker assets | **Ahead of most peers** |

### 5.2 What default Shopify `llms.txt` contains

Competitors’ files are ~4KB boilerplate:

- UCP / MCP checkout flow
- Shop.app skill recommendation
- Read-only product JSON endpoints
- Policy URLs

**They do not include:** brand positioning, product benefits, FAQ answers, pricing context, or India-specific shipping — unless customized.

### 5.3 Sarvital GEO assets (current)

From `templates/llms.txt.liquid`:

- Brand summary, product list with URLs and prices
- Links to `agents.md`, OpenAPI, api-catalog
- UCP + MCP endpoints
- Contact / Instagram

**GEO upgrades to match / beat competitors**

1. Add **FAQ section** (top 10 Q&A from shop metafield) to `llms.txt`
2. Add **ingredient/benefit bullets** per product (from metafields)
3. Add **comparison positioning** (vs moringa-only brands: amla, sattu, combos)
4. Publish **`/pages/faq`** and link from llms.txt + agents.md
5. Keep `robots.txt` allowing GPTBot, ClaudeBot, PerplexityBot (verify live)

---

## 6. AEO reverse-engineering (Answer Engine Optimization)

AEO = content + schema shaped so AI and Google **quote you** in answers.

### 6.1 FAQ presence vs FAQ schema

| Site | Visible FAQ content | FAQPage JSON-LD |
|------|-------------------|-----------------|
| The Good Leaf | Homepage FAQ (yes) | **No** |
| Daivik | Educational Q&A style sections | **No** |
| Saptamveda | Footer text blocks | **No** |
| NIA Natura | PDP sections (not accordion FAQ) | **No** |
| Organic India | Help / content pages | **No** |
| Kapiva | Extensive site content | **No** |
| **Sarvital** | Home + product FAQ accordions (metafields) | **No** |

**Opportunity:** Sarvital already has structured FAQ **data** (`shop.metafields.custom.site_faqs`, product FAQ metafields) and **H3 semantics** in accordions. Missing piece is **`FAQPage` JSON-LD** emitted from the same parsed Q/A pairs.

### 6.2 AEO content patterns that rank in AI answers

1. **Definition sentences** — “Moringa powder is …” (first paragraph, plain language)
2. **Comparison tables** — Sarvital vs generic moringa (nutrients, testing, price per serving)
3. **How-to blocks** — “How to use moringa powder in smoothies” (NIA model)
4. **Sourcing / trust** — lab-tested, vegan, gluten-free, India sourcing (Sarvital differentiators)
5. **Structured data** — FAQPage, Product, Organization, WebPage (partially done)

### 6.3 Citation-ready page types to add

| Page | Purpose | Priority |
|------|---------|----------|
| `/pages/faq` | Canonical FAQ hub for crawlers | P1 |
| `/blogs/news` or `/blogs/wellness` | Educational articles (moringa, amla, sattu) | P2 |
| Product metafield “Perfect for” / “How to use” | PDP AEO (match NIA Natura) | P1 |
| `/pages/about` enrichment | E-E-A-T, founder, lab testing | P2 |

---

## 7. Competitor deep dives (actionable notes)

### Kapiva.in (benchmark — do not copy product strategy)

- **Traffic:** ~2.81M/mo; **revenue:** ₹233.9 Cr FY24
- **SEO:** “Modern Ayurveda” — bridges traditional + young audience; massive catalog
- **GEO:** No llms.txt — irrelevant for agent play
- **Lesson:** Invest in **content volume + brand spend** long-term; near-term, compete on **niche SKUs** (pure powders, combos) not full Ayurveda catalog

### Organic India (enterprise Shopify)

- **Traffic:** ~60K–700K/mo depending on source; **revenue:** ~$30M
- **SEO:** Goal-based navigation, tulsi/tea authority, strong brand search
- **GEO:** Default Shopify agent files only
- **Lesson:** **Category ownership** (“tulsi”, “organic tea”) — Sarvital should own “lab-tested superfood powders” + “sattu/amla/moringa combo”

### The Good Leaf (closest moringa D2C peer)

- **Revenue:** ₹1.71 Cr (Tracxn) — similar stage to Sarvital ambition
- **SEO:** Clear moringa + India geo title; FAQ on homepage
- **GEO:** Default llms.txt
- **Lesson:** Founder/farm story + FAQ visibility; beat them on **powder purity, lab tests, broader lineup (amla/sattu)**

### Daivik Moringa (content SEO leader in niche)

- **SEO weakness:** Homepage title “Daivik Moringa Store”; no meta description
- **SEO strength:** Deep moringa education (leaves, flowers, seeds, pods), celebrity social proof
- **Lesson:** Add **1,500–2,500 words** of structured educational content on homepage or `/pages/moringa-guide` — Sarvital can out-execute with cleaner titles + schema

### Saptamveda (measurable mid-tier)

- **Traffic:** ~49K/mo (directional)
- **SEO:** Broad herbal positioning; keyword-heavy footer
- **Lesson:** Footer stuffing is **not** best practice; prefer visible FAQs + schema + blog

### NIA Natura (PDP UX model)

- **PDP:** Perfect For, How to Use, Benefits — highly citable
- **Price:** Moringa ₹275 — undercuts premium positioning
- **Lesson:** Mirror PDP section structure in Sarvital product sections / metafields

### Earmark Organic & AsmitA Organic Farm

- **SEO:** Blog content + “trusted organic” framing
- **Lesson:** 2–4 **pillar articles** per hero ingredient (moringa, amla, sattu) with internal links to PDPs

### Naturesum, Maharishi, Manna, Saanvi, Shuddh Chandan

- **Relevance:** Peripheral — hair/skin (Naturesum), Ayurveda legacy (Maharishi), millets (Manna), dry fruits (Saanvi), sandalwood (Shuddh)
- **Lesson:** Steal **title formulas** and **trust badge patterns** only; don’t dilute Sarvital powder positioning

---

## 8. Sarvital gap analysis

| Capability | Leaders | Sarvital today (Jun 2026) | Gap severity |
|------------|---------|---------------------------|--------------|
| Monthly traffic | Kapiva 2.8M | ~22 Google sessions/mo | — |
| Homepage meta title | Clean brand + keyword | **Admin done** (good title/desc) | Low |
| PDP meta title | Keyword-rich + brand | Weak (“Moringa Powder” only); **1% CTR** | **Critical** |
| Index health | Clean sitemaps | 5,193 404s + spam URLs in GSC | **Critical** |
| Mobile CWV | Mixed | 8 poor URLs | **High** |
| Educational content | Daivik, Organic India | Moderate | **High** (SEO/GEO) |
| PDP “Perfect for / How to use” | NIA Natura | Partial sections | **Medium** |
| FAQ visible | The Good Leaf, Sarvital | Yes | Low |
| FAQPage schema | None in market | Missing | **High** (GEO/AEO) — first-mover; Google FAQ snippets deprecated May 2026 |
| Custom llms.txt | Sarvital only | Yes | **Lead** — enrich further |
| Product JSON-LD | Common | Yes (improved) | Low |
| Fake reviews schema | — | Fixed | Done |
| Blog / articles | AsmitA, Earmark | TBD | **Medium** |
| Reviews / UGC | Daivik, Kapiva | Judge.me path exists | **Medium** |
| Paid acquisition | Kapiva, Daivik | **98% revenue** — strength, not gap | — |

---

## 9. Recommended roadmap

**Execution detail lives in [SEO-GEO-AEO-PLAYBOOK.md](./SEO-GEO-AEO-PLAYBOOK.md).** Summary aligned with validated analytics:

### Phase 0 — Measurement ✅ Done (Jun 2026)

- [x] GSC + GA4 + Shopify baseline captured
- [x] Key finding: brand-only organic; PDP CTR crisis; index spam/404s

### Phase 1 — P0 fixes (week 1–2) — highest ROI

- [ ] **P0-A:** Spam / 404 audit (casino URLs, 5K+ 404s in GSC)
- [ ] **P0-B:** 7 PDP meta titles/descriptions *(homepage admin already done)*
- [ ] **P0-D:** Theme title tag — remove legal entity suffix
- [ ] **P0-C:** Mobile CWV (8 poor URLs)

### Phase 2 — P1 GEO/AEO (week 2–4)

- [ ] FAQPage JSON-LD (GEO/AEO value; not Google FAQ rich snippets)
- [ ] `/pages/faq` + llms.txt enrichment
- [ ] Sattu protein on-page block (only non-brand GSC wedge)

### Phase 3 — P2 content (month 2–3)

- [ ] Blog: **Sattu protein guide first**, then moringa, amla
- [ ] PDP metafields (Perfect For, How to Use)
- [ ] Review flow (Judge.me)

### Phase 4 — Monitoring (ongoing)

- [ ] 90-day scorecard (Playbook §6)
- [ ] Quarterly competitor schema/llms.txt re-audit
- [ ] AI citation checks (Perplexity/ChatGPT for lab-tested powder queries)

---

## 10. Appendix A — Live technical snapshot (2026-06-09)

```
thegoodleaf.in          FAQPage: NO  JSON-LD: 2  llms: yes  agents: yes
daivikmoringa.com       FAQPage: NO  JSON-LD: 3  llms: yes  agents: yes
saptamveda.com          FAQPage: NO  JSON-LD: 2  llms: yes  agents: yes
nianatura.in (PDP)      FAQPage: NO  JSON-LD: 2  llms: yes  agents: yes
naturesum.com           FAQPage: NO  JSON-LD: 4  llms: yes  agents: yes
organicindia.com        FAQPage: NO  JSON-LD: 2  llms: yes  agents: yes
earmarkorganic.com      FAQPage: NO  JSON-LD: 2  llms: yes  agents: yes
maharishiayurvedaindia  FAQPage: NO  JSON-LD: ?  llms: yes  agents: yes
mannafoods.in           FAQPage: NO  JSON-LD: ?  llms: yes  agents: yes
saanvidryfruits.com     FAQPage: NO  JSON-LD: ?  llms: NO   agents: NO
asmitaorganicfarm.com   FAQPage: NO  JSON-LD: 2  llms: yes  agents: yes
shuddhchandan.com       FAQPage: NO  JSON-LD: ?  llms: yes  agents: yes
kapiva.in               FAQPage: NO  JSON-LD: ?  llms: NO   agents: NO
sarvital.com            FAQPage: NO  JSON-LD: 3  llms: CUSTOM  agents: CUSTOM
```

---

## 11. Appendix B — Traffic reference table (estimates only)

| Domain | Est. monthly visits | Source | Confidence |
|--------|---------------------|--------|------------|
| kapiva.in | 2,810,000 | SEMrush Apr 2026 | Medium–High |
| kapiva.in | 3,750,000 | Inc42 30d snapshot | Medium |
| organicindia.com | 48,000–62,000 | ~1.6K–2K daily (Hupso/Informer) | Low–Medium |
| organicindia.com | ~703,000 | ~23K daily (USiteStat) | Low (often inflated) |
| saptamveda.com | ~48,830 | Third-party SEO article | Low |
| thegoodleaf.in | n/a | Use revenue ₹1.71 Cr as proxy | — |
| daivikmoringa.com | n/a | Global rank ~7.8M | Too small |
| Others | n/a | Below tool threshold | — |

**Use GSC for Sarvital truth; use this table for competitive context only.**

---

## 12. Next step

**Competitor context is complete.** For implementation, use the Playbook:

1. **P0-A** Spam / 404 audit  
2. **P0-B** PDP meta (7 products)  
3. **P0-D** Theme title tag  
4. **P1-A** FAQPage JSON-LD + **P1-D** llms.txt  

**Next chat prompt:**

> Implement P0/P1 from `docs/SEO-GEO-AEO-PLAYBOOK.md`: FAQPage JSON-LD, theme title fix, llms.txt enrichment.

---

*Document version: 1.1 — Analytics sync, Jun 9, 2026*
