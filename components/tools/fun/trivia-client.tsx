"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import toast from"react-hot-toast";
import { Brain, RotateCcw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

interface Question {
 q: string;
 o: string[];
 a: number;
 c: string;
}

const QUESTIONS: Question[] = [
 { q:"What is the chemical symbol for gold?", o: ["Au","Ag","Fe","Cu"], a: 0, c:"Science"},
 { q:"Which planet is known as the Red Planet?", o: ["Venus","Mars","Jupiter","Saturn"], a: 1, c:"Science"},
 { q:"What gas do plants absorb from the atmosphere?", o: ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], a: 2, c:"Science"},
 { q:"What is the hardest natural substance on Earth?", o: ["Gold","Iron","Diamond","Platinum"], a: 2, c:"Science"},
 { q:"How many bones are in the adult human body?", o: ["206","201","215","195"], a: 0, c:"Science"},
 { q:"Who was the first President of the United States?", o: ["Thomas Jefferson","George Washington","John Adams","Benjamin Franklin"], a: 1, c:"History"},
 { q:"In which year did World War II end?", o: ["1943","1944","1945","1946"], a: 2, c:"History"},
 { q:"Who discovered penicillin?", o: ["Marie Curie","Alexander Fleming","Louis Pasteur","Joseph Lister"], a: 1, c:"History"},
 { q:"The Berlin Wall fell in which year?", o: ["1987","1988","1989","1990"], a: 2, c:"History"},
 { q:"Who wrote the Declaration of Independence?", o: ["George Washington","Benjamin Franklin","Thomas Jefferson","James Madison"], a: 2, c:"History"},
 { q:"What is the largest ocean on Earth?", o: ["Atlantic","Indian","Arctic","Pacific"], a: 3, c:"Geography"},
 { q:"Which country has the most population?", o: ["USA","India","China","Indonesia"], a: 1, c:"Geography"},
 { q:"Mount Everest is located in which mountain range?", o: ["Andes","Alps","Rockies","Himalayas"], a: 3, c:"Geography"},
 { q:"What is the capital of Australia?", o: ["Sydney","Melbourne","Canberra","Perth"], a: 2, c:"Geography"},
 { q:"Which river is the longest in the world?", o: ["Amazon","Nile","Yangtze","Mississippi"], a: 1, c:"Geography"},
 { q:"Who directed the movie 'Jurassic Park'?", o: ["James Cameron","Steven Spielberg","George Lucas","Ridley Scott"], a: 1, c:"Entertainment"},
 { q:"Which band wrote the song 'Bohemian Rhapsody'?", o: ["The Beatles","Led Zeppelin","Queen","Pink Floyd"], a: 2, c:"Entertainment"},
 { q:"What is the name of Batman's butler?", o: ["James","Alfred","Jeeves","Charles"], a: 1, c:"Entertainment"},
 { q:"Who played Jack in 'Titanic'?", o: ["Brad Pitt","Tom Cruise","Leonardo DiCaprio","Matt Damon"], a: 2, c:"Entertainment"},
 { q:"Which Disney movie features the song 'Let It Go'?", o: ["Tangled","Moana","Frozen","Brave"], a: 2, c:"Entertainment"},
 { q:"What does 'HTTP' stand for?", o: ["HyperText Transfer Protocol","High Tech Transfer Protocol","Home Tool Transfer Protocol","HyperText Transmission Port"], a: 0, c:"Tech"},
 { q:"Who is the co-founder of Apple Inc.?", o: ["Bill Gates","Steve Jobs","Elon Musk","Mark Zuckerberg"], a: 1, c:"Tech"},
 { q:"In what year was the first iPhone released?", o: ["2005","2006","2007","2008"], a: 2, c:"Tech"},
 { q:"What programming language is known as the 'language of the web'?", o: ["Python","C++","JavaScript","Java"], a: 2, c:"Tech"},
 { q:"What does 'AI' stand for?", o: ["Automated Intelligence","Artificial Intelligence","Advanced Integration","Algorithmic Interface"], a: 1, c:"Tech"},
 { q:"How many sides does a hexagon have?", o: ["5","6","7","8"], a: 1, c:"General"},
 { q:"What is the main ingredient in guacamole?", o: ["Tomato","Onion","Avocado","Pepper"], a: 2, c:"General"},
 { q:"Which animal is known as the 'King of the Jungle'?", o: ["Tiger","Elephant","Lion","Bear"], a: 2, c:"General"},
 { q:"What color do you get when you mix red and white?", o: ["Orange","Purple","Pink","Brown"], a: 2, c:"General"},
 { q:"How many days are in a leap year?", o: ["364","365","366","367"], a: 2, c:"General"}
];

export default function TriviaClient() {
 const [currentIdx, setCurrentIdx] = useState(0);
 const [score, setScore] = useState(0);
 const [selected, setSelected] = useState<number | null>(null);
 const [finished, setFinished] = useState(false);

 const currentQ = QUESTIONS[currentIdx];

 const handleAnswer = (idx: number) => {
 if (selected !== null) return;
 setSelected(idx);
 
 if (idx === currentQ.a) {
 setScore(s => s + 1);
 toast.success("Correct! 🎉");
 } else {
 toast.error(`Wrong! The answer was: ${currentQ.o[currentQ.a]}`);
 }

 setTimeout(() => {
 if (currentIdx < QUESTIONS.length - 1) {
 setCurrentIdx(i => i + 1);
 setSelected(null);
 } else {
 setFinished(true);
 }
 }, 1500);
 };

 const restart = () => {
 setCurrentIdx(0);
 setScore(0);
 setSelected(null);
 setFinished(false);
 };

 if (finished) {
 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={Brain} title="Trivia Quiz"description="Test your general knowledge."/>
 <GlassCard>
 <CardContent className="p-8 text-center space-y-4">
 <h2 className="text-3xl font-bold">Quiz Complete!</h2>
 <p className="text-xl">You scored <span className="text-primary font-bold">{score}</span> out of {QUESTIONS.length}</p>
 <Button onClick={restart} className="gap-2"><RotateCcw className="w-4 h-4"/> Play Again</Button>
 </CardContent>
 </GlassCard>
 </div>
 );
 }

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader 
 icon={Brain} 
 title="Trivia Quiz"
 description="Test your knowledge across science, history, tech, and more."
 />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center">
 <CardTitle className={titleClass}>
 <Brain className="w-4 h-4 text-primary"/> Question {currentIdx + 1}/{QUESTIONS.length}
 </CardTitle>
 <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">{currentQ.c}</span>
 </div>
 <div className="text-sm text-muted-foreground mt-2">Score: {score}</div>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 <h3 className="text-xl font-semibold text-center">{currentQ.q}</h3>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {currentQ.o.map((opt, i) => {
 const isCorrect = i === currentQ.a;
 const isSelected = i === selected;
 let variant:"default"|"destructive"|"outline"|"secondary"="outline";
 
 if (selected !== null) {
 if (isCorrect) variant ="default";
 else if (isSelected) variant ="destructive";
 }

 return (
 <Button
 key={i}
 onClick={() => handleAnswer(i)}
 variant={variant}
 className={`h-16 text-base justify-start px-4 ${
 selected !== null && isCorrect ?"bg-green-600 hover:bg-green-700 text-white":""
 }`}
 disabled={selected !== null}
 >
 {opt}
 </Button>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Read Question", description:"Review the trivia question and its category.", icon: Brain },
 { step:"02", title:"Select Answer", description:"Click the button that you believe is the correct answer.", icon: Brain },
 { step:"03", title:"Get Feedback", description:"See instantly if you were right, then move to the next question.", icon: Brain }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides 
 features={[
 { icon: Brain, title:"Multiple Categories", description:"Questions span Science, History, Geography, Entertainment, and Tech."},
 { icon: Brain, title:"Instant Feedback", description:"Buttons turn green for correct and red for incorrect answers."},
 { icon: Brain, title:"Score Tracking", description:"Keeps a running total of your correct answers."},
 { icon: Brain, title:"30 Unique Questions", description:"A robust database of trivia to test your knowledge."}
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Trivia games are an excellent way to exercise your brain and recall facts across a variety of disciplines. Regular trivia practice can help improve memory and cognitive flexibility.</p>
 <p>This quiz features a curated selection of 30 questions designed to challenge both generalists and specialists. Good luck!</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion 
 faqs={[
 { question:"Are the questions randomized?", answer:"Currently, the questions appear in a fixed sequence, ensuring everyone gets the same quiz experience."},
 { question:"Can I skip a question?", answer:"No, you must select an answer to proceed. Incorrect answers are recorded as zero points."},
 { question:"Is there a time limit?", answer:"No, you can take as much time as you need to think about each question."}
 ]} 
 />

 <RelatedTools currentToolUrl="/tools/fun/trivia" max={6} />
 </div>
 );
}
