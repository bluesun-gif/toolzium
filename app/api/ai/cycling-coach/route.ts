import { NextResponse } from "next/server";
import { executeAiCompletion, parseJsonContent } from "@/lib/ai-gateway";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      durationMins = 45,
      intensity = "moderate",
      weightKg = 72,
      caloriesTotal = 380,
      avgWatts = 150,
      cadenceRpm = 85,
      mode = "indoor",
      distanceKm = 15
    } = body;

    const systemPrompt = `You are the Toolzium AI Sports Physiologist & Cycling Performance Coach.
Analyze the user's cycling workout parameters:
- Duration: ${durationMins} minutes
- Intensity Level: ${intensity}
- Total Calorie Burn: ${caloriesTotal} kcal
- Power Output: ~${avgWatts} Watts
- Cadence: ${cadenceRpm} RPM
- Rider Weight: ${weightKg} kg
- Workout Mode: ${mode}
- Estimated Distance: ${distanceKm} km

Return STRICT RAW JSON ONLY with keys:
{
  "coachingTip": "1-2 sentences on cadence efficiency, power-to-weight ratio (W/kg), and EPOC afterburn.",
  "postRideNutrition": "Exact recovery carb/protein grams and water rehydration amount needed for this specific calorie expenditure.",
  "fatBurnInsight": "Brief analysis of aerobic fat oxidation vs glycogen utilization.",
  "weeklyProgression": "1 actionable suggestion for next ride to increase VO2 max or endurance."
}`;

    const userPrompt = `Analyze my ${durationMins}-minute ${intensity} cycling session burning ${caloriesTotal} kcal at ${avgWatts}W and ${cadenceRpm} RPM.`;

    const aiRes = await executeAiCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.6,
      maxTokens: 800,
      responseFormat: "json"
    });

    const fallback = {
      coachingTip: `Maintaining ${cadenceRpm} RPM produces optimal cardiovascular efficiency, generating approximately ${(avgWatts / (weightKg || 70)).toFixed(2)} W/kg with prolonged post-exercise oxygen consumption (EPOC).`,
      postRideNutrition: `Consume ${(caloriesTotal * 0.08).toFixed(0)}g fast carbs + 25g whey/plant protein within 45 minutes, plus ${((caloriesTotal / 500) * 0.6).toFixed(1)}L of electrolyte water.`,
      fatBurnInsight: `At this ${intensity} intensity zone, ~${intensity === "light" ? "65%" : intensity === "moderate" ? "48%" : "25%"} of energy was derived directly from intramuscular lipid fat oxidation.`,
      weeklyProgression: `Add 5 minutes of high-cadence spin (95-100 RPM) intervals on your next ride to elevate your functional threshold power (FTP).`
    };

    if (aiRes.success && aiRes.content) {
      const parsed = parseJsonContent(aiRes.content, fallback);
      return NextResponse.json({
        success: true,
        data: {
          coachingTip: parsed.coachingTip || fallback.coachingTip,
          postRideNutrition: parsed.postRideNutrition || fallback.postRideNutrition,
          fatBurnInsight: parsed.fatBurnInsight || fallback.fatBurnInsight,
          weeklyProgression: parsed.weeklyProgression || fallback.weeklyProgression,
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
    console.error("[Cycling Coach API] Error:", err);
    return NextResponse.json(
      { error: "Failed to generate coaching insights", details: err?.message },
      { status: 500 }
    );
  }
}
