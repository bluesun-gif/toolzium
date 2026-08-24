import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const groqMatch = envContent.match(/GROQ_API_KEYS=["']?(.*?)["']?(\r?\n|$)/);
const groqKey = groqMatch ? groqMatch[1].replace(/["']/g, '').trim() : '';

async function testModel(modelName) {
  console.log(`\nTesting model: ${modelName}...`);
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
          role: 'system',
          content: 'You are an onomastics expert. Return STRICTLY a JSON array of 4 objects with keys: name, gender, origin, meaning, pronunciation, syllables, theme, vibe. No markdown.'
        },
        {
          role: 'user',
          content: 'Generate 4 royal Arabic boy names.'
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });
  console.log(`${modelName} status:`, res.status);
  if (res.ok) {
    const data = await res.json();
    console.log(`${modelName} output:\n`, data.choices?.[0]?.message?.content);
  } else {
    console.log(`${modelName} error:`, await res.text());
  }
}

async function run() {
  await testModel('openai/gpt-oss-120b');
  await testModel('qwen/qwen3.6-27b');
  await testModel('openai/gpt-oss-20b');
}
run();
