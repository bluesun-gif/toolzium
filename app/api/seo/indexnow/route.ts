import { NextResponse } from "next/server";
import { ToolsData } from "@/data/tools";

const HOST = "toolzium.com";
const KEY = "toolzium-indexnow-key-2026";
const KEY_LOCATION = `https://${HOST}/toolzium-indexnow-key-2026.txt`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    let urlList: string[] = body.urls || [];

    if (!urlList.length) {
      // Auto-populate all tools if no specific URLs provided
      const staticRoutes = [
        `https://${HOST}/`,
        `https://${HOST}/tools`,
        `https://${HOST}/about`,
        `https://${HOST}/privacy`,
        `https://${HOST}/terms`,
      ];
      const categoryRoutes = ToolsData.map((c) => `https://${HOST}${c.url}`);
      const toolRoutes = ToolsData.flatMap((c) => c.items.map((i) => `https://${HOST}${i.url}`));
      urlList = Array.from(new Set([...staticRoutes, ...categoryRoutes, ...toolRoutes]));
    }

    // Submit batch to IndexNow
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList.slice(0, 10000),
    };

    const indexNowEndpoints = [
      "https://api.indexnow.org/indexnow",
      "https://www.bing.com/indexnow",
      "https://yandex.com/indexnow",
    ];

    const results = await Promise.allSettled(
      indexNowEndpoints.map((endpoint) =>
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        }).then((res) => ({ endpoint, status: res.status, ok: res.ok }))
      )
    );

    return NextResponse.json({
      success: true,
      submittedUrlsCount: urlList.length,
      endpoints: results.map((r) => (r.status === "fulfilled" ? r.value : { error: r.reason })),
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit to IndexNow" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "IndexNow API active",
    host: HOST,
    keyLocation: KEY_LOCATION,
    totalToolsAvailable: ToolsData.reduce((acc, c) => acc + c.items.length, 0),
    usage: "Send POST with optional { urls: [...] } to submit URLs to search engines instantly.",
  });
}
