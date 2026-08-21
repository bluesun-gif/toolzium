"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToolsData } from "@/data/tools";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Link2, Linkedin, Search, Star, Zap } from "lucide-react";
import { socialIcons } from "./icons";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "./theme-toggle";
import { PwaInstallButton } from "./pwa-install-button";
import { LanguageSwitcher } from "./language-switcher";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { searchTools, SearchableTool } from "@/lib/search/smart-search";

type FlatItem = SearchableTool;

const RECENT_KEY = "toolzium:recent-items-v1";
const MAX_RECENT = 8;

function asIcon(maybe: unknown): LucideIcon {
  return typeof maybe === "function" ? (maybe as LucideIcon) : Link2;
}

function flattenTools(data: typeof ToolsData): FlatItem[] {
  const out: FlatItem[] = [];
  for (const group of data) {
    if (!group?.isActive) continue;
    for (const item of group.items ?? []) {
      out.push({
        title: item.title,
        url: item.url,
        description: item.description,
        popular: item.popular,
        category: group.title,
        categoryUrl: group.url,
        icon: group.icon,
      });
    }
  }
  return out;
}

function addRecent(item: FlatItem) {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const prev: FlatItem[] = raw ? JSON.parse(raw) : [];
    const filtered = prev.filter((p) => p.url !== item.url);
    const next = [item, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
}

function getRecent(): FlatItem[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as FlatItem[]) : [];
  } catch {
    return [];
  }
}

export default function NavRight() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  const [recent, setRecent] = useState<FlatItem[]>([]);
  const [query, setQuery] = useState("");
  const all = useMemo(() => flattenTools(ToolsData), []);
  const popular = useMemo(() => all.filter((i) => i.popular), [all]);
  const inputProxyRef = useRef<HTMLButtonElement | null>(null);

  // Search results sorted by AI-grade relevance scoring
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchTools(query, all, 30);
  }, [query, all]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/") {
        const t = e.target as HTMLElement;
        const tag = t?.tagName?.toLowerCase();
        const editable = t?.getAttribute?.("contenteditable") === "true";
        if (!editable && tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          setOpen(true);
        }
      }
    }

    const handleOpenSearch = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("toolzium:open_search", handleOpenSearch);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("toolzium:open_search", handleOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setRecent(getRecent());
    } else {
      setQuery("");
    }
  }, [open]);

  function go(item: FlatItem) {
    addRecent(item);
    setOpen(false);
    router.push(item.url);
  }

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, FlatItem[]>();
    for (const item of all) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return map;
  }, [all]);

  return (
    <>
      {/* Search Trigger Button */}
      <div className="ml-3 hidden md:flex flex-1" />
      <div className="ml-auto flex items-center gap-2">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                ref={inputProxyRef}
                onClick={() => setOpen(true)}
                className="hidden sm:flex items-center gap-2 rounded-md border bg-background/50 px-3 py-2 text-sm text-muted-foreground hover:bg-background/70 ring-1 ring-border/50 shadow-sm transition backdrop-blur supports-backdrop-filter:bg-background/40 active:scale-95 active:bg-accent cursor-pointer"
                aria-label="Search tools"
              >
                <Search className="h-4 w-4" />
                <span className="pr-6">Search 570+ tools…</span>
                <kbd className="ml-auto text-[10px] tracking-wider rounded border bg-muted px-1.5 py-0.5">
                  ⌘K
                </kbd>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Press ⌘K or / to search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Action Controls */}
        <LanguageSwitcher />
        <PwaInstallButton />
        <ThemeToggle />
        <Button
          variant="outline"
          asChild
          size="icon"
          className="hidden sm:flex h-9 w-9 rounded-xl border-border/80 text-muted-foreground hover:text-foreground"
        >
          <Link
            href="https://github.com/bluesun-gif"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub Profile"
          >
            {socialIcons.find((icon) => icon.name === "Github")?.svg}
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          size="icon"
          className="hidden sm:flex h-9 w-9 rounded-xl border-border/80 text-muted-foreground hover:text-foreground"
        >
          <Link
            href="https://www.linkedin.com/in/tanvirahmadsohan/"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin className="size-4" />
          </Link>
        </Button>
        <UserNav />
      </div>

      {/* AI-Grade Search Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={!query.trim()}>
        <CommandInput
          placeholder="Search 570+ tools (e.g., URL, QR, Base64, Percentage, PDF)…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.trim() && searchResults.length === 0 && (
            <CommandEmpty>No tools found matching &quot;{query}&quot;.</CommandEmpty>
          )}

          {/* AI-Grade Relevance Scored Search Results */}
          {query.trim() && searchResults.length > 0 && (
            <CommandGroup heading={`Top Matches (${searchResults.length})`}>
              {searchResults.map(({ tool }) => {
                const Icon = asIcon(tool.icon);
                return (
                  <CommandItem
                    key={`search:${tool.url}`}
                    value={`${tool.title} ${tool.category} ${tool.url}`}
                    onSelect={() => go(tool)}
                    className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-semibold text-sm text-foreground">
                        {tool.title}
                      </span>
                      {tool.description && (
                        <span className="truncate text-xs text-muted-foreground line-clamp-1">
                          {tool.description}
                        </span>
                      )}
                    </div>
                    <Badge className="ml-auto shrink-0 text-[10px] font-semibold" variant="secondary">
                      {tool.category}
                    </Badge>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* When no query is typed: Starred Favorites + Recent + Popular + Categories */}
          {!query.trim() && (
            <>
              {/* Starred Favorites */}
              {favorites.length > 0 && (
                <>
                  <CommandGroup heading="⭐ Starred Favorites">
                    {favorites.map((item) => (
                      <CommandItem
                        key={`fav:${item.url}`}
                        value={`${item.title} ${item.description ?? ""} ${item.url}`}
                        onSelect={() => {
                          setOpen(false);
                          router.push(item.url);
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer"
                      >
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-semibold text-sm">{item.title}</span>
                          {item.description && (
                            <span className="truncate text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </span>
                          )}
                        </div>
                        <Badge className="ml-auto bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]" variant="outline">
                          Starred
                        </Badge>
                        <ArrowRight className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {/* Recent */}
              {recent.length > 0 && (
                <>
                  <CommandGroup heading="Recent">
                    {recent.map((item) => {
                      const Icon = asIcon(item.icon);
                      return (
                        <CommandItem
                          key={`recent:${item.url}`}
                          value={`${item.title} ${item.category} ${item.description ?? ""} ${item.url}`}
                          onSelect={() => go(item)}
                          className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer"
                        >
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate font-semibold text-sm">{item.title}</span>
                            <span className="truncate text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </span>
                          </div>
                          <Badge className="ml-auto text-[10px]" variant="secondary">
                            {item.category}
                          </Badge>
                          <ArrowRight className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {/* Popular */}
              {popular.length > 0 && (
                <>
                  <CommandGroup heading="Popular">
                    {popular.slice(0, 8).map((item) => {
                      const Icon = asIcon(item.icon);
                      return (
                        <CommandItem
                          key={`popular:${item.url}`}
                          value={`${item.title} ${item.category} ${item.description ?? ""} ${item.url}`}
                          onSelect={() => go(item)}
                          className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer"
                        >
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate font-semibold text-sm">{item.title}</span>
                            <span className="truncate text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </span>
                          </div>
                          <Badge className="ml-auto text-[10px]" variant="outline">
                            {item.category}
                          </Badge>
                          <ArrowRight className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              {/* Browse by Category */}
              {[...groupedByCategory.entries()].map(([category, items]) => (
                <CommandGroup key={category} heading={category}>
                  {items.map((item) => {
                    const Icon = asIcon(item.icon);
                    return (
                      <CommandItem
                        key={item.url}
                        value={`${item.title} ${category} ${item.description ?? ""} ${item.url}`}
                        onSelect={() => go(item)}
                        className="flex items-center gap-3 p-2 rounded-xl cursor-pointer"
                      >
                        <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium">{item.title}</span>
                          <span className="truncate text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </span>
                        </div>
                        <Badge className="ml-auto text-[10px]" variant="secondary">
                          {category}
                        </Badge>
                        <ArrowRight className="ml-2 h-4 w-4 opacity-40 shrink-0" />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
