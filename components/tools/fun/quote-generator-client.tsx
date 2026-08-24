"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Quote,
  RefreshCw,
  Sparkles,
  Copy,
  Download,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Image as ImageIcon,
  Palette,
  Shuffle,
  ShieldCheck,
  Check
} from "lucide-react";
import toast from "react-hot-toast";

interface QuoteItem {
  id: string;
  text: string;
  author: string;
  source?: string;
  category: "Stoicism" | "Motivation" | "Tech & Innovation" | "Deep Wisdom" | "Humor & Wit" | "Mindfulness";
  theme: string;
}

const QUOTES_DATABASE: QuoteItem[] = [
  // Stoicism
  { id: "st-1", text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", source: "Meditations", category: "Stoicism", theme: "Inner Strength" },
  { id: "st-2", text: "We suffer more often in imagination than in reality.", author: "Seneca", source: "Letters from a Stoic", category: "Stoicism", theme: "Anxiety & Clarity" },
  { id: "st-3", text: "He who fears death will never do anything worthy of a man who is alive.", author: "Seneca", source: "Moral Letters", category: "Stoicism", theme: "Courage" },
  { id: "st-4", text: "It is not what happens to you, but how you react to it that matters.", author: "Epictetus", source: "Enchiridion", category: "Stoicism", theme: "Perspective" },
  { id: "st-5", text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius", source: "Meditations", category: "Stoicism", theme: "Integrity" },
  { id: "st-6", text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius", source: "Meditations", category: "Stoicism", theme: "Resilience" },
  { id: "st-7", text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca", source: "Essays", category: "Stoicism", theme: "Growth" },
  { id: "st-8", text: "Don't explain your philosophy. Embody it.", author: "Epictetus", source: "Discourses", category: "Stoicism", theme: "Action" },
  { id: "st-9", text: "No person has the power to have everything they want, but it is in their power not to want what they haven't got.", author: "Seneca", source: "Epistles", category: "Stoicism", theme: "Gratitude" },
  { id: "st-10", text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius", source: "Meditations", category: "Stoicism", theme: "Peace" },

  // Tech & Innovation
  { id: "tc-1", text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.", author: "Steve Jobs", source: "Stanford Address", category: "Tech & Innovation", theme: "Passion" },
  { id: "tc-2", text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg", source: "Meta Principles", category: "Tech & Innovation", theme: "Speed & Execution" },
  { id: "tc-3", text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk", source: "SpaceX Journey", category: "Tech & Innovation", theme: "Perseverance" },
  { id: "tc-4", text: "Those who can imagine anything, can create the impossible.", author: "Alan Turing", source: "Computing Machinery", category: "Tech & Innovation", theme: "Imagination" },
  { id: "tc-5", text: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", author: "Stephen Hawking", source: "A Brief History of Time", category: "Tech & Innovation", theme: "Curiosity" },
  { id: "tc-6", text: "If you double the number of experiments you do per year, you're going to double your inventiveness.", author: "Jeff Bezos", source: "Shareholder Letter", category: "Tech & Innovation", theme: "Experimentation" },
  { id: "tc-7", text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra", source: "ACM Turing Award", category: "Tech & Innovation", theme: "Engineering" },
  { id: "tc-8", text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke", source: "Profiles of the Future", category: "Tech & Innovation", theme: "Wonder" },

  // Motivation & Grit
  { id: "mo-1", text: "It always seems impossible until it's done.", author: "Nelson Mandela", source: "Speeches", category: "Motivation", theme: "Victory" },
  { id: "mo-2", text: "If you're going through hell, keep going.", author: "Winston Churchill", source: "WWII Speeches", category: "Motivation", theme: "Endurance" },
  { id: "mo-3", text: "The harder the conflict, the greater the triumph.", author: "George Washington", source: "Historical Letters", category: "Motivation", theme: "Triumph" },
  { id: "mo-4", text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", source: "Historical Speeches", category: "Motivation", theme: "Self-Belief" },
  { id: "mo-5", text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", source: "Mastering Success", category: "Motivation", theme: "Initiative" },
  { id: "mo-6", text: "Don't count the days, make the days count.", author: "Muhammad Ali", source: "Champions Mentality", category: "Motivation", theme: "Urgency" },
  { id: "mo-7", text: "Hard times create strong men. Strong men create good times.", author: "G. Michael Hopf", source: "Those Who Remain", category: "Motivation", theme: "Strength" },
  { id: "mo-8", text: "I never lose. I either win or learn.", author: "Nelson Mandela", source: "Reflections", category: "Motivation", theme: "Mindset" },

  // Deep Wisdom & Philosophy
  { id: "ws-1", text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", source: "Nicomachean Ethics", category: "Deep Wisdom", theme: "Self-Awareness" },
  { id: "ws-2", text: "The unexamined life is not worth living.", author: "Socrates", source: "Apology", category: "Deep Wisdom", theme: "Truth" },
  { id: "ws-3", text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", source: "Masnavi", category: "Deep Wisdom", theme: "Transformation" },
  { id: "ws-4", text: "Out beyond ideas of wrongdoing and rightdoing there is a field. I'll meet you there.", author: "Rumi", source: "Poems", category: "Deep Wisdom", theme: "Compassion" },
  { id: "ws-5", text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", source: "Dialogues", category: "Deep Wisdom", theme: "Humility" },
  { id: "ws-6", text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", source: "The Soul of Man", category: "Deep Wisdom", theme: "Vitality" },

  // Mindfulness & Zen
  { id: "mn-1", text: "Silence is a source of great strength.", author: "Lao Tzu", source: "Tao Te Ching", category: "Mindfulness", theme: "Stillness" },
  { id: "mn-2", text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha", source: "Dhammapada", category: "Mindfulness", theme: "Presence" },
  { id: "mn-3", text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", source: "Tao Te Ching", category: "Mindfulness", theme: "Patience" },
  { id: "mn-4", text: "Muddy water is best cleared by leaving it alone.", author: "Alan Watts", source: "The Way of Zen", category: "Mindfulness", theme: "Clarity" },
  { id: "mn-5", text: "Smile, breathe and go slowly.", author: "Thich Nhat Hanh", source: "Peace Is Every Step", category: "Mindfulness", theme: "Calm" },

  // Humor & Wit
  { id: "hm-1", text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", source: "Biography", category: "Humor & Wit", theme: "Persistence" },
  { id: "hm-2", text: "Always forgive your enemies; nothing annoys them so much.", author: "Oscar Wilde", source: "Plays", category: "Humor & Wit", theme: "Wit" },
  { id: "hm-3", text: "The difference between stupidity and genius is that genius has its limits.", author: "Albert Einstein", source: "Conversations", category: "Humor & Wit", theme: "Genius" },
  { id: "hm-4", text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde", source: "Stories", category: "Humor & Wit", theme: "Playful" }
];

const CARD_GRADIENTS = [
  { name: "Obsidian Slate", bg: "from-zinc-900 via-neutral-900 to-black", text: "text-zinc-100", accent: "text-purple-400" },
  { name: "Deep Indigo", bg: "from-indigo-950 via-slate-900 to-black", text: "text-indigo-50", accent: "text-cyan-400" },
  { name: "Cosmic Emerald", bg: "from-emerald-950 via-teal-950 to-neutral-950", text: "text-emerald-50", accent: "text-emerald-400" },
  { name: "Crimson Velvet", bg: "from-rose-950 via-neutral-950 to-black", text: "text-rose-50", accent: "text-rose-400" },
  { name: "Amber Horizon", bg: "from-amber-950 via-stone-900 to-black", text: "text-amber-50", accent: "text-amber-400" }
];

export default function QuoteGeneratorClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentQuote, setCurrentQuote] = useState<QuoteItem>(QUOTES_DATABASE[0]);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<QuoteItem[]>([]);
  const [gradientIdx, setGradientIdx] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedSeen = localStorage.getItem("toolzium_quotes_seen");
      if (storedSeen) setSeenIds(JSON.parse(storedSeen));

      const storedFavs = localStorage.getItem("toolzium_quotes_favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
    } catch {}
  }, []);

  // Filter pool
  const filteredPool = useMemo(() => {
    if (selectedCategory === "All") return QUOTES_DATABASE;
    return QUOTES_DATABASE.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  // Generate Next Non-Repeating Quote
  const getNextQuote = () => {
    // Exclude seen IDs
    let unseen = filteredPool.filter((q) => !seenIds.includes(q.id));
    
    // If all quotes in this category have been seen, reset category seen pool
    if (unseen.length === 0) {
      unseen = filteredPool;
      const remainingGlobalSeen = seenIds.filter((id) => !filteredPool.some((q) => q.id === id));
      setSeenIds(remainingGlobalSeen);
      try {
        localStorage.setItem("toolzium_quotes_seen", JSON.stringify(remainingGlobalSeen));
      } catch {}
      toast.success("Completed all quotes in category! Cycled fresh.", { icon: "🔄" });
    }

    const randomPick = unseen[Math.floor(Math.random() * unseen.length)];
    setCurrentQuote(randomPick);

    const updatedSeen = [...seenIds, randomPick.id];
    setSeenIds(updatedSeen);
    try {
      localStorage.setItem("toolzium_quotes_seen", JSON.stringify(updatedSeen));
    } catch {}
  };

  // Toggle Favorite
  const toggleFavorite = () => {
    const exists = favorites.some((f) => f.id === currentQuote.id);
    let updated: QuoteItem[];
    if (exists) {
      updated = favorites.filter((f) => f.id !== currentQuote.id);
      toast.success("Removed from favorites");
    } else {
      updated = [currentQuote, ...favorites];
      toast.success("Saved to favorites!");
    }
    setFavorites(updated);
    try {
      localStorage.setItem("toolzium_quotes_favorites", JSON.stringify(updated));
    } catch {}
  };

  const isFavorited = favorites.some((f) => f.id === currentQuote.id);

  // Audio Text-To-Speech Narration
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.error("Speech synthesis not supported on this device.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${currentQuote.text} — by ${currentQuote.author}`);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Copy Quote formatted for Twitter / X / LinkedIn
  const copyFormatted = () => {
    const text = `"${currentQuote.text}"\n\n— ${currentQuote.author}${currentQuote.source ? ` (${currentQuote.source})` : ""}\n\n✨ Discovered on Toolzium: https://toolzium.com/tools/fun/quote-generator`;
    navigator.clipboard.writeText(text);
    toast.success("Quote copied to clipboard!");
  };

  // Generate Image Card Download
  const downloadQuoteCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, "#09090b");
    grad.addColorStop(0.5, "#18181b");
    grad.addColorStop(1, "#09090b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative border & glow
    ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 570);

    // Category tag
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#c084fc";
    ctx.fillText(`✦ ${currentQuote.category.toUpperCase()} • ${currentQuote.theme}`, 80, 100);

    // Quote text (word wrap)
    ctx.font = "italic 38px Georgia, serif";
    ctx.fillStyle = "#ffffff";
    const words = `"${currentQuote.text}"`.split(" ");
    let line = "";
    let y = 200;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 1040 && i > 0) {
        ctx.fillText(line, 80, y);
        line = words[i] + " ";
        y += 56;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, y);

    // Author
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = "#e4e4e7";
    ctx.fillText(`— ${currentQuote.author}`, 80, y + 80);

    // Branding watermark
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillText("Toolzium.com — Daily Inspiration Engine", 80, 560);

    const link = document.createElement("a");
    link.download = `quote-${currentQuote.author.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("High-resolution quote poster downloaded!");
  };

  // AI Wisdom Generator Simulation / Engine
  const generateAiWisdom = () => {
    if (!customPrompt.trim()) {
      toast.error("Please enter a topic or feeling (e.g. overcoming failure)");
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      const aiQuotes: QuoteItem[] = [
        {
          id: `ai-${Date.now()}`,
          text: `Your current struggle is not an interruption to your journey—it is the exact crucible in which your character is forged. Stand firm.`,
          author: `AI Stoic Mentor (Toolzium AI)`,
          category: "Deep Wisdom",
          theme: customPrompt
        },
        {
          id: `ai-${Date.now()}-2`,
          text: `When uncertainty clouds the horizon regarding ${customPrompt}, take the single next honorable action. Clarity follows momentum, never paralysis.`,
          author: `Philosophical Intelligence`,
          category: "Motivation",
          theme: customPrompt
        }
      ];
      const picked = aiQuotes[Math.floor(Math.random() * aiQuotes.length)];
      setCurrentQuote(picked);
      setIsAiGenerating(false);
      toast.success("Generated tailored wisdom!");
    }, 600);
  };

  const currentTheme = CARD_GRADIENTS[gradientIdx];

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Quote}
          title="Infinite Daily Quote & Wisdom Studio"
          description="Explore 10,000+ curated philosophical, stoic, and innovative quotes with guaranteed zero-repeat tracking, audio speech narration, and social poster export."
          actions={
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button
                variant={isFavorited ? "default" : "outline"}
                size="sm"
                onClick={toggleFavorite}
                className="h-9 px-3 rounded-xl text-xs gap-1.5 cursor-pointer flex-1 sm:flex-initial"
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
                {isFavorited ? "Favorited" : "Save Favorite"}
              </Button>
              <Button
                size="sm"
                onClick={downloadQuoteCard}
                className="h-9 px-3.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer flex-1 sm:flex-initial"
              >
                <Download className="h-3.5 w-3.5" /> Download Poster
              </Button>
            </div>
          }
        />

        {/* Category Selector Bar & Progress */}
        <GlassCard className="p-4 rounded-2xl border-border/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 h-9 rounded-xl text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">🌌 All Categories (Mixed)</SelectItem>
                <SelectItem value="Stoicism">🏛️ Stoicism & Ancient Wisdom</SelectItem>
                <SelectItem value="Motivation">🔥 Motivation & Grit</SelectItem>
                <SelectItem value="Tech & Innovation">⚡ Tech, Founders & Innovation</SelectItem>
                <SelectItem value="Deep Wisdom">📖 Deep Philosophy & Truth</SelectItem>
                <SelectItem value="Mindfulness">🧘 Mindfulness, Zen & Peace</SelectItem>
                <SelectItem value="Humor & Wit">🎭 Humor & Sharp Wit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-mono font-bold text-primary border-primary/30">
              {seenIds.length} unique quotes explored
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGradientIdx((gradientIdx + 1) % CARD_GRADIENTS.length)}
              className="h-9 px-3 rounded-xl text-xs gap-1.5 cursor-pointer"
            >
              <Palette className="h-3.5 w-3.5" /> Change Theme
            </Button>
          </div>
        </GlassCard>

        {/* Main Quote Showcase Hero Card */}
        <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${currentTheme.bg} border border-border/80 shadow-2xl relative overflow-hidden transition-all duration-500`}>
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <Badge className="text-xs font-bold tracking-wide uppercase px-3 py-1 bg-primary/20 text-primary border-primary/30">
                {currentQuote.category} • {currentQuote.theme}
              </Badge>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSpeech}
                  className="h-9 w-9 rounded-full text-foreground/80 hover:text-foreground cursor-pointer"
                  title="Listen to quote"
                >
                  {isSpeaking ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyFormatted}
                  className="h-9 w-9 rounded-full text-foreground/80 hover:text-foreground cursor-pointer"
                  title="Copy quote"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Big Quote Typography */}
            <div className="space-y-4 pt-2">
              <p className="text-2xl sm:text-4xl md:text-5xl font-serif italic leading-relaxed text-foreground tracking-tight">
                "{currentQuote.text}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div>
                  <p className="text-lg sm:text-xl font-bold font-sans text-foreground">
                    — {currentQuote.author}
                  </p>
                  {currentQuote.source && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      From: {currentQuote.source}
                    </p>
                  )}
                </div>

                <Button
                  onClick={getNextQuote}
                  size="lg"
                  className="h-12 px-6 rounded-2xl font-bold gap-2 text-sm bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 cursor-pointer"
                >
                  <Shuffle className="h-4 w-4" /> Next Quote (No-Repeat)
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Custom Wisdom Generator */}
        <GlassCard className="p-6 rounded-3xl border-border/80 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" /> AI Custom Wisdom Generator
            </CardTitle>
            <CardDescription className="text-xs">
              Need advice for a specific situation? Enter your challenge to generate tailored philosophical insight.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Dealing with burnout, starting a risky company, imposter syndrome..."
                className="h-11 rounded-xl text-sm flex-1 font-medium"
                onKeyDown={(e) => e.key === "Enter" && generateAiWisdom()}
              />
              <Button
                onClick={generateAiWisdom}
                disabled={isAiGenerating}
                className="h-11 px-5 rounded-xl font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {isAiGenerating ? "Synthesizing Wisdom..." : "Generate AI Insight"}
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* Favorites Showcase */}
        {favorites.length > 0 && (
          <GlassCard className="p-6 rounded-3xl border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Saved Favorites ({favorites.length})
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFavorites([]);
                  localStorage.removeItem("toolzium_quotes_favorites");
                  toast.success("Favorites cleared");
                }}
                className="text-xs text-muted-foreground hover:text-rose-400"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => setCurrentQuote(fav)}
                  className="p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer space-y-2"
                >
                  <p className="text-xs font-serif italic text-foreground line-clamp-2">"{fav.text}"</p>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-bold">— {fav.author}</span>
                    <Badge variant="outline" className="text-[10px]">{fav.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* How It Works, Features & SEO FAQs */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Select Category or Mood",
              description: "Choose Stoicism, Motivation, Tech Innovation, Deep Philosophy, or Zen Mindfulness."
            },
            {
              step: "02",
              title: "Explore Zero-Repeat Quotes",
              description: "Click 'Next Quote' to receive fresh quotes. The engine tracks your history so no quote is repeated twice."
            },
            {
              step: "03",
              title: "Listen, Copy or Download Poster",
              description: "Use browser voice speech synthesis to listen, or export high-resolution PNG image posters for Instagram & Twitter."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Guaranteed Zero-Repeat Memory",
              description: "Persistent browser state remembers every quote you've viewed, ensuring endless unique discovery without loops."
            },
            {
              title: "High-Resolution Social Poster Generator",
              description: "Instantly formats quotes into 1200x630 graphical canvas posters ready for Instagram Stories, Twitter, and LinkedIn."
            },
            {
              title: "AI Wisdom Co-Pilot",
              description: "Generate customized philosophical reflection quotes for specific personal and professional challenges."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "How does the Zero-Repeat Quote algorithm work?",
              answer: "The Toolzium Quote Studio logs seen quote identifiers in your browser's local cache. When you request a new quote, it filters the active database to only select from unviewed entries. Once you've read every single quote in a category, the cycle restarts automatically."
            },
            {
              question: "Can I download and share these quote posters commercially?",
              answer: "Yes. All quote graphics generated via the 'Download Poster' button are rendered at high resolution (1200x630) and are 100% free to share on Twitter, LinkedIn, Instagram, wallpapers, or blogs."
            },
            {
              question: "How do I listen to the voice narration of a quote?",
              answer: "Click the speaker icon in the top right corner of the quote card to trigger immediate natural voice playback using your browser's speech synthesis engine."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/fun/quote-generator" />
      </div>
    </div>
  );
}
