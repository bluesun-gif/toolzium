import type { Metadata } from "next";
import GoldPriceTrackerClient from "@/components/tools/finance/gold-price-tracker-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = generateSEOMetadata({
  title: "Real-Time Gold & Metals Price Tracker - Live Spot Rates 24K 22K 18K",
  description: "Track live real-time spot gold, silver, and platinum prices in USD, BDT, EUR, GBP, INR, AED, and SAR. Calculate gold value per gram, tola, and oz.",
  path: "/tools/finance/gold-price-tracker",
});

export default function GoldPriceTrackerPage() {
  return (
    <><GoldPriceTrackerClient />
      <RelatedTools currentToolUrl="/tools/finance/gold-price-tracker" />
    </>
  );
}
