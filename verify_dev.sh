#!/usr/bin/env bash
code=$(curl -s -o po_dev.html -w "%{http_code}" "http://localhost:3000/tools/ai/prompt-optimizer")
echo "HTTP: $code"
echo "Size: $(wc -c < po_dev.html) bytes"
echo "Scrim radial-gradient: $(grep -c 'radial-gradient' po_dev.html)"
echo "z-10 wrapper: $(grep -c 'z-10' po_dev.html)"
echo "GridPattern: $(grep -ci 'grid' po_dev.html)"
rm -f po_dev.html
