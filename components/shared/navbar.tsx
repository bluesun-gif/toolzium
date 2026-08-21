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
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight shrink-0">
              <Image
                src="/assets/logo.png"
                height={36}
                width={36}
                alt="Toolzium Logo"
                className="rounded-lg shadow-xs"
              />
              <span className="text-base font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text whitespace-nowrap">
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
                  className="md:hidden h-9 w-9 rounded-xl border border-border/60 bg-background/50 hover:bg-background/80"
                  aria-label="Open menu"
                >
                  <Menu className="h-4.5 w-4.5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] sm:w-96 p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <SheetHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2.5 font-bold text-base"
                      >
                        <Image src="/assets/logo.png" height={32} width={32} alt="Logo" className="rounded-lg" />
                        <span className="font-extrabold tracking-tight">Toolzium</span>
                      </Link>
                    </div>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="grid gap-2 text-sm font-medium">
                    <SheetClose asChild>
                      <Link href="/tools" className="rounded-xl p-3 bg-primary/10 text-primary hover:bg-primary/15 flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-2.5">
                          <Wrench className="h-4 w-4" />
                          Explore All 570+ Tools
                        </span>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono">570+</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/dashboard" className="rounded-xl p-3 hover:bg-muted flex items-center gap-2.5">
                        <User className="h-4 w-4 text-muted-foreground" />
                        My Account / Dashboard
                      </Link>
                    </SheetClose>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-3">
                  <div className="flex items-center gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full justify-center">
                        <Link href="/sign-in">Sign In</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="default" className="w-full justify-center">
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                  <p className="text-[11px] text-center text-muted-foreground">
                    100% Free • Private In-Browser Execution
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Native App Fixed Bottom Navigation Bar */}
      <MobileAppBar onOpenSearch={() => setSearchOpen(true)} />
    </>
  );
}
