import { NextResponse } from "next/server";

const PRIMARY = "https://open.er-api.com/v6/latest/";
const FALLBACK = "https://api.exchangerate-api.com/v4/latest/";

// GET /api/rates?base=USD
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const base = (searchParams.get("base") || "USD").toUpperCase();

  // Primary: open.er-api.com (Real-time live exchange rates with 160+ fiat currencies)
  try {
    const res = await fetch(`${PRIMARY}${encodeURIComponent(base)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("open.er-api.com failed");
    const data = await res.json();
    if (data?.result !== "success" || !data?.rates) throw new Error("open.er-api.com invalid");

    const date: string = data.time_last_update_utc || new Date().toUTCString();
    return NextResponse.json({
      base,
      rates: data.rates,
      provider: "open.er-api.com (Live)",
      date,
    });
  } catch {
    // Fallback: exchangerate-api.com
    try {
      const fbRes = await fetch(`${FALLBACK}${encodeURIComponent(base)}`, {
        cache: "no-store",
      });
      if (!fbRes.ok) throw new Error("exchangerate-api failed");
      const fbData = await fbRes.json();
      if (!fbData?.rates) throw new Error("exchangerate-api invalid");

      return NextResponse.json({
        base,
        rates: fbData.rates,
        provider: "exchangerate-api.com (Live)",
        date: fbData.date || new Date().toUTCString(),
      });
    } catch {
      return NextResponse.json(
        { base, rates: null, provider: "none", error: "Real-time rates unavailable" },
        { status: 502 }
      );
    }
  }
}
