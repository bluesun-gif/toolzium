"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Link, Timer, Trophy, Share2 } from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = {
  Nature: ["tree", "ocean", "mountain", "flower", "river", "cloud", "sun", "rain", "forest", "leaf"],
  Food: ["apple", "bread", "cheese", "pizza", "coffee", "cake", "salad", "soup", "burger", "rice"],
  Animals: ["dog", "cat", "bird", "lion", "elephant", "fish", "tiger", "bear", "monkey", "snake"],
  Objects: ["chair", "table", "phone", "book", "car", "key", "clock", "shoe", "pen", "cup"],
  Actions: ["run", "jump", "sleep", "eat", "read", "write", "talk", "walk", "sing", "dance"]
};

export function WordAssociationClient() {
  const [category, setCategory] = useState<keyof typeof CATEGORIES>("Nature");
  const [chain, setChain] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("wordAssocHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      toast.success(`Time's up! You chained ${chain.length} words.`);
      if (chain.length > highScore) {
        setHighScore(chain.length);
        localStorage.setItem("wordAssocHighScore", chain.length.toString());
        toast.success("New High Score!");
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, chain.length, highScore]);

  const startGame = () => {
    const words = CATEGORIES[category];
    const startWord = words[Math.floor(Math.random() * words.length)];
    setChain([startWord]);
    setTimeLeft(60);
    setIsPlaying(true);
    setInput("");
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    const word = input.trim().toLowerCase();
    if (!word) return;
    if (chain.includes(word)) {
      toast.error("Word already used in this chain!");
      return;
    }
    setChain([...chain, word]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Link}
        title="Word Association"
        description="Build chains of associated words before time runs out."
        actions={
          <CopyButton 
            getText={() => chain.join(" -> ")} 
            label="Share Chain" 
          />
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
            <CardDescription>Choose a category and start playing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select 
              value={category} 
              onValueChange={(val: keyof typeof CATEGORIES) => setCategory(val)}
              disabled={isPlaying}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(CATEGORIES).map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={startGame} disabled={isPlaying} className="w-full">
              {isPlaying ? "Game in Progress..." : "Start Game (60s)"}
            </Button>
            
            <div className="flex justify-between items-center pt-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="font-bold text-xl">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-xl">{highScore}</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Word Chain</CardTitle>
            <CardDescription>Current chain length: {chain.length}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddWord} className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isPlaying ? "Type next word..." : "Start game first"}
                disabled={!isPlaying}
              />
              <Button type="submit" disabled={!isPlaying || !input.trim()}>Add</Button>
            </form>

            <div className="max-h-[300px] overflow-y-auto p-4 bg-muted rounded-md flex flex-wrap gap-2">
              {chain.map((word, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                    {word}
                  </span>
                  {i < chain.length - 1 && <Link className="w-4 h-4 text-muted-foreground" />}
                </div>
              ))}
              {chain.length === 0 && (
                <p className="text-muted-foreground italic">No words yet. Start the game!</p>
              )}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
