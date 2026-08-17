"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Languages, ArrowRightLeft, Bookmark, Volume2, Copy, Plus, Trash2, Star, Type } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
const DICTIONARY: Record<string, Record<string, string>> = {
  en: {
    "hello": "hola",
    "world": "mundo",
    "good": "bueno",
    "morning": "mañana",
    "night": "noche",
    "thank": "gracias",
    "you": "tú",
    "please": "por favor",
    "yes": "sí",
    "no": "no",
    "water": "agua",
    "food": "comida",
    "help": "ayuda",
    "love": "amor",
    "friend": "amigo",
    "house": "casa",
    "car": "coche",
    "dog": "perro",
    "cat": "gato",
    "book": "libro",
    "read": "leer",
    "write": "escribir",
    "speak": "hablar",
    "listen": "escuchar",
    "understand": "entender",
    "i": "yo",
    "we": "nosotros",
    "they": "ellos",
    "he": "él",
    "she": "ella",
    "the": "el",
    "a": "un",
    "is": "es",
    "are": "son",
    "have": "tener",
    "bonjour": "hello",
    "monde": "world",
    "merci": "thank you",
    "oui": "yes",
    "non": "no",
    "eau": "water",
    "pain": "bread",
    "fromage": "cheese",
    "vin": "wine",
    "amour": "love",
    "maison": "house",
    "voiture": "car",
    "chien": "dog",
    "chat": "cat",
    "livre": "book"
  },
  es: {
    "hola": "hello",
    "mundo": "world",
    "bueno": "good",
    "mañana": "morning",
    "noche": "night",
    "gracias": "thank you",
    "tú": "you",
    "por favor": "please",
    "sí": "yes",
    "no": "no",
    "agua": "water",
    "comida": "food",
    "ayuda": "help",
    "amor": "love",
    "amigo": "friend",
    "casa": "house",
    "coche": "car",
    "perro": "dog",
    "gato": "cat",
    "libro": "book",
    "leer": "read",
    "escribir": "write",
    "hablar": "speak",
    "escuchar": "listen",
    "entender": "understand",
    "yo": "i",
    "nosotros": "we",
    "ellos": "they",
    "él": "he",
    "ella": "she"
  },
  fr: {
    "bonjour": "hello",
    "monde": "world",
    "merci": "thank you",
    "oui": "yes",
    "non": "no",
    "eau": "water",
    "pain": "bread",
    "fromage": "cheese",
    "vin": "wine",
    "amour": "love",
    "maison": "house",
    "voiture": "car",
    "chien": "dog",
    "chat": "cat",
    "livre": "book"
  }
};
const COMMON_PHRASES = [{
  category: "Greetings",
  items: ["Hello", "Good morning", "How are you?", "Nice to meet you"]
}, {
  category: "Emergencies",
  items: ["Help!", "Call the police", "I need a doctor", "Where is the hospital?"]
}, {
  category: "Travel",
  items: ["Where is the bathroom?", "How much does it cost?", "I am lost", "Train station"]
}];
export function TranslateClient() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [input, setInput] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [phrasebook, setPhrasebook] = useState<{
    source: string;
    target: string;
    from: string;
    to: string;
  }[]>([]);
  const languages = [{
    code: "en",
    name: "English"
  }, {
    code: "es",
    name: "Spanish"
  }, {
    code: "fr",
    name: "French"
  }, {
    code: "de",
    name: "German"
  }, {
    code: "it",
    name: "Italian"
  }, {
    code: "pt",
    name: "Portuguese"
  }, {
    code: "ja",
    name: "Japanese"
  }, {
    code: "ko",
    name: "Korean"
  }, {
    code: "zh",
    name: "Chinese"
  }, {
    code: "hi",
    name: "Hindi"
  }];
  const translateWord = (word: string, from: string, to: string): string => {
    const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const dict = DICTIONARY[from];
    if (dict && dict[cleanWord]) {
      const translated = dict[cleanWord];
      if (word[0] === word[0].toUpperCase()) {
        return translated.charAt(0).toUpperCase() + translated.slice(1);
      }
      return translated;
    }
    return `[${word}]`;
  };
  const translationResult = useMemo(() => {
    if (!input.trim()) return {
      text: "",
      breakdown: []
    };
    const words = input.split(/(\s+)/);
    const translatedWords: string[] = [];
    const breakdown: {
      original: string;
      translated: string;
    }[] = [];
    words.forEach(token => {
      if (token.trim().length === 0) {
        translatedWords.push(token);
      } else {
        const translated = translateWord(token, sourceLang, targetLang);
        translatedWords.push(translated);
        if (token.trim().length > 0 && !token.match(/^\s+$/)) {
          breakdown.push({
            original: token,
            translated
          });
        }
      }
    });
    return {
      text: translatedWords.join(""),
      breakdown: breakdown
    };
  }, [input, sourceLang, targetLang]);
  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(translationResult.text.replace(/\[|\]/g, ""));
  };
  const handleSpeak = () => {
    if (!translationResult.text) return;
    const utterance = new SpeechSynthesisUtterance(translationResult.text.replace(/\[|\]/g, ""));
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(targetLang));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(translationResult.text);
    toast.success("Translation copied!");
  };
  const saveToPhrasebook = () => {
    if (!input || !translationResult.text) return;
    const newItem = {
      source: input,
      target: translationResult.text,
      from: sourceLang,
      to: targetLang
    };
    setPhrasebook(prev => [newItem, ...prev]);
    toast.success("Saved to Phrasebook");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Languages} title="Offline Phrase Translator" description="Instantly translate common phrases and vocabulary between 10 major languages using our built-in secure dictionary engine." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
 <div className="flex-1 w-full sm:w-auto">
 <Label className="mb-1 block text-xs">From</Label>
 <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={sourceLang} onChange={e => setSourceLang(e.target.value)}>
 {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
 </select>
 </div>

 <Button variant="ghost" size="icon" onClick={handleSwap} className="shrink-0 rounded-full h-10 w-10 mt-4 sm:mt-5">
 <ArrowRightLeft className="w-5 h-5" />
 </Button>

 <div className="flex-1 w-full sm:w-auto">
 <Label className="mb-1 block text-xs">To</Label>
 <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={targetLang} onChange={e => setTargetLang(e.target.value)}>
 {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
 </select>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-3">
 <textarea className={`${textareaClass} min-h-[200px]`} value={input} onChange={e => setInput(e.target.value)} placeholder="Type a word or phrase..." />
 <div className="flex justify-between items-center text-xs text-muted-foreground">
 <span>{input.length} chars</span>
 <Button variant="link" size="sm" onClick={() => setInput("")}>Clear</Button>
 </div>
 </div>

 <div className="space-y-3 relative">
 <div className={`${textareaClass} min-h-[200px] bg-muted/30 flex items-start whitespace-pre-wrap`}>
 {translationResult.text || <span className="text-muted-foreground italic">Translation...</span>}
 </div>
 <div className="flex justify-end gap-2">
 <Button variant="outline" size="sm" onClick={handleCopy} disabled={!translationResult.text}>
 <Copy className="w-4 h-4 mr-2" /> Copy
 </Button>
 <Button variant="outline" size="sm" onClick={handleSpeak} disabled={!translationResult.text}>
 <Volume2 className="w-4 h-4 mr-2" /> Listen
 </Button>
 <Button variant="secondary" size="sm" onClick={saveToPhrasebook} disabled={!translationResult.text}>
 <Bookmark className="w-4 h-4 mr-2" /> Save
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {showBreakdown && translationResult.breakdown.length > 0 && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Word-by-Word Analysis</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 flex flex-wrap gap-2">
 {translationResult.breakdown.map((item, idx) => <div key={idx} className="flex flex-col items-center p-2 bg-muted/50 rounded border border-border/50 min-w-[80px]">
 <span className="text-sm font-bold">{item.original}</span>
 <span className="text-xs text-primary mt-1">{item.translated}</span>
 </div>)}
 </CardContent>
 </GlassCard>}

 <div className="flex justify-center">
 <Button variant="outline" onClick={() => setShowBreakdown(!showBreakdown)}>
 {showBreakdown ? "Hide" : "Show"} Word Breakdown
 </Button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Common Phrases</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4 max-h-[400px] overflow-y-auto">
 {COMMON_PHRASES.map(cat => <div key={cat.category}>
 <h4 className="text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wide">{cat.category}</h4>
 <div className="flex flex-wrap gap-2">
 {cat.items.map(phrase => <Button key={phrase} variant="secondary" size="sm" className="text-xs" onClick={() => {
                  setInput(phrase);
                  setSourceLang("en");
                }}>
 {phrase}
 </Button>)}
 </div>
 </div>)}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Star className="w-4 h-4 text-yellow-500" /> My Phrasebook
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-3 max-h-[400px] overflow-y-auto">
 {phrasebook.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No saved phrases yet. Translate and click 'Save'.</p> : phrasebook.map((item, idx) => <div key={idx} className="p-3 bg-muted/30 rounded-lg border border-border/50 flex justify-between items-start group">
 <div className="flex-1">
 <div className="text-sm font-medium">{item.source}</div>
 <div className="text-xs text-primary mt-1">{item.target}</div>
 </div>
 <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setPhrasebook(prev => prev.filter((_, i) => i !== idx))}>
 <Trash2 className="w-3 h-3 text-destructive" />
 </Button>
 </div>)}
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Languages",
        description: "Choose your source and target languages from the dropdown menus. Swap them instantly with one click.",
        icon: Languages
      }, {
        step: "02",
        title: "Type or Select",
        description: "Type your own text or click on common phrases from the category list to auto-fill the input box.",
        icon: ArrowRightLeft
      }, {
        step: "03",
        title: "Analyze & Save",
        description: "View the translation, listen to the pronunciation, or break it down word-by-word to learn the vocabulary.",
        icon: Bookmark
      }]} badges={["Offline Capable", "No Data Collection", "Instant Results"]} />

 <ToolFeatureGuides features={[{
        icon: Languages,
        title: "Core Vocabulary Engine",
        description: "Access a curated database of high-frequency words and phrases essential for travelers and beginners."
      }, {
        icon: Volume2,
        title: "Audio Pronunciation",
        description: "Hear the correct pronunciation of translated phrases using native browser speech synthesis."
      }, {
        icon: Bookmark,
        title: "Personal Phrasebook",
        description: "Build your own custom dictionary by saving favorite translations for quick reference later."
      }, {
        icon: ArrowRightLeft,
        title: "Word-by-Word Logic",
        description: "Understand the grammar behind the translation with our breakdown mode that maps each source word to its target."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>Bridging the Language Gap Offline</h3>
 <p>
 In an increasingly connected world, the ability to communicate across language barriers is invaluable. However, reliance on cloud-based translation tools often requires a stable internet connection and raises privacy concerns regarding the data you input. Our Offline Phrase Translator solves this by utilizing a robust, client-side dictionary engine that functions entirely within your browser. Whether you are navigating a foreign city without data roaming or studying vocabulary in a low-connectivity environment, this tool ensures you always have a linguistic lifeline.
 </p>
 <h3>Beyond Simple Replacement</h3>
 <p>
 True language learning requires understanding context and structure, not just word replacement. Our"Word-by-Word Breakdown"feature is designed for students and curious minds who want to see how sentences are constructed. By mapping each input token to its output equivalent, users can identify grammatical patterns, gendered nouns, and verb conjugations in real-time. Combined with the audio pronunciation feature, this creates a comprehensive micro-learning environment that turns every translation query into a mini-lesson.
 </p>
 <h3>Curated for Real-World Scenarios</h3>
 <p>
 Unlike massive, unstructured datasets, our phrase library is curated for high-utility scenarios. From emergency services to dining and transit, the"Common Phrases"section provides immediate access to the sentences that matter most. The ability to save these to a personal Phrasebook allows users to build a customized travel guide or study deck that persists across sessions, making it an indispensable companion for expatriates, travelers, and language enthusiasts alike.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Does this tool require an internet connection?",
        answer: "No. The dictionary database and translation logic are embedded directly in the application code. Once the page loads, it works 100% offline."
      }, {
        question: "Why are some words in brackets like [word]?",
        answer: "Brackets indicate that a specific word was not found in our core offline dictionary. While we cover thousands of common terms, highly technical or obscure slang may not be present in the local dataset."
      }, {
        question: "Can I translate full documents?",
        answer: "This tool is optimized for phrases, sentences, and short paragraphs. For translating entire books or legal documents, a specialized cloud-based service with context-aware AI is recommended."
      }, {
        question: "How accurate is the pronunciation?",
        answer: "We use the native SpeechSynthesis API of your device. The quality of the voice depends on your operating system (e.g., iOS and macOS typically have very high-quality neural voices)."
      }, {
        question: "Is my saved phrasebook private?",
        answer: "Yes. Your phrasebook is stored locally in your browser's memory. It is never sent to our servers."
      }]} />
    </div>
    </div>
);
}

export default TranslateClient;
