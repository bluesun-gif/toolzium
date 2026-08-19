"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { AlertTriangle, Calculator, Clock, Copy, DollarSign, Globe, Lock, Shield, Sparkles, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
export function TravelBudgetClient() {
  const [duration, setDuration] = useState("7");
  const [totalBudget, setTotalBudget] = useState("2000");
  const [percentages, setPercentages] = useState({
    accommodation: 30,
    food: 25,
    transport: 15,
    activities: 20,
    emergency: 10
  });
  useEffect(() => {
    const saved = localStorage.getItem("travel-budget-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.percentages) setPercentages(parsed.percentages);
      } catch (e) {
        // ignore
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("travel-budget-settings", JSON.stringify({
      percentages
    }));
  }, [percentages]);
  const handleChange = (field: keyof typeof percentages, value: string) => {
    const val = parseInt(value) || 0;
    setPercentages(prev => ({
      ...prev,
      [field]: val
    }));
  };
  const totalPercentage = Object.values(percentages).reduce((a, b) => a + b, 0);
  const isBalanced = totalPercentage === 100;
  const getDailyAllowance = () => {
    const days = parseInt(duration) || 1;
    const budget = parseFloat(totalBudget) || 0;
    return (budget / days).toFixed(2);
  };
  const getBreakdown = () => {
    const budget = parseFloat(totalBudget) || 0;
    const days = parseInt(duration) || 1;
    const daily = budget / days;
    return {
      accommodation: (daily * percentages.accommodation / 100).toFixed(2),
      food: (daily * percentages.food / 100).toFixed(2),
      transport: (daily * percentages.transport / 100).toFixed(2),
      activities: (daily * percentages.activities / 100).toFixed(2),
      emergency: (daily * percentages.emergency / 100).toFixed(2)
    };
  };
  const breakdown = getBreakdown();
  const generateReport = () => {
    return "Travel Budget Report\n" + "Duration:" + duration + "days\n" + "Total Budget: $" + totalBudget + "\n" + "Daily Allowance: $" + getDailyAllowance() + "/day\n\n" + "Daily Breakdown:\n" + "- Accommodation: $" + breakdown.accommodation + "/day (" + percentages.accommodation + "%)\n" + "- Food & Dining: $" + breakdown.food + "/day (" + percentages.food + "%)\n" + "- Transport: $" + breakdown.transport + "/day (" + percentages.transport + "%)\n" + "- Activities: $" + breakdown.activities + "/day (" + percentages.activities + "%)\n" + "- Emergency: $" + breakdown.emergency + "/day (" + percentages.emergency + "%)\n";
  };
  const handleReset = () => {
    setDuration("7");
    setTotalBudget("2000");
    setPercentages({
      accommodation: 30,
      food: 25,
      transport: 15,
      activities: 20,
      emergency: 10
    });
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Travel Daily Expense Budget Calculator" description="Calculate daily travel expense budgets for domestic or international trips." icon={DollarSign} actions={<>
 <CopyButton getText={generateReport} label="Copy Report" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> Trip Details</CardTitle>
 <CardDescription>Enter budget and category allocations</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Trip Duration (days)</Label>
 <Input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Total Budget ($)</Label>
 <Input type="number" min="1" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} />
 </div>
 </div>

 <div className="space-y-3 mt-4">
 <Label className={cn("flex justify-between", isBalanced ? "text-green-600 dark:text-green-400" : "text-destructive")}>
 <span>Allocations</span>
 <span>Total: {totalPercentage}% {isBalanced ? "✓" : "(!= 100%)"}</span>
 </Label>
 
 <div className="space-y-2">
 <div className="flex items-center gap-2">
 <span className="w-1/3 text-sm">Accommodation</span>
 <Input type="number" value={percentages.accommodation} onChange={e => handleChange("accommodation", e.target.value)} />
 <span className="text-sm text-muted-foreground">%</span>
 </div>
 <div className="flex items-center gap-2">
 <span className="w-1/3 text-sm">Food & Dining</span>
 <Input type="number" value={percentages.food} onChange={e => handleChange("food", e.target.value)} />
 <span className="text-sm text-muted-foreground">%</span>
 </div>
 <div className="flex items-center gap-2">
 <span className="w-1/3 text-sm">Transport</span>
 <Input type="number" value={percentages.transport} onChange={e => handleChange("transport", e.target.value)} />
 <span className="text-sm text-muted-foreground">%</span>
 </div>
 <div className="flex items-center gap-2">
 <span className="w-1/3 text-sm">Activities</span>
 <Input type="number" value={percentages.activities} onChange={e => handleChange("activities", e.target.value)} />
 <span className="text-sm text-muted-foreground">%</span>
 </div>
 <div className="flex items-center gap-2">
 <span className="w-1/3 text-sm">Emergency</span>
 <Input type="number" value={percentages.emergency} onChange={e => handleChange("emergency", e.target.value)} />
 <span className="text-sm text-muted-foreground">%</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> Budget Breakdown</CardTitle>
 <CardDescription>Your daily spending allowance</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-6 bg-primary/10 rounded-lg border text-center">
 <div className="text-sm text-muted-foreground mb-1">Total Daily Allowance</div>
 <div className="text-4xl font-bold text-primary">${getDailyAllowance()}</div>
 <div className="text-xs text-muted-foreground mt-2">per day</div>
 </div>

 <div className="space-y-3">
 <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
 <span className="font-medium">Accommodation</span>
 <span className="font-bold">${breakdown.accommodation} <span className="text-xs text-muted-foreground font-normal">/day</span></span>
 </div>
 <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
 <span className="font-medium">Food & Dining</span>
 <span className="font-bold">${breakdown.food} <span className="text-xs text-muted-foreground font-normal">/day</span></span>
 </div>
 <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
 <span className="font-medium">Transport</span>
 <span className="font-bold">${breakdown.transport} <span className="text-xs text-muted-foreground font-normal">/day</span></span>
 </div>
 <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
 <span className="font-medium">Activities</span>
 <span className="font-bold">${breakdown.activities} <span className="text-xs text-muted-foreground font-normal">/day</span></span>
 </div>
 <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
 <span className="font-medium">Emergency Buffer</span>
 <span className="font-bold">${breakdown.emergency} <span className="text-xs text-muted-foreground font-normal">/day</span></span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Total Budget", description: "Type your total trip budget and number of travel days.", icon: DollarSign },
        { step: "02", title: "Add Fixed Costs", description: "Enter fixed costs like flights and accommodation that don't vary per day.", icon: Lock },
        { step: "03", title: "Get Daily Budget", description: "See your remaining flexible daily budget after fixed costs are deducted.", icon: Clock },
      ]} badges={["Fixed + Daily", "Overspend Alert", "Daily View"]} />

      <ToolFeatureGuides features={[
        { icon: DollarSign, title: "Fixed + Variable Split", description: "Separates fixed costs (flights, hotels) from flexible daily spending money." },
        { icon: Clock, title: "Day-by-Day View", description: "See your daily allowance and track how it changes as you log spending." },
        { icon: AlertTriangle, title: "Overspend Warning", description: "Get alerted when a day's spending exceeds your daily allowance." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Travel Daily Expense Budget Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Daily Expense Budget Calculator provides
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
    </div>
    </div>
);
}

export default TravelBudgetClient;
