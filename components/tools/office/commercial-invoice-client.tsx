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
import { FileText, Plus, Copy, Sparkles, Shield, Zap } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type InvoiceItem = {
 id: string;
 description: string;
 hsCode: string;
 qty: number;
 unitWeight: number;
 unitValue: number;
};

export function CommercialInvoiceClient() {
 const [invoiceNo, setInvoiceNo] = useState("");
 const [date, setDate] = useState("");
 const [exporterInfo, setExporterInfo] = useState("");
 const [importerInfo, setImporterInfo] = useState("");
 const [countryOrigin, setCountryOrigin] = useState("");
 const [countryDestination, setCountryDestination] = useState("");
 const [incoterms, setIncoterms] = useState("FOB");
 const [shippingMethod, setShippingMethod] = useState("");
 const [currency, setCurrency] = useState("USD");
 const [items, setItems] = useState<InvoiceItem[]>([]);

 const addItem = () => {
 setItems([...items, { id: Date.now().toString(), description:"", hsCode:"", qty: 1, unitWeight: 0, unitValue: 0 }]);
 };

 const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
 setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
 };

 const removeItem = (id: string) => {
 setItems(items.filter(item => item.id !== id));
 };

 const resetForm = () => {
 setInvoiceNo("");
 setDate("");
 setExporterInfo("");
 setImporterInfo("");
 setCountryOrigin("");
 setCountryDestination("");
 setIncoterms("FOB");
 setShippingMethod("");
 setCurrency("USD");
 setItems([]);
 };

 const totalWeight = items.reduce((sum, item) => sum + (item.qty * item.unitWeight), 0);
 const totalValue = items.reduce((sum, item) => sum + (item.qty * item.unitValue), 0);

 const getInvoiceText = () => {
 const textLines = [
"COMMERCIAL INVOICE",
"Invoice No:"+ invoiceNo,
"Date:"+ date,
"--------------------------",
"EXPORTER:",
 exporterInfo,
"--------------------------",
"IMPORTER:",
 importerInfo,
"--------------------------",
"Country of Origin:"+ countryOrigin,
"Destination Country:"+ countryDestination,
"Incoterms:"+ incoterms,
"Shipping Method:"+ shippingMethod,
"Currency:"+ currency,
"--------------------------",
"ITEMS:",
 ...items.map(item =>"-"+ item.description +"(HS:"+ item.hsCode +") Qty:"+ item.qty +"Unit Weight:"+ item.unitWeight +"Unit Value:"+ item.unitValue),
"--------------------------",
"Total Weight:"+ totalWeight.toFixed(2),
"Total Value:"+ totalValue.toFixed(2)
 ];
 return textLines.join("\n");
 };

 const printInvoice = () => {
 window.print();
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={FileText}
 title="Commercial Invoice Generator"
 description="Generate professional commercial invoices for international trade and customs."
 actions={
 <>
 <ResetButton onClick={resetForm} label="Reset"/>
 </>
 }
 />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Invoice Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2">
 <Label>Invoice Number</Label>
 <Input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} placeholder="INV-2026-001"/>
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={e => setDate(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Exporter / Seller Information</Label>
 <Input value={exporterInfo} onChange={e => setExporterInfo(e.target.value)} placeholder="Name, Address, Tax ID..."/>
 </div>
 <div className="space-y-2">
 <Label>Importer / Buyer Information</Label>
 <Input value={importerInfo} onChange={e => setImporterInfo(e.target.value)} placeholder="Name, Address, Tax ID..."/>
 </div>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2">
 <Label>Country of Origin</Label>
 <Input value={countryOrigin} onChange={e => setCountryOrigin(e.target.value)} placeholder="e.g. US"/>
 </div>
 <div className="space-y-2">
 <Label>Destination Country</Label>
 <Input value={countryDestination} onChange={e => setCountryDestination(e.target.value)} placeholder="e.g. CA"/>
 </div>
 </div>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2">
 <Label>Incoterms</Label>
 <Select value={incoterms} onValueChange={setIncoterms}>
 <SelectTrigger>
 <SelectValue placeholder="Select Incoterm"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="EXW">EXW (Ex Works)</SelectItem>
 <SelectItem value="FCA">FCA (Free Carrier)</SelectItem>
 <SelectItem value="FOB">FOB (Free On Board)</SelectItem>
 <SelectItem value="CIF">CIF (Cost, Insurance and Freight)</SelectItem>
 <SelectItem value="DDP">DDP (Delivered Duty Paid)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Currency</Label>
 <Input value={currency} onChange={e => setCurrency(e.target.value)} placeholder="USD"/>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Shipping Method</Label>
 <Input value={shippingMethod} onChange={e => setShippingMethod(e.target.value)} placeholder="Air Freight, Ocean Freight..."/>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={"flex flex-row items-center justify-between"}>
 <CardTitle>Items</CardTitle>
 <ActionButton onClick={addItem} icon={Plus} label="Add Item"variant="outline"size="sm"/>
 </CardHeader>
 <CardContent className="space-y-4">
 {items.map((item, index) => (
 <div key={item.id} className="p-4 border rounded-md space-y-4">
 <div className={"flex justify-between items-center"}>
 <h4 className={"font-semibold text-sm"}>Item {index + 1}</h4>
 <Button variant="ghost"size="sm"onClick={() => removeItem(item.id)}>Remove</Button>
 </div>
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2 col-span-2">
 <Label>Description</Label>
 <Input value={item.description} onChange={e => updateItem(item.id,"description", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>HS Code</Label>
 <Input value={item.hsCode} onChange={e => updateItem(item.id,"hsCode", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Quantity</Label>
 <Input type="number"min="1"value={item.qty} onChange={e => updateItem(item.id,"qty", parseFloat(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Unit Weight</Label>
 <Input type="number"min="0"value={item.unitWeight} onChange={e => updateItem(item.id,"unitWeight", parseFloat(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Unit Value</Label>
 <Input type="number"min="0"value={item.unitValue} onChange={e => updateItem(item.id,"unitValue", parseFloat(e.target.value) || 0)} />
 </div>
 </div>
 </div>
 ))}
 {items.length === 0 && <p className={"text-sm text-muted-foreground text-center"}>No items added yet.</p>}
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Invoice Preview</CardTitle>
 <CardDescription>Review the generated commercial invoice</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className={"p-6 bg-background border rounded-lg text-sm space-y-4 font-mono shadow-sm"}>
 <div className={"text-center font-bold text-xl mb-6"}>COMMERCIAL INVOICE</div>
 
 <div className={"flex justify-between"}>
 <div><strong>Invoice No:</strong> {invoiceNo ||"N/A"}</div>
 <div><strong>Date:</strong> {date ||"N/A"}</div>
 </div>
 
 <Separator />
 
 <div className={"grid grid-cols-2 gap-4"}>
 <div>
 <strong>Exporter:</strong><br />
 <span className={"whitespace-pre-wrap"}>{exporterInfo ||"N/A"}</span>
 </div>
 <div>
 <strong>Importer:</strong><br />
 <span className={"whitespace-pre-wrap"}>{importerInfo ||"N/A"}</span>
 </div>
 </div>
 
 <Separator />
 
 <div className={"grid grid-cols-2 gap-4"}>
 <div><strong>Origin:</strong> {countryOrigin ||"N/A"}</div>
 <div><strong>Destination:</strong> {countryDestination ||"N/A"}</div>
 <div><strong>Incoterms:</strong> {incoterms}</div>
 <div><strong>Shipping:</strong> {shippingMethod ||"N/A"}</div>
 <div><strong>Currency:</strong> {currency}</div>
 </div>
 
 <Separator />
 
 <div className={"overflow-x-auto"}>
 <table className={"w-full text-left"}>
 <thead>
 <tr className={"border-b"}>
 <th className={"pb-2"}>Description</th>
 <th className={"pb-2"}>HS Code</th>
 <th className={"pb-2 text-right"}>Qty</th>
 <th className={"pb-2 text-right"}>Total Wt</th>
 <th className={"pb-2 text-right"}>Total Val</th>
 </tr>
 </thead>
 <tbody>
 {items.map((item, i) => (
 <tr key={item.id} className={"border-b last:border-0"}>
 <td className={"py-2"}>{item.description ||"-"}</td>
 <td className={"py-2"}>{item.hsCode ||"-"}</td>
 <td className={"py-2 text-right"}>{item.qty}</td>
 <td className={"py-2 text-right"}>{(item.qty * item.unitWeight).toFixed(2)}</td>
 <td className={"py-2 text-right"}>{(item.qty * item.unitValue).toFixed(2)}</td>
 </tr>
 ))}
 {items.length === 0 && (
 <tr>
 <td colSpan={5} className={"py-4 text-center text-muted-foreground"}>No items</td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 
 <Separator />
 
 <div className={"flex justify-end"}>
 <div className={"w-64 space-y-2"}>
 <div className={"flex justify-between"}>
 <span>Total Weight:</span>
 <strong>{totalWeight.toFixed(2)}</strong>
 </div>
 <div className={"flex justify-between text-lg"}>
 <span>Total Value:</span>
 <strong>{totalValue.toFixed(2)} {currency}</strong>
 </div>
 </div>
 </div>
 
 <div className={"pt-12 grid grid-cols-2 gap-8 text-center"}>
 <div>
 <div className={"border-b border-black dark:border-white pb-8 mb-2"}></div>
 <span>Authorized Signature</span>
 </div>
 <div>
 <div className={"border-b border-black dark:border-white pb-8 mb-2"}></div>
 <span>Date</span>
 </div>
 </div>
 </div>
 
 <div className={"flex flex-wrap gap-4"}>
 <CopyButton getText={getInvoiceText} label="Copy Text"/>
 <ActionButton onClick={printInvoice} icon={FileText} label="Print Invoice"variant="default"size="default"/>
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
          <h3>Why Use Our Commercial Invoice Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Commercial Invoice Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/commercial-invoice" max={6} />

</div>
 );
}
