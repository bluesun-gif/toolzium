"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Label } from"@/components/ui/label";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { DollarSign, Calculator, PieChart, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function Budget503020Client() {
 const [income, setIncome] = useState("4000");
 const [frequency, setFrequency] = useState("Monthly");

 const handleReset = () => {
 setIncome("4000");
 setFrequency("Monthly");
 };

 const calculateBudget = () => {
 const amt = parseFloat(income);
 if (isNaN(amt) || amt <= 0) return { monthly: 0, needs: 0, wants: 0, savings: 0 };

 let monthlyIncome = amt;
 if (frequency ==="Weekly") monthlyIncome = amt * 52 / 12;
 if (frequency ==="Bi-Weekly") monthlyIncome = amt * 26 / 12;
 if (frequency ==="Annually") monthlyIncome = amt / 12;

 return {
 monthly: monthlyIncome,
 needs: monthlyIncome * 0.5,
 wants: monthlyIncome * 0.3,
 savings: monthlyIncome * 0.2
 };
 };

 const formatCurrency = (val: number) => {
 return"$"+ val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 };

 const results = calculateBudget();

 const getCopyText = () => {
 return"Budget Plan (Monthly):\n"+
"Total Income:"+ formatCurrency(results.monthly) +"\n"+
"Needs (50%):"+ formatCurrency(results.needs) +"\n"+
"Wants (30%):"+ formatCurrency(results.wants) +"\n"+
"Savings/Debt (20%):"+ formatCurrency(results.savings);
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Calculator}
 title="50/30/20 Rule Budget Allocator"
 description="Calculate income allocation using the 50/30/20 budgeting rule for needs, wants, and savings."
 actions={
 <ResetButton onClick={handleReset} label="Clear Data"/>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Income Info</CardTitle>
 <CardDescription>Enter your after-tax take-home pay.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>After-Tax Income</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
 <Input type="number"className="pl-10"value={income} onChange={(e) => setIncome(e.target.value)} min="0"/>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Pay Frequency</Label>
 <Select value={frequency} onValueChange={setFrequency}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Weekly">Weekly</SelectItem>
 <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
 <SelectItem value="Monthly">Monthly</SelectItem>
 <SelectItem value="Annually">Annually</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center justify-between">
 <span>Monthly Allocation</span>
 <CopyButton getText={getCopyText} label="Copy Plan"/>
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
 <h4 className="text-primary font-semibold mb-1">Needs (50%)</h4>
 <p className="text-2xl font-bold">{formatCurrency(results.needs)}</p>
 <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
 <li>Housing / Rent</li>
 <li>Utilities</li>
 <li>Groceries</li>
 <li>Insurance</li>
 </ul>
 </div>
 
 <div className="bg-purple-500/10 border border-primary/50/20 p-4 rounded-xl">
 <h4 className="text-primary font-semibold mb-1">Wants (30%)</h4>
 <p className="text-2xl font-bold">{formatCurrency(results.wants)}</p>
 <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
 <li>Dining Out</li>
 <li>Entertainment</li>
 <li>Shopping</li>
 <li>Hobbies</li>
 </ul>
 </div>

 <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
 <h4 className="text-green-600 font-semibold mb-1">Savings (20%)</h4>
 <p className="text-2xl font-bold">{formatCurrency(results.savings)}</p>
 <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
 <li>Emergency Fund</li>
 <li>Retirement</li>
 <li>Investments</li>
 <li>Debt Payoff</li>
 </ul>
 </div>
 </div>

 <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
 <div className="bg-blue-500 h-full"style={{ width:"50%"}}></div>
 <div className="bg-purple-500 h-full"style={{ width:"30%"}}></div>
 <div className="bg-green-500 h-full"style={{ width:"20%"}}></div>
 </div>
 <div className="flex justify-between text-xs text-muted-foreground mt-2">
 <span>Total Monthly Income: {formatCurrency(results.monthly)}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our 50/30/20 Rule Budget Allocator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our 50/30/20 Rule Budget Allocator provides
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

      <RelatedTools currentToolUrl="/tools/finance/budget-50-30-20" max={6} />

</div>
 );
}
