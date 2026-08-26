import { NextRequest, NextResponse } from "next/server";
import { lookupIp } from "@/lib/data/adapters/ip-adapter";
import { recordGeneratedPage } from "@/lib/storage/expansion-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let ip = searchParams.get("ip") || "";

    // Auto-detect visitor IP if not supplied
    if (!ip) {
      const forwarded = req.headers.get("x-forwarded-for");
      ip = forwarded ? forwarded.split(",")[0].trim() : "8.8.8.8";
    }

    const result = await lookupIp(ip);

    // Record programmatic page for sitemap indexing
    await recordGeneratedPage({
      path: `/ip/${encodeURIComponent(result.ip)}`,
      type: "ip",
      entity: result.ip,
      title: `IP Geolocation & Threat Intelligence for ${result.ip}`,
      data: {
        ip: result.ip,
        country: result.country,
        city: result.city,
        isp: result.isp,
        isVpn: result.isVpn,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "IP lookup failed." },
      { status: 500 }
    );
  }
}
