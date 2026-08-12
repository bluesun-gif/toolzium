"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { PawPrint, CheckCircle2, XCircle, RotateCcw } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const QUESTIONS = [
 { q:"What is the fastest land animal?", options: ["Cheetah","Lion","Gazelle","Ostrich"], answer: 0 },
 { q:"Which animal is known as the 'King of the Jungle'?", options: ["Tiger","Lion","Elephant","Gorilla"], answer: 1 },
 { q:"What is the largest mammal in the world?", options: ["African Elephant","Blue Whale","Giraffe","Hippo"], answer: 1 },
 { q:"Which bird is known for its ability to mimic human speech?", options: ["Eagle","Parrot","Owl","Penguin"], answer: 1 },
 { q:"What animal has the longest neck?", options: ["Camel","Ostrich","Giraffe","Alpaca"], answer: 2 },
 { q:"Which animal is known to eat bamboo almost exclusively?", options: ["Koala","Panda","Sloth","Gorilla"], answer: 1 },
 { q:"What bird wears a 'tuxedo' and cannot fly?", options: ["Puffin","Ostrich","Penguin","Kiwi"], answer: 2 },
 { q:"Which reptile can change its color to blend in?", options: ["Iguana","Chameleon","Gecko","Crocodile"], answer: 1 },
 { q:"What is the largest primate?", options: ["Orangutan","Chimpanzee","Gorilla","Baboon"], answer: 2 },
 { q:"Which sea creature has eight arms?", options: ["Squid","Jellyfish","Octopus","Starfish"], answer: 2 },
 { q:"What snake is known for its hood?", options: ["Python","Cobra","Viper","Anaconda"], answer: 1 },
 { q:"Which Australian animal carries its young in a pouch?", options: ["Koala","Kangaroo","Wombat","Platypus"], answer: 1 },
 { q:"What animal is known for moving very slowly and hanging upside down?", options: ["Sloth","Koala","Snail","Tortoise"], answer: 0 },
 { q:"Which animal has a trunk?", options: ["Rhinoceros","Hippo","Elephant","Tapir"], answer: 2 },
 { q:"What animal looks like a horse with stripes?", options: ["Okapi","Zebra","Quagga","Donkey"], answer: 1 },
 { q:"Which animal has a horn on its nose?", options: ["Elephant","Rhinoceros","Triceratops","Narwhal"], answer: 1 },
 { q:"What insect is known for making honey?", options: ["Wasp","Ant","Bee","Fly"], answer: 2 },
 { q:"Which arachnid spins webs to catch prey?", options: ["Scorpion","Tick","Spider","Mite"], answer: 2 },
 { q:"What insect is notorious for biting and spreading disease?", options: ["Mosquito","Butterfly","Beetle","Grasshopper"], answer: 0 },
 { q:"Which insect starts as a caterpillar?", options: ["Dragonfly","Butterfly","Ladybug","Cricket"], answer: 1 },
 { q:"What is a group of lions called?", options: ["Pack","Herd","Pride","School"], answer: 2 },
 { q:"Which animal produces ink to escape predators?", options: ["Octopus","Squid","Cuttlefish","All of the above"], answer: 3 },
];

export default function AnimalQuizClient() {
 const [currentQ, setCurrentQ] = useState(0);
 const [score, setScore] = useState(0);
 const [selected, setSelected] = useState<number | null>(null);
 const [showResult, setShowResult] = useState(false);
 const [gameOver, setGameOver] = useState(false);

 const question = QUESTIONS[currentQ];

 const handleSelect = (idx: number) => {
 if (showResult) return;
 setSelected(idx);
 setShowResult(true);
 if (idx === question.answer) {
 setScore(score + 1);
 toast.success("Correct!");
 } else {
 toast.error(`Wrong! The answer was ${question.options[question.answer]}.`);
 }
 };

 const handleNext = () => {
 if (currentQ < QUESTIONS.length - 1) {
 setCurrentQ(currentQ + 1);
 setSelected(null);
 setShowResult(false);
 } else {
 setGameOver(true);
 }
 };

 const restart = () => {
 setCurrentQ(0);
 setScore(0);
 setSelected(null);
 setShowResult(false);
 setGameOver(false);
 };

 const progress = useMemo(() => ((currentQ + (showResult ? 1 : 0)) / QUESTIONS.length) * 100, [currentQ, showResult]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader 
 icon={PawPrint} 
 title="Animal Quiz"
 description="Test your wildlife knowledge with this fun, interactive 20+ question animal trivia game."
 />

 {!gameOver ? (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
 <span className="ml-auto text-primary">Score: {score}</span>
 </CardTitle>
 <div className="w-full bg-muted rounded-full h-2 mt-3">
 <div className="bg-primary h-2 rounded-full transition-all"style={{ width: `${progress}%` }} />
 </div>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 <h2 className="text-xl font-bold text-foreground">{question.q}</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {question.options.map((opt, idx) => {
 let btnClass ="w-full text-left p-4 rounded-xl border transition-all font-medium";
 if (showResult) {
 if (idx === question.answer) btnClass +="bg-green-500/20 border-green-500 text-green-700 dark:text-green-400";
 else if (idx === selected) btnClass +="bg-red-500/20 border-red-500 text-red-700 dark:text-red-400";
 else btnClass +="bg-muted border-border text-muted-foreground opacity-50";
 } else {
 btnClass +="bg-background border-border hover:border-primary hover:bg-primary/5";
 }
 return (
 <button key={idx} className={btnClass} onClick={() => handleSelect(idx)} disabled={showResult}>
 {opt}
 </button>
 );
 })}
 </div>
 {showResult && (
 <Button onClick={handleNext} className="w-full">
 {currentQ < QUESTIONS.length - 1 ?"Next Question":"Finish Quiz"}
 </Button>
 )}
 </CardContent>
 </Card>
 ) : (
 <Card className={cardClass}>
 <CardContent className="p-8 text-center space-y-6">
 <div className="flex justify-center">
 {score > QUESTIONS.length / 2 ? <CheckCircle2 className="w-16 h-16 text-green-500"/> : <XCircle className="w-16 h-16 text-red-500"/>}
 </div>
 <h2 className="text-3xl font-bold">Quiz Complete!</h2>
 <p className="text-xl text-muted-foreground">You scored <span className="text-primary font-bold">{score}</span> out of {QUESTIONS.length}</p>
 <Button onClick={restart} className="gap-2">
 <RotateCcw className="w-4 h-4"/> Play Again
 </Button>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Read the Question", description:"Read the wildlife trivia question presented on the screen.", icon: PawPrint },
 { step:"02", title:"Select an Answer", description:"Click on one of the four multiple-choice options you think is correct.", icon: CheckCircle2 },
 { step:"03", title:"Track Your Score", description:"See immediate feedback and track your progress to the final results.", icon: RotateCcw }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: PawPrint, title:"20+ Questions", description:"A vast library of animal trivia covering mammals, birds, reptiles, and insects."},
 { icon: CheckCircle2, title:"Instant Feedback", description:"Know immediately if you are right or wrong, and learn the correct answer."},
 { icon: RotateCcw, title:"Score Tracking", description:"Keep track of your correct answers and see your final score at the end."},
 { icon: XCircle, title:"Play Again", description:"Restart the quiz anytime to improve your score and test your memory."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Welcome to the ultimate Animal Quiz! This fun, interactive game is designed to test your knowledge of the animal kingdom. From the fastest land animals to the deepest sea creatures, this quiz covers a wide range of wildlife trivia.</p>
 <p>Whether you are a student looking to learn more about biology, a teacher seeking a fun classroom activity, or just a nature enthusiast, this quiz provides an engaging way to challenge yourself. The multiple-choice format makes it accessible for all ages.</p>
 <p>Because the game runs entirely in your browser, no data is sent to our servers, ensuring a completely private and secure gaming experience. Gather your friends and family to see who knows the most about the wild world!</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Is this animal quiz free to play?", answer:"Yes, the Animal Quiz is 100% free with no hidden fees, subscriptions, or sign-ups required."},
 { question:"Do I need an internet connection to play?", answer:"You need an internet connection to load the page initially, but once loaded, the quiz logic runs entirely in your browser."},
 { question:"Can I play this quiz on my mobile phone?", answer:"Absolutely! The interface is fully responsive and optimized for smartphones, tablets, and desktop computers."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/animal-quiz"max={6} />
 </div>
 );
}
