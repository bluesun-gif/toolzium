#!/usr/bin/env bash
code=$(curl -s -o para.html -w "%{http_code}" "http://localhost:3000/tools/writing/ai-paraphraser")
echo "HTTP: $code"
echo "Size: $(wc -c < para.html) bytes"
echo "Has 'AI Paraphraser': $(grep -c 'AI Paraphraser' para.html)"
echo "Has 'Creativity': $(grep -c 'Creativity' para.html)"
echo "Has 'Humanizer': $(grep -c 'Humanizer' para.html)"
rm -f para.html
