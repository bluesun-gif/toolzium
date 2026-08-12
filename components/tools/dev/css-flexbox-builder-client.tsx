"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { LayoutGrid, Copy, Plus, Trash2, RotateCcw, Sparkles } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

type FlexItem = { id: number; grow: number; shrink: number; basis: string; align: string; order: number };

const PRESETS = [
 { name:"Nav Bar", dir:"row", wrap:"nowrap", justify:"space-between", align:"center", gap: 20 },
 { name:"Card Grid", dir:"row", wrap:"wrap", justify:"flex-start", align:"stretch", gap: 16 },
 { name:"Holy Grail", dir:"column", wrap:"nowrap", justify:"flex-start", align:"stretch", gap: 0 },
 { name:"Centered", dir:"row", wrap:"nowrap", justify:"center", align:"center", gap: 10 },
];

export function CssFlexboxBuilderClient() {
 const [direction, setDirection] = useState("row");
 const [wrap, setWrap] = useState("nowrap");
 const [justify, setJustify] = useState("flex-start");
 const [alignItems, setAlignItems] = useState("stretch");
 const [alignContent, setAlignContent] = useState("stretch");
 const [gap, setGap] = useState(10);
 const [items, setItems] = useState<FlexItem[]>([
 { id: 1, grow: 0, shrink: 1, basis:"auto", align:"auto", order: 0 },
 { id: 2, grow: 0, shrink: 1, basis:"auto", align:"auto", order: 0 },
 { id: 3, grow: 0, shrink: 1, basis:"auto", align:"auto", order: 0 },
 ]);
 const [outputType, setOutputType] = useState<"css"|"tailwind">("css");

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const addItem = () => {
 if (items.length < 8) {
 setItems([...items, { id: Date.now(), grow: 0, shrink: 1, basis:"auto", align:"auto", order: 0 }]);
 } else {
 toast.error("Maximum 8 items allowed");
 }
 };

 const removeItem = (id: number) => {
 setItems(items.filter((i) => i.id !== id));
 };

 const updateItem = (id: number, field: keyof FlexItem, value: any) => {
 setItems(items.map((i) => i.id === id ? { ...i, [field]: value } : i));
 };

 const applyPreset = (preset: typeof PRESETS[0]) => {
 setDirection(preset.dir);
 setWrap(preset.wrap);
 setJustify(preset.justify);
 setAlignItems(preset.align);
 setGap(preset.gap);
 toast.success(`Applied ${preset.name} preset`);
 };

 const reset = () => {
 setDirection("row"); setWrap("nowrap"); setJustify("flex-start");
 setAlignItems("stretch"); setAlignContent("stretch"); setGap(10);
 setItems([{ id: 1, grow: 0, shrink: 1, basis:"auto", align:"auto", order: 0 }]);
 };

 const sortedItems = useMemo(() => {
 return [...items].sort((a, b) => a.order - b.order);
 }, [items]);

 const cssOutput = useMemo(() => {
 let css = `.container {\n display: flex;\n flex-direction: ${direction};\n flex-wrap: ${wrap};\n justify-content: ${justify};\n align-items: ${alignItems};\n align-content: ${alignContent};\n gap: ${gap}px;\n}\n\n`;
 items.forEach((item, i) => {
 css += `.item-${i + 1} {\n`;
 if (item.grow !== 0) css += ` flex-grow: ${item.grow};\n`;
 if (item.shrink !== 1) css += ` flex-shrink: ${item.shrink};\n`;
 if (item.basis !=="auto") css += ` flex-basis: ${item.basis};\n`;
 if (item.align !=="auto") css += ` align-self: ${item.align};\n`;
 if (item.order !== 0) css += ` order: ${item.order};\n`;
 css += `}\n\n`;
 });
 return css.trim();
 }, [direction, wrap, justify, alignItems, alignContent, gap, items]);

 const tailwindOutput = useMemo(() => {
 let tw = `<div class="flex flex-${direction} flex-${wrap} justify-${justify} items-${alignItems} content-${alignContent} gap-[${gap}px]">\n`;
 items.forEach((item, i) => {
 let classes = [];
 if (item.grow > 0) classes.push(`grow-${item.grow}`);
 if (item.shrink !== 1) classes.push(`shrink-${item.shrink}`);
 if (item.basis !=="auto") classes.push(`basis-[${item.basis}]`);
 if (item.align !=="auto") classes.push(`self-${item.align}`);
 if (item.order !== 0) classes.push(`order-${item.order}`);
 tw += ` <div class="${classes.join(' ')}">Item ${i + 1}</div>\n`;
 });
 tw += `</div>`;
 return tw;
 }, [direction, wrap, justify, alignItems, alignContent, gap, items]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
 <ToolPageHeader
 icon={LayoutGrid}
 title="CSS Flexbox Builder"
 description="Visual CSS Flexbox layout builder with live preview. Master flex-direction, alignment, and item properties with instant code generation."
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-4">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Sparkles className="w-4 h-4"/> Presets</CardTitle>
 </CardHeader>
 <CardContent className="p-4 grid grid-cols-2 gap-2">
 {PRESETS.map((p) => (
 <Button key={p.name} variant="outline"size="sm"onClick={() => applyPreset(p)}>{p.name}</Button>
 ))}
 <Button variant="destructive"size="sm"className="col-span-2"onClick={reset}><RotateCcw className="w-4 h-4 mr-2"/> Reset</Button>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Container Properties</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div>
 <Label>Direction</Label>
 <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="row">row</option>
 <option value="row-reverse">row-reverse</option>
 <option value="column">column</option>
 <option value="column-reverse">column-reverse</option>
 </select>
 </div>
 <div>
 <Label>Wrap</Label>
 <select value={wrap} onChange={(e) => setWrap(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="nowrap">nowrap</option>
 <option value="wrap">wrap</option>
 <option value="wrap-reverse">wrap-reverse</option>
 </select>
 </div>
 <div>
 <Label>Justify Content</Label>
 <select value={justify} onChange={(e) => setJustify(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="flex-start">flex-start</option>
 <option value="flex-end">flex-end</option>
 <option value="center">center</option>
 <option value="space-between">space-between</option>
 <option value="space-around">space-around</option>
 <option value="space-evenly">space-evenly</option>
 </select>
 </div>
 <div>
 <Label>Align Items</Label>
 <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="stretch">stretch</option>
 <option value="flex-start">flex-start</option>
 <option value="flex-end">flex-end</option>
 <option value="center">center</option>
 <option value="baseline">baseline</option>
 </select>
 </div>
 <div>
 <Label>Gap ({gap}px)</Label>
 <input type="range"min="0"max="40"value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full mt-1"/>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Child Items ({items.length}/8)</CardTitle>
 <Button variant="outline"size="sm"onClick={addItem}><Plus className="w-4 h-4"/></Button>
 </CardHeader>
 <CardContent className="p-4 space-y-4 max-h-96 overflow-y-auto">
 {items.map((item, index) => (
 <div key={item.id} className="p-3 border border-border/50 rounded-lg space-y-2 bg-muted/10">
 <div className="flex justify-between items-center">
 <span className="text-xs font-bold">Item #{index + 1}</span>
 <Button variant="ghost"size="icon"onClick={() => removeItem(item.id)}><Trash2 className="w-3 h-3 text-red-500"/></Button>
 </div>
 <div className="grid grid-cols-2 gap-2 text-xs">
 <div>
 <Label>Grow</Label>
 <Input type="number"min="0"max="5"value={item.grow} onChange={(e) => updateItem(item.id,"grow", Number(e.target.value))} />
 </div>
 <div>
 <Label>Shrink</Label>
 <Input type="number"min="0"max="5"value={item.shrink} onChange={(e) => updateItem(item.id,"shrink", Number(e.target.value))} />
 </div>
 <div>
 <Label>Basis</Label>
 <Input value={item.basis} onChange={(e) => updateItem(item.id,"basis", e.target.value)} placeholder="auto"/>
 </div>
 <div>
 <Label>Order</Label>
 <Input type="number"min="-5"max="5"value={item.order} onChange={(e) => updateItem(item.id,"order", Number(e.target.value))} />
 </div>
 </div>
 <div>
 <Label>Align Self</Label>
 <select value={item.align} onChange={(e) => updateItem(item.id,"align", e.target.value)} className="w-full rounded border border-border/70 bg-background/80 p-1 text-xs mt-1">
 <option value="auto">auto</option>
 <option value="flex-start">flex-start</option>
 <option value="flex-end">flex-end</option>
 <option value="center">center</option>
 <option value="baseline">baseline</option>
 <option value="stretch">stretch</option>
 </select>
 </div>
 </div>
 ))}
 </CardContent>
 </Card>
 </div>

 <div className="lg:col-span-2 space-y-6">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Live Preview</CardTitle>
 </CardHeader>
 <CardContent className="p-6">
 <div
 style={{
 display:"flex",
 flexDirection: direction as any,
 flexWrap: wrap as any,
 justifyContent: justify,
 alignItems: alignItems,
 alignContent: alignContent,
 gap: `${gap}px`,
 }}
 className="w-full min-h-[300px] bg-muted/30 rounded-lg border border-border/50 p-4"
 >
 {sortedItems.map((item, i) => (
 <div
 key={item.id}
 style={{
 flexGrow: item.grow,
 flexShrink: item.shrink,
 flexBasis: item.basis,
 alignSelf: item.align as any,
 order: item.order,
 }}
 className="bg-primary text-primary-foreground flex items-center justify-center font-bold rounded min-w-[60px] min-h-[60px] p-4 shadow-md transition-all"
 >
 {i + 1}
 </div>
 ))}
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Generated Code</CardTitle>
 <div className="flex gap-2">
 <Button variant={outputType ==="css"?"default":"outline"} size="sm"onClick={() => setOutputType("css")}>CSS</Button>
 <Button variant={outputType ==="tailwind"?"default":"outline"} size="sm"onClick={() => setOutputType("tailwind")}>Tailwind</Button>
 <Button variant="outline"size="sm"onClick={() => handleCopy(outputType ==="css"? cssOutput : tailwindOutput)}><Copy className="w-4 h-4"/></Button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <textarea readOnly value={outputType ==="css"? cssOutput : tailwindOutput} className={textareaClass} rows={14} />
 </CardContent>
 </Card>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Set Container Rules", description:"Define how the flex container distributes space using direction, wrap, and justify.", icon: LayoutGrid },
 { step:"02", title:"Tweak Child Items", description:"Adjust individual item properties like flex-grow, shrink, and align-self.", icon: Plus },
 { step:"03", title:"Export Code", description:"Copy the generated standard CSS or Tailwind classes directly into your project.", icon: Copy },
 ]}
 badges={["100% Free","Visual Builder","Tailwind Support"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: LayoutGrid, title:"Visual Live Preview", description:"See your flexbox layout update in real-time as you adjust container and child properties."},
 { icon: Sparkles, title:"Layout Presets", description:"Instantly apply common layouts like Navigation Bars, Card Grids, and Holy Grail."},
 { icon: Copy, title:"Dual Code Export", description:"Generate both raw CSS properties and modern Tailwind CSS utility classes."},
 { icon: Plus, title:"Per-Item Control", description:"Manage up to 8 individual flex items with unique grow, shrink, basis, and order values."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>Mastering CSS Flexbox: The Layout Engine of the Modern Web</h3>
 <p>Before the advent of CSS Flexbox, web layout was a hacky endeavor relying on floats, clearfixes, and rigid table structures. Flexbox (Flexible Box Layout) revolutionized how developers arrange content by introducing a one-dimensional layout model that distributes space among items in a container, even when their sizes are unknown or dynamic. The core philosophy of Flexbox is the relationship between a"flex container"and its"flex items."The container controls the macro-alignment (how items are grouped and distributed along the main and cross axes), while the items can override these rules on an individual basis.</p>
 <p>Understanding the axes is critical. When <code>flex-direction</code> is set to <code>row</code>, the main axis runs horizontally (left-to-right), and the cross axis runs vertically. Properties like <code>justify-content</code> always align items along the main axis, while <code>align-items</code> aligns them along the cross axis. If you change the direction to <code>column</code>, these axes flip: <code>justify-content</code> now controls vertical distribution, and <code>align-items</code> controls horizontal alignment. This mental model shift is where many developers stumble, but once internalized, it makes complex UI arrangements trivial to implement.</p>
 <h3>The Power of Flex-Grow, Flex-Shrink, and Flex-Basis</h3>
 <p>The true magic of Flexbox lies in the <code>flex</code> shorthand property, which dictates how items react when the container's available space changes. <code>flex-grow</code> determines how much of the remaining positive space an item should consume. If all items have <code>flex-grow: 1</code>, they share space equally. If one item has <code>flex-grow: 2</code>, it gets twice as much of the leftover space as the others. Conversely, <code>flex-shrink</code> dictates how items compress when the container is too small. Finally, <code>flex-basis</code> acts as the hypothetical starting size of the item before any growing or shrinking occurs. By combining these three properties, developers can create fluid, responsive interfaces that adapt beautifully to any screen size without relying on complex media queries.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the difference between justify-content and align-items?", answer:"justify-content distributes space along the main axis (the direction defined by flex-direction), while align-items aligns items along the cross axis (perpendicular to the main axis)."},
 { question:"When should I use Flexbox vs CSS Grid?", answer:"Use Flexbox for one-dimensional layouts (a single row or column of items). Use CSS Grid for two-dimensional layouts where you need precise control over both rows and columns simultaneously."},
 { question:"Why isn't my flex item shrinking?", answer:"By default, flex items have a minimum size based on their content (min-width: auto). To allow an item to shrink below its content size, add `min-width: 0` or `overflow: hidden` to the flex item."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/css-flexbox-builder"max={6} />
 </div>
 );
}

export default CssFlexboxBuilderClient;
