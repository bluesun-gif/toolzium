"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Check, CheckCircle2, DollarSign, ListPlus, Plus, ShoppingCart, Smartphone, Tags, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

type GroceryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  checked: boolean;
};
const CATEGORIES = ["Produce", "Dairy", "Meat", "Bakery", "Frozen", "Beverages", "Snacks", "Household", "Other"];
const UNITS = ["pcs", "kg", "lb", "L", "pack"];
export function GroceryListClient() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [newItemUnit, setNewItemUnit] = useState("pcs");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Produce");
  useEffect(() => {
    const saved = localStorage.getItem("grocery-items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved grocery items");
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("grocery-items", JSON.stringify(items));
    }
  }, [items, typeof window]);
  const handleAddItem = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newItemName.trim()) {
      toast.error("Please enter an item name");
      return;
    }
    const newItem: GroceryItem = {
      id: crypto.randomUUID(),
      name: newItemName.trim(),
      quantity: Number(newItemQuantity) || 1,
      unit: newItemUnit,
      price: Number(newItemPrice) || 0,
      category: newItemCategory,
      checked: false
    };
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemPrice("");
    toast.success("Item added");
  };
  const toggleCheck = (id: string) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      checked: !item.checked
    } : item));
  };
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  const clearList = () => {
    if (window.confirm("Are you sure you want to clear your entire list?")) {
      setItems([]);
      toast.success("List cleared");
    }
  };
  const getListText = () => {
    let text = "🛒 Grocery List\n\n";
    const grouped = CATEGORIES.map(cat => ({
      category: cat,
      items: items.filter(i => i.category === cat)
    })).filter(g => g.items.length > 0);
    grouped.forEach(group => {
      text += `--- ${group.category} ---\n`;
      group.items.forEach(item => {
        const check = item.checked ? "[x]" : "[ ]";
        const priceStr = item.price ? ` ($${(item.price * item.quantity).toFixed(2)})` : "";
        text += `${check} ${item.name} - ${item.quantity} ${item.unit}${priceStr}\n`;
      });
      text += "\n";
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (total > 0) {
      text += `\nTotal Estimated Cost: $${total.toFixed(2)}`;
    }
    return text;
  };
  const groupedItems = CATEGORIES.map(cat => ({
    category: cat,
    items: items.filter(i => i.category === cat)
  })).filter(g => g.items.length > 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const checkedCost = items.filter(i => i.checked).reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={ShoppingCart} title="Grocery List Manager" description="Smart grocery list with categories, quantities, and price estimation." actions={<>
 <CopyButton getText={getListText} label="Share List" />
 <ResetButton onClick={clearList} label="Clear List" />
 </>} />

 <GlassCard>
 <CardHeader>
 <CardTitle>Add Item</CardTitle>
 <CardDescription>Add a new item to your grocery list</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleAddItem} className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-end">
 <div className="space-y-2">
 <label className="text-sm font-medium">Item Name</label>
 <Input placeholder="e.g., Apples" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Category</label>
 <Select value={newItemCategory} onValueChange={setNewItemCategory}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Qty</label>
 <Input type="number" min="0.1" step="0.1" value={newItemQuantity} onChange={e => setNewItemQuantity(e.target.value)} />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Unit</label>
 <Select value={newItemUnit} onValueChange={setNewItemUnit}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {UNITS.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Price (ea)</label>
 <div className="relative">
 <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} />
 </div>
 </div>
 <Button type="submit" size="icon">
 <Plus className="h-4 w-4" />
 </Button>
 </form>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-[1fr_300px] gap-6">
 <div className="space-y-6">
 {groupedItems.length === 0 ? <GlassCard>
 <CardContent className="py-10 text-center text-muted-foreground flex flex-col items-center">
 <ShoppingCart className="h-10 w-10 mb-4 opacity-50" />
 <p>Your grocery list is empty.</p>
 <p className="text-sm mt-1">Add items above to get started.</p>
 </CardContent>
 </GlassCard> : groupedItems.map(group => <GlassCard key={group.category}>
 <CardHeader className="py-4">
 <CardTitle className="text-lg flex items-center justify-between">
 <span>{group.category}</span>
 <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-full">
 {group.items.filter(i => i.checked).length} / {group.items.length}
 </span>
 </CardTitle>
 </CardHeader>
 <Separator />
 <CardContent className="p-0">
 <div className="divide-y">
 {group.items.map(item => <div key={item.id} className={cn("flex items-center justify-between p-4 transition-colors hover:bg-muted/50", item.checked && "opacity-60 bg-muted/20")}>
 <div className="flex items-center space-x-4">
 <Button onClick={() => toggleCheck(item.id)} className={cn(cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary", item.checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground hover:border-primary"))}>
 {item.checked && <Check className="h-4 w-4" />}
 </Button>
 <div className={cn("transition-all", item.checked && "line-through text-muted-foreground")}>
 <p className="font-medium">{item.name}</p>
 <p className="text-sm text-muted-foreground">
 {item.quantity} {item.unit} {item.price > 0 && `• $${item.price.toFixed(2)} ea`}
 </p>
 </div>
 </div>
 <div className="flex items-center space-x-4">
 {item.price > 0 && <span className="font-medium">
 ${(item.price * item.quantity).toFixed(2)}
 </span>}
 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>)}
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Summary</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Total Items</span>
 <span className="font-medium">{items.length}</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Checked</span>
 <span className="font-medium text-green-500">{items.filter(i => i.checked).length}</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Remaining</span>
 <span className="font-medium">{items.filter(i => !i.checked).length}</span>
 </div>
 
 <Separator />
 
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Est. Total Cost</span>
 <span className="font-medium">${totalCost.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">In Cart</span>
 <span className="font-medium text-green-500">${checkedCost.toFixed(2)}</span>
 </div>
 
 <div className="pt-4 flex justify-between items-center font-bold text-lg border-t mt-4">
 <span>Remaining</span>
 <span>${(totalCost - checkedCost).toFixed(2)}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Items",
    description:"Build your list.",
    icon: ListPlus,
  },
{
    step:"02",
    title:"Categorize",
    description:"Group by aisle or meal.",
    icon: Tags,
  },
{
    step:"03",
    title:"Check Off",
    description:"Mark as you shop.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListPlus,
    title:"Items",
    description:"Easy add.",
  },
{
    icon: Tags,
    title:"Categories",
    description:"Organize by section.",
  },
{
    icon: CheckCircle2,
    title:"Checklist",
    description:"Track in cart.",
  },
{
    icon: Smartphone,
    title:"Mobile",
    description:"Shop from phone.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A grocery list manager organizes shopping so you buy what you need and avoid duplicate or impulsive purchases. Categorizing by aisle speeds the trip and reduces backtracking. This tool handles entry, grouping, and check-off.</p>
  <p>Reusable lists save time week to week. Checking items as you go prevents double-buying and ensures nothing is missed.</p>
  <p>Use it before every shop. The tool's value is a structured list that saves money and trips through the store.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why use one?",
    answer:"Fewer forgotten items, less impulse buys.",
  },
{
    question:"Categorize?",
    answer:"Group by store section.",
  },
{
    question:"Save lists?",
    answer:"Reuse weekly.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default GroceryListClient;
