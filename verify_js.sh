#!/usr/bin/env bash
# qualityScore is client-rendered, so it lives in the JS bundle, not SSR HTML.
# Fetch the page, extract the JS chunk URLs, and grep those for qualityScore.
curl -s "https://toolzium.com/tools/ai/prompt-optimizer" > po.html 2>&1
echo "HTML size: $(wc -c < po.html)"
js=$(grep -oE '/_next/static/chunks/[^"]+\.js' po.html | sort -u | head -20)
echo "JS chunks found: $(echo "$js" | wc -l)"
found=0
for u in $js; do
  if curl -s "https://toolzium.com$u" | grep -q "qualityScore"; then
    echo "FOUND qualityScore in $u"
    found=1
    break
  fi
done
[ $found -eq 0 ] && echo "qualityScore NOT found in any JS chunk = STALE BUILD"
rm -f po.html
