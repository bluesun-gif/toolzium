"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Type, BarChart3, Trash2 } from "lucide-react";

function formatTime(minutes: number) {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  if (mins === 0 && secs === 0) return "0s";
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function ReadingTimeClient() {
  const [text, setText] = useState("");
  const [customWpm, setCustomWpm] = useState(250);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0, chars: 0, sentences: 0, paragraphs: 0, avgWordLength: 0,
        fleschKincaid: 0, slow: 0, average: 0, fast: 0, custom: 0, speaking: 0
      };
    }

    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const charCount = trimmed.length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
    const paragraphs = trimmed.split(/\n+/).filter(p => p.trim().length > 0).length || 1;
    
    const charsInWords = words.reduce((acc, word) => acc + word.replace(/[^a-zA-Z0-9]/g, '').length, 0);
    const avgWordLength = wordCount > 0 ? charsInWords / wordCount : 0;
    
    // Very basic syllable estimation for Flesch-Kincaid
    const countSyllables = (word: string) => {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const match = word.match(/[aeiouy]{1,2}/g);
      return match ? match.length : 1;
    };
    
    const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
    
    // Flesch Reading Ease
    let fleschKincaid = 0;
    if (wordCount > 0 && sentences > 0) {
      fleschKincaid = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (totalSyllables / wordCount);
      fleschKincaid = Math.max(0, Math.min(100, fleschKincaid));
    }

    return {
      words: wordCount,
      chars: charCount,
      sentences,
      paragraphs,
      avgWordLength,
      fleschKincaid,
      slow: wordCount / 150,
      average: wordCount / 200,
      fast: wordCount / 300,
      custom: wordCount / customWpm,
      speaking: wordCount / 130, // average speaking rate
    };
  }, [text, customWpm]);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={BookOpen}
        title="Reading Time Calculator"
        description="Calculate reading and speaking time, word count, and text statistics."
        actions={
          <ResetButton onClick={() => setText("")} label="Clear" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Paste or type your text below to get instant statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle>Time Estimates</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Slow (150 WPM)</p>
                <p className="text-2xl font-bold">{formatTime(stats.slow)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average (200 WPM)</p>
                <p className="text-2xl font-bold">{formatTime(stats.average)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fast (300 WPM)</p>
                <p className="text-2xl font-bold">{formatTime(stats.fast)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Speaking (130 WPM)</p>
                <p className="text-2xl font-bold text-amber-500">{formatTime(stats.speaking)}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Custom Speed ({customWpm} WPM)</Label>
                <span className="font-bold">{formatTime(stats.custom)}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={customWpm}
                onChange={(e) => setCustomWpm(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle>Text Statistics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Words</p>
                <p className="text-2xl font-bold">{stats.words}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Characters</p>
                <p className="text-2xl font-bold">{stats.chars}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sentences</p>
                <p className="text-2xl font-bold">{stats.sentences}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Paragraphs</p>
                <p className="text-2xl font-bold">{stats.paragraphs}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Word Length</p>
                <p className="text-2xl font-bold">{stats.avgWordLength.toFixed(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Readability Score</p>
                <p className="text-2xl font-bold text-blue-500">{stats.fleschKincaid.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.fleschKincaid > 90 ? "Very Easy" :
                   stats.fleschKincaid > 80 ? "Easy" :
                   stats.fleschKincaid > 70 ? "Fairly Easy" :
                   stats.fleschKincaid > 60 ? "Standard" :
                   stats.fleschKincaid > 50 ? "Fairly Difficult" :
                   stats.fleschKincaid > 30 ? "Difficult" : "Very Confusing"}
                </p>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
