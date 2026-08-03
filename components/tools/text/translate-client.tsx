"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Copy, Volume2, ArrowRightLeft, Loader2, History } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "pl", name: "Polish" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "id", name: "Indonesian" }
];

interface TranslationHistoryItem {
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: number;
}

export default function TranslateClient() {
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("es");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("translateHistory");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const saveToHistory = (item: TranslationHistoryItem) => {
    setHistory(prev => {
      const newHistory = [item, ...prev].slice(0, 10);
      try {
        localStorage.setItem("translateHistory", JSON.stringify(newHistory));
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return newHistory;
    });
  };

  const translate = useCallback(async (text: string, source: string, target: string) => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }

    setIsTranslating(true);
    try {
      const actualSourceLang = source === "auto" ? "autodetect" : source;
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${actualSourceLang}|${target}`);
      const data = await res.json();
      
      if (data.responseData?.translatedText) {
        setTranslatedText(data.responseData.translatedText);
        saveToHistory({
          sourceText: text,
          translatedText: data.responseData.translatedText,
          sourceLang: source,
          targetLang: target,
          timestamp: Date.now()
        });
      } else {
        toast.error("Translation failed. Please try again.");
      }
    } catch (error) {
      toast.error("Network error during translation.");
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (sourceText.trim()) {
      debounceTimer.current = setTimeout(() => {
        translate(sourceText, sourceLang, targetLang);
      }, 800);
    } else {
      setTranslatedText("");
    }

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [sourceText, sourceLang, targetLang, translate]);

  const handleSwap = () => {
    if (sourceLang === "auto") {
      toast.error("Cannot swap with auto-detect");
      return;
    }
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleSpeak = (text: string, lang: string) => {
    if (!text) return;
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang !== "auto") {
        utterance.lang = lang;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported in this browser");
    }
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="Translate Text"
        description="Translate text between 100+ languages online for free. Fast and accurate."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-start">
        {/* Source Panel */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Detect Language</SelectItem>
                {LANGUAGES.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Textarea 
                placeholder="Enter text to translate..." 
                className="min-h-[250px] resize-none pb-12" 
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-muted-foreground">
                <Button variant="ghost" size="icon" onClick={() => handleSpeak(sourceText, sourceLang)}>
                  <Volume2 className="h-4 w-4" />
                </Button>
                <span className="text-xs">{sourceText.length} chars</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Swap Button */}
        <div className="flex justify-center md:pt-14">
          <Button variant="outline" size="icon" className="rounded-full shadow-sm" onClick={handleSwap}>
            <ArrowRightLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Target Panel */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <div className="min-h-[250px] rounded-md border bg-muted/20 p-3 pb-12 relative overflow-auto">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full absolute inset-0">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  translatedText || <span className="text-muted-foreground">Translation will appear here...</span>
                )}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <Button variant="ghost" size="icon" onClick={() => handleSpeak(translatedText, targetLang)}>
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(translatedText)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {history.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Recent Translations</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {history.slice(0, 4).map((item, i) => (
              <Card key={i} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => {
                setSourceLang(item.sourceLang);
                setTargetLang(item.targetLang);
                setSourceText(item.sourceText);
              }}>
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-1 line-clamp-1">{item.sourceText}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{item.translatedText}</div>
                  <div className="text-xs text-muted-foreground mt-2 flex gap-2">
                    <span className="uppercase">{item.sourceLang === "auto" ? "Detect" : item.sourceLang}</span>
                    <span>→</span>
                    <span className="uppercase">{item.targetLang}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
