# Antigravity Task: Fix Toolzium Tool Errors + SEO Meta Keyword Bloat

**Project:** Toolzium (`C:\Users\LOQ\toolflux`)  
**Date:** 24 August 2026  
**Assignee:** You (Antigravity)  
**Role:** Full-stack fixer — Next.js 16 + TypeScript + shadcn/ui codebase  

---

## Context

Toolzium is a free online tools platform ("Toolzium — 559+ Free Online Tools for Everyone"). It is a Next.js 16 app with ~559 tools organized into categories in a single master data file. The live site is `https://toolzium.com`. It is deployed on Vercel from this codebase.

Tanvir (the owner) wants you to **find and fix errors in the tools themselves**, plus fix one specific SEO bug he has already identified. Do NOT touch content/copywriting/growth — that is handled by another agent. Focus purely on code correctness, tool functionality, and this one SEO fix.

**IMPORTANT:** This codebase has MANY tool categories and entries. Work methodically. Prioritize: (1) the SEO fix first since it is confirmed, (2) any broken tools you can find, (3) obvious quality issues.

Do NOT break anything that already works. Test after every fix. Commit per-fix with clear messages so the owner can review.

---

## Issue 1 (CONFIRMED — do this first): Meta Keywords Tag Are Severely Stuffed / Bloated

### What the owner observed
The live homepage `<meta name="keywords">` tag is **2,921 characters long with 209 comma-separated tokens**. Sample tokens include junk like `"tools tools"`, `"all tools online"`, `"all tools free"`, `"ai tools tools"`, plus single common words like `"and"`, `"search"`, `"all"`, `"available"`, `"create"`, `"url"`, `"meta"`, `"tags"`, `"optimized"`, `"product"`, `"feature"`, `"emotional"`, `"benefit"`. This is obviously broken — it looks spammy and includes garbage single-word tokens and duplicates.

### Root cause (owner traced it)
File: `C:\Users\LOQ\toolflux\lib\seo-tools.ts`

Two functions are at fault:

1. **`buildDynamicKeywords(tools)`** (lines 40-72):
   - For every tool item it adds: item title, `item title + " online"`, `item title + " free"`, AND splits the title on `/[/,&-]+/` and adds every fragment.
   - For every tool description it splits on `/[^\w%+]+/` and adds EVERY token longer than 2 chars — including words like "and", "search", "all", "available", "create", "meta", "tags", "optimized", "product", "feature", "emotional", "benefit", "url", "shopify", "amazon", "etsy", etc.
   - This turns 559 tool descriptions into hundreds of junk single-word tokens.
   - It slices to 200 at the end, but that is still way too many and includes junk.

2. **`mergeKeywords(staticKeywords, dynamicKeywords)`** (lines 74-79):
   - Combines static keywords (15 clean terms) with dynamic keywords (200 bloated terms) with NO cap, NO dedup beyond normalize, NO quality filter. The combined array is what ends up in the `<meta name="keywords">` tag.

### What to do
Fix `lib/seo-tools.ts` so the final meta keywords tag is a **clean, sensible list of ~15-30 genuinely useful keywords** — no junk, no single common words, no duplicates, no "tools tools".

Rules for the fix:
- Keep the 15 static keywords from `layout.tsx` (they are clean): `online tools, url shortener, pdf tools, image converter, text utilities, developer tools, calculators, free tools, privacy friendly, seo tools, unit converter, hash generator, regex tester, json formatter, free tools`.
- Dynamic keywords should come ONLY from meaningful tool/category titles — NOT from description word-splitting, NOT from title fragment-splitting.
- Cap the total combined keywords at a reasonable number (recommend 30 max).
- Dedupe aggressively after normalize.
- Remove tokens that are: single common words ("and", "search", "all", "available", "create", "url", "meta", "tags", "build", "compare", "convert", "compress", "optimize", "generate", "validate", "preview", "analyze", "calculate", "format", "shorten", "expand", "category" etc.), or are substrings/junk.
- The final tag should look like a real SEO keywords list a human would write, e.g.: `online tools, free tools, url shortener, qr code generator, json formatter, image converter, pdf tools, developer tools, calculators, base64 encoder, hash generator, regex tester, privacy friendly, no signup required, seo tools, unit converter, bmi calculator, currency converter, roi calculator, password generator, text utilities, all-in-one toolkit`.

After fixing, **verify on the live site** by reading the `<meta name="keywords">` tag and confirming:
- Length is reasonable (under ~500 chars)
- No junk tokens like "tools tools", "ai tools tools", "and", "search", "all", "available"
- No duplicate concepts

Then build and deploy to Vercel (`npm run build && npx vercel --prod`) so the fix goes live.

---

## Issue 2: Audit All Tools for Errors (owner says "there are tool errors")

The owner says there are errors in the tools themselves. He has NOT given specific tool names or error messages — he wants you to find them.

### What to do
1. **Read the master tool data file** `C:\Users\LOQ\toolflux\data\tools.ts` to understand the full inventory (~559 tools across all categories).
2. **Open the live site** `https://toolzium.com` and navigate through tool category pages and individual tool pages. For each tool you test:
   - Load the tool page
   - Try the core functionality (paste input, click convert/generate/calculate, etc.)
   - Check the browser console for errors (runtime JS errors, failed fetches, etc.)
   - Check network tab for failed API calls
   - Note any tool that is broken, returns wrong results, throws errors, or has a bad UX
3. **Pay special attention to these recently changed areas** (owner's last 6 git commits touched these):
   - Travel tools: `components/tools/travel/` — Distance Calculator, Travel Budget Planner, Currency Matrix, Exchange Trend, Exchange History. These were just upgraded to use **live ECB exchange rate data** via API routes `app/api/fx/history/route.ts` and `app/api/fx/latest/route.ts`. Test these carefully — if the live data integration is broken, that is a priority.
   - API routes: `app/api/fx/` — verify these endpoints actually return correct data.
4. **Also check these tool families for common issues** (they have many similar entries and may have copy/paste bugs):
   - Color / contrast / accessibility tools in `components/tools/image/` (many color palette, contrast matrix, compliance sheet tools — check for duplication, broken export, wrong calculations)
   - Sleep / REM / circadian tools in `components/tools/time/` (many similar REM sleep clock variants — check for wrong logic, duplicates)
   - Contract / NDA / SOW / agreement generators in `components/tools/office/` (many similar generators — check for missing fields, broken generation)
   - Travel budget / currency matrix tools in `components/tools/travel/` (many similar budget sheet variants — check for broken calculations)

### What to fix (when you find issues)
For each broken tool:
- Identify the root cause (component bug, missing import, wrong calculation, failed data fetch, missing dependency, etc.)
- Fix it
- Test the fix
- Commit with a clear message like `fix(tool): Fix <tool name> — <what was wrong>`
- Move on

If a tool is working but has a minor quality issue (typo in description, missing edge case, ugly result), note it but prioritize actual errors first.

If you find tools that are COMPLETELY broken and would take a major rewrite, note them in a summary at the end rather than attempting a half-fix.

---

## Issue 3: General Quality Sweep (do this after Issues 1 and 2)

After the confirmed fixes, do a quick sweep for obvious quality problems:
- Any tool page that throws a 500 or crashes on load
- Any console errors on any tool page
- Any tool that references a non-existent component or asset
- Any obviously wrong calculation (e.g., a calculator that returns nonsense)
- Any broken links (e.g., tool links that 404)

Report a summary at the end: list of tools tested, list of tools found broken + fixed, list of tools that are OK, and any tools you could not test.

---

## Constraints

- Do NOT modify content/copywriting, marketing text, or growth-related pages. Stick to tool functionality and code correctness.
- Do NOT remove tools or categories. Only fix broken ones.
- Do NOT change the overall design system or component library unless it is causing a tool to break.
- Build and deploy to Vercel after the SEO fix (Issue 1) at minimum, and again after any major tool fixes.
- git commits: use conventional commit format `fix(tool): ...`, `fix(seo): ...`, etc.

---

## Deliverables

At the end, hand the owner a summary that includes:
1. **SEO fix**: what you changed in `lib/seo-tools.ts`, the before/after of the meta keywords tag (length + sample tokens), and confirmation it is deployed.
2. **Tool audit**: how many tools you tested, which ones were broken and what you fixed, which ones are clean, and any you could not test.
3. **Any tools you could not fix** (with why) so the owner knows the remaining gaps.

Good luck.
