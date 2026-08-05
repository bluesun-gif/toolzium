"use server";

import crypto from "node:crypto";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { normalizeUrl } from "@/lib/normalize-url";
import { prisma } from "../prisma";
import {
  jsonCreateShort,
  jsonGetAnalytics,
  jsonGetLink,
  jsonRecordClick,
} from "@/lib/storage/json-db";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

async function slugExists(slug: string) {
  try {
    const link = await prisma.link.findUnique({ where: { short: slug } });
    return !!link;
  } catch (e) {
    return false;
  }
}

export async function generateUniqueSlug() {
  for (let len = 4; len <= 8; len++) {
    for (let tries = 0; tries < 4; tries++) {
      let s = "";
      for (let i = 0; i < len; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (!(await slugExists(s))) return s;
    }
  }
  return crypto.randomBytes(6).toString("base64url");
}

export async function createShort({
  url,
  preferredSlug,
  userId,
}: {
  url: string;
  preferredSlug?: string | null;
  userId?: string | null;
}) {
  const targetUrl = normalizeUrl(url);
  if (!targetUrl) return { ok: false as const, error: "INVALID_URL" };

  try {
    // 1. Try real database
    const existing = await prisma.link.findFirst({ where: { targetUrl } });
    if (existing) {
      return { ok: true as const, existed: true, link: existing };
    }

    let short = preferredSlug?.trim() || "";
    if (short) {
      short = short.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
      const taken = await prisma.link.findUnique({ where: { short } });
      if (taken) short = "";
    }
    if (!short) short = await generateUniqueSlug();

    const link = await prisma.link.create({
      data: { short, targetUrl, userId: userId ?? null },
    });
    return { ok: true as const, existed: false, link };
  } catch (dbError) {
    console.warn("Prisma DB connection unavailable, using clean JSON store fallback:", dbError);
    
    // 2. Fall back to JSON database (clean short link + working analytics!)
    const link = jsonCreateShort(targetUrl, preferredSlug, userId);
    return { ok: true as const, existed: false, link };
  }
}

export async function getLink(short: string) {
  // 1. Check if it is a legacy stateless compressed URL
  if (short.startsWith("_") || short.startsWith("h_")) {
    try {
      const prefix = short.startsWith("h_") ? "h_" : "_";
      const b64 = short.substring(prefix.length);
      const zlib = require("zlib");
      const buffer = Buffer.from(b64, "base64url");
      const decompressed = zlib.inflateRawSync(buffer).toString("utf8");
      const targetUrl = (prefix === "h_" ? "http://" : "https://") + decompressed;
      return {
        id: crypto.randomUUID(),
        short,
        targetUrl,
        createdAt: new Date(),
        userId: null,
      };
    } catch (err) {
      console.error("Failed to parse stateless link:", err);
    }
  }

  // 2. Database lookup
  try {
    const link = await prisma.link.findUnique({ where: { short } });
    if (link) return link;
  } catch (e) {
    // Ignore and proceed to JSON fallback
  }

  // 3. Fallback to JSON database
  return jsonGetLink(short);
}

export type AnalyticsResponse = {
  link: { id: string; short: string; targetUrl: string; createdAt: Date };
  total: number;
  first: Date;
  last: Date | null;
  byDay: [string, number][];
  topReferrers: [string, number][];
  topCountries: [string, number][];
};

export async function getAnalytics(short: string): Promise<AnalyticsResponse | null> {
  // 1. Check if it is a legacy stateless compressed URL
  if (short.startsWith("_") || short.startsWith("h_")) {
    const link = await getLink(short);
    if (!link) return null;
    return {
      link: { id: link.id, short: link.short, targetUrl: link.targetUrl, createdAt: link.createdAt },
      total: 0,
      first: link.createdAt,
      last: null,
      byDay: [],
      topReferrers: [],
      topCountries: [],
    };
  }

  // 2. Database analytics
  try {
    const link = await prisma.link.findUnique({
      where: { short },
      include: { clicks: true },
    });
    if (link) {
      const byDay = new Map<string, number>();
      for (const c of link.clicks) {
        const d = new Date(c.ts);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        byDay.set(key, (byDay.get(key) ?? 0) + 1);
      }

      const refCounts = new Map<string, number>();
      const countryCounts = new Map<string, number>();
      for (const c of link.clicks) {
        if (c.referrer) refCounts.set(c.referrer, (refCounts.get(c.referrer) ?? 0) + 1);
        if (c.country) countryCounts.set(c.country, (countryCounts.get(c.country) ?? 0) + 1);
      }

      const sort = (m: Map<string, number>) => Array.from(m.entries()).sort((a, b) => b[1] - a[1]);

      return {
        link: { id: link.id, short: link.short, targetUrl: link.targetUrl, createdAt: link.createdAt },
        total: link.clicks.length,
        first: link.createdAt,
        last: link.clicks.length ? link.clicks[link.clicks.length - 1].ts : null,
        byDay: Array.from(byDay.entries()).sort((a, b) => a[0].localeCompare(b[0])),
        topReferrers: sort(refCounts).slice(0, 10),
        topCountries: sort(countryCounts).slice(0, 10),
      };
    }
  } catch (e) {
    // Ignore and fallback to JSON store
  }

  // 3. Fallback to JSON database analytics
  return jsonGetAnalytics(short);
}

export async function recordClickAndRedirect(short: string, customSource?: string) {
  const h = await headers();

  let referrer = h.get("referer") ?? h.get("referrer") ?? undefined;
  if (customSource === "qr" || customSource === "QR") {
    referrer = "📱 QR Code Scan";
  } else if (!referrer) {
    referrer = "🔗 Direct Link Click";
  } else {
    try {
      referrer = new URL(referrer).hostname;
    } catch (_) {}
  }

  const country = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? undefined;
  const ua = h.get("user-agent") ?? "";
  const ipHeader = h.get("x-forwarded-for") ?? "";
  const ip = ipHeader.split(",")[0]?.trim() || "";

  const sha = (x?: string) =>
    x ? crypto.createHash("sha256").update(x).digest("base64url") : undefined;

  let targetUrl: string | null = null;

  // 1. Check if it is a legacy stateless compressed URL
  if (short.startsWith("_") || short.startsWith("h_")) {
    try {
      const prefix = short.startsWith("h_") ? "h_" : "_";
      const b64 = short.substring(prefix.length);
      const zlib = require("zlib");
      const buffer = Buffer.from(b64, "base64url");
      const decompressed = zlib.inflateRawSync(buffer).toString("utf8");
      targetUrl = (prefix === "h_" ? "http://" : "https://") + decompressed;
    } catch (err) {
      console.error("Failed to decompress stateless URL:", err);
    }
  }

  // 2. Database lookup
  if (!targetUrl) {
    try {
      const link = await prisma.link.findUnique({ where: { short } });
      if (link) {
        targetUrl = link.targetUrl;
        await prisma.click.create({
          data: {
            linkId: link.id,
            referrer,
            country,
            uaHash: sha(ua),
            ipHash: sha(ip),
          },
        });
      }
    } catch (e) {
      console.warn("Database click tracking failed, trying JSON fallback:", e);
    }
  }

  // 3. JSON Store lookup & click recording
  if (!targetUrl) {
    targetUrl = jsonRecordClick(short, {
      referrer,
      country,
      uaHash: sha(ua),
      ipHash: sha(ip),
    });
  }

  if (!targetUrl) notFound();
  redirect(targetUrl);
}

