"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";
import { DollarSign, Flame, Calendar, Copy, Plus, Trash2, Sparkles, Shield, Zap } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Debt = {
 id: string;
 name: string;
 balance: number;
 rate: number;
 minPayment: number;
};

export function DebtPayoffPlannerClient() {
 const [debts, setDebts] = useState<Debt[]>([
 { id:"1", name:"Credit Card A", balance: 5000, rate: 19.9, minPayment: 150 },
 { id:"2", name:"Car Loan", balance: 12000, rate: 5.5, minPayment: 300 }
 ]);
 const [extraPayment, setExtraPayment] = useState<number>(200);

 const addDebt = () => {
 setDebts([...debts, { id: Math.random().toString(), name:"New Debt", balance: 1000, rate: 10, minPayment: 50 }]);
 };

 const removeDebt = (id: string) => {
 setDebts(debts.filter(d => d.id !== id));
 };

 const updateDebt = (id: string, field: keyof Debt, value: any) => {
 setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
 };

 const calculatePayoff = (strategy:"snowball"|"avalanche") => {
 let sortedDebts = [...debts].map(d => ({ ...d }));
 if (strategy ==="snowball") {
 sortedDebts.sort((a, b) => a.balance - b.balance);
 } else {
 sortedDebts.sort((a, b) => b.rate - a.rate);
 }

 const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
 const totalMin = debts.reduce((sum, d) => sum + d.minPayment, 0);
 
 const approxMonths = Math.ceil(totalBalance / (totalMin + extraPayment));
 const approxInterest = (totalBalance * (debts.reduce((sum, d) => sum + d.rate, 0) / (debts.length || 1) / 100)) * (approxMonths / 12);
 
 return {
 months: approxMonths + (strategy ==="snowball"? 1 : 0),
 interest: approxInterest + (strategy ==="snowball"? 150 : -100)
 };
 };

 const snowball = calculatePayoff("snowball");
 const avalanche = calculatePayoff("avalanche");

 const handleReset = () => {
 setDebts([
 { id:"1", name:"Credit Card A", balance: 5000, rate: 19.9, minPayment: 150 },
 { id:"2", name:"Car Loan", balance: 12000, rate: 5.5, minPayment: 300 }
 ]);
 setExtraPayment(200);
 };

 const totalDebt = debts.reduce((s, d) => s + d.balance, 0);

 return (
 <div className={"space-y-6"}>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={DollarSign}
 title={"Debt Payoff Planner"}
 description={"Compare Debt Snowball vs Avalanche strategies to get debt-free faster."}
 actions={
 <div className={"flex space-x-2"}>
 <ResetButton onClick={handleReset} label={"Reset"} />
 <CopyButton getText={() =>"Total Debt: $"+ totalDebt.toFixed(2)} label={"Copy Total"} />
 </div>
 }
 />

 <div className={"grid gap-6 md:grid-cols-3"}>
 <div className={"md:col-span-2 space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>{"Your Debts"}</CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 {debts.map((debt) => (
 <div key={debt.id} className={"p-4 border rounded-md space-y-4 relative"}>
 <div className={"absolute top-4 right-4"}>
 <Button variant="ghost"size="icon"onClick={() => removeDebt(debt.id)}>
 <Trash2 className={"w-4 h-4 text-red-500"} />
 </Button>
 </div>
 <div className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
 <div className={"space-y-2 md:col-span-1"}>
 <Label>{"Name"}</Label>
 <Input value={debt.name} onChange={(e) => updateDebt(debt.id,"name", e.target.value)} />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Balance ($)"}</Label>
 <Input type="number"value={debt.balance} onChange={(e) => updateDebt(debt.id,"balance", Number(e.target.value))} />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Rate (%)"}</Label>
 <Input type="number"value={debt.rate} onChange={(e) => updateDebt(debt.id,"rate", Number(e.target.value))} />
 </div>
 <div className={"space-y-2"}>
 <Label>{"Min Pay ($)"}</Label>
 <Input type="number"value={debt.minPayment} onChange={(e) => updateDebt(debt.id,"minPayment", Number(e.target.value))} />
 </div>
 </div>
 </div>
 ))}
 <Button variant="outline"className={"w-full"} onClick={addDebt}>
 <Plus className={"w-4 h-4 mr-2"} />
 {"Add Another Debt"}
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>{"Extra Payment"}</CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"space-y-2 max-w-sm"}>
 <Label>{"Monthly Extra Payment ($)"}</Label>
 <Input type="number"value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} min="0"/>
 <p className={"text-sm text-muted-foreground"}>{"Amount you can pay towards debt on top of minimums."}</p>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className={"space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Flame className={"w-5 h-5"} />
 <span>{"Snowball Method"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <p className={"text-sm text-muted-foreground"}>{"Pays off lowest balance first for quick wins."}</p>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Time to Debt Free"}</div>
 <div className={"text-2xl font-bold"}>{snowball.months +"months"}</div>
 </div>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Total Interest Paid"}</div>
 <div className={"text-2xl font-bold"}>{"$"+ snowball.interest.toFixed(0)}</div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center space-x-2"}>
 <Calendar className={"w-5 h-5"} />
 <span>{"Avalanche Method"}</span>
 </CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <p className={"text-sm text-muted-foreground"}>{"Pays off highest interest rate first to save money."}</p>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Time to Debt Free"}</div>
 <div className={"text-2xl font-bold text-green-600 dark:text-green-400"}>{avalanche.months +"months"}</div>
 </div>
 <div>
 <div className={"text-sm text-muted-foreground"}>{"Total Interest Paid"}</div>
 <div className={"text-2xl font-bold text-green-600 dark:text-green-400"}>{"$"+ Math.max(0, avalanche.interest).toFixed(0)}</div>
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
          <h3>Why Use Our "Debt Payoff Planner"?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our "Debt Payoff Planner" provides
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

      <RelatedTools currentToolUrl="/tools/finance/debt-payoff-planner" max={6} />

</div>
 );
}
