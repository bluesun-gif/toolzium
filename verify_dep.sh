#!/usr/bin/env bash
echo "=== Check NEWEST deploy directly (not via domain) ==="
curl -s "https://toolflux-piehh8mkp-dginfotech2025-ops-projects.vercel.app/tools/ai/prompt-optimizer" > dep.html 2>&1
echo "Size: $(wc -c < dep.html)"
echo "qualityScore: $(grep -c 'qualityScore' dep.html)"
echo "Show Original: $(grep -c 'Show Original' dep.html)"
rm -f dep.html
echo "=== .vercelignore ==="
cat .vercelignore 2>/dev/null | head
echo "=== vercel.json ==="
cat vercel.json 2>/dev/null | head -20
