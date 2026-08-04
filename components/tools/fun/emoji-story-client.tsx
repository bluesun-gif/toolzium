"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { SmilePlus, Shuffle, Copy, ThumbsUp, ThumbsDown, MessageSquareText } from "lucide-react";
import toast from "react-hot-toast";

type StoryCategory = "Adventure" | "Romance" | "Mystery" | "Comedy" | "Sci-Fi" | "Horror";

interface StoryHistory {
  id: string;
  emojis: string;
  translation: string;
  rating: 'up' | 'down' | null;
}

const emojiBanks: Record<StoryCategory, string[]> = {
  Adventure: ["🧗", "🗺️", "⚔️", "🐉", "🏔️", "🏃", "🛡️", "🔥", "💎", "🏴‍☠️", "⛵", "🌴"],
  Romance: ["❤️", "🌹", "💌", "👩‍❤️‍👨", "💍", "🍷", "🍫", "💋", "💑", "✨", "😍", "🍓"],
  Mystery: ["🔍", "🕵️", "👣", "🚪", "🔑", "📜", "💼", "🕰️", "👁️", "🎩", "🩸", "🔦"],
  Comedy: ["🤡", "🍌", "🐒", "滑", "🥧", "😂", "🕺", "🤪", "🦆", "🎉", "💩", "👖"],
  "Sci-Fi": ["👽", "🚀", "🛸", "🌌", "🤖", "👨‍🚀", "🔭", "☄️", "👾", "🛰️", "🧪", "⚙️"],
  Horror: ["👻", "💀", "🦇", "🏚️", "🕷️", "🔪", "🩸", "🎃", "🌕", "😱", "🧟", "🕯️"]
};

export function EmojiStoryClient() {
  const [category, setCategory] = useState<StoryCategory>("Adventure");
  const [length, setLength] = useState<number>(5);
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]);
  const [translation, setTranslation] = useState<string>("");
  const [history, setHistory] = useState<StoryHistory[]>([]);

  const generateEmojis = () => {
    const bank = emojiBanks[category] || emojiBanks["Adventure"];
    const emojis: string[] = [];
    for (let i = 0; i < length; i++) {
      emojis.push(bank[Math.floor(Math.random() * bank.length)]);
    }
    setCurrentEmojis(emojis);
    setTranslation("");
  };

  const regenerateEmoji = (index: number) => {
    const bank = emojiBanks[category];
    const newEmojis = [...currentEmojis];
    newEmojis[index] = bank[Math.floor(Math.random() * bank.length)];
    setCurrentEmojis(newEmojis);
    setTranslation("");
  };

  const translateStory = () => {
    if (currentEmojis.length === 0) return;
    const dummyTranslations = [
      "A brave hero found a mysterious object and journeyed far, encountering bizarre beings before returning victorious.",
      "It started normal, then things got weird, someone fell over, a magical event occurred, and everyone laughed.",
      "An unexpected discovery led to a chase, a romantic encounter, a spooky scare, and a triumphant ending."
    ];
    const trans = dummyTranslations[Math.floor(Math.random() * dummyTranslations.length)] + " (Translated from " + category + " emoji dialect)";
    setTranslation(trans);
    
    setHistory(prev => [{
      id: Date.now().toString(),
      emojis: currentEmojis.join(" "),
      translation: trans,
      rating: null
    }, ...prev.slice(0, 9)]);
  };

  const rateStory = (id: string, rating: 'up' | 'down') => {
    setHistory(prev => prev.map(h => h.id === id ? { ...h, rating } : h));
    toast.success("Thanks for rating!");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={SmilePlus}
        title="Emoji Story Generator"
        description="Generate random emoji stories, interpret them, and share!"
        actions={
          <>
            <ActionButton onClick={generateEmojis} icon={Shuffle} label="Generate" />
            <CopyButton getText={() => currentEmojis.join(" ")} label="Copy Emojis" />
          </>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Emoji Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-center py-8 bg-black/5 rounded-lg">
              {currentEmojis.length > 0 ? (
                currentEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => regenerateEmoji(idx)}
                    className="text-5xl hover:scale-125 transition-transform cursor-pointer"
                    title="Click to regenerate this emoji"
                  >
                    {emoji}
                  </button>
                ))
              ) : (
                <div className="text-muted-foreground">Click Generate to start a story</div>
              )}
            </div>
            
            <div className="flex gap-4 justify-center items-center flex-wrap">
              <div className="flex items-center gap-2">
                <Label>Category:</Label>
                <Select value={category} onValueChange={(v: StoryCategory) => setCategory(v)}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(emojiBanks).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Label>Length:</Label>
                <Input
                  type="number"
                  min={3}
                  max={15}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value) || 5)}
                  className="w-20"
                />
              </div>

              <Button onClick={translateStory} disabled={currentEmojis.length === 0}>
                <MessageSquareText className="w-4 h-4 mr-2" /> Translate
              </Button>
            </div>

            {translation && (
              <div className="p-4 bg-primary/10 rounded-md text-center text-lg italic">
                "{translation}"
              </div>
            )}
          </CardContent>
        </GlassCard>

        {history.length > 0 && (
          <GlassCard className="md:col-span-2">
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 border rounded bg-card">
                  <div className="space-y-1">
                    <div className="text-2xl">{item.emojis}</div>
                    <div className="text-sm text-muted-foreground">{item.translation}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={item.rating === 'up' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => rateStory(item.id, 'up')}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={item.rating === 'down' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => rateStory(item.id, 'down')}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
