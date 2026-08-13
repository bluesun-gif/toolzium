"use client";

import { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";
import { BookOpen, Calendar, Search, Download, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { ActionButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface JournalEntry {
 date: string;
 content: string;
 mood: string;
 tags: string[];
}

export function JournalClient() {
 const [entries, setEntries] = useState<Record<string, JournalEntry>>({});
 const [currentDate, setCurrentDate] = useState(() => new Date().toISOString().split("T")[0]);
 const [searchTerm, setSearchTerm] = useState("");
 
 useEffect(() => {
 const saved = localStorage.getItem("tz-journal");
 if (saved) {
 try {
 setEntries(JSON.parse(saved));
 } catch (e) {
 // ignore
 }
 }
  }, []);

 const saveEntry = (entry: JournalEntry) => {
 const newEntries = { ...entries, [entry.date]: entry };
 setEntries(newEntries);
 localStorage.setItem("tz-journal", JSON.stringify(newEntries));
 };

 const currentEntry = entries[currentDate] || { date: currentDate, content:"", mood:"okay", tags: [] };
 
 const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 saveEntry({ ...currentEntry, content: e.target.value });
 };

 const handleMoodChange = (mood: string) => {
 saveEntry({ ...currentEntry, mood });
 };

 const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
 saveEntry({ ...currentEntry, tags });
 };

 const wordCount = currentEntry.content.trim() ? currentEntry.content.trim().split(/\s+/).length : 0;

 const handleExport = () => {
 const text = Object.values(entries)
 .sort((a, b) => a.date.localeCompare(b.date))
 .map(e => `Date: ${e.date}\nMood: ${e.mood}\nTags: ${e.tags.join(",")}\n\n${e.content}\n\n---`)
 .join("\n\n");
 const blob = new Blob([text], { type:"text/plain"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="journal-export.txt";
 a.click();
 URL.revokeObjectURL(url);
 };

 const filteredEntries = useMemo(() => {
 if (!searchTerm) return [];
 const term = searchTerm.toLowerCase();
 return Object.values(entries)
 .filter(e => e.content.toLowerCase().includes(term) || e.tags.some(t => t.toLowerCase().includes(term)))
 .sort((a, b) => b.date.localeCompare(a.date));
 }, [entries, searchTerm]);
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
 icon={BookOpen}
 title="Daily Journal"
 description="Write and track your daily journal entries with mood and tags."
 actions={
 <ActionButton onClick={handleExport} icon={Download} label="Export"/>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle className="flex justify-between items-center">
 <span className="flex items-center gap-2"><Calendar className="w-5 h-5"/> Entry for {currentDate}</span>
 <Input 
 type="date"
 value={currentDate} 
 onChange={(e) => setCurrentDate(e.target.value)}
 className="w-40"
 />
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2 items-center">
 <Label>Mood:</Label>
 {["terrible","bad","okay","good","great"].map((m) => (
 <Button
 key={m}
 variant={currentEntry.mood === m ?"default":"outline"}
 size="sm"
 onClick={() => handleMoodChange(m)}
 className="capitalize"
 >
 {m}
 </Button>
 ))}
 </div>
 
 <textarea
 className="w-full min-h-[300px] p-3 rounded-md bg-background border resize-y focus:outline-none focus:ring-2 focus:ring-ring"
 value={currentEntry.content}
 onChange={handleContentChange}
 placeholder="Write your thoughts here..."
 />
 
 <div className="flex justify-between items-center text-sm text-muted-foreground">
 <div className="flex-1 max-w-sm flex items-center gap-2">
 <Label>Tags:</Label>
 <Input 
 value={currentEntry.tags.join(",")} 
 onChange={handleTagsChange}
 placeholder="e.g., work, personal, idea (comma separated)"
 className="h-8"
 />
 </div>
 <span>{wordCount} words</span>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Search className="w-5 h-5"/> Search History
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <Input 
 placeholder="Search entries or tags..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 
 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
 {searchTerm ? (
 filteredEntries.length > 0 ? (
 filteredEntries.map(e => (
 <div key={e.date} className="p-3 border rounded-md cursor-pointer hover:bg-muted"onClick={() => setCurrentDate(e.date)}>
 <div className="font-semibold text-sm mb-1">{e.date} <span className="text-muted-foreground font-normal ml-2">({e.mood})</span></div>
 <p className="text-xs line-clamp-3">{e.content}</p>
 </div>
 ))
 ) : (
 <p className="text-sm text-muted-foreground">No matches found.</p>
 )
 ) : (
 <p className="text-sm text-muted-foreground">Type to search past entries.</p>
 )}
 </div>
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
          <h3>Why Use Our Daily Journal?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Daily Journal provides
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

      <RelatedTools currentToolUrl="/tools/productivity/journal" max={6} />

</div>
 );
}
