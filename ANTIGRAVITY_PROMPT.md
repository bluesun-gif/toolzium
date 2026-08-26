# Build Prompt for Antigravity — Toolzium Expansion ($0 LAUNCH, high-tier geo, earn-then-reinvest)

Build a major expansion of the existing site **toolzium.com** (Next.js AI-tools directory). Add a suite of high-pull "lookup / intelligence / discovery" tools that win traffic via **programmatic SEO** — a unique, indexable page generated for every lookup target (phone, domain, IP, username, "free alternative to X") — ranking for millions of English long-tail queries.

**CRITICAL CONSTRAINT 1 — $0 UPFRONT:** The site MUST be fully functional at **ZERO cost**. Use ONLY free, no-API-key, no-credit-card data sources (listed below). Do NOT require any paid key to render any tool. Every adapter: try free source → fall back to community DB → show "no data yet, be first to report." Paid upgrades are documented but OPTIONAL/later. If a source needs a key, code the free alternative + a graceful "add key to unlock" state, never a hard failure.

**CRITICAL CONSTRAINT 2 — HIGH-TIER GEO:** Optimize for US/UK/CA/AU/DE (ad RPM ~$5–30 vs ~$0.50–2 low-tier; VPN/security affiliate converts 5–10x better). Default phone country = US (+1); all copy/SEO/FAQ/affiliate CTAs target English high-tier queries. NO Bangladesh/low-tier tools in core.

Build production-quality, deployable code. No stubs.

---

## 1. TECH STACK (match existing project)
- Next.js (App Router), TypeScript, Tailwind, shadcn/ui. Deploy on **Vercel Hobby (FREE, no card)** via `npm run build` + `vercel --prod`. (Note: Hobby is non-commercial; owner upgrades to Pro $20/mo ONLY after ad revenue starts — code must not depend on Pro.)
- Reuse layout/header/footer + SEO components. Every tool page renders: `<title>`, 150-char meta, JSON-LD `WebApplication`+`BreadcrumbList`+`FAQPage`, 800+ word guide, 5–8 FAQ accordion, related-tools. Create minimal `ToolPageSEO`, `ToolFaqAccordion`, `ToolFeatureGuides`, `RelatedTools` if missing.
- Data: Server Components + Route Handlers (`app/api/...`). Cache external responses 24–72h (in-memory + filesystem fallback; Supabase for persistence).
- DB: **Supabase free tier (NO credit card)** — schema: `reports(entity TEXT, type TEXT, note TEXT, created_at TIMESTAMPTZ, flags INT)`, `generated_pages(path TEXT PK, type TEXT, data JSONB, updated_at TIMESTAMPTZ)`, `votes(item TEXT, user_hash TEXT, value INT)`. Provide a local SQLite fallback so it runs with zero accounts if Supabase env missing.

---

## 2. GLOBAL SYSTEMS (build first)
1. **`lib/data/adapters/`** — one module per source, uniform `lookup(query): Promise<NormalizedResult>`. Free source first; community DB fallback; graceful empty.
2. **`components/AdSlot.tsx`** — Ezoic/AdSense placeholder (auto-ads; Ezoic auto-optimizes RPM by geo). `data-ad-slot` divs; no error if ID absent.
3. **`lib/monetization.ts`** — affiliate (VPN: Nord 40% recurring, Surfshark 40% recurring, ExpressVPN/NordPass via Impact/Awin). `<RecommendedVpnCta/>` on all IP/privacy/breach/phone pages; geo-aware for high-tier.
4. **`components/ReportButton.tsx`** — submit report → Supabase `reports`; rate-limited + honeypot field.
5. **`/privacy` + `/terms`** (required for ad approval).
6. **`app/sitemap.ts`** — dynamic, includes all `generated_pages` + static routes.

---

## 3. $0 DATA SOURCES (use exactly these — no keys, no cards)
- IP: `https://ipwho.is/{ip}` (free, no key, commercial-allowed, 1K/day) — primary. (Optional fallback `https://ip-api.com/json/{ip}`, 45/min free, non-commercial.)
- WHOIS: `https://rdap.org/domain/{domain}` (FREE, no key, structured JSON, GDPR-compliant).
- Breach password: HIBP Pwned Passwords `https://api.pwnedpasswords.com/range/{hashPrefix}` (FREE, no key, SHA-1 k-anonymity — send only first 5 chars of SHA-1).
- Breach email/username: community DB now; include an "Add HIBP API key in settings to unlock full breach history" path (HIBP key is paid ~$3.75/mo, NOT required to render).
- Phone: `https://spam.skipcalls.com/check/{number}` (FREE, no key, US 2.7M reports) + community DB.
- Username: open-source "WhatIsMyName" platform list (400+ sites) — HTTP HEAD/GET checks, free, no key.
- Alternatives & Prompts: local curated seed JSON + community DB.

---

## 4. TOOLS TO BUILD (A–D, F, G)

### A. Reverse Phone Lookup + Scam Checker ⭐ TOP PRIORITY
- `app/lookup/phone/page.tsx` + `app/phone/[number]/page.tsx`.
- Input: phone, country auto-detect DEFAULT US (+1), full picker. Validate E.164.
- Data: `skipcalls.com/check/{number}` + community DB.
- Result card: carrier, line type, **risk/spam score 0–100**, report count, complaint categories, "Safe to answer? YES/NO", Report button.
- Programmatic `/phone/+1XXXXXXXXXX` titled `Who called me from +1XXXXXXXXXX? | Toolzium` + FAQs + related searches.

### B. Username / Email OSINT
- `app/lookup/username/page.tsx` + `app/username/[name]/page.tsx`.
- WhatIsMyName list (free HTTP checks) + HIBP password (free) for email input.
- Grid ✓ found / ✗ not found per platform + breach status.

### C. Breach & Password Checker
- `app/security/breach/page.tsx` + `app/security/password/page.tsx`.
- Password: HIBP Pwned Passwords (FREE, k-anonymity; never transmit full password). "appeared in X breaches — DO NOT USE" / "not found".
- Email: community DB + "add HIBP key" path. Never crash if no key.

### D. IP Geolocation + WHOIS
- `app/lookup/ip/page.tsx` + `app/ip/[ip]/page.tsx` + `app/lookup/whois/page.tsx` + `app/whois/[domain]/page.tsx`.
- IP: `ipwho.is/{ip}`; auto-fill visitor IP. Country/region/city/ISP/org/ASN/lat-lon + map + **proxy/VPN/Tor flag**.
- WHOIS: `rdap.org/domain/{domain}`. Registrar, creation/expiry, NS, age + "<30 days = suspicious". Registrant redacted.

### F. Free Alternatives Directory (crowdsourced)
- `app/alternatives/page.tsx` + `app/alternatives/[software]/page.tsx`.
- Local seed (Photoshop→GIMP/Photopea, etc.) + community submit/vote (DB; AlternativeTo-style ranking). Affiliate where recommended alt is paid.

### G. AI Jailbreak / Prompt Library (legal content only)
- `app/prompts/page.tsx` + `app/prompts/[slug]/page.tsx` + categories.
- Local seed + community prompts (ChatGPT/DAN, Midjourney, SD). Browse/search/copy/favorite(localStorage)/submit/rate. Ad-monetized.

---

## 5. PROGRAMMATIC SEO ENGINE
- On every successful lookup, persist + render static/indexable `/{type}/{entity}` (ISR/on-demand): result + 800-word guide + FAQ + related-searches internal links.
- `app/sitemap.ts` includes all generated pages w/ `lastmod`.
- Aggressive internal linking (phone→IP→username→breach) for topical authority.
- Copy/FAQ phrasing tuned for US/UK/CA/AU/DE English.

---

## 6. COMPLIANCE (NON-NEGOTIABLE — legal)
- NO stolen dumps, carding, doxxing, illegal cracks, PII exposure. Reports store only flags + short notes.
- Rate-limit + CAPTCHA on submissions. Age-gate only if NSFW later (out of v1).
- `/privacy` + `/terms` present. Graceful degradation: missing key → tool still renders.

---

## 7. BUILD ORDER
1. Global SEO wrapper + AdSlot + data-layer (free adapters) + Supabase schema (free) + Privacy/Terms.
2. Tool A. 3. Tool D. 4. Tool C. 5. Tool B. 6. Tool F. 7. Tool G.
8. Programmatic SEO + sitemaps + internal links.
9. Ezoic/AdSense + affiliate wiring + `npm run build`.

---

## 8. ACCEPTANCE (all at $0)
- A–D, F, G present, each with interactive UI + indexable per-entity pages.
- Works with NO paid keys (free sources + community DB).
- `npm run build` clean; deployable to Vercel Hobby (free, no card).
- Privacy/Terms exist; no illegal content; no PII dumps.
- Ad + affiliate slots render (IDs added later, no crash if absent).

Build autonomously, verify with `npm run build`, and report completed work + the exact list of OPTIONAL paid upgrades to consider only after earning (Vercel Pro $20/mo, HIBP key $3.75/mo, ip-api Pro $19.99/mo).
