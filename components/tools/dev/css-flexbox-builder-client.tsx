"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Layout, Sliders, Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

export function CssFlexboxBuilderClient() {
  const [flexDirection, setFlexDirection] = useState("row");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [alignContent, setAlignContent] = useState("stretch");
  const [gap, setGap] = useState(10);
  
  const [items, setItems] = useState([
    { id: 1, text: "1", flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
    { id: 2, text: "2", flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
    { id: 3, text: "3", flexGrow: 0, flexShrink: 1, flexBasis: "auto" }
  ]);
  const [nextId, setNextId] = useState(4);

  const addItem = () => {
    setItems([...items, { id: nextId, text: String(nextId), flexGrow: 0, flexShrink: 1, flexBasis: "auto" }]);
    setNextId(nextId + 1);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const reset = () => {
    setFlexDirection("row");
    setFlexWrap("nowrap");
    setJustifyContent("flex-start");
    setAlignItems("stretch");
    setAlignContent("stretch");
    setGap(10);
    setItems([
      { id: 1, text: "1", flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
      { id: 2, text: "2", flexGrow: 0, flexShrink: 1, flexBasis: "auto" },
      { id: 3, text: "3", flexGrow: 0, flexShrink: 1, flexBasis: "auto" }
    ]);
    setNextId(4);
    toast.success("Reset to defaults");
  };

  const getContainerCss = () => {
    let css = ".container {\n";
    css += "  display: flex;\n";
    if (flexDirection !== "row") css += "  flex-direction: " + flexDirection + ";\n";
    if (flexWrap !== "nowrap") css += "  flex-wrap: " + flexWrap + ";\n";
    if (justifyContent !== "flex-start") css += "  justify-content: " + justifyContent + ";\n";
    if (alignItems !== "stretch") css += "  align-items: " + alignItems + ";\n";
    if (alignContent !== "stretch" && flexWrap !== "nowrap") css += "  align-content: " + alignContent + ";\n";
    if (gap > 0) css += "  gap: " + gap + "px;\n";
    css += "}\n\n";

    items.forEach((item, index) => {
      if (item.flexGrow !== 0 || item.flexShrink !== 1 || item.flexBasis !== "auto") {
        css += ".item-" + (index + 1) + " {\n";
        css += "  flex: " + item.flexGrow + " " + item.flexShrink + " " + item.flexBasis + ";\n";
        css += "}\n";
      }
    });
    
    return css;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Layout}
        title="CSS Flexbox Layout Visual Builder"
        description="Interactive playground to visually build and experiment with CSS flexbox layouts."
        actions={
          <>
            <CopyButton getText={getContainerCss} label="Copy CSS" />
            <ResetButton onClick={reset} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sliders className="h-5 w-5" /> Container Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>flex-direction</Label>
                <Select value={flexDirection} onValueChange={setFlexDirection}>
                  <SelectTrigger><SelectValue placeholder="flex-direction" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">row</SelectItem>
                    <SelectItem value="row-reverse">row-reverse</SelectItem>
                    <SelectItem value="column">column</SelectItem>
                    <SelectItem value="column-reverse">column-reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>flex-wrap</Label>
                <Select value={flexWrap} onValueChange={setFlexWrap}>
                  <SelectTrigger><SelectValue placeholder="flex-wrap" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nowrap">nowrap</SelectItem>
                    <SelectItem value="wrap">wrap</SelectItem>
                    <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>justify-content</Label>
                <Select value={justifyContent} onValueChange={setJustifyContent}>
                  <SelectTrigger><SelectValue placeholder="justify-content" /></SelectTrigger>
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
                  <SelectTrigger><SelectValue placeholder="align-items" /></SelectTrigger>
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
                <Label>align-content (requires wrap)</Label>
                <Select value={alignContent} onValueChange={setAlignContent} disabled={flexWrap === "nowrap"}>
                  <SelectTrigger><SelectValue placeholder="align-content" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stretch">stretch</SelectItem>
                    <SelectItem value="flex-start">flex-start</SelectItem>
                    <SelectItem value="flex-end">flex-end</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="space-between">space-between</SelectItem>
                    <SelectItem value="space-around">space-around</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>gap (px)</Label>
                <Input type="number" min="0" value={gap} onChange={(e) => setGap(Number(e.target.value))} />
              </div>
            </CardContent>
          </GlassCard>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-muted/10 h-[400px] overflow-auto">
              <div 
                className="w-full h-full bg-background border-2 border-dashed border-muted-foreground/30 p-2 rounded-md"
                style={{
                  display: "flex",
                  flexDirection: flexDirection as any,
                  flexWrap: flexWrap as any,
                  justifyContent: justifyContent,
                  alignItems: alignItems,
                  alignContent: alignContent,
                  gap: gap + "px"
                }}
              >
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-primary/20 border-2 border-primary/50 rounded-md p-4 flex items-center justify-center font-bold text-lg min-w-[80px] min-h-[80px]"
                    style={{
                      flexGrow: item.flexGrow,
                      flexShrink: item.flexShrink,
                      flexBasis: item.flexBasis
                    }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Flex Items</CardTitle>
                <CardDescription>Adjust properties of individual items</CardDescription>
              </div>
              <Button onClick={addItem} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" /> Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-card">
                    <div className="flex items-center justify-between sm:w-16">
                      <span className="font-bold text-lg">{index + 1}</span>
                      <Button variant="ghost" size="icon" className="sm:hidden text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                      <div className="space-y-2">
                        <Label>flex-grow</Label>
                        <Input type="number" min="0" value={item.flexGrow} onChange={(e) => updateItem(item.id, "flexGrow", Number(e.target.value))} />
                      </div>
                      <div className="space-y-2">
                        <Label>flex-shrink</Label>
                        <Input type="number" min="0" value={item.flexShrink} onChange={(e) => updateItem(item.id, "flexShrink", Number(e.target.value))} />
                      </div>
                      <div className="space-y-2">
                        <Label>flex-basis</Label>
                        <Input type="text" value={item.flexBasis} onChange={(e) => updateItem(item.id, "flexBasis", e.target.value)} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="hidden sm:flex text-destructive mt-6" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm font-mono">
                {getContainerCss()}
              </pre>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
