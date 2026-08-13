"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, Plus, Copy, Printer, Trash2, Sparkles, Shield, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface Item {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  taxPercent: number;
}
export function ProformaInvoiceClient() {
  const [proformaNo, setProformaNo] = useState("PI-1001");
  const [date, setDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [sellerInfo, setSellerInfo] = useState("");
  const [buyerInfo, setBuyerInfo] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [paymentTerms, setPaymentTerms] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [estimatedShipping, setEstimatedShipping] = useState(0);
  const addItem = () => {
    setItems([...items, {
      id: Math.random().toString(),
      name: "",
      qty: 1,
      unitPrice: 0,
      taxPercent: 0
    }]);
  };
  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item));
  };
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;
    items.forEach(item => {
      const lineTotal = item.qty * item.unitPrice;
      const lineTax = lineTotal * (item.taxPercent / 100);
      subtotal += lineTotal;
      taxTotal += lineTax;
    });
    const grandTotal = subtotal + taxTotal + estimatedShipping;
    return {
      subtotal,
      taxTotal,
      grandTotal
    };
  };
  const totals = calculateTotals();
  const handlePrint = () => {
    window.print();
  };
  const getInvoiceText = () => {
    let text = "PROFORMA INVOICE\n";
    text += "Proforma No:" + proformaNo + "\n";
    text += "Date:" + date + "\n";
    text += "Expiry Date:" + expiryDate + "\n\n";
    text += "SELLER INFO:\n" + sellerInfo + "\n\n";
    text += "BUYER INFO:\n" + buyerInfo + "\n\n";
    text += "ITEMS:\n";
    items.forEach(item => {
      text += item.name + "- Qty:" + item.qty + "- Unit Price: $" + item.unitPrice + "\n";
    });
    text += "\nSubtotal: $" + totals.subtotal.toFixed(2) + "\n";
    text += "Tax Total: $" + totals.taxTotal.toFixed(2) + "\n";
    text += "Estimated Shipping: $" + estimatedShipping.toFixed(2) + "\n";
    text += "Grand Total: $" + totals.grandTotal.toFixed(2) + "\n\n";
    text += "Payment Terms:" + paymentTerms + "\n";
    text += "Est. Shipping Date:" + shippingDate;
    return text;
  };
  const handleReset = () => {
    setProformaNo("PI-1001");
    setDate("");
    setExpiryDate("");
    setSellerInfo("");
    setBuyerInfo("");
    setItems([]);
    setPaymentTerms("");
    setShippingDate("");
    setEstimatedShipping(0);
    toast.success("Form reset successfully");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="Proforma Invoice Generator" description="Generate preliminary Proforma Invoices for trade proposals with itemized tables." actions={<div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 
 <div className="grid gap-6 md:grid-cols-2">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Invoice Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Proforma #</Label>
 <Input value={proformaNo} onChange={e => setProformaNo(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Expiry Date</Label>
 <Input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Est. Shipping Date</Label>
 <Input type="date" value={shippingDate} onChange={e => setShippingDate(e.target.value)} />
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Seller Info</Label>
 <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={sellerInfo} onChange={e => setSellerInfo(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Buyer Info</Label>
 <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={buyerInfo} onChange={e => setBuyerInfo(e.target.value)} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle>Items</CardTitle>
 <Button onClick={addItem} size="sm"><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
 </CardHeader>
 <CardContent className="space-y-4">
 {items.map((item, index) => <div key={item.id} className="flex gap-2 items-end border p-3 rounded-md relative">
 <div className="grid grid-cols-2 gap-2 flex-1">
 <div className="col-span-2">
 <Label>Item Name</Label>
 <Input value={item.name} onChange={e => updateItem(item.id, "name", e.target.value)} />
 </div>
 <div>
 <Label>Qty</Label>
 <Input type="number" value={item.qty} onChange={e => updateItem(item.id, "qty", Number(e.target.value))} />
 </div>
 <div>
 <Label>Unit Price</Label>
 <Input type="number" value={item.unitPrice} onChange={e => updateItem(item.id, "unitPrice", Number(e.target.value))} />
 </div>
 <div>
 <Label>Tax %</Label>
 <Input type="number" value={item.taxPercent} onChange={e => updateItem(item.id, "taxPercent", Number(e.target.value))} />
 </div>
 </div>
 <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
 <Trash2 className="w-4 h-4 text-red-500" />
 </Button>
 </div>)}
 {items.length === 0 && <p className="text-sm text-muted-foreground">No items added yet.</p>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Additional Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Est. Shipping Cost ($)</Label>
 <Input type="number" value={estimatedShipping} onChange={e => setEstimatedShipping(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Payment Terms</Label>
 <Input value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} placeholder="e.g. 50% advance, 50% on delivery" />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Invoice Preview</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="border p-6 rounded-md bg-background text-black space-y-6">
 <div className="flex justify-between items-start">
 <div>
 <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-800">Proforma Invoice</h2>
 <p className="text-sm text-muted-foreground mt-1">{"#" + proformaNo}</p>
 </div>
 <div className="text-right text-sm text-gray-600">
 <p>Date: {date || "N/A"}</p>
 <p>Expiry: {expiryDate || "N/A"}</p>
 </div>
 </div>
 
 <Separator className="bg-gray-200" />
 
 <div className="flex justify-between gap-4 text-sm">
 <div className="flex-1">
 <h3 className="font-semibold text-gray-700">From (Seller):</h3>
 <p className="whitespace-pre-wrap text-gray-600 mt-1">{sellerInfo || "Seller Information"}</p>
 </div>
 <div className="flex-1">
 <h3 className="font-semibold text-gray-700">To (Buyer):</h3>
 <p className="whitespace-pre-wrap text-gray-600 mt-1">{buyerInfo || "Buyer Information"}</p>
 </div>
 </div>

 <div className="mt-6">
 <table className="w-full text-sm text-left text-gray-600">
 <thead className="bg-gray-100 text-gray-700">
 <tr>
 <th className="px-2 py-2">Item</th>
 <th className="px-2 py-2 text-center">Qty</th>
 <th className="px-2 py-2 text-right">Price</th>
 <th className="px-2 py-2 text-right">Total</th>
 </tr>
 </thead>
 <tbody>
 {items.map(item => <tr key={item.id} className="border-b">
 <td className="px-2 py-2">{item.name || "Item"}</td>
 <td className="px-2 py-2 text-center">{item.qty}</td>
 <td className="px-2 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
 <td className="px-2 py-2 text-right">${(item.qty * item.unitPrice).toFixed(2)}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <div className="flex justify-end mt-4">
 <div className="w-64 space-y-2 text-sm">
 <div className="flex justify-between text-gray-600">
 <span>Subtotal:</span>
 <span>${totals.subtotal.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-gray-600">
 <span>Tax:</span>
 <span>${totals.taxTotal.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-gray-600">
 <span>Est. Shipping:</span>
 <span>${estimatedShipping.toFixed(2)}</span>
 </div>
 <Separator className="bg-gray-200" />
 <div className="flex justify-between font-bold text-gray-800 text-base">
 <span>Grand Total:</span>
 <span>${totals.grandTotal.toFixed(2)}</span>
 </div>
 </div>
 </div>

 <div className="text-xs text-muted-foreground space-y-1">
 <p><span className="font-semibold">Payment Terms:</span> {paymentTerms}</p>
 <p><span className="font-semibold">Est. Shipping Date:</span> {shippingDate}</p>
 </div>
 </div>

 <div className="flex gap-2 mt-4 justify-end">
 <CopyButton getText={getInvoiceText} label="Copy Text" />
 <Button onClick={handlePrint} variant="outline">
 <Printer className="w-4 h-4 mr-2" />
 Print
 </Button>
 </div>
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
          <h3>Why Use Our Proforma Invoice Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Proforma Invoice Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/proforma-invoice" max={6} />

    </div></div>;
}