"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton } from"@/components/shared/action-buttons";
import { BookOpen, Brain, CheckCircle2, ChevronLeft, ChevronRight, Download, Plus, Repeat, RotateCcw, Shuffle, StickyNote, Upload } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { BookOpen, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Plus, Download, Upload, Shield, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
type Card = {
  id: string;
  front: string;
  back: string;
};
type Deck = {
  id: string;
  name: string;
  cards: Card[];
};
const DEFAULT_DECKS: Deck[] = [{
  id: "deck-1",
  name: "Web Development Concepts",
  cards: [{
    id: "c1",
    front: "What is a Closure in JavaScript?",
    back: "A function bundled together with references to its surrounding state (lexical environment)."
  }, {
    id: "c2",
    front: "What does CSS 'flex-grow' property do?",
    back: "Defines the ability for a flex item to grow if necessary to fill remaining space."
  }, {
    id: "c3",
    front: "What is the purpose of React useEffect?",
    back: "Allows functional components to perform side effects like data fetching and subscriptions."
  }]
}];
export function FlashcardMakerClient() {
  const [decks, setDecks] = useState<Deck[]>(DEFAULT_DECKS);
  const [activeDeckId, setActiveDeckId] = useState<string>("deck-1");
  const [mode, setMode] = useState<"edit" | "study">("edit");
  const [newDeckName, setNewDeckName] = useState("");
  const [studyCards, setStudyCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("flashcard-decks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDecks(parsed);
          setActiveDeckId(parsed[0].id);
        }
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("flashcard-decks", JSON.stringify(decks));
    }
  }, [decks]);
  const activeDeck = decks.find(d => d.id === activeDeckId) || decks[0];
  const createDeck = () => {
    if (!newDeckName.trim()) {
      toast.error("Deck name required.");
      return;
    }
    const newDeck = {
      id: Math.random().toString(),
      name: newDeckName.trim(),
      cards: []
    };
    setDecks([...decks, newDeck]);
    setActiveDeckId(newDeck.id);
    setNewDeckName("");
    toast.success("Created new flashcard deck!");
  };
  const addCard = () => {
    if (!activeDeck) return;
    if (!newCardFront.trim() || !newCardBack.trim()) {
      toast.error("Both front and back are required.");
      return;
    }
    const newCard = {
      id: Math.random().toString(),
      front: newCardFront.trim(),
      back: newCardBack.trim()
    };
    setDecks(decks.map(d => d.id === activeDeck.id ? {
      ...d,
      cards: [...d.cards, newCard]
    } : d));
    setNewCardFront("");
    setNewCardBack("");
    toast.success("Added card to deck!");
  };
  const deleteCard = (cardId: string) => {
    if (!activeDeck) return;
    setDecks(decks.map(d => d.id === activeDeck.id ? {
      ...d,
      cards: d.cards.filter(c => c.id !== cardId)
    } : d));
    toast.success("Card deleted.");
  };
  const startStudy = (shuffle = false) => {
    if (!activeDeck || activeDeck.cards.length === 0) {
      toast.error("Add some cards first.");
      return;
    }
    let cardsToStudy = [...activeDeck.cards];
    if (shuffle) {
      cardsToStudy = cardsToStudy.sort(() => Math.random() - 0.5);
    }
    setStudyCards(cardsToStudy);
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCount(1);
    setMode("study");
  };
  const nextCard = () => {
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setReviewedCount(prev => Math.min(prev + 1, studyCards.length));
    } else {
      toast.success("Deck finished!");
    }
  };
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  const exportDecks = () => {
    const blob = new Blob([JSON.stringify(decks, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "toolzium-flashcards.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported decks!");
  };
  const importDecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setDecks(imported);
          if (imported.length > 0) setActiveDeckId(imported[0].id);
          toast.success("Imported flashcard decks!");
        }
      } catch (err) {
        toast.error("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const handleReset = () => {
    setDecks(DEFAULT_DECKS);
    setActiveDeckId(DEFAULT_DECKS[0].id);
    localStorage.removeItem("flashcard-decks");
    toast.success("Reset decks to defaults!");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={BookOpen} title="Interactive Flashcard Maker & Study Studio" description="Create study decks, memorize facts with 3D flip animation cards, shuffle study modes, and export JSON backups." actions={<div className="flex gap-2">
            <input type="file" id="import-cards" className="hidden" accept=".json" onChange={importDecks} />
            <Button variant="outline" size="sm" onClick={() => document.getElementById("import-cards")?.click()} className="font-bold gap-2">
              <Upload className="h-4 w-4" /> Import JSON
            </Button>
            <ActionButton onClick={exportDecks} icon={Download} label="Export JSON" variant="outline" size="sm" />
            <ResetButton onClick={handleReset} label="Reset Decks" />
          </div>} />

      {mode === "edit" ? <div className="space-y-6">
          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-primary" /> Manage Decks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs font-bold">Select Active Deck</Label>
                  <Select value={activeDeckId} onValueChange={setActiveDeckId}>
                    <SelectTrigger className="h-11 font-medium">
                      <SelectValue placeholder="Select a deck" />
                    </SelectTrigger>
                    <SelectContent>
                      {decks.map(d => <SelectItem key={d.id} value={d.id}>
                          {d.name} ({d.cards.length} cards)
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs font-bold">Create New Deck</Label>
                  <div className="flex gap-2">
                    <Input placeholder="e.g. Spanish Vocabulary..." value={newDeckName} onChange={e => setNewDeckName(e.target.value)} className="h-11 font-medium" />
                    <Button onClick={createDeck} variant="secondary" className="h-11 px-5 font-bold">
                      Create
                    </Button>
                  </div>
                </div>
              </div>

              {activeDeck && <div className="flex gap-3 pt-2">
                  <Button onClick={() => startStudy(false)} disabled={activeDeck.cards.length === 0} className="flex-1 h-11 font-bold gap-2">
                    <BookOpen className="h-4 w-4" /> Study Normal Mode
                  </Button>
                  <Button onClick={() => startStudy(true)} disabled={activeDeck.cards.length === 0} variant="secondary" className="flex-1 h-11 font-bold gap-2">
                    <Shuffle className="h-4 w-4" /> Study Shuffled Mode
                  </Button>
                </div>}
            </CardContent>
          </GlassCard>

          {activeDeck && <GlassCard>
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-lg font-bold">Cards in &quot;{activeDeck.name}&quot; ({activeDeck.cards.length})</CardTitle>
                <CardDescription>Add new question/answer cards or manage existing ones.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold">Front (Question / Prompt)</Label>
                    <Input value={newCardFront} onChange={e => setNewCardFront(e.target.value)} placeholder="e.g. What is the capital of France?" className="h-10 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold">Back (Answer / Solution)</Label>
                    <div className="flex gap-2">
                      <Input value={newCardBack} onChange={e => setNewCardBack(e.target.value)} placeholder="e.g. Paris" onKeyDown={e => e.key === "Enter" && addCard()} className="h-10 text-xs" />
                      <Button onClick={addCard} className="h-10 px-4 font-bold gap-1">
                        <Plus className="h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {activeDeck.cards.length === 0 ? <p className="text-xs text-muted-foreground italic border border-dashed border-border/80 p-6 rounded-xl text-center">
                      No cards added to this deck yet. Type a question and answer above!
                    </p> : activeDeck.cards.map(c => <div key={c.id} className="flex items-center justify-between p-3.5 border border-border/60 rounded-xl bg-muted/20 text-xs">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="font-bold text-foreground line-clamp-2 pr-2 border-r border-border/60">{c.front}</div>
                          <div className="text-muted-foreground line-clamp-2 pl-2 font-medium">{c.back}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 shrink-0 ml-4 font-bold" onClick={() => deleteCard(c.id)}>
                          Remove
                        </Button>
                      </div>)}
                </div>
              </CardContent>
            </GlassCard>}
        </div> : <div className="space-y-6">
          <GlassCard>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-bold">Studying: {activeDeck?.name}</CardTitle>
              <CardDescription>
                Card {currentIndex + 1} of {studyCards.length} (Progress: {Math.round((currentIndex + 1) / studyCards.length * 100)}%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pb-8">
              <div className="w-full max-w-2xl mx-auto h-64 sm:h-80 perspective-1000 cursor-pointer select-none" onClick={flipCard}>
                <div className={cn("relative w-full h-full transition-transform duration-500 transform-style-3d", isFlipped ? "rotate-y-180" : "")}>
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-background border-2 border-primary/30 shadow-xl rounded-2xl">
                    <p className="text-xl sm:text-2xl text-center font-bold text-foreground leading-relaxed">{studyCards[currentIndex]?.front}</p>
                    <div className="absolute bottom-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Click card to flip answer</div>
                  </div>
                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-primary/10 border-2 border-primary shadow-xl rounded-2xl">
                    <p className="text-xl sm:text-2xl text-center font-bold text-primary leading-relaxed">{studyCards[currentIndex]?.back}</p>
                    <div className="absolute bottom-4 text-xs font-bold text-primary/80 uppercase tracking-wider">Click card to flip question</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4">
                <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0} className="font-bold">
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button variant="secondary" onClick={() => setMode("edit")} className="font-bold">
                  End Study Session
                </Button>
                <Button onClick={nextCard} disabled={currentIndex === studyCards.length - 1} className="font-bold">
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </div>}

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Create Study Decks",
        description: "Organize topics into dedicated decks (e.g. Vocabulary, Coding, Science).",
        icon: BookOpen
      }, {
        step: "02",
        title: "Add Front & Back Cards",
        description: "Input question prompts on front and answer solutions on the back.",
        icon: Plus
      }, {
        step: "03",
        title: "Flip Card Study Mode",
        description: "Practice active recall with interactive 3D flip animation cards.",
        icon: RotateCcw
      }]} badges={["3D Card Flip", "Normal & Shuffled Study", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: BookOpen,
        title: "Active Recall Study Engine",
        description: "Interactive 3D card flips optimize memory retention and active recall."
      }, {
        icon: Shuffle,
        title: "Shuffled & Sequential Modes",
        description: "Study flashcards in original sequential order or randomize card sequence."
      }, {
        icon: Shield,
        title: "Confidential Local Persistence",
        description: "Saves flashcard decks safely in local browser storage with JSON import/export."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "How do I flip a flashcard?",
        answer: "Simply click anywhere on the card during Study Mode to trigger the 3D flip animation."
      }, {
        question: "Can I backup or transfer my flashcards?",
        answer: "Yes, click 'Export JSON' to download your decks, or 'Import JSON' to restore them on another device."
      }]} />

      <RelatedTools currentToolUrl="/tools/productivity/flashcards" max={6} />

<<<<<<< HEAD
 const prevCard = () => {
 if (currentIndex > 0) {
 setCurrentIndex(prev => prev - 1);
 setIsFlipped(false);
 }
 };

 const flipCard = () => {
 setIsFlipped(!isFlipped);
 };

 const exportDecks = () => {
 const blob = new Blob([JSON.stringify(decks, null, 2)], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="toolzium-flashcards.json";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Decks exported");
 };

 const importDecks = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = (event) => {
 try {
 const imported = JSON.parse(event.target?.result as string);
 if (Array.isArray(imported)) {
 setDecks(imported);
 if (imported.length > 0) setActiveDeckId(imported[0].id);
 toast.success("Decks imported successfully");
 } else {
 toast.error("Invalid format");
 }
 } catch (err) {
 toast.error("Failed to parse JSON");
 }
 };
 reader.readAsText(file);
 e.target.value ="";
 };

 if (!isLoaded) return null;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={BookOpen}
 title="Flashcard Maker"
 description="Create, manage, and study custom flashcards."
 actions={
 <>
 <input type="file"id="import-cards"className="hidden"accept=".json"onChange={importDecks} />
 <Button variant="outline"size="sm"onClick={() => document.getElementById("import-cards")?.click()}>
 <Upload className="h-4 w-4 mr-2"/> Import
 </Button>
 <ActionButton onClick={exportDecks} icon={Download} label="Export"variant="outline"size="sm"/>
 </>
 }
 />

 {mode ==="edit"? (
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Manage Decks</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex flex-col sm:flex-row gap-4">
 <div className="flex-1 space-y-2">
 <Label>Select Deck</Label>
 <Select value={activeDeckId} onValueChange={setActiveDeckId}>
 <SelectTrigger>
 <SelectValue placeholder="Select a deck"/>
 </SelectTrigger>
 <SelectContent>
 {decks.map(d => (
 <SelectItem key={d.id} value={d.id}>{d.name} ({d.cards.length})</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 <div className="flex-1 space-y-2">
 <Label>Create New Deck</Label>
 <div className="flex gap-2">
 <Input placeholder="Deck name"value={newDeckName} onChange={e => setNewDeckName(e.target.value)} />
 <Button onClick={createDeck} variant="secondary">Create</Button>
 </div>
 </div>
 </div>

 {activeDeck && (
 <div className="flex gap-2 pt-4">
 <Button onClick={() => startStudy(false)} disabled={activeDeck.cards.length === 0} className="flex-1">
 <BookOpen className="h-4 w-4 mr-2"/> Study Normal
 </Button>
 <Button onClick={() => startStudy(true)} disabled={activeDeck.cards.length === 0} variant="secondary"className="flex-1">
 <Shuffle className="h-4 w-4 mr-2"/> Study Shuffled
 </Button>
 </div>
 )}
 </CardContent>
 </GlassCard>

 {activeDeck && (
 <GlassCard>
 <CardHeader>
 <CardTitle>Cards in"{activeDeck.name}"</CardTitle>
 <CardDescription>Add new cards or manage existing ones.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Front (Question)</Label>
 <Input value={newCardFront} onChange={e => setNewCardFront(e.target.value)} placeholder="E.g., What is the capital of France?"/>
 </div>
 <div className="space-y-2">
 <Label>Back (Answer)</Label>
 <div className="flex gap-2">
 <Input value={newCardBack} onChange={e => setNewCardBack(e.target.value)} placeholder="E.g., Paris"onKeyDown={e => e.key ==="Enter"&& addCard()} />
 <Button onClick={addCard}><Plus className="h-4 w-4 mr-1"/> Add</Button>
 </div>
 </div>
 </div>

 <div className="space-y-2">
 {activeDeck.cards.length === 0 ? (
 <p className="text-sm text-muted-foreground italic">No cards added yet.</p>
 ) : (
 activeDeck.cards.map((c, i) => (
 <div key={c.id} className="flex items-center justify-between p-3 border rounded-md bg-card">
 <div className="flex-1 grid grid-cols-2 gap-4">
 <div className="font-medium text-sm line-clamp-2 pr-2 border-r">{c.front}</div>
 <div className="text-sm text-muted-foreground line-clamp-2 pl-2">{c.back}</div>
 </div>
 <Button variant="ghost"size="sm"className="text-destructive hover:bg-destructive/10 ml-4"onClick={() => deleteCard(c.id)}>
 Remove
 </Button>
 </div>
 ))
 )}
 </div>
 </CardContent>
 </GlassCard>
 )}
 </div>
 ) : (
 <div className="space-y-6">
 <GlassCard>
 <CardHeader className="text-center">
 <CardTitle>Studying: {activeDeck?.name}</CardTitle>
 <CardDescription>
 Card {currentIndex + 1} of {studyCards.length} (Reviewed: {reviewedCount})
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-8 pb-8">
 <div 
 className="w-full max-w-2xl mx-auto h-64 sm:h-80 perspective-1000 cursor-pointer"
 onClick={flipCard}
 >
 <div className={cn(
"relative w-full h-full transition-transform duration-500 transform-style-3d",
 isFlipped ?"rotate-y-180":""
 )}>
 {/* Front */}
 <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-8 bg-card border-2 shadow-lg rounded-xl">
 <p className="text-xl sm:text-3xl text-center font-medium">{studyCards[currentIndex]?.front}</p>
 <div className="absolute bottom-4 text-xs text-muted-foreground">Click to flip</div>
 </div>
 {/* Back */}
 <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-8 bg-primary/5 border-2 border-primary/20 shadow-lg rounded-xl">
 <p className="text-xl sm:text-3xl text-center font-medium">{studyCards[currentIndex]?.back}</p>
 <div className="absolute bottom-4 text-xs text-muted-foreground">Click to flip</div>
 </div>
 </div>
 </div>

 <div className="flex justify-center items-center gap-4">
 <Button variant="outline"onClick={prevCard} disabled={currentIndex === 0}>
 <ChevronLeft className="h-4 w-4 mr-2"/> Previous
 </Button>
 <Button variant="outline"onClick={() => setMode("edit")}>
 End Study
 </Button>
 <Button onClick={nextCard} disabled={currentIndex === studyCards.length - 1}>
 Next <ChevronRight className="h-4 w-4 ml-2"/>
 </Button>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 )}
 
 {/* Required CSS for 3D flip animation */}
 <style dangerouslySetInnerHTML={{__html: `
 .perspective-1000 { perspective: 1000px; }
 .transform-style-3d { transform-style: preserve-3d; }
 .backface-hidden { backface-visibility: hidden; }
 .rotate-y-180 { transform: rotateY(180deg); }
 `}} />
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Cards",
    description:"Create question and answer.",
    icon: StickyNote,
  },
{
    step:"02",
    title:"Study",
    description:"Flip and self-test.",
    icon: Repeat,
  },
{
    step:"03",
    title:"Track",
    description:"Mark what you know.",
    icon: CheckCircle2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: StickyNote,
    title:"Cards",
    description:"Q and A pairs.",
  },
{
    icon: Repeat,
    title:"Flip",
    description:"Test recall.",
  },
{
    icon: CheckCircle2,
    title:"Mastery",
    description:"Mark known.",
  },
{
    icon: Brain,
    title:"Learning",
    description:"Active recall.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A flashcard maker supports active recall, one of the most effective study methods. Testing yourself beats re-reading; flip cards force retrieval. This tool lets you build Q-and-A sets and track mastery.</p>
  <p>Marking known cards focuses effort on the weak ones. Spaced repetition of those accelerates learning. The maker structures this simply.</p>
  <p>Use it for any material to memorize. The tool's value is a private, effective study system.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why flashcards?",
    answer:"Active recall aids memory.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Study and revision.",
  },
{
    question:"Spaced?",
    answer:"Review weak cards more.",
  }
  ]}
/>
</div>
 );
}
=======
      {/* CSS 3D FLIP STYLES */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `
      }} />
    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
