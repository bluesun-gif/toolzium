"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { SmilePlus, Trash2 } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const EMOJI_MAP: Record<string, string> = {
  "happy": "😀",
  "sad": "😢",
  "angry": "😡",
  "love": "❤️",
  "heart": "❤️",
  "dog": "🐶",
  "cat": "🐱",
  "mouse": "🐭",
  "cow": "🐮",
  "pig": "🐷",
  "sun": "☀️",
  "moon": "🌙",
  "star": "⭐",
  "cloud": "☁️",
  "rain": "🌧️",
  "fire": "🔥",
  "water": "💧",
  "tree": "🌳",
  "flower": "🌸",
  "leaf": "🍃",
  "apple": "🍎",
  "banana": "🍌",
  "grape": "🍇",
  "pizza": "🍕",
  "burger": "🍔",
  "car": "🚗",
  "bus": "🚌",
  "train": "🚆",
  "plane": "✈️",
  "boat": "⛵",
  "house": "🏠",
  "school": "🏫",
  "hospital": "🏥",
  "store": "🏪",
  "bank": "🏦",
  "book": "📖",
  "pen": "🖊️",
  "pencil": "✏️",
  "paper": "📄",
  "computer": "💻",
  "phone": "📱",
  "tv": "📺",
  "radio": "📻",
  "camera": "📷",
  "video": "📹",
  "music": "🎵",
  "song": "🎶",
  "guitar": "🎸",
  "piano": "🎹",
  "drum": "🥁",
  "money": "💵",
  "dollar": "💲",
  "gold": "🥇",
  "silver": "🥈",
  "bronze": "🥉",
  "time": "⏰",
  "clock": "🕒",
  "watch": "⌚",
  "hour": "⏳",
  "calendar": "📅",
  "smile": "😊",
  "laugh": "😂",
  "cry": "😭",
  "sleep": "😴",
  "eat": "🍽️",
  "run": "🏃",
  "walk": "🚶",
  "jump": "🤸",
  "swim": "🏊",
  "fly": "🦅"
};
export default function EmojiStoryClient() {
  const [input, setInput] = useState("I love to eat pizza and watch tv at my house.");
  const emojiText = useMemo(() => {
    if (!input) return "";
    const regex = new RegExp(`\\b(${Object.keys(EMOJI_MAP).join('|')})\\b`, 'gi');
    return input.replace(regex, match => EMOJI_MAP[match.toLowerCase()]);
  }, [input]);
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={SmilePlus} title="Emoji Story Generator" description="Translate your sentences into fun emoji-filled stories instantly." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <SmilePlus className="w-4 h-4 text-primary" /> Story Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="flex justify-end">
 <Button onClick={() => {
              setInput("");
              toast.success("Cleared!");
            }} variant="outline" size="sm" className="gap-2">
 <Trash2 className="w-4 h-4" /> Clear
 </Button>
 </div>
 <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" placeholder="Write your story here... (e.g., The dog ran to the house)" />
 
 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-semibold">Emoji Translation</h3>
 <CopyButton getText={() => emojiText} label="Copy Story" />
 </div>
 <div className="w-full rounded-lg border border-border/70 bg-muted/30 p-4 text-lg min-h-[100px] whitespace-pre-wrap">
 {emojiText || "Your emoji story will appear here..."}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Write Story",
        description: "Type a sentence or paragraph using common English words.",
        icon: SmilePlus
      }, {
        step: "02",
        title: "Auto-Translate",
        description: "The tool scans your text and replaces matching words with emojis.",
        icon: SmilePlus
      }, {
        step: "03",
        title: "Share",
        description: "Copy your new emoji story and send it to friends or social media.",
        icon: SmilePlus
      }]} badges={["100% Free", "Client-Side", "Fun"]} />

 <ToolFeatureGuides features={[{
        icon: SmilePlus,
        title: "60+ Word Dictionary",
        description: "Supports a wide range of common nouns, verbs, and emotions."
      }, {
        icon: SmilePlus,
        title: "Case Insensitive",
        description: "Matches words regardless of capitalization."
      }, {
        icon: SmilePlus,
        title: "Context Aware",
        description: "Uses word boundaries to prevent replacing parts of larger words."
      }, {
        icon: SmilePlus,
        title: "Real-time Processing",
        description: "See your story transform as you type without clicking a button."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Emojis have become a universal language, adding emotion and visual flair to our digital communications. The Emoji Story Generator automatically translates your plain text into a vibrant sequence of emojis.</p>
 <p>Using a built-in dictionary of over 60 common words, the tool uses regular expressions with word boundaries to ensure accurate replacements. Try writing about animals, food, weather, or daily activities to see the magic happen!</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Why didn't some of my words turn into emojis?",
        answer: "The tool currently supports a specific dictionary of ~70 common words. If a word isn't in the dictionary, it will remain as plain text."
      }, {
        question: "Does it replace parts of words?",
        answer: "No. The tool uses word boundary matching, so the word 'cat' will not be replaced inside the word 'catalog'."
      }, {
        question: "Can I use it for secret messages?",
        answer: "While fun, emoji translation is not a secure encryption method. Anyone can guess the original words based on context!"
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/emoji-story" max={6} />
 </div></div>;
}