"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Flame, TrendingUp, DollarSign, Copy, Sparkles, Shield, Zap } from"lucide-react";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function FireCalcClient() {
 const [currentAge, setCurrentAge] = useState(30);
 const [netWorth, setNetWorth] = useState(50000);
 const [annualIncome, setAnnualIncome] = useState(80000);
 const [annualExpenses, setAnnualExpenses] = useState(40000);
 const [returnRate, setReturnRate] = useState(7);
 const [withdrawalRate, setWithdrawalRate] = useState(4);

 const annualSavings = annualIncome - annualExpenses;
 const fireNumber = annualExpenses / (withdrawalRate / 100);
 
 let yearsToFire = 0;
 let currentNW = netWorth;
 
 if (annualSavings > 0) {
 while (currentNW < fireNumber && yearsToFire < 100) {
 currentNW = currentNW * (1 + returnRate / 100) + annualSavings;
 yearsToFire++;
 }
 } else if (currentNW >= fireNumber) {
 yearsToFire = 0;
 } else {
 yearsToFire = -1; // Never
 }

 const fireAge = currentAge + yearsToFire;

 const summaryText ="FIRE Number: $"+ fireNumber.toFixed(0) +"\nYears to FIRE:"+ (yearsToFire >= 0 ? yearsToFire :"Never") +"\nFIRE Age:"+ (yearsToFire >= 0 ? fireAge :"N/A");

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Flame}
 title="FIRE Calculator"
 description="Calculate your Financial Independence and Retire Early (FIRE) metrics."
 actions={
 <React.Fragment>
 <ResetButton onClick={() => {
 setCurrentAge(30); setNetWorth(50000); setAnnualIncome(80000); setAnnualExpenses(40000); setReturnRate(7); setWithdrawalRate(4);
 }} label="Reset"/>
 </React.Fragment>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Your Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Current Age</Label>
 <Input type="number"value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Current Net Worth ($)</Label>
 <Input type="number"value={netWorth} onChange={(e) => setNetWorth(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Income ($)</Label>
 <Input type="number"value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Annual Expenses ($)</Label>
 <Input type="number"value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Investment Return (%)</Label>
 <Input type="number"value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Withdrawal Rate (%)</Label>
 <Input type="number"value={withdrawalRate} onChange={(e) => setWithdrawalRate(Number(e.target.value))} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>FIRE Projection</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <p className="text-sm text-muted-foreground">Your FIRE Number</p>
 <p className="text-4xl font-bold text-primary">${fireNumber.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
 </div>
 
 <Separator />
 
 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-sm text-muted-foreground">Years to FIRE</p>
 <p className="text-2xl font-semibold">{yearsToFire >= 0 ? yearsToFire :"Never"}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">FIRE Age</p>
 <p className="text-2xl font-semibold">{yearsToFire >= 0 ? fireAge :"N/A"}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Annual Savings</p>
 <p className="text-2xl font-semibold">${annualSavings.toLocaleString()}</p>
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Savings Rate</p>
 <p className="text-2xl font-semibold">{((annualSavings/annualIncome)*100).toFixed(1)}%</p>
 </div>
 </div>

 <div className="flex justify-end pt-4">
 <CopyButton getText={() => summaryText} label="Copy Summary"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
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
          <h3>Why Use Our FIRE Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our FIRE Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/fire-calc" max={6} />

</div>
 );
}
