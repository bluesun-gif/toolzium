#!/usr/bin/env bash
# Verify top-20 most-demanded tools have the global readability fixes applied
tools=(
  "ai/prompt-optimizer"
  "ai/youtube-script"
  "ai/startup-name"
  "ai/social-bio"
  "ai/code-explainer"
  "ai/sql-regex-builder"
  "ai/ats-checker"
  "ai/pdf-chat"
  "ai/product-description"
  "url/shortener"
  "url/utm-builder"
  "url/expand"
  "url/qr"
  "url/youtube-thumbnail"
  "text/case-converter"
  "text/slugify"
  "academic/essay-conclusion-generator"
  "academic/flashcard-creator"
  "academic/literature-summarizer"
  "writing/ai-paraphraser"
)
miss=0
for t in "${tools[@]}"; do
  f="components/tools/$t-client.tsx"
  if [ ! -f "$f" ]; then echo "MISSING: $t"; miss=$((miss+1)); continue; fi
  tb=$(grep -c "ToolBackground" "$f")
  z10=$(grep -c "relative z-10" "$f")
  if [ "$tb" -lt 1 ] || [ "$z10" -lt 1 ]; then echo "INCOMPLETE: $t (tb=$tb z10=$z10)"; miss=$((miss+1)); fi
done
echo "=== Top-20 fix check done. Incomplete: $miss ==="
