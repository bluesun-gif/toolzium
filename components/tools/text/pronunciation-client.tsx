"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Volume2, Search, BookOpen, Copy } from "lucide-react";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";

const WORDS = [
  { word: "Acai", phonetic: "ah-sigh-EE", category: "Food" },
  { word: "Quinoa", phonetic: "KEEN-wah", category: "Food" },
  { word: "Genre", phonetic: "ZHAHN-ruh", category: "General" },
  { word: "Niche", phonetic: "neesh", category: "General" },
  { word: "Espresso", phonetic: "es-PRES-oh", category: "Food" },
  { word: "Epitome", phonetic: "ih-PIT-uh-mee", category: "General" },
  { word: "Mischievous", phonetic: "MIS-chuh-vus", category: "General" },
  { word: "Hyperbole", phonetic: "hy-PER-buh-lee", category: "Science" },
  { word: "Edinburgh", phonetic: "ED-in-bur-uh", category: "Places" },
  { word: "Sriracha", phonetic: "sir-AH-chah", category: "Food" },
];

export function PronunciationClient() {
  const [search, setSearch] = useState("");

  const filteredWords = WORDS.filter(w => w.word.toLowerCase().includes(search.toLowerCase()));

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Volume2}
        title="Pronunciation Guide"
        description="Learn how to pronounce commonly mispronounced English words."
        actions={
          <div className="w-full max-w-xs flex items-center bg-background rounded-md border px-3 py-1 text-sm">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input 
              placeholder="Search words..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full outline-none bg-transparent"
            />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((item, idx) => (
          <GlassCard key={idx}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{item.word}</CardTitle>
                  <CardDescription className="text-xs uppercase tracking-wider mt-1">{item.category}</CardDescription>
                </div>
                <ActionButton 
                  icon={Volume2} 
                  label="Play" 
                  onClick={() => speak(item.word)} 
                  variant="ghost" 
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-sm text-primary/80">{item.phonetic}</span>
                <CopyButton getText={() => item.phonetic} label="Copy" />
              </div>
            </CardContent>
          </GlassCard>
        ))}
        {filteredWords.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No words found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
