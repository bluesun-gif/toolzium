const fs = require('fs');
const path = require('path');

const CATEGORIES_META = {
  ai: {
    title: "Free Online AI Tools & Content Generators | Toolzium",
    description: "Powerful suite of free online AI tools. Optimize prompts, generate YouTube scripts, find startup names, write social media bios, and explain code. No signup required.",
  },
  url: {
    title: "Free URL Tools — Shortener, QR Codes & UTM Builder | Toolzium",
    description: "Fast, free URL utilities. Shorten links with click analytics, generate customizable QR codes, build UTM tracking parameters, and extract thumbnails.",
  },
  text: {
    title: "Free Online Text Utilities — Case Converter, Base64 & Slugify | Toolzium",
    description: "Essential online text tools. Convert case formats, encode/decode Base64, clean whitespace, generate lorem ipsum, count words, and analyze text instantly.",
  },
  pdf: {
    title: "Free Online PDF Tools — Convert, Merge & Extract PDF | Toolzium",
    description: "Complete suite of free PDF tools. Convert PDF to images, merge PDF documents, extract text, and chat with documents with total privacy.",
  },
  image: {
    title: "Free Online Image Tools — Resize, Convert, Compress & Edit | Toolzium",
    description: "Fast and private online image utilities. Bulk resize images, compress PNG/JPEG/WebP, convert formats, extract color palettes, and create favicons.",
  },
  dev: {
    title: "Free Developer Tools — Formatters, Encoders & Regex Testers | Toolzium",
    description: "Essential developer utilities for coding and debugging. Format JSON, test regex expressions, encode data, generate hashes, and inspect network payloads.",
  },
  seo: {
    title: "Free Online SEO Tools — Meta Tag Generator & Schema Builder | Toolzium",
    description: "Boost search rankings with free SEO tools. Generate meta tags, build Open Graph previews, create JSON-LD schema markup, and generate robots.txt.",
  },
  calc: {
    title: "Free Online Calculators — Unit, Percentage, Tip & Math | Toolzium",
    description: "Instant online calculation utilities. Calculate tips, percentages, unit conversions, financial growth, and mathematical equations in seconds.",
  },
  time: {
    title: "Free Time & Date Tools — World Clock, Countdown & Timezone | Toolzium",
    description: "Precision time tools for global workflows. World clock, timezone converter, countdown timers, sleep cycle calculators, and date formatters.",
  },
  util: {
    title: "Free Online Utilities — Password Generators, Screen Recorder & Tools | Toolzium",
    description: "Versatile daily web utilities. Generate strong passwords, record your screen, analyze password entropy, make decisions, and monitor device metrics.",
  },
  office: {
    title: "Free Online Office & Productivity Tools | Toolzium",
    description: "Streamline daily business and office tasks with free online document, formatting, organization, and calculation utilities.",
  },
  travel: {
    title: "Free Travel Planning & Currency Tools — Visa, Budget & Flight | Toolzium",
    description: "Essential tools for travelers and digital nomads. Live currency comparison matrix, visa requirement checker, jet lag planner, baggage fees, and packing lists.",
  },
  finance: {
    title: "Free Personal Finance & Investment Calculators | Toolzium",
    description: "Take control of your money with free finance tools. Calculate compound interest, loan repayments, investment growth, and budget breakdowns.",
  },
  fun: {
    title: "Fun Online Tools & Games — Random Pickers & Decision Makers | Toolzium",
    description: "Entertaining web utilities, random name pickers, decision makers, coin flippers, and novelty tools for fun and games.",
  },
  network: {
    title: "Free Network & Security Tools — IP Lookup, DNS & SSL Checker | Toolzium",
    description: "Diagnose networks and verify website security. Look up IP geolocation, inspect DNS records, check SSL certificate validity, and analyze subnets.",
  },
  health: {
    title: "Free Health & Fitness Calculators — BMI, Calories & Sleep | Toolzium",
    description: "Track your wellness goals with science-backed health calculators. Calculate BMI, daily caloric needs, body fat percentage, and sleep cycles.",
  },
  productivity: {
    title: "Free Productivity & Organization Tools — Kanban & Planners | Toolzium",
    description: "Boost daily focus and task management. Kanban boards, Eisenhower priority matrices, Pomodoro focus timers, habit trackers, and journals.",
  },
  gaming: {
    title: "Free Gaming Tools & Name Generators | Toolzium",
    description: "Utilities for gamers, streamers, and gaming communities. Generate gamertags, team names, stream titles, and gaming calculations.",
  },
  social: {
    title: "Free Social Media Content & Engagement Tools | Toolzium",
    description: "Grow your social presence with AI content creators. Generate viral Twitter threads, YouTube scripts, Instagram hooks, TikTok engagement estimates, and hashtags.",
  },
};

const appToolsDir = path.join(__dirname, '..', 'app', 'tools');

let createdCount = 0;

for (const [slug, meta] of Object.entries(CATEGORIES_META)) {
  const catDir = path.join(appToolsDir, slug);
  if (!fs.existsSync(catDir)) {
    fs.mkdirSync(catDir, { recursive: true });
  }

  const pagePath = path.join(catDir, 'page.tsx');
  const pathUrl = `/tools/${slug}`;

  const pageContent = `import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildCategoryJsonLd } from "@/lib/seo";
import { CategoryHubClient } from "@/components/shared/category-hub-client";
import { ToolsData } from "@/data/tools";

const CATEGORY_ID = "${slug}";
const TITLE = "${meta.title}";
const DESCRIPTION = "${meta.description}";
const PATH = "${pathUrl}";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function CategoryPage() {
  const category = ToolsData.find((c) => c.url === PATH) || {
    title: "${slug.toUpperCase()}",
    url: PATH,
    items: [],
  };

  const tools = (category.items || []).filter((i) => i.url !== PATH);

  const relatedCategories = ToolsData.filter(
    (c) => c.url !== "/tools" && c.url !== PATH
  )
    .slice(0, 8)
    .map((c) => ({
      title: c.title,
      url: c.url,
      count: (c.items || []).length,
    }));

  const jsonLd = buildCategoryJsonLd({
    name: category.title,
    description: DESCRIPTION,
    path: PATH,
    tools: tools.map((t) => ({
      title: t.title,
      description: t.description,
      url: t.url,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CategoryHubClient
        title={category.title}
        description={DESCRIPTION}
        slug={CATEGORY_ID}
        tools={tools}
        relatedCategories={relatedCategories}
      />
    </>
  );
}
`;

  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log(`✅ Created: ${pagePath}`);
  createdCount++;
}

console.log(`\nSuccessfully created all ${createdCount} Category Hub pages!`);
