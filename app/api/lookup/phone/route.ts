import { NextRequest, NextResponse } from "next/server";
import { lookupPhone } from "@/lib/data/adapters/phone-adapter";
import { recordGeneratedPage } from "@/lib/storage/expansion-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number") || "";
    const country = searchParams.get("country") || "US";

    if (!number.trim()) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    const result = await lookupPhone(number, country);

    // Record programmatic page for sitemap indexing
    await recordGeneratedPage({
      path: `/phone/${encodeURIComponent(result.e164)}`,
      type: "phone",
      entity: result.e164,
      title: `Who called me from ${result.formattedNumber}? Spam & Carrier Report`,
      data: {
        e164: result.e164,
        carrier: result.carrier,
        riskScore: result.riskScore,
        spamLevel: result.spamLevel,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Phone lookup failed." },
      { status: 500 }
    );
  }
}
