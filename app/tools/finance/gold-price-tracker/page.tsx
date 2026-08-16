import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GoldPriceTrackerClient from "@/components/tools/finance/gold-price-tracker-client";
<<<<<<< HEAD
import { generateSEOMetadata } from "@/lib/seo-config";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Real-Time Gold & Metals Price Tracker",
  description: "Track real-time spot gold, silver, and platinum prices per Oz, Gram, Tola, and Kilo in USD, BDT, EUR, GBP, INR, AED, and SAR with instant live weight calculator.",
  path: "/tools/finance/gold-price-tracker",
  keywords: ["with", "gold", "silver", "gram", "tola", "time", "prices", "kilo", "track", "real", "spot", "platinum"],
});

<<<<<<< HEAD
export default function GoldPriceTrackerPage() {
  return (
    <><GoldPriceTrackerClient />
      <RelatedTools currentToolUrl="/tools/finance/gold-price-tracker" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Real-Time Gold & Metals Price Tracker",
    description: "Track real-time spot gold, silver, and platinum prices per Oz, Gram, Tola, and Kilo in USD, BDT, EUR, GBP, INR, AED, and SAR with instant live weight calculator.",
    path: "/tools/finance/gold-price-tracker",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <GoldPriceTrackerClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
