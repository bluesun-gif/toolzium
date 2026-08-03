"use server";

export async function checkHttpHeaders(url: string) {
  try {
    // Add default protocol if missing
    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    // Try HEAD request first for efficiency
    let res: Response;
    try {
      res = await fetch(targetUrl, {
        method: "HEAD",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "*/*"
        },
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(5000)
      });
    } catch (headError) {
      // Fallback to GET if HEAD is rejected by the server (many servers block/restrict HEAD requests)
      res = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "*/*"
        },
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(8000)
      });
    }

    const headersObj: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headersObj[key] = value;
    });

    return {
      ok: true as const,
      status: res.status,
      statusText: res.statusText,
      headers: headersObj
    };
  } catch (err: any) {
    console.error("HTTP header checker error:", err);
    return {
      ok: false as const,
      error: "Could not fetch headers from the URL. Please verify the link is active and accessible."
    };
  }
}
