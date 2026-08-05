import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export interface JsonLink {
  id: string;
  short: string;
  targetUrl: string;
  userId: string | null;
  createdAt: string;
}

export interface JsonClick {
  id: string;
  linkId: string;
  ts: string;
  referrer?: string;
  country?: string;
  uaHash?: string;
  ipHash?: string;
}

interface JsonDatabaseSchema {
  links: JsonLink[];
  clicks: JsonClick[];
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getDbPath(): string {
  // Use /tmp in Vercel/serverless environments, or local data directory in development
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    const tmpDir = process.env.TMPDIR || "/tmp";
    return path.join(tmpDir, "shortener_db.json");
  }
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch (_) {}
  }
  return path.join(dataDir, "shortener_db.json");
}

function readDb(): JsonDatabaseSchema {
  try {
    const p = getDbPath();
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading JSON database:", e);
  }
  return { links: [], clicks: [] };
}

function writeDb(data: JsonDatabaseSchema): void {
  try {
    const p = getDbPath();
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing JSON database:", e);
  }
}

export function jsonGenerateSlug(): string {
  const db = readDb();
  for (let len = 4; len <= 8; len++) {
    for (let tries = 0; tries < 5; tries++) {
      let s = "";
      for (let i = 0; i < len; i++) {
        s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      }
      if (!db.links.some((l) => l.short === s)) return s;
    }
  }
  return crypto.randomBytes(3).toString("hex");
}

export function jsonCreateShort(targetUrl: string, preferredSlug?: string | null, userId?: string | null) {
  const db = readDb();
  const existing = db.links.find((l) => l.targetUrl === targetUrl);
  if (existing) {
    return {
      id: existing.id,
      short: existing.short,
      targetUrl: existing.targetUrl,
      userId: existing.userId,
      createdAt: new Date(existing.createdAt),
    };
  }

  let short = preferredSlug?.trim() || "";
  if (short) {
    short = short.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
    if (db.links.some((l) => l.short === short)) short = "";
  }
  if (!short) short = jsonGenerateSlug();

  const newLink: JsonLink = {
    id: crypto.randomUUID(),
    short,
    targetUrl,
    userId: userId ?? null,
    createdAt: new Date().toISOString(),
  };

  db.links.push(newLink);
  writeDb(db);

  return {
    id: newLink.id,
    short: newLink.short,
    targetUrl: newLink.targetUrl,
    userId: newLink.userId,
    createdAt: new Date(newLink.createdAt),
  };
}

export function jsonGetLink(short: string) {
  const db = readDb();
  const link = db.links.find((l) => l.short === short);
  if (!link) return null;
  return {
    id: link.id,
    short: link.short,
    targetUrl: link.targetUrl,
    userId: link.userId,
    createdAt: new Date(link.createdAt),
  };
}

export function jsonRecordClick(
  short: string,
  clickData: { referrer?: string; country?: string; uaHash?: string; ipHash?: string }
) {
  const db = readDb();
  const link = db.links.find((l) => l.short === short);
  if (!link) return null;

  const newClick: JsonClick = {
    id: crypto.randomUUID(),
    linkId: link.id,
    ts: new Date().toISOString(),
    referrer: clickData.referrer,
    country: clickData.country,
    uaHash: clickData.uaHash,
    ipHash: clickData.ipHash,
  };

  db.clicks.push(newClick);
  writeDb(db);
  return link.targetUrl;
}

export function jsonGetAnalytics(short: string) {
  const db = readDb();
  const link = db.links.find((l) => l.short === short);
  if (!link) return null;

  const clicks = db.clicks.filter((c) => c.linkId === link.id);
  const createdAt = new Date(link.createdAt);

  const byDay = new Map<string, number>();
  for (const c of clicks) {
    const d = new Date(c.ts);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }

  const refCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();
  for (const c of clicks) {
    if (c.referrer) refCounts.set(c.referrer, (refCounts.get(c.referrer) ?? 0) + 1);
    if (c.country) countryCounts.set(c.country, (countryCounts.get(c.country) ?? 0) + 1);
  }

  const sort = (m: Map<string, number>) => Array.from(m.entries()).sort((a, b) => b[1] - a[1]);

  return {
    link: { id: link.id, short: link.short, targetUrl: link.targetUrl, createdAt },
    total: clicks.length,
    first: createdAt,
    last: clicks.length ? new Date(clicks[clicks.length - 1].ts) : null,
    byDay: Array.from(byDay.entries()).sort((a, b) => a[0].localeCompare(b[0])),
    topReferrers: sort(refCounts).slice(0, 10),
    topCountries: sort(countryCounts).slice(0, 10),
  };
}
