"use client";
import { cn } from"@/lib/utils";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Play, RotateCcw, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const COLORS = [{
  id: 0,
  name: "red",
  bg: "bg-red-600",
  active: "bg-red-400 shadow-[0_0_30px_10px_rgba(248,113,113,0.5)]"
}, {
  id: 1,
  name: "green",
  bg: "bg-green-600",
  active: "bg-green-400 shadow-[0_0_30px_10px_rgba(74,222,128,0.5)]"
}, {
  id: 2,
  name: "blue",
  bg: "bg-blue-600",
  active: "bg-blue-400 shadow-[0_0_30px_10px_rgba(96,165,250,0.5)]"
}, {
  id: 3,
  name: "yellow",
  bg: "bg-yellow-500",
  active: "bg-yellow-300 shadow-[0_0_30px_10px_rgba(253,224,71,0.5)]"
}];
export default function SimonSaysClient() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [level, setLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const isPlayingRef = useRef(false);
  useEffect(() => {
    const saved = localStorage.getItem("simon_highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const showSequence = useCallback(async (seq: number[]) => {
    setIsShowing(true);
    const speed = Math.max(200, 800 - level * 50);
    for (let i = 0; i < seq.length; i++) {
      if (!isPlayingRef.current) break;
      setActiveColor(seq[i]);
      await sleep(speed);
      setActiveColor(null);
      await sleep(speed / 2);
    }
    setIsShowing(false);
  }, [level]);
  const startGame = async () => {
    setSequence([]);
    setPlayerSeq([]);
    setLevel(0);
    setGameOver(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    nextRound([]);
  };
  const nextRound = async (currentSeq: number[]) => {
    const newColor = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, newColor];
    setSequence(newSeq);
    setLevel(newSeq.length);
    setPlayerSeq([]);
    await sleep(500);
    if (isPlayingRef.current) {
      await showSequence(newSeq);
    }
  };
  const handleColorClick = async (colorId: number) => {
    if (isShowing || !isPlaying || gameOver) return;
    setActiveColor(colorId);
    setTimeout(() => setActiveColor(null), 200);
    const newPlayerSeq = [...playerSeq, colorId];
    setPlayerSeq(newPlayerSeq);
    const currentIndex = newPlayerSeq.length - 1;
    if (sequence[currentIndex] !== colorId) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setGameOver(true);
      toast.error(`Game Over! You reached level ${level}.`);
      if (level > highScore) {
        setHighScore(level);
        localStorage.setItem("simon_highscore", level.toString());
        toast.success("New High Score!");
      }
      return;
    }
    if (newPlayerSeq.length === sequence.length) {
      toast.success(`Level ${level} Complete!`);
      await sleep(1000);
      if (isPlayingRef.current) {
        nextRound(sequence);
      }
    }
  };
  const stopGame = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsShowing(false);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={Gamepad2} title="Simon Says" description="Test your memory by repeating the increasingly fast sequence of colors and sounds." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center">
 <CardTitle className={titleClass}>Simon Says</CardTitle>
 <div className="flex gap-4 text-sm font-medium">
 <span className="text-muted-foreground">Level: <span className="text-foreground">{level}</span></span>
 <span className="flex items-center gap-1 text-yellow-500"><Trophy className="w-4 h-4" /> {highScore}</span>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-6 sm:p-8 flex flex-col items-center space-y-6">
 <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm aspect-square">
 {COLORS.map(color => <Button key={color.id} onClick={() => handleColorClick(color.id)} disabled={isShowing || !isPlaying || gameOver} className={cn(`rounded-2xl transition-all duration-100 border-4 border-border/50 ${activeColor === color.id ? color.active : color.bg} ${!isPlaying && !gameOver ? "opacity-50" : "opacity-90 hover:opacity-100"}`)} />)}
 </div>

 <div className="flex gap-4 w-full max-w-sm">
 {!isPlaying ? <Button onClick={startGame} className="flex-1 gap-2" size="lg">
 <Play className="w-4 h-4" /> {gameOver ? "Play Again" : "Start Game"}
 </Button> : <Button onClick={stopGame} variant="destructive" className="flex-1 gap-2" size="lg">
 <RotateCcw className="w-4 h-4" /> Stop
 </Button>}
 </div>
 
 {gameOver && <p className="text-lg font-semibold text-red-500">Wrong Sequence! Reached Level {level}</p>}
 {isShowing && <p className="text-muted-foreground animate-pulse">Watch carefully...</p>}
 {isPlaying && !isShowing && !gameOver && <p className="text-primary font-medium">Your turn!</p>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
      step: "01",
      title: "Start the Game",
      description: "Click Start to begin at Level 1 with a single color flash.",
      icon: Play
    }, {
      step: "02",
      title: "Memorize & Repeat",
      description: "Watch the sequence, then click the colors in the exact same order.",
      icon: Gamepad2
    }, {
      step: "03",
      title: "Survive the Speed",
      description: "Each round adds a new color and speeds up. Beat your high score!",
      icon: Trophy
    }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
      icon: Gamepad2,
      title: "Classic Gameplay",
      description: "Authentic Simon Says mechanics with progressive difficulty scaling."
    }, {
      icon: Trophy,
      title: "Local High Scores",
      description: "Your highest level is saved locally so you can track your progress over time."
    }, {
      icon: Play,
      title: "Dynamic Speed",
      description: "The delay between flashes shrinks as you advance, testing your reaction time."
    }, {
      icon: RotateCcw,
      title: "Instant Restart",
      description: "Game over? Jump right back in with a single click to try again."
    }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Simon is an electronic game of memory skill, originally invented by Ralph H. Baer and Howard J. Morrison in 1978. The device creates a sequence of tones and lights that the player must repeat in order.</p>
 <p>Our web-based Simon Says captures the essence of the original hardware. It challenges your working memory and sequential processing. As the sequences grow longer and the tempo increases, you must rely on chunking—grouping the sequence into smaller, memorable patterns.</p>
 <p>This is an excellent brain-training exercise. Studies suggest that practicing sequential memory tasks can help improve focus, concentration, and cognitive flexibility. Try to beat your high score and see how far your memory can stretch!</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
      question: "Does the game get faster?",
      answer: "Yes! The time delay between each color flash decreases as you reach higher levels, requiring faster reactions."
    }, {
      question: "Where is my high score saved?",
      answer: "Your high score is saved in your browser's local storage. It will persist even if you close the tab, but it is not shared online."
    }, {
      question: "What happens if I click the wrong color?",
      answer: "The game immediately ends, and your final level is recorded. You can then restart from Level 1."
    }]} />

 <RelatedTools currentToolUrl="/tools/fun/simon-says" max={6} />
 </div>;
}