"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { Code2, Copy, Grid, Layout, LayoutGrid, Move, Plus, Smartphone, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";

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

 const [items, setItems] = useState<GridItem[]>([
 { id: 1, colSpan: 1, rowSpan: 1 },
 { id: 2, colSpan: 1, rowSpan: 1 },
 { id: 3, colSpan: 1, rowSpan: 1 },
 { id: 4, colSpan: 1, rowSpan: 1 },
 { id: 5, colSpan: 1, rowSpan: 1 },
 { id: 6, colSpan: 1, rowSpan: 1 },
 ]);

 const [nextId, setNextId] = useState(7);

 const addItem = () => {
 setItems([...items, { id: nextId, colSpan: 1, rowSpan: 1 }]);
 setNextId(nextId + 1);
 };

 const removeItem = (id: number) => {
 setItems(items.filter(item => item.id !== id));
 };

 const updateItem = (id: number, field: keyof GridItem, value: number) => {
 setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
 };

 const loadPreset = (preset: string) => {
 if (preset ==="sidebar") {
 setColumns("250px 1fr");
 setRows("1fr");
 setItems([{ id: 1, colSpan: 1, rowSpan: 1 }, { id: 2, colSpan: 1, rowSpan: 1 }]);
 } else if (preset ==="holy-grail") {
 setColumns("200px 1fr 200px");
 setRows("auto 1fr auto");
 setItems([
 { id: 1, colSpan: 3, rowSpan: 1 }, // Header
 { id: 2, colSpan: 1, rowSpan: 1 }, // Nav
 { id: 3, colSpan: 1, rowSpan: 1 }, // Main
 { id: 4, colSpan: 1, rowSpan: 1 }, // Aside
 { id: 5, colSpan: 3, rowSpan: 1 }, // Footer
 ]);
 } else if (preset ==="gallery") {
 setColumns("repeat(auto-fit, minmax(150px, 1fr))");
 setRows("auto");
 setItems(Array.from({ length: 8 }, (_, i) => ({ id: i + 1, colSpan: 1, rowSpan: 1 })));
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
 setItems([
 { id: 1, colSpan: 1, rowSpan: 1 },
 { id: 2, colSpan: 1, rowSpan: 1 },
 { id: 3, colSpan: 1, rowSpan: 1 },
 { id: 4, colSpan: 1, rowSpan: 1 },
 { id: 5, colSpan: 1, rowSpan: 1 },
 { id: 6, colSpan: 1, rowSpan: 1 },
 ]);
 setNextId(7);
 };

 const getCssSnippet = () => {
 let css =".grid-container {\n";
 css +="display: grid;\n";
 css +="grid-template-columns:"+ columns +";\n";
 css +="grid-template-rows:"+ rows +";\n";
 if (gap !=="0") css +="gap:"+ gap +"px;\n";
 if (justifyItems !=="stretch") css +="justify-items:"+ justifyItems +";\n";
 if (alignItems !=="stretch") css +="align-items:"+ alignItems +";\n";
 if (justifyContent !=="start") css +="justify-content:"+ justifyContent +";\n";
 if (alignContent !=="start") css +="align-content:"+ alignContent +";\n";
 css +="}\n\n";

 items.forEach((item, index) => {
 if (item.colSpan > 1 || item.rowSpan > 1) {
 css +=".item-"+ (index + 1) +"{\n";
 if (item.colSpan > 1) css +="grid-column: span"+ item.colSpan +";\n";
 if (item.rowSpan > 1) css +="grid-row: span"+ item.rowSpan +";\n";
 css +="}\n\n";
 }
 });
 return css;
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Layout}
 title="CSS Grid Builder"
 description="Interactive visual CSS Grid builder and playground"
 actions={
 <>
 <CopyButton getText={getCssSnippet} label="Copy CSS"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Container Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Grid Template Columns</Label>
 <Input value={columns} onChange={(e) => setColumns(e.target.value)} placeholder="e.g. repeat(3, 1fr)"/>
 </div>
 <div className="space-y-2">
 <Label>Grid Template Rows</Label>
 <Input value={rows} onChange={(e) => setRows(e.target.value)} placeholder="e.g. repeat(3, 100px)"/>
 </div>
 <div className="space-y-2">
 <Label>Gap (px)</Label>
 <Input type="number"value={gap} onChange={(e) => setGap(e.target.value)} />
 </div>
 
 <Separator />
 <div className="space-y-2">
 <Label>Presets</Label>
 <div className="flex flex-wrap gap-2">
 <ActionButton onClick={() => loadPreset("sidebar")} icon={Layout} label="Sidebar"variant="outline"size="sm"/>
 <ActionButton onClick={() => loadPreset("holy-grail")} icon={Layout} label="Holy Grail"variant="outline"size="sm"/>
 <ActionButton onClick={() => loadPreset("gallery")} icon={Grid} label="Gallery"variant="outline"size="sm"/>
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
 <ActionButton onClick={addItem} icon={Plus} label="Add Item"variant="outline"size="sm"/>
 </CardHeader>
 <CardContent>
 <div
 className="w-full min-h-[400px] border border-dashed border-gray-300 rounded-lg p-4 overflow-auto bg-gray-50/50 dark:bg-gray-900/50"
 style={{
 display:"grid",
 gridTemplateColumns: columns,
 gridTemplateRows: rows,
 gap: gap +"px",
 justifyItems: justifyItems,
 alignItems: alignItems,
 justifyContent: justifyContent,
 alignContent: alignContent,
 }}
 >
 {items.map((item, index) => (
 <div
 key={item.id}
 className="relative bg-primary/10 border-2 border-primary/20 rounded-md p-4 flex flex-col items-center justify-center min-h-[50px] transition-all hover:border-primary/50 group"
 style={{
 gridColumn: item.colSpan > 1 ?"span"+ item.colSpan :"auto",
 gridRow: item.rowSpan > 1 ?"span"+ item.rowSpan :"auto",
 }}
 >
 <span className="text-xl font-bold text-primary/60 mb-2">{index + 1}</span>
 
 <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex flex-col items-center justify-center gap-2 p-2">
 <div className="flex items-center gap-2 text-xs w-full">
 <Label className="text-[10px] w-8">Col:</Label>
 <Input 
 type="number"
 className="h-6 text-xs px-1"
 value={item.colSpan} 
 min={1} 
 onChange={(e) => updateItem(item.id,"colSpan", parseInt(e.target.value) || 1)} 
 />
 </div>
 <div className="flex items-center gap-2 text-xs w-full">
 <Label className="text-[10px] w-8">Row:</Label>
 <Input 
 type="number"
 className="h-6 text-xs px-1"
 value={item.rowSpan} 
 min={1} 
 onChange={(e) => updateItem(item.id,"rowSpan", parseInt(e.target.value) || 1)} 
 />
 </div>
 <button 
 onClick={() => removeItem(item.id)}
 className="absolute top-1 right-1 text-red-500 hover:text-red-700"
 title="Remove item"
 >
 <Trash2 className="w-4 h-4"/>
 </button>
 </div>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Generated CSS</CardTitle>
 <CardDescription>Copy this code to use in your project</CardDescription>
 </div>
 <CopyButton getText={getCssSnippet} label="Copy CSS"/>
 </CardHeader>
 <CardContent>
 <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
 <code>{getCssSnippet()}</code>
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Define Columns & Rows",
    description:"Set the number of tracks and their sizes with the visual editor.",
    icon: LayoutGrid,
  },
{
    step:"02",
    title:"Place Items",
    description:"Drag or assign items to specific grid areas.",
    icon: Move,
  },
{
    step:"03",
    title:"Generate Code",
    description:"Copy the final CSS grid template and area map.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: LayoutGrid,
    title:"Visual Track Editor",
    description:"Add, remove, and size rows and columns instantly.",
  },
{
    icon: Move,
    title:"Area Placement",
    description:"Name areas and place children with grid-template-areas.",
  },
{
    icon: Smartphone,
    title:"Responsive Preview",
    description:"See how the layout collapses on smaller screens.",
  },
{
    icon: Code2,
    title:"Clean CSS Output",
    description:"Export production-ready grid CSS.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>CSS Grid transformed web layout by making two-dimensional positioning first-class. Before Grid, developers hacked rows and columns with floats and tables. Now a single container with display:grid and a few properties handles complex, gap-perfect layouts without extra markup.</p>
  <p>The container defines tracks. grid-template-columns and grid-template-rows accept fixed sizes like 200px, flexible fractions like 1fr, and functions such as minmax(100px, 1fr). The fr unit distributes free space proportionally, so 1fr 2fr gives the second column twice the slack of the first. The gap property adds consistent spacing without margins.</p>
  <p>Placement is where Grid shines. You can let items auto-flow, or explicitly assign them with grid-column and grid-row using line numbers. For readability, name areas with grid-template-areas and a small ASCII-like map — then each child simply references its area name. This makes rearranging a layout as easy as editing text.</p>
  <p>Responsiveness comes from repeat() combined with auto-fit and minmax(). The pattern repeat(auto-fit, minmax(250px, 1fr)) creates as many 250px-minimum columns as fit the width and stretches them to fill the row. No media query needed for many card layouts. For bigger structural shifts, media queries can swap the entire area map.</p>
  <p>Watch source order and accessibility. Grid can place items visually anywhere, but screen readers follow DOM order. Keep important content early in the markup and use Grid purely for visual arrangement. Use our builder to experiment visually, then copy the generated CSS into your stylesheet with confidence.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is CSS Grid?",
    answer:"CSS Grid is a two-dimensional layout system that lets you align items in rows and columns simultaneously, ideal for full page layouts.",
  },
{
    question:"Grid vs Flexbox — which should I use?",
    answer:"Use Grid for two-dimensional layouts like page scaffolding. Use Flexbox for one-dimensional rows or columns such as nav bars and button groups.",
  },
{
    question:"What are grid-template-areas?",
    answer:"They let you name regions of the grid and place items by referencing those names, making layouts readable and easy to rearrange.",
  },
{
    question:"How do I make a grid responsive?",
    answer:"Use minmax(), auto-fit, and media queries. A common pattern is repeat(auto-fit, minmax(200px, 1fr)) for self-adjusting columns.",
  },
{
    question:"Can I overlap grid items?",
    answer:"Yes. Items placed in the same cell or area stack, and you control stacking order with z-index.",
  }
  ]}
/>
</div>
 );
}
