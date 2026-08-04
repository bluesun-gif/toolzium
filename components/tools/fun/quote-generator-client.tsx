"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Quote, Dices, Heart, Twitter, Trash2 } from "lucide-react";

type QuoteCategory = "all" | "inspirational" | "funny" | "philosophical" | "motivational" | "life";

interface QuoteItem {
  id: number;
  text: string;
  author: string;
  category: QuoteCategory;
}

const QUOTES: QuoteItem[] = [
  { id: 1, text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "inspirational" },
  { id: 2, text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison", category: "motivational" },
  { id: 3, text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein", category: "funny" },
  { id: 4, text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson", category: "philosophical" },
  { id: 5, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
  { id: 6, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivational" },
  { id: 7, text: "I'm sick of following my dreams, man. I'm just going to ask where they're going and hook up with them later.", author: "Mitch Hedberg", category: "funny" },
  { id: 8, text: "The unexamined life is not worth living.", author: "Socrates", category: "philosophical" },
  { id: 9, text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", category: "life" },
  { id: 10, text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "inspirational" },
  { id: 11, text: "My fake plants died because I did not pretend to water them.", author: "Mitch Hedberg", category: "funny" },
  { id: 12, text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", category: "motivational" },
  { id: 13, text: "The mind is everything. What you think you become.", author: "Buddha", category: "philosophical" },
  { id: 14, text: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.", author: "J.K. Rowling", category: "life" },
  { id: 15, text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "H. Jackson Brown Jr.", category: "inspirational" },
  { id: 16, text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde", category: "funny" },
  { id: 17, text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "motivational" },
  { id: 18, text: "I think, therefore I am.", author: "René Descartes", category: "philosophical" },
  { id: 19, text: "Good friends, good books, and a sleepy conscience: this is the ideal life.", author: "Mark Twain", category: "life" },
  { id: 20, text: "We accept the love we think we deserve.", author: "Stephen Chbosky", category: "inspirational" },
  { id: 21, text: "Clothes make the man. Naked people have little or no influence on society.", author: "Mark Twain", category: "funny" },
  { id: 22, text: "Everything you can imagine is real.", author: "Pablo Picasso", category: "motivational" },
  { id: 23, text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "philosophical" },
  { id: 24, text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", category: "life" },
  { id: 25, text: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", author: "J.K. Rowling", category: "inspirational" },
  { id: 26, text: "I love deadlines. I love the whooshing noise they make as they go by.", author: "Douglas Adams", category: "funny" },
  { id: 27, text: "Whatever you are, be a good one.", author: "Abraham Lincoln", category: "motivational" },
  { id: 28, text: "Liberty consists in doing what one desires.", author: "John Stuart Mill", category: "philosophical" },
  { id: 29, text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller", category: "life" },
  { id: 30, text: "It is never too late to be what you might have been.", author: "George Eliot", category: "inspirational" },
  { id: 31, text: "A day without sunshine is like, you know, night.", author: "Steve Martin", category: "funny" },
  { id: 32, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston S. Churchill", category: "motivational" },
  { id: 33, text: "God is dead. God remains dead. And we have killed him.", author: "Friedrich Nietzsche", category: "philosophical" },
  { id: 34, text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
  { id: 35, text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou", category: "inspirational" },
  { id: 36, text: "Never put off till tomorrow what may be done day after tomorrow just as well.", author: "Mark Twain", category: "funny" },
  { id: 37, text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis", category: "motivational" },
  { id: 38, text: "The brave man is he who overcomes not only his enemies but his pleasures.", author: "Democritus", category: "philosophical" },
  { id: 39, text: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw", category: "life" },
  { id: 40, text: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.", author: "Martin Luther King Jr.", category: "inspirational" },
  { id: 41, text: "I used to jog but the ice cubes kept falling out of my glass.", author: "David Lee Roth", category: "funny" },
  { id: 42, text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "motivational" },
  { id: 43, text: "Whereof one cannot speak, thereof one must be silent.", author: "Ludwig Wittgenstein", category: "philosophical" },
  { id: 44, text: "Things change. And friends leave. Life doesn't stop for anybody.", author: "Stephen Chbosky", category: "life" },
  { id: 45, text: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks", category: "inspirational" },
  { id: 46, text: "I intend to live forever. So far, so good.", author: "Steven Wright", category: "funny" },
  { id: 47, text: "If you fell down yesterday, stand up today.", author: "H.G. Wells", category: "motivational" },
  { id: 48, text: "The function of prayer is not to influence God, but rather to change the nature of the one who prays.", author: "Søren Kierkegaard", category: "philosophical" },
  { id: 49, text: "Sometimes the questions are complicated and the answers are simple.", author: "Dr. Seuss", category: "life" },
  { id: 50, text: "If you can't explain it to a six year old, you don't understand it yourself.", author: "Albert Einstein", category: "inspirational" },
  { id: 51, text: "Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes.", author: "Jack Handey", category: "funny" },
  { id: 52, text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius", category: "motivational" }
];

export function QuoteGeneratorClient() {
  const [currentCategory, setCurrentCategory] = useState<QuoteCategory>("all");
  const [quote, setQuote] = useState<QuoteItem | null>(null);
  const [favorites, setFavorites] = useState<QuoteItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const filteredQuotes = useMemo(() => {
    if (currentCategory === "all") return QUOTES;
    return QUOTES.filter(q => q.category === currentCategory);
  }, [currentCategory]);

  const generateQuote = useCallback(() => {
    setIsAnimating(true);
    
    // Simulate a slight delay for the animation
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      // Ensure we don't get the same quote twice in a row if possible
      if (filteredQuotes.length > 1 && quote && filteredQuotes[randomIndex].id === quote.id) {
        randomIndex = (randomIndex + 1) % filteredQuotes.length;
      }
      setQuote(filteredQuotes[randomIndex]);
      setIsAnimating(false);
    }, 400);
  }, [filteredQuotes, quote]);

  // Initial load
  useEffect(() => {
    generateQuote();
    const savedFavorites = localStorage.getItem("toolzium_favorite_quotes");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFavorite = useCallback((quoteToToggle: QuoteItem) => {
    setFavorites(prev => {
      const isFavorited = prev.some(q => q.id === quoteToToggle.id);
      let newFavorites;
      if (isFavorited) {
        newFavorites = prev.filter(q => q.id !== quoteToToggle.id);
      } else {
        newFavorites = [...prev, quoteToToggle];
      }
      localStorage.setItem("toolzium_favorite_quotes", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(q => q.id !== id);
      localStorage.setItem("toolzium_favorite_quotes", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const shareOnTwitter = useCallback(() => {
    if (!quote) return;
    const text = `"${quote.text}" — ${quote.author}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }, [quote]);

  const categories: { value: QuoteCategory; label: string }[] = [
    { value: "all", label: "All Quotes" },
    { value: "inspirational", label: "Inspirational" },
    { value: "motivational", label: "Motivational" },
    { value: "funny", label: "Funny" },
    { value: "philosophical", label: "Philosophical" },
    { value: "life", label: "Life" },
  ];

  const handleCategoryChange = (cat: QuoteCategory) => {
    setCurrentCategory(cat);
    // Generate new quote in this category immediately
    setIsAnimating(true);
    setTimeout(() => {
      const catQuotes = cat === "all" ? QUOTES : QUOTES.filter(q => q.category === cat);
      const randomIndex = Math.floor(Math.random() * catQuotes.length);
      setQuote(catQuotes[randomIndex]);
      setIsAnimating(false);
    }, 400);
  };

  const isCurrentQuoteFavorited = quote ? favorites.some(q => q.id === quote.id) : false;
  const quoteText = quote ? `"${quote.text}" — ${quote.author}` : "";

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Random Quote Generator"
        description="Discover inspirational, funny, and profound quotes. Save your favorites or share them with friends."
        icon={Quote}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={"px-4 py-2 rounded-full text-sm font-medium transition-colors " + (currentCategory === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80")}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="overflow-hidden">
            <CardHeader className="bg-muted/30 flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg">Your Quote</CardTitle>
              {quote && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleFavorite(quote)}
                    className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground"
                    title={isCurrentQuoteFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={"h-5 w-5 " + (isCurrentQuoteFavorited ? "fill-red-500 text-red-500" : "")} />
                  </button>
                  <CopyButton getText={() => quoteText} />
                  <button 
                    onClick={shareOnTwitter}
                    className="p-2 rounded-md hover:bg-muted transition-colors text-blue-400"
                    title="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-8 min-h-[300px] flex flex-col items-center justify-center relative">
              {quote ? (
                <div 
                  className={"max-w-2xl text-center transition-opacity duration-500 " + (isAnimating ? "opacity-0" : "opacity-100")}
                >
                  <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-relaxed mb-8">
                    "{quote.text}"
                  </blockquote>
                  <cite className="text-lg font-medium text-muted-foreground block not-italic">
                    — {quote.author}
                  </cite>
                  <span className="inline-block mt-4 text-xs uppercase tracking-wider font-semibold text-primary/70 bg-primary/10 px-3 py-1 rounded-full">
                    {quote.category}
                  </span>
                </div>
              ) : (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 w-64 bg-muted rounded mb-4"></div>
                  <div className="h-8 w-48 bg-muted rounded mb-8"></div>
                  <div className="h-4 w-32 bg-muted rounded"></div>
                </div>
              )}
            </CardContent>
          </GlassCard>

          <div className="flex justify-center">
            <ActionButton 
              onClick={generateQuote}
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              disabled={isAnimating}
              icon={Dices}
              label="Generate New Quote"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <GlassCard className="h-full">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" /> 
                Your Favorites
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {favorites.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No favorites yet.</p>
                  <p className="text-sm mt-2">Click the heart icon on a quote to save it here.</p>
                </div>
              ) : (
                <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                  {favorites.map(fav => (
                    <div key={fav.id} className="p-4 hover:bg-muted/20 transition-colors group">
                      <p className="text-sm font-medium mb-2 line-clamp-3">"{fav.text}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">— {fav.author}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(`"${fav.text}" — ${fav.author}`);
                            }}
                            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                            title="Copy quote"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                          </button>
                          <button 
                            onClick={() => removeFavorite(fav.id)}
                            className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive"
                            title="Remove from favorites"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
