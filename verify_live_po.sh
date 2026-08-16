#!/usr/bin/env bash
curl -s "https://toolzium.com/tools/ai/prompt-optimizer" > live_po.html 2>&1
echo "HTTP: $(curl -s -o /dev/null -w '%{http_code}' 'https://toolzium.com/tools/ai/prompt-optimizer')"
echo "Size: $(wc -c < live_po.html) bytes"
echo "qualityScore in HTML: $(grep -c 'qualityScore' live_po.html)"
echo "Show Original toggle: $(grep -c 'Show Original' live_po.html)"
echo "Optimize button text: $(grep -o 'Optimize ([A-Z0-9]*)' live_po.html | head -1)"
rm -f live_po.html
