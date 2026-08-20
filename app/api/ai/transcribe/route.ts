import { NextResponse } from "next/server";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const language = formData.get("language") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const keysStr = process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "";
    const keys = keysStr.split(",").map((k) => k.trim()).filter(Boolean);

    if (keys.length === 0) {
      return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
    }

    const apiKey = keys[Math.floor(Math.random() * keys.length)];

    const groqForm = new FormData();
    groqForm.append("file", file);
    groqForm.append("model", "whisper-large-v3-turbo");
    if (language && language !== "auto") {
      groqForm.append("language", language.split("-")[0]);
    }
    groqForm.append("response_format", "json");

    const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: groqForm,
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `Whisper transcription failed: ${err}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ text: data.text || "" });
  } catch (err: any) {
    console.error("Transcribe API error:", err);
    return NextResponse.json({ error: err.message || "Failed to transcribe audio" }, { status: 500 });
  }
}
