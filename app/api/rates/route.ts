import { NextResponse } from "next/server";

const PRIMARY = "https://open.er-api.com/v6/latest/";
const FALLBACK = "https://api.frankfurter.app/latest";

// GET /api/rates?base=USD
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base") || "USD";

  // Primary: open.er-api.com (Free exchange rates API with 160+ currencies including BDT)
  try {
    const res = await fetch(`${PRIMARY}${encodeURIComponent(base)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("open.er-api.com failed");
    const data = await res.json();
    if (data?.result !== "success" || !data?.rates) throw new Error("open.er-api.com invalid");

    const date: string | undefined = data.time_last_update_utc;
    return NextResponse.json({ base, rates: data.rates, provider: "open.er-api.com", date });
  } catch {
    // Fallback: frankfurter.app (always EUR base; convert if needed)
    try {
      const fbRes = await fetch(`${FALLBACK}?from=EUR`, { next: { revalidate: 3600 } });
      if (!fbRes.ok) throw new Error("frankfurter failed");
      const fbData = await fbRes.json();
      const eurRates = fbData?.rates as Record<string, number> | undefined;
      const date: string | undefined = fbData?.date;
      if (!eurRates) throw new Error("frankfurter invalid");

      // frankfurter base is EUR. Convert to requested base:
      // rate(base->X) = rate(EUR->X) / rate(EUR->base)
      let normalized: Record<string, number> = {};
      if (base === "EUR") {
        normalized = { ...eurRates, EUR: 1 };
      } else {
        const baseRate = eurRates[base];
        if (!baseRate) throw new Error("base not available in fallback");
        for (const [code, eurToX] of Object.entries(eurRates)) {
          normalized[code] = eurToX / baseRate;
        }
        normalized[base] = 1;
      }

      return NextResponse.json({ base, rates: normalized, provider: "frankfurter", date });
    } catch {
      return NextResponse.json({ base, rates: null, provider: "none" }, { status: 502 });
    }
  }
}
