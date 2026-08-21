"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/i18n-context";
import { SUPPORTED_LANGUAGES, Language } from "@/lib/i18n/languages";
import { Button } from "@/components/ui/button";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 p-0 sm:w-auto sm:px-2.5 rounded-xl border-border/80 bg-background/50 hover:bg-background/80 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        aria-label="Change Language"
      >
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-xs font-bold text-foreground">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown className="hidden sm:inline w-3 h-3 opacity-60 ml-0.5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-popover/95 backdrop-blur-xl border border-border/80 shadow-2xl p-1.5 z-50 animate-in fade-in-0 zoom-in-95">
          <div className="px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/40 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-primary" />
            <span>Select Language</span>
          </div>

          <div className="space-y-0.5 max-h-64 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((lang: Language) => {
              const isSelected = currentLanguage.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                    isSelected
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
