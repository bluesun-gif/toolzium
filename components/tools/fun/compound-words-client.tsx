"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Puzzle, Timer, Trophy, Lightbulb } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const PAIRS = [
  { word1: "sun", word2: "flower", compound: "sunflower", hint: "A tall plant with a large yellow flower" },
  { word1: "rain", word2: "bow", compound: "rainbow", hint: "A multicolored arc in the sky" },
  { word1: "fire", word2: "fly", compound: "firefly", hint: "An insect that glows in the dark" },
  { word1: "book", word2: "worm", compound: "bookworm", hint: "Someone who loves to read" },
  { word1: "butter", word2: "fly", compound: "butterfly", hint: "An insect with colorful wings" },
  { word1: "snow", word2: "man", compound: "snowman", hint: "A figure made of packed snow" },
  { word1: "jelly", word2: "fish", compound: "jellyfish", hint: "A sea creature with a soft body" },
  { word1: "star", word2: "fish", compound: "starfish", hint: "A sea creature shaped like a star" },
  { word1: "pan", word2: "cake", compound: "pancake", hint: "A flat, round breakfast food" },
  { word1: "tooth", word2: "brush", compound: "toothbrush", hint: "Used for cleaning teeth" },
  { word1: "base", word2: "ball", compound: "baseball", hint: "A sport played with a bat and ball" },
  { word1: "basket", word2: "ball", compound: "basketball", hint: "A sport where you shoot hoops" },
  { word1: "water", word2: "melon", compound: "watermelon", hint: "A large fruit with red flesh and green rind" },
  { word1: "air", word2: "port", compound: "airport", hint: "Where planes take off and land" },
  { word1: "note", word2: "book", compound: "notebook", hint: "Used for writing notes" },
  { word1: "cow", word2: "boy", compound: "cowboy", hint: "A man who rides horses and tends cattle" },
  { word1: "moon", word2: "light", compound: "moonlight", hint: "Light from the moon" },
  { word1: "earth", word2: "quake", compound: "earthquake", hint: "Shaking of the ground" },
  { word1: "eye", word2: "glasses", compound: "eyeglasses", hint: "Worn to improve vision" },
  { word1: "key", word2: "board", compound: "keyboard", hint: "Used for typing on a computer" },
  { word1: "grand", word2: "mother", compound: "grandmother", hint: "The mother of your parent" },
  { word1: "gold", word2: "fish", compound: "goldfish", hint: "A small orange fish kept as a pet" },
  { word1: "lip", word2: "stick", compound: "lipstick", hint: "Makeup for lips" },
  { word1: "news", word2: "paper", compound: "newspaper", hint: "A daily publication of news" },
  { word1: "pass", word2: "word", compound: "password", hint: "A secret word to access something" },
  { word1: "pea", word2: "nut", compound: "peanut", hint: "A nut that grows underground" },
  { word1: "pop", word2: "corn", compound: "popcorn", hint: "A snack made of heated corn kernels" },
  { word1: "rain", word2: "coat", compound: "raincoat", hint: "A jacket worn in the rain" },
  { word1: "sea", word2: "shell", compound: "seashell", hint: "The hard shell of a marine animal" },
  { word1: "sun", word2: "glasses", compound: "sunglasses", hint: "Glasses to protect eyes from the sun" },
  { word1: "tea", word2: "pot", compound: "teapot", hint: "A vessel used for making and serving tea" },
  { word1: "wheel", word2: "chair", compound: "wheelchair", hint: "A chair with wheels for mobility" },
  { word1: "wood", word2: "pecker", compound: "woodpecker", hint: "A bird that pecks trees" },
  { word1: "arm", word2: "chair", compound: "armchair", hint: "A comfortable chair with side supports" },
  { word1: "bed", word2: "room", compound: "bedroom", hint: "A room for sleeping" },
  { word1: "camp", word2: "fire", compound: "campfire", hint: "An outdoor fire at a camp" },
  { word1: "cross", word2: "walk", compound: "crosswalk", hint: "A marked path to cross a road" },
  { word1: "day", word2: "light", compound: "daylight", hint: "Light during the day" },
  { word1: "door", word2: "bell", compound: "doorbell", hint: "A bell at a door to signal arrival" },
  { word1: "dust", word2: "pan", compound: "dustpan", hint: "Used to sweep dust into" },
  { word1: "foot", word2: "print", compound: "footprint", hint: "A mark left by a foot" },
  { word1: "grass", word2: "hopper", compound: "grasshopper", hint: "An insect that jumps" },
  { word1: "hair", word2: "cut", compound: "haircut", hint: "The style or act of cutting hair" },
  { word1: "ice", word2: "cream", compound: "icecream", hint: "A cold sweet treat" },
  { word1: "life", word2: "guard", compound: "lifeguard", hint: "A person who protects swimmers" },
  { word1: "mail", word2: "box", compound: "mailbox", hint: "A box for receiving letters" },
  { word1: "night", word2: "mare", compound: "nightmare", hint: "A bad dream" },
  { word1: "out", word2: "doors", compound: "outdoors", hint: "Outside a building" },
  { word1: "sand", word2: "castle", compound: "sandcastle", hint: "A structure built of sand" },
  { word1: "time", word2: "table", compound: "timetable", hint: "A schedule of times" }
];

export function CompoundWordsClient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hardMode, setHardMode] = useState(false);
  
  const [currentPair, setCurrentPair] = useState(PAIRS[0]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cwHighScore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setMessage("");
    nextWord();
  };

  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("cwHighScore", score.toString());
      toast.success("New High Score!");
    } else {
      toast("Time's up!");
    }
  };

  const nextWord = () => {
    const next = PAIRS[Math.floor(Math.random() * PAIRS.length)];
    setCurrentPair(next);
    setGuess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPlaying) return;

    const normalizedGuess = guess.toLowerCase().replace(/\s/g, "");
    if (normalizedGuess === currentPair.compound) {
      setScore(s => s + (hardMode ? 20 : 10));
      setStreak(s => s + 1);
      setMessage("Correct!");
      setTimeout(() => { setMessage(""); nextWord(); }, 800);
    } else {
      setStreak(0);
      setMessage(`Wrong! It was ${currentPair.compound}`);
      setTimeout(() => { setMessage(""); nextWord(); }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Compound Words Game"
        description="Combine two words to make a compound word before time runs out!"
        icon={Puzzle}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Game Board</CardTitle>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className="text-xl font-bold font-mono">{timeLeft}s</span>
              </div>
            </div>
            <CardDescription>Type the compound word from the two parts given.</CardDescription>
          </CardHeader>
          <CardContent>
            {!isPlaying && timeLeft === 60 ? (
              <div className="text-center py-12 space-y-4">
                <Puzzle className="w-16 h-16 mx-auto text-primary/50" />
                <h3 className="text-2xl font-bold">Ready to Play?</h3>
                <p className="text-muted-foreground">You have 60 seconds to solve as many as possible.</p>
                <div className="flex items-center justify-center gap-4 py-4">
                  <Label>Easy (Hints)</Label>
                  <Switch checked={hardMode} onCheckedChange={setHardMode} />
                  <Label>Hard (No Hints, 2x Points)</Label>
                </div>
                <Button size="lg" onClick={startGame}>Start Game</Button>
              </div>
            ) : !isPlaying && timeLeft === 0 ? (
              <div className="text-center py-12 space-y-4">
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                <h3 className="text-2xl font-bold">Game Over!</h3>
                <p className="text-xl">Your score: {score}</p>
                <Button size="lg" onClick={startGame}>Play Again</Button>
              </div>
            ) : (
              <div className="py-8 space-y-8">
                <div className="flex justify-center items-center gap-4 text-3xl font-bold">
                  <div className="px-6 py-3 bg-secondary rounded-lg">{currentPair.word1}</div>
                  <div>+</div>
                  <div className="px-6 py-3 bg-secondary rounded-lg">{currentPair.word2}</div>
                </div>

                {!hardMode && (
                  <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span>{currentPair.hint}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-4">
                  <Input 
                    autoFocus
                    className="text-center text-xl h-12"
                    placeholder="Type here..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                  />
                  <Button type="submit" className="w-full">Submit</Button>
                </form>

                {message && (
                  <div className={cn(
                    "text-center font-bold text-lg",
                    message === "Correct!" ? "text-green-500" : "text-red-500"
                  )}>
                    {message}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-semibold">Current Score</span>
                <span className="text-2xl font-bold text-primary">{score}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-semibold">Current Streak</span>
                <span className="text-2xl font-bold text-orange-500">{streak} 🔥</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span className="font-semibold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" /> High Score
                </span>
                <span className="text-xl font-bold text-yellow-600">{highScore}</span>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
