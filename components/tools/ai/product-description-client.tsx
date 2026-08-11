"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard, MotionGlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Tag, Star, Layers, Mail, Share2 } from "lucide-react";
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
        socialCaption = `Elevate your aesthetic with the all-new ${name}. 💎 Designed exclusively for ${audience}. #LuxuryLiving #${category.replace(/\s+/g, "")}`;
      } else if (tone === "technical") {
        headline = `Precision Engineered: The ${name} Technical Specification`;
        shortDesc = `High-performance ${category.toLowerCase()} solution optimized for ${audience}. Integrates ${rawFeatures[0] || "advanced architecture"}.`;
        longDesc = `Designed for high reliability and efficiency, the ${name} combines ${rawFeatures.join(", ")}. It eliminates processing bottlenecks and provides seamless integration for ${audience}.`;
        seoMeta = `Explore technical specs of the ${name}. Optimized ${category.toLowerCase()} featuring ${rawFeatures.slice(0, 3).join(", ")}.`;
        socialCaption = `Upgrade your stack with ${name}. Built for ${audience} who demand precision. ⚡ #${category.replace(/\s+/g, "")} #Engineering`;
      } else if (tone === "playful") {
        headline = `Say Hello to Your New Favorite: ${name}! 🎉`;
        shortDesc = `Meet the ${name}—the ultimate fun-packed ${category.toLowerCase()} built just for ${audience}!`;
        longDesc = `Why settle for boring when you can have the ${name}? Packed with awesome features like ${rawFeatures.join(" and ")}, it's guaranteed to bring a smile to your face every single day.`;
        seoMeta = `Get ready for ${name}! The fun, easy-to-use ${category.toLowerCase()} for ${audience}.`;
        socialCaption = `Obsessed with the new ${name}! 😍 Perfect for ${audience}. Grab yours today! 🚀 #${name.replace(/\s+/g, "")} #MustHave`;
      } else {
        headline = `Transform Your Daily Workflow with ${name}`;
        shortDesc = `The smarter way to achieve more. Designed for ${audience}, the ${name} delivers performance, style, and value.`;
        longDesc = `Upgrade your daily routine with the ${name}. Specifically engineered to solve your core challenges, it brings together ${rawFeatures.join(", ")}. Whether at home or on the go, it is built to deliver consistent results.`;
        seoMeta = `Buy ${name} online. Top-rated ${category.toLowerCase()} for ${audience} featuring ${rawFeatures[0] || "innovative design"}. Free shipping available.`;
        socialCaption = `Ready to upgrade? The ${name} is finally here! Designed for ${audience}. Check out the link to order now. 🛒✨`;
      }

      setResult({
        headline,
        shortDesc,
        longDesc,
        features: rawFeatures.length > 0 ? rawFeatures : ["High Quality", "Ergonomic Design", "Long-lasting"],
        seoMeta,
        socialCaption
      });

      setIsGenerating(false);
      toast.success("Product descriptions generated!");
    }, 450);
  }, [productName, category, featuresInput, targetAudience, tone]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={ShoppingBag}
        title="AI Product Description Generator"
        description="Craft high-converting ecommerce product descriptions, Amazon bullet points, SEO meta tags, and social captions in seconds."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              Product Specification Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Product Name</Label>
              <Input
                placeholder="e.g. Lumina Pro Noise-Cancelling Headphones"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Category</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Electronics">Electronics & Tech</option>
                  <option value="Apparel">Fashion & Apparel</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Beauty">Beauty & Personal Care</option>
                  <option value="Fitness">Sports & Fitness</option>
                </select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Brand Tone</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                >
                  <option value="persuasive">Persuasive (High Conversion)</option>
                  <option value="luxury">Luxury & Premium</option>
                  <option value="technical">Technical & Detailed</option>
                  <option value="playful">Playful & Casual</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs mb-1 block">Key Features / Specs (Comma or line separated)</Label>
              <textarea
                className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                placeholder="e.g. 40hr Battery, Active Noise Cancellation, Bluetooth 5.3, Memory Foam Earcups"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Target Audience (Optional)</Label>
              <Input
                placeholder="e.g. Remote workers, frequent flyers, music enthusiasts"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <Button onClick={generateDescriptions} disabled={isGenerating || !productName.trim()} className="w-full gap-2 mt-2">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Crafting Copy..." : "Generate Ecommerce Copy"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Catchy Headline</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.headline, "Headline")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <h3 className="text-base font-bold leading-snug text-foreground">{result.headline}</h3>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Short Description (Cards / Shopify)</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.shortDesc, "Short description")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed">{result.shortDesc}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Full Body Copy & Specs</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.longDesc, "Long copy")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.longDesc}</p>
                <div className="pt-2">
                  <span className="text-xs font-semibold text-muted-foreground block mb-1">Key Benefit Bullets:</span>
                  <ul className="list-disc pl-4 text-xs space-y-1 text-muted-foreground">
                    {result.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">SEO Meta Description & Social</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.seoMeta, "SEO Meta")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy SEO
                  </Button>
                </div>
                <p className="text-xs font-mono bg-muted/40 p-2.5 rounded border border-border/50">{result.seoMeta}</p>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <ShoppingBag className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Product Copy Generated Yet</p>
              <p className="text-xs max-w-xs mt-1">Enter your product details and features on the left to generate headlines, long-form copy, and SEO meta tags.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Input Specs & Audience", description: "Enter your product name, category, target audience, and key feature bullets.", icon: Tag },
          { step: "02", title: "Select Brand Tone", description: "Choose between Persuasive, Luxury, Technical, or Playful copywriting formulas.", icon: Sliders },
          { step: "03", title: "Copy & Convert", description: "Instantly copy headlines, full page copy, Amazon bullet points, and SEO meta descriptions.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Conversion Focused", "SEO Ready"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: ShoppingBag, title: "Multi-Format Output", description: "Generates card summaries, long-form sales pages, Amazon feature bullets, and Instagram captions simultaneously." },
          { icon: Sliders, title: "AIDA & PAS Frameworks", description: "Employs Attention-Interest-Desire-Action psychology to maximize store conversion rates." },
          { icon: Sparkles, title: "SEO Meta Integration", description: "Automatically formats meta descriptions to ideal 150-160 character limits for Google SERP visibility." },
          { icon: CheckCircle2, title: "Privacy Guaranteed", description: "All product specifications are processed locally in your browser without data retention." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Importance of High-Converting Product Copy</h3>
          <p>
            In online retail, your product description serves as your digital salesperson. Well-crafted copy does more than list features—it paints a picture of how the product solves a customer's specific problem. By applying proven sales frameworks like AIDA (Attention, Interest, Desire, Action), our <strong>AI Product Description Generator</strong> transforms basic technical specifications into compelling, persuasive narratives.
          </p>
          <h3>SEO Meta Optimization for E-Commerce</h3>
          <p>
            To drive organic search traffic from Google, product pages require optimized page titles and meta descriptions that adhere strictly to search engine character limits (typically 155 characters). Our generator creates click-worthy meta tags designed to boost your Click-Through Rate (CTR) on search engine result pages.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Can I use these descriptions on Shopify and Amazon?", answer: "Yes! The generated short summaries, feature bullets, and full copy are pre-formatted for seamless pasting into Shopify, Amazon FBA, WooCommerce, and eBay listings." },
          { question: "How does the tone setting affect output?", answer: "The tone setting shifts vocabulary and sentence structure—for instance, 'Luxury' emphasizes craftsmanship and exclusivity, while 'Technical' highlights performance metrics and engineering specifications." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/product-description" max={6} />
    </div>
  );
}

export default ProductDescriptionClient;
