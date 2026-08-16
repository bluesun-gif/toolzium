"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { AlignVerticalSpaceAround, Code2, Copy, Layout, LayoutGrid, Plus, Smartphone, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";

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
    step:"01",
    title:"Set Container",
    description:"Choose display, direction, wrap, and justification.",
    icon: LayoutGrid,
  },
{
    step:"02",
    title:"Align Items",
    description:"Control cross-axis and main-axis alignment.",
    icon: AlignVerticalSpaceAround,
  },
{
    step:"03",
    title:"Copy CSS",
    description:"Export the flex container and item rules.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: LayoutGrid,
    title:"Container Controls",
    description:"Tune direction, wrap, and justify-content.",
  },
{
    icon: AlignVerticalSpaceAround,
    title:"Alignment Helpers",
    description:"Set align-items and align-self easily.",
  },
{
    icon: Smartphone,
    title:"Live Preview",
    description:"See items reflow as you change settings.",
  },
{
    icon: Code2,
    title:"Copy CSS",
    description:"Get the flexbox rules instantly.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Flexbox solved the nightmare of vertical centering and equal-height columns that plagued early CSS. It is a one-dimensional system: you lay items out along a main axis (row or column) and control how they distribute and align. For components like nav bars, button groups, and card rows, nothing is simpler.</p>
  <p>Two contexts matter. The container holds the flex properties; its children become flex items. The main axis follows flex-direction (row by default, or column). justify-content spaces items along that axis — flex-start, center, space-between, and friends. The cross axis is perpendicular, controlled by align-items for single lines and align-content for wrapped lines.</p>
  <p>Wrapping extends flexibility. With flex-wrap: wrap, items that would overflow drop to the next line, which is ideal for responsive chip lists and galleries. Combined with flex-basis and flex-grow, items can size proportionally: flex: 1 makes every item claim equal remaining space, while flex: 2 gives one item double the share.</p>
  <p>Alignment per item is possible through align-self, overriding the container's align-items for a specific child. This is handy when one element should sit at the bottom while siblings center. Pair flexbox with gap (supported in all modern browsers) to space items without margin hacks.</p>
  <p>Use flexbox for one dimension and Grid for two. Mixing them is normal: a Grid page shell with Flexbox inside cards. Our generator exposes every common property with a live preview so you can dial in spacing and alignment, then copy the CSS. Small, deliberate flex rules produce clean, responsive components with minimal code.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is Flexbox?",
    answer:"Flexbox is a one-dimensional layout model for distributing items in a row or column with powerful alignment and spacing control.",
  },
{
    question:"justify-content vs align-items?",
    answer:"justify-content positions items along the main axis; align-items positions them along the cross axis.",
  },
{
    question:"When should I use Flexbox over Grid?",
    answer:"Use Flexbox for a single row or column — nav bars, toolbars, card rows. Use Grid for full two-dimensional layouts.",
  },
{
    question:"What does flex-wrap do?",
    answer:"It allows items to wrap onto multiple lines when they exceed the container width instead of overflowing.",
  },
{
    question:"How do I space items evenly?",
    answer:"Use justify-content: space-between, space-around, or space-evenly depending on the gap pattern you want.",
  }
  ]}
/>
</div>
 );
}
