"""
Fix duplicate RelatedTools: removes RelatedTools import + usage from page.tsx
for all 178 affected tools where it already exists inside the client component.
"""
import os
import re

DUPLICATES = [
    "academic/citation-generator","academic/essay-conclusion-generator","academic/flashcard-creator",
    "academic/literature-summarizer","academic/thesis-generator","ai/ats-checker","ai/code-explainer",
    "ai/pdf-chat","ai/product-description","ai/prompt-optimizer","ai/social-bio","ai/sql-regex-builder",
    "ai/startup-name","ai/youtube-script","calc/aspect-ratio","calc/number-words",
    "calc/percentage-calculator","calc/unit-converter","calc/video-ratio","dev/api-status",
    "dev/api-tester","dev/base-converter","dev/code-auditor","dev/code-minifier","dev/color-blindness",
    "dev/color-converter","dev/color-palette","dev/color-picker","dev/cron-explainer","dev/css-animation",
    "dev/css-clippath","dev/css-filters","dev/css-flexbox-builder","dev/css-glassmorphism","dev/css-grid",
    "dev/css-keyframes-speed","dev/css-radius","dev/css-shadow","dev/css-transform-2d",
    "dev/css-transform-3d","dev/css-typography","dev/curl-converter","dev/diff-checker","dev/env-editor",
    "dev/env-scanner","dev/gradient-generator","dev/hash-generator","dev/html-entities","dev/html-markdown",
    "dev/http-status","dev/json-csv","dev/json-formatter","dev/json-schema","dev/json-to-typescript",
    "dev/keycode-info","dev/lorem-ipsum","dev/markdown-editor","dev/mesh-gradient","dev/password-generator",
    "dev/regex-library","dev/regex-tester","dev/sql-formatter","dev/sql-to-prisma","dev/string-escape",
    "dev/svg-optimizer","dev/timestamp-converter","dev/ua-parser","dev/uuid-nanoid","dev/yaml-json",
    "finance/loan-amortization","finance/ltv-calculator","finance/mortgage","finance/retirement",
    "finance/savings-goal","fun/anagram-solver","fun/animal-quiz","fun/ascii-art","fun/color-memory",
    "fun/compound-words","fun/connect4-ai","fun/dice-probability","fun/emoji-story","fun/hangman",
    "fun/love-calculator","fun/magic-8-ball","fun/memory-card-match","fun/memory-grid-flip",
    "fun/memory-match","fun/memory-sequence","fun/morse-audio","fun/name-generator","fun/number-guess",
    "fun/pattern-memory","fun/pattern-tile-memory","fun/quote-generator","fun/reaction-time","fun/rps",
    "fun/simon-says","fun/sudoku","fun/sudoku-unlimited","fun/tic-tac-toe","fun/tictactoe-ai",
    "fun/trivia","fun/truth-or-dare","fun/two-truths","fun/typing-challenge","fun/word-association",
    "fun/word-scramble","fun/word-search","fun/wordle","fun/wordle-6letter","fun/wordle-unlimited",
    "fun/would-you-rather","fun/zodiac","image/aspect-cropper","image/bg-remove","image/image-to-text",
    "image/placeholder-generator","marketing/cold-email-generator","marketing/slogan-generator",
    "network/my-ip","network/whois","productivity/ai-action-items","productivity/ai-meeting-summarizer",
    "productivity/ai-risk-matrix","productivity/ai-status-report","seo/ai-meta-generator",
    "seo/ai-schema-generator","seo/meta-generator","seo/og-builder","seo/og-preview",
    "seo/robots-generator","seo/schema-generator","seo/sitemap-generator","social/video-downloader",
    "text/base64","text/binary-text","text/case-converter","text/character-counter","text/emoji-picker",
    "text/fancy-text","text/line-tools","text/lorem-ipsum","text/markdown-studio","text/markdown-table",
    "text/morse-code","text/palindrome-checker","text/password-strength","text/pronunciation",
    "text/reading-time","text/resume-builder","text/rot13","text/slugify","text/speech-to-text",
    "text/text-diff","text/text-repeater","text/text-stats","text/text-to-speech","text/translate",
    "text/whitespace-remover","text/word-counter","url/qr","url/utm-builder","url/youtube-thumbnail",
    "util/coin-flip","util/dice-roller","util/id-generator","util/pdf-merge","util/random-number",
    "util/stopwatch","util/typing-test","writing/ai-elevator-pitch","writing/ai-grammar-polish",
    "writing/ai-paraphraser","writing/ai-text-humanizer","writing/blog-intro-generator",
    "writing/email-subject-generator","writing/resume-summary-generator",
]

BASE = r"C:\Users\LOQ\toolflux\app\tools"
fixed = 0
skipped = 0
errors = []

for tool_path in DUPLICATES:
    page_file = os.path.join(BASE, tool_path.replace("/", os.sep), "page.tsx")
    if not os.path.exists(page_file):
        errors.append(f"NOT FOUND: {page_file}")
        continue

    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already fixed (ats-checker was already fixed manually)
    if "RelatedTools" not in content:
        skipped += 1
        continue

    original = content

    # 1. Remove the import line for RelatedTools
    content = re.sub(
        r'import\s+(?:RelatedTools|\{[^}]*RelatedTools[^}]*\})\s+from\s+"@/components/shared/related-tools";\s*\n',
        "",
        content
    )

    # 2. Remove the JSX usage: <RelatedTools ... /> (handles multiline)
    content = re.sub(
        r'\s*<RelatedTools[^/]*/>\s*',
        "\n",
        content
    )

    if content != original:
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(content)
        fixed += 1
        print(f"  [FIXED]: {tool_path}")
    else:
        skipped += 1
        print(f"  [SKIP] No change needed: {tool_path}")

print(f"\n=== DONE ===")
print(f"Fixed: {fixed}")
print(f"Skipped (already clean): {skipped}")
if errors:
    print(f"Errors ({len(errors)}):")
    for e in errors:
        print(f"  {e}")
