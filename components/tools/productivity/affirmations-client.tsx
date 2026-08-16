"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Switch } from"@/components/ui/switch";
import { Label } from"@/components/ui/label";
import { CopyButton } from"@/components/shared/action-buttons";
import { BookOpen, Heart, Moon, PenLine, Plus, Shuffle, Sparkles, Sun } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

const AFFIRMATIONS = [
"I am capable of achieving my goals.",
"I choose to be happy and grateful today.",
"My potential is limitless.",
"I attract abundance into my life.",
"I am worthy of love and respect.",
"Every day is a new opportunity to grow.",
"I trust my intuition and inner wisdom.",
"I radiate positive energy.",
"My mind is clear, focused, and calm.",
"I am resilient and can overcome any challenge.",
"I forgive myself and others easily.",
"I am proud of who I am becoming.",
"My body is healthy and full of energy.",
"I surround myself with supportive people.",
"I am doing my best, and that is enough.",
];

export function AffirmationsClient() {
 const [currentAffirmations, setCurrentAffirmations] = useState<string[]>([]);
 const [favorites, setFavorites] = useState<string[]>([]);
 const [customInput, setCustomInput] = useState("");
 const [isMorningMode, setIsMorningMode] = useState(true);

 useEffect(() => {
 const savedFavs = localStorage.getItem("affirmationsFavorites");
 if (savedFavs) setFavorites(JSON.parse(savedFavs));
 generateAffirmations();
 }, []);

 const generateAffirmations = () => {
 const shuffled = [...AFFIRMATIONS].sort(() => 0.5 - Math.random());
 setCurrentAffirmations(shuffled.slice(0, 3));
 };

 const toggleFavorite = (aff: string) => {
 let newFavs;
 if (favorites.includes(aff)) {
 newFavs = favorites.filter(f => f !== aff);
 } else {
 newFavs = [...favorites, aff];
 }
 setFavorites(newFavs);
 localStorage.setItem("affirmationsFavorites", JSON.stringify(newFavs));
 };

 const addCustomAffirmation = (e: React.FormEvent) => {
 e.preventDefault();
 if (!customInput.trim()) return;
 const newAff = customInput.trim();
 const newFavs = [...favorites, newAff];
 setFavorites(newFavs);
 localStorage.setItem("affirmationsFavorites", JSON.stringify(newFavs));
 setCustomInput("");
 toast.success("Custom affirmation added to favorites!");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Sun}
 title="Daily Affirmations"
 description="Start or end your day with positive thoughts and self-belief."
 actions={
 <div className="flex items-center gap-2">
 <Sun className={cn("w-4 h-4", isMorningMode ?"text-yellow-500":"text-muted-foreground")} />
 <Switch checked={!isMorningMode} onCheckedChange={(c) => setIsMorningMode(!c)} />
 <Moon className={cn("w-4 h-4", !isMorningMode ?"text-primary":"text-muted-foreground")} />
 </div>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Today's Affirmations</CardTitle>
 <CardDescription>Your daily dose of positivity</CardDescription>
 </div>
 <Button variant="outline"size="icon"onClick={generateAffirmations}>
 <Shuffle className="w-4 h-4"/>
 </Button>
 </CardHeader>
 <CardContent className="space-y-4">
 {currentAffirmations.map((aff, i) => (
 <div 
 key={i} 
 className={cn(
"p-6 rounded-xl shadow-sm text-center relative group transition-all",
 isMorningMode 
 ?"bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/40 dark:to-yellow-900/40 text-orange-900 dark:text-orange-100"
 :"bg-gradient-to-br from-primary to-primary dark:from-primary/40 dark:to-primary/40 text-primary"
 )}
 >
 <p className="text-lg font-medium">{aff}</p>
 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
 <Button 
 variant="ghost"
 size="icon"
 className="h-8 w-8 hover:bg-black/10 dark:hover:bg-background/10"
 onClick={() => toggleFavorite(aff)}
 >
 <Heart className={cn("w-4 h-4", favorites.includes(aff) &&"fill-current text-red-500")} />
 </Button>
 <CopyButton getText={() => aff} label=""className="h-8 w-8 hover:bg-black/10 dark:hover:bg-background/10"/>
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Create Your Own</CardTitle>
 <CardDescription>Add a personal affirmation to your favorites</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={addCustomAffirmation} className="flex gap-2">
 <Input 
 value={customInput}
 onChange={(e) => setCustomInput(e.target.value)}
 placeholder="I am..."
 />
 <Button type="submit">
 <Plus className="w-4 h-4 mr-2"/> Add
 </Button>
 </form>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Favorites</CardTitle>
 <CardDescription>Your saved affirmations ({favorites.length})</CardDescription>
 </CardHeader>
 <CardContent>
 {favorites.length === 0 ? (
 <p className="text-muted-foreground text-sm">No favorites yet. Click the heart icon on an affirmation to save it.</p>
 ) : (
 <ul className="space-y-2 max-h-[300px] overflow-y-auto">
 {favorites.map((fav, i) => (
 <li key={i} className="flex items-center justify-between p-3 bg-muted rounded-md text-sm">
 <span className="flex-1 mr-2">{fav}</span>
 <Button variant="ghost"size="icon"onClick={() => toggleFavorite(fav)} className="h-6 w-6">
 <Heart className="w-4 h-4 fill-current text-red-500"/>
 </Button>
 </li>
 ))}
 </ul>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Theme",
    description:"Pick a focus area.",
    icon: Heart,
  },
{
    step:"02",
    title:"Read",
    description:"Review daily affirmations.",
    icon: BookOpen,
  },
{
    step:"03",
    title:"Reflect",
    description:"Note how you feel.",
    icon: PenLine,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Heart,
    title:"Themes",
    description:"Confidence, calm, focus.",
  },
{
    icon: BookOpen,
    title:"Daily Set",
    description:"Fresh each day.",
  },
{
    icon: PenLine,
    title:"Reflect",
    description:"Track mood.",
  },
{
    icon: Sparkles,
    title:"Positive",
    description:"Supports mindset.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A daily affirmations tool offers positive statements to reinforce a constructive mindset. Repeated regularly, affirmations can steady focus and confidence. This tool delivers a themed set each day with space to reflect.</p>
  <p>Consistency matters more than intensity. A brief daily practice beats occasional long sessions. Reflection ties the statements to real feeling, deepening the effect.</p>
  <p>Use it as a small daily ritual. The tool's value is a simple, private prompt for a steadier mindset.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What are affirmations?",
    answer:"Positive statements repeated to shift mindset.",
  },
{
    question:"Do they work?",
    answer:"May support confidence and focus.",
  },
{
    question:"Daily?",
    answer:"Consistency helps.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  }
  ]}
/>
</div>
 );
}
