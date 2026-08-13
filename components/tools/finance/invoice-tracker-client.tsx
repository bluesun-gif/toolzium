"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Receipt, Filter, DollarSign, Download, Trash2, CheckCircle, AlertCircle, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type Invoice = {
  id: string;
  clientName: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: string;
};
export function InvoiceTrackerClient() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  // New invoice state
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("tz_invoice_tracker");
    if (saved) {
      try {
        setInvoices(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse invoices");
      }
    }
  }, []);
  const saveInvoices = (newInvoices: Invoice[]) => {
    setInvoices(newInvoices);
    localStorage.setItem("tz_invoice_tracker", JSON.stringify(newInvoices));
  };
  const addInvoice = () => {
    if (!clientName || !invoiceNumber || !amount || !dueDate) {
      toast.error("Please fill required fields");
      return;
    }
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      clientName,
      invoiceNumber,
      amount: parseFloat(amount),
      issueDate: issueDate || new Date().toISOString().split("T")[0],
      dueDate,
      status: "Pending"
    };
    saveInvoices([...invoices, newInvoice]);
    setClientName("");
    setInvoiceNumber("");
    setAmount("");
    setIssueDate("");
    setDueDate("");
    toast.success("Invoice added");
  };
  const deleteInvoice = (id: string) => {
    saveInvoices(invoices.filter(i => i.id !== id));
    toast.success("Invoice deleted");
  };
  const markStatus = (id: string, status: string) => {
    saveInvoices(invoices.map(i => i.id === id ? {
      ...i,
      status
    } : i));
    toast.success("Status updated to" + status);
  };
  const exportCsv = () => {
    const header = "Client,Invoice Number,Amount,Issue Date,Due Date,Status\n";
    const csv = invoices.map(i => [i.clientName, i.invoiceNumber, i.amount, i.issueDate, i.dueDate, i.status].join(",")).join("\n");
    const blob = new Blob([header + csv], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported CSV");
  };
  const todayStr = new Date().toISOString().split("T")[0];
  const processedInvoices = invoices.map(i => {
    // Auto mark overdue
    if (i.status === "Pending" && i.dueDate < todayStr) {
      return {
        ...i,
        status: "Overdue"
      };
    }
    return i;
  }).filter(i => filterStatus === "All" ? true : i.status === filterStatus).sort((a, b) => {
    if (sortBy === "dueDate") return a.dueDate.localeCompare(b.dueDate);
    if (sortBy === "amountDesc") return b.amount - a.amount;
    return 0;
  });
  const totalOutstanding = invoices.filter(i => i.status === "Pending" || i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0);
  const getStatusBadge = (status: string) => {
    let classes = "px-2 py-1 text-xs rounded-full font-medium";
    if (status === "Paid") classes += "bg-green-100 text-green-800";else if (status === "Overdue") classes += "bg-red-100 text-red-800";else if (status === "Cancelled") classes += "bg-gray-100 text-gray-800";else classes += "bg-yellow-100 text-yellow-800"; // Pending
    return <span className={classes}>{status}</span>;
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Receipt} title="Invoice Tracker" description="Track pending invoices, payments, and outstanding balances locally." actions={<React.Fragment>
 <ActionButton onClick={exportCsv} icon={Download} label="Export CSV" />
 <ResetButton onClick={() => {
          if (confirm("Clear all data?")) saveInvoices([]);
        }} label="Clear All" />
 </React.Fragment>} />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Invoice</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Client Name *</Label>
 <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Acme Corp" />
 </div>
 <div className="space-y-2">
 <Label>Invoice Number *</Label>
 <Input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder="INV-001" />
 </div>
 <div className="space-y-2">
 <Label>Amount ($) *</Label>
 <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1000" />
 </div>
 <div className="space-y-2">
 <Label>Issue Date</Label>
 <Input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Due Date *</Label>
 <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
 </div>
 <Button className="w-full" onClick={addInvoice}>Add Invoice</Button>
 </CardContent>
 </GlassCard>

 <div className="md:col-span-2 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <GlassCard className="bg-primary/5">
 <CardContent className="pt-6 flex items-center gap-4">
 <div className="p-3 bg-primary/20 rounded-full">
 <DollarSign className="w-6 h-6 text-primary" />
 </div>
 <div>
 <p className="text-sm text-muted-foreground">Total Outstanding</p>
 <p className="text-2xl font-bold">{"$" + totalOutstanding.toFixed(2)}</p>
 </div>
 </CardContent>
 </GlassCard>
 <GlassCard className="bg-muted/50">
 <CardContent className="pt-6 flex flex-col justify-center h-full space-y-2">
 <div className="flex gap-2">
 <Select value={filterStatus} onValueChange={setFilterStatus}>
 <SelectTrigger className="w-full">
 <Filter className="w-4 h-4 mr-2" />
 <SelectValue placeholder="Filter" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="All">All Statuses</SelectItem>
 <SelectItem value="Pending">Pending</SelectItem>
 <SelectItem value="Paid">Paid</SelectItem>
 <SelectItem value="Overdue">Overdue</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="flex gap-2">
 <Select value={sortBy} onValueChange={setSortBy}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Sort" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="dueDate">Sort by Due Date</SelectItem>
 <SelectItem value="amountDesc">Sort by Highest Amount</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Invoices</CardTitle>
 </CardHeader>
 <CardContent>
 {processedInvoices.length === 0 ? <div className="text-center p-8 text-muted-foreground">
 <Receipt className="w-12 h-12 mx-auto mb-3 opacity-20" />
 <p>No invoices found. Add one to get started.</p>
 </div> : <div className="space-y-4">
 {processedInvoices.map(inv => <div key={inv.id} className={cn("flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg transition-colors hover:bg-muted/30", inv.status === "Overdue" ? "border-red-200 bg-red-50/30" : "")}>
 <div className="mb-4 sm:mb-0 space-y-1">
 <div className="flex items-center gap-2">
 <span className="font-semibold">{inv.clientName}</span>
 <span className="text-xs text-muted-foreground">#{inv.invoiceNumber}</span>
 {getStatusBadge(inv.status)}
 </div>
 <p className="text-sm text-muted-foreground">
 Due: {inv.dueDate}
 {inv.issueDate && "• Issued:" + inv.issueDate}
 </p>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-lg font-bold">
 {"$" + inv.amount.toFixed(2)}
 </div>
 <div className="flex items-center gap-1">
 {inv.status !== "Paid" && <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => markStatus(inv.id, "Paid")} title="Mark as Paid">
 <CheckCircle className="w-4 h-4" />
 </Button>}
 <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100" onClick={() => deleteInvoice(inv.id)} title="Delete">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>
 </div>)}
 </div>}
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
          <h3>Why Use Our Invoice Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Invoice Tracker provides
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

      <RelatedTools currentToolUrl="/tools/finance/invoice-tracker" max={6} />

    </div></div>;
}