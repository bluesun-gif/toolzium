"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Copy, Trash2 } from "lucide-react";

const SOCIAL_LIMITS = [
  { name: "Twitter/X", limit: 280 },
  { name: "Instagram Caption", limit: 2200 },
  { name: "LinkedIn Post", limit: 3000 },
  { name: "TikTok Caption", limit: 2200 },
  { name: "YouTube Title", limit: 100 },
  { name: "YouTube Description", limit: 5000 },
  { name: "Facebook Post", limit: 63206 }
];

export default function CharacterCounterClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    
    // Average reading time (200 wpm)
    const readingMinutes = words / 200;
    const readingTime = readingMinutes < 1 ? "< 1 min" : `${Math.ceil(readingMinutes)} min`;
    
    // Average speaking time (130 wpm)
    const speakingMinutes = words / 130;
    const speakingTime = speakingMinutes < 1 ? "< 1 min" : `${Math.ceil(speakingMinutes)} min`;

    // Word frequency
    const wordCounts: Record<string, number> = {};
    const wordsList = text.toLowerCase().match(/\b\w+\b/g) || [];
    wordsList.forEach(w => {
      wordCounts[w] = (wordCounts[w] || 0) + 1;
    });
    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topWords
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const handleClear = () => {
    setText("");
    toast.success("Text cleared");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="Character Counter"
        description="Count characters, words, sentences, and paragraphs in real-time. Check social media limits."
      />
      
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Input Text</CardTitle>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear} disabled={!text}>
                  <Trash2 className="h-4 w-4 mr-1" /> Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Type or paste your text here..." 
                className="min-h-[300px] resize-y" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {SOCIAL_LIMITS.map(limit => {
                const isOver = stats.charsWithSpaces > limit.limit;
                const percentage = Math.min((stats.charsWithSpaces / limit.limit) * 100, 100);
                let colorClass = "bg-green-500";
                if (percentage > 90) colorClass = "bg-red-500";
                else if (percentage > 75) colorClass = "bg-yellow-500";

                return (
                  <div key={limit.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{limit.name}</span>
                      <span className={isOver ? "text-red-500 font-medium" : "text-muted-foreground"}>
                        {stats.charsWithSpaces} / {limit.limit}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={"h-full " + (colorClass) + " transition-all duration-300"} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.charsWithSpaces}</div>
                  <div className="text-xs text-muted-foreground">Chars (with spaces)</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.charsWithoutSpaces}</div>
                  <div className="text-xs text-muted-foreground">Chars (no spaces)</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.words}</div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.sentences}</div>
                  <div className="text-xs text-muted-foreground">Sentences</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.paragraphs}</div>
                  <div className="text-xs text-muted-foreground">Paragraphs</div>
                </div>
              </div>
              
              <div className="pt-4 space-y-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reading Time</span>
                  <span className="text-sm font-medium">{stats.readingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Speaking Time</span>
                  <span className="text-sm font-medium">{stats.speakingTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Words</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topWords.length > 0 ? (
                <div className="space-y-2">
                  {stats.topWords.map(([word, count]) => (
                    <div key={word} className="flex justify-between items-center text-sm">
                      <span className="truncate max-w-[150px]">{word}</span>
                      <span className="bg-secondary px-2 py-0.5 rounded-full text-xs font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No words yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
