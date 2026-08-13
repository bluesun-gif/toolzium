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
import { Users, DollarSign, Calculator, Copy, Plus, Trash2, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Person = { id: string; name: string };
type Expense = { id: string; description: string; amount: number; payerId: string; involvedIds: string[] };

export function ExpenseSplitterClient() {
 const [people, setPeople] = useState<Person[]>([]);
 const [newPersonName, setNewPersonName] = useState("");
 
 const [expenses, setExpenses] = useState<Expense[]>([]);
 const [newExpenseDesc, setNewExpenseDesc] = useState("");
 const [newExpenseAmount, setNewExpenseAmount] = useState("");
 const [newExpensePayer, setNewExpensePayer] = useState("");

 const addPerson = () => {
 if (!newPersonName.trim()) return;
 setPeople([...people, { id: crypto.randomUUID(), name: newPersonName.trim() }]);
 setNewPersonName("");
 };

 const removePerson = (id: string) => {
 setPeople(people.filter(p => p.id !== id));
 setExpenses(expenses.filter(e => e.payerId !== id && !e.involvedIds.includes(id)));
 };

 const addExpense = () => {
 const amount = parseFloat(newExpenseAmount);
 if (!newExpenseDesc || isNaN(amount) || amount <= 0 || !newExpensePayer) {
 toast.error("Please fill all expense fields correctly.");
 return;
 }
 setExpenses([...expenses, {
 id: crypto.randomUUID(),
 description: newExpenseDesc,
 amount,
 payerId: newExpensePayer,
 involvedIds: people.map(p => p.id) // Default split equally among all
 }]);
 setNewExpenseDesc("");
 setNewExpenseAmount("");
 };

 const removeExpense = (id: string) => {
 setExpenses(expenses.filter(e => e.id !== id));
 };

 const calculateSettlements = () => {
 const balances: Record<string, number> = {};
 people.forEach(p => balances[p.id] = 0);

 expenses.forEach(exp => {
 balances[exp.payerId] += exp.amount;
 const splitAmount = exp.amount / exp.involvedIds.length;
 exp.involvedIds.forEach(id => {
 balances[id] -= splitAmount;
 });
 });

 const debtors = Object.entries(balances).filter(([_, b]) => b < -0.01).map(([id, b]) => ({ id, amount: -b })).sort((a, b) => b.amount - a.amount);
 const creditors = Object.entries(balances).filter(([_, b]) => b > 0.01).map(([id, b]) => ({ id, amount: b })).sort((a, b) => b.amount - a.amount);

 const settlements: { from: string; to: string; amount: number }[] = [];
 
 let d = 0, c = 0;
 while (d < debtors.length && c < creditors.length) {
 const debtor = debtors[d];
 const creditor = creditors[c];
 const amount = Math.min(debtor.amount, creditor.amount);
 
 settlements.push({ from: debtor.id, to: creditor.id, amount });
 
 debtor.amount -= amount;
 creditor.amount -= amount;
 
 if (debtor.amount < 0.01) d++;
 if (creditor.amount < 0.01) c++;
 }

 return settlements;
 };

 const settlements = calculateSettlements();
 const getPersonName = (id: string) => people.find(p => p.id === id)?.name ||"Unknown";

 const getSettlementText = () => {
 if (settlements.length === 0) return"No settlements needed.";
 return settlements.map(s => `${getPersonName(s.from)} owes ${getPersonName(s.to)} $${s.amount.toFixed(2)}`).join('\n');
 };

 const handleReset = () => {
 setPeople([]);
 setExpenses([]);
 setNewPersonName("");
 setNewExpenseDesc("");
 setNewExpenseAmount("");
 setNewExpensePayer("");
 };

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Calculator}
 title="Expense Splitter"
 description="Split expenses among a group and calculate who owes whom."
 actions={
 <>
 <CopyButton getText={getSettlementText} label="Copy Settlements"/>
 <ResetButton onClick={handleReset} label="Reset All"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>People</CardTitle>
 <CardDescription>Add people to the group</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2">
 <Input
 placeholder="Name"
 value={newPersonName}
 onChange={e => setNewPersonName(e.target.value)}
 onKeyDown={e => e.key === 'Enter' && addPerson()}
 />
 <Button onClick={addPerson}><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </div>
 <div className="space-y-2">
 {people.map(p => (
 <div key={p.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
 <span>{p.name}</span>
 <Button variant="ghost"size="icon"onClick={() => removePerson(p.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Expenses</CardTitle>
 <CardDescription>Add group expenses</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Input placeholder="Description"value={newExpenseDesc} onChange={e => setNewExpenseDesc(e.target.value)} />
 <div className="flex gap-2">
 <Input type="number"placeholder="Amount"value={newExpenseAmount} onChange={e => setNewExpenseAmount(e.target.value)} />
 <Select value={newExpensePayer} onValueChange={setNewExpensePayer}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Paid by"/>
 </SelectTrigger>
 <SelectContent>
 {people.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addExpense} className="w-full"disabled={people.length === 0}><Plus className="w-4 h-4 mr-2"/> Add Expense</Button>
 </div>
 <div className="space-y-2 max-h-48 overflow-y-auto">
 {expenses.map(e => (
 <div key={e.id} className="flex justify-between items-center p-2 bg-muted rounded-md text-sm">
 <div>
 <p className="font-medium">{e.description}</p>
 <p className="text-muted-foreground">{getPersonName(e.payerId)} paid ${e.amount.toFixed(2)}</p>
 </div>
 <Button variant="ghost"size="icon"onClick={() => removeExpense(e.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Settlements</CardTitle>
 <CardDescription>Who owes whom</CardDescription>
 </CardHeader>
 <CardContent>
 {settlements.length === 0 ? (
 <p className="text-muted-foreground text-center py-4">No settlements to show.</p>
 ) : (
 <div className="space-y-2">
 {settlements.map((s, i) => (
 <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-md">
 <div className="flex items-center gap-2">
 <span className="font-semibold">{getPersonName(s.from)}</span>
 <span className="text-muted-foreground text-sm">owes</span>
 <span className="font-semibold">{getPersonName(s.to)}</span>
 </div>
 <span className="font-bold text-primary">${s.amount.toFixed(2)}</span>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Expense Splitter?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Expense Splitter provides
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

      <RelatedTools currentToolUrl="/tools/finance/expense-splitter" max={6} />

</div>
 );
}
