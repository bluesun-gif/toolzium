import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_KEYS = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

let groqIndex = 0;

export async function POST(req: Request) {
  try {
    const {
      gender = "all",
      origin = "all",
      theme = "all",
      searchQuery = "",
      customPrompt = "",
      count = 8
    } = await req.json();

    const groqKey = GROQ_KEYS.length > 0 ? GROQ_KEYS[groqIndex % GROQ_KEYS.length] : null;
    if (GROQ_KEYS.length > 0) groqIndex++;

    if (!groqKey) {
      return NextResponse.json({ success: false, fallback: true, message: "No API key configured" });
    }

    const systemPrompt = `You are a world-class onomastics expert and multicultural linguist specializing in baby names, historical etymology, and phonetics.
Generate EXACTLY ${count} authentic, meaningful names matching the user's criteria.

Return STRICTLY a JSON array of objects with NO markdown formatting, NO backticks, NO text before or after.
Each object must have:
- name: string (e.g. "Harun", "Amira", "Idris")
- gender: "boy" | "girl" | "unisex"
- origin: string (e.g. "arabic", "celtic", "norse", "sanskrit", "japanese", "latin", "greek", "hebrew")
- meaning: string (rich authentic etymology, e.g. "Exalted warrior and noble prophet of eloquent speech")
- pronunciation: string (e.g. "hah-ROON")
- syllables: number (e.g. 2)
- theme: "Light & Sun" | "Strength" | "Nature & Earth" | "Wisdom" | "Royalty" | "Love & Grace" | "Peace"
- vibe: string (e.g. "Regal Islamic Classic", "Mystical & Radiant")`;

    const userPrompt = `Generate ${count} names with these criteria:
- Gender Preference: ${gender}
- Culture/Origin: ${origin}
- Meaning/Theme: ${theme}
- Search Filter/Keywords: ${searchQuery || "None"}
- Custom User Guidance: ${customPrompt || "None"}

Ensure every name has 100% accurate historical/linguistic etymology. Return ONLY JSON array.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, fallback: true });
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
    
    // Clean JSON formatting
    const cleaned = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedNames = JSON.parse(cleaned);
    return NextResponse.json({ success: true, names: parsedNames });
  } catch (err: any) {
    return NextResponse.json({ success: false, fallback: true, error: err.message });
  }
}
