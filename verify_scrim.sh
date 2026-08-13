#!/usr/bin/env bash
curl -s "https://toolflux-q0xj1qtqu-dginfotech2025-ops-projects.vercel.app/tools/ai/prompt-optimizer" > po_live.html 2>&1
echo "Scrim radial-gradient present: $(grep -c 'radial-gradient' po_live.html)"
echo "GridPattern svg present: $(grep -c 'grid-pattern\|<pattern' po_live.html)"
echo "relative z-10 wrapper: $(grep -c 'relative z-10' po_live.html)"
rm -f po_live.html
