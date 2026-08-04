"use client";

import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Lightbulb, Shuffle, Heart, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRIVIA_FACTS = [
  { id: 1, category: "Science", text: "Water can boil and freeze at the same time. This is known as the triple point." },
  { id: 2, category: "Animals", text: "A flock of crows is known as a murder." },
  { id: 3, category: "History", text: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza." },
  { id: 4, category: "Geography", text: "There are more trees on Earth than stars in the Milky Way." },
  { id: 5, category: "Food", text: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible." },
  { id: 6, category: "Space", text: "One day on Venus is longer than one year on Venus." },
  { id: 7, category: "Sports", text: "Golf is the only sport to have been played on the moon." },
  { id: 8, category: "Technology", text: "The first computer mouse was made of wood." },
];

export function TriviaGeneratorClient() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("trivia-favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveFavorite = (newFavs: number[]) => {
    setFavorites(newFavs);
    localStorage.setItem("trivia-favorites", JSON.stringify(newFavs));
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      saveFavorite(favorites.filter(f => f !== id));
    } else {
      saveFavorite([...favorites, id]);
    }
  };

  const filteredFacts = useMemo(() => {
    if (categoryFilter === "All") return TRIVIA_FACTS;
    return TRIVIA_FACTS.filter(f => f.category === categoryFilter);
  }, [categoryFilter]);

  const currentFact = filteredFacts[currentFactIndex % filteredFacts.length] || TRIVIA_FACTS[0];
  const isFavorite = favorites.includes(currentFact?.id);

  const nextFact = () => {
    setCurrentFactIndex(prev => (prev + 1) % filteredFacts.length);
  };

  const randomFact = () => {
    setCurrentFactIndex(Math.floor(Math.random() * filteredFacts.length));
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Sparkles}
        title="Trivia Generator"
        description="Generate random fun facts across various categories."
        actions={<ActionButton onClick={randomFact} icon={Shuffle} label="Random Fact" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Trivia Fact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-1/2">
                <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentFactIndex(0); }}>
                  <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Animals">Animals</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Space">Space</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="min-h-[150px] p-6 bg-muted/50 rounded-lg flex flex-col items-center justify-center text-center space-y-4 border">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">{currentFact.category}</span>
              <p className="text-xl font-medium leading-relaxed">
                "{currentFact.text}"
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant={isFavorite ? "default" : "outline"} size="icon" onClick={() => toggleFavorite(currentFact.id)}>
                  <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                <CopyButton getText={() => currentFact.text} label="" />
              </div>
              <Button onClick={nextFact}>Next Fact</Button>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Favorites ({favorites.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {favorites.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No favorites yet. Click the heart icon to save facts.</p>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {TRIVIA_FACTS.filter(f => favorites.includes(f.id)).map(fact => (
                  <div key={fact.id} className="p-3 bg-muted/30 border rounded-md relative group">
                    <span className="text-xs font-semibold text-primary mb-1 block">{fact.category}</span>
                    <p className="text-sm">{fact.text}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => toggleFavorite(fact.id)}
                    >
                      <Heart className="h-3 w-3" fill="currentColor" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
