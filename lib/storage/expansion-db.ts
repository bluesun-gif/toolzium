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
    return { reports: [], votes: [], generatedPages: {} };
  }
  try {
    const p = getDbPath();
    if (p) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("node:fs");
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf8");
        return JSON.parse(content);
      }
    }
  } catch (e) {
    console.error("Error reading Expansion database:", e);
  }
  return { reports: [], votes: [], generatedPages: {} };
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
