import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AspectRatioClient from "@/components/tools/calc/aspect-ratio-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Aspect Ratio Calculator",
  description: "Calculate aspect ratios for any resolution. Lock ratio and compute missing dimension. Common presets: 16:9, 4:3, 21:9, 1:1, 9:16. Scale calculator.",
  path: "/tools/calc/aspect-ratio",
  keywords: ["calculate", "presets", "resolution", "scale", "lock", "common", "ratio", "dimension", "missing", "compute", "ratios", "aspect"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/calc/aspect-ratio`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Aspect Ratio Calculator", url: toolUrl, description: "Calculate and scale aspect ratios for images and videos.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteURL}/tools#cat-calc` }, { "@type": "ListItem", position: 3, name: "Aspect Ratio Calculator", item: toolUrl }] };
  
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><AspectRatioClient />
      <RelatedTools currentToolUrl="/tools/calc/aspect-ratio" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Aspect Ratio Calculator",
    description: "Calculate aspect ratios for any resolution. Lock ratio and compute missing dimension. Common presets: 16:9, 4:3, 21:9, 1:1, 9:16. Scale calculator.",
    path: "/tools/calc/aspect-ratio",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AspectRatioClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
