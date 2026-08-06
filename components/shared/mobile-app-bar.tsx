"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Search, User } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function MobileAppBar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "All Tools", href: "/tools", icon: Wrench },
    { label: "Search", action: onOpenSearch, icon: Search },
    {
      label: session?.user ? "Dashboard" : "Sign In",
      href: session?.user ? "/dashboard" : "/sign-in",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/85 backdrop-blur-lg border-t border-border/80 px-2 py-1.5 supports-[backdrop-filter]:bg-background/70 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.href ? pathname === item.href : false;
          const Icon = item.icon;

          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-95"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href || "#"}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
