"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Copy, Download, Hash, Package, Plus, Printer, ShieldCheck, Trash } from"lucide-react";
import toast from"react-hot-toast";

type Item = {
  sku: string;
  description: string;
  qtyOrdered: number;
  qtyShipped: number;
  bin: string;
};
export function PackingSlipClient() {
  const [orderNum, setOrderNum] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [shipDate, setShipDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [shipperInfo, setShipperInfo] = useState("");
  const [recipientInfo, setRecipientInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const addItem = () => {
    setItems([...items, {
      sku: "",
      description: "",
      qtyOrdered: 1,
      qtyShipped: 1,
      bin: ""
    }]);
  };
  const updateItem = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setItems(newItems);
  };
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  const resetForm = () => {
    setOrderNum("");
    setOrderDate("");
    setShipDate("");
    setCarrier("");
    setShipperInfo("");
    setRecipientInfo("");
    setNotes("");
    setItems([]);
    toast.success("Form reset");
  };
  const handlePrint = () => {
    window.print();
  };
  const getTotalShipped = () => items.reduce((sum, item) => sum + (Number(item.qtyShipped) || 0), 0);
  const getCopyText = () => {
    let text = "PACKING SLIP\n";
    text += "Order #:" + orderNum + "\n";
    text += "Order Date:" + orderDate + "\n";
    text += "Ship Date:" + shipDate + "\n";
    text += "Carrier:" + carrier + "\n\n";
    text += "From:\n" + shipperInfo + "\n\n";
    text += "To:\n" + recipientInfo + "\n\n";
    text += "Items:\n";
    items.forEach(item => {
      text += "-" + item.sku + ":" + item.description + "(Ordered:" + item.qtyOrdered + ", Shipped:" + item.qtyShipped + ")\n";
    });
    text += "\nTotal Shipped:" + getTotalShipped() + "\n";
    if (notes) text += "\nNotes:\n" + notes + "\n";
    return text;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Package} title="Packing Slip Generator" description="Generate professional ecommerce and warehouse packing slips." actions={<React.Fragment>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print" />
 <CopyButton getText={getCopyText} label="Copy Text" />
 <ResetButton onClick={resetForm} label="Reset" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-2 gap-6 print:block print:space-y-6">
 <GlassCard className="print:hidden">
 <CardHeader>
 <CardTitle>Order Information</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Order #</Label>
 <Input value={orderNum} onChange={e => setOrderNum(e.target.value)} placeholder="e.g. 12345" />
 </div>
 <div className="space-y-2">
 <Label>Carrier & Tracking</Label>
 <Input value={carrier} onChange={e => setCarrier(e.target.value)} placeholder="e.g. UPS 1Z..." />
 </div>
 <div className="space-y-2">
 <Label>Order Date</Label>
 <Input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Ship Date</Label>
 <Input type="date" value={shipDate} onChange={e => setShipDate(e.target.value)} />
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <Label>Shipper Information</Label>
 <textarea className={"flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"} value={shipperInfo} onChange={e => setShipperInfo(e.target.value)} placeholder="Company Name, Address..." />
 </div>
 <div className="space-y-2">
 <Label>Ship-To Recipient</Label>
 <textarea className={"flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"} value={recipientInfo} onChange={e => setRecipientInfo(e.target.value)} placeholder="Customer Name, Address..." />
 </div>
 
 <Separator />
 
 <div>
 <div className="flex items-center justify-between mb-4">
 <Label>Items</Label>
 <Button size="sm" variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
 </div>
 <div className="space-y-4">
 {items.map((item, index) => <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md">
 <div className="col-span-3 space-y-1">
 <Label className="text-xs">SKU</Label>
 <Input value={item.sku} onChange={e => updateItem(index, 'sku', e.target.value)} className="h-8 text-sm" />
 </div>
 <div className="col-span-5 space-y-1">
 <Label className="text-xs">Description</Label>
 <Input value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} className="h-8 text-sm" />
 </div>
 <div className="col-span-2 space-y-1">
 <Label className="text-xs">Ordered</Label>
 <Input type="number" value={item.qtyOrdered} onChange={e => updateItem(index, 'qtyOrdered', Number(e.target.value))} className="h-8 text-sm" />
 </div>
 <div className="col-span-2 space-y-1">
 <Label className="text-xs">Shipped</Label>
 <Input type="number" value={item.qtyShipped} onChange={e => updateItem(index, 'qtyShipped', Number(e.target.value))} className="h-8 text-sm" />
 </div>
 <div className="col-span-3 space-y-1">
 <Label className="text-xs">Bin #</Label>
 <Input value={item.bin} onChange={e => updateItem(index, 'bin', e.target.value)} className="h-8 text-sm" />
 </div>
 <div className="col-span-9 flex justify-end">
 <Button variant="ghost" size="sm" onClick={() => removeItem(index)} className="h-8 px-2 text-destructive">
 <Trash className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-2">No items added.</p>}
 </div>
 </div>
 
 <Separator />
 
 <div className="space-y-2">
 <Label>Special Notes / Instructions</Label>
 <textarea className={"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Thank you for your business!" />
 </div>
 </CardContent>
 </GlassCard>

 {/* Print Preview */}
 <div className={"bg-background text-black p-8 rounded-lg shadow-sm border print:shadow-none print:border-none print:p-0 min-h-[600px]"}>
 <div className="flex justify-between items-start mb-8 border-b pb-4">
 <div>
 <h1 className="text-3xl font-bold uppercase tracking-wider">Packing Slip</h1>
 </div>
 <div className="text-right text-sm space-y-1">
 <p><span className="font-semibold">Order #:</span> {orderNum || "-"}</p>
 <p><span className="font-semibold">Order Date:</span> {orderDate || "-"}</p>
 <p><span className="font-semibold">Ship Date:</span> {shipDate || "-"}</p>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
 <div>
 <h3 className="font-bold border-b pb-1 mb-2 uppercase text-muted-foreground">From</h3>
 <div className="whitespace-pre-wrap">{shipperInfo || "Shipper Info..."}</div>
 </div>
 <div>
 <h3 className="font-bold border-b pb-1 mb-2 uppercase text-muted-foreground">Ship To</h3>
 <div className="whitespace-pre-wrap">{recipientInfo || "Recipient Info..."}</div>
 </div>
 </div>
 
 <div className="mb-8 text-sm">
 <p><span className="font-semibold">Carrier / Tracking:</span> {carrier || "-"}</p>
 </div>

 <table className="w-full text-sm mb-8 text-left border-collapse">
 <thead>
 <tr className="border-b-2 border-gray-300">
 <th className="py-2 px-1 font-semibold uppercase text-gray-600">SKU</th>
 <th className="py-2 px-1 font-semibold uppercase text-gray-600">Description</th>
 <th className="py-2 px-1 font-semibold uppercase text-gray-600 text-center">Bin</th>
 <th className="py-2 px-1 font-semibold uppercase text-gray-600 text-right">Ordered</th>
 <th className="py-2 px-1 font-semibold uppercase text-gray-600 text-right">Shipped</th>
 </tr>
 </thead>
 <tbody>
 {items.length > 0 ? items.map((item, i) => <tr key={i} className="border-b border-gray-200">
 <td className="py-3 px-1">{item.sku}</td>
 <td className="py-3 px-1">{item.description}</td>
 <td className="py-3 px-1 text-center text-muted-foreground">{item.bin}</td>
 <td className="py-3 px-1 text-right">{item.qtyOrdered}</td>
 <td className="py-3 px-1 text-right font-medium">{item.qtyShipped}</td>
 </tr>) : <tr>
 <td colSpan={5} className="py-4 text-center text-gray-400 italic">No items listed</td>
 </tr>}
 </tbody>
 <tfoot>
 <tr className="font-bold bg-gray-50">
 <td colSpan={3} className="py-3 px-1 text-right border-t-2 border-gray-300 uppercase">Total Items Shipped:</td>
 <td colSpan={2} className="py-3 px-1 text-right border-t-2 border-gray-300 text-lg">{getTotalShipped()}</td>
 </tr>
 </tfoot>
 </table>

 {notes && <div className="text-sm mt-8 p-4 bg-gray-50 rounded">
 <h3 className="font-bold uppercase text-muted-foreground mb-1">Notes / Instructions</h3>
 <div className="whitespace-pre-wrap">{notes}</div>
 </div>}
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Items",
    description:"List shipped products.",
    icon: Package,
  },
{
    step:"02",
    title:"Set Details",
    description:"Quantities and order info.",
    icon: Hash,
  },
{
    step:"03",
    title:"Generate",
    description:"Produce the slip.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Package,
    title:"Items",
    description:"Shipped contents.",
  },
{
    icon: Hash,
    title:"Order Info",
    description:"Number and dates.",
  },
{
    icon: Download,
    title:"Export",
    description:"Printable slip.",
  },
{
    icon: ShieldCheck,
    title:"Accuracy",
    description:"Matches the order.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A packing slip generator creates the itemized list included in a shipment, helping recipients and warehouses verify contents. Unlike an invoice, it shows quantities without prices. This tool compiles order data into a printable slip.</p>
  <p>Accuracy prevents fulfillment errors. A slip that matches the order reduces &quot;missing item&quot; complaints. Printable output fits shipping workflows.</p>
  <p>Use it for every shipment. The tool's value is a correct, professional packing slip produced quickly.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a packing slip?",
    answer:"Lists contents of a shipment.",
  },
{
    question:"Vs invoice?",
    answer:"No prices; just items.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Use case?",
    answer:"E-commerce fulfillment.",
  },
{
    question:"Accurate?",
    answer:"Matches order data.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default PackingSlipClient;
