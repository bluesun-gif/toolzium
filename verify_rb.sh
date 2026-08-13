#!/usr/bin/env bash
# Verify resume-builder renders with ATS checker on dev server
curl -s "http://localhost:3000/tools/text/resume-builder" > rb_check.html 2>&1
echo "ATS Score Checker: $(grep -c 'ATS Score Checker' rb_check.html)"
echo "Keyword Match: $(grep -c 'Keyword Match' rb_check.html)"
echo "Target icon ref: $(grep -c 'Target' rb_check.html)"
echo "Size: $(wc -c < rb_check.html) bytes"
rm -f rb_check.html
