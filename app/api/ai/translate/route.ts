import { NextResponse } from "next/server";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "qwen/qwen3.6-27b",
  "groq/compound",
  "openai/gpt-oss-20b",
];

async function translateWithAi(text: string, from: string, to: string, tone: string = "standard") {
  const keysStr = process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "";
  const keys = keysStr.split(",").map((k) => k.trim()).filter(Boolean);
  if (keys.length === 0) return null;

  const apiKey = keys[Math.floor(Math.random() * keys.length)];

  const systemPrompt = `You are a professional multilingual translator. 
Translate the provided text from ${from === "auto" ? "the detected language" : from} to ${to}.
Tone: ${tone}.
Maintain original formatting, numbers, capitalization, and punctuation.
Return ONLY the exact translated text without introductory commentary, notes, or quotation marks.`;

  for (const model of GROQ_MODELS) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text },
          ],
          temperature: 0.3,
          max_tokens: 2500,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content?.trim();
        if (content) return content;
      }
    } catch (e) {
      console.warn(`Groq translate ${model} failed, trying next...`);
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const { text, from = "auto", to = "es", tone = "standard" } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text provided for translation" }, { status: 400 });
    }

    const trimmed = text.trim();

    // 1. Try AI translation first if API keys exist
    const aiTranslation = await translateWithAi(trimmed, from, to, tone);
    if (aiTranslation) {
      return NextResponse.json({
        translatedText: aiTranslation,
        source: "neural-ai",
      });
    }

    // 2. Fallback to MyMemory Public Translation API
    const fromCode = from === "auto" ? "en" : from;
    const langpair = `${fromCode}|${to}`;
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      trimmed.slice(0, 500)
    )}&langpair=${langpair}`;

    const res = await fetch(myMemoryUrl, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.responseData && data.responseData.translatedText) {
        return NextResponse.json({
          translatedText: data.responseData.translatedText,
          source: "mymemory",
        });
      }
    }

    return NextResponse.json({ error: "Translation service unavailable" }, { status: 500 });
  } catch (err: any) {
    console.error("Translate API route error:", err);
    return NextResponse.json({ error: err.message || "Failed to translate text" }, { status: 500 });
  }
}
