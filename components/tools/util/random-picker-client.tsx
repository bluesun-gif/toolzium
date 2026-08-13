"use client";

import {
 ActionButton,
 CopyButton,
 ExportTextButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import ToolPageHeader from"@/components/shared/tool-page-header";
import {
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { Dice5, Sparkles, Users, Shield, Zap, Copy } from"lucide-react";
import { useEffect, useState } from"react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

// Types
type Entry = { id: string; name: string };
type HistoryItem = { id: string; ts: number; winner: string; pool: number };

// Helpers
function uid(prefix ="id") {
 return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function RandomPickerClient() {
 const [input, setInput] = useState("");
 const [entries, setEntries] = useState<Entry[]>([]);
 const [winner, setWinner] = useState<string | null>(null);
 const [history, setHistory] = useState<HistoryItem[]>([]);

 useEffect(() => {
 try {
 const s = localStorage.getItem("tools:randpicker:entries");
 if (s) {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setEntries(JSON.parse(s));
 }
 const h = localStorage.getItem("tools:randpicker:history");
 if (h) setHistory(JSON.parse(h));
 } catch {}
 }, []);

 useEffect(() => {
 try {
 localStorage.setItem("tools:randpicker:entries", JSON.stringify(entries));
 } catch {}
 }, [entries]);
 useEffect(() => {
 try {
 localStorage.setItem("tools:randpicker:history", JSON.stringify(history.slice(0, 20)));
 } catch {}
 }, [history]);

 const addEntries = () => {
 const lines = input
 .split(/\r?\n/)
 .map((l) => l.trim())
 .filter(Boolean);
 if (!lines.length) return;
 setEntries((es) => [...es, ...lines.map((l) => ({ id: uid("e"), name: l }))]);
 setInput("");
 };

 const resetAll = () => {
 setEntries([]);
 setWinner(null);
 setHistory([]);
 };

 const pickWinner = () => {
 if (!entries.length) return;
 const i = Math.floor(Math.random() * entries.length);
 const w = entries[i].name;
 setWinner(w);
 setHistory((h) =>
 [{ id: uid("h"), ts: Date.now(), winner: w, pool: entries.length }, ...h].slice(0, 20),
 );
 };

 return (
 <>
 <ToolPageHeader
 icon={Dice5}
 title="Random Picker"
 description="Pick a random winner from a list of names."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ExportTextButton
 variant="default"
 filename="entries.txt"
 getText={() => entries.map((e) => e.name).join("\n")}
 disabled={!entries}
 />
 </>
 }
 />

 {/* Input */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Add Entries</CardTitle>
 <CardDescription>One name per line.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-2">
 <TextareaField
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Alice\nBob\nCharlie"
 textareaClassName="min-h-[120px]"
 />
 <ActionButton variant="default"icon={Users} label="Add"onClick={addEntries} />
 </CardContent>
 </GlassCard>

 <Separator />

 {/* Entries list */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Entries</CardTitle>
 <CardDescription>All current names</CardDescription>
 </CardHeader>
 <CardContent className="space-y-2">
 {entries.length === 0 && <p className="text-sm text-muted-foreground">No entries yet.</p>}
 <ul className="list-disc pl-6 text-sm space-y-1">
 {entries.map((e) => (
 <li key={e.id}>{e.name}</li>
 ))}
 </ul>
 </CardContent>
 </GlassCard>

 {/* Winner */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Winner</CardTitle>
 <CardDescription>Click Pick to choose randomly</CardDescription>
 </CardHeader>
 <CardContent className="space-y-3">
 <ActionButton
 variant="default"
 icon={Sparkles}
 label="Pick Winner"
 onClick={pickWinner}
 />
 {winner ? (
 <div className="flex items-center justify-between rounded-md border p-3">
      <GridPattern />

 <span className="font-semibold">{winner}</span>
 <CopyButton size="sm"getText={() => winner ||""} />
 
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
          <h3>Why Use Our Random Picker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Random Picker provides
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

      <RelatedTools currentToolUrl="/tools/util/random-picker" max={6} />

</div>
 ) : (
 <p className="text-sm text-muted-foreground">No winner yet.</p>
 )}
 </CardContent>
 </GlassCard>

 {/* History */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">History</CardTitle>
 <CardDescription>Last 20 picks</CardDescription>
 </CardHeader>
 <CardContent className="space-y-2">
 {history.length === 0 && <p className="text-sm text-muted-foreground">No picks yet.</p>}
 <ul className="text-sm space-y-1">
 {history.map((h) => (
 <li key={h.id}>
 [{new Date(h.ts).toLocaleString()}] {h.winner} (from {h.pool} entries)
 </li>
 ))}
 </ul>
 </CardContent>
 </GlassCard>
 </>
 );
}
