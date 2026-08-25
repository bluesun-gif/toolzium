import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const SCREENSHOT_DIR = path.join(
  "C:\\Users\\LOQ\\.gemini\\antigravity\\brain\\397966db-1b49-47f0-aa9e-4416e24823ff",
  "screenshots"
);

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 }
];

const TARGET_TOOLS = [
  { slug: "audio-cutter", path: "/tools/audio/cutter" },
  { slug: "citation-generator", path: "/tools/academic/citation-generator" },
  { slug: "ai-meta-generator", path: "/tools/seo/ai-meta-generator" },
  { slug: "youtube-script-generator", path: "/tools/social/youtube-script-generator" },
  { slug: "indoor-cycling-calorie", path: "/tools/health/indoor-cycling-calorie" },
  { slug: "gold-price-tracker", path: "/tools/finance/gold-price-tracker" },
  { slug: "currency-matrix", path: "/tools/travel/currency-matrix" },
  { slug: "name-generator", path: "/tools/ai/name-generator" },
  { slug: "quote-generator", path: "/tools/fun/quote-generator" }
];

async function runVisualAudit() {
  console.log("🚀 Starting Playwright Visual Multi-Device Audit...");

  const browser = await chromium.launch({ headless: true });

  const auditReport: Array<{
    tool: string;
    device: string;
    screenshot: string;
    overflowIssues: string[];
    buttonCutoffs: string[];
  }> = [];

  for (const tool of TARGET_TOOLS) {
    console.log(`\n🔍 Auditing Tool: ${tool.slug} (${tool.path})`);

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height }
      });

      const targetUrl = `https://toolzium.com${tool.path}`;
      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(1500); // Allow animations & layout to settle

        // Check for text cutoffs on all buttons
        const buttonCutoffs = await page.evaluate(() => {
          const cutoffs: string[] = [];
          const buttons = document.querySelectorAll("button, select, [role='button']");
          buttons.forEach((b) => {
            const rect = b.getBoundingClientRect();
            const text = (b.textContent || "").trim().slice(0, 30);
            if (rect.width < 50 && text.length > 10) {
              cutoffs.push(`Button "${text}..." squeezed to ${Math.round(rect.width)}px width`);
            }
          });
          return cutoffs;
        });

        // Check for horizontal document overflow
        const overflowIssues = await page.evaluate(() => {
          const docWidth = document.documentElement.offsetWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          const issues: string[] = [];
          if (scrollWidth > docWidth + 5) {
            issues.push(`Page horizontal scroll detected: scrollWidth (${scrollWidth}px) > docWidth (${docWidth}px)`);
          }
          return issues;
        });

        // Take high-resolution screenshot
        const screenshotFileName = `${tool.slug}_${vp.name}.png`;
        const screenshotPath = path.join(SCREENSHOT_DIR, screenshotFileName);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        console.log(`  📸 [${vp.name.toUpperCase()} ${vp.width}x${vp.height}] Screenshot saved: ${screenshotFileName}`);
        if (buttonCutoffs.length > 0) {
          console.warn(`    ⚠️ Button Cutoff Warning:`, buttonCutoffs);
        }
        if (overflowIssues.length > 0) {
          console.warn(`    ⚠️ Overflow Warning:`, overflowIssues);
        }

        auditReport.push({
          tool: tool.slug,
          device: vp.name,
          screenshot: screenshotPath,
          overflowIssues,
          buttonCutoffs
        });
      } catch (err: any) {
        console.error(`  ❌ Error visiting ${targetUrl} on ${vp.name}:`, err.message);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  const reportPath = path.join(SCREENSHOT_DIR, "visual_audit_report.json");
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2), "utf8");
  console.log(`\n✅ Visual multi-device audit completed! Report saved to: ${reportPath}`);
}

runVisualAudit().catch(console.error);
