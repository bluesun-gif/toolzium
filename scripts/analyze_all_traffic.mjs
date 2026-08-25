import fs from "fs";
import crypto from "crypto";

const KEY_PATH = "C:\\Users\\LOQ\\Downloads\\dg-proposal-repo-99247d4f07d5.json";
const SITE_URL = "https://toolzium.com/";

async function getAccessToken(keyPath, scopes) {
  const key = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
  const now = Math.floor(Date.now() / 1000);
  
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: key.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };
  
  const base64UrlEncode = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
      
  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(claimSet)}`;
  
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  const signature = signer.sign(key.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
    
  const jwt = `${unsignedToken}.${signature}`;
  
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(`Auth Error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function runFullAnalysis() {
  const token = await getAccessToken(KEY_PATH, [
    "https://www.googleapis.com/auth/webmasters.readonly"
  ]);

  // Query 1: Aggregated by Page
  const resPages = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-07-01",
      endDate: "2026-08-25",
      dimensions: ["page"],
      rowLimit: 100
    })
  });
  const pagesData = await resPages.json();

  // Query 2: Aggregated by Query & Page (top 250)
  const resQueries = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-07-01",
      endDate: "2026-08-25",
      dimensions: ["query", "page"],
      rowLimit: 250
    })
  });
  const queriesData = await resQueries.json();

  console.log("\n=================== TOP 25 PERFORMING TOOLS (BY SEARCH IMPRESSIONS) ===================");
  if (pagesData.rows && pagesData.rows.length > 0) {
    const sortedPages = pagesData.rows.sort((a, b) => b.impressions - a.impressions);
    sortedPages.slice(0, 25).forEach((r, idx) => {
      const slug = r.keys[0].replace("https://toolzium.com", "");
      console.log(`${(idx + 1).toString().padStart(2, " ")}. ${slug.padEnd(45, " ")} | Impr: ${r.impressions.toString().padStart(4, " ")} | Clicks: ${r.clicks} | Pos: #${r.position.toFixed(1)}`);
    });
  } else {
    console.log("No page data rows returned.");
  }

  console.log("\n=================== TOP SEARCH QUERIES (BY RANK & IMPRESSIONS) ===================");
  if (queriesData.rows && queriesData.rows.length > 0) {
    // Sort by position ascending (closest to #1 rank)
    const sortedQueries = queriesData.rows.sort((a, b) => a.position - b.position);
    console.log("\n🔥 Highest Ranking Keywords (Best Opportunities to reach Page 1):");
    sortedQueries.slice(0, 20).forEach((r, idx) => {
      const page = r.keys[1].replace("https://toolzium.com", "");
      console.log(`${idx + 1}. "${r.keys[0]}" -> Pos: #${r.position.toFixed(1)} | Impr: ${r.impressions} | Page: ${page}`);
    });
  }

  // Summary stats
  const totalImpr = (pagesData.rows || []).reduce((sum, r) => sum + r.impressions, 0);
  const totalClicks = (pagesData.rows || []).reduce((sum, r) => sum + r.clicks, 0);
  console.log(`\n=================== TOTAL PORTFOLIO STATS ===================`);
  console.log(`Total Impressions: ${totalImpr}`);
  console.log(`Total Clicks: ${totalClicks}`);
  console.log(`Total Ranked Pages: ${(pagesData.rows || []).length}`);
  console.log(`Total Active Keywords: ${(queriesData.rows || []).length}`);
}

runFullAnalysis().catch(console.error);
