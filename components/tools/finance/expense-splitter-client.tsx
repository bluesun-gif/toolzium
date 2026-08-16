"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { Calculator, CheckCircle2, Copy, DollarSign, Plus, Receipt, Trash2, Users, Wallet } from"lucide-react";
import toast from"react-hot-toast";

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
    step:"01",
    title:"Add Shared Costs",
    description:"Enter the bill and who paid.",
    icon: Receipt,
  },
{
    step:"02",
    title:"Assign Shares",
    description:"Split equally or by custom weights.",
    icon: Users,
  },
{
    step:"03",
    title:"Settle",
    description:"See who owes whom and how much.",
    icon: Wallet,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Receipt,
    title:"Bill Entry",
    description:"Handles one total or itemized costs.",
  },
{
    icon: Users,
    title:"Flexible Shares",
    description:"Equal, percentage, or custom splits.",
  },
{
    icon: Wallet,
    title:"Net Balances",
    description:"Computes who pays whom directly.",
  },
{
    icon: CheckCircle2,
    title:"Group Friendly",
    description:"Works for trips, roommates, dinners.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Splitting expenses fairly is a common source of friction among friends, roommates, and travel groups. The expense splitter removes the awkward mental math by recording who paid what and how costs should be shared, then computing exactly who owes whom. The result is a clean settlement instead of a vague &quot;you owe me something.&quot;</p>
  <p>The tool handles both simple and complex cases. Equal splits suit a dinner where everyone ordered similarly; weighted splits suit a trip where one person covered flights while another covered meals. Recording each payer means the net balance reflects reality, so the person who fronted the most is repaid correctly.</p>
  <p>Settlement logic is the quiet strength. Rather than a web of small debts, the splitter nets everything into direct transfers — A pays B a specific amount — minimizing the number of transactions. This clarity prevents the &quot;I thought you paid&quot; confusion that strains relationships.</p>
  <p>Use it proactively, during the trip or right after the bill, while memory is fresh. Capture expenses as they happen rather than reconstructing weeks later from photos of receipts. Whether splitting rent, a vacation, or a group gift, the splitter turns a social chore into a fair, final number everyone can accept.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How does unequal splitting work?",
    answer:"Assign weights or percentages so someone paying more is accounted for fairly.",
  },
{
    question:"Can it handle multiple payers?",
    answer:"Yes, each expense records who fronted the money.",
  },
{
    question:"What if someone paid for several things?",
    answer:"Enter each or sum them; the tool nets all balances.",
  },
{
    question:"Is this for roommates or trips?",
    answer:"Both; any shared expense scenario works.",
  },
{
    question:"Does it handle currency?",
    answer:"Use one currency per session to keep math clean.",
  }
  ]}
/>
</div>
 );
}
