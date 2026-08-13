"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { HelpCircle, Shuffle } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const questions = [
 { a:"Be able to fly", b:"Be able to read minds"},
 { a:"Live in the past", b:"Live in the future"},
 { a:"Have unlimited money", b:"Have unlimited knowledge"},
 { a:"Speak every language", b:"Play every instrument"},
 { a:"Be invisible", b:"Be able to teleport"},
 { a:"Never use social media again", b:"Never watch a movie again"},
 { a:"Always be hot", b:"Always be cold"},
 { a:"Have a rewind button for your life", b:"Have a pause button for your life"},
 { a:"Be a famous musician", b:"Be a famous scientist"},
 { a:"Live without music", b:"Live without TV"},
 { a:"Have super strength", b:"Have super speed"},
 { a:"Be the funniest person in the room", b:"Be the smartest person in the room"},
 { a:"Eat only pizza for a year", b:"Eat only tacos for a year"},
 { a:"Have a personal chef", b:"Have a personal masseuse"},
 { a:"Never wait in line again", b:"Never hit a red light again"},
 { a:"Know how you die", b:"Know when you die"},
 { a:"Be an unknown superhero", b:"Be a famous villain"},
 { a:"Live in a treehouse", b:"Live in a submarine"},
 { a:"Have no sense of taste", b:"Have no sense of smell"},
 { a:"Always whisper", b:"Always shout"},
 { a:"Be able to talk to animals", b:"Speak all human languages fluently"},
 { a:"Fight 100 duck-sized horses", b:"Fight 1 horse-sized duck"},
 { a:"Have free WiFi everywhere", b:"Have free coffee everywhere"},
 { a:"Live to be 200 years old", b:"Live to be 100 but with perfect health"},
 { a:"Be able to control fire", b:"Be able to control water"},
 { a:"Never do laundry again", b:"Never wash dishes again"},
 { a:"Have a photographic memory", b:"Be able to forget anything you want"},
 { a:"Be stranded on a desert island", b:"Be stranded in deep space"},
 { a:"Always feel slightly tired", b:"Always feel slightly hungry"},
 { a:"Have a dragon as a pet", b:"Have a phoenix as a pet"}
];

export default function WouldYouRatherClient() {
 const [currentIdx, setCurrentIdx] = useState(0);
 const [votes, setVotes] = useState<{ a: number; b: number }>({ a: 0, b: 0 });
 const [chosen, setChosen] = useState<"a"|"b"| null>(null);
 const [pool, setPool] = useState<number[]>([]);

 useEffect(() => {
 const initialPool = Array.from({ length: questions.length }, (_, i) => i);
 for (let i = initialPool.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [initialPool[i], initialPool[j]] = [initialPool[j], initialPool[i]];
 }
 setPool(initialPool);
 setCurrentIdx(initialPool[0]);
 }, []);

 const nextQuestion = () => {
 setChosen(null);
 setVotes({ a: 0, b: 0 });
 setPool(prev => {
 const newPool = [...prev];
 newPool.push(newPool.shift()!);
 setCurrentIdx(newPool[0]);
 return newPool;
 });
 };

 const vote = (side:"a"|"b") => {
 if (chosen) return;
 setChosen(side);
 const aVotes = Math.floor(Math.random() * 500) + 100;
 const bVotes = Math.floor(Math.random() * 500) + 100;
 setVotes({ a: aVotes, b: bVotes });
 };

 const totalVotes = votes.a + votes.b;
 const aPercent = totalVotes > 0 ? (votes.a / totalVotes) * 100 : 50;
 const bPercent = totalVotes > 0 ? (votes.b / totalVotes) * 100 : 50;
 const q = questions[currentIdx] || questions[0];

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader icon={HelpCircle} title="Would You Rather Generator"description="Spark fun conversations and debates with randomized 'Would You Rather' scenarios."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Make Your Choice</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <Button 
 variant={chosen ==="a"?"default":"outline"} 
 className={`h-40 text-xl font-bold transition-all ${!chosen ?"hover:scale-105":""}`}
 onClick={() => vote("a")}
 >
 {q.a}
 </Button>
 <Button 
 variant={chosen ==="b"?"default":"outline"} 
 className={`h-40 text-xl font-bold transition-all ${!chosen ?"hover:scale-105":""}`}
 onClick={() => vote("b")}
 >
 {q.b}
 </Button>
 </div>

 {chosen && (
 <div className="space-y-4 mt-6 animate-in fade-in duration-500">
 <div className="flex justify-between text-sm font-medium">
 <span className={chosen ==="a"?"text-primary font-bold":"text-muted-foreground"}>
 {q.a} ({aPercent.toFixed(0)}%)
 </span>
 <span className={chosen ==="b"?"text-primary font-bold":"text-muted-foreground"}>
 {q.b} ({bPercent.toFixed(0)}%)
 </span>
 </div>
 <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
 <div className="h-full bg-primary"style={{ width: `${aPercent}%` }} />
 <div className="h-full bg-secondary"style={{ width: `${bPercent}%` }} />
 </div>
 <p className="text-center text-sm text-muted-foreground">{totalVotes.toLocaleString()} simulated community votes</p>
 </div>
 )}

 <div className="flex justify-center mt-6">
 <Button onClick={nextQuestion} size="lg"className="px-8">
 <Shuffle className="w-4 h-4 mr-2"/> Next Question
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Read Prompt", description:"Review the two challenging or amusing scenarios presented to you.", icon: HelpCircle },
 { step:"02", title:"Make Choice", description:"Click the option you would prefer to experience or endure.", icon: HelpCircle },
 { step:"03", title:"See Results", description:"Discover how the simulated community voted and move on to the next dilemma.", icon: HelpCircle }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: HelpCircle, title:"Curated Questions", description:"A hand-picked list of engaging scenarios designed to provoke thought and laughter."},
 { icon: HelpCircle, title:"No Repeats", description:"The algorithm shuffles the deck so you won't see the same question twice until the cycle resets."},
 { icon: HelpCircle, title:"Simulated Polls", description:"View a randomized statistical breakdown of how others might vote on the same dilemma."},
 { icon: HelpCircle, title:"Party Friendly", description:"Perfect for road trips, parties, or icebreakers where conversation needs a spark."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>"Would You Rather"is a classic conversational game that reveals personality traits, priorities, and senses of humor. It forces players to weigh two often absurd or difficult options against one another.</p>
 <p>Our generator cycles through a curated database of questions, ensuring that your game night or road trip never runs out of fresh material. The randomizer prevents predictability, keeping players on their toes.</p>
 <p>After making your choice, the tool reveals a simulated community consensus, adding a layer of social comparison and sparking debates about why the majority chose a particular path.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Are the community votes real?", answer:"To maintain privacy and avoid requiring a backend database, the community votes shown are mathematically simulated to mimic realistic distributions for entertainment purposes."},
 { question:"Can I submit my own questions?", answer:"Currently, the tool uses a fixed, curated list to ensure quality and appropriateness for all ages."},
 { question:"Will the questions eventually repeat?", answer:"Yes, once you have cycled through all 30 questions in the deck, the randomizer will reshuffle and begin the cycle anew."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/would-you-rather" max={6} />
 </div>
 );
}
