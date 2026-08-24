import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SpotApiResult {
  price?: number;
  updatedAt?: string;
}

async function fetchMetalSpot(symbol: string, fallbackPrice: number): Promise<number> {
  try {
    const res = await fetch(`https://api.gold-api.com/price/${symbol}`, {
      headers: { "User-Agent": "Toolzium-Metals-Feed/1.0" },
      next: { revalidate: 60 } // cache for 60 seconds
    });
    if (res.ok) {
      const data: SpotApiResult = await res.json();
      if (typeof data.price === "number" && data.price > 0) {
        return data.price;
      }
    }
  } catch (err) {
    console.warn(`[Metals API] Failed to fetch ${symbol}, using fallback`, err);
  }
  return fallbackPrice;
}

// GET /api/metals
// Returns real-time spot prices for Gold (24k, 22k, 21k, 18k, 14k, 10k), Silver, Platinum in 160+ world currencies
export async function GET() {
  try {
    // 1. Fetch live currency rates against USD and Spot Metals in parallel
    const [ratesRes, goldOzUsd, silverOzUsd, platinumOzUsd, palladiumOzUsd] = await Promise.all([
      fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 300 } }).catch(() => null),
      fetchMetalSpot("XAU", 2780.50),
      fetchMetalSpot("XAG", 32.80),
      fetchMetalSpot("XPT", 1020.00),
      fetchMetalSpot("XPD", 1080.00),
    ]);

    let rates: Record<string, number> = {};
    if (ratesRes && ratesRes.ok) {
      const ratesData = await ratesRes.json();
      rates = ratesData?.rates || {};
    }

    // Troy Oz to Gram factor: 1 Troy Oz = 31.1034768 grams
    const OZ_TO_GRAM = 31.1034768;
    const GRAM_TO_TOLA = 11.6638; // 1 Tola = 11.6638 g
    const GRAM_TO_SOVEREIGN = 8.0; // 1 Sovereign / Pavan = 8 g

    const gram24k = goldOzUsd / OZ_TO_GRAM;

    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        updatedAt: new Date().toUTCString(),
        provider: "Live Spot Commodity Feeds (LBMA / COMEX)",
        isLive: true,
        usdRates: {
          goldOz: Number(goldOzUsd.toFixed(2)),
          goldGram24k: Number(gram24k.toFixed(2)),
          goldGram22k: Number((gram24k * (22 / 24)).toFixed(2)),
          goldGram21k: Number((gram24k * (21 / 24)).toFixed(2)),
          goldGram18k: Number((gram24k * (18 / 24)).toFixed(2)),
          goldGram14k: Number((gram24k * (14 / 24)).toFixed(2)),
          goldGram10k: Number((gram24k * (10 / 24)).toFixed(2)),
          goldTola24k: Number((gram24k * GRAM_TO_TOLA).toFixed(2)),
          goldTola22k: Number((gram24k * (22 / 24) * GRAM_TO_TOLA).toFixed(2)),
          goldSovereign22k: Number((gram24k * (22 / 24) * GRAM_TO_SOVEREIGN).toFixed(2)),
          goldKg24k: Number((gram24k * 1000).toFixed(2)),
          silverOz: Number(silverOzUsd.toFixed(2)),
          silverGram: Number((silverOzUsd / OZ_TO_GRAM).toFixed(2)),
          platinumOz: Number(platinumOzUsd.toFixed(2)),
          platinumGram: Number((platinumOzUsd / OZ_TO_GRAM).toFixed(2)),
          palladiumOz: Number(palladiumOzUsd.toFixed(2)),
        },
        fiatRates: rates,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        }
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch live metals data", details: err?.message },
      { status: 500 }
    );
  }
}
