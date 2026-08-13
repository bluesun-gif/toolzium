"use client";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Landmark, TrendingUp, PieChart, Download, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type Item = {
 id: string;
 name: string;
 amount: number;
 category: string;
};

const ASSET_CATEGORIES = ["Cash & Savings","Investments","Real Estate","Vehicles","Other Assets"];
const LIABILITY_CATEGORIES = ["Mortgage","Student Loans","Credit Card Debt","Car Loans","Other Debts"];

export function NetWorthClient() {
 const [assets, setAssets] = useState<Item[]>([]);
 const [liabilities, setLiabilities] = useState<Item[]>([]);
 const [snapshots, setSnapshots] = useState<{ date: string; netWorth: number }[]>([]);
 
 const [newItemName, setNewItemName] = useState("");
 const [newItemAmount, setNewItemAmount] = useState("");
 const [newItemCategory, setNewItemCategory] = useState(ASSET_CATEGORIES[0]);
 const [newItemType, setNewItemType] = useState<"asset"|"liability">("asset");

 
 useEffect(() => {
 const savedAssets = localStorage.getItem("net-worth-assets");
 const savedLiabs = localStorage.getItem("net-worth-liabilities");
 const savedSnaps = localStorage.getItem("net-worth-snapshots");
 if (savedAssets) setAssets(JSON.parse(savedAssets));
 if (savedLiabs) setLiabilities(JSON.parse(savedLiabs));
 if (savedSnaps) setSnapshots(JSON.parse(savedSnaps));
  }, []);

 useEffect(() => {
 if (typeof window !== "undefined") {
 localStorage.setItem("net-worth-assets", JSON.stringify(assets));
 localStorage.setItem("net-worth-liabilities", JSON.stringify(liabilities));
 localStorage.setItem("net-worth-snapshots", JSON.stringify(snapshots));
 }
 }, [assets, liabilities, snapshots, typeof window]);

 const handleAddItem = () => {
 if (!newItemName || !newItemAmount || isNaN(Number(newItemAmount))) {
 toast.error("Please enter a valid name and amount.");
 return;
 }
 
 const item: Item = {
 id: crypto.randomUUID(),
 name: newItemName,
 amount: Number(newItemAmount),
 category: newItemCategory,
 };

 if (newItemType ==="asset") {
 setAssets([...assets, item]);
 toast.success("Asset added");
 } else {
 setLiabilities([...liabilities, item]);
 toast.success("Liability added");
 }

 setNewItemName("");
 setNewItemAmount("");
 };

 const handleRemoveItem = (id: string, type:"asset"|"liability") => {
 if (type ==="asset") {
 setAssets(assets.filter(a => a.id !== id));
 } else {
 setLiabilities(liabilities.filter(l => l.id !== id));
 }
 };

 const handleClear = () => {
 if (confirm("Reset all net worth data? This cannot be undone.")) {
 setAssets([]);
 setLiabilities([]);
 toast.success("Data cleared");
 }
 };

 const totalAssets = useMemo(() => assets.reduce((sum, a) => sum + a.amount, 0), [assets]);
 const totalLiabilities = useMemo(() => liabilities.reduce((sum, l) => sum + l.amount, 0), [liabilities]);
 const netWorth = totalAssets - totalLiabilities;

 const handleSaveSnapshot = () => {
 const dateStr = new Date().toISOString().split("T")[0];
 const existing = snapshots.find(s => s.date === dateStr);
 
 if (existing) {
 setSnapshots(snapshots.map(s => s.date === dateStr ? { ...s, netWorth } : s));
 toast.success("Updated snapshot for today");
 } else {
 setSnapshots([...snapshots, { date: dateStr, netWorth }].sort((a, b) => a.date.localeCompare(b.date)));
 toast.success("Saved snapshot for today");
 }
 };

 const formatCurrency = (val: number) => {
 return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
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
 icon={Landmark}
 title="Net Worth Calculator"
 description="Track your assets and liabilities to calculate and monitor your overall net worth over time."
 actions={
 <div className="flex gap-2">
 <ActionButton onClick={handleSaveSnapshot} icon={Download} label="Save Snapshot"variant="outline"/>
 <ResetButton onClick={handleClear} label="Reset"/>
 </div>
 }
 />

 <GlassCard className="bg-gradient-to-br from-primary/10 to-transparent">
 <CardContent className="p-8 text-center">
 <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Net Worth</h2>
 <div className={cn("text-5xl font-bold", (netWorth >= 0 ?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"))}>
 {formatCurrency(netWorth)}
 </div>
 <div className="grid grid-cols-2 gap-8 mt-8 max-w-lg mx-auto">
 <div>
 <div className="text-sm text-muted-foreground">Total Assets</div>
 <div className="text-xl font-semibold text-green-600 dark:text-green-400">{formatCurrency(totalAssets)}</div>
 </div>
 <div>
 <div className="text-sm text-muted-foreground">Total Liabilities</div>
 <div className="text-xl font-semibold text-red-600 dark:text-red-400">{formatCurrency(totalLiabilities)}</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Item</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
 <div className="space-y-2">
 <Label>Type</Label>
 <Select 
 value={newItemType} 
 onValueChange={(val:"asset"|"liability") => {
 setNewItemType(val);
 setNewItemCategory(val ==="asset"? ASSET_CATEGORIES[0] : LIABILITY_CATEGORIES[0]);
 }}
 >
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="asset">Asset (+)</SelectItem>
 <SelectItem value="liability">Liability (-)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={newItemCategory} onValueChange={setNewItemCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {(newItemType ==="asset"? ASSET_CATEGORIES : LIABILITY_CATEGORIES).map(cat => (
 <SelectItem key={cat} value={cat}>{cat}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Name / Description</Label>
 <Input placeholder="e.g., Chase Checking"value={newItemName} onChange={e => setNewItemName(e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Amount ($)</Label>
 <Input type="number"min="0"step="0.01"placeholder="0.00"value={newItemAmount} onChange={e => setNewItemAmount(e.target.value)} />
 </div>

 <Button onClick={handleAddItem} className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
 <TrendingUp className="w-5 h-5"/> Assets
 </CardTitle>
 </CardHeader>
 <CardContent>
 {assets.length === 0 ? (
 <p className="text-muted-foreground text-sm">No assets added.</p>
 ) : (
 <div className="space-y-4">
 {ASSET_CATEGORIES.map(cat => {
 const catAssets = assets.filter(a => a.category === cat);
 if (catAssets.length === 0) return null;
 return (
 <div key={cat} className="space-y-2">
 <h4 className="font-semibold text-sm">{cat}</h4>
 {catAssets.map(asset => (
 <div key={asset.id} className="flex justify-between items-center bg-secondary/20 p-2 rounded border text-sm">
 <span>{asset.name}</span>
 <div className="flex items-center gap-3">
 <span className="font-medium">{formatCurrency(asset.amount)}</span>
 <button onClick={() => handleRemoveItem(asset.id,"asset")} className="text-red-500 hover:text-red-700">
 <Trash2 className="w-4 h-4"/>
 </button>
 </div>
 </div>
 ))}
 </div>
 );
 })}
 </div>
 )}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
 <PieChart className="w-5 h-5"/> Liabilities
 </CardTitle>
 </CardHeader>
 <CardContent>
 {liabilities.length === 0 ? (
 <p className="text-muted-foreground text-sm">No liabilities added.</p>
 ) : (
 <div className="space-y-4">
 {LIABILITY_CATEGORIES.map(cat => {
 const catLiabs = liabilities.filter(l => l.category === cat);
 if (catLiabs.length === 0) return null;
 return (
 <div key={cat} className="space-y-2">
 <h4 className="font-semibold text-sm">{cat}</h4>
 {catLiabs.map(liab => (
 <div key={liab.id} className="flex justify-between items-center bg-secondary/20 p-2 rounded border text-sm">
 <span>{liab.name}</span>
 <div className="flex items-center gap-3">
 <span className="font-medium">{formatCurrency(liab.amount)}</span>
 <button onClick={() => handleRemoveItem(liab.id,"liability")} className="text-red-500 hover:text-red-700">
 <Trash2 className="w-4 h-4"/>
 </button>
 </div>
 </div>
 ))}
 </div>
 );
 })}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 
 {snapshots.length > 0 && (
 <GlassCard>
 <CardHeader>
 <CardTitle>History Snapshots</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
 {snapshots.map(s => (
 <div key={s.date} className="flex justify-between p-3 border rounded bg-secondary/10">
 <span className="font-medium">{s.date}</span>
 <span className={cn("font-bold", (s.netWorth >= 0 ?"text-green-600":"text-red-600"))}>
 {formatCurrency(s.netWorth)}
 </span>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 )}
 
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
          <h3>Why Use Our Net Worth Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Net Worth Calculator provides
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

      <RelatedTools currentToolUrl="/tools/finance/net-worth" max={6} />

</div>
 );
}
