"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Building, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function CapRateCalculatorClient() {
 const [price, setPrice] = useState(450000);
 const [rent, setRent] = useState(3800);
 const [expenses, setExpenses] = useState(1200);
 const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const noiMonthly = rent - expenses;
 const noiAnnual = noiMonthly * 12;
 const capRate = price > 0 ? ((noiAnnual / price) * 100).toFixed(2) :"0.00";

 const auditInvestmentWithAi = async () => {
 if (!price || !rent) return;

 setLoading(true);

 try {
 const prompt = `Analyze this real estate investment property financial profile: Purchase Price: $${price}, Gross Monthly Rent: $${rent}, Monthly Operating Expenses: $${expenses}, Calculated NOI: $${noiAnnual}/yr, Calculated Cap Rate: ${capRate}%. Provide 4 bullet points analyzing return quality, risk factors, 1% rule compliance, and cash flow improvement strategies. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"prose"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setAiAnalysis(data.results);
 toast.success("AI Real Estate Investment audit complete!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI audit failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 return (
      <div className="relative space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern />

 <ToolPageHeader
 icon={Building}
 title="AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor"
 description="Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Property Purchase Price ($):</label>
 <Input
 type="number"
 value={price}
 onChange={(e) => setPrice(Number(e.target.value))}
 className="h-11 font-bold"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Gross Monthly Rental Income ($):</label>
 <Input
 type="number"
 value={rent}
 onChange={(e) => setRent(Number(e.target.value))}
 className="h-11 font-bold"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Monthly Operating Expenses ($):</label>
 <Input
 type="number"
 value={expenses}
 onChange={(e) => setExpenses(Number(e.target.value))}
 className="h-11 font-bold"
 />
 </div>
 </div>

 {/* Calculated Stats Grid */}
 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
 <div className="p-4 rounded-xl bg-background/80 border text-center">
 <span className="text-xs text-muted-foreground block font-medium">Monthly NOI</span>
 <span className="text-lg font-black text-emerald-400">${noiMonthly.toLocaleString()}</span>
 </div>

 <div className="p-4 rounded-xl bg-background/80 border text-center">
 <span className="text-xs text-muted-foreground block font-medium">Annual NOI</span>
 <span className="text-lg font-black text-emerald-400">${noiAnnual.toLocaleString()}</span>
 </div>

 <div className="p-4 rounded-xl bg-background/80 border text-center col-span-2 md:col-span-1">
 <span className="text-xs text-muted-foreground block font-medium">Capitalization Rate</span>
 <span className="text-2xl font-black text-cyan-400">{capRate}%</span>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={auditInvestmentWithAi}
 disabled={loading}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Auditing Investment...":"AI Real Estate Risk & Return Audit"}
 </Button>
 </div>
 </GlassCard>

 {/* AI Analysis */}
 {aiAnalysis.length > 0 && (
 <AiOutputDisplay
 title="AI Real Estate Investment Analysis & Risk Rating"
 subtitle="Cap rate benchmark rating and property yield optimization tips"
 content={aiAnalysis}
 loading={loading}
 onRegenerate={auditInvestmentWithAi}
 variant="prose"
 />
 )}
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/cap-rate-calculator" max={6} />

</div>
 );
}
