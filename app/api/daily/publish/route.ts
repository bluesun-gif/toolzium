import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const HERMES_SECRET = process.env.ANALYTICS_ADMIN_SECRET;

export async function POST(req: NextRequest) {
  // Auth — only Hermes can publish
  const secret = req.headers.get("x-hermes-secret");
  if (!HERMES_SECRET || secret !== HERMES_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      date,
      stories,
      toolSpotlight,
      aiTip,
      dailyFact,
      trendingSearches,
      heroEmoji,
    } = body;

    if (!date || !stories || !toolSpotlight || !aiTip || !dailyFact) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: date, stories, toolSpotlight, aiTip, dailyFact",
        },
        { status: 400 }
      );
    }

    const content = await prisma.dailyContent.upsert({
      where: { date },
      create: {
        date,
        stories,
        toolSpotlight,
        aiTip,
        dailyFact,
        trendingSearches: trendingSearches ?? [],
        heroEmoji: heroEmoji ?? "📰",
      },
      update: {
        stories,
        toolSpotlight,
        aiTip,
        dailyFact,
        trendingSearches: trendingSearches ?? [],
        heroEmoji: heroEmoji ?? "📰",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Daily content for ${date} published successfully`,
      id: content.id,
    });
  } catch (error) {
    console.error("Daily publish error:", error);
    return NextResponse.json(
      { error: "Failed to publish daily content" },
      { status: 500 }
    );
  }
}
