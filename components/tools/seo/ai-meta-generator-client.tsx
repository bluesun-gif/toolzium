"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  Copy,
  Check,
  Globe,
  Share2,
  Smartphone,
  Monitor,
  Code2,
  Flame,
  Layers,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { ToolBackground } from "@/components/shared/tool-background";

interface MetaVariation {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
}

const SEO_PRESETS = [
  {
    name: "🚀 SaaS Landing Page",
    topic: "AI-Powered Customer Feedback & Survey Automation Software",
    pageType: "SaaS Product Landing Page",
    audience: "Product Managers, Founders & UX Researchers"
  },
  {
    name: "🛒 E-Commerce Product",
    topic: "Handcrafted Organic Italian Leather Travel Duffel Bag",
    pageType: "E-Commerce Product Page",
    audience: "Frequent Travelers & Luxury Shoppers"
  },
  {
    name: "📝 Viral How-To Guide",
    topic: "How to Build a $10k/Month Micro-SaaS in 2026",
    pageType: "Long-Form Blog Post",
    audience: "Developers & Indie Hackers"
  },
  {
    name: "📍 Local Service Business",
    topic: "Emergency 24/7 Residential Plumbing & Drain Repair in Austin TX",
    pageType: "Local Service Page",
    audience: "Homeowners in Austin Metro Area"
  }
];

const DEFAULT_VARIATION: MetaVariation = {
  title: "Toolzium — 500+ Free Online Developer & Productivity Tools",
  description: "Access 500+ free online tools for developers, creators, and professionals. 100% private, client-side execution with zero signups required.",
  keywords: "free online tools, developer utilities, pdf tools, qr generator, json formatter, ai tools",
  ogTitle: "Toolzium | 500+ Free Browser-Based Tools & AI Utilities",
  ogDescription: "The all-in-one free toolkit for developers, marketers, and students. Fast, private, and no registration."
};

export function AiMetaGeneratorClient() {
  const [topic, setTopic] = useState(SEO_PRESETS[0].topic);
  const [model, setModel] = useState("gpt4o");
  const [pageType, setPageType] = useState(SEO_PRESETS[0].pageType);
  const [audience, setAudience] = useState(SEO_PRESETS[0].audience);
  const [url, setUrl] = useState("https://example.com/product");
  const [loading, setLoading] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<MetaVariation>(DEFAULT_VARIATION);
  const [allVariations, setAllVariations] = useState<MetaVariation[]>([DEFAULT_VARIATION]);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const applyPreset = (p: typeof SEO_PRESETS[0]) => {
    setTopic(p.topic);
    setPageType(p.pageType);
    setAudience(p.audience);
    toast.success(`Loaded preset: ${p.name}`);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a page topic or keyword");
      return;
    }
    setLoading(true);

    const prompt = `You are a Google Search Quality Rating and Click-Through Rate (CTR) optimization expert.
Generate 3 high-converting SEO Meta tag variations for:
- Topic / Product: "${topic}"
- Page Type: "${pageType}"
- Target Audience: "${audience}"

CRITICAL RULES:
- Title must be 50-60 characters, front-load target keywords, and include a compelling CTR hook.
- Description must be 145-155 characters with a clear user value proposition and call-to-action (CTA).
- Keywords: 5-7 comma-separated high-intent search terms.

Return STRICT JSON ONLY as an array of 3 objects:
[
  {
    "title": "50-60 char title",
    "description": "145-155 char description",
    "keywords": "kw1, kw2, kw3, kw4, kw5",
    "ogTitle": "Social media title",
    "ogDescription": "Social media description"
  }
]
Raw JSON only.`;

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model,
          type: "json"
        })
      });

      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      const rawText = data.raw || "";

      const cleaned = rawText
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const startIdx = cleaned.indexOf("[");
      const endIdx = cleaned.lastIndexOf("]");

      if (startIdx !== -1 && endIdx !== -1) {
        const parsed = JSON.parse(cleaned.slice(startIdx, endIdx + 1));
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllVariations(parsed);
          setSelectedVariation(parsed[0]);
          toast.success(`Synthesized ${parsed.length} SEO variations!`);
          return;
        }
      }

      // Fallback
      const fallback: MetaVariation = {
        title: `${topic.slice(0, 45)} | High-CTR Guide 2026`,
        description: `Discover ${topic.slice(0, 80)}. Master the proven strategies, best tools, and step-by-step frameworks for ${audience || "users"}.`,
        keywords: "seo tools, online guide, best practices, 2026 strategy",
        ogTitle: `${topic.slice(0, 55)}`,
        ogDescription: `Learn everything about ${topic.slice(0, 100)} with our free guide.`
      };
      setAllVariations([fallback]);
      setSelectedVariation(fallback);
      toast.success("Generated SEO metadata!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate meta tags. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedType(label);
    toast.success(`Copied ${label}!`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const titleLength = selectedVariation.title.length;
  const descLength = selectedVariation.description.length;

  const htmlOutput = `<!-- Primary Meta Tags -->
<title>${selectedVariation.title}</title>
<meta name="title" content="${selectedVariation.title}" />
<meta name="description" content="${selectedVariation.description}" />
<meta name="keywords" content="${selectedVariation.keywords}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${selectedVariation.ogTitle || selectedVariation.title}" />
<meta property="og:description" content="${selectedVariation.ogDescription || selectedVariation.description}" />

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${selectedVariation.ogTitle || selectedVariation.title}" />
<meta property="twitter:description" content="${selectedVariation.ogDescription || selectedVariation.description}" />`;

  const nextJsOutput = `export const metadata: Metadata = {
  title: "${selectedVariation.title}",
  description: "${selectedVariation.description}",
  keywords: "${selectedVariation.keywords}",
  openGraph: {
    title: "${selectedVariation.ogTitle || selectedVariation.title}",
    description: "${selectedVariation.ogDescription || selectedVariation.description}",
    url: "${url}",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${selectedVariation.ogTitle || selectedVariation.title}",
    description: "${selectedVariation.ogDescription || selectedVariation.description}",
  },
};`;

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Search}
          title="AI SEO Meta & SERP Simulator Studio"
          description="Generate click-magnet SEO titles, meta descriptions, OpenGraph tags, and preview live Google search snippets for desktop and mobile."
        />

        {/* 1-Click Presets */}
        <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur-md p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Flame className="h-4 w-4 text-amber-500" />
            <span>1-Click High-CTR Presets</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {SEO_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="text-left p-2.5 rounded-xl border border-border/60 bg-background/50 hover:bg-primary/10 hover:border-primary/40 transition-all text-xs font-semibold truncate cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Configuration Card */}
        <GlassCard className="p-6 space-y-5 rounded-3xl border-border/80 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Page & Content Details
              </h3>
              <p className="text-xs text-muted-foreground">
                Multi-provider AI generates 3 distinct high-CTR title and description hooks
              </p>
            </div>
            <ModelSelector value={model} onChange={setModel} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">
              Page Topic / Main Target Keyword:
            </label>
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Free Online Audio & MP3 Trimmer"
              className="h-11 font-medium rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Page Type / Intent:</label>
              <Input
                type="text"
                value={pageType}
                onChange={(e) => setPageType(e.target.value)}
                placeholder="e.g. SaaS Landing Page, Product"
                className="h-11 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Target Audience:</label>
              <Input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Developers, Marketers"
                className="h-11 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Target Page URL:</label>
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="h-11 rounded-xl text-sm"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-12 rounded-2xl text-sm font-bold bg-primary text-primary-foreground gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:scale-101 active:scale-99 transition-all"
          >
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Optimizing High-CTR Meta Tags...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate SEO Meta Tags & SERP Preview</span>
              </>
            )}
          </Button>
        </GlassCard>

        {/* Variations Selector (if multiple generated) */}
        {allVariations.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Variations:
            </span>
            <div className="flex gap-2">
              {allVariations.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariation(v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                    selectedVariation === v
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground"
                  }`}
                >
                  Variation #{idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Google Search SERP Simulator Card */}
        <GlassCard className="p-6 space-y-5 rounded-3xl border-primary/30 bg-card/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-500 text-xs font-black">
                G
              </span>
              <h3 className="text-sm font-bold text-foreground">Live Google Search SERP Simulator</h3>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border/60">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  previewDevice === "desktop" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  previewDevice === "mobile" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Google SERP Snippet Box */}
          <div
            className={`rounded-2xl border border-border/80 bg-background/90 p-5 space-y-1.5 transition-all ${
              previewDevice === "mobile" ? "max-w-md mx-auto" : "w-full"
            }`}
          >
            {/* Favicon + URL Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-black text-primary">
                T
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium truncate font-sans text-xs">
                {url.replace(/^https?:\/\//, "")}
              </span>
            </div>

            {/* Clickable Blue Title */}
            <h4 className="text-base sm:text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer leading-snug font-sans">
              {selectedVariation.title}
            </h4>

            {/* Description Snippet */}
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
              {selectedVariation.description}
            </p>
          </div>

          {/* Character & Pixel Health Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 text-xs">
              <span className="font-semibold text-muted-foreground">Title Length:</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono font-bold ${
                    titleLength >= 45 && titleLength <= 60
                      ? "text-emerald-500"
                      : titleLength > 60
                      ? "text-rose-500"
                      : "text-amber-500"
                  }`}
                >
                  {titleLength} / 60 chars
                </span>
                {titleLength >= 45 && titleLength <= 60 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 text-xs">
              <span className="font-semibold text-muted-foreground">Description Length:</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono font-bold ${
                    descLength >= 140 && descLength <= 160
                      ? "text-emerald-500"
                      : descLength > 160
                      ? "text-rose-500"
                      : "text-amber-500"
                  }`}
                >
                  {descLength} / 160 chars
                </span>
                {descLength >= 140 && descLength <= 160 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Code Export Cards: HTML vs Next.js */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* HTML Meta Snippet */}
          <GlassCard className="p-5 space-y-3 rounded-2xl border-border/80">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Code2 className="h-4 w-4 text-primary" />
                <span>HTML &lt;head&gt; Meta Tags</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyCode(htmlOutput, "HTML")}
                className="h-8 px-2.5 rounded-lg text-xs font-bold gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {copiedType === "HTML" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === "HTML" ? "Copied" : "Copy HTML"}</span>
              </Button>
            </div>
            <pre className="p-3.5 rounded-xl border border-border/60 bg-background/80 text-[11px] font-mono text-foreground leading-relaxed overflow-x-auto max-h-48">
              {htmlOutput}
            </pre>
          </GlassCard>

          {/* Next.js Metadata Export */}
          <GlassCard className="p-5 space-y-3 rounded-2xl border-border/80">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                <span>Next.js App Router Metadata</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyCode(nextJsOutput, "Next.js")}
                className="h-8 px-2.5 rounded-lg text-xs font-bold gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {copiedType === "Next.js" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === "Next.js" ? "Copied" : "Copy TS"}</span>
              </Button>
            </div>
            <pre className="p-3.5 rounded-xl border border-border/60 bg-background/80 text-[11px] font-mono text-foreground leading-relaxed overflow-x-auto max-h-48">
              {nextJsOutput}
            </pre>
          </GlassCard>
        </div>

        {/* Guides & FAQ */}
        <ToolHowItWorks
          steps={[
            {
              step: "1",
              title: "Enter Topic & Target Keyword",
              description: "Provide your product, article, or business keywords or select a 1-click preset."
            },
            {
              step: "2",
              title: "Inspect Real-Time SERP Simulator",
              description: "Preview exact desktop and mobile Google search snippet cards with pixel length validation."
            },
            {
              step: "3",
              title: "Copy HTML or Next.js Metadata",
              description: "Paste complete OpenGraph, Twitter card, and meta tags directly into your site."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Google Pixel-Width Guard",
              description: "Validates that titles stay strictly under 60 characters so Google never truncates your search headline with an ugly ellipsis (...)."
            },
            {
              title: "Social OpenGraph Card Engine",
              description: "Includes complete OpenGraph and Twitter card attributes so links look beautiful when shared on LinkedIn, X, and Facebook."
            },
            {
              title: "Next.js App Router Integration",
              description: "Exports ready-to-use TypeScript metadata blocks for modern React and Next.js applications."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "What is the ideal meta title and description length in 2026?",
              answer: "The optimal meta title length is 50–60 characters (~580 pixels). The optimal meta description length is 145–155 characters (~960 pixels) to avoid desktop and mobile search truncation."
            },
            {
              question: "Does Google still use meta keywords for ranking?",
              answer: "While Google does not directly use meta keywords for core ranking, other search engines (such as Bing, DuckDuckGo, and internal search scrapers) utilize them for topic categorization."
            },
            {
              question: "Is this AI SEO Generator free?",
              answer: "Yes. Toolzium provides unlimited AI SEO title and meta description generations with zero signups required."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/seo/ai-meta-generator" />
      </div>
    </div>
  );
}

export default AiMetaGeneratorClient;
