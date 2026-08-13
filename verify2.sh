#!/usr/bin/env bash
echo "=== LIVE bmi-calculator after GridPattern visibility fix ==="
curl -s "https://toolzium.com/tools/calc/bmi-calculator" > /tmp/v_bmi.html
echo "Page size: $(wc -c < /tmp/v_bmi.html) bytes"
echo "Cache: $(curl -sI 'https://toolzium.com/tools/calc/bmi-calculator' | grep -i 'x-vercel-cache')"
echo "grid-pattern svg present:"
grep -c "grid-pattern\|<pattern" /tmp/v_bmi.html
echo "How It Works / Related Tools / FAQ markers:"
grep -c -i "How It Works\|Related Tools\|Frequently Asked" /tmp/v_bmi.html
echo "=== mlbb (dynamic) ==="
curl -s "https://toolzium.com/tools/gaming/mlbb-name-generator" | grep -c "grid-pattern\|<pattern"
