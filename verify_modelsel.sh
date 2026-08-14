#!/usr/bin/env bash
# Verify model selector present in served HTML for several AI tools on dev server
tools=(
  "ai/ats-checker"
  "ai/prompt-optimizer"
  "writing/ai-paraphraser"
  "ai/code-explainer"
  "social/youtube-script-generator"
)
for t in "${tools[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/tools/$t")
  html=$(curl -s "http://localhost:3000/tools/$t")
  sel=$(echo "$html" | grep -c "AI Model")
  echo "$t -> HTTP $code, 'AI Model' label: $sel"
done
