# Cloudflare — Agent Discovery Setup (Sarvital)

**Project:** sarvital.com (Shopify storefront)  
**Worker name:** `sarvital-agent-discovery`  
**Purpose:** Serve AI/agent discovery endpoints that Shopify themes cannot host at `/.well-known/*`, plus optional commerce metadata for agent-readiness scans.  
**Date:** June 2026

---

## 1. Why Cloudflare was used

Shopify themes can serve:

- `/llms.txt`, `/agents.md` (via `templates/*.liquid`)
- `/robots.txt` (via `templates/robots.txt.liquid`)
- Product/collection JSON via native Shopify routes

Shopify themes **cannot** reliably serve:

- `/.well-known/api-catalog` (RFC 9727)
- `/.well-known/oauth-protected-resource`
- `/.well-known/oauth-authorization-server`
- `/.well-known/mcp/server-card.json`
- `/.well-known/agent-skills/index.json`
- `/.well-known/acp.json`
- Standalone `/openapi.json` and `/auth.md` at domain root (without a Page workaround)

Because `sarvital.com` DNS is **proxied through Cloudflare** (orange cloud), a **Cloudflare Worker** is the correct place to serve these paths on the custom domain.

### What is `/.well-known`?

`/.well-known` is a standard directory ([RFC 8615](https://www.rfc-editor.org/rfc/rfc8615)) where domains publish small JSON or text files for **automated clients** (browsers, apps, AI agents)—not for human navigation.

| Path (examples) | Used for |
|-----------------|----------|
| `/.well-known/security.txt` | Security contact for researchers |
| `/.well-known/apple-app-site-association` | iOS universal links |
| `/.well-known/acme-challenge/*` | Let's Encrypt SSL verification |
| `/.well-known/api-catalog` | RFC 9727 — API discovery for agents |

An AI agent or scanner (e.g. [isitagentready.com](https://isitagentready.com)) can fetch `https://sarvital.com/.well-known/api-catalog`, follow links to `openapi.json`, `auth.md`, MCP card, etc., and understand how to interact with your store **without scraping HTML**.

That is separate from **`/llms.txt`** and **`/agents.md`** (root paths, not under `/.well-known`)—newer conventions for LLMs. Sarvital's Worker serves agent-commerce discovery under `/.well-known/*` because Shopify cannot expose arbitrary well-known paths on the custom domain. Human-oriented agent files remain on the Shopify theme.

**Traffic split:**

```
Human shoppers     →  /, /products/...        →  Shopify theme
LLMs               →  /llms.txt, /agents.md   →  Shopify theme (Liquid templates)
Agents & scanners  →  /.well-known/api-catalog, oauth-*, etc.  →  Cloudflare Worker
Shopify analytics  →  /.well-known/shopify/monorail/*         →  Shopify (must NOT hit Worker)
```

---

## 1.1 Why this stack works (Hostinger + Shopify + Cloudflare)

Sarvital uses three providers; each has a clear role. This is a **good** setup when DNS is authoritative on Cloudflare and the storefront is **not** proxied through a catch-all Worker.

| Layer | Provider | Role |
|-------|----------|------|
| Commerce | **Shopify** | Store, cart, checkout, theme, apps, product JSON |
| Edge / DNS | **Cloudflare** | Proxied DNS, SSL at edge, Workers, Transform Rules |
| Domain | **Hostinger** | Domain registration (and optional email or other hostnames) |

### Benefits of Cloudflare in front of Shopify

1. **Agent discovery on the custom domain** — `/.well-known/*`, `/openapi.json`, and `/auth.md` are served by a Worker; Shopify themes cannot host these reliably at root paths.
2. **Storefront stays native** — Narrow Worker routes mean `/`, `/products/*`, `/cart/*`, and `/checkout/*` hit Shopify directly, preserving sessions, bot verification, and guest checkout.
3. **Edge security** — DDoS mitigation, WAF options, and centralized DNS for A/CNAME/TXT (Shopify verification, SPF/DKIM, etc.).
4. **HTTP `Link` headers on HTML** — Transform Rules add RFC 8288 discovery headers on storefront pages without proxying HTML through a Worker.
5. **One DNS control plane** — Nameservers on Cloudflare; Hostinger remains registrar without needing to serve the shop.
6. **Future flexibility** — Add edge rules (caching policies, redirects, rate limits) without moving the store off Shopify.

### What Hostinger is *not* doing in this architecture

- Hostinger does **not** need to host `sarvital.com` or `www` for the shop to work.
- If Hostinger web hosting exists, use it only for **other** hostnames (e.g. `staging.`, `mail.`, or a separate marketing site)—not the same apex/www records as the Shopify store.

### Prerequisites for a healthy setup

- Domain **nameservers** point to Cloudflare (orange-cloud proxy on shop hostnames).
- **Shopify Admin → Domains** — custom domain connected and primary domain set.
- Cloudflare **SSL/TLS** — **Full** or **Full (strict)** (not Flexible for checkout).
- Worker routes — **discovery paths only**; no `sarvital.com/*` catch-all (see §3).
- **MX records** for email — DNS only (grey cloud), not proxied.

See also: [SEO-GEO-AEO-GENERAL-GUIDE.md](./SEO-GEO-AEO-GENERAL-GUIDE.md) for platform-agnostic SEO/GEO notes.

---

## 2. Architecture (current — correct)

```
Visitor / Agent
      │
      ▼
 Cloudflare (sarvital.com, www)
      │
      ├── Worker routes ONLY:
      │     /.well-known/*
      │     /auth.md
      │     /openapi.json
      │     /api/x402/demo
      │
      └── All other paths (/, /products/*, /cart/*, /checkout/*)
            → Shopify directly (no Worker proxy)
```

### Theme layer (complements Worker)

| Asset | Location | Role |
|-------|----------|------|
| `<link rel="...">` discovery tags | `snippets/agent-link-headers.liquid` in `layout/theme.liquid` | HTML equivalent of RFC 8288 Link headers |
| `llms.txt` / `agents.md` | `templates/llms.txt.liquid`, `templates/agents.md.liquid` | Shopify-native agent summaries |
| `robots.txt` | `templates/robots.txt.liquid` | AI crawler allow rules |

### HTML Link headers (Transform Rule)

Because the Worker **no longer** touches storefront HTML, **RFC 8288 `Link` response headers** on HTML pages are set via:

**Cloudflare Dashboard → Rules → Transform Rules → Modify response header**

Config reference: `worker/cloudflare-link-headers-rule.json`

Expression:

```
(http.host eq "sarvital.com" or http.host eq "www.sarvital.com")
and http.response.content_type contains "text/html"
```

Headers set:

- `Link` — api-catalog, oauth-protected-resource, oauth-authorization-server, MCP card, agent-skills, ACP, auth.md, agents.md  
- `X-X402-Supported: true`

---

## 3. What went wrong initially (important lesson)

### Original design (deprecated)

The Worker used **catch-all routes**:

```
sarvital.com/*
www.sarvital.com/*
```

It proxied **the entire storefront** to `https://e4nahi-tf.myshopify.com` with `Host` rewriting and `cf.resolveOverride`.

### Symptoms

1. **“Verify your connection”** errors showing `e4nahi-tf.myshopify.com`  
2. **Guest users could not add to cart** — UI showed “sold out”  
3. **Redirect loop** on homepage (`www.sarvital.com/` 301 to itself) when scanner followed proxy chain  
4. Discovery URLs worked (Worker handled them directly) but **storefront was broken**

### Root cause

Shopify bot verification, session cookies, and cart APIs expect traffic to hit the **custom domain → Shopify** path normally. A full-site Worker proxy breaks that chain.

### Fix (June 2026)

1. **Removed** catch-all `sarvital.com/*` routes from Worker  
2. **Narrowed** Worker to discovery paths only (see `worker/wrangler.toml`)  
3. **Deleted** old catch-all routes manually in Cloudflare Dashboard → Worker → **Domains** tab  
4. **Moved** HTML `Link` headers to Transform Rule (see above)

**Rule for any future project:** Never proxy checkout, cart, or full HTML storefront through a Worker unless you fully replicate Shopify’s edge behavior.

---

## 4. Worker endpoints served

Base URL: `https://sarvital.com` (and `www`)

| Path | Content-Type | Purpose |
|------|--------------|---------|
| `/.well-known/api-catalog` | `application/linkset+json` | RFC 9727 API catalog |
| `/.well-known/oauth-protected-resource` | `application/json` | OAuth protected resource metadata |
| `/.well-known/oauth-authorization-server` | `application/json` | OAuth AS + `agent_auth` block |
| `/.well-known/mcp/server-card.json` | `application/json` | MCP server card |
| `/.well-known/agent-skills/index.json` | `application/json` | Agent skills index |
| `/.well-known/acp.json` | `application/json` | Agent Commerce Protocol discovery |
| `/auth.md` | `text/markdown` | Authentication / registration guide for agents |
| `/openapi.json` | OpenAPI 3.1 JSON | Storefront API subset documentation |
| `/api/x402/demo` | `application/json` (HTTP **402**) | x402 payment discovery demo (not a real charge) |

Unknown paths on Worker routes → **404** (no upstream proxy).

### Environment variables (`wrangler.toml`)

```toml
[vars]
X402_WALLET = "0x0000000000000000000000000000000000000000"
X402_FACILITATOR = "https://x402.org/facilitator"
```

Replace wallet address for production x402 if you move beyond demo.

---

## 5. Repository files

```
worker/
├── wrangler.toml                          # Routes + env vars
├── cloudflare-agent-discovery-worker.js   # Main Worker (discovery only)
├── cloudflare-link-headers-rule.json      # Transform Rule template
├── package.json                           # npm run login / deploy
├── discovery-constants.js                 # Skill SHA digests
├── discovery-auth-md.js                   # auth.md content module
├── auth-md-content.md                     # Source for auth.md
├── well-known-*.json                      # Static JSON references / backups
└── scan-result.json                       # Agent readiness scan output (reference)

openapi.json                               # OpenAPI spec (imported by Worker)

snippets/agent-link-headers.liquid         # Theme <head> link relations
```

---

## 6. Deploy procedure

### Prerequisites

- Cloudflare account with `sarvital.com` zone  
- DNS proxied (orange cloud)  
- Node.js installed locally  

### One-time login

```powershell
cd "G:\fire fist\sarvitalv2\Sarvital\worker"
npm install
npm run login
npx wrangler whoami
```

### Deploy Worker

```powershell
cd "G:\fire fist\sarvitalv2\Sarvital\worker"
npm run deploy
```

Equivalent: `npx wrangler deploy --config wrangler.toml`

### After deploy — critical manual step

Wrangler may **add** new narrow routes but **cannot delete** old catch-alls if the API token lacks permission.

In **Cloudflare Dashboard**:

1. **Workers & Pages** → **sarvital-agent-discovery**  
2. **Domains** tab → **Routes**  
3. **Delete** any catch-all or wildcard routes:
   - `sarvital.com/*`
   - `www.sarvital.com/*`
   - `sarvital.com/.well-known/*` ← **breaks Shopify Live View / monorail**
   - `www.sarvital.com/.well-known/*` ← same  
4. **Keep** only path-specific routes from `worker/wrangler.toml` (api-catalog, oauth-*, mcp card, agent-skills, acp.json, auth.md, openapi.json, api/x402/demo)  

### Enable Transform Rule (Link headers)

1. **Rules** → **Transform Rules** → **Modify response header** → **Create rule**  
2. Use expression and headers from `worker/cloudflare-link-headers-rule.json`  
3. Deploy rule  

---

## 7. Verification commands

```powershell
# API catalog (RFC 9727)
curl -sI https://www.sarvital.com/.well-known/api-catalog

# OpenAPI
curl -sI https://www.sarvital.com/openapi.json

# auth.md
curl -sI https://www.sarvital.com/auth.md

# x402 demo (expect 402)
curl -s https://www.sarvital.com/api/x402/demo

# Storefront must NOT go through Worker — cart should work for guests
curl -sI https://www.sarvital.com/products/moringa-powder

# Shopify monorail must reach Shopify, not Worker 404 (expect 400/405 on bare POST, NOT Cloudflare "Not found")
curl -sI -X POST "https://www.sarvital.com/.well-known/shopify/monorail/unstable/produce_batch"

# Agent readiness scan (external)
# https://isitagentready.com — scan https://www.sarvital.com
```

### Expected healthy state

| Check | Expected |
|-------|----------|
| `/.well-known/api-catalog` | 200, `application/linkset+json` |
| Homepage `/` | 200, no redirect loop |
| `/cart/add.js` | Works for logged-out users |
| HTML responses | Include `Link` header (if Transform Rule on) |
| Theme `<head>` | `rel="api-catalog"` etc. from `agent-link-headers` |
| `/.well-known/shopify/monorail/*` POST | **Not** Worker 404 (`Content-Length: 9`); Shopify or 400/405 without payload |

---

## 8. Timeline of changes

| Phase | What we did |
|-------|-------------|
| **1. Initial agent discovery** | Implemented full Worker with catch-all `sarvital.com/*` proxy to Shopify upstream; served all `/.well-known` paths + injected Link headers on proxied HTML |
| **2. Redirect loop fix** | Adjusted proxy `Host` / fetch logic so discovery URLs worked; homepage loop identified for scanners |
| **3. Production incident** | Guest cart broken + Shopify verification errors traced to full-site proxy |
| **4. Narrow routes** | Rewrote Worker to discovery-only; removed upstream proxy code |
| **5. Deploy + cleanup** | Deployed via Wrangler; manually removed catch-all routes in Dashboard |
| **6. Transform Rule** | Moved HTML `Link` + `X-X402-Supported` headers to Cloudflare Transform Rule |
| **7. Confirmed working** | Cart, checkout, and discovery URLs all healthy |
| **8. Monorail / Live View fix** | Replaced `/.well-known/*` Worker routes with path-specific routes so `/.well-known/shopify/monorail/*` reaches Shopify |

---

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Live View 0; `produce_batch` 404 to `/.well-known/shopify/monorail/*` | Worker route `/.well-known/*` catches Shopify analytics | Delete wildcard routes; deploy path-specific `wrangler.toml` |
| Verify connection / myshopify.com in error | Full-site Worker proxy still active | Delete `sarvital.com/*` routes |
| Guest “sold out” on add to cart | Same — cart API broken by proxy | Same |
| 301 loop on `/` | Worker proxies to Shopify which redirects back to custom domain | Remove catch-all proxy |
| Discovery path 404 (e.g. api-catalog) | Worker not deployed or route missing | Redeploy; add that specific path in Domains → Routes |
| Discovery works but no `Link` on HTML | Transform Rule not enabled | Add rule from `cloudflare-link-headers-rule.json` |
| Wrangler `EBUSY` on Windows | npm cache lock | `npm cache clean --force`; use local `worker/package.json` wrangler |
| Old routes reappear after deploy | API token can't delete; new routes stack | Manual delete in Dashboard |

---

## 10. What we did NOT put on Cloudflare

These stay on **Shopify theme** (correct):

- All product, collection, blog, cart, checkout pages  
- `/llms.txt`, `/agents.md`, `/llms-full.txt`  
- `/robots.txt`  
- JSON-LD structured data in HTML  
- Sitemap (`/sitemap.xml`)  

---

## 11. Reuse checklist for another project

- [ ] Custom domain on Cloudflare (proxied)  
- [ ] Worker serves **only** paths the app platform cannot host  
- [ ] **Never** use `domain.com/*` catch-all proxy to Shopify/WP/etc.  
- [ ] Transform Rule for `Link` headers on HTML if Worker doesn't touch HTML  
- [ ] Theme snippet for `<link rel="api-catalog">` etc. in `<head>`  
- [ ] `openapi.json` + `auth.md` in repo, version-controlled  
- [ ] Post-deploy: verify cart/guest checkout + discovery URLs  
- [ ] Manual route cleanup after first narrow deploy  

---

## 12. Related docs

- [SEO-GEO-AEO-GENERAL-GUIDE.md](./SEO-GEO-AEO-GENERAL-GUIDE.md) — reusable SEO/GEO/AEO principles  
- [SEO-GEO-AEO-PLAYBOOK.md](./SEO-GEO-AEO-PLAYBOOK.md) — Sarvital execution playbook  
- [COMPETITOR-SEO-GEO-AEO.md](./COMPETITOR-SEO-GEO-AEO.md) — competitor GEO comparison  

**External references**

- [RFC 9727 — API Catalog](https://www.rfc-editor.org/rfc/rfc9727)  
- [RFC 8288 — Web Linking](https://www.rfc-editor.org/rfc/rfc8288)  
- [isitagentready.com scan](https://isitagentready.com)  

---

*Document reflects production architecture as of June 2026 after cart/verification incident remediation.*
