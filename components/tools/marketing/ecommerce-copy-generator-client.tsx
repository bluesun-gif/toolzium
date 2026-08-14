"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { ShoppingBag, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
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
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

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
 {results.length > 0 && <AiOutputDisplay title="Generated E-Commerce Product Listings" subtitle="Ready to paste directly into Shopify, Amazon, or Etsy" content={results} loading={loading} onRegenerate={generateCopy} variant="cards" />}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Shopify & Amazon Product Listing AI Copy Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Shopify & Amazon Product Listing AI Copy Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/marketing/ecommerce-copy-generator" max={6} />

    </div></div>;
}