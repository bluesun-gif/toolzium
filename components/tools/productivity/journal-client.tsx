"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Separator } from"@/components/ui/separator";
import { BookOpen, Calendar, Download, PenLine, Search, ShieldCheck } from"lucide-react";
import { ActionButton } from"@/components/shared/action-buttons";

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
    const newEntries = {
      ...entries,
      [entry.date]: entry
    };
    setEntries(newEntries);
    localStorage.setItem("tz-journal", JSON.stringify(newEntries));
  };
  const currentEntry = entries[currentDate] || {
    date: currentDate,
    content: "",
    mood: "okay",
    tags: []
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    saveEntry({
      ...currentEntry,
      content: e.target.value
    });
  };
  const handleMoodChange = (mood: string) => {
    saveEntry({
      ...currentEntry,
      mood
    });
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
    saveEntry({
      ...currentEntry,
      tags
    });
  };
  const wordCount = currentEntry.content.trim() ? currentEntry.content.trim().split(/\s+/).length : 0;
  const handleExport = () => {
    const text = Object.values(entries).sort((a, b) => a.date.localeCompare(b.date)).map(e => `Date: ${e.date}\nMood: ${e.mood}\nTags: ${e.tags.join(",")}\n\n${e.content}\n\n---`).join("\n\n");
    const blob = new Blob([text], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal-export.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  const filteredEntries = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return Object.values(entries).filter(e => e.content.toLowerCase().includes(term) || e.tags.some(t => t.toLowerCase().includes(term))).sort((a, b) => b.date.localeCompare(a.date));
  }, [entries, searchTerm]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={BookOpen} title="Daily Journal" description="Write and track your daily journal entries with mood and tags." actions={<ActionButton onClick={handleExport} icon={Download} label="Export" />} />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle className="flex justify-between items-center">
 <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Entry for {currentDate}</span>
 <Input type="date" value={currentDate} onChange={e => setCurrentDate(e.target.value)} className="w-40" />
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2 items-center">
 <Label>Mood:</Label>
 {["terrible", "bad", "okay", "good", "great"].map(m => <Button key={m} variant={currentEntry.mood === m ? "default" : "outline"} size="sm" onClick={() => handleMoodChange(m)} className="capitalize">
 {m}
 </Button>)}
 </div>
 
 <textarea className="w-full min-h-[300px] p-3 rounded-md bg-background border resize-y focus:outline-none focus:ring-2 focus:ring-ring" value={currentEntry.content} onChange={handleContentChange} placeholder="Write your thoughts here..." />
 
 <div className="flex justify-between items-center text-sm text-muted-foreground">
 <div className="flex-1 max-w-sm flex items-center gap-2">
 <Label>Tags:</Label>
 <Input value={currentEntry.tags.join(",")} onChange={handleTagsChange} placeholder="e.g., work, personal, idea (comma separated)" className="h-8" />
 </div>
 <span>{wordCount} words</span>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Search className="w-5 h-5" /> Search History
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <Input placeholder="Search entries or tags..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
 
 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
 {searchTerm ? filteredEntries.length > 0 ? filteredEntries.map(e => <div key={e.date} className="p-3 border rounded-md cursor-pointer hover:bg-muted" onClick={() => setCurrentDate(e.date)}>
 <div className="font-semibold text-sm mb-1">{e.date} <span className="text-muted-foreground font-normal ml-2">({e.mood})</span></div>
 <p className="text-xs line-clamp-3">{e.content}</p>
 </div>) : <p className="text-sm text-muted-foreground">No matches found.</p> : <p className="text-sm text-muted-foreground">Type to search past entries.</p>}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Write",
    description:"Add today's entry.",
    icon: PenLine,
  },
{
    step:"02",
    title:"Date",
    description:"Auto-stamp the day.",
    icon: Calendar,
  },
{
    step:"03",
    title:"Reflect",
    description:"Revisit past entries.",
    icon: BookOpen,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: PenLine,
    title:"Entry",
    description:"Free writing.",
  },
{
    icon: Calendar,
    title:"Dates",
    description:"Chronological.",
  },
{
    icon: BookOpen,
    title:"History",
    description:"Browse past.",
  },
{
    icon: ShieldCheck,
    title:"Private",
    description:"Local storage.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A daily journal gives a private space to think on paper, improving clarity and memory. Regular writing surfaces patterns you'd miss otherwise. This tool stores dated entries locally.</p>
  <p>Revisiting past entries provides perspective that the moment lacks. Local storage keeps thoughts yours alone.</p>
  <p>Use it as a personal practice. The tool's value is a private, chronological journal.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Benefits?",
    answer:"Clarity and memory.",
  },
{
    question:"Daily?",
    answer:"As often as you like.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"On device.",
  },
{
    question:"Use case?",
    answer:"Reflection.",
  }
  ]}
/>
</div>
 );
}
