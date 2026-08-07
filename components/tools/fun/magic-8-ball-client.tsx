"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { CircleHelp, Sparkles, History } from "lucide-react";
import { toast } from "react-hot-toast";

const ANSWERS = [
  // Positive
  "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.",
  "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
  // Neutral
  "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
  // Negative
  "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."
];

type QAHistory = {
  question: string;
  answer: string;
  timestamp: number;
};

export function Magic8BallClient() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [history, setHistory] = useState<QAHistory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("magic-8-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveHistory = (newHistory: QAHistory[]) => {
    setHistory(newHistory);
    localStorage.setItem("magic-8-history", JSON.stringify(newHistory));
  };

  const askQuestion = () => {
    if (!question.trim()) {
      toast.error("Please ask a question first!");
      return;
    }
    
    setIsShaking(true);
    setAnswer(null);
    
    setTimeout(() => {
      const newAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
      setAnswer(newAnswer);
      setIsShaking(false);
      
      const newEntry = { question, answer: newAnswer, timestamp: Date.now() };
      saveHistory([newEntry, ...history].slice(0, 20));
      setQuestion("");
    }, 1500);
  };

  const clearHistory = () => {
    saveHistory([]);
    toast.success("History cleared");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={CircleHelp}
        title="Magic 8 Ball"
        description="Ask a yes or no question and uncover your destiny."
        actions={
          <ResetButton onClick={clearHistory} label="Clear History" />
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Consult the Oracle</CardTitle>
          <CardDescription>Type your question below and ask the Magic 8 Ball.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex gap-2">
            <Input 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="Will I win the lottery tomorrow?" 
              onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            />
            <Button onClick={askQuestion} disabled={isShaking || !question.trim()}>
              <Sparkles className="w-4 h-4 mr-2" /> Ask
            </Button>
          </div>

          <div className="flex justify-center py-8">
            <div 
              className={cn(
                "relative w-64 h-64 bg-black rounded-full shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.1),_0_20px_30px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer",
                isShaking && "animate-bounce"
              )}
              onClick={() => { if (question.trim()) askQuestion(); }}
            >
              {/* The "8" face when not answered */}
              <div className={cn(
                "absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex items-center justify-center transition-opacity duration-500",
                (answer || isShaking) ? "opacity-0" : "opacity-100"
              )}>
                <span className="text-6xl font-bold font-serif">8</span>
              </div>
              
              {/* The Answer Window */}
              <div className={cn(
                "w-28 h-28 rounded-full bg-[#0f172a] text-[#f8fafc] shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden transition-opacity duration-1000",
                (!answer && !isShaking) ? "opacity-0" : "opacity-100"
              )}>
                {answer && (
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-t-[80px] border-t-blue-800 opacity-80 absolute" />
                    <span className="text-blue-100 text-[10px] font-bold text-center z-10 leading-tight uppercase transform -translate-y-2">
                      {answer}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Highlight reflection */}
              <div className="absolute top-4 right-10 w-20 h-10 bg-white/10 rounded-full blur-md transform -rotate-45" />
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {history.length > 0 && (
        <>
          <Separator />
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Past Readings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((h, i) => (
                  <div key={i} className="flex flex-col space-y-1 p-3 rounded bg-muted/50">
                    <span className="text-sm font-medium">Q: {h.question}</span>
                    <span className="text-sm text-primary font-semibold">A: {h.answer}</span>
                    <span className="text-xs text-muted-foreground">{new Date(h.timestamp).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        </>
      )}
    </div>
  );
}
