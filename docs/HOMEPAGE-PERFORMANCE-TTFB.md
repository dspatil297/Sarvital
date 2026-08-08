# Homepage performance and TTFB

Theme-side Core Web Vitals work (lazy videos, single product grid, on-demand quick-view, hero LCP tuning) reduces HTML weight and main-thread work. **Time to First Byte (TTFB)** is still dominated by Shopify Liquid SSR and scripts injected via `content_for_header` from apps.

## What the theme already does

- Smaller homepage DOM (grid layout instead of carousel duplicate markup; one quick-view modal)
- Deferred third-party scripts via `snippets/defer-third-party-scripts.liquid`
- Deferred theme JS on index via `snippets/deferred-scripts.liquid`
- Gokwik `browsing_context_suggestions.json` fetch deferred via `sarvitalAfterPaint` (longer delay on homepage)
- `content-visibility: auto` on below-fold index sections in `layout/theme.liquid`

These help FCP/LCP/INP more than TTFB, but smaller HTML can shave a few milliseconds off transfer time.

## TTFB admin checklist (Shopify admin)

Review these when lab TTFB stays above ~800 ms after theme deploy:

### 1. App script audit

Apps inject into every page through `{{ content_for_header }}`. On the homepage, common contributors:

| App / integration | Where to check | Action |
|-------------------|----------------|--------|
| **Judge.me** | Theme editor → homepage sections/blocks; Apps → Judge.me | Remove carousel/review widgets from index if not essential; load reviews only on product pages |
| **GoKwik** | Theme settings (GoKwik snippet) | Keep checkout integration; country-detection fetch is already deferred in theme |
| **Meta Pixel** | Theme settings / Customer events | Required for ads; cannot defer without losing early events—limit duplicate pixels |
| **Microsoft Clarity** | Apps or theme custom pixels | Disable on storefront or load only after consent if not needed for day-to-day ops |
| **Markets / geolocation** | Settings → Markets | Markets add Liquid and suggestion endpoints; ensure only active markets are enabled |

**Process:** Online Store → Themes → Edit code is not enough—use **Apps** list, disable unused apps, and remove app blocks from `templates/index.json` in the theme editor.

### 2. Social sharing image

**Settings → Online Store → Preferences → Social sharing image**

Upload an optimized JPEG or WebP (≈1200×630, under 200 KB). Avoid large PNG logos. The theme also sets homepage `og:image` from the first hero slide (WebP) in `snippets/meta-tags.liquid`.

### 3. Measure before and after

- **Lab:** [PageSpeed Insights](https://pagespeed.web.dev/) → mobile, throttled → note TTFB, FCP, LCP, INP
- **Shopify:** Admin → Analytics → Reports → Behavior → **Site speed** (store-level trends)
- **Field:** Google Search Console → Core Web Vitals (28-day window; re-test after changes)

### 4. Domain and Markets expectations

A `.in` domain improves trust and DNS routing perception but **does not cache HTML** at the edge the way static assets on `cdn.shopify.com` do. TTFB will still reflect origin render time in India.

### 5. When to escalate to Shopify Support

- TTFB high on all page types with minimal apps
- Sudden regression after app install or Markets change
- Compare TTFB on password page vs homepage to isolate app injection

## Verification targets (homepage, mobile lab)

| Metric | Target | Notes |
|--------|--------|--------|
| TTFB | ≤ 0.8 s (stretch) | Often needs app audit, not theme-only |
| FCP | ≤ 1.8 s | Hero preload, less competing video/modal bytes |
| LCP | ≤ 2.5 s | LCP hero WebP ~750w; lazy non-LCP slides |
| INP | ≤ 200 ms | Single quick-view handler; deferred JS |
| CLS | ≤ 0.1 | Video poster placeholders use fixed aspect ratio |

## Related theme files

- `snippets/lcp-hero-preload.liquid` — LCP preload link
- `sections/hero-banner.liquid` — lazy non-LCP slides; first slide eager + `decoding="sync"`; deferred carousel images hydrate on slide change (avoids 4 stacked slides competing for bandwidth)
- `sections/product-testimonial-videos.liquid` — lazy MP4 loading
- `snippets/quick-view-shell.liquid` + `assets/application.js` — on-demand quick-view
- `templates/index.json` — featured products grid layout
- `snippets/defer-third-party-scripts.liquid` — third-party deferral
- `snippets/gokwik.liquid` — deferred browsing context fetch
