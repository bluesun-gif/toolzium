import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GROQ_API_KEYS = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "allam-2-7b"
];

async function callGroqChat(messages: any[], systemPrompt: string): Promise<string> {
  const apiKey = GROQ_API_KEYS[Math.floor(Math.random() * GROQ_API_KEYS.length)];
  if (!apiKey) throw new Error("No GROQ_API_KEY configured");

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
            ...messages,
          ],
          temperature: 0.5,
          max_tokens: 1200,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content || "";
        if (content) return content;
      }
    } catch (err) {
      console.warn(`[Groq Gold Analyst] Model ${model} failed, trying next`, err);
    }
  }

  throw new Error("All Groq models failed");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      goldPriceOzUsd = 2750,
      currency = "USD",
      fxRate = 1,
      silverPriceOzUsd = 32,
      userQuestion = "",
    } = body;

    const localGoldOz = (goldPriceOzUsd * fxRate).toFixed(2);
    const localGoldGram24k = ((goldPriceOzUsd / 31.1035) * fxRate).toFixed(2);
    const localGoldGram22k = (((goldPriceOzUsd / 31.1035) * (22 / 24)) * fxRate).toFixed(2);
    const localGoldGram18k = (((goldPriceOzUsd / 31.1035) * (18 / 24)) * fxRate).toFixed(2);
    const goldSilverRatio = (goldPriceOzUsd / (silverPriceOzUsd || 1)).toFixed(1);

    const systemPrompt = `You are the Toolzium Precious Metals & Macro Commodity Intelligence Co-Pilot.
You provide precise, actionable, financial and bullion market intelligence.
Current Live Market Data:
- Gold Spot (USD/oz): $${goldPriceOzUsd}
- User Currency: ${currency} (1 USD = ${fxRate} ${currency})
- Local 24K Pure Gold per Gram: ${currency} ${localGoldGram24k}
- Local 22K Jewelry Gold per Gram: ${currency} ${localGoldGram22k}
- Local 18K Luxury Gold per Gram: ${currency} ${localGoldGram18k}
- Gold-to-Silver Ratio: ${goldSilverRatio}:1

Output STRICT JSON ONLY with the following keys:
{
  "marketSummary": "Concise 2-sentence breakdown of current gold spot momentum, inflation hedging, and central bank demand.",
  "buySellGuidance": "Actionable advice for retail bullion buyers, scrap gold sellers, and wedding jewelry shoppers.",
  "goldSilverRatioAnalysis": "Brief insight on the ${goldSilverRatio}:1 ratio and whether gold or silver is historically positioned for higher upside.",
  "customAnswer": "If a user query was supplied, answer it directly and concisely in 2-3 sentences. Otherwise empty string."
}
DO NOT wrap in markdown code blocks like \`\`\`json. Output raw JSON only.`;

    const userPrompt = userQuestion
      ? `User Question: "${userQuestion}"`
      : `Provide today's precious metals intelligence summary for live spot gold at ${currency} ${localGoldOz}/oz.`;

    const rawResponse = await callGroqChat(
      [{ role: "user", content: userPrompt }],
      systemPrompt
    );

    let parsed: any;
    try {
      const cleanJson = rawResponse
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const firstBrace = cleanJson.indexOf("{");
      const lastBrace = cleanJson.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1) {
        parsed = JSON.parse(cleanJson.slice(firstBrace, lastBrace + 1));
      } else {
        parsed = JSON.parse(cleanJson);
      }
    } catch {
      parsed = {
        marketSummary: `Live spot gold is trading at ${currency} ${localGoldOz}/oz (${currency} ${localGoldGram24k}/g for 24K). Physical investment demand and institutional reserves remain strong hedges against fiat depreciation.`,
        buySellGuidance: `For physical jewelry purchases, standard retail premiums range between 8% to 15% above the raw ${currency} ${localGoldGram22k}/g melt value. When liquidating scrap gold, aim for at least 95-98% of melt value.`,
        goldSilverRatioAnalysis: `The current Gold-to-Silver ratio of ${goldSilverRatio}:1 reflects sustained premium on monetary gold relative to industrial silver demand.`,
        customAnswer: userQuestion ? `Based on live spot rates of ${currency} ${localGoldGram24k}/g, physical gold remains supported by global macro conditions.` : ""
      };
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: parsed
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
