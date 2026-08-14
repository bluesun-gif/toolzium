#!/usr/bin/env bash
for t in ai/code-explainer writing/ai-paraphraser social/youtube-script-generator gaming/mlbb-name finance/startup-runway-calc; do
  f="components/tools/$t-client.tsx"
  imp=$(grep -c ModelSelector "$f")
  st=$(grep -c 'const \[model, setModel\]' "$f")
  bd=$(grep -c 'model,' "$f")
  ui=$(grep -c '<ModelSelector' "$f")
  echo "$t: import=$imp state=$st body=$bd ui=$ui"
done
