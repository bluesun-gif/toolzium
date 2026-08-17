"use client";

import { Card } from "@/components/ui/card";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { CheckSquare, Plus, Copy, Plane, Sparkles, Shield, Zap, Type } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};
const PRESETS = {
  domestic: ["ID/Driver's License", "Boarding Pass", "Hotel Confirmation", "Car Rental Agreement", "Travel Insurance"],
  international: ["Passport", "Visa", "Boarding Pass", "Hotel Confirmation", "Travel Insurance", "Vaccination Card", "International Driving Permit", "Currency/Cash"],
  business: ["Passport/ID", "Boarding Pass", "Business Cards", "Meeting Schedule", "Expense Cards", "Laptop/Chargers"],
  family: ["Passports/IDs for all", "Birth Certificates (Minors)", "Consent Letter (if flying solo with minor)", "Health Insurance Cards", "Emergency Contacts"],
  adventure: ["Passport/ID", "Special Permits", "Medical Evacuation Insurance", "Vaccination Record", "Guide Booking Confirmation", "Emergency Cash"]
};
export function TravelDocumentsClient() {
  const [tripType, setTripType] = useState("international");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItem, setNewItem] = useState("");

  // Load from preset when tripType changes, unless we want to keep current items
  const loadPreset = (type: string) => {
    setTripType(type);
    const presetItems = PRESETS[type as keyof typeof PRESETS].map(text => ({
      id: Date.now().toString() + Math.random().toString(),
      text,
      completed: false
    }));
    setItems(presetItems);
    toast.success("Loaded" + type + "checklist");
  };
  useEffect(() => {
    const saved = localStorage.getItem("travel-checklist");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      loadPreset("international");
    }
  }, []);
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("travel-checklist", JSON.stringify(items));
    }
  }, [items]);
  const toggleItem = (id: string) => {
    setItems(items.map(it => it.id === id ? {
      ...it,
      completed: !it.completed
    } : it));
  };
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, {
      id: Date.now().toString(),
      text: newItem.trim(),
      completed: false
    }]);
    setNewItem("");
  };
  const removeItem = (id: string) => {
    setItems(items.filter(it => it.id !== id));
  };
  const getChecklistText = () => {
    return items.map(it => (it.completed ? "[x]" : "[ ]") + it.text).join("\n");
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const content = items.map(it => "<li>" + (it.completed ? "☑" : "☐") + it.text + "</li>").join("");
    printWindow.document.write("<div style='font-family: sans-serif; padding: 2rem;'><h1>Travel Document Checklist</h1><ul style='list-style-type: none; padding: 0; line-height: 1.8;'>" + content + "</ul></div>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = items.length === 0 ? 0 : Math.round(completedCount / items.length * 100);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Travel Document Checklist" description="Never forget a crucial document again. Comprehensive checklists for any trip." icon={CheckSquare} actions={<div className="flex gap-2">
 <CopyButton getText={getChecklistText} label="Copy List" />
 <ActionButton onClick={handlePrint} icon={Plane} label="Print" variant="outline" />
 <ResetButton onClick={() => loadPreset(tripType)} label="Reset Preset" />
 </div>} />

 <div className={"grid gap-6 md:grid-cols-3"}>
 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Trip Type</CardTitle>
 <CardDescription>Select a preset to get started.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Select Preset</Label>
 <Select value={tripType} onValueChange={loadPreset}>
 <SelectTrigger>
 <SelectValue placeholder="Select trip type" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="domestic">Domestic</SelectItem>
 <SelectItem value="international">International</SelectItem>
 <SelectItem value="business">Business</SelectItem>
 <SelectItem value="family">Family</SelectItem>
 <SelectItem value="adventure">Adventure</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 <Separator />
 <div className="space-y-2">
 <Label>Add Custom Item</Label>
 <div className="flex gap-2">
 <Input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem()} placeholder="e.g. Ski Pass" />
 <Button onClick={addItem} size="icon">
 <Plus className="h-4 w-4" />
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <div className="flex justify-between items-center">
 <div>
 <CardTitle>Your Checklist</CardTitle>
 <CardDescription>{completedCount} of {items.length} items packed</CardDescription>
 </div>
 <div className="text-2xl font-bold text-primary">{progressPercent}%</div>
 </div>
 <div className={"h-2 w-full bg-secondary rounded-full overflow-hidden mt-4"}>
 <div className={"h-full bg-primary transition-all"} style={{
                width: progressPercent + "%"
              }}></div>
 </div>
 </CardHeader>
 <CardContent>
 <div className="space-y-2 mt-4">
 {items.map(item => <div key={item.id} className={cn("flex items-center justify-between p-3 rounded-lg border transition-colors", item.completed ? "bg-muted/50" : "bg-card")}>
 <div className="flex items-center gap-3">
 <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" checked={item.completed} onChange={() => toggleItem(item.id)} />
 <span className={cn("text-sm font-medium", item.completed ? "line-through text-muted-foreground" : "")}>
 {item.text}
 </span>
 </div>
 <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="h-8 text-xs text-muted-foreground hover:text-destructive">
 Remove
 </Button>
 </div>)}
 {items.length === 0 && <div className="text-center py-8 text-muted-foreground">List is empty.</div>}
 </div>
 </CardContent>
 </GlassCard>
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
          <h3>Why Use Our Travel Document Checklist?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Document Checklist provides
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

export default TravelDocumentsClient;
