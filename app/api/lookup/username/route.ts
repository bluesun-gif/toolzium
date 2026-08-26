import { NextRequest, NextResponse } from "next/server";
import { scanUsername } from "@/lib/data/adapters/username-adapter";
import { recordGeneratedPage } from "@/lib/storage/expansion-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || searchParams.get("name") || "";

    if (!username.trim()) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }

    const result = await scanUsername(username);

    // Record programmatic page for sitemap indexing
    await recordGeneratedPage({
      path: `/username/${encodeURIComponent(result.username)}`,
      type: "username",
      entity: result.username,
      title: `Username OSINT & Social Profile Report for @${result.username}`,
      data: {
        username: result.username,
        foundCount: result.foundCount,
        availableCount: result.availableCount,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Username scan failed." },
      { status: 500 }
    );
  }
}
