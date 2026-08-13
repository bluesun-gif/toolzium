"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { FileText, PieChart, DollarSign, Download, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type BudgetMethod ="50-30-20"|"zero-based"|"envelope"|"60-20-20";

interface BudgetCategory {
 name: string;
 amount: number;
 type:"Needs"|"Wants"|"Savings"|"Other";
}

const defaultCategories = [
"Housing","Transportation","Food","Utilities","Insurance","Savings","Entertainment","Personal","Debt"
];

export function BudgetTemplateClient() {
 const [income, setIncome] = useState<number>(3000);
 const [method, setMethod] = useState<BudgetMethod>("50-30-20");
 const [categories, setCategories] = useState<BudgetCategory[]>([]);

 const generateBudget = () => {
 let newCategories: BudgetCategory[] = [];
 
 if (method ==="50-30-20") {
 newCategories = [
 { name:"Housing (Rent/Mortgage)", amount: income * 0.25, type:"Needs"},
 { name:"Utilities", amount: income * 0.1, type:"Needs"},
 { name:"Food/Groceries", amount: income * 0.1, type:"Needs"},
 { name:"Transportation", amount: income * 0.05, type:"Needs"},
 { name:"Entertainment", amount: income * 0.1, type:"Wants"},
 { name:"Personal", amount: income * 0.1, type:"Wants"},
 { name:"Dining Out", amount: income * 0.1, type:"Wants"},
 { name:"Savings", amount: income * 0.1, type:"Savings"},
 { name:"Investments", amount: income * 0.05, type:"Savings"},
 { name:"Debt Repayment", amount: income * 0.05, type:"Savings"},
 ];
 } else if (method ==="60-20-20") {
 newCategories = [
 { name:"Housing", amount: income * 0.3, type:"Needs"},
 { name:"Utilities", amount: income * 0.1, type:"Needs"},
 { name:"Food", amount: income * 0.1, type:"Needs"},
 { name:"Transportation", amount: income * 0.1, type:"Needs"},
 { name:"Savings", amount: income * 0.2, type:"Savings"},
 { name:"Wants/Discretionary", amount: income * 0.2, type:"Wants"},
 ];
 } else if (method ==="zero-based"|| method ==="envelope") {
 const avgCategoryAmount = income / defaultCategories.length;
 newCategories = defaultCategories.map(name => ({
 name,
 amount: Math.round(avgCategoryAmount),
 type:"Other"
 }));
 }
 
 setCategories(newCategories);
 };

 useEffect(() => {
 generateBudget();
 }, [income, method]);

 const updateCategory = (index: number, newAmount: number) => {
 const updated = [...categories];
 updated[index].amount = newAmount;
 setCategories(updated);
 };

 const getBudgetText = () => {
 let text = `Monthly Budget Plan (${method.toUpperCase()})\n`;
 text += `Total Income: $${income.toFixed(2)}\n\n`;
 let totalAllocated = 0;
 categories.forEach(c => {
 text += `${c.name}: $${c.amount.toFixed(2)}\n`;
 totalAllocated += c.amount;
 });
 text += `\nTotal Allocated: $${totalAllocated.toFixed(2)}`;
 text += `\nRemaining: $${(income - totalAllocated).toFixed(2)}`;
 return text;
 };

 const exportAsText = () => {
 const blob = new Blob([getBudgetText()], { type: 'text/plain' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = 'budget-template.txt';
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Budget downloaded");
 };

 const totalAllocated = categories.reduce((sum, c) => sum + c.amount, 0);
 const remaining = income - totalAllocated;

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={DollarSign}
 title="Budget Template Generator"
 description="Generate monthly budget templates based on income and popular budgeting methods."
 actions={
 <>
 <ActionButton onClick={generateBudget} icon={RefreshCw} label="Regenerate"/>
 <CopyButton getText={getBudgetText} label="Copy"/>
 <ActionButton onClick={exportAsText} icon={Download} label="Export"/>
 </>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Configuration</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Monthly Income ($)</Label>
 <Input
 type="number"
 min={0}
 value={income}
 onChange={(e) => setIncome(Number(e.target.value) || 0)}
 />
 </div>
 <div className="space-y-2">
 <Label>Budgeting Method</Label>
 <Select value={method} onValueChange={(v: BudgetMethod) => setMethod(v)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="50-30-20">50/30/20 Rule</SelectItem>
 <SelectItem value="60-20-20">60/20/20 Rule</SelectItem>
 <SelectItem value="zero-based">Zero-based Budgeting</SelectItem>
 <SelectItem value="envelope">Envelope Method</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <Separator />
 <div className="space-y-2">
 <div className="flex justify-between font-semibold">
 <span>Total Income:</span>
 <span>${income.toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Allocated:</span>
 <span>${totalAllocated.toFixed(2)}</span>
 </div>
 <div className={cn("flex justify-between font-bold", remaining < 0 ?"text-red-500":"text-green-500")}>
 <span>Remaining:</span>
 <span>${remaining.toFixed(2)}</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Budget Allocations</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {categories.map((cat, index) => (
 <div key={index} className="flex items-center gap-4">
 <Label className="w-1/2 truncate">{cat.name}</Label>
 <Input
 type="number"
 className="w-1/2"
 value={cat.amount}
 onChange={(e) => updateCategory(index, Number(e.target.value) || 0)}
 />
 </div>
 ))}
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
          <h3>Why Use Our Budget Template Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Budget Template Generator provides
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

      <RelatedTools currentToolUrl="/tools/finance/budget-template" max={6} />

</div>
 );
}
