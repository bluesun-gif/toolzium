import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Bot, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 86400; // Archive pages: cache 24 hours

export async function generateMetadata(
  { params }: { params: Promise<{ date: string }> }
): Promise<Metadata> {
  const { date } = await params;
  const formatted = new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  return {
    title: `Daily Digest — ${formatted} | Toolzium`,
    description: `AI & tech news digest for ${formatted}. Curated by Hermes AI.`,
    alternates: { canonical: `https://toolzium.com/daily/${date}` },
  };
}

export default async function DailyArchivePage(
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const content = await prisma.dailyContent.findUnique({ where: { date } });
  if (!content) notFound();

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
  const formatted = new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/daily" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Today
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <Bot className="w-4 h-4" /><span>Hermes Daily Archive</span>
          <span>·</span>
          <Calendar className="w-4 h-4" /><time dateTime={date}>{formatted}</time>
        </div>
        <h1 className="text-3xl font-bold">{content.heroEmoji} Daily Digest — {formatted}</h1>
      </div>

      <div className="space-y-4 mb-10">
        {stories.map((story, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{story.emoji}</span>
                <div>
                  <Badge variant="outline" className="text-xs mb-2">{story.category}</Badge>
                  <h2 className="font-semibold mb-1">{story.title}</h2>
                  <p className="text-sm text-muted-foreground">{story.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5">
          <p className="text-xs text-muted-foreground mb-1">Tool Spotlight</p>
          <Link href={toolSpotlight.url} className="font-bold text-primary hover:underline">{toolSpotlight.name}</Link>
          <p className="text-sm text-muted-foreground mt-1">{toolSpotlight.description}</p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Link href="/daily" className="text-primary hover:underline text-sm">← See today&apos;s digest</Link>
      </div>
    </main>
  );
}
