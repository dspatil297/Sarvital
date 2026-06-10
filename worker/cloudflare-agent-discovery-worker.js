/**
 * Sarvital Agent Discovery - Cloudflare Worker
 *
 * Serves only agent-discovery JSON/Markdown endpoints. Storefront HTML, cart,
 * checkout, and product pages must NOT be proxied here — that breaks Shopify
 * bot verification and guest cart sessions.
 *
 * HTML Link headers: enable worker/cloudflare-link-headers-rule.json as a
 * Cloudflare Transform Rule (see wrangler.toml).
 */

import openApiTemplate from '../openapi.json';
import { SKILL_DIGESTS } from './discovery-constants.js';
import { AUTH_MD } from './discovery-auth-md.js';

function getApiCatalog(origin) {
  return {
    linkset: [
      {
        anchor: origin,
        'service-desc': [
          {
            href: origin + '/openapi.json',
            type: 'application/vnd.oai.openapi+json;version=3.1',
          },
        ],
        'service-doc': [
          { href: origin + '/agents.md', type: 'text/markdown' },
          { href: origin + '/auth.md', type: 'text/markdown' },
          { href: 'https://shopify.dev/docs/api/storefront', type: 'text/html' },
        ],
        status: [{ href: origin + '/products.json?limit=1', type: 'application/json' }],
      },
    ],
  };
}

function getOauthProtectedResource(origin) {
  return {
    resource: origin,
    authorization_servers: [origin],
    scopes_supported: ['read_products', 'read_collections', 'write_cart', 'read_orders'],
    bearer_methods_supported: ['header'],
    resource_documentation: origin + '/auth.md',
    resource_signing_alg_values_supported: ['RS256', 'ES256'],
  };
}

function getOauthAuthorizationServer(origin) {
  return {
    issuer: origin,
    authorization_endpoint: origin + '/account/login',
    token_endpoint: origin + '/account',
    registration_endpoint: origin + '/account/register',
    scopes_supported: ['read_products', 'read_collections', 'write_cart', 'read_orders'],
    agent_auth: {
      skill: 'https://workos.com/auth.md',
      register_uri: origin + '/account/register',
      claim_uri: origin + '/account',
      revocation_uri: null,
      identity_types_supported: ['anonymous'],
      anonymous: {
        credential_types_supported: ['none'],
      },
      events_supported: [],
    },
  };
}

function getMcpServerCard(origin) {
  return {
    serverInfo: {
      name: 'Sarvital Shopify MCP',
      version: '1.0.0',
      description: 'MCP server for Sarvital product catalog, cart, and commerce.',
      vendor: 'Sarvital Sarvadnya Foodtech Pvt. Ltd.',
      website: origin,
    },
    endpoint: origin + '/.well-known/ucp',
    transport: 'streamable-http',
    capabilities: {
      tools: {
        listChanged: false,
        tools: [
          { name: 'search_catalog', description: 'Search products by keyword or health benefit' },
          { name: 'create_cart', description: 'Create cart with selected variants' },
          { name: 'create_checkout', description: 'Initiate buyer-approved checkout' },
          { name: 'get_product', description: 'Get product details by handle' },
          { name: 'list_collections', description: 'List all collections' },
        ],
      },
      resources: { listChanged: false },
      prompts: { listChanged: false },
    },
    authentication: {
      type: 'none',
      note: 'Public catalog endpoints unauthenticated. Checkout requires GoKwik buyer approval.',
    },
    links: {
      agentDoc: origin + '/agents.md',
      authDoc: origin + '/auth.md',
      apiCatalog: origin + '/.well-known/api-catalog',
      agentSkills: origin + '/.well-known/agent-skills/index.json',
    },
  };
}

function getAgentSkillsIndex(origin) {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'sarvital-shop',
        type: 'skill-md',
        description:
          'Browse, search, and purchase Sarvital natural superfood powders. Product discovery, cart, GoKwik checkout.',
        url: origin + '/agents.md',
        digest: SKILL_DIGESTS.sarvital_shop,
      },
      {
        name: 'shopify-storefront',
        type: 'skill-md',
        description: 'Generic Shopify storefront skill for catalog, carts, and checkout.',
        url: 'https://shop.app/SKILL.md',
        digest: SKILL_DIGESTS.shopify_storefront,
      },
    ],
  };
}

function getAcpDiscovery(origin) {
  return {
    protocol: { name: 'acp', version: '1.0' },
    api_base_url: origin,
    transports: ['https'],
    capabilities: {
      services: ['catalog', 'cart', 'checkout', 'search', 'product-details', 'collections'],
    },
    endpoints: {
      products: '/products.json',
      collections: '/collections.json',
      search: '/search/suggest.json',
      cart: '/cart.js',
      cart_add: '/cart/add.js',
      cart_change: '/cart/change.js',
      checkout: '/checkout',
      agent_doc: '/agents.md',
      auth_doc: '/auth.md',
      sitemap: '/sitemap.xml',
    },
    authentication: {
      required: false,
      note: 'Public catalog unauthenticated. Checkout uses GoKwik - buyer approval required.',
    },
    store: {
      name: 'Sarvital',
      description:
        'Premium natural superfood powders - moringa, amla, sattu. Lab-tested, vegan, gluten-free. India.',
      currency: 'INR',
      language: 'en',
    },
  };
}

function getOpenApi(origin) {
  const spec = structuredClone(openApiTemplate);
  spec.servers = [{ url: origin, description: 'Sarvital Shopify storefront' }];
  if (spec.info && spec.info.contact) {
    spec.info.contact.url = origin + '/pages/contact';
  }
  return spec;
}

function getX402DemoResponse(env) {
  const wallet = (env && env.X402_WALLET) || '0x0000000000000000000000000000000000000000';
  const facilitator = (env && env.X402_FACILITATOR) || 'https://x402.org/facilitator';
  const body = {
    x402Version: 1,
    error: 'Payment required to access this resource (demo endpoint only)',
    accepts: [
      {
        scheme: 'exact',
        network: 'base',
        maxAmountRequired: '1000',
        resource: '/api/x402/demo',
        description: 'Sarvital x402 discovery demo — not a real product charge',
        mimeType: 'application/json',
        payTo: wallet,
        maxTimeoutSeconds: 300,
        asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        extra: {
          facilitator,
        },
      },
    ],
  };
  return new Response(JSON.stringify(body, null, 2), {
    status: 402,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  });
}

function jsonResponse(data, status, contentType) {
  const s = status || 200;
  const ct = contentType || 'application/json';
  return new Response(JSON.stringify(data, null, 2), {
    status: s,
    headers: {
      'Content-Type': ct,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function textResponse(text, contentType) {
  const ct = contentType || 'text/plain';
  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': ct,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const currentOrigin = url.origin;

    if (path === '/.well-known/api-catalog') {
      return jsonResponse(getApiCatalog(currentOrigin), 200, 'application/linkset+json');
    }
    if (path === '/.well-known/oauth-protected-resource') {
      return jsonResponse(getOauthProtectedResource(currentOrigin));
    }
    if (path === '/.well-known/oauth-authorization-server') {
      return jsonResponse(getOauthAuthorizationServer(currentOrigin));
    }
    if (path === '/.well-known/mcp/server-card.json') {
      return jsonResponse(getMcpServerCard(currentOrigin));
    }
    if (path === '/.well-known/agent-skills/index.json') {
      return jsonResponse(getAgentSkillsIndex(currentOrigin));
    }
    if (path === '/.well-known/acp.json') {
      return jsonResponse(getAcpDiscovery(currentOrigin));
    }
    if (path === '/auth.md') {
      return textResponse(AUTH_MD, 'text/markdown');
    }
    if (path === '/openapi.json') {
      return jsonResponse(getOpenApi(currentOrigin), 200, 'application/vnd.oai.openapi+json;version=3.1');
    }
    if (path === '/api/x402/demo') {
      return getX402DemoResponse(env);
    }

    return new Response('Not found', { status: 404 });
  },
};
