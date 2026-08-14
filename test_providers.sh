#!/usr/bin/env bash
echo "=== Raw OpenRouter test (Claude) ==="
curl -s -X POST "https://openrouter.ai/api/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{"model":"anthropic/claude-3.5-sonnet","messages":[{"role":"user","content":"hi"}],"max_tokens":50}' | head -c 400
echo
echo "=== Raw Gemini test ==="
GEM=$(grep -oE "GEMINI_API_KEYS?=[^ ]*" .env.local | head -1 | cut -d= -f2)
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$GEM" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"hi"}]}]}' | head -c 400
echo
