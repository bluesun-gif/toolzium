"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Shuffle, RotateCcw } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const data = {
  Clean: {
    truths: ["What is your most embarrassing childhood memory?", "What is the last lie you told?", "If you could have any superpower, what would it be?", "What is your biggest fear?", "Who was your first crush?", "What is a secret you've never told anyone?", "If you won the lottery, what's the first thing you'd buy?", "What is your most used emoji?", "What's the worst gift you've ever received?", "If you could live in any fictional universe, which would it be?", "What is your guilty pleasure TV show?", "What's the longest you've gone without showering?", "If you could swap lives with someone for a day, who?", "What's a weird food combination you enjoy?", "What's the most childish thing you still do?", "What's your biggest pet peeve?", "What's the last thing you searched for on your phone?", "If you had to eat one meal for the rest of your life, what?", "What's your most irrational fear?", "What's the best compliment you've ever received?"],
    dares: ["Do your best impression of a celebrity.", "Sing the chorus of your favorite song.", "Let the group post a status on your social media.", "Do 20 pushups.", "Speak in an accent for the next 3 rounds.", "Let someone draw on your face with a pen.", "Do a dramatic reading of a text message.", "Hold an ice cube in your hand until it melts.", "Let the group pick a new profile picture for you.", "Do your best dance move.", "Talk in a robot voice for the next 5 minutes.", "Let someone style your hair however they want.", "Attempt to juggle 3 items.", "Do a plank for 60 seconds.", "Let someone tickle you for 30 seconds.", "Attempt to breakdance.", "Eat a spoonful of a condiment of the group's choice.", "Do your best model walk across the room.", "Speak without closing your mouth for 2 rounds.", "Attempt to lick your elbow."]
  },
  Funny: {
    truths: ["What's the weirdest thing you've done when home alone?", "Have you ever peed in a pool?", "What's the most embarrassing thing you've done to get a crush's attention?", "What's the worst hairstyle you've ever had?", "Have you ever blamed a fart on a pet?", "What's the silliest reason you've cried?", "What's a conspiracy theory you secretly believe?", "Have you ever walked into a glass door?", "What's the weirdest thing you find attractive?", "What's the most ridiculous thing you've bought online?", "Have you ever pretended to not see someone to avoid talking?", "What's your worst fashion mistake?", "Have you ever laughed at a totally inappropriate time?", "What's a weird habit you have?", "Have you ever accidentally called your teacher Mom/Dad?", "What's the most embarrassing thing in your search history?", "Have you ever worn clothes inside out all day?", "What's the dumbest thing you've done on a dare?", "Have you ever tried to impress someone and failed miserably?", "What's the funniest dream you've ever had?"],
    dares: ["Do an impression of a chicken laying an egg.", "Attempt to breakdance for 30 seconds.", "Let the group wrap you in toilet paper like a mummy.", "Talk to a wall for 2 minutes as if it's a person.", "Do your best belly flop onto a bed.", "Attempt to juggle shoes.", "Let someone paint your nails (or pretend to).", "Do a dramatic soap opera scene.", "Sing everything you say for the next 3 turns.", "Attempt to do the worm.", "Walk like a crab across the room.", "Let the group give you a nickname for the rest of the night.", "Do an impression of a monkey.", "Attempt to do a handstand against a wall.", "Speak in slow motion for the next round.", "Try to lick your nose in front of a mirror.", "Do an impression of a baby being born.", "Attempt to moonwalk.", "Let someone tickle you until you say stop.", "Do a dramatic death scene."]
  },
  Spicy: {
    truths: ["What's your biggest turn-off?", "Have you ever cheated on a test or at a game?", "What's the most trouble you've ever been in?", "Have you ever stolen anything?", "What's a rule you always break?", "Have you ever lied to get out of plans?", "Who in this room would you least want to be stuck on an island with?", "What's the most illegal thing you've done?", "Have you ever spread a rumor?", "What's the worst date you've ever been on?", "Have you ever ghosted someone? Why?", "What's a secret you're keeping from your parents?", "Have you ever eavesdropped on a private conversation?", "What's the most embarrassing thing in your camera roll?", "Have you ever blamed someone else for your mistake?", "What's the most awkward text you've accidentally sent?", "Have you ever pretended to be sick to skip work/school?", "What's the biggest misconception people have about you?", "Have you ever snooped through someone's phone?", "What's a dealbreaker for you in a relationship?"],
    dares: ["Text your crush 'I miss you' (or a random contact).", "Let the group read the last 5 texts you sent.", "Do a seductive dance for a chair.", "Let someone go through your photo gallery for 1 minute.", "Post an ugly selfie on your story.", "Call a friend and sing Happy Birthday to them.", "Let the group compose a text and send it from your phone.", "Do 50 squats while singing a song.", "Attempt to flirt with an inanimate object.", "Let someone style you using only items in the room.", "Do an impression of the person to your right.", "Eat a raw clove of garlic.", "Let the group look through your YouTube history.", "Do a dramatic reading of your most recent email.", "Attempt to breakdance to slow music.", "Let someone draw a mustache on you that lasts the night.", "Do your best impression of a siren.", "Attempt to chug a glass of water in 5 seconds.", "Let the group pick a song and you must perform it.", "Do a plank while reciting the alphabet backwards."]
  }
};
type Category = keyof typeof data;
export default function TruthOrDareClient() {
  const [category, setCategory] = useState<Category>("Clean");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [type, setType] = useState<"Truth" | "Dare" | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const getRandomItem = (t: "Truth" | "Dare") => {
    const pool = t === "Truth" ? data[category].truths : data[category].dares;
    const item = pool[Math.floor(Math.random() * pool.length)];
    setCurrentItem(item);
    setType(t);
    setHistory(prev => [`${t}: ${item}`, ...prev].slice(0, 10));
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Flame} title="Truth or Dare Generator" description="Spice up your party with randomized truths and dares across multiple intensity categories." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Game Settings</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-wrap gap-2 justify-center">
 {(["Clean", "Funny", "Spicy"] as Category[]).map(cat => <Button key={cat} variant={category === cat ? "default" : "outline"} onClick={() => setCategory(cat)}>
 {cat}
 </Button>)}
 </div>

 <div className="grid grid-cols-2 gap-4 mt-6">
 <Button onClick={() => getRandomItem("Truth")} size="lg" className="h-24 text-2xl font-bold bg-blue-600 hover:bg-blue-700 text-primary-foreground">
 Truth
 </Button>
 <Button onClick={() => getRandomItem("Dare")} size="lg" className="h-24 text-2xl font-bold bg-red-600 hover:bg-red-700 text-primary-foreground">
 Dare
 </Button>
 </div>

 {currentItem && <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center space-y-2 mt-6 animate-in fade-in zoom-in duration-300">
 <div className={`text-xs font-bold uppercase tracking-wider ${type === "Truth" ? "text-primary" : "text-red-500"}`}>
 {type}
 </div>
 <div className="text-2xl font-bold">{currentItem}</div>
 <Button variant="ghost" size="sm" onClick={() => getRandomItem(type!)} className="mt-2">
 <Shuffle className="w-4 h-4 mr-2" /> Reroll
 </Button>
 </div>}

 {history.length > 0 && <div className="mt-8 border-t border-border/50 pt-4 space-y-2">
 <div className="flex justify-between items-center mb-2">
 <h3 className="text-sm font-semibold">Recent History</h3>
 <Button variant="ghost" size="sm" onClick={() => setHistory([])}>
 <RotateCcw className="w-4 h-4" />
 </Button>
 </div>
 <div className="max-h-40 overflow-y-auto space-y-1">
 {history.map((h, i) => <div key={i} className="text-sm p-2 bg-background/50 rounded border border-border/30">
 {h}
 </div>)}
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Pick Category",
        description: "Choose the intensity level: Clean for families, Funny for friends, or Spicy for adults.",
        icon: Flame
      }, {
        step: "02",
        title: "Choose Fate",
        description: "Select either Truth to answer a question, or Dare to perform a challenge.",
        icon: Flame
      }, {
        step: "03",
        title: "Perform & Pass",
        description: "Complete the action, then pass the device to the next player and track your history.",
        icon: Flame
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: Flame,
        title: "Multiple Categories",
        description: "Tailor the game to your audience with Clean, Funny, and Spicy content libraries."
      }, {
        icon: Flame,
        title: "Massive Database",
        description: "Includes over 120 unique prompts to ensure the game stays fresh for hours."
      }, {
        icon: Flame,
        title: "Session History",
        description: "Keep track of what has already been asked to avoid repeating questions."
      }, {
        icon: Flame,
        title: "Instant Reroll",
        description: "Don't like your prompt? Hit the shuffle button to instantly draw a new one."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Truth or Dare is the ultimate party game for breaking the ice and creating memorable moments. Our digital generator removes the hassle of thinking up new challenges on the spot, keeping the momentum of your party going strong.</p>
 <p>With distinct categories, you can easily adapt the game for a children's birthday party, a casual hangout with friends, or an adult gathering. The extensive database ensures you won't run out of material.</p>
 <p>The local history tracker is especially useful for large groups, ensuring that the same hilarious dare or probing truth isn't accidentally repeated during the same session.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "How many questions and dares are included?",
        answer: "There are 20 truths and 20 dares in each of the 3 categories, totaling 120 unique prompts."
      }, {
        question: "Is the 'Spicy' category safe for work?",
        answer: "No, the 'Spicy' category contains mature themes and is intended strictly for adult gatherings."
      }, {
        question: "Can I play this solo?",
        answer: "While designed for groups, it can be a fun personal challenge or journaling prompt tool for solo users."
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/truth-or-dare" max={6} />
 </div></div>;
}