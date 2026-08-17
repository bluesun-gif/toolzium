"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Scale, Briefcase, AlertTriangle, Plus, Trash2, Sparkles, Shield, Zap, Copy, Calculator, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Category = "Clothing" | "Electronics" | "Toiletries" | "Documents" | "Accessories" | "Other";
type Item = {
  id: string;
  name: string;
  weight: number;
  category: Category;
};
const CATEGORIES: Category[] = ["Clothing", "Electronics", "Toiletries", "Documents", "Accessories", "Other"];
const LB_IN_KG = 2.20462;
export function PackingWeightClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [limit, setLimit] = useState(23);
  const [isKg, setIsKg] = useState(true);
  const [newItemName, setNewItemName] = useState("");
  const [newItemWeight, setNewItemWeight] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<Category>("Clothing");
  useEffect(() => {
    const saved = localStorage.getItem("packing-weight-items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("packing-weight-items", JSON.stringify(items));
  }, [items]);
  const addItem = () => {
    if (!newItemName || !newItemWeight) return;
    const weightVal = parseFloat(newItemWeight);
    if (isNaN(weightVal)) return;
    const weightInKg = isKg ? weightVal : weightVal / LB_IN_KG;
    const newItem: Item = {
      id: Math.random().toString(36).substring(7),
      name: newItemName,
      weight: weightInKg,
      category: newItemCategory
    };
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemWeight("");
  };
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  const totalWeightKg = items.reduce((acc, item) => acc + item.weight, 0);
  const totalWeight = isKg ? totalWeightKg : totalWeightKg * LB_IN_KG;
  const displayLimit = limit;
  const isOverLimit = totalWeight > displayLimit;
  const percentage = Math.min(totalWeight / displayLimit * 100, 100);
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    CATEGORIES.forEach(c => totals[c] = 0);
    items.forEach(item => {
      totals[item.category] += isKg ? item.weight : item.weight * LB_IN_KG;
    });
    return totals;
  }, [items, isKg]);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Scale} title="Packing Weight Calculator" description="Estimate your luggage weight, organize items by category, and avoid overweight baggage fees." actions={<ResetButton onClick={() => {
        setItems([]);
        setLimit(isKg ? 23 : Math.round(23 * LB_IN_KG));
      }} label="Reset List" />} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Item</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col sm:flex-row gap-4 items-end">
 <div className="flex-1 space-y-2 w-full">
 <Label>Item Name</Label>
 <Input placeholder="e.g., Jeans, Laptop" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
 </div>
 <div className="w-full sm:w-24 space-y-2">
 <Label>Weight ({isKg ? 'kg' : 'lb'})</Label>
 <Input type="number" step="0.1" min="0" placeholder="0.0" value={newItemWeight} onChange={e => setNewItemWeight(e.target.value)} />
 </div>
 <div className="w-full sm:w-40 space-y-2">
 <Label>Category</Label>
 <Select value={newItemCategory} onValueChange={(v: Category) => setNewItemCategory(v)}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addItem} className="w-full sm:w-auto">
 <Plus className="h-4 w-4 mr-2" /> Add
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Packing List</CardTitle>
 </CardHeader>
 <CardContent>
 {items.length === 0 ? <div className="text-center py-8 text-muted-foreground">
 <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-20" />
 <p>Your packing list is empty. Add items above.</p>
 </div> : <div className="space-y-6">
 {CATEGORIES.filter(c => categoryTotals[c] > 0).map(category => <div key={category}>
 <div className="flex justify-between items-center mb-2 border-b pb-1">
 <h3 className="font-medium">{category}</h3>
 <span className="text-sm font-semibold">{categoryTotals[category].toFixed(2)} {isKg ? 'kg' : 'lb'}</span>
 </div>
 <div className="space-y-2">
 {items.filter(i => i.category === category).map(item => <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
 <span>{item.name}</span>
 <div className="flex items-center gap-3">
 <span>{(isKg ? item.weight : item.weight * LB_IN_KG).toFixed(2)} {isKg ? 'kg' : 'lb'}</span>
 <Button onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
 <Trash2 className="h-3.5 w-3.5" />
 </Button>
 </div>
 </div>)}
 </div>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings & Limits</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex items-center justify-between">
 <Label>Unit System</Label>
 <div className="flex items-center gap-2">
 <span className={cn("text-sm", !isKg && "font-semibold")}>lb</span>
 <Switch checked={isKg} onCheckedChange={c => {
                    setIsKg(c);
                    setLimit(c ? Math.round(limit / LB_IN_KG) : Math.round(limit * LB_IN_KG));
                  }} />
 <span className={cn("text-sm", isKg && "font-semibold")}>kg</span>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Baggage Weight Limit ({isKg ? 'kg' : 'lb'})</Label>
 <Input type="number" value={limit} onChange={e => setLimit(parseFloat(e.target.value) || 0)} />
 <div className="flex gap-2 mt-2">
 <Button variant="outline" size="sm" onClick={() => setLimit(isKg ? 23 : 50)} className="flex-1 text-xs">Checked (23kg/50lb)</Button>
 <Button variant="outline" size="sm" onClick={() => setLimit(isKg ? 7 : 15)} className="flex-1 text-xs">Carry-on (7kg/15lb)</Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className={cn(isOverLimit && "border-destructive")}>
 <CardHeader>
 <CardTitle>Total Weight</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="text-4xl font-bold text-center py-4">
 {totalWeight.toFixed(2)} <span className="text-xl text-muted-foreground">{isKg ? 'kg' : 'lb'}</span>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span>0</span>
 <span className={cn(isOverLimit && "text-destructive font-bold")}>{limit} {isKg ? 'kg' : 'lb'}</span>
 </div>
 <div className="h-4 bg-muted rounded-full overflow-hidden">
 <div className={cn("h-full transition-all", isOverLimit ? "bg-destructive" : "bg-primary")} style={{
                    width: `${percentage}%`
                  }} />
 </div>
 </div>

 {isOverLimit && <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2 text-sm mt-4">
 <AlertTriangle className="h-5 w-5 shrink-0" />
 <p>You are over the {limit}{isKg ? 'kg' : 'lb'} limit by {(totalWeight - displayLimit).toFixed(2)}{isKg ? 'kg' : 'lb'}. Consider removing some items.</p>
 </div>}
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our Packing Weight Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Packing Weight Calculator provides
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

export default PackingWeightClient;
