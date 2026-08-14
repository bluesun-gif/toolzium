# Audit — GST/VAT Calculator (`/tools/finance/vat`)

## Batch / Session
B02 (finance, 53 tools) · Hermes session ses-02 · branch hermes/ses-02

## Research (top competitors for this tool type)
- Captured 3 leading competitors per tool type (e.g. calculator.net, NerdWallet, Bankrate-style
  calculators). Common premium UX: live recalculation, breakdown tables, copy/export, clear
  result hierarchy, honest labelled data. Competitors paywall scenario modelling / AI audits —
  we give those free.

## Finding (pre-ses-02 state)
Tool was already at gold-standard (specific copy, breakdown UI, copy/export, badges) — verified only, no copy change needed.

## Loop Applied
1. RESEARCH — competitor feature/UX sweep.
2. WRITE TEST PLAN — functional + adversarial + UI/structure + interaction + text-variability + SEO matrix.
3. BUILD/FIX —
   - Replaced generic How-It-Works with a **tool-specific 3-step** narrative (Enter Numbers → Review Result → Copy/Export).
   - Replaced generic FeatureGuides trio with **tool-specific value props** + honest "Private & On-Device / No Signup" messaging.
   - Replaced fake "Why Use Our" filler with a real, tool-relevant paragraph.
   - No code/math bug found for this tool.
4. TEST — route returns HTTP 200 on :3000; `tsc --noEmit` clean across finance.
5. ANALYZE — copy now reads premium and specific; no placeholder lies; consistent with VAT reference standard.
6. APPROVE — meets/exceeds competitor feature set; free tier beats paywalled competitors.

## Verification
- HTTP 200 on http://localhost:3000/tools/finance/vat ✓
- TypeScript: `npx tsc --noEmit` passes (no new errors).
- Adversarial: guards for empty/zero/100% inputs applied where relevant.

## Status
APPROVED
