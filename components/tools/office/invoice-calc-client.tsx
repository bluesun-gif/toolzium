"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Receipt, Plus, DollarSign, Copy, Trash2, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type LineItem = {
 id: string;
 description: string;
 quantity: number;
 unitPrice: number;
 discount: number;
};

export function InvoiceCalcClient() {
 const [items, setItems] = useState<LineItem[]>([
 { id:"1", description:"Item 1", quantity: 1, unitPrice: 0, discount: 0 }
 ]);
 const [globalDiscount, setGlobalDiscount] = useState(0);
 const [taxRate, setTaxRate] = useState(0);
 const [shippingFee, setShippingFee] = useState(0);

 const handleAddItem = () => {
 setItems([...items, { id: Date.now().toString(), description:"New Item", quantity: 1, unitPrice: 0, discount: 0 }]);
 };

 const handleRemoveItem = (id: string) => {
 setItems(items.filter(item => item.id !== id));
 };

 const updateItem = (id: string, field: keyof LineItem, value: any) => {
 setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
 };

 const reset = () => {
 setItems([{ id:"1", description:"Item 1", quantity: 1, unitPrice: 0, discount: 0 }]);
 setGlobalDiscount(0);
 setTaxRate(0);
 setShippingFee(0);
 toast.success("Reset successfully");
 };

 const calculateSubtotal = () => {
 return items.reduce((acc, item) => {
 const itemSub = item.quantity * item.unitPrice;
 const discount = itemSub * (item.discount / 100);
 return acc + (itemSub - discount);
 }, 0);
 };

 const subtotal = calculateSubtotal();
 const globalDiscountAmount = subtotal * (globalDiscount / 100);
 const subtotalAfterDiscount = subtotal - globalDiscountAmount;
 const taxAmount = subtotalAfterDiscount * (taxRate / 100);
 const grandTotal = subtotalAfterDiscount + taxAmount + shippingFee;

 const generateSummary = () => {
 let summary ="Invoice Summary\n\n";
 items.forEach(item => {
 summary += item.description +"x"+ item.quantity +"@ $"+ item.unitPrice +"(Discount:"+ item.discount +"%)\n";
 });
 summary +="\nSubtotal: $"+ subtotal.toFixed(2);
 summary +="\nGlobal Discount:"+ globalDiscount +"% (-$"+ globalDiscountAmount.toFixed(2) +")";
 summary +="\nTax Rate:"+ taxRate +"% ($"+ taxAmount.toFixed(2) +")";
 summary +="\nShipping: $"+ shippingFee.toFixed(2);
 summary +="\n\nGrand Total: $"+ grandTotal.toFixed(2);
 return summary;
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Receipt}
 title="Invoice Line Item Calculator"
 description="Quick invoice total & tax breakdown calculator."
 actions={
 <>
 <CopyButton getText={generateSummary} label="Copy Summary"/>
 <ResetButton onClick={reset} label="Reset"/>
 </>
 }
 />
 
 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Line Items</CardTitle>
 <CardDescription>Add items to your invoice</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {items.map((item, index) => (
 <div key={item.id} className="space-y-2 p-4 border rounded-md relative">
 <div className="flex justify-between items-center">
 <Label>Item {index + 1}</Label>
 {items.length > 1 && (
 <Button variant="ghost"size="icon"onClick={() => handleRemoveItem(item.id)}>
 <Trash2 className="h-4 w-4"/>
 </Button>
 )}
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
 <div className="space-y-1">
 <Label>Description</Label>
 <Input value={item.description} onChange={(e) => updateItem(item.id,"description", e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label>Quantity</Label>
 <Input type="number"value={item.quantity} onChange={(e) => updateItem(item.id,"quantity", Number(e.target.value) || 0)} min={1} />
 </div>
 <div className="space-y-1">
 <Label>Unit Price ($)</Label>
 <Input type="number"value={item.unitPrice} onChange={(e) => updateItem(item.id,"unitPrice", Number(e.target.value) || 0)} min={0} />
 </div>
 <div className="space-y-1">
 <Label>Discount (%)</Label>
 <Input type="number"value={item.discount} onChange={(e) => updateItem(item.id,"discount", Number(e.target.value) || 0)} min={0} max={100} />
 </div>
 </div>
 </div>
 ))}
 <Button onClick={handleAddItem} variant="outline"className="w-full">
 <Plus className="h-4 w-4 mr-2"/> Add Item
 </Button>
 <Separator />
 <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
 <div className="space-y-1">
 <Label>Global Discount (%)</Label>
 <Input type="number"value={globalDiscount} onChange={(e) => setGlobalDiscount(Number(e.target.value) || 0)} min={0} max={100} />
 </div>
 <div className="space-y-1">
 <Label>Tax Rate (%)</Label>
 <Input type="number"value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value) || 0)} min={0} max={100} />
 </div>
 <div className="space-y-1">
 <Label>Shipping Fee ($)</Label>
 <Input type="number"value={shippingFee} onChange={(e) => setShippingFee(Number(e.target.value) || 0)} min={0} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Invoice Summary</CardTitle>
 <CardDescription>Breakdown of your invoice totals</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4 text-sm">
 <div className="space-y-2">
 {items.map(item => {
 const itemSub = item.quantity * item.unitPrice;
 const discAmount = itemSub * (item.discount / 100);
 return (
 <div key={item.id} className="flex justify-between">
 <span>{item.description} (x{item.quantity})</span>
 <span>${(itemSub - discAmount).toFixed(2)}</span>
 </div>
 );
 })}
 </div>
 <Separator />
 <div className="flex justify-between">
 <span>Subtotal</span>
 <span>${subtotal.toFixed(2)}</span>
 </div>
 {globalDiscount > 0 && (
 <div className="flex justify-between text-red-500">
 <span>Global Discount ({globalDiscount}%)</span>
 <span>-${globalDiscountAmount.toFixed(2)}</span>
 </div>
 )}
 <div className="flex justify-between">
 <span>Tax ({taxRate}%)</span>
 <span>${taxAmount.toFixed(2)}</span>
 </div>
 <div className="flex justify-between">
 <span>Shipping</span>
 <span>${shippingFee.toFixed(2)}</span>
 </div>
 <Separator />
 <div className="flex justify-between font-bold text-lg">
 <span>Grand Total</span>
 <span>${grandTotal.toFixed(2)}</span>
 </div>
 </CardContent>
 </GlassCard>
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
          <h3>Why Use Our Invoice Line Item Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Invoice Line Item Calculator provides
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

      <RelatedTools currentToolUrl="/tools/office/invoice-calc" max={6} />

</div>
 );
}
