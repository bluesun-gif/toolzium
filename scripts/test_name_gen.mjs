import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const groqMatch = envContent.match(/GROQ_API_KEYS=["']?(.*?)["']?(\r?\n|$)/);
const groqKey = groqMatch ? groqMatch[1].replace(/["']/g, '').trim() : '';

async function testNameGen(gender, origin, theme, prompt) {
  const systemPrompt = `You are a multicultural onomastics expert and linguist. Return ONLY a valid JSON array of 6 name objects.
Each object must have these exact keys:
"name": string,
"gender": "boy" | "girl" | "unisex",
"origin": string,
"meaning": string,
"pronunciation": string,
"syllables": number,
"theme": string,
"vibe": string

No markdown formatting, no code fences, no intro, no outro.`;

  const userPrompt = `Generate 6 authentic ${gender} names for ${origin} culture/tradition with ${theme} theme.
Custom requirement: ${prompt || "None"}`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1200
    })
  });

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '';
  console.log(`\n=== [${gender} | ${origin} | ${theme}] ===`);
  try {
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    console.log('Successfully parsed', parsed.length, 'names:');
    parsed.forEach(p => console.log(`- ${p.name} (${p.gender}, ${p.origin}): "${p.meaning}" [/${p.pronunciation}/]`));
  } catch (e) {
    console.log('Raw output:', raw);
  }
}

async function run() {
  await testNameGen('boy', 'Arabic / Islamic', 'Wisdom & Intellect', 'Wise Quranic names');
  await testNameGen('boy', 'Arabic / Islamic', 'Royalty & Leadership', 'Royal Islamic prince names');
  await testNameGen('girl', 'Arabic / Islamic', 'Royalty & Leadership', 'Royal Islamic princess names');
}
run();
