"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/shared/form-fields/select-field";
import { Coins, TrendingUp, DollarSign, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const ASSETS = [{
  value: "BTC",
  label: "₿ Bitcoin (BTC)"
}, {
  value: "ETH",
  label: "Ξ Ethereum (ETH)"
}, {
  value: "SOL",
  label: "◎ Solana (SOL)"
}];
export default function CryptoDcaClient() {
  const [asset, setAsset] = useState("BTC");
  const [monthlyInvest, setMonthlyInvest] = useState<number>(100);
  const [months, setMonths] = useState<number>(24);
  const [annualGrowthRate, setAnnualGrowthRate] = useState<number>(45);
  const totalInvested = monthlyInvest * months;
  const monthlyRate = annualGrowthRate / 100 / 12;

  // Future Value formula for monthly recurring investment: FV = P * [ ((1 + r)^n - 1) / r ]
  const futureValue = monthlyRate > 0 ? monthlyInvest * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : totalInvested;
  const totalProfit = futureValue - totalInvested;
  const roiPercentage = totalInvested > 0 ? (totalProfit / totalInvested * 100).toFixed(1) : "0.0";
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Coins} title="Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator" description="Calculate compound returns and projected portfolio value when dollar-cost-averaging into Bitcoin, Ethereum, and Solana." />

 <GlassCard className="p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <SelectField label="Select Crypto Asset" value={asset} onValueChange={v => setAsset(String(v || "BTC"))} options={ASSETS} />

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Monthly Investment Amount ($):</label>
 <Input type="number" value={monthlyInvest} onChange={e => setMonthlyInvest(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Duration (Months):</label>
 <Input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold text-foreground">Expected Annual Growth (%):</label>
 <Input type="number" value={annualGrowthRate} onChange={e => setAnnualGrowthRate(Number(e.target.value))} className="h-11 font-bold text-base" />
 </div>
 </div>
 </GlassCard>

 {/* Results Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <GlassCard className="p-5 space-y-2 text-center border-blue-500/30 bg-blue-500/5">
 <div className="flex justify-center text-primary">
 <DollarSign className="h-6 w-6" />
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Invested</p>
 <p className="text-3xl font-extrabold text-primary">${totalInvested.toLocaleString()}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-emerald-500/30 bg-emerald-500/5">
 <div className="flex justify-center text-emerald-500">
 <TrendingUp className="h-6 w-6" />
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portfolio Value</p>
 <p className="text-3xl font-extrabold text-emerald-500">${Math.round(futureValue).toLocaleString()}</p>
 </GlassCard>

 <GlassCard className="p-5 space-y-2 text-center border-primary/50/30 bg-purple-500/5">
 <div className="flex justify-center text-primary">
 <Coins className="h-6 w-6" />
 </div>
 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total ROI %</p>
 <p className="text-3xl font-extrabold text-primary">+{roiPercentage}%</p>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Crypto Dollar-Cost-Averaging (DCA) & Profit Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/crypto-dca" max={6} />

    </div></div>;
}