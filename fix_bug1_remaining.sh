#!/usr/bin/env bash
# Handle the 44 remaining files: swap <GridPattern /> -> <ToolBackground /> + add import
# (wrapper z-10 added later in per-tool passes for top-priority ones)
for f in $(grep -rl "<GridPattern />" components/tools/ 2>/dev/null); do
  # add import after use client / use strict
  if ! grep -q 'tool-background' "$f"; then
    sed -i '1a import { ToolBackground } from"@/components/shared/tool-background";' "$f"
  fi
  # replace GridPattern usage
  sed -i 's|<GridPattern />|<ToolBackground />|g' "$f"
done
echo "Remaining GridPattern count: $(grep -rl '<GridPattern />' components/tools/ 2>/dev/null | wc -l)"
