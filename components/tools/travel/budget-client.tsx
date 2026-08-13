"use client";

import { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { Wallet, Plane, Calculator, PieChart, Save, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Expenses = {
 flights: number;
 accommodation: number;
 food: number;
 transport: number;
 activities: number;
 shopping: number;
 insurance: number;
 misc: number;
};

const CATEGORY_COLORS: Record<keyof Expenses, string> = {
 flights:"#ef4444",
 accommodation:"#3b82f6",
 food:"#10b981",
 transport:"#f59e0b",
 activities:"#8b5cf6",
 shopping:"#ec4899",
 insurance:"#64748b",
 misc:"#06b6d4"
};

const DEFAULT_EXPENSES: Expenses = {
 flights: 0,
 accommodation: 0,
 food: 0,
 transport: 0,
 activities: 0,
 shopping: 0,
 insurance: 0,
 misc: 0,
};

export function TravelBudgetClient() {
 const [expenses, setExpenses] = useState<Expenses>(DEFAULT_EXPENSES);
 const [days, setDays] = useState(1);
 const [travelers, setTravelers] = useState(1);

 useEffect(() => {
 const saved = localStorage.getItem("travel-budget");
 if (saved) {
 try {
 const data = JSON.parse(saved);
 setExpenses(data.expenses || DEFAULT_EXPENSES);
 setDays(data.days || 1);
 setTravelers(data.travelers || 1);
 } catch (e) {}
 }
 }, []);

 const handleExpenseChange = (cat: keyof Expenses, value: string) => {
 const num = parseFloat(value) || 0;
 setExpenses(prev => ({ ...prev, [cat]: num }));
 };

 const total = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
 const daily = days > 0 ? total / days : 0;
 const perPerson = travelers > 0 ? total / travelers : 0;

 const saveBudget = () => {
 localStorage.setItem("travel-budget", JSON.stringify({ expenses, days, travelers }));
 toast.success("Budget saved!");
 };

 const reset = () => {
 setExpenses(DEFAULT_EXPENSES);
 setDays(1);
 setTravelers(1);
 };

 const generateReport = () => {
 let report = `TRAVEL BUDGET REPORT\n`;
 report += `Duration: ${days} days\n`;
 report += `Travelers: ${travelers}\n\n`;
 report += `BREAKDOWN:\n`;
 (Object.keys(expenses) as Array<keyof Expenses>).forEach(k => {
 report += `- ${k.charAt(0).toUpperCase() + k.slice(1)}: $${expenses[k].toFixed(2)}\n`;
 });
 report += `\nTOTAL: $${total.toFixed(2)}\n`;
 report += `Daily Budget: $${daily.toFixed(2)}\n`;
 report += `Per Person: $${perPerson.toFixed(2)}\n`;
 return report;
 };

 const pieGradient = useMemo(() => {
 if (total === 0) return"conic-gradient(#e2e8f0 0 100%)";
 let gradient = [];
 let currentPercent = 0;
 for (const [key, value] of Object.entries(expenses)) {
 if (value > 0) {
 const percent = (value / total) * 100;
 gradient.push(`${CATEGORY_COLORS[key as keyof Expenses]} ${currentPercent}% ${currentPercent + percent}%`);
 currentPercent += percent;
 }
 }
 return `conic-gradient(${gradient.join(",")})`;
 }, [expenses, total]);

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Wallet}
 title="Travel Budget Planner"
 description="Plan travel budget with expense categories, daily breakdown, and per-person cost."
 actions={
 <>
 <ActionButton onClick={saveBudget} icon={Save} label="Save"/>
 <CopyButton getText={generateReport} label="Copy Report"/>
 <ResetButton onClick={reset} label="Reset"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Plane className="w-5 h-5"/> Trip Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <Label>Duration (Days)</Label>
 <Input type="number"min={1} value={days ||""} onChange={e => setDays(parseInt(e.target.value) || 1)} />
 </div>
 <div>
 <Label>Travelers</Label>
 <Input type="number"min={1} value={travelers ||""} onChange={e => setTravelers(parseInt(e.target.value) || 1)} />
 </div>
 </div>
 <Separator />
 <div className="space-y-3">
 {(Object.keys(expenses) as Array<keyof Expenses>).map(cat => (
 <div key={cat} className="grid grid-cols-2 items-center gap-4">
 <Label className="capitalize flex items-center gap-2">
 <span className="w-3 h-3 rounded-full"style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
 {cat}
 </Label>
 <div className="relative">
 <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">$</span>
 <Input 
 type="number"
 min={0}
 className="pl-7"
 value={expenses[cat] ||""} 
 onChange={e => handleExpenseChange(cat, e.target.value)} 
 />
 </div>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5"/> Summary</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 gap-4 mb-6 text-center">
 <div className="p-4 bg-primary/10 rounded-lg col-span-2">
 <p className="text-sm text-muted-foreground">Total Budget</p>
 <p className="text-3xl font-bold text-primary">${total.toFixed(2)}</p>
 </div>
 <div className="p-4 bg-secondary/30 rounded-lg">
 <p className="text-sm text-muted-foreground">Daily Cost</p>
 <p className="text-xl font-semibold">${daily.toFixed(2)}</p>
 </div>
 <div className="p-4 bg-secondary/30 rounded-lg">
 <p className="text-sm text-muted-foreground">Per Person</p>
 <p className="text-xl font-semibold">${perPerson.toFixed(2)}</p>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><PieChart className="w-5 h-5"/> Distribution</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center">
 <div 
 className="w-48 h-48 rounded-full shadow-inner mb-6 transition-all duration-500"
 style={{ background: pieGradient }}
 />
 <div className="flex flex-wrap justify-center gap-3">
 {(Object.entries(expenses) as [keyof Expenses, number][]).map(([k, v]) => v > 0 && (
 <div key={k} className="flex items-center gap-1 text-xs text-muted-foreground">
 <span className="w-2 h-2 rounded-full"style={{ backgroundColor: CATEGORY_COLORS[k] }} />
 <span className="capitalize">{k} ({Math.round((v/total)*100)}%)</span>
 </div>
 ))}
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
          <h3>Why Use Our Travel Budget Planner?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Budget Planner provides
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

      <RelatedTools currentToolUrl="/tools/travel/budget" max={6} />

</div>
 );
}
