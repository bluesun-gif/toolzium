import { NextRequest, NextResponse } from "next/server";
import { addCommunityReport } from "@/lib/storage/expansion-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { entity, type, note, category, hp_field } = body;

    // Honeypot detection
    if (hp_field) {
      return NextResponse.json({ success: true, message: "Report received." });
    }

    if (!entity || !note) {
      return NextResponse.json({ error: "Entity and note are required." }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    // Simple hash of IP to avoid storing raw PII
    const userIpHash = Buffer.from(ip).toString("base64").slice(0, 12);

    const report = await addCommunityReport({
      entity: String(entity),
      type: type || "general",
      note: String(note),
      category: category || "General Inquiry",
      userIpHash,
    });

    return NextResponse.json({ success: true, report });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to record report." },
      { status: 500 }
    );
  }
}
