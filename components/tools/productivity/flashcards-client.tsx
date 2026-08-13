"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton } from"@/components/shared/action-buttons";
import { BookOpen, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Plus, Download, Upload } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

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

export function FlashcardMakerClient() {
 const [decks, setDecks] = useState<Deck[]>([]);
 const [activeDeckId, setActiveDeckId] = useState<string>("");
 
 const [mode, setMode] = useState<"edit"|"study">("edit");
 const [newDeckName, setNewDeckName] = useState("");
 
 // Study mode state
 const [studyCards, setStudyCards] = useState<Card[]>([]);
 const [currentIndex, setCurrentIndex] = useState(0);
 const [isFlipped, setIsFlipped] = useState(false);
 const [reviewedCount, setReviewedCount] = useState(0);

 // Edit mode state
 const [newCardFront, setNewCardFront] = useState("");
 const [newCardBack, setNewCardBack] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("flashcard-decks");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 setDecks(parsed);
 if (parsed.length > 0) setActiveDeckId(parsed[0].id);
 } catch (e) {
 console.error(e);
 }
 } else {
 const defaultDeck = { id: crypto.randomUUID(), name:"My First Deck", cards: [] };
 setDecks([defaultDeck]);
 setActiveDeckId(defaultDeck.id);
 }
 ;
 }, []);

 useEffect(() => {
 if (isLoaded) {
 localStorage.setItem("flashcard-decks", JSON.stringify(decks));
 }
 }, [decks, isLoaded]);

 const activeDeck = decks.find((d) => d.id === activeDeckId);

 const createDeck = () => {
 if (!newDeckName.trim()) {
 toast.error("Deck name required");
 return;
 }
 const newDeck = { id: crypto.randomUUID(), name: newDeckName.trim(), cards: [] };
 setDecks([...decks, newDeck]);
 setActiveDeckId(newDeck.id);
 setNewDeckName("");
 toast.success("Deck created");
 };

 const addCard = () => {
 if (!activeDeck) return;
 if (!newCardFront.trim() || !newCardBack.trim()) {
 toast.error("Both front and back are required");
 return;
 }
 const newCard = { id: crypto.randomUUID(), front: newCardFront.trim(), back: newCardBack.trim() };
 setDecks(decks.map(d => d.id === activeDeck.id ? { ...d, cards: [...d.cards, newCard] } : d));
 setNewCardFront("");
 setNewCardBack("");
 toast.success("Card added");
 };

 const deleteCard = (cardId: string) => {
 if (!activeDeck) return;
 setDecks(decks.map(d => d.id === activeDeck.id ? { ...d, cards: d.cards.filter(c => c.id !== cardId) } : d));
 };

 const startStudy = (shuffle = false) => {
 if (!activeDeck || activeDeck.cards.length === 0) {
 toast.error("Add some cards first");
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
 toast.success("You finished the deck!");
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
 </div>
 );
}
