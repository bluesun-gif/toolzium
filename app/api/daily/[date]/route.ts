import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;

  // Validate YYYY-MM-DD format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD" },
      { status: 400 }
    );
  }

  try {
    const content = await prisma.dailyContent.findUnique({
      where: { date },
    });

    if (!content) {
      return NextResponse.json(
        { error: `No content found for ${date}` },
        { status: 404 }
      );
    }

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "public, max-age=86400", // archive pages: cache 24h
      },
    });
  } catch (error) {
    console.error("Daily archive GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
