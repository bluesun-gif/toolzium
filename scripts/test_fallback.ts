import dotenv from "dotenv";
dotenv.config();

// Intentionally clear GROQ keys to test OpenRouter fallback
process.env.GROQ_API_KEYS = "";
process.env.GROQ_API_KEY = "";

import { executeAiCompletion, parseJsonContent } from "../lib/ai-gateway";

async function testFallback() {
  console.log("==================================================");
  console.log("🧪 TESTING INSTANT AUTO-FAILOVER (GROQ IS DISABLED)");
  console.log("==================================================");

  const res = await executeAiCompletion({
    systemPrompt: "You are an onomastic name expert. Return a JSON array of 2 unique baby names with origin and meaning.",
    userPrompt: "Generate 2 royal names in JSON format [{\"name\": \"...\", \"meaning\": \"...\"}]",
    responseFormat: "json"
  });

  console.log("Gateway Success:", res.success);
  console.log("Active Provider Selected:", res.provider);
  console.log("Active Model:", res.model);
  console.log("Inference Duration:", res.durationMs, "ms");
  console.log("Parsed Output:");
  console.log(parseJsonContent(res.content, []));
}

testFallback();
