"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Activity, AlertTriangle, BarChart3, Bell, ClipboardList, Download, Plus, Search, Trash2 } from"lucide-react";
import toast from"react-hot-toast";
import { cn } from"@/lib/utils";

=======
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
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { AlertTriangle, Plus, Activity, Download, Trash2, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
interface Allergy {
  id: string;
  name: string;
  category: string;
  reactionType: string;
  symptoms: string;
  date: string;
}
export function AllergyTrackerClient() {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [reactionType, setReactionType] = useState("Mild");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_allergies");
    if (saved) {
      try {
        setAllergies(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    setDate(new Date().toISOString().split("T")[0]);
  }, []);
  const saveToLocal = (data: Allergy[]) => {
    setAllergies(data);
    localStorage.setItem("toolzium_allergies", JSON.stringify(data));
  };
  const handleAdd = () => {
    if (!name) {
      toast.error("Please enter an allergen name");
      return;
    }
    const newAllergy: Allergy = {
      id: Math.random().toString(36).substring(7),
      name,
      category,
      reactionType,
      symptoms,
      date: date || new Date().toISOString().split("T")[0]
    };
    saveToLocal([newAllergy, ...allergies]);
    setName("");
    setSymptoms("");
    toast.success("Allergy recorded");
  };
  const handleDelete = (id: string) => {
    saveToLocal(allergies.filter(a => a.id !== id));
    toast.success("Entry deleted");
  };
  const handleReset = () => {
    if (confirm("Are you sure you want to delete all entries?")) {
      saveToLocal([]);
      toast.success("All data cleared");
    }
  };
  const handleExport = () => {
    if (allergies.length === 0) {
      toast.error("No data to export");
      return;
    }
    const text = allergies.map(a => `Allergen: ${a.name}\nCategory: ${a.category}\nReaction: ${a.reactionType}\nSymptoms: ${a.symptoms}\nDate: ${a.date}\n`).join("\n---\n\n");
    const blob = new Blob([text], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "allergy-log.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported to text file");
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Severe":
        return "text-red-500 font-bold";
      case "Moderate":
        return "text-amber-500 font-bold";
      case "Mild":
        return "text-green-500 font-bold";
      default:
        return "";
    }
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={AlertTriangle} title="Allergy Tracker" description="Track your allergies and reactions privately in your browser." actions={<>
 <ActionButton onClick={handleExport} icon={Download} label="Export" />
 <ResetButton onClick={handleReset} label="Clear All" />
 </>} />
 
 <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-md text-sm">
 <strong>Disclaimer:</strong> This tool is for personal tracking only and is not a substitute for professional medical advice. Always consult a doctor for health concerns.
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Entry</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Allergen Name</Label>
 <Input placeholder="e.g., Peanuts, Pollen" value={name} onChange={e => setName(e.target.value)} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Food">Food</SelectItem>
 <SelectItem value="Environmental">Environmental</SelectItem>
 <SelectItem value="Medication">Medication</SelectItem>
 <SelectItem value="Animal">Animal</SelectItem>
 <SelectItem value="Other">Other</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Severity</Label>
 <Select value={reactionType} onValueChange={setReactionType}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="Mild">Mild</SelectItem>
 <SelectItem value="Moderate">Moderate</SelectItem>
 <SelectItem value="Severe">Severe</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Symptoms</Label>
 <Input placeholder="e.g., Hives, sneezing" value={symptoms} onChange={e => setSymptoms(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
 </div>
 <Button onClick={handleAdd} className="w-full gap-2">
 <Plus className="w-4 h-4" /> Add Record
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Dashboard</CardTitle>
 <CardDescription>Summary of recorded allergies</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-center">
 <span className="text-3xl font-bold">{allergies.length}</span>
 <span className="text-sm text-muted-foreground">Total Entries</span>
 </div>
 <div className="p-4 rounded-lg bg-red-500/10 flex flex-col items-center justify-center text-center">
 <span className="text-3xl font-bold text-red-500">{allergies.filter(a => a.reactionType === "Severe").length}</span>
 <span className="text-sm text-muted-foreground">Severe Reactions</span>
 </div>
 <div className="p-4 rounded-lg bg-blue-500/10 flex flex-col items-center justify-center text-center col-span-2">
 <span className="text-lg font-bold">
 {allergies.length > 0 ? Object.entries(allergies.reduce((acc, curr) => {
                    acc[curr.category] = (acc[curr.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1])[0][0] : "None"}
 </span>
 <span className="text-sm text-muted-foreground">Most Common Category</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Log History</CardTitle>
 </CardHeader>
 <CardContent>
 {allergies.length === 0 ? <div className="text-center text-muted-foreground py-8">No allergies recorded yet.</div> : <div className="space-y-4">
 {allergies.map(a => <div key={a.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card gap-4">
 <div>
 <h4 className="font-bold">{a.name}</h4>
 <p className="text-sm text-muted-foreground">{a.category} • {a.date}</p>
 {a.symptoms && <p className="text-sm mt-1">Symptoms: {a.symptoms}</p>}
 </div>
 <div className="flex items-center gap-4">
 <span className={cn("text-sm", getSeverityColor(a.reactionType))}>{a.reactionType}</span>
 <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} className="text-destructive">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Log Symptoms",
    description:"Record reactions and severity.",
    icon: ClipboardList,
  },
{
    step:"02",
    title:"Note Triggers",
    description:"Link symptoms to foods or environments.",
    icon: Search,
  },
{
    step:"03",
    title:"Review",
    description:"Spot patterns over time.",
    icon: BarChart3,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ClipboardList,
    title:"Symptom Log",
    description:"Track what and when.",
  },
{
    icon: Search,
    title:"Trigger Hunt",
    description:"Connect reactions to causes.",
  },
{
    icon: BarChart3,
    title:"Patterns",
    description:"Visualize frequency.",
  },
{
    icon: Bell,
    title:"Reminders",
    description:"Log consistently.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An allergy tracker turns scattered reactions into recognizable patterns. Occasional symptoms feel random until you log them alongside foods, environments, and timing. This tool records each episode so connections — a food, a pollen season, a pet — emerge from data rather than memory, which is unreliable for intermittent events.</p>
  <p>Logging discipline is the payoff. Capturing symptom, severity, and suspected trigger after every incident builds a timeline. Over weeks, frequency charts reveal what correlates with flares, guiding avoidance far better than guesswork. The tool structures this so the habit is easy.</p>
  <p>This is not a diagnosis. Patterns inform a conversation with a clinician, not a replacement for one. Bringing organized notes to an appointment accelerates accurate testing and advice. The tracker's value is transforming vague discomfort into actionable evidence you and your doctor can use.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why track allergies?",
    answer:"Patterns reveal triggers you can avoid.",
  },
{
    question:"What should I log?",
    answer:"Symptom, severity, time, and suspected cause.",
  },
{
    question:"Is this medical advice?",
    answer:"No, consult a clinician for diagnosis.",
  },
{
    question:"How long to track?",
    answer:"Several weeks captures season and diet cycles.",
  },
{
    question:"Can I export?",
    answer:"Keep notes to share with your doctor.",
  }
  ]}
/>
</div>
 );
}
=======
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
          <h3>Why Use Our Allergy Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Allergy Tracker provides
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

      <RelatedTools currentToolUrl="/tools/health/allergy-tracker" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
