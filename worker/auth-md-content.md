# auth.md

Agent registration and authentication for **Sarvital** (https://sarvital.com).

## Agent Audience

This document is for AI agents and automated systems that need to interact with the Sarvital storefront on behalf of users.

## Discovery

1. Protected Resource Metadata: `GET /.well-known/oauth-protected-resource`
2. Authorization Server Metadata: `GET /.well-known/oauth-authorization-server` (includes `agent_auth` block)
3. API Catalog: `GET /.well-known/api-catalog`
4. Agent overview: `GET /agents.md`

## Public (Unauthenticated) Access

The following endpoints require **no authentication** and are openly accessible:

- `GET /products.json` — full product catalog
- `GET /products/{handle}.json` — single product details
- `GET /collections.json` — all collections
- `GET /collections/{handle}/products.json` — products in a collection
- `GET /search/suggest.json?q={query}&resources[type]=product` — product search
- `GET /cart.js` — current session cart
- `POST /cart/add.js` — add items to cart
- `POST /cart/change.js` — update cart quantities
- `GET /agents.md` — agent overview and commerce protocol
- `GET /auth.md` — this document

## Authenticated Operations

Checkout and order management require buyer-present authentication via **GoKwik** (India-optimized checkout). Agents must NOT complete payment without explicit buyer consent.

- Checkout: redirect to `/checkout` via GoKwik — requires user approval
- Order status: Shopify customer account authentication

## OAuth Protected Resource

Metadata: `/.well-known/oauth-protected-resource`

```json
{
  "resource": "https://sarvital.com",
  "authorization_servers": ["https://sarvital.com"],
  "scopes_supported": ["read_products", "read_collections", "write_cart", "read_orders"],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://sarvital.com/auth.md"
}
```

## Authorization Server (agent_auth)

Metadata: `/.well-known/oauth-authorization-server`

Anonymous read-only browsing is supported. No credential is issued for catalog access.

## Registration Methods

### Anonymous (read-only browsing)

No registration needed. Access public endpoints directly.

- **identity_types_supported**: `["anonymous"]`
- **credential_types_supported**: `["none"]`

### Shopify Customer Account (for order history)

Register via Shopify customer account:

- **identity_types_supported**: `["verified_email"]`
- **register_uri**: `https://sarvital.com/account/register`
- **claim_uri**: `https://sarvital.com/account`

## Commerce Protocol (UCP)

For agent-driven commerce (search → cart → checkout), use the Universal Commerce Protocol:

- **Discovery**: `GET /.well-known/ucp`
- **MCP endpoint**: documented in `/.well-known/mcp/server-card.json`

## x402 Demo (non-production)

`GET /api/x402/demo` returns HTTP 402 with payment metadata for agent discovery scanners only. This is **not** a real paid API — Sarvital checkout uses GoKwik at `/checkout`.

## Important Rules

- **Never complete checkout without explicit buyer confirmation.**
- Respect `Crawl-delay: 2` for non-catalog requests.
- All prices are in INR (Indian Rupee).
- Store is powered by Shopify + GoKwik checkout.
