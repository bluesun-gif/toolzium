"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { ShoppingBag, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

export default function EcommerceCopyGeneratorClient() {
 const [product, setProduct] = useState("Wireless Noise-Canceling Ergonomic Headphones");
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
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
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
 <div className="space-y-6 max-w-4xl mx-auto px-4">
 <ToolPageHeader
 icon={ShoppingBag}
 title="Shopify & Amazon Product Listing AI Copy Generator"
 description="Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Product Name / Title:</label>
 <Input
 type="text"
 value={product}
 onChange={(e) => setProduct(e.target.value)}
 placeholder="e.g. Stainless Steel Insulated Water Bottle"
 className="h-11"
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Key Features & Specs:</label>
 <Input
 type="text"
 value={features}
 onChange={(e) => setFeatures(e.target.value)}
 placeholder="e.g. 24hr cold, leakproof lid, BPA free"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Customer:</label>
 <Input
 type="text"
 value={audience}
 onChange={(e) => setAudience(e.target.value)}
 placeholder="e.g. Gym goers, hikers, office workers"
 className="h-11"
 />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateCopy}
 disabled={loading || !product}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Writing Copy...":"AI Generate Product Copy"}
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
 </div>
 );
}
