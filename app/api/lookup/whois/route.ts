import { NextRequest, NextResponse } from "next/server";
import { lookupWhois } from "@/lib/data/adapters/whois-adapter";
import { recordGeneratedPage } from "@/lib/storage/expansion-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain") || "";

    if (!domain.trim()) {
      return NextResponse.json({ error: "Domain name is required." }, { status: 400 });
    }

    const result = await lookupWhois(domain);

    // Record programmatic page for sitemap indexing
    await recordGeneratedPage({
      path: `/whois/${encodeURIComponent(result.domain)}`,
      type: "whois",
      entity: result.domain,
      title: `WHOIS & RDAP Domain Intelligence for ${result.domain}`,
      data: {
        domain: result.domain,
        registrar: result.registrar,
        domainAgeFormatted: result.domainAgeFormatted,
        isNewDomain: result.isNewDomain,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "WHOIS lookup failed." },
      { status: 500 }
    );
  }
}
