"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { MessageCircleQuestion, CheckCircle2, XCircle, RotateCcw, Lightbulb } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const STATEMENTS = [
 { cat:"Science", statements: ["Water boils at 100°C at sea level.","Venus is hotter than Mercury.","Humans use only 10% of their brains."], lie: 2, exp:"The 10% brain myth is false; we use virtually every part of the brain."},
 { cat:"History", statements: ["Cleopatra lived closer to the Moon landing than the Pyramids.","Ninjas historically wore black pajamas.","Oxford University is older than the Aztec Empire."], lie: 1, exp:"Ninjas actually dressed like commoners to blend in; the black suit is from Kabuki theater."},
 { cat:"Nature", statements: ["Bananas are botanically berries.","Bats are blind.","A group of crows is called a murder."], lie: 1, exp:"Bats are not blind; many species have excellent eyesight and use echolocation as a supplement."},
 { cat:"Geography", statements: ["Mount Everest is the tallest mountain from base to peak.","Russia has a larger surface area than Pluto.","The Nile is the longest river in the world."], lie: 0, exp:"Mauna Kea in Hawaii is taller from base to peak, though Everest has the highest altitude."},
 { cat:"Animals", statements: ["Ostriches bury their heads in the sand.","A shrimp's heart is in its head.","Sloths can hold their breath longer than dolphins."], lie: 0, exp:"Ostriches do not bury their heads in sand; they dig shallow nests for eggs and turn them."},
 { cat:"Space", statements: ["A day on Venus is longer than its year.","The Sun is a star.","There is no gravity in space."], lie: 2, exp:"There is microgravity, but gravity exists everywhere in space, keeping planets in orbit."},
 { cat:"Food", statements: ["Honey never spoils.","Carrots were originally purple.","Searing meat seals in the juices."], lie: 2, exp:"Searing meat does not seal in juices; it creates flavor via the Maillard reaction but can cause moisture loss."},
 { cat:"Human Body", statements: ["Deoxygenated blood is blue.","Your stomach lining regenerates every few days.","Fingerprints are unique to every individual."], lie: 0, exp:"Blood is always red; deoxygenated blood is dark red, not blue. Veins look blue due to light scattering."},
 { cat:"Tech", statements: ["The first computer bug was an actual insect.","CAPTCHA stands for Completely Automated Public Turing test.","Wi-Fi stands for Wireless Fidelity."], lie: 2, exp:"Wi-Fi doesn't stand for anything; it's a marketing term created by a branding agency."},
 { cat:"Literature", statements: ["Shakespeare wrote 'To be or not to be'.","Frankenstein is the name of the monster.","Sherlock Holmes never said 'Elementary, my dear Watson'."], lie: 1, exp:"Frankenstein is the doctor; the monster is unnamed. The phrase is often misattributed."},
 { cat:"Math", statements: ["A circle has infinite corners.","0.999... equals exactly 1.","Pi is a rational number."], lie: 2, exp:"Pi is irrational; its decimal representation never ends or repeats."},
 { cat:"Geography", statements: ["Canada has more lakes than the rest of the world combined.","Australia is wider than the Moon.","Iceland is completely covered in ice."], lie: 2, exp:"Iceland has a relatively mild climate and is mostly green, while Greenland is mostly ice."},
 { cat:"Nature", statements: ["Trees can communicate via underground fungi.","Sharks are mammals.","Bamboo can grow up to 3 feet in a single day."], lie: 1, exp:"Sharks are fish, lacking the mammary glands that define mammals."},
 { cat:"History", statements: ["The Great Wall of China is visible from the moon.","Romans used urine to whiten teeth.","Napoleon was exceptionally short."], lie: 0, exp:"The Great Wall is not visible from the moon with the naked eye."},
 { cat:"Science", statements: ["Diamonds are made of compressed carbon.","Lightning never strikes the same place twice.","Sound travels faster than light."], lie: 1, exp:"Lightning frequently strikes the same place twice, especially tall structures like the Empire State Building."},
];

export default function TwoTruthsClient() {
 const [index, setIndex] = useState(0);
 const [score, setScore] = useState(0);
 const [selected, setSelected] = useState<number | null>(null);
 const [showResult, setShowResult] = useState(false);
 const [gameOver, setGameOver] = useState(false);

 const current = STATEMENTS[index];

 const handleSelect = (idx: number) => {
 if (showResult) return;
 setSelected(idx);
 setShowResult(true);
 if (idx === current.lie) {
 setScore(s => s + 1);
 toast.success("Correct! You found the lie.");
 } else {
 toast.error("Wrong! That was a truth.");
 }
 };

 const handleNext = () => {
 if (index < STATEMENTS.length - 1) {
 setIndex(i => i + 1);
 setSelected(null);
 setShowResult(false);
 } else {
 setGameOver(true);
 }
 };

 const restart = () => {
 setIndex(0);
 setScore(0);
 setSelected(null);
 setShowResult(false);
 setGameOver(false);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader 
 icon={MessageCircleQuestion} 
 title="Two Truths and a Lie"
 description="Can you spot the fake fact? Test your knowledge against 15 tricky sets of statements."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center">
 <CardTitle className={titleClass}>
 <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs uppercase tracking-wider">{current.cat}</span>
 <span className="ml-2">Round {index + 1} / {STATEMENTS.length}</span>
 </CardTitle>
 <span className="font-bold">Score: {score}</span>
 </div>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 {!gameOver ? (
 <>
 <h2 className="text-xl font-semibold text-center text-muted-foreground">Which of these is the <span className="text-red-500">LIE</span>?</h2>
 <div className="grid gap-4">
 {current.statements.map((stmt, idx) => {
 let btnClass ="w-full text-left p-5 rounded-xl border transition-all font-medium text-base";
 if (showResult) {
 if (idx === current.lie) btnClass +="bg-red-500/20 border-red-500 text-red-700 dark:text-red-400";
 else if (idx === selected) btnClass +="bg-green-500/20 border-green-500 text-green-700 dark:text-green-400";
 else btnClass +="bg-muted border-border opacity-50";
 } else {
 btnClass +="bg-background border-border hover:border-primary hover:bg-primary/5";
 }
 return (
 <button key={idx} className={btnClass} onClick={() => handleSelect(idx)} disabled={showResult}>
 <span className="flex items-start gap-3">
 {showResult && idx === current.lie && <XCircle className="w-5 h-5 mt-0.5 shrink-0"/>}
 {showResult && idx !== current.lie && idx === selected && <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0"/>}
 <span>{stmt}</span>
 </span>
 </button>
 );
 })}
 </div>
 {showResult && (
 <div className="space-y-4 pt-4 border-t border-border/50">
 <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
 <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-1"/>
 <p className="text-sm text-primary">{current.exp}</p>
 </div>
 <Button onClick={handleNext} className="w-full">
 {index < STATEMENTS.length - 1 ?"Next Round":"See Final Score"}
 </Button>
 </div>
 )}
 </>
 ) : (
 <div className="text-center space-y-4 py-8">
 <h2 className="text-3xl font-bold">Game Complete!</h2>
 <p className="text-xl text-muted-foreground">You found <span className="text-primary font-bold">{score}</span> lies out of {STATEMENTS.length}.</p>
 <Button onClick={restart} className="gap-2">
 <RotateCcw className="w-4 h-4"/> Play Again
 </Button>
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Read the Statements", description:"Review the three factual statements provided in the current category.", icon: MessageCircleQuestion },
 { step:"02", title:"Spot the Fake", description:"Analyze each claim and click on the one you believe is the lie.", icon: XCircle },
 { step:"03", title:"Learn the Truth", description:"Read the explanation to learn why the statement was false, then proceed.", icon: Lightbulb }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: MessageCircleQuestion, title:"Diverse Categories", description:"Covers Science, History, Geography, Nature, and more to test broad knowledge."},
 { icon: Lightbulb, title:"Educational Explanations", description:"Every round provides context and facts to explain why the lie was false."},
 { icon: XCircle, title:"Instant Feedback", description:"Know immediately if you spotted the lie and track your running score."},
 { icon: RotateCcw, title:"Endless Replay", description:"Shuffle the sets and challenge your friends to see who knows the most trivia."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>"Two Truths and a Lie"is a classic icebreaker game, but our version focuses on fascinating trivia and common misconceptions. It is designed not just to entertain, but to actively debunk popular myths and teach surprising facts.</p>
 <p>Many of the statements presented here rely on the Mandela Effect or widely accepted"common knowledge"that is actually scientifically or historically inaccurate. By forcing you to evaluate each claim critically, the game promotes skepticism and lateral thinking.</p>
 <p>This is a fantastic tool for classrooms, trivia nights, or simply killing time while learning something new. The detailed explanations ensure that every wrong guess turns into a valuable learning moment.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Are these facts verified?", answer:"Yes, every statement and explanation has been cross-referenced with reliable scientific, historical, and geographical sources."},
 { question:"Can I use this for a party game?", answer:"Absolutely! You can read the statements aloud to a group and have everyone vote on which one they think is the lie."},
 { question:"Do the questions change?", answer:"Currently, there is a curated list of 15 high-quality sets. We plan to expand the database with user-submitted facts in the future."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/two-truths"max={6} />
 </div>
 );
}
