#!/usr/bin/env bash
echo "=== LIVE bmi-calculator (after Antigravity deploy) ==="
curl -s "https://toolzium.com/tools/calc/bmi-calculator" > /tmp/verify_bmi.html
echo "Page size: $(wc -c < /tmp/verify_bmi.html) bytes"
echo "Cache header: $(curl -sI 'https://toolzium.com/tools/calc/bmi-calculator' | grep -i 'x-vercel-cache')"
echo "bmi fix markers (How It Works|Related Tools|grid-pattern|Frequently Asked):"
grep -c -i "How It Works\|Related Tools\|grid-pattern\|Frequently Asked" /tmp/verify_bmi.html
echo ""
echo "=== base-converter fix markers ==="
curl -s "https://toolzium.com/tools/dev/base-converter" | grep -c -i "How It Works\|Related Tools\|grid-pattern"
echo "=== css-transform fix markers ==="
curl -s "https://toolzium.com/tools/dev/css-transform" | grep -c -i "How It Works\|Related Tools\|grid-pattern"
echo "=== mlbb (dynamic, known-good) fix markers ==="
curl -s "https://toolzium.com/tools/gaming/mlbb-name-generator" | grep -c -i "How It Works\|Related Tools\|grid-pattern"
