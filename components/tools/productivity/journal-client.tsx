"use client";

import { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, Search, Download } from "lucide-react";
import { ActionButton } from "@/components/shared/action-buttons";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tz-journal");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
    setMounted(true);
  }, []);

  const saveEntry = (entry: JournalEntry) => {
    const newEntries = { ...entries, [entry.date]: entry };
    setEntries(newEntries);
    localStorage.setItem("tz-journal", JSON.stringify(newEntries));
  };

  const currentEntry = entries[currentDate] || { date: currentDate, content: "", mood: "okay", tags: [] };
  
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
      .map(e => `Date: ${e.date}\nMood: ${e.mood}\nTags: ${e.tags.join(", ")}\n\n${e.content}\n\n---`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
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
    return Object.values(entries)
      .filter(e => e.content.toLowerCase().includes(term) || e.tags.some(t => t.toLowerCase().includes(term)))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [entries, searchTerm]);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={BookOpen}
        title="Daily Journal"
        description="Write and track your daily journal entries with mood and tags."
        actions={
          <ActionButton onClick={handleExport} icon={Download} label="Export" />
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
              {["terrible", "bad", "okay", "good", "great"].map((m) => (
                <Button
                  key={m}
                  variant={currentEntry.mood === m ? "default" : "outline"}
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
                  value={currentEntry.tags.join(", ")} 
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
                    <div key={e.date} className="p-3 border rounded-md cursor-pointer hover:bg-muted" onClick={() => setCurrentDate(e.date)}>
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
    </div>
  );
}
