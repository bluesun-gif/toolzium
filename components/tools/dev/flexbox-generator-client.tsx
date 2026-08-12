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
import { Layout, Plus, Trash2, Copy } from"lucide-react";
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
 </div>
 );
}
