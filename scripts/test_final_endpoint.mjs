import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const groqMatch = envContent.match(/GROQ_API_KEYS=["']?(.*?)["']?(\r?\n|$)/);
const groqKey = groqMatch ? groqMatch[1].replace(/["']/g, '').trim() : '';

async function testEndpoint() {
  const userPrompt = `You are an onomastics linguist. Generate 6 unique authentic names for boys in Arabic/Islamic culture with Wisdom/Intellect theme.
Keep meanings concise (under 12 words).

Return STRICTLY a JSON array of 6 objects with fields:
name, gender ("boy"|"girl"|"unisex"), origin, meaning, pronunciation, syllables (number), theme, vibe. No markdown.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: userPrompt }],
      temperature: 0.7,
      max_tokens: 2500
    })
  });

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '';
  console.log('Raw output:\n', raw);
  const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
  const jsonStart = cleaned.indexOf('[');
  const jsonEnd = cleaned.lastIndexOf(']');
  const parsed = JSON.parse(cleaned.substring(jsonStart, jsonEnd + 1));
  console.log('Parsed successfully:', parsed.map(p => `${p.name} (${p.gender}) - "${p.meaning}"`));
}

testEndpoint();
