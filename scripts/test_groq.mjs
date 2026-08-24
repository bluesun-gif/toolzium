import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const groqMatch = envContent.match(/GROQ_API_KEYS=["']?(.*?)["']?(\r?\n|$)/);
const groqKey = groqMatch ? groqMatch[1].replace(/["']/g, '').trim() : '';

console.log('GROQ KEY:', groqKey ? groqKey.slice(0, 10) + '...' : 'NONE');

async function testGroq() {
  const systemPrompt = `You are a multicultural onomastics expert. Return STRICTLY a JSON array of 6 name objects with fields: name, gender, origin, meaning, pronunciation, syllables, theme, vibe. No markdown, no code fence.`;
  const userPrompt = `Generate 6 authentic boy names for Arabic/Islamic culture with Royalty/Leadership theme.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  });

  console.log('Groq response status:', res.status);
  const data = await res.json();
  console.log('Groq result:\n', data.choices?.[0]?.message?.content);
}

testGroq();
