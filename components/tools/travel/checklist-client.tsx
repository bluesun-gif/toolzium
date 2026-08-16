"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Send, Plus, Printer, Trash, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
  category: string;
};
const DEFAULT_ITEMS = {
  Documents: ["Passport/ID", "Boarding Pass", "Travel Insurance", "Hotel Reservation"],
  Clothing: ["Underwear", "Socks", "T-shirts", "Pants", "Sleepwear"],
  Toiletries: ["Toothbrush", "Toothpaste", "Deodorant", "Shampoo", "Soap"],
  Electronics: ["Phone", "Charger", "Power Bank", "Headphones"],
  Miscellaneous: ["Keys", "Wallet", "Sunglasses", "Water Bottle"]
};
const TRIP_TYPES = ["Business", "Beach", "Adventure", "City", "Winter"];
export function TravelChecklistClient() {
  const [tripType, setTripType] = useState("City");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("Miscellaneous");
  useEffect(() => {
    const saved = localStorage.getItem("travelChecklist");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      generateList("City");
    }
  }, []);
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("travelChecklist", JSON.stringify(items));
    }
  }, [items]);
  const generateList = (type: string) => {
    let list: ChecklistItem[] = [];
    Object.entries(DEFAULT_ITEMS).forEach(([cat, arr]) => {
      arr.forEach((text, i) => {
        list.push({
          id: `${cat}-${i}`,
          text,
          checked: false,
          category: cat
        });
      });
    });

    // Add specific items based on type
    if (type === "Business") {
      list.push({
        id: `ext-1`,
        text: "Laptop",
        checked: false,
        category: "Electronics"
      });
      list.push({
        id: `ext-2`,
        text: "Business Cards",
        checked: false,
        category: "Documents"
      });
    } else if (type === "Beach") {
      list.push({
        id: `ext-1`,
        text: "Swimsuit",
        checked: false,
        category: "Clothing"
      });
      list.push({
        id: `ext-2`,
        text: "Sunscreen",
        checked: false,
        category: "Toiletries"
      });
    } else if (type === "Winter") {
      list.push({
        id: `ext-1`,
        text: "Winter Coat",
        checked: false,
        category: "Clothing"
      });
      list.push({
        id: `ext-2`,
        text: "Gloves",
        checked: false,
        category: "Clothing"
      });
    }
    setItems(list);
  };
  const handleTypeChange = (val: string) => {
    setTripType(val);
    generateList(val);
  };
  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      checked: !item.checked
    } : item));
  };
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, {
      id: `custom-${Date.now()}`,
      text: newItem,
      checked: false,
      category: newCategory
    }]);
    setNewItem("");
  };
  const categories = Array.from(new Set(items.map(i => i.category)));
  const completed = items.filter(i => i.checked).length;
  const progress = items.length === 0 ? 0 : Math.round(completed / items.length * 100);
  const handlePrint = () => {
    window.print();
  };
  const getShareText = () => {
    return items.map(i => `[${i.checked ? 'x' : ' '}] ${i.text}`).join('\n');
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={CheckSquare} title="Travel Checklist" description="Pre-trip checklist generator. Auto-generate and manage packing items." actions={<>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print" />
 <CopyButton getText={getShareText} label="Copy List" />
 <ResetButton onClick={() => generateList(tripType)} label="Reset" />
 </>} />
 
 <GlassCard className="print:shadow-none print:border-none">
 <CardHeader className="print:hidden">
 <CardTitle>Trip Details</CardTitle>
 <CardDescription>Select a trip type to generate a starter checklist</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex flex-col md:flex-row gap-4 mb-6 print:hidden">
 <div className="flex-1">
 <Label className="mb-2 block">Trip Type</Label>
 <Select value={tripType} onValueChange={handleTypeChange}>
 <SelectTrigger><SelectValue placeholder="Trip Type" /></SelectTrigger>
 <SelectContent>
 {TRIP_TYPES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <div className="mb-6">
 <div className="flex justify-between text-sm mb-1">
 <span>Packing Progress</span>
 <span>{completed} / {items.length} ({progress}%)</span>
 </div>
 <div className="w-full bg-secondary rounded-full h-2.5">
 <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{
                width: `${progress}%`
              }}></div>
 </div>
 </div>
 
 <div className="space-y-6">
 {categories.map(cat => <div key={cat} className="space-y-3">
 <h3 className="font-semibold text-lg border-b pb-1">{cat}</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
 {items.filter(i => i.category === cat).map(item => <div key={item.id} className="flex items-center gap-2 group p-2 hover:bg-muted/50 rounded-md">
 <Switch checked={item.checked} onCheckedChange={() => toggleItem(item.id)} id={item.id} />
 <Label htmlFor={item.id} className={cn("flex-1 cursor-pointer", item.checked ? 'line-through text-muted-foreground' : '')}>
 {item.text}
 </Label>
 <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 print:hidden" onClick={() => deleteItem(item.id)}>
 <Trash className="h-4 w-4 text-destructive" />
 </Button>
 </div>)}
 </div>
 </div>)}
 </div>
 
 <Separator className="my-6 print:hidden" />
 
 <div className="print:hidden">
 <h3 className="font-semibold mb-3">Add Custom Item</h3>
 <div className="flex gap-2">
 <Select value={newCategory} onValueChange={setNewCategory}>
 <SelectTrigger className="w-[150px]"><SelectValue placeholder="Category" /></SelectTrigger>
 <SelectContent>
 {Object.keys(DEFAULT_ITEMS).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 <Input placeholder="Item name..." value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()} className="flex-1" />
 <Button onClick={addItem}><Plus className="h-4 w-4 mr-2" /> Add</Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Travel Checklist?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Checklist provides
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

      <RelatedTools currentToolUrl="/tools/travel/checklist" max={6} />

    </div></div>;
}