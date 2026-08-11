"use client";

import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Skull, RotateCcw } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

const WORDS = [
  "javascript", "typescript", "react", "nextjs", "nodejs", "express", "mongodb", "postgresql", "prisma", "tailwind",
  "graphql", "restapi", "docker", "kubernetes", "aws", "azure", "gcp", "vercel", "netlify", "git",
  "github", "gitlab", "bitbucket", "jest", "cypress", "webpack", "vite", "babel", "eslint", "prettier",
  "redux", "zustand", "recoil", "router", "axios", "fetch", "promise", "async", "await", "closure",
  "hoisting", "prototype", "class", "object", "array", "string", "number", "boolean", "symbol", "bigint"
];

const HANGMAN_STAGES = [
  "  +---+\n      |\n      |\n      |\n      |\n=======",
  "  +---+\n  |   |\n      |\n      |\n      |\n=======",
  "  +---+\n  |   |\n  O   |\n      |\n      |\n=======",
  "  +---+\n  |   |\n  O   |\n  |   |\n      |\n=======",
  "  +---+\n  |   |\n  O   |\n /|   |\n      |\n=======",
  "  +---+\n  |   |\n  O   |\n /|\\ |\n      |\n=======",
  "  +---+\n  |   |\n  O   |\n /|\\ |\n /    |\n=======",
  "  +---+\n  |   |\n  O   |\n /|\\ |\n / \\ |\n======="
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function HangmanClient() {
  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const initGame = () => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuessed(new Set());
  };

  useEffect(() => { initGame(); }, []);

  const wrongGuesses = useMemo(() => {
    let count = 0;
    guessed.forEach(letter => {
      if (!word.includes(letter.toLowerCase())) count++;
    });
    return count;
  }, [guessed, word]);

  const isWon = useMemo(() => {
    return word.split("").every(letter => guessed.has(letter.toUpperCase()));
  }, [word, guessed]);

  const isLost = wrongGuesses >= 7;
  const gameOver = isWon || isLost;

  const handleGuess = (letter: string) => {
    if (gameOver || guessed.has(letter)) return;
    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);
    
    if (!word.includes(letter.toLowerCase())) {
      if (wrongGuesses + 1 >= 7) {
        setLosses(l => l + 1);
        toast.error(`Game Over! The word was "${word}"`);
      }
    } else {
      if (word.split("").every(l => newGuessed.has(l.toUpperCase()) || l === letter.toLowerCase())) {
        setWins(w => w + 1);
        toast.success("You Won! 🎉");
      }
    }
  };

  const displayWord = word.split("").map(letter => 
    guessed.has(letter.toUpperCase()) ? letter : "_"
  ).join(" ");

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader 
        icon={Skull} 
        title="Hangman Game" 
        description="Test your vocabulary with this classic word guessing game." 
      />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Skull className="w-4 h-4 text-primary" /> Game Board
          </CardTitle>
          <div className="flex gap-4 text-sm mt-2">
            <span className="text-green-500 font-bold">Wins: {wins}</span>
            <span className="text-red-500 font-bold">Losses: {losses}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <pre className="font-mono text-lg text-red-500 dark:text-red-400 bg-muted/50 p-4 rounded-lg border border-border/50 min-w-[160px] text-center">
              {HANGMAN_STAGES[wrongGuesses]}
            </pre>
            <div className="space-y-4 text-center flex-1">
              <p className="text-3xl font-mono tracking-widest font-bold text-primary">
                {gameOver && isLost ? word.split("").join(" ") : displayWord}
              </p>
              <p className="text-sm text-muted-foreground">
                Wrong Guesses: {wrongGuesses} / 7
              </p>
              {gameOver && (
                <Button onClick={initGame} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> New Game
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 max-w-2xl mx-auto">
            {ALPHABET.map(letter => {
              const isGuessed = guessed.has(letter);
              const isWrong = isGuessed && !word.includes(letter.toLowerCase());
              const isCorrect = isGuessed && word.includes(letter.toLowerCase());
              
              return (
                <Button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={isGuessed || gameOver}
                  variant={isWrong ? "destructive" : isCorrect ? "default" : "outline"}
                  className={`h-10 ${isCorrect ? "bg-green-600 hover:bg-green-700" : ""}`}
                >
                  {letter}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ToolHowItWorks 
        steps={[
          { step: "01", title: "Guess Letters", description: "Click any letter from the keyboard grid to guess it.", icon: Skull },
          { step: "02", title: "Avoid Errors", description: "You have 7 wrong guesses before the hangman is complete.", icon: Skull },
          { step: "03", title: "Win the Game", description: "Reveal all letters in the hidden word to win and start a new round.", icon: Skull }
        ]} 
        badges={["100% Free", "Client-Side", "Fun"]} 
      />

      <ToolFeatureGuides 
        features={[
          { icon: Skull, title: "Tech Vocabulary", description: "Words are drawn from a curated list of programming and tech terms." },
          { icon: Skull, title: "Visual Feedback", description: "Buttons turn green for correct guesses and red for wrong ones." },
          { icon: Skull, title: "Score Tracking", description: "Keeps track of your wins and losses across multiple sessions." },
          { icon: Skull, title: "ASCII Art", description: "Classic text-based hangman drawing updates with every mistake." }
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Hangman is a classic paper and pencil guessing game for two or more players. The words are selected from a specialized developer dictionary, making it a fun way to test your tech knowledge.</p>
          <p>The game features automatic score tracking and visual feedback, ensuring you know exactly which letters you've already tried.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion 
        faqs={[
          { question: "What kind of words are used?", answer: "The game uses a curated list of 50 programming, framework, and computer science terms." },
          { question: "How many wrong guesses are allowed?", answer: "You can make up to 6 wrong guesses. The 7th wrong guess ends the game." },
          { question: "Does the game save my score?", answer: "Scores are tracked in memory during your current browser session. Refreshing the page will reset the score." }
        ]} 
      />

      <RelatedTools currentToolUrl="/tools/fun/hangman" max={6} />
    </div>
  );
}
