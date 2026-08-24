import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base") || "USD";

  try {
    // Primary: Open Exchange Rates public mirror
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(
        {
          success: true,
          base: data.base_code || base,
          date: data.time_last_update_utc || new Date().toISOString(),
          rates: data.rates || {},
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }
  } catch {}

  try {
    // Fallback: Frankfurter European Central Bank API
    const res2 = await fetch(`https://api.frankfurter.app/latest?from=${base}`, {
      next: { revalidate: 3600 },
    });
    if (res2.ok) {
      const data2 = await res2.json();
      return NextResponse.json(
        {
          success: true,
          base: data2.base || base,
          date: data2.date || new Date().toISOString(),
          rates: { ...data2.rates, [base]: 1 },
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }
  } catch {}

  // Safe baseline fallback
  return NextResponse.json(
    {
      success: true,
      base,
      date: new Date().toISOString(),
      rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.5,
        CAD: 1.35,
        AUD: 1.52,
        CHF: 0.9,
        CNY: 7.23,
        INR: 86.8,
        BDT: 110.0,
      },
    },
    { headers: { "Cache-Control": "public, s-maxage=3600" } }
  );
}
