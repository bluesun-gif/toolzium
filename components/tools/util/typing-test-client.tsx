"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RotateCcw, Timer, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_TEXTS = {
  easy: [
    "the quick brown fox jumps over the lazy dog",
    "hello world this is a simple typing test for beginners",
    "practice makes perfect keep typing to improve your speed",
    "a short sentence is good for warming up your fingers",
    "water is essential for life on earth and human health",
    "reading a good book can improve your vocabulary immensely",
    "never give up on your dreams no matter how hard it gets",
    "the sun shines bright in the beautiful blue summer sky",
    "typing games are a fun way to practice your keyboard skills",
    "always remember to take breaks when working on a computer"
  ],
  medium: [
    "Typing speed tests are a great way to measure your progress and improve your keyboard skills over time.",
    "The ability to type quickly and accurately can save you hours of work each week, increasing your productivity.",
    "When learning to touch type, it is more important to focus on accuracy rather than speed in the beginning.",
    "A mechanical keyboard provides tactile feedback which many typists find satisfying and helpful for their speed.",
    "Remember to maintain good posture while typing to prevent back pain and reduce strain on your wrists.",
    "Consistent practice for just fifteen minutes a day can dramatically increase your overall words per minute.",
    "Look at the screen instead of your hands while typing to train your muscle memory more effectively.",
    "Different keyboard layouts like Dvorak and Colemak were designed to minimize finger movement and increase efficiency.",
    "In the modern digital age, being proficient at typing is almost as essential as being able to write by hand.",
    "There are many free online resources available to help you master touch typing from the comfort of your home."
  ],
  hard: [
    "function calculateSpeed(chars, timeInSeconds) { return Math.round((chars / 5) / (timeInSeconds / 60)); }",
    "const fetchData = async (url) => { try { const res = await fetch(url); return await res.json(); } catch(e) { console.error(e); } };",
    "import React, { useState, useEffect } from 'react'; export default function App() { const [count, setCount] = useState(0); return <div/>; }",
    "SELECT users.name, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.status = 'completed';",
    "def bubble_sort(arr): n = len(arr); for i in range(n-1): for j in range(0, n-i-1): if arr[j] > arr[j+1]: arr[j], arr[j+1] = arr[j+1], arr[j]",
    "document.addEventListener('DOMContentLoaded', () => { const elements = document.querySelectorAll('.item'); elements.forEach(el => el.classList.add('active')); });",
    "type User = { id: string; username: string; email: string; createdAt: Date; isActive: boolean; };",
    "public static void main(String[] args) { System.out.println(\"Hello, World!\"); ArrayList<String> list = new ArrayList<>(); }",
    "interface DatabaseResponse<T> { data: T[]; totalCount: number; hasNextPage: boolean; error: Error | null; }",
    "sudo apt-get update && sudo apt-get upgrade -y && sudo systemctl restart nginx.service"
  ]
};

type Difficulty = "easy" | "medium" | "hard";

export default function TypingTestClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "finished">("idle");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const getRandomText = (level: Difficulty) => {
    const texts = SAMPLE_TEXTS[level];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  const startNewTest = (level: Difficulty = difficulty) => {
    setDifficulty(level);
    setTargetText(getRandomText(level));
    setUserInput("");
    setStatus("idle");
    setStartTime(null);
    setDuration(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    startNewTest(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "typing") {
      interval = setInterval(() => {
        setDuration((Date.now() - (startTime || Date.now())) / 1000);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status, startTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (status === "idle" && value.length > 0) {
      setStatus("typing");
      setStartTime(Date.now());
    }

    // Prevent typing more than target text
    if (value.length <= targetText.length) {
      setUserInput(value);
    }

    if (value === targetText && targetText.length > 0) {
      setStatus("finished");
    }
  };

  const calculateStats = () => {
    const timeInMinutes = duration / 60;
    
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctChars++;
      }
    }

    // Standard WPM: (total characters / 5) / time in minutes
    const rawWpm = timeInMinutes > 0 ? (userInput.length / 5) / timeInMinutes : 0;
    // Net WPM: (correct characters / 5) / time in minutes
    const netWpm = timeInMinutes > 0 ? (correctChars / 5) / timeInMinutes : 0;
    const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 0;
    const cpm = timeInMinutes > 0 ? correctChars / timeInMinutes : 0;

    return {
      wpm: Math.round(netWpm),
      accuracy: Math.round(accuracy),
      cpm: Math.round(cpm),
      time: duration.toFixed(1)
    };
  };

  const stats = calculateStats();

  const renderText = () => {
    return targetText.split("").map((char, index) => {
      let colorClass = "text-muted-foreground";
      if (index < userInput.length) {
        colorClass = userInput[index] === char ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/20 rounded-sm";
      } else if (index === userInput.length && status !== "finished") {
        colorClass = "text-primary border-b-2 border-primary animate-pulse";
      }

      return (
        <span key={index} className={cn("text-2xl md:text-3xl font-mono transition-colors", colorClass)}>
          {char === " " ? " " : char}
        </span>
      );
    });
  };

  return (
    <>
      <ToolPageHeader title="Typing Speed Test" description="Test and improve your typing speed and accuracy." />
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-sm border-muted">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Typing Area</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="difficulty" className="text-sm">Difficulty:</Label>
                <Select
                  value={difficulty}
                  onValueChange={(val: Difficulty) => {
                    startNewTest(val);
                  }}
                  disabled={status === "typing"}
                >
                  <SelectTrigger id="difficulty" className="w-[120px] h-8">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" variant="outline" onClick={() => startNewTest()} className="h-8">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div 
              className="relative p-6 bg-card border rounded-lg min-h-[200px] cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="absolute inset-0 p-6 pointer-events-none select-none break-words whitespace-pre-wrap leading-relaxed">
                {renderText()}
              </div>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 resize-none z-10"
                disabled={status === "finished"}
                autoFocus
                spellCheck={false}
              />
              {status === "idle" && userInput.length === 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-sm flex items-center gap-2 animate-pulse">
                  Start typing to begin
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                Live Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-4xl font-bold text-primary">{stats.wpm}</span>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">WPM</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-2xl font-semibold">{stats.accuracy}%</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-2xl font-semibold">{stats.time}s</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Time</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {status === "finished" && (
            <Card className="border-primary/50 bg-primary/5 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Net WPM</span>
                    <span className="font-semibold">{stats.wpm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-semibold">{stats.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Characters (CPM)</span>
                    <span className="font-semibold">{stats.cpm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time taken</span>
                    <span className="font-semibold">{stats.time}s</span>
                  </div>
                </div>
                <Button onClick={() => startNewTest()} className="w-full group">
                  <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
