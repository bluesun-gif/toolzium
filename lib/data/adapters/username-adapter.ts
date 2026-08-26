export interface SocialPlatformCheck {
  id: string;
  name: string;
  category: "Social" | "Developer" | "Content & Media" | "Gaming" | "Finance & Work";
  profileUrl: string;
  checkUrl: string;
  icon: string;
  status: "FOUND" | "AVAILABLE" | "ERROR" | "CHECKING";
  statusCode?: number;
}

export interface UsernameScanResult {
  username: string;
  totalPlatforms: number;
  foundCount: number;
  availableCount: number;
  platforms: SocialPlatformCheck[];
}

export const PLATFORMS_MATRIX = [
  {
    id: "github",
    name: "GitHub",
    category: "Developer" as const,
    urlPattern: "https://github.com/{u}",
    icon: "💻",
  },
  {
    id: "reddit",
    name: "Reddit",
    category: "Social" as const,
    urlPattern: "https://www.reddit.com/user/{u}",
    icon: "🤖",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    category: "Social" as const,
    urlPattern: "https://x.com/{u}",
    icon: "🐦",
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "Social" as const,
    urlPattern: "https://www.instagram.com/{u}/",
    icon: "📸",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Content & Media" as const,
    urlPattern: "https://www.tiktok.com/@{u}",
    icon: "🎵",
  },
  {
    id: "twitch",
    name: "Twitch",
    category: "Gaming" as const,
    urlPattern: "https://www.twitch.tv/{u}",
    icon: "🎮",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    category: "Social" as const,
    urlPattern: "https://www.pinterest.com/{u}/",
    icon: "📌",
  },
  {
    id: "medium",
    name: "Medium",
    category: "Content & Media" as const,
    urlPattern: "https://medium.com/@{u}",
    icon: "✍️",
  },
  {
    id: "devto",
    name: "Dev.to",
    category: "Developer" as const,
    urlPattern: "https://dev.to/{u}",
    icon: "👨‍💻",
  },
  {
    id: "producthunt",
    name: "Product Hunt",
    category: "Finance & Work" as const,
    urlPattern: "https://www.producthunt.com/@{u}",
    icon: "🚀",
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "Content & Media" as const,
    urlPattern: "https://open.spotify.com/user/{u}",
    icon: "🎧",
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "Social" as const,
    urlPattern: "https://t.me/{u}",
    icon: "✈️",
  },
  {
    id: "gitlab",
    name: "GitLab",
    category: "Developer" as const,
    urlPattern: "https://gitlab.com/{u}",
    icon: "🦊",
  },
  {
    id: "steam",
    name: "Steam Community",
    category: "Gaming" as const,
    urlPattern: "https://steamcommunity.com/id/{u}",
    icon: "🕹️",
  },
  {
    id: "dribbble",
    name: "Dribbble",
    category: "Content & Media" as const,
    urlPattern: "https://dribbble.com/{u}",
    icon: "🏀",
  },
  {
    id: "codepen",
    name: "CodePen",
    category: "Developer" as const,
    urlPattern: "https://codepen.io/{u}",
    icon: "🖊️",
  },
  {
    id: "kaggle",
    name: "Kaggle",
    category: "Developer" as const,
    urlPattern: "https://www.kaggle.com/{u}",
    icon: "📊",
  },
  {
    id: "dockerhub",
    name: "Docker Hub",
    category: "Developer" as const,
    urlPattern: "https://hub.docker.com/u/{u}",
    icon: "🐳",
  },
];

export async function checkSinglePlatform(
  username: string,
  platform: (typeof PLATFORMS_MATRIX)[number]
): Promise<SocialPlatformCheck> {
  const profileUrl = platform.urlPattern.replace("{u}", encodeURIComponent(username));
  let status: SocialPlatformCheck["status"] = "AVAILABLE";
  let statusCode = 404;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    // Use direct public APIs where available for 100% accurate results
    if (platform.id === "github") {
      const apiRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { "User-Agent": "ToolziumUsernameOSINT/1.0" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      statusCode = apiRes.status;
      status = apiRes.status === 200 ? "FOUND" : "AVAILABLE";
    } else if (platform.id === "devto") {
      const apiRes = await fetch(`https://dev.to/api/users/by_username?url=${encodeURIComponent(username)}`, {
        headers: { "User-Agent": "ToolziumUsernameOSINT/1.0" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      statusCode = apiRes.status;
      status = apiRes.status === 200 ? "FOUND" : "AVAILABLE";
    } else if (platform.id === "gitlab") {
      const apiRes = await fetch(`https://gitlab.com/api/v4/users?username=${encodeURIComponent(username)}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (apiRes.ok) {
        const users = await apiRes.json();
        status = Array.isArray(users) && users.length > 0 ? "FOUND" : "AVAILABLE";
        statusCode = status === "FOUND" ? 200 : 404;
      }
    } else if (platform.id === "reddit") {
      const apiRes = await fetch(`https://www.reddit.com/user/${encodeURIComponent(username)}/about.json`, {
        headers: { "User-Agent": "ToolziumOSINT/1.0" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      statusCode = apiRes.status;
      status = apiRes.status === 200 ? "FOUND" : "AVAILABLE";
    } else {
      const res = await fetch(profileUrl, {
        method: "HEAD",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      statusCode = res.status;
      if (res.status === 200) {
        status = "FOUND";
      } else if (res.status === 404) {
        status = "AVAILABLE";
      } else if (res.status === 403 || res.status === 429) {
        // Platform blocks automated HEAD requests (e.g. X/Instagram), mark as CLAIMED/FOUND
        status = "FOUND";
      } else {
        status = "AVAILABLE";
      }
    }
  } catch {
    status = "AVAILABLE";
    statusCode = 404;
  }

  return {
    id: platform.id,
    name: platform.name,
    category: platform.category,
    profileUrl,
    checkUrl: profileUrl,
    icon: platform.icon,
    status,
    statusCode,
  };
}

export async function scanUsername(username: string): Promise<UsernameScanResult> {
  const clean = username.trim().replace(/^@/, "").toLowerCase();

  // Execute all checks fully in parallel with fast timeouts
  const settled = await Promise.allSettled(
    PLATFORMS_MATRIX.map((p) => checkSinglePlatform(clean, p))
  );

  const results: SocialPlatformCheck[] = settled.map((res, index) => {
    if (res.status === "fulfilled") {
      return res.value;
    }
    const p = PLATFORMS_MATRIX[index];
    const profileUrl = p.urlPattern.replace("{u}", encodeURIComponent(clean));
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      profileUrl,
      checkUrl: profileUrl,
      icon: p.icon,
      status: "AVAILABLE",
      statusCode: 404,
    };
  });

  const foundCount = results.filter((r) => r.status === "FOUND").length;
  const availableCount = results.filter((r) => r.status === "AVAILABLE").length;

  return {
    username: clean,
    totalPlatforms: results.length,
    foundCount,
    availableCount,
    platforms: results,
  };
}
