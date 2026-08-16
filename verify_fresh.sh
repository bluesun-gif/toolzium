#!/usr/bin/env bash
ts=$(date +%s)
curl -s -H "Cache-Control: no-cache" "https://toolzium.com/tools/ai/prompt-optimizer?cb=$ts" > fresh.html 2>&1
echo "Size: $(wc -c < fresh.html)"
echo "qualityScore: $(grep -c 'qualityScore' fresh.html)"
echo "Show Original: $(grep -c 'Show Original' fresh.html)"
echo "GPT4O button: $(grep -c 'GPT4O' fresh.html)"
rm -f fresh.html
