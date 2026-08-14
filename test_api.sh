#!/usr/bin/env bash
echo "=== Test API with Claude model ==="
curl -s -X POST "http://localhost:3000/api/ai/generate" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Write a one sentence conclusion about AI.","type":"list","model":"claude"}' | head -c 600
echo
echo "=== Test with gpt4o ==="
curl -s -X POST "http://localhost:3000/api/ai/generate" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Write a one sentence conclusion about AI.","type":"list","model":"gpt4o"}' | head -c 600
echo
