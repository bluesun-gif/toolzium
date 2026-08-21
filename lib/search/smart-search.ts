import { ToolsData } from "@/data/tools";
import type { LucideIcon } from "lucide-react";
import { Link2 } from "lucide-react";

export type SearchableTool = {
  title: string;
  url: string;
  description?: string;
  popular?: boolean;
  category: string;
  categoryUrl: string;
  icon?: unknown;
};

// Aliases and synonyms mapping to capture search intent
const SYNONYMS: Record<string, string[]> = {
  url: ["link", "shortener", "shorten", "tinyurl", "bitly", "qr", "utm", "redirect", "slug", "web", "website", "domain"],
  link: ["url", "shortener", "qr", "utm", "link shortener"],
  qr: ["qrcode", "barcode", "scan", "scanner", "qr generator", "matrix"],
  pdf: ["document", "merge", "split", "compress", "pdf to image", "pdf reader", "convert pdf"],
  calc: ["calculator", "calculate", "math", "percentage", "percent", "discount", "bmi", "interest", "salary", "loan", "gpa"],
  math: ["calc", "calculator", "percentage", "algebra", "fractions", "division", "formula"],
  percent: ["percentage", "discount", "margin", "markup", "ratio", "change", "calc"],
  img: ["image", "photo", "picture", "compress", "converter", "png", "jpg", "jpeg", "webp", "svg", "crop", "resize"],
  image: ["img", "photo", "picture", "compress", "png", "jpg", "webp", "resize", "crop", "svg"],
  json: ["formatter", "beautifier", "parser", "validator", "minify", "schema", "diff"],
  regex: ["regexp", "pattern", "regular expression", "tester", "match", "builder"],
  base64: ["b64", "decode", "encode", "binary", "ascii", "string"],
  pass: ["password", "pwd", "passcode", "generator", "entropy", "secure", "hash"],
  password: ["pass", "pwd", "passcode", "generator", "entropy", "diceware"],
  color: ["hex", "rgb", "hsl", "palette", "picker", "contrast", "cmyk", "gradient"],
  hash: ["sha256", "md5", "sha1", "crypto", "encryption", "checksum", "digest"],
  text: ["word count", "character count", "case", "diff", "lorem", "markdown", "morse", "cleaner", "repeater"],
  case: ["uppercase", "lowercase", "camelcase", "snakecase", "kebabcase", "titlecase", "converter"],
  ai: ["prompt", "chat", "gpt", "summarizer", "generator", "writer", "detector", "humanizer", "ats", "resume"],
  time: ["clock", "timezone", "timer", "stopwatch", "countdown", "alarm", "age", "birthday", "sleep", "rem"],
  travel: ["currency", "exchange", "money", "flight", "packing", "visa", "budget", "distance"],
  social: ["youtube", "instagram", "tiktok", "twitter", "reel", "caption", "bio", "script"],
  dev: ["developer", "code", "jwt", "uuid", "guid", "html", "css", "sql", "minifier", "formatter"],
};

// Flatten all tools into a fast lookup array
export function getAllSearchableTools(): SearchableTool[] {
  const list: SearchableTool[] = [];
  for (const group of ToolsData) {
    if (!group?.isActive) continue;
    for (const item of group.items ?? []) {
      list.push({
        title: item.title,
        url: item.url,
        description: item.description,
        popular: item.popular,
        category: group.title,
        categoryUrl: group.url,
        icon: group.icon,
      });
    }
  }
  return list;
}

// Levenshtein distance for typo tolerance
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

// Check if two tokens are typo-similar
function isTypoMatch(queryToken: string, targetToken: string): boolean {
  if (queryToken.length < 3) return queryToken === targetToken;
  const maxDistance = queryToken.length <= 4 ? 1 : queryToken.length <= 7 ? 2 : 3;
  return levenshteinDistance(queryToken, targetToken) <= maxDistance;
}

export interface SearchResult {
  tool: SearchableTool;
  score: number;
}

/**
 * Intelligent AI-grade search scorer
 */
export function searchTools(query: string, tools: SearchableTool[] = getAllSearchableTools(), maxResults = 30): SearchResult[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];

  const queryTokens = raw.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const tool of tools) {
    const titleLower = tool.title.toLowerCase();
    const catLower = tool.category.toLowerCase();
    const descLower = (tool.description || "").toLowerCase();
    const urlLower = tool.url.toLowerCase();

    let score = 0;

    // 1. EXACT CATEGORY MATCH BOOST (E.g. query "url" matching category "URL")
    if (catLower === raw || (raw.length >= 2 && catLower.startsWith(raw))) {
      score += 12000;
    } else if (catLower.includes(raw)) {
      score += 4000;
    }

    // 2. TITLE EXACT & PREFIX MATCH
    if (titleLower === raw) {
      score += 10000;
    } else if (titleLower.startsWith(raw)) {
      score += 8000;
    } else if (titleLower.split(/\s+/).some((t) => t === raw)) {
      score += 6000;
    } else if (titleLower.includes(raw)) {
      score += 4500;
    }

    // 3. URL SLUG MATCH (e.g. "/tools/url/shortener" matching "url" or "shortener")
    const urlSegments = urlLower.split("/").filter(Boolean);
    if (urlSegments.includes(raw)) {
      score += 5000;
    } else if (urlSegments.some((seg) => seg.startsWith(raw))) {
      score += 3500;
    }

    // 4. SYNONYM & INTENT EXPANSION
    for (const [key, synList] of Object.entries(SYNONYMS)) {
      if (raw === key || synList.includes(raw)) {
        if (catLower.includes(key) || titleLower.includes(key)) {
          score += 3000;
        }
        for (const syn of synList) {
          if (titleLower.includes(syn)) {
            score += 2500;
          }
        }
      }
    }

    // 5. TOKEN-BY-TOKEN MATCHING & TYPO TOLERANCE
    const titleWords = titleLower.split(/[\s\-_\/]+/).filter(Boolean);
    let matchedTokens = 0;

    for (const qToken of queryTokens) {
      let tokenMatched = false;

      // Exact token match in title
      if (titleWords.includes(qToken)) {
        score += 3000;
        tokenMatched = true;
      } else if (titleWords.some((w) => w.startsWith(qToken))) {
        score += 2000;
        tokenMatched = true;
      } else if (titleWords.some((w) => isTypoMatch(qToken, w))) {
        // Typo match in title (e.g. "shorter" -> "shortener", "prcentage" -> "percentage")
        score += 1500;
        tokenMatched = true;
      }

      // Exact token match in category
      if (catLower.includes(qToken)) {
        score += 1500;
        tokenMatched = true;
      } else if (isTypoMatch(qToken, catLower)) {
        score += 1000;
        tokenMatched = true;
      }

      // Description token match (modest score so description matches never overtake title/category)
      if (descLower.includes(qToken)) {
        score += 300;
        tokenMatched = true;
      }

      if (tokenMatched) matchedTokens++;
    }

    // Require at least 1 token match
    if (matchedTokens === 0 && score === 0) continue;

    // Bonus for matching all tokens in multi-word queries
    if (matchedTokens === queryTokens.length) {
      score += 1000;
    }

    // Small bonus for popular tools
    if (tool.popular) {
      score += 200;
    }

    if (score > 0) {
      results.push({ tool, score });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, maxResults);
}
