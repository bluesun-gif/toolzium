"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton } from"@/components/shared/action-buttons";
import { FileText, Plus, Download, Filter } from"lucide-react";
import { toast } from"react-hot-toast";

type Receipt = {
 id: string;
 store: string;
 date: string;
 amount: number;
 category: string;
 paymentMethod: string;
};

export function ReceiptScannerClient() {
 const [receipts, setReceipts] = useState<Receipt[]>([]);
 const [store, setStore] = useState("");
 const [date, setDate] = useState("");
 const [amount, setAmount] = useState("");
 const [category, setCategory] = useState("Food");
 const [paymentMethod, setPaymentMethod] = useState("Card");
 
 const [filterCategory, setFilterCategory] = useState("All");

 useEffect(() => {
 const saved = localStorage.getItem("tz_receipts");
 if (saved) {
 try {
 setReceipts(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveReceipts = (newReceipts: Receipt[]) => {
 setReceipts(newReceipts);
 localStorage.setItem("tz_receipts", JSON.stringify(newReceipts));
 };

 const handleAdd = (e: React.FormEvent) => {
 e.preventDefault();
 if (!store || !date || !amount) {
 toast.error("Please fill required fields");
 return;
 }
 const newReceipt: Receipt = {
 id: Date.now().toString(),
 store,
 date,
 amount: parseFloat(amount),
 category,
 paymentMethod
 };
 saveReceipts([...receipts, newReceipt]);
 setStore("");
 setAmount("");
 toast.success("Receipt added");
 };

 const handleExport = () => {
 if (receipts.length === 0) {
 toast.error("No data to export");
 return;
 }
 const headers = ["Store","Date","Amount","Category","Payment Method"];
 const csvContent = [
 headers.join(","),
 ...receipts.map(r => `"${r.store}","${r.date}",${r.amount},"${r.category}","${r.paymentMethod}"`)
 ].join("\n");
 
 const blob = new Blob([csvContent], { type:"text/csv;charset=utf-8;"});
 const url = URL.createObjectURL(blob);
 const link = document.createElement("a");
 link.href = url;
 link.download ="receipts.csv";
 link.click();
 };

 const filtered = filterCategory ==="All"? receipts : receipts.filter(r => r.category === filterCategory);
 const total = filtered.reduce((acc, curr) => acc + curr.amount, 0);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={FileText}
 title="Receipt Tracker"
 description="Manually enter and track your receipts and expenses."
 actions={
 <ActionButton onClick={handleExport} icon={Download} label="Export CSV"/>
 }
 />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Receipt</CardTitle>
 <CardDescription>Enter details</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleAdd} className="space-y-4">
 <div className="space-y-2">
 <Label>Store Name</Label>
 <Input value={store} onChange={(e) => setStore(e.target.value)} required />
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={(e) => setDate(e.target.value)} required />
 </div>
 <div className="space-y-2">
 <Label>Amount</Label>
 <Input type="number"step="0.01"value={amount} onChange={(e) => setAmount(e.target.value)} required />
 </div>
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Food">Food</SelectItem>
 <SelectItem value="Transport">Transport</SelectItem>
 <SelectItem value="Entertainment">Entertainment</SelectItem>
 <SelectItem value="Shopping">Shopping</SelectItem>
 <SelectItem value="Bills">Bills</SelectItem>
 <SelectItem value="Other">Other</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Payment Method</Label>
 <Select value={paymentMethod} onValueChange={setPaymentMethod}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Cash">Cash</SelectItem>
 <SelectItem value="Card">Card</SelectItem>
 <SelectItem value="Digital">Digital</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <Button type="submit"className="w-full">
 <Plus className="w-4 h-4 mr-2"/> Add Entry
 </Button>
 </form>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
 <div>
 <CardTitle>Receipts</CardTitle>
 <CardDescription>Total: ${total.toFixed(2)}</CardDescription>
 </div>
 <div className="flex items-center gap-2">
 <Filter className="w-4 h-4 text-muted-foreground"/>
 <Select value={filterCategory} onValueChange={setFilterCategory}>
 <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="All">All Categories</SelectItem>
 <SelectItem value="Food">Food</SelectItem>
 <SelectItem value="Transport">Transport</SelectItem>
 <SelectItem value="Entertainment">Entertainment</SelectItem>
 <SelectItem value="Shopping">Shopping</SelectItem>
 <SelectItem value="Bills">Bills</SelectItem>
 <SelectItem value="Other">Other</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 {filtered.length === 0 ? (
 <div className="text-center py-8 text-muted-foreground">No receipts found</div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
 <tr>
 <th className="px-4 py-3 rounded-tl-md">Date</th>
 <th className="px-4 py-3">Store</th>
 <th className="px-4 py-3">Category</th>
 <th className="px-4 py-3">Method</th>
 <th className="px-4 py-3 text-right rounded-tr-md">Amount</th>
 </tr>
 </thead>
 <tbody>
 {filtered.map(r => (
 <tr key={r.id} className="border-b last:border-0">
 <td className="px-4 py-3">{r.date}</td>
 <td className="px-4 py-3 font-medium">{r.store}</td>
 <td className="px-4 py-3">{r.category}</td>
 <td className="px-4 py-3">{r.paymentMethod}</td>
 <td className="px-4 py-3 text-right">${r.amount.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
