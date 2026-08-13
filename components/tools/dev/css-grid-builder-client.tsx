"use client";
import { Button } from"@/components/ui/button";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton, ActionButton } from "@/components/shared/action-buttons";
import { Layout, Grid, Copy, Plus, Trash2, Sparkles, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface GridItem {
  id: number;
  colSpan: number;
  rowSpan: number;
}
export function CssGridBuilderClient() {
  const [columns, setColumns] = useState("repeat(3, 1fr)");
  const [rows, setRows] = useState("repeat(3, 100px)");
  const [gap, setGap] = useState("16");
  const [justifyItems, setJustifyItems] = useState("stretch");
  const [alignItems, setAlignItems] = useState("stretch");
  const [justifyContent, setJustifyContent] = useState("start");
  const [alignContent, setAlignContent] = useState("start");
  const [items, setItems] = useState<GridItem[]>([{
    id: 1,
    colSpan: 1,
    rowSpan: 1
  }, {
    id: 2,
    colSpan: 1,
    rowSpan: 1
  }, {
    id: 3,
    colSpan: 1,
    rowSpan: 1
  }, {
    id: 4,
    colSpan: 1,
    rowSpan: 1
  }, {
    id: 5,
    colSpan: 1,
    rowSpan: 1
  }, {
    id: 6,
    colSpan: 1,
    rowSpan: 1
  }]);
  const [nextId, setNextId] = useState(7);
  const addItem = () => {
    setItems([...items, {
      id: nextId,
      colSpan: 1,
      rowSpan: 1
    }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  const updateItem = (id: number, field: keyof GridItem, value: number) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item));
  };
  const loadPreset = (preset: string) => {
    if (preset === "sidebar") {
      setColumns("250px 1fr");
      setRows("1fr");
      setItems([{
        id: 1,
        colSpan: 1,
        rowSpan: 1
      }, {
        id: 2,
        colSpan: 1,
        rowSpan: 1
      }]);
    } else if (preset === "holy-grail") {
      setColumns("200px 1fr 200px");
      setRows("auto 1fr auto");
      setItems([{
        id: 1,
        colSpan: 3,
        rowSpan: 1
      },
      // Header
      {
        id: 2,
        colSpan: 1,
        rowSpan: 1
      },
      // Nav
      {
        id: 3,
        colSpan: 1,
        rowSpan: 1
      },
      // Main
      {
        id: 4,
        colSpan: 1,
        rowSpan: 1
      },
      // Aside
      {
        id: 5,
        colSpan: 3,
        rowSpan: 1
      } // Footer
      ]);
    } else if (preset === "gallery") {
      setColumns("repeat(auto-fit, minmax(150px, 1fr))");
      setRows("auto");
      setItems(Array.from({
        length: 8
      }, (_, i) => ({
        id: i + 1,
        colSpan: 1,
        rowSpan: 1
      })));
    }
    setNextId(100);
  };
  const handleReset = () => {
    setColumns("repeat(3, 1fr)");
    setRows("repeat(3, 100px)");
    setGap("16");
    setJustifyItems("stretch");
    setAlignItems("stretch");
    setJustifyContent("start");
    setAlignContent("start");
    setItems([{
      id: 1,
      colSpan: 1,
      rowSpan: 1
    }, {
      id: 2,
      colSpan: 1,
      rowSpan: 1
    }, {
      id: 3,
      colSpan: 1,
      rowSpan: 1
    }, {
      id: 4,
      colSpan: 1,
      rowSpan: 1
    }, {
      id: 5,
      colSpan: 1,
      rowSpan: 1
    }, {
      id: 6,
      colSpan: 1,
      rowSpan: 1
    }]);
    setNextId(7);
  };
  const getCssSnippet = () => {
    let css = ".grid-container {\n";
    css += "display: grid;\n";
    css += "grid-template-columns:" + columns + ";\n";
    css += "grid-template-rows:" + rows + ";\n";
    if (gap !== "0") css += "gap:" + gap + "px;\n";
    if (justifyItems !== "stretch") css += "justify-items:" + justifyItems + ";\n";
    if (alignItems !== "stretch") css += "align-items:" + alignItems + ";\n";
    if (justifyContent !== "start") css += "justify-content:" + justifyContent + ";\n";
    if (alignContent !== "start") css += "align-content:" + alignContent + ";\n";
    css += "}\n\n";
    items.forEach((item, index) => {
      if (item.colSpan > 1 || item.rowSpan > 1) {
        css += ".item-" + (index + 1) + "{\n";
        if (item.colSpan > 1) css += "grid-column: span" + item.colSpan + ";\n";
        if (item.rowSpan > 1) css += "grid-row: span" + item.rowSpan + ";\n";
        css += "}\n\n";
      }
    });
    return css;
  };
  return <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader icon={Layout} title="CSS Grid Builder" description="Interactive visual CSS Grid builder and playground" actions={<>
 <CopyButton getText={getCssSnippet} label="Copy CSS" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Container Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Grid Template Columns</Label>
 <Input value={columns} onChange={e => setColumns(e.target.value)} placeholder="e.g. repeat(3, 1fr)" />
 </div>
 <div className="space-y-2">
 <Label>Grid Template Rows</Label>
 <Input value={rows} onChange={e => setRows(e.target.value)} placeholder="e.g. repeat(3, 100px)" />
 </div>
 <div className="space-y-2">
 <Label>Gap (px)</Label>
 <Input type="number" value={gap} onChange={e => setGap(e.target.value)} />
 </div>
 
 <Separator />
 <div className="space-y-2">
 <Label>Presets</Label>
 <div className="flex flex-wrap gap-2">
 <ActionButton onClick={() => loadPreset("sidebar")} icon={Layout} label="Sidebar" variant="outline" size="sm" />
 <ActionButton onClick={() => loadPreset("holy-grail")} icon={Layout} label="Holy Grail" variant="outline" size="sm" />
 <ActionButton onClick={() => loadPreset("gallery")} icon={Grid} label="Gallery" variant="outline" size="sm" />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Alignment</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Justify Items</Label>
 <Select value={justifyItems} onValueChange={setJustifyItems}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="stretch">Stretch (default)</SelectItem>
 <SelectItem value="start">Start</SelectItem>
 <SelectItem value="end">End</SelectItem>
 <SelectItem value="center">Center</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Align Items</Label>
 <Select value={alignItems} onValueChange={setAlignItems}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="stretch">Stretch (default)</SelectItem>
 <SelectItem value="start">Start</SelectItem>
 <SelectItem value="end">End</SelectItem>
 <SelectItem value="center">Center</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle>Grid Preview</CardTitle>
 <ActionButton onClick={addItem} icon={Plus} label="Add Item" variant="outline" size="sm" />
 </CardHeader>
 <CardContent>
 <div className="w-full min-h-[400px] border border-dashed border-gray-300 rounded-lg p-4 overflow-auto bg-gray-50/50 dark:bg-gray-900/50" style={{
              display: "grid",
              gridTemplateColumns: columns,
              gridTemplateRows: rows,
              gap: gap + "px",
              justifyItems: justifyItems,
              alignItems: alignItems,
              justifyContent: justifyContent,
              alignContent: alignContent
            }}>
 {items.map((item, index) => <div key={item.id} className="relative bg-primary/10 border-2 border-primary/20 rounded-md p-4 flex flex-col items-center justify-center min-h-[50px] transition-all hover:border-primary/50 group" style={{
                gridColumn: item.colSpan > 1 ? "span" + item.colSpan : "auto",
                gridRow: item.rowSpan > 1 ? "span" + item.rowSpan : "auto"
              }}>
 <span className="text-xl font-bold text-primary/60 mb-2">{index + 1}</span>
 
 <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex flex-col items-center justify-center gap-2 p-2">
 <div className="flex items-center gap-2 text-xs w-full">
 <Label className="text-[10px] w-8">Col:</Label>
 <Input type="number" className="h-6 text-xs px-1" value={item.colSpan} min={1} onChange={e => updateItem(item.id, "colSpan", parseInt(e.target.value) || 1)} />
 </div>
 <div className="flex items-center gap-2 text-xs w-full">
 <Label className="text-[10px] w-8">Row:</Label>
 <Input type="number" className="h-6 text-xs px-1" value={item.rowSpan} min={1} onChange={e => updateItem(item.id, "rowSpan", parseInt(e.target.value) || 1)} />
 </div>
 <Button onClick={() => removeItem(item.id)} className="absolute top-1 right-1 text-red-500 hover:text-red-700" title="Remove item">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Generated CSS</CardTitle>
 <CardDescription>Copy this code to use in your project</CardDescription>
 </div>
 <CopyButton getText={getCssSnippet} label="Copy CSS" />
 </CardHeader>
 <CardContent>
 <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
 <code>{getCssSnippet()}</code>
 </pre>
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
          <h3>Why Use Our CSS Grid Builder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS Grid Builder provides
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

      <RelatedTools currentToolUrl="/tools/dev/css-grid-builder" max={6} />

  </div>;
}