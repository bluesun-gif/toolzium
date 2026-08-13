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
import { Switch } from"@/components/ui/switch";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { CreditCard, Calendar, DollarSign, Plus, Trash2, ArrowUpDown, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

interface Subscription {
 id: string;
 name: string;
 cost: number;
 cycle:"weekly"|"monthly"|"yearly";
 category: string;
 nextDate: string;
 active: boolean;
}

const CATEGORIES = ["Streaming","Software","Gaming","Music","Fitness","News","Cloud","Other"];

export function SubscriptionsClient() {
 const [subs, setSubs] = useState<Subscription[]>([]);
  const [sortBy, setSortBy] = useState<"date"|"cost">("date");

 const [newName, setNewName] = useState("");
 const [newCost, setNewCost] = useState<number |"">("");
 const [newCycle, setNewCycle] = useState<Subscription["cycle"]>("monthly");
 const [newCategory, setNewCategory] = useState("Streaming");
 const [newDate, setNewDate] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_subs");
 if (saved) {
 try { setSubs(JSON.parse(saved)); } catch (e) {}
 }
  }, []);

 useEffect(() => {
 if (typeof window !== "undefined") {
 localStorage.setItem("toolzium_subs", JSON.stringify(subs));
 }
 }, [subs, typeof window]);

 const addSub = () => {
 if (!newName || !newCost) {
 toast.error("Please fill required fields");
 return;
 }
 setSubs([...subs, {
 id: Math.random().toString(36).substring(7),
 name: newName,
 cost: Number(newCost),
 cycle: newCycle,
 category: newCategory,
 nextDate: newDate,
 active: true
 }]);
 setNewName("");
 setNewCost("");
 setNewDate("");
 };

 const removeSub = (id: string) => {
 setSubs(subs.filter(s => s.id !== id));
 };

 const toggleActive = (id: string) => {
 setSubs(subs.map(s => s.id === id ? { ...s, active: !s.active } : s));
 };

 const monthlyCost = subs.filter(s => s.active).reduce((sum, s) => {
 if (s.cycle ==="weekly") return sum + (s.cost * 52) / 12;
 if (s.cycle ==="yearly") return sum + s.cost / 12;
 return sum + s.cost;
 }, 0);

 const yearlyCost = monthlyCost * 12;

 const sortedSubs = [...subs].sort((a, b) => {
 if (sortBy ==="cost") {
 const aCost = a.cycle ==="yearly"? a.cost/12 : a.cycle ==="weekly"? a.cost*4 : a.cost;
 const bCost = b.cycle ==="yearly"? b.cost/12 : b.cycle ==="weekly"? b.cost*4 : b.cost;
 return bCost - aCost;
 }
 return new Date(a.nextDate ||"2099-01-01").getTime() - new Date(b.nextDate ||"2099-01-01").getTime();
 });
 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={CreditCard}
 title="Subscription Tracker"
 description="Manage your recurring payments and track your spending"
 actions={<ResetButton onClick={() => { setSubs([]); localStorage.removeItem("toolzium_subs"); }} label="Clear All"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <GlassCard className="md:col-span-4 h-fit">
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5"/> Add New</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Service Name</Label>
 <Input placeholder="Netflix, Spotify..."value={newName} onChange={e => setNewName(e.target.value)} />
 </div>
 
 <div className="grid grid-cols-2 gap-2">
 <div className="space-y-2">
 <Label>Cost</Label>
 <div className="relative">
 <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
 <Input type="number"step="0.01"className="pl-8"value={newCost} onChange={e => setNewCost(e.target.value ===""?"": Number(e.target.value))} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Cycle</Label>
 <Select value={newCycle} onValueChange={(v: any) => setNewCycle(v)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="weekly">Weekly</SelectItem>
 <SelectItem value="monthly">Monthly</SelectItem>
 <SelectItem value="yearly">Yearly</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={newCategory} onValueChange={setNewCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Next Billing Date (Optional)</Label>
 <Input type="date"value={newDate} onChange={e => setNewDate(e.target.value)} />
 </div>

 <Button onClick={addSub} className="w-full">Add Subscription</Button>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-8 space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <GlassCard>
 <CardContent className="p-6 text-center">
 <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">Monthly Spending</p>
 <p className="text-4xl font-bold text-primary">${monthlyCost.toFixed(2)}</p>
 </CardContent>
 </GlassCard>
 <GlassCard>
 <CardContent className="p-6 text-center">
 <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">Yearly Spending</p>
 <p className="text-4xl font-bold text-primary">${yearlyCost.toFixed(2)}</p>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <div>
 <CardTitle>Your Subscriptions</CardTitle>
 <CardDescription>You have {subs.length} active tracker(s)</CardDescription>
 </div>
 <Button variant="outline"size="sm"onClick={() => setSortBy(sortBy ==="date"?"cost":"date")}>
 <ArrowUpDown className="w-4 h-4 mr-2"/> Sort by {sortBy ==="date"?"Cost":"Date"}
 </Button>
 </CardHeader>
 <CardContent>
 <div className="space-y-3 mt-4">
 {sortedSubs.length === 0 ? (
 <p className="text-center text-muted-foreground py-8">No subscriptions tracked yet.</p>
 ) : (
 sortedSubs.map(s => (
 <div key={s.id} className={cn("flex items-center justify-between p-4 border rounded-xl transition-opacity", (!s.active ? 'opacity-50 grayscale' : ''))}>
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
 <Calendar className="w-5 h-5 text-primary"/>
 </div>
 <div>
 <p className="font-semibold">{s.name}</p>
 <p className="text-xs text-muted-foreground">{s.category} • {s.nextDate ||"No date set"}</p>
 </div>
 </div>
 <div className="flex items-center gap-6">
 <div className="text-right">
 <p className="font-bold">${s.cost.toFixed(2)}</p>
 <p className="text-xs text-muted-foreground">/{s.cycle}</p>
 </div>
 <Switch checked={s.active} onCheckedChange={() => toggleActive(s.id)} />
 <Button variant="ghost"size="icon"onClick={() => removeSub(s.id)} className="text-destructive h-8 w-8">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </div>
 ))
 )}
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
          <h3>Why Use Our Subscription Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Subscription Tracker provides
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

      <RelatedTools currentToolUrl="/tools/finance/subscriptions" max={6} />

</div>
 );
}
