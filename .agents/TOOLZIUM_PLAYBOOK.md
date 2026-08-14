# Toolzium Premium Tool Playbook (Hermes)

Owner directive (verbatim intent): research competitors FIRST → ideate → build →
WRITE A TEST PLAN → test (try to BREAK it) → fix → re-test → analyze UI/structure/
text-variability/interactions → only approve when it equals the #1 Google result for
that tool. Premium feel even in the free version. Perfect = perfect.

## Canonical repo (DO NOT confuse with the fossil)
- REAL app: `C:/Users/LOQ/Downloads/My AI Company/toolzium`  (Next.js, branch `main`)
- DEAD fossil (NEVER push): `C:/Users/LOQ/toolzium`  (old static HTML)
- Dev server already runs on `http://localhost:3000` (hot reloads on save).
- Deploy: `vercel deploy --prod` (or push to `origin/main` → Vercel auto-builds).
  Verify live copy changed by grepping distinctive new strings in the served HTML.

## The Loop (mandatory, per tool)
1. RESEARCH — web_search the top 3 competitors for this exact tool type. Capture:
   - What they DO (features, inputs, outputs, modes).
   - What they CHARGE for / gate behind premium (we give it free → our edge).
   - UX patterns that feel premium (microcopy, layout, progress, examples).
2. IDEATE — list 3+ upgrades that make ours beat them, anchored to our design system.
3. BUILD — edit the tool's `page.tsx` + its `*-client.tsx` component. Reuse shared
   components: `ToolPageHeader`, `ToolHowItWorks`, `ToolFeatureGuides`, `ToolFaqAccordion`,
   `RelatedTools`, `ModelSelector`, `GlassCard`, `Card*`, `Button`, `Label`, `Input`.
   Design tokens live in `tailwind` + `css/...`; brand color is violet (`primary`).
4. WRITE TEST PLAN (a short doc BEFORE testing) covering the matrix below.
5. TEST on :3000 — functional + adversarial (make it fail) + UI/visual + interaction.
6. FIX every defect found. RE-TEST until clean.
7. ANALYZE like the owner: "If I click here, does text shift? Is this element aligned?
   Is the copy variable/correct? Does it look premium or cheap?" Kill anything cheap.
8. APPROVE only if it would rank #1 vs competitors. Else loop 5–7.

## Test-plan matrix (write this per tool, then execute every row)
- FUNCTIONAL: every button/select/toggle works; correct output; no console errors.
- ADVERSARIAL / FAIL CASES: empty input, huge input, special chars, emoji, SQL/XSS
  strings, non-English, 0/negative numbers, paste of the OTHER tool's output, rapid
  double-click, offline AI (API 500) → graceful fallback, not a crash.
- UI / STRUCTURE: consistent spacing, no overflow on mobile (375px) & desktop, hero
  text not truncated, cards aligned, no layout shift on load, contrast OK in light+dark.
- INTERACTION: hover/focus states, copy buttons copy correct text, contentEditable
  edit persists, history save/reload/clear, presets load fully.
- TEXT VARIABILITY: numbers/values render correctly; pluralization; no hardcoded lies
  (e.g. a fake "82" score). All copy reads as premium, not robotic.
- SEO/SCHEMA: title/desc present; JSON-LD renders; canonical correct.
- AI TOOLS: call `/api/ai/generate` with `{prompt, model, type:"list"|"json"|"text"}`;
  verify real output; ensure a deterministic client-side fallback if AI fails.

## Definition of "perfect" (owner's bar)
- A free user should feel they're using a $20/mo product.
- No element looks cheap, misaligned, or placeholder.
- Every interaction is smooth; nothing breaks under adversarial input.
- Output is correct, honest, and better than the top competitor.

## Coordination for parallel sessions
- Each session owns DISJOINT categories (no file contention on the tracker).
- Each session keeps its own status file: `.agents/audit-<session>.md`.
- All sessions read THIS playbook before starting.
- Session 1 (Hermes main) owns AI Tools + final cross-tool review.
- Always `git pull` before starting a tool; `git push` (or `vercel deploy --prod`)
  only after the tool passes the full matrix.
