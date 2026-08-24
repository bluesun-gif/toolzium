import fs from "fs";
import crypto from "crypto";
import path from "path";

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

export async function fetchSearchConsoleReport() {
  const token = await getAccessToken(KEY_PATH, [
    "https://www.googleapis.com/auth/webmasters.readonly"
  ]);
  
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: "2026-08-01",
      endDate: "2026-08-24",
      dimensions: ["query", "page"],
      rowLimit: 50
    })
  });
  
  return await res.json();
}

export async function submitUrlsToGoogle(urls) {
  const token = await getAccessToken(KEY_PATH, [
    "https://www.googleapis.com/auth/indexing"
  ]);
  
  const results = [];
  for (const url of urls) {
    try {
      const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url,
          type: "URL_UPDATED"
        })
      });
      const data = await res.json();
      results.push({ url, status: res.status, data });
    } catch (err) {
      results.push({ url, status: "error", error: err.message });
    }
  }
  return results;
}

async function main() {
  console.log("==========================================");
  console.log("🚀 TOOLZIUM GOOGLE SEARCH & INDEXING HUB");
  console.log("==========================================");
  
  // 1. Fetch Performance
  console.log("\n1. Pulling Top Performing Queries & Pages from Google Search Console...");
  const report = await fetchSearchConsoleReport();
  if (report.rows && report.rows.length > 0) {
    console.log(`Found ${report.rows.length} active queries!`);
    console.table(report.rows.slice(0, 15).map(r => ({
      Query: r.keys[0],
      Page: r.keys[1].replace("https://toolzium.com", ""),
      Impressions: r.impressions,
      Clicks: r.clicks,
      Position: r.position.toFixed(1)
    })));
  } else {
    console.log("No query rows returned yet.");
  }
}

main().catch(console.error);
