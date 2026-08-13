#!/usr/bin/env bash
# Batch audit: scan 5 tools for design-DNA deviations vs homepage spec
tools=(
  "calc/bmi-calculator-client"
  "dev/json-formatter-client"
  "ai/ats-checker-client"
  "calc/currency-converter-client"
  "gaming/mlbb-name-client"
)
for t in "${tools[@]}"; do
  f="components/tools/$t.tsx"
  if [ ! -f "$f" ]; then echo "--- $t : FILE NOT FOUND ---"; continue; fi
  echo "--- $t ---"
  echo "  raw div-cards(border rounded): $(grep -c 'border rounded' "$f" 2>/dev/null)"
  echo "  Badge import: $(grep -c 'from\"@/components/ui/badge\"' "$f" 2>/dev/null)"
  echo "  GlassCard uses: $(grep -c 'GlassCard' "$f" 2>/dev/null)"
  echo "  raw <button: $(grep -c '<button' "$f" 2>/dev/null)"
  echo "  GridPattern: $(grep -c 'GridPattern' "$f" 2>/dev/null)"
  echo "  ToolPageHeader: $(grep -c 'ToolPageHeader' "$f" 2>/dev/null)"
  echo "  ToolHowItWorks: $(grep -c 'ToolHowItWorks' "$f" 2>/dev/null)"
done
