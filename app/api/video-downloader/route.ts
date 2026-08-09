import { NextRequest, NextResponse } from "next/server";

const COBALT_API = "https://api.cobalt.tools/";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, downloadMode, videoQuality, audioFormat, audioBitrate, tiktokFullAudio } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const cobaltPayload: Record<string, unknown> = {
      url,
      downloadMode: downloadMode ?? "auto",
      videoQuality: videoQuality ?? "1080",
      filenameStyle: "pretty",
    };

    if (audioFormat) cobaltPayload.audioFormat = audioFormat;
    if (audioBitrate) cobaltPayload.audioBitrate = audioBitrate;
    if (tiktokFullAudio) cobaltPayload.tiktokFullAudio = true;

    const response = await fetch(COBALT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Toolzium/1.0",
      },
      body: JSON.stringify(cobaltPayload),
      signal: AbortSignal.timeout(30000),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.code ?? "Download failed. Try a different URL or quality." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("timeout") || message.includes("abort")) {
      return NextResponse.json(
        { error: "Request timed out. The platform may be temporarily unavailable." },
        { status: 504 }
      );
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
