"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import { Quote, RefreshCw, Star } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type Category ="All"|"Motivational"|"Funny"|"Life"|"Love"|"Success";

const quotes = [
 { text:"The only way to do great work is to love what you do.", author:"Steve Jobs", cat:"Motivational"},
 { text:"Believe you can and you're halfway there.", author:"Theodore Roosevelt", cat:"Motivational"},
 { text:"It always seems impossible until it's done.", author:"Nelson Mandela", cat:"Motivational"},
 { text:"Don't watch the clock; do what it does. Keep going.", author:"Sam Levenson", cat:"Motivational"},
 { text:"The future belongs to those who believe in the beauty of their dreams.", author:"Eleanor Roosevelt", cat:"Motivational"},
 { text:"Hardships often prepare ordinary people for an extraordinary destiny.", author:"C.S. Lewis", cat:"Motivational"},
 { text:"Your limitation—it's only your imagination.", author:"Unknown", cat:"Motivational"},
 { text:"Push yourself, because no one else is going to do it for you.", author:"Unknown", cat:"Motivational"},
 
 { text:"I'm on a seafood diet. I see food and I eat it.", author:"Unknown", cat:"Funny"},
 { text:"Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.", author:"Will Ferrell", cat:"Funny"},
 { text:"I intend to live forever. So far, so good.", author:"Steven Wright", cat:"Funny"},
 { text:"People say nothing is impossible, but I do nothing every day.", author:"A.A. Milne", cat:"Funny"},
 { text:"Light travels faster than sound. This is why some people appear bright until you hear them speak.", author:"Alan Dundes", cat:"Funny"},
 { text:"My fake plants died because I did not pretend to water them.", author:"Mitch Hedberg", cat:"Funny"},
 { text:"I used to think I was indecisive, but now I'm not too sure.", author:"Tommy Cooper", cat:"Funny"},
 { text:"The road to success is dotted with many tempting parking spaces.", author:"Will Rogers", cat:"Funny"},

 { text:"Life is what happens when you're busy making other plans.", author:"John Lennon", cat:"Life"},
 { text:"In the end, it's not the years in your life that count. It's the life in your years.", author:"Abraham Lincoln", cat:"Life"},
 { text:"Life is a journey, and if you fall in love with the journey, you will be in love forever.", author:"Peter Hagerty", cat:"Life"},
 { text:"The purpose of our lives is to be happy.", author:"Dalai Lama", cat:"Life"},
 { text:"Get busy living or get busy dying.", author:"Stephen King", cat:"Life"},
 { text:"You only live once, but if you do it right, once is enough.", author:"Mae West", cat:"Life"},
 { text:"Many of life's failures are people who did not realize how close they were to success when they gave up.", author:"Thomas A. Edison", cat:"Life"},
 { text:"Life is really simple, but we insist on making it complicated.", author:"Confucius", cat:"Life"},

 { text:"The best thing to hold onto in life is each other.", author:"Audrey Hepburn", cat:"Love"},
 { text:"You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author:"Dr. Seuss", cat:"Love"},
 { text:"I have found the one whom my soul loves.", author:"Song of Solomon 3:4", cat:"Love"},
 { text:"To love and be loved is to feel the sun from both sides.", author:"David Viscott", cat:"Love"},
 { text:"Love is composed of a single soul inhabiting two bodies.", author:"Aristotle", cat:"Love"},
 { text:"Where there is love there is life.", author:"Mahatma Gandhi", cat:"Love"},
 { text:"We accept the love we think we deserve.", author:"Stephen Chbosky", cat:"Love"},
 { text:"Whatever our souls are made of, his and mine are the same.", author:"Emily Brontë", cat:"Love"},

 { text:"Success is not final, failure is not fatal: it is the courage to continue that counts.", author:"Winston Churchill", cat:"Success"},
 { text:"Don't be afraid to give up the good to go for the great.", author:"John D. Rockefeller", cat:"Success"},
 { text:"I find that the harder I work, the more luck I seem to have.", author:"Thomas Jefferson", cat:"Success"},
 { text:"Success usually comes to those who are too busy to be looking for it.", author:"Henry David Thoreau", cat:"Success"},
 { text:"Opportunities don't happen. You create them.", author:"Chris Grosser", cat:"Success"},
 { text:"The way to get started is to quit talking and begin doing.", author:"Walt Disney", cat:"Success"},
 { text:"Try not to become a man of success. Rather become a man of value.", author:"Albert Einstein", cat:"Success"},
 { text:"If you really look closely, most overnight successes took a long time.", author:"Steve Jobs", cat:"Success"}
];

export default function QuoteGeneratorClient() {
 const [category, setCategory] = useState<Category>("All");
 const [currentQuote, setCurrentQuote] = useState(quotes[0]);
 const [favorites, setFavorites] = useState<typeof quotes>([]);

 const filteredQuotes = useMemo(() => {
 return category ==="All"? quotes : quotes.filter(q => q.cat === category);
 }, [category]);

 const nextQuote = () => {
 const randomIdx = Math.floor(Math.random() * filteredQuotes.length);
 setCurrentQuote(filteredQuotes[randomIdx]);
 };

 const toggleFavorite = () => {
 if (favorites.some(f => f.text === currentQuote.text)) {
 setFavorites(favorites.filter(f => f.text !== currentQuote.text));
 toast.success("Removed from favorites");
 } else {
 setFavorites([...favorites, currentQuote]);
 toast.success("Added to favorites!");
 }
 };

 const isFav = favorites.some(f => f.text === currentQuote.text);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader icon={Quote} title="Quote Generator"description="Discover inspiring, funny, and profound quotes from history's greatest minds."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Daily Inspiration</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="flex flex-wrap gap-2 justify-center">
 {(["All","Motivational","Funny","Life","Love","Success"] as Category[]).map(cat => (
 <Button key={cat} variant={category === cat ?"default":"outline"} size="sm"onClick={() => { setCategory(cat); setTimeout(nextQuote, 0); }}>
 {cat}
 </Button>
 ))}
 </div>

 <div className="p-8 sm:p-12 rounded-2xl bg-muted/20 border border-border/50 text-center space-y-6 min-h-[250px] flex flex-col justify-center">
 <Quote className="w-12 h-12 mx-auto text-primary/40"/>
 <blockquote className="text-2xl sm:text-3xl font-serif italic leading-relaxed text-foreground">
 &ldquo;{currentQuote.text}&rdquo;
 </blockquote>
 <p className="text-lg font-semibold text-primary">— {currentQuote.author}</p>
 <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mx-auto w-fit">
 {currentQuote.cat}
 </span>
 </div>

 <div className="flex flex-wrap gap-3 justify-center">
 <Button onClick={nextQuote} size="lg">
 <RefreshCw className="w-4 h-4 mr-2"/> Next Quote
 </Button>
 <Button variant={isFav ?"default":"outline"} size="lg"onClick={toggleFavorite}>
 <Star className={`w-4 h-4 mr-2 ${isFav ?"fill-white":""}`} /> {isFav ?"Saved":"Save"}
 </Button>
 <CopyButton getText={() => `"${currentQuote.text}"— ${currentQuote.author}`} label="Copy Quote"/>
 </div>

 {favorites.length > 0 && (
 <div className="mt-8 border-t border-border/50 pt-4 space-y-2">
 <h3 className="text-sm font-semibold mb-2">Your Favorites ({favorites.length})</h3>
 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
 {favorites.map((f, i) => (
 <div key={i} className="p-3 bg-background/50 rounded-lg border border-border/30 flex justify-between items-start gap-4">
 <div>
 <p className="text-sm italic">&ldquo;{f.text}&rdquo;</p>
 <p className="text-xs text-muted-foreground mt-1">— {f.author}</p>
 </div>
 <CopyButton getText={() => `"${f.text}"— ${f.author}`} label=""/>
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Select Category", description:"Filter the database by mood or theme, such as Funny or Motivational.", icon: Quote },
 { step:"02", title:"Read & Reflect", description:"Take a moment to absorb the wisdom, humor, or perspective of the quote.", icon: Quote },
 { step:"03", title:"Save or Share", description:"Add it to your local favorites list or copy the text to share on social media.", icon: Quote }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Quote, title:"Curated Library", description:"Features 40 hand-selected quotes spanning five distinct emotional categories."},
 { icon: Quote, title:"Local Favorites", description:"Save your most loved quotes to a persistent list during your browsing session."},
 { icon: Quote, title:"Smart Filtering", description:"Instantly narrow down the randomizer to only show quotes that match your current mood."},
 { icon: Quote, title:"One-Click Copy", description:"Formats the quote and author perfectly for pasting into tweets, captions, or documents."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>A single sentence can change your perspective, motivate you to start a difficult task, or simply make you laugh out loud. Our quote generator serves as a digital anthology of human experience.</p>
 <p>Whether you are looking for a caption for your morning coffee photo, a stoic reminder to endure hardship, or a joke to break the ice in a presentation, the categorized database ensures you find the right words.</p>
 <p>The favorites system allows you to build a personal grimoire of wisdom that you can reference whenever you need a quick boost of inspiration.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Are these quotes historically accurate?", answer:"We strive to attribute quotes correctly, but the internet is full of misattributions. Some are marked 'Unknown' when the original author is debated."},
 { question:"Will my favorites be saved if I close the tab?", answer:"The favorites list is stored in the browser's active memory and will reset when you refresh or close the page."},
 { question:"Can I suggest a new quote?", answer:"The current library is fixed at 40 quotes to ensure fast loading and high quality, but we may expand the database in future updates."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/quote-generator" max={6} />
 </div>
 );
}
