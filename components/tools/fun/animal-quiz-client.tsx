"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Brain, Timer, Trophy, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

const ALL_QUESTIONS = [
  { q: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Leopard", "Tiger"], a: 0, cat: "Mammals" },
  { q: "Which bird is known for its ability to mimic human speech?", options: ["Parrot", "Eagle", "Crow", "Owl"], a: 0, cat: "Birds" },
  { q: "What is the largest mammal in the world?", options: ["Blue Whale", "Elephant", "Giraffe", "Orca"], a: 0, cat: "Mammals" },
  { q: "How many legs does a spider have?", options: ["8", "6", "10", "12"], a: 0, cat: "Insects" },
  { q: "Which animal is known as the King of the Jungle?", options: ["Lion", "Tiger", "Elephant", "Bear"], a: 0, cat: "Mammals" },
  { q: "What is the tallest living terrestrial animal?", options: ["Giraffe", "Elephant", "Ostrich", "Kangaroo"], a: 0, cat: "Mammals" },
  { q: "Which of these is a reptile?", options: ["Snake", "Frog", "Salamander", "Toad"], a: 0, cat: "Reptiles" },
  { q: "What do pandas primarily eat?", options: ["Bamboo", "Fish", "Meat", "Insects"], a: 0, cat: "Mammals" },
  { q: "Which bird cannot fly but can swim very well?", options: ["Penguin", "Ostrich", "Flamingo", "Pelican"], a: 0, cat: "Birds" },
  { q: "What is the largest living species of lizard?", options: ["Komodo Dragon", "Iguana", "Gecko", "Chameleon"], a: 0, cat: "Reptiles" },
  { q: "Which insect makes honey?", options: ["Bee", "Wasp", "Ant", "Butterfly"], a: 0, cat: "Insects" },
  { q: "How many hearts does an octopus have?", options: ["3", "1", "2", "4"], a: 0, cat: "Sea Life" },
  { q: "What is a baby kangaroo called?", options: ["Joey", "Calf", "Cub", "Pup"], a: 0, cat: "Mammals" },
  { q: "Which animal has black and white stripes?", options: ["Zebra", "Horse", "Donkey", "Deer"], a: 0, cat: "Mammals" },
  { q: "What is the fastest bird?", options: ["Peregrine Falcon", "Eagle", "Hawk", "Hummingbird"], a: 0, cat: "Birds" },
  { q: "Which sea creature is known for its intelligence?", options: ["Dolphin", "Shark", "Whale", "Sea Turtle"], a: 0, cat: "Sea Life" },
  { q: "What do caterpillars turn into?", options: ["Butterflies", "Beetles", "Spiders", "Ants"], a: 0, cat: "Insects" },
  { q: "Which reptile can change its color?", options: ["Chameleon", "Iguana", "Snake", "Gecko"], a: 0, cat: "Reptiles" },
  { q: "What is the largest species of shark?", options: ["Whale Shark", "Great White Shark", "Tiger Shark", "Hammerhead Shark"], a: 0, cat: "Sea Life" },
  { q: "Which animal is known for building dams?", options: ["Beaver", "Otter", "Muskrat", "Platypus"], a: 0, cat: "Mammals" },
  { q: "What is a group of lions called?", options: ["Pride", "Pack", "Herd", "Flock"], a: 0, cat: "Mammals" },
  { q: "Which insect is known for its glowing abdomen?", options: ["Firefly", "Beetle", "Moth", "Ant"], a: 0, cat: "Insects" },
  { q: "What is the largest species of penguin?", options: ["Emperor Penguin", "King Penguin", "Macaroni Penguin", "Adelie Penguin"], a: 0, cat: "Birds" },
  { q: "Which marine animal has eight tentacles?", options: ["Octopus", "Squid", "Jellyfish", "Starfish"], a: 0, cat: "Sea Life" },
  { q: "What type of animal is a frog?", options: ["Amphibian", "Reptile", "Fish", "Mammal"], a: 0, cat: "Other" },
  { q: "Which bear lives primarily in the Arctic?", options: ["Polar Bear", "Grizzly Bear", "Black Bear", "Panda"], a: 0, cat: "Mammals" },
  { q: "What is the largest land predator?", options: ["Polar Bear", "Lion", "Tiger", "Grizzly Bear"], a: 0, cat: "Mammals" },
  { q: "Which bird has a beautiful tail with colorful 'eyes'?", options: ["Peacock", "Parrot", "Flamingo", "Swan"], a: 0, cat: "Birds" },
  { q: "What is a male deer called?", options: ["Buck", "Doe", "Fawn", "Stag"], a: 0, cat: "Mammals" },
  { q: "Which sea creature is known as the 'unicorn of the sea'?", options: ["Narwhal", "Beluga Whale", "Dolphin", "Manatee"], a: 0, cat: "Sea Life" }
];

export function AnimalQuizClient() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("animal-quiz-highscore");
    if (saved) setHighScore(Number(saved));
  }, []);

  useEffect(() => {
    if (isPlaying && !isFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isPlaying && timeLeft === 0) {
      handleAnswer(-1); // Time out
    }
  }, [timeLeft, isPlaying, isFinished]);

  const startQuiz = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    // Shuffle options
    const mapped = shuffled.map(q => {
      const opts = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.a }));
      const shuffledOpts = opts.sort(() => Math.random() - 0.5);
      return { ...q, options: shuffledOpts };
    });
    setQuestions(mapped);
    setCurrentIdx(0);
    setScore(0);
    setIsPlaying(true);
    setIsFinished(false);
    setTimeLeft(15);
  };

  const handleAnswer = (selectedIdx: number) => {
    if (selectedIdx >= 0 && questions[currentIdx].options[selectedIdx].isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setTimeLeft(15);
    } else {
      setIsFinished(true);
      setIsPlaying(false);
      const newScore = score + (selectedIdx >= 0 && questions[currentIdx].options[selectedIdx].isCorrect ? 1 : 0);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("animal-quiz-highscore", newScore.toString());
      }
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Brain} 
        title="Animal Trivia Quiz" 
        description="Test your animal knowledge with 10 random questions. 15 seconds per question!"
      />
      
      {!isPlaying && !isFinished && (
        <GlassCard>
          <CardContent className="flex flex-col items-center py-12 space-y-6">
            <Trophy className="w-16 h-16 text-primary" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Ready to test your knowledge?</h2>
              <p className="text-muted-foreground mb-4">High Score: {highScore}/10</p>
              <Button size="lg" onClick={startQuiz}>Start Quiz</Button>
            </div>
          </CardContent>
        </GlassCard>
      )}

      {isPlaying && !isFinished && questions.length > 0 && (
        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Question {currentIdx + 1} of {questions.length}</CardTitle>
              <CardDescription>Category: {questions[currentIdx].cat}</CardDescription>
            </div>
            <div className="flex items-center gap-2 font-bold text-lg">
              <Timer className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}`} />
              <span className={timeLeft <= 5 ? 'text-red-500' : ''}>{timeLeft}s</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-xl font-medium text-center mb-8">{questions[currentIdx].q}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentIdx].options.map((opt: string, i: number) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="h-16 text-lg" 
                  onClick={() => handleAnswer(i)}
                >
                  {opt}
                </Button>
              ))}
            </div>
            <div className="text-right text-sm text-muted-foreground">
              Current Score: {score}
            </div>
          </CardContent>
        </GlassCard>
      )}

      {isFinished && (
        <GlassCard>
          <CardContent className="flex flex-col items-center py-12 space-y-6">
            <Trophy className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-3xl font-bold">Quiz Complete!</h2>
            <div className="text-center space-y-2">
              <p className="text-xl">Your Score: <strong>{score}</strong> / {questions.length}</p>
              <p className="text-muted-foreground">Percentage: {Math.round((score / questions.length) * 100)}%</p>
            </div>
            <Button size="lg" onClick={startQuiz} className="mt-4">Play Again</Button>
          </CardContent>
        </GlassCard>
      )}
    </div>
  );
}
