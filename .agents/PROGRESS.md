# Toolzium Premium Quality Program — MASTER LEDGER

Controller: Hermes (this chat = brain only, no coding here).
Workers: N parallel Hermes sessions (self-allocating batches — see ASSIGNMENTS.md +
CLAIM.md). Each is a clone with identical brief + .agents/TOOLZIUM_PLAYBOOK.md.

## RULES (non-negotiable for quality parity)
- Real repo: `C:/Users/LOQ/Downloads/My AI Company/toolzium` (Next.js, branch `main`).
- DEAD fossil (never touch/push): `C:/Users/LOQ/toolzium`.
- Per tool: research → write `.agents/audit-<tool-slug>.md` test plan → build → test
  (functional + adversarial + UI/interaction + text-variability) → fix → re-test →
  approve ONLY when it beats the #1 Google competitor and feels paid-premium.
- Workers DO NOT push to `main` and DO NOT run `vercel deploy`. Each session works on a
  personal branch `hermes/<tag>` and pushes THAT branch. Controller merges + deploys.
- Shared dev server :3000 — verify your own route returns 200 after each edit.
- Self-allocate: read ASSIGNMENTS.md + CLAIM.md, claim an unclaimed batch, `git pull` to
  confirm, then work only those tools. Update CLAIM.md to "done" after the batch.
- Each session keeps its own `.agents/status-<tag>.md` (append-only, never touch others').
- Never edit PROGRESS.md directly (controller owns it).

## BATCHES (from ASSIGNMENTS.md)
B01 dev(66) | B02 finance(53) | B03 health(49) | B04 image(45) | B05 productivity(43)
B06 fun(41) | B07 office(39) | B08 travel(33)+time(33) | B09 text(28)+util(23)
B10 network(19)+calc(17)+seo(8)+marketing(3) | B11 social(14)+pdf(8)+url(7)+gaming(7)
B12 writing(6)+ai(9,-1 done)+academic(5,-1 done)  | TOTAL 556

DONE so far by controller: ATS Checker (ai), Essay Conclusion Generator (academic) —
deployed 2026-08-14.

## BATCH DEPLOY LOG (controller only)
- 2026-08-14: Deployed ATS Checker + Essay Conclusion Generator (commit 68fee55).

