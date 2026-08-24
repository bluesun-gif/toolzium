import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const groqMatch = envContent.match(/GROQ_API_KEYS=["']?(.*?)["']?(\r?\n|$)/);
const groqKey = groqMatch ? groqMatch[1].replace(/["']/g, '').trim() : '';

async function testWithModel(modelName) {
  console.log(`\nTesting ${modelName}:`);
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: 'Return STRICTLY a JSON array of 4 authentic Arabic royal boy names with keys: name, gender, origin, meaning, pronunciation, syllables, theme, vibe. No markdown.'
        }
      ],
      temperature: 0.6,
      max_tokens: 1500
    })
  });
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Output:\n', data.choices?.[0]?.message?.content);
}

async function run() {
  await testWithModel('openai/gpt-oss-120b');
  await testWithModel('allam-2-7b');
}
run();
