"use client";

import { ModelSelector } from "@/components/shared/model-selector";
import { Switch } from "@/components/ui/switch";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Copy, ListChecks, Package, RefreshCw, ShoppingBag, Wand2, Type } from "lucide-react";
import toast from"react-hot-toast";

export default function EcommerceCopyGeneratorClient() {
  const [product, setProduct] = useState("Wireless Noise-Canceling Ergonomic Headphones");
  const [model, setModel] = useState("gpt4o");
  const [features, setFeatures] = useState("40-hour battery life, active noise cancellation, memory foam ear cups, Bluetooth 5.3");
  const [audience, setAudience] = useState("Remote workers, frequent travelers, audio enthusiasts");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateCopy = async () => {
    if (!product.trim()) return;
    setLoading(true);
    try {
      const prompt = `Write 3 high-converting Shopify & Amazon e-commerce product descriptions for '${product}'. Features: '${features}'. Target Audience: '${audience}'. Include SEO product title, emotional benefit hook, 5 key bullet points, and urgency CTA. Format as 3 distinct product listing cards. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "cards"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI E-commerce copy generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={ShoppingBag} title="Shopify & Amazon Product Listing AI Copy Generator" description="Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Product Name / Title:</label>
 <Input type="text" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. Stainless Steel Insulated Water Bottle" className="h-11" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Key Features & Specs:</label>
 <Input type="text" value={features} onChange={e => setFeatures(e.target.value)} placeholder="e.g. 24hr cold, leakproof lid, BPA free" className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Customer:</label>
 <Input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Gym goers, hikers, office workers" className="h-11" />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generateCopy} disabled={loading || !product} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Writing Copy..." : "AI Generate Product Copy"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated E-Commerce Product Listings"
 subtitle="Ready to paste directly into Shopify, Amazon, or Etsy"
 content={results}
 loading={loading}
 onRegenerate={generateCopy}
 variant="cards"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Describe Product",
    description:"Enter the product name and key selling points.",
    icon: Package,
  },
{
    step:"02",
    title:"Choose Tone",
    description:"Pick persuasive, luxury, or friendly copy style.",
    icon: Wand2,
  },
{
    step:"03",
    title:"Generate & Copy",
    description:"Get titles, bullets, and descriptions to use.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Package,
    title:"Product Focused",
    description:"Generates copy centered on benefits, not just features.",
  },
{
    icon: Wand2,
    title:"Tone Options",
    description:"Switch between styles for different audiences.",
  },
{
    icon: ListChecks,
    title:"Bullets & Titles",
    description:"Produces scannable bullet points and SEO titles.",
  },
{
    icon: Copy,
    title:"Ready to Paste",
    description:"Copy the copy straight into your store.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>E-commerce lives and dies by its copy. Shoppers cannot touch your product, so the words carry the weight of persuasion. This generator helps store owners move from bland feature lists to benefit-driven copy that actually sells.</p>
  <p>Lead with the customer, not the spec sheet. A bullet that says 'sleeps cooler' beats 'gel-infused memory foam' because it answers the buyer's real question: what is in it for me? Map each feature to a benefit — weight to portability, warranty to peace of mind, material to comfort — and the copy starts selling itself.</p>
  <p>Tone aligns with audience. A luxury skincare brand needs restrained, sensory language, while a budget electronics store benefits from energetic, value-forward phrasing. The generator lets you switch tones so the same product reads appropriately across market segments. Consistency between tone and brand builds trust.</p>
  <p>Structure aids conversion. Shoppers scan, so lead with a strong title, follow with a one-line hook, then bullets for quick scanning, and a short paragraph for detail. Include variants, sizes, and use cases to pre-empt returns and questions. Generate a few versions and A/B test them; small wording changes often produce measurable lifts. Use the copy directly in your listing, confident it is both readable and search-friendly.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What makes good product copy?",
    answer:"Strong copy leads with the customer's benefit, uses clear language, and answers objections before they arise.",
  },
{
    question:"Should I write for SEO or readers?",
    answer:"Both. Natural keywords in readable copy rank better than stuffed text.",
  },
{
    question:"How long should a description be?",
    answer:"Long enough to convey value and variants; 100-300 words works for most products.",
  },
{
    question:"Can I regenerate for A/B tests?",
    answer:"Yes. Generate multiple versions and test which converts better.",
  },
{
    question:"Does tone affect sales?",
    answer:"Yes. Luxury shoppers respond to different language than bargain hunters.",
  }
  ]}
/>
    </div>
    </div>
);
}
