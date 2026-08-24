import { NextResponse } from "next/server";
import { executeAiCompletion, parseJsonContent } from "@/lib/ai-gateway";

export const dynamic = "force-dynamic";

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

Output STRICT JSON ONLY with keys:
{
  "marketSummary": "Concise 2-sentence breakdown of current gold spot momentum, inflation hedging, and central bank demand.",
  "buySellGuidance": "Actionable advice for retail bullion buyers, scrap gold sellers, and wedding jewelry shoppers.",
  "goldSilverRatioAnalysis": "Brief insight on the ${goldSilverRatio}:1 ratio and whether gold or silver is historically positioned for higher upside.",
  "customAnswer": "If a user query was supplied, answer it directly and concisely in 2-3 sentences. Otherwise empty string."
}`;

    const userPrompt = userQuestion
      ? `User Question: "${userQuestion}"`
      : `Provide today's precious metals intelligence summary for live spot gold at ${currency} ${localGoldOz}/oz.`;

    const aiRes = await executeAiCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.5,
      maxTokens: 1200,
      responseFormat: "json"
    });

    const fallback = {
      marketSummary: `Gold spot is consolidating at $${goldPriceOzUsd}/oz (${currency} ${localGoldOz}/oz), supported by steady central bank physical reserves and safe-haven liquidity demands.`,
      buySellGuidance: `At ${currency} ${localGoldGram22k}/g for 22K jewelry and ${currency} ${localGoldGram24k}/g for pure bullion, dollar-cost averaging into sovereign minted bars remains prudent, while locking scrap value on unwanted 18K/14K jewelry is historically advantageous.`,
      goldSilverRatioAnalysis: `The current Gold-to-Silver ratio sits at ${goldSilverRatio}:1. Ratios above 80:1 historically indicate silver is undervalued relative to gold for long-term swing positioning.`,
      customAnswer: userQuestion ? `Regarding your question on "${userQuestion}": Current market dynamics support steady long-term bullion accumulation with low dealer premiums.` : ""
    };

    if (aiRes.success && aiRes.content) {
      const parsed = parseJsonContent(aiRes.content, fallback);
      return NextResponse.json({
        success: true,
        data: {
          marketSummary: parsed.marketSummary || fallback.marketSummary,
          buySellGuidance: parsed.buySellGuidance || fallback.buySellGuidance,
          goldSilverRatioAnalysis: parsed.goldSilverRatioAnalysis || fallback.goldSilverRatioAnalysis,
          customAnswer: parsed.customAnswer || fallback.customAnswer,
        },
        provider: aiRes.provider,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      data: fallback,
      provider: "procedural",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("[Gold Analyst API] Error:", err);
    return NextResponse.json(
      { error: "Failed to generate gold market intelligence", details: err?.message },
      { status: 500 }
    );
  }
}
