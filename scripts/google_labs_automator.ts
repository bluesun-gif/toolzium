import { chromium, BrowserContext, Page } from "playwright";
import * as fs from "fs";
import * as path from "path";

/**
 * Google Labs / Veo / ImageFX Autonomous Browser Automator
 * 
 * Uses your authenticated local Google Chrome session so you don't need
 * expensive API tokens. Injects high-converting prompts, attaches context assets,
 * captures generated images, and saves them ready for social syndication.
 */

const USER_DATA_DIR = path.join(
  process.env.LOCALAPPDATA || "C:\\Users\\LOQ\\AppData\\Local",
  "Google\\Chrome\\User Data"
);

const OUTPUT_DIR = path.join(process.cwd(), "public", "marketing", "generated");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export interface GenerationRequest {
  prompt: string;
  referenceImagePath?: string;
  outputFilename: string;
  targetToolUrl?: string;
}

export async function launchGoogleLabsAutomator(req: GenerationRequest) {
  console.log("🚀 Starting Google Labs Autonomous Browser Controller...");
  console.log(`📂 Using Chrome Profile at: ${USER_DATA_DIR}`);
  console.log(`🎨 Prompt: "${req.prompt}"`);

  let context: BrowserContext | null = null;

  try {
    // Launch Chrome using your real local profile
    context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false, // Runs visually so you can observe the AI creating
      channel: "chrome",
      viewport: { width: 1440, height: 900 },
      args: [
        "--disable-blink-features=AutomationControlled",
        "--start-maximized"
      ]
    });

    const page: Page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    console.log("🌐 Navigating to Google Labs ImageFX...");
    await page.goto("https://labs.google/fx/tools/image-fx", {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    // Wait for the prompt box
    console.log("⏳ Waiting for ImageFX interface to load...");
    await page.waitForTimeout(5000);

    // Look for textarea / prompt input
    const promptInput = await page.$("textarea, input[type='text'], div[contenteditable='true']");
    if (promptInput) {
      console.log("✍️ Typing image prompt...");
      await promptInput.click();
      await promptInput.fill(req.prompt);
      await page.waitForTimeout(1000);

      // If reference image provided, look for file upload
      if (req.referenceImagePath && fs.existsSync(req.referenceImagePath)) {
        console.log(`📎 Attaching context image: ${req.referenceImagePath}`);
        const fileInput = await page.$("input[type='file']");
        if (fileInput) {
          await fileInput.setInputFiles(req.referenceImagePath);
          await page.waitForTimeout(2000);
        }
      }

      // Hit Generate / Enter
      console.log("⚡ Triggering generation...");
      await page.keyboard.press("Enter");

      // Wait for output image to appear
      console.log("⏳ Waiting for Google AI generation to complete (20-40s)...");
      await page.waitForTimeout(25000);

      // Screenshot the rendered result or download image
      const finalImagePath = path.join(OUTPUT_DIR, `${req.outputFilename}.png`);
      await page.screenshot({ path: finalImagePath, fullPage: false });
      console.log(`✅ Asset successfully saved: ${finalImagePath}`);

      // Save social metadata alongside the generated image
      const metadata = {
        title: req.prompt.slice(0, 70),
        generatedAt: new Date().toISOString(),
        localImagePath: finalImagePath,
        targetUrl: req.targetToolUrl || "https://toolzium.com",
        syndicationStatus: "ready_to_post"
      };

      const metaPath = path.join(OUTPUT_DIR, `${req.outputFilename}.json`);
      fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), "utf8");
      console.log(`📄 Social metadata saved to: ${metaPath}`);
    } else {
      console.log("ℹ️ Please log into Google Labs in the opened browser window.");
    }
  } catch (err: any) {
    console.error("❌ Browser Automator Error:", err.message);
  } finally {
    if (context) {
      console.log("🔒 Browser session ready.");
    }
  }
}

// Quick CLI execution support
if (process.argv[1]?.includes("google_labs_automator")) {
  const samplePrompt = process.argv[2] || "Photorealistic 8k golden bullion bars on a modern dark glass dashboard with financial analytics, cinematic lighting, ultra detailed";
  const filename = process.argv[3] || "gold-price-tracker-hero";

  launchGoogleLabsAutomator({
    prompt: samplePrompt,
    outputFilename: filename,
    targetToolUrl: "https://toolzium.com/tools/finance/gold-price-tracker"
  });
}
