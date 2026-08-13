"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Lock, Key, Calendar, Sparkles, Download, Upload, Trash2, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Capsule = {
 id: string;
 title: string;
 encryptedMessage: string;
 unlockDate: number; // timestamp
 createdAt: number;
};

// Simple pseudo-encryption for local storage (base64)
const encrypt = (text: string) => btoa(encodeURIComponent(text));
const decrypt = (text: string) => decodeURIComponent(atob(text));

export function TimeCapsuleClient() {
 const [capsules, setCapsules] = useState<Capsule[]>([]);
 const [title, setTitle] = useState("");
 const [message, setMessage] = useState("");
 const [unlockPreset, setUnlockPreset] = useState("1month");
 const [customDate, setCustomDate] = useState("");
 const [now, setNow] = useState(() => Date.now());

 useEffect(() => {
 const saved = localStorage.getItem("time-capsules");
 if (saved) {
 try {
 setCapsules(JSON.parse(saved));
 } catch (e) {
 console.error("Failed to parse capsules");
 }
 }
 const timer = setInterval(() => setNow(Date.now()), 1000);
 return () => clearInterval(timer);
 }, []);

 useEffect(() => {
 localStorage.setItem("time-capsules", JSON.stringify(capsules));
 }, [capsules]);

 const handleCreate = () => {
 if (!title || !message) {
 toast.error("Please fill in title and message.");
 return;
 }
 
 let targetDate = new Date();
 if (unlockPreset ==="custom") {
 if (!customDate) {
 toast.error("Please set a custom unlock date.");
 return;
 }
 targetDate = new Date(customDate);
 } else if (unlockPreset ==="1month") {
 targetDate.setMonth(targetDate.getMonth() + 1);
 } else if (unlockPreset ==="6months") {
 targetDate.setMonth(targetDate.getMonth() + 6);
 } else if (unlockPreset ==="1year") {
 targetDate.setFullYear(targetDate.getFullYear() + 1);
 } else if (unlockPreset ==="5years") {
 targetDate.setFullYear(targetDate.getFullYear() + 5);
 }

 if (targetDate.getTime() <= Date.now()) {
 toast.error("Unlock date must be in the future.");
 return;
 }

 const newCapsule: Capsule = {
 id: Math.random().toString(36).substring(7),
 title,
 encryptedMessage: encrypt(message),
 unlockDate: targetDate.getTime(),
 createdAt: Date.now()
 };

 setCapsules([...capsules, newCapsule]);
 setTitle("");
 setMessage("");
 toast.success("Time capsule created!");
 };

 const handleExport = () => {
 const data = JSON.stringify(capsules);
 const blob = new Blob([data], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="time-capsules-backup.json";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Exported successfully");
 };

 const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = (event) => {
 try {
 const imported = JSON.parse(event.target?.result as string);
 if (Array.isArray(imported)) {
 setCapsules(imported);
 toast.success("Imported successfully");
 }
 } catch (err) {
 toast.error("Invalid backup file");
 }
 };
 reader.readAsText(file);
 };

 const handleReset = () => {
 setTitle("");
 setMessage("");
 setUnlockPreset("1month");
 setCustomDate("");
 };

 const deleteCapsule = (id: string) => {
 setCapsules(capsules.filter(c => c.id !== id));
 toast.success("Capsule deleted");
 };

 const formatCountdown = (target: number) => {
 const diff = target - now;
 if (diff <= 0) return"Unlocked!";
 const days = Math.floor(diff / (1000 * 60 * 60 * 24));
 const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
 const mins = Math.floor((diff / 1000 / 60) % 60);
 const secs = Math.floor((diff / 1000) % 60);
 return days +"d"+ hours +"h"+ mins +"m"+ secs +"s";
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
 icon={Lock}
 title="Time Capsule Message"
 description="Create digital time capsule messages locked until a future date."
 actions={
 <React.Fragment>
 <ActionButton onClick={handleExport} icon={Download} label="Export JSON"variant="outline"/>
 <div className="relative inline-block">
 <input type="file"accept=".json"onChange={handleImport} className="absolute inset-0 opacity-0 cursor-pointer w-full"/>
 <Button variant="outline"size="default"><Upload className="w-4 h-4 mr-2"/> Import JSON</Button>
 </div>
 </React.Fragment>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Create Capsule</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Title</Label>
 <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Message to my future self..."/>
 </div>
 <div className="space-y-2">
 <Label>Secret Message</Label>
 <textarea
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 className="w-full min-h-[150px] p-3 rounded-md border bg-transparent resize-y"
 placeholder="Write your secret message here..."
 />
 </div>
 <div className="space-y-2">
 <Label>Unlock Date</Label>
 <Select value={unlockPreset} onValueChange={setUnlockPreset}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="1month">In 1 Month</SelectItem>
 <SelectItem value="6months">In 6 Months</SelectItem>
 <SelectItem value="1year">In 1 Year</SelectItem>
 <SelectItem value="5years">In 5 Years</SelectItem>
 <SelectItem value="custom">Custom Date</SelectItem>
 </SelectContent>
 </Select>
 </div>
 
 {unlockPreset ==="custom"&& (
 <div className="space-y-2">
 <Label>Custom Unlock Date & Time</Label>
 <Input type="datetime-local"value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
 </div>
 )}

 <Button onClick={handleCreate} className="w-full">
 <Lock className="w-4 h-4 mr-2"/>
 Lock Message
 </Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-4">
 <h2 className="text-xl font-bold flex items-center">
 <Calendar className="w-5 h-5 mr-2"/> Your Time Capsules
 </h2>
 {capsules.length === 0 ? (
 <p className="text-muted-foreground text-sm">No time capsules created yet. Create one to see it here.</p>
 ) : (
 capsules.map(capsule => {
 const isUnlocked = now >= capsule.unlockDate;
 return (
 <GlassCard key={capsule.id} className={isUnlocked ?"border-green-500/50":"border-amber-500/50"}>
 <CardHeader className="pb-2">
 <CardTitle className="text-lg flex justify-between items-start">
 <span>{capsule.title}</span>
 <div className="flex items-center gap-2">
 <span className={cn("text-xs px-2 py-1 rounded-full flex items-center", (isUnlocked ?"bg-green-500/20 text-green-500":"bg-amber-500/20 text-amber-500"))}>
 {isUnlocked ? <Key className="w-3 h-3 mr-1"/> : <Lock className="w-3 h-3 mr-1"/>}
 {isUnlocked ?"Unlocked":"Locked"}
 </span>
 <Button variant="ghost"size="icon"onClick={() => deleteCapsule(capsule.id)} className="h-6 w-6">
 <Trash2 className="w-4 h-4 text-red-500"/>
 </Button>
 </div>
 </CardTitle>
 <CardDescription>
 Created: {new Date(capsule.createdAt).toLocaleDateString()}
 </CardDescription>
 </CardHeader>
 <CardContent>
 {!isUnlocked ? (
 <div className="text-center py-6 bg-secondary/30 rounded-lg">
 <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground animate-pulse"/>
 <p className="text-sm text-muted-foreground mb-1">Unlocks in</p>
 <p className="font-mono text-lg font-bold">{formatCountdown(capsule.unlockDate)}</p>
 <p className="text-xs text-muted-foreground mt-2">({new Date(capsule.unlockDate).toLocaleString()})</p>
 </div>
 ) : (
 <div className="space-y-4">
 <div className="p-4 bg-secondary/30 rounded-lg whitespace-pre-wrap">
 {decrypt(capsule.encryptedMessage)}
 </div>
 <div className="flex justify-center">
 <Sparkles className="w-5 h-5 text-yellow-500"/>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>
 );
 })
 )}
 </div>
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
          <h3>Why Use Our Time Capsule Message?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Time Capsule Message provides
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

      <RelatedTools currentToolUrl="/tools/time/time-capsule" max={6} />

</div>
 );
}
