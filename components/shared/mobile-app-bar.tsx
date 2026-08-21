"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Search, User } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useTranslation } from "@/lib/i18n/i18n-context";

export default function MobileAppBar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { t } = useTranslation();

  const handleSearchClick = () => {
    window.dispatchEvent(new Event("toolzium:open_search"));
    if (onOpenSearch) onOpenSearch();
  };

  const navItems = [
    { label: t("home", "Home"), href: "/", icon: Home },
    { label: t("all_tools", "All Tools"), href: "/tools", icon: Wrench },
    { label: t("search", "Search"), action: handleSearchClick, icon: Search },
    {
      label: session?.user ? t("dashboard", "Account") : t("sign_in", "Sign In"),
      href: session?.user ? "/dashboard" : "/sign-in",
      icon: User,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/80 px-3 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl transition-all"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.href ? (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) : false;
          const Icon = item.icon;

          if (item.action) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 px-2.5 rounded-2xl text-muted-foreground hover:text-foreground active:scale-90 transition-all duration-200 cursor-pointer"
                aria-label={item.label}
              >
                <div className="p-1 rounded-xl">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href || "#"}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 px-2.5 rounded-2xl active:scale-90 transition-all duration-200 ${
                isActive
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                <Icon className={`h-5 w-5 ${isActive ? "text-primary stroke-[2.5]" : ""}`} />
              </div>
              <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
