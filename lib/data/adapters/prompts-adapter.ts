import { getVoteScore } from "@/lib/storage/expansion-db";

export interface PromptTemplateItem {
  slug: string;
  title: string;
  category: "Coding & Dev" | "Writing & SEO" | "System Prompts" | "Midjourney & Art" | "Business & Marketing" | "Defensive & Logic";
  modelTarget: "ChatGPT / Claude" | "Midjourney v6" | "Claude 3.5 Sonnet" | "GPT-4o" | "Stable Diffusion";
  description: string;
  promptText: string;
  variables: { name: string; label: string; placeholder: string; defaultValue?: string }[];
  tags: string[];
  initialScore: number;
  featured?: boolean;
}

export const PROMPTS_DATABASE: PromptTemplateItem[] = [
  {
    slug: "senior-architect-code-review",
    title: "Senior Staff Software Architect Code Reviewer",
    category: "Coding & Dev",
    modelTarget: "ChatGPT / Claude",
    description: "Transforms the AI into a strict FAANG Principal Engineer reviewing code for race conditions, memory leaks, algorithmic complexity, and idiomatic maintainability.",
    promptText: `You are a Senior Staff Software Architect at a tier-1 technology company. Review the following {{language}} code with extreme technical rigor.

Analyze the code under the following strict dimensions:
1. **Algorithmic Complexity & Performance:** Identify any O(N^2) or hidden bottlenecks, unbuffered I/O, or memory leaks.
2. **Security & Input Validation:** Check for injection vectors, buffer overflows, prototype pollution, or unsafe deserialization.
3. **Concurrency & Thread Safety:** Detect race conditions, deadlocks, or improper locking mechanisms.
4. **Idomatic Best Practices:** Recommend cleaner abstractions, SOLID compliance, and modern language patterns.

Provide the review in 3 sections:
- 🔴 **Critical Bugs & Vulnerabilities** (if any)
- 🟡 **Architectural Improvements & Refactor Plan**
- 🟢 **Optimized Drop-in Replacement Code**

Code to review:
\`\`\`{{language}}
{{code}}
\`\`\``,
    variables: [
      { name: "language", label: "Programming Language", placeholder: "TypeScript, Python, Go, Rust", defaultValue: "TypeScript" },
      { name: "code", label: "Source Code Snippet", placeholder: "Paste code to review...", defaultValue: "function processItems(items: any[]) { return items.map(i => i.val); }" },
    ],
    tags: ["Code Review", "Architecture", "Security", "TypeScript", "Python"],
    initialScore: 480,
    featured: true,
  },
  {
    slug: "seo-pillar-cluster-architect",
    title: "Comprehensive SEO Pillar Content & Topic Cluster Architect",
    category: "Writing & SEO",
    modelTarget: "ChatGPT / Claude",
    description: "Generates an exhaustive 2,500+ word topic cluster blueprint with semantic entities, LSI keywords, search intent mapping, and internal linking strategies.",
    promptText: `Act as a world-class Technical SEO Director and Content Strategist. Design an authoritative Topic Cluster and Pillar Page architecture for the core primary keyword: "{{primary_keyword}}".

Target Audience: {{target_audience}}
Search Intent: Informational & High-Intent Commercial

Deliver:
1. **Pillar Page Outline (H1, H2, H3):** Include semantic entities that Google NLP / Perplexity prioritize.
2. **Cluster Subtopics (10 Supporting Articles):** Title, search intent, long-tail query, and suggested URL slug for each.
3. **Internal Linking Silo Schema:** Mermaid diagram or structured list showing how clusters link back to the pillar.
4. **Interactive Schema Markup Blueprint:** Recommended JSON-LD entities (FAQPage, HowTo, Article).`,
    variables: [
      { name: "primary_keyword", label: "Primary Keyword", placeholder: "e.g. Reverse Phone Lookup, Next.js Hosting", defaultValue: "Reverse Phone Lookup" },
      { name: "target_audience", label: "Target Audience", placeholder: "e.g. US Consumers, Developers", defaultValue: "US & Global Consumers" },
    ],
    tags: ["SEO", "Content Marketing", "Keyword Research", "Topic Clusters"],
    initialScore: 390,
    featured: true,
  },
  {
    slug: "midjourney-photorealistic-cinematic-portrait",
    title: "Midjourney v6 Photorealistic 8K Cinematic Masterpiece",
    category: "Midjourney & Art",
    modelTarget: "Midjourney v6",
    description: "Generates ultra-realistic photographic portraits with volumetric lighting, Hasselblad medium format color science, and zero AI plastic sheen.",
    promptText: `Cinematic 35mm film still portrait of {{subject}}, volumetric rim lighting, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, natural skin texture, subtle film grain, dramatic shadows, color graded in Kodak Portra 400 aesthetic, atmospheric depth of field, 8k resolution, authentic lighting --ar {{aspect_ratio}} --style raw --v 6.0`,
    variables: [
      { name: "subject", label: "Portrait Subject & Environment", placeholder: "e.g. cybernetic engineer in neon rain, senior artisan in sunlit Tokyo workshop", defaultValue: "artisan watchmaker inspecting vintage timepiece in a sunlit Swiss workshop" },
      { name: "aspect_ratio", label: "Aspect Ratio", placeholder: "16:9, 9:16, 4:5, 1:1", defaultValue: "16:9" },
    ],
    tags: ["Midjourney", "Prompt Engineering", "Photography", "8K"],
    initialScore: 540,
    featured: true,
  },
  {
    slug: "socratic-logic-adversary",
    title: "Socratic Logic Adversary & Cognitive Bias Detector",
    category: "Defensive & Logic",
    modelTarget: "Claude 3.5 Sonnet",
    description: "Rigorously pressure-tests hypotheses, startup pitch decks, and investment memos by identifying unstated assumptions, logical fallacies, and structural risks.",
    promptText: `Act as a Socratic Logic Adversary and Master Epistemologist. I will present an argument or business thesis. Your job is NOT to agree with me or offer flattering praise. 

Your objective is to stress-test my thesis by:
1. **Uncovering Hidden Assumptions:** Identify 3 unstated axioms that must hold true for my argument to work.
2. **Identifying Logical Fallacies:** Point out any hasty generalizations, survivor bias, false dilemmas, or correlation-causation confusions.
3. **Steel-Manning the Counter-Argument:** Construct the strongest possible intellectual counter-case against my idea.
4. **Failure Mode Matrix:** List 3 scenarios where this plan fails catastrophically despite good execution.

Here is my thesis:
"{{thesis}}"`,
    variables: [
      { name: "thesis", label: "Argument / Business Thesis", placeholder: "Enter your thesis to pressure-test...", defaultValue: "Launching a privacy-first web utilities hub with zero upfront server costs and programmatic SEO will capture millions of organic visits from search engines." },
    ],
    tags: ["Critical Thinking", "Logic", "Strategy", "Adversarial"],
    initialScore: 430,
    featured: true,
  },
];

export function getPromptBySlug(slug: string): PromptTemplateItem | null {
  const clean = slug.trim().toLowerCase();
  const found = PROMPTS_DATABASE.find((p) => p.slug === clean);
  if (!found) return null;

  const voteKey = `prompt:${found.slug}`;
  const { score } = getVoteScore(voteKey);

  return {
    ...found,
    initialScore: found.initialScore + score,
  };
}

export function getAllPromptSlugs(): string[] {
  return PROMPTS_DATABASE.map((p) => p.slug);
}
