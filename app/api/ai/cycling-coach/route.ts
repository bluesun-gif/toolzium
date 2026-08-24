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
          temperature: 0.6,
          max_tokens: 800,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content || "";
        if (content) return content;
      }
    } catch (err) {
      console.warn(`[Groq Cycling Coach] Model ${model} failed, trying next`, err);
    }
  }

  throw new Error("All Groq models failed");
}

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
}
DO NOT wrap in markdown \`\`\`json code fences. Raw JSON only.`;

    const rawResponse = await callGroqChat(
      [{ role: "user", content: `Analyze my ${durationMins}-minute ${intensity} cycling session burning ${caloriesTotal} kcal.` }],
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
        coachingTip: `Maintaining ${cadenceRpm} RPM at ~${avgWatts}W (${(avgWatts / weightKg).toFixed(1)} W/kg) optimizes neuromuscular efficiency and maximizes cardiovascular endurance.`,
        postRideNutrition: `Consume ~${Math.round(caloriesTotal * 0.12)}g carbohydrates and ${Math.round(weightKg * 0.3)}g lean protein within 45 minutes, plus ${Math.round(durationMins * 12)}ml fluids for full electrolyte replenishment.`,
        fatBurnInsight: `In this ${intensity} training zone, your body oxidized approximately ${Math.round(caloriesTotal * 0.45 / 9)}g of lipid stores alongside muscle glycogen.`,
        weeklyProgression: `Add 5 minutes of high-resistance interval surges (90+ RPM) in your next session to elevate your Functional Threshold Power (FTP).`
      };
    }

    return NextResponse.json({
      success: true,
      data: parsed
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
