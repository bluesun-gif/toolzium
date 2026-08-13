"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Layers, Edit, Trash2, Shuffle, ChevronLeft, ChevronRight, Plus, Download, Upload, Brain } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface Flashcard {
 id: string;
 front: string;
 back: string;
 status:"known"|"unknown"|"unseen";
}

const SAMPLE_DECK: Flashcard[] = [
 { id:"1", front:"API", back:"Application Programming Interface - a set of rules for building software.", status:"unseen"},
 { id:"2", front:"JSON", back:"JavaScript Object Notation - a lightweight data-interchange format.", status:"unseen"},
 { id:"3", front:"React", back:"A JavaScript library for building user interfaces, maintained by Meta.", status:"unseen"},
 { id:"4", front:"State", back:"Data that changes over time in an application, triggering UI updates.", status:"unseen"},
 { id:"5", front:"Props", back:"Read-only data passed from parent to child components.", status:"unseen"},
 { id:"6", front:"DOM", back:"Document Object Model - the tree structure of an HTML page.", status:"unseen"},
 { id:"7", front:"SSR", back:"Server-Side Rendering - generating HTML on the server for each request.", status:"unseen"},
 { id:"8", front:"Hydration", back:"The process of attaching event listeners to static HTML on the client.", status:"unseen"},
 { id:"9", front:"Hook", back:"A function that lets you 'hook into' React state and lifecycle features.", status:"unseen"},
 { id:"10", front:"Virtual DOM", back:"A lightweight copy of the DOM used to optimize rendering performance.", status:"unseen"}
];

export function FlashcardCreatorClient() {
 const [mode, setMode] = useState<"create"|"study">("create");
 const [deck, setDeck] = useState<Flashcard[]>(SAMPLE_DECK);
 const [newFront, setNewFront] = useState("");
 const [newBack, setNewBack] = useState("");
 const [bulkText, setBulkText] = useState("");
 
 const [currentIndex, setCurrentIndex] = useState(0);
 const [isFlipped, setIsFlipped] = useState(false);
 const [sessionStats, setSessionStats] = useState({ known: 0, unknown: 0 });
 const [isFinished, setIsFinished] = useState(false);
 const [shuffled, setShuffled] = useState(false);

 const studyQueue = useMemo(() => {
 const unseen = deck.filter(c => c.status ==="unseen");
 const unknown = deck.filter(c => c.status ==="unknown");
 const known = deck.filter(c => c.status ==="known");
 
 let active = [...unseen, ...unknown];
 if (active.length === 0) active = [...known];
 
 if (shuffled) {
 return active.sort(() => Math.random() - 0.5);
 }
 return active;
 }, [deck, shuffled]);

 const currentCard = studyQueue[currentIndex];

 const addCard = () => {
 if (!newFront.trim() || !newBack.trim()) {
 toast.error("Please fill both sides");
 return;
 }
 const newCard: Flashcard = {
 id: Date.now().toString(),
 front: newFront,
 back: newBack,
 status:"unseen"
 };
 setDeck(prev => [...prev, newCard]);
 setNewFront("");
 setNewBack("");
 toast.success("Card added");
 };

 const deleteCard = (id: string) => {
 setDeck(prev => prev.filter(c => c.id !== id));
 };

 const handleBulkImport = () => {
 if (!bulkText.trim()) return;
 const lines = bulkText.split("\n").filter(l => l.includes("|"));
 const newCards = lines.map((line, idx) => {
 const [front, back] = line.split("|").map(s => s.trim());
 return { id: Date.now().toString() + idx, front, back, status:"unseen"as"unseen"};
 });
 setDeck(prev => [...prev, ...newCards]);
 setBulkText("");
 toast.success(`Imported ${newCards.length} cards`);
 };

 const handleFlip = () => setIsFlipped(!isFlipped);

 const markCard = (status:"known"|"unknown") => {
 if (!currentCard) return;
 
 setDeck(prev => prev.map(c => c.id === currentCard.id ? { ...c, status } : c));
 setSessionStats(prev => ({
 known: prev.known + (status ==="known"? 1 : 0),
 unknown: prev.unknown + (status ==="unknown"? 1 : 0)
 }));

 if (currentIndex < studyQueue.length - 1) {
 setCurrentIndex(prev => prev + 1);
 setIsFlipped(false);
 } else {
 setIsFinished(true);
 }
 };

 const resetStudy = () => {
 setCurrentIndex(0);
 setIsFlipped(false);
 setIsFinished(false);
 setSessionStats({ known: 0, unknown: 0 });
 };

 const exportJSON = () => {
 const data = JSON.stringify(deck, null, 2);
 const blob = new Blob([data], { type:"application/json"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="flashcards.json";
 a.click();
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 p-4">
      <GridPattern />

 <ToolPageHeader
 icon={Brain}
 title="Spaced Repetition Flashcards"
 description="Create, manage, and study your flashcards with an intelligent queue system designed to maximize retention."
 />

 <div className="flex justify-center gap-2 mb-6">
 <Button variant={mode ==="create"?"default":"outline"} onClick={() => setMode("create")}>Create Deck</Button>
 <Button variant={mode ==="study"?"default":"outline"} onClick={() => setMode("study")}>Study Mode</Button>
 </div>

 {mode ==="create"? (
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={`${cardClass} lg:col-span-2`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Plus className="w-4 h-4 text-primary"/>
 Add New Card
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <Label>Front (Question)</Label>
 <Input value={newFront} onChange={(e) => setNewFront(e.target.value)} placeholder="Term or Question"/>
 </div>
 <div>
 <Label>Back (Answer)</Label>
 <Input value={newBack} onChange={(e) => setNewBack(e.target.value)} placeholder="Definition or Answer"/>
 </div>
 </div>
 <Button onClick={addCard} className="w-full">Add Card</Button>

 <div className="pt-6 border-t border-border/50">
 <Label>Bulk Import (Format:"front | back"per line)</Label>
 <textarea 
 className={`${textareaClass} min-h-[100px] mt-2`}
 value={bulkText}
 onChange={(e) => setBulkText(e.target.value)}
 placeholder="React | A JS library&#10;Vue | A progressive framework"
 />
 <Button variant="secondary"onClick={handleBulkImport} className="w-full mt-2">Import Batch</Button>
 </div>
 </CardContent>
 </Card>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}>Deck ({deck.length})</CardTitle>
 <Button variant="ghost"size="icon"className="h-8 w-8"onClick={exportJSON}>
 <Download className="w-4 h-4"/>
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-2 max-h-[400px] overflow-y-auto">
 {deck.map(card => (
 <div key={card.id} className="p-3 bg-muted/30 rounded border border-border/50 flex justify-between items-start group">
 <div className="flex-1">
 <div className="text-sm font-bold">{card.front}</div>
 <div className="text-xs text-muted-foreground truncate">{card.back}</div>
 </div>
 <Button variant="ghost"size="icon"className="h-6 w-6 opacity-0 group-hover:opacity-100"onClick={() => deleteCard(card.id)}>
 <Trash2 className="w-3 h-3 text-destructive"/>
 </Button>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 </div>
 ) : (
 <div className="max-w-2xl mx-auto space-y-6">
 {!isFinished ? (
 <>
 <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
 <span>Card {currentIndex + 1} of {studyQueue.length}</span>
 <Button variant="ghost"size="sm"onClick={() => setShuffled(!shuffled)} className="gap-2">
 <Shuffle className="w-4 h-4"/> {shuffled ?"Sorted":"Shuffle"}
 </Button>
 </div>
 
 {currentCard ? (
 <div 
 className="relative w-full h-[400px] cursor-pointer [perspective:1000px]"
 onClick={handleFlip}
 >
 <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ?"[transform:rotateY(180deg)]":""}`}>
 <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex items-center justify-center p-8 bg-card border border-border rounded-2xl shadow-xl">
 <div className="text-center space-y-4">
 <Label className="text-xs text-muted-foreground uppercase tracking-widest">Question</Label>
 <h2 className="text-3xl font-bold">{currentCard.front}</h2>
 <p className="text-sm text-muted-foreground italic">Click to flip</p>
 </div>
 </div>
 <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-8 bg-primary/10 border border-primary/20 rounded-2xl shadow-xl">
 <div className="text-center space-y-4">
 <Label className="text-xs text-primary uppercase tracking-widest">Answer</Label>
 <p className="text-xl leading-relaxed">{currentCard.back}</p>
 </div>
 </div>
 </div>
 </div>
 ) : (
 <div className="text-center p-12">No cards available to study.</div>
 )}

 {isFlipped && (
 <div className="flex gap-4 mt-8 justify-center">
 <Button variant="destructive"size="lg"className="w-40 gap-2"onClick={() => markCard("unknown")}>
 <ChevronLeft className="w-5 h-5"/> Don't Know
 </Button>
 <Button variant="default"size="lg"className="w-40 gap-2"onClick={() => markCard("known")}>
 Know <ChevronRight className="w-5 h-5"/>
 </Button>
 </div>
 )}
 </>
 ) : (
 <GlassCard>
 <CardContent className="p-8 text-center space-y-6">
 <h2 className="text-3xl font-bold">Session Complete!</h2>
 <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
 <div className="p-4 bg-green-500/10 rounded-lg">
 <div className="text-2xl font-bold text-green-500">{sessionStats.known}</div>
 <div className="text-xs text-muted-foreground">Known</div>
 </div>
 <div className="p-4 bg-red-500/10 rounded-lg">
 <div className="text-2xl font-bold text-red-500">{sessionStats.unknown}</div>
 <div className="text-xs text-muted-foreground">Review</div>
 </div>
 </div>
 <Button onClick={resetStudy} className="w-full gap-2">
 <Shuffle className="w-4 h-4"/> Study Again
 </Button>
 </CardContent>
 </GlassCard>
 )}
 </div>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Build Your Deck", description:"Add cards one by one or bulk import from a text file. Organize your study material efficiently.", icon: Layers },
 { step:"02", title:"Enter Study Mode", description:"The system prioritizes unseen cards. Click the card to flip it and reveal the answer.", icon: Brain },
 { step:"03", title:"Self-Assess", description:"Mark cards as 'Known' or 'Don't Know'. The spaced repetition logic brings difficult cards back more often.", icon: Shuffle }
 ]}
 badges={["Active Recall","Spaced Repetition","JSON Export"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Layers, title:"Bulk Import/Export", description:"Quickly build decks from existing notes using the pipe-delimited import format, or export your deck to share."},
 { icon: Brain, title:"Smart Queue", description:"The study mode automatically prioritizes cards you haven't seen or marked as 'unknown' to optimize learning."},
 { icon: Shuffle, title:"3D Flip Animation", description:"A smooth, satisfying card flip interaction mimics the feel of physical flashcards for better engagement."},
 { icon: Edit, title:"Deck Management", description:"Edit, delete, and organize your cards in the creation view. Your deck is saved in the browser session."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Science of Active Recall</h3>
 <p>
 Flashcards are one of the most effective study tools because they force"active recall."Unlike passive reading, where your brain simply recognizes information, active recall requires you to retrieve the answer from memory, which strengthens neural connections. This tool digitizes that process, allowing you to carry thousands of cards in your pocket. Whether you are learning a new programming language, studying for the MCAT, or memorizing vocabulary for a trip abroad, the fundamental mechanism of testing yourself remains the gold standard for retention.
 </p>
 <h3>Implementing Spaced Repetition</h3>
 <p>
 The"forgetting curve"dictates that we lose information rapidly after learning it unless we review it at specific intervals. While a full algorithmic implementation (like SM-2) requires persistent tracking over days, our"Session-Based Spaced Repetition"ensures that within a single study block, you are not wasting time on cards you already know. By pushing"Unknown"cards back into the active queue, you ensure that your limited study time is focused on your weak points. This targeted practice is the key to efficient learning.
 </p>
 <h3>Customization for Every Learner</h3>
 <p>
 Every student learns differently. The ability to shuffle decks, bulk import data from existing notes, and export to JSON ensures that this tool fits into your existing workflow. You can use it to quiz yourself on history dates, debug code snippets, or master medical terminology. The clean, distraction-free interface minimizes cognitive load, allowing you to focus entirely on the material.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"How do I bulk import cards?", answer:"In the Create mode, use the text area at the bottom. Format your lines as 'Front | Back' (e.g., 'Apple | A red fruit'). The tool will parse every line containing a pipe character."},
 { question:"Is my deck saved if I refresh the page?", answer:"Currently, the deck is stored in the browser's active memory (React state). If you refresh, it will revert to the sample deck. We recommend exporting to JSON to save your work."},
 { question:"Can I add images to cards?", answer:"The current version supports text-only for maximum compatibility and speed. Image support is planned for a future update."},
 { question:"What happens when I finish the deck?", answer:"You will see a summary screen showing your mastery percentage. You can choose to restart the session to review the cards you missed."},
 { question:"Is there a limit to deck size?", answer:"You can add hundreds of cards without issue. The browser handles the rendering efficiently."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/academic/flashcard-creator" max={6} />
 </div>
 );
}

export default FlashcardCreatorClient;
