"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { HelpCircle, Trophy, RotateCcw, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Question {
  question: string;
  options: string[];
  answer: number;
  category: string;
}

const QUESTIONS: Question[] = [
  {
    category: "Science",
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 1
  },
  {
    category: "Geography",
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    answer: 1
  },
  {
    category: "Technology",
    question: "Who is widely recognized as the inventor of the World Wide Web?",
    options: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Alan Turing"],
    answer: 0
  },
  {
    category: "History",
    question: "In what year did the Apollo 11 mission land humans on the Moon?",
    options: ["1965", "1969", "1972", "1975"],
    answer: 1
  },
  {
    category: "General",
    question: "How many elements are on the standard Periodic Table?",
    options: ["108", "114", "118", "120"],
    answer: 2
  }
];

export function TriviaClient() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === currentQ.answer) {
      setScore(s => s + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect!");
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsFinished(false);
    toast.success("Restarted trivia quiz!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={HelpCircle}
          title="Interactive Trivia Quiz"
          description="Test your general knowledge across science, history, geography, and technology with instant answer explanations."
        />

        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" /> General Knowledge Trivia
                </CardTitle>
                <CardDescription>
                  Question {currentIdx + 1} of {QUESTIONS.length} • Category: {currentQ.category}
                </CardDescription>
              </div>
              <div className="text-sm font-bold bg-muted px-3 py-1.5 rounded-lg">
                Score: {score} / {QUESTIONS.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isFinished ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground leading-relaxed">
                  {currentQ.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isCorrect = i === currentQ.answer;
                    let style = "bg-background border-border/80 hover:border-primary/60";
                    if (isAnswered) {
                      if (isCorrect) style = "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300 font-bold";
                      else if (isSelected) style = "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300";
                    }

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => handleSelect(i)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all flex items-center justify-between font-medium",
                          style
                        )}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="flex justify-end">
                    <Button onClick={handleNext}>
                      {currentIdx + 1 === QUESTIONS.length ? "View Final Score" : "Next Question"}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 animate-bounce" />
                <h3 className="text-3xl font-bold">Quiz Completed!</h3>
                <p className="text-lg text-muted-foreground">
                  You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{QUESTIONS.length}</span> ({Math.round((score / QUESTIONS.length) * 100)}%)
                </p>
                <Button onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Play Again
                </Button>
              </div>
            )}
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Read Question", description: "Review multiple-choice questions from varied disciplines.", icon: HelpCircle },
            { step: "02", title: "Pick Answer", description: "Select the option you believe is accurate for instant verification.", icon: Sparkles },
            { step: "03", title: "Review Score", description: "Track your final score and play endless rounds to expand your trivia mastery.", icon: Trophy }
          ]}
          badges={["100% Free Forever", "Instant Answer Checking", "Zero Sign-up Required"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: HelpCircle, title: "Multi-Discipline Categories", description: "Features questions from Science, History, Geography, and Technology." },
            { icon: Trophy, title: "Instant Feedback", description: "Color-coded answer states immediately show the verified correct answer." },
            { icon: RotateCcw, title: "Infinite Replayability", description: "Reset and practice anytime to test your cognitive memory." },
            { icon: Sparkles, title: "Zero Lag", description: "100% client-side quiz engine with instantaneous transitions." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Boost Cognitive Retention Through Active Recall</h3>
            <p>
              Trivia and interactive quizzing are scientifically proven methods to enhance memory retention and active cognitive recall. By testing your factual knowledge under timed conditions, you reinforce neural pathways across diverse subject areas.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is this trivia quiz free?", answer: "Yes, 100% free with unlimited rounds." },
            { question: "Can I play on mobile?", answer: "Yes, the interface is completely responsive on all smartphones, tablets, and desktop computers." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/fun/trivia" max={6} />
      </div>
    </div>
  );
}

export default TriviaClient;
