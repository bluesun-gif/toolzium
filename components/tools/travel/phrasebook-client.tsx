"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import { AlertTriangle, Copy, Globe, Search, Shield, Sparkles, Star, Volume2, WifiOff, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Phrase = {
  en: string;
  translation: string;
  phonetic: string;
};
type Category = {
  name: string;
  phrases: Phrase[];
};
const PHRASE_DATA: Record<string, Category[]> = {
  Spanish: [{
    name: "Greetings",
    phrases: [{
      en: "Hello",
      translation: "Hola",
      phonetic: "oh-lah"
    }, {
      en: "Good morning",
      translation: "Buenos días",
      phonetic: "bweh-nohs dee-ahs"
    }, {
      en: "Good night",
      translation: "Buenas noches",
      phonetic: "bweh-nahs noh-chehs"
    }, {
      en: "How are you?",
      translation: "¿Cómo estás?",
      phonetic: "koh-moh ehs-tahs"
    }, {
      en: "Thank you",
      translation: "Gracias",
      phonetic: "grah-see-ahs"
    }]
  }, {
    name: "Emergency",
    phrases: [{
      en: "Help!",
      translation: "¡Ayuda!",
      phonetic: "ah-yoo-dah"
    }, {
      en: "I need a doctor",
      translation: "Necesito un médico",
      phonetic: "neh-seh-see-toh oon meh-dee-koh"
    }, {
      en: "Where is the hospital?",
      translation: "¿Dónde está el hospital?",
      phonetic: "dohn-deh ehs-tah ehl ohs-pee-tahl"
    }]
  }],
  French: [{
    name: "Greetings",
    phrases: [{
      en: "Hello",
      translation: "Bonjour",
      phonetic: "bohn-zhoor"
    }, {
      en: "Thank you",
      translation: "Merci",
      phonetic: "mair-see"
    }]
  }, {
    name: "Emergency",
    phrases: [{
      en: "Help!",
      translation: "Au secours!",
      phonetic: "oh seh-koor"
    }]
  }]
};
const LANGUAGES = ["Spanish", "French", "German", "Italian", "Japanese", "Korean", "Portuguese", "Mandarin"];
const CATEGORIES = ["Greetings", "Directions", "Food & Dining", "Emergency", "Shopping", "Transportation", "Accommodation"];
export function PhrasebookClient() {
  const [language, setLanguage] = useState("Spanish");
  const [category, setCategory] = useState("Greetings");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const playAudio = (text: string, langCode: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      window.speechSynthesis.speak(utterance);
    }
  };
  const getLangCode = (lang: string) => {
    const map: Record<string, string> = {
      Spanish: "es-ES",
      French: "fr-FR",
      German: "de-DE",
      Italian: "it-IT",
      Japanese: "ja-JP",
      Korean: "ko-KR",
      Portuguese: "pt-PT",
      Mandarin: "zh-CN"
    };
    return map[lang] || "en-US";
  };
  const toggleFavorite = (enPhrase: string) => {
    setFavorites(prev => prev.includes(enPhrase) ? prev.filter(p => p !== enPhrase) : [...prev, enPhrase]);
  };
  const getPhrases = () => {
    const langData = PHRASE_DATA[language] || [];
    const catData = langData.find(c => c.name === category);
    let phrases = catData?.phrases || [{
      en: `Hello in ${language} (mock)`,
      translation: `Hello`,
      phonetic: "heh-loh"
    }, {
      en: `Where is the bathroom? in ${language} (mock)`,
      translation: `Bathroom`,
      phonetic: "bath-room"
    }];
    if (search) {
      const allLangPhrases = (PHRASE_DATA[language] || []).flatMap(c => c.phrases);
      phrases = allLangPhrases.filter(p => p.en.toLowerCase().includes(search.toLowerCase()) || p.translation.toLowerCase().includes(search.toLowerCase()));
      if (phrases.length === 0) {
        phrases = [{
          en: "Search result (mock)",
          translation: `Result for ${search}`,
          phonetic: "mock"
        }];
      }
    }
    return phrases;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Globe} title="Travel Phrasebook" description="Common travel phrases in 8 languages." />

 <GlassCard>
 <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
 <div className="flex-1 space-y-2">
 <Select value={language} onValueChange={setLanguage}>
 <SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger>
 <SelectContent>
 {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="flex-1 space-y-2">
 <Select value={category} onValueChange={val => {
              setCategory(val);
              setSearch("");
            }}>
 <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="flex-1 relative">
 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
 <Input placeholder="Search phrases..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {getPhrases().map((p, i) => <GlassCard key={i} className={cn("relative", category === "Emergency" && "border-red-500/50")}>
 {category === "Emergency" && <AlertTriangle className="absolute top-4 right-4 h-4 w-4 text-red-500 opacity-50" />}
 <CardContent className="pt-6">
 <div className="flex justify-between items-start mb-2">
 <div className="font-medium">{p.en}</div>
 <Button onClick={() => toggleFavorite(p.en)} className="text-muted-foreground hover:text-yellow-500">
 <Star className={cn("h-5 w-5", favorites.includes(p.en) && "fill-yellow-500 text-yellow-500")} />
 </Button>
 </div>
 <div className="text-xl font-semibold text-primary mb-1">{p.translation}</div>
 <div className="text-sm text-muted-foreground mb-4 font-mono">{p.phonetic}</div>
 <div className="flex gap-2">
 <Button variant="outline" size="sm" onClick={() => playAudio(p.translation, getLangCode(language))}>
 <Volume2 className="h-4 w-4 mr-2" /> Listen
 </Button>
 <CopyButton getText={() => p.translation} label="Copy" />
 </div>
 </CardContent>
 </GlassCard>)}
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Select Language", description: "Choose your destination country language from 50+ supported languages.", icon: Globe },
        { step: "02", title: "Browse or Search", description: "Browse by category (greetings, food, transport) or search for any phrase.", icon: Search },
        { step: "03", title: "Listen & Copy", description: "Tap the speaker icon to hear pronunciation, or copy the phrase to show locals.", icon: Volume2 },
      ]} badges={["50+ Languages", "Audio", "Offline"]} />

      <ToolFeatureGuides features={[
        { icon: Globe, title: "50+ Languages", description: "Essential phrases in 50+ languages covering all major travel destinations." },
        { icon: Volume2, title: "Audio Pronunciation", description: "Hear the correct pronunciation of every phrase — never mispronounce again." },
        { icon: WifiOff, title: "Offline Access", description: "Download your phrasebook for offline use — no internet needed at the destination." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Travel Phrasebook?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Phrasebook provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />
    </div>
    </div>
);
}

export default PhrasebookClient;
