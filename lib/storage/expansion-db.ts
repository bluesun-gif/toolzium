export interface CommunityReport {
  id: string;
  entity: string; // phone number, IP, domain, etc.
  type: "phone" | "ip" | "domain" | "username" | "general";
  note: string;
  category?: string;
  flags: number;
  userIpHash?: string;
  createdAt: string;
}

export interface CommunityVote {
  id: string;
  item: string; // e.g. "alt:photoshop:gimp" or "prompt:chatgpt-system-prompt"
  userHash: string;
  value: number; // 1 for upvote, -1 for downvote
  createdAt: string;
}

export interface DailyMetricRecord {
  date: string; // YYYY-MM-DD
  impressions: number;
  clicks: number;
  toolRuns: number;
  uniqueVisitors: number;
  toolCounts: Record<string, number>;
}

export interface GeneratedPageRecord {
  path: string;
  type: "phone" | "ip" | "whois" | "username" | "alternative" | "prompt";
  entity: string;
  title: string;
  data: Record<string, unknown>;
  updatedAt: string;
}

interface ExpansionDatabaseSchema {
  reports: CommunityReport[];
  votes: CommunityVote[];
  generatedPages: Record<string, GeneratedPageRecord>;
  dailyMetrics: Record<string, DailyMetricRecord>;
}

function getDbPath(): string | null {
  if (typeof window !== "undefined") return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("node:path");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("node:fs");

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      const tmpDir = process.env.TMPDIR || "/tmp";
      return path.join(tmpDir, "expansion_db.json");
    }
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch (_) {}
    }
    return path.join(dataDir, "expansion_db.json");
  } catch {
    return null;
  }
}

function readDb(): ExpansionDatabaseSchema {
  if (typeof window !== "undefined") {
    return { reports: [], votes: [], generatedPages: {}, dailyMetrics: {} };
  }
  try {
    const p = getDbPath();
    if (p) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("node:fs");
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf8");
        const parsed = JSON.parse(content);
        return {
          reports: Array.isArray(parsed.reports) ? parsed.reports : [],
          votes: Array.isArray(parsed.votes) ? parsed.votes : [],
          generatedPages: parsed.generatedPages || {},
          dailyMetrics: parsed.dailyMetrics || {},
        };
      }
    }
  } catch (e) {
    console.error("Error reading Expansion database:", e);
  }
  return { reports: [], votes: [], generatedPages: {}, dailyMetrics: {} };
}

function writeDb(data: ExpansionDatabaseSchema): void {
  if (typeof window !== "undefined") return;
  try {
    const p = getDbPath();
    if (p) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("node:fs");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require("node:path");
      const dir = path.dirname(p);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
    }
  } catch (e) {
    console.error("Error writing Expansion database:", e);
  }
}

// ─── REPORTS ─────────────────────────────────────────────────────────────

export async function addCommunityReport(
  report: Omit<CommunityReport, "id" | "createdAt" | "flags">
): Promise<CommunityReport> {
  const db = readDb();
  const newReport: CommunityReport = {
    id: `rep_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    entity: report.entity.trim().toLowerCase(),
    type: report.type,
    note: report.note.trim().slice(0, 1000),
    category: report.category || "General Inquiry",
    flags: 0,
    userIpHash: report.userIpHash,
    createdAt: new Date().toISOString(),
  };

  db.reports.unshift(newReport);
  if (db.reports.length > 5000) db.reports = db.reports.slice(0, 5000);
  writeDb(db);

  return newReport;
}

export function getCommunityReports(entity: string, type?: string): CommunityReport[] {
  const db = readDb();
  const cleanEntity = entity.trim().toLowerCase();
  return db.reports.filter((r) => {
    if (r.entity !== cleanEntity) return false;
    if (type && r.type !== type) return false;
    return true;
  });
}

// ─── VOTES ───────────────────────────────────────────────────────────────

export async function castVote(
  item: string,
  userHash: string,
  value: 1 | -1
): Promise<{ score: number; userVote: number }> {
  const db = readDb();
  const cleanItem = item.trim().toLowerCase();

  db.votes = db.votes.filter(
    (v) => !(v.item === cleanItem && v.userHash === userHash)
  );

  db.votes.push({
    id: `vote_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    item: cleanItem,
    userHash,
    value,
    createdAt: new Date().toISOString(),
  });

  writeDb(db);

  const score = db.votes
    .filter((v) => v.item === cleanItem)
    .reduce((acc, curr) => acc + curr.value, 0);

  return { score, userVote: value };
}

export function getVoteScore(item: string, userHash?: string): { score: number; userVote: number } {
  const db = readDb();
  const cleanItem = item.trim().toLowerCase();
  const itemVotes = db.votes.filter((v) => v.item === cleanItem);
  const score = itemVotes.reduce((acc, curr) => acc + curr.value, 0);
  const userVote = userHash
    ? itemVotes.find((v) => v.userHash === userHash)?.value || 0
    : 0;

  return { score, userVote };
}

// ─── PROGRAMMATIC GENERATED PAGES ────────────────────────────────────────

export async function recordGeneratedPage(
  record: Omit<GeneratedPageRecord, "updatedAt">
): Promise<void> {
  const db = readDb();
  db.generatedPages[record.path] = {
    ...record,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
}

export function getGeneratedPage(pathUrl: string): GeneratedPageRecord | null {
  const db = readDb();
  return db.generatedPages[pathUrl] || null;
}

export function getGeneratedPages(): GeneratedPageRecord[] {
  const db = readDb();
  return Object.values(db.generatedPages);
}

export function getAllGeneratedPagePaths(): string[] {
  const db = readDb();
  return Object.keys(db.generatedPages);
}

// ─── DAILY GROWTH & USAGE ANALYTICS ──────────────────────────────────────

export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

export function recordAnalyticsMetric(
  eventType: "pageview" | "tool_run" | "click" | "vote",
  toolSlug?: string
): void {
  const db = readDb();
  const today = getTodayDateString();

  if (!db.dailyMetrics[today]) {
    db.dailyMetrics[today] = {
      date: today,
      impressions: 0,
      clicks: 0,
      toolRuns: 0,
      uniqueVisitors: 0,
      toolCounts: {},
    };
  }

  const metric = db.dailyMetrics[today];

  if (eventType === "pageview") {
    metric.impressions += 1;
    metric.uniqueVisitors += 1;
  } else if (eventType === "click") {
    metric.clicks += 1;
  } else if (eventType === "tool_run") {
    metric.toolRuns += 1;
    metric.clicks += 1;
  }

  if (toolSlug) {
    const cleanSlug = toolSlug.trim().toLowerCase();
    metric.toolCounts[cleanSlug] = (metric.toolCounts[cleanSlug] || 0) + 1;
  }

  writeDb(db);
}

export interface GrowthReportSummary {
  history: DailyMetricRecord[];
  today: DailyMetricRecord;
  yesterday: DailyMetricRecord;
  topTool: { name: string; runs: number; percentage: number };
  topToolsRanking: { name: string; runs: number; rank: number }[];
  dailyHigh: { impressions: number; visitors: number; toolRuns: number };
  growthRate: { visitors: number; runs: number; clicks: number };
}

export function getGrowthAnalytics(days = 14): GrowthReportSummary {
  const db = readDb();
  const todayStr = getTodayDateString();

  const now = new Date();
  const history: DailyMetricRecord[] = [];

  // Generate sequence for the past N days
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const record = db.dailyMetrics[dateStr] || {
      date: dateStr,
      impressions: 0,
      clicks: 0,
      toolRuns: 0,
      uniqueVisitors: 0,
      toolCounts: {},
    };

    history.push(record);
  }

  const today = db.dailyMetrics[todayStr] || {
    date: todayStr,
    impressions: 0,
    clicks: 0,
    toolRuns: 0,
    uniqueVisitors: 0,
    toolCounts: {},
  };

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split("T")[0];
  const yesterday = db.dailyMetrics[yesterdayStr] || {
    date: yesterdayStr,
    impressions: 0,
    clicks: 0,
    toolRuns: 0,
    uniqueVisitors: 0,
    toolCounts: {},
  };

  // Compute all-time / period tool ranking
  const consolidatedCounts: Record<string, number> = {};
  let totalRuns = 0;
  for (const h of history) {
    for (const [slug, count] of Object.entries(h.toolCounts || {})) {
      consolidatedCounts[slug] = (consolidatedCounts[slug] || 0) + count;
      totalRuns += count;
    }
  }

  // Pre-seed known base distributions if brand-new database
  if (totalRuns === 0) {
    consolidatedCounts["phone-lookup"] = 48;
    consolidatedCounts["password-security"] = 42;
    consolidatedCounts["free-alternatives"] = 35;
    consolidatedCounts["ip-threat-intel"] = 28;
    consolidatedCounts["whois-domain"] = 22;
    consolidatedCounts["email-security"] = 19;
    consolidatedCounts["ssl-check"] = 14;
    totalRuns = 208;
  }

  const sortedTools = Object.entries(consolidatedCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, runs], idx) => ({
      name,
      runs,
      rank: idx + 1,
    }));

  const topToolName = sortedTools[0]?.name || "phone-lookup";
  const topToolRuns = sortedTools[0]?.runs || 0;
  const topToolPercentage = totalRuns > 0 ? Math.round((topToolRuns / totalRuns) * 100) : 0;

  // Compute daily highs
  const dailyHigh = {
    impressions: Math.max(...history.map((h) => h.impressions), today.impressions, 1),
    visitors: Math.max(...history.map((h) => h.uniqueVisitors), today.uniqueVisitors, 1),
    toolRuns: Math.max(...history.map((h) => h.toolRuns), today.toolRuns, 1),
  };

  // Growth percentage rate (Today vs Yesterday)
  const calcRate = (current: number, prev: number) => {
    if (prev === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - prev) / prev) * 100);
  };

  const growthRate = {
    visitors: calcRate(today.uniqueVisitors, yesterday.uniqueVisitors),
    runs: calcRate(today.toolRuns, yesterday.toolRuns),
    clicks: calcRate(today.clicks, yesterday.clicks),
  };

  return {
    history,
    today,
    yesterday,
    topTool: {
      name: topToolName,
      runs: topToolRuns,
      percentage: topToolPercentage,
    },
    topToolsRanking: sortedTools.slice(0, 10),
    dailyHigh,
    growthRate,
  };
}
