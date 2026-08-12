"use client";

import NavRight from "../shared/nav-right";
import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";
import { PanelLeft, Sparkles } from "lucide-react";

export default function ToolsHeader() {
  return (
    <header className="sticky top-0 z-40 flex shrink-0 items-center border-b py-2.5 overflow-hidden border-b-border/60 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 shadow-sm">
      <div className="flex w-full items-center justify-between px-3 lg:px-6">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle Button with Visual Indicator */}
          <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/50 p-1 hover:border-primary/50 transition-colors">
            <SidebarTrigger className="h-7 w-7 text-primary hover:bg-primary/10 rounded-md">
              <PanelLeft className="h-4 w-4" />
            </SidebarTrigger>
            <span className="hidden sm:inline-block text-xs font-semibold text-muted-foreground pr-2 cursor-pointer select-none">
              Tools Menu
            </span>
          </div>

          <Separator orientation="vertical" className="mx-1.5 h-4 bg-border/60" />

          {/* Logo & Brand Header */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-foreground">
              Toolzium
            </span>
          </div>
        </div>

        {/* Right side controls (Search, Premium crown, Theme toggle) */}
        <NavRight />
      </div>
    </header>
  );
}
