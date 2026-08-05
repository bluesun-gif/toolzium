// Toolzium AI API — Vercel Serverless Function
// Securely handles AI tool operations by rotating keys on the server-side

const DEFAULT_SYSTEM_PROMPT = `You are a helpful, intelligent, and concise AI assistant.`;

async function tryGroq(messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  // Try several models in case of rate limits
  for (const model of ['llama-3.3-70b-versatile', 'gemma2-9b-it', 'llama3-8b-8192']) {
    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({ model, messages, max_tokens: 1024 })
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        console.log(`[Groq/${model}] Success`);
        return d.choices[0].message.content;
      }
    } catch(e) {
      console.warn(`[Groq/${model}] Failed:`, e);
    }
  }
  return null;
}

async function tryGemini(messages) {
  // Collect all Gemini keys: GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc.
  const keys = [];
  for (let i = 1; i <= 40; i++) {
    const k = process.env[`GEMINI_API_KEY_${i}`];
    if (k) keys.push(k);
  }
  const singleKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (singleKey) keys.push(singleKey);
  if (!keys.length) return null;

  const key = keys[Math.floor(Math.random() * keys.length)];

  try {
    const parts = messages.map(m => {
      if (m.role === 'system') return [
        { role: 'user', parts: [{ text: `[System Instructions] ${m.content}` }] },
        { role: 'model', parts: [{ text: 'Understood. I will follow these guidelines.' }] }
      ];
      return [{ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }];
    }).flat();
    
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: parts, generationConfig: { maxOutputTokens: 1024 } })
      }
    );
    const d = await r.json();
    if (d.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('[Gemini/2.0-flash] Success');
      return d.candidates[0].content.parts[0].text;
    }
  } catch(e) {
    console.warn('[Gemini] Failed:', e);
  }
  return null;
}

async function tryOpenRouter(messages) {
  // Collect all OpenRouter keys from env: OPENROUTER_KEY_1, OPENROUTER_KEY_2, etc.
  const keys = [];
  for (let i = 1; i <= 50; i++) {
    const k = process.env[`OPENROUTER_KEY_${i}`];
    if (k) keys.push(k);
  }
  const singleKey = process.env.OPENROUTER_API_KEY;
  if (singleKey && singleKey !== 'ollama') keys.push(singleKey);
  if (!keys.length) return null;

  const models = [
    'deepseek/deepseek-v4-flash:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen3-coder:free',
    'google/gemma-2-9b-it:free'
  ];
  const key = keys[Math.floor(Math.random() * keys.length)];
  for (const model of models) {
    try {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
          'HTTP-Referer': 'https://toolzium.com',
          'X-Title': 'Toolzium Utility Portal'
        },
        body: JSON.stringify({ model, messages, max_tokens: 1024, temperature: 0.7 })
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content?.trim()) {
        console.log(`[OpenRouter/${model.split('/')[1]}] Success`);
        return d.choices[0].message.content;
      }
    } catch(e) {
      console.warn(`[OpenRouter/${model}] Failed:`, e);
    }
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message, history = [], systemPrompt } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'No message' });

    const messages = [
      { role: 'system', content: systemPrompt || DEFAULT_SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: message }
    ];

    const reply =
      await tryGroq(messages) ||
      await tryGemini(messages) ||
      await tryOpenRouter(messages) ||
      "⚠️ AI processing is temporarily rate-limited. Please try again in a few seconds.";

    return res.json({ reply, provider: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error', detail: err.message });
  }
}
