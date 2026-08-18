"use client";

import { cn } from "@/lib/utils";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { AlertCircle, Bell, CheckCircle, CheckCircle2, DollarSign, Download, Eye, FileText, Filter, Receipt, Trash2 } from"lucide-react";
import toast from"react-hot-toast";

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
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

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
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Invoices",
    description:"Enter invoice amounts and due dates.",
    icon: FileText,
  },
{
    step:"02",
    title:"Mark Status",
    description:"Track paid, sent, or overdue.",
    icon: CheckCircle2,
  },
{
    step:"03",
    title:"Monitor",
    description:"See outstanding totals and aging.",
    icon: Eye,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Invoice List",
    description:"Centralizes all client invoices.",
  },
{
    icon: CheckCircle2,
    title:"Status Tags",
    description:"Paid, pending, overdue at a glance.",
  },
{
    icon: Eye,
    title:"Outstanding View",
    description:"Total unpaid and aging buckets.",
  },
{
    icon: Bell,
    title:"Overdue Alerts",
    description:"Flags late payments clearly.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An invoice tracker is the cash-flow command center for freelancers and small businesses. Scattered invoices in email and spreadsheets lead to forgotten payments and awkward client conversations. Consolidating them in one view shows exactly what is owed, by whom, and for how long — the foundation of healthy cash flow.</p>
  <p>Status tracking is the core. Marking each invoice sent, paid, or overdue turns a pile into a dashboard. The outstanding total tells you what is coming in; the aging buckets reveal which clients are slow, letting you prioritize follow-ups. A single overdue invoice can strand payroll, so visibility is not optional.</p>
  <p>Prompt action recovers more. The tracker flags late payments so you can send a polite nudge before relationships sour or debts age beyond easy collection. Many freelancers lose income simply by forgetting to follow up; a visible overdue list removes that failure mode. Pair it with a consistent invoicing cadence.</p>
  <p>Privacy suits sensitive financial data. Running locally means client details never leave your device, unlike some cloud tools. Use the tracker weekly to reconcile, monthly to forecast, and before tax time to report income accurately. The tool's value is turning reactive money-chasing into a calm, systematic routine that keeps cash flowing.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/finance/invoice-tracker" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"Why track invoices?",
    answer:"Visibility prevents missed payments and cash-flow gaps.",
  },
{
    question:"What is aging?",
    answer:"How long an invoice has been unpaid, grouped in buckets.",
  },
{
    question:"Should I chase overdue ones?",
    answer:"Yes, prompt follow-up recovers more than waiting.",
  },
{
    question:"Does it send reminders?",
    answer:"No, it is a tracker; you act on the flags.",
  },
{
    question:"Is my data private?",
    answer:"Yes, it runs locally in your browser.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default InvoiceTrackerClient;
