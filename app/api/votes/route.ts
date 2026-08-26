import { NextRequest, NextResponse } from "next/server";
import { castVote, getVoteScore } from "@/lib/storage/expansion-db";

export async function POST(req: NextRequest) {
  try {
    const { itemId, value } = await req.json();

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required." }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userHash = Buffer.from(ip).toString("base64").slice(0, 16);

    const voteVal = value === -1 ? -1 : 1;
    const result = await castVote(String(itemId), userHash, voteVal);

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to record vote." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId") || "";

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userHash = Buffer.from(ip).toString("base64").slice(0, 16);

    const result = getVoteScore(itemId, userHash);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch vote." },
      { status: 500 }
    );
  }
}
