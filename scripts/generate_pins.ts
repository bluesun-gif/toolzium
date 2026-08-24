import { chromium } from "playwright";
import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// TOOLZIUM AUTOMATED SOCIAL & PINTEREST INFOGRAPHIC PIN GENERATOR
// Renders pixel-perfect 1000x1500px Pinterest Pins & Social Cards with Tool Links
// ─────────────────────────────────────────────────────────────────────────────

const ASSETS_TO_GENERATE = [
  {
    slug: "gold-price-infographic",
    title: "LIVE GOLD & BULLION PRICE GUIDE",
    subtitle: "24K Pure · 22K Jewelry · 18K Scrap Melt Values",
    metrics: [
      { label: "24K PURE GOLD (GRAM)", val: "$88.42" },
      { label: "22K JEWELRY (GRAM)", val: "$81.05" },
      { label: "18K LUXURY (GRAM)", val: "$66.31" },
      { label: "GOLD / SILVER RATIO", val: "85.9 : 1" }
    ],
    features: [
      "🔴 Real-Time Spot Feed Updated Live",
      "⚖️ Weight Converter: Grams, Tolas, Ounces, Sovereigns",
      "🤖 Groq AI Bullion Analyst & Sentiment Coach",
      "🔒 100% Free · No Signup Required"
    ],
    cta: "Calculate Free at Toolzium.com/tools/finance/gold-price-tracker",
    accentGradient: "linear-gradient(135deg, #f59e0b, #d97706, #78350f)"
  },
  {
    slug: "cycling-calorie-infographic",
    title: "STATIONARY CYCLING CALORIE GUIDE",
    subtitle: "Accurate Calorie Burn, Watts & Fat Oxidation",
    metrics: [
      { label: "15-MIN QUICK HIIT", val: "140–180 kcal" },
      { label: "30-MIN POWER SPIN", val: "280–360 kcal" },
      { label: "45-MIN SPIN CLASS", val: "420–540 kcal" },
      { label: "60-MIN ENDURANCE", val: "550–720 kcal" }
    ],
    features: [
      "⚡ Accurate Mechanical Watts (W) & W/kg Formula",
      "🔥 Intramuscular Fat Oxidation (Grams)",
      "🥤 Post-Ride Protein/Carb & Rehydration Fuel",
      "🚴 Supports Peloton, Flywheel, Keiser & Turbo Trainers"
    ],
    cta: "Calculate Free at Toolzium.com/tools/health/indoor-cycling-calorie",
    accentGradient: "linear-gradient(135deg, #10b981, #059669, #064e3b)"
  },
  {
    slug: "baby-names-infographic",
    title: "TOP ROYAL & TIMELESS BABY NAMES",
    subtitle: "Authentic Cultural Meanings & Pronunciations",
    metrics: [
      { label: "ROYAL BOY NAMES", val: "Alaric, Leopold, Arthur" },
      { label: "ROYAL GIRL NAMES", val: "Isabella, Eleanor, Genevieve" },
      { label: "CULTURES SUPPORTED", val: "Arabic, Celtic, Norse, Sanskrit" },
      { label: "GENERATION ENGINE", val: "100% Groq AI Fresh" }
    ],
    features: [
      "👑 Filter by Royalty, Wisdom, Nature & Celestial",
      "🔊 Phonetic Audio Syllables & Pronunciation Guide",
      "♾️ Infinite Non-Repeating AI Naming Studio",
      "⭐ Save & Shortlist Favorites Instantly"
    ],
    cta: "Explore Names at Toolzium.com/tools/fun/name-generator",
    accentGradient: "linear-gradient(135deg, #6366f1, #4f46e5, #312e81)"
  }
];

async function generatePins() {
  console.log("🎨 Launching Playwright to generate viral Pinterest & Social Infographics...");
  const outputDir = path.resolve("public/marketing/pins");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });

  for (const asset of ASSETS_TO_GENERATE) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          background: #09090b;
          color: #f8fafc;
          width: 1000px;
          height: 1500px;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .glow-bg {
          position: absolute;
          top: -200px;
          right: -200px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: ${asset.accentGradient};
          filter: blur(160px);
          opacity: 0.35;
          z-index: 0;
        }
        .glow-bottom {
          position: absolute;
          bottom: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: ${asset.accentGradient};
          filter: blur(160px);
          opacity: 0.25;
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }
        .brand-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-box {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .logo-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: ${asset.accentGradient};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 26px;
          color: #fff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .brand-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .badge {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .hero {
          margin: 40px 0 30px;
        }
        .hero h1 {
          font-size: 54px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 16px;
          background: linear-gradient(180deg, #ffffff 40%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero p {
          font-size: 22px;
          font-weight: 600;
          color: #a1a1aa;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .metric-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .metric-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #71717a;
          margin-bottom: 8px;
        }
        .metric-val {
          font-size: 32px;
          font-weight: 900;
          color: #fff;
        }
        .features-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 32px;
          padding: 36px;
          margin-bottom: 30px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 20px;
          font-weight: 700;
          color: #e4e4e7;
          margin-bottom: 18px;
        }
        .feature-item:last-child { margin-bottom: 0; }
        .footer-cta {
          background: ${asset.accentGradient};
          border-radius: 26px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .cta-text {
          font-size: 19px;
          font-weight: 800;
          color: #fff;
        }
        .cta-pill {
          background: #fff;
          color: #000;
          font-weight: 800;
          font-size: 15px;
          padding: 10px 22px;
          border-radius: 9999px;
        }
      </style>
    </head>
    <body>
      <div class="glow-bg"></div>
      <div class="glow-bottom"></div>
      <div class="content">
        <div class="brand-header">
          <div class="logo-box">
            <div class="logo-icon">T</div>
            <div class="brand-title">Toolzium</div>
          </div>
          <div class="badge">100% Free Web Utility</div>
        </div>

        <div class="hero">
          <h1>${asset.title}</h1>
          <p>${asset.subtitle}</p>
        </div>

        <div class="grid-2">
          ${asset.metrics.map(m => `
            <div class="metric-card">
              <div class="metric-label">${m.label}</div>
              <div class="metric-val">${m.val}</div>
            </div>
          `).join('')}
        </div>

        <div class="features-card">
          ${asset.features.map(f => `
            <div class="feature-item">
              <span>${f}</span>
            </div>
          `).join('')}
        </div>

        <div class="footer-cta">
          <div class="cta-text">${asset.cta}</div>
          <div class="cta-pill">Open Free ➔</div>
        </div>
      </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);
    const destPath = path.join(outputDir, `${asset.slug}.png`);
    await page.screenshot({ path: destPath });
    console.log(`✅ Rendered Pin: ${destPath}`);
  }

  await browser.close();
  console.log("🎉 All Pinterest & Social Infographic Pins rendered successfully!");
}

generatePins().catch(console.error);
