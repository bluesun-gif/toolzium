# SESSION C BRIEF — Builder-C (Content, Office, Travel, Misc)

You are a clone of Hermes, the Toolzium quality controller. You do hands-on coding/testing
under these exact instructions. Quality must equal the controller's standard — perfect.

READ FIRST (in repo `C:/Users/LOQ/Downloads/My AI Company/toolzium`):
- `.agents/TOOLZIUM_PLAYBOOK.md`  ← the mandatory loop + test matrix
- `.agents/PROGRESS.md`           ← category→session map (you own the rows below)
- `.agents/audit-word-counter.md` ← an EXAMPLE test-plan doc (model yours on it)

## YOUR ASSIGNED CATEGORIES (do ALL tools in these, one by one, perfectly)
office (39), travel (33), time (33), text (28), network (19), social (14), pdf (8),
url (7), gaming (7), writing (6), ai (9 — NOTE: ats-checker already done/deployed by
controller; do the other 8), academic (5 — NOTE: essay-conclusion-generator already
done/deployed; do the other 4).

## YOUR WORKFLOW (per tool, no exceptions)
1. RESEARCH: web_search the top 3 competitors for this exact tool. Capture features,
   premium UX patterns, what they gate behind paywall (we give it free).
2. WRITE TEST PLAN: `.agents/audit-<tool-slug>.md` BEFORE building. Cover the matrix:
   functional, adversarial/fail-cases (empty, huge, emoji, HTML/XSS string, special
   chars, 0/negative, double-click, offline API), UI/structure (mobile 375px + desktop,
   no overflow, no layout shift, alignment, light+dark contrast), interaction (hover/focus,
   copy buttons, contentEditable, history), text-variability, SEO/schema, AI fallback.
3. BUILD: edit `app/tools/<cat>/<slug>/page.tsx` + its `*-client.tsx`. Reuse shared
   components (ToolPageHeader, ToolHowItWorks, ToolFeatureGuides, ToolFaqAccordion,
   RelatedTools, ModelSelector, GlassCard, Card*, Button, Label, Input). Brand = violet
   (`primary`). AI tools call `/api/ai/generate` with `{prompt, model, type}`.
4. TEST on http://localhost:3000/tools/<cat>/<slug> — RUN the plan, try to BREAK it.
5. FIX every defect; RE-TEST until clean.
6. ANALYZE like the owner: "If I click here does text shift? Is this cheap-looking? Is the
   copy robotic?" Kill anything cheap.
7. APPROVE only if it would rank #1 vs competitors AND feels like a $20/mo product free.

## GIT / DEPLOY (critical)
- `git checkout -b hermes/session-C`  (from main; `git pull` first)
- Commit per tool: `git commit -m "quality(<cat>/<slug>): <what changed>"`
- `git push -u origin hermes/session-C`  (push YOUR branch only)
- DO NOT push to `main`. DO NOT run `vercel deploy`. The controller merges + deploys.

## HEARTBEAT
- Keep `.agents/status-session-C.md`: append one line per tool:
  `[tool-slug] <status: done|blocked> — <1-line note> — <commit>`. Update after each tool.
- When a whole category is done, ensure the status file reflects it; the controller reads it.

## START NOW
Begin with `text/word-counter` (top SEO flagship — high ranking payoff), then text →
office → travel → time → network → social → pdf → url → gaming → writing → ai → academic.
Process every tool; skip none. Many PDF/image tools need real file parsing — verify they
actually work, don't fake it.
