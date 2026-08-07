"use client";

import { LayoutGrid, Menu, Search, Wrench, Sparkles, User, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { ActionButton } from "./action-buttons";
import NavRight from "./nav-right";
import { ThemeToggle } from "./theme-toggle";
import MobileAppBar from "./mobile-app-bar";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight">
              <Image
                src="/assets/logo.png"
                height={36}
                width={36}
                alt="Toolzium Logo"
                className="rounded-lg shadow-xs"
              />
              <span className="text-base font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                Toolzium
              </span>
            </Link>
            <nav className="ml-4 hidden items-center gap-4 text-sm md:flex">
              <Link href="/tools" className="hover:opacity-80">
                <ActionButton icon={Wrench} label="All Tools" variant="ghost" />
              </Link>
            </nav>
          </div>

          {/* Right Header Navigation - Rendered on both Mobile and Desktop */}
          <div className="flex items-center gap-2">
            <NavRight />

            {/* Mobile Sheet Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] sm:w-96 p-6">
                <SheetHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 font-bold text-base"
                    >
                      <Image src="/assets/logo.png" height={32} width={32} alt="Logo" />
                      <span>Toolzium App</span>
                    </Link>
                  </div>
                </SheetHeader>
                <div className="grid gap-2 py-4 text-sm font-medium">
                  <SheetClose asChild>
                    <Link href="/tools" className="rounded-xl p-3 hover:bg-muted flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-primary" />
                      Explore All 470+ Tools
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/dashboard" className="rounded-xl p-3 hover:bg-muted flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-purple-500" />
                      User Dashboard & History
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/privacy" className="rounded-xl p-3 hover:bg-muted">
                      Privacy Policy
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/terms" className="rounded-xl p-3 hover:bg-muted">
                      Terms of Service
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about" className="rounded-xl p-3 hover:bg-muted">
                      About Toolzium
                    </Link>
                  </SheetClose>
                  <div className="flex items-center justify-between rounded-xl p-3 bg-muted/40 border">
                    <span className="text-sm font-medium">App Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Bottom Mobile Native App Navigation Bar */}
      <MobileAppBar onOpenSearch={() => {
        const searchBtn = document.querySelector('[aria-label="Search tools"]') as HTMLButtonElement;
        if (searchBtn) searchBtn.click();
      }} />
    </>
  );
}
