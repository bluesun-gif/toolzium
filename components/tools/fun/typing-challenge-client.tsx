"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Keyboard, Trophy, RotateCcw, Zap } from "lucide-react";

const TEXTS = {
  general: "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. A journey of a thousand miles begins with a single step. To be or not to be, that is the question.",
  coding: "const array = [1, 2, 3]; function add(a, b) { return a + b; } let result = array.map(x => x * 2); console.log(result); import React from 'react'; export default App;",
  quotes: "I have a dream that one day this nation will rise up and live out the true meaning of its creed. The only thing we have to fear is fear itself. Ask not what your country can do for you, ask what you can do for your country."
};

export function TypingChallengeClient() {
  const [duration, setDuration] = useState("30");
  const [category, setCategory] = useState("general");
  const [text, setText] = useState(TEXTS.general);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("typingHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      const words = input.length / 5;
      const minutes = parseInt(duration) / 60;
      const wpm = Math.round(words / minutes);
      if (wpm > highScore) {
        setHighScore(wpm);
        localStorage.setItem("typingHighScore", wpm.toString());
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, duration, input, highScore]);

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setText(TEXTS[val as keyof typeof TEXTS]);
    resetTest();
  };

  const handleDurationChange = (val: string) => {
    setDuration(val);
    setTimeLeft(parseInt(val));
    resetTest();
  };

  const resetTest = () => {
    setIsActive(false);
    setIsFinished(false);
    setInput("");
    setTimeLeft(parseInt(duration));
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive && !isFinished && e.target.value.length > 0) {
      setIsActive(true);
    }
    if (!isFinished) {
      setInput(e.target.value);
    }
  };

  const calculateStats = () => {
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correctChars++;
    }
    const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;
    const timeElapsed = parseInt(duration) - timeLeft;
    const minutes = timeElapsed > 0 ? timeElapsed / 60 : 1 / 60;
    const wpm = Math.round((correctChars / 5) / minutes);
    return { wpm: isNaN(wpm) ? 0 : wpm, accuracy };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Keyboard}
        title="Speed Typing Challenge"
        description="Test your typing speed and accuracy with various text categories."
        actions={
          <ResetButton onClick={resetTest} label="Restart Test" />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Duration</label>
              <Select value={duration} onValueChange={handleDurationChange} disabled={isActive}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                  <SelectItem value="120">120 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={category} onValueChange={handleCategoryChange} disabled={isActive}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General English</SelectItem>
                  <SelectItem value="coding">Coding (JS/Python)</SelectItem>
                  <SelectItem value="quotes">Famous Quotes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Time Left</div>
              <div className="text-3xl font-bold">{timeLeft}s</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Live WPM</div>
              <div className="text-3xl font-bold">{stats.wpm}</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <div className="text-3xl font-bold">{stats.accuracy}%</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Trophy className="w-4 h-4" /> High Score</div>
              <div className="text-3xl font-bold">{highScore}</div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardContent className="p-6">
          <div className="text-lg leading-relaxed mb-6 select-none font-mono tracking-wide break-all min-h-[100px]">
            {text.split("").map((char, index) => {
              let color = "text-muted-foreground";
              if (index < input.length) {
                color = input[index] === char ? "text-green-500" : "text-red-500 bg-red-100 dark:bg-red-900/30";
              } else if (index === input.length && isActive) {
                color = "text-primary bg-primary/20 animate-pulse";
              }
              return (
                <span key={index} className={color}>
                  {char}
                </span>
              );
            })}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isFinished}
            className="w-full p-4 border rounded-md font-mono text-lg opacity-0 absolute h-0 w-0 -z-10"
            autoFocus
          />
          {!isActive && !isFinished && (
            <div className="text-center text-muted-foreground">
              Start typing to begin the challenge...
            </div>
          )}
          {isFinished && (
            <div className="text-center p-6 bg-primary/10 rounded-lg mt-4">
              <Zap className="w-12 h-12 mx-auto text-primary mb-2" />
              <h3 className="text-2xl font-bold mb-2">Time's Up!</h3>
              <p className="text-lg">Your Score: {stats.wpm} WPM with {stats.accuracy}% accuracy.</p>
              <div className="mt-4">
                <ActionButton onClick={resetTest} icon={RotateCcw} label="Try Again" />
              </div>
            </div>
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
}
