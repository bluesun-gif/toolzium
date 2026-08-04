"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { BarChart3, Type, FileText, Copy } from "lucide-react";
import toast from "react-hot-toast";

export function TextStatsClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const rawLength = text.length;
    const lengthNoSpaces = text.replace(/\s+/g, "").length;
    
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const wordCount = words.length;
    
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const sentenceCount = sentences.length;
    
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== "");
    const paragraphCount = paragraphs.length;
    
    const wordsOnlyAlpha = words.map(w => w.replace(/[^a-zA-Z]/g, "")).filter(Boolean);
    const uniqueWords = new Set(wordsOnlyAlpha.map(w => w.toLowerCase()));
    
    const avgWordLength = wordsOnlyAlpha.length > 0 
      ? wordsOnlyAlpha.reduce((acc, w) => acc + w.length, 0) / wordsOnlyAlpha.length 
      : 0;
      
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    let longestWord = "";
    wordsOnlyAlpha.forEach(w => {
      if (w.length > longestWord.length) longestWord = w;
    });
    
    const wordFreq: Record<string, number> = {};
    wordsOnlyAlpha.forEach(w => {
      const lower = w.toLowerCase();
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    });
    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
      
    const syllables = wordsOnlyAlpha.reduce((acc, word) => {
      let w = word.toLowerCase();
      if (w.length <= 3) return acc + 1;
      w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
      w = w.replace(/^y/, "");
      const match = w.match(/[aeiouy]{1,2}/g);
      return acc + (match ? match.length : 1);
    }, 0);
    
    const fleschKincaid = wordCount > 0 && sentenceCount > 0 
      ? 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59 
      : 0;
      
    const lexicalDensity = wordCount > 0 ? (uniqueWords.size / wordCount) * 100 : 0;

    return {
      rawLength,
      lengthNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      uniqueCount: uniqueWords.size,
      avgWordLength: avgWordLength.toFixed(1),
      avgSentenceLength: avgSentenceLength.toFixed(1),
      longestWord,
      topWords,
      fleschKincaid: Math.max(0, fleschKincaid).toFixed(1),
      lexicalDensity: lexicalDensity.toFixed(1)
    };
  }, [text]);

  const handleReset = () => {
    setText("");
    toast.success("Text cleared");
  };
  
  const getStatsString = () => {
    return `Text Statistics:\nWords: ${stats.wordCount}\nCharacters (with spaces): ${stats.rawLength}\nCharacters (no spaces): ${stats.lengthNoSpaces}\nSentences: ${stats.sentenceCount}\nParagraphs: ${stats.paragraphCount}\nReading Level (Grade): ${stats.fleschKincaid}\nLexical Density: ${stats.lexicalDensity}%`;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={BarChart3}
        title="Advanced Text Statistics"
        description="Analyze your text for word count, readability, lexical density, and more."
        actions={
          <>
            <CopyButton getText={getStatsString} label="Copy Stats" />
            <ResetButton onClick={handleReset} label="Clear" />
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" /> Input Text
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <textarea
              className="w-full h-full min-h-[300px] p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste or type your text here to analyze..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Basic Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Words</div>
                  <div className="text-2xl font-bold">{stats.wordCount}</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Characters</div>
                  <div className="text-2xl font-bold">{stats.rawLength}</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Sentences</div>
                  <div className="text-2xl font-bold">{stats.sentenceCount}</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                  <div className="text-2xl font-bold">{stats.paragraphCount}</div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Advanced Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Reading Level (Grade)</span>
                <span className="font-medium">{stats.fleschKincaid}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Lexical Density</span>
                <span className="font-medium">{stats.lexicalDensity}%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Unique Words</span>
                <span className="font-medium">{stats.uniqueCount}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Avg Word Length</span>
                <span className="font-medium">{stats.avgWordLength}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Avg Sentence Length</span>
                <span className="font-medium">{stats.avgSentenceLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longest Word</span>
                <span className="font-medium max-w-[120px] truncate" title={stats.longestWord}>{stats.longestWord || "-"}</span>
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top Words</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topWords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stats.topWords.map(([word, count]) => (
                    <div key={word} className="px-2 py-1 bg-secondary rounded text-xs flex gap-2 items-center">
                      <span>{word}</span>
                      <span className="bg-background px-1.5 rounded-sm text-muted-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No words to display</div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
