#!/usr/bin/env bash
code=$(curl -s -o po_live.html -w "%{http_code}" "https://toolflux-q0xj1qtqu-dginfotech2025-ops-projects.vercel.app/tools/ai/prompt-optimizer")
echo "HTTP: $code"
echo "Size: $(wc -c < po_live.html) bytes"
echo "Has '<div': $(grep -c '<div' po_live.html)"
echo "Has 'Prompt': $(grep -ci 'prompt' po_live.html)"
echo "Has 'z-10': $(grep -c 'z-10' po_live.html)"
echo "Has 'grid': $(grep -ci 'grid' po_live.html)"
rm -f po_live.html
