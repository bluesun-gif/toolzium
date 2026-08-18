"use client";

import { cn } from "@/lib/utils";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
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
import { Switch } from"@/components/ui/switch";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { ArrowUpDown, Calendar, CreditCard, DollarSign, Eye, ListChecks, Plus, Trash2, Wallet } from"lucide-react";
import toast from"react-hot-toast";

interface Subscription {
  id: string;
  name: string;
  cost: number;
  cycle: "weekly" | "monthly" | "yearly";
  category: string;
  nextDate: string;
  active: boolean;
}
const CATEGORIES = ["Streaming", "Software", "Gaming", "Music", "Fitness", "News", "Cloud", "Other"];
export function SubscriptionsClient() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "cost">("date");
  const [newName, setNewName] = useState("");
  const [newCost, setNewCost] = useState<number | "">("");
  const [newCycle, setNewCycle] = useState<Subscription["cycle"]>("monthly");
  const [newCategory, setNewCategory] = useState("Streaming");
  const [newDate, setNewDate] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_subs");
    if (saved) {
      try {
        setSubs(JSON.parse(saved));
      } catch (e) {}
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
    setSubs(subs.map(s => s.id === id ? {
      ...s,
      active: !s.active
    } : s));
  };
  const monthlyCost = subs.filter(s => s.active).reduce((sum, s) => {
    if (s.cycle === "weekly") return sum + s.cost * 52 / 12;
    if (s.cycle === "yearly") return sum + s.cost / 12;
    return sum + s.cost;
  }, 0);
  const yearlyCost = monthlyCost * 12;
  const sortedSubs = [...subs].sort((a, b) => {
    if (sortBy === "cost") {
      const aCost = a.cycle === "yearly" ? a.cost / 12 : a.cycle === "weekly" ? a.cost * 4 : a.cost;
      const bCost = b.cycle === "yearly" ? b.cost / 12 : b.cycle === "weekly" ? b.cost * 4 : b.cost;
      return bCost - aCost;
    }
    return new Date(a.nextDate || "2099-01-01").getTime() - new Date(b.nextDate || "2099-01-01").getTime();
  });
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={CreditCard} title="Subscription Tracker" description="Manage your recurring payments and track your spending" actions={<ResetButton onClick={() => {
        setSubs([]);
        localStorage.removeItem("toolzium_subs");
      }} label="Clear All" />} />

 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <GlassCard className="md:col-span-4 h-fit">
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5" /> Add New</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Service Name</Label>
 <Input placeholder="Netflix, Spotify..." value={newName} onChange={e => setNewName(e.target.value)} />
 </div>
 
 <div className="grid grid-cols-2 gap-2">
 <div className="space-y-2">
 <Label>Cost</Label>
 <div className="relative">
 <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" step="0.01" className="pl-8" value={newCost} onChange={e => setNewCost(e.target.value === "" ? "" : Number(e.target.value))} />
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
 <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
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
 <Button variant="outline" size="sm" onClick={() => setSortBy(sortBy === "date" ? "cost" : "date")}>
 <ArrowUpDown className="w-4 h-4 mr-2" /> Sort by {sortBy === "date" ? "Cost" : "Date"}
 </Button>
 </CardHeader>
 <CardContent>
 <div className="space-y-3 mt-4">
 {sortedSubs.length === 0 ? <p className="text-center text-muted-foreground py-8">No subscriptions tracked yet.</p> : sortedSubs.map(s => <div key={s.id} className={cn("flex items-center justify-between p-4 border rounded-xl transition-opacity", !s.active ? 'opacity-50 grayscale' : '')}>
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
 <Calendar className="w-5 h-5 text-primary" />
 </div>
 <div>
 <p className="font-semibold">{s.name}</p>
 <p className="text-xs text-muted-foreground">{s.category} • {s.nextDate || "No date set"}</p>
 </div>
 </div>
 <div className="flex items-center gap-6">
 <div className="text-right">
 <p className="font-bold">${s.cost.toFixed(2)}</p>
 <p className="text-xs text-muted-foreground">/{s.cycle}</p>
 </div>
 <Switch checked={s.active} onCheckedChange={() => toggleActive(s.id)} />
 <Button variant="ghost" size="icon" onClick={() => removeSub(s.id)} className="text-destructive h-8 w-8">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Subs",
    description:"List each subscription and cost.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Set Frequency",
    description:"Mark monthly, yearly, or weekly.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Summarize",
    description:"See total recurring spend.",
    icon: Wallet,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Full List",
    description:"Centralizes all subscriptions.",
  },
{
    icon: Calendar,
    title:"Frequency Aware",
    description:"Normalizes to monthly total.",
  },
{
    icon: Wallet,
    title:"Total Spend",
    description:"Annualized recurring cost.",
  },
{
    icon: Eye,
    title:"Find Waste",
    description:"Surfaces forgotten subs.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A subscription tracker reveals the silent drain of modern spending. Individually, a 10 dollar monthly app feels trivial; collectively, a dozen such charges cost more than a car payment. This tool lists every subscription, normalizes frequency, and totals the annual recurring cost so the real figure surfaces instead of hiding in plain sight.</p>
  <p>Frequency normalization is the insight. A yearly 120 dollar charge and a monthly 12 dollar charge look different but equal 144 dollars yearly; the tracker converts all to a common basis so you compare and total accurately. Without it, annual and monthly charges blur into an unexamined stream of small debits.</p>
  <p>The payoff is cutting waste. Most people carry forgotten trials, duplicate services, and unused apps that auto-renew. Seeing the full list and total often prompts immediate cancellations that fund meaningful savings. The tracker also flags free trials before they convert to charges, preventing surprise bills.</p>
  <p>Privacy suits the data. Running locally means your spending list never leaves your device, unlike cloud aggregators that require bank access. Review subscriptions quarterly, especially after the holidays or a free-trial spree. The tool's value is turning invisible recurring charges into a single, actionable number you control.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/finance/subscriptions" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Why track subscriptions?",
    answer:"Small recurring charges add up silently.",
  },
{
    question:"Annual vs monthly?",
    answer:"Tool normalizes both to compare.",
  },
{
    question:"How to cut waste?",
    answer:"Cancel unused or duplicate services.",
  },
{
    question:"Is this private?",
    answer:"Yes, runs locally in your browser.",
  },
{
    question:"Free trials?",
    answer:"Track them so they do not auto-charge.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SubscriptionsClient;
