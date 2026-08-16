# Prompt for Antigravity — Deploy Toolzium.com (Design DNA fixes)

You are deploying an existing Next.js project (Toolzium.com) to Vercel production.
Goal: make ALL 568 tool pages live on https://toolzium.com showing the "Design DNA"
audit fixes (GridPattern ambient background, ToolHowItWorks, ToolFeatureGuides,
ToolFaqAccordion, RelatedTools on every tool page).

## CONTEXT (already done by another agent)
- Source: C:\Users\LOQ\Downloads\My AI Company\toolzium
- Git: github.com/bluesun-gif/toolzium , branch main, latest commit f4198b7
  "Hermes Agent: Full 568-tool Design DNA audit compliance + fixes" — PUSHED,
  contains all fixes. Local source verified correct.
- Vercel CLI logged in as dginfotech2025-ops. Project: toolflux
  (projectId prj_ozygepJnsUM3NtGQd9S1HADIfexT). Domain toolzium.com already aliased.

## PROBLEM TO SOLVE
Previous deploy reported READY + aliased to toolzium.com, but LIVE still serves OLD
pages for STATIC-prerendered routes. Evidence:
- Dynamic /tools/gaming/mlbb-name-generator -> shows fixes (How It Works, Related
  Tools, grid-pattern svg present). GOOD.
- Static /tools/calc/bmi-calculator -> NO fixes (0 matches for "How It Works"/
  "Related Tools"/"grid-pattern"), 25KB, header "X-Vercel-Cache: HIT" with identical
  content before AND after `vercel cache purge --yes`.
Conclusion: Vercel build cache reused STALE prerendered static HTML for bmi (and
likely other static tools); CDN keeps serving as HIT. Normal `vercel --prod` and
`vercel --prod --force` did not clear this. Dynamic tools rebuilt fine; static did not.

## TASK — clean build live, then VERIFY
1. vercel cache purge --yes          (purge CDN + Data cache)
2. vercel --prod --yes --force       (ignore ALL caches)
3. vercel promote <new-deployment-url>   (force alias to new build)
4. Wait ~15s for CDN edge (bom1/Mumbai) to settle.
5. VERIFY with curl on a KNOWN STATIC route that was broken:
   curl -s https://toolzium.com/tools/calc/bmi-calculator | grep -c -i "How It Works\|Related Tools\|grid-pattern"
   EXPECT > 0. If "X-Vercel-Cache: HIT" still serves old bytes, go to step 6.
6. IF STILL STALE (build cache reusing old prerenders), fix by ONE of:
   a) Disable Vercel Build Cache for the project, then `vercel --prod --yes --force` again; OR
   b) In next.config ensure static tools aren't served from stale ISR cache; OR
   c) git commit --allow-empty -m "force rebuild" && git push origin main
      (triggers Vercel GitHub auto-deploy with clean checkout).
7. Repeat verification on 3+ static routes (bmi-calculator, base-converter,
   css-transform) and 1 dynamic route. All must show fixes.
8. Report: final deployment URL, whether toolzium.com alias is on new build, and the
   curl verification number for bmi-calculator (must be > 0).

Do NOT declare success until curl on /tools/calc/bmi-calculator returns > 0 for fix
markers. Previous attempt falsely reported success by only checking deploy status.
