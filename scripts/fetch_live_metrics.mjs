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

async function fetchAllLiveStats() {
  console.log("🔍 Authenticating with Google APIs...");
  const token = await getAccessToken(KEY_PATH, [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly"
  ]);

  console.log("✅ Authenticated successfully.\n");

  // 1. Google Search Console - Daily Date Breakdown
  console.log("📊 1. GSC Daily Trend Breakdown (Recent 30 Days):");
  const resDaily = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: "2026-07-25",
      endDate: "2026-08-25",
      dimensions: ["date"],
      rowLimit: 40
    })
  });
  const dailyData = await resDaily.json();
  if (dailyData.rows) {
    dailyData.rows.forEach(r => {
      console.log(`  Date: ${r.keys[0]} | Impressions: ${r.impressions.toString().padStart(4, ' ')} | Clicks: ${r.clicks} | Pos: #${r.position.toFixed(1)} | CTR: ${(r.ctr*100).toFixed(2)}%`);
    });
  } else {
    console.log("  No daily rows available.");
  }

  // 2. Google Search Console - Top Pages
  console.log("\n📈 2. GSC Top 15 Pages by Organic Impressions:");
  const resPages = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: "2026-07-25",
      endDate: "2026-08-25",
      dimensions: ["page"],
      rowLimit: 15
    })
  });
  const pagesData = await resPages.json();
  if (pagesData.rows) {
    pagesData.rows.sort((a, b) => b.impressions - a.impressions).forEach((r, idx) => {
      const slug = r.keys[0].replace("https://toolzium.com", "");
      console.log(`  ${(idx+1).toString().padStart(2, ' ')}. ${slug.padEnd(45, ' ')} | Impr: ${r.impressions.toString().padStart(4, ' ')} | Clicks: ${r.clicks} | Pos: #${r.position.toFixed(1)}`);
    });
  }

  // 3. Google Search Console - Top Countries & Devices
  console.log("\n🌍 3. GSC Top Geographic Countries:");
  const resCountry = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: "2026-07-25",
      endDate: "2026-08-25",
      dimensions: ["country"],
      rowLimit: 10
    })
  });
  const countryData = await resCountry.json();
  if (countryData.rows) {
    countryData.rows.sort((a, b) => b.impressions - a.impressions).forEach(r => {
      console.log(`  Country: ${r.keys[0].toUpperCase()} | Impressions: ${r.impressions.toString().padStart(4, ' ')} | Clicks: ${r.clicks} | Pos: #${r.position.toFixed(1)}`);
    });
  }

  console.log("\n📱 4. GSC Device Breakdown:");
  const resDevice = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: "2026-07-25",
      endDate: "2026-08-25",
      dimensions: ["device"],
      rowLimit: 10
    })
  });
  const deviceData = await resDevice.json();
  if (deviceData.rows) {
    deviceData.rows.forEach(r => {
      console.log(`  Device: ${r.keys[0].padEnd(10, ' ')} | Impressions: ${r.impressions.toString().padStart(4, ' ')} | Clicks: ${r.clicks} | Pos: #${r.position.toFixed(1)}`);
    });
  }

  // 4. Try Google Analytics Admin / Properties API
  console.log("\n📊 5. Checking GA4 Properties for G-1R1QGX9XS1...");
  try {
    const gaRes = await fetch("https://analyticsadmin.googleapis.com/v1beta/accountSummaries", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const gaData = await gaRes.json();
    console.log("  GA4 Account Summaries:", JSON.stringify(gaData, null, 2));
  } catch (e) {
    console.log("  GA4 Admin query notice:", e.message);
  }
}

fetchAllLiveStats().catch(console.error);
