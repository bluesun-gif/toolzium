import React from "react";
import type { Metadata } from "next";
import { getEmbedComponent } from "@/components/embed/embed-registry";
import { ToolsData } from "@/data/tools";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmbedPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ theme?: string }>;
}

export async function generateMetadata({
  params,
}: EmbedPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug || [];
  const category = slugParts[0] || "";
  const toolSlug = slugParts[1] || "";

  const fullPath = `/tools/${category}/${toolSlug}`;
  let title = "Free Online Tool — Toolzium Widget";

  for (const section of ToolsData) {
    const found = section.items.find((item) => item.url === fullPath);
    if (found) {
      title = `${found.title} — Free Toolzium Widget`;
      break;
    }
  }

  return {
    title,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function EmbedPage({
  params,
}: EmbedPageProps) {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug || [];
  const category = slugParts[0] || "";
  const toolSlug = slugParts[1] || "";

  const Component = getEmbedComponent(category, toolSlug);

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[360px] p-6 text-center space-y-4 rounded-2xl border border-dashed border-border/80 bg-card/60">
        <div className="h-12 w-12 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h2 className="text-base font-bold text-foreground">
            Embeddable Tool Not Found
          </h2>
          <p className="text-xs text-muted-foreground">
            The requested tool widget ({category}/{toolSlug}) could not be loaded.
          </p>
        </div>
        <Button asChild size="sm" className="rounded-xl text-xs gap-1.5 font-semibold">
          <Link href="https://toolzium.com/tools" target="_blank" rel="noopener noreferrer">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Browse 570+ Free Tools</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="w-full max-w-full">
      <Component />
    </main>
  );
}
