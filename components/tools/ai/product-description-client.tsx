"use client";

import { Card } from "@/components/ui/card";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { ShoppingBag, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Tag, History, Trash2, Lightbulb, Type } from "lucide-react";
import toast from "react-hot-toast";
interface DescriptionResult {
  headline: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  seoMeta: string;
  socialCaption: string;
}
interface SavedProductHistory {
  id: string;
  productName: string;
  category: string;
  result: DescriptionResult;
  timestamp: string;
}
export function ProductDescriptionClient() {
  const [productName, setProductName] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [category, setCategory] = useState("Electronics");
  const [featuresInput, setFeaturesInput] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<"persuasive" | "luxury" | "technical" | "playful">("persuasive");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<DescriptionResult | null>(null);
  const [history, setHistory] = useState<SavedProductHistory[]>([]);
  const presets = [{
    label: "🎧 Wireless Earbuds",
    name: "UltraFit Noise-Canceling Earbuds",
    cat: "Electronics",
    features: "Active Noise Cancellation (ANC)\n30-Hour Total Battery Life\nIPX7 Sweatproof & Ergonomic Fit",
    audience: "Fitness enthusiasts & commuters"
  }, {
    label: "☕ Organic Coffee Beans",
    name: "Artisan Dark Roast Coffee",
    cat: "Food & Beverage",
    features: "100% Organic Arabica Single-Origin\nNotes of Dark Chocolate & Hazelnut\nSustainably Farmed in Colombia",
    audience: "Coffee lovers & morning achievers"
  }];
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_product_desc_history");
        if (saved) setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load product history:", e);
    }
  }, []);
  const saveToHistory = (item: SavedProductHistory) => {
    try {
      setHistory(prev => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_product_desc_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_product_desc_history");
    toast.success("History cleared!");
  };
  const applyPreset = (p: typeof presets[0]) => {
    setProductName(p.name);
    setCategory(p.cat);
    setFeaturesInput(p.features);
    setTargetAudience(p.audience);
    toast.success("Preset loaded!");
  };
  const generateDescriptions = useCallback(async () => {
    if (!productName.trim() || !featuresInput.trim()) {
      toast.error("Please enter product name and key features");
      return;
    }
    setIsGenerating(true);
    const pName = productName.trim();
    const pCat = category.trim() || "General";
    const pFeat = featuresInput.trim();
    const pAud = targetAudience.trim() || "modern shoppers";
    try {
      const prompt = `Act as a High-Converting E-Commerce Copywriter for Shopify & Amazon. Write product copy for:
      Product Name: "${pName}"
      Category: "${pCat}"
      Features & Specs: "${pFeat}"
      Target Audience: "${pAud}"
      Tone: "${tone}"

      Format requirements:
      Return EXACTLY a valid JSON object with keys: headline, shortDesc, longDesc, features (array of bullet strings), seoMeta, socialCaption. Do not include markdown code fences if possible, just JSON.`;
      let generatedResult: DescriptionResult | null = null;
      try {
        const response = await fetch("/api/api/ai/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt,
            model,
            type: "json"
          })
        });
        const data = await response.json();
        if (data.success && data.raw) {
          const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
          generatedResult = JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn("AI fallback logic:", err);
      }
      if (!generatedResult || !generatedResult.headline) {
        const rawFeatures = pFeat.split(/[,\n]/).map(f => f.trim()).filter(Boolean);
        generatedResult = {
          headline: `Upgrade Your Experience with ${pName}`,
          shortDesc: `The ultimate ${pCat.toLowerCase()} designed for ${pAud}. Built for high performance and durability.`,
          longDesc: `Elevate your lifestyle with the ${pName}. Engineered specifically for ${pAud}, this product combines ${rawFeatures.slice(0, 2).join(" and ")} into one elegant package. Perfect for everyday use.`,
          features: rawFeatures,
          seoMeta: `Buy ${pName} online. High quality ${pCat.toLowerCase()} featuring ${rawFeatures[0] || "premium specs"}. Fast shipping available.`,
          socialCaption: `Meet the all-new ${pName}! 🚀 Designed for ${pAud}. Tap the link in bio to shop now! #${pCat.replace(/\s+/g, "")}`
        };
      }
      setResult(generatedResult);
      saveToHistory({
        id: `prod-${Date.now()}`,
        productName: pName,
        category: pCat,
        result: generatedResult,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsGenerating(false);
      toast.success("High-converting product descriptions generated!");
    } catch (e) {
      console.error("Product description generation error:", e);
      setIsGenerating(false);
      toast.error("Failed to generate description. Please try again.");
    }
  }, [productName, category, featuresInput, targetAudience, tone]);
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader title="AI E-Commerce Product Description Generator" description="Generate high-converting e-commerce product listings, bullet points, SEO meta tags, and social captions for Shopify and Amazon." icon={ShoppingBag} />

        <div className="space-y-6 relative z-10">
          

          <ModelSelector value={model} onChange={setModel} />


          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Tag className="w-5 h-5 text-primary" />
              <Label className="text-lg font-bold text-foreground">Product Specification</Label>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  <Lightbulb className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Quick Presets
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, idx) => <Button key={idx} type="button" onClick={() => applyPreset(p)} className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 transition-colors font-medium">
                      {p.label}
                    </Button>)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Product Name</Label>
                  <Input placeholder="e.g. UltraFit Wireless Earbuds" value={productName} onChange={e => setProductName(e.target.value)} className="bg-background border-border" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Category</Label>
                  <Input placeholder="e.g. Consumer Electronics" value={category} onChange={e => setCategory(e.target.value)} className="bg-background border-border" />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Key Features & Specs (One per line)
                </Label>
                <textarea className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] font-sans text-foreground" placeholder={`Active Noise Cancellation (ANC)\n30-Hour Battery Life\nIPX7 Waterproofing`} value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Target Audience</Label>
                  <Input placeholder="e.g. Fitness enthusiasts & commuters" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="bg-background border-border" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Copywriting Tone</Label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={tone} onChange={e => setTone(e.target.value as any)}>
                    <option value="persuasive">Persuasive (High Conversion)</option>
                    <option value="luxury">Luxury & Premium</option>
                    <option value="technical">Technical Specs</option>
                    <option value="playful">Playful & Fun</option>
                  </select>
                </div>
              </div>

              <Button onClick={generateDescriptions} disabled={isGenerating || !productName.trim() || !featuresInput.trim()} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 rounded-xl h-12 text-base">
                {isGenerating ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isGenerating ? "Generating Copy..." : "Generate Product Description"}
              </Button>
            </div>
          </GlassCard>

          {/* Right Workspace Card */}
          <div className="flex flex-col space-y-4">
            {result ? <motion.div initial={{
              opacity: 0,
              y: 15
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-3">
                <GlassCard className="p-4 space-y-2 border-l-4 border-l-primary bg-card/70 backdrop-blur-md rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider font-mono">
                      Product Headline
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(result.headline, "Headline")} className="h-7 text-xs gap-1 border-border font-semibold">
                      <Copy className="w-3 h-3" /> Copy
                    </Button>
                  </div>
                  <h3 className="text-base font-extrabold text-foreground">{result.headline}</h3>
                </GlassCard>

                <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-foreground uppercase tracking-wider font-mono">
                      Main Product Description
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(result.longDesc, "Product description")} className="h-7 text-xs gap-1 border-border font-semibold">
                      <Copy className="w-3 h-3" /> Copy
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{result.longDesc}</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider font-mono">
                      SEO Meta Description
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(result.seoMeta, "SEO Meta")} className="h-7 text-xs gap-1 border-border font-semibold">
                      <Copy className="w-3 h-3" /> Copy
                    </Button>
                  </div>
                  <p className="text-xs font-mono bg-muted/40 p-3 rounded-lg border border-border text-foreground">
                    {result.seoMeta}
                  </p>
                </GlassCard>
              </motion.div> : <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl">
                <ShoppingBag className="w-14 h-14 mb-3 text-muted-foreground/40" />
                <p className="text-base font-semibold text-foreground">No Copy Generated Yet</p>
                <p className="text-xs max-w-xs mt-1 text-muted-foreground">
                  Fill in product details and features on the left to generate e-commerce copy and SEO meta tags.
                </p>
              </GlassCard>}
          </div>
        </div>

        {/* History Panel */}
        {history.length > 0 && <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your Product Copy History ({history.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {history.map(item => <div key={item.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                  <div className="truncate max-w-[75%]">
                    <span className="font-bold text-foreground truncate block">{item.productName}</span>
                    <span className="text-[10px] text-muted-foreground">{item.timestamp} · {item.category}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                setResult(item.result);
                setProductName(item.productName);
              }} className="h-7 text-xs px-2.5 font-semibold">
                    Reload
                  </Button>
                </div>)}
            </div>
          </GlassCard>}

        </div>
<ToolHowItWorks steps={[{
          step: "01",
          title: "Enter Product Specs",
          description: "Input product title, category, and bullet point features.",
          icon: ShoppingBag
        }, {
          step: "02",
          title: "Select Copywriting Tone",
          description: "Choose between Persuasive, Luxury, Technical, or Playful.",
          icon: Sliders
        }, {
          step: "03",
          title: "Copy E-Commerce Copy",
          description: "Export formatted product listings and SEO meta tags.",
          icon: CheckCircle2
        }]} badges={["100% Free", "Shopify & Amazon Ready", "SEO Meta Tags"]} />

        <ToolFeatureGuides features={[{
          icon: ShoppingBag,
          title: "AIDA Framework Copywriting",
          description: "Structures product descriptions using Attention, Interest, Desire, and Action principles."
        }, {
          icon: Tag,
          title: "SEO Meta Description Generator",
          description: "Creates search-engine-optimized meta descriptions tailored for Google Shopping rankings."
        }, {
          icon: CheckCircle2,
          title: "Social Ad Captions",
          description: "Generates accompanying social captions for Instagram and TikTok product ads."
        }]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Boosting E-Commerce Conversion Rates</h3>
            <p>
              Well-written product descriptions address customer pain points, highlight key features, and instill purchasing confidence. Combining benefit-driven copy with SEO keyword density improves store search rankings and increases checkout conversion rates.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
          question: "Can I use these descriptions for Shopify and Amazon?",
          answer: "Yes! The output includes short bullet descriptions ideal for Amazon listings and full descriptions for Shopify storefronts."
        }, {
          question: "How long should a product description be?",
          answer: "Ideal product descriptions range from 150 to 300 words, focusing on benefits rather than purely technical specs."
        }]} />
    </div>
    </div>
);
}

export default ProductDescriptionClient;
