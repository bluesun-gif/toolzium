"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Layout, Code, Copy, RotateCcw, Plus, Trash2 } from"lucide-react";
import { toast } from"react-hot-toast";

type FlexItem = {
 id: number;
 width: string;
 height: string;
 flexGrow: string;
 flexShrink: string;
 flexBasis: string;
 order: string;
 alignSelf: string;
};

export function FlexboxPlaygroundClient() {
 const [flexDirection, setFlexDirection] = useState("row");
 const [justifyContent, setJustifyContent] = useState("flex-start");
 const [alignItems, setAlignItems] = useState("stretch");
 const [flexWrap, setFlexWrap] = useState("nowrap");
 const [gap, setGap] = useState("10px");

 const [items, setItems] = useState<FlexItem[]>([
 { id: 1, width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"},
 { id: 2, width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"},
 { id: 3, width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"}
 ]);

 const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

 const handleReset = () => {
 setFlexDirection("row");
 setJustifyContent("flex-start");
 setAlignItems("stretch");
 setFlexWrap("nowrap");
 setGap("10px");
 setItems([
 { id: 1, width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"},
 { id: 2, width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"},
 { id: 3, width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"}
 ]);
 setSelectedItemId(null);
 toast.success("Reset to defaults");
 };

 const addItem = () => {
 setItems([...items, {
 id: Date.now(), width:"100px", height:"100px", flexGrow:"0", flexShrink:"1", flexBasis:"auto", order:"0", alignSelf:"auto"
 }]);
 };

 const removeItem = (id: number) => {
 if (selectedItemId === id) setSelectedItemId(null);
 setItems(items.filter(i => i.id !== id));
 };

 const updateItem = (id: number, key: keyof FlexItem, value: string) => {
 setItems(items.map(item => item.id === id ? { ...item, [key]: value } : item));
 };

 const selectedItem = items.find(i => i.id === selectedItemId);

 const generateCSS = () => {
 return `.container {
 display: flex;
 flex-direction: ${flexDirection};
 justify-content: ${justifyContent};
 align-items: ${alignItems};
 flex-wrap: ${flexWrap};
 gap: ${gap};
}`;
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Layout}
 title="CSS Flexbox Playground"
 description="Interactive CSS Flexbox layout builder. Visually create flexbox layouts and generate CSS code."
 actions={
 <>
 <CopyButton getText={generateCSS} label="Copy CSS"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
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
 <Label>gap</Label>
 <Input value={gap} onChange={(e) => setGap(e.target.value)} />
 </div>
 <Button className="w-full mt-4"onClick={addItem}><Plus className="w-4 h-4 mr-2"/> Add Item</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2 flex flex-col h-[500px]">
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 </CardHeader>
 <CardContent className="flex-1 overflow-auto bg-muted/30 p-4 relative">
 <div 
 className="border-2 border-dashed border-primary/50 h-full w-full p-2 bg-background/50 rounded flex transition-all"
 style={{
 flexDirection: flexDirection as any,
 justifyContent: justifyContent as any,
 alignItems: alignItems as any,
 flexWrap: flexWrap as any,
 gap: gap
 }}
 >
 {items.map((item, index) => (
 <div
 key={item.id}
 className={cn(
"flex items-center justify-center font-bold text-lg bg-primary/20 text-primary border-2 cursor-pointer transition-colors relative group",
 selectedItemId === item.id ?"border-primary bg-primary/40":"border-primary/30"
 )}
 style={{
 width: item.width,
 height: item.height,
 flexGrow: item.flexGrow,
 flexShrink: item.flexShrink,
 flexBasis: item.flexBasis,
 order: item.order as any,
 alignSelf: item.alignSelf as any
 }}
 onClick={() => setSelectedItemId(item.id)}
 >
 {index + 1}
 <button 
 className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground rounded-full p-1 transition-opacity"
 onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
 >
 <Trash2 className="w-3 h-3"/>
 </button>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 {selectedItem && (
 <GlassCard className="md:col-span-3">
 <CardHeader>
 <CardTitle>Item Properties (Item {items.findIndex(i => i.id === selectedItemId) + 1})</CardTitle>
 </CardHeader>
 <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-2">
 <Label>flex-grow</Label>
 <Input type="number"value={selectedItem.flexGrow} onChange={(e) => updateItem(selectedItemId!, 'flexGrow', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>flex-shrink</Label>
 <Input type="number"value={selectedItem.flexShrink} onChange={(e) => updateItem(selectedItemId!, 'flexShrink', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>flex-basis</Label>
 <Input value={selectedItem.flexBasis} onChange={(e) => updateItem(selectedItemId!, 'flexBasis', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>order</Label>
 <Input type="number"value={selectedItem.order} onChange={(e) => updateItem(selectedItemId!, 'order', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>align-self</Label>
 <Select value={selectedItem.alignSelf} onValueChange={(val) => updateItem(selectedItemId!, 'alignSelf', val)}>
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
 <div className="space-y-2">
 <Label>width</Label>
 <Input value={selectedItem.width} onChange={(e) => updateItem(selectedItemId!, 'width', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>height</Label>
 <Input value={selectedItem.height} onChange={(e) => updateItem(selectedItemId!, 'height', e.target.value)} />
 </div>
 </CardContent>
 </GlassCard>
 )}
 </div>
 
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Code className="w-5 h-5"/> Generated CSS</CardTitle>
 </CardHeader>
 <CardContent>
 <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
 {generateCSS()}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 );
}
