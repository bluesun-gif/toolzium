import fs from "fs";
import path from "path";

const OUTREACH_CAMPAIGNS = [
  {
    targetNiche: "Personal Finance & Bullion Investment Blogs",
    targetExamples: ["Investopedia contributors", "Gold & Silver dealer blogs", "Jewelry pricing blogs"],
    toolName: "Live Spot Gold & Scrap Melt Calculator",
    toolUrl: "https://toolzium.com/tools/finance/gold-price-tracker",
    subject: "Free Interactive Gold & Bullion Price Widget for your readers",
    emailBody: `Hi [Name / Editor],

I was reading your comprehensive guide on precious metals investment and noticed how valuable real-time pricing data is for your audience.

We built a 100% free, zero-ad interactive Live Gold & Scrap Melt Calculator that displays live spot prices for 24K pure gold, 22K jewelry, and 18K scrap across 160+ fiat currencies with an instant gram/tola/oz weight converter.

If you'd like to provide your readers with an interactive calculator directly inside your articles, you're welcome to embed our responsive widget for free:

<iframe src="https://toolzium.com/embed/tools/finance/gold-price-tracker" width="100%" height="650" frameborder="0" style="border-radius: 20px; border: 1px solid rgba(0,0,0,0.12); box-shadow: 0 10px 30px rgba(0,0,0,0.06);"></iframe>
<div style="text-align: right; font-size: 12px;"><a href="https://toolzium.com/tools/finance/gold-price-tracker" target="_blank">Free Gold Tracker by Toolzium</a></div>

It is lightweight, mobile-responsive, and requires no registration or maintenance.

Best regards,
The Toolzium Team
https://toolzium.com`
  },
  {
    targetNiche: "Fitness, Cycling & Spin Workout Blogs",
    targetExamples: ["Spin class instructor blogs", "Peloton fan blogs", "Indoor cycling review sites"],
    toolName: "Indoor Cycling & Spin Bike Calorie Calculator",
    toolUrl: "https://toolzium.com/tools/health/indoor-cycling-calorie",
    subject: "Interactive Spin Calorie & Watts Calculator for your workout guides",
    emailBody: `Hi [Name / Editor],

I love your indoor cycling workout guides and spin class training tips!

We developed an interactive Indoor Cycling Calorie & Mechanical Watts Calculator that computes exact calorie burn, mechanical watts (W/kg), and intramuscular fat oxidation based on cadence (RPM) and flywheel resistance.

You are welcome to embed this tool directly onto your workout and review pages for your community:

<iframe src="https://toolzium.com/embed/tools/health/indoor-cycling-calorie" width="100%" height="650" frameborder="0" style="border-radius: 20px; border: 1px solid rgba(0,0,0,0.12); box-shadow: 0 10px 30px rgba(0,0,0,0.06);"></iframe>
<div style="text-align: right; font-size: 12px;"><a href="https://toolzium.com/tools/health/indoor-cycling-calorie" target="_blank">Free Cycling Calorie Calculator by Toolzium</a></div>

No API keys or maintenance required — it automatically adjusts to mobile and desktop screens.

Best regards,
The Toolzium Team
https://toolzium.com`
  }
];

function generateOutreachFiles() {
  const outputDir = path.resolve("public/marketing/outreach");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let fullDoc = "# ✉️ Webmaster Embed & High-DA Backlink Outreach Campaign\n\n";
  fullDoc += "High-converting email copy to send to bloggers, editors, and webmasters offering our free embed widgets:\n\n";

  OUTREACH_CAMPAIGNS.forEach((c, idx) => {
    fullDoc += `## Campaign ${idx + 1}: ${c.targetNiche}\n`;
    fullDoc += `- **Target Examples**: ${c.targetExamples.join(", ")}\n`;
    fullDoc += `- **Tool**: [${c.toolName}](${c.toolUrl})\n`;
    fullDoc += `- **Subject Line**: \`${c.subject}\`\n\n`;
    fullDoc += `### Email Template:\n\`\`\`text\n${c.emailBody}\n\`\`\`\n\n---\n\n`;
  });

  const dest = path.join(outputDir, "webmaster_outreach_templates.md");
  fs.writeFileSync(dest, fullDoc, "utf8");
  console.log(`✅ Created Webmaster Outreach Kit: ${dest}`);
}

generateOutreachFiles();
