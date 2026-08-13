#!/usr/bin/env bash
# Per-batch LIVE render test: confirm converted buttons + grid render on dev server
tools=(
  "calc/bmi-calculator"
  "dev/json-formatter"
  "ai/ats-checker"
  "calc/currency-converter"
  "gaming/mlbb-name-generator"
)
allok=1
for t in "${tools[@]}"; do
  url="http://localhost:3000/tools/$t"
  code=$(curl -s -o /tmp/rt.html -w "%{http_code}" "$url")
  grid=$(grep -c 'grid-pattern\|<pattern' /tmp/rt.html)
  btn=$(grep -c 'bg-primary\|rounded-md' /tmp/rt.html)
  hiw=$(grep -c -i 'How It Works' /tmp/rt.html)
  echo "$t | HTTP $code | grid:$grid btn:$btn hiw:$hiw"
  if [ "$code" != "200" ] || [ "$grid" -lt 1 ]; then allok=0; fi
done
echo "BATCH1_RENDER_OK=$allok"
