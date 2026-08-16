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
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1].split(/[/?]/)[0];
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1].split(/[/?]/)[0];
      return u.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

// ─── YouTube — Multi-client strategy ──────────────────────────────────────────

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
    errorScreen?: unknown;
  };
}

// Multiple client strategies — tried in order until one returns streaming data
const YT_CLIENTS = [
  // iOS client — least restricted for unlocked videos
  {
    key: "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc",
    ua: "com.google.ios.youtube/19.09.3 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)",
    body: (videoId: string) => ({
      context: {
        client: {
          clientName: "IOS",
          clientVersion: "19.09.3",
          deviceModel: "iPhone16,2",
          hl: "en",
          gl: "US",
          utcOffsetMinutes: 0,
        },
      },
      videoId,
      playbackContext: { contentPlaybackContext: { html5Preference: "HTML5_PREF_WANTS" } },
    }),
  },
  // Android client — second option
  {
    key: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
    ua: "com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip",
    body: (videoId: string) => ({
      context: {
        client: {
          clientName: "ANDROID",
          clientVersion: "17.36.4",
          androidSdkVersion: 31,
          hl: "en",
          gl: "US",
          utcOffsetMinutes: 0,
        },
      },
      videoId,
    }),
  },
  // TV Embedded — often bypasses some restrictions
  {
    key: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
    ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/537.36 Chrome/56.0.2924.0 TV Safari/537.36",
    body: (videoId: string) => ({
      context: {
        client: {
          clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
          clientVersion: "2.0",
          hl: "en",
          gl: "US",
        },
        thirdParty: { embedUrl: "https://www.youtube.com/" },
      },
      videoId,
    }),
  },
];

async function callYTPlayerAPI(videoId: string): Promise<YTApiResponse | null> {
  for (const client of YT_CLIENTS) {
    try {
      const res = await fetch(
        `https://www.youtube.com/youtubei/v1/player?key=${client.key}&prettyPrint=false`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": client.ua,
            "X-Goog-Api-Format-Version": "2",
          },
          body: JSON.stringify(client.body(videoId)),
          signal: AbortSignal.timeout(15000),
        }
      );

      if (!res.ok) {
        console.error(`YT client returned ${res.status} for client ${JSON.stringify(client.body(videoId).context.client.clientName)}`);
        continue;
      }

      const data = (await res.json()) as YTApiResponse;
      const hasStreams =
        (data.streamingData?.formats?.length ?? 0) > 0 ||
        (data.streamingData?.adaptiveFormats?.length ?? 0) > 0;

      if (hasStreams) return data;

      // Log why it failed
      console.error(`YT no streams: status=${data.playabilityStatus?.status}, reason=${data.playabilityStatus?.reason}`);
    } catch (e) {
      console.error(`YT client error: ${e}`);
    }
  }
  return null;
}

async function downloadYouTube(url: string, quality: string) {
  const videoId = extractYouTubeId(url);
  if (!videoId) throw new Error("Invalid YouTube URL — could not extract video ID.");

  let data = await callYTPlayerAPI(videoId);

  if (!data || !data.streamingData?.formats) {
    try {
      const fallbackResult = await downloadViaCobalt(url, "auto", quality);
      if (fallbackResult) return fallbackResult;
    } catch {
      // Continue to error reporting below if fallback also fails
    }
  }

  if (!data) {
    throw new Error(
      "YouTube download service is temporarily busy. Please try another video URL or select 360p quality."
    );
  }

  if (data.playabilityStatus?.status === "ERROR" ||
      data.playabilityStatus?.status === "LOGIN_REQUIRED" ||
      data.playabilityStatus?.status === "UNPLAYABLE") {
    throw new Error(
      data.playabilityStatus.reason ??
      "This video is unavailable, age-restricted, or requires login and cannot be downloaded."
    );
  }

  const allFormats: YTFormat[] = [
    ...(data.streamingData?.formats ?? []),
    ...(data.streamingData?.adaptiveFormats ?? []),
  ];

  const directFormats = allFormats.filter((f) => !!f.url);
  const progressiveFormats = directFormats.filter(
    (f) => f.mimeType?.startsWith("video") && !f.mimeType.includes("webm") && !!f.qualityLabel
  );

  // Quality → itag preference map (progressive/combined streams only)
  const qualityMap: Record<string, number[]> = {
    "360": [18],
    "720": [22, 18],
    "480": [135, 18],
    "1080": [137, 22, 18],
    "1440": [264, 22],
    "2160": [266, 264, 22],
    "best": [22, 18, 137, 136, 135, 134, 160],
    "max": [22, 18, 137, 136, 135, 134, 160],
    "audio": [140, 251, 250, 249, 141],
    "240": [133, 18],
    "144": [160, 18],
  };

  const preferredItags = qualityMap[quality] ?? qualityMap["best"];

  let chosenFormat: YTFormat | undefined;
  for (const itag of preferredItags) {
    chosenFormat = progressiveFormats.find((f) => f.itag === itag);
    if (chosenFormat) break;
  }
  // Fallback to any direct format
  if (!chosenFormat) {
    for (const itag of preferredItags) {
      chosenFormat = directFormats.find((f) => f.itag === itag);
      if (chosenFormat) break;
    }
  }
  if (!chosenFormat) chosenFormat = progressiveFormats[0] ?? directFormats[0];

  if (!chosenFormat?.url) {
    throw new Error("No direct download link found. Try 360p or 720p quality.");
  }

  const thumbnail = data.videoDetails?.thumbnail?.thumbnails?.slice(-1)[0]?.url ?? "";
  const title = data.videoDetails?.title ?? "YouTube Video";
  const duration = data.videoDetails?.lengthSeconds
    ? formatDuration(parseInt(data.videoDetails.lengthSeconds, 10))
    : "";

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
  };
}

// ─── TikTok via tikwm.com ──────────────────────────────────────────────────────

interface TikWmResponse {
  code: number;
  msg?: string;
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

async function downloadTikTok(url: string, withWatermark: boolean) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      Referer: "https://www.tikwm.com/",
    },
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) throw new Error(`TikTok service error (${res.status}). Try again shortly.`);

  const data = (await res.json()) as TikWmResponse;
  if (data.code !== 0 || !data.data) {
    throw new Error("Could not fetch this TikTok video. It may be private, removed, or restricted.");
  }

  const videoUrl = withWatermark
    ? (data.data.wmplay ?? data.data.play)
    : (data.data.hdplay ?? data.data.play);

  if (!videoUrl) throw new Error("No TikTok download link returned.");

  return {
    status: "stream",
    url: videoUrl,
    filename: `tiktok_${Date.now()}.mp4`,
    quality: withWatermark ? "HD (with watermark)" : "HD (no watermark)",
    platform: "TikTok",
    thumbnail: data.data.cover ?? "",
    title: data.data.title ?? "TikTok Video",
    duration: data.data.duration ? formatDuration(data.data.duration) : "",
  };
}

// ─── Cobalt fallback ───────────────────────────────────────────────────────────

async function downloadViaCobalt(url: string, downloadMode: string, videoQuality: string) {
  const res = await fetch("https://api.cobalt.tools/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36",
      Origin: "https://cobalt.tools",
      Referer: "https://cobalt.tools/",
    },
    body: JSON.stringify({ url, downloadMode, videoQuality, filenameStyle: "pretty" }),
    signal: AbortSignal.timeout(25000),
  });

  if (!res.ok) {
    throw new Error(
      "This platform is not fully supported yet. YouTube and TikTok work best. For others, try pasting the URL directly into cobalt.tools."
    );
  }

  const data = await res.json() as Record<string, unknown>;
  if (!data.status || (!data.url && data.status !== "picker")) {
    throw new Error("Could not get download link for this platform.");
  }
  return data;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_").slice(0, 100);
}

// ─── Handler ───────────────────────────────────────────────────────────────────

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
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const platform = detectPlatform(url);

    let result;
    if (platform === "youtube") {
      const q = (videoQuality ?? "best").replace("p", "");
      result = await downloadYouTube(url, q);
    } else if (platform === "tiktok") {
      result = await downloadTikTok(url, tiktokWatermark ?? false);
    } else {
      result = await downloadViaCobalt(url, downloadMode ?? "auto", videoQuality ?? "1080");
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    const status = message.includes("timed out") || message.includes("timeout") ? 504 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
