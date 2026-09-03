import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Newspaper, Zap, Lightbulb, TrendingUp, Wrench,
  ExternalLink, Calendar, RefreshCw, Bot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const formatted = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  return {
    title: `AI & Tech Daily Digest — ${formatted} | Toolzium`,
    description: `Today's top AI, tech, and internet news — curated and summarized by AI. Plus tool of the day, tips, and trending searches. Updated every morning.`,
    openGraph: {
      title: `Toolzium Daily — ${formatted}`,
      description: "Your AI-curated morning digest of tech & internet news.",
    },
    alternates: { canonical: "https://toolzium.com/daily" },
  };
}

async function getDailyContent() {
  const today = new Date().toISOString().split("T")[0];
  let content = await prisma.dailyContent.findUnique({ where: { date: today } });
  if (!content) {
    content = await prisma.dailyContent.findFirst({ orderBy: { date: "desc" } });
  }
  return content;
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Tech: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Security: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Business: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  World: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

export default async function DailyPage() {
  const content = await getDailyContent();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const dateStr = new Date().toISOString().split("T")[0];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">⏳</div>
          <h1 className="text-2xl font-bold">Content Loading...</h1>
          <p className="text-muted-foreground">Hermes is preparing today&apos;s digest. Check back in a few minutes.</p>
          <Link href="/tools" className="text-primary hover:underline">Browse tools while you wait →</Link>
        </div>
      </div>
    );
  }

  const stories = content.stories as Array<{
    title: string;
    summary: string;
    source: string;
    category: string;
    emoji: string;
  }>;
  const toolSpotlight = content.toolSpotlight as {
    name: string;
    url: string;
    description: string;
    whyToday: string;
  };
  const trendingSearches = content.trendingSearches as string[] | null;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
            <Bot className="w-4 h-4" />
            <span>AI-curated by Hermes</span>
            <span className="mx-2">·</span>
            <Calendar className="w-4 h-4" />
            <time dateTime={dateStr}>{today}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {content.heroEmoji} Toolzium Daily
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your AI-curated morning digest — top stories, tools, tips, and trends. Updated every day at 6am.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* Top Stories */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Today&apos;s Top Stories</h2>
          </div>
          <div className="space-y-4">
            {stories.map((story, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{story.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            CATEGORY_COLORS[story.category] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {story.category}
                        </span>
                        {i === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Top Story
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 leading-tight">{story.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{story.summary}</p>
                      {story.source && (
                        <a
                          href={story.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        >
                          Read more <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3-column info row */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Tool of the Day */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="w-4 h-4 text-primary" />
                Tool of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={toolSpotlight.url} className="group">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-1">
                  {toolSpotlight.name} →
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-3">{toolSpotlight.description}</p>
              <p className="text-xs italic text-muted-foreground border-t pt-2">
                📌 {toolSpotlight.whyToday}
              </p>
            </CardContent>
          </Card>

          {/* AI Tip */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                AI Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{content.aiTip}</p>
            </CardContent>
          </Card>

          {/* Daily Fact */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="w-4 h-4 text-orange-500" />
                Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{content.dailyFact}</p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Searches */}
        {trendingSearches && trendingSearches.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Trending on Toolzium Today</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term, i) => (
                <Badge key={i} variant="outline" className="text-sm py-1.5 px-3 cursor-default">
                  🔥 {term}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>Content updated daily at 6:00 AM by Hermes AI</span>
          </div>
          <div className="flex gap-3">
            <Link href="/tools" className="text-sm text-primary hover:underline">
              Browse All Tools →
            </Link>
            <Link href="/prompts" className="text-sm text-primary hover:underline">
              AI Prompts →
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
