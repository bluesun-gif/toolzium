"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { DollarSign, RefreshCw } from"lucide-react";
import toast from"react-hot-toast";

export default function SaasPricingCalculatorClient() {
 const [productName, setProductName] = useState("FlowPulse API Monitor");
 const [targetCustomer, setTargetCustomer] = useState("DevOps Teams & Mid-Market Engineering Depts");
 const [valueMetric, setValueMetric] = useState("API Endpoints Monitored & Alert Channels");
 const [results, setResults] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generatePricing = async () => {
 if (!productName.trim()) return;

 setLoading(true);

 try {
 const prompt = `Design a 3-tier SaaS pricing strategy (Starter, Pro, Enterprise) for '${productName}'. Target Customer: '${targetCustomer}'. Core Value Metric: '${valueMetric}'. Include monthly/annual price points, featured limits, add-ons, and revenue optimization recommendations. Format as 3 distinct pricing tier cards. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setResults(data.results);
 toast.success("AI SaaS Pricing model generated!");
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
 icon={DollarSign}
 title="AI SaaS Pricing Strategy & Tier Matrix Calculator"
 description="Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">SaaS Product Name:</label>
 <Input
 type="text"
 value={productName}
 onChange={(e) => setProductName(e.target.value)}
 placeholder="e.g. MetricTrack AI"
 className="h-11"
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Customer Segment:</label>
 <Input
 type="text"
 value={targetCustomer}
 onChange={(e) => setTargetCustomer(e.target.value)}
 placeholder="e.g. Solopreneurs, SMBs, Enterprises"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Primary Value Metric (Scaling Axis):</label>
 <Input
 type="text"
 value={valueMetric}
 onChange={(e) => setValueMetric(e.target.value)}
 placeholder="e.g. Monthly Active Users, Storage GB"
 className="h-11"
 />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generatePricing}
 disabled={loading || !productName}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Modeling Tiers...":"AI Generate SaaS Pricing Strategy"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated 3-Tier SaaS Pricing Architecture"
 subtitle="Tier limits, feature gating, and expansion revenue levers"
 content={results}
 loading={loading}
 onRegenerate={generatePricing}
 variant="cards"
 />
 )}
 </div>
 );
}
