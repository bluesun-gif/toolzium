import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_KEYS = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

const OPENROUTER_KEYS = (process.env.OPENROUTER_API_KEYS || process.env.OPENROUTER_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

let groqIndex = 0;
let openRouterIndex = 0;

function cleanAiOutput(text: string): string[] {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^["']|["']$/g, "")
    .split("\n")
    .map((line) =>
      line
        .replace(/^\d+[\.\)]\s*/, "") // Remove numbers e.g. "1. "
        .replace(/^[-*•]\s*/, "")      // Remove bullets e.g. "- "
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
        .replace(/\*(.*?)\*/g, "$1")     // Remove italic
        .trim()
    )
    .filter((line) => line.length > 0 && !line.toLowerCase().includes("here is") && !line.toLowerCase().includes("here are"));
}

async function callGroq(prompt: string, key: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a creative naming & content generation AI engine. Return only the generated list of items, one per line. Do not include introductory conversational text or markdown formatting.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callOpenRouter(prompt: string, key: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://toolzium.com",
      "X-Title": "Toolzium AI Tools",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are a creative naming & content generation AI engine. Return only the generated list of items, one per line. Do not include introductory conversational text or markdown formatting.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, type = "list" } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    let rawOutput = "";
    let lastError: any = null;

    // 1. Try Groq Key Pool
    if (GROQ_KEYS.length > 0) {
      for (let attempt = 0; attempt < GROQ_KEYS.length; attempt++) {
        const key = GROQ_KEYS[groqIndex % GROQ_KEYS.length];
        groqIndex++;

        try {
          rawOutput = await callGroq(prompt, key);
          if (rawOutput) break;
        } catch (err: any) {
          console.warn(`Groq key attempt ${attempt + 1} failed:`, err.message);
          lastError = err;
        }
      }
    }

    // 2. Fallback to OpenRouter Key Pool if Groq fails or unavailable
    if (!rawOutput && OPENROUTER_KEYS.length > 0) {
      for (let attempt = 0; attempt < Math.min(OPENROUTER_KEYS.length, 5); attempt++) {
        const key = OPENROUTER_KEYS[openRouterIndex % OPENROUTER_KEYS.length];
        openRouterIndex++;

        try {
          rawOutput = await callOpenRouter(prompt, key);
          if (rawOutput) break;
        } catch (err: any) {
          console.warn(`OpenRouter key attempt ${attempt + 1} failed:`, err.message);
          lastError = err;
        }
      }
    }

    if (!rawOutput) {
      throw lastError || new Error("All AI provider keys were rate-limited or unavailable.");
    }

    const items = cleanAiOutput(rawOutput);

    return NextResponse.json({
      success: true,
      results: items,
      raw: rawOutput,
    });
  } catch (error: any) {
    console.error("AI Generation API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
