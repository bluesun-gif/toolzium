#!/usr/bin/env bash
code=$(curl -s -o dr.html -w "%{http_code}" "http://localhost:3000/tools/fun/dice-roller")
echo "HTTP: $code"
echo "Size: $(wc -c < dr.html) bytes"
echo "Has Dice Roller title: $(grep -c 'Dice Roller' dr.html)"
echo "Has Roll Dice button: $(grep -c 'Roll Dice' dr.html)"
echo "Has pip circle (SVG <circle): will check after JS render - SSR shows static"
rm -f dr.html
