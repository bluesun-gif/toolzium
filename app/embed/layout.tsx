import React from "react";
import type { Metadata } from "next";
import { Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Toolzium Widget — Free Embeddable Tool",
  robots: {
    index: false,
    follow: true,
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-3 sm:p-4 selection:bg-primary/20">
      <div className="w-full max-w-full overflow-hidden flex-1">
        {children}
      </div>

      {/* Sleek, Unobtrusive Toolzium Footer Backlink (Drives SEO Authority) */}
      <footer className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
        <Link
          href="https://toolzium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary font-semibold transition-colors group"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
          <span>Powered by Toolzium</span>
        </Link>
        <span className="hidden sm:inline text-muted-foreground/60">
          570+ Free Online Web Tools
        </span>
        <Link
          href="https://toolzium.com/tools"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-1 text-[11px]"
        >
          <span>More Tools</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </footer>
    </div>
  );
}
