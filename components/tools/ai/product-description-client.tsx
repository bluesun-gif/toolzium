"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Tag } from "lucide-react";
import toast from "react-hot-toast";

interface DescriptionResult {
  headline: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  seoMeta: string;
  socialCaption: string;
}

export function ProductDescriptionClient() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [featuresInput, setFeaturesInput] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<"persuasive" | "luxury" | "technical" | "playful">("persuasive");

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<DescriptionResult | null>(null);

  const generateDescriptions = useCallback(() => {
    if (!productName.trim() || !featuresInput.trim()) {
      toast.error("Please enter product name and key features");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const name = productName.trim();
      const rawFeatures = featuresInput.split(/[,\n]/).map((f) => f.trim()).filter(Boolean);
      const audience = targetAudience.trim() || "modern consumers";

      let headline = "";
      let shortDesc = "";
      let longDesc = "";
      let seoMeta = "";
      let socialCaption = "";

      if (tone === "luxury") {
        headline = `Experience Unrivaled Elegance with the ${name}`;
        shortDesc = `Meticulously crafted for ${audience}, the ${name} redefines luxury with premium materials and flawless execution.`;
        longDesc = `Immerse yourself in sophistication. The ${name} is engineered for those who demand excellence in every detail. Built around ${rawFeatures.slice(0, 2).join(" and ")}, it delivers an uncompromised experience that elevates your lifestyle.`;
        seoMeta = `Discover the ${name}. Premium ${category.toLowerCase()} crafted for ${audience}. Features include ${rawFeatures[0] || "unmatched performance"}.`;
        socialCaption = `Elegance meets innovation. Introducing the all-new ${name}. ✨ Designed for ${audience}. #LuxuryLiving #${category.replace(/\s+/g, "")}`;
      } else {
        headline = `Supercharge Your Daily Routine with ${name}`;
        shortDesc = `The ultimate ${category.toLowerCase()} solution built for ${audience}. Features ${rawFeatures[0] || "top-tier performance"}.`;
        longDesc = `Upgrade your experience with the ${name}. Designed specifically for ${audience}, this innovative product brings together ${rawFeatures.join(", ")} into one seamless package.`;
        seoMeta = `Buy the ${name} online. Top-rated ${category.toLowerCase()} featuring ${rawFeatures.slice(0, 3).join(", ")}. Fast shipping available.`;
        socialCaption = `Meet the ${name}! 🚀 The perfect upgrade for ${audience}. Tap the link in bio to shop now! #ShopNow #${category.replace(/\s+/g, "")}`;
      }

      setResult({
        headline,
        shortDesc,
        longDesc,
        features: rawFeatures,
        seoMeta,
        socialCaption
      });

      setIsGenerating(false);
      toast.success("High-converting product descriptions generated!");
    }, 450);
  }, [productName, category, featuresInput, targetAudience, tone]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Yellow Shopping Icon Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI E-Commerce Product Description Generator</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200">POPULAR</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Generate high-converting e-commerce product listings, bullet points, SEO meta tags, and social captions for Shopify and Amazon.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Tag className="w-4 h-4 text-amber-600" />
              Product Details Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Product Name</Label>
                <Input
                  placeholder="e.g. UltraFit Wireless Earbuds"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Category</Label>
                <Input
                  placeholder="e.g. Consumer Electronics"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Key Features & Specs (One per line)</Label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px] font-sans text-slate-900 dark:text-slate-100"
                placeholder={`Active Noise Cancellation (ANC)\n30-Hour Battery Life\nIPX7 Waterproofing`}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target Audience</Label>
                <Input
                  placeholder="e.g. Fitness enthusiasts & commuters"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Copywriting Tone</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                >
                  <option value="persuasive">Persuasive (High Conversion)</option>
                  <option value="luxury">Luxury & Premium</option>
                  <option value="technical">Technical Specs</option>
                  <option value="playful">Playful & Fun</option>
                </select>
              </div>
            </div>

            <Button onClick={generateDescriptions} disabled={isGenerating || !productName.trim() || !featuresInput.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-md shadow-amber-500/20 rounded-xl h-11">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Generating Copy..." : "Generate Product Description"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <GlassCard className="p-4 space-y-2 border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider font-mono">Product Headline</span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.headline, "Headline")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{result.headline}</h3>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">Main Product Description</span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.longDesc, "Product description")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                </div>
                <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200">{result.longDesc}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider font-mono">SEO Meta Description</span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.seoMeta, "SEO Meta")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                </div>
                <p className="text-xs font-mono bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200">{result.seoMeta}</p>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <ShoppingBag className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Copy Generated Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Fill in product details and features on the left to generate e-commerce copy and SEO meta tags.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Product Specs", description: "Input product title, category, and bullet point features.", icon: ShoppingBag },
          { step: "02", title: "Select Copywriting Tone", description: "Choose between Persuasive, Luxury, Technical, or Playful.", icon: Sliders },
          { step: "03", title: "Copy E-Commerce Copy", description: "Export formatted product listings and SEO meta tags.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Shopify & Amazon Ready", "SEO Meta Tags"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: ShoppingBag, title: "AIDA Framework Copywriting", description: "Structures product descriptions using Attention, Interest, Desire, and Action principles." },
          { icon: Tag, title: "SEO Meta Description Generator", description: "Creates search-engine-optimized meta descriptions tailored for Google Shopping rankings." },
          { icon: CheckCircle2, title: "Social Ad Captions", description: "Generates accompanying social captions for Instagram and TikTok product ads." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Boosting E-Commerce Conversion Rates</h3>
          <p>
            Well-written product descriptions address customer pain points, highlight key features, and instill purchasing confidence. Combining benefit-driven copy with SEO keyword density improves store search rankings and increases checkout conversion rates.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Can I use these descriptions for Shopify and Amazon?", answer: "Yes! The output includes short bullet descriptions ideal for Amazon listings and full descriptions for Shopify storefronts." },
          { question: "How long should a product description be?", answer: "Ideal product descriptions range from 150 to 300 words, focusing on benefits rather than purely technical specs." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/product-description" max={6} />
    </div>
  );
}

export default ProductDescriptionClient;
