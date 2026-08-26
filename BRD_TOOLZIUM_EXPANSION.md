# Toolzium Expansion — BRD & Antigravity Build Spec  ($0 LAUNCH, earn-then-reinvest)
**Goal:** Add high-pull lookup/OSINT/discovery tools to toolzium.com that win traffic via programmatic SEO and monetize via high-RPM display ads + affiliate — **with ZERO upfront cost**. All data sources below are free, require NO API key, and NO credit card at launch. Paid upgrades are listed as "later, after earning."
**Owner:** Tanvir Ahmed Sohan
**Stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Vercel.

---

## 0. THE THESIS (geo + $0)
- **GEO = HIGH-TIER ONLY** (US/UK/CA/AU/DE): ad RPM ~$5–30 vs ~$0.50–2 in low-tier; VPN/security affiliate converts 5–10x better. Default phone country = US (+1).
- **$0 LAUNCH**: every tool works with free, no-key, no-card data sources + a community DB. No paid key is required for launch.
- **Earn-then-reinvest**: only upgrade to paid (Vercel Pro $20/mo, HIBP key $3.75/mo, ip-api Pro) once revenue starts.
- **Win mechanism = programmatic SEO**: auto-generate a unique, server-rendered, indexable page per lookup entity (phone, domain, IP, username, "free alternative to X"). Each ranks for its own high-intent English long-tail query.

---

## 1. $0 DATA SOURCE TABLE (use these — no keys, no cards)
| Tool | FREE source (no key, no card) | Upgrade LATER (after earning) |
|---|---|---|
| **IP Geo** | `ipwho.is/{ip}` (1K/day, commercial-allowed, no key) OR `ip-api.com/json/{ip}` (45/min, no key, non-commercial free) | ip-api Pro $19.99/mo for volume + HTTPS |
| **WHOIS** | `rdap.org/domain/{domain}` (FREE, no key, structured JSON, GDPR-compliant — official WHOIS replacement) | — |
| **Breach: Password** | HIBP **Pwned Passwords** (FREE, no key, SHA-1 k-anonymity) | — |
| **Breach: Email/User** | Community DB at launch + clear "add HIBP key to unlock full history" path | HIBP key ~$3.75/mo |
| **Phone Scam** | `https://spam.skipcalls.com/check/{number}` (FREE, no key, US 2.7M reports) + community DB | NumVerify/Twilio paid for intl |
| **Username OSINT** | Open-source "WhatIsMyName" 400+ site list (FREE, no key, HTTP checks) | — |
| **Alternatives** | Local curated seed + community DB (votes) | — |
| **Prompts** | Local curated seed + community DB | — |
| **Hosting** | **Vercel Hobby** (FREE, no card; non-commercial — fine while building/testing) | **Vercel Pro $20/mo** the moment ads go live |
| **Database** | **Supabase free tier** (no card; 500MB Postgres) for community reports + generated pages | Paid Supabase if scale |
| **Ads** | **Ezoic** or **AdSense** (free to join, revenue-share, no upfront) | — |
| **Affiliate** | **Impact / Awin** VPN + password-manager programs (free to join, earn commission) | — |

> RULE: The site MUST function 100% at $0. Every adapter tries the free source → falls back to community DB → shows "no data yet, be first to report." NEVER require a paid key to render.

---

## 2. GLOBAL ARCHITECTURE
- **`lib/data/adapters/`**: one module per source, uniform `lookup(query): Promise<NormalizedResult>`. Free source first, community DB fallback, graceful empty state.
- **`components/AdSlot.tsx`**: Ezoic/AdSense placeholder (auto-ads; Ezoic auto-optimizes RPM by visitor geo → high-tier earns more automatically). `data-ad-slot` divs; no error if ID absent.
- **`lib/monetization.ts`**: affiliate config (VPN: Nord 40% recurring, Surfshark 40% recurring, ExpressVPN/NordPass via Impact/Awin). `<RecommendedVpnCta/>` on all IP/privacy/breach/phone pages. Geo-aware for US/UK/CA/AU.
- **`components/ReportButton.tsx`**: submit report → Supabase `reports` table; rate-limited + honeypot.
- **Supabase schema** (free tier, no card): `reports(entity, type, note, created_at, flags)`, `generated_pages(path, type, data JSONB, updated_at)`, `votes(item, user_hash, value)`.
- **`/privacy` + `/terms`** (required for ad approval).
- **`app/sitemap.ts`**: dynamic, includes all `generated_pages`.

---

## 3. TOOLS (A–D, F, G — global, high-tier, $0)
### A. Reverse Phone Lookup + Scam Checker ⭐
- `/lookup/phone` + `/phone/[number]`. Default US (+1), full country picker.
- Data: `skipcalls.com/check/{number}` (free, no key) + community DB.
- Output: carrier, line type, **risk/spam score 0–100**, report count, complaint categories, "Safe to answer? YES/NO", Report button.
- Programmatic `/phone/+1XXXXXXXXXX` titled "Who called me from +1XXXXXXXXXX? | Toolzium".

### B. Username / Email OSINT
- `/lookup/username` + `/username/[name]`. WhatIsMyName list (free HTTP checks) + HIBP password (free) for email.
- Grid ✓ found / ✗ not found per platform.

### C. Breach & Password Checker
- `/security/breach` + `/security/password`.
- Password: HIBP Pwned Passwords (FREE, k-anonymity, never send full password).
- Email: community DB now + "add HIBP key" path (no key required to render).

### D. IP Geolocation + WHOIS
- `/lookup/ip` + `/ip/[ip]` + `/lookup/whois` + `/whois/[domain]`.
- IP: `ipwho.is/{ip}` (free, commercial). WHOIS: `rdap.org/domain/{domain}` (free, JSON). Auto-fill visitor IP.
- IP: country/region/city/ISP/org/ASN/lat-lon + map + proxy/VPN/Tor flag. WHOIS: registrar, creation/expiry, NS, age + "<30 days = suspicious".

### F. Free Alternatives Directory (crowdsourced)
- `/alternatives` + `/alternatives/[software]`. Local seed + community submit/vote (AlternativeTo model). Affiliate where alt is paid recommended.

### G. AI Jailbreak / Prompt Library (legal)
- `/prompts` + `/prompts/[slug]` + categories. Local seed + community submit/rate. Ad-monetized.

---

## 4. PROGRAMMATIC SEO ENGINE
- On every successful lookup, persist + render static/indexable `/{type}/{entity}` (ISR/on-demand): result + 800-word guide + FAQ + related-searches internal links.
- `app/sitemap.ts` includes all generated pages w/ `lastmod`.
- Internal linking across tools (phone→IP→username→breach).

---

## 5. BUILD ORDER
1. Global SEO wrapper + AdSlot + data-layer (free adapters) + Supabase schema (free) + Privacy/Terms.
2. Tool A (Phone+Scam). 3. Tool D (IP/WHOIS). 4. Tool C (Breach). 5. Tool B (Username). 6. Tool F (Alternatives). 7. Tool G (Prompts). 8. Programmatic SEO + sitemaps. 9. Ezoic/AdSense + affiliate wiring + `npm run build`.

---

## 6. ACCEPTANCE (all at $0)
- A–D, F, G present, each with interactive UI + indexable per-entity pages.
- Works with NO paid keys (free sources + community DB).
- `npm run build` clean; deployable to Vercel Hobby (free).
- Privacy/Terms present; no illegal content; no PII dumps.
- Ad + affiliate slots render (IDs added later, no crash if absent).

## 7. WHEN TO SPEND (only after earning)
- Ads live → upgrade Vercel Hobby→**Pro $20/mo** (commercial required).
- Want email-breach depth → add **HIBP key ~$3.75/mo**.
- Volume/HTTPS on IP → **ip-api Pro $19.99/mo**.
- Scale DB → Supabase paid.

---
*(Authoritative BRD. Antigravity prompt derived from it. $0 launch, high-tier geo, no paid keys required.)*
