#!/usr/bin/env bash
tools=(
  "ai/prompt-optimizer"
  "ai/ats-checker"
  "writing/ai-paraphraser"
  "url/qr"
  "url/shortener"
  "text/json-formatter"
  "dev/json-formatter"
  "fun/dice-roller"
)
for t in "${tools[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/tools/$t")
  echo "$t -> HTTP $code"
done
