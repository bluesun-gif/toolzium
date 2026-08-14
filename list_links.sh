#!/usr/bin/env bash
# Print all 55 AI tool preview links from the actual detected list
grep -rl "/api/ai/generate" components/tools/ 2>/dev/null \
  | sed 's|components/tools/||;s|-client.tsx||' \
  | sort \
  | nl \
  | while read num path; do
      printf "%2d. http://localhost:3000/tools/%s\n" "$num" "$path"
    done
