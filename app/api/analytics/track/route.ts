import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsMetric } from "@/lib/storage/expansion-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const eventType = body.eventType || "pageview";
    const toolSlug = body.toolSlug || "";

    recordAnalyticsMetric(eventType, toolSlug);

    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to record metric" },
      { status: 500 }
    );
  }
}
