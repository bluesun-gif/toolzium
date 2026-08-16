"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { DollarSign, Download, FileText, ListChecks, PieChart, RefreshCw, Sparkles } from"lucide-react";
import toast from"react-hot-toast";

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
 <div className="space-y-6">
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
    step:"01",
    title:"Pick a Style",
    description:"Choose monthly, zero-based, or category template.",
    icon: FileText,
  },
{
    step:"02",
    title:"Customize",
    description:"Add your own income and expense lines.",
    icon: ListChecks,
  },
{
    step:"03",
    title:"Export",
    description:"Download or copy the finished budget.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Multiple Formats",
    description:"Monthly, weekly, and zero-based templates included.",
  },
{
    icon: ListChecks,
    title:"Editable Lines",
    description:"Add categories specific to your life.",
  },
{
    icon: Download,
    title:"Portable Output",
    description:"Copy to sheets or download for offline use.",
  },
{
    icon: Sparkles,
    title:"Smart Defaults",
    description:"Pre-filled common categories to start fast.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A budget template removes the blank-page paralysis that stops most people from planning. Instead of building a system from scratch, you start from a proven structure and adapt it. This generator offers monthly, weekly, and zero-based styles so the format matches how you think about money.</p>
  <p>Zero-based budgeting assigns every dollar a purpose, so income minus allocations equals zero. It is powerful for gaining control but demands discipline. The monthly template is gentler, grouping spending into broad categories with target amounts. Weekly templates suit anyone paid weekly or managing tight cash flow who needs shorter cycles.</p>
  <p>Customization is where templates become yours. Add lines for your real expenses — childcare, a side hustle, a specific debt — so the plan reflects life instead of a generic list. Smart defaults pre-fill rent, groceries, and transport, giving you a working draft in seconds that you refine rather than author.</p>
  <p>Portability matters more than features. A template you can copy into a spreadsheet or print and tape to the fridge gets used; a clever app you forget loses. Export the result and review it weekly at first, then monthly once habits form. The goal is not a perfect document but a living plan that nudges better decisions. Start simple, stay consistent, and let the template evolve with your finances.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is zero-based budgeting?",
    answer:"Every dollar is assigned a job so income minus allocated equals zero, maximizing intentionality.",
  },
{
    question:"Should I budget weekly or monthly?",
    answer:"Monthly suits stable income; weekly helps those paid weekly or with variable cash flow.",
  },
{
    question:"How detailed should categories be?",
    answer:"Enough to act on, not so many that tracking becomes a chore you quit.",
  },
{
    question:"Can I use this for business?",
    answer:"The structure works for simple freelancer finances, but separate business accounting is wiser.",
  },
{
    question:"Do I need an app?",
    answer:"No. A clear template you actually use beats a fancy app you ignore.",
  }
  ]}
/>
</div>
 );
}
