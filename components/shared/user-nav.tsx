"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { LogIn, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function UserNav() {
  const { data: session, isPending } = useSession();

  if (typeof window === "undefined" || isPending) {
    return null;
  }

  // Not signed in
  if (!session?.user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Button asChild size="sm" variant="ghost" className="font-medium h-9 px-3 rounded-xl">
          <Link href="/sign-in">
            Sign In
          </Link>
        </Button>
        <Button asChild size="sm" variant="default" className="gap-1.5 font-semibold bg-primary text-primary-foreground shadow-xs hover:opacity-90 h-9 px-3.5 rounded-xl">
          <Link href="/sign-up">
            <LogIn className="h-4 w-4" />
            Sign Up
          </Link>
        </Button>
      </div>
    );
  }

  // Signed in: clean desktop-only Dashboard button with zero personal Gmail image
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button asChild size="sm" variant="outline" className="gap-1.5 font-medium h-9 px-3.5 rounded-xl border-border/80 text-foreground hover:border-primary/50">
        <Link href="/dashboard">
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <span>Dashboard</span>
        </Link>
      </Button>
    </div>
  );
}
