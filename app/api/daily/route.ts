import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Try today first, fallback to most recent
    let content = await prisma.dailyContent.findUnique({
      where: { date: today },
    });

    if (!content) {
      content = await prisma.dailyContent.findFirst({
        orderBy: { date: "desc" },
      });
    }

    if (!content) {
      return NextResponse.json(
        { error: "No daily content yet. Hermes publishes every morning at 6am!" },
        { status: 404 }
      );
    }

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Daily GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily content" },
      { status: 500 }
    );
  }
}
