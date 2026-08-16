"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
=======
import { ToolBackground } from"@/components/shared/tool-background";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Badge } from"@/components/ui/badge";
import { Button } from"@/components/ui/button";
import {
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
<<<<<<< HEAD
import { Check, CheckCircle2, ClipboardList, Flag, ListPlus, Plus, Trash2, WifiOff } from"lucide-react";
=======
import { Check, ClipboardList, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
import { useEffect, useState } from"react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

// Types

type Todo = {
 id: string;
 text: string;
 done: boolean;
 note?: string;
 created: number;
};

// Helpers
function uid(prefix ="id") {
 return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// Page
export default function TodoOfflineClient() {
 const [todos, setTodos] = useState<Todo[]>([]);
 const [input, setInput] = useState("");
 const [note, setNote] = useState("");

 // Local storage
 useEffect(() => {
 try {
 const saved = localStorage.getItem("tools:todo");
 if (saved) {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setTodos(JSON.parse(saved));
 }
 } catch {}
 }, []);

 useEffect(() => {
 try {
 localStorage.setItem("tools:todo", JSON.stringify(todos));
 } catch {}
 }, [todos]);

 const addTodo = () => {
 if (!input.trim()) return;
 setTodos([
 { id: uid("todo"), text: input.trim(), note: note.trim(), done: false, created: Date.now() },
 ...todos,
 ]);
 setInput("");
 setNote("");
 };

 const toggleTodo = (id: string) => {
 setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
 };

 const removeTodo = (id: string) => setTodos((ts) => ts.filter((t) => t.id !== id));
 const clearAll = () => setTodos([]);

 return (
 <>
 <ToolPageHeader
 icon={ClipboardList}
 title="To-Do (Offline)"
 description="Local, private tasks stored in your browser."
 actions={<ResetButton onClick={clearAll} />}
 />

 {/* Add new task */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">New Task</CardTitle>
 <CardDescription>Quickly add a task with optional notes.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-3 md:grid-cols-2">
 <InputField
 label="Task"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="What needs to be done?"
 />
 <InputField
 label="Note (optional)"
 id="note"
 value={note}
 onChange={(e) => setNote(e.target.value)}
 placeholder="Extra details"
 />

 <div className="col-span-2">
      <ToolBackground />

 <ActionButton variant="default"icon={Plus} label="Add Task"onClick={addTodo} />
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* List */}
 <GlassCard>
 <CardHeader className="flex items-end justify-between">
 <div>
 <CardTitle className="text-base">Tasks</CardTitle>
 <CardDescription>Check off tasks when complete.</CardDescription>
 </div>

 <Badge variant="secondary"className="self-center">
 {todos.filter((t) => !t.done).length} pending
 </Badge>
 </CardHeader>
 <CardContent className="space-y-3">
 {todos.length === 0 && (
 <p className="text-sm text-muted-foreground">No tasks yet. Add one above.</p>
 )}
 {todos.map((t) => (
 <div key={t.id} className="flex flex-col gap-2 rounded-md border p-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <Button
 size="icon"
 variant={t.done ?"default":"outline"}
 className="h-6 w-6"
 onClick={() => toggleTodo(t.id)}
 >
 {t.done && <Check className="h-4 w-4"/>}
 </Button>
 <span className={t.done ?"line-through text-muted-foreground":""}>
 {t.text}
 </span>
 </div>
 <ActionButton
 size="icon"
 icon={Trash2}
 variant="destructive"
 onClick={() => removeTodo(t.id)}
 />
 </div>
 {t.note && <p className="text-xs text-muted-foreground">{t.note}</p>}
 
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
          <h3>Why Use Our To-Do (Offline)?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our To-Do (Offline) provides
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

      <RelatedTools currentToolUrl="/tools/office/todo-offline" max={6} />

</div>
 ))}
 </CardContent>
 </GlassCard>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Tasks",
    description:"Create your list.",
    icon: ListPlus,
  },
{
    step:"02",
    title:"Organize",
    description:"Set priority and due dates.",
    icon: Flag,
  },
{
    step:"03",
    title:"Track",
    description:"Check off and review.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListPlus,
    title:"Tasks",
    description:"Quick add.",
  },
{
    icon: Flag,
    title:"Priority",
    description:"Order by importance.",
  },
{
    icon: CheckCircle2,
    title:"Checklist",
    description:"Mark done.",
  },
{
    icon: WifiOff,
    title:"Offline",
    description:"Works without internet.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A to-do list helps you capture and prioritize tasks so important work is not forgotten. Offline operation means it works anywhere without accounts or connectivity. This tool handles entry, prioritization, and check-off.</p>
  <p>Prioritization drives focus. Flagging what matters most ensures the right tasks get done first. Local storage keeps data private.</p>
  <p>Use it daily to stay organized. The tool's value is a reliable, private task list that works without the internet.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why offline?",
    answer:"Works without a connection.",
  },
{
    question:"Sync?",
    answer:"Local storage, no account.",
  },
{
    question:"Priorities?",
    answer:"Yes, flag important.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Yes, on device.",
  }
  ]}
/>
</>
 );
}
