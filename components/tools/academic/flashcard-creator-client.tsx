"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Layers, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function FlashcardCreatorClient() {
  const [studyText, setStudyText] = useState(
    "Mitochondria are double-membrane-bound organelles found in most eukaryotic organisms. They generate most of the chemical energy needed to power the cell's biochemical reactions through oxidative phosphorylation, storing it in Adenosine Triphosphate (ATP)."
  );
  const [subject, setSubject] = useState("Cell Biology");
  const [cardCount, setCardCount] = useState("4");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    if (!studyText.trim()) return;

    setLoading(true);

    try {
      const prompt = `Extract study flashcards from Study Notes: '${studyText}'. Subject: '${subject}'. Create ${cardCount} flashcards formatted with a FRONT (Question / Concept term) and BACK (Clear, concise answer / definition). Format as ${cardCount} distinct flashcard cards. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "cards" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Flashcards generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Layers}
        title="AI Study Flashcard & Quiz Creator Studio"
        description="Convert lecture notes, textbook passages, and articles into instant Q&A flashcards and revision study cards using live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">Lecture Notes / Study Passage:</label>
          <Textarea
            value={studyText}
            onChange={(e) => setStudyText(e.target.value)}
            placeholder="Paste your study notes or chapter summary here..."
            className="min-h-[140px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Subject / Course Name:</label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Organic Chemistry, US History"
              className="h-11 font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Number of Cards to Generate:</label>
            <select
              value={cardCount}
              onChange={(e) => setCardCount(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm font-medium"
            >
              <option value="4">4 Flashcards</option>
              <option value="6">6 Flashcards</option>
              <option value="8">8 Flashcards</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateFlashcards}
            disabled={loading || !studyText.trim()}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Extracting Flashcards..." : "AI Generate Study Flashcards"}
          </Button>
        </div>
      </GlassCard>

      {/* Output */}
      {results.length > 0 && (
        <AiOutputDisplay
          title="Generated AI Study Flashcards"
          subtitle="Front/Back Q&A pairs optimized for rapid recall"
          content={results}
          loading={loading}
          onRegenerate={generateFlashcards}
          variant="cards"
        />
      )}
    </div>
  );
}
