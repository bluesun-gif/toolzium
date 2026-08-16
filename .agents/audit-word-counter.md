# Test Plan — Word Counter (/tools/text/word-counter)

## Research (top competitors)
- WordCounter.net: words, characters (with/without spaces), sentences, paragraphs,
  reading/speaking time, TOP WORDS w/ density %, reading level (Flesch), keyword
  density, syllables, pages. Stopword filter. Reading goal (set target words).
- CharacterCounter.com: characters/no-spaces, lines, bytes, reading level.
- Monitor Backlinks word counter: keyword density table with % and count.

## Differentiators we add (free, premium feel)
- Characters (with + without spaces), Words, Unique words, Sentences, Paragraphs,
  Syllables, Pages (250 wpg).
- Reading time + Speaking time (show "Xs" when <1 min).
- Keyword density table: word, count, % of total, with STOPWORD FILTER toggle.
- Reading level: Flesch Reading Ease + grade band.
- Word/Character TARGET with live progress bar (premium feature).
- Sample text + Clear + Copy results buttons.
- Mobile 375px no overflow; dark/light contrast.

## Functional tests
- [ ] Paste text → all stats update live.
- [ ] Empty → all zero, no NaN, no crash.
- [ ] "Hello world. Hello!" → words=2, sentences=2, unique=2, chars no spaces correct.
- [ ] Hyphenated "state-of-the-art" = 1 word (regex \b).
- [ ] Newlines counted as paragraphs only on blank-line separation.
- [ ] Copy button copies a formatted summary.

## Adversarial / fail tests
- [ ] 50,000 chars paste → no freeze (>2s), numbers render.
- [ ] Emoji-only text → no crash, words=0.
- [ ] HTML/`<script>` in text → rendered as text, no XSS.
- [ ] Only whitespace → all zeros.
- [ ] Leading/trailing spaces → word count correct.

## UI / interaction
- [ ] 6-col stat grid collapses to 2/3 on mobile.
- [ ] Density table: filter toggle hides stopwords.
- [ ] Target input: progress bar fills, turns green at 100%.
- [ ] No layout shift; cards aligned; premium not cheap.

## Approval gate
Equals/exceeds WordCounter.net on features + looks more premium → APPROVE.
