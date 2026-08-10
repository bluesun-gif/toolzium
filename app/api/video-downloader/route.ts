import { NextRequest, NextResponse } from "next/server";

// ─── Platform Detection ────────────────────────────────────────────────────────

function detectPlatform(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    if (host.includes("youtube.com") || host === "youtu.be") return "youtube";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("twitter.com") || host.includes("x.com")) return "twitter";
    if (host.includes("facebook.com") || host === "fb.watch") return "facebook";
    if (host.includes("reddit.com")) return "reddit";
    if (host.includes("vimeo.com")) return "vimeo";
    if (host.includes("dailymotion.com")) return "dailymotion";
    if (host.includes("twitch.tv")) return "twitch";
    if (host.includes("pinterest.com")) return "pinterest";
    return "other";
  } catch {
    return "other";
  }
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1].split("/")[0];
      return u.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

// ─── YouTube via Android Client API ───────────────────────────────────────────
// Uses YouTube's internal API with Android client context.
// This is the same approach used by yt-dlp and many open-source tools.
// The API key below is YouTube's public Android client key (hardcoded in the Android app).
const YT_ANDROID_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";

interface YTFormat {
  itag: number;
  url?: string;
  mimeType?: string;
  quality?: string;
  qualityLabel?: string;
  bitrate?: number;
  width?: number;
  height?: number;
  contentLength?: string;
  audioQuality?: string;
}

interface YTApiResponse {
  videoDetails?: {
    title?: string;
    author?: string;
    lengthSeconds?: string;
    thumbnail?: { thumbnails?: Array<{ url: string; width: number; height: number }> };
  };
  streamingData?: {
    formats?: YTFormat[];
    adaptiveFormats?: YTFormat[];
    expiresInSeconds?: string;
  };
  playabilityStatus?: {
    status?: string;
    reason?: string;
  };
}

async function downloadYouTube(url: string, quality: string) {
  const videoId = extractYouTubeId(url);
  if (!videoId) throw new Error("Invalid YouTube URL. Could not extract video ID.");

  const payload = {
    context: {
      client: {
        clientName: "ANDROID",
        clientVersion: "17.31.35",
        androidSdkVersion: 30,
        hl: "en",
        gl: "US",
        utcOffsetMinutes: 0,
      },
    },
    videoId,
    params: "8AEB",
  };

  const res = await fetch(
    `https://www.youtube.com/youtubei/v1/player?key=${YT_ANDROID_KEY}&prettyPrint=false`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "com.google.android.youtube/17.31.35 (Linux; U; Android 11) gzip",
        "X-Goog-Api-Format-Version": "2",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    }
  );

  if (!res.ok) throw new Error(`YouTube API returned ${res.status}`);

  const data = (await res.json()) as YTApiResponse;

  if (data.playabilityStatus?.status === "ERROR" || data.playabilityStatus?.status === "LOGIN_REQUIRED") {
    throw new Error(data.playabilityStatus.reason ?? "Video is unavailable or requires login.");
  }

  if (!data.streamingData) {
    throw new Error("No streaming data returned. Video may be age-restricted or unavailable.");
  }

  const allFormats: YTFormat[] = [
    ...(data.streamingData.formats ?? []),
    ...(data.streamingData.adaptiveFormats ?? []),
  ];

  // Filter to formats that have a direct URL (not requiring DASH manifest)
  const directFormats = allFormats.filter((f) => !!f.url);

  // Quality preference order for combined video+audio (progressive streams)
  const progressiveFormats = directFormats.filter(
    (f) => f.mimeType?.startsWith("video") && !f.mimeType?.includes("webm") && f.qualityLabel
  );

  const qualityMap: Record<string, number[]> = {
    "144": [160, 394],
    "240": [133, 395],
    "360": [18, 134, 396],
    "480": [135, 397],
    "720": [22, 136, 398],
    "1080": [137, 399],
    "1440": [264, 400],
    "2160": [266, 401],
    "best": [22, 18, 137, 136, 135, 134],
    "audio": [140, 251, 250, 249, 141],
  };

  const preferredItags = qualityMap[quality] ?? qualityMap["best"];

  // Try to find preferred quality in progressive formats first
  let chosenFormat: YTFormat | undefined;
  for (const itag of preferredItags) {
    chosenFormat = progressiveFormats.find((f) => f.itag === itag);
    if (chosenFormat) break;
  }

  // Fallback: any format with the right itag
  if (!chosenFormat) {
    for (const itag of preferredItags) {
      chosenFormat = directFormats.find((f) => f.itag === itag);
      if (chosenFormat) break;
    }
  }

  // Last resort: best progressive format available
  if (!chosenFormat) {
    chosenFormat = progressiveFormats[0] ?? directFormats[0];
  }

  if (!chosenFormat?.url) {
    throw new Error("No direct download URL found for this quality. Try a lower quality.");
  }

  const thumbnail =
    data.videoDetails?.thumbnail?.thumbnails?.slice(-1)[0]?.url ?? "";
  const title = data.videoDetails?.title ?? "YouTube Video";
  const duration = data.videoDetails?.lengthSeconds
    ? formatDuration(parseInt(data.videoDetails.lengthSeconds))
    : "";

  // Build all available quality options for the response
  const availableQualities = progressiveFormats
    .map((f) => ({ itag: f.itag, label: f.qualityLabel ?? f.quality ?? "auto", url: f.url! }))
    .filter((v, i, arr) => arr.findIndex((x) => x.label === v.label) === i);

  return {
    status: "stream",
    url: chosenFormat.url,
    filename: `${sanitizeFilename(title)}.mp4`,
    quality: chosenFormat.qualityLabel ?? quality,
    platform: "YouTube",
    thumbnail,
    title,
    duration,
    availableQualities,
    expiresIn: data.streamingData.expiresInSeconds
      ? `${Math.floor(parseInt(data.streamingData.expiresInSeconds) / 60)} minutes`
      : undefined,
  };
}

// ─── TikTok via tikwm.com ──────────────────────────────────────────────────────

interface TikWmData {
  code: number;
  data?: {
    title?: string;
    play?: string;
    wmplay?: string;
    hdplay?: string;
    cover?: string;
    duration?: number;
    author?: { nickname?: string };
  };
}

async function downloadTikTok(url: string, wm: boolean) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;

  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://www.tikwm.com/",
    },
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) throw new Error(`TikTok API error: ${res.status}`);

  const data = (await res.json()) as TikWmData;

  if (data.code !== 0 || !data.data) {
    throw new Error("Failed to fetch TikTok video. The video may be private or removed.");
  }

  const videoUrl = wm
    ? (data.data.wmplay ?? data.data.play)
    : (data.data.hdplay ?? data.data.play);

  if (!videoUrl) throw new Error("No TikTok download URL found.");

  return {
    status: "stream",
    url: videoUrl,
    filename: `tiktok_${Date.now()}.mp4`,
    quality: wm ? "HD (with watermark)" : "HD (no watermark)",
    platform: "TikTok",
    thumbnail: data.data.cover ?? "",
    title: data.data.title ?? "TikTok Video",
    duration: data.data.duration ? formatDuration(data.data.duration) : "",
  };
}

// ─── Cobalt fallback for other platforms ──────────────────────────────────────

async function downloadViaCobalt(url: string, downloadMode: string, videoQuality: string) {
  // Try multiple cobalt-compatible endpoints
  const endpoints = [
    "https://api.cobalt.tools/",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
          Origin: "https://cobalt.tools",
          Referer: "https://cobalt.tools/",
        },
        body: JSON.stringify({
          url,
          downloadMode: downloadMode ?? "auto",
          videoQuality: videoQuality ?? "1080",
          filenameStyle: "pretty",
        }),
        signal: AbortSignal.timeout(25000),
      });

      if (!res.ok) continue;

      const data = await res.json() as { status?: string; url?: string; error?: { code?: string } };
      if (data.status && (data.url || data.status === "picker" || data.status === "tunnel")) {
        return data;
      }
    } catch {
      continue;
    }
  }

  throw new Error(
    "This platform is currently unsupported. We support YouTube and TikTok with full download functionality. For other platforms, try a platform-specific tool."
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_").slice(0, 100);
}

// ─── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      url?: string;
      downloadMode?: string;
      videoQuality?: string;
      audioFormat?: string;
      tiktokWatermark?: boolean;
    };

    const { url, downloadMode, videoQuality, tiktokWatermark } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const platform = detectPlatform(url);

    let result;

    if (platform === "youtube") {
      const quality = videoQuality?.replace("p", "") ?? "best";
      result = await downloadYouTube(url, quality);
    } else if (platform === "tiktok") {
      result = await downloadTikTok(url, tiktokWatermark ?? false);
    } else {
      // Try cobalt for other platforms (Instagram, Twitter, Facebook, Reddit, Vimeo, etc.)
      result = await downloadViaCobalt(url, downloadMode ?? "auto", videoQuality ?? "1080");
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message.includes("timeout") || message.includes("abort")) {
      return NextResponse.json(
        { error: "Request timed out. The platform server is slow. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
