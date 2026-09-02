import { NextRequest, NextResponse } from "next/server";
import { getGrowthAnalytics } from "@/lib/storage/expansion-db";
import { auth } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";

export const dynamic = "force-dynamic";

// --- Admin guard helper ---
async function isAuthorized(req: NextRequest): Promise<boolean> {
  // 1. Allow Hermes / server-to-server requests via secret header
  const secret = req.headers.get("x-analytics-secret");
  if (secret && secret === process.env.ANALYTICS_ADMIN_SECRET) {
    return true;
  }

  // 2. Allow the site owner signed in via session
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return false;

  try {
    const session = await auth.api.getSession({
      headers: await nextHeaders(),
    });
    if (session?.user?.email === adminEmail) {
      return true;
    }
  } catch {
    // session fetch failure → deny
  }

  return false;
}

export async function GET(req: NextRequest) {
  // ── Security Gate ──────────────────────────────────────────────────
  if (!(await isAuthorized(req))) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. This dashboard is private." },
      { status: 401 }
    );
  }
  // ────────────────────────────────────────────────────────────────────

  try {
    const data = getGrowthAnalytics(14);

    const briefingMarkdown = `
# 📊 Toolzium Daily Traffic & Growth Briefing
*Generated on ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}*

---

### 🚀 Key Performance Indicators (Today vs Yesterday)
- **Unique Visitors:** ${data.today.uniqueVisitors} (${data.growthRate.visitors >= 0 ? "+" : ""}${data.growthRate.visitors}% vs yesterday)
- **Tool Runs:** ${data.today.toolRuns} (${data.growthRate.runs >= 0 ? "+" : ""}${data.growthRate.runs}%)
- **Total Clicks & Actions:** ${data.today.clicks} (${data.growthRate.clicks >= 0 ? "+" : ""}${data.growthRate.clicks}%)
- **Estimated Impressions:** ${data.today.impressions}

---

### 🏆 Top Ranked Tool on Website
**Winner:** \`${data.topTool.name}\`
- **Total Executions:** ${data.topTool.runs} runs (${data.topTool.percentage}% of overall website traffic)

---

### 📈 Top 5 Tool Leaderboard
${data.topToolsRanking
  .slice(0, 5)
  .map((t) => `${t.rank}. **${t.name}** — ${t.runs} runs`)
  .join("\n")}

---

### 🎯 Daily High Milestone Target
- **Record High Daily Visitors:** ${data.dailyHigh.visitors}
- **Record High Tool Runs:** ${data.dailyHigh.toolRuns}
`.trim();

    return NextResponse.json({
      success: true,
      data,
      briefingMarkdown,
    }, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch growth analytics" },
      { status: 500 }
    );
  }
}
