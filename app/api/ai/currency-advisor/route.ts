import { NextResponse } from "next/server";
import { executeAiCompletion } from "@/lib/ai-gateway";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { baseCurrency = "USD", targetCurrencies = ["EUR", "GBP", "JPY", "CAD"], rates = {} } = body;

    const systemPrompt = `You are a Chief Foreign Exchange (FX) Macro Strategist and International Travel Economist.
Analyze the provided exchange rates and provide high-value actionable traveler intelligence.

Return STRICT JSON ONLY with this schema:
{
  "summary": "1-2 sentence high-level FX trend summary (e.g., Dollar strength against Yen vs Euro)",
  "bestValueDestinations": [
    {
      "currency": "JPY",
      "country": "Japan",
      "advantage": "Why travel purchasing power is extraordinarily high right now",
      "purchasingPowerScore": "9.5/10"
    },
    {
      "currency": "EUR",
      "country": "Eurozone",
      "advantage": "Current seasonal FX dynamics and budget tips",
      "purchasingPowerScore": "8.2/10"
    }
  ],
  "hedgingTip": "Concrete practical advice for international travelers (e.g., card fees, local ATM tricks, avoiding DCC markup).",
  "arbitrageInsight": "Short note on currency cross-rate stability."
}
Raw JSON only. No markdown formatting.`;

    const userPrompt = `Base currency: ${baseCurrency}\nObserved rates: ${JSON.stringify(rates)}\nTarget list: ${targetCurrencies.join(", ")}`;

    const aiRes = await executeAiCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.3,
      maxTokens: 2000,
      responseFormat: "json"
    });

    if (!aiRes.success || !aiRes.content) {
      throw new Error("Failed to generate FX advisor intelligence.");
    }

    const cleaned = aiRes.content
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const startIdx = cleaned.indexOf("{");
    const endIdx = cleaned.lastIndexOf("}");

    if (startIdx === -1 || endIdx === -1) {
      throw new Error("Invalid FX analysis JSON structure.");
    }

    const parsed = JSON.parse(cleaned.slice(startIdx, endIdx + 1));

    return NextResponse.json({
      success: true,
      data: parsed,
      provider: aiRes.provider
    });
  } catch (error: any) {
    console.error("FX Advisor Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate FX insights" },
      { status: 500 }
    );
  }
}
