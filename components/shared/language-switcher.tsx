"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/i18n-context";
import { SUPPORTED_LANGUAGES, Language } from "@/lib/i18n/languages";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 p-0 sm:w-auto sm:px-2.5 rounded-xl border-border/80 bg-background/50 hover:bg-background/80 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          aria-label="Change Language"
        >
          <span className="text-base leading-none">{currentLanguage.flag}</span>
          <span className="hidden sm:inline text-xs font-bold text-foreground">
            {currentLanguage.code.toUpperCase()}
          </span>
          <ChevronDown className="hidden sm:inline w-3 h-3 opacity-60 ml-0.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-52 rounded-2xl bg-popover/95 backdrop-blur-2xl border border-border/80 shadow-2xl p-1.5 z-50 animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-primary" />
          <span>Select Language</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border/40" />

        <div className="space-y-0.5 max-h-64 overflow-y-auto">
          {SUPPORTED_LANGUAGES.map((lang: Language) => {
            const isSelected = currentLanguage.code === lang.code;
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                  isSelected
                    ? "bg-primary/10 text-primary font-bold focus:bg-primary/15 focus:text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="text-xs font-medium">{lang.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
