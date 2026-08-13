"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, Calendar, TrendingUp, Plus, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type SymptomEntry = {
 id: string;
 symptom: string;
 severity: string;
 category: string;
 notes: string;
 timeOfDay: string;
 date: string;
};

const CATEGORIES = ["Pain","Fatigue","Mood","Digestive","Respiratory","Other"];
const TIMES = ["Morning","Afternoon","Evening","Night"];

export function SymptomDiaryClient() {
 const [entries, setEntries] = useState<SymptomEntry[]>([]);
 const [symptom, setSymptom] = useState("");
 const [severity, setSeverity] = useState("5");
 const [category, setCategory] = useState(CATEGORIES[0]);
 const [notes, setNotes] = useState("");
 const [timeOfDay, setTimeOfDay] = useState(TIMES[0]);

 useEffect(() => {
 const saved = localStorage.getItem("symptom-diary-entries");
 if (saved) setEntries(JSON.parse(saved));
 }, []);

 useEffect(() => {
 localStorage.setItem("symptom-diary-entries", JSON.stringify(entries));
 }, [entries]);

 const addEntry = () => {
 if (!symptom.trim()) {
 toast.error("Please enter a symptom");
 return;
 }
 const newEntry: SymptomEntry = {
 id: Date.now().toString(),
 symptom,
 severity,
 category,
 notes,
 timeOfDay,
 date: new Date().toISOString()
 };
 setEntries([newEntry, ...entries]);
 setSymptom("");
 setNotes("");
 toast.success("Entry added");
 };

 const deleteEntry = (id: string) => {
 setEntries(entries.filter(e => e.id !== id));
 };

 const clearData = () => {
 if (confirm("Clear all symptom diary data?")) {
 setEntries([]);
 toast.success("Data cleared");
 }
 };

 const exportData = () => {
 let text ="Symptom Diary Export\n\n";
 entries.forEach(e => {
 text += `Date: ${new Date(e.date).toLocaleDateString()} ${new Date(e.date).toLocaleTimeString()}\n`;
 text += `Symptom: ${e.symptom}\n`;
 text += `Severity: ${e.severity}/10\n`;
 text += `Category: ${e.category}\n`;
 text += `Time of Day: ${e.timeOfDay}\n`;
 if (e.notes) text += `Notes: ${e.notes}\n`;
 text += `----------------------\n`;
 });
 const blob = new Blob([text], { type: 'text/plain' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `symptom-diary-${new Date().toISOString().split('T')[0]}.txt`;
 a.click();
 URL.revokeObjectURL(url);
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
 icon={Activity} 
 title="Symptom Diary"
 description="Track daily symptoms, monitor severity, and view trends. Note: This tool is not a substitute for professional medical advice."
 actions={<ResetButton onClick={clearData} label="Clear Data"/>}
 />
 
 <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-md text-sm">
 <strong>Disclaimer:</strong> This tool is for personal tracking purposes only. Consult a healthcare provider for medical advice, diagnosis, or treatment.
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Log Symptom</CardTitle>
 <CardDescription>Add a new entry to your diary</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Symptom</Label>
 <Input placeholder="e.g. Headache, Nausea"value={symptom} onChange={e => setSymptom(e.target.value)} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Severity (1-10)</Label>
 <Select value={severity} onValueChange={setSeverity}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {[1,2,3,4,5,6,7,8,9,10].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Time of Day</Label>
 <Select value={timeOfDay} onValueChange={setTimeOfDay}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {TIMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Notes (Optional)</Label>
 <Input placeholder="Triggers, medications taken, etc."value={notes} onChange={e => setNotes(e.target.value)} />
 </div>
 <Button className="w-full"onClick={addEntry}><Plus className="w-4 h-4 mr-2"/> Log Symptom</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Recent Logs</CardTitle>
 <CardDescription>Your tracked symptoms</CardDescription>
 </div>
 <Button variant="outline"size="sm"onClick={exportData}>Export Text</Button>
 </CardHeader>
 <CardContent>
 {entries.length === 0 ? (
 <div className="text-center text-muted-foreground py-8">No symptoms logged yet.</div>
 ) : (
 <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
 {entries.map(e => (
 <div key={e.id} className="p-4 border rounded-md space-y-2">
 <div className="flex justify-between items-start">
 <div>
 <h4 className="font-semibold">{e.symptom} <span className="text-sm font-normal text-muted-foreground">({e.category})</span></h4>
 <div className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString()} - {e.timeOfDay}</div>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-sm font-medium bg-muted px-2 py-1 rounded">Severity: {e.severity}/10</span>
 <Button variant="ghost"size="sm"onClick={() => deleteEntry(e.id)}>X</Button>
 </div>
 </div>
 {e.notes && <div className="text-sm text-muted-foreground">{e.notes}</div>}
 </div>
 ))}
 </div>
 )}
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
          <h3>Why Use Our Symptom Diary?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Symptom Diary provides
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

      <RelatedTools currentToolUrl="/tools/health/symptom-diary" max={6} />

</div>
 );
}
