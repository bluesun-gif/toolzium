"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { HelpCircle, Scale, Shuffle, CheckCircle2, Plus, Trash, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

interface WeightedOption {
 id: string;
 name: string;
 prosScore: number;
 consScore: number;
}

export function DecisionMakerClient() {
 const [mode, setMode] = useState<"simple"|"weighted">("simple");
 
 // Simple Mode
 const [simpleOptions, setSimpleOptions] = useState<string[]>(["Option 1","Option 2"]);
 const [simpleResult, setSimpleResult] = useState<string | null>(null);
 const [isSpinning, setIsSpinning] = useState(false);

 // Weighted Mode
 const [weightedOptions, setWeightedOptions] = useState<WeightedOption[]>([
 { id:"1", name:"Option A", prosScore: 5, consScore: 5 },
 { id:"2", name:"Option B", prosScore: 5, consScore: 5 }
 ]);
 const [weightedResult, setWeightedResult] = useState<{name: string, score: number, conf: number} | null>(null);

 const [history, setHistory] = useState<string[]>([]);

 useEffect(() => {
 const saved = localStorage.getItem("decision-maker-history");
 if (saved) {
 try {
 setHistory(JSON.parse(saved));
 } catch (e) {}
 }
 }, []);

 const saveToHistory = (result: string) => {
 const newHistory = [result, ...history].slice(0, 10);
 setHistory(newHistory);
 localStorage.setItem("decision-maker-history", JSON.stringify(newHistory));
 };

 const handleSimpleDecide = () => {
 const valid = simpleOptions.filter(o => o.trim() !=="");
 if (valid.length < 2) {
 toast.error("Please enter at least 2 options");
 return;
 }
 
 setIsSpinning(true);
 setSimpleResult(null);
 
 let spins = 0;
 const interval = setInterval(() => {
 setSimpleResult(valid[Math.floor(Math.random() * valid.length)]);
 spins++;
 if (spins > 10) {
 clearInterval(interval);
 setIsSpinning(false);
 const final = valid[Math.floor(Math.random() * valid.length)];
 setSimpleResult(final);
 saveToHistory(`Simple: ${final}`);
 toast.success("Decision made!");
 }
 }, 100);
 };

 const handleWeightedDecide = () => {
 const valid = weightedOptions.filter(o => o.name.trim() !=="");
 if (valid.length < 2) {
 toast.error("Please enter at least 2 options");
 return;
 }

 let maxScore = -100;

 const scored = valid.map(o => {
 const score = o.prosScore - o.consScore;
 return { ...o, score };
 });

 let bestIdx = 0;
 scored.forEach((o, i) => {
 if (o.score > maxScore) {
 maxScore = o.score;
 bestIdx = i;
 }
 });

 const best = scored[bestIdx];
 if (best && scored.length >= 2) {
 const scores = scored.map(o => o.score);
 const min = Math.min(...scores);
 const max = Math.max(...scores);
 const range = max - min || 1;
 const conf = Math.round(((best.score - min) / range) * 100);
 
 setWeightedResult({
 name: best.name,
 score: best.score,
 conf: conf === 0 ? 50 : conf
 });
 saveToHistory(`Weighted: ${best.name}`);
 toast.success("Calculated best option!");
 }
 };

 const reset = () => {
 setSimpleOptions(["Option 1","Option 2"]);
 setSimpleResult(null);
 setWeightedOptions([
 { id:"1", name:"Option A", prosScore: 5, consScore: 5 },
 { id:"2", name:"Option B", prosScore: 5, consScore: 5 }
 ]);
 setWeightedResult(null);
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={HelpCircle}
 title="Decision Maker"
 description="Help users make decisions. Two modes: Simple random choice or Weighted pros and cons."
 actions={
 <ResetButton onClick={reset} label="Reset"/>
 }
 />

 <GlassCard>
 <CardHeader>
 <div className="flex items-center justify-between">
 <CardTitle>Decision Mode</CardTitle>
 <div className="flex items-center space-x-2">
 <Label>Simple</Label>
 <Switch 
 checked={mode ==="weighted"} 
 onCheckedChange={(c) => setMode(c ?"weighted":"simple")} 
 />
 <Label>Weighted</Label>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 {mode ==="simple"? (
 <div className="space-y-4">
 {simpleOptions.map((opt, i) => (
 <div key={i} className="flex items-center gap-2">
 <Input 
 value={opt}
 onChange={(e) => {
 const newOpts = [...simpleOptions];
 newOpts[i] = e.target.value;
 setSimpleOptions(newOpts);
 }}
 placeholder={`Option ${i + 1}`}
 />
 {simpleOptions.length > 2 && (
 <Button variant="ghost"size="icon"onClick={() => setSimpleOptions(simpleOptions.filter((_, idx) => idx !== i))}>
 <Trash className="w-4 h-4"/>
 </Button>
 )}
 </div>
 ))}
 <Button variant="outline"onClick={() => setSimpleOptions([...simpleOptions,""])}>
 <Plus className="w-4 h-4 mr-2"/> Add Option
 </Button>
 
 <div className="pt-4 flex flex-col items-center gap-4">
 <ActionButton 
 onClick={handleSimpleDecide} 
 icon={Shuffle} 
 label="Decide for me"
 />
 
 {simpleResult && (
 <div className={cn("p-6 bg-primary/10 rounded-lg text-center transition-all", (isSpinning ? 'animate-pulse scale-105' : 'scale-100'))}>
 <h3 className="text-2xl font-bold text-primary">{simpleResult}</h3>
 {!isSpinning && <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4"/> Selected randomly</p>}
 </div>
 )}
 </div>
 </div>
 ) : (
 <div className="space-y-4">
 {weightedOptions.map((opt, i) => (
 <div key={opt.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
 <div className="md:col-span-2 flex items-center gap-2">
 {weightedOptions.length > 2 && (
 <Button variant="ghost"size="icon"onClick={() => setWeightedOptions(weightedOptions.filter((o) => o.id !== opt.id))}>
 <Trash className="w-4 h-4"/>
 </Button>
 )}
 <Input 
 value={opt.name}
 onChange={(e) => {
 const newOpts = [...weightedOptions];
 newOpts[i].name = e.target.value;
 setWeightedOptions(newOpts);
 }}
 placeholder={`Option ${i + 1}`}
 />
 </div>
 <div>
 <Label className="text-xs">Pros (1-10)</Label>
 <Input 
 type="number"min={1} max={10} 
 value={opt.prosScore}
 onChange={(e) => {
 const newOpts = [...weightedOptions];
 newOpts[i].prosScore = parseInt(e.target.value) || 0;
 setWeightedOptions(newOpts);
 }}
 />
 </div>
 <div>
 <Label className="text-xs">Cons (1-10)</Label>
 <Input 
 type="number"min={1} max={10} 
 value={opt.consScore}
 onChange={(e) => {
 const newOpts = [...weightedOptions];
 newOpts[i].consScore = parseInt(e.target.value) || 0;
 setWeightedOptions(newOpts);
 }}
 />
 </div>
 </div>
 ))}
 <Button variant="outline"onClick={() => setWeightedOptions([...weightedOptions, { id: Math.random().toString(), name:"", prosScore: 5, consScore: 5 }])}>
 <Plus className="w-4 h-4 mr-2"/> Add Option
 </Button>

 <div className="pt-4 flex flex-col items-center gap-4">
 <ActionButton 
 onClick={handleWeightedDecide} 
 icon={Scale} 
 label="Calculate Best Option"
 />
 
 {weightedResult && (
 <div className="p-6 bg-primary/10 rounded-lg text-center">
 <p className="text-sm text-muted-foreground mb-1">Recommended Choice</p>
 <h3 className="text-2xl font-bold text-primary">{weightedResult.name}</h3>
 <p className="text-sm mt-2 flex items-center justify-center gap-1">
 <CheckCircle2 className="w-4 h-4 text-green-500"/> Confidence: {weightedResult.conf}%
 </p>
 </div>
 )}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 {history.length > 0 && (
 <GlassCard>
 <CardHeader>
 <CardTitle>Recent Decisions</CardTitle>
 </CardHeader>
 <CardContent>
 <ul className="space-y-2 text-sm text-muted-foreground">
 {history.map((h, i) => (
 <li key={i} className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-primary"/> {h}
 </li>
 ))}
 </ul>
 </CardContent>
 </GlassCard>
 )}
 
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
          <h3>Why Use Our Decision Maker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Decision Maker provides
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

      <RelatedTools currentToolUrl="/tools/util/decision-maker" max={6} />

</div>
 );
}
