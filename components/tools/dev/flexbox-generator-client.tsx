"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Layout, Plus, Trash2, Copy, Sparkles, Shield, Zap } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface FlexItem {
 id: number;
 flexGrow: string;
 flexShrink: string;
 alignSelf: string;
}

export function FlexboxGeneratorClient() {
 const [flexDirection, setFlexDirection] = useState("row");
 const [justifyContent, setJustifyContent] = useState("flex-start");
 const [alignItems, setAlignItems] = useState("stretch");
 const [flexWrap, setFlexWrap] = useState("nowrap");
 const [gap, setGap] = useState("10");

 const defaultItems = [
 { id: 1, flexGrow:"0", flexShrink:"1", alignSelf:"auto"},
 { id: 2, flexGrow:"0", flexShrink:"1", alignSelf:"auto"},
 { id: 3, flexGrow:"0", flexShrink:"1", alignSelf:"auto"},
 ];
 const [items, setItems] = useState<FlexItem[]>(defaultItems);
 const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
 
 const handleReset = () => {
 setFlexDirection("row");
 setJustifyContent("flex-start");
 setAlignItems("stretch");
 setFlexWrap("nowrap");
 setGap("10");
 setItems(defaultItems);
 setSelectedItemId(null);
 };

 const addItem = () => {
 if (items.length >= 12) return;
 const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
 setItems([...items, { id: newId, flexGrow:"0", flexShrink:"1", alignSelf:"auto"}]);
 };

 const removeItem = (id: number) => {
 setItems(items.filter(i => i.id !== id));
 if (selectedItemId === id) setSelectedItemId(null);
 };

 const updateItem = (id: number, key: keyof FlexItem, value: string) => {
 setItems(items.map(i => i.id === id ? { ...i, [key]: value } : i));
 };

 const getCssCode = () => {
 let css =".flex-container {\n";
 css +="display: flex;\n";
 if (flexDirection !=="row") css +="flex-direction:"+ flexDirection +";\n";
 if (justifyContent !=="flex-start") css +="justify-content:"+ justifyContent +";\n";
 if (alignItems !=="stretch") css +="align-items:"+ alignItems +";\n";
 if (flexWrap !=="nowrap") css +="flex-wrap:"+ flexWrap +";\n";
 if (gap !=="0") css +="gap:"+ gap +"px;\n";
 css +="}\n\n";

 items.forEach((item, index) => {
 let itemCss ="";
 if (item.flexGrow !=="0") itemCss +="flex-grow:"+ item.flexGrow +";\n";
 if (item.flexShrink !=="1") itemCss +="flex-shrink:"+ item.flexShrink +";\n";
 if (item.alignSelf !=="auto") itemCss +="align-self:"+ item.alignSelf +";\n";
 
 if (itemCss !=="") {
 css +=".flex-item-"+ (index + 1) +"{\n"+ itemCss +"}\n\n";
 }
 });
 return css;
 };

 const selectedItem = items.find(i => i.id === selectedItemId);

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
 icon={Layout}
 title="CSS Flexbox Generator"
 description="Visually construct CSS flexbox layouts and generate code instantly."
 actions={
 <>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <GlassCard className="lg:col-span-1">
 <CardHeader>
 <CardTitle>Container Properties</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>flex-direction</Label>
 <Select value={flexDirection} onValueChange={setFlexDirection}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="row">row</SelectItem>
 <SelectItem value="row-reverse">row-reverse</SelectItem>
 <SelectItem value="column">column</SelectItem>
 <SelectItem value="column-reverse">column-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>justify-content</Label>
 <Select value={justifyContent} onValueChange={setJustifyContent}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="flex-start">flex-start</SelectItem>
 <SelectItem value="flex-end">flex-end</SelectItem>
 <SelectItem value="center">center</SelectItem>
 <SelectItem value="space-between">space-between</SelectItem>
 <SelectItem value="space-around">space-around</SelectItem>
 <SelectItem value="space-evenly">space-evenly</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>align-items</Label>
 <Select value={alignItems} onValueChange={setAlignItems}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="stretch">stretch</SelectItem>
 <SelectItem value="flex-start">flex-start</SelectItem>
 <SelectItem value="flex-end">flex-end</SelectItem>
 <SelectItem value="center">center</SelectItem>
 <SelectItem value="baseline">baseline</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>flex-wrap</Label>
 <Select value={flexWrap} onValueChange={setFlexWrap}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="nowrap">nowrap</SelectItem>
 <SelectItem value="wrap">wrap</SelectItem>
 <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>gap (px)</Label>
 <Input type="number"value={gap} onChange={(e) => setGap(e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle>Preview</CardTitle>
 <Button onClick={addItem} disabled={items.length >= 12} size="sm"variant="outline"className="flex items-center gap-1">
 <Plus className="w-4 h-4"/> Add Item
 </Button>
 </CardHeader>
 <CardContent>
 <div 
 className="bg-accent/20 rounded-md border border-dashed border-accent p-2 min-h-[300px]"
 style={{
 display:"flex",
 flexDirection: flexDirection as any,
 justifyContent,
 alignItems,
 flexWrap: flexWrap as any,
 gap: gap +"px"
 }}
 >
 {items.map((item, index) => (
 <div
 key={item.id}
 onClick={() => setSelectedItemId(item.id)}
 className={cn(
"flex items-center justify-center p-4 rounded bg-primary text-primary-foreground font-bold cursor-pointer transition-all border-2",
 selectedItemId === item.id ?"border-foreground":"border-transparent"
 )}
 style={{
 flexGrow: Number(item.flexGrow),
 flexShrink: Number(item.flexShrink),
 alignSelf: item.alignSelf !=="auto"? item.alignSelf : undefined
 }}
 >
 {index + 1}
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 {selectedItem && (
 <GlassCard>
 <CardHeader className="flex flex-row justify-between items-center pb-2">
 <CardTitle className="text-base">Item Properties (Item {items.findIndex(i => i.id === selectedItem.id) + 1})</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => removeItem(selectedItem.id)} className="text-destructive h-8 w-8 p-0">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </CardHeader>
 <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>flex-grow</Label>
 <Input type="number"min="0"value={selectedItem.flexGrow} onChange={(e) => updateItem(selectedItem.id,"flexGrow", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>flex-shrink</Label>
 <Input type="number"min="0"value={selectedItem.flexShrink} onChange={(e) => updateItem(selectedItem.id,"flexShrink", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>align-self</Label>
 <Select value={selectedItem.alignSelf} onValueChange={(val) => updateItem(selectedItem.id,"alignSelf", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="auto">auto</SelectItem>
 <SelectItem value="flex-start">flex-start</SelectItem>
 <SelectItem value="flex-end">flex-end</SelectItem>
 <SelectItem value="center">center</SelectItem>
 <SelectItem value="baseline">baseline</SelectItem>
 <SelectItem value="stretch">stretch</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>
 )}

 <GlassCard>
 <CardHeader className="flex flex-row justify-between items-center pb-2">
 <CardTitle className="text-base">CSS Code</CardTitle>
 <CopyButton getText={getCssCode} label="Copy CSS"/>
 </CardHeader>
 <CardContent>
 <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm text-muted-foreground whitespace-pre-wrap">
 {getCssCode()}
 </pre>
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
          <h3>Why Use Our CSS Flexbox Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS Flexbox Generator provides
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

      <RelatedTools currentToolUrl="/tools/dev/flexbox-generator" max={6} />

</div>
 );
}
