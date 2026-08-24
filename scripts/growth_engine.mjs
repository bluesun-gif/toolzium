import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// TOOLZIUM AUTONOMOUS GROWTH & LINK SPREADING ENGINE
// Generates directory submissions, forum outreach, and social syndication assets
// ─────────────────────────────────────────────────────────────────────────────

const DIRECTORIES = [
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/posts/new",
    nameField: "Toolzium — 559+ 100% Free AI & Web Utilities with No Signup",
    tagline: "Instant, privacy-friendly AI tools, converters & financial trackers",
    pricing: "100% Free (No Login / No Ads / Client-Side)",
    topics: ["Productivity", "Artificial Intelligence", "Developer Tools", "Web App"],
    description: "Toolzium is a modern suite of 559+ privacy-first web utilities powered by Next.js and Groq AI. From live precious metals tracking to sports physiology calorie engines and Groq-powered name generators, every tool runs instantly in your browser with zero signups."
  },
  {
    name: "Toolify.ai",
    url: "https://www.toolify.ai/submit",
    nameField: "Toolzium AI Suite",
    tagline: "Free Groq AI baby names, quote studio, and developer tools",
    category: "Productivity / AI Assistant",
    description: "Toolzium provides zero-latency AI-driven tools powered by Groq LLaMA models. Includes full-fidelity financial trackers, health calculators, onomastic name generators, and developer converters."
  },
  {
    name: "AlternativeTo",
    url: "https://alternativeto.net/software/new/",
    nameField: "Toolzium",
    replaces: "Omni Calculator, SmallSEOTools, 10015.io, TinyWow",
    license: "Free Web App",
    description: "A fast, privacy-focused open alternative to ad-bloated online utility sites. Offers 559+ calculators, AI writers, design generators, and text tools."
  },
  {
    name: "SaaSHub",
    url: "https://www.saashub.com/submit",
    nameField: "Toolzium",
    tagline: "The modern all-in-one free web utility and AI engine",
    category: "Online Tools & Utilities"
  },
  {
    name: "Futurepedia",
    url: "https://www.futurepedia.io/submit-tool",
    nameField: "Toolzium Groq AI Studio",
    tagline: "Instant AI baby naming, quote generation, and text tools",
    category: "Generative AI"
  }
];

const COMMUNITY_TARGETS = [
  {
    tool: "Gold Price Tracker",
    url: "https://toolzium.com/tools/finance/gold-price-tracker",
    subreddits: ["r/Gold", "r/Silverbugs", "r/PersonalFinance", "r/IndiaInvestments"],
    sampleHook: "Live spot bullion price and scrap gold melt calculator with 24k/22k/18k/14k conversions",
    draftReply: `If you want to check live spot gold prices across 24K, 22K jewelry, and 18K scrap without annoying popups, I use Toolzium's live tracker: https://toolzium.com/tools/finance/gold-price-tracker — it updates in real time against COMEX/LBMA feeds and has a custom weight calculator for grams, tolas, ounces, and sovereigns.`
  },
  {
    tool: "Indoor Cycling & Spin Calorie Calculator",
    url: "https://toolzium.com/tools/health/indoor-cycling-calorie",
    subreddits: ["r/spinning", "r/PelotonCycle", "r/bicycling", "r/fitness"],
    sampleHook: "Exact stationary cycling calorie burn, mechanical watts, and fat oxidation calculator",
    draftReply: `For calculating stationary spin bike energy expenditure based on actual flywheel resistance and cadence (RPM), check this out: https://toolzium.com/tools/health/indoor-cycling-calorie — it uses clinical MET values and estimates mechanical watts (W) plus lipid fat grams burned.`
  },
  {
    tool: "Universal Baby & Character Name Studio",
    url: "https://toolzium.com/tools/fun/name-generator",
    subreddits: ["r/namenerds", "r/writing", "r/BabyBumps", "r/Parenting"],
    sampleHook: "100% Groq AI real-time baby and character name studio with zero repeats",
    draftReply: `If you're looking for baby or character names with authentic cultural origins, meanings, and pronunciations (without seeing the same 10 hardcoded names repeat), this tool synthesizes fresh names on the fly with Groq AI: https://toolzium.com/tools/fun/name-generator — you can filter by Arabic/Islamic, Celtic, Norse, Sanskrit, and themes like Royalty or Wisdom.`
  },
  {
    tool: "Color Harmony Studio",
    url: "https://toolzium.com/tools/css/color-harmony",
    subreddits: ["r/webdev", "r/UI_Design", "r/Frontend", "r/design"],
    sampleHook: "Interactive OKLCH and HSL color harmony palette generator with WCAG contrast checker",
    draftReply: `For generating color harmonies (triadic, complementary, analogous) with instant WCAG accessibility contrast scoring, this free tool is super fast and clean: https://toolzium.com/tools/css/color-harmony — exports to CSS, Tailwind, and JSON.`
  },
  {
    tool: "Number Base Converter",
    url: "https://toolzium.com/tools/math/base-converter",
    subreddits: ["r/learnprogramming", "r/compsci", "r/embedded"],
    sampleHook: "Binary, Octal, Decimal, Hex, and Custom Base (2-36) converter with IEEE 754 float breakdown",
    draftReply: `For converting between Binary, Decimal, Hex, and arbitrary bases (Base-2 through Base-36) with full step-by-step division tables and IEEE 754 float binary inspection: https://toolzium.com/tools/math/base-converter`
  }
];

function generateGrowthAssets() {
  console.log("==================================================");
  console.log("🚀 TOOLZIUM AUTONOMOUS GROWTH & LINK SPREADING KIT");
  console.log("==================================================");

  const outputDir = path.resolve("public/growth");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // 1. Write Directory Submission Guide
  let dirMarkdown = "# 📦 Toolzium Directory Submission Package\n\n";
  dirMarkdown += "Submit Toolzium to these high-traffic directories for instant referral traffic spikes:\n\n";

  DIRECTORIES.forEach((d) => {
    dirMarkdown += `## 🌐 [${d.name}](${d.url})\n`;
    dirMarkdown += `- **Name**: \`${d.nameField}\`\n`;
    if (d.tagline) dirMarkdown += `- **Tagline**: ${d.tagline}\n`;
    if (d.pricing) dirMarkdown += `- **Pricing**: ${d.pricing}\n`;
    if (d.category) dirMarkdown += `- **Category**: ${d.category}\n`;
    if (d.replaces) dirMarkdown += `- **Replaces / Alternatives**: ${d.replaces}\n`;
    if (d.description) dirMarkdown += `- **Description**:\n> ${d.description}\n`;
    dirMarkdown += "\n---\n\n";
  });

  fs.writeFileSync(path.join(outputDir, "directory_submissions.md"), dirMarkdown, "utf8");

  // 2. Write Community Value-First Outreach Drafts
  let commMarkdown = "# 💬 Toolzium Community Link-Spreading Drafts\n\n";
  commMarkdown += "Use these value-first comments when answering relevant community questions on Reddit, Quora, and forums:\n\n";

  COMMUNITY_TARGETS.forEach((c) => {
    commMarkdown += `## 🎯 ${c.tool}\n`;
    commMarkdown += `- **URL**: ${c.url}\n`;
    commMarkdown += `- **Target Subreddits**: ${c.subreddits.join(", ")}\n`;
    commMarkdown += `- **Hook**: *${c.sampleHook}*\n`;
    commMarkdown += `\n**Ready-to-Post Reply**:\n\`\`\`text\n${c.draftReply}\n\`\`\`\n\n---\n\n`;
  });

  fs.writeFileSync(path.join(outputDir, "community_outreach.md"), commMarkdown, "utf8");

  console.log("✅ Created public/growth/directory_submissions.md");
  console.log("✅ Created public/growth/community_outreach.md");
  console.log("\n📊 Summary:");
  console.log(`- ${DIRECTORIES.length} Directory Submission Packs Ready`);
  console.log(`- ${COMMUNITY_TARGETS.length} Value-First Community Outreach Kits Ready`);
}

generateGrowthAssets();
