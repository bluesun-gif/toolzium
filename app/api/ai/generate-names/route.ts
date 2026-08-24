import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_KEYS = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "")
  .split(",")
  .map((k) => k.trim().replace(/^["']|["']$/g, ""))
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

    const genderDesc = gender === "boy" ? "boys/male" : gender === "girl" ? "girls/female" : "boys and girls";
    const originDesc = origin === "all" ? "multicultural global cultures" : `${origin} culture`;
    const themeDesc = theme === "all" ? "meaningful and profound" : `${theme} meaning/vibe`;

    const userPrompt = `You are a world-class onomastics linguist. Generate EXACTLY ${count} unique, authentic, culturally accurate names for ${genderDesc} in ${originDesc} with ${themeDesc}.
${searchQuery ? `Must connect to search term: "${searchQuery}".` : ""}
${customPrompt ? `User customization: "${customPrompt}".` : ""}
Keep each meaning concise (under 12 words).

Return STRICTLY a JSON array of ${count} objects with fields:
name (string), gender ("boy"|"girl"|"unisex"), origin (string), meaning (string), pronunciation (string), syllables (number), theme (string), vibe (string).
No markdown formatting, no code fences, no text before or after.`;

    const modelsToTry = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"];
    let parsedNames: any[] = [];

    for (const model of modelsToTry) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: userPrompt }],
            temperature: 0.75,
            max_tokens: 3000
          })
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data.choices?.[0]?.message?.content || "";
          const cleaned = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/<think>[\s\S]*?<\/think>/g, "")
            .trim();

          const jsonStart = cleaned.indexOf("[");
          const jsonEnd = cleaned.lastIndexOf("]");
          if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonSubstring = cleaned.substring(jsonStart, jsonEnd + 1);
            const parsed = JSON.parse(jsonSubstring);
            if (Array.isArray(parsed) && parsed.length > 0) {
              parsedNames = parsed;
              break;
            }
          }
        }
      } catch (err) {
        console.error(`Error with model ${model}:`, err);
      }
    }

    if (parsedNames.length > 0) {
      const sanitized = parsedNames.map((item: any) => ({
        name: String(item.name || "").trim(),
        gender: String(item.gender || "unisex").toLowerCase().includes("boy") || String(item.gender || "").toLowerCase().includes("male") ? "boy" : String(item.gender || "").toLowerCase().includes("girl") || String(item.gender || "").toLowerCase().includes("female") ? "girl" : "unisex",
        origin: String(item.origin || origin || "global").toLowerCase(),
        meaning: String(item.meaning || "Eminent name of distinct honor and grace"),
        pronunciation: String(item.pronunciation || item.name || "").replace(/^\/+|\/+$/g, ""),
        syllables: Number(item.syllables) || 2,
        theme: String(item.theme || theme || "Royalty"),
        vibe: String(item.vibe || "Noble & Timeless"),
        isAiGenerated: true
      })).filter((n) => n.name.length > 1);

      return NextResponse.json({ success: true, names: sanitized });
    }

    return NextResponse.json({ success: false, fallback: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, fallback: true, error: err.message });
  }
}
