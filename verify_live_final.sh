#!/usr/bin/env bash
echo "=== Live toolzium.com verification ==="
echo "Prompt Optimizer (upgraded):"
curl -s -o /dev/null -w "  HTTP %{http_code}\n" "https://toolzium.com/tools/ai/prompt-optimizer"
echo "Paraphraser (upgraded):"
curl -s -o /dev/null -w "  HTTP %{http_code}\n" "https://toolzium.com/tools/writing/ai-paraphraser"
echo "Dice Roller (new):"
curl -s -o /dev/null -w "  HTTP %{http_code}\n" "https://toolzium.com/tools/fun/dice-roller"
echo "Grid + scrim in served HTML (prompt-optimizer):"
curl -s "https://toolzium.com/tools/ai/prompt-optimizer" > /tmp/live.txt 2>&1
echo "  radial-gradient scrim: $(grep -c 'radial-gradient' /tmp/live.txt)"
echo "  z-10 wrapper: $(grep -c 'z-10' /tmp/live.txt)"
rm -f /tmp/live.txt
