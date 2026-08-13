#!/usr/bin/env bash
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
for t in "${tools[@]}"; do
  f="components/tools/$t-client.tsx"
  if [ ! -f "$f" ]; then f="components/tools/url/link-expand-client.tsx"; fi
  icon=$(grep -o 'icon={[A-Za-z]*}' "$f" | head -1)
  echo "$t -> $icon"
done
