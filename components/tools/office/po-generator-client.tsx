"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { ShoppingBag, Plus, Copy, Printer, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type POItem = {
  id: string;
  itemNum: string;
  description: string;
  qty: number;
  unitPrice: number;
  taxPercent: number;
};

export function PurchaseOrderClient() {
  const [poNumber, setPoNumber] = useState("PO-1001");
  const [poDate, setPoDate] = useState(new Date().toISOString().split("T")[0]);
  const [vendorName, setVendorName] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [vendorContact, setVendorContact] = useState("");
  const [shipToName, setShipToName] = useState("");
  const [shipToAddress, setShipToAddress] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [items, setItems] = useState<POItem[]>([{ id: "1", itemNum: "", description: "", qty: 1, unitPrice: 0, taxPercent: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substring(7), itemNum: "", description: "", qty: 1, unitPrice: 0, taxPercent: 0 }]);
  };

  const updateItem = (id: string, field: keyof POItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    let taxTotal = 0;
    items.forEach(item => {
      const itemSubtotal = item.qty * item.unitPrice;
      subtotal += itemSubtotal;
      taxTotal += itemSubtotal * (item.taxPercent / 100);
    });
    return {
      subtotal,
      taxTotal,
      grandTotal: subtotal + taxTotal
    };
  }, [items]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setPoNumber("PO-1001");
    setPoDate(new Date().toISOString().split("T")[0]);
    setVendorName("");
    setVendorAddress("");
    setVendorContact("");
    setShipToName("");
    setShipToAddress("");
    setPaymentTerms("Net 30");
    setItems([{ id: "1", itemNum: "", description: "", qty: 1, unitPrice: 0, taxPercent: 0 }]);
    toast.success("Reset successfully");
  };

  const getPoSummary = () => {
    return "PO Number: " + poNumber + "\nDate: " + poDate + "\nVendor: " + vendorName + "\nTotal: $" + totals.grandTotal.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={ShoppingBag}
        title="Purchase Order Generator"
        description="Generate formal Purchase Orders with itemized tables and totals."
        actions={
          <React.Fragment>
            <ActionButton onClick={handlePrint} icon={Printer} label="Print" variant="outline" size="default" />
            <ResetButton onClick={handleReset} label="Reset" />
          </React.Fragment>
        }
      />

      <div className="grid md:grid-cols-2 gap-6 print:block">
        <GlassCard className="print:hidden">
          <CardHeader>
            <CardTitle>PO Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>PO Number</Label>
                <Input value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>PO Date</Label>
                <Input type="date" value={poDate} onChange={(e) => setPoDate(e.target.value)} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Payment Terms</Label>
              <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Vendor Details</h3>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={vendorAddress} onChange={(e) => setVendorAddress(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input value={vendorContact} onChange={(e) => setVendorContact(e.target.value)} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Ship To</h3>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={shipToName} onChange={(e) => setShipToName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={shipToAddress} onChange={(e) => setShipToAddress(e.target.value)} />
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Items</h3>
                <Button variant="outline" size="sm" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs">Item #</Label>
                    <Input value={item.itemNum} onChange={(e) => updateItem(item.id, "itemNum", e.target.value)} />
                  </div>
                  <div className="col-span-4 space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs">Qty</Label>
                    <Input type="number" min="1" value={item.qty} onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 0)} />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs">Price</Label>
                    <Input type="number" min="0" value={item.unitPrice} onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)} />
                  </div>
                  <div className="col-span-1 space-y-1">
                    <Label className="text-xs">Tax%</Label>
                    <Input type="number" min="0" value={item.taxPercent} onChange={(e) => updateItem(item.id, "taxPercent", parseFloat(e.target.value) || 0)} />
                  </div>
                  <div className="col-span-1 pb-1">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </CardContent>
        </GlassCard>

        {/* Preview section */}
        <GlassCard className="print:shadow-none print:border-none print:m-0 print:p-0">
          <CardHeader className="print:hidden">
            <CardTitle className="flex justify-between items-center">
              <span>Preview</span>
              <CopyButton getText={getPoSummary} label="Copy Summary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 print:p-0">
            <div className="space-y-8 bg-white text-black p-8 rounded border print:border-none">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-800">Purchase Order</h1>
                  <div className="mt-2 text-sm text-slate-500">
                    <p>PO Number: <span className="font-medium text-slate-900">{poNumber}</span></p>
                    <p>Date: <span className="font-medium text-slate-900">{poDate}</span></p>
                    <p>Terms: <span className="font-medium text-slate-900">{paymentTerms}</span></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-bold text-slate-700 uppercase mb-2 border-b pb-1">Vendor</h3>
                  <p className="font-medium">{vendorName || "Vendor Name"}</p>
                  <p className="whitespace-pre-line">{vendorAddress || "Vendor Address"}</p>
                  <p>{vendorContact}</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 uppercase mb-2 border-b pb-1">Ship To</h3>
                  <p className="font-medium">{shipToName || "Ship To Name"}</p>
                  <p className="whitespace-pre-line">{shipToAddress || "Ship To Address"}</p>
                </div>
              </div>

              <div className="mt-8">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="py-2 px-3">Item #</th>
                      <th className="py-2 px-3">Description</th>
                      <th className="py-2 px-3 text-right">Qty</th>
                      <th className="py-2 px-3 text-right">Unit Price</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-3">{item.itemNum}</td>
                        <td className="py-2 px-3">{item.description}</td>
                        <td className="py-2 px-3 text-right">{item.qty}</td>
                        <td className="py-2 px-3 text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right">${(item.qty * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span>${totals.taxTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${totals.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
