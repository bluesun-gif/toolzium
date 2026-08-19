"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { ArrowLeft, Copy, CreditCard, DollarSign, Download, History, PieChart, Plus, Receipt, Send, Shield, Sparkles, Trash2, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
};
type Trip = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  expenses: Expense[];
};
export function ExpensesClient() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [newTripName, setNewTripName] = useState("");
  const [newTripBudget, setNewTripBudget] = useState("");
  const [newTripCurrency, setNewTripCurrency] = useState("USD");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseNotes, setExpenseNotes] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_travel_trips");
    if (saved) {
      try {
        setTrips(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse trips");
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("toolzium_travel_trips", JSON.stringify(trips));
    }
  }, [trips, typeof window]);
  const activeTrip = trips.find(t => t.id === activeTripId);
  const createTrip = () => {
    if (!newTripName || !newTripBudget) {
      toast.error("Please fill required fields");
      return;
    }
    const newTrip: Trip = {
      id: Date.now().toString(),
      name: newTripName,
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      budget: parseFloat(newTripBudget),
      currency: newTripCurrency,
      expenses: []
    };
    setTrips([...trips, newTrip]);
    setNewTripName("");
    setNewTripBudget("");
    setActiveTripId(newTrip.id);
    toast.success("Trip created");
  };
  const deleteTrip = (id: string) => {
    setTrips(trips.filter(t => t.id !== id));
    if (activeTripId === id) setActiveTripId(null);
    toast.success("Trip deleted");
  };
  const addExpense = () => {
    if (!activeTrip) return;
    if (!expenseAmount) {
      toast.error("Please enter an amount");
      return;
    }
    const exp: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: expenseDate,
      notes: expenseNotes
    };
    setTrips(trips.map(t => t.id === activeTrip.id ? {
      ...t,
      expenses: [exp, ...t.expenses]
    } : t));
    setExpenseAmount("");
    setExpenseNotes("");
    toast.success("Expense added");
  };
  const deleteExpense = (expId: string) => {
    if (!activeTrip) return;
    setTrips(trips.map(t => t.id === activeTrip.id ? {
      ...t,
      expenses: t.expenses.filter(e => e.id !== expId)
    } : t));
  };
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      Food: "#ef4444",
      Transport: "#3b82f6",
      Accommodation: "#8b5cf6",
      Activities: "#f59e0b",
      Shopping: "#ec4899",
      Other: "#6b7280"
    };
    return colors[cat] || "#6b7280";
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={CreditCard} title="Travel Expense Tracker" description="Track expenses during a trip, manage budget and analyze spending by category." />

 {!activeTripId ? <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Create New Trip</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Trip Name</Label>
 <Input value={newTripName} onChange={e => setNewTripName(e.target.value)} placeholder="e.g. Summer in Paris" />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Budget</Label>
 <Input type="number" value={newTripBudget} onChange={e => setNewTripBudget(e.target.value)} placeholder="0.00" />
 </div>
 <div className="space-y-2">
 <Label>Currency</Label>
 <Select value={newTripCurrency} onValueChange={setNewTripCurrency}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="USD">USD ($)</SelectItem>
 <SelectItem value="EUR">EUR (€)</SelectItem>
 <SelectItem value="GBP">GBP (£)</SelectItem>
 <SelectItem value="JPY">JPY (¥)</SelectItem>
 <SelectItem value="INR">INR (₹)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 <Button onClick={createTrip} className="w-full"><Send className="w-4 h-4 mr-2" /> Start Trip</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Your Trips</CardTitle>
 </CardHeader>
 <CardContent>
 {trips.length === 0 ? <p className="text-muted-foreground text-center py-8">No trips yet. Create one to start tracking!</p> : <div className="space-y-3">
 {trips.map(trip => {
                const totalSpent = trip.expenses.reduce((sum, e) => sum + e.amount, 0);
                return <div key={trip.id} className="flex items-center justify-between p-3 border rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer" onClick={() => setActiveTripId(trip.id)}>
 <div>
 <p className="font-semibold">{trip.name}</p>
 <p className="text-xs text-muted-foreground">{formatCurrency(totalSpent, trip.currency)} / {formatCurrency(trip.budget, trip.currency)}</p>
 </div>
 <Button variant="ghost" size="icon" onClick={e => {
                    e.stopPropagation();
                    deleteTrip(trip.id);
                  }}>
 <Trash2 className="w-4 h-4 text-destructive" />
 </Button>
 </div>;
              })}
 </div>}
 </CardContent>
 </GlassCard>
 </div> : activeTrip && <div className="space-y-6">
 <Button variant="outline" onClick={() => setActiveTripId(null)}>
 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Trips
 </Button>

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Add Expense</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Amount ({activeTrip.currency})</Label>
 <Input type="number" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} placeholder="0.00" />
 </div>
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={expenseCategory} onValueChange={setExpenseCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Food">Food & Dining</SelectItem>
 <SelectItem value="Transport">Transportation</SelectItem>
 <SelectItem value="Accommodation">Accommodation</SelectItem>
 <SelectItem value="Activities">Activities</SelectItem>
 <SelectItem value="Shopping">Shopping</SelectItem>
 <SelectItem value="Other">Other</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={expenseDate} onChange={e => setExpenseDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Notes (Optional)</Label>
 <Input value={expenseNotes} onChange={e => setExpenseNotes(e.target.value)} placeholder="Coffee, taxi, etc." />
 </div>
 <Button onClick={addExpense} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Expense</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle>Dashboard - {activeTrip.name}</CardTitle>
 </CardHeader>
 <CardContent>
 {(() => {
                const totalSpent = activeTrip.expenses.reduce((sum, e) => sum + e.amount, 0);
                const remaining = activeTrip.budget - totalSpent;
                const percent = Math.min(100, Math.max(0, totalSpent / activeTrip.budget * 100));
                const byCategory = activeTrip.expenses.reduce((acc, exp) => {
                  acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                  return acc;
                }, {} as Record<string, number>);
                return <div className="space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
 <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
 <p className="text-2xl font-bold text-primary">{formatCurrency(totalSpent, activeTrip.currency)}</p>
 </div>
 <div className={cn("p-4 rounded-lg border", remaining < 0 ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400")}>
 <p className="text-sm opacity-80 mb-1">Remaining Budget</p>
 <p className="text-2xl font-bold">{formatCurrency(remaining, activeTrip.currency)}</p>
 </div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span>Budget Progress</span>
 <span>{percent.toFixed(1)}%</span>
 </div>
 <div className="h-4 bg-muted rounded-full overflow-hidden">
 <div className={cn("h-full transition-all", percent > 90 ? "bg-destructive" : "bg-primary")} style={{
                        width: `${percent}%`
                      }} />
 </div>
 </div>

 {activeTrip.expenses.length > 0 && <div>
 <h4 className="font-semibold mb-3 flex items-center gap-2"><PieChart className="w-4 h-4" /> Spending by Category</h4>
 <div className="space-y-2">
 {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => <div key={cat} className="flex items-center gap-2">
 <div className="w-3 h-3 rounded-full" style={{
                          backgroundColor: getCategoryColor(cat)
                        }} />
 <div className="flex-1 flex justify-between text-sm">
 <span>{cat}</span>
 <span className="font-medium">{formatCurrency(amount, activeTrip.currency)}</span>
 </div>
 </div>)}
 </div>
 </div>}
 </div>;
              })()}
 </CardContent>
 </GlassCard>
 
 <GlassCard className="md:col-span-3">
 <CardHeader>
 <CardTitle>Expense History</CardTitle>
 </CardHeader>
 <CardContent>
 {activeTrip.expenses.length === 0 ? <p className="text-center text-muted-foreground py-4">No expenses recorded yet.</p> : <div className="divide-y">
 {activeTrip.expenses.map(exp => <div key={exp.id} className="py-3 flex items-center justify-between hover:bg-muted/30 px-2 rounded transition-colors">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold" style={{
                      backgroundColor: getCategoryColor(exp.category)
                    }}>
 {exp.category.substring(0, 2).toUpperCase()}
 </div>
 <div>
 <p className="font-medium">{exp.category} {exp.notes && <span className="text-muted-foreground font-normal text-sm">- {exp.notes}</span>}</p>
 <p className="text-xs text-muted-foreground">{exp.date}</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <p className="font-bold">{formatCurrency(exp.amount, activeTrip.currency)}</p>
 <Button variant="ghost" size="icon" onClick={() => deleteExpense(exp.id)}>
 <Trash2 className="w-4 h-4 text-destructive" />
 </Button>
 </div>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>}
 
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

      <ToolFeatureGuides features={[
        { icon: Receipt, title: "Multi-Currency Logging", description: "Log expenses in any currency — auto-converted to your home currency." },
        { icon: PieChart, title: "Category Breakdown", description: "Visual breakdown of spending by food, transport, accommodation, and activities." },
        { icon: Download, title: "Export to CSV", description: "Download a complete expense report for reimbursement or tax records." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Travel Expense Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Expense Tracker provides
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
    </div>
  );
}

export default ExpensesClient;
