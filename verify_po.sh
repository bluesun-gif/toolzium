#!/usr/bin/env bash
curl -s "http://localhost:3000/tools/ai/prompt-optimizer" > po_check.html 2>&1
echo "HTTP size: $(wc -c < po_check.html) bytes"
echo "ToolPageHeader present: $(grep -c 'AI Prompt Optimizer' po_check.html)"
echo "Quality score ring (text-green/yellow/red): $(grep -c 'qualityScore' po_check.html)"
echo "Before/After toggle (Show Original): $(grep -c 'Show Original' po_check.html)"
rm -f po_check.html
