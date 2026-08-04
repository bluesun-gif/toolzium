"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Search, Gamepad2 } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_DICTIONARY = [
  "apple", "pear", "peach", "banana", "orange", "lemon", "lime", "grape", "melon",
  "cat", "act", "tac", "dog", "god", "bat", "tab", "rat", "tar", "art",
  "star", "rats", "arts", "tars", "tsar", "stop", "pots", "tops", "post",
  "hello", "world", "tool", "loot", "polo", "pool"
];

export function AnagramSolverClient() {
  const [letters, setLetters] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSolve = () => {
    if (!letters) {
      toast.error("Please enter some letters");
      return;
    }
    const targetLetters = letters.toLowerCase().split("");
    const found = MOCK_DICTIONARY.filter(word => {
      let temp = [...targetLetters];
      let match = true;
      for (const char of word) {
        const index = temp.indexOf(char);
        if (index > -1) {
          temp.splice(index, 1);
        } else {
          const wildIndex = temp.indexOf('?');
          if (wildIndex > -1) {
             temp.splice(wildIndex, 1);
          } else {
             match = false;
             break;
          }
        }
      }
      if (match && startsWith && !word.startsWith(startsWith.toLowerCase())) match = false;
      if (match && endsWith && !word.endsWith(endsWith.toLowerCase())) match = false;
      return match;
    });
    setResults(found);
    toast.success("Anagrams found!");
  };

  const handleReset = () => {
    setLetters("");
    setStartsWith("");
    setEndsWith("");
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Gamepad2}
        title="Anagram Finder & Solver"
        description="Find all possible valid English anagram words from input letters."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Input Letters</CardTitle>
          <CardDescription>Enter up to 12 letters. Use ? for wildcard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Letters</Label>
              <Input value={letters} onChange={(e) => setLetters(e.target.value)} maxLength={12} placeholder="e.g. act?" />
            </div>
            <div className="space-y-2">
              <Label>Starts With (optional)</Label>
              <Input value={startsWith} onChange={(e) => setStartsWith(e.target.value)} placeholder="e.g. a" />
            </div>
            <div className="space-y-2">
              <Label>Ends With (optional)</Label>
              <Input value={endsWith} onChange={(e) => setEndsWith(e.target.value)} placeholder="e.g. t" />
            </div>
          </div>
          <ActionButton onClick={handleSolve} icon={Search} label="Solve" variant="default" size="default" />
        </CardContent>
      </GlassCard>

      {results.length > 0 && (
        <GlassCard>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.map((word, i) => (
                <div key={i} className="px-3 py-1 bg-secondary rounded-md flex items-center gap-2">
                  <span>{word}</span>
                  <CopyButton getText={() => word} label="Copy" />
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      )}
    </div>
  );
}
