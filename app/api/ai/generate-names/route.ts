import { NextResponse } from "next/server";
import { executeAiCompletion, parseJsonContent } from "@/lib/ai-gateway";

export const runtime = "nodejs";

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

    const genderDesc = gender === "boy" ? "boys/male" : gender === "girl" ? "girls/female" : "boys and girls";
    const originDesc = origin === "all" ? "multicultural global cultures" : `${origin} culture`;
    const themeDesc = theme === "all" ? "meaningful and profound" : `${theme} meaning/vibe`;

    const systemPrompt = `You are a world-class onomastics linguist and cultural naming authority.
Always return strictly a valid JSON array of objects with fields:
- name (string)
- gender ("boy" | "girl" | "unisex")
- origin (string)
- meaning (concise string under 12 words)
- pronunciation (string)
- syllables (number)
- theme (string)
- vibe (string)
Do not output markdown codeblocks, text before, or text after.`;

    const userPrompt = `Generate EXACTLY ${count} unique, authentic, culturally accurate names for ${genderDesc} in ${originDesc} with ${themeDesc}.
${searchQuery ? `Must connect to search term: "${searchQuery}".` : ""}
${customPrompt ? `User customization: "${customPrompt}".` : ""}
Ensure zero repetitions, authentic meanings, and phonetics.`;

    const aiRes = await executeAiCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.75,
      maxTokens: 2500,
      responseFormat: "json"
    });

    if (aiRes.success && aiRes.content) {
      const parsed = parseJsonContent<any[]>(aiRes.content, []);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const sanitized = parsed.map((item: any) => ({
          name: String(item.name || "").trim(),
          gender: String(item.gender || "unisex").toLowerCase().includes("boy") || String(item.gender || "").toLowerCase().includes("male") ? "boy" : String(item.gender || "").toLowerCase().includes("girl") || String(item.gender || "").toLowerCase().includes("female") ? "girl" : "unisex",
          origin: String(item.origin || origin || "global").toLowerCase(),
          meaning: String(item.meaning || "Eminent name of distinct honor and grace"),
          pronunciation: String(item.pronunciation || item.name || "").replace(/^\/+|\/+$/g, ""),
          syllables: Number(item.syllables) || 2,
          theme: String(item.theme || theme || "Royalty"),
          vibe: String(item.vibe || "Noble & Timeless"),
          isAiGenerated: true,
          provider: aiRes.provider
        })).filter((n) => n.name.length > 1);

        if (sanitized.length > 0) {
          return NextResponse.json({ success: true, names: sanitized, provider: aiRes.provider });
        }
      }
    }

    return NextResponse.json({ success: false, fallback: true, message: "AI generated empty response" });
  } catch (err: any) {
    console.error("[generate-names error]:", err);
    return NextResponse.json({ success: false, error: err?.message || "Internal server error" }, { status: 500 });
  }
}
