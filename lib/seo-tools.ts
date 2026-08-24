type ToolItem = { title: string; url: string; description?: string; popular?: boolean };
type ToolCategory = {
  title: string;
  url: string;
  isActive?: boolean;
  items: ToolItem[];
};

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were",
  "will", "with", "all", "tools", "tool", "free", "online", "search", "available",
  "create", "meta", "tags", "product", "feature", "emotional", "benefit", "category",
  "build", "compare", "convert", "compress", "optimize", "generate", "validate",
  "preview", "analyze", "calculate", "format", "shorten", "expand", "bangladesh",
  "all tools"
]);

function normalize(word: string) {
  return word
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isValidKeyword(kw: string): boolean {
  const norm = normalize(kw);
  if (!norm || norm.length < 4 || norm.length > 35) return false;
  if (STOPWORDS.has(norm)) return false;
  if (norm === "tools tools" || norm === "ai tools tools" || norm === "all tools") return false;
  if (!norm.includes(" ") && norm.length < 4) return false;
  return true;
}

export function buildDynamicKeywords(tools: ToolCategory[]): string[] {
  const keywords: string[] = [];

  for (const cat of tools) {
    if (!cat?.items?.length || cat.title.toLowerCase() === "tools") continue;

    for (const item of cat.items) {
      if (item.popular && item.title) {
        const cleanTitle = normalize(item.title)
          .replace(/^in-browser\s+/i, "")
          .replace(/\s+studio$/i, "")
          .replace(/\s+engine$/i, "")
          .replace(/\s+calculator$/i, " calc");
        if (isValidKeyword(cleanTitle)) {
          keywords.push(cleanTitle);
        }
      }
    }
  }

  return keywords;
}

export function mergeKeywords(
  staticKeywords: string[],
  dynamicKeywords: string[],
  maxCount = 20
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  const add = (k: string) => {
    const norm = normalize(k);
    if (isValidKeyword(norm) && !seen.has(norm)) {
      seen.add(norm);
      result.push(norm);
    }
  };

  for (const k of staticKeywords) {
    add(k);
  }

  for (const k of dynamicKeywords) {
    if (result.length >= maxCount) break;
    add(k);
  }

  return result.slice(0, maxCount);
}

export function siteDescriptionFallback(tools: ToolCategory[]) {
  const total = tools.reduce((n, c) => n + (c.items?.length || 0), 0);
  const cats = tools
    .map((c) => c.title)
    .filter((t) => t.toLowerCase() !== "tools")
    .slice(0, 5)
    .join(", ");
  return `Fast, free, privacy-friendly online tools across ${cats}${tools.length > 5 ? ", and more" : ""}. Explore ${total}+ handy utilities in one place.`;
}
