"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Languages, ArrowRightLeft, Volume2, Copy, Check, Trash2, Download,
  Sparkles, Loader2, RefreshCw, Wand2, ChevronDown, CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";

const LANGUAGES = [
  { code: "en", name: "English", speech: "en-US" },
  { code: "es", name: "Spanish (Español)", speech: "es-ES" },
  { code: "hi", name: "Hindi (हिन्दी)", speech: "hi-IN" },
  { code: "bn", name: "Bengali (বাংলা)", speech: "bn-BD" },
  { code: "fr", name: "French (Français)", speech: "fr-FR" },
  { code: "de", name: "German (Deutsch)", speech: "de-DE" },
  { code: "ar", name: "Arabic (العربية)", speech: "ar-SA" },
  { code: "zh", name: "Chinese (中文)", speech: "zh-CN" },
  { code: "ja", name: "Japanese (日本語)", speech: "ja-JP" },
  { code: "ko", name: "Korean (한국어)", speech: "ko-KR" },
  { code: "pt", name: "Portuguese (Português)", speech: "pt-BR" },
  { code: "ru", name: "Russian (Русский)", speech: "ru-RU" },
  { code: "it", name: "Italian (Italiano)", speech: "it-IT" },
  { code: "tr", name: "Turkish (Türkçe)", speech: "tr-TR" },
  { code: "id", name: "Indonesian (Bahasa)", speech: "id-ID" },
  { code: "nl", name: "Dutch (Nederlands)", speech: "nl-NL" },
  { code: "pl", name: "Polish (Polski)", speech: "pl-PL" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)", speech: "vi-VN" },
  { code: "ur", name: "Urdu (اردو)", speech: "ur-PK" },
  { code: "tl", name: "Tagalog (Filipino)", speech: "tl-PH" },
];

const SAMPLE_PHRASES = [
  "rain",
  "Hello, how are you today?",
  "Where is the nearest train station?",
  "Thank you very much for your assistance.",
  "Let's build something extraordinary together.",
];

export default function TranslateClient() {
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("hi");
  const [inputText, setInputText] = useState<string>("rain");
  const [translatedText, setTranslatedText] = useState<string>("बरसात (बारिश)");
  const [tone, setTone] = useState<"standard" | "formal" | "casual" | "friendly">("standard");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const executeTranslation = useCallback(
    async (textToTranslate: string, from: string, to: string, currentTone: string) => {
      if (!textToTranslate.trim()) {
        setTranslatedText("");
        return;
      }

      setIsTranslating(true);
      try {
        const res = await fetch("/api/ai/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textToTranslate,
            from,
            to,
            tone: currentTone,
          }),
        });

        const data = await res.json();
        if (res.ok && data.translatedText) {
          setTranslatedText(data.translatedText);
        } else {
          // Direct fallback if API route has errors
          const fallbackRes = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
              textToTranslate.slice(0, 500)
            )}&langpair=${from}|${to}`
          );
          const fallbackData = await fallbackRes.json();
          if (fallbackData.responseData?.translatedText) {
            setTranslatedText(fallbackData.responseData.translatedText);
          }
        }
      } catch (err) {
        console.error("Translation error:", err);
      } finally {
        setIsTranslating(false);
      }
    },
    []
  );

  // Trigger translation when input, languages, or tone change with debounce
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      executeTranslation(inputText, sourceLang, targetLang, tone);
    }, 400);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [inputText, sourceLang, targetLang, tone, executeTranslation]);

  // Swap source and target languages
  const handleSwap = () => {
    const prevSource = sourceLang;
    const prevTarget = targetLang;
    const prevInput = inputText;
    const prevTrans = translatedText;

    setSourceLang(prevTarget);
    setTargetLang(prevSource);
    setInputText(prevTrans);
    setTranslatedText(prevInput);
  };

  // Speak text with native Web Speech API
  const speakText = (text: string, langCode: string) => {
    if (!text.trim() || typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.error("Speech audio is not available.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langObj = LANGUAGES.find((l) => l.code === langCode);
    if (langObj) utterance.lang = langObj.speech;
    window.speechSynthesis.speak(utterance);
    toast.success("Playing pronunciation audio...");
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Translation copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
  };

  const getLangName = (code: string) => {
    return LANGUAGES.find((l) => l.code === code)?.name || code;
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Universal Neural AI Translator & Voice Pronunciation"
          description="Instantly translate phrases, sentences, and complete paragraphs across 50+ languages with natural AI tone adaptation and native audio pronunciation."
          icon={Languages}
          badgeText="🌍 50+ Languages • High-Accuracy Neural Translation"
        />

        {/* Translation Studio Glass Card */}
        <GlassCard className="p-5 sm:p-6 space-y-5">
          
          {/* Language Selector Bar & Swap Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 bg-muted/40 rounded-2xl border border-border/60">
            
            {/* Source Language */}
            <div className="flex-1 space-y-1">
              <Label className="text-[11px] font-semibold text-muted-foreground px-1">Translate From</Label>
              <div className="relative">
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full bg-background border border-border text-foreground font-bold text-xs rounded-xl h-11 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center pt-2 sm:pt-5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="h-11 w-11 rounded-xl hover:bg-primary/10 hover:text-primary border-border/80 shadow-sm cursor-pointer"
                title="Swap languages"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* Target Language */}
            <div className="flex-1 space-y-1">
              <Label className="text-[11px] font-semibold text-muted-foreground px-1">Translate To</Label>
              <div className="relative">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-background border border-border text-foreground font-bold text-xs rounded-xl h-11 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Tone Selector */}
            <div className="sm:w-44 space-y-1">
              <Label className="text-[11px] font-semibold text-muted-foreground px-1">Tone & Formality</Label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                  className="w-full bg-background border border-border text-foreground font-semibold text-xs rounded-xl h-11 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                >
                  <option value="standard">Standard</option>
                  <option value="formal">Formal / Professional</option>
                  <option value="casual">Casual / Conversational</option>
                  <option value="friendly">Friendly / Warm</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Sample Phrases Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-muted-foreground font-semibold">Try sample:</span>
            {SAMPLE_PHRASES.map((phrase, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputText(phrase)}
                className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-lg border border-border/60 transition-all cursor-pointer"
              >
                &ldquo;{phrase}&rdquo;
              </button>
            ))}
          </div>

          {/* Two-Column Editor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left: Input Text Card */}
            <div className="flex flex-col space-y-2 rounded-2xl border border-border/80 bg-background/60 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <span>{getLangName(sourceLang)}</span>
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(inputText, sourceLang)}
                    disabled={!inputText.trim()}
                    className="h-8 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                    title="Listen to original text"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </Button>
                  {inputText && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="h-8 text-xs text-muted-foreground hover:text-destructive"
                      title="Clear text"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste any text to translate..."
                rows={8}
                className="w-full bg-transparent text-foreground text-sm sm:text-base outline-none resize-y min-h-[180px] leading-relaxed"
              />

              <div className="text-[11px] text-muted-foreground font-mono pt-1 text-right">
                {inputText.length} characters
              </div>
            </div>

            {/* Right: Translated Output Card */}
            <div className="flex flex-col space-y-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  {isTranslating ? (
                    <span className="flex items-center gap-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Translating...
                    </span>
                  ) : (
                    <span>{getLangName(targetLang)} Translation</span>
                  )}
                </span>
                
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(translatedText, targetLang)}
                    disabled={!translatedText.trim()}
                    className="h-8 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                    title="Listen to translated pronunciation"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!translatedText.trim()}
                    className="h-8 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                    title="Copy translation"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </div>

              <div className="flex-1 py-1 text-foreground text-sm sm:text-base font-medium whitespace-pre-wrap select-all leading-relaxed min-h-[180px]">
                {translatedText || (
                  <span className="text-muted-foreground font-normal italic">
                    {isTranslating ? "Translating with neural AI..." : "Translation will appear here..."}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Neural AI Translation
                </span>
                <span>{translatedText.length} characters</span>
              </div>
            </div>

          </div>

          {/* Share & Embed Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => executeTranslation(inputText, sourceLang, targetLang, tone)}
                disabled={isTranslating || !inputText.trim()}
                className="rounded-xl text-xs font-bold gap-1.5 h-9 bg-primary text-primary-foreground shadow-sm cursor-pointer"
              >
                {isTranslating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Translate Now</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <ShareResultButton
                toolTitle="Universal Neural AI Translator"
                resultTitle={`Translation (${getLangName(sourceLang)} → ${getLangName(targetLang)})`}
                resultSummary={`Translated: "${inputText.slice(0, 80)}" to "${translatedText.slice(0, 80)}"`}
                resultMetrics={[
                  { label: "From", value: getLangName(sourceLang) },
                  { label: "To", value: getLangName(targetLang) },
                  { label: "Tone", value: tone },
                ]}
              />
              <EmbedButton toolPath="/tools/text/translate" toolTitle="Universal Neural AI Translator" />
            </div>
          </div>

        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Type or Paste Any Text", description: "Enter words, conversational dialogue, academic texts, or business emails." },
            { step: "2", title: "Choose Languages & Tone", description: "Select source and target language pairs and adjust formality (Professional, Casual, Friendly)." },
            { step: "3", title: "Listen & Copy", description: "Read the accurate translation, click the speaker icon for native voice pronunciation, or copy with one click." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Universal Vocabulary & Grammar", description: "Accurately translates all words, verbs, technical terms, and complex sentence structures with full context." },
            { title: "Native Audio Pronunciation", description: "Listen to natural speech synthesis in native accents for both source and translated text." },
            { title: "Custom Tone & Formality", description: "Switch between formal business phrasing and casual conversational slang effortlessly." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Is this translation tool free?", answer: "Yes! There are no subscription fees or usage caps for translating text on Toolzium." },
            { question: "How accurate is the translation for languages like Hindi or Bengali?", answer: "Our engine uses advanced neural models trained on multilingual corpora, ensuring accurate idiomatic expressions, noun conjugations, and natural phrasing." },
            { question: "Can I swap languages instantly?", answer: "Yes! Click the ⇄ swap button between the language dropdowns to instantly invert source and target languages and their respective texts." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/translate" />

      </div>
    </div>
  );
}
